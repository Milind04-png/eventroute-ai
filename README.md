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
│   ├── public/                   # College logos (DTC, IIT Bombay, BITS, COEP, etc.)
│   ├── src/
│   │   ├── components/           # UI components (Swipe Deck, Feed, Chatbot, Modals)
│   │   ├── data/                 # Client offline cache & initial datasets
│   │   ├── services/             # API client & offline fallback AI engine
│   │   ├── App.jsx               # Application controller & RLUF reranker
│   │   ├── index.css             # Tailwind CSS tokens & Neural Universe palette
│   │   └── main.jsx              # React DOM bootstrap
│   ├── index.html                # Single Page App HTML shell
│   ├── vite.config.js            # Vite build & backend proxy (/api -> :8000)
│   ├── package.json              # Frontend package manifest
│   ├── package-lock.json         # Frontend locked dependencies
│   └── README.md                 # Frontend-specific documentation
│
├── backend/                      # Dedicated FastAPI Python Server
│   ├── main.py                   # REST API routes & CORS middleware
│   ├── ai_engine.py              # Semantic matching, collision detection & RLUF
│   ├── assistant.py              # Agentic tool-calling RAG chatbot
│   ├── database.py               # SQLite persistence layer (WAL mode)
│   ├── mock_data.py              # Student profile (Milind, DTC), exams, events
│   ├── od_generator.py           # Institutional OD letter compiler & SHA-256 signer
│   ├── requirements.txt          # Python package requirements
│   ├── run_backend.bat           # Standalone backend Windows launcher
│   ├── run_backend.ps1           # Standalone backend PowerShell launcher
│   └── README.md                 # Backend API documentation & schema guide
│
├── package.json                  # Monorepo root workspace & script orchestrator
├── run.bat                       # 1-Click full-stack launcher (Windows)
├── run.ps1                       # 1-Click full-stack launcher (PowerShell)
├── dev.bat                       # Frontend-only dev launcher
├── .gitignore                    # Monorepo git ignore rules
└── README.md                     # Master documentation (this file)
```

---

## ⚡ Quickstart & Running the Application

### Option 1: One-Click Full-Stack (Recommended)
Double-click `run.bat` or run in PowerShell:
```powershell
.\run.ps1
```
This automatically starts:
- **Frontend App**: [http://localhost:3000](http://localhost:3000)
- **FastAPI Backend**: [http://localhost:8000](http://localhost:8000)
- **Interactive API Docs**: [http://localhost:8000/docs](http://localhost:8000/docs)

---

### Option 2: Running via Root Monorepo Commands
From the project root:
```bash
# Start frontend client (via npm workspaces)
npm run dev

# Start backend server
npm run backend

# Production frontend build
npm run build
```

---

### Option 3: Running Separately in Dedicated Terminals

#### Terminal 1 — Frontend Client:
```bash
cd frontend
npm install
npm run dev
```

#### Terminal 2 — FastAPI Backend:
```bash
cd backend
pip install -r requirements.txt
python main.py
```

---

## 🚀 Priority Build Order Execution

The project strictly follows the **Build Order (Priority)** specification:

```
Unified calendar + "worth it?" score
  ↳ Semantic matching + explainable scores
      ↳ Recommendation feedback loop (RLUF dynamic rerank)
          ↳ Tinder-style Swipe-to-Discover deck (Physics + Directional Overlays)
              ↳ Skill-gap analysis (have vs missing + 2-hour crash courses)
                  ↳ AI chatbot (EventRoute Assistant with RAG + tool calling)
                      ↳ Teammate matching (cross-college synergy)
                          ↳ Auto-built portfolio & OD letter generator
```

---

## 🏆 Judge / Investor Pitch Demo Flow (Step-by-Step)

The application includes a built-in **"Judges Demo Tour"** bar that executes the 5-step demo flow requested in Section 14:

1. **Step 1: Exam-Aware AI Assistant**
   * Ask the chatbot: *"Find me an AI hackathon this weekend that won't clash with my exams"*
   * Watch the tool-calling loop check Milind's timetable $\rightarrow$ detects internal DBMS lab exam on Oct 24 $\rightarrow$ filters out *Web3 DeFi Sprint* $\rightarrow$ recommends *HackAI Pune* (starts Sunday, 94% fit, zero clash).
2. **Step 2: Explainable Skill-Gap Breakdown**
   * Click **"Skill Gap"** on HackAI Pune (or swipe UP on the card).
   * See verified skills (Python, FastAPI, React) vs missing prerequisites (PyTorch) with a curated 3-hour fast-track learning module.
3. **Step 3: Dynamic Feedback Reranking**
   * Swipe LEFT (Skip) or click $\mathbf{\downarrow}$ on *Web3 DeFi Sprint* with tag *"Not interested in Web3"*.
   * Watch real-time Reinforcement Learning from User Feedback (RLUF) dynamically penalize Web3 tags (-65%) and boost AI/Cloud (+30%) before your eyes!
4. **Step 4: Instant Academic OD Leave Letter**
   * Click **"Generate OD Letter"**.
   * Instant printable, university-formatted formal letterhead for Delhi Technical Campus / GGSIPU / Mumbai University with Dean/HOD salutation and an anti-tamper verification QR code.
5. **Step 5: Semantic vs. Keyword Comparison Table**
   * Displays the closing proof comparison table contrasting legacy portals (Unstop/Devfolio) with EventRoute AI.

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

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/health` | Health check and backend status |
| `GET` | `/api/events` | Explainable ranked events for Milind |
| `GET` | `/api/profile` | Student academic profile, skills, attendance |
| `GET` | `/api/calendar` | Synchronized academic exam schedule & clashes |
| `GET` | `/api/skill-gap/{event_id}` | Prerequisite have vs missing skills breakdown |
| `POST` | `/api/feedback` | Ingest swipe / feedback and trigger live reranking |
| `POST` | `/api/od-letter/generate` | Generate institutional OD leave letter with QR code |
| `GET` | `/api/od-letter/verify/{hash}` | Public cryptographic verification registry |
| `POST` | `/api/chat` | Conversational RAG assistant with agentic tool calling |
| `POST` | `/api/validate-idea` | AI hackathon concept feasibility & rubric scoring |

---

## 🔒 Zero-Dependency Resilience

The frontend features automatic backend detection. If the FastAPI backend is running on `:8000`, the frontend leverages server-side vector scoring and SQLite persistence. If running standalone via `npm run dev`, it seamlessly falls back to the client-side AI engine with zero downtime or broken states.
