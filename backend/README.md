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
uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```

Interactive OpenAPI Documentation will be live at:
- **Swagger UI**: [http://localhost:8000/docs](http://localhost:8000/docs)
- **ReDoc**: [http://localhost:8000/redoc](http://localhost:8000/redoc)

---

## 📡 REST API Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/health` | Service health status and version info |
| `GET` | `/api/events` | Retrieve explainable ranked events for active student profile |
| `GET` | `/api/profile` | Student academic profile, skills, and attendance rate |
| `GET` | `/api/calendar` | Synchronized academic exam schedule & collision states |
| `GET` | `/api/skill-gap/{event_id}` | Have vs Missing skills analysis + learning fast-tracks |
| `POST` | `/api/feedback` | Ingest right swipe (shortlist), left swipe (skip), or manual votes |
| `POST` | `/api/od-letter/generate` | Generate official university-formatted OD leave letter |
| `GET` | `/api/od-letter/verify/{hash}` | Public anti-tamper cryptographic verification node |
| `POST` | `/api/chat` | Conversational RAG assistant with agentic tool calling |
| `POST` | `/api/validate-idea` | AI hackathon concept novelty & feasibility evaluation |

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
