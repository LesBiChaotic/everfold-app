import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { LIVE_COMMENT_SCRIPTS } from '../data/liveCommentScripts';
import { LiveCommentEvent } from '../types/socialEcosystem';
import { soundEngine } from '../audio/soundEngine';

export interface QueuedLiveComment {
  id: string;
  sourceType: string;
  sourceId: string;
  event: LiveCommentEvent;
  scheduledTime: number;
}

export interface ActiveTypingUser {
  sourceId: string;
  authorName: string;
  authorHandle: string;
}

interface SocialSimulationState {
  queuedComments: QueuedLiveComment[];
  deliveredCommentIds: string[];
  activeTypingUsers: ActiveTypingUser[];
  isSimulationMuted: boolean;
  isOffline: boolean;

  // Actions
  triggerScriptCascade: (sourceType: 'post' | 'advice' | 'story' | 'podcast' | 'event', sourceId: string, playerInput: string) => void;
  tickSimulation: () => LiveCommentEvent[];
  clearTypingUser: (sourceId: string) => void;
  setOfflineState: (isOffline: boolean) => void;
  setSimulationMuted: (muted: boolean) => void;
  resetSimulationStore: () => void;
}

export const useSocialSimulationStore = create<SocialSimulationState>()(
  persist(
    (set, get) => ({
      queuedComments: [],
      deliveredCommentIds: [],
      activeTypingUsers: [],
      isSimulationMuted: false,
      isOffline: false,

      triggerScriptCascade: (sourceType, sourceId, playerInput) => {
        const { isOffline, deliveredCommentIds } = get();
        if (isOffline) return;

        // Find matching script
        const matchedScript = LIVE_COMMENT_SCRIPTS.find(
          (s) => s.sourceType === sourceType && s.sourceId === sourceId
        ) || LIVE_COMMENT_SCRIPTS.find((s) => s.sourceType === sourceType);

        if (!matchedScript) return;

        const now = Date.now();
        const newQueued: QueuedLiveComment[] = [];

        matchedScript.defaultBranchEvents.forEach((ev) => {
          // Avoid re-queueing delivered comments
          if (deliveredCommentIds.includes(ev.id)) return;

          newQueued.push({
            id: ev.id,
            sourceType,
            sourceId,
            event: ev,
            scheduledTime: now + ev.delayMs,
          });
        });

        // Set initial typing indicator if first comment has typingDuration
        if (newQueued.length > 0 && newQueued[0].event.typingDurationMs) {
          const first = newQueued[0];
          set((state) => ({
            activeTypingUsers: [
              ...state.activeTypingUsers.filter((u) => u.sourceId !== sourceId),
              {
                sourceId,
                authorName: first.event.authorName,
                authorHandle: first.event.authorHandle,
              },
            ],
          }));
        }

        set((state) => ({
          queuedComments: [...state.queuedComments, ...newQueued],
        }));
      },

      tickSimulation: () => {
        const { queuedComments, isOffline, isSimulationMuted, deliveredCommentIds } = get();
        if (isOffline || queuedComments.length === 0) return [];

        const now = Date.now();
        const readyToDeliver: LiveCommentEvent[] = [];
        const remainingQueue: QueuedLiveComment[] = [];
        const newDelivered = [...deliveredCommentIds];

        queuedComments.forEach((qc) => {
          if (now >= qc.scheduledTime) {
            readyToDeliver.push(qc.event);
            newDelivered.push(qc.id);
          } else {
            remainingQueue.push(qc);
          }
        });

        if (readyToDeliver.length > 0) {
          if (!isSimulationMuted) {
            soundEngine.playCue('comment.replyArrive');
          }

          // Clear typing indicator for source
          set((state) => ({
            queuedComments: remainingQueue,
            deliveredCommentIds: newDelivered,
            activeTypingUsers: state.activeTypingUsers.filter(
              (u) => !readyToDeliver.some((rd) => rd.authorHandle === u.authorHandle)
            ),
          }));
        }

        return readyToDeliver;
      },

      clearTypingUser: (sourceId) => {
        set((state) => ({
          activeTypingUsers: state.activeTypingUsers.filter((u) => u.sourceId !== sourceId),
        }));
      },

      setOfflineState: (isOffline) => {
        set({ isOffline });
      },

      setSimulationMuted: (isSimulationMuted) => {
        set({ isSimulationMuted });
      },

      resetSimulationStore: () => {
        set({
          queuedComments: [],
          deliveredCommentIds: [],
          activeTypingUsers: [],
          isSimulationMuted: false,
          isOffline: false,
        });
      },
    }),
    {
      name: 'everfold.socialSimulation.v1',
      partialize: (state) => ({
        deliveredCommentIds: state.deliveredCommentIds,
        isSimulationMuted: state.isSimulationMuted,
      }),
    }
  )
);
