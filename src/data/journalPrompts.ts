import { JournalPrompt, JournalEntry } from '../types';

export const SEEDED_JOURNAL_PROMPTS: JournalPrompt[] = [
  // The primary 6 RETURN prompts whose initials spell R - E - T - U - R - N
  {
    id: 'prm_r1',
    prompt: 'Recognize the moments where a conversation felt familiar before it even began.',
    category: 'Memory & Intuition',
    initialLetter: 'R'
  },
  {
    id: 'prm_e1',
    prompt: 'Examine what parts of your relational habits you inherited from spaces you never lived in.',
    category: 'Relational Patterns',
    initialLetter: 'E'
  },
  {
    id: 'prm_t1',
    prompt: 'Trace the physical sensation of emotional safety in a new room or encounter.',
    category: 'Somatic Awareness',
    initialLetter: 'T'
  },
  {
    id: 'prm_u1',
    prompt: 'Uncover the unspoken expectations you carry into new beginnings.',
    category: 'Boundaries & Vulnerability',
    initialLetter: 'U'
  },
  {
    id: 'prm_r2',
    prompt: 'Recall a person who left your life whose presence you still feel when making tea.',
    category: 'Loss & Continuity',
    initialLetter: 'R'
  },
  {
    id: 'prm_n1',
    prompt: 'Notice how continuity endures across every shift in scenery, platform, or season.',
    category: 'Continuity & Acceptance',
    initialLetter: 'N'
  },

  // Additional 24 prompts
  { id: 'prm_7', prompt: 'What is something you only share when the lights are low?', category: 'Intimacy', initialLetter: 'W' },
  { id: 'prm_8', prompt: 'Describe the ideal Sunday morning rhythm with a partner.', category: 'Daily Life', initialLetter: 'D' },
  { id: 'prm_9', prompt: 'How do you know when your social energy is completely depleted?', category: 'Self-Care', initialLetter: 'H' },
  { id: 'prm_10', prompt: 'What dish feels like home to you, and who taught you to love it?', category: 'Food & Memory', initialLetter: 'W' },
  { id: 'prm_11', prompt: 'Write about a boundary that took you years to articulate clearly.', category: 'Boundaries', initialLetter: 'W' },
  { id: 'prm_12', prompt: 'What are you quietly looking for in another person’s silence?', category: 'Intimacy', initialLetter: 'W' },
  { id: 'prm_13', prompt: 'Reflect on a book or essay that reshaped how you listen.', category: 'Art & Thought', initialLetter: 'R' },
  { id: 'prm_14', prompt: 'If you could preserve one mundane Tuesday afternoon forever, which one?', category: 'Memory', initialLetter: 'I' },
  { id: 'prm_15', prompt: 'How has your definition of partnership evolved in the last five years?', category: 'Growth', initialLetter: 'H' },
  { id: 'prm_16', prompt: 'What makes you feel instantly grounded when your mind is racing?', category: 'Mindfulness', initialLetter: 'W' },
  { id: 'prm_17', prompt: 'Describe an old friend whose voice you can still hear clearly.', category: 'Connection', initialLetter: 'D' },
  { id: 'prm_18', prompt: 'What does generosity look like when neither person has much to give?', category: 'Values', initialLetter: 'W' },
  { id: 'prm_19', prompt: 'Are you more afraid of being misunderstood or being completely seen?', category: 'Vulnerability', initialLetter: 'A' },
  { id: 'prm_20', prompt: 'What is a small ritual that marks the end of your workday?', category: 'Daily Life', initialLetter: 'W' },
  { id: 'prm_21', prompt: 'How do you navigate differing emotional speeds in a budding romance?', category: 'Pacing', initialLetter: 'H' },
  { id: 'prm_22', prompt: 'What is something unsaid in your last serious conversation?', category: 'Honesty', initialLetter: 'W' },
  { id: 'prm_23', prompt: 'Write about a neighborhood you still wander in your thoughts.', category: 'Places', initialLetter: 'W' },
  { id: 'prm_24', prompt: 'When was the last time someone surprised you with genuine kindness?', category: 'Gratitude', initialLetter: 'W' },
  { id: 'prm_25', prompt: 'What does your ideal kitchen counter look like at 8 AM?', category: 'Home', initialLetter: 'W' },
  { id: 'prm_26', prompt: 'How do you hold space for someone who is grieving without fixing it?', category: 'Care', initialLetter: 'H' },
  { id: 'prm_27', prompt: 'What kind of weather brings out your most creative thoughts?', category: 'Atmosphere', initialLetter: 'W' },
  { id: 'prm_28', prompt: 'Reflect on a conversation that changed the trajectory of your year.', category: 'Turning Points', initialLetter: 'R' },
  { id: 'prm_29', prompt: 'What is a promise you made to yourself that you haven’t broken?', category: 'Integrity', initialLetter: 'W' },
  { id: 'prm_30', prompt: 'Write a note to the person who will be sitting across from you next winter.', category: 'Looking Forward', initialLetter: 'W' }
];

export const INITIAL_JOURNAL_ENTRIES: JournalEntry[] = [
  {
    id: 'jnl_initial_1',
    title: 'First impressions of this space',
    content: 'Everfold feels unusually calm compared to typical dating apps. No swipe fatigue, no endless photos. The modular avatars force you to read how someone describes their world instead of judging angles.',
    mood: 'Curious',
    tags: ['First Impressions', 'Design', 'Reflections'],
    createdAt: '2026-08-16T10:00:00Z',
    updatedAt: '2026-08-16T10:00:00Z',
    isFavorite: false
  },
  {
    id: 'jnl_recovered_draft',
    title: '[Recovered Draft / Origin Unknown]',
    content: 'We met at the station in the rain. The bench was cold. You said you had been here before, twenty years ago, waiting for someone with the exact same coat. I laughed, but your eyes did not move. Why does this app remember what we have not written yet?',
    mood: 'Unsure',
    tags: ['Recovered', 'SystemArtifact', 'RETURN'],
    createdAt: '2008-11-02T19:14:00Z',
    updatedAt: '2026-08-16T04:11:00Z',
    isFavorite: true,
    isRecoveredDraft: true,
    draftSource: 'Internal Database Buffer (Correspond 2008 / Rel-2347)'
  }
];
