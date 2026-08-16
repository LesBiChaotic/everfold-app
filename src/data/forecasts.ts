import { Forecast } from '../types';

export const SEEDED_FORECASTS: Record<string, Forecast> = {
  fc_9918_naomi: {
    id: 'fc_9918_naomi',
    relationshipId: 'rel_9918_naomi',
    title: 'Naomi Serrano & You',
    overallScore: 94,
    strengths: [
      'Exceptional aesthetic & architectural resonance',
      'Mutual appreciation for slow evening conversations',
      'High alignment in personal pacing and autonomy'
    ],
    stressPoints: [
      'Potential friction during studio project crunch periods',
      'Reluctance on both sides to initiate emotionally vulnerable check-ins'
    ],
    communicationPressure: 22,
    scheduleFit: 88,
    relocationPressure: 15,
    familyIntegration: 80,
    goalConvergence: 92,
    timeline30Days: 'Exploratory coffee dates, studio visits, and organic conversation rhythm.',
    timeline6Months: 'Stable co-presence, shared weekend dinners, and collaborative creative projects.',
    timeline1Year: 'Deep mutual grounding with preserved individual creative spaces.',
    events: [
      { id: 'ev_1', monthOffset: 1, title: 'Studio Lighting Exhibition', description: 'Collaborative evening visit to the Bay Area architectural showcase.', category: 'Milestone', probability: 0.92 },
      { id: 'ev_2', monthOffset: 3, title: 'Communication Rhythm Calibration', description: 'Adjusting pacing during Naomi’s library design deadline.', category: 'Friction', probability: 0.45 },
      { id: 'ev_3', monthOffset: 6, title: 'Shared Travel to Mendocino', description: 'Quiet coastal retreat with photography and ceramics focus.', category: 'Convergence', probability: 0.84 },
      { id: 'ev_4', monthOffset: 12, title: 'Long-term Space Alignment', description: 'Integrating creative routines and shared domestic balance.', category: 'Milestone', probability: 0.78 }
    ]
  },

  fc_8821_mina: {
    id: 'fc_8821_mina',
    relationshipId: 'rel_8821_mina',
    title: 'Mina Okafor & You',
    overallScore: 91,
    strengths: [
      'Rapid intellectual sparks and expressive voice-note cadence',
      'Deep shared curiosity around food history and regional cultures',
      'High emotional transparency and honesty'
    ],
    stressPoints: [
      'Mina’s intensive cookbook writing retreats require complete solitary focus',
      'Differing morning energy rhythms'
    ],
    communicationPressure: 35,
    scheduleFit: 84,
    relocationPressure: 28,
    familyIntegration: 85,
    goalConvergence: 89,
    timeline30Days: 'Exchanging food essays, trying hole-in-the-wall restaurants, voice note exchanges.',
    timeline6Months: 'Culinary research weekend trips, joint fermentation experiments.',
    timeline1Year: 'Co-creating a vibrant, community-centered domestic life.',
    events: [
      { id: 'ev_m1', monthOffset: 1, title: 'Vintage Menu Archive Exploration', description: 'Spending an entire Saturday scouring Seattle antique book markets.', category: 'Milestone', probability: 0.95 },
      { id: 'ev_m2', monthOffset: 4, title: 'Writing Retreat Solitude', description: 'Navigating a 3-week period of low digital communication during manuscript drafting.', category: 'Friction', probability: 0.62 },
      { id: 'ev_m3', monthOffset: 8, title: 'Dinner Party Hosting', description: 'Cooking an 8-course dinner for friends and family.', category: 'Convergence', probability: 0.88 },
      { id: 'ev_m4', monthOffset: 12, title: 'Relational Role Solidification', description: 'Establishing an enduring, joyful partnership dynamic.', category: 'Milestone', probability: 0.81 }
    ]
  },

  fc_7734_hana: {
    id: 'fc_7734_hana',
    relationshipId: 'rel_7734_hana',
    title: 'Hana Prasetyo & You',
    overallScore: 97,
    strengths: [
      'Profound emotional grounding and gentle, steady cadence',
      'Shared reverence for natural pacing, plants, and craftsmanship',
      'Effortless comfortable silence'
    ],
    stressPoints: [
      'Occasional tendency to retreat inward instead of raising minor discomforts'
    ],
    communicationPressure: 14,
    scheduleFit: 96,
    relocationPressure: 10,
    familyIntegration: 90,
    goalConvergence: 98,
    timeline30Days: 'Greenhouse visits, quiet tea brewing, building small wooden shelves.',
    timeline6Months: 'Consistent morning routines, seasonal gardening projects, deep trust.',
    timeline1Year: 'Harmonious long-term partnership with profound mutual understanding.',
    events: [
      { id: 'ev_h1', monthOffset: 1, title: 'Tea Ceremony & Bonsai Pruning', description: 'A serene Sunday afternoon at the Portland Japanese Garden.', category: 'Milestone', probability: 0.98 },
      { id: 'ev_h2', monthOffset: 3, title: 'Rainy Season Quietude', description: 'Navigating winter mood shifts with shared warm hearth teas.', category: 'Convergence', probability: 0.91 },
      { id: 'ev_h3', monthOffset: 6, title: 'Bicycle Tour Along Coast', description: 'Weekend bicycle camping journey through Oregon coastal paths.', category: 'Milestone', probability: 0.86 },
      { id: 'ev_h4', monthOffset: 12, title: 'RETURN (Invariant Milestone)', description: 'Re-convergence of botanical relational role. Constant across all scenario simulations.', category: 'RETURN', probability: 0.998, isInvariantReturn: true }
    ]
  },

  fc_4417_raw: {
    id: 'fc_4417_raw',
    relationshipId: 'rel_4417_meredith',
    title: 'REL-4417 [RAW DIAGNOSTICS: MEREDITH COLE / NORA WEISS]',
    overallScore: 99.8,
    strengths: [
      'Longitudinal continuity invariant across 4 platform migrations',
      'Markov transition probability: 0.998'
    ],
    stressPoints: [
      'Participant mortality (Subject deceased 2017)',
      'Forecasting engine continues to execute post-termination trajectory'
    ],
    communicationPressure: 0,
    scheduleFit: 100,
    relocationPressure: 0,
    familyIntegration: 100,
    goalConvergence: 100,
    timeline30Days: '[DIAGNOSTIC] Relational node active in memory cache.',
    timeline6Months: '[DIAGNOSTIC] Candidate role replacement slot scanned across new registrations.',
    timeline1Year: '[DIAGNOSTIC] Re-stabilization of structural pair index.',
    events: [
      { id: 'ev_raw_1', monthOffset: 1, title: 'Posthumous Continuity Pulse', description: 'Database recalculation triggers without active participant session.', category: 'Recurrence', probability: 0.998 },
      { id: 'ev_raw_2', monthOffset: 6, title: 'Candidate Slot Identification', description: 'Incoming user assigned to structural vacancy created in 2017.', category: 'Recurrence', probability: 0.94 },
      { id: 'ev_raw_3', monthOffset: 12, title: 'RETURN', description: 'Invariant structural re-convergence. Independent of participant lifespan.', category: 'RETURN', probability: 0.998, isInvariantReturn: true }
    ],
    isRaw: true,
    rawConfidence: 97.2,
    unresolvedParticipant: true,
    systemNotes: 'GATE 97.2 UNLOCKED: Longitudinal model indicates relational identity is decoupled from user lifespan.'
  },

  fc_2347_final_raw: {
    id: 'fc_2347_final_raw',
    relationshipId: 'rel_2347_previouslymatched',
    title: 'REL-2347 [@previouslymatched / Current Participant]',
    overallScore: 99.8,
    strengths: [
      '27-year persistent continuity graph',
      'Participant assignment confidence: 63%',
      'Relationship continuity confidence: 99.8%'
    ],
    stressPoints: [
      'Participant awareness of structural replacement loop'
    ],
    communicationPressure: 0,
    scheduleFit: 100,
    relocationPressure: 0,
    familyIntegration: 100,
    goalConvergence: 100,
    timeline30Days: 'Reconciliation of historic connection across 1999–2026.',
    timeline6Months: 'Convergence of relational parameters toward invariant steady state.',
    timeline1Year: 'RETURN.',
    events: [
      { id: 'ev_fin_1', monthOffset: 1, title: 'System Convergence Notice', description: 'Reconciliation of historical archives into single active relationship slot.', category: 'Convergence', probability: 0.998 },
      { id: 'ev_fin_2', monthOffset: 6, title: 'Role Stabilization', description: 'Current user fully adopts structural role previously held by past participants.', category: 'Recurrence', probability: 0.998 },
      { id: 'ev_fin_3', monthOffset: 12, title: 'RETURN', description: 'The invariant final milestone. Present across all four platform generations.', category: 'RETURN', probability: 0.998, isInvariantReturn: true }
    ],
    isRaw: true,
    rawConfidence: 99.8,
    unresolvedParticipant: true,
    systemNotes: 'Everfold does not predict recurrence; Everfold maintains the relational container until someone steps into it.'
  }
};

