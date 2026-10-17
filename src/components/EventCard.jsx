import React, { useState } from "react";
import { 
  Sparkles, 
  Calendar, 
  MapPin, 
  Award, 
  ThumbsUp, 
  ThumbsDown, 
  AlertTriangle, 
  CheckCircle2, 
  BookOpen, 
  FileText, 
  ChevronRight,
  Clock,
  Layers
} from "lucide-react";
import confetti from "canvas-confetti";

export default function EventCard({ 
  event, 
  onOpenDetails, 
  onOpenSkillGap, 
  onGenerateOD, 
  onFeedback,
  isDownvoted,
  isUpvoted 
}) {
  const [showDownvoteMenu, setShowDownvoteMenu] = useState(false);
  const [registered, setRegistered] = useState(false);

  const matchScore = event.ai_match?.match_percentage || 80;
  const worthIt = event.worth_it_score || 85;
  const hasClash = event.ai_match?.has_clash;
  const clashNotes = event.ai_match?.clash_notes || [];

  const handleRegister = (e) => {
    e.stopPropagation();
    setRegistered(true);
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.8 }
    });
  };

  const handleDownvoteTag = (reasonTag) => {
    onFeedback(event.id, "downvote", reasonTag);
    setShowDownvoteMenu(false);
  };

  return (
    <div className={`relative rounded-2xl border transition-all duration-300 p-5 flex flex-col justify-between ${
      hasClash 
        ? "bg-slate-900/60 border-rose-500/40 opacity-90 hover:opacity-100" 
        : isDownvoted
        ? "bg-slate-900/40 border-slate-800 opacity-60"
        : "bg-slate-900/90 border-slate-800 hover:border-indigo-500/50 hover:shadow-xl hover:shadow-indigo-500/10"
    }`}>

      {/* Top Header Row */}
      <div>
        <div className="flex items-start justify-between gap-3 mb-2">
          
          {/* Match Score Badge */}
          <div className="flex items-center gap-2">
            <div className={`px-2.5 py-1 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm ${
              matchScore >= 90 
                ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30" 
                : matchScore >= 75
                ? "bg-indigo-500/20 text-indigo-300 border border-indigo-500/30"
                : "bg-rose-500/20 text-rose-300 border border-rose-500/30"
            }`}>
              <Sparkles className="w-3.5 h-3.5" />
              <span>{matchScore}% Match</span>
            </div>

            {/* Worth-It Score Badge with Tooltip */}
            <div 
              title={`Worth-It Breakdown: Prize/Effort (${event.worth_it_breakdown?.prize_effort_ratio}%), Prestige (${event.worth_it_breakdown?.organizer_prestige}%), Impact (${event.worth_it_breakdown?.career_impact}%)`}
              className="px-2.5 py-1 rounded-xl text-xs font-medium bg-amber-500/10 border border-amber-500/30 text-amber-300 flex items-center gap-1 cursor-help"
            >
              <Award className="w-3.5 h-3.5 text-amber-400" />
              <span>Worth-It: {worthIt}/100</span>
            </div>
          </div>

          {/* Dynamic Feedback Buttons (Upvote / Downvote) */}
          <div className="relative flex items-center gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800">
            <button
              onClick={() => onFeedback(event.id, "upvote")}
              title="Upvote: Boost similar opportunities"
              className={`p-1.5 rounded transition ${
                isUpvoted 
                  ? "bg-emerald-500 text-slate-950 font-bold" 
                  : "text-slate-400 hover:text-emerald-400 hover:bg-slate-800"
              }`}
            >
              <ThumbsUp className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => setShowDownvoteMenu(!showDownvoteMenu)}
              title="Downvote: Adjust weights live"
              className={`p-1.5 rounded transition ${
                isDownvoted 
                  ? "bg-rose-500 text-white font-bold" 
                  : "text-slate-400 hover:text-rose-400 hover:bg-slate-800"
              }`}
            >
              <ThumbsDown className="w-3.5 h-3.5" />
            </button>

            {/* Downvote Reason Popup */}
            {showDownvoteMenu && (
              <div className="absolute right-0 top-10 w-52 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl p-2 z-30 text-xs">
                <p className="font-semibold text-slate-300 px-2 py-1 border-b border-slate-800 mb-1">
                  Why demote this?
                </p>
                <button
                  onClick={() => handleDownvoteTag("Not interested in Web3")}
                  className="w-full text-left px-2 py-1.5 rounded text-slate-300 hover:bg-rose-500/20 hover:text-rose-200 transition"
                >
                  👎 Not interested in Web3
                </button>
                <button
                  onClick={() => handleDownvoteTag("Too far (Travel stress)")}
                  className="w-full text-left px-2 py-1.5 rounded text-slate-300 hover:bg-rose-500/20 hover:text-rose-200 transition"
                >
                  👎 Too far / Travel stress
                </button>
                <button
                  onClick={() => handleDownvoteTag("Prerequisites too difficult")}
                  className="w-full text-left px-2 py-1.5 rounded text-slate-300 hover:bg-rose-500/20 hover:text-rose-200 transition"
                >
                  👎 Prerequisites too difficult
                </button>
              </div>
            )}
          </div>

        </div>

        {/* Schedule Collision Alert Banner */}
        {hasClash && (
          <div className="mb-3 p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
            <span className="font-medium">{clashNotes[0] || "Clashes with semester internal exam"}</span>
          </div>
        )}

        {/* Title & Organizer */}
        <h3 
          onClick={() => onOpenDetails(event)}
          className="font-display font-bold text-lg text-slate-100 hover:text-indigo-400 cursor-pointer transition line-clamp-1"
        >
          {event.title}
        </h3>
        <p className="text-xs text-slate-400 mb-3">{event.organizer}</p>

        {/* Metadata Details */}
        <div className="grid grid-cols-2 gap-2 text-xs text-slate-300 mb-3">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-indigo-400" />
            <span>{new Date(event.start_date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-indigo-400" />
            <span className="truncate">{event.format}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Award className="w-3.5 h-3.5 text-emerald-400" />
            <span className="font-semibold text-emerald-400">{event.prize_pool}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-[11px] text-slate-400">Reg: {new Date(event.registration_deadline).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</span>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {event.tags.slice(0, 3).map((tag, i) => (
            <span key={i} className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 border border-slate-700/50">
              {tag}
            </span>
          ))}
          {event.tags.length > 3 && (
            <span className="text-[10px] text-slate-500 py-0.5">+{event.tags.length - 3}</span>
          )}
        </div>

      </div>

      {/* Action Footers */}
      <div className="border-t border-slate-800/80 pt-3 flex flex-wrap items-center justify-between gap-2 text-xs">
        
        {/* Left Sub-Actions */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => onOpenSkillGap(event.id)}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
            title="Inspect Skill Gap & Learning Vault"
          >
            <BookOpen className="w-3.5 h-3.5 text-indigo-400" />
            <span className="hidden sm:inline">Skill Gap</span>
          </button>

          <button
            onClick={() => onGenerateOD(event.id)}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
            title="Generate On-Duty Leave Letter"
          >
            <FileText className="w-3.5 h-3.5 text-emerald-400" />
            <span className="hidden sm:inline">OD Letter</span>
          </button>
        </div>

        {/* Right CTA */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => onOpenDetails(event)}
            className="px-2.5 py-1.5 rounded-lg text-slate-400 hover:text-white transition flex items-center gap-0.5"
          >
            <span>Why?</span>
            <ChevronRight className="w-3 h-3" />
          </button>

          <button
            onClick={handleRegister}
            disabled={registered}
            className={`px-3 py-1.5 rounded-xl font-semibold transition ${
              registered 
                ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 cursor-default" 
                : "bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/20 active:scale-95"
            }`}
          >
            {registered ? "Registered ✓" : "1-Tap Register"}
          </button>
        </div>

      </div>

    </div>
  );
}
