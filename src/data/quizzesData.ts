import {
  Quiz,
  DailyQuestion,
  ConversationStarterDeck,
} from '../types/socialEcosystem';

export const SEEDED_SOLO_QUIZZES: Quiz[] = [
  {
    id: 'quiz_social_battery',
    title: 'Social Battery & Quiet Spaces',
    description: 'Understand how you recharge after deep social events and what your ideal quiet coexistence looks like.',
    category: 'Know Yourself',
    estimatedMinutes: 3,
    resultType: 'archetype',
    storyTier: 0,
    profileEffects: [
      { badgeLabel: 'Recharges in Solitude', discoverBoostTag: 'Low-Stimulation Dates', datePlannerPreference: 'Quiet Cafes & Bookshops' },
    ],
    questions: [
      {
        id: 'sb_q1',
        prompt: 'After a four-hour group dinner, what is your immediate reflex?',
        type: 'single',
        options: [
          { id: 'opt_sb1_a', label: 'Slip away to a quiet room or head home immediately to decompress', scoreWeights: { introvert: 3, quiet: 2 } },
          { id: 'opt_sb1_b', label: 'Suggest moving to a quieter bar or late-night dessert with 1-2 close friends', scoreWeights: { ambivert: 3, balanced: 2 } },
          { id: 'opt_sb1_c', label: 'Keep the energy going into karaoke or a late walk through the city', scoreWeights: { extrovert: 3, energetic: 2 } },
        ],
      },
      {
        id: 'sb_q2',
        prompt: 'What does "parallel play" (sharing a room in silence) feel like to you?',
        type: 'single',
        options: [
          { id: 'opt_sb2_a', label: 'The highest tier of comfort in a partnership', scoreWeights: { introvert: 3, quiet: 3 } },
          { id: 'opt_sb2_b', label: 'Pleasant in short bursts, but I prefer interactive connection', scoreWeights: { ambivert: 2, balanced: 2 } },
          { id: 'opt_sb2_c', label: 'A bit lonely if we aren’t talking or doing something collaborative', scoreWeights: { extrovert: 2, energetic: 3 } },
        ],
      },
      {
        id: 'sb_q3',
        prompt: 'How do you handle plans when you wake up emotionally exhausted?',
        type: 'single',
        options: [
          { id: 'opt_sb3_a', label: 'Communicate honestly and ask to reschedule for low-stakes downtime', scoreWeights: { introvert: 2, quiet: 2 } },
          { id: 'opt_sb3_b', label: 'Show up for a shorter time with clear boundaries', scoreWeights: { ambivert: 3, balanced: 2 } },
          { id: 'opt_sb3_c', label: 'Usually going out ends up boosting my energy anyway', scoreWeights: { extrovert: 3, energetic: 2 } },
        ],
      },
    ],
  },
  {
    id: 'quiz_first_date_style',
    title: 'Your First Date Blueprint',
    description: 'Find out whether you thrive in structured cultural activities, cozy low-pressure coffee corners, or exploratory night walks.',
    category: 'First Dates',
    estimatedMinutes: 3,
    resultType: 'archetype',
    storyTier: 0,
    questions: [
      {
        id: 'fds_q1',
        prompt: 'What is the ideal duration for a first meeting?',
        type: 'single',
        options: [
          { id: 'opt_fds1_a', label: '45 to 60 minutes: easy exit or natural extension', scoreWeights: { low_pressure: 3 } },
          { id: 'opt_fds1_b', label: '2 to 3 hours: enough time to settle past surface chatter', scoreWeights: { immersive: 3 } },
          { id: 'opt_fds1_c', label: 'An open-ended afternoon that might turn into dinner', scoreWeights: { exploratory: 3 } },
        ],
      },
      {
        id: 'fds_q2',
        prompt: 'Which venue sounds like the least exhausting backdrop?',
        type: 'single',
        options: [
          { id: 'opt_fds2_a', label: 'A botanical conservatory or quiet gallery with built-in visual topics', scoreWeights: { exploratory: 3 } },
          { id: 'opt_fds2_b', label: 'A corner table at an independent neighborhood tea room', scoreWeights: { low_pressure: 3 } },
          { id: 'opt_fds2_c', label: 'A vinyl record listening bar with warm ambient lighting', scoreWeights: { immersive: 3 } },
        ],
      },
    ],
  },
  {
    id: 'quiz_texting_rhythm',
    title: 'Texting Cadence & Digital Presence',
    description: 'Are you an asynchronous letter writer, an instant banter exchanger, or a voice-note narrator?',
    category: 'Communication',
    estimatedMinutes: 2,
    resultType: 'archetype',
    storyTier: 0,
    questions: [
      {
        id: 'tr_q1',
        prompt: 'How quickly do you prefer to respond to everyday messages?',
        type: 'single',
        options: [
          { id: 'opt_tr1_a', label: 'When I have quiet mental space to craft a thoughtful reply (a few hours)', scoreWeights: { async_letter: 3 } },
          { id: 'opt_tr1_b', label: 'Rapid back-and-forth ping-pong when we are both online', scoreWeights: { instant_banter: 3 } },
          { id: 'opt_tr1_c', label: 'I send 2-minute voice memos while walking or cooking', scoreWeights: { voice_narrator: 3 } },
        ],
      },
      {
        id: 'tr_q2',
        prompt: 'What is your reaction to unannounced phone or video calls?',
        type: 'single',
        options: [
          { id: 'opt_tr2_a', label: 'Mild panic unless scheduled or an emergency', scoreWeights: { async_letter: 3 } },
          { id: 'opt_tr2_b', label: 'Pleasant surprise if we are already close', scoreWeights: { instant_banter: 2, voice_narrator: 2 } },
        ],
      },
    ],
  },
  {
    id: 'quiz_conflict_temperature',
    title: 'Conflict Temperature & Cooling Styles',
    description: 'Do you need immediate resolution, a 20-minute walk before speaking, or a written letter?',
    category: 'Communication',
    estimatedMinutes: 3,
    resultType: 'archetype',
    storyTier: 0,
    questions: [
      {
        id: 'ct_q1',
        prompt: 'When tension rises during a disagreement, what is your first impulse?',
        type: 'single',
        options: [
          { id: 'opt_ct1_a', label: 'Pause and take a 15-minute breather so words remain gentle', scoreWeights: { reflective: 3 } },
          { id: 'opt_ct1_b', label: 'Work through it right now until we both feel heard', scoreWeights: { immediate: 3 } },
          { id: 'opt_ct1_c', label: 'Write down my thoughts in bullet points to avoid misspeaking', scoreWeights: { epistolary: 3 } },
        ],
      },
    ],
  },
  {
    id: 'quiz_relationship_pace',
    title: 'The Unhurried Pace',
    description: 'Explore how quickly you like to move from initial matches to defined commitments.',
    category: 'Relationship Pace',
    estimatedMinutes: 3,
    resultType: 'archetype',
    storyTier: 0,
    questions: [
      {
        id: 'rp_q1',
        prompt: 'How many dates does it usually take for you to feel genuine emotional safety?',
        type: 'single',
        options: [
          { id: 'opt_rp1_a', label: '3 to 5 dates with consistent follow-through', scoreWeights: { deliberate: 2 } },
          { id: 'opt_rp1_b', label: 'Several months of observing actions across seasons', scoreWeights: { slow_burn: 3 } },
          { id: 'opt_rp1_c', label: 'It can happen on date one if the resonance is deep', scoreWeights: { intuitive: 3 } },
        ],
      },
    ],
  },
  {
    id: 'quiz_shared_space',
    title: 'Domestic Harmony & Shared Space',
    description: 'From kitchen counters to morning rhythms: how do you share physical surroundings?',
    category: 'Shared Life',
    estimatedMinutes: 3,
    resultType: 'archetype',
    storyTier: 0,
    questions: [
      {
        id: 'ss_q1',
        prompt: 'What is your non-negotiable domestic comfort?',
        type: 'single',
        options: [
          { id: 'opt_ss1_a', label: 'A clean sink before bedtime and uncluttered counters', scoreWeights: { structured: 3 } },
          { id: 'opt_ss1_b', label: 'Warm ambient lamps instead of overhead lighting', scoreWeights: { sensory: 3 } },
          { id: 'opt_ss1_c', label: 'A designated reading corner that belongs solely to me', scoreWeights: { independent: 3 } },
        ],
      },
    ],
  },
  {
    id: 'quiz_travel_compatibility',
    title: 'The Travel Rhythms Compass',
    description: 'Wandering with no itinerary or color-coded spreadsheet bookings?',
    category: 'Lifestyle',
    estimatedMinutes: 3,
    resultType: 'archetype',
    storyTier: 0,
    questions: [
      {
        id: 'tc_q1',
        prompt: 'On day one in a new city, what is your primary goal?',
        type: 'single',
        options: [
          { id: 'opt_tc1_a', label: 'Get lost in side streets and find a bakery with no English signage', scoreWeights: { wanderer: 3 } },
          { id: 'opt_tc1_b', label: 'Follow a curated list of architectural landmarks and reservations', scoreWeights: { planner: 3 } },
          { id: 'opt_tc1_c', label: 'Unpack completely at the hotel and find the best local coffee shop', scoreWeights: { nest_first: 3 } },
        ],
      },
    ],
  },
  {
    id: 'quiz_dependability',
    title: 'What Makes Someone Dependable?',
    description: 'Examine the small actions and promises that build lasting relational trust.',
    category: 'Dating Style',
    estimatedMinutes: 3,
    resultType: 'archetype',
    storyTier: 0,
    questions: [
      {
        id: 'dep_q1',
        prompt: 'Which gesture makes you feel most profoundly respected?',
        type: 'single',
        options: [
          { id: 'opt_dep1_a', label: 'Remembering a small detail I mentioned in passing two weeks ago', scoreWeights: { attentive: 3 } },
          { id: 'opt_dep1_b', label: 'Always arriving exactly when promised without making excuses', scoreWeights: { punctuality: 3 } },
          { id: 'opt_dep1_c', label: 'Protecting my boundaries in social settings without being asked', scoreWeights: { protective: 3 } },
        ],
      },
    ],
  },
  {
    id: 'quiz_weekend_blueprint',
    title: 'The Perfect Sunday Blueprint',
    description: 'Assemble your dream rest day and see how your recovery style aligns with matches.',
    category: 'Just for Fun',
    estimatedMinutes: 2,
    resultType: 'archetype',
    storyTier: 0,
    questions: [
      {
        id: 'ps_q1',
        prompt: 'Sunday morning at 10:00 AM:',
        type: 'single',
        options: [
          { id: 'opt_ps1_a', label: 'Brewing pour-over coffee, listening to an old vinyl record, no shoes', scoreWeights: { slow_ritual: 3 } },
          { id: 'opt_ps1_b', label: 'At the farmers market picking up sourdough and fresh herbs', scoreWeights: { market_stroll: 3 } },
          { id: 'opt_ps1_c', label: 'On a trail walk with a thermos before the crowds arrive', scoreWeights: { nature_first: 3 } },
        ],
      },
    ],
  },
  {
    id: 'quiz_memory_keepers',
    title: 'How You Preserve Memories',
    description: 'Do you keep ticket stubs in a tin, take 500 phone photos, or hold it purely in sentiment?',
    category: 'Know Yourself',
    estimatedMinutes: 2,
    resultType: 'archetype',
    storyTier: 0,
    questions: [
      {
        id: 'mk_q1',
        prompt: 'When you look back on a memorable trip, what brings it back fastest?',
        type: 'single',
        options: [
          { id: 'opt_mk1_a', label: 'A physical artifact: a pressed leaf, a receipt, a postcard', scoreWeights: { archival: 3 } },
          { id: 'opt_mk1_b', label: 'A specific playlist or scent in the air', scoreWeights: { sensory: 3 } },
          { id: 'opt_mk1_c', label: 'Journal entries written while the feeling was fresh', scoreWeights: { epistolary: 3 } },
        ],
      },
    ],
  },
  // --- ADDITIONAL SOLO QUIZZES (15 more to reach 25+) ---
  {
    id: 'quiz_affection_language',
    title: 'Nuances of Daily Affection',
    description: 'The subtle micro-gestures that make a shared apartment feel like home.',
    category: 'Dating Style',
    estimatedMinutes: 3,
    resultType: 'archetype',
    storyTier: 0,
    questions: [
      {
        id: 'aff_q1',
        prompt: 'Which micro-gesture brings the quickest warmth?',
        type: 'single',
        options: [
          { id: 'opt_aff1_a', label: 'Bringing a fresh cup of tea without asking how I take it', scoreWeights: { service: 3 } },
          { id: 'opt_aff1_b', label: 'A hand placed gently on my back while cooking dinner', scoreWeights: { touch: 3 } },
          { id: 'opt_aff1_c', label: 'Leaving a sticky note on my notebook', scoreWeights: { words: 3 } },
        ],
      },
    ],
  },
  {
    id: 'quiz_sleep_schedules',
    title: 'Sleep Rhythms & Dark Rooms',
    description: 'Night owls, dawn risers, window crackers, and white noise enthusiasts.',
    category: 'Lifestyle',
    estimatedMinutes: 2,
    resultType: 'archetype',
    storyTier: 0,
    questions: [
      {
        id: 'slp_q1',
        prompt: 'Your ideal bedroom environment:',
        type: 'single',
        options: [
          { id: 'opt_slp1_a', label: 'Freezing cold, pitch black, heavy duvet', scoreWeights: { cave: 3 } },
          { id: 'opt_slp1_b', label: 'A window cracked open for rain sounds and cool breeze', scoreWeights: { open_air: 3 } },
        ],
      },
    ],
  },
  {
    id: 'quiz_dinner_decision',
    title: 'The Dinner Decision Matrix',
    description: 'How do you solve "What do you want to eat tonight?" without endless back-and-forth?',
    category: 'Just for Fun',
    estimatedMinutes: 2,
    resultType: 'archetype',
    storyTier: 0,
    questions: [
      {
        id: 'dd_q1',
        prompt: 'When neither person knows what they want:',
        type: 'single',
        options: [
          { id: 'opt_dd1_a', label: 'Use the "Rule of 5-2-1" to eliminate options rapidly', scoreWeights: { systematic: 3 } },
          { id: 'opt_dd1_b', label: 'Walk out the front door and stop at the first fragrant restaurant', scoreWeights: { intuitive: 3 } },
        ],
      },
    ],
  },
  {
    id: 'quiz_gift_giving',
    title: 'The Art of Gift Giving',
    description: 'Practical upgrades, handwritten keepsakes, or shared experiential surprises?',
    category: 'Shared Life',
    estimatedMinutes: 2,
    resultType: 'archetype',
    storyTier: 0,
    questions: [
      {
        id: 'gg_q1',
        prompt: 'The best gift you ever received was:',
        type: 'single',
        options: [
          { id: 'opt_gg1_a', label: 'A book with annotations in the margins', scoreWeights: { thoughtful: 3 } },
          { id: 'opt_gg1_b', label: 'Train tickets for a surprise weekend getaway', scoreWeights: { experiential: 3 } },
        ],
      },
    ],
  },
  {
    id: 'quiz_vulnerability_pace',
    title: 'How Quickly Do You Open Up?',
    description: 'Examine your emotional defense mechanisms and safety gates.',
    category: 'Know Yourself',
    estimatedMinutes: 3,
    resultType: 'archetype',
    storyTier: 0,
    questions: [
      {
        id: 'vul_q1',
        prompt: 'When sharing an old regret or childhood fear:',
        type: 'single',
        options: [
          { id: 'opt_vul1_a', label: 'I wait until I have seen how they treat others during stress', scoreWeights: { guarded: 3 } },
          { id: 'opt_vul1_b', label: 'I share easily if there is mutual vulnerability early on', scoreWeights: { open: 3 } },
        ],
      },
    ],
  },
  {
    id: 'quiz_bookstore_walk',
    title: 'The Bookstore Date Compatibility',
    description: 'What section do you vanish into when left alone for 20 minutes?',
    category: 'First Dates',
    estimatedMinutes: 2,
    resultType: 'archetype',
    storyTier: 0,
    questions: [
      {
        id: 'bw_q1',
        prompt: 'Left alone in an independent bookstore, you head directly for:',
        type: 'single',
        options: [
          { id: 'opt_bw1_a', label: 'Essays, philosophy, and poetry in translation', scoreWeights: { contemplative: 3 } },
          { id: 'opt_bw1_b', label: 'Cookbooks, architecture, and design monographs', scoreWeights: { aesthetic: 3 } },
          { id: 'opt_bw1_c', label: 'Local history, maps, and vintage print archives', scoreWeights: { archival: 3 } },
        ],
      },
    ],
  },
  {
    id: 'quiz_spontaneous_plans',
    title: 'Spontaneity vs. Calendar Precision',
    description: 'Can you handle a "pack a bag in 30 minutes" text or do you need 48-hour notice?',
    category: 'Lifestyle',
    estimatedMinutes: 2,
    resultType: 'archetype',
    storyTier: 0,
    questions: [
      {
        id: 'sp_q1',
        prompt: 'A match texts at 6:00 PM on Tuesday: "Dinner in 45 minutes?"',
        type: 'single',
        options: [
          { id: 'opt_sp1_a', label: 'Delightful! I will get ready right away', scoreWeights: { spontaneous: 3 } },
          { id: 'opt_sp1_b', label: 'Stressful. I need time to mentally shift gears from work', scoreWeights: { planned: 3 } },
        ],
      },
    ],
  },
  {
    id: 'quiz_queer_community',
    title: 'Queer Belonging & Chosen Family',
    description: 'How chosen family, community events, and shared history shape your dating life.',
    category: 'Compatibility',
    estimatedMinutes: 3,
    resultType: 'archetype',
    storyTier: 0,
    questions: [
      {
        id: 'qc_q1',
        prompt: 'How central is your chosen family network to your romantic life?',
        type: 'single',
        options: [
          { id: 'opt_qc1_a', label: 'My partner must comfortably integrate into our dinner circle', scoreWeights: { community_centered: 3 } },
          { id: 'opt_qc1_b', label: 'I prefer maintaining independent spheres between romance and friends', scoreWeights: { independent: 3 } },
        ],
      },
    ],
  },
  {
    id: 'quiz_grief_dating',
    title: 'Holding Space for Past Loss',
    description: 'Dating when love has previously been ended by loss rather than falling out of love.',
    category: 'Relationship Pace',
    estimatedMinutes: 3,
    resultType: 'archetype',
    storyTier: 0,
    questions: [
      {
        id: 'gd_q1',
        prompt: 'When speaking about past partners who have passed:',
        type: 'single',
        options: [
          { id: 'opt_gd1_a', label: 'Their memory is a permanent, honored part of my room and story', scoreWeights: { honored: 3 } },
          { id: 'opt_gd1_b', label: 'I speak about them only when profound trust is established', scoreWeights: { gentle: 3 } },
        ],
      },
    ],
  },
  {
    id: 'quiz_digital_boundaries',
    title: 'Social Media & Relationship Privacy',
    description: 'Soft launches, hard launches, or keeping the whole relationship offline?',
    category: 'Communication',
    estimatedMinutes: 2,
    resultType: 'archetype',
    storyTier: 0,
    questions: [
      {
        id: 'db_q1',
        prompt: 'Your policy on posting your partner online:',
        type: 'single',
        options: [
          { id: 'opt_db1_a', label: 'Completely offline: our intimacy belongs in our living room', scoreWeights: { private: 3 } },
          { id: 'opt_db1_b', label: 'Subtle photos of hands, coffee cups, and landscapes', scoreWeights: { soft_launch: 3 } },
        ],
      },
    ],
  },
  // --- ARG / LORE-GATED QUIZZES (Unlocked at higher story tiers) ---
  {
    id: 'quiz_familiar_stranger',
    title: 'How Familiar Can a Stranger Feel?',
    description: 'Examine instances where an encounter with someone new felt unsettlingly familiar.',
    category: 'Know Yourself',
    estimatedMinutes: 3,
    resultType: 'archetype',
    storyTier: 4,
    unlockRequirements: ['gate_0814_legacy'],
    questions: [
      {
        id: 'fs_q1',
        prompt: 'Have you ever sat across from someone on date one and known their cadence before they finished speaking?',
        type: 'single',
        options: [
          { id: 'opt_fs1_a', label: 'Yes, as though reading from a transcript I had memorized years ago', scoreWeights: { recurrence: 3 } },
          { id: 'opt_fs1_b', label: 'It is just deep linguistic and behavioral pattern matching', scoreWeights: { rational: 3 } },
        ],
      },
    ],
  },
  {
    id: 'quiz_missed_before_meeting',
    title: 'Missing What Has Not Yet Arrived',
    description: 'A study on anticipatory longing and persistent structural absence.',
    category: 'Know Yourself',
    estimatedMinutes: 3,
    resultType: 'archetype',
    storyTier: 5,
    unlockRequirements: ['gate_pairwise_export'],
    questions: [
      {
        id: 'mbm_q1',
        prompt: 'When entering an empty apartment after a long week, what does the silence feel like?',
        type: 'single',
        options: [
          { id: 'opt_mbm1_a', label: 'A vacant chair waiting for a specific occupant who has not registered yet', scoreWeights: { slot_preallocated: 3 } },
          { id: 'opt_mbm1_b', label: 'Peaceful, restorative personal sanctuary', scoreWeights: { independent: 3 } },
        ],
      },
    ],
  },
  {
    id: 'quiz_return_invariants',
    title: 'Which Parts of Love Are Invariant?',
    description: 'When circumstances, cities, and platforms change: what remains constant?',
    category: 'Compatibility',
    estimatedMinutes: 3,
    resultType: 'archetype',
    storyTier: 6,
    unlockRequirements: ['gate_return_solved'],
    questions: [
      {
        id: 'ri_q1',
        prompt: 'If two people are separated for twenty years and cross paths on a rainy crosswalk:',
        type: 'single',
        options: [
          { id: 'opt_ri1_a', label: 'The relational container re-instantiates instantly with \(R \ge 0.972\)', scoreWeights: { markov_invariant: 3 } },
          { id: 'opt_ri1_b', label: 'They are complete strangers who must start over from zero', scoreWeights: { clean_slate: 3 } },
        ],
      },
    ],
  },
  {
    id: 'quiz_book_taste',
    title: 'Literary & Reading Archetype',
    description: 'Find out whether your bookshelf leans toward poetic essays, architectural monographs, or vintage sci-fi.',
    category: 'Lifestyle',
    estimatedMinutes: 3,
    resultType: 'archetype',
    storyTier: 0,
    questions: [
      {
        id: 'qbt_q1',
        prompt: 'What kind of bookstore do you get lost in for hours?',
        type: 'single',
        options: [
          { id: 'opt_qbt1_a', label: 'Crammed secondhand shops with floor-to-ceiling stacks', scoreWeights: { archivist: 3 } },
          { id: 'opt_qbt1_b', label: 'Modern design and art bookshops with espresso', scoreWeights: { modernist: 3 } },
        ],
      },
    ],
  },
  {
    id: 'quiz_tea_rituals',
    title: 'Evening Tea & Night Pacing',
    description: 'Understand how you transition from workday bustle into midnight serenity.',
    category: 'Lifestyle',
    estimatedMinutes: 2,
    resultType: 'archetype',
    storyTier: 0,
    questions: [
      {
        id: 'qtr_q1',
        prompt: 'What is your beverage of choice at 10:30 PM?',
        type: 'single',
        options: [
          { id: 'opt_qtr1_a', label: 'Steaming roasted barley or chamomile tea', scoreWeights: { calm: 3 } },
          { id: 'opt_qtr1_b', label: 'Ice water with lemon while finishing reading', scoreWeights: { quiet: 3 } },
        ],
      },
    ],
  },
  {
    id: 'quiz_walking_pace',
    title: 'Pedestrian Rhythm & City Strolls',
    description: 'How you navigate city sidewalks, bridges, and parks with a companion.',
    category: 'First Dates',
    estimatedMinutes: 2,
    resultType: 'archetype',
    storyTier: 0,
    questions: [
      {
        id: 'qwp_q1',
        prompt: 'When walking through an unfamiliar neighborhood:',
        type: 'single',
        options: [
          { id: 'opt_qwp1_a', label: 'Slow meandering pace, stopping at every curious doorway', scoreWeights: { wanderer: 3 } },
          { id: 'opt_qwp1_b', label: 'Brisk stride toward a specific quiet cafe or park bench', scoreWeights: { purposeful: 3 } },
        ],
      },
    ],
  },
];

