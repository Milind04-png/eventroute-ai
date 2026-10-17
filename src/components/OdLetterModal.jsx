import React, { useState } from "react";
import { 
  X, 
  Printer, 
  ShieldCheck, 
  Check, 
  Copy, 
  QrCode, 
  Building2, 
  ExternalLink 
} from "lucide-react";
import { COLLEGE_OD_TEMPLATES } from "../data/initialEvents";
import { generateClientODLetter } from "../services/aiEngine";

export default function OdLetterModal({ 
  event, 
  letterData, 
  isOpen, 
  onClose,
  onVerifyClick
}) {
  if (!isOpen || !event) return null;

  const [selectedCollege, setSelectedCollege] = useState("TSEC_MUMBAI");
  const [copied, setCopied] = useState(false);

  // Generate or use passed letter data
  const letter = letterData || generateClientODLetter(event, selectedCollege);

  const handleCollegeChange = (key) => {
    setSelectedCollege(key);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(letter.verification.url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="bg-slate-900 border border-emerald-500/40 rounded-2xl max-w-3xl w-full p-6 text-white shadow-2xl overflow-y-auto max-h-[92vh]">
        
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-display font-bold text-lg sm:text-xl text-white">
                Official On-Duty (OD) Leave Document
              </h2>
              <p className="text-xs text-slate-400">
                Institutional attendance compliance letter with anti-tamper QR verification
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-xs font-semibold text-white shadow-md transition"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* College Template Selector */}
        <div className="mt-4 flex flex-wrap items-center gap-2 text-xs">
          <span className="text-slate-400 font-medium">Select College Format:</span>
          {Object.entries(COLLEGE_OD_TEMPLATES).map(([key, val]) => (
            <button
              key={key}
              onClick={() => handleCollegeChange(key)}
              className={`px-3 py-1 rounded-lg border transition ${
                selectedCollege === key 
                  ? "bg-emerald-500/20 border-emerald-400 text-emerald-300 font-semibold" 
                  : "bg-slate-800/60 border-slate-700 text-slate-400 hover:text-slate-200"
              }`}
            >
              {val.college_name.split(" ")[0]} ({val.university.split(" ")[0]})
            </button>
          ))}
        </div>

        {/* Printable Formal Document Preview */}
        <div 
          id="od-printable-letter"
          className="mt-5 p-8 rounded-xl bg-white text-slate-900 shadow-xl border border-slate-300 text-xs sm:text-sm font-serif leading-relaxed"
        >
          {/* Official Letterhead */}
          <div className="text-center border-b-2 border-slate-900 pb-4 mb-5">
            <h1 className="font-sans font-bold text-lg sm:text-xl tracking-wide uppercase text-slate-900">
              {letter.college_name}
            </h1>
            <p className="text-xs font-sans text-slate-600 uppercase font-semibold">
              (Affiliated to {letter.university})
            </p>
            <p className="text-[11px] font-sans text-slate-500 mt-0.5">
              {letter.college_address}
            </p>
          </div>

          {/* Reference & Date */}
          <div className="flex justify-between items-center text-xs text-slate-700 mb-4 font-mono font-semibold">
            <span>Ref: {letter.ref_number}</span>
            <span>Date: {letter.generated_date}</span>
          </div>

          {/* Recipient */}
          <div className="mb-4 text-xs font-sans">
            <p className="font-semibold text-slate-900">To,</p>
            <p className="font-semibold text-slate-900">{letter.to_recipient.name}</p>
            <p className="text-slate-700">{letter.to_recipient.designation}</p>
            <p className="text-slate-700">{letter.to_recipient.institution}</p>
          </div>

          {/* Subject */}
          <div className="mb-4 font-sans font-bold text-xs sm:text-sm text-slate-900 bg-slate-100 p-2 rounded border border-slate-300">
            {letter.subject}
          </div>

          {/* Body Paragraphs */}
          <div className="space-y-2.5 text-justify text-slate-800 mb-6 font-sans">
            {letter.body_paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          {/* Student Specifics Table */}
          <div className="mb-6 p-3 rounded bg-slate-50 border border-slate-200 font-sans text-xs">
            <div className="grid grid-cols-2 gap-2">
              <div><span className="font-semibold text-slate-700">Student Name:</span> {letter.student_details.name}</div>
              <div><span className="font-semibold text-slate-700">Roll No:</span> {letter.student_details.roll_no}</div>
              <div><span className="font-semibold text-slate-700">Branch & Year:</span> {letter.student_details.branch} ({letter.student_details.year})</div>
              <div><span className="font-semibold text-slate-700">Current Attendance:</span> {letter.student_details.current_attendance}</div>
            </div>
          </div>

          {/* Verification Box & Signatures */}
          <div className="pt-4 border-t border-slate-300 flex flex-row items-center justify-between gap-4 font-sans">
            
            {/* Anti-Tamper QR Verification */}
            <div 
              onClick={() => onVerifyClick && onVerifyClick(letter)}
              className="flex items-center gap-3 bg-slate-50 hover:bg-emerald-50/60 p-2 rounded-xl border border-slate-200 cursor-pointer transition group"
              title="Click to view live cryptographic verification registry"
            >
              <div className="w-14 h-14 bg-slate-900 text-white rounded-lg p-1 flex flex-col items-center justify-center text-center group-hover:scale-105 transition-transform">
                <QrCode className="w-8 h-8 text-emerald-400" />
                <span className="text-[7px] text-slate-300 font-mono mt-0.5">VERIFIED</span>
              </div>
              <div className="text-[10px] text-slate-600">
                <p className="font-bold text-slate-800 flex items-center gap-1">
                  <span>Scan to Verify</span>
                  <ExternalLink className="w-3 h-3 text-emerald-600" />
                </p>
                <p className="font-mono text-[9px] text-emerald-700 font-semibold">{letter.verification.hash}</p>
                <p className="text-[8px] text-slate-500">Click to view official registry</p>
              </div>
            </div>

            {/* Signature Blocks */}
            <div className="flex gap-8 text-center text-[11px]">
              <div>
                <div className="w-24 border-b border-slate-700 mb-1 h-6"></div>
                <p className="font-semibold text-slate-800">Student Signature</p>
              </div>
              <div>
                <div className="w-24 border-b border-slate-700 mb-1 h-6"></div>
                <p className="font-semibold text-slate-800">HOD / Dean Approval</p>
              </div>
            </div>

          </div>

        </div>

        {/* Modal Action Footer */}
        <div className="mt-5 pt-3 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-slate-400">
            <span className="font-mono text-emerald-400 font-semibold">{letter.verification.hash}</span>
            <button
              onClick={handleCopyLink}
              className="flex items-center gap-1 text-slate-300 hover:text-white transition px-2 py-1 rounded bg-slate-800"
            >
              {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
              <span>{copied ? "Copied Link!" : "Copy Verification Link"}</span>
            </button>
          </div>

          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 font-bold text-white transition shadow-lg shadow-emerald-600/20"
          >
            <Printer className="w-4 h-4" />
            <span>Print Official Letter (PDF)</span>
          </button>
        </div>

      </div>
    </div>
  );
}
