"""Backend tests for ClearVision Eye Hospital API - appointments and contacts"""
import pytest
import requests
import os

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', '').rstrip('/')


class TestAppointments:
    """Appointment CRUD tests"""

    def test_create_appointment(self):
        payload = {
            "name": "TEST_John Doe",
            "email": "test_john@example.com",
            "phone": "9876543210",
            "service": "Cataract Surgery",
            "preferred_date": "2026-03-15",
            "message": "Test appointment"
        }
        r = requests.post(f"{BASE_URL}/api/appointments", json=payload)
        assert r.status_code == 200
        data = r.json()
        assert data["name"] == payload["name"]
        assert data["email"] == payload["email"]
        assert data["service"] == payload["service"]
        assert "id" in data
        assert data["status"] == "pending"
        print(f"PASS: Created appointment id={data['id']}")

    def test_get_appointments(self):
        r = requests.get(f"{BASE_URL}/api/appointments")
        assert r.status_code == 200
        data = r.json()
        assert isinstance(data, list)
        print(f"PASS: Got {len(data)} appointments")

    def test_appointment_persists(self):
        payload = {
            "name": "TEST_PersistCheck",
            "email": "persist@example.com",
            "phone": "1234567890",
            "service": "LASIK",
            "preferred_date": "2026-04-01",
            "message": ""
        }
        r = requests.post(f"{BASE_URL}/api/appointments", json=payload)
        assert r.status_code == 200
        created_id = r.json()["id"]

        r2 = requests.get(f"{BASE_URL}/api/appointments")
        assert r2.status_code == 200
        ids = [a["id"] for a in r2.json()]
        assert created_id in ids
        print(f"PASS: Appointment persisted with id={created_id}")

    def test_appointment_missing_required_fields(self):
        r = requests.post(f"{BASE_URL}/api/appointments", json={"name": "Only Name"})
        assert r.status_code == 422
        print("PASS: Validation error on missing fields")


class TestContacts:
    """Contact form tests"""

    def test_create_contact(self):
        payload = {
            "name": "TEST_Contact",
            "email": "contact@example.com",
            "phone": "9999999999",
            "subject": "Query",
            "message": "Test message"
        }
        r = requests.post(f"{BASE_URL}/api/contacts", json=payload)
        assert r.status_code == 200
        data = r.json()
        assert data["name"] == payload["name"]
        assert "id" in data
        print(f"PASS: Created contact id={data['id']}")

    def test_get_contacts(self):
        r = requests.get(f"{BASE_URL}/api/contacts")
        assert r.status_code == 200
        assert isinstance(r.json(), list)
        print("PASS: Got contacts list")


class TestHealthCheck:
    def test_api_root(self):
        r = requests.get(f"{BASE_URL}/api/")
        assert r.status_code == 200
        print("PASS: API root OK")
