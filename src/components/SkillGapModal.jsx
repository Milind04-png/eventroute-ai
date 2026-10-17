import React, { useState } from "react";
import { X, CheckCircle2, AlertCircle, BookOpen, Clock, ExternalLink, Sparkles, Check } from "lucide-react";
import confetti from "canvas-confetti";

export default function SkillGapModal({ gapData, isOpen, onClose, onAcquireSkill, theme = "light" }) {
  if (!isOpen || !gapData) return null;

  const [acquiredMap, setAcquiredMap] = useState({});
  const isLight = theme === "light";

  const rawHave = gapData.skills_have || [];
  const rawMissing = gapData.skills_missing || [];

  const have = [...rawHave, ...Object.keys(acquiredMap)];
  const missing = rawMissing.filter(s => !acquiredMap[s]);
  const resources = gapData.learning_resources || [];

  const handleMarkLearned = (skill) => {
    setAcquiredMap(prev => ({ ...prev, [skill]: true }));
    confetti({ particleCount: 50, spread: 60, origin: { y: 0.8 } });
    if (onAcquireSkill) {
      onAcquireSkill(skill);
    }
  };

  const currentFit = Math.round((have.length / (have.length + missing.length || 1)) * 100);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className={`rounded-3xl border max-w-2xl w-full p-6 sm:p-8 shadow-2xl overflow-y-auto max-h-[90vh] transition-colors ${
        isLight ? "bg-white border-slate-200 text-slate-900" : "bg-slate-900 border-indigo-500/40 text-white"
      }`}>
        
        {/* Header */}
        <div className={`flex items-start justify-between pb-4 border-b ${isLight ? "border-slate-100" : "border-slate-800"}`}>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 uppercase tracking-wider">
                AI Skill-Gap Intelligence
              </span>
              <span className="text-xs font-bold text-emerald-600">
                {currentFit}% Stack Alignment
              </span>
            </div>
            <h2 className="font-display font-bold text-xl text-[#0F172A]">
              Prerequisite Analysis: {gapData.event_title}
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Targeted bridges so you enter the hackathon fully equipped.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Two Columns: Have vs Missing */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-5">
          
          {/* Have Column */}
          <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-bold text-xs text-emerald-800 uppercase tracking-wider flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Skills You Have ({have.length})
              </h4>
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded">
                Verified
              </span>
            </div>
            <div className="space-y-1.5">
              {have.map((s, i) => (
                <div key={i} className="flex items-center gap-2 text-xs font-medium text-emerald-900">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  <span>{s}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Missing Column */}
          <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-bold text-xs text-amber-800 uppercase tracking-wider flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4 text-amber-600" />
                Missing Prerequisites ({missing.length})
              </h4>
              <span className="text-[10px] font-bold text-amber-800 bg-amber-100 px-1.5 py-0.5 rounded flex items-center gap-1">
                <Clock className="w-3 h-3 text-amber-600" />
                ~{gapData.total_prep_hours}h prep
              </span>
            </div>
            {missing.length === 0 ? (
              <p className="text-xs text-emerald-700 font-semibold py-1">
                🎉 All prerequisites acquired! You are 100% prepared.
              </p>
            ) : (
              <div className="space-y-2">
                {missing.map((s, i) => (
                  <div key={i} className="flex items-center justify-between gap-2 text-xs text-amber-900 font-semibold bg-white p-2 rounded-xl border border-amber-200">
                    <div className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                      <span>{s}</span>
                    </div>
                    <button
                      onClick={() => handleMarkLearned(s)}
                      className="px-2 py-0.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-[10px] transition cursor-pointer flex items-center gap-1"
                    >
                      <Check className="w-3 h-3" />
                      <span>Learned it!</span>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

        {/* Actionable Learning Resources */}
        <div className="mt-6">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-display font-bold text-sm text-[#0F172A] flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              Curated Fast-Track Resources
            </h4>
            <span className="text-xs text-slate-500">High-yield tutorials for rapid hackathon deployment</span>
          </div>

          <div className="space-y-2.5">
            {resources.map((res, i) => {
              const isDone = acquiredMap[res.skill];
              return (
                <div key={i} className={`p-4 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition ${
                  isDone 
                    ? "bg-emerald-50/50 border-emerald-200" 
                    : isLight ? "bg-slate-50 border-slate-200 hover:border-emerald-300" : "bg-slate-800/40 border-slate-700"
                }`}>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 uppercase">
                        {res.type}
                      </span>
                      <span className="text-xs font-bold text-[#0F172A]">{res.title}</span>
                      {isDone && (
                        <span className="text-[10px] font-bold text-emerald-700 flex items-center gap-0.5">
                          <Check className="w-3 h-3 text-emerald-600" /> Acquired
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-500 leading-relaxed">{res.desc}</p>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <span className="text-xs text-slate-500 flex items-center gap-1 font-medium">
                      <Clock className="w-3.5 h-3.5 text-amber-500" />
                      {res.est_hours}h
                    </span>
                    <a
                      href={res.url}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition"
                    >
                      <span>Learn</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className={`mt-6 pt-4 border-t flex justify-end ${isLight ? "border-slate-100" : "border-slate-800"}`}>
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-bold text-xs transition cursor-pointer"
          >
            Save Progress & Close
          </button>
        </div>

      </div>
    </div>
  );
}
