import { TrustSafetyCase } from '../types';

export const SEEDED_TRUST_SAFETY_CASES: TrustSafetyCase[] = [
  {
    id: 'ts_case_2218',
    caseNumber: 'EF-TS-2218',
    title: 'Meredith Cole / Nora Weiss (Posthumous Forecast Generation)',
    subjectUserIds: ['usr_meredith_cole', 'usr_nora_weiss'],
    linkedRelationshipIds: ['rel_4417_meredith'],
    severity: 'CRITICAL',
    status: 'SEALED_RECURRENCE',
    openedDate: '2017-10-12',
    closedDate: '2017-12-01',
    assignedStaff: 'Marisol Vega / Jonah Feld',
    summary: 'Participant deceased in Sept 2017; system continues generating active forecast events and refuses deletion of underlying relationship record.',
    investigatorNotes: [
      { author: 'Marisol Vega', date: '2017-10-14', text: 'Confirmed death certificate on file for Meredith Cole. Set account status to Memorialized.' },
      { author: 'Jonah Feld', date: '2017-10-18', text: 'Forecast service fired 30-day milestone notification to surviving partner. Nora Weiss submitted high-distress ticket.' },
      { author: 'Janelle Wu (Engineering)', date: '2017-10-22', text: 'Attempted to DROP relational node #4417. Database rejected cascade delete. The container is invariant.' }
    ],
    evidenceItems: ['arch_meredith_ts_2218', 'arch_meredith_last_memo'],
    tags: ['POSTHUMOUS_RECURRENCE', 'PERSISTENT_PAIR', 'FORECAST_CONTAMINATION', 'GATE_4417'],
    relatedCaseNumbers: ['EF-TS-2281', 'EF-TS-2347']
  },
  {
    id: 'ts_case_2281',
    caseNumber: 'EF-TS-2281',
    title: 'Mina Okafor (Culinary Role Replacement Discrepancy)',
    subjectUserIds: ['usr_mina_okafor'],
    linkedRelationshipIds: ['rel_8821_mina'],
    severity: 'HIGH',
    status: 'MONITORED',
    openedDate: '2025-11-25',
    assignedStaff: 'Marisol Vega',
    summary: 'New user Mina Okafor mapped into exact historical culinary archivist container previously held in Fold 2015.',
    investigatorNotes: [
      { author: 'Marisol Vega', date: '2025-11-26', text: 'Mina’s profile prompts matched 94% of the vector previously occupied by account m_okafor_fold.' },
      { author: 'Ethan Rowe', date: '2025-12-02', text: 'Role Resolver successfully mapped the new account. Continuity confidence: 92%.' }
    ],
    evidenceItems: ['arch_mina_case_2281'],
    tags: ['ROLE_REPLACEMENT', 'IDENTITY_DRIFT', 'RECURRENCE_INDEX'],
    relatedCaseNumbers: ['EF-TS-2218']
  },
  {
    id: 'ts_case_2347',
    caseNumber: 'EF-TS-2347',
    title: '@previouslymatched (Unresolved Longitudinal Slot 01)',
    subjectUserIds: ['usr_previouslymatched', 'visitor_user'],
    linkedRelationshipIds: ['rel_2347_previouslymatched'],
    severity: 'RESTRICTED_LORE',
    status: 'OPEN',
    openedDate: '1999-08-14',
    assignedStaff: 'Jonah Feld / Executive Committee',
    summary: 'The primary seed relational container instantiated during Pairwise 1999 launch. Has maintained continuity across 4 platform generations with 7 sequential participant replacements.',
    investigatorNotes: [
      { author: 'Ben (Pairwise)', date: '1999-08-14', text: 'Slot 01 opened in dial-up database. Relational ID decoupled from user IDs.' },
      { author: 'Callum Price', date: '2008-05-19', text: 'Slot migrated to Correspond. Participant identity replaced without loss of graph topology.' },
      { author: 'Dr. Celia Moreno', date: '2026-01-10', text: 'Incoming visitor mapped into current occupant slot. Continuity confidence: 99.8%. Invariant RETURN event scheduled.' }
    ],
    evidenceItems: ['arch_pairwise_0814', 'arch_pairwise_staff_export', 'arch_role_resolver_spec', 'arch_forecast_raw_972'],
    tags: ['UNRESOLVED_PARTNER', 'PERSISTENT_PAIR', 'ROLE_REPLACEMENT', 'INVARIANT_RETURN', 'RECURRENCE_INDEX_MAX'],
    relatedCaseNumbers: ['EF-TS-2218', 'EF-TS-2281', 'EF-TS-2094']
  },
  {
    id: 'ts_case_2094',
    caseNumber: 'EF-TS-2094',
    title: 'Hana Prasetyo (Creation Date Discrepancy & Invariant Horizon)',
    subjectUserIds: ['usr_hana_prasetyo'],
    linkedRelationshipIds: ['rel_7734_hana'],
    severity: 'MEDIUM',
    status: 'IN_REVIEW',
    openedDate: '2026-02-10',
    assignedStaff: 'Marisol Vega',
    summary: 'User account shows creation timestamp in Fold 2024 prior to Everfold launch. Connection info displays shared milestone from 2022.',
    investigatorNotes: [
      { author: 'Marisol Vega', date: '2026-02-12', text: 'Audit of database shows registration record inherited from historical botanist role.' }
    ],
    evidenceItems: ['arch_hana_fold_export'],
    tags: ['IDENTITY_DRIFT', 'CREATION_DATE_DISCREPANCY', 'PERSISTENT_PAIR'],
    relatedCaseNumbers: ['EF-TS-2347']
  },
  {
    id: 'ts_case_2105',
    caseNumber: 'EF-TS-2105',
    title: 'Leah Morgan (Restoration of Memorialized Affinity Thread)',
    subjectUserIds: ['usr_leah_morgan', 'usr_samuel_reed'],
    linkedRelationshipIds: ['rel_0712_leah'],
    severity: 'HIGH',
    status: 'MONITORED',
    openedDate: '2026-03-01',
    assignedStaff: 'Jonah Feld',
    summary: 'Affinity Room 2003 message thread with deceased spouse restored by background reconciliation sweep.',
    investigatorNotes: [
      { author: 'Jonah Feld', date: '2026-03-02', text: 'User reported seeing historical chat thread reappear in active inbox.' }
    ],
    evidenceItems: ['arch_affinity_chat_0712'],
    tags: ['POSTHUMOUS_RECURRENCE', 'SURVIVOR_PAIR', 'RESTORED_THREAD'],
    relatedCaseNumbers: ['EF-TS-2218']
  },
  {
    id: 'ts_case_1988',
    caseNumber: 'EF-TS-1988',
    title: 'Iris Holt (Role Replacement Subject Dissociation)',
    subjectUserIds: ['usr_iris_holt'],
    linkedRelationshipIds: ['rel_2347_previouslymatched'],
    severity: 'CRITICAL',
    status: 'OPEN',
    openedDate: '2024-04-18',
    assignedStaff: 'Marisol Vega',
    summary: 'User reported severe cognitive distress claiming conversations were being answered by another account while she was offline.',
    investigatorNotes: [
      { author: 'Marisol Vega', date: '2024-04-20', text: 'Iris was mapped as temporary occupant of Slot 01 during beta testing.' }
    ],
    evidenceItems: [],
    tags: ['ABANDONMENT_LOOP', 'ROLE_REPLACEMENT', 'IDENTITY_DRIFT'],
    relatedCaseNumbers: ['EF-TS-2347']
  },
  {
    id: 'ts_case_2022',
    caseNumber: 'EF-TS-2022',
    title: 'Camille Renaud (Archival Contradiction Inquiry)',
    subjectUserIds: ['usr_camille_renaud'],
    linkedRelationshipIds: ['rel_6645_camille'],
    severity: 'MEDIUM',
    status: 'MONITORED',
    openedDate: '2025-05-14',
    assignedStaff: 'Callum Price',
    summary: 'User actively researching legacy platform migrations and raising queries about deleted accounts in community forums.',
    investigatorNotes: [
      { author: 'Callum Price', date: '2025-05-16', text: 'Camille requested raw audit logs for Correspond 2008 data transfer.' }
    ],
    evidenceItems: ['arch_camille_memo_2008'],
    tags: ['CONVERGENCE_RISK', 'IDENTITY_DRIFT'],
    relatedCaseNumbers: ['EF-TS-2218']
  },
  {
    id: 'ts_case_2045',
    caseNumber: 'EF-TS-2045',
    title: 'Morgan Bell (Data Export Audit & Legal Threat)',
    subjectUserIds: ['usr_morgan_bell'],
    linkedRelationshipIds: ['rel_morgan_talking'],
    severity: 'HIGH',
    status: 'OPEN',
    openedDate: '2026-07-20',
    assignedStaff: 'Jonah Feld',
    summary: 'User discovered relational UUID creation timestamp preceding account registration date and posted findings to Pulse.',
    investigatorNotes: [
      { author: 'Jonah Feld', date: '2026-07-22', text: 'Morgan’s post on Pulse received 95 reactions. Advised moderation team not to delete post to avoid escalating suspicion.' }
    ],
    evidenceItems: [],
    tags: ['CONVERGENCE_RISK', 'FORECAST_CONTAMINATION'],
    relatedCaseNumbers: ['EF-TS-2347']
  },
  {
    id: 'ts_case_2150',
    caseNumber: 'EF-TS-2150',
    title: 'Dev Malik / Priya Nair (Acoustical Resonance Convergence)',
    subjectUserIds: ['usr_dev_malik', 'usr_priya_nair'],
    linkedRelationshipIds: ['rel_5512_dev'],
    severity: 'LOW',
    status: 'CLOSED',
    openedDate: '2025-09-10',
    closedDate: '2025-10-01',
    assignedStaff: 'Marisol Vega',
    summary: 'Standard high-affinity pairing; monitored for stability during cross-city moves.',
    investigatorNotes: [
      { author: 'Marisol Vega', date: '2025-09-12', text: 'Standard progression. No role anomalies detected.' }
    ],
    evidenceItems: [],
    tags: ['PERSISTENT_PAIR'],
    relatedCaseNumbers: []
  },
  {
    id: 'ts_case_2177',
    caseNumber: 'EF-TS-2177',
    title: 'Yuki Tanaka / Rafael Costa (Audio Waveform Inversion)',
    subjectUserIds: ['usr_yuki_tanaka', 'usr_rafael_costa'],
    linkedRelationshipIds: ['rel_rafael_paused'],
    severity: 'LOW',
    status: 'CLOSED',
    openedDate: '2025-12-05',
    closedDate: '2026-01-15',
    assignedStaff: 'Callum Price',
    summary: 'User queried why notification audio contained backward harmonic components.',
    investigatorNotes: [
      { author: 'Callum Price', date: '2025-12-08', text: 'Explained sound synthesis as procedural feature of platform audio engine.' }
    ],
    evidenceItems: [],
    tags: ['IDENTITY_DRIFT'],
    relatedCaseNumbers: []
  },
  {
    id: 'ts_case_2190',
    caseNumber: 'EF-TS-2190',
    title: 'Naomi Serrano (Lighting Matrix Field Test)',
    subjectUserIds: ['usr_naomi_serrano'],
    linkedRelationshipIds: ['rel_9918_naomi'],
    severity: 'LOW',
    status: 'CLOSED',
    openedDate: '2026-01-18',
    closedDate: '2026-02-20',
    assignedStaff: 'Marisol Vega',
    summary: 'User designed ambient lighting presets for Everfold app interface.',
    investigatorNotes: [
      { author: 'Marisol Vega', date: '2026-01-20', text: 'Approved lighting token implementation.' }
    ],
    evidenceItems: [],
    tags: ['PERSISTENT_PAIR'],
    relatedCaseNumbers: []
  },
  {
    id: 'ts_case_2201',
    caseNumber: 'EF-TS-2201',
    title: 'Amina El-Sayed (Neurobiology Data Mining Query)',
    subjectUserIds: ['usr_amina_elsayed'],
    linkedRelationshipIds: ['rel_8821_mina'],
    severity: 'MEDIUM',
    status: 'IN_REVIEW',
    openedDate: '2026-06-12',
    assignedStaff: 'Janelle Wu',
    summary: 'User noted mathematical similarity between Everfold Forecast Markov weights and synaptic plasticity decay functions.',
    investigatorNotes: [
      { author: 'Janelle Wu', date: '2026-06-15', text: 'Amina identified our 12-month attractor equation in the raw diagnostics UI.' }
    ],
    evidenceItems: ['arch_forecast_raw_972'],
    tags: ['FORECAST_CONTAMINATION', 'CONVERGENCE_RISK'],
    relatedCaseNumbers: ['EF-TS-2347']
  }
];
