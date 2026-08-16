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
  }
];
