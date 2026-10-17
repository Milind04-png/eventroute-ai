import React from "react";
import { 
  X, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  MapPin, 
  Calendar, 
  Award, 
  Users, 
  Train, 
  ShieldCheck, 
  ExternalLink 
} from "lucide-react";

export default function EventDetailModal({ 
  event, 
  isOpen, 
  onClose, 
  onOpenSkillGap, 
  onGenerateOD 
}) {
  if (!isOpen || !event) return null;

  const match = event.ai_match || {};
  const whyRec = match.why_recommended || [];
  const whyNot = match.why_not_recommended || [];
  const travel = event.travel_estimate;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#10174D]/60 backdrop-blur-md">
      <div className="bg-white/95 backdrop-blur-xl border border-[#E2E7FA] rounded-3xl max-w-2xl w-full p-6 sm:p-7 text-[#10174D] shadow-2xl overflow-y-auto max-h-[90vh]">
        
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-[#F0F3FD]">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-lg bg-[#DFE3FF] text-[#434EEB] border border-[#C7D2FE] uppercase tracking-wider">
                {event.type}
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200">
                {event.verification_status}
              </span>
            </div>
            <h2 className="font-display font-bold text-xl text-[#10174D]">{event.title}</h2>
            <p className="text-xs text-[#525A8B] font-medium">{event.organizer}</p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-[#8E9BBF] hover:text-[#10174D] hover:bg-[#EEF2FE] transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Explainability Section ("Why this opportunity?") */}
        <div className="mt-5 p-4 rounded-2xl bg-[#F8FAFF] border border-[#DCE3F9]">
          <div className="flex items-center gap-2 mb-2 text-[#434EEB] font-semibold text-xs uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-[#5964FE]" />
            <span>Explainable AI Attribution ({match.match_percentage || 85}% Fit)</span>
          </div>
          
          <div className="space-y-2 text-xs">
            {whyRec.map((reason, i) => (
              <div key={i} className="flex items-start gap-2 text-[#525A8B]">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>{reason}</span>
              </div>
            ))}

            {whyNot.map((reason, i) => (
              <div key={i} className="flex items-start gap-2 text-rose-700">
                <AlertCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                <span>{reason}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Event Agenda & Problem Statements */}
        <div className="mt-5">
          <h4 className="text-xs font-bold text-[#525A8B] uppercase tracking-wider mb-2">
            Overview & Problem Statements
          </h4>
          <p className="text-xs text-[#525A8B] leading-relaxed bg-[#F8FAFF] p-3 rounded-2xl border border-[#DCE3F9]">
            {event.description}
          </p>
        </div>

        {/* Key Dimensions Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4 text-xs">
          <div className="p-3 rounded-2xl bg-[#F8FAFF] border border-[#DCE3F9]">
            <div className="text-[#525A8B] flex items-center gap-1 mb-1 font-medium">
              <Calendar className="w-3.5 h-3.5 text-[#5964FE]" />
              <span>Dates</span>
            </div>
            <p className="font-semibold text-[#10174D]">
              {new Date(event.start_date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
            </p>
          </div>

          <div className="p-3 rounded-2xl bg-[#F8FAFF] border border-[#DCE3F9]">
            <div className="text-[#525A8B] flex items-center gap-1 mb-1 font-medium">
              <Award className="w-3.5 h-3.5 text-emerald-600" />
              <span>Prize Pool</span>
            </div>
            <p className="font-semibold text-emerald-700">{event.prize_pool}</p>
          </div>

          <div className="p-3 rounded-2xl bg-[#F8FAFF] border border-[#DCE3F9]">
            <div className="text-[#525A8B] flex items-center gap-1 mb-1 font-medium">
              <MapPin className="w-3.5 h-3.5 text-amber-500" />
              <span>Location</span>
            </div>
            <p className="font-semibold text-[#10174D]">{event.city}</p>
          </div>

          <div className="p-3 rounded-2xl bg-[#F8FAFF] border border-[#DCE3F9]">
            <div className="text-[#525A8B] flex items-center gap-1 mb-1 font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-[#5964FE]" />
              <span>Worth-It</span>
            </div>
            <p className="font-semibold text-[#5964FE]">{event.worth_it_score}/100</p>
          </div>
        </div>

        {/* Logistics & Travel Matching (India-Specific) */}
        {travel && travel.origin !== "Anywhere" && (
          <div className="mt-4 p-3 rounded-2xl bg-[#F8FAFF] border border-[#DCE3F9] text-xs">
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-1.5 text-[#10174D] font-semibold">
                <Train className="w-3.5 h-3.5 text-[#5964FE]" />
                <span>Inter-City Travel Logistics ({travel.origin} $\rightarrow$ {travel.destination})</span>
              </div>
              <span className="text-[11px] text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded-lg border border-emerald-200">
                {travel.group_pool_count} students pooling
              </span>
            </div>
            <p className="text-[#525A8B]">
              Estimated Transit: <span className="text-[#10174D] font-medium">{travel.travel_time}</span> · Est. Cost: <span className="text-[#10174D] font-medium">{travel.train_bus_cost}</span>
            </p>
          </div>
        )}

        {/* Action CTAs */}
        <div className="mt-6 pt-4 border-t border-[#F0F3FD] flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                onClose();
                onOpenSkillGap(event.id);
              }}
              className="px-3.5 py-2 rounded-xl bg-[#DFE3FF] hover:bg-[#D0D7FE] text-xs font-semibold text-[#434EEB] border border-[#C7D2FE] transition cursor-pointer"
            >
              Inspect Skill Gap
            </button>
            <button
              onClick={() => {
                onClose();
                onGenerateOD(event.id);
              }}
              className="px-3.5 py-2 rounded-xl bg-[#F8FAFF] hover:bg-[#EEF2FE] text-xs font-semibold text-[#10174D] border border-[#DCE3F9] transition cursor-pointer"
            >
              Draft OD Leave Letter
            </button>
          </div>

          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#5964FE] to-[#7B73FE] hover:opacity-90 text-xs font-bold text-white transition shadow-md shadow-[#5964FE]/20 cursor-pointer"
          >
            Confirm & Save to Calendar
          </button>
        </div>

      </div>
    </div>
  );
}
