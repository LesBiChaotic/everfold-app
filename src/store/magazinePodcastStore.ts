import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {
  MagazineIssue,
  PodcastEpisode,
  CommunityComment,
} from '../types/socialEcosystem';
import {
  SEEDED_MAGAZINE_ISSUES,
  SEEDED_PODCAST_EPISODES,
} from '../data/magazinePodcastData';
import { soundEngine } from '../audio/soundEngine';

interface MagazinePodcastState {
  issues: MagazineIssue[];
  podcastEpisodes: PodcastEpisode[];
  podcastComments: Record<string, CommunityComment[]>;

  // Actions
  addPodcastComment: (episodeId: string, authorId: string, authorName: string, authorHandle: string, body: string) => CommunityComment;
  resetMagazinePodcastStore: () => void;
}

export const useMagazinePodcastStore = create<MagazinePodcastState>()(
  persist(
    (set) => ({
      issues: SEEDED_MAGAZINE_ISSUES,
      podcastEpisodes: SEEDED_PODCAST_EPISODES,
      podcastComments: {},

      addPodcastComment: (episodeId, authorId, authorName, authorHandle, body) => {
        const newComment: CommunityComment = {
          id: `pod_comm_${Date.now()}`,
          postId: episodeId,
          authorId,
          authorName,
          authorHandle,
          body,
          publishedAt: new Date().toISOString(),
          reactions: { helpful: 0, relatable: 0, laugh: 0, thoughtful: 0 },
          storyTier: 0,
        };

        soundEngine.playCue('comment.post');

        set((state) => {
          const current = state.podcastComments[episodeId] || [];
          return {
            podcastComments: {
              ...state.podcastComments,
              [episodeId]: [...current, newComment],
            },
          };
        });

        return newComment;
      },

      resetMagazinePodcastStore: () => {
        set({
          issues: SEEDED_MAGAZINE_ISSUES,
          podcastEpisodes: SEEDED_PODCAST_EPISODES,
          podcastComments: {},
        });
      },
    }),
    {
      name: 'everfold.magazinePodcast.v2',
    }
  )
);
