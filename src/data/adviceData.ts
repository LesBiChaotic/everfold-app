import { AdviceArticle, AdviceCategory, AdviceComment, AskEverfoldSubmission } from '../types/socialEcosystem';

export const ADVICE_CATEGORIES: AdviceCategory[] = [
  { id: 'first_dates', name: 'First Dates', description: 'Low-pressure blueprints, conversational safety, and early boundaries.', iconName: 'Compass' },
  { id: 'communication', name: 'Communication', description: 'Texting cadence, difficult conversations, and asynchronous repair.', iconName: 'MessageSquare' },
  { id: 'boundaries', name: 'Boundaries & Safety', description: 'Clear agreements, identity protection, and gentle assertions.', iconName: 'Shield' },
  { id: 'queer_dating', name: 'Queer Dating', description: 'Chosen family networks, late bloomers, and expansive relational models.', iconName: 'Heart' },
  { id: 'dating_after_grief', name: 'Dating After Grief', description: 'Honoring past love while making room for new beginnings.', iconName: 'Feather' },
  { id: 'long_distance', name: 'Long Distance', description: 'Maintaining emotional intimacy across time zones and postal codes.', iconName: 'Globe' },
  { id: 'introverts', name: 'Introvert dating', description: 'Protecting social batteries, quiet dates, and parallel play.', iconName: 'Coffee' },
  { id: 'different_schedules', name: 'Shift Work & Schedules', description: 'Dating when your free hours rarely overlap.', iconName: 'Clock' },
  { id: 'relationship_pace', name: 'Relationship Pace', description: 'Resisting algorithmic urgency and building slow emotional foundations.', iconName: 'Calendar' },
  { id: 'moving_in', name: 'Moving In & Shared Space', description: 'Navigating domestic territory, quiet zones, and morning routines.', iconName: 'Home' },
  { id: 'breakups', name: 'Kind Endings & Grief', description: 'Ending connections with tenderness, clarity, and dignity.', iconName: 'RotateCcw' },
  { id: 'reconnecting', name: 'Reconnection & Second Chances', description: 'When timing was wrong the first time, but resonance remains.', iconName: 'Repeat' },
];

