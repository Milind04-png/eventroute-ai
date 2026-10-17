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
  Check,
  X,
  Undo2,
  RotateCcw,
  Calendar,
  Award,
  AlertTriangle,
  BookmarkCheck,
  Sliders
} from "lucide-react";

/**
 * Draggable Swipe Card inside AI Opportunity Tool
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
  const rotate = useTransform(x, [-220, 220], [-16, 16]);

  const rightOverlayOpacity = useTransform(x, [15, 90], [0, 1]);
  const leftOverlayOpacity = useTransform(x, [-15, -90], [0, 1]);
  const upOverlayOpacity = useTransform(y, [-15, -80], [0, 1]);

  const handleDragEnd = (_, info) => {
    const threshold = 85;
    const verticalThreshold = 75;

    if (info.offset.x > threshold || info.velocity.x > 380) {
      onSwipe("right", event);
    } else if (info.offset.x < -threshold || info.velocity.x < -380) {
      onSwipe("left", event);
    } else if (info.offset.y < -verticalThreshold || info.velocity.y < -300) {
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
        scale: 1 - index * 0.04,
        zIndex: 20 - index
      }}
      drag={isTop}
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      dragElastic={0.85}
      onDragEnd={handleDragEnd}
      className={`absolute inset-0 rounded-2xl bg-white border border-slate-200/90 shadow-md p-5 flex flex-col justify-between overflow-hidden select-none ${
        isTop ? "cursor-grab active:cursor-grabbing" : "pointer-events-none"
      }`}
    >
      {/* 1. GREEN OVERLAY: RIGHT SWIPE (SHORTLISTED) */}
      <motion.div
        style={{ opacity: rightOverlayOpacity }}
        className="absolute inset-0 z-30 pointer-events-none bg-emerald-500/20 border-4 border-emerald-500 rounded-2xl flex flex-col items-center justify-center p-4 backdrop-blur-[1px]"
      >
        <div className="w-16 h-16 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-lg mb-2 animate-bounce">
          <Check className="w-9 h-9 stroke-[3.5]" />
        </div>
        <span className="font-display font-black text-xl text-emerald-800 bg-white/95 px-4 py-1 rounded-xl shadow border border-emerald-200 uppercase tracking-wider">
          SHORTLISTED
        </span>
      </motion.div>

      {/* 2. RED OVERLAY: LEFT SWIPE (SKIPPED) */}
      <motion.div
        style={{ opacity: leftOverlayOpacity }}
        className="absolute inset-0 z-30 pointer-events-none bg-rose-500/20 border-4 border-rose-500 rounded-2xl flex flex-col items-center justify-center p-4 backdrop-blur-[1px]"
      >
        <div className="w-16 h-16 rounded-full bg-rose-500 text-white flex items-center justify-center shadow-lg mb-2 animate-pulse">
          <X className="w-9 h-9 stroke-[3.5]" />
        </div>
        <span className="font-display font-black text-xl text-rose-800 bg-white/95 px-4 py-1 rounded-xl shadow border border-rose-200 uppercase tracking-wider">
          SKIPPED
        </span>
      </motion.div>

      {/* 3. PURPLE OVERLAY: UP SWIPE (SKILL GAP) */}
      <motion.div
        style={{ opacity: upOverlayOpacity }}
        className="absolute inset-0 z-30 pointer-events-none bg-indigo-600/20 border-4 border-indigo-500 rounded-2xl flex flex-col items-center justify-center p-4 backdrop-blur-[1px]"
      >
        <div className="w-16 h-16 rounded-full bg-indigo-600 text-white flex items-center justify-center shadow-lg mb-2 animate-spin">
          <Zap className="w-9 h-9 fill-white" />
        </div>
        <span className="font-display font-black text-xl text-indigo-900 bg-white/95 px-4 py-1 rounded-xl shadow border border-indigo-200 uppercase tracking-wider">
          SKILL GAP
        </span>
      </motion.div>

      {/* Top Badges */}
      <div>
        <div className="flex items-center justify-between gap-2 mb-2">
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 border border-slate-200">
            {event.city} • {event.format}
          </span>
          <span className="text-xs font-black text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-300 flex items-center gap-1 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            {aiScore}% MATCH
          </span>
        </div>

        <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 mb-0.5">
          {event.organizer}
        </div>
        <h4 className="font-display font-extrabold text-lg text-[#0F172A] line-clamp-1">
          {event.title}
        </h4>
        <p className="text-xs text-[#64748B] line-clamp-2 mt-1 leading-relaxed">
          {event.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mt-2">
          {(event.tags || []).slice(0, 3).map((t, idx) => (
            <span key={idx} className="text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
              #{t}
            </span>
          ))}
        </div>
      </div>

      {/* Footer info & gestures hint */}
      <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
        <span className="flex items-center gap-1 text-emerald-700 font-bold">
          <Check className="w-3.5 h-3.5" /> Drag Right to Shortlist
        </span>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onOpenSkillGap(event.id);
          }}
          className="text-indigo-600 font-bold hover:underline flex items-center gap-1 cursor-pointer bg-indigo-50 px-2.5 py-1 rounded-lg border border-indigo-200"
        >
          <Zap className="w-3 h-3 fill-indigo-600" />
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
  onResetDeck
}) {
  const [assessmentInput, setAssessmentInput] = useState("");
  const [toolMode, setToolMode] = useState("swipe"); // "swipe" | "query"

  // Filter out swiped events for the embedded deck
  const swipedIds = new Set((swipeHistory || []).map(s => s.eventId));
  const availableDeck = (events || []).filter(e => !swipedIds.has(e.id));
  const currentCard = availableDeck[0];

  const handleChipClick = (query) => {
    setAssessmentInput(query);
    onStartAssessmentQuery(query);
  };

  const handleAssessmentSubmit = (e) => {
    e?.preventDefault();
    if (assessmentInput.trim()) {
      onStartAssessmentQuery(assessmentInput);
    } else {
      onStartAssessmentQuery("Find me an AI hackathon this weekend that won't clash with my exams");
    }
  };

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
        <div className="rounded-3xl p-6 sm:p-7 bg-white border border-indigo-100/90 shadow-[0_12px_36px_rgba(99,102,241,0.06)] flex flex-col justify-between relative overflow-hidden group">
          
          {/* Subtle soft indigo gradient halo */}
          <div className="absolute top-0 right-0 w-56 h-56 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none"></div>

          <div>
            {/* Top Tag Row */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 text-indigo-700 font-bold text-xs uppercase tracking-wider">
                <div className="w-6 h-6 rounded-lg bg-indigo-100 flex items-center justify-center">
                  <FileText className="w-3.5 h-3.5 text-indigo-600" />
                </div>
                <span>ON-DUTY (OD) LEAVE AUTOMATION</span>
              </div>
              <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-800 border border-indigo-200">
                Official Format
              </span>
            </div>

            {/* Title & Description */}
            <h2 className="font-display font-extrabold text-2xl text-[#0F172A] mb-2">
              Official College OD Clearance
            </h2>
            <p className="text-xs text-[#64748B] leading-relaxed mb-4">
              Instantly draft, sign, and export official On-Duty attendance petitions for upcoming hackathons. Automatically pre-fills timetable clearance, department head routing, and cryptographic verification QR codes.
            </p>

            {/* Feature Pills */}
            <div className="flex flex-wrap items-center gap-2 text-[11px] text-[#475569] mb-6">
              <span className="flex items-center gap-1 bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-200 font-medium">
                📍 Live QR Verification
              </span>
              <span className="flex items-center gap-1 bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-200 font-medium">
                ⚡ 1-Click PDF Generation
              </span>
              <span className="flex items-center gap-1 bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-200 font-medium">
                🏛️ University HOD Routing
              </span>
            </div>
          </div>

          {/* Action Button & Clear Information */}
          <div className="text-center py-3 bg-[#F8FAFC] rounded-2xl border border-slate-200/70 p-4">
            <button
              onClick={onTriggerOD}
              className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white font-bold text-xs tracking-wide shadow-md shadow-indigo-600/20 transition-all flex items-center justify-center gap-2 mx-auto cursor-pointer"
            >
              <FileText className="w-4 h-4" />
              <span>Generate Official OD Letter</span>
            </button>

            <p className="text-xs font-bold text-[#0F172A] mt-3">
              Automated Attendance Clearance
            </p>
            <p className="text-[11px] text-[#64748B] mt-0.5">
              Includes pre-filled letterhead with 1-click HOD approval
            </p>
          </div>

        </div>

        {/* CARD 2: AI OPPORTUNITY ASSESSMENT (WITH SWIPE GESTURE TOOL DIRECTLY EMBEDDED) */}
        <div className="rounded-3xl p-6 sm:p-7 bg-white border border-emerald-200/80 shadow-[0_12px_36px_rgba(16,185,129,0.06)] flex flex-col justify-between relative overflow-hidden">
          
          {/* Subtle soft green gradient halo */}
          <div className="absolute top-0 right-0 w-56 h-56 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none"></div>

          <div>
            {/* Top Header Row with Mode Toggle */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2 text-emerald-700 font-bold text-xs uppercase tracking-wider">
                <div className="w-6 h-6 rounded-lg bg-emerald-100 flex items-center justify-center">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                </div>
                <span>AI OPPORTUNITY TOOL</span>
              </div>

              {/* Mode Toggle Pills: Swipe Gesture vs Search */}
              <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-xl border border-slate-200 text-[11px] font-bold">
                <button
                  type="button"
                  onClick={() => setToolMode("swipe")}
                  className={`px-2.5 py-1 rounded-lg transition flex items-center gap-1 cursor-pointer ${
                    toolMode === "swipe" ? "bg-white text-emerald-800 shadow-xs" : "text-slate-500 hover:text-slate-800"
                  }`}
                >
                  <Flame className="w-3 h-3 text-rose-500 fill-rose-500" />
                  <span>Swipe Gesture</span>
                </button>
                <button
                  type="button"
                  onClick={() => setToolMode("query")}
                  className={`px-2.5 py-1 rounded-lg transition cursor-pointer ${
                    toolMode === "query" ? "bg-white text-slate-800 shadow-xs" : "text-slate-500 hover:text-slate-800"
                  }`}
                >
                  <span>Query</span>
                </button>
              </div>
            </div>

            {/* TITLE & DESCRIPTION */}
            <div className="flex items-center justify-between gap-2 mb-2">
              <h2 className="font-display font-extrabold text-2xl text-[#0F172A]">
                {toolMode === "swipe" ? "Swipe-to-Discover AI" : "Not sure what to attend?"}
              </h2>
              {toolMode === "swipe" && (
                <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full border border-slate-200">
                  {availableDeck.length} cards in deck
                </span>
              )}
            </div>

            <p className="text-xs text-[#64748B] leading-relaxed mb-4">
              {toolMode === "swipe"
                ? "Drag the card with your mouse or finger: Swipe Right to Shortlist, Left to Skip, or Up for instant Skill Gap Analysis."
                : "Describe your tech stack, hackathon goals, or weekend availability to get preliminary guidance on match scores and clash clearance."}
            </p>

            {/* ======================================================== */}
            {/* EMBEDDED SWIPE GESTURE TOOL INTERFACE                    */}
            {/* ======================================================== */}
            {toolMode === "swipe" ? (
              <div className="space-y-3">
                {/* Embedded Draggable Deck Container */}
                <div className="relative w-full h-[220px]">
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
                      <div className="w-full h-full rounded-2xl bg-slate-50 border border-slate-200 flex flex-col items-center justify-center p-4 text-center">
                        <Sparkles className="w-8 h-8 text-emerald-500 mb-1" />
                        <p className="font-bold text-xs text-[#0F172A]">Deck Reviewed!</p>
                        <p className="text-[11px] text-slate-500 mt-0.5">All opportunities checked.</p>
                        <button
                          onClick={onResetDeck}
                          className="mt-2 px-3 py-1 bg-slate-900 text-white rounded-lg text-xs font-bold"
                        >
                          Reshuffle Deck
                        </button>
                      </div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Gesture Control Buttons Toolbar */}
                <div className="flex items-center justify-center gap-3 pt-1">
                  <button
                    type="button"
                    onClick={onUndoSwipe}
                    disabled={!swipeHistory || swipeHistory.length === 0}
                    title="Undo last swipe"
                    className="w-9 h-9 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition disabled:opacity-30 cursor-pointer"
                  >
                    <Undo2 className="w-4 h-4" />
                  </button>

                  <button
                    type="button"
                    onClick={() => currentCard && handleSwipeCard("left", currentCard)}
                    title="Skip (Left)"
                    className="w-11 h-11 rounded-2xl bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 shadow-xs flex items-center justify-center transition active:scale-95 cursor-pointer"
                  >
                    <X className="w-5 h-5 stroke-[3]" />
                  </button>

                  <button
                    type="button"
                    onClick={() => currentCard && handleSwipeCard("up", currentCard)}
                    title="Skill Gap (Up)"
                    className="w-10 h-10 rounded-2xl bg-indigo-50 hover:bg-indigo-100 text-indigo-600 border border-indigo-200 shadow-xs flex items-center justify-center transition active:scale-95 cursor-pointer"
                  >
                    <Zap className="w-5 h-5 fill-indigo-600" />
                  </button>

                  <button
                    type="button"
                    onClick={() => currentCard && handleSwipeCard("right", currentCard)}
                    title="Shortlist (Right)"
                    className="w-11 h-11 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white shadow-md shadow-emerald-500/20 flex items-center justify-center transition active:scale-95 cursor-pointer"
                  >
                    <Check className="w-5 h-5 stroke-[3]" />
                  </button>
                </div>
              </div>
            ) : (
              /* QUERY SEARCH INTERFACE */
              <div>
                <form onSubmit={handleAssessmentSubmit} className="mb-3">
                  <div className="relative">
                    <input
                      type="text"
                      value={assessmentInput}
                      onChange={(e) => setAssessmentInput(e.target.value)}
                      placeholder="Search opportunities (e.g. Generative AI, Web3, FinTech)..."
                      className="w-full px-4 py-3 rounded-2xl bg-white border border-slate-200 text-xs text-[#0F172A] placeholder-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition shadow-xs"
                    />
                  </div>
                </form>

                <div className="flex flex-wrap items-center gap-1.5 text-[11px] mb-2">
                  <span className="text-slate-400 font-medium">Quick start:</span>
                  <button
                    type="button"
                    onClick={() => handleChipClick("Find me an AI hackathon this weekend without exam clashes")}
                    className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-emerald-50 hover:text-emerald-800 text-slate-700 font-medium transition border border-slate-200/60 cursor-pointer"
                  >
                    AI Hackathons this weekend
                  </button>
                  <button
                    type="button"
                    onClick={() => handleChipClick("Zero exam clash hackathons only")}
                    className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-emerald-50 hover:text-emerald-800 text-slate-700 font-medium transition border border-slate-200/60 cursor-pointer"
                  >
                    Zero exam clash
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Bottom Action / Status Row */}
          <div className="pt-3 border-t border-slate-100 mt-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-[11px] font-bold text-emerald-800 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                <span>Instant vector re-ranking active</span>
              </span>
              <span className="text-[11px] text-slate-500">
                Shortlisted: <strong className="text-emerald-700">{(shortlist || []).length}</strong>
              </span>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