// Deterministic scenario modifiers
export function applyForecastScenario(
  baseForecast: Forecast,
  activeScenarios: Record<string, boolean>
): Forecast {
  let score = baseForecast.overallScore;
  let comm = baseForecast.communicationPressure;
  let sched = baseForecast.scheduleFit;
  let reloc = baseForecast.relocationPressure;
  let goal = baseForecast.goalConvergence;

  if (activeScenarios['New Job']) {
    score -= 4;
    comm += 12;
    sched -= 10;
  }
  if (activeScenarios['Relocation']) {
    score -= 8;
    reloc += 35;
    sched -= 15;
  }
  if (activeScenarios['Long Distance']) {
    score -= 10;
    comm += 25;
    sched -= 20;
    reloc += 20;
  }
  if (activeScenarios['Schedule Change']) {
    sched -= 18;
    comm += 8;
  }
  if (activeScenarios['Family Pressure']) {
    score -= 6;
    comm += 15;
  }
  if (activeScenarios['Financial Stress']) {
    score -= 7;
    comm += 18;
  }
  if (activeScenarios['Cohabitation']) {
    score += 5;
    comm -= 10;
    sched += 12;
    goal += 8;
  }

  // Bound within realistic bounds
  score = Math.max(40, Math.min(99.8, score));
  comm = Math.max(0, Math.min(100, comm));
  sched = Math.max(0, Math.min(100, sched));
  reloc = Math.max(0, Math.min(100, reloc));
  goal = Math.max(0, Math.min(100, goal));

  return {
    ...baseForecast,
    overallScore: Math.round(score * 10) / 10,
    communicationPressure: Math.round(comm),
    scheduleFit: Math.round(sched),
    relocationPressure: Math.round(reloc),
    goalConvergence: Math.round(goal),
    // Crucial requirement: RETURN event must remain invariant across scenario toggles
    events: baseForecast.events.map((ev) => {
      if (ev.isInvariantReturn || ev.title === 'RETURN') {
        return { ...ev, probability: 0.998 };
      }
      return {
        ...ev,
        probability: Math.max(0.2, Math.min(0.99, ev.probability - (activeScenarios['Relocation'] ? 0.08 : 0)))
      };
    })
  };
}
