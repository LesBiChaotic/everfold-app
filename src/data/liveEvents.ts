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
  },
  {
    id: 'evt_farah_followup', type: 'message_arrival', eligibleAt: 3, delayMs: 2200, prerequisites: [], once: true,
    payload: { threadId: 'th_farah_visitor', message: { id: 'msg_f_live_1', threadId: 'th_farah_visitor', senderId: 'usr_farah_rahman', createdAt: new Date().toISOString(), displayTimestamp: 'Just now', body: 'Mina has accepted the courtyard result but is demanding a rematch involving croissants. I admire her commitment to procedural fairness.' } }, consumed: false
  },
  {
    id: 'evt_rina_followup', type: 'message_arrival', eligibleAt: 5, delayMs: 3200, prerequisites: [], once: true,
    payload: { threadId: 'th_rina_visitor', message: { id: 'msg_r_live_1', threadId: 'th_rina_visitor', senderId: 'usr_rina_matsuda', createdAt: new Date().toISOString(), displayTimestamp: 'Just now', body: 'Update: cloth snack pouch acquired. The museum date can proceed without acoustic misconduct.' } }, consumed: false
  },
  {
    id: 'evt_amina_reply_notice', type: 'notification', eligibleAt: 7, delayMs: 1800, prerequisites: [], once: true,
    payload: { notification: { id: 'notif_live_amina_thread', category: 'Pulse', title: 'Amina quoted your communication insight', body: '“No performance of patience—just patience.” The discussion has 64 replies.', timestamp: 'Just now', isRead: false, linkUrl: '/pulse' } }, consumed: false
  },
  {
    id: 'evt_hana_craft_post', type: 'pulse_post', eligibleAt: 9, delayMs: 2500, prerequisites: [], once: true,
    payload: { post: { id: 'pulse_live_hana_repair', authorId: 'usr_hana_prasetyo', authorName: 'Hana Prasetyo', authorHandle: 'hanawandershome', type: 'tiny_win', title: 'The shelf is level now', body: 'Daniel diagnosed the bracket over video, Grace supervised plant placement, and the leftover washer has been acquitted.', timestamp: 'Just now', tags: ['TinyWin', 'Crafts', 'Community'], reactions: { '❤️': 18 }, userReactions: [], replies: [] } }, consumed: false
  },
  {
    id: 'evt_date_reminder_farah', type: 'notification', eligibleAt: 12, delayMs: 2000, prerequisites: [], once: true,
    payload: { notification: { id: 'notif_live_farah_date', category: 'Dates', title: 'Farah updated the shared itinerary', body: 'The used-book shop has been added before the courtyard bakery.', timestamp: 'Just now', isRead: false, linkUrl: '/date-planner' } }, consumed: false
  },
  {
    id: 'evt_rafael_recording', type: 'message_arrival', eligibleAt: 15, delayMs: 2800, prerequisites: [], once: true,
    payload: { threadId: 'th_rafael_visitor', message: { id: 'msg_rf_live_1', threadId: 'th_rafael_visitor', senderId: 'usr_rafael_costa', createdAt: new Date().toISOString(), displayTimestamp: 'Just now', body: 'The recording thread has turned into people sharing the quietest sound in their neighborhood. Someone in Bergen posted snow sliding from a roof.' } }, consumed: false
  },
  {
    id: 'evt_podcast_release', type: 'notification', eligibleAt: 18, delayMs: 1600, prerequisites: [], once: true,
    payload: { notification: { id: 'notif_live_podcast_11', category: 'Pulse', title: 'New episode: Accidental Archives', body: 'Farah Rahman and Camille Renaud discuss the private history found inside used books.', timestamp: 'Just now', isRead: false, linkUrl: '/podcast' } }, consumed: false
  },
  {
    id: 'evt_mina_poll_followup', type: 'pulse_post', eligibleAt: 22, delayMs: 2300, prerequisites: [], once: true,
    payload: { post: { id: 'pulse_live_mina_croissant', authorId: 'usr_mina_okafor', authorName: 'Mina Okafor', authorHandle: 'minareadsmenus', type: 'poll', title: 'The courtyard result requires independent replication', body: 'Next trial: croissants. Farah claims this is moving the goalposts. I claim science must continue.', timestamp: 'Just now', tags: ['Food', 'Community'], poll: { question: 'Accept the rematch?', options: [{ id: 'yes', text: 'Yes, for science', votes: 41 }, { id: 'also_yes', text: 'Yes, for croissants', votes: 76 }], totalVotes: 117 }, reactions: { '😂': 32 }, userReactions: [], replies: [] } }, consumed: false
  }
];
