from fastapi import FastAPI, APIRouter, HTTPException, Query
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
from pymongo.errors import PyMongoError
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field
from typing import List, Optional
import uuid
from datetime import datetime, timezone, date as date_type


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url, serverSelectionTimeoutMS=5000)
db = client[os.environ['DB_NAME']]
appointments_collection = db[os.environ.get("APPOINTMENTS_COLLECTION", "appointments")]
contacts_collection = db[os.environ.get("CONTACTS_COLLECTION", "contacts")]

app = FastAPI()
api_router = APIRouter(prefix="/api")

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)


# ── Helpers ───────────────────────────────────────────────────────────────────

def generate_slots(date_str: str) -> list:
    """Return list of slot times for a given date based on MeeraSight hours."""
    try:
        d = datetime.strptime(date_str, "%Y-%m-%d").date()
    except ValueError:
        return []

    weekday = d.weekday()  # 0=Mon … 6=Sun

    # Thursday closed
    if weekday == 3:
        return []

    # Sunday: 9:00 – 11:30 (last slot, done by noon)
    if weekday == 6:
        return [f"{h:02d}:{m:02d}" for h in range(9, 12) for m in (0, 30)]

    # Mon/Tue/Wed/Fri/Sat: morning 9:00–13:00 + evening 18:00–19:30
    morning = [f"{h:02d}:{m:02d}" for h in range(9, 14) for m in (0, 30)]
    # last morning slot at 13:00 only (13:30 would exceed 1:30pm)
    morning = [s for s in morning if s != "13:30"]
    evening = [f"{h:02d}:{m:02d}" for h in range(18, 20) for m in (0, 30)]
    return morning + evening


def fmt_time(t: str) -> str:
    """Convert 'HH:MM' to '9:00 AM' style."""
    h, m = map(int, t.split(":"))
    period = "AM" if h < 12 else "PM"
    h12 = h if 1 <= h <= 12 else (h - 12 if h > 12 else 12)
    return f"{h12}:{m:02d} {period}"


# ── Models ────────────────────────────────────────────────────────────────────

class AppointmentCreate(BaseModel):
    name: str
    email: str
    phone: str
    service: str
    preferred_date: str
    time_slot: Optional[str] = ""
    message: Optional[str] = ""

class Appointment(AppointmentCreate):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    status: str = "pending"
    created_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())

class ContactCreate(BaseModel):
    name: str
    email: str
    phone: Optional[str] = ""
    subject: str
    message: str

class Contact(ContactCreate):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    created_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())

class SlotInfo(BaseModel):
    time: str
    display: str
    available: bool

class SlotsResponse(BaseModel):
    date: str
    closed: bool
    slots: List[SlotInfo]


# ── Routes ────────────────────────────────────────────────────────────────────

@api_router.get("/")
async def root():
    return {"message": "MeeraSight Eye Hospital API"}

@api_router.get("/slots", response_model=SlotsResponse)
async def get_slots(date: str = Query(..., description="Date in YYYY-MM-DD format")):
    all_times = generate_slots(date)
    if not all_times:
        return SlotsResponse(date=date, closed=True, slots=[])

    try:
        # Find already-booked slots for this date
        booked_cursor = appointments_collection.find(
            {"preferred_date": date, "status": {"$ne": "cancelled"}},
            {"_id": 0, "time_slot": 1}
        )
        booked_docs = await booked_cursor.to_list(1000)
        booked_set = {doc["time_slot"] for doc in booked_docs if doc.get("time_slot")}
    except PyMongoError as exc:
        logger.exception("Database error while fetching slots")
        raise HTTPException(status_code=503, detail=f"Database connection failed: {str(exc)}")

    slots = [
        SlotInfo(time=t, display=fmt_time(t), available=(t not in booked_set))
        for t in all_times
    ]
    return SlotsResponse(date=date, closed=False, slots=slots)

@api_router.post("/appointments", response_model=Appointment)
async def create_appointment(data: AppointmentCreate):
    # Check slot not already taken
    if data.time_slot and data.preferred_date:
        existing = await appointments_collection.find_one({
            "preferred_date": data.preferred_date,
            "time_slot": data.time_slot,
            "status": {"$ne": "cancelled"}
        })
        if existing:
            raise HTTPException(status_code=409, detail="This time slot is already booked. Please choose another.")

    appt = Appointment(**data.model_dump())
    await appointments_collection.insert_one(appt.model_dump())
    return appt

@api_router.get("/appointments", response_model=List[Appointment])
async def get_appointments():
    items = await appointments_collection.find({}, {"_id": 0}).to_list(1000)
    return items

@api_router.post("/contacts", response_model=Contact)
async def create_contact(data: ContactCreate):
    contact = Contact(**data.model_dump())
    await contacts_collection.insert_one(contact.model_dump())
    return contact

@api_router.get("/contacts", response_model=List[Contact])
async def get_contacts():
    items = await contacts_collection.find({}, {"_id": 0}).to_list(1000)
    return items


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
