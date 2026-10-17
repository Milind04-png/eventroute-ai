# EventRoute AI: Explainable Opportunity Intelligence for Students

> **Tagline**: The Intelligent Co-Pilot that matches Indian college students with hackathons, workshops, and career opportunities using explainable AI, collision-aware calendar sync, and automated academic On-Duty (OD) leave approvals.

---

## 🌟 The Core Problems We Solve

1. **Information Fragmentation & Noise**: College hackathons, technical conferences, and workshops in India are scattered across WhatsApp groups, posters, Devfolio, Unstop, and Luma.
2. **Blind Registrations vs. Semester Exam Clashes**: Students register for hackathons without knowing their college will hold internal lab exams on that exact weekend, forcing costly forfeits.
3. **The 75% Attendance & OD Bureaucracy**: Indian universities (GGSIPU, Mumbai University, VTU, Anna University, AKTU) strictly enforce attendance rules. Getting signed On-Duty (OD) leave letters is a painful, slow process prone to departmental rejection.
4. **Black-Box "Recommendations"**: Existing platforms use opaque sponsored promotion rather than explainable fit based on verified student skills.

---

## 🏗️ Decoupled Monorepo Architecture

The project is cleanly decoupled into standalone, independent services:

```
eventroute-ai/
├── frontend/                     # Dedicated React 19 Client
│   ├── public/logos/             # High-res crests (DTC, USICT, MAIT, MSIT, BVCOE, BPIT, GTBIT, VIPS, ADGITM, JIMS, HMRITM, IITB, etc.)
│   ├── src/
│   │   ├── components/           # UI components (Swipe Deck, Feed, Chatbot, Modals, AttendanceShield, TeamRoster)
│   │   ├── data/                 # Client offline cache & initial datasets (GGSIPU templates & hackathons)
│   │   ├── services/             # API client & offline fallback AI engine
│   │   ├── __tests__/            # Vitest unit test suite (aiEngine.test.js)
│   │   ├── App.jsx               # Application controller & RLUF reranker
│   │   ├── index.css             # Tailwind CSS tokens & Neural Universe palette
│   │   └── main.jsx              # React DOM bootstrap
│   ├── index.html                # Single Page App HTML shell
│   ├── vite.config.js            # Vite build & backend proxy (/api -> :8000)
│   ├── Dockerfile                # Production multi-stage Docker build with Nginx
│   ├── nginx.conf                # Production Nginx reverse proxy configuration
│   ├── package.json              # Frontend package manifest & test scripts
│   └── package-lock.json         # Frontend locked dependencies
│
├── backend/                      # Dedicated FastAPI Python Server
│   ├── main.py                   # REST API routes, OpenAPI tags, & CORS middleware
│   ├── ai_engine.py              # Semantic matching, collision detection & RLUF
│   ├── assistant.py              # Agentic tool-calling RAG chatbot
│   ├── database.py               # SQLite persistence layer (WAL mode)
│   ├── mock_data.py              # Student profile (Milind, DTC), exams, events, GGSIPU templates
│   ├── od_generator.py           # Institutional OD letter compiler & SHA-256 signer
│   ├── pytest.ini                # Pytest configuration
│   ├── tests/                    # Automated backend test suite (test_api.py - 11 tests)
│   ├── Dockerfile                # Lightweight Python 3.11-slim container
│   ├── requirements.txt          # Python package requirements
│   ├── run_backend.bat           # Standalone backend Windows launcher
│   └── run_backend.ps1           # Standalone backend PowerShell launcher
│
├── docker-compose.yml            # Multi-container orchestration (Frontend + Backend)
├── package.json                  # Monorepo root workspace & unified test runner
├── run.bat                       # 1-Click full-stack launcher (Windows)
├── run.ps1                       # 1-Click full-stack launcher (PowerShell)
├── dev.bat                       # Frontend-only dev launcher
├── .gitignore                    # Monorepo git ignore rules
├── .dockerignore                 # Container build exclusions
└── README.md                     # Master documentation (this file)
```

---

## 🏫 Verified GGSIPU Partner Colleges & Flagship Hackathons

EventRoute AI provides native institutional letterheads, authentic official crests, and verified hackathons for all prominent colleges affiliated with **Guru Gobind Singh Indraprastha University (GGSIPU / IP University)**:

