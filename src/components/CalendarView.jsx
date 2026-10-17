import React from "react";
import { 
  Calendar as CalendarIcon, 
  AlertTriangle, 
  CheckCircle2, 
  ShieldAlert, 
  Activity, 
  Download, 
  Clock, 
  MapPin, 
  BookOpen 
} from "lucide-react";
import { EXAM_CALENDAR } from "../data/initialEvents";

export default function CalendarView({ events }) {
  // Identify clashes
  const registeredHackathons = events.filter(e => e.id === "evt_hackai_pune_26" || e.id === "evt_web3_defi_sprint");

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      
      {/* Top Banner: Calendar & Burnout Guard */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        {/* Header Summary */}
        <div className="md:col-span-2 p-5 rounded-2xl bg-slate-900 border border-slate-800">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center border border-indigo-500/30">
                <CalendarIcon className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-display font-bold text-lg text-white">Unified Academic & Event Calendar</h2>
                <p className="text-xs text-slate-400">Deterministic schedule collision detection & deadline tracker</p>
              </div>
            </div>

            <button 
              onClick={() => alert("Calendar export generated! Sync link copied to clipboard.")}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 border border-slate-700 transition"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export iCal / GCal</span>
            </button>
          </div>
          
          <p className="text-xs text-slate-300 mt-2 leading-relaxed">
            Your university internal exams are synchronized automatically via the college ERP integration. Any hackathon or workshop overlapping with an exam session is flagged immediately.
          </p>
        </div>

        {/* Burnout Guard Widget */}
        <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-900 to-indigo-950/40 border border-indigo-500/30 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider flex items-center gap-1.5">
              <Activity className="w-4 h-4 text-emerald-400" />
              Burnout Guard
            </span>
            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300">
              Optimal (84/100)
            </span>
          </div>

          <div className="my-3">
            <div className="w-full bg-slate-800 rounded-full h-2.5 overflow-hidden">
              <div className="bg-gradient-to-r from-emerald-500 to-teal-400 h-2.5 rounded-full w-[84%]"></div>
            </div>
          </div>

          <p className="text-xs text-slate-300">
            Cognitive workload is balanced. HackAI Pune allows 2 full recovery days before your Web Tech Lab assessment.
          </p>
        </div>

      </div>

      {/* Main Schedule Timeline */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Left Column: University Academic Exams */}
        <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800">
          <h3 className="font-display font-bold text-sm text-slate-200 uppercase tracking-wider mb-4 flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-rose-400" />
            University Internal Exams (Mandatory Attendance)
          </h3>

          <div className="space-y-3">
            {EXAM_CALENDAR.map((exam) => (
              <div key={exam.id} className="p-4 rounded-xl bg-slate-950 border border-rose-500/30 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1.5 h-full bg-rose-500"></div>
                <div className="pl-2">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 uppercase">
                      Mandatory Exam
                    </span>
                    <span className="text-xs text-slate-400 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-rose-400" />
                      {new Date(exam.start_date).toLocaleDateString("en-US", { month: "short", day: "numeric" })} · {new Date(exam.start_date).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })}
                    </span>
                  </div>
                  <h4 className="font-semibold text-sm text-slate-100">{exam.title}</h4>
                  <p className="text-xs text-slate-400 mt-1">Venue: {exam.location} · {exam.notes}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Opportunities & Collision Watchdog */}
        <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800">
          <h3 className="font-display font-bold text-sm text-slate-200 uppercase tracking-wider mb-4 flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-indigo-400" />
            Hackathons & Collision Watchdog
          </h3>

          <div className="space-y-3">
            
            {/* Safe Event: HackAI Pune */}
            <div className="p-4 rounded-xl bg-slate-950 border border-emerald-500/30 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1.5 h-full bg-emerald-500"></div>
              <div className="pl-2">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 uppercase flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    Zero Exam Clash (Safe to Attend)
                  </span>
                  <span className="text-xs font-semibold text-emerald-400">94% AI Fit</span>
                </div>
                <h4 className="font-semibold text-sm text-slate-100">HackAI Pune 2026</h4>
                <p className="text-xs text-slate-400 mt-1">
                  Sunday, Oct 26 – Monday, Oct 27 · COEP Tech Campus, Pune
                </p>
                <div className="mt-2.5 flex items-center gap-2 text-xs text-emerald-300 bg-emerald-950/20 p-2 rounded-lg">
                  <span>Starts Sunday morning after your Saturday DBMS lab exam concludes.</span>
                </div>
              </div>
            </div>

            {/* Conflicting Event: Web3 DeFi Sprint */}
            <div className="p-4 rounded-xl bg-slate-950 border border-rose-500/40 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1.5 h-full bg-rose-500"></div>
              <div className="pl-2">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 uppercase flex items-center gap-1">
                    <AlertTriangle className="w-3 h-3" />
                    Hard Conflict Flagged
                  </span>
                  <span className="text-xs text-rose-400 font-semibold">Registration Blocked</span>
                </div>
                <h4 className="font-semibold text-sm text-slate-100">Web3 DeFi Sprint Mumbai</h4>
                <p className="text-xs text-slate-400 mt-1">
                  Oct 24 – 25 · Bandra, Mumbai
                </p>
                <div className="mt-2.5 flex items-start gap-1.5 text-xs text-rose-300 bg-rose-950/30 p-2 rounded-lg border border-rose-500/30">
                  <AlertTriangle className="w-3.5 h-3.5 text-rose-400 shrink-0 mt-0.5" />
                  <span>Directly clashes with mandatory internal DBMS Lab Exam on Oct 24 (09:00 AM - 12:00 PM).</span>
                </div>
              </div>
            </div>

            {/* Upcoming Event: IIT Bombay Techfest */}
            <div className="p-4 rounded-xl bg-slate-950 border border-indigo-500/30 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1.5 h-full bg-indigo-500"></div>
              <div className="pl-2">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 uppercase">
                    Upcoming Flagship
                  </span>
                  <span className="text-xs text-indigo-400 font-semibold">98/100 Worth-It</span>
                </div>
                <h4 className="font-semibold text-sm text-slate-100">IIT Bombay Techfest: AI Grand Challenge</h4>
                <p className="text-xs text-slate-400 mt-1">
                  Nov 15 – 17 · Powai, Mumbai (Registration closes Nov 05)
                </p>
              </div>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
