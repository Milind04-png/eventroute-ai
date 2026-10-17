import React, { useState } from "react";
import { Sparkles, ArrowRight, CheckCircle2, ThumbsDown, FileText, Scale, X, MessageSquare, BookOpen, RefreshCw } from "lucide-react";

export default function DemoWalkthrough({
  isOpen,
  onClose,
  currentStep,
  setCurrentStep,
  onOpenChatWithPrompt,
  onOpenSkillGap,
  onTriggerDownvoteDemo,
  onOpenODLetterDemo,
  onOpenComparisonModal
}) {
  if (!isOpen) return null;

  const steps = [
    {
      step: 1,
      title: "1. Exam-Aware AI Assistant",
      desc: "Ask the co-pilot for weekend AI hackathons. Watch it cross-reference Rahul's DBMS exam and recommend HackAI Pune.",
      actionLabel: "Run Step 1 in Chatbot",
      actionIcon: MessageSquare,
      onAction: () => onOpenChatWithPrompt("Find me an AI hackathon this weekend that won't clash with my exams")
    },
    {
      step: 2,
      title: "2. Explainable Skill-Gap Breakdown",
      desc: "Inspect HackAI Pune's match. See 3/4 skills matched, PyTorch missing, and curated 2-hour crash courses.",
      actionLabel: "Inspect Skill Gap Card",
      actionIcon: BookOpen,
      onAction: () => onOpenSkillGap("evt_hackai_pune_26")
    },
    {
      step: 3,
      title: "3. Dynamic Feedback Reranking",
      desc: "Click 👎 on 'Web3 DeFi Sprint' with 'Not interested in Web3'. Watch the model adjust weights live before judges.",
      actionLabel: "Simulate 👎 Reranking",
      actionIcon: ThumbsDown,
      onAction: () => onTriggerDownvoteDemo()
    },
    {
      step: 4,
      title: "4. Instant Academic OD Leave Letter",
      desc: "One click compiles an official Mumbai University leave letter with anti-tamper QR code and HOD salutation.",
      actionLabel: "Generate Official OD Letter",
      actionIcon: FileText,
      onAction: () => onOpenODLetterDemo("evt_hackai_pune_26")
    },
    {
      step: 5,
      title: "5. Semantic vs. Keyword Comparison",
      desc: "Display the side-by-side comparison table proving why legacy portals fail Indian engineering students.",
      actionLabel: "Open Comparison Table",
      actionIcon: Scale,
      onAction: () => onOpenComparisonModal()
    }
  ];

  const active = steps[currentStep - 1] || steps[0];

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-4xl bg-slate-900/95 border-2 border-indigo-500/60 backdrop-blur-xl rounded-2xl shadow-2xl p-4 sm:p-5 text-white glow-indigo">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/40">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-display font-bold text-sm sm:text-base text-slate-100 flex items-center gap-2">
              Judges Demo Playbook Flow
              <span className="text-[10px] font-normal px-2 py-0.5 rounded-full bg-indigo-500/30 text-indigo-200">
                Step {currentStep} of {steps.length}
              </span>
            </h3>
            <p className="text-xs text-slate-400 hidden sm:block">Fulfills Section 14: Judges ke liye Demo Flow</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onOpenComparisonModal}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 font-medium transition"
          >
            <Scale className="w-3.5 h-3.5 text-indigo-400" />
            Comparison Table
          </button>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Step Stepper Circles */}
      <div className="grid grid-cols-5 gap-1.5 sm:gap-2 mb-4">
        {steps.map((s) => {
          const isDone = s.step < currentStep;
          const isCurrent = s.step === currentStep;
          return (
            <button
              key={s.step}
              onClick={() => setCurrentStep(s.step)}
              className={`p-2 rounded-xl text-left border transition-all ${
                isCurrent 
                  ? "bg-indigo-600/30 border-indigo-400 text-white" 
                  : isDone
                  ? "bg-emerald-950/30 border-emerald-800 text-slate-300"
                  : "bg-slate-800/40 border-slate-800 text-slate-500 hover:text-slate-300"
              }`}
            >
              <div className="flex items-center gap-1.5 mb-1">
                {isDone ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                ) : (
                  <span className={`w-3.5 h-3.5 rounded-full text-[9px] flex items-center justify-center font-bold ${isCurrent ? "bg-indigo-500 text-white" : "bg-slate-700 text-slate-400"}`}>
                    {s.step}
                  </span>
                )}
                <span className="text-[11px] font-semibold truncate hidden md:inline">{s.title.split(". ")[1]}</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Step Content & Action CTA */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
        <div>
          <h4 className="font-semibold text-sm text-indigo-300 flex items-center gap-2">
            {active.title}
          </h4>
          <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">
            {active.desc}
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={active.onAction}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-400 hover:to-indigo-500 text-white font-semibold text-xs shadow-md transition transform active:scale-95"
          >
            <active.actionIcon className="w-4 h-4" />
            {active.actionLabel}
          </button>

          {currentStep < steps.length ? (
            <button
              onClick={() => setCurrentStep(prev => prev + 1)}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
              title="Next Step"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={() => setCurrentStep(1)}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
              title="Restart Tour"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
