# EventRoute AI: Explainable Opportunity Intelligence for Students

> **Tagline**: The Intelligent Co-Pilot that matches Indian college students with hackathons, workshops, and career opportunities using explainable AI, collision-aware calendar sync, and automated academic On-Duty (OD) leave approvals.

---

## 🌟 The Core Problems We Solve

1. **Information Fragmentation & Noise**: College hackathons, technical conferences, and workshops in India are scattered across WhatsApp groups, posters, Devfolio, Unstop, and Luma.
2. **Blind Registrations vs. Semester Exam Clashes**: Students register for hackathons without knowing their college will hold internal lab exams on that exact weekend, forcing costly forfeits.
3. **The 75% Attendance & OD Bureaucracy**: Indian universities (Mumbai University, VTU, Anna University, AKTU) strictly enforce attendance rules. Getting signed On-Duty (OD) leave letters is a painful, slow process prone to departmental rejection.
4. **Black-Box "Recommendations"**: Existing platforms use opaque sponsored promotion rather than explainable fit based on verified student skills.

---

## 🚀 Priority Build Order Execution

The project strictly follows the **Build Order (Priority)** specification:

```
Unified calendar + "worth it?" score
  ↳ Semantic matching + explainable scores
      ↳ Recommendation feedback loop (RLUF dynamic rerank)
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
   * Watch the tool-calling loop check Rahul's timetable $\rightarrow$ detects internal DBMS lab exam on Oct 24 $\rightarrow$ filters out *Web3 DeFi Sprint* $\rightarrow$ recommends *HackAI Pune* (starts Sunday, 94% fit, zero clash).
2. **Step 2: Explainable Skill-Gap Breakdown**
   * Click **"Skill Gap"** on HackAI Pune.
   * See verified skills (Python, FastAPI, React) vs missing prerequisites (PyTorch) with a curated 3-hour fast-track learning module.
3. **Step 3: Dynamic Feedback Reranking**
   * Click $\mathbf{\downarrow}$ (Downvote) on *Web3 DeFi Sprint* with tag *"Not interested in Web3"*.
   * Watch real-time Reinforcement Learning from User Feedback (RLUF) dynamically penalize Web3 tags (-65%) and boost AI/Cloud (+30%) before your eyes!
4. **Step 4: Instant Academic OD Leave Letter**
   * Click **"Generate OD Letter"**.
   * Instant printable, university-formatted formal letterhead for Mumbai University / VTU with Dean/HOD salutation and an anti-tamper verification QR code.
5. **Step 5: Semantic vs. Keyword Comparison Table**
   * Displays the closing proof comparison table contrasting legacy portals (Unstop/Devfolio) with EventRoute AI.

---

## 🛠️ Tech Stack & Architecture

* **Frontend**: React 19, Vite, Tailwind CSS v4, Lucide React, Canvas Confetti.
* **Backend**: FastAPI (Python 3.12), SQLite ACID transactions, Uvicorn, Pydantic schemas.
* **AI / ML Layer**:
  * Semantic TF-IDF & Cosine Similarity vector engine.
  * Deterministic Schedule Collision Detection algorithm.
  * Real-time Feedback Weight Modulator (Dynamic Reranking).
  * Agentic Tool-Calling RAG Assistant (`query_calendar`, `filter_events`, `calculate_skill_gap`, `generate_od_letter`, `match_teammates`).
* **Zero-Dependency Resilience**: The frontend automatically checks for backend health (`/api/health`); if running standalone via `npm run dev`, it falls back seamlessly to the client-side AI engine without missing a beat!

---

## ⚡ Quickstart & Running Locally

### Option 1: Quick Frontend Launcher (Instant)
```bash
# 1. Navigate to the project directory
cd C:\Users\milin\.gemini\antigravity\scratch\eventroute-ai

# 2. Install dependencies
npm install

# 3. Launch Vite Dev Server
npm run dev
```
Open **[http://localhost:3000](http://localhost:3000)** in your browser.

### Option 2: Full-Stack (Frontend + FastAPI Backend)
Double-click `run.bat` or run:
```bash
# In terminal 1 (FastAPI backend):
pip install -r backend/requirements.txt
python backend/main.py

# In terminal 2 (Vite frontend):
npm run dev
```
Backend API interactive docs: **[http://localhost:8000/docs](http://localhost:8000/docs)**.

---

## 📂 Project Directory Structure

```
eventroute-ai/
├── backend/
│   ├── main.py                # FastAPI REST endpoints
│   ├── ai_engine.py           # Semantic matching, clash detection & dynamic reranking
│   ├── od_generator.py        # University OD letter generation & cryptographic hashing
│   ├── assistant.py           # Conversational RAG assistant with tool calling
│   ├── mock_data.py           # Student persona (Rahul), exams, 8+ realistic events
│   ├── database.py            # SQLite persistent logs and letters
│   └── requirements.txt       # Python dependencies
├── src/
│   ├── components/
│   │   ├── Navbar.jsx             # Header with attendance warning & Demo Tour CTA
│   │   ├── EventCard.jsx          # Event card with explainable match & clash flags
│   │   ├── EventDetailModal.jsx   # Detailed agenda & explainability attributions
│   │   ├── SkillGapModal.jsx      # Have vs Missing skills + learning vault
│   │   ├── CalendarView.jsx       # Academic exams vs hackathons + Burnout Guard
│   │   ├── OdLetterModal.jsx      # University printable OD letter with QR code
│   │   ├── AssistantChatbot.jsx   # Conversational co-pilot with tool execution logs
│   │   ├── TeammateMatcher.jsx    # Cross-college complementary skill synergy
│   │   ├── IdeaValidatorModal.jsx # Hackathon pitch novelty & feasibility scorer
│   │   ├── PortfolioView.jsx      # Verified student portfolio & recruiter mode
│   │   ├── DemoWalkthrough.jsx    # The 5-step Judge Pitch Tour bar
│   │   └── ComparisonModal.jsx    # Keyword vs Semantic side-by-side table
│   ├── data/
│   │   └── initialEvents.js       # Client data store for zero-downtime offline mode
│   ├── services/
│   │   ├── api.js                 # Unified API service with backend health detector
│   │   └── aiEngine.js            # Client-side AI engine for instant offline execution
│   ├── App.jsx                    # Core application state & reranking controller
│   ├── main.jsx                   # React 19 entry point
│   └── index.css                  # Tailwind CSS v4 & print formatting
├── dev.bat                        # Frontend launcher
├── run.bat                        # Fullstack launcher
├── run.ps1                        # PowerShell runner
├── package.json                   # NPM dependencies
└── vite.config.js                 # Vite configuration
```
