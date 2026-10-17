"""
SQLite Persistent Storage for EventRoute AI
Stores user bookmarks, dynamic feedback logs, generated OD letters, and validated ideas.
"""

import sqlite3
import json
import os
from datetime import datetime
from typing import List, Dict, Any, Optional

DB_FILE = os.path.join(os.path.dirname(__file__), "eventroute.db")

def get_connection():
    conn = sqlite3.connect(DB_FILE)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    conn = get_connection()
    cursor = conn.cursor()

    # User Feedback table
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS feedback_logs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        event_id TEXT NOT NULL,
        action TEXT NOT NULL,
        reason_tag TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
    """)

    # OD Letters table
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS od_letters (
        ref_number TEXT PRIMARY KEY,
        verification_hash TEXT NOT NULL,
        student_roll TEXT NOT NULL,
        event_id TEXT NOT NULL,
        event_title TEXT NOT NULL,
        college_key TEXT NOT NULL,
        letter_json TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
    """)

    # AI Idea Validation table
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS validated_ideas (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        event_id TEXT NOT NULL,
        idea_title TEXT NOT NULL,
        idea_pitch TEXT NOT NULL,
        novelty_score INTEGER,
        feasibility_score INTEGER,
        track_alignment_score INTEGER,
        ai_critique TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
    """)

    conn.commit()
    conn.close()

def log_feedback(event_id: str, action: str, reason_tag: Optional[str] = None):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute(
        "INSERT INTO feedback_logs (event_id, action, reason_tag) VALUES (?, ?, ?)",
        (event_id, action, reason_tag)
    )
    conn.commit()
    conn.close()

def save_od_letter(letter_dict: Dict[str, Any], college_key: str):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("""
        INSERT OR REPLACE INTO od_letters 
        (ref_number, verification_hash, student_roll, event_id, event_title, college_key, letter_json)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    """, (
        letter_dict["ref_number"],
        letter_dict["verification"]["hash"],
        letter_dict["student_details"]["roll_no"],
        letter_dict["event_details"]["id"],
        letter_dict["event_details"]["title"],
        college_key,
        json.dumps(letter_dict)
    ))
    conn.commit()
    conn.close()

def get_od_letter_by_hash(verification_hash: str) -> Optional[Dict[str, Any]]:
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT letter_json FROM od_letters WHERE verification_hash = ?", (verification_hash,))
    row = cursor.fetchone()
    conn.close()
    if row:
        return json.loads(row["letter_json"])
    return None

# Initialize on import
init_db()
