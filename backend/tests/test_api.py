import pytest
import sys
import os

# Add backend directory to sys.path
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from main import (
    health_check,
    status_alias,
    root_index,
    get_user_profile,
    get_events,
    submit_feedback,
    FeedbackRequest,
    get_user_shortlist,
    add_to_shortlist,
    delete_from_shortlist,
    get_skill_gap,
    get_od_templates,
    generate_od_letter,
    ODGenerateRequest,
    verify_od_letter,
    get_teammates,
    assistant_chat,
    ChatRequest,
    validate_idea,
    IdeaValidateRequest,
)
from mock_data import RAW_EVENTS, COLLEGE_OD_TEMPLATES, SAMPLE_TEAMMATES

def test_health_check():
    data = health_check()
    assert data["status"] == "healthy"
    assert data["service"] == "EventRoute AI Engine"
    assert data["events_count"] == len(RAW_EVENTS)

def test_root_and_status_alias():
    root_res = root_index()
    assert root_res["docs_url"] == "/docs"

    status_res = status_alias()
    assert status_res["status"] == "healthy"

def test_user_profile():
    data = get_user_profile()
    assert "profile" in data
    assert "exams" in data
    assert data["profile"]["name"] == "Milind"
    assert "Delhi Technical Campus" in data["profile"]["college"]

def test_get_events_ranked():
    data = get_events()
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
    req = FeedbackRequest(
        event_id="evt_web3_defi_sprint",
        action="downvote",
        reason_tag="Not interested in Web3"
    )
    data = submit_feedback(req)
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
    post_res = add_to_shortlist(sample_event)
    assert post_res["status"] == "saved"

    # Fetch shortlist
    get_res = get_user_shortlist()
    shortlist = get_res["shortlist"]
    assert any(e["id"] == "evt_test_shortlist_01" for e in shortlist)

    # Delete from shortlist
    del_res = delete_from_shortlist("evt_test_shortlist_01")
    assert del_res["status"] == "removed"

def test_skill_gap_analysis():
    data = get_skill_gap("evt_hackai_pune_26")
    assert data["event_id"] == "evt_hackai_pune_26"
    assert "skills_have" in data
    assert "skills_missing" in data
    assert "learning_resources" in data
    assert "total_prep_hours" in data

def test_od_templates():
    templates = get_od_templates()
    assert "DTC_DELHI" in templates
    assert "USICT_DWARKA" in templates
    assert "MAIT_ROHINI" in templates
    assert "MSIT_JANAKPURI" in templates
    assert templates["DTC_DELHI"]["college_name"] == "Delhi Technical Campus"

def test_od_letter_generation_and_verification():
    req = ODGenerateRequest(
        event_id="evt_hackai_pune_26",
        college_key="DTC_DELHI"
    )
    letter = generate_od_letter(req)
    assert "ref_number" in letter
    assert "verification" in letter
    assert letter["college_name"] == "Delhi Technical Campus"
    verif_hash = letter["verification"]["hash"]

    # Verify letter
    verif_data = verify_od_letter(verif_hash)
    assert verif_data["valid"] is True
    assert verif_data["status"] == "OFFICIALLY_VERIFIED"
    assert verif_data["institution"] == "Delhi Technical Campus"

def test_teammates_dtc_members():
    data = get_teammates()
    teammates = data["teammates"]
    assert len(teammates) >= 6
    names = [t["name"] for t in teammates]
    assert "Naman Khatri" in names
    assert "Arman Chauhan" in names
    assert "Anshika Tyagi" in names
    assert "Dimple" in names

    # Check DTC peer metadata
    naman = next(t for t in teammates if t["name"] == "Naman Khatri")
    assert naman["college"] == "Delhi Technical Campus (GGSIPU)"
    assert naman["isDtcPeer"] is True
    assert naman["role"] == "Backend Designer"
    assert naman["synergy_score"] == 99

def test_assistant_chat_teammates_intent():
    res = assistant_chat(ChatRequest(message="Can you find me a teammate from my college DTC?"))
    assert "reply" in res
    assert "Arman Chauhan" in res["reply"] or "Naman Khatri" in res["reply"]
    assert "tool_calls" in res
    assert any(log["tool"] == "match_teammates_synergy" for log in res["tool_calls"])

def test_idea_validation():
    req = IdeaValidateRequest(
        event_id="evt_hackai_pune_26",
        idea_title="EventRoute AI: Student Opportunity Engine",
        idea_pitch="Automated swipe-to-discover AI tool with explainable scoring, exam conflict detection, and 1-click OD letter generation."
    )
    data = validate_idea(req)
    assert "scores" in data
    assert "novelty" in data["scores"]
    assert "overall_readiness" in data["scores"]
    assert "critique" in data
