import React, { useState, useEffect } from "react";
import { 
  motion, 
  useMotionValue, 
  useTransform, 
  AnimatePresence 
} from "framer-motion";
import { 
  Check, 
  X, 
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
  AlertTriangle
} from "lucide-react";

/**
 * Individual Draggable Swipe Card
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

  // Card dynamic rotation based on horizontal drag
  const rotate = useTransform(x, [-250, 250], [-18, 18]);

  // Color Feedback Overlays:
  // Right drag -> Green SHORTLISTED overlay
  const rightOverlayOpacity = useTransform(x, [20, 110], [0, 1]);
  // Left drag -> Red SKIPPED overlay
  const leftOverlayOpacity = useTransform(x, [-20, -110], [0, 1]);
  // Up drag -> Electric Indigo SKILL GAP overlay
  const upOverlayOpacity = useTransform(y, [-20, -90], [0, 1]);

  const handleDragEnd = (_, info) => {
    const threshold = 95;
    const verticalThreshold = 85;

    if (info.offset.x > threshold || info.velocity.x > 450) {
      onSwipe("right", event);
    } else if (info.offset.x < -threshold || info.velocity.x < -450) {
      onSwipe("left", event);
    } else if (info.offset.y < -verticalThreshold || info.velocity.y < -350) {
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
        scale: 1 - index * 0.04,
        zIndex: 30 - index,
      }}
      drag={isTop}
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      dragElastic={0.85}
      onDragEnd={handleDragEnd}
      initial={{ scale: 0.9, opacity: 0, y: 30 }}
      animate={{ scale: 1 - index * 0.04, opacity: 1, y: index * 10 }}
      exit={(custom) => ({
        x: custom === "right" ? 600 : custom === "left" ? -600 : 0,
        y: custom === "up" ? -600 : 0,
        rotate: custom === "right" ? 25 : custom === "left" ? -25 : 0,
        opacity: 0,
        transition: { duration: 0.35, ease: "easeOut" }
      })}
      className={`absolute inset-0 rounded-3xl bg-white/95 backdrop-blur-xl border border-[#E2E7FA] shadow-[0_20px_50px_rgba(89,100,254,0.08)] select-none overflow-hidden flex flex-col justify-between ${
        isTop ? "cursor-grab active:cursor-grabbing" : "pointer-events-none"
      }`}
    >
      {/* ======================================================== */}
      {/* DYNAMIC COLOR OVERLAYS (MANDATORY REQUIREMENT)           */}
      {/* ======================================================== */}

      {/* 1. GREEN OVERLAY: RIGHT SWIPE (SHORTLISTED) */}
      <motion.div
        style={{ opacity: rightOverlayOpacity }}
        className="absolute inset-0 z-30 pointer-events-none bg-emerald-500/20 border-4 border-emerald-500 rounded-3xl flex flex-col items-center justify-center p-6 backdrop-blur-[2px] transition-all"
      >
        <div className="w-24 h-24 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-2xl shadow-emerald-500/50 mb-3 animate-bounce">
          <Check className="w-14 h-14 stroke-[3.5]" />
        </div>
        <span className="font-display font-black text-3xl tracking-widest text-emerald-700 uppercase bg-white/95 px-6 py-2 rounded-2xl shadow-lg border border-emerald-200">
          SHORTLISTED
        </span>
        <p className="text-xs font-bold text-emerald-800 mt-2 bg-emerald-50/90 px-3 py-1 rounded-full">
          Added to your shortlist & boosted in AI feed (+25%)
        </p>
      </motion.div>

      {/* 2. RED OVERLAY: LEFT SWIPE (SKIPPED) */}
      <motion.div
        style={{ opacity: leftOverlayOpacity }}
        className="absolute inset-0 z-30 pointer-events-none bg-rose-500/20 border-4 border-rose-500 rounded-3xl flex flex-col items-center justify-center p-6 backdrop-blur-[2px] transition-all"
      >
        <div className="w-24 h-24 rounded-full bg-rose-500 text-white flex items-center justify-center shadow-2xl shadow-rose-500/50 mb-3 animate-pulse">
          <X className="w-14 h-14 stroke-[3.5]" />
        </div>
        <span className="font-display font-black text-3xl tracking-widest text-rose-700 uppercase bg-white/95 px-6 py-2 rounded-2xl shadow-lg border border-rose-200">
          SKIPPED
        </span>
        <p className="text-xs font-bold text-rose-800 mt-2 bg-rose-50/90 px-3 py-1 rounded-full">
          Downvoted & deprioritized in recommendations (-20%)
        </p>
      </motion.div>

      {/* 3. ELECTRIC INDIGO OVERLAY: UP SWIPE (SKILL GAP ANALYSIS) */}
      <motion.div
        style={{ opacity: upOverlayOpacity }}
        className="absolute inset-0 z-30 pointer-events-none bg-[#5964FE]/20 border-4 border-[#5964FE] rounded-3xl flex flex-col items-center justify-center p-6 backdrop-blur-[2px] transition-all"
      >
        <div className="w-24 h-24 rounded-full bg-gradient-to-r from-[#5964FE] to-[#7B73FE] text-white flex items-center justify-center shadow-2xl shadow-[#5964FE]/50 mb-3 animate-pulse">
          <Zap className="w-14 h-14 fill-white" />
        </div>
        <span className="font-display font-black text-3xl tracking-widest text-[#434EEB] uppercase bg-white/95 px-6 py-2 rounded-2xl shadow-lg border border-[#C7D2FE]">
          SKILL GAP
        </span>
        <p className="text-xs font-bold text-[#434EEB] mt-2 bg-[#DFE3FF] px-3 py-1 rounded-full">
          Opening prerequisite bridges & prep plan
        </p>
      </motion.div>

      {/* ======================================================== */}
      {/* CARD CONTENT HEADER                                      */}
      {/* ======================================================== */}
      <div className="p-6 sm:p-7 space-y-4">
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
              Right to Shortlist • Left to Skip • Up for Skill Gap
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

      {/* Instruction Banner Pill */}
      <div className="flex items-center justify-center gap-3 text-[11px] font-bold text-[#525A8B] bg-white/80 py-2 px-4 rounded-2xl border border-[#E2E7FA] shadow-xs">
        <span className="text-emerald-700 flex items-center gap-1">
          <Check className="w-3.5 h-3.5 stroke-[3]" /> Right = Shortlist
        </span>
        <span className="text-[#8E9BBF]">•</span>
        <span className="text-rose-700 flex items-center gap-1">
          <X className="w-3.5 h-3.5 stroke-[3]" /> Left = Skip
        </span>
        <span className="text-[#8E9BBF]">•</span>
        <span className="text-[#434EEB] flex items-center gap-1">
          <Zap className="w-3.5 h-3.5 fill-[#5964FE]" /> Up = Skill Gap
        </span>
      </div>

      {/* The 3D Interactive Card Deck Container */}
      <div className="relative w-full h-[520px] sm:h-[540px] flex items-center justify-center">
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

      {/* Floating Action Buttons Toolbar */}
      {deck.length > 0 && (
        <div className="flex items-center justify-center gap-4 pt-2">
          
          {/* 1. Undo Button */}
          <button
            type="button"
            onClick={onUndoSwipe}
            disabled={swipeHistory.length === 0}
            title="Undo last swipe"
            className="w-12 h-12 rounded-2xl bg-white hover:bg-[#F8FAFF] text-[#525A8B] hover:text-[#10174D] border border-[#E2E7FA] shadow-sm flex items-center justify-center transition active:scale-90 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
          >
            <Undo2 className="w-5 h-5" />
          </button>

          {/* 2. Left Swipe (Skip) Button */}
          <button
            type="button"
            onClick={() => currentEvent && handleSwipe("left", currentEvent)}
            title="Skip (Left)"
            className="w-16 h-16 rounded-3xl bg-white hover:bg-rose-50 text-rose-600 border border-rose-200 shadow-md hover:shadow-lg shadow-rose-500/10 flex items-center justify-center transition active:scale-90 cursor-pointer group"
          >
            <X className="w-8 h-8 stroke-[3] group-hover:scale-110 transition-transform" />
          </button>

          {/* 3. Up Swipe (Skill Gap) Button */}
          <button
            type="button"
            onClick={() => currentEvent && handleSwipe("up", currentEvent)}
            title="Skill Gap Analysis (Up)"
            className="w-14 h-14 rounded-3xl bg-white hover:bg-[#EEF2FE] text-[#5964FE] border border-[#C7D2FE] shadow-md hover:shadow-lg shadow-[#5964FE]/10 flex items-center justify-center transition active:scale-90 cursor-pointer group"
          >
            <Zap className="w-7 h-7 fill-[#5964FE] group-hover:scale-110 transition-transform" />
          </button>

          {/* 4. Right Swipe (Shortlist) Button */}
          <button
            type="button"
            onClick={() => currentEvent && handleSwipe("right", currentEvent)}
            title="Shortlist (Right)"
            className="w-16 h-16 rounded-3xl bg-gradient-to-r from-[#5964FE] to-[#7B73FE] hover:opacity-95 text-white shadow-xl shadow-[#5964FE]/30 flex items-center justify-center transition active:scale-90 cursor-pointer group"
          >
            <Check className="w-8 h-8 stroke-[3.5] group-hover:scale-110 transition-transform" />
          </button>

        </div>
      )}

    </div>
  );
}
