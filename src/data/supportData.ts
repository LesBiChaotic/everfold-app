import { SupportArticle, SupportTicket, StaffProfile } from '../types/socialEcosystem';

export const STAFF_PROFILES: StaffProfile[] = [
  {
    id: 'staff_cmoreno',
    name: 'Dr. Celia Moreno',
    role: 'Chief Science Officer & Head of Relationship Science',
    department: 'Relationship Science',
    bio: 'Behavioral psychologist specializing in longitudinal affinity networks, unhurried relational discovery, and autonomic nervous system co-regulation in dating.',
    avatarSeed: 'celia',
    joinedYear: 2017,
    specialty: 'Longitudinal compatibility models, parallel play, sensory comfort, cadence matching',
    publicArticlesCount: 14,
    storyTier: 0,
  },
  {
    id: 'staff_jfeld',
    name: 'Jonah Feld',
    role: 'Senior Behavioral Research Scientist',
    department: 'Relationship Science',
    bio: 'Investigates communication cadences, digital messaging fatigue, cognitive load in instant communication, and repair rituals in early dating.',
    avatarSeed: 'jonah',
    joinedYear: 2019,
    specialty: 'Asynchronous communication, message pacing, sleep cycle alignment',
    publicArticlesCount: 9,
    storyTier: 0,
  },
  {
    id: 'staff_tibrahim',
    name: 'Tessa Ibrahim',
    role: 'Director of Community Safety & Care',
    department: 'Trust & Safety',
    bio: 'Dedicated to trauma-informed moderation, restorative boundary mediation, grief support circles, and expansive queer kinship protection.',
    avatarSeed: 'tessa',
    joinedYear: 2020,
    specialty: 'Grief support, non-punitive moderation, identity protection, chosen family dynamics',
    publicArticlesCount: 8,
    storyTier: 0,
  },
  {
    id: 'staff_jwu',
    name: 'Janelle Wu',
    role: 'Editorial Director, Everfold Magazine',
    department: 'Editorial',
    bio: 'Curator of personal essays, cultural criticism, and slow relationship journalism. Host of The Space Between podcast.',
    avatarSeed: 'janelle',
    joinedYear: 2021,
    specialty: 'Essay editing, literary profiles, audio correspondence, archival research',
    publicArticlesCount: 12,
    storyTier: 0,
  },
  {
    id: 'staff_cprice',
    name: 'Callum Price',
    role: 'Product Accessibility & Systems Architect',
    department: 'Product Engineering',
    bio: 'Ensuring Everfold remains accessible, high-contrast, keyboard-first, screen-reader ergonomic, and low-stimulation for all neurotypes.',
    avatarSeed: 'callum',
    joinedYear: 2018,
    specialty: 'WCAG AAA design, Web Audio procedural synthesis, sensory pacing, low-battery optimization',
    publicArticlesCount: 6,
    storyTier: 0,
  },
  {
    id: 'staff_mvega',
    name: 'Marisol Vega',
    role: 'Staff Systems Engineer & Data Governance Lead',
    department: 'Product Engineering',
    bio: 'Oversees schema integrity, platform migrations, database lineage preservation, and zero-retention encryption architecture.',
    avatarSeed: 'marisol',
    joinedYear: 2016,
    specialty: 'Database schema lineage, client-side encryption, legacy migration audits',
    publicArticlesCount: 5,
    storyTier: 0,
  },
];

