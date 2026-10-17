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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Header Summary */}
        <div className="md:col-span-2 p-6 sm:p-7 rounded-3xl bg-white/95 backdrop-blur-xl border border-[#E2E7FA] shadow-[0_10px_30px_rgba(89,100,254,0.05)]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#DFE3FF] text-[#434EEB] flex items-center justify-center border border-[#C7D2FE]">
                <CalendarIcon className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-display font-bold text-xl text-[#10174D]">Unified Academic & Event Calendar</h2>
                <p className="text-xs text-[#525A8B] font-medium">Deterministic schedule collision detection & deadline tracker</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowAddExam(!showAddExam)}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-[#5964FE] to-[#7B73FE] hover:opacity-90 text-white text-xs font-bold transition shadow-sm shadow-[#5964FE]/20 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>+ Add College Exam</span>
              </button>

              <button 
                onClick={() => alert("Calendar export generated! iCal file downloaded.")}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#F8FAFF] hover:bg-[#EEF2FE] text-xs font-semibold text-[#10174D] border border-[#DCE3F9] transition"
              >
                <Download className="w-3.5 h-3.5 text-[#5964FE]" />
                <span className="hidden sm:inline">Export</span>
              </button>
            </div>
          </div>
          
          <p className="text-xs text-[#525A8B] mt-2 leading-relaxed">
            Your university internal exams are synchronized automatically via your academic schedule. 
            Any hackathon or workshop overlapping with an exam session is flagged immediately by the collision engine.
          </p>

          {/* Quick Add Exam Inline Form */}
          {showAddExam && (
            <form onSubmit={handleAddExam} className="mt-4 p-4 rounded-2xl bg-[#F8FAFF] border border-[#DCE3F9] space-y-3 animate-in fade-in duration-200">
              <p className="text-xs font-bold text-[#10174D]">Add Upcoming College Exam / Viva / Assignment</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <input
                  type="text"
                  placeholder="Exam Title (e.g. Compiler Design Mid-Term)"
                  value={newExamTitle}
                  onChange={(e) => setNewExamTitle(e.target.value)}
                  className="sm:col-span-1 p-2 rounded-xl bg-white border border-[#DCE3F9] text-xs text-[#10174D] outline-none focus:border-[#5964FE]"
                  required
                />
                <input
                  type="date"
                  value={newExamDate}
                  onChange={(e) => setNewExamDate(e.target.value)}
                  className="p-2 rounded-xl bg-white border border-[#DCE3F9] text-xs text-[#10174D] outline-none focus:border-[#5964FE]"
                  required
                />
                <input
                  type="text"
                  placeholder="Venue (e.g. Lab 402)"
                  value={newExamLocation}
                  onChange={(e) => setNewExamLocation(e.target.value)}
                  className="p-2 rounded-xl bg-white border border-[#DCE3F9] text-xs text-[#10174D] outline-none focus:border-[#5964FE]"
                />
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddExam(false)}
                  className="px-3 py-1.5 rounded-lg text-xs text-[#525A8B] hover:text-[#10174D]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-lg bg-gradient-to-r from-[#5964FE] to-[#7B73FE] text-white font-bold text-xs shadow-sm shadow-[#5964FE]/20"
                >
                  Save Exam Date
                </button>
              </div>
            </form>
          )}

        </div>

        {/* Burnout Guard Widget */}
        <div className="p-6 rounded-3xl bg-white/95 backdrop-blur-xl border border-[#E2E7FA] shadow-[0_10px_30px_rgba(89,100,254,0.05)] flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#5964FE] uppercase tracking-wider flex items-center gap-1.5">
              <Activity className="w-4 h-4 text-[#5964FE]" />
              Burnout Guard
            </span>
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-[#DFE3FF] text-[#434EEB] border border-[#C7D2FE]">
              Optimal (84/100)
            </span>
          </div>

          <div className="my-3">
            <div className="w-full bg-[#EEF2FE] rounded-full h-2.5 overflow-hidden">
              <div className="bg-gradient-to-r from-[#5964FE] to-[#7B73FE] h-2.5 rounded-full w-[84%]"></div>
            </div>
          </div>

          <p className="text-xs text-[#525A8B] leading-relaxed">
            Cognitive workload is balanced. Attending HackAI Pune allows 2 full restful days before your Web Tech Lab assessment.
          </p>
        </div>

      </div>

      {/* Main Schedule Timeline */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Left Column: University Academic Exams */}
        <div className="p-6 rounded-3xl bg-white/95 backdrop-blur-xl border border-[#E2E7FA] shadow-[0_10px_30px_rgba(89,100,254,0.05)]">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display font-bold text-sm text-[#10174D] uppercase tracking-wider flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-rose-500" />
              University Internal Exams ({exams.length})
            </h3>
            <span className="text-[10px] uppercase font-bold text-rose-700 bg-rose-50 border border-rose-200 px-2.5 py-0.5 rounded-lg">
              Mandatory Attendance
            </span>
          </div>

          <div className="space-y-3">
            {exams.map((exam) => (
              <div key={exam.id} className="p-4 rounded-2xl bg-[#FFF5F6] border border-rose-200/80 relative overflow-hidden flex items-start justify-between">
                <div className="pl-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-rose-100 text-rose-800 uppercase">
                      Exam
                    </span>
                    <span className="text-xs text-[#525A8B] flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-rose-500" />
                      {new Date(exam.start_date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                    </span>
                  </div>
                  <h4 className="font-bold text-sm text-[#10174D]">{exam.title}</h4>
                  <p className="text-xs text-[#525A8B] mt-1">Venue: {exam.location} · {exam.notes}</p>
                </div>

                {exam.id.startsWith("exam_") && !["exam_dbms", "exam_se", "exam_webtech"].includes(exam.id) && (
                  <button
                    onClick={() => handleDeleteExam(exam.id)}
                    className="p-1 rounded-lg text-[#8E9BBF] hover:text-rose-600 hover:bg-rose-100 transition"
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
        <div className="p-6 rounded-3xl bg-white/95 backdrop-blur-xl border border-[#E2E7FA] shadow-[0_10px_30px_rgba(89,100,254,0.05)]">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display font-bold text-sm text-[#10174D] uppercase tracking-wider flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-[#5964FE]" />
              Hackathons & Collision Watchdog
            </h3>
            <span className="text-[10px] uppercase font-bold text-[#434EEB] bg-[#DFE3FF] border border-[#C7D2FE] px-2.5 py-0.5 rounded-lg">
              Active Shield
            </span>
          </div>

          <div className="space-y-3">
            
            {/* Safe Event: HackAI Pune */}
            <div className="p-4 rounded-2xl bg-[#F0FDF4] border border-emerald-200 relative overflow-hidden">
              <div className="pl-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500 text-white uppercase flex items-center gap-1 shadow-xs">
                    <CheckCircle2 className="w-3 h-3" />
                    Zero Exam Clash (Safe to Attend)
                  </span>
                  <span className="text-xs font-bold text-emerald-800">94% AI Fit</span>
                </div>
                <h4 className="font-bold text-sm text-[#10174D] mt-1">HackAI Pune 2026</h4>
                <p className="text-xs text-[#525A8B] mt-0.5">
                  Sunday, Oct 26 – Monday, Oct 27 · COEP Tech Campus, Pune
                </p>
                <div className="mt-2.5 flex items-center gap-2 text-xs text-emerald-900 bg-white/90 p-2 rounded-xl border border-emerald-200">
                  <span>Starts Sunday morning after your Saturday DBMS lab exam concludes.</span>
                </div>
              </div>
            </div>

            {/* Conflicting Event: Web3 DeFi Sprint */}
            <div className="p-4 rounded-2xl bg-[#FFF5F6] border border-rose-200 relative overflow-hidden">
              <div className="pl-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-rose-100 text-rose-800 uppercase flex items-center gap-1">
                    <AlertTriangle className="w-3 h-3 text-rose-600" />
                    Hard Conflict Flagged
                  </span>
                  <span className="text-xs text-rose-700 font-bold">Registration Shielded</span>
                </div>
                <h4 className="font-bold text-sm text-[#10174D] mt-1">Web3 DeFi Sprint Mumbai</h4>
                <p className="text-xs text-[#525A8B] mt-0.5">
                  Oct 24 – 25 · Bandra, Mumbai
                </p>
                <div className="mt-2.5 flex items-start gap-1.5 text-xs text-rose-900 bg-white/90 p-2 rounded-xl border border-rose-200">
                  <AlertTriangle className="w-3.5 h-3.5 text-rose-600 shrink-0 mt-0.5" />
                  <span>Directly clashes with mandatory internal DBMS Lab Exam on Oct 24 (09:00 AM - 12:00 PM).</span>
                </div>
              </div>
            </div>

            {/* Upcoming Event: IIT Bombay Techfest */}
            <div className="p-4 rounded-2xl bg-[#F8FAFF] border border-[#DCE3F9] relative overflow-hidden">
              <div className="pl-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#DFE3FF] text-[#434EEB] border border-[#C7D2FE] uppercase">
                    Upcoming Flagship
                  </span>
                  <span className="text-xs text-[#5964FE] font-bold">98/100 Worth-It</span>
                </div>
                <h4 className="font-bold text-sm text-[#10174D] mt-1">IIT Bombay Techfest: AI Grand Challenge</h4>
                <p className="text-xs text-[#525A8B] mt-0.5">
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
