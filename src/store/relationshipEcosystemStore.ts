import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {
  RelationshipCheckIn,
  RelationshipRecap,
  SavedRelationshipMemory,
  RelationshipMilestone,
  RelationshipMergeSuggestion,
} from '../types/socialEcosystem';
import {
  SEEDED_CHECK_INS,
  SEEDED_RECAPS,
  SEEDED_MEMORIES,
  SEEDED_MILESTONES,
  SEEDED_MERGE_SUGGESTIONS,
} from '../data/relationshipEcosystemData';
import { soundEngine } from '../audio/soundEngine';

interface RelationshipEcosystemState {
  checkIns: RelationshipCheckIn[];
  recaps: RelationshipRecap[];
  memories: SavedRelationshipMemory[];
  milestones: RelationshipMilestone[];
  mergeSuggestions: RelationshipMergeSuggestion[];
  whyThisPersonFeedback: Record<string, string>;

  // Actions
  submitCheckIn: (relationshipId: string, prompt: string, status: RelationshipCheckIn['visitorStatus'], note?: string) => RelationshipCheckIn;
  saveMemory: (relationshipId: string, contentType: SavedRelationshipMemory['contentType'], title: string, content: string, savedBy?: 'visitor' | 'partner' | 'systemRecovered') => SavedRelationshipMemory;
  recordWhyThisPersonFeedback: (userId: string, feedback: string) => void;
  resolveMergeSuggestion: (suggestionId: string, status: 'merged' | 'kept_separate') => void;
  resetRelationshipEcosystemStore: () => void;
}

export const useRelationshipEcosystemStore = create<RelationshipEcosystemState>()(
  persist(
    (set) => ({
      checkIns: SEEDED_CHECK_INS,
      recaps: SEEDED_RECAPS,
      memories: SEEDED_MEMORIES,
      milestones: SEEDED_MILESTONES,
      mergeSuggestions: SEEDED_MERGE_SUGGESTIONS,
      whyThisPersonFeedback: {},

      submitCheckIn: (relationshipId, prompt, status, note) => {
        const newCheckIn: RelationshipCheckIn = {
          id: `chk_${Date.now()}`,
          relationshipId,
          prompt,
          date: new Date().toISOString().split('T')[0],
          visitorStatus: status,
          visitorNote: note,
          partnerStatus: 'Comfortable',
          partnerNote: 'I am so glad we took the time to check in together.',
        };

        soundEngine.playCue('ui.save');

        set((state) => ({
          checkIns: [newCheckIn, ...state.checkIns],
        }));

        return newCheckIn;
      },

      saveMemory: (relationshipId, contentType, title, content, savedBy = 'visitor') => {
        const newMemory: SavedRelationshipMemory = {
          id: `mem_${Date.now()}`,
          relationshipId,
          contentType,
          title,
          content,
          savedBy,
          savedAt: new Date().toISOString(),
          isShared: true,
        };

        soundEngine.playCue('memory.saved');

        set((state) => ({
          memories: [newMemory, ...state.memories],
        }));

        return newMemory;
      },

      recordWhyThisPersonFeedback: (userId, feedback) => {
        soundEngine.playCue('ui.navigation');
        set((state) => ({
          whyThisPersonFeedback: {
            ...state.whyThisPersonFeedback,
            [userId]: feedback,
          },
        }));
      },

      resolveMergeSuggestion: (suggestionId, status) => {
        soundEngine.playCue('ui.save');
        set((state) => ({
          mergeSuggestions: state.mergeSuggestions.map((sug) =>
            sug.id === suggestionId ? { ...sug, status } : sug
          ),
        }));
      },

      resetRelationshipEcosystemStore: () => {
        set({
          checkIns: SEEDED_CHECK_INS,
          recaps: SEEDED_RECAPS,
          memories: SEEDED_MEMORIES,
          milestones: SEEDED_MILESTONES,
          mergeSuggestions: SEEDED_MERGE_SUGGESTIONS,
          whyThisPersonFeedback: {},
        });
      },
    }),
    {
      name: 'everfold.relationshipEcosystem.v1',
    }
  )
);
