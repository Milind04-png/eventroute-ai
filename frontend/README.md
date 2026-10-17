# EventRoute AI — Frontend Application

React 19 + Vite single page application with modern Neural Universe styling, Tinder-style Swipe-to-Discover gesture interaction deck, explainable recommendation feeds, academic calendar collision visualization, and automated On-Duty (OD) attendance leave generator.

---

## ⚡ Tech Stack

- **Framework**: React 19 + Vite 6
- **Styling**: Tailwind CSS v4 (`@tailwindcss/vite`)
- **Gestures & Animations**: Framer Motion (touch drag + mouse physics + real-time directional feedback overlays)
- **Icons**: Lucide React
- **Celebrations**: Canvas Confetti
- **Theme Palette**: Neural Universe (Periwinkle `#EEF2FE` canvas, Electric Indigo `#5964FE` to `#7B73FE` buttons & accents, Midnight Navy `#10174D` typography, Frosted White Glass cards)

---

## 🚀 Running Standalone

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Vite Development Server
```bash
npm run dev
```

The frontend will run at **[http://localhost:3000](http://localhost:3000)**.

### 3. Production Build
```bash
npm run build
```

---

## 📂 Frontend Directory Structure

```
frontend/
├── public/                # Static assets, institutional college crests (DTC, IIT Bombay, etc.)
├── src/
│   ├── components/        # UI components (Sidebar, TopBar, SwipeDeck, Chatbot, Modals)
│   ├── data/              # Default initial events, mock student persona, and exam schedules
│   ├── services/          # API layer and client-side fallback AI engine
│   ├── App.jsx            # Top-level state, dynamic RLUF reranking coordinator
│   ├── main.jsx           # Application entrypoint
│   └── index.css          # Global styling, Tailwind tokens, print styles
├── index.html             # HTML entrypoint
├── vite.config.js         # Vite configuration with proxy to FastAPI (port 8000)
├── package.json           # Frontend package manifests
└── package-lock.json      # Dependency lockfile
```
