import { ArchiveItem } from '../types';

export const SEEDED_ARCHIVE_ITEMS: ArchiveItem[] = [
  // Pairwise (1999) Items
  {
    id: 'arch_pairwise_0814',
    platform: 'Pairwise',
    year: 1999,
    type: 'Technical Memo',
    title: 'Pairwise 1999: System Inception & Database Schema',
    summary: 'Internal memorandum by Ben from Northfield explaining the separation of Participant Accounts from the Relationship Primary Key.',
    content: `MEMO TO OPERATIONS — AUGUST 14, 1999
FROM: Ben (Northfield Systems)
SUBJECT: Relationship Index vs. User Records

We have configured the SQL tables so that RELATIONSHIP_ID is an independent auto-incremented primary key rather than a composite key of (USER_A, USER_B). 

If a user deletes their dial-up account, their seat in the relationship table remains open. If another user registers with matching questionnaire parameters, the engine automatically re-assigns the unoccupied slot.

This ensures statistical continuity across system upgrades. Do not modify the relational foreign keys. Backup tape password: CONTEXT_TIMING_RETURN.`,
    linkedUserIds: ['usr_ben_northfield'],
    linkedRelationshipIds: ['rel_2347_previouslymatched'],
    integrity: 94,
    anomalyCount: 1,
    metadata: { author: 'Ben from Northfield', server: 'PAIRWISE-01-BSD', gateCode: '0814' },
    puzzleGateId: 'gate_0814_legacy'
  },
  {
    id: 'arch_pairwise_staff_export',
    platform: 'Pairwise',
    year: 1999,
    type: 'System Log',
    title: 'Pairwise Longitudinal Slot Allocation (Tape Backup)',
    summary: 'Restored dial-up era server dump showing early algorithmic role replacement slots.',
    content: `PAIRWISE DIAL-UP LOG [RESTORED TAPE 08-1999]
=============================================
SLOT_01: [VACANT] <- Target affinity vector: (0.92, 0.88, 0.94)
SLOT_02: USER_10492 / USER_10844 [ACTIVE]
SLOT_03: USER_11012 / [VACANT - PENDING REPLACEMENT]
SLOT_44: [PERSISTENT - RECURRENCE DETECTED IN BOSTON COHORT]

NOTE: SLOT_01 has preserved continuity across 4 migrations without a registered participant. Awaiting arrival of matching node.`,
    linkedUserIds: ['usr_ben_northfield', 'usr_previouslymatched'],
    linkedRelationshipIds: ['rel_2347_previouslymatched'],
    integrity: 88,
    anomalyCount: 2,
    metadata: { tapeId: 'DAT-1999-0814', decryption: 'contexttimingreturn' },
    puzzleGateId: 'gate_pairwise_export'
  },

  // Affinity Room (2003) Items
  {
    id: 'arch_affinity_chat_0712',
    platform: 'Affinity Room',
    year: 2003,
    type: 'Message Thread',
    title: 'Affinity Room 2003: Thread #0712 (Leah M. & Samuel R.)',
    summary: 'Restored chatroom private archive between Leah Morgan and Samuel Reed discussing studio restoration.',
    content: `[AFFINITY ROOM V2.4 — PRIVATE SESSION #0712]
DATE: 2003-05-18 19:40 EST
PARTICIPANTS: leah_morgan_pairwise, sreedsunday

sreedsunday: Leah, the shop delivered the marbled paper sheets from Florence today. The peacock pattern is exactly as you described.
leah_morgan_pairwise: Keep them flat under the press until tomorrow morning. I’ll make tea as soon as I arrive at the studio.
sreedsunday: I feel as though we’ve bound this exact book fifty times before.
leah_morgan_pairwise: Maybe we have. See you at eight.

[SESSION CLOSED — ACCOUNT sreedsunday MEMORIALIZED 2019]
[SYSTEM NOTE 2026: Thread reconciled into Everfold active directory via Gate 0712]`,
    linkedUserIds: ['usr_leah_morgan', 'usr_samuel_reed'],
    linkedRelationshipIds: ['rel_0712_leah'],
    integrity: 96,
    anomalyCount: 1,
    metadata: { gateCode: '0712', channel: '#studio-conservators' },
    puzzleGateId: 'gate_0712_leah'
  },

  // Correspond (2008) Items
  {
    id: 'arch_correspond_letter_mcole',
    platform: 'Correspond',
    year: 2008,
    type: 'Profile Snapshot',
    title: 'Correspond 2008: Long-form Bulletin & Relational Lineage',
    summary: 'Historical post from Correspond exploring cross-platform identity drift.',
    content: `CORRESPOND BULLETIN — NOVEMBER 2, 2008
AUTHOR: meredith_c (Boston, MA)
SUBJECT: When an account is deleted, where does the relational tension go?

I have been analyzing the database schema of Correspond and its predecessor Pairwise. When two accounts sever a match, the relationship record does not zero out; it is marked as 'IDLE_CONTAINER'. 

When a new user joins with similar personality embeddings, they are slotted into the idle container. You are never starting a relationship from scratch; you are merely inheriting someone else’s unfinished conversation.`,
    linkedUserIds: ['usr_meredith_cole'],
    linkedRelationshipIds: ['rel_4417_meredith', 'rel_2347_previouslymatched'],
    integrity: 98,
    anomalyCount: 1,
    metadata: { platformVersion: 'Correspond 3.1' }
  },

  // Fold (2015) Items & Gate 4417 (Meredith Cole)
  {
    id: 'arch_meredith_ts_2218',
    platform: 'Fold',
    year: 2015,
    type: 'Support Case',
    title: 'Fold 2015: Case EF-TS-2218 (Meredith Cole Deceased Record Anomaly)',
    summary: 'Confidential Trust & Safety report on account persistence following participant death in September 2017.',
    content: `FOLD TRUST & SAFETY INCIDENT REPORT
CASE ID: EF-TS-2218
SUBJECT: Meredith Cole (meredith_c / ID #4417)
INVESTIGATOR: Marisol Vega / Jonah Feld
DATE: October 12, 2017

SUMMARY:
User was confirmed deceased on Sept 28, 2017. Her profile was flagged for memorialization/archival. However, the automated Forecast service continued to fire 30-day and 1-year trajectory milestones for her partner (Nora Weiss).

When Engineering attempted to manually delete relationship record #4417, the database threw critical constraint violation ERR_INVARIANT_ROLE_PRESERVED.

The relationship container cannot be dropped. It has been marked for ROLE_REPLACEMENT upon next system reboot. Access code: 4417.`,
    linkedUserIds: ['usr_meredith_cole', 'usr_nora_weiss'],
    linkedRelationshipIds: ['rel_4417_meredith'],
    integrity: 99,
    anomalyCount: 3,
    metadata: { caseCode: '4417', status: 'SEALED_RECURRENCE', severity: 'CRITICAL' },
    puzzleGateId: 'gate_4417_meredith'
  },

  // Internal System Docs (Gate 5: ROLE_RESOLVER, Gate 6: TS19)
  {
    id: 'arch_role_resolver_spec',
    platform: 'Internal System',
    year: 2023,
    type: 'Technical Memo',
    title: 'Everfold Architectural Spec: The Role Resolver Algorithm',
    summary: 'Engineering specification authored by Janelle Wu explaining how vacant relational roles are filled by new incoming users.',
    content: `EVERFOLD ENGINEERING SPECIFICATION — DOC #ENG-2023-88
TITLE: The Role Resolver Architecture
AUTHOR: Janelle Wu, Principal Graph Engineer
DATE: February 14, 2023

1. PRINCIPLE OF STRUCTURAL VACANCY:
In classical dating platforms, matches are computed as similarity between two users (U1 ⟷ U2).
In Everfold, matches are computed as the convergence between a User and a Pre-existing Relational Container (U ⟷ R).

2. VACANCY RESOLUTION:
When a Relationship R loses a participant (due to account deletion, breakup, relocation, or mortality), R enters status 'VACANT_SLOT'.
The Role Resolver continuously evaluates incoming registrations. When a candidate matches the historical impedance of the vacant slot, the user is mapped into R.

To query the live resolver queue, enter command: ROLE_RESOLVER.`,
    linkedUserIds: ['usr_janelle_wu', 'usr_previouslymatched'],
    linkedRelationshipIds: ['rel_2347_previouslymatched'],
    integrity: 100,
    anomalyCount: 0,
    metadata: { classification: 'Internal Eyes Only', gateCode: 'ROLE_RESOLVER' },
    puzzleGateId: 'gate_role_resolver'
  },
  {
    id: 'arch_nia_banerjee_notes_ts19',
    platform: 'Internal System',
    year: 2017,
    type: 'Technical Memo',
    title: 'Ethics Advisory Board 2017: Dissenting Opinion (Dr. Nia Banerjee)',
    summary: 'Confidential ethics committee dissent warning against automated role replacement without participant consent.',
    content: `MEMORANDUM TO EXECUTIVE COMMITTEE
FROM: Dr. Nia Banerjee, Chair of Ethics Advisory Board
DATE: December 15, 2017
REF: ETHICS-TS-19 / ROLE CONTINUITY PROTOCOL

I must formally register my dissent regarding the rollout of the automated Role Resolver across Fold and the planned Everfold redesign.

We are no longer offering users a matching service. We are maintaining an immortal lattice of relationship structures and populating them with human beings who believe they are making an authentic, spontaneous choice.

If a woman believes she has found her soulmate, but she has merely stepped into the exact coordinates vacated by Meredith Cole in 2017, we have violated the foundational premise of human agency.

Gate verification code: TS19.`,
    linkedUserIds: ['usr_dr_nia_banerjee', 'usr_celia_moreno'],
    linkedRelationshipIds: ['rel_4417_meredith', 'rel_2347_previouslymatched'],
    integrity: 100,
    anomalyCount: 1,
    metadata: { classification: 'Ethics Board 2017', gateCode: 'TS19' },
    puzzleGateId: 'gate_ts19_ethics_notes'
  },

  // Forecast Raw Diagnostics (Gate 8: 97.2)
  {
    id: 'arch_forecast_raw_972',
    platform: 'Internal System',
    year: 2026,
    type: 'Forecast Artifact',
    title: 'Forecast Engine Diagnostics: Parameter 97.2 Calibration',
    summary: 'Raw diagnostic telemetry for the invariant RETURN event across longitudinal cohorts.',
    content: `EVERFOLD FORECAST ENGINE — TELEMETRY LOG 97.2
==================================================
CONFIDENCE LEVEL: 97.2%
CALIBRATION STATUS: INVARIANT RETURN LOCKED

DIAGNOSTIC TRACE:
Cohort A (1999 Pairwise): Re-convergence probability = 97.2%
Cohort B (2008 Correspond): Re-convergence probability = 97.8%
Cohort C (2015 Fold): Re-convergence probability = 98.4%
Cohort D (2026 Everfold): Re-convergence probability = 99.8%

CONCLUSION:
Changing scenario toggles (Relocation, Career, Distance) produces local turbulence, but the 12-month attractor remains locked at event: RETURN. The system does not forecast the future; it enforces the relational geometry.`,
    linkedUserIds: ['usr_ethan_rowe'],
    linkedRelationshipIds: ['rel_2347_previouslymatched', 'rel_4417_meredith'],
    integrity: 100,
    anomalyCount: 2,
    metadata: { gateCode: '97.2', confidence: 0.972 },
    puzzleGateId: 'gate_97_2_forecast'
  }
];
