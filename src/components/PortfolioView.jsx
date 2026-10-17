import React, { useState } from "react";
import { 
  Briefcase, 
  Award, 
  ShieldCheck, 
  Code2, 
  Globe, 
  Copy, 
  Check, 
  ExternalLink, 
  Sparkles, 
  Calendar 
} from "lucide-react";
import { STUDENT_PROFILE } from "../data/initialEvents";

export default function PortfolioView() {
  const [copied, setCopied] = useState(false);
  const [recruiterMode, setRecruiterMode] = useState(false);

  const portfolioUrl = `https://eventroute.ai/@${STUDENT_PROFILE.portfolio_slug}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(portfolioUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      
      {/* Top Banner & Sharing */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 rounded-3xl bg-white/95 backdrop-blur-xl border border-[#E2E7FA] shadow-[0_10px_30px_rgba(89,100,254,0.05)]">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-lg bg-[#DFE3FF] text-[#434EEB] border border-[#C7D2FE] uppercase">
              Auto-Built Credibility
            </span>
            <span className="text-xs text-emerald-700 font-semibold flex items-center gap-1 bg-emerald-50 px-2 py-0.5 rounded-lg border border-emerald-200">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              Verified Institutional Record
            </span>
          </div>
          <h2 className="font-display font-bold text-xl text-[#10174D]">Public Student Portfolio & Recruiter Vault</h2>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setRecruiterMode(!recruiterMode)}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold border transition cursor-pointer ${
              recruiterMode 
                ? "bg-[#DFE3FF] border-[#C7D2FE] text-[#434EEB]" 
                : "bg-[#F8FAFF] border-[#DCE3F9] text-[#525A8B] hover:text-[#10174D]"
            }`}
          >
            {recruiterMode ? "👁️ Recruiter View: Active" : "Preview Recruiter Mode"}
          </button>

          <button
            onClick={handleCopyLink}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-[#5964FE] to-[#7B73FE] hover:opacity-90 text-xs font-semibold text-white shadow-md shadow-[#5964FE]/20 transition cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? "Copied!" : "Copy URL"}</span>
          </button>
        </div>
      </div>

      {/* Profile Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white/95 backdrop-blur-xl border border-[#E2E7FA] shadow-[0_10px_30px_rgba(89,100,254,0.05)] relative overflow-hidden">
        
        {/* Background glow circle */}
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-[#5964FE]/5 rounded-full blur-3xl pointer-events-none"></div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 pb-6 border-b border-[#F0F3FD]">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-[#5964FE] via-[#7B73FE] to-[#9B8CFF] flex items-center justify-center text-white font-bold text-2xl shadow-xl shadow-[#5964FE]/25 ring-4 ring-white shrink-0">
            ML
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <h1 className="font-display font-bold text-2xl text-[#10174D]">{STUDENT_PROFILE.name}</h1>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#DFE3FF] text-[#434EEB] border border-[#C7D2FE] font-bold">
                {STUDENT_PROFILE.xp_points} XP
              </span>
            </div>
            <p className="text-xs sm:text-sm text-[#5964FE] font-semibold">
              {STUDENT_PROFILE.branch} · {STUDENT_PROFILE.year}
            </p>
            <p className="text-xs text-[#525A8B] font-medium">{STUDENT_PROFILE.college}</p>

            <div className="flex items-center gap-4 pt-2">
              <a 
                href={STUDENT_PROFILE.github} 
                target="_blank" 
                rel="noreferrer"
                className="flex items-center gap-1.5 text-xs text-[#525A8B] hover:text-[#10174D] transition"
              >
                <Code2 className="w-3.5 h-3.5 text-[#5964FE]" />
                <span>GitHub</span>
              </a>
              <a 
                href={STUDENT_PROFILE.linkedin} 
                target="_blank" 
                rel="noreferrer"
                className="flex items-center gap-1.5 text-xs text-[#525A8B] hover:text-[#10174D] transition"
              >
                <Globe className="w-3.5 h-3.5 text-[#5964FE]" />
                <span>LinkedIn</span>
              </a>
            </div>
          </div>
        </div>

        {/* Verified Technical Stack */}
        <div className="py-6 border-b border-[#F0F3FD]">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#525A8B] mb-3 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#5964FE]" />
            Verified Technical Competencies
          </h3>
          <div className="flex flex-wrap gap-2">
            {STUDENT_PROFILE.skills.map((skill, idx) => (
              <span 
                key={idx} 
                className="px-3 py-1 rounded-xl bg-[#F8FAFF] border border-[#DCE3F9] text-[#10174D] text-xs font-semibold flex items-center gap-1.5"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#5964FE]"></span>
                <span>{skill}</span>
              </span>
            ))}
          </div>
        </div>

        {/* Badges & Accomplishments */}
        <div className="pt-6">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#525A8B] mb-4 flex items-center gap-1.5">
            <Award className="w-3.5 h-3.5 text-amber-500" />
            Cryptographic Participation Badges ({STUDENT_PROFILE.badges.length})
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {STUDENT_PROFILE.badges.map((b, i) => (
              <div key={i} className="p-4 rounded-2xl bg-[#F8FAFF] border border-[#DCE3F9] flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-[#5964FE] to-[#7B73FE] flex items-center justify-center text-white shrink-0 shadow-sm shadow-[#5964FE]/20">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-xs text-[#10174D]">{b.title}</h4>
                  <p className="text-[11px] text-[#525A8B]">{b.event}</p>
                  <p className="text-[10px] text-[#5964FE] font-medium mt-0.5">{b.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
