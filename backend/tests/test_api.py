import pytest
from fastapi.testclient import TestClient
import sys
import os

# Add backend directory to sys.path
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from main import app
from mock_data import RAW_EVENTS, COLLEGE_OD_TEMPLATES, SAMPLE_TEAMMATES

client = TestClient(app)

def test_health_check():
    response = client.get("/api/health")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "healthy"
    assert data["service"] == "EventRoute AI Engine"
    assert data["events_count"] == len(RAW_EVENTS)

def test_root_and_status_alias():
    root_res = client.get("/")
    assert root_res.status_code == 200
    assert root_res.json()["docs_url"] == "/docs"

    status_res = client.get("/api/status")
    assert status_res.status_code == 200
    assert status_res.json()["status"] == "healthy"

def test_user_profile():
    response = client.get("/api/user/profile")
    assert response.status_code == 200
    data = response.json()
    assert "profile" in data
    assert "exams" in data
    assert data["profile"]["name"] == "Milind"
    assert "Delhi Technical Campus" in data["profile"]["college"]

def test_get_events_ranked():
    response = client.get("/api/events")
    assert response.status_code == 200
    data = response.json()
    assert "events" in data
    events = data["events"]
    assert len(events) == len(RAW_EVENTS)
    # Check that events have explainable AI match properties
    first = events[0]
    assert "ai_match" in first
    assert "match_percentage" in first["ai_match"]
    assert "why_recommended" in first["ai_match"]
    assert isinstance(first["ai_match"]["why_recommended"], list)
    # Check that events are sorted descending by match score
    scores = [e["ai_match"]["match_percentage"] for e in events]
    assert scores == sorted(scores, reverse=True)

def test_events_feedback_reranking():
    # Downvote Web3 Defi Sprint
    payload = {
        "event_id": "evt_web3_defi_sprint",
        "action": "downvote",
        "reason_tag": "Not interested in Web3"
    }
    response = client.post("/api/events/feedback", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "success"
    assert "updated_weights" in data
    assert data["updated_weights"]["Web3"] < 1.0

def test_shortlist_crud():
    sample_event = {
        "id": "evt_test_shortlist_01",
        "title": "DTC Innovation Hack 2026",
        "organizer": "Delhi Technical Campus",
        "format": "In-Person",
        "worth_it_score": 96
    }
    # Add to shortlist
    post_res = client.post("/api/shortlist", json=sample_event)
    assert post_res.status_code == 200
    assert post_res.json()["status"] == "saved"

    # Fetch shortlist
    get_res = client.get("/api/shortlist")
    assert get_res.status_code == 200
    shortlist = get_res.json()["shortlist"]
    assert any(e["id"] == "evt_test_shortlist_01" for e in shortlist)

    # Delete from shortlist
    del_res = client.delete("/api/shortlist/evt_test_shortlist_01")
    assert del_res.status_code == 200
    assert del_res.json()["status"] == "removed"

def test_skill_gap_analysis():
    response = client.get("/api/events/evt_hackai_pune_26/skill-gap")
    assert response.status_code == 200
    data = response.json()
    assert data["event_id"] == "evt_hackai_pune_26"
    assert "skills_have" in data
    assert "skills_missing" in data
    assert "learning_resources" in data
    assert "total_prep_hours" in data

def test_od_templates():
    response = client.get("/api/od-letter/templates")
    assert response.status_code == 200
    templates = response.json()
    assert "DTC_DELHI" in templates
    assert "USICT_DWARKA" in templates
    assert "MAIT_ROHINI" in templates
    assert "MSIT_JANAKPURI" in templates
    assert templates["DTC_DELHI"]["college_name"] == "Delhi Technical Campus"

def test_od_letter_generation_and_verification():
    payload = {
        "event_id": "evt_hackai_pune_26",
        "college_key": "DTC_DELHI"
    }
    res = client.post("/api/od-letter/generate", json=payload)
    assert res.status_code == 200
    letter = res.json()
    assert "ref_number" in letter
    assert "verification" in letter
    assert letter["college_name"] == "Delhi Technical Campus"
    verif_hash = letter["verification"]["hash"]

    # Verify letter
    verif_res = client.get(f"/api/od-letter/verify/{verif_hash}")
    assert verif_res.status_code == 200
    verif_data = verif_res.json()
    assert verif_data["valid"] is True
    assert verif_data["status"] == "OFFICIALLY_VERIFIED"
    assert verif_data["institution"] == "Delhi Technical Campus"

def test_teammates_dtc_members():
    response = client.get("/api/teammates")
    assert response.status_code == 200
    teammates = response.json()["teammates"]
    assert len(teammates) >= 6
    names = [t["name"] for t in teammates]
    assert "Arman Chauhan" in names
    assert "Anshika Tyagi" in names
    assert "Dimple" in names

    # Check DTC peer metadata
    arman = next(t for t in teammates if t["name"] == "Arman Chauhan")
    assert arman["college"] == "Delhi Technical Campus (GGSIPU)"
    assert arman["isDtcPeer"] is True
    assert arman["synergy_score"] == 98

def test_assistant_chat_teammates_intent():
    res = client.post("/api/assistant/chat", json={"message": "Can you find me a teammate from my college DTC?"})
    assert res.status_code == 200
    data = res.json()
    assert "reply" in data
    assert "Arman Chauhan" in data["reply"]
    assert "tool_calls" in data
    assert any(log["tool"] == "match_teammates_synergy" for log in data["tool_calls"])

def test_idea_validation():
    payload = {
        "event_id": "evt_hackai_pune_26",
        "idea_title": "EventRoute AI: Student Opportunity Engine",
        "idea_pitch": "Automated swipe-to-discover AI tool with explainable scoring, exam conflict detection, and 1-click OD letter generation."
    }
    res = client.post("/api/ideas/validate", json=payload)
    assert res.status_code == 200
    data = res.json()
    assert "scores" in data
    assert "novelty" in data["scores"]
    assert "overall_readiness" in data["scores"]
    assert "critique" in data
