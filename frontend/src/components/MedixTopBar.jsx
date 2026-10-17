import React from "react";
import { 
  Bell, 
  Settings, 
  PlayCircle, 
  Compass, 
  ShieldCheck,
  Search,
  Flame,
  BookmarkCheck
} from "lucide-react";
import { STUDENT_PROFILE } from "../data/initialEvents";

export default function MedixTopBar({ 
  activeTab, 
  setActiveTab, 
  onStartDemoTour,
  shortlistCount = 0
}) {
  return (
    <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-xl border-b border-[#E2E7FA] px-4 sm:px-8 py-3 flex items-center justify-between select-none shadow-[0_2px_15px_rgba(89,100,254,0.03)]">
      
      {/* Left: Mobile Brand & Tagline */}
      <div className="flex items-center gap-3">
        <div className="lg:hidden flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#5964FE] to-[#7B73FE] text-white flex items-center justify-center">
            <Compass className="w-4 h-4 stroke-[2.5]" />
          </div>
          <span className="font-display font-extrabold text-base text-[#10174D]">EventRoute</span>
        </div>

        {/* Center-Left Segmented Pill Tabs */}
        <div className="hidden sm:flex items-center gap-1 bg-[#EEF2FE] p-1 rounded-2xl border border-[#DCE3F9]">
          <button
            onClick={() => setActiveTab("feed")}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
              activeTab === "feed"
                ? "bg-white text-[#10174D] shadow-xs"
                : "text-[#525A8B] hover:text-[#10174D]"
            }`}
          >
            Dashboard
          </button>

          <button
            onClick={() => setActiveTab("swipe")}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
              activeTab === "swipe"
                ? "bg-gradient-to-r from-[#5964FE] to-[#8C6DFE] text-white shadow-xs"
                : "text-[#5964FE] hover:bg-[#DFE3FF]/50"
            }`}
          >
            <Flame className="w-3.5 h-3.5 fill-[#5964FE] text-[#5964FE]" />
            <span>Swipe Deck</span>
          </button>

          <button
            onClick={() => setActiveTab("shortlist")}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
              activeTab === "shortlist"
                ? "bg-[#5964FE] text-white shadow-xs"
                : "text-[#434EEB] hover:bg-[#DFE3FF]/50"
            }`}
          >
            <BookmarkCheck className="w-3.5 h-3.5" />
            <span>Shortlist</span>
            {shortlistCount > 0 && (
              <span className={`text-[10px] font-extrabold px-1.5 py-0.2 rounded-full ${
                activeTab === "shortlist" ? "bg-white text-[#434EEB]" : "bg-[#DFE3FF] text-[#434EEB]"
              }`}>
                {shortlistCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab("opportunities")}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
              activeTab === "opportunities"
                ? "bg-white text-[#10174D] shadow-xs"
                : "text-[#525A8B] hover:text-[#10174D]"
            }`}
          >
            Opportunities
          </button>

          <button
            onClick={() => setActiveTab("calendar")}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
              activeTab === "calendar"
                ? "bg-white text-[#10174D] shadow-xs"
                : "text-[#525A8B] hover:text-[#10174D]"
            }`}
          >
            Exam Guard
          </button>

          <button
            onClick={() => setActiveTab("od_letters")}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
              activeTab === "od_letters"
                ? "bg-white text-[#10174D] shadow-xs"
                : "text-[#525A8B] hover:text-[#10174D]"
            }`}
          >
            OD Portal
          </button>
        </div>
      </div>

      {/* Right Actions & Milind Profile Badge */}
      <div className="flex items-center gap-3">
        
        {/* Judges Demo Tour Button */}
        <button
          onClick={onStartDemoTour}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-[#5964FE] to-[#7B73FE] hover:opacity-90 text-white font-bold text-xs uppercase tracking-wider shadow-sm shadow-[#5964FE]/20 transition active:scale-95 cursor-pointer"
        >
          <PlayCircle className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Judges Demo Tour</span>
        </button>

        {/* Notifications Icon with dot */}
        <div className="relative cursor-pointer p-2 rounded-xl text-[#525A8B] hover:bg-[#EEF2FE] hover:text-[#10174D] transition">
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#5964FE] ring-2 ring-white"></span>
        </div>

        {/* Settings Icon */}
        <button 
          onClick={() => alert("Settings & Preferences")}
          className="p-2 rounded-xl text-[#525A8B] hover:bg-[#EEF2FE] hover:text-[#10174D] transition cursor-pointer"
        >
          <Settings className="w-4 h-4" />
        </button>

        {/* Milind Profile Badge */}
        <div className="flex items-center gap-2.5 pl-2 border-l border-[#E2E7FA]">
          <div className="w-9 h-9 rounded-full bg-[#DFE3FF] text-[#434EEB] font-extrabold text-xs flex items-center justify-center ring-2 ring-[#5964FE]/30 shadow-xs">
            ML
          </div>
          <div className="text-left hidden md:block">
            <p className="text-xs font-extrabold text-[#10174D] leading-tight">
              {STUDENT_PROFILE.name}
            </p>
            <p className="text-[10px] text-[#5964FE] font-bold leading-tight flex items-center gap-1">
              <span>Delhi Technical Campus (GGSIPU)</span>
            </p>
          </div>
        </div>

      </div>

    </header>
  );
}