export const SEEDED_TOGETHER_QUIZZES: Quiz[] = [
  {
    id: 'together_conflict_align',
    title: 'Together: Conflict & Repair Alignment',
    description: 'Both participants answer privately; reveal your shared overlap and differences once both finish.',
    category: 'Together',
    estimatedMinutes: 4,
    isTogether: true,
    resultType: 'compatibility',
    storyTier: 0,
    questions: [
      {
        id: 'tca_q1',
        prompt: 'When you are hurt by something small, how do you prefer to bring it up?',
        type: 'single',
        options: [
          { id: 'opt_tca1_a', label: 'Immediately in the moment with gentle humor', scoreWeights: { immediate: 2 } },
          { id: 'opt_tca1_b', label: 'Later that evening over a quiet cup of tea', scoreWeights: { tea_talk: 2 } },
          { id: 'opt_tca1_c', label: 'Send a thoughtful text message first so they have time to digest', scoreWeights: { async_text: 2 } },
        ],
      },
      {
        id: 'tca_q2',
        prompt: 'What constitutes a genuine apology to you?',
        type: 'single',
        options: [
          { id: 'opt_tca2_a', label: 'Acknowledging the specific emotional impact, not just intentions', scoreWeights: { impact_focus: 3 } },
          { id: 'opt_tca2_b', label: 'Changed behavior over the next three months', scoreWeights: { action_focus: 3 } },
        ],
      },
    ],
  },
  {
    id: 'together_ideal_sunday',
    title: 'Together: Assembling Sunday Morning',
    description: 'Design your shared morning ritual and discover where your peaceful rhythms meet.',
    category: 'Together',
    estimatedMinutes: 3,
    isTogether: true,
    resultType: 'compatibility',
    storyTier: 0,
    questions: [
      {
        id: 'tis_q1',
        prompt: 'Who makes the first pot of coffee or tea?',
        type: 'single',
        options: [
          { id: 'opt_tis1_a', label: 'Whoever wakes up first brings a mug to the other in bed', scoreWeights: { service: 3 } },
          { id: 'opt_tis1_b', label: 'We walk down to the neighborhood corner bakery together in silence', scoreWeights: { walk: 3 } },
        ],
      },
    ],
  },
  {
    id: 'together_travel_style',
    title: 'Together: Packing the Suitcase',
    description: 'Are you matching carry-on minimalist packers or checking heavy luggage full of books?',
    category: 'Together',
    estimatedMinutes: 3,
    isTogether: true,
    resultType: 'compatibility',
    storyTier: 0,
    questions: [
      {
        id: 'tts_q1',
        prompt: 'Airport arrival strategy:',
        type: 'single',
        options: [
          { id: 'opt_tts1_a', label: '3 hours early, settled with books past security without adrenaline', scoreWeights: { calm: 3 } },
          { id: 'opt_tts1_b', label: '50 minutes before boarding: efficiency is an art form', scoreWeights: { rush: 3 } },
        ],
      },
    ],
  },
  {
    id: 'together_household_rhythm',
    title: 'Together: Domestic Harmony & Coexistence',
    description: 'Align on cleaning rhythms, grocery rituals, and kitchen territory.',
    category: 'Together',
    estimatedMinutes: 3,
    isTogether: true,
    resultType: 'compatibility',
    storyTier: 0,
    questions: [
      {
        id: 'thr_q1',
        prompt: 'When dirty dishes appear in the sink:',
        type: 'single',
        options: [
          { id: 'opt_thr1_a', label: 'Washed and dried immediately after eating', scoreWeights: { neat: 3 } },
          { id: 'opt_thr1_b', label: 'Soaked and cleared in one batch before bed', scoreWeights: { relaxed: 3 } },
        ],
      },
    ],
  },
  {
    id: 'together_food_preferences',
    title: 'Together: Pantry Staples & Cooking Harmony',
    description: 'Cooking together vs parallel takeout nights.',
    category: 'Together',
    estimatedMinutes: 3,
    isTogether: true,
    resultType: 'compatibility',
    storyTier: 0,
    questions: [
      {
        id: 'tfp_q1',
        prompt: 'Cooking together on a Friday evening:',
        type: 'single',
        options: [
          { id: 'opt_tfp1_a', label: 'One head chef, one sous chef with clean division of labor', scoreWeights: { structure: 3 } },
          { id: 'opt_tfp1_b', label: 'Chaotic collaborative improvisation with wine', scoreWeights: { playful: 3 } },
        ],
      },
    ],
  },
  {
    id: 'together_where_first_met',
    title: 'Together: Where Did We First Meet?',
    description: 'A shared memory calibration exercise.',
    category: 'Together',
    estimatedMinutes: 3,
    isTogether: true,
    resultType: 'compatibility',
    storyTier: 5,
    unlockRequirements: ['gate_role_resolver_solved'],
    questions: [
      {
        id: 'wfm_q1',
        prompt: 'Where was the location of our earliest recorded encounter?',
        type: 'single',
        options: [
          { id: 'opt_wfm1_a', label: 'On Everfold in April 2026', scoreWeights: { modern: 2 } },
          { id: 'opt_wfm1_b', label: 'At a bookbindery workshop in Boston in July 2003 (#0712)', scoreWeights: { predecessor: 3 } },
          { id: 'opt_wfm1_c', label: 'In the Pairwise flat-file allocation table (August 14, 1999)', scoreWeights: { inception: 3 } },
        ],
      },
    ],
  },
];

