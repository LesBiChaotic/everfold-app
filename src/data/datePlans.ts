import { DatePlan } from '../types';

export const SEEDED_DATE_PLANS: DatePlan[] = [
  {
    id: 'dp_hana_greenhouse',
    relationshipId: 'rel_7734_hana',
    matchUserId: 'usr_hana_prasetyo',
    mood: 'Quiet',
    activityType: 'Botanical Walk & Tea',
    venueName: 'Portland Japanese Garden & Tea Pavilion',
    venueAddress: '611 SW Kingston Ave, Portland, OR',
    venueCategory: 'park',
    scheduledDate: '2026-08-22',
    scheduledTime: '10:00 AM',
    scheduleFitScore: 98,
    comfortNotes: ['Paved accessible paths', 'Quiet ambient soundscape', 'Outdoor fresh air'],
    safetyCheckInIntervalMinutes: 60,
    status: 'Confirmed',
    previouslyVisitedAnomaly: false,
    createdAt: '2026-08-14T11:00:00Z'
  },
  {
    id: 'dp_mina_dinner',
    relationshipId: 'rel_8821_mina',
    matchUserId: 'usr_mina_okafor',
    mood: 'Food',
    activityType: 'Dinner & Menu Discussion',
    venueName: 'The Walrus and the Carpenter',
    venueAddress: '4743 Ballard Ave NW, Seattle, WA',
    venueCategory: 'casual dinner',
    scheduledDate: '2026-08-23',
    scheduledTime: '7:30 PM',
    scheduleFitScore: 92,
    comfortNotes: ['Bar counter seating', 'Gluten-free options available'],
    safetyCheckInIntervalMinutes: 90,
    status: 'Confirmed',
    previouslyVisitedAnomaly: false,
    createdAt: '2026-08-15T16:20:00Z'
  },
  {
    id: 'dp_naomi_gallery',
    relationshipId: 'rel_9918_naomi',
    matchUserId: 'usr_naomi_serrano',
    mood: 'Arts',
    activityType: 'Evening Lighting Exhibition',
    venueName: 'SFMOMA Contemporary Wing & Bar Gemini',
    venueAddress: '151 3rd St / 2845 19th St, San Francisco, CA',
    venueCategory: 'gallery',
    scheduledDate: '2026-08-25',
    scheduledTime: '6:00 PM',
    scheduleFitScore: 95,
    comfortNotes: ['Dim warm ambient lighting', 'Low decibel seating'],
    safetyCheckInIntervalMinutes: 60,
    status: 'Sent',
    previouslyVisitedAnomaly: false,
    createdAt: '2026-08-16T09:00:00Z'
  },
  {
    id: 'dp_dev_dinner',
    relationshipId: 'rel_5512_dev',
    matchUserId: 'usr_dev_malik',
    mood: 'Food',
    activityType: 'Home-style Tasting & Jazz Listening',
    venueName: 'Green Mill Cocktail Lounge & Dal Tasting',
    venueAddress: '4802 N Broadway, Chicago, IL',
    venueCategory: 'live music',
    scheduledDate: '2026-08-28',
    scheduledTime: '8:00 PM',
    scheduleFitScore: 88,
    comfortNotes: ['High acoustical clarity booths'],
    safetyCheckInIntervalMinutes: 90,
    status: 'Draft',
    previouslyVisitedAnomaly: false,
    createdAt: '2026-08-16T11:30:00Z'
  },
  {
    id: 'dp_farah_books_buns', relationshipId: 'rel_farah_new', matchUserId: 'usr_farah_rahman', mood: 'Low-key',
    activityType: 'Used Books, Cardamom Buns & Courtyard Reading', venueName: 'Lantern Books and Juniper Bakehouse', venueAddress: 'Quiet Arts District', venueCategory: 'bookstore',
    scheduledDate: '2026-08-24', scheduledTime: '10:30 AM', scheduleFitScore: 96, comfortNotes: ['Courtyard seating', 'No music before noon', 'Step-free bookshop entrance'], safetyCheckInIntervalMinutes: 75, status: 'Confirmed', previouslyVisitedAnomaly: false, createdAt: '2026-08-16T12:10:00Z'
  },
  {
    id: 'dp_rina_museum', relationshipId: 'rel_rina_visitor', matchUserId: 'usr_rina_matsuda', mood: 'Arts',
    activityType: 'Print Gallery & Quiet Snack Intermission', venueName: 'Tokyo Metropolitan Art Museum', venueAddress: 'Ueno Park, Tokyo', venueCategory: 'museum',
    scheduledDate: '2026-08-27', scheduledTime: '2:00 PM', scheduleFitScore: 93, comfortNotes: ['Quiet cloth snack pouch', 'Bench breaks every gallery', 'No timed-entry pressure'], safetyCheckInIntervalMinutes: 90, status: 'Sent', previouslyVisitedAnomaly: false, createdAt: '2026-08-16T12:25:00Z'
  },
  {
    id: 'dp_amina_late_coffee', relationshipId: 'rel_amina_visitor', matchUserId: 'usr_amina_elsayed', mood: 'Curious',
    activityType: 'Late Coffee & Communication Field Notes', venueName: 'North Window Coffee Room', venueAddress: 'Manchester Northern Quarter', venueCategory: 'coffee',
    scheduledDate: '2026-08-29', scheduledTime: '9:15 PM', scheduleFitScore: 91, comfortNotes: ['Corner table reserved', 'No expectation to extend the evening', 'Text-friendly menu'], safetyCheckInIntervalMinutes: 60, status: 'Draft', previouslyVisitedAnomaly: false, createdAt: '2026-08-16T12:40:00Z'
  },
  {
    id: 'dp_rafael_soundwalk', relationshipId: 'rel_rafael_paused', matchUserId: 'usr_rafael_costa', mood: 'Outdoors',
    activityType: 'Twilight Sound Walk & Radio Archive Stop', venueName: 'Alfama Listening Route', venueAddress: 'Lisbon, Portugal', venueCategory: 'park',
    scheduledDate: '2026-09-03', scheduledTime: '8:30 PM', scheduleFitScore: 89, comfortNotes: ['Frequent quiet stops', 'Route avoids steepest stairs', 'Recording is optional'], safetyCheckInIntervalMinutes: 60, status: 'Sent', previouslyVisitedAnomaly: false, createdAt: '2026-08-16T13:00:00Z'
  },

  // Historic / ARG Stacked Date Cards (combines to reveal relationship ID 4417)
  {
    id: 'dp_hist_card_1',
    relationshipId: 'rel_pairwise_1999_mcole',
    matchUserId: 'usr_meredith_cole',
    mood: 'Quiet',
    activityType: 'Historic Date Record: Boston Public Garden',
    venueName: 'Swan Boat Lagoon',
    venueAddress: 'Boston, MA [PAIRWISE-1999-STAMP-44]',
    venueCategory: 'park',
    scheduledDate: '1999-08-14',
    scheduledTime: '2:00 PM',
    scheduleFitScore: 99,
    comfortNotes: ['Code fragment: 44'],
    safetyCheckInIntervalMinutes: 0,
    status: 'Completed',
    previouslyVisitedAnomaly: true,
    createdAt: '1999-08-14T14:00:00Z'
  },
  {
    id: 'dp_hist_card_2',
    relationshipId: 'rel_corresp_2008_mcole',
    matchUserId: 'usr_meredith_cole',
    mood: 'Arts',
    activityType: 'Historic Date Record: Symphony Hall',
    venueName: 'Chamber Hall Lower Tier',
    venueAddress: 'Boston, MA [CORRESP-2008-STAMP-17]',
    venueCategory: 'live music',
    scheduledDate: '2008-11-02',
    scheduledTime: '8:00 PM',
    scheduleFitScore: 99,
    comfortNotes: ['Code fragment: 17'],
    safetyCheckInIntervalMinutes: 0,
    status: 'Completed',
    previouslyVisitedAnomaly: true,
    createdAt: '2008-11-02T20:00:00Z'
  }
];

export const VENUE_CATEGORIES = [
  'coffee',
  'bookstore',
  'museum',
  'park',
  'casual dinner',
  'gallery',
  'board-game cafe',
  'night market',
  'live music',
  'pottery',
  'cooking',
  'aquarium'
];
