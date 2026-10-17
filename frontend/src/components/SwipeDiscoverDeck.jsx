import React, { useState, useEffect } from "react";
import { 
  motion, 
  useMotionValue, 
  useTransform, 
  AnimatePresence 
} from "framer-motion";
import { 
  Zap, 
  Undo2, 
  RotateCcw, 
  Calendar, 
  MapPin, 
  Award, 
  Sparkles, 
  BookmarkCheck, 
  ExternalLink, 
  FileText, 
  Info, 
  Flame,
  CheckCircle2,
  AlertTriangle,
  MoveRight,
  MoveLeft,
  MoveUp,
  Hand
} from "lucide-react";

/**
 * Individual Draggable Swipe Card with Genuine Touch & Mouse Gesture Physics
 */
function SwipeCard({ 
  event, 
  isTop, 
  index, 
  onSwipe, 
  onOpenDetails, 
  onOpenSkillGap 
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Card dynamic rotation and scale based on horizontal drag
  const rotate = useTransform(x, [-260, 260], [-20, 20]);
  const scale = useTransform(x, [-260, 0, 260], [1.03, 1, 1.03]);

  // Color Feedback Overlays:
  // Right drag -> Green SHORTLISTED overlay
  const rightOverlayOpacity = useTransform(x, [25, 115], [0, 1]);
  // Left drag -> Red SKIPPED overlay
  const leftOverlayOpacity = useTransform(x, [-25, -115], [0, 1]);
  // Up drag -> Electric Indigo SKILL GAP overlay
  const upOverlayOpacity = useTransform(y, [-25, -95], [0, 1]);

  // Dynamic Border & Glow Shadow based on real-time gesture drag position
  const cardBorderColor = useTransform(
    x,
    [-150, -30, 0, 30, 150],
    [
      "rgba(244, 63, 94, 0.8)",
      "rgba(244, 63, 94, 0.3)",
      "rgba(226, 231, 250, 0.9)",
      "rgba(16, 185, 129, 0.3)",
      "rgba(16, 185, 129, 0.8)"
    ]
  );

  const cardShadow = useTransform(
    x,
    [-180, 0, 180],
    [
      "0 24px 60px rgba(244, 63, 94, 0.22)",
      "0 20px 50px rgba(89, 100, 254, 0.08)",
      "0 24px 60px rgba(16, 185, 129, 0.22)"
    ]
  );

  // Lateral swipe edge guide hints
  const leftGuideOpacity = useTransform(x, [0, -60], [0.35, 1]);
  const rightGuideOpacity = useTransform(x, [0, 60], [0.35, 1]);

  const handleDragEnd = (_, info) => {
    const threshold = 75;
    const verticalThreshold = 70;

    if (info.offset.x > threshold || info.velocity.x > 320) {
      onSwipe("right", event);
    } else if (info.offset.x < -threshold || info.velocity.x < -320) {
      onSwipe("left", event);
    } else if (info.offset.y < -verticalThreshold || info.velocity.y < -280) {
      onSwipe("up", event);
    }
  };

  const aiMatchScore = event.ai_match?.match_percentage || 85;
  const worthIt = event.worth_it_score || 8.5;
  const hasClash = event.ai_match?.has_clash;

  return (
    <motion.div
      style={{
        x: isTop ? x : 0,
        y: isTop ? y : index * 10,
        rotate: isTop ? rotate : 0,
        scale: isTop ? scale : 1 - index * 0.04,
        zIndex: 30 - index,
        borderColor: isTop ? cardBorderColor : "#E2E7FA",
        boxShadow: isTop ? cardShadow : "0 10px 30px rgba(89,100,254,0.04)",
        touchAction: "none"
      }}
      drag={isTop}
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      dragElastic={0.92}
      onDragEnd={handleDragEnd}
      initial={{ scale: 0.92, opacity: 0, y: 30 }}
      animate={{ scale: 1 - index * 0.04, opacity: 1, y: index * 10 }}
      exit={(custom) => ({
        x: custom === "right" ? 750 : custom === "left" ? -750 : 0,
        y: custom === "up" ? -750 : 0,
        rotate: custom === "right" ? 28 : custom === "left" ? -28 : 0,
        opacity: 0,
        transition: { duration: 0.32, ease: "easeOut" }
      })}
      className={`absolute inset-0 rounded-3xl bg-white/95 backdrop-blur-xl border-2 select-none overflow-hidden flex flex-col justify-between touch-none ${
        isTop ? "cursor-grab active:cursor-grabbing" : "pointer-events-none"
      }`}
    >
      {/* ======================================================== */}
      {/* DYNAMIC COLOR OVERLAYS (GENUINE TINDER FEEDBACK)         */}
      {/* ======================================================== */}

      {/* 1. GREEN OVERLAY: RIGHT SWIPE (SHORTLISTED) */}
      <motion.div
        style={{ opacity: rightOverlayOpacity }}
        className="absolute inset-0 z-30 pointer-events-none bg-emerald-500/20 border-4 border-emerald-500 rounded-3xl flex flex-col items-center justify-center p-6 backdrop-blur-[2px] transition-all"
      >
        <div className="w-20 h-20 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-2xl shadow-emerald-500/50 mb-3 animate-bounce">
          <MoveRight className="w-11 h-11 stroke-[3.5]" />
        </div>
        <span className="font-display font-black text-2xl sm:text-3xl tracking-widest text-emerald-800 uppercase bg-white/95 px-6 py-2 rounded-2xl shadow-lg border border-emerald-300">
          SHORTLISTED »
        </span>
        <p className="text-xs font-bold text-emerald-900 mt-2 bg-emerald-100/90 px-3.5 py-1.5 rounded-full border border-emerald-200">
          +25% Vector Boost in AI Recommendations
        </p>
      </motion.div>

      {/* 2. RED OVERLAY: LEFT SWIPE (SKIPPED) */}
      <motion.div
        style={{ opacity: leftOverlayOpacity }}
        className="absolute inset-0 z-30 pointer-events-none bg-rose-500/20 border-4 border-rose-500 rounded-3xl flex flex-col items-center justify-center p-6 backdrop-blur-[2px] transition-all"
      >
        <div className="w-20 h-20 rounded-full bg-rose-500 text-white flex items-center justify-center shadow-2xl shadow-rose-500/50 mb-3 animate-pulse">
          <MoveLeft className="w-11 h-11 stroke-[3.5]" />
        </div>
        <span className="font-display font-black text-2xl sm:text-3xl tracking-widest text-rose-800 uppercase bg-white/95 px-6 py-2 rounded-2xl shadow-lg border border-rose-300">
          « SKIPPED
        </span>
        <p className="text-xs font-bold text-rose-900 mt-2 bg-rose-100/90 px-3.5 py-1.5 rounded-full border border-rose-200">
          -20% Category Deprioritization
        </p>
      </motion.div>

      {/* 3. ELECTRIC INDIGO OVERLAY: UP SWIPE (SKILL GAP ANALYSIS) */}
      <motion.div
        style={{ opacity: upOverlayOpacity }}
        className="absolute inset-0 z-30 pointer-events-none bg-[#5964FE]/20 border-4 border-[#5964FE] rounded-3xl flex flex-col items-center justify-center p-6 backdrop-blur-[2px] transition-all"
      >
        <div className="w-20 h-20 rounded-full bg-gradient-to-r from-[#5964FE] to-[#7B73FE] text-white flex items-center justify-center shadow-2xl shadow-[#5964FE]/50 mb-3 animate-pulse">
          <MoveUp className="w-11 h-11 stroke-[3.5]" />
        </div>
        <span className="font-display font-black text-2xl sm:text-3xl tracking-widest text-[#434EEB] uppercase bg-white/95 px-6 py-2 rounded-2xl shadow-lg border border-[#C7D2FE]">
          ▲ SKILL GAP
        </span>
        <p className="text-xs font-bold text-[#434EEB] mt-2 bg-[#DFE3FF] px-3.5 py-1.5 rounded-full border border-[#C7D2FE]">
          Synthesizing Prep Roadmap & Prerequisites
        </p>
      </motion.div>

      {/* ======================================================== */}
      {/* TACTILE GESTURE AFFORDANCE INDICATOR ON TOP CARD         */}
      {/* ======================================================== */}
      {isTop && (
        <div className="absolute top-2.5 inset-x-0 flex items-center justify-center pointer-events-none z-20">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#10174D]/80 backdrop-blur-md text-white text-[10px] font-bold shadow-md border border-white/20 animate-fade-in">
            <Hand className="w-3 h-3 text-[#7B73FE] animate-pulse" />
            <span>Drag or flick card to swipe</span>
          </div>
        </div>
      )}

      {/* Lateral gesture cues */}
      {isTop && (
        <>
          <motion.div 
            style={{ opacity: leftGuideOpacity }}
            className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-16 rounded-r-xl bg-rose-500/10 border-y border-r border-rose-300 flex items-center justify-center pointer-events-none z-10"
          >
            <span className="text-xs font-black text-rose-500">‹</span>
          </motion.div>
          <motion.div 
            style={{ opacity: rightGuideOpacity }}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-16 rounded-l-xl bg-emerald-500/10 border-y border-l border-emerald-300 flex items-center justify-center pointer-events-none z-10"
          >
            <span className="text-xs font-black text-emerald-500">›</span>
          </motion.div>
        </>
      )}

      {/* ======================================================== */}
      {/* CARD CONTENT HEADER                                      */}
      {/* ======================================================== */}
      <div className="p-6 sm:p-7 pt-9 space-y-4">
        {/* Top Badges Row */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-xl bg-[#F8FAFF] text-[#525A8B] text-xs font-bold flex items-center gap-1.5 border border-[#DCE3F9]">
              <MapPin className="w-3.5 h-3.5 text-[#5964FE]" />
              <span>{event.city}</span>
              <span className="text-[#8E9BBF]">•</span>
              <span>{event.format}</span>
            </span>

            {hasClash ? (
              <span className="px-2.5 py-1 rounded-xl bg-rose-50 text-rose-700 text-xs font-bold flex items-center gap-1 border border-rose-200">
                <AlertTriangle className="w-3 h-3 text-rose-500" />
                Exam Clash
              </span>
            ) : (
              <span className="px-2.5 py-1 rounded-xl bg-emerald-50 text-emerald-800 text-xs font-bold flex items-center gap-1 border border-emerald-200">
                <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                Clear
              </span>
            )}
          </div>

          {/* AI Match Ring Badge */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-[#DFE3FF] text-[#434EEB] border border-[#C7D2FE] text-xs font-black shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-[#5964FE]" />
              <span>{aiMatchScore}% MATCH</span>
            </div>
          </div>
        </div>

        {/* Title & Organizer */}
        <div>
          <div className="text-[11px] font-bold text-[#5964FE] uppercase tracking-wider mb-1">
            {event.organizer}
          </div>
          <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-[#10174D] leading-tight line-clamp-2">
            {event.title}
          </h3>
          <p className="text-xs text-[#525A8B] flex items-center gap-2 mt-2 font-medium">
            <Calendar className="w-3.5 h-3.5 text-[#7B73FE]" />
            <span>{event.start_date} to {event.end_date}</span>
            <span className="text-[#8E9BBF]">•</span>
            <Award className="w-3.5 h-3.5 text-amber-500" />
            <span>Worth-It: {worthIt}/100</span>
          </p>
        </div>

        {/* Short Summary Description */}
        <p className="text-xs sm:text-sm text-[#525A8B] leading-relaxed line-clamp-3">
          {event.description}
        </p>

        {/* Tags / Stack */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {(event.tags || []).slice(0, 4).map((tag, idx) => (
            <span
              key={idx}
              className="px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-[#F8FAFF] text-[#525A8B] border border-[#DCE3F9]"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Skill Requirement Overview */}
        <div className="p-3 rounded-2xl bg-[#F8FAFF] border border-[#DCE3F9] text-xs">
          <div className="flex items-center justify-between text-[#525A8B] font-bold mb-1.5">
            <span className="flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-[#5964FE]" />
              Required Tech Stack:
            </span>
            <span className="text-[#5964FE] text-[11px]">
              {(event.required_skills || []).length} Skills
            </span>
          </div>
          <div className="flex flex-wrap gap-1 text-[11px]">
            {(event.required_skills || []).map((skill, sIdx) => (
              <span 
                key={sIdx}
                className="px-2 py-0.5 rounded-md bg-white border border-[#DCE3F9] text-[#10174D] font-medium"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* BOTTOM FOOTER WITH QUICK ACTION TRIGGERS                */}
      {/* ======================================================== */}
      <div className="p-4 sm:p-5 bg-[#F8FAFF] border-t border-[#E2E7FA] flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onOpenDetails(event);
          }}
          className="text-xs font-bold text-[#525A8B] hover:text-[#10174D] flex items-center gap-1.5 transition py-1 cursor-pointer"
        >
          <Info className="w-4 h-4 text-[#8E9BBF]" />
          <span>Full Details</span>
        </button>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onOpenSkillGap(event.id);
          }}
          className="text-xs font-bold text-[#434EEB] hover:text-[#313bc9] flex items-center gap-1.5 transition bg-[#DFE3FF] px-3.5 py-1.5 rounded-xl border border-[#C7D2FE] cursor-pointer"
        >
          <Zap className="w-3.5 h-3.5 fill-[#5964FE]" />
          <span>Skill-Gap Analysis</span>
        </button>
      </div>
    </motion.div>
  );
}

/**
 * Main Swipe-to-Discover Deck Component
 * Emphasizes genuine touch/mouse swipe gestures and replaces tick/cross buttons
 * with an interactive kinetic swipe rail and keyboard arrow controls.
 */
export default function SwipeDiscoverDeck({ 
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
  const [deck, setDeck] = useState([]);
  const [lastSwipeDirection, setLastSwipeDirection] = useState(null);
  const [activeFilter, setActiveFilter] = useState("all");

  // Filter out already swiped events unless empty
  useEffect(() => {
    const swipedIds = new Set(swipeHistory.map(s => s.eventId));
    let filtered = events.filter(e => !swipedIds.has(e.id));

    if (activeFilter === "ai") {
      filtered = filtered.filter(e => 
        (e.tags || []).some(t => t.toLowerCase().includes("ai") || t.toLowerCase().includes("learning"))
      );
    } else if (activeFilter === "no_clash") {
      filtered = filtered.filter(e => !e.ai_match?.has_clash);
    }

    setDeck(filtered);
  }, [events, swipeHistory, activeFilter]);

  const handleSwipe = (direction, event) => {
    setLastSwipeDirection(direction);

    if (direction === "right") {
      onShortlist(event);
    } else if (direction === "left") {
      onSkip(event);
    } else if (direction === "up") {
      onOpenSkillGap(event.id);
    }
  };

  const currentEvent = deck[0];

  // Keyboard arrow gesture support
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Do not capture if user is in an input field
      if (["INPUT", "TEXTAREA", "SELECT"].includes(e.target.tagName)) return;

      if (!currentEvent) return;

      if (e.key === "ArrowRight") {
        e.preventDefault();
        handleSwipe("right", currentEvent);
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        handleSwipe("left", currentEvent);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        handleSwipe("up", currentEvent);
      } else if ((e.key === "z" && (e.ctrlKey || e.metaKey)) || e.key === "u" || e.key === "U") {
        e.preventDefault();
        onUndoSwipe();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentEvent, swipeHistory]);

  return (
    <div className="space-y-6 max-w-xl mx-auto">
      
      {/* Top Deck Stats & Filters Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white/95 backdrop-blur-xl p-4 sm:p-5 rounded-3xl border border-[#E2E7FA] shadow-[0_10px_30px_rgba(89,100,254,0.05)]">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-2xl bg-[#DFE3FF] text-[#434EEB] flex items-center justify-center font-bold">
            <Flame className="w-5 h-5 fill-[#5964FE]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-display font-extrabold text-base text-[#10174D]">
                Swipe Discover Deck
              </h2>
              <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-[#DFE3FF] text-[#434EEB] border border-[#C7D2FE]">
                {deck.length} Left
              </span>
            </div>
            <p className="text-[11px] text-[#525A8B] font-medium">
              Drag Card or Swipe • Real Gesture Engine
            </p>
          </div>
        </div>

        {/* Filter Chips */}
        <div className="flex items-center gap-1 bg-[#F8FAFF] p-1 rounded-2xl border border-[#DCE3F9] self-start sm:self-auto text-xs font-bold">
          <button
            onClick={() => setActiveFilter("all")}
            className={`px-3 py-1 rounded-xl transition cursor-pointer ${
              activeFilter === "all" ? "bg-gradient-to-r from-[#5964FE] to-[#7B73FE] text-white shadow-xs" : "text-[#525A8B] hover:text-[#10174D]"
            }`}
          >
            All
          </button>
          <button
            onClick={() => setActiveFilter("ai")}
            className={`px-3 py-1 rounded-xl transition cursor-pointer ${
              activeFilter === "ai" ? "bg-gradient-to-r from-[#5964FE] to-[#7B73FE] text-white shadow-xs" : "text-[#525A8B] hover:text-[#10174D]"
            }`}
          >
            AI Focus
          </button>
          <button
            onClick={() => setActiveFilter("no_clash")}
            className={`px-3 py-1 rounded-xl transition cursor-pointer ${
              activeFilter === "no_clash" ? "bg-gradient-to-r from-[#5964FE] to-[#7B73FE] text-white shadow-xs" : "text-[#525A8B] hover:text-[#10174D]"
            }`}
          >
            No Clashes
          </button>
        </div>
      </div>

      {/* Tactile Gesture Instructions Bar */}
      <div className="flex items-center justify-center gap-3 text-[11px] font-bold text-[#525A8B] bg-white/80 py-2.5 px-4 rounded-2xl border border-[#E2E7FA] shadow-xs">
        <span className="text-rose-700 flex items-center gap-1.5 font-bold">
          <MoveLeft className="w-3.5 h-3.5 stroke-[2.5]" /> Swipe Left = Skip
        </span>
        <span className="text-[#8E9BBF]">•</span>
        <span className="text-[#434EEB] flex items-center gap-1.5 font-bold">
          <MoveUp className="w-3.5 h-3.5 stroke-[2.5]" /> Swipe Up = Skill Gap
        </span>
        <span className="text-[#8E9BBF]">•</span>
        <span className="text-emerald-700 flex items-center gap-1.5 font-bold">
          Swipe Right = Shortlist <MoveRight className="w-3.5 h-3.5 stroke-[2.5]" />
        </span>
      </div>

      {/* The 3D Interactive Card Deck Container */}
      <div className="relative w-full h-[530px] sm:h-[550px] flex items-center justify-center touch-none">
        <AnimatePresence custom={lastSwipeDirection}>
          {deck.length > 0 ? (
            deck.slice(0, 3).map((event, idx) => (
              <SwipeCard
                key={event.id}
                event={event}
                isTop={idx === 0}
                index={idx}
                onSwipe={handleSwipe}
                onOpenDetails={onOpenDetails}
                onOpenSkillGap={onOpenSkillGap}
              />
            ))
          ) : (
            /* Empty State when Deck is Finished */
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="w-full h-full rounded-3xl bg-white/95 backdrop-blur-xl border border-[#E2E7FA] shadow-[0_10px_30px_rgba(89,100,254,0.05)] p-8 text-center flex flex-col items-center justify-center space-y-4"
            >
              <div className="w-20 h-20 rounded-full bg-[#DFE3FF] text-[#434EEB] flex items-center justify-center shadow-md">
                <Sparkles className="w-10 h-10 text-[#5964FE]" />
              </div>
              <div>
                <h3 className="font-display font-extrabold text-2xl text-[#10174D]">
                  All Caught Up! 🎉
                </h3>
                <p className="text-xs text-[#525A8B] mt-1 max-w-sm mx-auto leading-relaxed font-medium">
                  You've reviewed all upcoming opportunities in this filter. Check your shortlist or reshuffle the deck to discover more.
                </p>
              </div>

              {/* Shortlist Counter Box */}
              <div className="p-4 rounded-2xl bg-[#F8FAFF] border border-[#DCE3F9] w-full max-w-xs text-xs space-y-1">
                <div className="flex justify-between font-bold text-[#525A8B]">
                  <span>Shortlisted Events:</span>
                  <span className="text-[#5964FE] font-black">{shortlist.length}</span>
                </div>
                <div className="flex justify-between font-bold text-[#525A8B]">
                  <span>Swipes Completed:</span>
                  <span className="text-[#434EEB] font-black">{swipeHistory.length}</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                <button
                  onClick={onResetDeck}
                  className="px-6 py-2.5 rounded-2xl bg-gradient-to-r from-[#5964FE] to-[#7B73FE] hover:opacity-95 text-white font-bold text-xs flex items-center gap-2 shadow-md shadow-[#5964FE]/20 transition active:scale-95 cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Reshuffle Deck</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ======================================================== */}
      {/* TACTILE GESTURE CONTROLS (REPLACES TICK & CROSS BUTTONS) */}
      {/* ======================================================== */}
      {deck.length > 0 && (
        <div className="space-y-3 pt-1">
          <div className="flex items-center justify-between gap-2 sm:gap-3 bg-white/95 backdrop-blur-xl p-2.5 sm:p-3 rounded-2xl border border-[#E2E7FA] shadow-[0_10px_30px_rgba(89,100,254,0.06)]">
            
            {/* 1. Left Swipe Gesture Trigger */}
            <button
              type="button"
              onClick={() => currentEvent && handleSwipe("left", currentEvent)}
              className="group flex-1 flex items-center justify-center gap-1.5 sm:gap-2 py-3 px-3 rounded-xl bg-slate-50 hover:bg-rose-50 border border-slate-200 hover:border-rose-300 text-slate-700 hover:text-rose-600 transition-all active:scale-95 cursor-pointer font-bold text-xs shadow-xs"
              title="Swipe Left to Skip (or press ← Arrow)"
            >
              <span className="text-base font-black text-rose-500 group-hover:-translate-x-1 transition-transform">←</span>
              <span className="hidden sm:inline">Swipe Left:</span>
              <span>Skip</span>
            </button>

            {/* 2. Undo Last Swipe Button */}
            <button
              type="button"
              onClick={onUndoSwipe}
              disabled={swipeHistory.length === 0}
              title="Undo last swipe (Ctrl+Z or U)"
              className="py-3 px-3.5 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 text-slate-600 hover:text-[#10174D] transition active:scale-90 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer shadow-xs flex items-center justify-center"
            >
              <Undo2 className="w-4 h-4" />
            </button>

            {/* 3. Up Swipe Gesture Trigger */}
            <button
              type="button"
              onClick={() => currentEvent && handleSwipe("up", currentEvent)}
              className="group flex items-center justify-center gap-1.5 py-3 px-3 sm:px-4 rounded-xl bg-[#EEF2FE] hover:bg-[#DFE3FF] border border-[#DCE3F9] text-[#434EEB] transition-all active:scale-95 cursor-pointer font-bold text-xs shadow-xs"
              title="Swipe Up for Skill Gap (or press ↑ Arrow)"
            >
              <Zap className="w-4 h-4 fill-[#5964FE] text-[#5964FE] group-hover:-translate-y-0.5 transition-transform" />
              <span className="hidden md:inline">Swipe Up:</span>
              <span>Skill Gap</span>
            </button>

            {/* 4. Right Swipe Gesture Trigger */}
            <button
              type="button"
              onClick={() => currentEvent && handleSwipe("right", currentEvent)}
              className="group flex-1 flex items-center justify-center gap-1.5 sm:gap-2 py-3 px-3 rounded-xl bg-gradient-to-r from-[#5964FE] to-[#7B73FE] hover:opacity-95 text-white shadow-md shadow-[#5964FE]/25 transition-all active:scale-95 cursor-pointer font-bold text-xs"
              title="Swipe Right to Shortlist (or press → Arrow)"
            >
              <span className="hidden sm:inline">Swipe Right:</span>
              <span>Shortlist</span>
              <span className="text-base font-black group-hover:translate-x-1 transition-transform">→</span>
            </button>

          </div>

          {/* Actual Gesture Guide & Keyboard Affordance */}
          <div className="flex items-center justify-center gap-2 text-[11px] text-[#525A8B] font-medium py-1 px-4 text-center">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>
              <strong>Touch/Mouse Gesture Active:</strong> Drag card with finger or mouse, or use <kbd className="px-1.5 py-0.5 rounded bg-white border border-slate-300 font-mono text-[10px] text-slate-800 shadow-xs">←</kbd> <kbd className="px-1.5 py-0.5 rounded bg-white border border-slate-300 font-mono text-[10px] text-slate-800 shadow-xs">→</kbd> <kbd className="px-1.5 py-0.5 rounded bg-white border border-slate-300 font-mono text-[10px] text-slate-800 shadow-xs">↑</kbd> arrow keys
            </span>
          </div>
        </div>
      )}

    </div>
  );
}
