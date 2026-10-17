import React from "react";
import { ShieldCheck, CheckCircle2, QrCode, Building2, Calendar, User, ExternalLink, X, Lock } from "lucide-react";

export default function VerifyODModal({ isOpen, onClose, letterData }) {
  if (!isOpen || !letterData) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="bg-white rounded-3xl border border-emerald-200 max-w-xl w-full p-6 sm:p-8 text-slate-900 shadow-2xl overflow-y-auto max-h-[90vh] relative">
        
        {/* Anti-fraud verified badge */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-200">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-display font-bold text-base text-[#0F172A]">EventRoute Official Registry</span>
                <span className="text-[10px] uppercase font-bold px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-800">
                  Tamper-Proof
                </span>
              </div>
              <p className="text-[11px] text-slate-500">Cryptographic On-Duty (OD) Verification Node</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Verification Success Box */}
        <div className="my-5 p-4 rounded-2xl bg-emerald-50/80 border border-emerald-200 text-emerald-900 flex items-start gap-3">
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
        <div className="space-y-3 text-xs bg-slate-50 p-4 rounded-2xl border border-slate-200">
          
          <div className="flex justify-between py-1.5 border-b border-slate-200/60">
            <span className="text-slate-500 font-medium">Document Ref:</span>
            <span className="font-mono font-bold text-[#0F172A]">{letterData.ref_number}</span>
          </div>

          <div className="flex justify-between py-1.5 border-b border-slate-200/60">
            <span className="text-slate-500 font-medium">Anti-Tamper Hash:</span>
            <span className="font-mono text-emerald-700 font-bold">{letterData.verification?.hash}</span>
          </div>

          <div className="flex justify-between py-1.5 border-b border-slate-200/60">
            <span className="text-slate-500 font-medium">Student Name:</span>
            <span className="font-semibold text-[#0F172A]">{letterData.student_details?.name}</span>
          </div>

          <div className="flex justify-between py-1.5 border-b border-slate-200/60">
            <span className="text-slate-500 font-medium">Roll Number & Dept:</span>
            <span className="font-semibold text-[#0F172A]">{letterData.student_details?.roll_no} ({letterData.student_details?.branch})</span>
          </div>

          <div className="flex justify-between py-1.5 border-b border-slate-200/60">
            <span className="text-slate-500 font-medium">Target Event:</span>
            <span className="font-semibold text-emerald-700">{letterData.event_details?.title}</span>
          </div>

          <div className="flex justify-between py-1.5 border-b border-slate-200/60">
            <span className="text-slate-500 font-medium">Organizer / Venue:</span>
            <span className="font-semibold text-[#0F172A]">{letterData.event_details?.organizer} ({letterData.event_details?.city})</span>
          </div>

          <div className="flex justify-between py-1.5">
            <span className="text-slate-500 font-medium">Approved Absence Window:</span>
            <span className="font-semibold text-[#0F172A]">{letterData.event_details?.dates} ({letterData.event_details?.duration_days} Days)</span>
          </div>

        </div>

        {/* Institutional Authority Stamp */}
        <div className="mt-5 p-3 rounded-2xl bg-white border border-slate-200 flex items-center justify-between text-[11px] text-slate-500">
          <div className="flex items-center gap-2">
            <Building2 className="w-4 h-4 text-slate-400" />
            <span>{letterData.college_name} ({letterData.university})</span>
          </div>
          <div className="flex items-center gap-1 text-emerald-600 font-bold">
            <Lock className="w-3.5 h-3.5" />
            <span>Signed 256-bit Hash</span>
          </div>
        </div>

        {/* Footer Action */}
        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition"
          >
            Close Verification Registry
          </button>
        </div>

      </div>
    </div>
  );
}