export const SEEDED_SUPPORT_ARTICLES: SupportArticle[] = [
  {
    id: 'help_account_export',
    categoryId: 'data_privacy',
    title: 'How do I download my complete Everfold data archive?',
    summary: 'Step-by-step instructions on generating and exporting your local JSON relational dossier and message history.',
    contentMarkdown: `### Your Data Belongs to You
Everfold operates on a principle of absolute user data sovereignty. You have complete ownership over your relational records, date plans, journal entries, and communication archives.

### How to Export Your Data:
1. Open the left navigation sidebar (or tap the bottom menu on mobile) and select **Settings**.
2. Scroll down to the **Data & Archive Management** section.
3. Click the button labeled **Export My Everfold Data (.JSON)**.
4. Your browser will immediately generate and download a file titled \`everfold_user_data_export_[handle].json\`.

### What Is Included in the Export?
- **Profile Configuration**: Bio, lifestyle parameters, and visual avatar tokens.
- **Match Dossier**: Active match indices, relational pace settings, and date planner appointments.
- **Message Archives**: Full text transcripts of all active and archived letter correspondence.
- **Procedural Metrics**: Solo quiz archetype scores and completed journal logs.

Your export file is formatted in clean, human-readable JSON so you can inspect, back up, or import it into your own private knowledge systems.`,
    helpfulYesCount: 312,
    helpfulNoCount: 4,
    relatedArticleIds: ['help_memorial_policy', 'help_story_access'],
    storyTier: 0,
  },
  {
    id: 'help_memorial_policy',
    categoryId: 'safety_privacy',
    title: 'How Memorialized Accounts Work on Everfold',
    summary: 'Our compassionate protocol for honoring deceased members and protecting shared relational containers.',
    contentMarkdown: `### Preserving Dignity in Bereavement
When a member passes away, their digital presence should be treated with tenderness, privacy, and solemn respect—not erased as a database error or monetized as ghost engagement.

### Memorialization Procedures:
- A verified family member, partner, or trusted contact can request memorialization via our dedicated Care Team at \`care@everfold.org\`.
- Once verified, the account is placed in **Memorial Stasis**.
- The profile remains visible to existing confirmed connections with a quiet, dignified leaf icon and a custom remembrance note.
- The account is permanently removed from all public Discover queues and recommendation algorithms.
- Message threads with active partners remain permanently readable as private memory archives.`,
    helpfulYesCount: 284,
    helpfulNoCount: 2,
    relatedArticleIds: ['help_account_export'],
    storyTier: 0,
  },
  {
    id: 'help_story_access',
    categoryId: 'story_access',
    title: 'What are Story Access & Narrative Controls?',
    summary: 'Explaining the 3 exploration tiers: Spoiler-Free, Lore Preview, and Full Access.',
    contentMarkdown: `### Overview of Story Access
Everfold contains a rich 27-year fictional archive tracing back to 1999. Story Access controls let you decide how you experience this narrative:

1. **Spoiler-Free (Default)**: Normal gating. All secret routes and late-stage profile states unlock strictly through organic investigation and puzzle discovery.
2. **Lore Preview**: Shows descriptive previews and summaries on locked screens while leaving puzzle gates active for those who enjoy the journey.
3. **Full Access**: Directly unlocks all hidden story screens, archive emulators, and restricted documentation without altering your true game progress.

You can adjust these settings at any time under **Settings > Story Access Controls**.`,
    helpfulYesCount: 420,
    helpfulNoCount: 3,
    relatedArticleIds: ['help_account_export'],
    storyTier: 0,
  },
  {
    id: 'help_matching_algorithm_pace',
    categoryId: 'matching_algorithm',
    title: 'How Everfold Calculates Affinity Overlap Without Swiping',
    summary: 'An explanation of our unhurried compatibility metrics, cognitive cadence matching, and discovery limits.',
    contentMarkdown: `### The End of the Endless Feed
Standard dating apps use slot-machine variable reward mechanics to keep users swiping endlessly. Everfold deliberately removes the swipe queue in favor of **deliberate batch discovery**.

### Core Affinity Factors:
1. **Cognitive Cadence**: Aligning daily message speeds (e.g., once-daily letter writers are paired with once-daily letter writers).
2. **Sensory & Stimulus Preferences**: Matching low-stimulation date preferences and noise sensitivities.
3. **Sleep & Schedule Symmetry**: Ensuring night owls and shift workers find compatible chronological partners.
4. **Relational Intent**: Filtering by pace—whether you seek slow conversational friendship or unhurried romantic exploration.`,
    helpfulYesCount: 210,
    helpfulNoCount: 3,
    storyTier: 0,
  },
  {
    id: 'help_messaging_no_read_receipts',
    categoryId: 'messaging_cadence',
    title: 'Why Everfold Does Not Use Real-Time Read Receipts',
    summary: 'Why we intentionally omitted blue checkmarks, typing bubbles, and "last seen" timestamps to protect mental peace.',
    contentMarkdown: `### The Anxiety of the Blue Checkmark
Real-time messaging indicators create artificial relational urgency. Seeing that someone "read" your message at 2:15 PM creates immediate social pressure to respond or anxious speculation about why they haven't.

### The Asynchronous Sanctuary:
- Messages in Everfold are treated as digital correspondence, like sealed letters.
- There are no read receipts, no typing indicators, and no online status dots.
- You can read a thoughtful message in the afternoon, reflect on it during your evening walk, and write your reply the next morning without guilt.`,
    helpfulYesCount: 340,
    helpfulNoCount: 5,
    storyTier: 0,
  },
  {
    id: 'help_quiet_blocking',
    categoryId: 'safety_privacy',
    title: 'How to Block or Restrict a User Quietly',
    summary: 'Restorative boundary controls that protect your peace without triggering retaliation.',
    contentMarkdown: `### Gentle Boundaries Without Escalation
When you restrict or block another user on Everfold:
- Your profile simply disappears from their Discover feed and active message list as if your account were paused.
- No notification, warning banner, or rejection alert is ever sent to the other user.
- Any future dispatches from them are silently discarded by our routing layer.
- If you feel unsafe, you can also submit a report directly to our human Care Facilitators.`,
    helpfulYesCount: 195,
    helpfulNoCount: 1,
    storyTier: 0,
  },
  {
    id: 'help_date_planner_usage',
    categoryId: 'date_planner',
    title: 'How to Use Date Planner Coordinates & Itineraries',
    summary: 'Scheduling low-pressure dates in quiet local spaces with acoustic ratings and weather fallbacks.',
    contentMarkdown: `### Designing a Low-Pressure Date
The Date Planner allows matches to co-create a meeting plan with zero guesswork.

1. Open a match conversation and select **Plan a Date** from the header.
2. Choose from our curated catalog of low-stimulation venues (e.g., botanical gardens, quiet tea rooms, independent bookstores).
3. Select an agreed time and toggle the **Weather Backup Plan** to automatically assign a cozy indoor alternative if rain is forecast.
4. Both participants receive a clean calendar export with directions and quiet hours notes.`,
    helpfulYesCount: 140,
    helpfulNoCount: 2,
    storyTier: 0,
  },
  {
    id: 'help_sound_and_accessibility',
    categoryId: 'audio_haptics',
    title: 'Configuring Web Audio Cues, Contrast, and Reduced Motion',
    summary: 'Customizing sound synthesis tones and visual comfort parameters.',
    contentMarkdown: `### Built for Every Nervous System
Everfold includes full sensory customization under **Settings > Appearance & Accessibility**:
- **Procedural Audio Synthesis**: Gentle, harmonious sine-wave tones for saves and messages (toggleable on/off).
- **Reduced Motion**: Disables all transitions and transforms for those sensitive to vestibular motion.
- **High-Contrast Theme**: Meets WCAG AAA 7:1 contrast ratios for maximum legibility.
- **Dyslexia-Friendly & Custom Fonts**: Switch system typography to open, highly legible letterforms.`,
    helpfulYesCount: 310,
    helpfulNoCount: 2,
    storyTier: 0,
  },
];

