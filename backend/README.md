# EventRoute AI — Backend Service

FastAPI-powered semantic recommendation engine, dynamic feedback reranker, academic schedule collision guard, and automated On-Duty (OD) attendance document generation system.

---

## ⚡ Tech Stack & Architecture

- **Framework**: FastAPI (Python 3.10+)
- **Server**: Uvicorn ASGI
- **Data & Models**: Pydantic v2 schemas
- **Persistence**: SQLite with WAL mode (`eventroute.db`)
- **Algorithms**:
  - Deterministic Academic Timetable Collision Watchdog
  - Multi-Factor Hybrid Opportunity Scoring Engine (Semantic Fit + Academic Safety + ROI)
  - Real-Time Reinforcement Learning from User Feedback (RLUF) Dynamic Reranker
  - Cryptographic SHA-256 Anti-Tamper Verification Hashes

---

## 🚀 Running Standalone

### 1. Install Dependencies
```bash
pip install -r requirements.txt
```

### 2. Start the FastAPI Server
```bash
# Using Python
python main.py

# Or via Uvicorn CLI
uvicorn main:app --host 127.0.0.1 --port 8001 --reload
```

Interactive OpenAPI Documentation will be live at:
- **Swagger UI**: [http://localhost:8001/docs](http://localhost:8001/docs)
- **ReDoc**: [http://localhost:8001/redoc](http://localhost:8001/redoc)
- **Health Check**: [http://localhost:8001/api/health](http://localhost:8001/api/health)

---

## 📡 REST API Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/health` | Service health status, engine identity, and 19 loaded opportunities |
| `GET` | `/api/user/profile` | Student academic profile (Milind, DTC 2nd Year) and exam schedule |
| `GET` | `/api/events` | Retrieve explainable ranked events for active student profile |
| `POST` | `/api/events/feedback` | Ingest right swipe (shortlist), left swipe (skip), or manual votes |
| `GET` | `/api/events/{event_id}/skill-gap` | Have vs Missing skills analysis + learning fast-tracks |
| `GET` | `/api/shortlist` | Fetch right-swiped shortlisted opportunities |
| `POST` | `/api/shortlist` | Persist an event into student shortlist |
| `DELETE` | `/api/shortlist/{event_id}` | Remove an event from shortlist |
| `GET` | `/api/od-letter/templates` | Institutional OD templates (all GGSIPU colleges) |
| `POST` | `/api/od-letter/generate` | Generate official university-formatted OD leave letter with QR code |
| `GET` | `/api/od-letter/verify/{hash}` | Public anti-tamper cryptographic verification node |
| `GET` | `/api/teammates` | High-synergy teammates (Naman Khatri, Arman, Anshika, Dimple) |
| `POST` | `/api/assistant/chat` | Conversational RAG assistant with agentic tool calling |
| `POST` | `/api/ideas/validate` | AI hackathon concept novelty & feasibility evaluation |

---

## 📂 Backend File Organization

```
backend/
├── main.py              # FastAPI application entrypoint & REST routes
├── ai_engine.py         # Collision detection, semantic fit & RLUF reranking
├── assistant.py         # RAG assistant with function calling loop
├── database.py          # SQLite persistence for feedback & OD letters
├── mock_data.py         # Ground truth events, exams, and student profiles
├── od_generator.py      # University OD letter compiler & SHA-256 signer
├── requirements.txt     # Python package requirements
├── run_backend.bat      # 1-Click Windows batch script
└── run_backend.ps1      # 1-Click PowerShell script
```
