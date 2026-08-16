import { Message, MessageThread } from '../types';

export const SEEDED_THREADS: MessageThread[] = [
  {
    id: 'th_hana_visitor',
    relationshipId: 'rel_7734_hana',
    participantIds: ['usr_hana_prasetyo', 'visitor_user'],
    unreadCount: 1,
    isArchived: false,
    title: 'Hana Prasetyo',
    storyUnlocked: true
  },
  {
    id: 'th_mina_visitor',
    relationshipId: 'rel_8821_mina',
    participantIds: ['usr_mina_okafor', 'visitor_user'],
    unreadCount: 0,
    isArchived: false,
    title: 'Mina Okafor',
    storyUnlocked: true
  },
  {
    id: 'th_naomi_visitor',
    relationshipId: 'rel_9918_naomi',
    participantIds: ['usr_naomi_serrano', 'visitor_user'],
    unreadCount: 0,
    isArchived: false,
    title: 'Naomi Serrano',
    storyUnlocked: true
  },
  {
    id: 'th_camille_visitor',
    relationshipId: 'rel_6645_camille',
    participantIds: ['usr_camille_renaud', 'visitor_user'],
    unreadCount: 0,
    isArchived: false,
    title: 'Camille Renaud',
    storyUnlocked: true
  },
  {
    id: 'th_morgan_visitor',
    relationshipId: 'rel_morgan_talking',
    participantIds: ['usr_morgan_bell', 'visitor_user'],
    unreadCount: 1,
    isArchived: false,
    title: 'Morgan Bell',
    storyUnlocked: true
  },
  {
    id: 'th_dev_visitor',
    relationshipId: 'rel_5512_dev',
    participantIds: ['usr_dev_malik', 'visitor_user'],
    unreadCount: 0,
    isArchived: false,
    title: 'Dev Malik',
    storyUnlocked: true
  },
  {
    id: 'th_leah_samuel_restored',
    relationshipId: 'rel_0712_leah',
    participantIds: ['usr_leah_morgan', 'usr_samuel_reed'],
    unreadCount: 0,
    isArchived: true,
    isHistorical: true,
    historicalPlatform: 'Affinity Room (2003)',
    title: 'Leah Morgan / Samuel Reed [RESTORED]',
    storyUnlocked: false
  },
  {
    id: 'th_meredith_nora_archive',
    relationshipId: 'rel_4417_meredith',
    participantIds: ['usr_meredith_cole', 'usr_nora_weiss'],
    unreadCount: 0,
    isArchived: true,
    isHistorical: true,
    historicalPlatform: 'Fold (2015)',
    title: 'Meredith Cole / Nora Weiss [ARCHIVED]',
    storyUnlocked: false
  },
  {
    id: 'th_previouslymatched_active',
    relationshipId: 'rel_2347_previouslymatched',
    participantIds: ['usr_previouslymatched', 'visitor_user'],
    unreadCount: 1,
    isArchived: false,
    title: '@previouslymatched',
    storyUnlocked: false
  }
];

