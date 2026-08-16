import { LiveEvent } from '../types';

export const SEEDED_LIVE_EVENTS: LiveEvent[] = [
  {
    id: 'evt_dev_typing',
    type: 'typing_state',
    eligibleAt: 1, // trigger on 2nd visit to messages
    delayMs: 2000,
    prerequisites: [],
    once: true,
    payload: { threadId: 'th_dev_visitor', isTyping: true, durationMs: 4000 },
    consumed: false
  },
  {
    id: 'evt_dev_message',
    type: 'message_arrival',
    eligibleAt: 1,
    delayMs: 6500,
    prerequisites: [],
    once: true,
    payload: {
      threadId: 'th_dev_visitor',
      message: {
        id: 'msg_d_live_1',
        threadId: 'th_dev_visitor',
        senderId: 'usr_dev_malik',
        createdAt: new Date().toISOString(),
        displayTimestamp: 'Just now',
        body: 'Also, if you like cardamom buns, I found this tiny bakery near the river that bakes them fresh at 7 AM. Let me know if you want to check it out sometime.'
      }
    },
    consumed: false
  },
  {
    id: 'evt_camille_pulse_post',
    type: 'pulse_post',
    eligibleAt: 2,
    delayMs: 5000,
    prerequisites: ['foundLegacyArchive'],
    once: true,
    payload: {
      post: {
        id: 'pulse_live_camille_1',
        authorId: 'usr_camille_renaud',
        authorName: 'Camille Renaud',
        authorHandle: 'camillekeepsnotes',
        type: 'text',
        title: 'Legacy Platform Audit Note',
        body: 'Just finished reviewing the 2003 Affinity Room relational schemas. The database primary keys match Everfold’s modern table structure character for character.',
        timestamp: 'Just now',
        tags: ['Archive', 'DatabaseAudit'],
        reactions: { '💡': 14, '👀': 9 },
        userReactions: [],
        replies: []
      }
    },
    consumed: false
  },
  {
    id: 'evt_arg_notification_return',
    type: 'notification',
    eligibleAt: 5,
    delayMs: 3000,
    prerequisites: ['foundReturn'],
    once: true,
    payload: {
      notification: {
        id: 'notif_live_return',
        category: 'Forecast',
        title: 'Relational Horizon Calibrated',
        body: 'Invariant milestone `RETURN` confirmed across longitudinal vectors.',
        timestamp: 'Just now',
        isRead: false,
        isAnomaly: true,
        linkUrl: '/forecast/raw/rel_2347_previouslymatched'
      }
    },
    consumed: false
  }
];