export const SEEDED_ADVICE_ARTICLES: AdviceArticle[] = [
  {
    id: 'art_low_stimulation_dates',
    title: 'The Case for Low-Stimulation First Dates',
    dek: 'Why noisy cocktail lounges destroy conversational chemistry, and what quiet alternatives can offer nervous systems.',
    categoryId: 'first_dates',
    authorName: 'Dr. Celia Moreno',
    authorRole: 'Head of Relationship Science',
    authorAvatar: 'celia',
    authorType: 'Relationship Science',
    publishedAt: '2026-03-12T10:00:00Z',
    readingTimeMinutes: 5,
    commentsCount: 24,
    storyTier: 0,
    contentMarkdown: `### The Problem with Sensory Overload in Modern Romance
Most contemporary dating advice recommends meeting in high-energy, crowded environments: bustling cocktail lounges with loud background bass, packed bistros where tables are separated by four inches, or active social venues. For many people—especially introverts, neurodivergent individuals, or those with auditory processing sensitivities—this environment immediately triggers low-level sympathetic nervous system activation (fight-or-flight).

When you must constantly strain your vocal cords to be heard across a small candle, your cognitive bandwidth is consumed by filtering out background noise rather than listening to your companion's emotional nuances. You leave the date feeling drained, tense, and uncertain whether the awkwardness was due to incompatibility or sheer sensory exhaustion.

### The Power of Parallel Activity & Shared Focus
When two people sit directly opposite each other in a brightly lit or noisy room, eye contact becomes mandatory and continuous. This physical posture mimics an interrogation or an executive performance review.

In contrast, **parallel activity** (walking side-by-side along a quiet canal, wandering through an independent bookstore, or sitting together on a shaded park bench) allows eye contact to be optional rather than enforced. Looking at a shared object—such as a shelf of vintage art books or a row of garden ferns—lowers cortisol levels and creates natural, unpressured pauses where thoughts can assemble themselves at a human pace.

### Three Tested Low-Stimulation Blueprints

1. **The Corner Bookstore & Bench Protocol**:
   Meet outside an independent bookstore during a weekday evening. Spend twenty minutes browsing separate aisles in quiet independence. Meet back at the central wooden table or nearby outdoor bench and show each other exactly one passage, photograph, or recipe that made you pause.

2. **The Botanical Conservatory Twilight Walk**:
   Glasshouses and conservatories provide natural humidity, soft acoustic dampening through foliage, and gentle ambient warmth. Walking through green spaces promotes physiological down-regulation, making emotional disclosure feel safe and organic.

3. **The Tea Room Ritual**:
   Choose a traditional tearoom with wide table spacing and natural wood interiors. The deliberate pacing of steeping tea creates natural physical pauses that prevent frantic conversational rushing.

### Practical Takeaway for Your Next Invitation
When suggesting your next first date, try this phrasing:
*"I love thoughtful conversation, but loud bars tend to fry my battery. Would you be open to grabbing a tea and taking a quiet walk through the Public Garden instead?"*`,
    relatedArticleIds: ['art_texting_fatigue', 'art_parallel_play'],
  },
  {
    id: 'art_grief_and_memory',
    title: 'Loving Again After Profound Loss: Expanding the Architecture of the Room',
    dek: 'Why new love does not erase past devotion, and how healthy second partnerships build space for remembrance.',
    categoryId: 'dating_after_grief',
    authorName: 'Tessa Ibrahim',
    authorRole: 'Community Safety & Care Director',
    authorAvatar: 'tessa',
    authorType: 'Trust & Safety',
    publishedAt: '2026-02-18T14:00:00Z',
    readingTimeMinutes: 6,
    commentsCount: 38,
    storyTier: 0,
    contentMarkdown: `### The Myth of the Clean Slate
One of the most damaging assumptions in popular culture is the belief that before you can love someone new, your past love must be fully resolved, packed into a sealed box, and forgotten. For those who have lost a partner to illness, accident, or bereavement, this expectation feels not only impossible but profoundly disrespectful to the architecture of their life.

Love is not a finite liquid that must be poured out of a glass before new water can enter. Love expands the room. When you lose someone significant, their presence becomes part of the load-bearing timber of your emotional home.

### The Insecure Competitor vs. The Generous Companion
The most common friction in dating after grief arises when a new partner attempts to compete with memory. 
- **The Competitor** asks: *"Do you love them more than you love me? Why do you still keep their framed drawing in the hallway? When will you be completely over it?"*
- **The Generous Companion** asks: *"What was their favorite soup on freezing winter nights? May I sit beside you while you look at this photo album? How can I support you when the anniversary of their passing arrives?"*

You cannot win a competition against someone who is remembered; the attempt only generates guilt and emotional withdrawal.

### When Somatic Pattern Matching Occurs
In our grief and bereavement circles on Everfold, many members report moments of intense, disorienting familiarity with new partners: noticing the exact same hand gestures, a shared cadence in vocal pitch, or an identical domestic preference (such as leaving a window cracked during rainstorms).

Behavioral psychology identifies this as **somatic pattern recognition**: our nervous systems naturally gravitate toward the relational frequencies where we previously felt deeply anchored and physically secure. Recognizing these echoes without fear allows new love to flourish alongside cherished memory.`,
    relatedArticleIds: ['art_low_stimulation_dates', 'art_slow_emotional_pacing'],
  },
  {
    id: 'art_texting_fatigue',
    title: 'Asynchronous Texting Without Guilt: Escaping the Instant Reply Trap',
    dek: 'How declaring your communication rhythm on day one transforms frantic messaging into deep digital correspondence.',
    categoryId: 'communication',
    authorName: 'Jonah Feld',
    authorRole: 'Senior Behavioral Research Scientist',
    authorAvatar: 'jonah',
    authorType: 'Relationship Science',
    publishedAt: '2026-01-20T09:30:00Z',
    readingTimeMinutes: 5,
    commentsCount: 19,
    storyTier: 0,
    contentMarkdown: `### The Cognitive Weight of the "Open Loop"
Instant messaging platforms have conditioned us to treat incoming text messages as urgent emergencies requiring immediate responses. When a match sends you a message at 11:30 AM while you are deep in work, your brain registers an unclosed relational loop. 

If you reply immediately, you sacrifice your concentration and send a rushed, shallow response. If you wait, you suffer the low-grade background guilt of leaving someone on "read." Over weeks, this dynamic produces severe dating fatigue, leading many people to abruptly ghost simply because keeping up with daily ping-pong texting feels like an unpaid second job.

### The Letter-Writing Protocol
High-resonance relationships thrive when messaging shifts from **real-time chat** to **asynchronous correspondence**. Instead of twenty fragmented texts throughout the day ("Hey", "How's work?", "Tired lol"), you send one or two substantive paragraphs in the morning or evening when you have the quiet space to genuinely reflect and share.

### Script: Declaring Your Rhythm Early
Set expectations before misunderstandings take root. Send this during your first 48 hours of matching:

> *"I really enjoy our conversations, but my work schedule is pretty demanding during the day and I try to stay off my phone while working. I usually check Everfold once in the morning and once in the evening with a cup of tea so I can give messages my full attention! If you ever need something time-sensitive, feel free to give me a call."*

Notice what this achieves:
1. It eliminates anxiety around reply delays.
2. It signals high intentionality and adult boundaries.
3. It filters for partners who respect autonomy and personal focus.`,
    relatedArticleIds: ['art_low_stimulation_dates', 'art_slow_emotional_pacing'],
  },
  {
    id: 'art_slow_emotional_pacing',
    title: 'The Slow Burn: Why True Relational Alignment Takes Three Seasons',
    dek: 'Resisting algorithmic urgency and discovering the durable peace of unhurried emotional development.',
    categoryId: 'relationship_pace',
    authorName: 'Janelle Wu',
    authorRole: 'Editorial Director, Everfold Magazine',
    authorAvatar: 'janelle',
    authorType: 'Editorial',
    publishedAt: '2026-02-04T11:00:00Z',
    readingTimeMinutes: 6,
    commentsCount: 31,
    storyTier: 0,
    contentMarkdown: `### The Mirage of Instant Intensity
Modern romance culture often confuses rapid intensity with genuine intimacy. When two people match and immediately spend six hours texting every day, declaring soulmate status by week two, and merging their entire lives within a month, they are usually experiencing **limerence**—a neurochemical state fueled by projected fantasy and dopamine surges.

The danger of rapid intensity is that it leaves no room to observe how someone behaves across different life conditions:
- How do they respond when they are overtired and miss a flight?
- How do they navigate a disagreement when both of you are stressed?
- How do they treat service staff during a holiday rush?
- How do they speak about people they no longer like?

### The Three-Season Rule
In traditional Japanese garden design, a newly planted stone lantern is never evaluated in spring alone. It must be viewed through summer rains, autumn leaf-fall, and winter snow before its true placement in the landscape can be judged.

Relational alignment operates on the same principle. You need to see a partner across:
1. **A Season of Ease**: When work is light, health is good, and social energy is abundant.
2. **A Season of Strain**: When family obligations press in, career deadlines loom, or physical energy drops.
3. **A Season of Transition**: Moving homes, changing roles, or navigating unexpected disruption.

If a connection is built to last twenty years, taking ninety days to build the foundation is not a delay—it is wisdom.`,
    relatedArticleIds: ['art_low_stimulation_dates', 'art_grief_and_memory'],
  },
  {
    id: 'art_queer_kinship_networks',
    title: 'Beyond the Nuclear Default: The Beauty of Expansive Queer Kinship',
    dek: 'Why chosen family networks and platonic co-housing offer richer models of lifelong relational security.',
    categoryId: 'queer_dating',
    authorName: 'Tessa Ibrahim',
    authorRole: 'Community Safety & Care Director',
    authorAvatar: 'tessa',
    authorType: 'Trust & Safety',
    publishedAt: '2026-02-28T10:00:00Z',
    readingTimeMinutes: 5,
    commentsCount: 22,
    storyTier: 0,
    contentMarkdown: `### The Isolation of the Romantic Monolith
For generations, Western social architecture has placed an unsustainable burden upon a single romantic partnership. One human being is expected to be your passionate lover, best friend, co-parent, financial partner, travel buddy, career counselor, and exclusive emotional confidant.

Queer community history offers a healthier, more resilient alternative: **distributed kinship networks**. In chosen family structures, emotional security is anchored not in a single fragile thread, but in a wide, supportive web of deep friendships, former partners who became family, mutual-aid circles, and chosen elders.

### Integrating Dating into Existing Networks
When you date someone with strong chosen family ties:
- Do not view their close friends or ex-turned-confidants as threats to your status.
- Recognize that their capacity for long-term loyalty is demonstrated by the health of their friendships.
- Allow your relationship to find its natural place within the ecosystem rather than demanding they abandon their web to prove devotion.`,
    relatedArticleIds: ['art_slow_emotional_pacing'],
  },
  {
    id: 'art_introvert_parallel_play',
    title: 'Parallel Play: The Highest Benchmark of Introvert Intimacy',
    dek: 'Why existing quietly in the same room without performing conversation is the deepest form of relational comfort.',
    categoryId: 'introverts',
    authorName: 'Dr. Celia Moreno',
    authorRole: 'Head of Relationship Science',
    authorAvatar: 'celia',
    authorType: 'Relationship Science',
    publishedAt: '2026-01-14T09:00:00Z',
    readingTimeMinutes: 4,
    commentsCount: 28,
    storyTier: 0,
    contentMarkdown: `### The Performance Tax of Dating
For introverted individuals, early dating involves a heavy "performance tax": smiling continuously, asking engaging follow-up questions, monitoring body language, and suppressing the natural urge to withdraw and recharge.

The transition from "dating performance" to "real intimacy" occurs the first time you can spend three hours in the same room with someone in absolute silence without a single flicker of anxiety. One person reads a novel on the rug; the other solders a circuit board or repairs a sweater at the desk.

### Establishing the Parallel Play Protocol
Try proposing this for your third or fourth date:
*"I have about two hours of reading/sketching to catch up on this Sunday. Would you want to bring whatever quiet project you're working on and share my dining table with some tea? Zero obligation to entertain each other."*

Those who understand the relief of this offer will become your most enduring companions.`,
    relatedArticleIds: ['art_low_stimulation_dates', 'art_slow_emotional_pacing'],
  },
  {
    id: 'art_shift_work_dating',
    title: 'Dating the Clock: Love Between Night Shifts and Early Rises',
    dek: 'Practical strategies for healthcare workers, pilots, and creatives whose biological clocks never sync.',
    categoryId: 'different_schedules',
    authorName: 'Jonah Feld',
    authorRole: 'Senior Behavioral Researcher',
    authorAvatar: 'jonah',
    authorType: 'Relationship Science',
    publishedAt: '2026-02-15T10:00:00Z',
    readingTimeMinutes: 5,
    commentsCount: 20,
    storyTier: 0,
    contentMarkdown: `### The Mismatched Biological Clock
When one partner works 7 PM to 7 AM in a hospital emergency room while the other works 8 AM to 4 PM in a classroom, standard dating rituals (such as 7:30 PM Friday dinners) become physical impossibilities. Attempting to force standard schedules leads to sleep deprivation and burnout.

### The Three Golden Rules for Shift-Work Couples
1. **The Asynchronous Physical Note**: Leave handwritten index cards on the bathroom mirror or under the coffee tin. Reading physical ink when waking up creates a somatic anchor of care.
2. **The 6:30 AM Breakfast Date**: Meet when the night shift ends and the day shift begins. Breakfast food is comforting, diner booths are quiet, and both partners are completely unguarded.
3. **Guilt-Free Sleep Boundaries**: Blackout curtains, earplugs, and silent phone modes must be treated as medical necessities, never as personal rejection.`,
    relatedArticleIds: ['art_texting_fatigue'],
  },
  {
    id: 'art_kind_breakups',
    title: 'The Art of the Kind Ending: Parting with Dignity and Gratitude',
    dek: 'How to conclude a relationship with tenderness, clarity, and zero cruelty when life visions diverge.',
    categoryId: 'breakups',
    authorName: 'Tessa Ibrahim',
    authorRole: 'Community Safety & Care Director',
    authorAvatar: 'tessa',
    authorType: 'Trust & Safety',
    publishedAt: '2026-03-01T10:00:00Z',
    readingTimeMinutes: 5,
    commentsCount: 25,
    storyTier: 0,
    contentMarkdown: `### Reframing Completion vs. Failure
A relationship that lasted two years, provided mutual safety, taught both people profound lessons, and ended when their life goals diverged is not a "failed relationship." It was a successful two-year relationship that has now reached its natural completion.

### Rules for an Honorable Ending
- **Choose Neutral, Low-Stimulus Ground**: Walk in a quiet park or talk in a private living space with ample time for tears and silence.
- **Own Your Reasons with "I" Statements**: Focus on fundamental incompatibilities in values, geography, or life rhythm rather than compiling a laundry list of the other person's flaws.
- **Honor the Shared History**: Express genuine gratitude for the specific ways they enriched your life. Ending with respect creates the possibility of future chosen friendship.`,
    relatedArticleIds: ['art_slow_emotional_pacing'],
  },
  {
    id: 'art_shared_space_boundaries',
    title: 'The First 90 Days of Living Together: Territorial Peace and Quiet Zones',
    dek: 'Navigating closet division, kitchen habits, and the sacred necessity of solitary territory under one roof.',
    categoryId: 'moving_in',
    authorName: 'Callum Price',
    authorRole: 'Product Accessibility Lead',
    authorAvatar: 'callum',
    authorType: 'Editorial',
    publishedAt: '2026-02-19T10:00:00Z',
    readingTimeMinutes: 5,
    commentsCount: 19,
    storyTier: 0,
    contentMarkdown: `### The Myth of Seamless Cohabitation
Moving in together is not just a romantic milestone; it is a major logistical merger of two distinct nervous systems and their deeply ingrained domestic habits. Even deeply compatible couples experience friction around dish sponges, heating thermostat settings, and morning noise levels.

### The Single Chair Sanctuary Rule
Every person living in a shared space requires at least one physical territory that belongs exclusively to them—even if it is just a specific armchair, a single desk drawer, or one side of a porch bench. When someone sits in their sanctuary, the household agreement is that they are currently "offline" and not available for household logistics.`,
    relatedArticleIds: ['art_introvert_parallel_play'],
  },
  {
    id: 'art_second_chances_timing',
    title: 'Reconnection: When the Person Was Right but the Year Was Wrong',
    dek: 'How to navigate second chances with grounded discernment rather than romantic nostalgia.',
    categoryId: 'reconnecting',
    authorName: 'Dr. Celia Moreno',
    authorRole: 'Head of Relationship Science',
    authorAvatar: 'celia',
    authorType: 'Relationship Science',
    publishedAt: '2026-02-23T10:00:00Z',
    readingTimeMinutes: 5,
    commentsCount: 22,
    storyTier: 0,
    contentMarkdown: `### The Distinction Between Growth and Nostalgia
When an old match or previous connection reappears in your life, the human brain tends to highlight romantic memories while editing out the original friction. 

Before leaping back in, ask:
1. **What has structurally changed?** Are both careers more stable? Is emotional maturity genuinely higher? Has geographic distance been resolved?
2. **Are we responding to the person who is standing in front of us today, or the fantasy of who we wish they had been in 2022?**

Second chances succeed when both individuals treat each other as new acquaintances who happen to share a warm prologue.`,
    relatedArticleIds: ['art_slow_emotional_pacing'],
  },
  {
    id: 'art_difficult_conversations',
    title: 'The 24-Hour Cooling Rule for Difficult Conversations',
    dek: 'Why sleeping on a disagreement prevents catastrophic text essays and resets emotional regulation.',
    categoryId: 'communication',
    authorName: 'Tessa Ibrahim',
    authorRole: 'Community Safety & Care Director',
    authorAvatar: 'tessa',
    authorType: 'Trust & Safety',
    publishedAt: '2026-02-27T10:00:00Z',
    readingTimeMinutes: 4,
    commentsCount: 21,
    storyTier: 0,
    contentMarkdown: `### The Amygdala Highjack in Text Messages
When you feel misunderstood or slighted by a partner, your heart rate spikes and your brain enters defensive triage. Typing a 600-word paragraph on your phone while in this state is almost guaranteed to introduce sharpness, sarcasm, or unhelpful absolutes ("You always do this").

### The Agreement:
*"I care about this conversation too much to rush it while I am upset. Let's both sleep on this tonight, and talk gently over tea tomorrow at 5 PM."*

A night of REM sleep naturally processes acute emotional spikes, allowing you to address the core issue with clarity and tenderness.`,
    relatedArticleIds: ['art_texting_fatigue'],
  },
  {
    id: 'art_early_physical_boundaries',
    title: 'Asserting Early Physical Boundaries with Warmth and Clarity',
    dek: 'How clear touch pacing builds trust and eliminates ambiguous discomfort on first and second dates.',
    categoryId: 'boundaries',
    authorName: 'Tessa Ibrahim',
    authorRole: 'Community Safety & Care Director',
    authorAvatar: 'tessa',
    authorType: 'Trust & Safety',
    publishedAt: '2026-03-01T10:00:00Z',
    readingTimeMinutes: 4,
    commentsCount: 13,
    storyTier: 0,
    contentMarkdown: `### The Power of Gentle Assertions
Many people hesitate to declare physical boundaries because they fear appearing cold, prudish, or rejecting. In reality, clear boundaries are an act of generosity: they remove guesswork and create a transparent safety container.

### Script:
*"I am really enjoying getting to know you! Just so you know my style, I like to move very slowly with physical touch until I feel strong emotional trust. A warm hug goodbye is my sweet spot for today."*

A secure, high-integrity partner will smile and respect this immediately. Anyone who pouts or pushes back has given you valuable data about their respect for your autonomy.`,
    relatedArticleIds: ['art_low_stimulation_dates'],
  },
];

