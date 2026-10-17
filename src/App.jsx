import React, { useState, useEffect, useRef } from "react";
import MedixSidebar from "./components/MedixSidebar";
import MedixTopBar from "./components/MedixTopBar";
import MedixHeroCards from "./components/MedixHeroCards";
import CollegeLogosSection from "./components/CollegeLogosSection";
import LightHeroSection from "./components/LightHeroSection";
import LightExplainableFeed from "./components/LightExplainableFeed";
import EventCard from "./components/EventCard";
import EventDetailModal from "./components/EventDetailModal";
import SkillGapModal from "./components/SkillGapModal";
import CalendarView from "./components/CalendarView";
import OdLetterModal from "./components/OdLetterModal";
import AssistantChatbot from "./components/AssistantChatbot";
import TeammateMatcher from "./components/TeammateMatcher";
import IdeaValidatorModal from "./components/IdeaValidatorModal";
import PortfolioView from "./components/PortfolioView";
import DemoWalkthrough from "./components/DemoWalkthrough";
import ComparisonModal from "./components/ComparisonModal";
import VerifyODModal from "./components/VerifyODModal";
import EventFlyerScannerModal from "./components/EventFlyerScannerModal";
import SwipeDiscoverDeck from "./components/SwipeDiscoverDeck";
import ShortlistView from "./components/ShortlistView";

import { INITIAL_EVENTS, STUDENT_PROFILE, EXAM_CALENDAR } from "./data/initialEvents";
import { fetchOpportunities, fetchSkillGap, requestODLetter, sendFeedback, syncShortlistAdd, syncShortlistRemove } from "./services/api";
import { rankEvents } from "./services/aiEngine";
import { Search, Filter, Sparkles, AlertTriangle, ShieldCheck, CheckCircle2, RotateCcw, Scan, Building2, Flame, BookmarkCheck } from "lucide-react";