export const SEEDED_DAILY_QUESTIONS: DailyQuestion[] = [
  {
    id: 'dq_01',
    dayIndex: 0,
    prompt: 'What tiny habit instantly makes you feel safe around someone new?',
    category: 'Connection',
    suggestedAnswers: [
      'When they pause to let me finish a sentence after an interruption',
      'When their walking pace naturally slows down to match mine',
      'When they ask how I take my tea before making the kettle boil',
    ],
  },
  {
    id: 'dq_02',
    dayIndex: 1,
    prompt: 'What oddly specific green flag do you cherish in friendships or dates?',
    category: 'Appreciation',
    suggestedAnswers: [
      'Sending a photo of a book because they know the author is my favorite',
      'Not looking at their watch or phone during dinner',
      'Comfortable silence in the car during rain',
    ],
  },
  {
    id: 'dq_03',
    dayIndex: 2,
    prompt: 'What meal or dish instantly feels like home to you?',
    category: 'Comfort',
    suggestedAnswers: [
      'A bowl of homemade lentil soup with warm sourdough',
      'Steaming jasmine rice with fried shallots and chili oil',
      'Peanut butter toast eaten at 11:30 PM over the counter',
    ],
  },
  {
    id: 'dq_04',
    dayIndex: 3,
    prompt: 'What makes a difficult conversation significantly easier for you?',
    category: 'Communication',
    suggestedAnswers: [
      'Sitting side-by-side on a bench instead of staring across a table',
      'Taking a 10-minute walk first to calm the nervous system',
      'Starting with: "I care about this connection, which is why I want to talk about this"',
    ],
  },
  {
    id: 'dq_05',
    dayIndex: 4,
    prompt: 'Where would you happily disappear for an uninterrupted 48-hour weekend?',
    category: 'Daydreams',
    suggestedAnswers: [
      'A wooden cabin in the misty hills with a wood stove and 6 unread novels',
      'A quiet coastal town in the off-season when the fog settles over the pier',
      'My own living room with all notifications disabled and groceries stocked',
    ],
  },
  { id: 'dq_06', dayIndex: 5, prompt: 'What song immediately brings back a specific memory from 10 years ago?', category: 'Memory', suggestedAnswers: ['Late night driving soundtrack', 'Acoustic guitar instrumental', 'Old indie folk anthem'] },
  { id: 'dq_07', dayIndex: 6, prompt: 'What is your favorite sensory detail of an autumn evening?', category: 'Sensory', suggestedAnswers: ['Woodsmoke in crisp air', 'Warm cider with cinnamon', 'Wool sweaters and amber streetlamps'] },
  { id: 'dq_08', dayIndex: 7, prompt: 'How do you prefer someone to comfort you when you are sad?', category: 'Care', suggestedAnswers: ['Gentle physical presence without needing to talk', 'A warm bowl of food and space', 'Talking through the root of the feeling'] },
  { id: 'dq_09', dayIndex: 8, prompt: 'What is a small goal you are quietly working towards right now?', category: 'Aspirations', suggestedAnswers: ['Finishing a difficult project', 'Learning a practical craft', 'Slowing down my mornings'] },
  { id: 'dq_10', dayIndex: 9, prompt: 'What is your favorite room or corner in your home and why?', category: 'Sanctuary', suggestedAnswers: ['The window seat with morning sunlight', 'The kitchen island late at night', 'The bookshelf corner with the warm lamp'] },
  { id: 'dq_11', dayIndex: 10, prompt: 'What boundary took you the longest to learn how to uphold kindly?', category: 'Growth', suggestedAnswers: ['Saying no without over-explaining', 'Leaving social events early', 'Protecting my recovery mornings'] },
  { id: 'dq_12', dayIndex: 11, prompt: 'What was your favorite book as a teenager?', category: 'Roots', suggestedAnswers: ['Classic mystery or sci-fi', 'Poetry or coming-of-age fiction', 'Natural history essays'] },
  { id: 'dq_13', dayIndex: 12, prompt: 'What is the most thoughtful compliment someone has ever paid you?', category: 'Affection', suggestedAnswers: ['"You make quiet rooms feel peaceful"', '"You really listen when people speak"', '"Your perspective helped me heal"'] },
  { id: 'dq_14', dayIndex: 13, prompt: 'What does a restful Sunday morning look like in your ideal week?', category: 'Ritual', suggestedAnswers: ['Pour-over coffee and sourdough toast', 'A slow walk through the park before shops open', 'Reading chapters without an alarm'] },
  { id: 'dq_15', dayIndex: 14, prompt: 'What is an odd or specialized topic you could talk about for an hour?', category: 'Curiosity', suggestedAnswers: ['Bookbinding paper conservation', 'Architectural restoration history', 'Bicycle mechanics and frame geometry'] },
  { id: 'dq_16', dayIndex: 15, prompt: 'How do you know when you feel truly emotionally relaxed around someone?', category: 'Safety', suggestedAnswers: ['I stop monitoring my facial expressions', 'I can sit in silence for twenty minutes', 'I laugh without hesitation'] },
  { id: 'dq_17', dayIndex: 16, prompt: 'What is a piece of advice you are glad you ignored?', category: 'Wisdom', suggestedAnswers: ['"Always keep your options open"', '"Hustle in your twenties"', '"Follow the fastest path"'] },
  { id: 'dq_18', dayIndex: 17, prompt: 'What is your favorite kind of rainy day activity?', category: 'Comfort', suggestedAnswers: ['Baking bread or stew', 'Listening to rain against the glass while working', 'Going to a museum gallery'] },
  { id: 'dq_19', dayIndex: 18, prompt: 'What is a small tradition you want to build in a partnership?', category: 'Shared Life', suggestedAnswers: ['Friday evening pasta and candles', 'Annual handwritten anniversary letters', 'A monthly weekend day with no phones'] },
  { id: 'dq_20', dayIndex: 19, prompt: 'What texture or sound instantly relaxes your nervous system?', category: 'Sensory', suggestedAnswers: ['Heavy rain on a metal roof', 'Linen sheets and wool blankets', 'A cello playing low octave chords'] },
  { id: 'dq_21', dayIndex: 20, prompt: 'What question do you wish people asked you more often?', category: 'Depth', suggestedAnswers: ['"What are you currently reading?"', '"How is your heart feeling today?"', '"What was your favorite part of this week?"'] },
  { id: 'dq_22', dayIndex: 21, prompt: 'What is your favorite way to spend an unexpected free afternoon?', category: 'Spontaneity', suggestedAnswers: ['Wandering into a secondhand bookstore', 'Sitting on a park bench watching dogs', 'Riding the tram to the end of the line'] },
  { id: 'dq_23', dayIndex: 22, prompt: 'What values guide your most enduring friendships?', category: 'Friendship', suggestedAnswers: ['Steadiness through life phases', 'Kind honesty without competition', 'Unhurried check-ins'] },
  { id: 'dq_24', dayIndex: 23, prompt: 'What is something simple that always brings you wonder?', category: 'Wonder', suggestedAnswers: ['The pattern of tree branches against dusk', 'Handmade paper deckle edges', 'The smell of old library stacks'] },
  { id: 'dq_25', dayIndex: 24, prompt: 'How do you handle apologies and restorative moments?', category: 'Reparation', suggestedAnswers: ['Acknowledge the impact directly', 'Offer clear behavioral adjustment', 'Give space for emotional integration'] },
  { id: 'dq_26', dayIndex: 25, prompt: 'What is your favorite kind of stationery or written correspondence?', category: 'Letters', suggestedAnswers: ['Heavy cotton postcard with fountain pen ink', 'Typewritten note on onionskin paper', 'Folded index card with a pressed leaf'] },
  { id: 'dq_27', dayIndex: 26, prompt: 'What is a landscape that feels like your soul’s home terrain?', category: 'Landscape', suggestedAnswers: ['Misty Atlantic coastlines with granite rocks', 'Pine forests in Northern winters', 'Rolling hills in late summer dusk'] },
  { id: 'dq_28', dayIndex: 27, prompt: 'What has getting older made you softer towards?', category: 'Forgiveness', suggestedAnswers: ['People making mistakes when overwhelmed', 'My younger self trying to figure things out', 'The slow pace of real change'] },
  { id: 'dq_29', dayIndex: 28, prompt: 'What is a craft or object in your home that has a story behind it?', category: 'Artifacts', suggestedAnswers: ['A ceramic mug purchased from a potter in Maine', 'A repaired pocket knife passed down from my grandfather', 'A hand-woven throw blanket'] },
  { id: 'dq_30', dayIndex: 29, prompt: 'What does "continuity" mean to you when thinking about lasting love?', category: 'Philosophy', suggestedAnswers: ['Choosing the same person with fresh curiosity every morning', 'A shared vocabulary built over decades', 'A quiet shelter against the noise of the world'] },
];

