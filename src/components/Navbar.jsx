import React from "react";
import { 
  Compass, 
  Calendar, 
  Users, 
  Briefcase, 
  Sparkles, 
  AlertTriangle, 
  Lightbulb, 
  PlayCircle,
  Sun,
  Moon
} from "lucide-react";
import { STUDENT_PROFILE } from "../data/initialEvents";

export default function Navbar({ 
  activeTab, 
  setActiveTab, 
  onStartDemoTour, 
  onOpenComparison,
  theme = "light",
  setTheme
}) {
  const isLight = theme === "light";

  return (
    <header className={`sticky top-0 z-40 backdrop-blur-md border-b transition-colors duration-200 ${
      isLight 
        ? "bg-white/90 border-[#E2E8F0] text-[#0F172A]" 
        : "bg-slate-950/80 border-slate-800 text-white"
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Platform Title */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab("feed")}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 via-teal-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-emerald-500/20">
              <Compass className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className={`font-display font-extrabold text-xl tracking-tight ${isLight ? "text-[#0F172A]" : "text-white"}`}>
                  EventRoute<span className="text-emerald-500">AI</span>
                </span>
                <span className={`text-[10px] uppercase font-bold px-1.5 py-0.5 rounded border ${
                  isLight 
                    ? "bg-emerald-50 text-emerald-700 border-emerald-200" 
                    : "bg-emerald-500/20 text-emerald-300 border-emerald-500/30"
                }`}>
                  Light Mode
                </span>
              </div>
              <p className={`text-[11px] -mt-0.5 hidden sm:block ${isLight ? "text-[#64748B]" : "text-slate-400"}`}>
                Explainable Opportunity Intelligence for Students
              </p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className={`hidden md:flex items-center gap-1 p-1 rounded-xl border ${
            isLight 
              ? "bg-[#F1F5F9] border-[#E2E8F0]" 
              : "bg-slate-900/60 border-slate-800/80"
          }`}>
            <button
              onClick={() => setActiveTab("feed")}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-semibold transition-all ${
                activeTab === "feed" 
                  ? isLight ? "bg-white text-emerald-700 shadow-sm border border-slate-200/60" : "bg-emerald-500 text-slate-950 shadow-sm"
                  : isLight ? "text-slate-600 hover:text-slate-900 hover:bg-slate-200/50" : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
              }`}
            >
              <Compass className="w-4 h-4 text-emerald-500" />
              Opportunities
            </button>

            <button
              onClick={() => setActiveTab("calendar")}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-semibold transition-all ${
                activeTab === "calendar" 
                  ? isLight ? "bg-white text-emerald-700 shadow-sm border border-slate-200/60" : "bg-emerald-500 text-slate-950 shadow-sm"
                  : isLight ? "text-slate-600 hover:text-slate-900 hover:bg-slate-200/50" : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
              }`}
            >
              <Calendar className="w-4 h-4 text-emerald-500" />
              Calendar & Clashes
            </button>

            <button
              onClick={() => setActiveTab("teammates")}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-semibold transition-all ${
                activeTab === "teammates" 
                  ? isLight ? "bg-white text-emerald-700 shadow-sm border border-slate-200/60" : "bg-emerald-500 text-slate-950 shadow-sm"
                  : isLight ? "text-slate-600 hover:text-slate-900 hover:bg-slate-200/50" : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
              }`}
            >
              <Users className="w-4 h-4 text-emerald-500" />
              Teammate Match
            </button>

            <button
              onClick={() => setActiveTab("portfolio")}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-semibold transition-all ${
                activeTab === "portfolio" 
                  ? isLight ? "bg-white text-emerald-700 shadow-sm border border-slate-200/60" : "bg-emerald-500 text-slate-950 shadow-sm"
                  : isLight ? "text-slate-600 hover:text-slate-900 hover:bg-slate-200/50" : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
              }`}
            >
              <Briefcase className="w-4 h-4 text-emerald-500" />
              Portfolio
            </button>

            <button
              onClick={() => setActiveTab("validator")}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-semibold transition-all ${
                activeTab === "validator" 
                  ? isLight ? "bg-white text-emerald-700 shadow-sm border border-slate-200/60" : "bg-emerald-500 text-slate-950 shadow-sm"
                  : isLight ? "text-slate-600 hover:text-slate-900 hover:bg-slate-200/50" : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
              }`}
            >
              <Lightbulb className="w-4 h-4 text-amber-500" />
              Idea Validator
            </button>
          </nav>

          {/* Action CTAs & Student Status */}
          <div className="flex items-center gap-3">
            
            {/* Theme Toggle Button */}
            <button
              onClick={() => setTheme && setTheme(isLight ? "dark" : "light")}
              className={`p-2 rounded-xl border transition ${
                isLight 
                  ? "bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200" 
                  : "bg-slate-900 border-slate-800 text-amber-400 hover:bg-slate-800"
              }`}
              title={isLight ? "Switch to Dark Mode" : "Switch to Clean Light Mode"}
            >
              {isLight ? <Moon className="w-4 h-4 text-slate-700" /> : <Sun className="w-4 h-4 text-amber-400" />}
            </button>

            {/* Judge Demo Tour CTA */}
            <button
              onClick={onStartDemoTour}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-lg shadow-emerald-400/20 transition-all transform active:scale-95 cursor-pointer"
            >
              <PlayCircle className="w-4 h-4" />
              Judges Demo Tour
            </button>

            {/* Attendance Caution Pill */}
            <div className={`hidden lg:flex items-center gap-2 px-2.5 py-1 rounded-lg border text-xs font-semibold ${
              isLight 
                ? "bg-amber-50 border-amber-200 text-amber-800" 
                : "bg-amber-500/10 border-amber-500/30 text-amber-400"
            }`}>
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>{STUDENT_PROFILE.attendance_rate}% Attendance</span>
            </div>

            {/* Profile Avatar */}
            <div className={`flex items-center gap-2.5 pl-2 border-l ${isLight ? "border-slate-200" : "border-slate-800"}`}>
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white text-xs font-bold ring-2 ring-emerald-500/30">
                ML
              </div>
              <div className="hidden xl:block text-left">
                <p className={`text-xs font-bold ${isLight ? "text-[#0F172A]" : "text-slate-200"}`}>
                  {STUDENT_PROFILE.name}
                </p>
                <p className={`text-[10px] ${isLight ? "text-slate-500" : "text-slate-400"}`}>
                  2nd Yr CSE · TSEC
                </p>
              </div>
            </div>

          </div>

        </div>
      </div>
    </header>
  );
}
