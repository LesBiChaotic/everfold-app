import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Match, Message, MessageThread, NotificationItem, PulsePost, DatePlan, JournalEntry } from '../types';
import { SEEDED_MATCHES } from '../data/matches';
import { SEEDED_THREADS, SEEDED_MESSAGES } from '../data/messages';
import { SEEDED_PULSE_POSTS } from '../data/pulse';
import { SEEDED_DATE_PLANS } from '../data/datePlans';
import { INITIAL_JOURNAL_ENTRIES } from '../data/journalPrompts';
import { SEEDED_NOTIFICATIONS } from '../data/notifications';
import { soundEngine } from '../audio/soundEngine';

interface AppState {
  matches: Match[];
  threads: MessageThread[];
  messages: Record<string, Message[]>;
  pulsePosts: PulsePost[];
  datePlans: DatePlan[];
  journalEntries: JournalEntry[];
  notifications: NotificationItem[];
  recentSearches: string[];

  // Actions
  addMatch: (match: Match) => void;
  updateMatchStatus: (matchId: string, status: Match['status']) => void;
  sendMessage: (threadId: string, body: string, isSystemGenerated?: boolean) => void;
  addMessageReaction: (threadId: string, messageId: string, emoji: string) => void;
  markThreadRead: (threadId: string) => void;
  votePulsePoll: (postId: string, optionId: string) => void;
  reactPulsePost: (postId: string, emoji: string) => void;
  addPulseReply: (postId: string, text: string) => void;
  createDatePlan: (plan: Omit<DatePlan, 'id' | 'createdAt'>) => void;
  updateDatePlanStatus: (planId: string, status: DatePlan['status']) => void;
  createJournalEntry: (entry: Omit<JournalEntry, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateJournalEntry: (id: string, updates: Partial<JournalEntry>) => void;
  deleteJournalEntry: (id: string) => void;
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  addRecentSearch: (query: string) => void;
  clearRecentSearches: () => void;
  resetAppStore: () => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      matches: [...SEEDED_MATCHES],
      threads: [...SEEDED_THREADS],
      messages: { ...SEEDED_MESSAGES },
      pulsePosts: [...SEEDED_PULSE_POSTS],
      datePlans: [...SEEDED_DATE_PLANS],
      journalEntries: [...INITIAL_JOURNAL_ENTRIES],
      notifications: [...SEEDED_NOTIFICATIONS],
      recentSearches: ['Naomi Serrano', 'Role Resolver', 'Meredith Cole', 'Boston Public Garden'],

      addMatch: (match) =>
        set((state) => {
          if (state.matches.some((m) => m.id === match.id)) return state;
          soundEngine.playCue('ui.match');
          return { matches: [match, ...state.matches] };
        }),

      updateMatchStatus: (matchId, status) =>
        set((state) => ({
          matches: state.matches.map((m) => (m.id === matchId ? { ...m, status } : m))
        })),

      sendMessage: (threadId, body, isSystemGenerated = false) =>
        set((state) => {
          const currentMsgs = state.messages[threadId] || [];
          const newMsg: Message = {
            id: `msg_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
            threadId,
            senderId: isSystemGenerated ? 'system_resolver' : 'visitor_user',
            createdAt: new Date().toISOString(),
            displayTimestamp: 'Just now',
            body,
            isSystemGenerated
          };

          if (!isSystemGenerated) {
            soundEngine.playCue('ui.messageSent');
          }

          const updatedThreads = state.threads.map((t) =>
            t.id === threadId
              ? { ...t, lastMessage: newMsg }
              : t
          );

          return {
            messages: { ...state.messages, [threadId]: [...currentMsgs, newMsg] },
            threads: updatedThreads
          };
        }),

      addMessageReaction: (threadId, messageId, emoji) =>
        set((state) => {
          const msgs = state.messages[threadId] || [];
          const updated = msgs.map((m) => {
            if (m.id !== messageId) return m;
            const currentReactions = m.reactions || {};
            const userList = currentReactions[emoji] || [];
            const hasReacted = userList.includes('visitor_user');
            const newUserList = hasReacted
              ? userList.filter((u) => u !== 'visitor_user')
              : [...userList, 'visitor_user'];
            return {
              ...m,
              reactions: { ...currentReactions, [emoji]: newUserList }
            };
          });
          return { messages: { ...state.messages, [threadId]: updated } };
        }),

      markThreadRead: (threadId) =>
        set((state) => ({
          threads: state.threads.map((t) => (t.id === threadId ? { ...t, unreadCount: 0 } : t))
        })),

      votePulsePoll: (postId, optionId) =>
        set((state) => ({
          pulsePosts: state.pulsePosts.map((p) => {
            if (p.id !== postId || !p.poll || p.poll.userVotedOptionId) return p;
            soundEngine.playCue('ui.save');
            const updatedOptions = p.poll.options.map((opt) =>
              opt.id === optionId ? { ...opt, votes: opt.votes + 1 } : opt
            );
            return {
              ...p,
              poll: {
                ...p.poll,
                userVotedOptionId: optionId,
                totalVotes: p.poll.totalVotes + 1,
                options: updatedOptions
              }
            };
          })
        })),

      reactPulsePost: (postId, emoji) =>
        set((state) => ({
          pulsePosts: state.pulsePosts.map((p) => {
            if (p.id !== postId) return p;
            const hasReacted = p.userReactions.includes(emoji);
            const currentCount = p.reactions[emoji] || 0;
            const newCount = hasReacted ? Math.max(0, currentCount - 1) : currentCount + 1;
            const newReactions = { ...p.reactions, [emoji]: newCount };
            const newUserReactions = hasReacted
              ? p.userReactions.filter((e) => e !== emoji)
              : [...p.userReactions, emoji];

            soundEngine.playCue('ui.save');
            return { ...p, reactions: newReactions, userReactions: newUserReactions };
          })
        })),

      addPulseReply: (postId, text) =>
        set((state) => ({
          pulsePosts: state.pulsePosts.map((p) => {
            if (p.id !== postId) return p;
            const newReply = {
              id: `rep_${Date.now()}`,
              postId,
              authorId: 'visitor_user',
              authorName: 'Alex Rivers',
              authorHandle: 'alexrivers',
              body: text,
              timestamp: 'Just now',
              likes: 0
            };
            soundEngine.playCue('ui.messageSent');
            return { ...p, replies: [...p.replies, newReply] };
          })
        })),

      createDatePlan: (planData) =>
        set((state) => {
          const newPlan: DatePlan = {
            ...planData,
            id: `dp_${Date.now()}`,
            createdAt: new Date().toISOString()
          };
          soundEngine.playCue('ui.dateConfirmed');
          return { datePlans: [newPlan, ...state.datePlans] };
        }),

      updateDatePlanStatus: (planId, status) =>
        set((state) => ({
          datePlans: state.datePlans.map((dp) => (dp.id === planId ? { ...dp, status } : dp))
        })),

      createJournalEntry: (entryData) =>
        set((state) => {
          const now = new Date().toISOString();
          const newEntry: JournalEntry = {
            ...entryData,
            id: `jnl_${Date.now()}`,
            createdAt: now,
            updatedAt: now
          };
          soundEngine.playCue('ui.save');
          return { journalEntries: [newEntry, ...state.journalEntries] };
        }),

      updateJournalEntry: (id, updates) =>
        set((state) => ({
          journalEntries: state.journalEntries.map((j) =>
            j.id === id ? { ...j, ...updates, updatedAt: new Date().toISOString() } : j
          )
        })),

      deleteJournalEntry: (id) =>
        set((state) => ({
          journalEntries: state.journalEntries.filter((j) => j.id !== id)
        })),

      markNotificationRead: (id) =>
        set((state) => ({
          notifications: state.notifications.map((n) => (n.id === id ? { ...n, isRead: true } : n))
        })),

      markAllNotificationsRead: () =>
        set((state) => ({
          notifications: state.notifications.map((n) => ({ ...n, isRead: true }))
        })),

      addRecentSearch: (query) =>
        set((state) => {
          const trimmed = query.trim();
          if (!trimmed) return state;
          const filtered = state.recentSearches.filter((q) => q.toLowerCase() !== trimmed.toLowerCase());
          return { recentSearches: [trimmed, ...filtered.slice(0, 7)] };
        }),

      clearRecentSearches: () => set({ recentSearches: [] }),

      resetAppStore: () =>
        set({
          matches: [...SEEDED_MATCHES],
          threads: [...SEEDED_THREADS],
          messages: { ...SEEDED_MESSAGES },
          pulsePosts: [...SEEDED_PULSE_POSTS],
          datePlans: [...SEEDED_DATE_PLANS],
          journalEntries: [...INITIAL_JOURNAL_ENTRIES],
          notifications: [...SEEDED_NOTIFICATIONS],
          recentSearches: []
        })
    }),
    {
      name: 'everfold_app_state_v1'
    }
  )
);