export const CONVERSATION_STARTER_DECKS: ConversationStarterDeck[] = [
  {
    id: 'deck_curious',
    name: 'Quiet Curiosity',
    category: 'Curious',
    cards: [
      'What book or piece of music permanently shifted how you view your twenties?',
      'Is there an ordinary chore you find strangely restorative?',
      'What is a craft or skill you would spend three years learning if time paused?',
      'What was the best cup of coffee or tea you have ever had in your life?',
      'What childhood habit do you still secretly perform when nobody is watching?',
    ],
  },
  {
    id: 'deck_deep',
    name: 'Deep Resonances',
    category: 'Deep',
    cards: [
      'What does "being remembered" look like in your daily life?',
      'How have your ideas of loyalty changed between age 18 and today?',
      'What is a grief you carry that has turned into quiet gratitude?',
      'When do you feel most authentically yourself: morning, dusk, or midnight?',
      'Have you ever felt nostalgic for a year you were not alive to see?',
    ],
  },
  {
    id: 'deck_silly',
    name: 'Lighthearted & Defiant',
    category: 'Silly',
    cards: [
      'What food combination would you defend in a Supreme Court trial?',
      'What is your most irrational, petty pet peeve in public transit?',
      'If you had to be banned from one store for life, which would cause the least inconvenience?',
      'What mundane fictional item from a book do you wish existed in your kitchen?',
    ],
  },
];
