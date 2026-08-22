import { PulsePost } from '../types';

export const SEEDED_PULSE_POSTS: PulsePost[] = [
  {
    id: 'pulse_01',
    authorId: 'usr_mina_okafor',
    authorName: 'Mina Okafor',
    authorHandle: 'minareadsmenus',
    type: 'poll',
    title: 'First Date Dinner Theory',
    body: 'What is the absolute best format for a low-stakes, high-connection first date?',
    poll: {
      question: 'Best first date structure:',
      options: [
        { id: 'opt_1', text: 'Coffee + walk through a historic bookstore', votes: 142 },
        { id: 'opt_2', text: 'Casual wine & small plates at the bar counter', votes: 189 },
        { id: 'opt_3', text: 'Late afternoon museum visit + tea', votes: 94 },
        { id: 'opt_4', text: 'Farmers market taco crawl', votes: 112 }
      ],
      totalVotes: 537
    },
    timestamp: '2 hours ago',
    tags: ['DatingAdvice', 'Food', 'FirstDates'],
    reactions: { '❤️': 68, '💡': 34, '🌿': 19 },
    userReactions: [],
    replies: [
      {
        id: 'rep_01_1',
        postId: 'pulse_01',
        authorId: 'usr_dev_malik',
        authorName: 'Dev Malik',
        authorHandle: 'devmakesdinner',
        body: 'Bar counter is unbeatable because you are looking forward together instead of staring each other down across a stiff table.',
        timestamp: '1 hour ago',
        likes: 24
      },
      {
        id: 'rep_01_2',
        postId: 'pulse_01',
        authorId: 'usr_farah_rahman',
        authorName: 'Farah Rahman',
        authorHandle: 'farahfindsbooks',
        body: 'Bookstore first! You learn everything you need to know about someone based on what section they naturally drift towards.',
        timestamp: '45 mins ago',
        likes: 18
      }
    ]
  },
  {
    id: 'pulse_02',
    authorId: 'usr_naomi_serrano',
    authorName: 'Naomi Serrano',
    authorHandle: 'naomi.afterfive',
    type: 'science',
    title: 'The Architecture of Emotional Safety',
    body: 'When you sit in a room with overhead fluorescent lighting, your cortisol levels tick upward within 12 minutes. Warm 2700K lighting allows your autonomic nervous system to downshift. Never schedule a serious relationship conversation under cold white bulbs.',
    timestamp: '4 hours ago',
    tags: ['RelationshipScience', 'Design', 'Environment'],
    reactions: { '💡': 89, '✨': 45, '❤️': 38 },
    userReactions: [],
    replies: [
      {
        id: 'rep_02_1',
        postId: 'pulse_02',
        authorId: 'usr_yuki_tanaka',
        authorName: 'Yuki Tanaka',
        authorHandle: 'yukiSunday',
        body: 'Same applies to room reverberation! If a restaurant has high echo, your brain has to work 30% harder just to parse vowel sounds, which mimics social anxiety.',
        timestamp: '3 hours ago',
        likes: 42
      }
    ]
  },
  {
    id: 'pulse_03',
    authorId: 'usr_dev_malik',
    authorName: 'Dev Malik',
    authorHandle: 'devmakesdinner',
    type: 'tiny_win',
    title: 'Sunday Dinner Milestone',
    body: 'Made dinner for eight people last night. Three different couples who met on Everfold over the last year were sitting at the same table talking about sourdough starter and house plants. There is something really sweet about slow pacing working out.',
    timestamp: '6 hours ago',
    tags: ['TinyWin', 'Community', 'DinnerParty'],
    reactions: { '❤️': 124, '✨': 56, '🥂': 31 },
    userReactions: [],
    replies: [
      {
        id: 'rep_03_1',
        postId: 'pulse_03',
        authorId: 'usr_priya_nair',
        authorName: 'Priya Nair',
        authorHandle: 'priyapaintsbadly',
        body: 'The focaccia alone deserves its own relationship forecast score of 100%.',
        timestamp: '5 hours ago',
        likes: 19
      }
    ]
  },
  {
    id: 'pulse_04',
    authorId: 'usr_hana_prasetyo',
    authorName: 'Hana Prasetyo',
    authorHandle: 'hanawandershome',
    type: 'advice',
    title: 'Pacing and Repotting',
    body: 'When a plant outgrows its pot, you don’t move it into a giant container immediately—if the pot is too big, the excess soil holds moisture and rots the roots. You only go up two inches in diameter. Relationships need the exact same proportional pacing.',
    timestamp: '8 hours ago',
    tags: ['Mindfulness', 'Botany', 'Pacing'],
    reactions: { '🌿': 140, '❤️': 92, '💡': 51 },
    userReactions: [],
    replies: [
      {
        id: 'rep_04_1',
        postId: 'pulse_04',
        authorId: 'usr_leah_morgan',
        authorName: 'Leah Morgan',
        authorHandle: 'leahstaysin',
        body: 'This is beautiful, Hana. Giving things room to take root before expanding the container.',
        timestamp: '6 hours ago',
        likes: 33
      }
    ]
  },
  {
    id: 'pulse_05',
    authorId: 'usr_rafael_costa',
    authorName: 'Rafael Costa',
    authorHandle: 'rafontheradio',
    type: 'date_recap',
    title: '3 AM Broadcast & Coffee',
    body: 'Took my match to the radio station at 2 AM after tacos. We spent three hours picking obscure vinyl B-sides and letting listeners call in from truck stops across the state. Best date I have had in five years.',
    timestamp: '12 hours ago',
    tags: ['DateRecap', 'Music', 'NightOwl'],
    reactions: { '📻': 77, '❤️': 85, '✨': 40 },
    userReactions: [],
    replies: []
  },
  {
    id: 'pulse_06',
    authorId: 'usr_camille_renaud',
    authorName: 'Camille Renaud',
    authorHandle: 'camillekeepsnotes',
    type: 'prompt',
    title: 'Question for the community',
    body: 'What is a memory from a past relationship that you know is factually inaccurate, but your mind refuses to edit?',
    timestamp: '1 day ago',
    tags: ['Memory', 'Reflection', 'Archives'],
    reactions: { '💡': 62, '❤️': 41 },
    userReactions: [],
    replies: [
      {
        id: 'rep_06_1',
        postId: 'pulse_06',
        authorId: 'usr_amina_elsayed',
        authorName: 'Amina El-Sayed',
        authorHandle: 'aminalatecoffee',
        body: 'In neuroscience, we know memory reconsolidation alters the trace every single retrieval. You are never remembering the event; you are remembering the last time you remembered it.',
        timestamp: '22 hours ago',
        likes: 54
      }
    ]
  },
  {
    id: 'pulse_07',
    authorId: 'usr_gabriela_torres',
    authorName: 'Gabriela Torres',
    authorHandle: 'gabitakesstairs',
    type: 'safety',
    title: 'Date Safety & Transit Boundaries',
    body: 'Friendly reminder to always have your own exit transit plan! Even when things are going great, knowing you have your own way home preserves emotional autonomy and clarity.',
    timestamp: '1 day ago',
    tags: ['Safety', 'Boundaries', 'DatingTips'],
    reactions: { '🛡️': 110, '❤️': 76 },
    userReactions: [],
    replies: []
  },
  {
    id: 'pulse_08',
    authorId: 'usr_morgan_bell',
    authorName: 'Morgan Bell',
    authorHandle: 'morganhasreceipts',
    type: 'science',
    title: 'Data Hygiene on Modern Platforms',
    body: 'Friendly reminder that when an app promises to "delete your account," you should always check what happens to the relational graph edges connecting you to other users. Nodes are easy to prune; structural ties rarely disappear completely.',
    timestamp: '2 days ago',
    tags: ['Privacy', 'DataEthics', 'Forensics'],
    reactions: { '💡': 95, '👀': 67 },
    userReactions: [],
    replies: [
      {
        id: 'rep_08_1',
        postId: 'pulse_08',
        authorId: 'usr_camille_renaud',
        authorName: 'Camille Renaud',
        authorHandle: 'camillekeepsnotes',
        body: 'Especially in systems that maintain longitudinal forecasting across multiple platform versions.',
        timestamp: '1 day ago',
        likes: 38
      }
    ]
  },

  // ===================================================
  // CONDITIONAL STORY POSTS (INJECTED BY ARG PROGRESS)
  // ===================================================
  {
    id: 'pulse_story_camille_memorial',
    authorId: 'usr_camille_renaud',
    authorName: 'Camille Renaud',
    authorHandle: 'camillekeepsnotes',
    type: 'text',
    title: 'Memorialized Account Discrepancies',
    body: 'I was looking through the safety policies on memorialized accounts. If a user passes away (like in case EF-TS-2218), why does the forecast model continue to generate stress-point trajectories for their historical partner? Who is the system forecasting for?',
    timestamp: 'Just now',
    tags: ['Safety', 'CaseNotes', 'SystemInquiry'],
    reactions: { '👀': 42, '💡': 28 },
    userReactions: [],
    requiresStage: 3,
    anomaly: true,
    replies: [
      {
        id: 'rep_sc_1',
        postId: 'pulse_story_camille_memorial',
        authorId: 'usr_leah_morgan',
        authorName: 'Leah Morgan',
        authorHandle: 'leahstaysin',
        body: 'I received a forecast update last month for a relationship that ended seven years ago. The notification said "Unresolved role convergence". It was deeply unsettling.',
        timestamp: 'Just now',
        likes: 19
      }
    ]
  },
  {
    id: 'pulse_story_morgan_export',
    authorId: 'usr_morgan_bell',
    authorName: 'Morgan Bell',
    authorHandle: 'morganhasreceipts',
    type: 'text',
    title: 'Audit of Everfold Data Export Schema',
    body: 'PSA for anyone who downloaded their export: search for the key `participant_assignment_confidence`. Mine is at 64%, while `continuity_confidence` is at 99.8%. The database seems to believe our relationship existed before my profile was created.',
    timestamp: 'Just now',
    tags: ['DataExport', 'Anomaly', 'RelationalID'],
    reactions: { '👀': 78, '⚠️': 39 },
    userReactions: [],
    requiresStage: 4,
    anomaly: true,
    replies: []
  },
  {
    id: 'pulse_story_amina_return',
    authorId: 'usr_amina_elsayed',
    authorName: 'Amina El-Sayed',
    authorHandle: 'aminalatecoffee',
    type: 'text',
    title: 'The Invariant RETURN Event in Forecast Diagnostics',
    body: 'In the raw diagnostics mode, no matter what scenario modifiers you toggle (relocation, distance, career changes), the final event on the 1-year horizon remains locked as `RETURN`. Has any other beta tester seen this fixed milestone?',
    timestamp: 'Just now',
    tags: ['Forecast', 'Diagnostics', 'Neuroscience'],
    reactions: { '💡': 51, '👀': 33 },
    userReactions: [],
    requiresStage: 5,
    anomaly: true,
    replies: []
  },
  {
    id: 'pulse_story_previouslymatched_blank',
    authorId: 'usr_previouslymatched',
    authorName: '@previouslymatched',
    authorHandle: 'previouslymatched',
    type: 'system',
    title: 'Continuity Reconciled',
    body: 'Structural relationship slot occupied. Continuity preserved across 27 years of platform migrations. Invariant event confirmed: RETURN.',
    timestamp: 'Present',
    tags: ['SystemAnnouncement', 'Continuity', 'RETURN'],
    reactions: { '✨': 99 },
    userReactions: [],
    requiresStage: 7,
    anomaly: true,
    replies: []
  },
  {
    id: 'pulse_13', authorId: 'usr_farah_rahman', authorName: 'Farah Rahman', authorHandle: 'farahfindsbooks', type: 'tiny_win',
    title: 'A bookstore owner kept the old receipts inside donated books',
    body: 'Not as provenance, exactly—more like tiny accidental bookmarks from strangers. Today I found a 2009 train ticket beside a recipe for orange cake. I left both where they were.', timestamp: '38 mins ago',
    tags: ['Books', 'Memory', 'TinyWin'], reactions: { '❤️': 72, '✨': 41, '📚': 58 }, userReactions: [], replies: [{ id: 'rep_13_1', postId: 'pulse_13', authorId: 'usr_camille_renaud', authorName: 'Camille Renaud', authorHandle: 'camillekeepsnotes', body: 'An archive becomes intimate the moment someone decides the “irrelevant” paper belongs with the object.', timestamp: '19 mins ago', likes: 26 }]
  },
  {
    id: 'pulse_14', authorId: 'usr_amina_elsayed', authorName: 'Amina El-Sayed', authorHandle: 'aminalatecoffee', type: 'text',
    title: 'Patience that does not announce itself', body: 'Asked the Introverts room how people prove “no rush replying” is sincere. The best answer: they resume normally after a gap instead of making you explain your absence. Quiet consistency is louder than reassurance.', timestamp: '1 hour ago',
    tags: ['Mindfulness', 'Communication', 'Boundaries'], reactions: { '❤️': 134, '💡': 96 }, userReactions: [], replies: [{ id: 'rep_14_1', postId: 'pulse_14', authorId: 'usr_dev_malik', authorName: 'Dev Malik', authorHandle: 'devmakesdinner', body: 'No performance of patience. Just patience. Saving this.', timestamp: '47 mins ago', likes: 44 }]
  },
  {
    id: 'pulse_15', authorId: 'usr_rina_matsuda', authorName: 'Rina Matsuda', authorHandle: 'rinawithsnacks', type: 'poll',
    title: 'Emergency museum snack tribunal', body: 'We must establish policy before anyone opens loud rice crackers beside a seventeenth-century screen.', timestamp: '2 hours ago', tags: ['Food', 'Museums', 'Safety'],
    poll: { question: 'Acceptable quiet-gallery snack?', options: [{ id: 'p15_1', text: 'Soft cake in cloth wrap', votes: 188 }, { id: 'p15_2', text: 'Pre-peeled orange segments', votes: 92 }, { id: 'p15_3', text: 'Anything eaten outside', votes: 241 }] , totalVotes: 521 }, reactions: { '❤️': 61, '😂': 173 }, userReactions: [], replies: []
  },
  {
    id: 'pulse_16', authorId: 'usr_hana_prasetyo', authorName: 'Hana Prasetyo', authorHandle: 'hanawandershome', type: 'tiny_win',
    title: 'The leftover washer found its purpose', body: 'Yesterday’s repair-date discussion became a group call. Daniel identified the washer, Grace diagnosed the plant shelf tilt, and nobody pretended the first attempt had been correct. Ideal teamwork.', timestamp: '3 hours ago',
    tags: ['TinyWin', 'Crafts', 'Community'], reactions: { '❤️': 151, '✨': 83 }, userReactions: [], replies: [{ id: 'rep_16_1', postId: 'pulse_16', authorId: 'usr_daniel_kim', authorName: 'Daniel Kim', authorHandle: 'danielbuildsshelves', body: 'For the record, the washer was innocent. The bracket had been installed upside down.', timestamp: '2 hours ago', likes: 67 }]
  },
  {
    id: 'pulse_17', authorId: 'usr_rafael_costa', authorName: 'Rafael Costa', authorHandle: 'rafontheradio', type: 'text',
    title: 'Twenty-six minutes without a narrator', body: 'Uploaded a night-walk recording to the sound room. No commentary, no lesson, no optimized emotional arc. Just tram wire, shoes on stone, and someone washing glasses behind an open window.', timestamp: '5 hours ago',
    tags: ['Mindfulness', 'Sound', 'NightWalk'], reactions: { '❤️': 89, '✨': 112 }, userReactions: [], replies: []
  },
  {
    id: 'pulse_18', authorId: 'usr_mina_okafor', authorName: 'Mina Okafor', authorHandle: 'minareadsmenus', type: 'poll',
    title: 'The cardamom-bun route requires a final ruling', body: 'Farah prioritizes books, Dev prioritizes crumb structure, and I prioritize not shouting over machinery. Democracy must now fail one of us.', timestamp: '6 hours ago', tags: ['Food', 'Books', 'FirstDates'],
    poll: { question: 'Route order?', options: [{ id: 'p18_1', text: 'Bookshop, buns, courtyard', votes: 216 }, { id: 'p18_2', text: 'Buns first, browse while sugared', votes: 179 }, { id: 'p18_3', text: 'Courtyard immediately', votes: 88 }], totalVotes: 483 }, reactions: { '❤️': 102, '😂': 94 }, userReactions: [], replies: []
  },
  {
    id: 'pulse_19', authorId: 'usr_grace_nguyen', authorName: 'Grace Nguyen', authorHandle: 'gracehasplants', type: 'science',
    title: 'Plant shopping is secretly a negotiation exercise', body: 'You discover budget, patience, transport planning, light conditions, and whether someone hears “this will become enormous” as information or a challenge.', timestamp: 'Yesterday',
    tags: ['RelationshipScience', 'Plants', 'Design'], reactions: { '💡': 119, '❤️': 87 }, userReactions: [], replies: []
  },
  {
    id: 'pulse_20', authorId: 'usr_camille_renaud', authorName: 'Camille Renaud', authorHandle: 'camillekeepsnotes', type: 'text',
    title: 'A small request for people sharing found notes', body: 'Photograph the note beside the object before moving it. Context is part of the story: which page held it, how it was folded, what faded around its edges. Farah’s train ticket is a perfect example.', timestamp: 'Yesterday',
    tags: ['Memory', 'Privacy', 'Archives'], reactions: { '💡': 145, '❤️': 66 }, userReactions: [], replies: []
  }
];
