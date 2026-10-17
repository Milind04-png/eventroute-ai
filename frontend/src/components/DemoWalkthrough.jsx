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
      desc: "Ask the co-pilot for weekend AI hackathons. Watch it cross-reference Milind's DBMS exam and recommend HackAI Pune.",
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
      desc: "One click compiles an official Delhi Technical Campus / Mumbai Univ leave letter with anti-tamper QR code.",
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
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-4xl bg-white/95 border-2 border-[#C7D2FE] backdrop-blur-xl rounded-3xl shadow-[0_20px_60px_rgba(89,100,254,0.2)] p-4 sm:p-5 text-[#10174D]">
      <div className="flex items-center justify-between border-b border-[#F0F3FD] pb-3 mb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-[#DFE3FF] text-[#434EEB] flex items-center justify-center border border-[#C7D2FE]">
            <Sparkles className="w-4 h-4 text-[#5964FE]" />
          </div>
          <div>
            <h3 className="font-display font-bold text-sm sm:text-base text-[#10174D] flex items-center gap-2">
              Judges Demo Playbook Flow
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#DFE3FF] text-[#434EEB] border border-[#C7D2FE]">
                Step {currentStep} of {steps.length}
              </span>
            </h3>
            <p className="text-xs text-[#525A8B] hidden sm:block font-medium">Deterministic Showcase for Evaluation</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onOpenComparisonModal}
            className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-[#F8FAFF] hover:bg-[#EEF2FE] border border-[#DCE3F9] text-xs text-[#10174D] font-medium transition cursor-pointer"
          >
            <Scale className="w-3.5 h-3.5 text-[#5964FE]" />
            Comparison Table
          </button>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-[#8E9BBF] hover:text-[#10174D] hover:bg-[#EEF2FE] transition cursor-pointer"
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
              className={`p-2 rounded-xl text-left border transition-all cursor-pointer ${
                isCurrent 
                  ? "bg-[#DFE3FF] border-[#5964FE] text-[#434EEB] font-bold" 
                  : isDone
                  ? "bg-emerald-50 border-emerald-200 text-emerald-800"
                  : "bg-[#F8FAFF] border-[#DCE3F9] text-[#525A8B] hover:text-[#10174D]"
              }`}
            >
              <div className="flex items-center gap-1.5 mb-1">
                {isDone ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                ) : (
                  <span className={`w-3.5 h-3.5 rounded-full text-[9px] flex items-center justify-center font-bold ${isCurrent ? "bg-[#5964FE] text-white" : "bg-[#DFE3FF] text-[#434EEB]"}`}>
                    {s.step}
                  </span>
                )}
                <span className="text-[11px] truncate hidden md:inline">{s.title.split(". ")[1]}</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Step Content & Action CTA */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#F8FAFF] p-3.5 rounded-2xl border border-[#DCE3F9]">
        <div>
          <h4 className="font-semibold text-sm text-[#434EEB] flex items-center gap-2">
            {active.title}
          </h4>
          <p className="text-xs text-[#525A8B] mt-0.5 leading-relaxed font-medium">
            {active.desc}
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={active.onAction}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-[#5964FE] to-[#7B73FE] hover:opacity-90 text-white font-semibold text-xs shadow-md shadow-[#5964FE]/20 transition transform active:scale-95 cursor-pointer"
          >
            <active.actionIcon className="w-4 h-4" />
            {active.actionLabel}
          </button>

          {currentStep < steps.length ? (
            <button
              onClick={() => setCurrentStep(prev => prev + 1)}
              className="p-2 rounded-xl bg-white hover:bg-[#EEF2FE] border border-[#DCE3F9] text-[#10174D] transition cursor-pointer"
              title="Next Step"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={() => setCurrentStep(1)}
              className="p-2 rounded-xl bg-white hover:bg-[#EEF2FE] border border-[#DCE3F9] text-[#10174D] transition cursor-pointer"
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
