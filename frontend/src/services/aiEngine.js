/**
 * Client-Side Explainable AI Engine & Agent Simulator
 * Allows full offline and instantaneous demo execution without backend dependencies.
 */

import { STUDENT_PROFILE, EXAM_CALENDAR, SKILL_LEARNING_VAULT, COLLEGE_OD_TEMPLATES, INITIAL_TEAMMATES } from "../data/initialEvents";

function tokenize(text) {
  if (!text) return new Set();
  const clean = text.toLowerCase().replace(/[^a-z0-9]/g, " ");
  return new Set(clean.split(/\s+/).filter(w => w.length > 2));
}

export function calculateSemanticSimilarity(event, user = STUDENT_PROFILE) {
  const userCorpus = [...user.skills, ...user.interests, "developer", "software", "student"].join(" ");
  const eventCorpus = [event.title, event.description, ...event.tags, ...(event.domains || [])].join(" ");

  const uTokens = tokenize(userCorpus);
  const eTokens = tokenize(eventCorpus);

  let intersect = 0;
  for (const t of uTokens) {
    if (eTokens.has(t)) intersect++;
  }

  if (uTokens.size === 0 || eTokens.size === 0) return 0.5;
  const sim = intersect / Math.sqrt(uTokens.size * eTokens.size);
  return Math.min(1.0, Math.max(0.3, sim * 2.2));
}

export function detectExamClash(event, exams = EXAM_CALENDAR) {
  const eStart = new Date(event.start_date);
  const eEnd = new Date(event.end_date);

  const clashDetails = [];
  let hasClash = false;

  for (const exam of exams) {
    const exStart = new Date(exam.start_date);
    const exEnd = new Date(exam.end_date);

    // Date collision
    if (eStart.toDateString() === exStart.toDateString() || (eStart <= exEnd && eEnd >= exStart)) {
      hasClash = true;
      clashDetails.push(`Clashes with '${exam.title}' on ${exStart.toLocaleDateString("en-US", { month: "short", day: "numeric" })}`);
    }
  }

  return { hasClash, clashDetails };
}

export function calculateSkillGap(event, user = STUDENT_PROFILE) {
  const reqSkills = event.required_skills || [];
  const userSkillsSet = new Set(user.skills.map(s => s.toLowerCase()));

  const have = [];
  const missing = [];

  for (const s of reqSkills) {
    if (userSkillsSet.has(s.toLowerCase())) {
      have.push(s);
    } else {
      missing.push(s);
    }
  }

  const learningResources = [];
  let totalPrepHours = 0;

  for (const m of missing) {
    const vaultItem = SKILL_LEARNING_VAULT[m];
    if (vaultItem) {
      learningResources.push({
        skill: m,
        title: vaultItem.title,
        est_hours: vaultItem.est_hours,
        url: vaultItem.url,
        desc: vaultItem.desc,
        type: vaultItem.type
      });
      totalPrepHours += vaultItem.est_hours;
    } else {
      learningResources.push({
        skill: m,
        title: `Intro to ${m} for Hackathons`,
        est_hours: 2,
        url: `https://www.google.com/search?q=${encodeURIComponent(m)}+crash+course`,
        desc: `High-yield syntax and architecture primer for ${m}.`,
        type: "Quick Guide"
      });
      totalPrepHours += 2;
    }
  }

  const fitPercentage = reqSkills.length > 0 ? Math.round((have.length / reqSkills.length) * 100) : 100;

  return {
    event_id: event.id,
    event_title: event.title,
    fit_percentage: fitPercentage,
    skills_have: have,
    skills_missing: missing,
    total_prep_hours: totalPrepHours,
    learning_resources: learningResources
  };
}

export function computeHybridScore(event, user = STUDENT_PROFILE, exams = EXAM_CALENDAR, feedbackWeights = {}, downvotedEvents = new Set(), upvotedEvents = new Set()) {
  const semSim = calculateSemanticSimilarity(event, user);
  const gapInfo = calculateSkillGap(event, user);
  const skillFit = gapInfo.fit_percentage / 100.0;
  const worthIt = (event.worth_it_score || 85) / 100.0;

  const { hasClash, clashDetails } = detectExamClash(event, exams);
  const clashMultiplier = hasClash ? 0.45 : 1.0;

  const tagMultipliers = (event.tags || []).map(t => feedbackWeights[t] || 1.0);
  let feedbackMultiplier = tagMultipliers.length > 0 
    ? tagMultipliers.reduce((a, b) => a + b, 0) / tagMultipliers.length 
    : 1.0;

  if (downvotedEvents.has(event.id)) {
    feedbackMultiplier *= 0.40;
  } else if (upvotedEvents.has(event.id)) {
    feedbackMultiplier *= 1.30;
  }

  const rawScore = ((0.40 * semSim) + (0.30 * skillFit) + (0.30 * worthIt)) * clashMultiplier * feedbackMultiplier;
  const finalPercentage = Math.min(99, Math.max(12, Math.round(rawScore * 100)));

  const whyReasons = [];
  const whyNotReasons = [];

  if (!hasClash) {
    whyReasons.push("Zero schedule clash with your semester lab exams.");
  } else {
    whyNotReasons.push(clashDetails[0] || "Exam schedule collision.");
  }

  if (gapInfo.skills_have.length >= 2) {
    whyReasons.push(`Strong overlap with your verified skills (${gapInfo.skills_have.join(", ")}).`);
  }

  if ((event.worth_it_score || 0) >= 90) {
    whyReasons.push(`High Worth-It Score (${event.worth_it_score}/100) with Tier-1 industry recognition.`);
  }

  if (gapInfo.skills_missing.length > 0) {
    whyNotReasons.push(`Missing prerequisites: ${gapInfo.skills_missing.join(", ")} (${gapInfo.total_prep_hours}h prep needed).`);
  }

  return {
    match_percentage: finalPercentage,
    has_clash: hasClash,
    clash_notes: clashDetails,
    why_recommended: whyReasons,
    why_not_recommended: whyNotReasons,
    semantic_score: Math.round(semSim * 100),
    skill_fit_score: Math.round(skillFit * 100),
    worth_it_score: event.worth_it_score,
    feedback_multiplier: Number(feedbackMultiplier.toFixed(2))
  };
}

