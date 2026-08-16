import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { LiveEvent } from '../types';
import { SEEDED_LIVE_EVENTS } from '../data/liveEvents';
import { useAppStore } from './appStore';
import { useARGStore } from './argStore';
import { soundEngine } from '../audio/soundEngine';

interface LiveState {
  events: LiveEvent[];
  activeTypingThreads: Record<string, boolean>;

  triggerEligibleEvents: (visitCount: number) => void;
  consumeEvent: (eventId: string) => void;
  setTypingState: (threadId: string, isTyping: boolean) => void;
  resetLiveStore: () => void;
}

export const useLiveStore = create<LiveState>()(
  persist(
    (set, get) => ({
      events: [...SEEDED_LIVE_EVENTS],
      activeTypingThreads: {},

      triggerEligibleEvents: (visitCount: number) => {
        const { storyFlags } = useARGStore.getState();
        const currentEvents = get().events;

        currentEvents.forEach((evt) => {
          if (evt.consumed) return;
          if (visitCount < evt.eligibleAt) return;

          // Check prerequisites
          const prereqsMet = evt.prerequisites.every((req) => storyFlags.includes(req));
          if (!prereqsMet) return;

          // Schedule event delivery
          setTimeout(() => {
            if (evt.type === 'typing_state') {
              get().setTypingState(evt.payload.threadId, evt.payload.isTyping);
              if (evt.payload.durationMs) {
                setTimeout(() => {
                  get().setTypingState(evt.payload.threadId, false);
                }, evt.payload.durationMs);
              }
            } else if (evt.type === 'message_arrival') {
              get().setTypingState(evt.payload.threadId, false);
              useAppStore.getState().sendMessage(evt.payload.threadId, evt.payload.message.body, true);
              soundEngine.playCue('ui.messageReceived');
            } else if (evt.type === 'pulse_post') {
              useAppStore.setState((state) => ({
                pulsePosts: [evt.payload.post, ...state.pulsePosts]
              }));
              soundEngine.playCue('ui.notification');
            } else if (evt.type === 'notification') {
              useAppStore.setState((state) => ({
                notifications: [evt.payload.notification, ...state.notifications]
              }));
              soundEngine.playCue(evt.payload.notification.isAnomaly ? 'arg.archivedNotification' : 'ui.notification');
            }
            get().consumeEvent(evt.id);
          }, evt.delayMs);
        });
      },

      consumeEvent: (eventId: string) =>
        set((state) => ({
          events: state.events.map((e) => (e.id === eventId ? { ...e, consumed: true } : e))
        })),

      setTypingState: (threadId: string, isTyping: boolean) =>
        set((state) => ({
          activeTypingThreads: { ...state.activeTypingThreads, [threadId]: isTyping }
        })),

      resetLiveStore: () =>
        set({
          events: [...SEEDED_LIVE_EVENTS],
          activeTypingThreads: {}
        })
    }),
    {
      name: 'everfold_live_state_v1'
    }
  )
);
