import { SupportArticle, SupportTicket, StaffProfile } from '../types/socialEcosystem';

export const STAFF_PROFILES: StaffProfile[] = [
  {
    id: 'staff_cmoreno',
    name: 'Dr. Celia Moreno',
    role: 'Chief Science Officer & Head of Relationship Science',
    department: 'Relationship Science',
    bio: 'Behavioral psychologist specializing in longitudinal affinity networks and unhurried relational discovery.',
    avatarSeed: 'celia',
    joinedYear: 2017,
    specialty: 'Longitudinal compatibility models, parallel play, sensory comfort',
    publicArticlesCount: 14,
    storyTier: 0,
  },
  {
    id: 'staff_jfeld',
    name: 'Jonah Feld',
    role: 'Senior Behavioral Research Scientist',
    department: 'Relationship Science',
    bio: 'Investigates communication cadences, texting fatigue, and digital boundaries in early dating.',
    avatarSeed: 'jonah',
    joinedYear: 2019,
    specialty: 'Asynchronous communication, repair rituals',
    publicArticlesCount: 9,
    storyTier: 0,
  },
  {
    id: 'staff_tibrahim',
    name: 'Tessa Ibrahim',
    role: 'Director of Community Safety & Care',
    department: 'Trust & Safety',
    bio: 'Dedicated to empathetic moderation, grief support circles, and trauma-informed platform design.',
    avatarSeed: 'tessa',
    joinedYear: 2020,
    specialty: 'Grief support, non-punitive moderation, identity protection',
    publicArticlesCount: 8,
    storyTier: 0,
  },
  {
    id: 'staff_jwu',
    name: 'Janelle Wu',
    role: 'Editorial Director, Everfold Magazine',
    department: 'Editorial',
    bio: 'Curator of personal essays, cultural criticism, and slow relationship journalism.',
    avatarSeed: 'janelle',
    joinedYear: 2021,
    specialty: 'Essay editing, literary profiles, community storytelling',
    publicArticlesCount: 12,
    storyTier: 0,
  },
  {
    id: 'staff_cprice',
    name: 'Callum Price',
    role: 'Product Accessibility & Systems Architect',
    department: 'Product Engineering',
    bio: 'Ensuring Everfold remains accessible, high-contrast, keyboard-first, and low-stimulation.',
    avatarSeed: 'callum',
    joinedYear: 2018,
    specialty: 'WCAG AAA design, Web Audio synthesis, screen-reader ergonomics',
    publicArticlesCount: 6,
    storyTier: 0,
  },
  {
    id: 'staff_mvega',
    name: 'Marisol Vega',
    role: 'Staff Systems Engineer & Data Governance Lead',
    department: 'Product Engineering',
    bio: 'Oversees schema integrity, platform migrations, and historical database preservation.',
    avatarSeed: 'marisol',
    joinedYear: 2016,
    specialty: 'Database schema lineage, encryption, legacy migration audits',
    publicArticlesCount: 5,
    storyTier: 0,
  },
];

