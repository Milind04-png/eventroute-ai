import { describe, it, expect } from "vitest";
import { rankEvents } from "../services/aiEngine";
import { INITIAL_EVENTS, STUDENT_PROFILE, EXAM_CALENDAR } from "../data/initialEvents";

describe("Swipe Discover Gesture Engine & AI Vector Re-ranking", () => {

  it("should boost AI match scores when user swipes right (shortlists) an event category", () => {
    // Initial ranking without boosts
    const initialRank = rankEvents(INITIAL_EVENTS, STUDENT_PROFILE, EXAM_CALENDAR);
    const initialEvent = initialRank.find(e => e.id === "evt_hackai_pune_26");
    expect(initialEvent).toBeDefined();

    // Simulate right swipe on AI event (+25% boost on Artificial Intelligence)
    const boostedWeights = {
      "Artificial Intelligence": 1.25 * 1.15,
      "Machine Learning": 1.10
    };
    const upvoted = new Set(["evt_hackai_pune_26"]);
    const downvoted = new Set();

    const reranked = rankEvents(INITIAL_EVENTS, STUDENT_PROFILE, EXAM_CALENDAR, boostedWeights, downvoted, upvoted);
    const rerankedEvent = reranked.find(e => e.id === "evt_hackai_pune_26");

    expect(rerankedEvent.ai_match.match_percentage).toBeGreaterThanOrEqual(initialEvent.ai_match.match_percentage);
  });

  it("should deprioritize opportunities when user swipes left (skips)", () => {
    const skippedEventId = "evt_web3_defi_sprint";
    const downvoted = new Set([skippedEventId]);
    const reducedWeights = {
      "Web3": 0.80,
      "Blockchain": 0.80
    };

    const reranked = rankEvents(INITIAL_EVENTS, STUDENT_PROFILE, EXAM_CALENDAR, reducedWeights, downvoted, new Set());
    const skippedEvent = reranked.find(e => e.id === skippedEventId);

    // Skipped event should have lower rank/position
    const skippedIndex = reranked.findIndex(e => e.id === skippedEventId);
    expect(skippedIndex).toBeGreaterThan(1);
    expect(skippedEvent.ai_match.match_percentage).toBeLessThan(70);
  });

  it("should correctly restore scores when undoing a swipe", () => {
    // Before swipe
    const cleanRank = rankEvents(INITIAL_EVENTS, STUDENT_PROFILE, EXAM_CALENDAR);
    
    // After right swipe
    const upvoted = new Set(["evt_hackai_pune_26"]);
    const boostedRank = rankEvents(INITIAL_EVENTS, STUDENT_PROFILE, EXAM_CALENDAR, { "Artificial Intelligence": 1.4 }, new Set(), upvoted);
    expect(boostedRank[0].id).toBe("evt_hackai_pune_26");

    // After undo (reverting upvoted set and weights)
    const restoredRank = rankEvents(INITIAL_EVENTS, STUDENT_PROFILE, EXAM_CALENDAR, undefined, new Set(), new Set());
    expect(restoredRank.length).toBe(cleanRank.length);
    expect(restoredRank[0].ai_match.match_percentage).toBe(cleanRank[0].ai_match.match_percentage);
  });

});
