import { describe, it, expect } from "vitest";
import { 
  rankEvents, 
  calculateSkillGap, 
  generateClientODLetter, 
  computeHybridScore 
} from "../services/aiEngine";
import { 
  INITIAL_EVENTS, 
  STUDENT_PROFILE, 
  EXAM_CALENDAR, 
  COLLEGE_OD_TEMPLATES, 
  INITIAL_TEAMMATES 
} from "../data/initialEvents";

describe("EventRoute AI Frontend Recommendation Engine", () => {

  it("should rank opportunities descending by AI match percentage", () => {
    const ranked = rankEvents(INITIAL_EVENTS, STUDENT_PROFILE, EXAM_CALENDAR);
    expect(ranked.length).toBe(INITIAL_EVENTS.length);
    
    // Check that every event has explainable properties
    ranked.forEach(e => {
      expect(e.ai_match).toBeDefined();
      expect(typeof e.ai_match.match_percentage).toBe("number");
      expect(Array.isArray(e.ai_match.why_recommended)).toBe(true);
    });

    // Check sorted descending
    for (let i = 0; i < ranked.length - 1; i++) {
      expect(ranked[i].ai_match.match_percentage).toBeGreaterThanOrEqual(
        ranked[i + 1].ai_match.match_percentage
      );
    }
  });

  it("should penalize events that conflict with student mandatory exams", () => {
    // Find event on exam dates (Oct 24-25)
    const clashingEvent = INITIAL_EVENTS.find(e => e.id === "evt_web3_defi_sprint");
    expect(clashingEvent).toBeDefined();

    const match = computeHybridScore(clashingEvent, STUDENT_PROFILE, EXAM_CALENDAR);
    expect(match.has_clash).toBe(true);
    expect(match.clash_notes.length).toBeGreaterThan(0);
    expect(match.match_percentage).toBeLessThan(75);
  });

  it("should isolate missing skills and estimate bridge learning time", () => {
    // HackAI Pune requires PyTorch which Milind lacks
    const gap = calculateSkillGap("evt_hackai_pune_26", STUDENT_PROFILE);
    expect(gap).toBeDefined();
    expect(gap.event_id).toBe("evt_hackai_pune_26");
    expect(gap.skills_have).toContain("Python");
    expect(gap.skills_have).toContain("FastAPI");
    expect(gap.skills_missing).toContain("PyTorch");
    expect(gap.total_prep_hours).toBeGreaterThan(0);
    expect(gap.learning_resources.length).toBeGreaterThan(0);
  });

  it("should generate formal Delhi Technical Campus OD leave letter with anti-tamper hash", () => {
    const target = INITIAL_EVENTS.find(e => e.id === "evt_techspark_dtc_26") || INITIAL_EVENTS[0];
    const letter = generateClientODLetter(target, "DTC_DELHI", STUDENT_PROFILE);

    expect(letter).toBeDefined();
    expect(letter.college_name).toBe("Delhi Technical Campus");
    expect(letter.university).toContain("GGSIPU");
    expect(letter.to_recipient.name).toContain("Tanwar");
    expect(letter.ref_number).toContain("DTC/CSE/OD/2026/");
    expect(letter.verification.hash).toMatch(/^VERIF-/);
    expect(letter.verification.url).toContain("verify.eventroute.ai/od/");
  });

  it("should include DTC batchmates Arman, Anshika, and Dimple in teammates", () => {
    const dtcPeers = INITIAL_TEAMMATES.filter(t => t.isDtcPeer);
    expect(dtcPeers.length).toBe(3);
    const names = dtcPeers.map(t => t.name);
    expect(names).toContain("Arman Chauhan");
    expect(names).toContain("Anshika Tyagi");
    expect(names).toContain("Dimple");
  });

});
