import React, { useState, useEffect, useRef } from "react";
import Navbar from "./components/Navbar";
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

import { INITIAL_EVENTS, STUDENT_PROFILE, EXAM_CALENDAR } from "./data/initialEvents";
import { fetchOpportunities, fetchSkillGap, requestODLetter, sendFeedback } from "./services/api";
import { rankEvents } from "./services/aiEngine";
import { Search, Filter, Sparkles, AlertTriangle, ShieldCheck, CheckCircle2, RotateCcw, Scan } from "lucide-react";

export default function App() {
  const [theme, setTheme] = useState("light");
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
      const letter = await requestODLetter(eventId, "TSEC_MUMBAI", target);
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
                        e.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchCity = selectedCity === "All" || e.city === selectedCity;
    const matchFormat = selectedFormat === "All" || e.format.includes(selectedFormat);
    const matchClash = hideClashes ? !e.ai_match?.has_clash : true;

    return matchSearch && matchCity && matchFormat && matchClash;
  });

  const isLight = theme === "light";

  return (
    <div className={`min-h-screen flex flex-col pb-24 selection:bg-emerald-500 selection:text-white transition-colors duration-200 ${
      isLight ? "bg-[#F8FAFC] text-[#0F172A]" : "bg-slate-950 text-slate-100"
    }`}>
      
      {/* Dynamic Feedback Toast */}
      {rerankToast && (
        <div className={`fixed top-20 right-6 z-50 p-4 rounded-2xl shadow-2xl flex items-center gap-2.5 animate-in slide-in-from-top-2 duration-300 border text-xs font-bold ${
          isLight 
            ? "bg-white border-emerald-300 text-emerald-800 shadow-emerald-500/10" 
            : "bg-slate-900 border-emerald-500/60 text-emerald-300"
        }`}>
          <Sparkles className="w-4 h-4 text-emerald-500 animate-spin" />
          <span>{rerankToast}</span>
        </div>
      )}

      {/* Navigation Bar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onStartDemoTour={handleStartDemoTour}
        onOpenComparison={() => setIsComparisonOpen(true)}
        theme={theme}
        setTheme={setTheme}
      />

      {/* Main Content Area */}
      <main className="w-full flex-1">
        
        {/* TAB 1: OPPORTUNITIES FEED */}
        {activeTab === "feed" && (
          <div className="space-y-0">
            
            {/* SECTION 1: Clean Light Mode Hero Area with 3D Parallax Tilt */}
            <LightHeroSection
              onSeeMatches={scrollToFeed}
              onOpenAssistant={() => setIsChatOpen(true)}
              onExploreEvent={() => handleOpenSkillGap("evt_hackai_pune_26")}
            />

            {/* SECTION 2: Explainable Feed (Settings Panel + #1 HackML Card) */}
            <div ref={feedSectionRef}>
              <LightExplainableFeed
                onWhyClick={() => setSelectedEventDetails(events.find(e => e.id === "evt_hackai_pune_26") || INITIAL_EVENTS[0])}
                onSkillGapClick={() => handleOpenSkillGap("evt_hackai_pune_26")}
                onODClick={() => handleGenerateOD("evt_hackai_pune_26")}
                onFeedback={handleFeedback}
                downvoted={downvotedEvents.has("evt_hackai_pune_26")}
                upvoted={upvotedEvents.has("evt_hackai_pune_26")}
              />
            </div>

            {/* SECTION 3: Full Filterable & Searchable Opportunities Grid */}
            <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              
              {/* Search and Filters Bar */}
              <div className={`p-6 rounded-3xl border mb-8 transition-colors ${
                isLight 
                  ? "bg-white border-[#E2E8F0] shadow-[0_4px_20px_rgba(15,23,42,0.03)]" 
                  : "bg-slate-900 border-slate-800"
              }`}>
                
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-4 border-b border-slate-100">
                  <div>
                    <h2 className="font-display font-bold text-xl text-[#0F172A] flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-emerald-600" />
                      All Recommended Opportunities
                    </h2>
                    <p className={`text-xs mt-0.5 ${isLight ? "text-[#475569]" : "text-slate-400"}`}>
                      Ranked dynamically by verified student profile, academic clash engine, and active feedback weights.
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setIsScannerOpen(true)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold transition shadow-xs cursor-pointer"
                      title="Paste flyer or WhatsApp text to extract opportunity"
                    >
                      <Scan className="w-3.5 h-3.5" />
                      <span>+ Scan Flyer / URL</span>
                    </button>

                    <button
                      onClick={handleResetWeights}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
                        isLight 
                          ? "bg-slate-100 hover:bg-slate-200 text-slate-700" 
                          : "bg-slate-800 hover:bg-slate-700 text-slate-300"
                      }`}
                      title="Reset Reranking Weights"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Reset AI Weights</span>
                    </button>
                  </div>
                </div>

                {/* Search & Filter Inputs */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs pt-4">
                  
                  {/* Search query */}
                  <div className="relative">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search by topic, skill, college..."
                      className={`w-full border rounded-xl pl-9 pr-3 py-2.5 outline-none transition ${
                        isLight 
                          ? "bg-[#F8FAFC] border-[#E2E8F0] text-[#0F172A] placeholder-slate-400 focus:border-emerald-500" 
                          : "bg-slate-950 border-slate-800 text-white placeholder-slate-500 focus:border-indigo-500"
                      }`}
                    />
                  </div>

                  {/* City Filter */}
                  <div>
                    <select
                      value={selectedCity}
                      onChange={(e) => setSelectedCity(e.target.value)}
                      className={`w-full border rounded-xl px-3 py-2.5 outline-none font-medium ${
                        isLight 
                          ? "bg-[#F8FAFC] border-[#E2E8F0] text-slate-700 focus:border-emerald-500" 
                          : "bg-slate-950 border-slate-800 text-slate-300 focus:border-indigo-500"
                      }`}
                    >
                      <option value="All">All Cities (Pune, Mumbai, BLR)</option>
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
                      className={`w-full border rounded-xl px-3 py-2.5 outline-none font-medium ${
                        isLight 
                          ? "bg-[#F8FAFC] border-[#E2E8F0] text-slate-700 focus:border-emerald-500" 
                          : "bg-slate-950 border-slate-800 text-slate-300 focus:border-indigo-500"
                      }`}
                    >
                      <option value="All">All Formats (In-Person / Online)</option>
                      <option value="In-Person">In-Person Only</option>
                      <option value="Online">Online Only</option>
                    </select>
                  </div>

                  {/* Exam Clash Filter Toggle */}
                  <div className="flex items-center">
                    <label className={`flex items-center gap-2 cursor-pointer border px-3 py-2.5 rounded-xl w-full select-none transition ${
                      isLight 
                        ? "bg-[#F8FAFC] border-[#E2E8F0] text-slate-700 hover:border-slate-300" 
                        : "bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700"
                    }`}>
                      <input
                        type="checkbox"
                        checked={hideClashes}
                        onChange={(e) => setHideClashes(e.target.checked)}
                        className="rounded accent-emerald-500 w-4 h-4 cursor-pointer"
                      />
                      <span className="text-xs font-semibold">Hide Exam Clashes</span>
                    </label>
                  </div>

                </div>

              </div>

              {/* Opportunities Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredEvents.map((evt) => (
                  <EventCard
                    key={evt.id}
                    event={evt}
                    theme={theme}
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
                <div className={`p-12 text-center rounded-3xl border ${
                  isLight ? "bg-white border-[#E2E8F0] text-[#475569]" : "bg-slate-900 border-slate-800 text-slate-400"
                }`}>
                  <p className="text-sm font-semibold">No opportunities match the selected criteria.</p>
                  <p className="text-xs mt-1">Try relaxing filters or unchecking "Hide Exam Clashes".</p>
                </div>
              )}

            </section>

          </div>
        )}

        {/* TAB 2: CALENDAR & CLASHES */}
        {activeTab === "calendar" && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
            <CalendarView events={events} />
          </div>
        )}

        {/* TAB 3: TEAMMATES */}
        {activeTab === "teammates" && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
            <TeammateMatcher targetTeammate={targetTeammate} />
          </div>
        )}

        {/* TAB 4: PORTFOLIO */}
        {activeTab === "portfolio" && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
            <PortfolioView />
          </div>
        )}

        {/* TAB 5: IDEA VALIDATOR */}
        {activeTab === "validator" && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
            <IdeaValidatorModal events={events} />
          </div>
        )}

      </main>

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
        theme={theme}
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
