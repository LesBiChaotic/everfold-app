import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {
  CommunityRoom,
  CommunityPost,
  CommunityComment,
  AnonymousUnsentPost,
  CommunityEvent,
  CommunityAMA,
  CommunityReactionMap,
} from '../types/socialEcosystem';
import {
  COMMUNITY_ROOMS,
  SEEDED_COMMUNITY_POSTS,
  SEEDED_UNSENT_POSTS,
  SEEDED_COMMUNITY_EVENTS,
  SEEDED_COMMUNITY_AMAS,
} from '../data/communityData';
import { soundEngine } from '../audio/soundEngine';
import { useSocialSimulationStore } from './socialSimulationStore';

interface CommunityState {
  rooms: CommunityRoom[];
  posts: CommunityPost[];
  comments: Record<string, CommunityComment[]>;
  unsentPosts: AnonymousUnsentPost[];
  events: CommunityEvent[];
  amas: CommunityAMA[];
  userVotedPolls: Record<string, string>;

  // Actions
  addPost: (roomId: string, authorId: string, authorName: string, authorHandle: string, title: string, body: string) => CommunityPost;
  addComment: (postId: string, authorId: string, authorName: string, authorHandle: string, body: string, replyToCommentId?: string) => CommunityComment;
  reactToPost: (postId: string, reactionType: keyof CommunityReactionMap) => void;
  votePoll: (postId: string, optionId: string) => void;
  postUnsentConfession: (category: AnonymousUnsentPost['category'], body: string) => AnonymousUnsentPost;
  rsvpEvent: (eventId: string) => void;
  resetCommunityStore: () => void;
}

export const useCommunityStore = create<CommunityState>()(
  persist(
    (set, get) => ({
      rooms: COMMUNITY_ROOMS,
      posts: SEEDED_COMMUNITY_POSTS,
      comments: {},
      unsentPosts: SEEDED_UNSENT_POSTS,
      events: SEEDED_COMMUNITY_EVENTS,
      amas: SEEDED_COMMUNITY_AMAS,
      userVotedPolls: {},

      addPost: (roomId, authorId, authorName, authorHandle, title, body) => {
        const newPost: CommunityPost = {
          id: `post_${Date.now()}`,
          roomId,
          authorId,
          authorName,
          authorHandle,
          title,
          body,
          publishedAt: new Date().toISOString(),
          reactions: { helpful: 0, relatable: 0, laugh: 0, thoughtful: 0 },
          commentsCount: 0,
          storyTier: 0,
        };

        soundEngine.playCue('comment.post');

        set((state) => ({
          posts: [newPost, ...state.posts],
        }));

        return newPost;
      },

      addComment: (postId, authorId, authorName, authorHandle, body, replyToCommentId) => {
        const newComment: CommunityComment = {
          id: `comm_${Date.now()}`,
          postId,
          authorId,
          authorName,
          authorHandle,
          body,
          publishedAt: new Date().toISOString(),
          replyToCommentId,
          reactions: { helpful: 0, relatable: 0, laugh: 0, thoughtful: 0 },
          storyTier: 0,
        };

        soundEngine.playCue('comment.post');

        set((state) => {
          const postComments = state.comments[postId] || [];
          const updatedPosts = state.posts.map((p) =>
            p.id === postId ? { ...p, commentsCount: p.commentsCount + 1 } : p
          );

          return {
            comments: {
              ...state.comments,
              [postId]: [...postComments, newComment],
            },
            posts: updatedPosts,
          };
        });

        // Trigger live simulation cascade on user comment
        useSocialSimulationStore.getState().triggerScriptCascade('post', postId, body);

        return newComment;
      },

      reactToPost: (postId, reactionType) => {
        soundEngine.playCue('ui.navigation');
        set((state) => ({
          posts: state.posts.map((p) => {
            if (p.id !== postId) return p;
            const currentVal = p.reactions[reactionType] || 0;
            return {
              ...p,
              reactions: {
                ...p.reactions,
                [reactionType]: currentVal + 1,
              },
            };
          }),
        }));
      },

      votePoll: (postId, optionId) => {
        const { userVotedPolls } = get();
        if (userVotedPolls[postId]) return;

        soundEngine.playCue('ui.save');

        set((state) => {
          const updatedPosts = state.posts.map((p) => {
            if (p.id !== postId || !p.poll) return p;
            return {
              ...p,
              poll: {
                ...p.poll,
                totalVotes: p.poll.totalVotes + 1,
                userVotedOptionId: optionId,
                options: p.poll.options.map((opt) =>
                  opt.id === optionId ? { ...opt, votes: opt.votes + 1 } : opt
                ),
              },
            };
          });

          return {
            posts: updatedPosts,
            userVotedPolls: {
              ...state.userVotedPolls,
              [postId]: optionId,
            },
          };
        });
      },

      postUnsentConfession: (category, body) => {
        const newUnsent: AnonymousUnsentPost = {
          id: `unsent_${Date.now()}`,
          category,
          body,
          postedAt: new Date().toISOString(),
          reactions: { feltThis: 1, heartbroken: 0, healing: 0 },
          storyTier: 0,
        };

        soundEngine.playCue('comment.post');

        set((state) => ({
          unsentPosts: [newUnsent, ...state.unsentPosts],
        }));

        return newUnsent;
      },

      rsvpEvent: (eventId) => {
        soundEngine.playCue('event.rsvp');
        set((state) => ({
          events: state.events.map((evt) => {
            if (evt.id !== eventId) return evt;
            const nextRsvp = !evt.isUserRsvp;
            return {
              ...evt,
              isUserRsvp: nextRsvp,
              rsvpCount: nextRsvp ? evt.rsvpCount + 1 : evt.rsvpCount - 1,
            };
          }),
        }));
      },

      resetCommunityStore: () => {
        set({
          posts: SEEDED_COMMUNITY_POSTS,
          comments: {},
          unsentPosts: SEEDED_UNSENT_POSTS,
          events: SEEDED_COMMUNITY_EVENTS,
          amas: SEEDED_COMMUNITY_AMAS,
          userVotedPolls: {},
        });
      },
    }),
    {
      name: 'everfold.community.v1',
    }
  )
);