export default function App() {
  const [activeTab, setActiveTab] = useState("feed");
  const [events, setEvents] = useState([]);
  const [feedbackWeights, setFeedbackWeights] = useState({
    "Artificial Intelligence": 1.15,
    "Machine Learning": 1.10,
    "Web3": 1.0,
    "Blockchain": 1.0,
    "Cloud Native": 1.05
  });
  const [downvotedEvents, setDownvotedEvents] = useState(new Set());
  const [upvotedEvents, setUpvotedEvents] = useState(new Set());

  // Shortlist and Swipe-to-Discover state (with localStorage persistence)
  const [shortlist, setShortlist] = useState(() => {
    try {
      const saved = localStorage.getItem("eventroute_shortlist_v1");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [swipeHistory, setSwipeHistory] = useState(() => {
    try {
      const saved = localStorage.getItem("eventroute_swipe_history_v1");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("eventroute_shortlist_v1", JSON.stringify(shortlist));
    } catch (e) {
      console.warn("Failed to persist shortlist to localStorage", e);
    }
  }, [shortlist]);

  useEffect(() => {
    try {
      localStorage.setItem("eventroute_swipe_history_v1", JSON.stringify(swipeHistory));
    } catch (e) {
      console.warn("Failed to persist swipeHistory to localStorage", e);
    }
  }, [swipeHistory]);
  
  // Modals state
  const [selectedEventDetails, setSelectedEventDetails] = useState(null);
  const [skillGapData, setSkillGapData] = useState(null);
  const [odLetterEvent, setOdLetterEvent] = useState(null);
  const [odLetterPayload, setOdLetterPayload] = useState(null);
  const [isComparisonOpen, setIsComparisonOpen] = useState(false);
  const [isVerifyModalOpen, setIsVerifyModalOpen] = useState(false);
  const [verifyLetterData, setVerifyLetterData] = useState(null);
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  
  // Chatbot & Demo Tour state
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [externalChatPrompt, setExternalChatPrompt] = useState("");
  const [demoStep, setDemoStep] = useState(1);
  const [isDemoTourOpen, setIsDemoTourOpen] = useState(false);
  const [targetTeammate, setTargetTeammate] = useState(null);
  const [rerankToast, setRerankToast] = useState(null);

  // Filters state
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCity, setSelectedCity] = useState("All");
  const [selectedFormat, setSelectedFormat] = useState("All");
  const [hideClashes, setHideClashes] = useState(false);
  const [activeCollegeFilter, setActiveCollegeFilter] = useState(null);

  const feedSectionRef = useRef(null);

  // Initialize ranked events
  useEffect(() => {
    const loadEvents = async () => {
      const data = await fetchOpportunities(feedbackWeights, downvotedEvents, upvotedEvents);
      setEvents(data);
    };
    loadEvents();
  }, []);

  // Dynamic Reranking Handler
  const handleFeedback = async (eventId, action, reasonTag) => {
    let newWeights = { ...feedbackWeights };
    const newDownvoted = new Set(downvotedEvents);
    const newUpvoted = new Set(upvotedEvents);

    if (action === "downvote") {
      newDownvoted.add(eventId);
      newUpvoted.delete(eventId);

      if (reasonTag && reasonTag.includes("Web3")) {
        newWeights["Web3"] = 0.35;
        newWeights["Blockchain"] = 0.35;
        newWeights["Artificial Intelligence"] = 1.30;
        showToast("Dynamic Rerank: Web3 penalized (-65%), AI boosted (+30%)!");
      } else {
        showToast(`Feedback recorded: Dynamic weights adjusted for ${action}!`);
      }
    } else if (action === "upvote") {
      newUpvoted.add(eventId);
      newDownvoted.delete(eventId);
      showToast("Dynamic Rerank: Boosted matching vectors (+25%)!");
    }

    setFeedbackWeights(newWeights);
    setDownvotedEvents(newDownvoted);
    setUpvotedEvents(newUpvoted);

    // Call API / Local rank
    await sendFeedback(eventId, action, reasonTag);
    const reranked = rankEvents(INITIAL_EVENTS, STUDENT_PROFILE, EXAM_CALENDAR, newWeights, newDownvoted, newUpvoted);
    setEvents(reranked);
  };

  // 1. Right Swipe Handler -> Shortlist & Positive AI Signal
  const handleShortlistEvent = async (event) => {
    // Add to shortlist if not already present
    setShortlist(prev => {
      if (prev.some(e => e.id === event.id)) return prev;
      return [event, ...prev];
    });

    // Record swipe history
    setSwipeHistory(prev => [{
      eventId: event.id,
      direction: "right",
      event,
      timestamp: Date.now()
    }, ...prev]);

    // Update feedback weights: Boost tags by +25%
    let newWeights = { ...feedbackWeights };
    (event.tags || []).forEach(tag => {
      newWeights[tag] = Number(((newWeights[tag] || 1.0) * 1.25).toFixed(2));
    });

    const newUpvoted = new Set(upvotedEvents);
    newUpvoted.add(event.id);
    const newDownvoted = new Set(downvotedEvents);
    newDownvoted.delete(event.id);

    setFeedbackWeights(newWeights);
    setUpvotedEvents(newUpvoted);
    setDownvotedEvents(newDownvoted);

    // Call API and re-rank in real time
    await sendFeedback(event.id, "upvote", event.tags?.[0]);
    await syncShortlistAdd(event);
    const reranked = rankEvents(INITIAL_EVENTS, STUDENT_PROFILE, EXAM_CALENDAR, newWeights, newDownvoted, newUpvoted);
    setEvents(reranked);

    showToast(`✓ Shortlisted '${event.title}'! AI boosted ${event.tags?.[0] || "relevant"} opportunities (+25%)`);
  };

  // 2. Left Swipe Handler -> Skip & Negative AI Signal
  const handleSkipEvent = async (event) => {
    // Record swipe history
    setSwipeHistory(prev => [{
      eventId: event.id,
      direction: "left",
      event,
      timestamp: Date.now()
    }, ...prev]);

    // Update feedback weights: Deprioritize tags by -20%
    let newWeights = { ...feedbackWeights };
    (event.tags || []).forEach(tag => {
      newWeights[tag] = Number(((newWeights[tag] || 1.0) * 0.80).toFixed(2));
    });

    const newDownvoted = new Set(downvotedEvents);
    newDownvoted.add(event.id);
    const newUpvoted = new Set(upvotedEvents);
    newUpvoted.delete(event.id);

    setFeedbackWeights(newWeights);
    setDownvotedEvents(newDownvoted);
    setUpvotedEvents(newUpvoted);

    // Call API and re-rank in real time
    await sendFeedback(event.id, "downvote", event.tags?.[0]);
    const reranked = rankEvents(INITIAL_EVENTS, STUDENT_PROFILE, EXAM_CALENDAR, newWeights, newDownvoted, newUpvoted);
    setEvents(reranked);

    showToast(`✕ Skipped '${event.title}'. AI deprioritized ${event.tags?.[0] || "skipped"} category (-20%)`);
  };

  // 3. Undo Last Swipe Handler
  const handleUndoSwipe = async () => {
    if (swipeHistory.length === 0) return;
    const [lastSwiped, ...remainingHistory] = swipeHistory;
    setSwipeHistory(remainingHistory);

    // If it was shortlisted, remove from shortlist
    if (lastSwiped.direction === "right") {
      setShortlist(prev => prev.filter(e => e.id !== lastSwiped.eventId));
      await syncShortlistRemove(lastSwiped.eventId);
    }

    // Revert feedback signals
    const newUpvoted = new Set(upvotedEvents);
    newUpvoted.delete(lastSwiped.eventId);
    const newDownvoted = new Set(downvotedEvents);
    newDownvoted.delete(lastSwiped.eventId);

    setUpvotedEvents(newUpvoted);
    setDownvotedEvents(newDownvoted);

    const reranked = rankEvents(INITIAL_EVENTS, STUDENT_PROFILE, EXAM_CALENDAR, feedbackWeights, newDownvoted, newUpvoted);
    setEvents(reranked);

    showToast(`↩ Restored '${lastSwiped.event.title}' back to discovery deck.`);
  };

  // 4. Reset Deck Handler
  const handleResetDeck = () => {
    setSwipeHistory([]);
    showToast(`Deck reshuffled! All opportunities are ready for discovery.`);
  };

  // 5. Remove from Shortlist Handler
  const handleRemoveFromShortlist = async (eventId) => {
    setShortlist(prev => prev.filter(e => e.id !== eventId));
    await syncShortlistRemove(eventId);
    showToast(`Removed event from your shortlist.`);
  };

  const showToast = (msg) => {
    setRerankToast(msg);
    setTimeout(() => setRerankToast(null), 4000);
  };

  // Demo flow triggers
  const handleStartDemoTour = () => {
    setIsDemoTourOpen(true);
    setDemoStep(1);
    setActiveTab("feed");
  };

  const handleOpenSkillGap = async (eventId) => {
    const target = events.find(e => e.id === eventId) || INITIAL_EVENTS[0];
    const gap = await fetchSkillGap(eventId, target);
    setSkillGapData(gap);
  };

  const handleGenerateOD = async (eventId, preloadedLetter) => {
    const target = events.find(e => e.id === eventId) || INITIAL_EVENTS[0];
    if (preloadedLetter) {
      setOdLetterPayload(preloadedLetter);
    } else {
      const letter = await requestODLetter(eventId, "DTC_DELHI", target);
      setOdLetterPayload(letter);
    }
    setOdLetterEvent(target);
  };

  const handleChatWithPrompt = (promptText) => {
    setExternalChatPrompt(promptText);
    setIsChatOpen(true);
  };

  const handleTriggerDownvoteDemo = () => {
    handleFeedback("evt_web3_defi_sprint", "downvote", "Not interested in Web3");
  };

  const handleResetWeights = () => {
    const cleanWeights = {
      "Artificial Intelligence": 1.15,
      "Machine Learning": 1.10,
      "Web3": 1.0,
      "Blockchain": 1.0,
      "Cloud Native": 1.05
    };
    setFeedbackWeights(cleanWeights);
    setDownvotedEvents(new Set());
    setUpvotedEvents(new Set());
    const reranked = rankEvents(INITIAL_EVENTS, STUDENT_PROFILE, EXAM_CALENDAR, cleanWeights, new Set(), new Set());
    setEvents(reranked);
    showToast("Model weights reset to default profile.");
  };

  const handleAcquireSkill = (skill) => {
    if (!STUDENT_PROFILE.skills.includes(skill)) {
      STUDENT_PROFILE.skills.push(skill);
    }
    const reranked = rankEvents(INITIAL_EVENTS, STUDENT_PROFILE, EXAM_CALENDAR, feedbackWeights, downvotedEvents, upvotedEvents);
    setEvents(reranked);
    showToast(`Skill '${skill}' verified! AI Match scores updated live!`);
  };

  const handleAddParsedEvent = (newEvent) => {
    setEvents(prev => [newEvent, ...prev]);
    showToast(`'${newEvent.title}' ingested into your live feed!`);
  };

  const scrollToFeed = () => {
    feedSectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Filtered Events
  const filteredEvents = events.filter((e) => {
    const matchSearch = e.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        e.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        e.organizer.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        e.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchCity = selectedCity === "All" || e.city === selectedCity;
    const matchFormat = selectedFormat === "All" || e.format.includes(selectedFormat);
    const matchClash = hideClashes ? !e.ai_match?.has_clash : true;
    const matchCollege = activeCollegeFilter 
      ? e.organizer.toLowerCase().includes(activeCollegeFilter.toLowerCase()) || e.title.toLowerCase().includes(activeCollegeFilter.toLowerCase())
      : true;

    return matchSearch && matchCity && matchFormat && matchClash && matchCollege;
  });

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] flex flex-row selection:bg-emerald-500 selection:text-white">
      
      {/* Dynamic Feedback Toast */}
      {rerankToast && (
        <div className="fixed top-20 right-6 z-50 p-4 rounded-2xl shadow-2xl flex items-center gap-2.5 animate-in slide-in-from-top-2 duration-300 border text-xs font-bold bg-white border-emerald-300 text-emerald-800 shadow-emerald-500/10">
          <Sparkles className="w-4 h-4 text-emerald-500 animate-spin" />
          <span>{rerankToast}</span>
        </div>
      )}

      {/* LEFT SIDEBAR (Layout from Screenshot) */}
      <div className="hidden lg:block sticky top-0 h-screen z-40">
        <MedixSidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          shortlistCount={shortlist.length}
        />
      </div>

      {/* RIGHT MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col min-w-0 pb-24">
        
        {/* Top Header Bar */}
        <MedixTopBar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          onStartDemoTour={handleStartDemoTour}
          shortlistCount={shortlist.length}
        />

        {/* Content Container */}
        <main className="max-w-7xl w-full mx-auto px-4 sm:px-8 py-6 space-y-10">
          
          {/* TAB 1: DASHBOARD & MAIN FEED */}
          {(activeTab === "feed" || activeTab === "opportunities") && (
            <div className="space-y-10">
              
              {/* Dual Hero Cards (Official OD Automation + AI Triage Card) */}
              <MedixHeroCards
                onTriggerOD={() => handleGenerateOD("evt_hackai_pune_26")}
                onStartAssessmentQuery={handleChatWithPrompt}
                onTriggerDemo={handleStartDemoTour}
                events={events}
                onShortlist={handleShortlistEvent}
                onSkip={handleSkipEvent}
                onOpenSkillGap={handleOpenSkillGap}
                onOpenDetails={setSelectedEventDetails}
                shortlist={shortlist}
                swipeHistory={swipeHistory}
                onUndoSwipe={handleUndoSwipe}
                onResetDeck={handleResetDeck}
              />

              {/* Verified College Logos & Institutional Crests */}
              <div className="p-6 rounded-3xl bg-white border border-[#E2E8F0] shadow-[0_4px_24px_rgba(15,23,42,0.02)]">
                <CollegeLogosSection
                  onSelectCollege={(col) => setActiveCollegeFilter(col)}
                  activeCollegeFilter={activeCollegeFilter}
                />
              </div>

              {/* Explainable Feed Section (#1 HackML 87% Card + Hybrid Weights Settings Panel) */}
              <div ref={feedSectionRef} className="rounded-3xl overflow-hidden">
                <LightExplainableFeed
                  onWhyClick={() => setSelectedEventDetails(events.find(e => e.id === "evt_hackai_pune_26") || INITIAL_EVENTS[0])}
                  onSkillGapClick={() => handleOpenSkillGap("evt_hackai_pune_26")}
                  onODClick={() => handleGenerateOD("evt_hackai_pune_26")}
                  onFeedback={handleFeedback}
                  downvoted={downvotedEvents.has("evt_hackai_pune_26")}
                  upvoted={upvotedEvents.has("evt_hackai_pune_26")}
                />
              </div>

              {/* Full Filterable Opportunities Directory */}
              <section className="space-y-6">
                
                {/* Search & Filters Header Bar */}
                <div className="p-6 rounded-3xl bg-white border border-[#E2E8F0] shadow-[0_4px_20px_rgba(15,23,42,0.03)] space-y-4">
                  
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
                    <div>
                      <h2 className="font-display font-bold text-xl text-[#0F172A] flex items-center gap-2">
                        <Sparkles className="w-5 h-5 text-emerald-600" />
                        Explore All Opportunities
                      </h2>
                      <p className="text-xs text-[#64748B] mt-0.5 font-medium">
                        Showing personalized opportunities for Milind (2nd Year CSE, Delhi Technical Campus).
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setIsScannerOpen(true)}
                        className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-slate-950 text-xs font-bold transition shadow-xs cursor-pointer"
                        title="Scan Flyer or WhatsApp text"
                      >
                        <Scan className="w-3.5 h-3.5" />
                        <span>+ Scan Flyer / URL</span>
                      </button>

                      <button
                        onClick={handleResetWeights}
                        className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition"
                        title="Reset AI weights"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Reset AI</span>
                      </button>
                    </div>
                  </div>

                  {/* Filter Inputs Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
                    
                    {/* Search query */}
                    <div className="relative">
                      <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search hackathons, topics, colleges..."
                        className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl pl-9 pr-3 py-2.5 text-[#0F172A] placeholder-slate-400 focus:border-emerald-500 outline-none transition"
                      />
                    </div>

                    {/* City Filter */}
                    <div>
                      <select
                        value={selectedCity}
                        onChange={(e) => setSelectedCity(e.target.value)}
                        className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl px-3 py-2.5 text-slate-700 focus:border-emerald-500 outline-none font-medium"
                      >
                        <option value="All">All Locations (Pune, Mumbai, BLR)</option>
                        <option value="Pune">Pune</option>
                        <option value="Mumbai">Mumbai</option>
                        <option value="Bengaluru">Bengaluru</option>
                        <option value="Online">Online</option>
                      </select>
                    </div>

                    {/* Format Filter */}
                    <div>
                      <select
                        value={selectedFormat}
                        onChange={(e) => setSelectedFormat(e.target.value)}
                        className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl px-3 py-2.5 text-slate-700 focus:border-emerald-500 outline-none font-medium"
                      >
                        <option value="All">All Formats (In-Person / Online)</option>
                        <option value="In-Person">In-Person Only</option>
                        <option value="Online">Online Only</option>
                      </select>
                    </div>

                    {/* Exam Clash Filter Toggle */}
                    <div className="flex items-center">
                      <label className="flex items-center gap-2 cursor-pointer bg-[#F8FAFC] border border-[#E2E8F0] px-3 py-2.5 rounded-xl w-full select-none hover:border-slate-300 transition">
                        <input
                          type="checkbox"
                          checked={hideClashes}
                          onChange={(e) => setHideClashes(e.target.checked)}
                          className="rounded accent-emerald-500 w-4 h-4 cursor-pointer"
                        />
                        <span className="text-slate-700 text-xs font-semibold">Hide Exam Clashes</span>
                      </label>
                    </div>

                  </div>

                </div>

                {/* Event Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredEvents.map((evt) => (
                    <EventCard
                      key={evt.id}
                      event={evt}
                      theme="light"
                      isDownvoted={downvotedEvents.has(evt.id)}
                      isUpvoted={upvotedEvents.has(evt.id)}
                      onOpenDetails={(e) => setSelectedEventDetails(e)}
                      onOpenSkillGap={(id) => handleOpenSkillGap(id)}
                      onGenerateOD={(id) => handleGenerateOD(id)}
                      onFeedback={handleFeedback}
                    />
                  ))}
                </div>

                {filteredEvents.length === 0 && (
                  <div className="p-12 text-center rounded-3xl bg-white border border-[#E2E8F0] text-[#64748B]">
                    <p className="text-sm font-semibold">No opportunities match the selected criteria.</p>
                    <p className="text-xs mt-1">Try relaxing filters or resetting the college selection.</p>
                  </div>
                )}

              </section>

            </div>
          )}

          {/* TAB: SWIPE TO DISCOVER DECK */}
          {activeTab === "swipe" && (
            <div className="py-2">
              <SwipeDiscoverDeck
                events={events}
                onShortlist={handleShortlistEvent}
                onSkip={handleSkipEvent}
                onOpenSkillGap={handleOpenSkillGap}
                onOpenDetails={(e) => setSelectedEventDetails(e)}
                shortlist={shortlist}
                swipeHistory={swipeHistory}
                onUndoSwipe={handleUndoSwipe}
                onResetDeck={handleResetDeck}
              />
            </div>
          )}

          {/* TAB: MY SHORTLIST */}
          {activeTab === "shortlist" && (
            <ShortlistView
              shortlist={shortlist}
              onRemoveFromShortlist={handleRemoveFromShortlist}
              onGenerateOD={(id) => handleGenerateOD(id)}
              onOpenSkillGap={(id) => handleOpenSkillGap(id)}
              onOpenDetails={(e) => setSelectedEventDetails(e)}
              onGoToSwipeDeck={() => setActiveTab("swipe")}
            />
          )}

          {/* TAB 2: CALENDAR & CLASHES */}
          {activeTab === "calendar" && (
            <CalendarView events={events} theme="light" />
          )}

          {/* TAB 3: TEAMMATES */}
          {activeTab === "teammates" && (
            <TeammateMatcher targetTeammate={targetTeammate} />
          )}

          {/* TAB 4: PORTFOLIO */}
          {activeTab === "portfolio" && (
            <PortfolioView />
          )}

          {/* TAB 5: IDEA VALIDATOR */}
          {activeTab === "validator" && (
            <IdeaValidatorModal events={events} />
          )}

          {/* TAB 6: COLLEGES */}
          {activeTab === "colleges" && (
            <div className="p-8 rounded-3xl bg-white border border-[#E2E8F0] shadow-sm space-y-6">
              <CollegeLogosSection
                onSelectCollege={(col) => {
                  setActiveCollegeFilter(col);
                  setActiveTab("feed");
                }}
                activeCollegeFilter={activeCollegeFilter}
              />
            </div>
          )}

          {/* TAB 7: OD LETTERS LIST */}
          {activeTab === "od_letters" && (
            <div className="p-8 rounded-3xl bg-white border border-[#E2E8F0] shadow-sm space-y-4">
              <h2 className="font-display font-extrabold text-2xl text-[#0F172A]">
                On-Duty (OD) Leave Management Node
              </h2>
              <p className="text-sm text-[#64748B]">
                Pre-approved official attendance leave letters formatted for Mumbai University and partner autonomous colleges.
              </p>
              <div className="pt-4 flex gap-3">
                <button
                  onClick={() => handleGenerateOD("evt_hackai_pune_26")}
                  className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-md transition cursor-pointer"
                >
                  Generate New OD Letter (HackAI Pune)
                </button>
              </div>
            </div>
          )}

        </main>

      </div>

      {/* Floating RAG Assistant Chatbot */}
      <AssistantChatbot
        events={events}
        isOpen={isChatOpen}
        setIsOpen={setIsChatOpen}
        externalPrompt={externalChatPrompt}
        onTriggerSkillGap={handleOpenSkillGap}
        onTriggerOD={handleGenerateOD}
        onTriggerTeammates={(tm) => {
          setTargetTeammate(tm);
          setActiveTab("teammates");
          setIsChatOpen(false);
        }}
      />

      {/* Judge Pitch Walkthrough Stepper */}
      <DemoWalkthrough
        isOpen={isDemoTourOpen}
        onClose={() => setIsDemoTourOpen(false)}
        currentStep={demoStep}
        setCurrentStep={setDemoStep}
        onOpenChatWithPrompt={handleChatWithPrompt}
        onOpenSkillGap={handleOpenSkillGap}
        onTriggerDownvoteDemo={handleTriggerDownvoteDemo}
        onOpenODLetterDemo={handleGenerateOD}
        onOpenComparisonModal={() => setIsComparisonOpen(true)}
      />

      {/* Modals */}
      <EventDetailModal
        event={selectedEventDetails}
        isOpen={!!selectedEventDetails}
        onClose={() => setSelectedEventDetails(null)}
        onOpenSkillGap={handleOpenSkillGap}
        onGenerateOD={handleGenerateOD}
      />

      <SkillGapModal
        gapData={skillGapData}
        isOpen={!!skillGapData}
        theme="light"
        onClose={() => setSkillGapData(null)}
        onAcquireSkill={handleAcquireSkill}
      />

      <OdLetterModal
        event={odLetterEvent}
        letterData={odLetterPayload}
        isOpen={!!odLetterEvent}
        onClose={() => {
          setOdLetterEvent(null);
          setOdLetterPayload(null);
        }}
        onVerifyClick={(data) => {
          setVerifyLetterData(data);
          setIsVerifyModalOpen(true);
        }}
      />

      <VerifyODModal
        isOpen={isVerifyModalOpen}
        onClose={() => setIsVerifyModalOpen(false)}
        letterData={verifyLetterData}
      />

      <EventFlyerScannerModal
        isOpen={isScannerOpen}
        onClose={() => setIsScannerOpen(false)}
        onAddEvent={handleAddParsedEvent}
      />

      <ComparisonModal
        isOpen={isComparisonOpen}
        onClose={() => setIsComparisonOpen(false)}
      />

    </div>
  );
}
