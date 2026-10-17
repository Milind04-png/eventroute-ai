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

  const [selectedCollege, setSelectedCollege] = useState("DTC_DELHI");
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#10174D]/60 backdrop-blur-md">
      <div className="bg-white/95 backdrop-blur-xl border border-[#E2E7FA] rounded-3xl max-w-3xl w-full p-6 sm:p-7 text-[#10174D] shadow-2xl overflow-y-auto max-h-[92vh]">
        
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between pb-4 border-b border-[#F0F3FD]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#DFE3FF] text-[#434EEB] flex items-center justify-center border border-[#C7D2FE]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-display font-bold text-lg sm:text-xl text-[#10174D]">
                Official On-Duty (OD) Leave Document
              </h2>
              <p className="text-xs text-[#525A8B]">
                Institutional attendance compliance letter with anti-tamper QR verification
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-[#5964FE] to-[#7B73FE] hover:opacity-90 text-xs font-semibold text-white shadow-md shadow-[#5964FE]/20 transition cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-xl text-[#8E9BBF] hover:text-[#10174D] hover:bg-[#EEF2FE] transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* College Template Selector */}
        <div className="mt-4 flex flex-wrap items-center gap-2 text-xs">
          <span className="text-[#525A8B] font-medium">Select College Format:</span>
          {Object.entries(COLLEGE_OD_TEMPLATES).map(([key, val]) => (
            <button
              key={key}
              onClick={() => handleCollegeChange(key)}
              className={`px-3 py-1.5 rounded-xl border transition cursor-pointer ${
                selectedCollege === key 
                  ? "bg-[#DFE3FF] border-[#C7D2FE] text-[#434EEB] font-semibold" 
                  : "bg-[#F8FAFF] border-[#DCE3F9] text-[#525A8B] hover:text-[#10174D]"
              }`}
            >
              {val.college_name.split(" ")[0]} ({val.university.split(" ")[0]})
            </button>
          ))}
        </div>

        {/* Printable Formal Document Preview */}
        <div 
          id="od-printable-letter"
          className="mt-5 p-8 rounded-2xl bg-white text-slate-900 shadow-lg border border-[#E2E7FA] text-xs sm:text-sm font-serif leading-relaxed"
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
          <div className="mb-4 font-sans font-bold text-xs sm:text-sm text-slate-900 bg-[#F8FAFF] p-2.5 rounded-xl border border-[#DCE3F9]">
            {letter.subject}
          </div>

          {/* Body Paragraphs */}
          <div className="space-y-2.5 text-justify text-slate-800 mb-6 font-sans">
            {letter.body_paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          {/* Student Specifics Table */}
          <div className="mb-6 p-3 rounded-xl bg-slate-50 border border-slate-200 font-sans text-xs">
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
              className="flex items-center gap-3 bg-slate-50 hover:bg-[#EEF2FE] p-2 rounded-xl border border-slate-200 cursor-pointer transition group"
              title="Click to view live cryptographic verification registry"
            >
              <div className="w-14 h-14 bg-[#10174D] text-white rounded-lg p-1 flex flex-col items-center justify-center text-center group-hover:scale-105 transition-transform">
                <QrCode className="w-8 h-8 text-[#5964FE]" />
                <span className="text-[7px] text-[#8E9BBF] font-mono mt-0.5">VERIFIED</span>
              </div>
              <div className="text-[10px] text-slate-600">
                <p className="font-bold text-[#10174D] flex items-center gap-1">
                  <span>Scan to Verify</span>
                  <ExternalLink className="w-3 h-3 text-[#5964FE]" />
                </p>
                <p className="font-mono text-[9px] text-[#434EEB] font-semibold">{letter.verification.hash}</p>
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
        <div className="mt-5 pt-3 border-t border-[#F0F3FD] flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-[#525A8B]">
            <span className="font-mono text-[#5964FE] font-semibold">{letter.verification.hash}</span>
            <button
              onClick={handleCopyLink}
              className="flex items-center gap-1 text-[#525A8B] hover:text-[#10174D] transition px-2.5 py-1 rounded-lg bg-[#F8FAFF] border border-[#DCE3F9] cursor-pointer"
            >
              {copied ? <Check className="w-3 h-3 text-[#5964FE]" /> : <Copy className="w-3 h-3" />}
              <span>{copied ? "Copied Link!" : "Copy Verification Link"}</span>
            </button>
          </div>

          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#5964FE] to-[#7B73FE] hover:opacity-90 font-bold text-white transition shadow-lg shadow-[#5964FE]/20 cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>Print Official Letter (PDF)</span>
          </button>
        </div>

      </div>
    </div>
  );
}