export const SEEDED_ADVICE_COMMENTS: Record<string, AdviceComment[]> = {
  art_low_stimulation_dates: [
    {
      id: 'adv_c1',
      articleId: 'art_low_stimulation_dates',
      authorId: 'usr_amina',
      authorName: 'Amina',
      authorHandle: 'aminareads',
      avatarSeed: 'amina',
      body: 'The bookstore date suggestion is brilliant. My partner and I did this on our second date and spent an hour just showing each other poetry translations.',
      publishedAt: '2026-03-12T12:30:00Z',
      helpfulCount: 14,
      relatableCount: 22,
    },
    {
      id: 'adv_c2',
      articleId: 'art_low_stimulation_dates',
      authorId: 'usr_dev',
      authorName: 'Dev',
      authorHandle: 'devarch',
      avatarSeed: 'dev',
      body: 'Corner tea shops are criminally underrated for first dates. The acoustic comfort alone cuts first-date anxiety in half.',
      publishedAt: '2026-03-12T14:15:00Z',
      helpfulCount: 9,
      relatableCount: 16,
    },
  ],
  art_grief_and_memory: [
    {
      id: 'adv_c3',
      articleId: 'art_grief_and_memory',
      authorId: 'usr_leah',
      authorName: 'Leah Vance',
      authorHandle: 'leah_vance',
      avatarSeed: 'leah',
      body: '“May I build a chair beside yours in this expanded room?” — This brought tears to my eyes. It took me seven years after Samuel passed to understand that my memories were not betrayal.',
      publishedAt: '2026-02-18T16:00:00Z',
      helpfulCount: 48,
      relatableCount: 39,
    },
    {
      id: 'adv_c4',
      articleId: 'art_grief_and_memory',
      authorId: 'usr_morgan',
      authorName: 'Morgan',
      authorHandle: 'morganhasreceipts',
      avatarSeed: 'morgan',
      body: 'The note about somatic pattern matching is fascinating. Sometimes when you meet someone who uses identical phrases from decades ago, your whole body remembers before your mind can explain it.',
      publishedAt: '2026-02-18T18:40:00Z',
      helpfulCount: 31,
      relatableCount: 12,
      storyTier: 4,
    },
  ],
};

