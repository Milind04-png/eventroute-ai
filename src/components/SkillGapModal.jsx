import React from "react";
import { X, CheckCircle2, AlertCircle, BookOpen, Clock, ExternalLink, Sparkles } from "lucide-react";

export default function SkillGapModal({ gapData, isOpen, onClose }) {
  if (!isOpen || !gapData) return null;

  const have = gapData.skills_have || [];
  const missing = gapData.skills_missing || [];
  const resources = gapData.learning_resources || [];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="bg-slate-900 border border-indigo-500/40 rounded-2xl max-w-2xl w-full p-6 text-white shadow-2xl overflow-y-auto max-h-[90vh]">
        
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 uppercase tracking-wider">
                AI Skill-Gap Intelligence
              </span>
              <span className="text-xs font-semibold text-emerald-400">
                {gapData.fit_percentage}% Stack Alignment
              </span>
            </div>
            <h2 className="font-display font-bold text-xl text-white">
              Prerequisite Analysis: {gapData.event_title}
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Targeted bridges so you enter the hackathon fully equipped.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Two Columns: Have vs Missing */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-5">
          
          {/* Have Column */}
          <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/30">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-bold text-xs text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                Skills You Have ({have.length})
              </h4>
              <span className="text-[10px] font-medium text-emerald-300 bg-emerald-500/20 px-1.5 py-0.5 rounded">
                Verified
              </span>
            </div>
            <div className="space-y-1.5">
              {have.map((s, i) => (
                <div key={i} className="flex items-center gap-2 text-xs text-slate-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                  <span>{s}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Missing Column */}
          <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-500/30">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-bold text-xs text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4" />
                Missing Prerequisites ({missing.length})
              </h4>
              <span className="text-[10px] font-medium text-amber-300 bg-amber-500/20 px-1.5 py-0.5 rounded flex items-center gap-1">
                <Clock className="w-3 h-3" />
                ~{gapData.total_prep_hours}h prep
              </span>
            </div>
            {missing.length === 0 ? (
              <p className="text-xs text-emerald-300">No missing skills! You're 100% prepared.</p>
            ) : (
              <div className="space-y-1.5">
                {missing.map((s, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-amber-200 font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                    <span>{s}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

        {/* Actionable Learning Resources */}
        <div className="mt-6">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-display font-bold text-sm text-slate-200 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-indigo-400" />
              Curated Fast-Track Resources
            </h4>
            <span className="text-xs text-slate-400">High-yield tutorials for rapid hackathon deployment</span>
          </div>

          <div className="space-y-2.5">
            {resources.map((res, i) => (
              <div key={i} className="p-3.5 rounded-xl bg-slate-800/40 border border-slate-700/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-indigo-500/40 transition">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-300 uppercase">
                      {res.type}
                    </span>
                    <span className="text-xs font-semibold text-slate-200">{res.title}</span>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">{res.desc}</p>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <span className="text-xs text-slate-400 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-amber-400" />
                    {res.est_hours}h
                  </span>
                  <a
                    href={res.url}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition"
                  >
                    <span>Learn</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white transition"
          >
            Got it, Add to Study Plan
          </button>
        </div>

      </div>
    </div>
  );
}
