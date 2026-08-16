import { NotificationItem } from '../types';

export const SEEDED_NOTIFICATIONS: NotificationItem[] = [
  // Normal Notifications
  {
    id: 'notif_01',
    category: 'Messages',
    title: 'New message from Hana Prasetyo',
    body: '“I was just potting a small cutting from the greenhouse...”',
    timestamp: '15 mins ago',
    isRead: false,
    linkUrl: '/messages/th_hana_visitor'
  },
  {
    id: 'notif_02',
    category: 'Matches',
    title: 'New Mutual Connection',
    body: 'You and Dev Malik connected! Dev has high life-fit and shared interests.',
    timestamp: '1 hour ago',
    isRead: false,
    linkUrl: '/matches'
  },
  {
    id: 'notif_03',
    category: 'Pulse',
    title: 'Mina Okafor posted a new poll',
    body: '“First Date Dinner Theory: What is the absolute best format for a low-stakes first date?”',
    timestamp: '2 hours ago',
    isRead: true,
    linkUrl: '/pulse'
  },
  {
    id: 'notif_04',
    category: 'Forecast',
    title: 'Forecast Trajectory Updated',
    body: 'Your 30-day forecast with Naomi Serrano has been calibrated to 94%.',
    timestamp: '4 hours ago',
    isRead: true,
    linkUrl: '/forecast/rel_9918_naomi'
  },
  {
    id: 'notif_05',
    category: 'Dates',
    title: 'Date Reminder',
    body: 'Upcoming date with Hana Prasetyo on Saturday, Aug 22 at Portland Japanese Garden.',
    timestamp: '1 day ago',
    isRead: true,
    linkUrl: '/date-planner'
  },
  {
    id: 'notif_06',
    category: 'Safety',
    title: 'Community Guidelines Refresh',
    body: 'Review our updated principles on slow pacing, consent, and mutual emotional boundaries.',
    timestamp: '2 days ago',
    isRead: true,
    linkUrl: '/safety'
  },
  {
    id: 'notif_07',
    category: 'Pulse',
    title: 'Dev Malik commented on a thread',
    body: '“Bar counter is unbeatable because you are looking forward together...”',
    timestamp: '3 hours ago',
    isRead: true,
    linkUrl: '/pulse'
  },
  {
    id: 'notif_08',
    category: 'Messages',
    title: 'Morgan Bell sent a note',
    body: '“Hey. Have you exported your Everfold user data yet under Settings?”',
    timestamp: '25 mins ago',
    isRead: false,
    linkUrl: '/messages/th_morgan_visitor'
  },

  // Late ARG Anomaly Notifications (Triggered on stage progression)
  {
    id: 'notif_anom_01',
    category: 'System',
    title: 'Historical Connection Reconciled',
    body: 'One historical relationship record (1999–2026) has been matched to your profile.',
    timestamp: 'Just now',
    isRead: false,
    isAnomaly: true,
    linkUrl: '/matches',
    storyFlag: 'foundPreviouslyMatched'
  },
  {
    id: 'notif_anom_02',
    category: 'Archive',
    title: 'Archived Conversation Restored',
    body: 'An archived thread from Affinity Room (2003) has been reinstated into your active directory.',
    timestamp: 'Just now',
    isRead: false,
    isAnomaly: true,
    linkUrl: '/messages/th_leah_samuel_restored',
    storyFlag: 'foundLeahThread'
  },
  {
    id: 'notif_anom_03',
    category: 'Forecast',
    title: 'One Relationship Event Could Not Be Dated',
    body: 'Invariant milestone `RETURN` identified on longitudinal horizon. Confidence: 99.8%.',
    timestamp: 'Just now',
    isRead: false,
    isAnomaly: true,
    linkUrl: '/forecast/raw/rel_2347_previouslymatched',
    storyFlag: 'foundReturn'
  },
  {
    id: 'notif_anom_04',
    category: 'Matches',
    title: '@previouslymatched is Active Now',
    body: 'A previous connection from platform generation 1 is available again.',
    timestamp: 'Present',
    isRead: false,
    isAnomaly: true,
    linkUrl: '/member/previouslymatched',
    storyFlag: 'foundPreviouslyMatched'
  },
  {
    id: 'notif_anom_05',
    category: 'System',
    title: 'Relational Role Assigned',
    body: 'Participant assignment confidence: 63%. Relationship continuity confidence: 99.8%.',
    timestamp: 'Present',
    isRead: false,
    isAnomaly: true,
    linkUrl: '/case-notes/interpretation',
    storyFlag: 'final_sequence_unlocked'
  }
];
