from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field
from typing import List, Optional, Annotated
from bson import ObjectId
import uuid
from datetime import datetime, timezone


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

app = FastAPI()
api_router = APIRouter(prefix="/api")

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)


# ── Models ────────────────────────────────────────────────────────────────────

class AppointmentCreate(BaseModel):
    name: str
    email: str
    phone: str
    service: str
    preferred_date: str
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


# ── Routes ────────────────────────────────────────────────────────────────────

@api_router.get("/")
async def root():
    return {"message": "ClearVision Eye Hospital API"}

@api_router.post("/appointments", response_model=Appointment)
async def create_appointment(data: AppointmentCreate):
    appt = Appointment(**data.model_dump())
    doc = appt.model_dump()
    await db.appointments.insert_one(doc)
    return appt

@api_router.get("/appointments", response_model=List[Appointment])
async def get_appointments():
    items = await db.appointments.find({}, {"_id": 0}).to_list(1000)
    return items

@api_router.post("/contacts", response_model=Contact)
async def create_contact(data: ContactCreate):
    contact = Contact(**data.model_dump())
    doc = contact.model_dump()
    await db.contacts.insert_one(doc)
    return contact

@api_router.get("/contacts", response_model=List[Contact])
async def get_contacts():
    items = await db.contacts.find({}, {"_id": 0}).to_list(1000)
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
