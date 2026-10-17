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
    <header className="sticky top-0 z-40 backdrop-blur-xl bg-white/90 border-b border-[#E2E7FA] text-[#10174D]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Platform Title */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab("feed")}>
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#5964FE] via-[#7B73FE] to-[#9B8CFF] flex items-center justify-center shadow-lg shadow-[#5964FE]/20">
              <Compass className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-display font-extrabold text-xl tracking-tight text-[#10174D]">
                  EventRoute<span className="text-[#5964FE]">AI</span>
                </span>
                <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-[#DFE3FF] text-[#434EEB] border border-[#C7D2FE]">
                  Neural UI
                </span>
              </div>
              <p className="text-[11px] -mt-0.5 hidden sm:block text-[#525A8B] font-medium">
                Explainable Opportunity Intelligence for Students
              </p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 p-1 rounded-2xl border border-[#DCE3F9] bg-[#F8FAFF]">
            <button
              onClick={() => setActiveTab("feed")}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === "feed" 
                  ? "bg-white text-[#434EEB] shadow-sm border border-[#C7D2FE]" 
                  : "text-[#525A8B] hover:text-[#10174D] hover:bg-[#EEF2FE]"
              }`}
            >
              <Compass className="w-4 h-4 text-[#5964FE]" />
              Opportunities
            </button>

            <button
              onClick={() => setActiveTab("calendar")}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === "calendar" 
                  ? "bg-white text-[#434EEB] shadow-sm border border-[#C7D2FE]" 
                  : "text-[#525A8B] hover:text-[#10174D] hover:bg-[#EEF2FE]"
              }`}
            >
              <Calendar className="w-4 h-4 text-[#5964FE]" />
              Calendar & Clashes
            </button>

            <button
              onClick={() => setActiveTab("teammates")}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === "teammates" 
                  ? "bg-white text-[#434EEB] shadow-sm border border-[#C7D2FE]" 
                  : "text-[#525A8B] hover:text-[#10174D] hover:bg-[#EEF2FE]"
              }`}
            >
              <Users className="w-4 h-4 text-[#5964FE]" />
              Teammate Match
            </button>

            <button
              onClick={() => setActiveTab("portfolio")}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === "portfolio" 
                  ? "bg-white text-[#434EEB] shadow-sm border border-[#C7D2FE]" 
                  : "text-[#525A8B] hover:text-[#10174D] hover:bg-[#EEF2FE]"
              }`}
            >
              <Briefcase className="w-4 h-4 text-[#5964FE]" />
              Portfolio
            </button>

            <button
              onClick={() => setActiveTab("validator")}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === "validator" 
                  ? "bg-white text-[#434EEB] shadow-sm border border-[#C7D2FE]" 
                  : "text-[#525A8B] hover:text-[#10174D] hover:bg-[#EEF2FE]"
              }`}
            >
              <Lightbulb className="w-4 h-4 text-amber-500" />
              Idea Validator
            </button>
          </nav>

          {/* Action CTAs & Student Status */}
          <div className="flex items-center gap-3">
            
            {/* Judge Demo Tour CTA */}
            <button
              onClick={onStartDemoTour}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-gradient-to-r from-[#5964FE] to-[#7B73FE] hover:opacity-90 text-white font-bold text-xs uppercase tracking-wider shadow-md shadow-[#5964FE]/20 transition-all transform active:scale-95 cursor-pointer"
            >
              <PlayCircle className="w-4 h-4" />
              Judges Demo Tour
            </button>

            {/* Attendance Caution Pill */}
            <div className="hidden lg:flex items-center gap-2 px-2.5 py-1 rounded-xl border border-amber-200 bg-amber-50 text-amber-800 text-xs font-semibold">
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>{STUDENT_PROFILE.attendance_rate}% Attendance</span>
            </div>

            {/* Profile Avatar */}
            <div className="flex items-center gap-2.5 pl-2 border-l border-[#E2E7FA]">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#5964FE] to-[#7B73FE] flex items-center justify-center text-white text-xs font-bold ring-2 ring-[#DFE3FF]">
                ML
              </div>
              <div className="hidden xl:block text-left">
                <p className="text-xs font-bold text-[#10174D]">
                  {STUDENT_PROFILE.name}
                </p>
                <p className="text-[10px] text-[#525A8B]">
                  2nd Yr CSE · DTC
                </p>
              </div>
            </div>

          </div>

        </div>
      </div>
    </header>
  );
}
