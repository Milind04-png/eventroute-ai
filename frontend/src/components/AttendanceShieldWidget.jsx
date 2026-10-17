import React, { useState } from "react";
import { ShieldCheck, AlertTriangle, CheckCircle2, TrendingUp, Calendar, School, FileText, Sparkles, ChevronRight, Info } from "lucide-react";
import { STUDENT_PROFILE } from "../data/initialEvents";

export default function AttendanceShieldWidget({ onOpenODPortal }) {
  const [simulatedOdDays, setSimulatedOdDays] = useState(2); // e.g. 2 days hackathon OD
  const currentAttendance = STUDENT_PROFILE.attendance_rate || 78.4;
  const totalClasses = 250;
  const attendedClasses = Math.round((currentAttendance / 100) * totalClasses); // ~196
  
  // GGSIPU 75% mandatory threshold
  const minRequiredClasses = Math.ceil(0.75 * totalClasses); // 188
  const safeBunkHours = Math.max(0, attendedClasses - minRequiredClasses); // 8 classes buffer without OD

  // With OD Letter approved (each hackathon day covers 6 class lecture/lab hours):
  const compensatedHours = simulatedOdDays * 6;
  const projectedAttended = Math.min(totalClasses, attendedClasses + compensatedHours);
  const projectedAttendance = ((projectedAttended / totalClasses) * 100).toFixed(1);

  return (
    <div className="rounded-3xl p-6 sm:p-7 bg-white/95 backdrop-blur-xl border border-[#E2E7FA] shadow-[0_10px_30px_rgba(89,100,254,0.05)] space-y-5">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-[#DFE3FF] text-[#434EEB] flex items-center justify-center border border-[#C7D2FE] shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-display font-extrabold text-base sm:text-lg text-[#10174D]">
                GGSIPU 75% Attendance Guard & OD Simulator
              </h3>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200">
                Caution Zone
              </span>
            </div>
            <p className="text-xs text-[#525A8B] mt-0.5 font-medium">
              Delhi Technical Campus attendance compliance tracker for university end-term exams.
            </p>
          </div>
        </div>

        <button
          onClick={onOpenODPortal}
          className="self-start sm:self-auto px-3.5 py-1.5 rounded-xl bg-[#5964FE] hover:bg-[#434EEB] text-white text-xs font-bold transition flex items-center gap-1.5 shadow-sm shadow-[#5964FE]/20 cursor-pointer"
        >
          <FileText className="w-3.5 h-3.5" />
          <span>Generate OD Letter</span>
        </button>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
        
        {/* Metric 1: Current Attendance */}
        <div className="p-4 rounded-2xl bg-[#F8FAFF] border border-[#E2E7FA]">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#8E9BBF] block mb-1">
            Current Rate (DTC Portal)
          </span>
          <div className="flex items-baseline gap-2">
            <span className="font-display font-black text-2xl text-[#10174D]">
              {currentAttendance}%
            </span>
            <span className="text-[11px] font-semibold text-[#525A8B]">
              ({attendedClasses}/{totalClasses} hrs)
            </span>
          </div>
          <p className="text-[10px] text-amber-700 font-bold mt-1 flex items-center gap-1">
            <AlertTriangle className="w-3 h-3" />
            <span>+3.4% above 75% debarment cutoff</span>
          </p>
        </div>

        {/* Metric 2: Raw Buffer without OD */}
        <div className="p-4 rounded-2xl bg-[#F8FAFF] border border-[#E2E7FA]">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#8E9BBF] block mb-1">
            Unexcused Leave Buffer
          </span>
          <div className="flex items-baseline gap-2">
            <span className="font-display font-black text-2xl text-amber-600">
              {safeBunkHours} hrs
            </span>
            <span className="text-[11px] font-medium text-[#525A8B]">
              (~1.3 college days)
            </span>
          </div>
          <p className="text-[10px] text-[#525A8B] font-medium mt-1">
            Without OD letters, missing 2 hackathon days drops you to 73.6%!
          </p>
        </div>

        {/* Metric 3: Projected with OD Approval */}
        <div className="p-4 rounded-2xl bg-gradient-to-br from-[#EEF2FE] to-[#DFE3FF] border border-[#C7D2FE]">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#434EEB] block mb-1">
            Projected With Official OD
          </span>
          <div className="flex items-baseline gap-2">
            <span className="font-display font-black text-2xl text-[#434EEB]">
              {projectedAttendance}%
            </span>
            <span className="text-[11px] font-bold text-emerald-700 flex items-center gap-0.5">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>+{((projectedAttended - attendedClasses) / totalClasses * 100).toFixed(1)}%</span>
            </span>
          </div>
          <p className="text-[10px] text-[#434EEB] font-bold mt-1">
            100% attendance credited via Dean OD clearance
          </p>
        </div>

      </div>

      {/* Progress Bar with Safety Threshold Marker */}
      <div className="space-y-2">
        <div className="flex justify-between text-xs font-bold">
          <span className="text-[#525A8B]">Campus Attendance Status</span>
          <span className="text-[#10174D]">
            {currentAttendance}% (Target: &ge; 75% GGSIPU Rule)
          </span>
        </div>

        <div className="relative h-4 rounded-full bg-[#E2E7FA] overflow-hidden p-0.5">
          {/* 75% Cutoff Marker Line */}
          <div 
            className="absolute top-0 bottom-0 w-0.5 bg-rose-500 z-20 shadow-xs"
            style={{ left: "75%" }}
            title="75% Mandatory Cutoff"
          ></div>

          {/* Progress fill */}
          <div 
            className="h-full rounded-full bg-gradient-to-r from-amber-400 to-[#5964FE] transition-all duration-500"
            style={{ width: `${currentAttendance}%` }}
          ></div>
        </div>

        <div className="flex justify-between text-[10px] text-[#8E9BBF] font-bold">
          <span>0%</span>
          <span className="text-rose-600 font-extrabold flex items-center gap-0.5">
            ▲ 75% Cutoff (Exam Debarment)
          </span>
          <span>100%</span>
        </div>
      </div>

      {/* Simulation Controls */}
      <div className="p-3.5 rounded-2xl bg-[#F8FAFF] border border-[#E2E7FA] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 text-[#10174D] font-bold">
          <Sparkles className="w-4 h-4 text-[#5964FE]" />
          <span>Simulate Upcoming Hackathon OD (Days):</span>
        </div>

        <div className="flex items-center gap-1.5">
          {[1, 2, 3, 4].map((days) => (
            <button
              key={days}
              onClick={() => setSimulatedOdDays(days)}
              className={`px-3 py-1 rounded-xl font-bold transition cursor-pointer ${
                simulatedOdDays === days
                  ? "bg-[#5964FE] text-white shadow-xs"
                  : "bg-white text-[#525A8B] border border-[#E2E7FA] hover:text-[#10174D]"
              }`}
            >
              {days} Day{days > 1 ? "s" : ""}
            </button>
          ))}
        </div>
      </div>

    </div>
  );
}
