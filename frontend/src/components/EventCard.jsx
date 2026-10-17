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
  isUpvoted,
  theme = "light"
}) {
  const [showDownvoteMenu, setShowDownvoteMenu] = useState(false);
  const [registered, setRegistered] = useState(false);
  const isLight = theme === "light";

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
    <div className={`relative rounded-3xl border transition-all duration-300 p-6 flex flex-col justify-between ${
      hasClash 
        ? "bg-rose-50/40 border-rose-200" 
        : isDownvoted
        ? "bg-slate-100/60 border-slate-200 opacity-60" 
        : "bg-white/95 backdrop-blur-xl border-[#E2E7FA] shadow-[0_10px_30px_rgba(89,100,254,0.04)] hover:shadow-[0_20px_45px_rgba(89,100,254,0.1)] hover:border-[#5964FE] hover:-translate-y-1"
    }`}>

      {/* Top Header Row */}
      <div>
        <div className="flex items-start justify-between gap-3 mb-2">
          
          {/* Match Score Badge */}
          <div className="flex items-center gap-2">
            <div className={`px-2.5 py-1 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-xs ${
              matchScore >= 90 
                ? "bg-[#DFE3FF] text-[#434EEB] border border-[#C7D2FE]" 
                : matchScore >= 75
                ? "bg-[#EEF2FE] text-[#434EEB] border border-[#DCE3F9]"
                : "bg-rose-50 text-rose-700 border border-rose-200"
            }`}>
              <Sparkles className="w-3.5 h-3.5 text-[#5964FE]" />
              <span>{matchScore}% Match</span>
            </div>

            {/* Worth-It Score Badge with Tooltip */}
            <div 
              title={`Worth-It Breakdown: Prize/Effort (${event.worth_it_breakdown?.prize_effort_ratio}%), Prestige (${event.worth_it_breakdown?.organizer_prestige}%), Impact (${event.worth_it_breakdown?.career_impact}%)`}
              className="px-2.5 py-1 rounded-xl text-xs font-semibold flex items-center gap-1 cursor-help bg-[#F8FAFF] text-[#10174D] border border-[#DCE3F9]"
            >
              <Award className="w-3.5 h-3.5 text-[#5964FE]" />
              <span>Worth-It: {worthIt}/100</span>
            </div>
          </div>

          {/* Dynamic Feedback Buttons (Upvote / Downvote) */}
          <div className="relative flex items-center gap-1 p-1 rounded-xl border bg-[#F8FAFF] border-[#DCE3F9]">
            <button
              onClick={() => onFeedback(event.id, "upvote")}
              title="Upvote: Boost similar opportunities"
              className={`p-1.5 rounded-lg transition cursor-pointer ${
                isUpvoted 
                  ? "bg-[#5964FE] text-white font-bold" 
                  : "text-[#525A8B] hover:text-[#434EEB] hover:bg-[#EEF2FE]"
              }`}
            >
              <ThumbsUp className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => setShowDownvoteMenu(!showDownvoteMenu)}
              title="Downvote: Adjust weights live"
              className={`p-1.5 rounded-lg transition ${
                isDownvoted 
                  ? "bg-rose-500 text-white font-bold" 
                  : isLight ? "text-slate-500 hover:text-rose-600 hover:bg-slate-200" : "text-slate-400 hover:text-rose-400 hover:bg-slate-800"
              }`}
            >
              <ThumbsDown className="w-3.5 h-3.5" />
            </button>

            {/* Downvote Reason Popup */}
            {showDownvoteMenu && (
              <div className={`absolute right-0 top-10 w-52 rounded-2xl shadow-2xl p-2 z-30 text-xs border ${
                isLight ? "bg-white border-slate-200 text-slate-800" : "bg-slate-900 border-slate-700 text-white"
              }`}>
                <p className={`font-semibold px-2 py-1 border-b mb-1 ${isLight ? "border-slate-100 text-slate-900" : "border-slate-800 text-slate-300"}`}>
                  Why demote this?
                </p>
                <button
                  onClick={() => handleDownvoteTag("Not interested in Web3")}
                  className={`w-full text-left px-2 py-1.5 rounded transition ${
                    isLight ? "hover:bg-rose-50 text-slate-700 hover:text-rose-700" : "hover:bg-rose-500/20 text-slate-300 hover:text-rose-200"
                  }`}
                >
                  👎 Not interested in Web3
                </button>
                <button
                  onClick={() => handleDownvoteTag("Too far (Travel stress)")}
                  className={`w-full text-left px-2 py-1.5 rounded transition ${
                    isLight ? "hover:bg-rose-50 text-slate-700 hover:text-rose-700" : "hover:bg-rose-500/20 text-slate-300 hover:text-rose-200"
                  }`}
                >
                  👎 Too far / Travel stress
                </button>
                <button
                  onClick={() => handleDownvoteTag("Prerequisites too difficult")}
                  className={`w-full text-left px-2 py-1.5 rounded transition ${
                    isLight ? "hover:bg-rose-50 text-slate-700 hover:text-rose-700" : "hover:bg-rose-500/20 text-slate-300 hover:text-rose-200"
                  }`}
                >
                  👎 Prerequisites too difficult
                </button>
              </div>
            )}
          </div>

        </div>

        {/* Schedule Collision Alert Banner */}
        {hasClash && (
          <div className="mb-3 p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
            <span className="font-semibold">{clashNotes[0] || "Clashes with semester internal exam"}</span>
          </div>
        )}

        {/* Title & Organizer */}
        <h3 
          onClick={() => onOpenDetails(event)}
          className="font-display font-bold text-lg cursor-pointer transition line-clamp-1 text-[#10174D] hover:text-[#5964FE]"
        >
          {event.title}
        </h3>
        <p className="text-xs mb-3 text-[#525A8B]">
          {event.organizer}
        </p>

        {/* Metadata Details */}
        <div className="grid grid-cols-2 gap-2 text-xs mb-3 text-[#525A8B]">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-[#5964FE]" />
            <span>{new Date(event.start_date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-[#5964FE]" />
            <span className="truncate">{event.format}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Award className="w-3.5 h-3.5 text-[#5964FE]" />
            <span className="font-bold text-[#434EEB]">{event.prize_pool}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-[#8E9BBF]" />
            <span className="text-[11px] text-[#8E9BBF]">Reg: {new Date(event.registration_deadline).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</span>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {event.tags.slice(0, 3).map((tag, i) => (
            <span 
              key={i} 
              className="text-[10px] font-semibold px-2 py-0.5 rounded-md border bg-[#F8FAFF] text-[#525A8B] border-[#DCE3F9]"
            >
              {tag}
            </span>
          ))}
          {event.tags.length > 3 && (
            <span className="text-[10px] text-[#8E9BBF] py-0.5">+{event.tags.length - 3}</span>
          )}
        </div>

      </div>

      {/* Action Footers */}
      <div className="border-t border-[#F0F3FD] pt-3 flex flex-wrap items-center justify-between gap-2 text-xs">
        
        {/* Left Sub-Actions */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => onOpenSkillGap(event.id)}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl font-semibold transition bg-[#EEF2FE] hover:bg-[#DFE3FF] text-[#434EEB] border border-[#DCE3F9] cursor-pointer"
            title="Inspect Skill Gap & Learning Vault"
          >
            <BookOpen className="w-3.5 h-3.5 text-[#5964FE]" />
            <span className="hidden sm:inline">Skill Gap</span>
          </button>

          <button
            onClick={() => onGenerateOD(event.id)}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl font-semibold transition bg-[#EEF2FE] hover:bg-[#DFE3FF] text-[#434EEB] border border-[#DCE3F9] cursor-pointer"
            title="Generate On-Duty Leave Letter"
          >
            <FileText className="w-3.5 h-3.5 text-[#5964FE]" />
            <span className="hidden sm:inline">OD Letter</span>
          </button>
        </div>

        {/* Right CTA */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => onOpenDetails(event)}
            className="px-2 py-1.5 rounded-lg transition flex items-center gap-0.5 font-medium text-[#525A8B] hover:text-[#10174D] cursor-pointer"
          >
            <span>Why?</span>
            <ChevronRight className="w-3 h-3" />
          </button>

          <button
            onClick={handleRegister}
            disabled={registered}
            className={`px-3.5 py-1.5 rounded-xl font-bold transition cursor-pointer ${
              registered 
                ? "bg-[#DFE3FF] text-[#434EEB] border border-[#C7D2FE] cursor-default" 
                : "bg-gradient-to-r from-[#5964FE] to-[#7B73FE] hover:opacity-90 text-white shadow-md shadow-[#5964FE]/20 active:scale-95"
            }`}
          >
            {registered ? "Registered ✓" : "1-Tap Register"}
          </button>
        </div>

      </div>

    </div>
  );
}
