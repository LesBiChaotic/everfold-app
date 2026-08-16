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
        title: 'The Familiarity of Strangers: On Somatic Pre-Memory',
        dek: 'An essay on cadence synchronization, sensory memory, and the startling feeling of resuming a conversation begun decades ago.',
        category: 'Essay',
        author: 'Janelle Wu',
        readTimeMinutes: 8,
        contentMarkdown: `### The Somatic Pre-Memory
Have you ever met someone on a rain-slicked street corner and felt an immediate, startling drop in your resting heart rate? Not the frantic, adrenaline-laced flutter of a crush, but the heavy, settled calm of returning to a house whose floorboards you have walked ten thousand times.

We often describe this phenomenon as "chemistry," but behavioral linguists call it *cadence synchronization*. When two people share identical micro-pauses in their sentences, their autonomic nervous systems enter a state of reciprocal co-regulation. You are not performing; you are resting in each other’s acoustic frequency.

### The Archive of Shared Phrases
In our archival research at Everfold, we frequently observe recurring linguistic motifs across long-separated couples: the exact same metaphor used to describe evening light, an identical preference for tea steeped in cast-iron kettles, or a shared habit of pausing before crossing a threshold.

Whether one understands this as statistical resonance, shared cultural memory, or something more enigmatic, the experience remains singular: an encounter that feels less like an introduction and more like a gentle resumption.`,
      },
      {
        id: 'mag_art_06_2',
        issueNumber: 6,
        title: 'Mending What Was Broken in 1904: An Interview with Leah Vance',
        dek: 'A master book conservator in Boston reflects on Japanese kozo paper, reversible wheat starch paste, and second love after grief.',
        category: 'Interview',
        author: 'Janelle Wu',
        readTimeMinutes: 7,
        contentMarkdown: `### The Interview

**Janelle Wu**: Leah, in paper conservation, what is the golden rule of repairing a torn manuscript?

**Leah Vance**: The first rule is reversibility. You never use permanent synthetic glues that can never be undone. You use pure wheat starch paste and lightweight Japanese kozo mulberry fibers. The repair must be structurally sound, but completely honest about having survived damage. If someone inspects the leaf under raking light a century from now, they should see the repair clearly and understand that the book was loved enough to be mended.

**Janelle Wu**: How does that craft inform how you approached dating after losing Samuel?

**Leah Vance**: When you experience profound bereavement, people often expect you to present yourself as a clean, unblemished page. They want you to pretend the grief never happened. But with Rafael, we treated our pasts like historical bindings. We did not try to erase our previous chapters; we laid down reversible paste and let the joints settle.

**Janelle Wu**: What is one small detail from your daily routine with Rafael that represents that repair?

**Leah Vance**: Our drafting desks sit back-to-back under the north skylight. We can work for four hours in absolute silence, hearing only the whisper of bone folders and pencils. True intimacy is not having to entertain someone to prove you value their presence.`,
      },
      {
        id: 'mag_art_06_3',
        issueNumber: 6,
        title: 'The Cartography of Quiet Courtyards: A Decibel Survey of Boston',
        dek: 'How urban architecture preserves acoustic sanctuaries for unhurried thought and deep conversation.',
        category: 'Architecture',
        author: 'Rafael Alvarez',
        readTimeMinutes: 6,
        contentMarkdown: `### The Threshold of the Archway
When you step off a bustling commercial avenue through a narrow brick archway into a residential courtyard, ambient decibels drop by nearly twenty-two units within five paces. 

This acoustic decompression mirrors the emotional threshold required before genuine conversation can occur. In this survey, we map nine public courtyards, cloistered gardens, and hidden library atriums in Boston and Cambridge where ambient noise levels consistently stay below 52 dB.`,
      },
      {
        id: 'mag_art_06_4',
        issueNumber: 6,
        title: 'Data Insight: The 90-Day Resonance Curve',
        dek: 'Everfold behavioral research reveals why matches who exchange fewer than three messages per day report 40% higher long-term satisfaction.',
        category: 'Data Science',
        author: 'Dr. Celia Moreno',
        readTimeMinutes: 5,
        contentMarkdown: `### The Velocity Inversion
Our analysis of 14,000 completed relationship lifecycles reveals a counter-intuitive principle: **high message velocity in week one correlates negatively with relationship durability at month six**.

Pairs who engage in "burst correspondence" (one or two thoughtful paragraphs every 24 hours) demonstrate significantly higher emotional stability, lower cognitive fatigue, and a 40% higher rate of transitioning into durable partnership or chosen friendship.`,
      },
    ],
  },
  {
    id: 'mag_issue_05',
    number: 5,
    title: 'The Low-Acoustic City',
    publishedMonth: 'January 2026',
    theme: 'Designing urban dating rituals for quiet minds and sensitive nervous systems.',
    coverGradient: 'linear-gradient(135deg, #0f172a, #1e3a5f)',
    articles: [
      {
        id: 'mag_art_05_1',
        issueNumber: 5,
        title: 'Ten Places in London Where You Can Hear Each Other Breathe',
        dek: 'From hidden crypt tearooms in Holborn to quiet canal benches in Little Venice.',
        category: 'Date Blueprint',
        author: 'Camille Moreno',
        readTimeMinutes: 6,
        contentMarkdown: `### A Blueprint for Acoustic Sanctuary
When our editorial team mapped the ambient sound levels of 120 central London cafes and cocktail lounges, over 85% exceeded 78 dB during evening peak hours. 

Here is our curated guide to 10 low-stimulus sanctuaries where you never have to strain your vocal cords to hear what someone loves.`,
      },
      {
        id: 'mag_art_05_2',
        issueNumber: 5,
        title: 'The Sensory Geography of First Dates',
        dek: 'How room temperature, seating angle, and lighting influence autonomic safety.',
        category: 'Data Science',
        author: 'Jonah Feld',
        readTimeMinutes: 5,
        contentMarkdown: `### Seating Geometry and Cortisol
Sitting directly opposite someone across a narrow table triggers predatory focus in the visual cortex. Angling chairs at 90 degrees or sitting side-by-side on a banquette reduces ocular tension by 35%, allowing both participants to look into open space while speaking.`,
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
      {
        id: 'mag_art_04_1',
        issueNumber: 4,
        title: 'Drafts That Saved Our Dignity: The Value of Unsent Correspondence',
        dek: 'Why writing down everything you feel without pressing send is a crucial emotional tool.',
        category: 'Essay',
        author: 'Janelle Wu',
        readTimeMinutes: 5,
        contentMarkdown: `### The Catharsis of the Draft
The human impulse to send an emotional essay at 2 AM is driven by the desire to expel pain from the chest. But the true recipient of that writing is not the other person—it is yourself. 

Writing the unsent letter externalizes the grief, clarifies the boundary, and preserves your dignity.`,
      },
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
      {
        id: 'mag_art_03_1',
        issueNumber: 3,
        title: 'Why Eye Contact Is Optional: Walking Side by Side',
        dek: 'Walking side by side lowers defensive cortisol and promotes unhurried reflection.',
        category: 'Science',
        author: 'Dr. Celia Moreno',
        readTimeMinutes: 6,
        contentMarkdown: `### Evolutionary Co-Regulation
When humans walk together in the same direction, the brain registers mutual forward momentum. Vision shifts to panoramic mode, reducing focal stress and allowing emotional truths to be spoken without defensive guarding.`,
      },
    ],
  },
  {
    id: 'mag_issue_02',
    number: 2,
    title: 'Chosen Family & Expansive Kinship',
    publishedMonth: 'April 2025',
    theme: 'Platonic co-housing, chosen elders, and expansive relational security.',
    coverGradient: 'linear-gradient(135deg, #1e1b4b, #312e81)',
    articles: [
      {
        id: 'mag_art_02_1',
        issueNumber: 2,
        title: 'The Web of Support: Lessons from Queer Domestic History',
        dek: 'Why resilient lives are anchored in distributed networks of care.',
        category: 'Essay',
        author: 'Tessa Ibrahim',
        readTimeMinutes: 6,
        contentMarkdown: `### Distributed Security
When romantic love is woven into a wider tapestry of deep chosen friendships, breakups lose their catastrophic isolation, and partnerships thrive without the impossible pressure to be everything.`,
      },
    ],
  },
  {
    id: 'mag_issue_01',
    number: 1,
    title: 'Timing, Synchrony & Second Chances',
    publishedMonth: 'January 2025',
    theme: 'The inaugural issue on unhurried romance and the philosophy of Everfold.',
    coverGradient: 'linear-gradient(135deg, #18181b, #27272a)',
    articles: [
      {
        id: 'mag_art_01_1',
        issueNumber: 1,
        title: 'The Manifesto for Slow Dating',
        dek: 'Why we built an app that actively discourages endless swiping and instant gratification.',
        category: 'Manifesto',
        author: 'Dr. Celia Moreno',
        readTimeMinutes: 7,
        contentMarkdown: `### Speed Is the Enemy of Depth
When human beings are reduced to rapid trading cards, empathy is the first casualty. Everfold was created to restore the human pace of discovery: deliberate matching, sensory comfort, and respect for memory.`,
      },
    ],
  },
];

