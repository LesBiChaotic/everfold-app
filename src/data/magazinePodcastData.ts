import { MagazineIssue, PodcastEpisode } from '../types/socialEcosystem';

export const SEEDED_MAGAZINE_ISSUES: MagazineIssue[] = [
  {
    id: 'mag_issue_06',
    number: 6,
    title: 'The Architecture of Returning',
    publishedMonth: 'April 2026',
    theme: 'When people, places, and phrases return after long absence.',
    coverGradient: 'linear-gradient(135deg, #1e293b, #334155)',
    articles: [
      {
        id: 'mag_art_06_1',
        issueNumber: 6,
        title: 'The Familiarity of Strangers',
        dek: 'An essay on somatic recognition, sensory memory, and the feeling of having known someone before.',
        category: 'Essay',
        author: 'Janelle Wu',
        readTimeMinutes: 7,
        contentMarkdown: `### The Somatic Pre-Memory
Have you ever met someone on a rainy street corner and felt an immediate, startling drop in your resting pulse? Not the frantic excitement of a crush, but the heavy, settled calm of returning to a house whose floorboards you have walked ten thousand times.

We often describe this as "chemistry," but behavioral linguists call it *cadence synchronization*. When two people share identical micro-pauses in their sentences, their nervous systems enter a state of reciprocal ease.

In this issue, we explore what it means when an encounter feels less like an introduction and more like a resumption.`,
      },
      {
        id: 'mag_art_06_2',
        issueNumber: 6,
        title: 'Mending What Was Broken in 1904',
        dek: 'A master bookbinder in Boston reflects on wheat paste, peacock endpapers, and second chances.',
        category: 'Interview',
        author: 'Leah Morgan',
        readTimeMinutes: 5,
        contentMarkdown: `### The Craft of Repair
In paper conservation, you never attempt to make a torn leaf look brand new. You use Japanese kozo paper and reversible wheat starch paste so that the repair is structurally sound but honest about having survived.

Love after forty operates on the exact same principle. You do not pretend the prior twenty years of grief and joy never happened. You honor the repair.`,
      },
      {
        id: 'mag_art_06_3',
        issueNumber: 6,
        title: 'The Cartography of Quiet Courtyards',
        dek: 'How urban architecture preserves spaces for unhurried thought.',
        category: 'Architecture',
        author: 'Rafael Alvarez',
        readTimeMinutes: 6,
        contentMarkdown: `### The Threshold of the Archway
When you step off a bustling avenue through a narrow stone archway into a residential courtyard, ambient decibels drop by nearly twenty units within five paces. This architectural decompression mirrors the emotional boundary needed before entering deep conversation.`,
      },
    ],
  },
  {
    id: 'mag_issue_05',
    number: 5,
    title: 'The Low-Acoustic City',
    publishedMonth: 'January 2026',
    theme: 'Designing urban dating rituals for quiet minds.',
    coverGradient: 'linear-gradient(135deg, #0f172a, #1e3a5f)',
    articles: [
      {
        id: 'mag_art_05_1',
        issueNumber: 5,
        title: 'Ten Places in London Where You Can Hear Each Other Breathe',
        dek: 'From hidden crypt tea rooms to quiet canal benches in Little Venice.',
        category: 'Date Blueprint',
        author: 'Camille Moreno',
        readTimeMinutes: 6,
        contentMarkdown: `### A Blueprint for Acoustic Sanctuary
When we mapped the ambient decibel levels of 120 central London cafes and bars, over 85% exceeded 78 dB during evening peak hours. Here is our curated list of 10 low-stimulus sanctuaries where you never have to strain your ears to hear what someone loves.`,
      },
    ],
  },
  {
    id: 'mag_issue_04',
    number: 4,
    title: 'The Unsent Letter',
    publishedMonth: 'October 2025',
    theme: 'Words left in drafts, envelopes never sealed, and quiet catharsis.',
    coverGradient: 'linear-gradient(135deg, #27272a, #3f3f46)',
    articles: [
      { id: 'mag_art_04_1', issueNumber: 4, title: 'Drafts That Saved Our Dignity', dek: 'Why writing without sending is a crucial emotional tool.', category: 'Essay', author: 'Janelle Wu', readTimeMinutes: 5, contentMarkdown: 'Catharsis is the true recipient of private writing.' },
    ],
  },
  {
    id: 'mag_issue_03',
    number: 3,
    title: 'Somatic Pacing & Sensory Quiet',
    publishedMonth: 'July 2025',
    theme: 'The physical nervous system in modern romance.',
    coverGradient: 'linear-gradient(135deg, #1c1917, #292524)',
    articles: [
      { id: 'mag_art_03_1', issueNumber: 3, title: 'Why Eye Contact Is Optional', dek: 'Walking side by side lowers defensive cortisol.', category: 'Science', author: 'Dr. Celia Moreno', readTimeMinutes: 6, contentMarkdown: 'Parallel walking is evolutionary co-regulation.' },
    ],
  },
  {
    id: 'mag_issue_02',
    number: 2,
    title: 'Chosen Family & Expansive Kinship',
    publishedMonth: 'April 2025',
    theme: 'Queer relationship models for the 21st century.',
    coverGradient: 'linear-gradient(135deg, #18181b, #27272a)',
    articles: [
      { id: 'mag_art_02_1', issueNumber: 2, title: 'The Potluck as Sanctuary', dek: 'Building lifelong circles of mutual care.', category: 'Community', author: 'Tessa Ibrahim', readTimeMinutes: 4, contentMarkdown: 'Soup, sourdough, and radical emotional safety.' },
    ],
  },
  {
    id: 'mag_issue_01',
    number: 1,
    title: 'The Manifesto for Slow Dating',
    publishedMonth: 'January 2025',
    theme: 'Why speed is the enemy of depth in human connection.',
    coverGradient: 'linear-gradient(135deg, #09090b, #18181b)',
    articles: [
      { id: 'mag_art_01_1', issueNumber: 1, title: 'Returning to Unhurried Time', dek: 'The founding editorial of Everfold Magazine.', category: 'Manifesto', author: 'Janelle Wu', readTimeMinutes: 6, contentMarkdown: 'We refuse the casino mechanics of infinite swiping.' },
    ],
  },
];

