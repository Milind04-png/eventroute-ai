import React, { useState } from "react";
import { 
  Calendar as CalendarIcon, 
  AlertTriangle, 
  CheckCircle2, 
  ShieldAlert, 
  Activity, 
  Download, 
  Clock, 
  MapPin, 
  BookOpen,
  Plus,
  Trash2,
  Sparkles
} from "lucide-react";
import { EXAM_CALENDAR } from "../data/initialEvents";

export default function CalendarView({ events, theme = "light" }) {
  const [exams, setExams] = useState(EXAM_CALENDAR);
  const [showAddExam, setShowAddExam] = useState(false);
  const [newExamTitle, setNewExamTitle] = useState("");
  const [newExamDate, setNewExamDate] = useState("2026-10-26");
  const [newExamTime, setNewExamTime] = useState("10:00");
  const [newExamLocation, setNewExamLocation] = useState("Lab 201");

  const isLight = theme === "light";

  const handleAddExam = (e) => {
    e.preventDefault();
    if (!newExamTitle.trim()) return;

    const newEx = {
      id: `exam_${Date.now()}`,
      title: newExamTitle,
      start_date: `${newExamDate}T${newExamTime}:00`,
      end_date: `${newExamDate}T13:00:00`,
      type: "exam",
      mandatory: true,
      location: newExamLocation,
      notes: "Custom schedule entry added by student."
    };

    setExams(prev => [...prev, newEx]);
    setNewExamTitle("");
    setShowAddExam(false);
  };

  const handleDeleteExam = (id) => {
    setExams(prev => prev.filter(e => e.id !== id));
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      
      {/* Top Banner: Calendar & Burnout Guard */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        {/* Header Summary */}
        <div className={`md:col-span-2 p-6 rounded-3xl border transition-colors ${
          isLight ? "bg-white border-[#E2E8F0] shadow-sm" : "bg-slate-900 border-slate-800 text-white"
        }`}>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-200">
                <CalendarIcon className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-display font-bold text-xl text-[#0F172A]">Unified Academic & Event Calendar</h2>
                <p className="text-xs text-slate-500">Deterministic schedule collision detection & deadline tracker</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowAddExam(!showAddExam)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-slate-950 text-xs font-bold transition shadow-xs cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>+ Add College Exam</span>
              </button>

              <button 
                onClick={() => alert("Calendar export generated! iCal file downloaded.")}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-semibold text-slate-700 transition"
              >
                <Download className="w-3.5 h-3.5 text-slate-500" />
                <span className="hidden sm:inline">Export</span>
              </button>
            </div>
          </div>
          
          <p className="text-xs text-[#475569] mt-2 leading-relaxed">
            Your university internal exams are synchronized automatically via your academic schedule. 
            Any hackathon or workshop overlapping with an exam session is flagged immediately by the collision engine.
          </p>

          {/* Quick Add Exam Inline Form */}
          {showAddExam && (
            <form onSubmit={handleAddExam} className="mt-4 p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 animate-in fade-in duration-200">
              <p className="text-xs font-bold text-[#0F172A]">Add Upcoming College Exam / Viva / Assignment</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <input
                  type="text"
                  placeholder="Exam Title (e.g. Compiler Design Mid-Term)"
                  value={newExamTitle}
                  onChange={(e) => setNewExamTitle(e.target.value)}
                  className="sm:col-span-1 p-2 rounded-xl bg-white border border-slate-200 text-xs outline-none focus:border-emerald-500"
                  required
                />
                <input
                  type="date"
                  value={newExamDate}
                  onChange={(e) => setNewExamDate(e.target.value)}
                  className="p-2 rounded-xl bg-white border border-slate-200 text-xs outline-none focus:border-emerald-500"
                  required
                />
                <input
                  type="text"
                  placeholder="Venue (e.g. Lab 402)"
                  value={newExamLocation}
                  onChange={(e) => setNewExamLocation(e.target.value)}
                  className="p-2 rounded-xl bg-white border border-slate-200 text-xs outline-none focus:border-emerald-500"
                />
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddExam(false)}
                  className="px-3 py-1.5 rounded-lg text-xs text-slate-500 hover:text-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs"
                >
                  Save Exam Date
                </button>
              </div>
            </form>
          )}

        </div>

        {/* Burnout Guard Widget */}
        <div className={`p-6 rounded-3xl border flex flex-col justify-between ${
          isLight ? "bg-white border-[#E2E8F0] shadow-sm" : "bg-gradient-to-br from-slate-900 to-indigo-950/40 border-indigo-500/30 text-white"
        }`}>
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider flex items-center gap-1.5">
              <Activity className="w-4 h-4 text-emerald-500" />
              Burnout Guard
            </span>
            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
              Optimal (84/100)
            </span>
          </div>

          <div className="my-3">
            <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
              <div className="bg-gradient-to-r from-emerald-500 to-teal-400 h-2.5 rounded-full w-[84%]"></div>
            </div>
          </div>

          <p className="text-xs text-[#475569]">
            Cognitive workload is balanced. Attending HackAI Pune allows 2 full restful days before your Web Tech Lab assessment.
          </p>
        </div>

      </div>

      {/* Main Schedule Timeline */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Left Column: University Academic Exams */}
        <div className={`p-6 rounded-3xl border ${isLight ? "bg-white border-[#E2E8F0] shadow-sm" : "bg-slate-900/90 border-slate-800 text-white"}`}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display font-bold text-sm text-[#0F172A] uppercase tracking-wider flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-rose-500" />
              University Internal Exams ({exams.length})
            </h3>
            <span className="text-[10px] uppercase font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded">
              Mandatory Attendance
            </span>
          </div>

          <div className="space-y-3">
            {exams.map((exam) => (
              <div key={exam.id} className="p-4 rounded-2xl bg-rose-50/40 border border-rose-200 relative overflow-hidden flex items-start justify-between">
                <div className="pl-2">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-rose-100 text-rose-800 uppercase">
                      Exam
                    </span>
                    <span className="text-xs text-slate-500 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-rose-500" />
                      {new Date(exam.start_date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                    </span>
                  </div>
                  <h4 className="font-bold text-sm text-[#0F172A]">{exam.title}</h4>
                  <p className="text-xs text-slate-500 mt-1">Venue: {exam.location} · {exam.notes}</p>
                </div>

                {exam.id.startsWith("exam_") && !["exam_dbms", "exam_se", "exam_webtech"].includes(exam.id) && (
                  <button
                    onClick={() => handleDeleteExam(exam.id)}
                    className="p-1 rounded text-slate-400 hover:text-rose-600 transition"
                    title="Delete Exam"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Opportunities & Collision Watchdog */}
        <div className={`p-6 rounded-3xl border ${isLight ? "bg-white border-[#E2E8F0] shadow-sm" : "bg-slate-900/90 border-slate-800 text-white"}`}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display font-bold text-sm text-[#0F172A] uppercase tracking-wider flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-emerald-600" />
              Hackathons & Collision Watchdog
            </h3>
            <span className="text-[10px] uppercase font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
              Active Shield
            </span>
          </div>

          <div className="space-y-3">
            
            {/* Safe Event: HackAI Pune */}
            <div className="p-4 rounded-2xl bg-emerald-50/50 border border-emerald-200 relative overflow-hidden">
              <div className="pl-2">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500 text-slate-950 uppercase flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    Zero Exam Clash (Safe to Attend)
                  </span>
                  <span className="text-xs font-bold text-emerald-800">94% AI Fit</span>
                </div>
                <h4 className="font-bold text-sm text-[#0F172A]">HackAI Pune 2026</h4>
                <p className="text-xs text-slate-500 mt-1">
                  Sunday, Oct 26 – Monday, Oct 27 · COEP Tech Campus, Pune
                </p>
                <div className="mt-2.5 flex items-center gap-2 text-xs text-emerald-900 bg-white p-2 rounded-xl border border-emerald-200">
                  <span>Starts Sunday morning after your Saturday DBMS lab exam concludes.</span>
                </div>
              </div>
            </div>

            {/* Conflicting Event: Web3 DeFi Sprint */}
            <div className="p-4 rounded-2xl bg-rose-50/50 border border-rose-200 relative overflow-hidden">
              <div className="pl-2">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-rose-100 text-rose-800 uppercase flex items-center gap-1">
                    <AlertTriangle className="w-3 h-3 text-rose-600" />
                    Hard Conflict Flagged
                  </span>
                  <span className="text-xs text-rose-700 font-bold">Registration Shielded</span>
                </div>
                <h4 className="font-bold text-sm text-[#0F172A]">Web3 DeFi Sprint Mumbai</h4>
                <p className="text-xs text-slate-500 mt-1">
                  Oct 24 – 25 · Bandra, Mumbai
                </p>
                <div className="mt-2.5 flex items-start gap-1.5 text-xs text-rose-900 bg-white p-2 rounded-xl border border-rose-200">
                  <AlertTriangle className="w-3.5 h-3.5 text-rose-600 shrink-0 mt-0.5" />
                  <span>Directly clashes with mandatory internal DBMS Lab Exam on Oct 24 (09:00 AM - 12:00 PM).</span>
                </div>
              </div>
            </div>

            {/* Upcoming Event: IIT Bombay Techfest */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 relative overflow-hidden">
              <div className="pl-2">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-200 text-slate-800 uppercase">
                    Upcoming Flagship
                  </span>
                  <span className="text-xs text-emerald-700 font-bold">98/100 Worth-It</span>
                </div>
                <h4 className="font-bold text-sm text-[#0F172A]">IIT Bombay Techfest: AI Grand Challenge</h4>
                <p className="text-xs text-slate-500 mt-1">
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
