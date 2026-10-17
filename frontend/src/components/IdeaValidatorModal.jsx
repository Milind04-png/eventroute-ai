import React, { useState } from "react";
import { Lightbulb, Sparkles, CheckCircle2, AlertCircle, Wrench, ShieldCheck, ArrowRight } from "lucide-react";

export default function IdeaValidatorModal({ events = [] }) {
  const [targetEvent, setTargetEvent] = useState("evt_hackai_pune_26");
  const [ideaTitle, setIdeaTitle] = useState("MediScan Edge: Instant Offline Chest X-Ray Triage");
  const [ideaPitch, setIdeaPitch] = useState("A lightweight multimodal edge application that runs quantized TensorRT vision models locally on low-cost devices to detect pneumonia and lung opacities in remote clinics with zero internet.");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleValidate = () => {
    setLoading(true);
    setTimeout(() => {
      setResult({
        title: ideaTitle,
        scores: {
          novelty: 91,
          feasibility_24h: 84,
          track_alignment: 96,
          overall_readiness: 90
        },
        critique: "Outstanding pitch for the HackAI Pune Healthcare track! High technical impact. For a 36-hour sprint, keep your training pipeline frozen and use pre-trained weights with ONNX runtime to guarantee a working live demo for judges.",
        stack: ["FastAPI", "React 19", "TensorRT / ONNX", "Tailwind CSS"]
      });
      setLoading(false);
    }, 800);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      
      {/* Banner */}
      <div className="p-6 sm:p-7 rounded-3xl bg-white/95 backdrop-blur-xl border border-[#E2E7FA] shadow-[0_10px_30px_rgba(89,100,254,0.05)]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#DFE3FF] text-[#434EEB] flex items-center justify-center border border-[#C7D2FE]">
            <Lightbulb className="w-5 h-5 text-[#5964FE]" />
          </div>
          <div>
            <h2 className="font-display font-bold text-xl text-[#10174D]">AI Hackathon Idea Validator</h2>
            <p className="text-xs text-[#525A8B] font-medium">
              Pre-flight check: Evaluates concept novelty, 24-hour sprint feasibility, and judging track alignment.
            </p>
          </div>
        </div>
      </div>

      {/* Input Form */}
      <div className="p-6 sm:p-7 rounded-3xl bg-white/95 backdrop-blur-xl border border-[#E2E7FA] shadow-[0_10px_30px_rgba(89,100,254,0.05)] space-y-4">
        <div>
          <label className="block text-xs font-semibold text-[#525A8B] uppercase tracking-wider mb-1.5">
            Target Hackathon
          </label>
          <select
            value={targetEvent}
            onChange={(e) => setTargetEvent(e.target.value)}
            className="w-full bg-[#F8FAFF] border border-[#DCE3F9] focus:border-[#5964FE] rounded-2xl p-3 text-xs text-[#10174D] font-medium outline-none"
          >
            {events.map((e) => (
              <option key={e.id} value={e.id}>
                {e.title} ({e.organizer})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-[#525A8B] uppercase tracking-wider mb-1.5">
            Project Concept Title
          </label>
          <input
            type="text"
            value={ideaTitle}
            onChange={(e) => setIdeaTitle(e.target.value)}
            className="w-full bg-[#F8FAFF] border border-[#DCE3F9] focus:border-[#5964FE] rounded-2xl p-3 text-xs text-[#10174D] font-medium outline-none"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-[#525A8B] uppercase tracking-wider mb-1.5">
            2-Minute Elevator Pitch & Technical Mechanism
          </label>
          <textarea
            rows={4}
            value={ideaPitch}
            onChange={(e) => setIdeaPitch(e.target.value)}
            className="w-full bg-[#F8FAFF] border border-[#DCE3F9] focus:border-[#5964FE] rounded-2xl p-3 text-xs text-[#10174D] outline-none leading-relaxed"
          />
        </div>

        <button
          onClick={handleValidate}
          disabled={loading}
          className="w-full py-3 rounded-2xl bg-gradient-to-r from-[#5964FE] to-[#7B73FE] hover:opacity-95 text-white font-bold text-xs uppercase tracking-wider shadow-md shadow-[#5964FE]/20 transition active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
        >
          {loading ? (
            <>
              <Wrench className="w-4 h-4 animate-spin text-white" />
              <span>Analyzing against judging rubric...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4 text-white" />
              <span>Validate Concept Feasibility & Track Alignment</span>
            </>
          )}
        </button>
      </div>

      {/* Validation Results */}
      {result && (
        <div className="p-6 sm:p-7 rounded-3xl bg-white/95 backdrop-blur-xl border border-[#E2E7FA] shadow-[0_10px_30px_rgba(89,100,254,0.05)] space-y-4 animate-in fade-in duration-300">
          <div className="flex items-center justify-between pb-3 border-b border-[#F0F3FD]">
            <h3 className="font-display font-bold text-lg text-[#10174D]">{result.title}</h3>
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#DFE3FF] text-[#434EEB] border border-[#C7D2FE]">
              Overall Readiness: {result.scores.overall_readiness}%
            </span>
          </div>

          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="p-3 rounded-2xl bg-[#F8FAFF] border border-[#DCE3F9]">
              <p className="text-[10px] text-[#525A8B] font-bold uppercase">Novelty Score</p>
              <p className="font-display font-extrabold text-xl text-[#5964FE] mt-0.5">{result.scores.novelty}%</p>
            </div>
            <div className="p-3 rounded-2xl bg-[#F8FAFF] border border-[#DCE3F9]">
              <p className="text-[10px] text-[#525A8B] font-bold uppercase">24h Feasibility</p>
              <p className="font-display font-extrabold text-xl text-emerald-600 mt-0.5">{result.scores.feasibility_24h}%</p>
            </div>
            <div className="p-3 rounded-2xl bg-[#F8FAFF] border border-[#DCE3F9]">
              <p className="text-[10px] text-[#525A8B] font-bold uppercase">Track Alignment</p>
              <p className="font-display font-extrabold text-xl text-[#7B73FE] mt-0.5">{result.scores.track_alignment}%</p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#F8FAFF] border border-[#DCE3F9] text-xs text-[#525A8B] leading-relaxed">
            <p className="font-bold text-[#10174D] mb-1">AI Rubric Advisory:</p>
            <p>{result.critique}</p>
          </div>

          <div>
            <p className="text-xs font-bold text-[#525A8B] uppercase tracking-wider mb-2">Recommended Lean Stack:</p>
            <div className="flex flex-wrap gap-1.5">
              {result.stack.map((s, idx) => (
                <span key={idx} className="px-3 py-1 rounded-xl bg-[#DFE3FF] text-[#434EEB] border border-[#C7D2FE] text-xs font-bold">
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