export const SEEDED_PODCAST_EPISODES: PodcastEpisode[] = [
  {
    id: 'pod_ep_10',
    number: 10,
    title: 'Episode 10: The Invariant Meeting & Algorithmic Recurrence',
    subtitle: 'Can two people be mathematically predisposed to find each other across different generations?',
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
        text: 'Welcome to The Space Between, the official Everfold podcast. I am your host, Janelle Wu. Today we are joined by Dr. Nia Banerjee, who served as the chair of our Ethics Advisory Committee during the platform migration from Fold in 2017. Nia, welcome.',
      },
      {
        speaker: 'Dr. Nia Banerjee',
        timestamp: '01:15',
        text: 'Thank you, Janelle. It is always slightly uncanny returning to these archives.',
      },
      {
        speaker: 'Janelle Wu',
        timestamp: '02:00',
        text: 'Let us dive straight into what you documented in the 2017 Internal Ethics Audit. You noted that certain relational telemetry vectors seemed to persist across completely independent account registrations. What did that look like in practice?',
      },
      {
        speaker: 'Dr. Nia Banerjee',
        timestamp: '03:45',
        text: 'In standard statistical modeling, if two people match in 2008 and their connection dissolves, you expect random distribution when one of them registers a new profile years later. But what we observed in the database lineage was not random. We saw identical phrasing in message drafts, identical dates chosen for first meetings, and the exact same third-party venues being selected across decades.',
      },
      {
        speaker: 'Janelle Wu',
        timestamp: '06:10',
        text: 'Some engineers argued that this was just behavioral clustering—that people with similar aesthetic tastes naturally choose the same botanical gardens or independent coffee shops.',
      },
      {
        speaker: 'Dr. Nia Banerjee',
        timestamp: '07:30',
        text: 'That explains the venue, yes. But it does not explain why an account registered in 2024 would use a phrase like "the joints were allowed to settle before the weight was placed upon them," which was verbatim in a 1999 Pairwise guestbook entry written by a completely different individual. The system wasn’t just matching them; it was maintaining an invariant container.',
      },
      {
        speaker: 'Janelle Wu',
        timestamp: '11:20',
        text: 'That leads to the profound question of autonomy: are we choosing our partners, or are we stepping into pre-existing relational architecture?',
      },
    ],
  },
  {
    id: 'pod_ep_09',
    number: 9,
    title: 'Episode 09: The 25-Minute Voice Letter Ritual',
    subtitle: 'How long-distance couples are abandoning instant messaging in favor of unhurried audio correspondence.',
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
        text: 'Today on The Space Between, we are joined by Camille in London and Dev in Dublin. They have been together for eighteen months and have an extraordinary rule: zero daily text messaging. Instead, they send one 25-minute voice letter every Sunday. Camille, how did this start?',
      },
      {
        speaker: 'Camille',
        timestamp: '01:20',
        text: 'It started out of pure burnout. We were both working sixty hours a week and our texts were becoming hollow: "Hope work is good", "Heading home", "Tired". It felt like administrative check-ins. So we decided: let us stop texting completely. On Sunday afternoons, I put on my coat, walk along the Regent’s Canal with my earphones, and just talk to Dev for twenty-five minutes about what I saw, what I thought about, and what made me laugh.',
      },
      {
        speaker: 'Dev',
        timestamp: '04:15',
        text: 'When I get that file in Dublin on Sunday evening, I make a pot of tea, turn off all screens, and listen. You get to hear the rain in London, the sound of her footsteps, the pauses where she gathers her thoughts. You can’t multitask while listening to someone’s voice letter. It requires your entire presence.',
      },
    ],
  },
  {
    id: 'pod_ep_08',
    number: 8,
    title: 'Episode 08: Parallel Play & Shared Solitude',
    subtitle: 'Why sitting in silence together is the ultimate intimacy benchmark for introverts.',
    guest: 'Callum Price & Dr. Celia Moreno',
    durationText: '38 min',
    publishedDate: '2026-01-20',
    summary: 'Investigating sensory co-regulation, low-stimulation dating, and quiet companionship.',
    discussionThreadId: 'thread_pod_08',
    storyTier: 0,
    transcript: [
      {
        speaker: 'Janelle Wu',
        timestamp: '00:01',
        text: 'Welcome back. Today we have Dr. Celia Moreno and product designer Callum Price discussing parallel play—why the best date of your life might involve saying fewer than twenty words.',
      },
      {
        speaker: 'Dr. Celia Moreno',
        timestamp: '01:10',
        text: 'When humans are in a high-stress or unfamiliar social dynamic, speech is used defensively to fill voids. True autonomic security is reached when silence is no longer interpreted by the amygdala as disapproval or danger.',
      },
      {
        speaker: 'Callum Price',
        timestamp: '04:00',
        text: 'From an accessibility and neurodivergent perspective, parallel play is life-saving. You get the oxytocin and comfort of shared human presence without the exhausting executive load of conversational performance.',
      },
    ],
  },
];
