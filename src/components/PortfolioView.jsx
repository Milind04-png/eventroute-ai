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
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 rounded-2xl bg-slate-900 border border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 uppercase">
              Auto-Built Credibility
            </span>
            <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              Verified Institutional Record
            </span>
          </div>
          <h2 className="font-display font-bold text-lg text-white">Public Student Portfolio & Recruiter Vault</h2>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setRecruiterMode(!recruiterMode)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition ${
              recruiterMode 
                ? "bg-amber-500/20 border-amber-400 text-amber-300" 
                : "bg-slate-800 border-slate-700 text-slate-300 hover:text-white"
            }`}
          >
            {recruiterMode ? "👁️ Recruiter View: Active" : "Preview Recruiter Mode"}
          </button>

          <button
            onClick={handleCopyLink}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-xs font-semibold text-white shadow-md transition"
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? "Copied!" : "Copy URL"}</span>
          </button>
        </div>
      </div>

      {/* Profile Card */}
      <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950/40 border border-slate-800 shadow-2xl relative overflow-hidden">
        
        {/* Background glow circle */}
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 pb-6 border-b border-slate-800">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-emerald-500 via-teal-500 to-indigo-600 flex items-center justify-center text-white font-bold text-2xl shadow-xl shadow-emerald-500/20 ring-4 ring-slate-800 shrink-0">
            ML
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <h1 className="font-display font-bold text-2xl text-white">{STUDENT_PROFILE.name}</h1>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 font-semibold">
                {STUDENT_PROFILE.xp_points} XP
              </span>
            </div>
            <p className="text-xs sm:text-sm text-indigo-400 font-medium">
              {STUDENT_PROFILE.branch} · {STUDENT_PROFILE.year}
            </p>
            <p className="text-xs text-slate-400">{STUDENT_PROFILE.college}</p>

            <div className="flex items-center gap-4 pt-2">
              <a 
                href={STUDENT_PROFILE.github} 
                target="_blank" 
                rel="noreferrer"
                className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition"
              >
                <Code2 className="w-3.5 h-3.5 text-indigo-400" />
                <span>GitHub</span>
              </a>
              <a 
                href={STUDENT_PROFILE.linkedin} 
                target="_blank" 
                rel="noreferrer"
                className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition"
              >
                <Globe className="w-3.5 h-3.5 text-emerald-400" />
                <span>LinkedIn</span>
              </a>
            </div>
          </div>
        </div>

        {/* Verified Technical Stack */}
        <div className="py-6 border-b border-slate-800">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            Verified Technical Competencies
          </h3>
          <div className="flex flex-wrap gap-2">
            {STUDENT_PROFILE.skills.map((skill, idx) => (
              <span 
                key={idx} 
                className="px-3 py-1 rounded-xl bg-slate-950 border border-indigo-500/30 text-indigo-200 text-xs font-semibold flex items-center gap-1.5"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                <span>{skill}</span>
              </span>
            ))}
          </div>
        </div>

        {/* Badges & Accomplishments */}
        <div className="pt-6">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4 flex items-center gap-1.5">
            <Award className="w-3.5 h-3.5 text-amber-400" />
            Cryptographic Participation Badges ({STUDENT_PROFILE.badges.length})
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {STUDENT_PROFILE.badges.map((b, i) => (
              <div key={i} className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 flex items-start gap-3">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-tr ${b.color} flex items-center justify-center text-white shrink-0 shadow-md`}>
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-xs text-slate-100">{b.title}</h4>
                  <p className="text-[11px] text-slate-400">{b.event}</p>
                  <p className="text-[10px] text-indigo-400 mt-0.5">{b.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