export function rankEvents(events, user, exams, feedbackWeights, downvotedEvents, upvotedEvents) {
  return events.map(evt => ({
    ...evt,
    ai_match: computeHybridScore(evt, user, exams, feedbackWeights, downvotedEvents, upvotedEvents)
  })).sort((a, b) => b.ai_match.match_percentage - a.ai_match.match_percentage);
}

export function generateClientODLetter(event, collegeKey = "DTC_DELHI", student = STUDENT_PROFILE) {
  const collegeConfig = COLLEGE_OD_TEMPLATES[collegeKey] || COLLEGE_OD_TEMPLATES["DTC_DELHI"];
  const docUUID = Math.random().toString(36).substring(2, 8).toUpperCase();
  const refNumber = `${collegeConfig.letter_code_prefix}${docUUID}`;

  const startDt = new Date(event.start_date);
  const endDt = new Date(event.end_date);
  const dateOptions = { month: "long", day: "numeric", year: "numeric" };
  const eventDaysStr = `${startDt.toLocaleDateString("en-US", dateOptions)} to ${endDt.toLocaleDateString("en-US", dateOptions)}`;
  const durationDays = Math.max(1, Math.round((endDt - startDt) / (1000 * 60 * 60 * 24)) + 1);

  const verificationHash = `VERIF-${docUUID}-${student.roll_no.slice(-4)}`;
  const verificationUrl = `https://verify.eventroute.ai/od/${verificationHash}`;

  return {
    ref_number: refNumber,
    generated_date: new Date().toLocaleDateString("en-US", dateOptions),
    college_name: collegeConfig.college_name,
    university: collegeConfig.university,
    college_address: collegeConfig.address,
    to_recipient: {
      name: collegeConfig.hod_name,
      designation: collegeConfig.hod_title,
      department: student.branch,
      institution: collegeConfig.college_name
    },
    student_details: {
      name: student.name,
      roll_no: student.roll_no,
      branch: student.branch,
      year: student.year,
      email: student.email,
      current_attendance: `${student.attendance_rate}%`
    },
    event_details: {
      id: event.id,
      title: event.title,
      organizer: event.organizer,
      format: event.format,
      city: event.city,
      dates: eventDaysStr,
      duration_days: durationDays,
      verification_status: event.verification_status || "Verified Tier-1"
    },
    subject: `Request for Grant of On-Duty (OD) Leave for Participation in '${event.title}'`,
    body_paragraphs: [
      `Respected Sir/Madam,`,
      `I am writing to formally request On-Duty (OD) attendance leave from ${eventDaysStr} (${durationDays} day(s)) to represent ${collegeConfig.college_name} at '${event.title}', organized by ${event.organizer}.`,
      `This competitive opportunity aligns with our department's technical excellence standards and involves intensive, verified software development in ${(event.domains || ["Advanced Computing"]).join(", ")}.`,
      `I undertake to ensure that all course lectures, laboratory assignments, and internal continuous evaluations missed during this period will be compensated promptly. Upon returning, I will submit the official Certificate of Participation to the department office.`,
      `Kindly grant On-Duty leave for the aforementioned dates and adjust my attendance records accordingly.`
    ],
    verification: {
      hash: verificationHash,
      url: verificationUrl,
      qr_data: `EVENTROUTE:OD:${verificationHash}:${student.roll_no}:${event.id}`
    }
  };
}

