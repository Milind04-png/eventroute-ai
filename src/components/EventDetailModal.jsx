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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="bg-slate-900 border border-indigo-500/30 rounded-2xl max-w-2xl w-full p-6 text-white shadow-2xl overflow-y-auto max-h-[90vh]">
        
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 uppercase tracking-wider">
                {event.type}
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                {event.verification_status}
              </span>
            </div>
            <h2 className="font-display font-bold text-xl text-white">{event.title}</h2>
            <p className="text-xs text-slate-400">{event.organizer}</p>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Explainability Section ("Why this opportunity?") */}
        <div className="mt-5 p-4 rounded-xl bg-indigo-950/30 border border-indigo-500/30">
          <div className="flex items-center gap-2 mb-2 text-indigo-300 font-semibold text-xs uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-indigo-400" />
            <span>Explainable AI Attribution ({match.match_percentage || 85}% Fit)</span>
          </div>
          
          <div className="space-y-2 text-xs">
            {whyRec.map((reason, i) => (
              <div key={i} className="flex items-start gap-2 text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>{reason}</span>
              </div>
            ))}

            {whyNot.map((reason, i) => (
              <div key={i} className="flex items-start gap-2 text-rose-300">
                <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <span>{reason}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Event Agenda & Problem Statements */}
        <div className="mt-5">
          <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
            Overview & Problem Statements
          </h4>
          <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/50 p-3 rounded-xl border border-slate-800">
            {event.description}
          </p>
        </div>

        {/* Key Dimensions Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4 text-xs">
          <div className="p-3 rounded-xl bg-slate-800/40 border border-slate-800">
            <div className="text-slate-400 flex items-center gap-1 mb-1">
              <Calendar className="w-3.5 h-3.5 text-indigo-400" />
              <span>Dates</span>
            </div>
            <p className="font-semibold text-slate-200">
              {new Date(event.start_date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
            </p>
          </div>

          <div className="p-3 rounded-xl bg-slate-800/40 border border-slate-800">
            <div className="text-slate-400 flex items-center gap-1 mb-1">
              <Award className="w-3.5 h-3.5 text-emerald-400" />
              <span>Prize Pool</span>
            </div>
            <p className="font-semibold text-emerald-300">{event.prize_pool}</p>
          </div>

          <div className="p-3 rounded-xl bg-slate-800/40 border border-slate-800">
            <div className="text-slate-400 flex items-center gap-1 mb-1">
              <MapPin className="w-3.5 h-3.5 text-amber-400" />
              <span>Location</span>
            </div>
            <p className="font-semibold text-slate-200">{event.city}</p>
          </div>

          <div className="p-3 rounded-xl bg-slate-800/40 border border-slate-800">
            <div className="text-slate-400 flex items-center gap-1 mb-1">
              <ShieldCheck className="w-3.5 h-3.5 text-teal-400" />
              <span>Worth-It</span>
            </div>
            <p className="font-semibold text-teal-300">{event.worth_it_score}/100</p>
          </div>
        </div>

        {/* Logistics & Travel Matching (India-Specific) */}
        {travel && travel.origin !== "Anywhere" && (
          <div className="mt-4 p-3 rounded-xl bg-slate-800/20 border border-slate-800 text-xs">
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-1.5 text-slate-300 font-semibold">
                <Train className="w-3.5 h-3.5 text-indigo-400" />
                <span>Inter-City Travel Logistics ({travel.origin} $\rightarrow$ {travel.destination})</span>
              </div>
              <span className="text-[11px] text-emerald-400 font-semibold">
                {travel.group_pool_count} students pooling
              </span>
            </div>
            <p className="text-slate-400">
              Estimated Transit: <span className="text-slate-200 font-medium">{travel.travel_time}</span> · Est. Cost: <span className="text-slate-200 font-medium">{travel.train_bus_cost}</span>
            </p>
          </div>
        )}

        {/* Action CTAs */}
        <div className="mt-6 pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                onClose();
                onOpenSkillGap(event.id);
              }}
              className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 transition"
            >
              Inspect Skill Gap
            </button>
            <button
              onClick={() => {
                onClose();
                onGenerateOD(event.id);
              }}
              className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-emerald-300 border border-emerald-500/30 transition"
            >
              Draft OD Leave Letter
            </button>
          </div>

          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-xs font-bold text-white transition shadow-lg shadow-indigo-600/20"
          >
            Confirm & Save to Calendar
          </button>
        </div>

      </div>
    </div>
  );
}
