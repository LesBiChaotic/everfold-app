import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {
  AdviceArticle,
  AdviceCategory,
  AdviceComment,
  AskEverfoldSubmission,
} from '../types/socialEcosystem';
import {
  ADVICE_CATEGORIES,
  SEEDED_ADVICE_ARTICLES,
  SEEDED_ADVICE_COMMENTS,
} from '../data/adviceData';
import { soundEngine } from '../audio/soundEngine';
import { useSocialSimulationStore } from './socialSimulationStore';

interface AdviceState {
  categories: AdviceCategory[];
  articles: AdviceArticle[];
  comments: Record<string, AdviceComment[]>;
  savedArticleIds: string[];
  askSubmissions: AskEverfoldSubmission[];

  // Actions
  addComment: (articleId: string, authorId: string, authorName: string, authorHandle: string, avatarSeed: string, body: string) => AdviceComment;
  toggleSaveArticle: (articleId: string) => void;
  submitAskEverfold: (category: AskEverfoldSubmission['category'], question: string, privacy: 'public' | 'anonymous' | 'private') => AskEverfoldSubmission;
  resetAdviceStore: () => void;
}

export const useAdviceStore = create<AdviceState>()(
  persist(
    (set, get) => ({
      categories: ADVICE_CATEGORIES,
      articles: SEEDED_ADVICE_ARTICLES,
      comments: SEEDED_ADVICE_COMMENTS,
      savedArticleIds: [],
      askSubmissions: [],

      addComment: (articleId, authorId, authorName, authorHandle, avatarSeed, body) => {
        const newComment: AdviceComment = {
          id: `adv_comm_${Date.now()}`,
          articleId,
          authorId,
          authorName,
          authorHandle,
          avatarSeed,
          body,
          publishedAt: new Date().toISOString(),
          helpfulCount: 0,
          relatableCount: 0,
          storyTier: 0,
        };

        soundEngine.playCue('comment.post');

        set((state) => {
          const artComments = state.comments[articleId] || [];
          const updatedArticles = state.articles.map((art) =>
            art.id === articleId ? { ...art, commentsCount: art.commentsCount + 1 } : art
          );

          return {
            comments: {
              ...state.comments,
              [articleId]: [...artComments, newComment],
            },
            articles: updatedArticles,
          };
        });

        useSocialSimulationStore.getState().triggerScriptCascade('advice', articleId, body);

        return newComment;
      },

      toggleSaveArticle: (articleId) => {
        soundEngine.playCue('ui.save');
        set((state) => {
          const isSaved = state.savedArticleIds.includes(articleId);
          return {
            savedArticleIds: isSaved
              ? state.savedArticleIds.filter((id) => id !== articleId)
              : [...state.savedArticleIds, articleId],
          };
        });
      },

      submitAskEverfold: (category, question, privacy) => {
        const submissionId = `ask_${Date.now()}`;
        const newSubmission: AskEverfoldSubmission = {
          id: submissionId,
          category,
          question,
          privacy,
          submittedAt: new Date().toISOString(),
          status: 'received',
        };

        soundEngine.playCue('comment.post');

        set((state) => ({
          askSubmissions: [newSubmission, ...state.askSubmissions],
        }));

        // Scripted staff response arrives after 4 seconds
        setTimeout(() => {
          set((state) => ({
            askSubmissions: state.askSubmissions.map((s) => {
              if (s.id !== submissionId) return s;
              return {
                ...s,
                status: 'answered',
                scriptedAnswer: {
                  author: 'Dr. Celia Moreno',
                  role: 'Relationship Science',
                  answeredAt: new Date().toISOString(),
                  body: 'Thank you for this thoughtful inquiry. In behavioral research, we observe that establishing clear non-verbal cues and setting a 45-minute boundary beforehand dramatically reduces first-meeting anxiety.',
                },
              };
            }),
          }));
          soundEngine.playCue('comment.replyArrive');
        }, 4000);

        return newSubmission;
      },

      resetAdviceStore: () => {
        set({
          articles: SEEDED_ADVICE_ARTICLES,
          comments: SEEDED_ADVICE_COMMENTS,
          savedArticleIds: [],
          askSubmissions: [],
        });
      },
    }),
    {
      name: 'everfold.advice.v1',
    }
  )
);
