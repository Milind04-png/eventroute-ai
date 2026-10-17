import React, { useState } from "react";
import { 
  ShieldAlert, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  Zap, 
  AlertTriangle,
  PlayCircle,
  FileText,
  MapPin,
  Send,
  Siren,
  HelpCircle
} from "lucide-react";
import { STUDENT_PROFILE } from "../data/initialEvents";

export default function MedixHeroCards({ 
  onTriggerEmergencyOD, 
  onStartAssessmentQuery, 
  onTriggerDemo 
}) {
  const [assessmentInput, setAssessmentInput] = useState("");

  const handleChipClick = (query) => {
    setAssessmentInput(query);
    onStartAssessmentQuery(query);
  };

  const handleAssessmentSubmit = (e) => {
    e?.preventDefault();
    if (assessmentInput.trim()) {
      onStartAssessmentQuery(assessmentInput);
    } else {
      onStartAssessmentQuery("Find me an AI hackathon this weekend that won't clash with my exams");
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Welcome Greeting Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4">
        <div>
          <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-[#0F172A] tracking-tight">
            Good morning, {STUDENT_PROFILE.name} 👋
          </h1>
          <p className="text-sm text-[#64748B] mt-1 font-medium">
            Your opportunities, academic calendar, and OD letters ready when you need them.
          </p>
        </div>

        {/* Status Pill Badge (Directly from screenshot) */}
        <div className="flex items-center gap-2 self-start sm:self-auto px-4 py-1.5 rounded-full bg-[#E6F7F0] border border-emerald-200/80 text-emerald-800 text-xs font-bold shadow-xs">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
          <span className="w-2 h-2 rounded-full bg-emerald-500 -ml-4"></span>
          <span>EVENTROUTE SYSTEMS READY</span>
        </div>
      </div>

      {/* The Two Dual Hero Cards (Layout from screenshot) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
        
        {/* CARD 1: EMERGENCY ASSISTANCE (The Coral/Red Card) */}
        <div className="rounded-3xl p-6 sm:p-7 bg-white border border-rose-200/80 shadow-[0_12px_36px_rgba(244,63,94,0.06)] flex flex-col justify-between relative overflow-hidden group">
          
          {/* Subtle soft red gradient halo */}
          <div className="absolute top-0 right-0 w-56 h-56 bg-rose-500/5 rounded-full blur-3xl pointer-events-none"></div>

          <div>
            {/* Top Tag Row */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 text-rose-600 font-bold text-xs uppercase tracking-wider">
                <div className="w-6 h-6 rounded-lg bg-rose-100 flex items-center justify-center">
                  <ShieldAlert className="w-3.5 h-3.5 text-rose-600" />
                </div>
                <span>EMERGENCY ASSISTANCE</span>
              </div>
              <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-rose-50 text-rose-700 border border-rose-200">
                Active Standby
              </span>
            </div>

            {/* Title & Description */}
            <h2 className="font-display font-extrabold text-2xl text-[#0F172A] mb-2">
              Need Immediate Help?
            </h2>
            <p className="text-xs text-[#64748B] leading-relaxed mb-4">
              Get immediate access to verified On-Duty leave support. Broadcasts your official attendance petition, embeds tamper-proof QR verification, and alerts department administrators.
            </p>

            {/* Feature Pills */}
            <div className="flex flex-wrap items-center gap-2 text-[11px] text-[#475569] mb-6">
              <span className="flex items-center gap-1 bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-200 font-medium">
                📍 Live QR Verification
              </span>
              <span className="flex items-center gap-1 bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-200 font-medium">
                ⚡ Instant PDF Dispatch
              </span>
              <span className="flex items-center gap-1 bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-200 font-medium">
                🏛️ University HOD Routing
              </span>
            </div>
          </div>

          {/* Central Circular Red SOS Action Button */}
          <div className="text-center py-2">
            <button
              onClick={onTriggerEmergencyOD}
              className="w-24 h-24 rounded-full bg-rose-600 hover:bg-rose-500 active:scale-95 text-white flex flex-col items-center justify-center shadow-2xl shadow-rose-600/40 hover:shadow-rose-600/50 transition-all duration-300 mx-auto cursor-pointer group-hover:scale-105"
            >
              <Siren className="w-7 h-7 mb-0.5 text-white animate-pulse" />
              <span className="font-extrabold text-sm tracking-wider">SOS</span>
            </button>

            <p className="text-xs font-bold text-[#0F172A] mt-3">
              Press only in an emergency
            </p>
            <p className="text-[11px] text-[#64748B] mt-0.5">
              Includes pre-filled letterhead with 1-click HOD approval
            </p>

            {/* Text Trigger Demo Link */}
            <button
              onClick={onTriggerEmergencyOD}
              className="mt-3 inline-flex items-center gap-1.5 text-xs text-indigo-600 hover:text-indigo-700 font-bold cursor-pointer transition"
            >
              <PlayCircle className="w-3.5 h-3.5" />
              <span>Start Emergency OD Demo</span>
            </button>
          </div>

        </div>

        {/* CARD 2: AI HEALTH / OPPORTUNITY ASSESSMENT (The Green Card) */}
        <div className="rounded-3xl p-6 sm:p-7 bg-white border border-emerald-200/80 shadow-[0_12px_36px_rgba(16,185,129,0.06)] flex flex-col justify-between relative overflow-hidden">
          
          {/* Subtle soft green gradient halo */}
          <div className="absolute top-0 right-0 w-56 h-56 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none"></div>

          <div>
            {/* Top Tag Row */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 text-emerald-700 font-bold text-xs uppercase tracking-wider">
                <div className="w-6 h-6 rounded-lg bg-emerald-100 flex items-center justify-center">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                </div>
                <span>AI OPPORTUNITY ASSESSMENT</span>
              </div>
              <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center gap-1">
                <Zap className="w-3 h-3 text-emerald-600" />
                Triage AI
              </span>
            </div>

            {/* Title & Description */}
            <h2 className="font-display font-extrabold text-2xl text-[#0F172A] mb-2">
              Not sure what to attend?
            </h2>
            <p className="text-xs text-[#64748B] leading-relaxed mb-4">
              Describe your tech stack, hackathon goals, or weekend availability to get preliminary guidance on match scores, self-study prerequisite bridges, and schedule clash clearance.
            </p>

            {/* Input Form Box (From screenshot) */}
            <form onSubmit={handleAssessmentSubmit} className="mb-3">
              <div className="relative">
                <input
                  type="text"
                  value={assessmentInput}
                  onChange={(e) => setAssessmentInput(e.target.value)}
                  placeholder="How are you feeling? Tell us what you're looking for..."
                  className="w-full px-4 py-3 rounded-2xl bg-white border border-slate-200 text-xs text-[#0F172A] placeholder-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition shadow-xs"
                />
              </div>
            </form>

            {/* Quick Start Chips Row (Directly from screenshot) */}
            <div className="flex flex-wrap items-center gap-1.5 text-[11px] mb-4">
              <span className="text-slate-400 font-medium">Quick start:</span>
              <button
                type="button"
                onClick={() => handleChipClick("Find me an AI hackathon this weekend without exam clashes")}
                className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-emerald-50 hover:text-emerald-800 text-slate-700 font-medium transition border border-slate-200/60 cursor-pointer"
              >
                AI Hackathons this weekend
              </button>
              <button
                type="button"
                onClick={() => handleChipClick("Zero exam clash hackathons only")}
                className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-emerald-50 hover:text-emerald-800 text-slate-700 font-medium transition border border-slate-200/60 cursor-pointer"
              >
                Zero exam clash
              </button>
              <button
                type="button"
                onClick={() => handleChipClick("FastAPI & React stack match")}
                className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-emerald-50 hover:text-emerald-800 text-slate-700 font-medium transition border border-slate-200/60 cursor-pointer"
              >
                FastAPI & React
              </button>
              <button
                type="button"
                onClick={() => handleChipClick("What skills do I need for HackAI Pune?")}
                className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-emerald-50 hover:text-emerald-800 text-slate-700 font-medium transition border border-slate-200/60 cursor-pointer"
              >
                Skill-gap check
              </button>
            </div>
          </div>

          {/* Bottom Action Row (From screenshot) */}
          <div className="pt-3 border-t border-slate-100">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-2">
              <div className="flex items-center gap-1.5 text-xs text-amber-600 font-bold">
                <Zap className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                <span>Typical assessment time: &lt; 1 min</span>
              </div>

              <button
                onClick={handleAssessmentSubmit}
                className="px-5 py-2.5 rounded-2xl bg-emerald-800 hover:bg-emerald-700 active:scale-95 text-white font-bold text-xs tracking-wide shadow-md transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Start Assessment</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <p className="text-[10px] text-slate-400">
              🛡️ AI provides preliminary triage and explainable recommendations, not an unverified guarantee.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}