export const SEEDED_ASK_SUBMISSIONS: AskEverfoldSubmission[] = [
  {
    id: 'ask_01',
    category: 'Relationship Science',
    question: 'My match and I have amazing conversations over text, but when we meet in person, we both freeze up and become stiff. Is our text chemistry a lie?',
    privacy: 'public',
    submittedAt: '2026-03-10T14:20:00Z',
    status: 'answered',
    scriptedAnswer: {
      author: 'Dr. Celia Moreno',
      role: 'Chief Science Officer',
      answeredAt: '2026-03-11T09:15:00Z',
      body: 'Not at all! Text chemistry proves that your linguistic and intellectual frequencies are deeply aligned. In-person stiffness is simply nervous system hyper-vigilance caused by the sudden shift to physical presence and direct eye contact. Switch your next date to a side-by-side walk in a botanical garden or a quiet bookstore where you both look at objects together rather than staring across a table.',
    },
  },
  {
    id: 'ask_02',
    category: 'Trust & Safety',
    question: 'How do I tell someone I don’t want to exchange social media handles or phone numbers until after our second in-person date without sounding paranoid?',
    privacy: 'public',
    submittedAt: '2026-03-08T11:00:00Z',
    status: 'answered',
    scriptedAnswer: {
      author: 'Tessa Ibrahim',
      role: 'Director of Community Safety & Care',
      answeredAt: '2026-03-08T16:30:00Z',
      body: 'Frame it as an intentional habit rather than an accusation: "I keep all my early dating conversations inside Everfold until we have met in person and felt real comfort. It helps me stay present without cluttering my work phone!" A grounded match will respect this immediately.',
    },
  },
  {
    id: 'ask_03',
    category: 'Date Planning',
    question: 'What is the ideal date format for two people who both experience social battery depletion by 7 PM on weekdays?',
    privacy: 'public',
    submittedAt: '2026-03-05T18:00:00Z',
    status: 'answered',
    scriptedAnswer: {
      author: 'Callum Price',
      role: 'Product Accessibility Lead',
      answeredAt: '2026-03-06T10:00:00Z',
      body: 'Do not do weekday evening dates! Shift your meeting to a Saturday morning 9:30 AM coffee and pastry walk. Morning light provides gentle alertness, crowds are minimal, and you both enter the date with fresh energy before the day’s demands deplete your reserves.',
    },
  },
  {
    id: 'ask_04',
    category: 'Community',
    question: 'How do I handle meeting my partner’s tight-knit group of queer chosen family when I am newly out and feel self-conscious about my lack of queer history?',
    privacy: 'public',
    submittedAt: '2026-03-01T15:45:00Z',
    status: 'answered',
    scriptedAnswer: {
      author: 'Janelle Wu',
      role: 'Editorial Director',
      answeredAt: '2026-03-02T11:20:00Z',
      body: 'Chosen family networks love people who are sincere, curious, and respectful of their partner. You do not need an encyclopedia of queer cultural references to be welcomed. Be honest about being a late bloomer—you will almost certainly find that half the people around that table also took a winding path to their authentic self.',
    },
  },
  {
    id: 'ask_05',
    category: 'Relationship Science',
    question: 'My partner and I both work from home in a small 1-bedroom flat. We find ourselves bickering by 4 PM every day. How do we protect our connection?',
    privacy: 'public',
    submittedAt: '2026-02-25T13:10:00Z',
    status: 'answered',
    scriptedAnswer: {
      author: 'Jonah Feld',
      role: 'Senior Behavioral Researcher',
      answeredAt: '2026-02-26T09:00:00Z',
      body: 'You are suffering from sensory boundary blurring. When work, domestic chores, and romance all occur within the same twenty feet, your brains cannot transition roles. Implement a mandatory "fake commute" at 5 PM: both of you put on jackets, leave the flat in opposite directions for a 15-minute walk around the block, and return as evening romantic partners.',
    },
  },
];
