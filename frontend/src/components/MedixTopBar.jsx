import React from "react";
import { 
  Bell, 
  Settings, 
  PlayCircle, 
  Compass, 
  ShieldCheck,
  Search,
  Flame,
  BookmarkCheck,
  HardDrive,
  Sparkles
} from "lucide-react";
import { STUDENT_PROFILE } from "../data/initialEvents";

export default function MedixTopBar({ 
  activeTab, 
  setActiveTab, 
  onStartDemoTour,
  shortlistCount = 0,
  onOpenLocalStorageFiles,
  onOpenChat
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
        <div className="hidden sm:flex items-center gap-1 bg-slate-100/90 p-1 rounded-2xl border border-slate-200/90">
          <button
            onClick={() => setActiveTab("feed")}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
              activeTab === "feed"
                ? "bg-white text-slate-900 shadow-xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Dashboard
          </button>

          <button
            onClick={() => setActiveTab("swipe")}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
              activeTab === "swipe"
                ? "bg-white text-slate-900 shadow-xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <Flame className="w-3.5 h-3.5 text-indigo-600 fill-indigo-600" />
            <span>Swipe Deck</span>
          </button>

          <button
            onClick={() => setActiveTab("shortlist")}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
              activeTab === "shortlist"
                ? "bg-white text-slate-900 shadow-xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <BookmarkCheck className="w-3.5 h-3.5 text-slate-700" />
            <span>Shortlist</span>
            {shortlistCount > 0 && (
              <span className={`text-[10px] font-extrabold px-1.5 py-0.2 rounded-full ${
                activeTab === "shortlist" ? "bg-slate-900 text-white" : "bg-slate-200 text-slate-800"
              }`}>
                {shortlistCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab("opportunities")}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
              activeTab === "opportunities"
                ? "bg-white text-slate-900 shadow-xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Opportunities
          </button>

          <button
            onClick={() => setActiveTab("calendar")}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
              activeTab === "calendar"
                ? "bg-white text-slate-900 shadow-xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Exam Guard
          </button>

          <button
            onClick={() => setActiveTab("od_letters")}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
              activeTab === "od_letters"
                ? "bg-white text-slate-900 shadow-xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            OD Portal
          </button>

          <button
            onClick={onOpenChat}
            className="px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer text-slate-600 hover:text-slate-900 hover:bg-white/60"
          >
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
            <span>AI Co-Pilot</span>
          </button>
        </div>
      </div>

      {/* Right Actions & Milind Profile Badge */}
      <div className="flex items-center gap-2.5">
        
        {/* Judges Demo Tour Button (Warm Amber Accent as in screenshot) */}
        <button
          onClick={onStartDemoTour}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#C27803] hover:bg-[#A16207] text-white font-extrabold text-xs uppercase tracking-wider shadow-sm shadow-amber-900/20 transition active:scale-95 cursor-pointer"
        >
          <PlayCircle className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Judges Demo Tour</span>
        </button>

        {/* Local Storage Files Button */}
        <button
          onClick={onOpenLocalStorageFiles}
          className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-xs font-bold text-slate-700 shadow-xs transition active:scale-95 cursor-pointer"
          title="View files downloaded and stored in local storage"
        >
          <HardDrive className="w-3.5 h-3.5 text-slate-600" />
          <span className="hidden lg:inline">Local Storage Files</span>
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
