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
  Maximize2
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
      className={`absolute inset-0 rounded-2xl bg-white border-2 shadow-md p-5 flex flex-col justify-between overflow-hidden select-none touch-none ${
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

      {/* Top Badges */}
      <div>
        {isTop && (
          <div className="flex items-center justify-between gap-1 mb-1.5">
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#10174D]/80 text-white flex items-center gap-1 shadow-xs">
              <Hand className="w-2.5 h-2.5 text-[#7B73FE]" /> Drag or flick
            </span>
            <span className="text-[10px] font-bold text-slate-500">
              {event.city} • {event.format}
            </span>
          </div>
        )}

        <div className="flex items-center justify-between gap-2 mb-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#5964FE]">
            {event.organizer}
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
        <div className="flex flex-wrap gap-1 mt-2">
          {(event.tags || []).slice(0, 3).map((t, idx) => (
            <span key={idx} className="text-[10px] font-semibold px-2 py-0.5 rounded bg-[#F8FAFF] text-[#525A8B] border border-[#DCE3F9]">
              #{t}
            </span>
          ))}
        </div>
      </div>

      {/* Footer info & gestures hint */}
      <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
        <span className="flex items-center gap-1 text-emerald-700 font-bold">
          <MoveRight className="w-3.5 h-3.5" /> Drag Right to Shortlist
        </span>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onOpenSkillGap(event.id);
          }}
          className="text-[#434EEB] font-bold hover:underline flex items-center gap-1 cursor-pointer bg-[#DFE3FF] px-2.5 py-1 rounded-lg border border-[#C7D2FE]"
        >
          <Zap className="w-3 h-3 fill-[#5964FE]" />
          <span>Skill Gap</span>
        </button>
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
              <div className="flex items-center gap-2 text-[#434EEB] font-bold text-xs uppercase tracking-wider">
                <div className="w-6 h-6 rounded-lg bg-[#DFE3FF] flex items-center justify-center">
                  <FileText className="w-3.5 h-3.5 text-[#434EEB]" />
                </div>
                <span>ON-DUTY (OD) LEAVE AUTOMATION</span>
              </div>
              <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-[#EEF2FE] text-[#434EEB] border border-[#DCE3F9]">
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

            {/* Feature Pills */}
            <div className="flex flex-wrap items-center gap-2 text-[11px] text-[#525A8B] mb-6">
              <span className="flex items-center gap-1 bg-[#F8FAFF] px-2.5 py-1 rounded-lg border border-[#DCE3F9] font-medium">
                📍 Live QR Verification
              </span>
              <span className="flex items-center gap-1 bg-[#F8FAFF] px-2.5 py-1 rounded-lg border border-[#DCE3F9] font-medium">
                ⚡ 1-Click PDF Generation
              </span>
              <span className="flex items-center gap-1 bg-[#F8FAFF] px-2.5 py-1 rounded-lg border border-[#DCE3F9] font-medium">
                🏛️ University HOD Routing
              </span>
            </div>
          </div>

          {/* Action Button & Clear Information */}
          <div className="text-center py-3 bg-[#F8FAFF] rounded-2xl border border-[#DCE3F9] p-4">
            <button
              onClick={onTriggerOD}
              className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-gradient-to-r from-[#5964FE] to-[#7B73FE] hover:opacity-95 active:scale-95 text-white font-bold text-xs tracking-wide shadow-md shadow-[#5964FE]/25 transition-all flex items-center justify-center gap-2 mx-auto cursor-pointer"
            >
              <FileText className="w-4 h-4" />
              <span>Generate Official OD Letter</span>
            </button>

            <p className="text-xs font-bold text-[#10174D] mt-3">
              Automated Attendance Clearance
            </p>
            <p className="text-[11px] text-[#525A8B] mt-0.5">
              Includes pre-filled letterhead with 1-click HOD approval
            </p>
          </div>

        </div>

        {/* CARD 2: AI OPPORTUNITY DISCOVER (PURE SWIPE GESTURE TOOL) */}
        <div className="rounded-3xl p-6 sm:p-7 bg-white/95 backdrop-blur-xl border border-[#E2E7FA] shadow-[0_12px_36px_rgba(89,100,254,0.05)] flex flex-col justify-between relative overflow-hidden">
          
          {/* Subtle soft periwinkle gradient halo */}
          <div className="absolute top-0 right-0 w-56 h-56 bg-[#5964FE]/5 rounded-full blur-3xl pointer-events-none"></div>

          <div>
            {/* Top Header Row */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2 text-[#434EEB] font-bold text-xs uppercase tracking-wider">
                <div className="w-6 h-6 rounded-lg bg-[#DFE3FF] flex items-center justify-center">
                  <Flame className="w-3.5 h-3.5 text-[#5964FE] fill-[#5964FE]" />
                </div>
                <span>AI SWIPE DISCOVER</span>
              </div>

              {setActiveTab && (
                <button
                  type="button"
                  onClick={() => setActiveTab("swipe")}
                  className="flex items-center gap-1 text-[11px] font-bold text-[#434EEB] hover:text-[#313bc9] bg-[#EEF2FE] hover:bg-[#DFE3FF] px-2.5 py-1 rounded-xl border border-[#DCE3F9] transition cursor-pointer"
                >
                  <Maximize2 className="w-3 h-3" />
                  <span>Full Deck</span>
                </button>
              )}
            </div>

            {/* TITLE & DESCRIPTION */}
            <div className="flex items-center justify-between gap-2 mb-1.5">
              <h2 className="font-display font-extrabold text-2xl text-[#10174D]">
                Swipe-to-Discover AI
              </h2>
              <span className="text-[10px] font-bold text-[#434EEB] bg-[#DFE3FF] px-2.5 py-0.5 rounded-full border border-[#C7D2FE]">
                {availableDeck.length} cards
              </span>
            </div>

            <p className="text-xs text-[#525A8B] leading-relaxed mb-3">
              Drag card with finger or mouse: Swipe Right to Shortlist, Left to Skip, or Up for instant Skill Gap Analysis.
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
                      <Sparkles className="w-8 h-8 text-[#5964FE] mb-1" />
                      <p className="font-bold text-xs text-[#10174D]">Deck Reviewed!</p>
                      <p className="text-[11px] text-[#525A8B] mt-0.5">All opportunities checked.</p>
                      <button
                        onClick={onResetDeck}
                        className="mt-2.5 px-4 py-1.5 bg-gradient-to-r from-[#5964FE] to-[#7B73FE] text-white rounded-xl text-xs font-bold shadow-xs cursor-pointer"
                      >
                        Reshuffle Deck
                      </button>
                    </div>
                  )}
                </AnimatePresence>
              </div>

              {/* Tactile Gesture Control Rail (Replaces tick & cross buttons) */}
              <div className="flex items-center justify-between gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => currentCard && handleSwipeCard("left", currentCard)}
                  title="Swipe Left to Skip"
                  className="flex-1 py-2 px-2.5 rounded-xl bg-slate-50 hover:bg-rose-50 border border-slate-200 hover:border-rose-300 text-slate-700 hover:text-rose-600 font-bold text-xs flex items-center justify-center gap-1 transition active:scale-95 cursor-pointer shadow-xs"
                >
                  <span className="text-rose-500 font-black">←</span>
                  <span>Skip</span>
                </button>

                <button
                  type="button"
                  onClick={onUndoSwipe}
                  disabled={!swipeHistory || swipeHistory.length === 0}
                  title="Undo last swipe"
                  className="w-8 h-8 rounded-xl bg-[#EEF2FE] hover:bg-[#DFE3FF] text-[#525A8B] flex items-center justify-center transition disabled:opacity-30 cursor-pointer border border-[#DCE3F9]"
                >
                  <Undo2 className="w-3.5 h-3.5" />
                </button>

                <button
                  type="button"
                  onClick={() => currentCard && handleSwipeCard("up", currentCard)}
                  title="Swipe Up for Skill Gap"
                  className="py-2 px-2.5 rounded-xl bg-[#EEF2FE] hover:bg-[#DFE3FF] text-[#434EEB] border border-[#DCE3F9] font-bold text-xs flex items-center justify-center gap-1 transition active:scale-95 cursor-pointer shadow-xs"
                >
                  <Zap className="w-3.5 h-3.5 fill-[#5964FE] text-[#5964FE]" />
                  <span>Gap</span>
                </button>

                <button
                  type="button"
                  onClick={() => currentCard && handleSwipeCard("right", currentCard)}
                  title="Swipe Right to Shortlist"
                  className="flex-1 py-2 px-2.5 rounded-xl bg-gradient-to-r from-[#5964FE] to-[#7B73FE] hover:opacity-95 text-white font-bold text-xs flex items-center justify-center gap-1 shadow-md shadow-[#5964FE]/25 transition active:scale-95 cursor-pointer"
                >
                  <span>Shortlist</span>
                  <span className="font-black">→</span>
                </button>
              </div>
            </div>

          </div>

          {/* Bottom Action / Status Row */}
          <div className="pt-3 border-t border-[#F0F3FD] mt-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-[11px] font-bold text-[#434EEB] flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-[#5964FE]" />
                <span>Instant vector re-ranking active</span>
              </span>
              <span className="text-[11px] text-[#525A8B]">
                Shortlisted: <strong className="text-[#434EEB]">{(shortlist || []).length}</strong>
              </span>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