export const SEEDED_MESSAGES: Record<string, Message[]> = {
  th_hana_visitor: [
    {
      id: 'msg_h1',
      threadId: 'th_hana_visitor',
      senderId: 'usr_hana_prasetyo',
      createdAt: '2026-08-16T10:14:00Z',
      displayTimestamp: '10:14 AM',
      body: 'I was just potting a small cutting from the greenhouse and I noticed your prompt about quiet mornings. Do you have a morning routine you protect, or does the world tend to rush in?'
    },
    {
      id: 'msg_h2',
      threadId: 'th_hana_visitor',
      senderId: 'visitor_user',
      createdAt: '2026-08-16T10:30:00Z',
      displayTimestamp: '10:30 AM',
      body: 'I try to keep the first forty minutes completely free of screens if I can manage it. Just tea or coffee and listening to the neighborhood wake up.'
    },
    {
      id: 'msg_h3',
      threadId: 'th_hana_visitor',
      senderId: 'usr_hana_prasetyo',
      createdAt: '2026-08-16T10:35:00Z',
      displayTimestamp: '10:35 AM',
      body: 'That sounds grounded. Actually, something strange happened on my app screen earlier. In our connection info, it listed a shared visit to the Japanese Garden in Portland from May 2022... before I even created this account. Have you noticed any weird timeline glitches on here?',
      dialogueChoices: [
        {
          choiceId: 'ch_hana_curious',
          label: 'Ask about the 2022 date glitch',
          userMessage: 'That’s really strange... Did it specify an exact day or relationship record ID?',
          responseDelayMs: 3000,
          botReply: 'Yes! It showed "REL-7734 / Milestone: Tea Pavilion". When I tapped it, the app refreshed and hid the card. It felt less like a bug and more like an old record leaking through.',
          unlockFlags: ['foundHanaGlitch', 'evidence_hana_leak']
        },
        {
          choiceId: 'ch_hana_calm',
          label: 'Reassure her and discuss gardens',
          userMessage: 'Probably just a cache bug from their recommendation algorithm. But the Portland Japanese Garden is wonderful either way.',
          responseDelayMs: 2500,
          botReply: 'You’re probably right... still, it gave me chills for a second. If you’re ever in Portland, I’d love to show you the cedar benches near the upper pond.'
        }
      ]
    }
  ],

  th_mina_visitor: [
    {
      id: 'msg_m1',
      threadId: 'th_mina_visitor',
      senderId: 'usr_mina_okafor',
      createdAt: '2026-08-15T19:22:00Z',
      displayTimestamp: 'Yesterday 7:22 PM',
      body: 'Okay, essential question before we go any further: if we were stuck in an airport terminal with a 4-hour delay, what is your survival snack strategy?'
    },
    {
      id: 'msg_m2',
      threadId: 'th_mina_visitor',
      senderId: 'visitor_user',
      createdAt: '2026-08-15T19:40:00Z',
      displayTimestamp: 'Yesterday 7:40 PM',
      body: 'Locate the newsstand with the weirdly specific local potato chips, buy two bottles of sparkling water, and find a gate that’s completely dark.'
    },
    {
      id: 'msg_m3',
      threadId: 'th_mina_visitor',
      senderId: 'usr_mina_okafor',
      createdAt: '2026-08-15T19:45:00Z',
      displayTimestamp: 'Yesterday 7:45 PM',
      body: 'Flawless response. High life-fit confirmed. By the way, have you looked at the Forecast tab yet? It mapped out our next 6 months with an eerie amount of confidence.'
    }
  ],

  th_naomi_visitor: [
    {
      id: 'msg_n1',
      threadId: 'th_naomi_visitor',
      senderId: 'usr_naomi_serrano',
      createdAt: '2026-08-14T18:10:00Z',
      displayTimestamp: 'Aug 14, 6:10 PM',
      body: 'Your profile caught my eye because of your note on architectural spaces. I spend half my life thinking about how color temperature changes how safe people feel in a room.'
    },
    {
      id: 'msg_n2',
      threadId: 'th_naomi_visitor',
      senderId: 'visitor_user',
      createdAt: '2026-08-14T19:00:00Z',
      displayTimestamp: 'Aug 14, 7:00 PM',
      body: 'Warm lighting transforms everything. Overhead harsh fluorescent light makes any space feel hostile.'
    },
    {
      id: 'msg_n3',
      threadId: 'th_naomi_visitor',
      senderId: 'usr_naomi_serrano',
      createdAt: '2026-08-14T19:15:00Z',
      displayTimestamp: 'Aug 14, 7:15 PM',
      body: 'Exactly. We should grab a glass of wine at Bar Gemini sometime next week if you’re free. They have dim amber sconces that actually let people converse without shouting.'
    }
  ],

  th_camille_visitor: [
    {
      id: 'msg_c1',
      threadId: 'th_camille_visitor',
      senderId: 'usr_camille_renaud',
      createdAt: '2026-08-13T14:00:00Z',
      displayTimestamp: 'Aug 13, 2:00 PM',
      body: 'I was reviewing some older documentation on database preservation. Did you know Everfold bought out the legacy archives of three defunct dating services from 1999, 2003, and 2008?',
      dialogueChoices: [
        {
          choiceId: 'ch_camille_ask_names',
          label: 'Ask for the platform names',
          userMessage: 'Which platforms were they? Are their old records still linked here?',
          responseDelayMs: 3000,
          botReply: 'Pairwise (1999), Affinity Room (2003), and Correspond (2008). In the code, they use an internal gate code: 0814. If you search that in the Archive, you can see the legacy schemas.',
          unlockFlags: ['gate0814ClueGiven', 'foundLegacyArchiveClue']
        },
        {
          choiceId: 'ch_camille_wonder',
          label: 'Express surprise about old data',
          userMessage: 'That’s nearly thirty years of dating data. Why would a 2026 app want records that old?',
          responseDelayMs: 2500,
          botReply: 'Because they believe relational dynamics repeat across generations. They aren’t tracking individual people; they are tracking recurring roles.'
        }
      ]
    }
  ],

  th_morgan_visitor: [
    {
      id: 'msg_mb1',
      threadId: 'th_morgan_visitor',
      senderId: 'usr_morgan_bell',
      createdAt: '2026-08-16T11:45:00Z',
      displayTimestamp: '11:45 AM',
      body: 'Hey. Have you exported your Everfold user data yet under Settings > Data & Archive?',
      dialogueChoices: [
        {
          choiceId: 'ch_morgan_export_yes',
          label: 'Tell Morgan you’ll look into the export',
          userMessage: 'I haven’t checked the raw JSON yet. What did you find in yours?',
          responseDelayMs: 3500,
          botReply: 'Look at the "relationship_created" timestamp compared to your "account_created" timestamp. In mine, the relationship UUID was instantiated in 2018... six years before I registered.',
          unlockFlags: ['foundMorganExportClue', 'visitorExportAnomaly']
        }
      ]
    }
  ],

  th_dev_visitor: [
    {
      id: 'msg_d1',
      threadId: 'th_dev_visitor',
      senderId: 'usr_dev_malik',
      createdAt: '2026-08-15T20:10:00Z',
      displayTimestamp: 'Yesterday 8:10 PM',
      body: 'Hey! Hope your weekend is going well. I’m experimenting with a new sourdough focaccia recipe topped with roasted rosemary and garlic confit. Would love to send a slice your way.'
    }
  ],

  th_leah_samuel_restored: [
    {
      id: 'msg_l_s_1',
      threadId: 'th_leah_samuel_restored',
      senderId: 'usr_samuel_reed',
      createdAt: '2003-05-18T19:40:00Z',
      displayTimestamp: 'May 18, 2003 (Affinity Room)',
      body: 'Leah, the shop delivered the marbled paper sheets from Florence today. The peacock pattern is exactly as you described.',
      sourcePlatform: 'Affinity Room (2003)'
    },
    {
      id: 'msg_l_s_2',
      threadId: 'th_leah_samuel_restored',
      senderId: 'usr_leah_morgan',
      createdAt: '2003-05-18T20:05:00Z',
      displayTimestamp: 'May 18, 2003 (Affinity Room)',
      body: 'Keep them flat under the press until tomorrow morning. I’ll make tea as soon as I arrive at the studio.',
      sourcePlatform: 'Affinity Room (2003)'
    },
    {
      id: 'msg_l_s_3',
      threadId: 'th_leah_samuel_restored',
      senderId: 'usr_samuel_reed',
      createdAt: '2026-08-10T03:14:00Z',
      displayTimestamp: 'Aug 10, 2026 03:14 AM [SYSTEM RESTORATION]',
      body: 'Connection maintained. Recurrence index: 3. Relational continuity confidence: 99.4%.',
      isSystemGenerated: true,
      isAnomalousTimestamp: true
    }
  ],

  th_meredith_nora_archive: [
    {
      id: 'msg_mn1',
      threadId: 'th_meredith_nora_archive',
      senderId: 'usr_meredith_cole',
      createdAt: '2015-08-22T21:15:00Z',
      displayTimestamp: 'Aug 22, 2015 (Fold)',
      body: 'Nora, I ran the longitudinal regression on our affinity vector. The model indicates we are occupying the same relational slot as Pairwise ID #4417 from 1999.'
    },
    {
      id: 'msg_mn2',
      threadId: 'th_meredith_nora_archive',
      senderId: 'usr_nora_weiss',
      createdAt: '2015-08-22T21:40:00Z',
      displayTimestamp: 'Aug 22, 2015 (Fold)',
      body: 'Meredith, you cannot reduce our shared years to a pre-existing vector slot. We chose each other.'
    },
    {
      id: 'msg_mn3',
      threadId: 'th_meredith_nora_archive',
      senderId: 'usr_meredith_cole',
      createdAt: '2015-08-22T22:01:00Z',
      displayTimestamp: 'Aug 22, 2015 (Fold)',
      body: 'Choice is the psychological experience of entering an already stabilized structural position. If I die first, watch who occupies my chair.'
    }
  ],

  th_previouslymatched_active: [
    {
      id: 'msg_pm1',
      threadId: 'th_previouslymatched_active',
      senderId: 'usr_previouslymatched',
      createdAt: '2026-08-16T12:13:37Z',
      displayTimestamp: 'Present',
      body: 'Your relationship continuity has been verified across four platform generations (1999, 2003, 2008, 2015, 2026). Current participant assignment: Confirmed.',
      dialogueChoices: [
        {
          choiceId: 'ch_pm_who',
          label: 'Who was in this slot before me?',
          userMessage: 'Who was the participant before me? Why does this relationship record exist?',
          responseDelayMs: 4000,
          botReply: 'The identity is transient; the union is invariant. Participant assignment confidence: 63%. Relationship continuity confidence: 99.8%. Final event: RETURN.',
          unlockFlags: ['foundPreviouslyMatchedTruth', 'final_sequence_unlocked']
        }
      ]
    }
  ]
};
