import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {
  SharedStory,
  SharedStoryComment,
} from '../types/socialEcosystem';
import { SEEDED_SHARED_STORIES } from '../data/sharedStoriesData';
import { soundEngine } from '../audio/soundEngine';

interface StoriesState {
  stories: SharedStory[];
  storyComments: Record<string, SharedStoryComment[]>;
  draftStory: Partial<SharedStory> | null;

  // Actions
  publishStory: (story: Omit<SharedStory, 'id' | 'publishedAt'>) => SharedStory;
  addStoryComment: (storyId: string, authorId: string, authorName: string, authorHandle: string, body: string) => SharedStoryComment;
  setDraftStory: (draft: Partial<SharedStory> | null) => void;
  resetStoriesStore: () => void;
}

export const useStoriesStore = create<StoriesState>()(
  persist(
    (set, get) => ({
      stories: SEEDED_SHARED_STORIES,
      storyComments: {},
      draftStory: null,

      publishStory: (storyData) => {
        const newStory: SharedStory = {
          ...storyData,
          id: `story_${Date.now()}`,
          publishedAt: new Date().toISOString(),
        };

        soundEngine.playCue('ui.save');

        set((state) => ({
          stories: [newStory, ...state.stories],
          draftStory: null,
        }));

        return newStory;
      },

      addStoryComment: (storyId, authorId, authorName, authorHandle, body) => {
        const newComment: SharedStoryComment = {
          id: `s_comm_${Date.now()}`,
          storyId,
          authorId,
          authorName,
          authorHandle,
          body,
          publishedAt: new Date().toISOString(),
          heartCount: 0,
        };

        soundEngine.playCue('comment.post');

        set((state) => {
          const currentComments = state.storyComments[storyId] || [];
          return {
            storyComments: {
              ...state.storyComments,
              [storyId]: [...currentComments, newComment],
            },
          };
        });

        return newComment;
      },

      setDraftStory: (draftStory) => {
        set({ draftStory });
      },

      resetStoriesStore: () => {
        set({
          stories: SEEDED_SHARED_STORIES,
          storyComments: {},
          draftStory: null,
        });
      },
    }),
    {
      name: 'everfold.stories.v1',
    }
  )
);
