import React, { useState } from "react";
import { Lightbulb, Sparkles, CheckCircle2, AlertCircle, Wrench, ShieldCheck, ArrowRight } from "lucide-react";

export default function IdeaValidatorModal({ events }) {
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
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/30">
            <Lightbulb className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-display font-bold text-xl text-white">AI Hackathon Idea Validator</h2>
            <p className="text-xs text-slate-400">
              Pre-flight check: Evaluates concept novelty, 24-hour sprint feasibility, and judging track alignment.
            </p>
          </div>
        </div>
      </div>

      {/* Input Form */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
        <div>
          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
            Target Hackathon
          </label>
          <select
            value={targetEvent}
            onChange={(e) => setTargetEvent(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-xl p-3 text-xs text-slate-200 outline-none"
          >
            {events.map((e) => (
              <option key={e.id} value={e.id}>
                {e.title} ({e.organizer})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
            Project Concept Title
          </label>
          <input
            type="text"
            value={ideaTitle}
            onChange={(e) => setIdeaTitle(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-xl p-3 text-xs text-slate-200 outline-none"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
            2-Minute Elevator Pitch & Technical Mechanism
          </label>
          <textarea
            rows={4}
            value={ideaPitch}
            onChange={(e) => setIdeaPitch(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-xl p-3 text-xs text-slate-200 outline-none leading-relaxed"
          />
        </div>

        <button
          onClick={handleValidate}
          disabled={loading}
          className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-lg shadow-amber-500/20 transition active:scale-95 flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <Wrench className="w-4 h-4 animate-spin" />
              <span>Analyzing against judging rubric...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4" />
              <span>Validate Hackathon Pitch</span>
            </>
          )}
        </button>
      </div>

      {/* Validation Report */}
      {result && (
        <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900 to-indigo-950/40 border border-indigo-500/40 space-y-5 animate-in fade-in duration-300">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              <h3 className="font-display font-bold text-base text-white">Validation Verdict: {result.scores.overall_readiness}% Winning Potential</h3>
            </div>
            <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-bold">
              Ready for Submission
            </span>
          </div>

          {/* Tri-Factor Scores */}
          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
              <p className="text-[10px] text-slate-400 uppercase font-bold mb-1">Novelty Index</p>
              <p className="font-display font-bold text-xl text-indigo-400">{result.scores.novelty}%</p>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
              <p className="text-[10px] text-slate-400 uppercase font-bold mb-1">24h Feasibility</p>
              <p className="font-display font-bold text-xl text-emerald-400">{result.scores.feasibility_24h}%</p>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
              <p className="text-[10px] text-slate-400 uppercase font-bold mb-1">Track Alignment</p>
              <p className="font-display font-bold text-xl text-amber-400">{result.scores.track_alignment}%</p>
            </div>
          </div>

          {/* AI Strategic Critique */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs">
            <p className="font-bold text-slate-200 mb-1 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              AI Architect Feedback:
            </p>
            <p className="text-slate-300 leading-relaxed">{result.critique}</p>
          </div>

          {/* Recommended Stack */}
          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-400 font-semibold">Suggested Tech Stack:</span>
            {result.stack.map((item, idx) => (
              <span key={idx} className="px-2 py-0.5 rounded bg-slate-800 text-slate-200 border border-slate-700">
                {item}
              </span>
            ))}
          </div>

        </div>
      )}

    </div>
  );
}