| Institution | Campus Location | Flagship Hackathon / Fest | OD Status |
| :--- | :--- | :--- | :--- |
| **Delhi Technical Campus (DTC)** | Knowledge Park III, Greater Noida | **TechSpark DTC 2026** | **★ Home College (100% Fast-Track OD)** |
| **USICT (GGSIPU Main Campus)** | Sector 16-C, Dwarka, New Delhi | **InfoXpression 2026** | **University Main Campus OD** |
| **MAIT** | Sector 22, Rohini, Delhi | **HackMAIT 4.0** | **Fast-Track OD Approved** |
| **MSIT** | C-4, Janakpuri, New Delhi | **HackMSIT 2026** | **Fast-Track OD Approved** |
| **BVCOE** | A-4, Paschim Vihar, New Delhi | **BVEST Hack 2026** | **Fast-Track OD Approved** |
| **BPIT** | PSP-4, Sector 17, Rohini, Delhi | **Corona Hack 2026** | **Fast-Track OD Approved** |
| **GTBIT** | G-8 Area, Rajouri Garden, New Delhi | **Gates & HackGTBIT 2026** | **Fast-Track OD Approved** |
| **VIPS - TC** | AU Block, Pitampura, New Delhi | **Init_ Hack VIPS 2026** | **Fast-Track OD Approved** |
| **ADGITM / ADGIPS** | FC-26, Shastri Park, New Delhi | **InnoBuzz ADGITM 2026** | **Fast-Track OD Approved** |
| **JIMS EMTC** | 48/4, Knowledge Park III, Greater Noida | **TechnoXian JIMS Hack 2026** | **Fast-Track OD Approved** |
| **HMRITM** | Plot No. 326, Hamidpur, Delhi | **Emblazon HMRITM 2026** | **Fast-Track OD Approved** |

*National flagships also integrated:* IIT Bombay, DTU Delhi, BITS Pilani, COEP Tech Pune, VJTI Mumbai, RVCE Bengaluru, CEG Anna University, TSEC Mumbai.

---

## 👥 Delhi Technical Campus Hackathon Team Discovery

The **Teammate Discovery & Synergy Engine** matches Milind with complementary classmate profiles from Delhi Technical Campus:

* **Arman Chauhan** (CSE, 2nd Year) — *Frontend & UI/UX Lead* (`React`, `Next.js`, `Tailwind CSS`, `Figma`) $\rightarrow$ **98% Synergy Match**
* **Anshika Tyagi** (AI & ML, 2nd Year) — *AI & Machine Learning Specialist* (`PyTorch`, `LangChain`, `OpenAI APIs`, `Vector DBs`) $\rightarrow$ **97% Synergy Match**
* **Dimple** (CSE, 2nd Year) — *Mobile Apps & Cloud Engineer* (`Flutter`, `Firebase`, `Node.js`, `REST APIs`) $\rightarrow$ **95% Synergy Match**

### 📋 Team Roster Exporter (`TeamRosterModal`)
Students can export their formed DTC hackathon team as:
1. **Printable Official Team Registration Slip** with Dean/HOD verification stamp.
2. **One-Click JSON Export** formatted for Devfolio, Unstop, and Hack2Skill application forms.

---

## 🛡️ GGSIPU 75% Attendance Guard & Live OD Simulator

Indian universities enforce strict 75% attendance rules. Milind is currently at **78.4%** attendance (~196/250 hours):
* **Safe Unexcused Buffer**: Only 8 class hours (~1.3 days) before breaching the 75% cutoff and facing exam debarment.
* **Live OD Compensation Simulator**: Each 2-day hackathon OD approval credits 12 hours of attendance, boosting projected attendance to **83.2%** rather than penalizing the student.

---

## ⚡ Quickstart & Running the Application

