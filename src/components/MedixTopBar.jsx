import React from "react";
import { 
  Bell, 
  Settings, 
  AlertTriangle, 
  PlayCircle, 
  Compass, 
  ShieldCheck,
  Search
} from "lucide-react";
import { STUDENT_PROFILE } from "../data/initialEvents";

export default function MedixTopBar({ 
  activeTab, 
  setActiveTab, 
  onStartDemoTour, 
  onOpenEmergencyOD 
}) {
  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-[#E2E8F0] px-4 sm:px-8 py-3 flex items-center justify-between select-none">
      
      {/* Left: Mobile Brand & Tagline */}
      <div className="flex items-center gap-3">
        <div className="lg:hidden flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-emerald-500 text-white flex items-center justify-center">
            <Compass className="w-4 h-4" />
          </div>
          <span className="font-display font-extrabold text-base text-[#0F172A]">EventRoute</span>
        </div>

        {/* Center-Left Segmented Pill Tabs */}
        <div className="hidden sm:flex items-center gap-1 bg-[#F1F5F9] p-1 rounded-2xl border border-[#E2E8F0]">
          <button
            onClick={() => setActiveTab("feed")}
            className={`px-4 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
              activeTab === "feed"
                ? "bg-white text-[#0F172A] shadow-xs"
                : "text-[#64748B] hover:text-[#0F172A]"
            }`}
          >
            Dashboard
          </button>

          <button
            onClick={onOpenEmergencyOD}
            className="px-4 py-1.5 rounded-xl text-xs font-bold text-rose-600 hover:bg-rose-50 transition flex items-center gap-1.5 cursor-pointer"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-ping"></span>
            <span>Emergency OD</span>
          </button>

          <button
            onClick={() => setActiveTab("calendar")}
            className={`px-4 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
              activeTab === "calendar"
                ? "bg-white text-[#0F172A] shadow-xs"
                : "text-[#64748B] hover:text-[#0F172A]"
            }`}
          >
            Exam Guard
          </button>

          <button
            onClick={() => setActiveTab("opportunities")}
            className={`px-4 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
              activeTab === "opportunities"
                ? "bg-white text-[#0F172A] shadow-xs"
                : "text-[#64748B] hover:text-[#0F172A]"
            }`}
          >
            Opportunities
          </button>
        </div>
      </div>

      {/* Right Actions & Milind Profile Badge */}
      <div className="flex items-center gap-3">
        
        {/* Judges Demo Tour Button */}
        <button
          onClick={onStartDemoTour}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-sm transition active:scale-95 cursor-pointer"
        >
          <PlayCircle className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Judges Demo Tour</span>
        </button>

        {/* Notifications Icon with dot */}
        <div className="relative cursor-pointer p-2 rounded-xl text-slate-500 hover:bg-slate-100 hover:text-slate-800 transition">
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-white"></span>
        </div>

        {/* Settings Icon */}
        <button 
          onClick={() => alert("Settings & Preferences")}
          className="p-2 rounded-xl text-slate-500 hover:bg-slate-100 hover:text-slate-800 transition cursor-pointer"
        >
          <Settings className="w-4 h-4" />
        </button>

        {/* Milind Profile Badge (From Screenshot: AR Avatar, Name, Demo account) */}
        <div className="flex items-center gap-2.5 pl-2 border-l border-slate-200">
          <div className="w-9 h-9 rounded-full bg-[#E6F7F0] text-emerald-800 font-bold text-xs flex items-center justify-center ring-2 ring-emerald-200/60">
            ML
          </div>
          <div className="text-left hidden md:block">
            <p className="text-xs font-extrabold text-[#0F172A] leading-tight">
              {STUDENT_PROFILE.name}
            </p>
            <p className="text-[10px] text-[#64748B] font-medium leading-tight">
              {STUDENT_PROFILE.year} · Demo account
            </p>
          </div>
        </div>

      </div>

    </header>
  );
}
