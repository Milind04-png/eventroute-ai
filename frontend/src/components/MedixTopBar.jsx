import React from "react";
import { 
  Bell, 
  PlayCircle, 
  Compass, 
  Search
} from "lucide-react";
import { STUDENT_PROFILE } from "../data/initialEvents";

export default function MedixTopBar({ 
  searchQuery = "",
  setSearchQuery,
  onStartDemoTour
}) {
  return (
    <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-xl border-b border-[#E2E7FA] px-4 sm:px-8 py-3 flex items-center justify-between select-none shadow-[0_2px_15px_rgba(89,100,254,0.03)] gap-4">
      
      {/* Left: Mobile Brand & Tagline */}
      <div className="flex items-center gap-3 shrink-0">
        <div className="lg:hidden flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#0F172A] to-[#1E293B] text-white flex items-center justify-center shadow-xs">
            <Compass className="w-4 h-4 stroke-[2.5] text-indigo-400" />
          </div>
          <span className="font-display font-extrabold text-base text-[#10174D]">EventRoute</span>
        </div>
      </div>

      {/* Center: Clean Single Search Bar */}
      <div className="flex-1 max-w-lg">
        <div className="relative flex items-center w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery && setSearchQuery(e.target.value)}
            placeholder="Search hackathons, colleges, tech stack..."
            className="w-full pl-9 pr-8 py-2 rounded-xl bg-slate-100/90 hover:bg-slate-100 focus:bg-white text-xs font-medium text-slate-900 placeholder:text-slate-400 border border-slate-200/90 focus:border-slate-800 focus:ring-2 focus:ring-slate-200 transition-all outline-none"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery && setSearchQuery("")}
              className="absolute right-3 text-slate-400 hover:text-slate-600 text-xs font-bold cursor-pointer"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Right Actions: Judges Demo, Notifications & Milind Profile Badge */}
      <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
        
        {/* Judges Demo Tour Button (Warm Amber Accent) */}
        <button
          onClick={onStartDemoTour}
          className="flex items-center gap-1.5 px-3.5 sm:px-4 py-2 rounded-xl bg-[#C27803] hover:bg-[#A16207] text-white font-extrabold text-xs uppercase tracking-wider shadow-sm shadow-amber-900/20 transition active:scale-95 cursor-pointer"
        >
          <PlayCircle className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Judges Demo Tour</span>
          <span className="sm:hidden">Demo</span>
        </button>

        {/* Notifications Icon with dot */}
        <div className="relative cursor-pointer p-2 rounded-xl text-[#525A8B] hover:bg-slate-100 hover:text-[#10174D] transition">
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-white"></span>
        </div>

        {/* Milind Profile Badge */}
        <div className="flex items-center gap-2.5 pl-2 border-l border-slate-200">
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#0F172A] text-white font-extrabold text-xs flex items-center justify-center ring-2 ring-slate-300 shadow-xs">
            ML
          </div>
          <div className="text-left hidden md:block">
            <p className="text-xs font-extrabold text-[#10174D] leading-tight">
              {STUDENT_PROFILE.name}
            </p>
            <p className="text-[10px] text-slate-500 font-bold leading-tight">
              Delhi Technical Campus (GGSIPU)
            </p>
          </div>
        </div>

      </div>

    </header>
  );
}
