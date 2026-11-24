import React, { useState } from "react";
import { 
  motion, 
  useMotionValue, 
  useTransform, 
  AnimatePresence 
} from "framer-motion";
import { 
  FileCheck, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  Zap, 
  PlayCircle, 
  FileText, 
  MapPin, 
  Send, 
  HelpCircle,
  Flame,
  Undo2,
  RotateCcw,
  Calendar,
  Award,
  AlertTriangle,
  BookmarkCheck,
  Sliders,
  MoveRight,
  MoveLeft,
  MoveUp,
  Hand,
  Maximize2,
  ShieldCheck
} from "lucide-react";

/**
 * Draggable Swipe Card inside AI Opportunity Tool with True Kinetic Touch & Mouse Gestures
 */
function EmbeddedSwipeCard({ 
  event, 
  isTop, 
  index, 
  onSwipe, 
  onOpenDetails, 
  onOpenSkillGap 
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotate = useTransform(x, [-220, 220], [-18, 18]);
  const scale = useTransform(x, [-220, 0, 220], [1.03, 1, 1.03]);

  const rightOverlayOpacity = useTransform(x, [20, 95], [0, 1]);
  const leftOverlayOpacity = useTransform(x, [-20, -95], [0, 1]);
  const upOverlayOpacity = useTransform(y, [-20, -85], [0, 1]);

  const cardBorderColor = useTransform(
    x,
    [-120, 0, 120],
    ["rgba(244, 63, 94, 0.8)", "rgba(226, 231, 250, 0.85)", "rgba(16, 185, 129, 0.8)"]
  );

  const handleDragEnd = (_, info) => {
    const threshold = 70;
    const verticalThreshold = 65;

    if (info.offset.x > threshold || info.velocity.x > 280) {
      onSwipe("right", event);
    } else if (info.offset.x < -threshold || info.velocity.x < -280) {
      onSwipe("left", event);
    } else if (info.offset.y < -verticalThreshold || info.velocity.y < -240) {
      onSwipe("up", event);
    }
  };

  const aiScore = event.ai_match?.match_percentage || 88;
  const hasClash = event.ai_match?.has_clash;
  const worthIt = event.worth_it_score || 8.6;

  return (
    <motion.div
      style={{
        x: isTop ? x : 0,
        y: isTop ? y : index * 8,
        rotate: isTop ? rotate : 0,
        scale: isTop ? scale : 1 - index * 0.04,
        zIndex: 20 - index,
        borderColor: isTop ? cardBorderColor : "#E2E7FA",
        touchAction: "none"
      }}
      drag={isTop}
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      dragElastic={0.92}
      onDragEnd={handleDragEnd}
      exit={(custom) => ({
        x: custom === "right" ? 500 : custom === "left" ? -500 : 0,
        y: custom === "up" ? -500 : 0,
        rotate: custom === "right" ? 22 : custom === "left" ? -22 : 0,
        opacity: 0,
        transition: { duration: 0.28, ease: "easeOut" }
      })}
      className={`absolute inset-0 rounded-2xl bg-white border border-slate-200/90 shadow-[0_10px_30px_-10px_rgba(15,23,42,0.12)] p-5 flex flex-col justify-between overflow-hidden select-none touch-none ${
        isTop ? "cursor-grab active:cursor-grabbing" : "pointer-events-none"
      }`}
    >
      {/* 1. GREEN OVERLAY: RIGHT SWIPE (SHORTLISTED) */}
      <motion.div
        style={{ opacity: rightOverlayOpacity }}
        className="absolute inset-0 z-30 pointer-events-none bg-emerald-500/20 border-4 border-emerald-500 rounded-2xl flex flex-col items-center justify-center p-4 backdrop-blur-[1.5px]"
      >
        <div className="w-14 h-14 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-lg mb-2 animate-bounce">
          <MoveRight className="w-8 h-8 stroke-[3.5]" />
        </div>
        <span className="font-display font-black text-lg text-emerald-800 bg-white/95 px-4 py-1 rounded-xl shadow border border-emerald-200 uppercase tracking-wider">
          SHORTLISTED »
        </span>
      </motion.div>

      {/* 2. RED OVERLAY: LEFT SWIPE (SKIPPED) */}
      <motion.div
        style={{ opacity: leftOverlayOpacity }}
        className="absolute inset-0 z-30 pointer-events-none bg-rose-500/20 border-4 border-rose-500 rounded-2xl flex flex-col items-center justify-center p-4 backdrop-blur-[1.5px]"
      >
        <div className="w-14 h-14 rounded-full bg-rose-500 text-white flex items-center justify-center shadow-lg mb-2 animate-pulse">
          <MoveLeft className="w-8 h-8 stroke-[3.5]" />
        </div>
        <span className="font-display font-black text-lg text-rose-800 bg-white/95 px-4 py-1 rounded-xl shadow border border-rose-200 uppercase tracking-wider">
          « SKIPPED
        </span>
      </motion.div>

      {/* 3. PURPLE OVERLAY: UP SWIPE (SKILL GAP) */}
      <motion.div
        style={{ opacity: upOverlayOpacity }}
        className="absolute inset-0 z-30 pointer-events-none bg-indigo-600/20 border-4 border-indigo-500 rounded-2xl flex flex-col items-center justify-center p-4 backdrop-blur-[1.5px]"
      >
        <div className="w-14 h-14 rounded-full bg-indigo-600 text-white flex items-center justify-center shadow-lg mb-2 animate-pulse">
          <MoveUp className="w-8 h-8 stroke-[3.5]" />
        </div>
        <span className="font-display font-black text-lg text-indigo-900 bg-white/95 px-4 py-1 rounded-xl shadow border border-indigo-200 uppercase tracking-wider">
          ▲ SKILL GAP
        </span>
      </motion.div>

      {/* Top Header / Match Score */}
      <div>
        <div className="flex items-center justify-between gap-2 mb-1.5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
            {event.organizer} • {event.city}
          </span>
          <span className="text-xs font-black text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-300 flex items-center gap-1 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            {aiScore}% MATCH
          </span>
        </div>

        <h4 className="font-display font-extrabold text-base text-[#10174D] line-clamp-1">
          {event.title}
        </h4>
        <p className="text-xs text-[#525A8B] line-clamp-2 mt-1 leading-relaxed">
          {event.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mt-2.5">
          {(event.tags || []).slice(0, 3).map((t, idx) => (
            <span key={idx} className="text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200/80">
              #{t}
            </span>
          ))}
        </div>
      </div>

      {/* Footer info & subtle gesture hint */}
      <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 font-medium">
        <span className="flex items-center gap-1 text-slate-600">
          <Calendar className="w-3.5 h-3.5 text-slate-400" />
          <span>{event.start_date}</span>
        </span>
        <span className="flex items-center gap-1 text-emerald-700 font-bold">
          <MoveRight className="w-3.5 h-3.5" /> Shortlist
        </span>
      </div>
    </motion.div>
  );
}

export default function MedixHeroCards({ 
  onTriggerOD, 
  onStartAssessmentQuery, 
  onTriggerDemo,
  events = [],
  onShortlist,
  onSkip,
  onOpenSkillGap,
  onOpenDetails,
  shortlist = [],
  swipeHistory = [],
  onUndoSwipe,
  onResetDeck,
  setActiveTab
}) {
  // Filter out swiped events for the embedded deck
  const swipedIds = new Set((swipeHistory || []).map(s => s.eventId));
  const availableDeck = (events || []).filter(e => !swipedIds.has(e.id));
  const currentCard = availableDeck[0];

  const handleSwipeCard = (direction, event) => {
    if (direction === "right" && onShortlist) {
      onShortlist(event);
    } else if (direction === "left" && onSkip) {
      onSkip(event);
    } else if (direction === "up" && onOpenSkillGap) {
      onOpenSkillGap(event.id);
    }
  };

  return (
    <div className="space-y-6">

      {/* The Two Dual Hero Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
        
        {/* CARD 1: ON-DUTY (OD) LEAVE AUTOMATION */}
        <div className="rounded-3xl p-6 sm:p-7 bg-white/95 backdrop-blur-xl border border-[#E2E7FA] shadow-[0_12px_36px_rgba(89,100,254,0.05)] flex flex-col justify-between relative overflow-hidden group">
          
          {/* Subtle soft periwinkle gradient halo */}
          <div className="absolute top-0 right-0 w-56 h-56 bg-[#5964FE]/5 rounded-full blur-3xl pointer-events-none"></div>

          <div>
            {/* Top Tag Row */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 text-slate-800 font-bold text-xs uppercase tracking-wider">
                <div className="w-6 h-6 rounded-lg bg-slate-100 flex items-center justify-center">
                  <FileText className="w-3.5 h-3.5 text-slate-700" />
                </div>
                <span>ON-DUTY (OD) LEAVE AUTOMATION</span>
              </div>
              <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-[#0F172A] text-white">
                Official Format
              </span>
            </div>

            {/* Title & Description */}
            <h2 className="font-display font-extrabold text-2xl text-[#10174D] mb-2">
              Official College OD Clearance
            </h2>
            <p className="text-xs text-[#525A8B] leading-relaxed mb-4">
              Instantly draft, sign, and export official On-Duty attendance petitions for upcoming hackathons. Automatically pre-fills timetable clearance, department head routing, and cryptographic verification QR codes.
            </p>

            {/* Simple Icon-and-Text Feature Rows (Replaces heavy boxed feature pills) */}
            <div className="space-y-2.5 mb-6">
              <div className="flex items-center gap-2.5 text-xs text-slate-700 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Live QR Cryptographic Verification</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-slate-700 font-medium">
                <Zap className="w-4 h-4 text-indigo-600 shrink-0" />
                <span>1-Click PDF Generation with College Letterhead</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-slate-700 font-medium">
                <ShieldCheck className="w-4 h-4 text-slate-700 shrink-0" />
                <span>University HOD & Timetable Routing</span>
              </div>
            </div>
          </div>

          {/* Action Button & Clear Information (No inner nested box) */}
          <div className="pt-2">
            <button
              onClick={onTriggerOD}
              className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-[#0F172A] hover:bg-[#1E293B] active:scale-95 text-white font-bold text-xs tracking-wide shadow-md shadow-slate-900/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <FileText className="w-4 h-4 text-indigo-400" />
              <span>Generate Official OD Letter</span>
            </button>

            <p className="text-[11px] text-[#525A8B] mt-2.5">
              Automated Attendance Clearance • Pre-filled letterhead with 1-click HOD approval
            </p>
          </div>

        </div>

        {/* CARD 2: AI OPPORTUNITY DISCOVER (PURE SWIPE GESTURE TOOL) */}
        <div className="rounded-3xl p-6 sm:p-7 bg-white/95 backdrop-blur-xl border border-[#E2E7FA] shadow-[0_12px_36px_rgba(89,100,254,0.05)] flex flex-col justify-between relative overflow-hidden">
          
          {/* Subtle soft halo */}
          <div className="absolute top-0 right-0 w-56 h-56 bg-slate-900/5 rounded-full blur-3xl pointer-events-none"></div>

          <div>
            {/* Top Header Row */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2 text-slate-800 font-bold text-xs uppercase tracking-wider">
                <div className="w-6 h-6 rounded-lg bg-slate-100 flex items-center justify-center">
                  <Flame className="w-3.5 h-3.5 text-indigo-600 fill-indigo-600" />
                </div>
                <span>AI SWIPE DISCOVER</span>
              </div>

              {setActiveTab && (
                <button
                  type="button"
                  onClick={() => setActiveTab("swipe")}
                  className="flex items-center gap-1 text-[11px] font-bold text-slate-700 hover:text-slate-900 bg-white hover:bg-slate-50 px-2.5 py-1 rounded-xl border border-slate-200 transition cursor-pointer shadow-xs"
                >
                  <Maximize2 className="w-3 h-3 text-slate-500" />
                  <span>Full Deck</span>
                </button>
              )}
            </div>

            {/* TITLE & DESCRIPTION */}
            <h2 className="font-display font-extrabold text-2xl text-[#10174D] mb-1.5">
              Swipe-to-Discover AI
            </h2>

            <p className="text-xs text-[#525A8B] leading-relaxed mb-3">
              Drag card with finger or mouse: Swipe Right to Shortlist or Left to Skip.
            </p>

            {/* ======================================================== */}
            {/* EMBEDDED SWIPE GESTURE TOOL INTERFACE                    */}
            {/* ======================================================== */}
            <div className="space-y-3">
              {/* Embedded Draggable Deck Container */}
              <div className="relative w-full h-[225px] touch-none">
                <AnimatePresence>
                  {availableDeck.length > 0 ? (
                    availableDeck.slice(0, 2).map((event, idx) => (
                      <EmbeddedSwipeCard
                        key={event.id}
                        event={event}
                        isTop={idx === 0}
                        index={idx}
                        onSwipe={handleSwipeCard}
                        onOpenDetails={onOpenDetails}
                        onOpenSkillGap={onOpenSkillGap}
                      />
                    ))
                  ) : (
                    <div className="w-full h-full rounded-2xl bg-[#F8FAFF] border border-[#DCE3F9] flex flex-col items-center justify-center p-4 text-center">
                      <Sparkles className="w-8 h-8 text-slate-700 mb-1" />
                      <p className="font-bold text-xs text-[#10174D]">Deck Reviewed!</p>
                      <p className="text-[11px] text-[#525A8B] mt-0.5">All opportunities checked.</p>
                      <button
                        onClick={onResetDeck}
                        className="mt-2.5 px-4 py-1.5 bg-[#0F172A] hover:bg-[#1E293B] text-white rounded-xl text-xs font-bold shadow-xs cursor-pointer"
                      >
                        Reshuffle Deck
                      </button>
                    </div>
                  )}
                </AnimatePresence>
              </div>

              {/* Primary Actions (Skip and Shortlist) */}
              <div className="flex items-center justify-between gap-3 pt-1">
                <button
                  type="button"
                  onClick={() => currentCard && handleSwipeCard("left", currentCard)}
                  title="Swipe Left to Skip"
                  className="flex-1 py-2.5 px-3 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-bold text-xs flex items-center justify-center gap-1.5 transition active:scale-95 cursor-pointer shadow-xs"
                >
                  <span className="text-slate-400 font-semibold text-sm">✕</span>
                  <span>Skip</span>
                </button>

                <button
                  type="button"
                  onClick={() => currentCard && handleSwipeCard("right", currentCard)}
                  title="Swipe Right to Shortlist"
                  className="flex-1 py-2.5 px-3 rounded-xl bg-[#0F172A] hover:bg-[#1E293B] text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-slate-900/20 transition active:scale-95 cursor-pointer"
                >
                  <span>Shortlist</span>
                  <span className="font-black text-sm">→</span>
                </button>
              </div>
            </div>

          </div>

          {/* Bottom Action / Status Row */}
          <div className="pt-3 border-t border-[#F0F3FD] mt-2 flex items-center justify-end text-xs">
            <span className="text-[11px] text-[#525A8B]">
              Shortlisted: <strong className="text-slate-900 font-bold">{(shortlist || []).length}</strong>
            </span>
          </div>

        </div>

      </div>

    </div>
  );
}
