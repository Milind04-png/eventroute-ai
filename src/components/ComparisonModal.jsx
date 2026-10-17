import React from "react";
import { X, Check, AlertCircle, Sparkles, Scale } from "lucide-react";

export default function ComparisonModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const comparisonRows = [
    {
      metric: "Discovery Paradigm",
      legacy: "Rigid Keyword Search ('AI' brings up 500 outdated non-technical webinars)",
      legacyStatus: "bad",
      eventroute: "Dense Semantic Intent Vectors (Understands resume projects vs problem statements)",
      eventrouteStatus: "good"
    },
    {
      metric: "Explainability & Scoring",
      legacy: "Black Box ('Sponsored' or 'Trending' with zero match rationale)",
      legacyStatus: "bad",
      eventroute: "Multi-factor Hybrid Score breakdown with 'Why Recommended' & 'Why NOT'",
      eventrouteStatus: "good"
    },
    {
      metric: "College Exam Awareness",
      legacy: "Zero academic visibility. Students register, then forfeit due to internal lab exams.",
      legacyStatus: "bad",
      eventroute: "Deterministic Schedule Collision Guard flags hard lab clashes before registration.",
      eventrouteStatus: "good"
    },
    {
      metric: "Actionable Skill Gap",
      legacy: "Only lists generic prerequisites without bridging resources.",
      legacyStatus: "bad",
      eventroute: "Automated 'Have vs Missing' breakdown + curated 2-3 hour prep crash courses.",
      eventrouteStatus: "good"
    },
    {
      metric: "Attendance & OD Paperwork",
      legacy: "Manual student drafting, stressful faculty follow-ups, rejected applications.",
      legacyStatus: "bad",
      eventroute: "1-Click Legally Sound OD Leave Letter with verifiable anti-fraud QR code.",
      eventrouteStatus: "good"
    },
    {
      metric: "Recommendation Feedback",
      legacy: "Static feeds unaffected by user feedback or career preference changes.",
      legacyStatus: "bad",
      eventroute: "Real-time Reinforcement from User Feedback (RLUF) dynamically reranking live.",
      eventrouteStatus: "good"
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="bg-slate-900 border border-indigo-500/40 rounded-2xl max-w-4xl w-full p-6 text-white shadow-2xl overflow-hidden relative">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center border border-indigo-500/30">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-display font-bold text-lg sm:text-xl text-white">
                Keyword Search vs. Explainable Semantic Intelligence
              </h2>
              <p className="text-xs text-slate-400">Step 5 of Judges Demo Flow: The Pitch Closing Proof</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Table Comparison */}
        <div className="mt-5 overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-xs uppercase tracking-wider text-slate-400">
                <th className="py-3 px-4 font-semibold">Evaluation Vector</th>
                <th className="py-3 px-4 font-semibold text-rose-400">Legacy Portals (Unstop / Devfolio)</th>
                <th className="py-3 px-4 font-semibold text-emerald-400 bg-emerald-500/5 rounded-t-xl">
                  <div className="flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                    EventRoute AI
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-xs sm:text-sm">
              {comparisonRows.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-800/30 transition">
                  <td className="py-3.5 px-4 font-medium text-slate-300">
                    {row.metric}
                  </td>
                  <td className="py-3.5 px-4 text-slate-400 leading-relaxed">
                    <div className="flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                      <span>{row.legacy}</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-slate-100 font-medium leading-relaxed bg-emerald-500/5">
                    <div className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{row.eventroute}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer takeaway */}
        <div className="mt-6 pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
          <p>
            <span className="font-semibold text-slate-200">The Student Moat</span>: EventRoute AI transforms opportunity search from passive advertising into an academic co-pilot.
          </p>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold transition"
          >
            Close & Continue Pitch
          </button>
        </div>

      </div>
    </div>
  );
}
