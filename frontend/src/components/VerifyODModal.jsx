import React from "react";
import { ShieldCheck, CheckCircle2, QrCode, Building2, Calendar, User, ExternalLink, X, Lock } from "lucide-react";

export default function VerifyODModal({ isOpen, onClose, letterData }) {
  if (!isOpen || !letterData) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#10174D]/60 backdrop-blur-md">
      <div className="bg-white/95 backdrop-blur-xl rounded-3xl border border-[#E2E7FA] max-w-xl w-full p-6 sm:p-8 text-[#10174D] shadow-2xl overflow-y-auto max-h-[90vh] relative">
        
        {/* Anti-fraud verified badge */}
        <div className="flex items-center justify-between pb-4 border-b border-[#F0F3FD]">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-[#DFE3FF] text-[#434EEB] flex items-center justify-center border border-[#C7D2FE]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-display font-bold text-base text-[#10174D]">EventRoute Official Registry</span>
                <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-[#DFE3FF] text-[#434EEB] border border-[#C7D2FE]">
                  Tamper-Proof
                </span>
              </div>
              <p className="text-[11px] text-[#525A8B]">Cryptographic On-Duty (OD) Verification Node</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-[#8E9BBF] hover:text-[#10174D] hover:bg-[#EEF2FE] transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Verification Success Box */}
        <div className="my-5 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 flex items-start gap-3">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
          <div className="text-xs leading-relaxed">
            <p className="font-bold text-sm text-emerald-900">Valid & Authenticated Academic Leave Record</p>
            <p className="text-emerald-700 mt-0.5">
              This document was generated via authorized student institutional authentication. 
              The student's attendance records will be credited upon verified event check-in.
            </p>
          </div>
        </div>

        {/* Verified Metadata Grid */}
        <div className="space-y-3 text-xs bg-[#F8FAFF] p-4 rounded-2xl border border-[#DCE3F9]">
          
          <div className="flex justify-between py-1.5 border-b border-[#E2E7FA]">
            <span className="text-[#525A8B] font-medium">Document Ref:</span>
            <span className="font-mono font-bold text-[#10174D]">{letterData.ref_number}</span>
          </div>

          <div className="flex justify-between py-1.5 border-b border-[#E2E7FA]">
            <span className="text-[#525A8B] font-medium">Anti-Tamper Hash:</span>
            <span className="font-mono text-[#5964FE] font-bold">{letterData.verification?.hash}</span>
          </div>

          <div className="flex justify-between py-1.5 border-b border-[#E2E7FA]">
            <span className="text-[#525A8B] font-medium">Student Name:</span>
            <span className="font-semibold text-[#10174D]">{letterData.student_details?.name}</span>
          </div>

          <div className="flex justify-between py-1.5 border-b border-[#E2E7FA]">
            <span className="text-[#525A8B] font-medium">Roll Number & Dept:</span>
            <span className="font-semibold text-[#10174D]">{letterData.student_details?.roll_no} ({letterData.student_details?.branch})</span>
          </div>

          <div className="flex justify-between py-1.5 border-b border-[#E2E7FA]">
            <span className="text-[#525A8B] font-medium">Target Event:</span>
            <span className="font-semibold text-[#5964FE]">{letterData.event_details?.title}</span>
          </div>

          <div className="flex justify-between py-1.5 border-b border-[#E2E7FA]">
            <span className="text-[#525A8B] font-medium">Organizer / Venue:</span>
            <span className="font-semibold text-[#10174D]">{letterData.event_details?.organizer} ({letterData.event_details?.city})</span>
          </div>

          <div className="flex justify-between py-1.5">
            <span className="text-[#525A8B] font-medium">Approved Absence Window:</span>
            <span className="font-semibold text-[#10174D]">{letterData.event_details?.dates} ({letterData.event_details?.duration_days} Days)</span>
          </div>

        </div>

        {/* Institutional Authority Stamp */}
        <div className="mt-5 p-3 rounded-2xl bg-white border border-[#DCE3F9] flex items-center justify-between text-[11px] text-[#525A8B]">
          <div className="flex items-center gap-2">
            <Building2 className="w-4 h-4 text-[#8E9BBF]" />
            <span>{letterData.college_name} ({letterData.university})</span>
          </div>
          <div className="flex items-center gap-1 text-[#5964FE] font-bold">
            <Lock className="w-3.5 h-3.5" />
            <span>Signed 256-bit Hash</span>
          </div>
        </div>

        {/* Footer Action */}
        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#5964FE] to-[#7B73FE] hover:opacity-90 text-white font-bold text-xs shadow-md shadow-[#5964FE]/20 transition cursor-pointer"
          >
            Dismiss Registry View
          </button>
        </div>

      </div>
    </div>
  );
}