export const SEEDED_SUPPORT_TICKETS: SupportTicket[] = [
  {
    id: 'tkt_8841',
    ticketNumber: 'TS-8841',
    category: 'Continuity Issue',
    subject: 'Match date timestamp appears earlier than my account registration',
    description: 'I noticed in my relationship timeline that the container creation date says October 2017, but I only registered in late 2024. Is this a database glitch?',
    status: 'Reviewing',
    createdAt: '2026-03-02T14:15:00Z',
    updatedAt: '2026-03-04T10:30:00Z',
    replies: [
      {
        id: 'rep_8841_1',
        authorName: 'Rafael Alvarez',
        authorRole: 'Member',
        isStaff: false,
        timestamp: '2026-03-02T14:15:00Z',
        body: 'Hello Support team, I noticed something strange in my relationship timeline with Leah (rel_2347). The system displays a container creation date of October 2017. However, I only registered on Everfold in late 2024. Is this a database timestamp glitch from a server migration?',
      },
      {
        id: 'rep_8841_2',
        authorName: 'Marisol Vega',
        authorRole: 'Staff Systems Engineer',
        isStaff: true,
        timestamp: '2026-03-03T09:40:00Z',
        body: 'Hi Rafael, thank you for reaching out. In our 2016-2017 architecture overhaul, relationship container UUIDs were designed with persistent lineage keys to preserve longitudinal research integrity. When candidate Leah was re-allocated following bereavement stasis, the historical container was re-instantiated. Your profile was assigned to slot B of rel_2347. The 2017 timestamp reflects the container origin, not your personal registration date. Everything is functioning within platform invariants.',
      },
      {
        id: 'rep_8841_3',
        authorName: 'Rafael Alvarez',
        authorRole: 'Member',
        isStaff: false,
        timestamp: '2026-03-03T16:20:00Z',
        body: 'Thank you Marisol. That makes sense from a database perspective, though it was slightly eerie to see 2017 listed above my name! Appreciate the clear explanation.',
      },
    ],
    internalNotes: [
      {
        id: 'in_8841_1',
        staffName: 'Marisol Vega',
        timestamp: '2026-03-03T09:35:00Z',
        note: 'Relationship record rel_2347 verified under Invariant Return Policy. Participant B re-allocation logged cleanly. No telemetry corruption detected.',
        classification: 'Invariant Lineage Audit',
      },
    ],
    storyTier: 4,
  },
  {
    id: 'tkt_8842',
    ticketNumber: 'TS-8842',
    category: 'Privacy',
    subject: 'Request to verify memorial stasis settings for saved conversation',
    description: 'Confirming that memorialized correspondence with my deceased partner is encrypted and excluded from public indexing.',
    status: 'Resolved',
    createdAt: '2026-02-20T11:00:00Z',
    updatedAt: '2026-02-21T15:00:00Z',
    replies: [
      {
        id: 'rep_8842_1',
        authorName: 'Leah Vance',
        authorRole: 'Member',
        isStaff: false,
        timestamp: '2026-02-20T11:00:00Z',
        body: 'Hello Tessa, I wanted to confirm that the memorial archive of my correspondence with Samuel (memorialized 2019) is completely private and excluded from any public search or training models. Thank you for your care.',
      },
      {
        id: 'rep_8842_2',
        authorName: 'Tessa Ibrahim',
        authorRole: 'Director of Community Safety & Care',
        isStaff: true,
        timestamp: '2026-02-21T14:30:00Z',
        body: 'Dear Leah, I can confirm with 100% certainty that your archive with Samuel is strictly encrypted under your private client key. It is completely isolated from all public discovery, platform indexing, and external research. Your memories are sacred and inviolable.',
      },
    ],
    internalNotes: [
      {
        id: 'in_8842_1',
        staffName: 'Tessa Ibrahim',
        timestamp: '2026-02-21T14:25:00Z',
        note: 'Client key verification passed. Memorial container encrypted and sealed.',
        classification: 'Memorial Audit',
      },
    ],
    storyTier: 0,
  },
  {
    id: 'tkt_8843',
    ticketNumber: 'TS-8843',
    category: 'Technical',
    subject: 'High-contrast mode color palette suggestion for OLED screens',
    description: 'Suggesting a minor border opacity adjustment on pure black backgrounds to eliminate scroll smearing.',
    status: 'Resolved',
    createdAt: '2026-02-14T09:30:00Z',
    updatedAt: '2026-02-16T11:20:00Z',
    replies: [
      {
        id: 'rep_8843_1',
        authorName: 'Dev',
        authorRole: 'Member',
        isStaff: false,
        timestamp: '2026-02-14T09:30:00Z',
        body: 'Hi team, on pure black OLED backgrounds, the slate-400 borders have a slight smearing effect when scrolling quickly. Could we increase border opacity slightly to 15%?',
      },
      {
        id: 'rep_8843_2',
        authorName: 'Callum Price',
        authorRole: 'Product Accessibility Lead',
        isStaff: true,
        timestamp: '2026-02-15T10:00:00Z',
        body: 'Great catch Dev! We just pushed a patch to tokens.css adjusting --border-subtle to use an alpha-corrected tone that eliminates OLED pixel smear. Let us know if the updated build feels smoother on your device.',
      },
    ],
    internalNotes: [
      {
        id: 'in_8843_1',
        staffName: 'Callum Price',
        timestamp: '2026-02-15T09:55:00Z',
        note: 'Tokens.css updated and deployed in release v1.4.2.',
        classification: 'Accessibility Bugfix',
      },
    ],
    storyTier: 0,
  },
];