### Option 1: One-Click Full-Stack Launcher (Windows)
Double-click `run.bat` or run in PowerShell:
```powershell
.\run.ps1
```
This automatically starts:
- **Frontend App**: [http://localhost:3000](http://localhost:3000)
- **FastAPI Backend**: [http://localhost:8000](http://localhost:8000)
- **Interactive Swagger Docs**: [http://localhost:8000/docs](http://localhost:8000/docs)
- **ReDoc Documentation**: [http://localhost:8000/redoc](http://localhost:8000/redoc)

---

### Option 2: Docker & Docker Compose (Containerized)
Run the entire decoupled stack with a single command:
```bash
# Build and start all containers in background
docker compose up -d

# Check container health and logs
docker compose ps
docker compose logs -f

# Stop all containers
docker compose down
```

---

### Option 3: Unified Monorepo CLI Commands
From the project root:
```bash
# Start frontend client in development mode
npm run dev

# Start FastAPI backend server
npm run backend

# Build production frontend bundle
npm run build

# Run full automated test suite across backend and frontend
npm test
```

---

## 🧪 Automated Testing Suite

EventRoute AI includes comprehensive automated testing:

```bash
# Run both Backend (pytest) and Frontend (vitest) tests
npm test

# Run backend test suite only (11 tests)
npm run test:backend

# Run frontend test suite only (5 tests)
npm run test:frontend
```

### Verified Test Cases:
* `test_health_check`: Verifies engine liveness & events count (19 total).
* `test_user_profile`: Validates Milind's profile and Delhi Technical Campus enrollment.
* `test_get_events_ranked`: Validates explainable hybrid scores, sorting order, and reason tags.
* `test_events_feedback_reranking`: Validates dynamic weights recalculation on user feedback.
* `test_shortlist_crud`: Tests swipe-to-discover shortlist persistence.
* `test_skill_gap_analysis`: Validates prerequisite matching and bridge courses.
* `test_od_templates`: Verifies all 16 institutional letterhead formats.
* `test_od_letter_generation_and_verification`: Tests SHA-256 anti-tamper QR code generation.
* `test_teammates_dtc_members`: Verifies Arman Chauhan, Anshika Tyagi, and Dimple.
* `test_assistant_chat_teammates_intent`: Tests conversational tool calling.
* `test_idea_validation`: Verifies heuristic novelty, feasibility, and alignment scoring.

---

## 🎨 UI & Design System

- **Palette**: Neural Universe Theme
  - **Canvas Background**: `#EEF2FE` with soft radial periwinkle glow
  - **Typography**: Midnight Navy `#10174D` with slate periwinkle subtitles `#525A8B`
  - **Accents**: Electric Indigo Gradient `from-[#5964FE] to-[#7B73FE]`
  - **Active Badges**: Periwinkle Pill `#DFE3FF` with `#434EEB` text
  - **Surfaces**: Frosted White Glass `bg-white/95 backdrop-blur-xl border-[#E2E7FA]`
- **Gesture Physics**: Real mouse-drag and mobile touch swipe with color feedback:
  - Swipe **RIGHT** $\rightarrow$ Green `SHORTLISTED` overlay
  - Swipe **LEFT** $\rightarrow$ Red `SKIPPED` overlay
  - Swipe **UP** $\rightarrow$ Electric Indigo `SKILL GAP` overlay

---

## 📡 REST API & Service Contract

| Tag | Method | Endpoint | Description |
| :--- | :--- | :--- | :--- |
| **System** | `GET` | `/api/health` | Service health telemetry and events count |
| **System** | `GET` | `/api/user/profile` | Student academic profile, skills, attendance |
| **Opportunities** | `GET` | `/api/events` | Explainable ranked events for Milind |
| **Opportunities** | `POST` | `/api/events/feedback` | Ingest swipe / feedback and trigger live reranking |
| **Shortlist** | `GET` | `/api/shortlist` | Fetch right-swiped shortlisted opportunities |
| **Shortlist** | `POST` | `/api/shortlist` | Persist an event into student shortlist |
| **Shortlist** | `DELETE` | `/api/shortlist/{event_id}` | Remove an event from shortlist |
| **Skill-Gap** | `GET` | `/api/events/{event_id}/skill-gap` | Prerequisite have vs missing skills breakdown |
| **OD Automation** | `GET` | `/api/od-letter/templates` | Institutional OD templates (all GGSIPU colleges) |
| **OD Automation** | `POST` | `/api/od-letter/generate` | Generate institutional OD leave letter with QR code |
| **OD Automation** | `GET` | `/api/od-letter/verify/{hash}` | Public cryptographic verification registry |
| **Teammates** | `GET` | `/api/teammates` | High-synergy teammates (Arman, Anshika, Dimple, etc.) |
| **Assistant** | `POST` | `/api/assistant/chat` | Conversational RAG assistant with agentic tool calling |
| **Idea Validator** | `POST` | `/api/ideas/validate` | AI hackathon concept feasibility & rubric scoring |

---

## 🔒 Zero-Dependency Resilience

The frontend features automatic backend detection. If the FastAPI backend is running on `:8000`, the frontend leverages server-side vector scoring and SQLite persistence. If running standalone via `npm run dev`, it seamlessly falls back to the client-side AI engine with zero downtime or broken states.
