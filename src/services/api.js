/**
 * API Service for EventRoute AI
 * Connects to FastAPI backend if available, or gracefully falls back to client-side engine.
 */

import { INITIAL_EVENTS, STUDENT_PROFILE, EXAM_CALENDAR } from "../data/initialEvents";
import { rankEvents, calculateSkillGap, generateClientODLetter, processClientAssistant } from "./aiEngine";

let backendAvailable = null;

export async function checkBackendHealth() {
  if (backendAvailable !== null) return backendAvailable;
  try {
    const res = await fetch("/api/health", { method: "GET", headers: { "Accept": "application/json" } });
    if (res.ok) {
      backendAvailable = true;
      return true;
    }
  } catch (err) {
    backendAvailable = false;
  }
  backendAvailable = false;
  return false;
}

export async function fetchOpportunities(feedbackWeights = {}, downvotedEvents = new Set(), upvotedEvents = new Set()) {
  const isUp = await checkBackendHealth();
  if (isUp) {
    try {
      const res = await fetch("/api/events");
      if (res.ok) {
        const data = await res.json();
        return data.events;
      }
    } catch (e) {
      console.warn("Backend error, falling back to local engine", e);
    }
  }

  // Fallback to client-side ranking
  return rankEvents(INITIAL_EVENTS, STUDENT_PROFILE, EXAM_CALENDAR, feedbackWeights, downvotedEvents, upvotedEvents);
}

export async function sendFeedback(eventId, action, reasonTag) {
  const isUp = await checkBackendHealth();
  if (isUp) {
    try {
      const res = await fetch("/api/events/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ event_id: eventId, action, reason_tag: reasonTag })
      });
      if (res.ok) {
        return await res.json();
      }
    } catch (e) {
      console.warn("Backend feedback error", e);
    }
  }
  return { status: "local_success", event_id: eventId, action, reason_tag: reasonTag };
}

export async function fetchSkillGap(eventId, eventObj) {
  const isUp = await checkBackendHealth();
  if (isUp) {
    try {
      const res = await fetch(`/api/events/${eventId}/skill-gap`);
      if (res.ok) {
        return await res.json();
      }
    } catch (e) {
      console.warn("Backend skill gap error", e);
    }
  }
  return calculateSkillGap(eventObj || INITIAL_EVENTS.find(e => e.id === eventId));
}

export async function requestODLetter(eventId, collegeKey, eventObj) {
  const isUp = await checkBackendHealth();
  if (isUp) {
    try {
      const res = await fetch("/api/od-letter/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ event_id: eventId, college_key: collegeKey })
      });
      if (res.ok) {
        return await res.json();
      }
    } catch (e) {
      console.warn("Backend OD letter error", e);
    }
  }
  return generateClientODLetter(eventObj || INITIAL_EVENTS.find(e => e.id === eventId), collegeKey);
}

export async function askAssistant(message, events) {
  const isUp = await checkBackendHealth();
  if (isUp) {
    try {
      const res = await fetch("/api/assistant/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message })
      });
      if (res.ok) {
        return await res.json();
      }
    } catch (e) {
      console.warn("Backend assistant error", e);
    }
  }
  return processClientAssistant(message, events, STUDENT_PROFILE);
}
