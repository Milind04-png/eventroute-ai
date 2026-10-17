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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#10174D]/60 backdrop-blur-md">
      <div className="bg-white/95 backdrop-blur-xl border border-[#E2E7FA] rounded-3xl max-w-4xl w-full p-6 sm:p-7 text-[#10174D] shadow-2xl overflow-hidden relative">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#F0F3FD]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#DFE3FF] text-[#434EEB] flex items-center justify-center border border-[#C7D2FE]">
              <Scale className="w-5 h-5 text-[#5964FE]" />
            </div>
            <div>
              <h2 className="font-display font-bold text-lg sm:text-xl text-[#10174D]">
                Keyword Search vs. Explainable Semantic Intelligence
              </h2>
              <p className="text-xs text-[#525A8B] font-medium">Step 5 of Judges Demo Flow: The Pitch Closing Proof</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-[#8E9BBF] hover:text-[#10174D] hover:bg-[#EEF2FE] transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Table Comparison */}
        <div className="mt-5 overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#E2E7FA] text-xs uppercase tracking-wider text-[#525A8B]">
                <th className="py-3 px-4 font-bold">Evaluation Vector</th>
                <th className="py-3 px-4 font-bold text-rose-600">Legacy Portals (Unstop / Devfolio)</th>
                <th className="py-3 px-4 font-bold text-[#434EEB] bg-[#DFE3FF]/30 rounded-t-xl">
                  <div className="flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#5964FE]" />
                    EventRoute AI
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E7FA] text-xs sm:text-sm">
              {comparisonRows.map((row, idx) => (
                <tr key={idx} className="hover:bg-[#F8FAFF] transition">
                  <td className="py-3.5 px-4 font-semibold text-[#10174D]">
                    {row.metric}
                  </td>
                  <td className="py-3.5 px-4 text-[#525A8B] leading-relaxed">
                    <div className="flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                      <span>{row.legacy}</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 bg-[#DFE3FF]/20 text-[#10174D] font-medium leading-relaxed">
                    <div className="flex items-start gap-2 text-[#434EEB]">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span className="text-[#10174D]">{row.eventroute}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="mt-5 pt-3 border-t border-[#F0F3FD] flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#5964FE] to-[#7B73FE] hover:opacity-90 text-white font-bold text-xs shadow-md shadow-[#5964FE]/20 transition cursor-pointer"
          >
            Dismiss Comparison
          </button>
        </div>

      </div>
    </div>
  );
}
