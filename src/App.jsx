import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
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

import { INITIAL_EVENTS, STUDENT_PROFILE, EXAM_CALENDAR } from "./data/initialEvents";
import { fetchOpportunities, fetchSkillGap, requestODLetter, sendFeedback } from "./services/api";
import { rankEvents } from "./services/aiEngine";
import { Search, Filter, Sparkles, AlertTriangle, ShieldCheck, CheckCircle2, RotateCcw } from "lucide-react";

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
  
  // Modals state
  const [selectedEventDetails, setSelectedEventDetails] = useState(null);
  const [skillGapData, setSkillGapData] = useState(null);
  const [odLetterEvent, setOdLetterEvent] = useState(null);
  const [odLetterPayload, setOdLetterPayload] = useState(null);
  const [isComparisonOpen, setIsComparisonOpen] = useState(false);
  
  // Chatbot & Demo Tour state
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [externalChatPrompt, setExternalChatPrompt] = useState("");
  const [isDemoTourOpen, setIsDemoTourOpen] = useState(false);
  const [demoStep, setDemoStep] = useState(1);
  const [targetTeammate, setTargetTeammate] = useState(null);
  const [rerankToast, setRerankToast] = useState(null);

  // Filters state
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCity, setSelectedCity] = useState("All");
  const [selectedFormat, setSelectedFormat] = useState("All");
  const [hideClashes, setHideClashes] = useState(false);

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

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col pb-24 selection:bg-indigo-500 selection:text-white">
      
      {/* Dynamic Feedback Toast */}
      {rerankToast && (
        <div className="fixed top-20 right-6 z-50 p-3.5 rounded-xl bg-slate-900 border border-emerald-500/60 text-emerald-300 text-xs font-semibold shadow-2xl flex items-center gap-2 animate-in slide-in-from-top-2 duration-300">
          <Sparkles className="w-4 h-4 text-emerald-400" />
          <span>{rerankToast}</span>
        </div>
      )}

      {/* Navigation Bar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onStartDemoTour={handleStartDemoTour}
        onOpenComparison={() => setIsComparisonOpen(true)}
      />

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 w-full flex-1">
        
        {/* TAB 1: OPPORTUNITIES FEED */}
        {activeTab === "feed" && (
          <div className="space-y-6">
            
            {/* Hero / Filter Bar */}
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
              
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-3 border-b border-slate-800">
                <div>
                  <h1 className="font-display font-bold text-xl text-white flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-indigo-400" />
                    Intelligent Opportunity Stream
                  </h1>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Ranked by dense semantic vectors, academic collision detection & real-time user feedback.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleResetWeights}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs text-slate-400 hover:text-slate-200 transition"
                    title="Reset Reranking Weights"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Reset AI Weights</span>
                  </button>
                </div>
              </div>

              {/* Search & Filter Inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
                
                {/* Search query */}
                <div className="relative">
                  <Search className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by topic, skill, college..."
                    className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-xl pl-9 pr-3 py-2.5 text-white placeholder-slate-500 outline-none transition"
                  />
                </div>

                {/* City Filter */}
                <div>
                  <select
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-xl px-3 py-2.5 text-slate-300 outline-none"
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
                    className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-xl px-3 py-2.5 text-slate-300 outline-none"
                  >
                    <option value="All">All Formats (In-Person / Online)</option>
                    <option value="In-Person">In-Person Only</option>
                    <option value="Online">Online Only</option>
                  </select>
                </div>

                {/* Exam Clash Filter Toggle */}
                <div className="flex items-center">
                  <label className="flex items-center gap-2 cursor-pointer bg-slate-950 border border-slate-800 px-3 py-2.5 rounded-xl w-full select-none hover:border-slate-700 transition">
                    <input
                      type="checkbox"
                      checked={hideClashes}
                      onChange={(e) => setHideClashes(e.target.checked)}
                      className="rounded accent-indigo-500 w-4 h-4 cursor-pointer"
                    />
                    <span className="text-slate-300 text-xs font-medium">Hide Exam Clashes</span>
                  </label>
                </div>

              </div>

            </div>

            {/* Opportunities Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredEvents.map((evt) => (
                <EventCard
                  key={evt.id}
                  event={evt}
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
              <div className="p-12 text-center rounded-2xl bg-slate-900 border border-slate-800 text-slate-400">
                <p className="text-sm font-semibold">No opportunities match the selected criteria.</p>
                <p className="text-xs mt-1">Try relaxing filters or unchecking "Hide Exam Clashes".</p>
              </div>
            )}

          </div>
        )}

        {/* TAB 2: CALENDAR & CLASHES */}
        {activeTab === "calendar" && (
          <CalendarView events={events} />
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
        onClose={() => setSkillGapData(null)}
      />

      <OdLetterModal
        event={odLetterEvent}
        letterData={odLetterPayload}
        isOpen={!!odLetterEvent}
        onClose={() => {
          setOdLetterEvent(null);
          setOdLetterPayload(null);
        }}
      />

      <ComparisonModal
        isOpen={isComparisonOpen}
        onClose={() => setIsComparisonOpen(false)}
      />

    </div>
  );
}