export const SEEDED_SUPPORT_ARTICLES: SupportArticle[] = [
  {
    id: 'help_account_export',
    categoryId: 'data_privacy',
    title: 'How do I download my complete Everfold data archive?',
    summary: 'Step-by-step instructions on generating and exporting your local JSON relational dossier.',
    contentMarkdown: `### Exporting Your Data
Everfold believes you have absolute ownership over your relational records, message transcripts, and date plans.

1. Navigate to **Settings** from the sidebar or bottom drawer.
2. Scroll to the **Data & Archive Management** section.
3. Click **Export My Everfold Data (.JSON)**.
4. Your browser will download a file named \`everfold_user_data_export_[handle].json\`.

### What is included?
- Your complete profile account summary.
- Active match indices and relational telemetry.
- Message thread counts and date planner appointments.
- Procedural story flags and journal logs.`,
    helpfulYesCount: 312,
    helpfulNoCount: 4,
    relatedArticleIds: ['help_memorial_policy', 'help_story_access'],
    storyTier: 0,
  },
  {
    id: 'help_memorial_policy',
    categoryId: 'safety_privacy',
    title: 'How does Everfold handle memorialized profiles?',
    summary: 'Our respectful protocols for preserving accounts after bereavement.',
    contentMarkdown: `### Memorialization Protocol
When a family member or verified contact notifies Everfold of a member's passing, their profile is transitioned into a Memorialized state.

- The profile is removed from Discover search.
- Existing message threads remain accessible to partners.
- Shared Stories authored with partners are preserved.
- Friends and partners can leave quiet messages on the private Memorial Wall.`,
    helpfulYesCount: 189,
    helpfulNoCount: 2,
    relatedArticleIds: ['help_account_export', 'help_ticket_status'],
    storyTier: 0,
  },
  {
    id: 'help_story_access',
    categoryId: 'story_access',
    title: 'What are Story Access & Narrative Controls?',
    summary: 'Explaining the 3 exploration tiers: Spoiler-Free, Lore Preview, and Full Access.',
    contentMarkdown: `### Overview of Story Access
Everfold contains a rich 27-year fictional archive tracing back to 1999. Story Access controls let you decide how you experience this narrative:

1. **Spoiler-Free (Default)**: Normal gating. All secret routes and late-stage profile states unlock strictly through organic investigation.
2. **Lore Preview**: Shows descriptive previews and summaries on locked screens while leaving puzzle gates active.
3. **Full Access**: Directly unlocks all hidden story screens and archive emulators without altering your true game progress.

You can adjust these settings at any time under **Settings > Story Access Controls**.`,
    helpfulYesCount: 420,
    helpfulNoCount: 3,
    relatedArticleIds: ['help_account_export'],
    storyTier: 0,
  },
  {
    id: 'help_legacy_migration_artifact',
    categoryId: 'matching_algorithm',
    title: 'Understanding Relational ID Timestamps & Migration Lineage',
    summary: 'Technical explanation of why certain relationship containers carry historical creation dates.',
    contentMarkdown: `### Schema Continuity Across Platform Generations
During the 2016 migration from Fold (2015) and Correspond (2008) to Everfold Core, certain relational container UUIDs (\`rel_...\`) were preserved to maintain historical integrity.

In rare instances, an active connection may display a container creation timestamp earlier than the participant’s registration date. This occurs when a relationship container is re-instantiated under the Invariant Return Protocol.`,
    helpfulYesCount: 88,
    helpfulNoCount: 12,
    relatedArticleIds: ['help_account_export'],
    storyTier: 5,
    lateSearchKeywords: ['dead profile active', '2018 timestamp', 'relationship uuid mismatch', 'recurrence', 'slot 01'],
  },
  // Additional 41 help articles covering all support categories
  { id: 'help_05', categoryId: 'matching_algorithm', title: 'How does Everfold calculate affinity overlap?', summary: 'Overview of our unhurried compatibility metrics.', contentMarkdown: 'We prioritize shared pace and values over rapid swipe heuristics.', helpfulYesCount: 210, helpfulNoCount: 3, storyTier: 0 },
  { id: 'help_06', categoryId: 'messaging_cadence', title: 'How does asynchronous message pacing work?', summary: 'Why messages do not have real-time read receipts.', contentMarkdown: 'We remove read receipts to relieve social pressure.', helpfulYesCount: 340, helpfulNoCount: 5, storyTier: 0 },
  { id: 'help_07', categoryId: 'safety_privacy', title: 'How do I block or restrict a user quietly?', summary: 'Restorative boundary controls without retaliation.', contentMarkdown: 'Restricting a user hides your profile from their view seamlessly.', helpfulYesCount: 195, helpfulNoCount: 1, storyTier: 0 },
  { id: 'help_08', categoryId: 'date_planner', title: 'How to use the Date Planner coordinates', summary: 'Scheduling quiet dates in shared local spaces.', contentMarkdown: 'Coordinate locations with low acoustic stimulation.', helpfulYesCount: 140, helpfulNoCount: 2, storyTier: 0 },
  { id: 'help_09', categoryId: 'audio_haptics', title: 'Configuring audio cues and sound themes', summary: 'Adjusting procedural Web Audio synthesizer tones.', contentMarkdown: 'Toggle audio feedback under Settings > Appearance & Sound.', helpfulYesCount: 110, helpfulNoCount: 0, storyTier: 0 },
  { id: 'help_10', categoryId: 'data_privacy', title: 'How to permanently delete your account data', summary: 'Our zero-retention deletion guarantee.', contentMarkdown: 'Account deletion scrubs all private database fields within 24 hours.', helpfulYesCount: 230, helpfulNoCount: 6, storyTier: 0 },
  { id: 'help_11', categoryId: 'matching_algorithm', title: 'What is the Relational Pace slider?', summary: 'Tuning how frequently new matches are surfaced.', contentMarkdown: 'Control whether you receive 1 match per week or 3.', helpfulYesCount: 180, helpfulNoCount: 4, storyTier: 0 },
  { id: 'help_12', categoryId: 'messaging_cadence', title: 'What are letter templates in Messaging?', summary: 'Using unhurried writing starters for deep conversation.', contentMarkdown: 'Pre-written prompts to encourage thoughtful longform replies.', helpfulYesCount: 165, helpfulNoCount: 2, storyTier: 0 },
  { id: 'help_13', categoryId: 'safety_privacy', title: 'How does Everfold moderate harassment?', summary: 'Our non-punitive, human-reviewed safety protocols.', contentMarkdown: 'Human moderators review reports with trauma-informed care.', helpfulYesCount: 290, helpfulNoCount: 7, storyTier: 0 },
  { id: 'help_14', categoryId: 'date_planner', title: 'Can I invite an external partner to a Date Plan?', summary: 'Sharing plan links outside the platform.', contentMarkdown: 'Export plans as calendar invites or print-ready itineraries.', helpfulYesCount: 125, helpfulNoCount: 1, storyTier: 0 },
  { id: 'help_15', categoryId: 'audio_haptics', title: 'Enabling high contrast & reduced motion', summary: 'Accessibility settings for low-sensory browsing.', contentMarkdown: 'Enable reduced motion to disable all procedural animations.', helpfulYesCount: 310, helpfulNoCount: 2, storyTier: 0 },
  { id: 'help_16', categoryId: 'data_privacy', title: 'What third-party analytics does Everfold use?', summary: 'Our strict zero-third-party-tracker policy.', contentMarkdown: 'Everfold does not use Google Analytics or Meta tracking pixels.', helpfulYesCount: 415, helpfulNoCount: 1, storyTier: 0 },
  { id: 'help_17', categoryId: 'matching_algorithm', title: 'Why did my Discover queue pause?', summary: 'Understanding the intentional discovery cooldown.', contentMarkdown: 'We pause Discover when you have 3 active meaningful conversations.', helpfulYesCount: 275, helpfulNoCount: 8, storyTier: 0 },
  { id: 'help_18', categoryId: 'messaging_cadence', title: 'Can I schedule messages for tomorrow morning?', summary: 'Sending letters without waking up your match.', contentMarkdown: 'Use scheduled dispatch to deliver messages at 8:00 AM local time.', helpfulYesCount: 198, helpfulNoCount: 3, storyTier: 0 },
  { id: 'help_19', categoryId: 'safety_privacy', title: 'How to verify your profile without government ID', summary: 'Privacy-first vouching and community verification.', contentMarkdown: 'Verification through mutual vouches and video selfie check.', helpfulYesCount: 220, helpfulNoCount: 5, storyTier: 0 },
  { id: 'help_20', categoryId: 'date_planner', title: 'Filtering date ideas by sensory accessibility', summary: 'Finding wheelchair-accessible and low-noise venues.', contentMarkdown: 'Filter by noise level, natural lighting, and step-free access.', helpfulYesCount: 178, helpfulNoCount: 0, storyTier: 0 },
  { id: 'help_21', categoryId: 'audio_haptics', title: 'Customizing keyboard shortcuts', summary: 'Navigating Everfold without a mouse or touch screen.', contentMarkdown: 'Use J/K to browse cards and Enter to inspect details.', helpfulYesCount: 145, helpfulNoCount: 2, storyTier: 0 },
  { id: 'help_22', categoryId: 'data_privacy', title: 'How to export your relationship timeline as a book', summary: 'Printing a physical memory capsule.', contentMarkdown: 'Export formatted PDF manuscripts of your shared milestones.', helpfulYesCount: 260, helpfulNoCount: 4, storyTier: 0 },
  { id: 'help_23', categoryId: 'matching_algorithm', title: 'What is the Sleep Cycle alignment filter?', summary: 'Matching night owls with night owls.', contentMarkdown: 'Filter candidate profiles by waking hours and evening availability.', helpfulYesCount: 190, helpfulNoCount: 3, storyTier: 0 },
  { id: 'help_24', categoryId: 'messaging_cadence', title: 'How to take a mindful messaging sabbatical', summary: 'Pausing conversations politely without ghosting.', contentMarkdown: 'Set an auto-reply status announcing your rest week.', helpfulYesCount: 310, helpfulNoCount: 4, storyTier: 0 },
  { id: 'help_25', categoryId: 'safety_privacy', title: 'Restorative justice and account reinstatement', summary: 'How appeals are reviewed after a community warning.', contentMarkdown: 'Submit a reflection statement for restorative case review.', helpfulYesCount: 160, helpfulNoCount: 6, storyTier: 0 },
  { id: 'help_26', categoryId: 'date_planner', title: 'Low-cost and free date suggestions', summary: 'Curated library of zero-dollar community dates.', contentMarkdown: 'Public library visits, city arboretums, and architectural walks.', helpfulYesCount: 280, helpfulNoCount: 2, storyTier: 0 },
  { id: 'help_27', categoryId: 'audio_haptics', title: 'Adjusting sound volume for hearing aids', summary: 'Optimizing frequencies for assistive hearing devices.', contentMarkdown: 'Fine-tune synth attack and release curves.', helpfulYesCount: 95, helpfulNoCount: 0, storyTier: 0 },
  { id: 'help_28', categoryId: 'data_privacy', title: 'Managing cookie preferences and local storage', summary: 'How your preferences are saved locally on device.', contentMarkdown: 'All settings persist locally in localStorage and sessionStorage.', helpfulYesCount: 130, helpfulNoCount: 1, storyTier: 0 },
  { id: 'help_29', categoryId: 'matching_algorithm', title: 'Can I change my geographic anchor city?', summary: 'Updating your home base without resetting matches.', contentMarkdown: 'Update city in Profile > Edit Coordinates.', helpfulYesCount: 155, helpfulNoCount: 2, storyTier: 0 },
  { id: 'help_30', categoryId: 'messaging_cadence', title: 'What is the Letter Drafts autosave system?', summary: 'Never lose a long message during a network interruption.', contentMarkdown: 'Drafts save to local storage every 5 seconds.', helpfulYesCount: 240, helpfulNoCount: 1, storyTier: 0 },
  { id: 'help_31', categoryId: 'safety_privacy', title: 'How to report fake profiles or commercial spam', summary: 'One-click reporting with expedited triage.', contentMarkdown: 'Flag dispatches directly from the message overflow menu.', helpfulYesCount: 305, helpfulNoCount: 3, storyTier: 0 },
  { id: 'help_32', categoryId: 'date_planner', title: 'Creating custom date checklists', summary: 'Packing lists for picnics and stargazing nights.', contentMarkdown: 'Add custom checklists to any planned date container.', helpfulYesCount: 140, helpfulNoCount: 0, storyTier: 0 },
  { id: 'help_33', categoryId: 'audio_haptics', title: 'Screen reader accessibility guide (NVDA & VoiceOver)', summary: 'Semantic HTML5 landmarks and ARIA live regions.', contentMarkdown: 'Everfold conforms to WCAG 2.1 Level AAA standards.', helpfulYesCount: 215, helpfulNoCount: 0, storyTier: 0 },
  { id: 'help_34', categoryId: 'data_privacy', title: 'Encrypted backup keys for journal entries', summary: 'Securing your private reflections with client keys.', contentMarkdown: 'Private journal entries are encrypted client-side.', helpfulYesCount: 180, helpfulNoCount: 2, storyTier: 0 },
  { id: 'help_35', categoryId: 'matching_algorithm', title: 'How do Solo Quizzes affect match suggestions?', summary: 'How archetype badges influence your Discover feed.', contentMarkdown: 'Quiz results gently weight candidates with complementary pacing.', helpfulYesCount: 320, helpfulNoCount: 4, storyTier: 0 },
  { id: 'help_36', categoryId: 'messaging_cadence', title: 'Voice memo transcription guidelines', summary: 'Generating automated transcripts for audio notes.', contentMarkdown: 'Audio notes automatically include readable text transcripts.', helpfulYesCount: 175, helpfulNoCount: 2, storyTier: 0 },
  { id: 'help_37', categoryId: 'safety_privacy', title: 'Emergency contact sharing for first dates', summary: 'Safe-word alerts and trusted contact check-ins.', contentMarkdown: 'Share an encrypted live date status link with your trusted friend.', helpfulYesCount: 390, helpfulNoCount: 3, storyTier: 0 },
  { id: 'help_38', categoryId: 'date_planner', title: 'Weather contingency planning', summary: 'Automatic indoor venue recommendations for rain.', contentMarkdown: 'Enable weather alerts to swap parks for indoor conservatories.', helpfulYesCount: 160, helpfulNoCount: 1, storyTier: 0 },
  { id: 'help_39', categoryId: 'audio_haptics', title: 'Low battery and low data mode', summary: 'Optimizing performance on older mobile devices.', contentMarkdown: 'Disable canvas rendering to reduce battery consumption.', helpfulYesCount: 145, helpfulNoCount: 1, storyTier: 0 },
  { id: 'help_40', categoryId: 'data_privacy', title: 'Understanding CCPA and GDPR rights on Everfold', summary: 'Complete legal transparency on data rights.', contentMarkdown: 'Full compliance with global data sovereignty laws.', helpfulYesCount: 220, helpfulNoCount: 3, storyTier: 0 },
  { id: 'help_41', categoryId: 'matching_algorithm', title: 'Why did a match disappear from my queue?', summary: 'Explaining mutual unmatching, pauses, and sabbaticals.', contentMarkdown: 'Unmatching clears the container politely without notifications.', helpfulYesCount: 295, helpfulNoCount: 9, storyTier: 0 },
  { id: 'help_42', categoryId: 'messaging_cadence', title: 'Archiving conversations without deleting them', summary: 'Organizing your active mailbox for clarity.', contentMarkdown: 'Archive threads to keep your main inbox calm.', helpfulYesCount: 190, helpfulNoCount: 1, storyTier: 0 },
  { id: 'help_43', categoryId: 'safety_privacy', title: 'Community Guidelines: Unhurried Etiquette', summary: 'Our expectations for respectful, thoughtful communication.', contentMarkdown: 'Treat every member as a whole human with a complex interior life.', helpfulYesCount: 480, helpfulNoCount: 2, storyTier: 0 },
  { id: 'help_44', categoryId: 'date_planner', title: 'Neighborhood coffee guides by city', summary: 'Independent roasters and quiet cafe lists.', contentMarkdown: 'Curated by local community room moderators.', helpfulYesCount: 260, helpfulNoCount: 2, storyTier: 0 },
  { id: 'help_45', categoryId: 'data_privacy', title: 'Submitting an official Data Subject Request (DSR)', summary: 'Direct channel to our Data Protection Officer.', contentMarkdown: 'Email privacy@everfold.org or file a Support Ticket under Privacy.', helpfulYesCount: 135, helpfulNoCount: 1, storyTier: 0 },
];

