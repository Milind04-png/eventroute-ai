"""
AI Engine for EventRoute AI:
- Semantic Vector Similarity & Matching
- Hybrid Explainable Scoring
- Exam Clash Collision Detection
- Skill Gap Identification & Resource Bridge
- Real-time Reinforcement from User Feedback (RLUF) Dynamic Reranking
"""

import os
import sys
import math
from datetime import datetime
from typing import List, Dict, Any, Tuple
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

try:
    from mock_data import STUDENT_PROFILE, EXAM_CALENDAR, SKILL_LEARNING_VAULT, RAW_EVENTS
except ImportError:
    from backend.mock_data import STUDENT_PROFILE, EXAM_CALENDAR, SKILL_LEARNING_VAULT, RAW_EVENTS

class EventRouteAIEngine:
    def __init__(self):
        self.user = STUDENT_PROFILE
        self.exams = EXAM_CALENDAR
        # Dynamic feedback bias dictionary {tag: multiplier}
        self.feedback_weights = {
            "Artificial Intelligence": 1.15,
            "Machine Learning": 1.10,
            "Web3": 1.0,
            "Blockchain": 1.0,
            "Cloud Native": 1.05,
            "Robotics": 1.0
        }
        self.user_downvoted_events = set()
        self.user_upvoted_events = set()

    def _tokenize(self, text: str) -> set:
        """Simple clean tokenizer for semantic vocabulary overlap"""
        punctuation = ",.!?:;()[]{}'\"/\\"
        clean = text.lower()
        for p in punctuation:
            clean = clean.replace(p, " ")
        return set(word for word in clean.split() if len(word) > 2)

    def calculate_semantic_similarity(self, event: Dict[str, Any]) -> float:
        """
        Calculates cosine-like semantic similarity between student profile vectors
        (skills, interests, bio) and event vector (description, tags, domains).
        """
        user_corpus = " ".join(self.user["skills"] + self.user["interests"] + ["developer", "software", "student"])
        event_corpus = " ".join([event["title"], event["description"]] + event["tags"] + event.get("domains", []))

        u_tokens = self._tokenize(user_corpus)
        e_tokens = self._tokenize(event_corpus)

        intersection = u_tokens.intersection(e_tokens)
        if not u_tokens or not e_tokens:
            return 0.5

        # Jaccard / Cosine approximation
        sim = len(intersection) / math.sqrt(len(u_tokens) * len(e_tokens))
        # Normalize into 0.4 to 1.0 range for realistic scoring
        return min(1.0, max(0.3, sim * 2.2))

    def detect_exam_clash(self, event: Dict[str, Any]) -> Tuple[bool, List[str]]:
        """
        Deterministic collision detection between university exam schedule
        and event dates.
        """
        e_start = datetime.fromisoformat(event["start_date"])
        e_end = datetime.fromisoformat(event["end_date"])

        clash_details = []
        has_clash = False

        for exam in self.exams:
            ex_start = datetime.fromisoformat(exam["start_date"])
            ex_end = datetime.fromisoformat(exam["end_date"])

            # Check date overlap: event starts before exam ends AND event ends after exam starts
            if e_start.date() <= ex_end.date() and e_end.date() >= ex_start.date():
                has_clash = True
                clash_details.append(f"Clashes with '{exam['title']}' on {ex_start.strftime('%d %b, %I:%M %p')}")

        return has_clash, clash_details

    def calculate_skill_gap(self, event_id: str) -> Dict[str, Any]:
        """
        Compares event prerequisites with student skills and returns
        'skills_have', 'skills_missing', and curated learning bridges.
        """
        event = next((e for e in RAW_EVENTS if e["id"] == event_id), None)
        if not event:
            return {}

        req_skills = event.get("required_skills", [])
        user_skills_set = set(s.lower() for s in self.user["skills"])

        have = []
        missing = []

        for skill in req_skills:
            if skill.lower() in user_skills_set:
                have.append(skill)
            else:
                missing.append(skill)

        learning_resources = []
        total_prep_hours = 0
        for m in missing:
            res = SKILL_LEARNING_VAULT.get(m)
            if res:
                learning_resources.append({
                    "skill": m,
                    "title": res["title"],
                    "est_hours": res["est_hours"],
                    "url": res["url"],
                    "desc": res["desc"],
                    "type": res["type"]
                })
                total_prep_hours += res["est_hours"]
            else:
                learning_resources.append({
                    "skill": m,
                    "title": f"Intro to {m} for Hackathons",
                    "est_hours": 2,
                    "url": f"https://www.google.com/search?q={m}+tutorial+for+hackathon",
                    "desc": f"Crash course to understand core syntax and deployment of {m}.",
                    "type": "Quick Guide"
                })
                total_prep_hours += 2

        fit_percentage = int((len(have) / len(req_skills) * 100)) if req_skills else 100

        return {
            "event_id": event_id,
            "event_title": event["title"],
            "fit_percentage": fit_percentage,
            "skills_have": have,
            "skills_missing": missing,
            "total_prep_hours": total_prep_hours,
            "learning_resources": learning_resources
        }

    def compute_hybrid_score(self, event: Dict[str, Any]) -> Dict[str, Any]:
        """
        Calculates explainable hybrid match score combining:
        1. Semantic similarity
        2. Skill overlap
        3. Worth-It score
        4. Exam clash penalty
        5. Real-time feedback multiplier
        """
        # 1. Semantic Match
        sem_sim = self.calculate_semantic_similarity(event)

        # 2. Skill Fit
        gap_info = self.calculate_skill_gap(event["id"])
        skill_fit = gap_info.get("fit_percentage", 80) / 100.0

        # 3. Worth-It Index (0-100 to 0-1)
        worth_it = event.get("worth_it_score", 85) / 100.0

        # 4. Exam Clash Detection
        has_clash, clash_notes = self.detect_exam_clash(event)
        clash_multiplier = 0.45 if has_clash else 1.0  # Heavy penalty if exam clashes

        # 5. Feedback Multiplier (Dynamic Reranking)
        tag_multipliers = [self.feedback_weights.get(tag, 1.0) for tag in event.get("tags", [])]
        feedback_multiplier = sum(tag_multipliers) / max(1, len(tag_multipliers))

        if event["id"] in self.user_downvoted_events:
            feedback_multiplier *= 0.50
        elif event["id"] in self.user_upvoted_events:
            feedback_multiplier *= 1.25

        # Weighted combination
        raw_score = (
            (0.40 * sem_sim) +
            (0.30 * skill_fit) +
            (0.30 * worth_it)
        ) * clash_multiplier * feedback_multiplier

        # Bound score between 10% and 99%
        final_percentage = min(99, max(12, int(raw_score * 100)))

        # Explainability text generation
        why_reasons = []
        why_not_reasons = []

        if not has_clash:
            why_reasons.append("Zero schedule clash with your semester lab exams.")
        else:
            why_not_reasons.append(clash_notes[0])

        if len(gap_info["skills_have"]) >= 2:
            why_reasons.append(f"Strong overlap with your verified skills ({', '.join(gap_info['skills_have'])}).")
        
        if event["worth_it_score"] >= 90:
            why_reasons.append(f"High Worth-It Score ({event['worth_it_score']}/100) with Tier-1 industry prestige.")

        if gap_info["skills_missing"]:
            why_not_reasons.append(f"Missing prerequisites: {', '.join(gap_info['skills_missing'])} ({gap_info['total_prep_hours']}h prep needed).")

        return {
            "match_percentage": final_percentage,
            "has_clash": has_clash,
            "clash_notes": clash_notes,
            "why_recommended": why_reasons,
            "why_not_recommended": why_not_reasons,
            "semantic_score": int(sem_sim * 100),
            "skill_fit_score": int(skill_fit * 100),
            "worth_it_score": event["worth_it_score"],
            "feedback_multiplier": round(feedback_multiplier, 2)
        }

    def get_ranked_events(self) -> List[Dict[str, Any]]:
        """Returns all events annotated with hybrid score and sorted by match_percentage"""
        ranked = []
        for evt in RAW_EVENTS:
            score_data = self.compute_hybrid_score(evt)
            evt_copy = dict(evt)
            evt_copy["ai_match"] = score_data
            ranked.append(evt_copy)

        # Sort descending by match percentage
        ranked.sort(key=lambda x: x["ai_match"]["match_percentage"], reverse=True)
        return ranked

    def apply_user_feedback(self, event_id: str, action: str, reason_tag: str = None) -> Dict[str, Any]:
        """
        Dynamically adjusts model weights when user upvotes or downvotes an opportunity.
        """
        target_event = next((e for e in RAW_EVENTS if e["id"] == event_id), None)
        if not target_event:
            return {"status": "error", "message": "Event not found"}

        if action == "downvote":
            self.user_downvoted_events.add(event_id)
            if event_id in self.user_upvoted_events:
                self.user_upvoted_events.remove(event_id)

            # Penalize specific tags based on reason
            if reason_tag and "Web3" in reason_tag:
                self.feedback_weights["Web3"] = 0.35
                self.feedback_weights["Blockchain"] = 0.35
                self.feedback_weights["Artificial Intelligence"] = 1.30  # Counter-boost AI
            elif reason_tag and "Too far" in reason_tag:
                self.feedback_weights["In-Person"] = 0.70
            else:
                for tag in target_event.get("tags", []):
                    self.feedback_weights[tag] = self.feedback_weights.get(tag, 1.0) * 0.75

        elif action == "upvote":
            self.user_upvoted_events.add(event_id)
            if event_id in self.user_downvoted_events:
                self.user_downvoted_events.remove(event_id)
            for tag in target_event.get("tags", []):
                self.feedback_weights[tag] = self.feedback_weights.get(tag, 1.0) * 1.25

        return {
            "status": "success",
            "action": action,
            "event_id": event_id,
            "reason_tag": reason_tag,
            "updated_weights": self.feedback_weights,
            "new_rankings": [
                {"id": e["id"], "title": e["title"], "score": e["ai_match"]["match_percentage"]}
                for e in self.get_ranked_events()
            ]
        }

# Global singleton engine
ai_engine = EventRouteAIEngine()
