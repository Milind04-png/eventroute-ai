import React from "react";
import { Compass, Calendar, Users, Briefcase, Sparkles, AlertTriangle, Lightbulb, PlayCircle } from "lucide-react";
import { STUDENT_PROFILE } from "../data/initialEvents";

export default function Navbar({ activeTab, setActiveTab, onStartDemoTour, onOpenComparison }) {
  return (
    <header className="sticky top-0 z-40 bg-slate-950/80 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Platform Title */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab("feed")}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-emerald-400 flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <Compass className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-display font-bold text-xl tracking-tight text-white">EventRoute<span className="text-indigo-400">AI</span></span>
                <span className="text-[10px] uppercase font-semibold px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">Beta</span>
              </div>
              <p className="text-[11px] text-slate-400 -mt-0.5 hidden sm:block">Explainable Opportunity Intelligence for Students</p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-900/60 p-1 rounded-xl border border-slate-800/80">
            <button
              onClick={() => setActiveTab("feed")}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                activeTab === "feed" 
                  ? "bg-indigo-600 text-white shadow-sm" 
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
              }`}
            >
              <Compass className="w-4 h-4" />
              Opportunities
            </button>

            <button
              onClick={() => setActiveTab("calendar")}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                activeTab === "calendar" 
                  ? "bg-indigo-600 text-white shadow-sm" 
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
              }`}
            >
              <Calendar className="w-4 h-4" />
              Calendar & Clashes
            </button>

            <button
              onClick={() => setActiveTab("teammates")}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                activeTab === "teammates" 
                  ? "bg-indigo-600 text-white shadow-sm" 
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
              }`}
            >
              <Users className="w-4 h-4" />
              Teammate Match
            </button>

            <button
              onClick={() => setActiveTab("portfolio")}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                activeTab === "portfolio" 
                  ? "bg-indigo-600 text-white shadow-sm" 
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
              }`}
            >
              <Briefcase className="w-4 h-4" />
              Portfolio
            </button>

            <button
              onClick={() => setActiveTab("validator")}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                activeTab === "validator" 
                  ? "bg-indigo-600 text-white shadow-sm" 
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
              }`}
            >
              <Lightbulb className="w-4 h-4 text-amber-400" />
              Idea Validator
            </button>
          </nav>

          {/* Action CTAs & Student Status */}
          <div className="flex items-center gap-3">
            
            {/* Judge Demo Tour CTA */}
            <button
              onClick={onStartDemoTour}
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-lg shadow-emerald-500/20 transition-all transform active:scale-95"
            >
              <PlayCircle className="w-4 h-4" />
              Judges Demo Tour
            </button>

            {/* Attendance Caution Pill */}
            <div className="hidden lg:flex items-center gap-2 px-2.5 py-1 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs">
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>{STUDENT_PROFILE.attendance_rate}% Attendance</span>
            </div>

            {/* Profile Avatar */}
            <div className="flex items-center gap-2.5 pl-2 border-l border-slate-800">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold ring-2 ring-indigo-500/30">
                RS
              </div>
              <div className="hidden xl:block text-left">
                <p className="text-xs font-semibold text-slate-200">{STUDENT_PROFILE.name}</p>
                <p className="text-[10px] text-slate-400">3rd Yr CSE · TSEC</p>
              </div>
            </div>

          </div>

        </div>
      </div>
    </header>
  );
}