export function processClientAssistant(userMessage, events, student = STUDENT_PROFILE) {
  const q = userMessage.toLowerCase();
  const toolLogs = [];
  let actionPayload = null;
  let reply = "";

  if ((q.includes("hackathon") || q.includes("event") || q.includes("weekend")) && (q.includes("exam") || q.includes("clash") || q.includes("ai"))) {
    toolLogs.push({
      tool: "query_calendar_clash",
      status: "success",
      detail: "Retrieved academic timetable: DBMS Lab on Oct 24, Software Eng Viva on Oct 25."
    });
    toolLogs.push({
      tool: "semantic_filter_events",
      status: "success",
      detail: "Filtered out 'Web3 DeFi Sprint' due to hard conflict with DBMS Lab Exam on Oct 24."
    });
    toolLogs.push({
      tool: "hybrid_rank_opportunities",
      status: "success",
      detail: "Identified 'HackAI Pune 2026' -> Starts Oct 26 (Sunday). Zero exam overlap. 94% Match."
    });

    reply = `Hey ${student.name.split(" ")[0]}! I checked your college exam schedule against upcoming opportunities.\n\n⚠️ **Note**: You have a mandatory **DBMS Lab Exam** on Saturday, Oct 24, so I filtered out the *Web3 DeFi Sprint*.\n\n🎯 **Top Recommendation**: **HackAI Pune 2026**\n• **Dates**: Oct 26 – 27 (Starts Sunday 9:00 AM — **Zero Exam Clash**)\n• **Match Score**: **94%** (Worth-It Score: 94/100)\n• **Why**: Matches your Python, FastAPI, and React stack. Mentors from Google Cloud.\n• **Action**: You have a minor prerequisite gap in PyTorch (est. 3 hours prep). You can inspect the skill gap or generate an instant OD leave letter below!`;

    actionPayload = {
      recommended_event_id: "evt_hackai_pune_26",
      suggested_actions: ["Inspect Skill Gap", "Generate OD Letter", "Find Teammates"]
    };
  } else if (q.includes("skill") || q.includes("learn") || q.includes("gap") || q.includes("prepare")) {
    toolLogs.push({
      tool: "calculate_skill_gap",
      status: "success",
      detail: "Analyzed prerequisites for HackAI Pune 2026 against verified student profile."
    });
    const target = events.find(e => e.id === "evt_hackai_pune_26") || events[0];
    const gap = calculateSkillGap(target, student);

    reply = `Here is your AI Skill-Gap breakdown for **${gap.event_title}**:\n\n✅ **Skills You Have (${gap.skills_have.length}/4)**: ${gap.skills_have.join(", ")}\n⚠️ **Missing Prerequisite**: **${gap.skills_missing.join(", ")}**\n\n💡 **Action Plan** (~${gap.total_prep_hours} hours total prep):\n` +
      gap.learning_resources.map(r => `• **${r.title}** (${r.est_hours}h) — ${r.desc}`).join("\n");

    actionPayload = {
      action_type: "open_skill_gap",
      event_id: target.id
    };
  } else if (q.includes("od") || q.includes("leave") || q.includes("letter") || q.includes("attendance")) {
    toolLogs.push({
      tool: "generate_od_letter",
      status: "success",
      detail: "Fetched Delhi Technical Campus (GGSIPU) OD template and compiled official PDF data."
    });
    const target = events.find(e => e.id === "evt_hackai_pune_26") || events[0];
    const letter = generateClientODLetter(target, "DTC_DELHI", student);

    reply = `📄 I have generated your formal **On-Duty (OD) Leave Letter** for **${target.title}**!\n\n• **Ref**: \`${letter.ref_number}\`\n• **Addressed to**: ${letter.to_recipient.name} (${letter.to_recipient.designation})\n• **Dates**: ${letter.event_details.dates} (${letter.event_details.duration_days} Days)\n• **Anti-Tamper Hash**: \`${letter.verification.hash}\`\n\nClick below to open the printable PDF with verified QR code and college letterhead.`;

    actionPayload = {
      action_type: "open_od_letter",
      event_id: target.id,
      letter_data: letter
    };
  } else if (q.includes("team") || q.includes("teammate") || q.includes("partner")) {
    toolLogs.push({
      tool: "match_teammates_synergy",
      status: "success",
      detail: "Scored complementary student profiles for ML + Frontend stack."
    });
    const topMatch = INITIAL_TEAMMATES[0];

    reply = `🤝 Found a high-synergy teammate match for **HackAI Pune 2026**!\n\n• **Name**: **${topMatch.name}** (${topMatch.branch}, ${topMatch.college})\n• **Skills**: ${topMatch.skills.join(", ")}\n• **Synergy Score**: **${topMatch.synergy_score}% Match**\n• **Why Match**: ${topMatch.synergy_reason}\n\nWould you like me to send a collaboration invitation to her?`;

    actionPayload = {
      action_type: "open_teammates",
      recommended_teammate: topMatch
    };
  } else {
    toolLogs.push({
      tool: "general_intent_parser",
      status: "success",
      detail: "Retrieved guidance categories."
    });

    reply = `I am your **EventRoute AI Co-Pilot**. Try asking me:\n\n1. *"Find me an AI hackathon this weekend that won't clash with my exams"*\n2. *"What skills am I missing for HackAI Pune?"*\n3. *"Draft my college OD leave letter for my HOD"*\n4. *"Find me a teammate with PyTorch skills"*`;
  }

  return { reply, tool_calls: toolLogs, action_payload: actionPayload };
}
