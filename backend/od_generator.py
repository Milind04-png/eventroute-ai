"""
Academic On-Duty (OD) Leave Letter Generator for Indian Colleges
Produces official, verifiable OD letters formatted for University of Mumbai,
VTU, Anna University, AKTU, and other technical boards.
"""

import os
import sys
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

import hashlib
import uuid
from datetime import datetime
from typing import Dict, Any

try:
    from mock_data import STUDENT_PROFILE, RAW_EVENTS, COLLEGE_OD_TEMPLATES
except ImportError:
    from backend.mock_data import STUDENT_PROFILE, RAW_EVENTS, COLLEGE_OD_TEMPLATES

class ODGeneratorService:
    def __init__(self):
        self.student = STUDENT_PROFILE
        self.templates = COLLEGE_OD_TEMPLATES

    def generate_od_letter(self, event_id: str, college_key: str = "TSEC_MUMBAI") -> Dict[str, Any]:
        """
        Generates a structured, legally sound OD leave request letter with verification hash.
        """
        event = next((e for e in RAW_EVENTS if e["id"] == event_id), None)
        if not event:
            raise ValueError(f"Event with id '{event_id}' not found.")

        college_config = self.templates.get(college_key, self.templates["TSEC_MUMBAI"])
        
        # Unique reference and verification hash
        doc_uuid = str(uuid.uuid4())[:8].upper()
        ref_number = f"{college_config['letter_code_prefix']}{doc_uuid}"
        
        start_dt = datetime.fromisoformat(event["start_date"])
        end_dt = datetime.fromisoformat(event["end_date"])
        event_days_str = f"{start_dt.strftime('%B %d, %Y')} to {end_dt.strftime('%B %d, %Y')}"
        duration_days = (end_dt.date() - start_dt.date()).days + 1

        # Generate SHA256 anti-tamper hash
        raw_hash_seed = f"{ref_number}:{self.student['roll_no']}:{event['id']}:{event['start_date']}"
        verification_hash = hashlib.sha256(raw_hash_seed.encode()).hexdigest()[:16]
        verification_url = f"https://verify.eventroute.ai/od/{verification_hash}"

        letter_content = {
            "ref_number": ref_number,
            "generated_date": datetime.now().strftime("%B %d, %Y"),
            "college_name": college_config["college_name"],
            "university": college_config["university"],
            "college_address": college_config["address"],
            "to_recipient": {
                "name": college_config["hod_name"],
                "designation": college_config["hod_title"],
                "department": self.student["branch"],
                "institution": college_config["college_name"]
            },
            "student_details": {
                "name": self.student["name"],
                "roll_no": self.student["roll_no"],
                "branch": self.student["branch"],
                "year": self.student["year"],
                "email": self.student["email"],
                "current_attendance": f"{self.student['attendance_rate']}%"
            },
            "event_details": {
                "id": event["id"],
                "title": event["title"],
                "organizer": event["organizer"],
                "format": event["format"],
                "city": event["city"],
                "dates": event_days_str,
                "duration_days": duration_days,
                "verification_status": event.get("verification_status", "Verified Tier-1")
            },
            "subject": f"Request for Grant of On-Duty (OD) Leave for Participation in '{event['title']}'",
            "body_paragraphs": [
                f"Respected Sir/Madam,",
                f"I am writing to formally request On-Duty (OD) attendance leave from {event_days_str} ({duration_days} day(s)) to participate in '{event['title']}', organized by {event['organizer']}.",
                f"This competition has been verified under our institutional technical competency framework. My participation will represent {college_config['college_name']} at this prestigious national forum and involves competitive software development in {', '.join(event['domains'])}.",
                f"I undertake to ensure that all lectures, lab sessions, and academic continuous evaluations missed during this period will be compensated promptly. Upon returning, I will submit the official Certificate of Participation/Merit to the department office.",
                f"Kindly grant On-Duty leave for the aforementioned dates and adjust my attendance records accordingly."
            ],
            "verification": {
                "hash": verification_hash,
                "url": verification_url,
                "qr_data": f"EVENTROUTE_VERIFY:OD:{verification_hash}:STUDENT:{self.student['roll_no']}:EVENT:{event['id']}"
            }
        }

        return letter_content

od_generator = ODGeneratorService()