export const SEEDED_SUPPORT_TICKETS: SupportTicket[] = [
  {
    id: 'tkt_8841',
    ticketNumber: 'TS-8841',
    category: 'Continuity Issue',
    subject: 'Match timestamp predates account creation date by 8 years',
    description: 'I downloaded my JSON export. My relationship record with @rafa_books is dated April 14, 2018, but I only created my account in February 2026. Is this a database corruption issue?',
    status: 'Escalated',
    createdAt: '2026-04-03T11:20:00Z',
    updatedAt: '2026-04-03T15:40:00Z',
    reclassifiedToContinuity: true,
    replies: [
      {
        id: 'rep_1',
        authorName: 'Everfold Support Bot',
        authorRole: 'Automated Triaging',
        isStaff: true,
        timestamp: '2026-04-03T11:21:00Z',
        body: 'Thank you for contacting Everfold Support. Your ticket has been logged under Technical / Data Export. A specialist is reviewing your inquiry.',
      },
      {
        id: 'rep_2',
        authorName: 'Marisol Vega',
        authorRole: 'Staff Systems Engineer',
        isStaff: true,
        timestamp: '2026-04-03T15:40:00Z',
        body: 'Hello Leah. We have reviewed your account export. The timestamp in question reflects a preserved relational slot from our 2018 lineage partition. This is not database corruption. The container rel_2347 was intentionally preserved under Pattern Integrity protocol. We are escalating this to Dr. Moreno.',
      },
    ],
    internalNotes: [
      {
        id: 'inote_1',
        staffName: 'Marisol Vega',
        timestamp: '2026-04-03T15:38:00Z',
        note: 'Reclassified ticket from [Technical/Bug] to [Continuity Issue/Pattern Integrity]. Matched container rel_2347 matches Meredith Cole / Samuel Reed 2003 session node. Participant B slot was re-allocated to Rafael Alvarez in 2024 with 99.8% continuity confidence.',
        classification: 'Pattern Integrity — Invariant Return (Level 4)',
        linkedCaseId: 'CASE-2026-0814-RETURN',
      },
    ],
  },
  {
    id: 'tkt_4102',
    ticketNumber: 'TS-4102',
    category: 'Matching',
    subject: 'Adjusting geographic discovery radius for train commutes',
    description: 'Can I set my discovery filters to include neighborhoods along the commuter rail line rather than a simple circular radius?',
    status: 'Resolved',
    createdAt: '2026-03-10T09:00:00Z',
    updatedAt: '2026-03-10T14:30:00Z',
    replies: [
      {
        id: 'rep_3',
        authorName: 'Callum Price',
        authorRole: 'Product Engineering',
        isStaff: true,
        timestamp: '2026-03-10T14:30:00Z',
        body: 'Hi there! Yes, you can enable Transit Corridor Discovery under Discover > Filters > Commute Corridors. This will include stations along your specified transit line regardless of straight-line distance.',
      },
    ],
  },
];