export const SEEDED_PODCAST_EPISODES: PodcastEpisode[] = [
  {
    id: 'pod_ep_10',
    number: 10,
    title: 'Episode 10: The Invariant Meeting',
    subtitle: 'Can two people be mathematically predisposed to find each other in every generation?',
    guest: 'Dr. Nia Banerjee, Former Ethics Advisory Chair',
    durationText: '42 min',
    publishedDate: '2026-03-24',
    summary: 'A deep discussion on algorithmic determinism, platform-induced recurrence, and what happens when an archive remembers what users forget.',
    discussionThreadId: 'thread_pod_10',
    storyTier: 4,
    transcript: [
      {
        speaker: 'Janelle Wu',
        timestamp: '00:01',
        text: 'Welcome to The Space Between, the Everfold podcast. Today we are speaking with Dr. Nia Banerjee about the philosophy of recurrence.',
      },
      {
        speaker: 'Dr. Nia Banerjee',
        timestamp: '02:15',
        text: 'Back in 2017, when we were reviewing the transition from Fold to Everfold, there was a fierce debate. The models were showing that certain relationship vectors were persisting across completely different account registrations.',
      },
      {
        speaker: 'Janelle Wu',
        timestamp: '04:30',
        text: 'Persisting in what sense? Like similar personality archetypes?',
      },
      {
        speaker: 'Dr. Nia Banerjee',
        timestamp: '05:12',
        text: 'No, not just archetypes. The specific linguistic phrasing, the exact dates of planned meetings, the specific book titles exchanged. The platform wasn’t just matching them; it was re-instantiating an invariant container.',
      },
    ],
  },
  {
    id: 'pod_ep_09',
    number: 9,
    title: 'Episode 09: The 25-Minute Voice Letter',
    subtitle: 'How long-distance couples are abandoning instant messaging in favor of audio correspondence.',
    guest: 'Dev & Camille',
    durationText: '34 min',
    publishedDate: '2026-02-12',
    summary: 'Why sending one long voice note while walking on Sunday creates more authentic intimacy than 100 texts throughout the week.',
    discussionThreadId: 'thread_pod_09',
    storyTier: 0,
    transcript: [
      {
        speaker: 'Janelle Wu',
        timestamp: '00:01',
        text: 'Today we have Camille from London and Dev from Dublin talking about their Sunday audio correspondence ritual.',
      },
      {
        speaker: 'Camille',
        timestamp: '01:45',
        text: 'With instant texting, you feel obligated to respond within five minutes, which leads to shallow messages. With voice letters, you record while making tea or walking to the station. You get to hear the rain in the background and the pauses between their thoughts.',
      },
      {
        speaker: 'Dev',
        timestamp: '04:10',
        text: 'It completely changed how I think about listening. You can’t skim an audio letter while doing three other tabs.',
      },
      {
        speaker: 'Janelle Wu',
        timestamp: '06:30',
        text: 'It demands your full presence, which is the greatest gift in digital life.',
      },
    ],
  },
  {
    id: 'pod_ep_08',
    number: 8,
    title: 'Episode 08: Parallel Play & Shared Solitude',
    subtitle: 'Why sitting in silence together is the ultimate intimacy benchmark.',
    guest: 'Callum Price & Dr. Celia Moreno',
    durationText: '38 min',
    publishedDate: '2026-01-20',
    summary: 'Investigating sensory co-regulation and quiet companionship.',
    discussionThreadId: 'thread_pod_08',
    storyTier: 0,
    transcript: [
      { speaker: 'Janelle Wu', timestamp: '00:01', text: 'Welcome to episode 8 on parallel play.' },
      { speaker: 'Callum Price', timestamp: '02:00', text: 'Silence is proof of safety, not awkwardness.' },
      { speaker: 'Dr. Celia Moreno', timestamp: '05:20', text: 'The brain stops performing when true trust exists.' },
      { speaker: 'Janelle Wu', timestamp: '08:00', text: 'A wonderful insight.' },
    ],
  },
  {
    id: 'pod_ep_07',
    number: 7,
    title: 'Episode 07: Loving After Bereavement',
    subtitle: 'Holding grief and romance in the exact same room.',
    guest: 'Tessa Ibrahim',
    durationText: '45 min',
    publishedDate: '2025-12-05',
    summary: 'How to build second love without erasing cherished memory.',
    discussionThreadId: 'thread_pod_07',
    storyTier: 0,
    transcript: [
      { speaker: 'Janelle Wu', timestamp: '00:01', text: 'Welcome Tessa to discuss dating after grief.' },
      { speaker: 'Tessa Ibrahim', timestamp: '03:10', text: 'You do not compete with memory; you expand the room.' },
      { speaker: 'Janelle Wu', timestamp: '06:00', text: 'That metaphor resonates deeply.' },
      { speaker: 'Tessa Ibrahim', timestamp: '09:15', text: 'It frees the new partner from unnecessary insecurity.' },
    ],
  },
  {
    id: 'pod_ep_06',
    number: 6,
    title: 'Episode 06: The 45-Minute First Date Rule',
    subtitle: 'Why shorter first encounters protect nervous systems.',
    guest: 'Jonah Feld',
    durationText: '29 min',
    publishedDate: '2025-10-18',
    summary: 'De-escalating first date anxiety with intentional boundary design.',
    discussionThreadId: 'thread_pod_06',
    storyTier: 0,
    transcript: [
      { speaker: 'Janelle Wu', timestamp: '00:01', text: 'Jonah Feld joins us to discuss date duration.' },
      { speaker: 'Jonah Feld', timestamp: '02:30', text: '45 minutes gives an easy exit or a clean extension.' },
      { speaker: 'Janelle Wu', timestamp: '05:00', text: 'It prevents conversational burnout.' },
      { speaker: 'Jonah Feld', timestamp: '07:30', text: 'Exactly, it leaves you with genuine curiosity.' },
    ],
  },
  {
    id: 'pod_ep_05',
    number: 5,
    title: 'Episode 05: The Geometry of Acoustic Comfort',
    subtitle: 'Why restaurant noise levels ruin chemistry.',
    guest: 'Amina & Rafael Alvarez',
    durationText: '36 min',
    publishedDate: '2025-08-30',
    summary: 'Mapping urban noise sanctuaries and bookstore dates.',
    discussionThreadId: 'thread_pod_05',
    storyTier: 0,
    transcript: [
      { speaker: 'Janelle Wu', timestamp: '00:01', text: 'Today we discuss low-stimulation dating.' },
      { speaker: 'Rafael Alvarez', timestamp: '02:40', text: 'In quiet courtyards, you can actually hear cadence.' },
      { speaker: 'Amina', timestamp: '05:10', text: 'No background bass competing with thoughts.' },
      { speaker: 'Janelle Wu', timestamp: '08:00', text: 'It changes everything.' },
    ],
  },
];
