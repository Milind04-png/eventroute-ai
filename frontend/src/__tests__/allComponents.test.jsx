import { describe, it, expect } from "vitest";
import React from "react";
import { renderToString } from "react-dom/server";

// Import all main components
import AssistantChatbot from "../components/AssistantChatbot";
import AttendanceShieldWidget from "../components/AttendanceShieldWidget";
import CalendarView from "../components/CalendarView";
import CollegeLogosSection from "../components/CollegeLogosSection";
import ComparisonModal from "../components/ComparisonModal";
import DemoWalkthrough from "../components/DemoWalkthrough";
import EventCard from "../components/EventCard";
import EventDetailModal from "../components/EventDetailModal";
import EventFlyerScannerModal from "../components/EventFlyerScannerModal";
import IdeaValidatorModal from "../components/IdeaValidatorModal";
import LightExplainableFeed from "../components/LightExplainableFeed";
import LightHeroSection from "../components/LightHeroSection";
import LocalStorageFileManagerModal from "../components/LocalStorageFileManagerModal";
import MedixHeroCards from "../components/MedixHeroCards";
import MedixSidebar from "../components/MedixSidebar";
import MedixTopBar from "../components/MedixTopBar";
import OdLetterModal from "../components/OdLetterModal";
import PortfolioView from "../components/PortfolioView";
import ShortlistView from "../components/ShortlistView";
import SkillGapModal from "../components/SkillGapModal";
import SwipeDiscoverDeck from "../components/SwipeDiscoverDeck";
import TeammateMatcher from "../components/TeammateMatcher";
import TeamRosterModal from "../components/TeamRosterModal";
import VerifyODModal from "../components/VerifyODModal";

import { INITIAL_EVENTS } from "../data/initialEvents";

describe("All Components Smoke Test", () => {
  it("renders MedixHeroCards without error", () => {
    expect(() => renderToString(<MedixHeroCards events={INITIAL_EVENTS} />)).not.toThrow();
  });

  it("renders MedixTopBar without error", () => {
    expect(() => renderToString(<MedixTopBar />)).not.toThrow();
  });

  it("renders MedixSidebar without error", () => {
    expect(() => renderToString(<MedixSidebar activeTab="feed" />)).not.toThrow();
  });

  it("renders CollegeLogosSection without error", () => {
    expect(() => renderToString(<CollegeLogosSection />)).not.toThrow();
  });

  it("renders AssistantChatbot without error", () => {
    expect(() => renderToString(<AssistantChatbot events={INITIAL_EVENTS} isOpen={false} />)).not.toThrow();
    expect(() => renderToString(<AssistantChatbot events={INITIAL_EVENTS} isOpen={true} />)).not.toThrow();
  });

  it("renders SwipeDiscoverDeck without error", () => {
    expect(() => renderToString(<SwipeDiscoverDeck events={INITIAL_EVENTS} />)).not.toThrow();
  });
});
