import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {
  Quiz,
  QuizResult,
  QuizAnswerMap,
  SharedQuizSession,
  DailyQuestion,
  UserDailyAnswer,
} from '../types/socialEcosystem';
import {
  SEEDED_SOLO_QUIZZES,
  SEEDED_TOGETHER_QUIZZES,
  SEEDED_DAILY_QUESTIONS,
  CONVERSATION_STARTER_DECKS,
} from '../data/quizzesData';
import { soundEngine } from '../audio/soundEngine';

interface QuizState {
  soloQuizzes: Quiz[];
  togetherQuizzes: Quiz[];
  dailyQuestions: DailyQuestion[];
  completedResults: Record<string, QuizResult>;
  resultHistory: Record<string, QuizResult[]>;
  activeDrafts: Record<string, QuizAnswerMap>;
  sharedSessions: Record<string, SharedQuizSession>;
  userDailyAnswers: Record<string, UserDailyAnswer>;
  activeStarterCard: string | null;

  // Actions
  submitSoloQuiz: (quizId: string, visitorId: string, answers: QuizAnswerMap) => QuizResult;
  saveQuizDraft: (quizId: string, answers: QuizAnswerMap) => void;
  setResultPreferences: (quizId: string, resultId: string, preferences: { profileVisibility?: QuizResult['profileVisibility']; useForRecommendations?: boolean }) => void;
  initiateTogetherQuiz: (quizId: string, relationshipId: string, partnerUserId: string, visitorAnswers: QuizAnswerMap) => SharedQuizSession;
  simulatePartnerCompletion: (sessionId: string) => void;
  answerDailyQuestion: (questionId: string, answerText: string, privacy: 'public' | 'matches' | 'private') => UserDailyAnswer;
  drawStarterCard: (deckId: string) => string;
  resetQuizStore: () => void;
}

export const useQuizStore = create<QuizState>()(
  persist(
    (set, get) => ({
      soloQuizzes: SEEDED_SOLO_QUIZZES,
      togetherQuizzes: SEEDED_TOGETHER_QUIZZES,
      dailyQuestions: SEEDED_DAILY_QUESTIONS,
      completedResults: {},
      resultHistory: {},
      activeDrafts: {},
      sharedSessions: {},
      userDailyAnswers: {},
      activeStarterCard: null,

      submitSoloQuiz: (quizId, visitorId, answers) => {
        const quiz = get().soloQuizzes.find((q) => q.id === quizId);
        const scores: Record<string, number> = {};
        const maximumScores: Record<string, number> = {};

        if (quiz) {
          quiz.questions.forEach((q) => {
            const answer = answers[q.id];
            const selectedIds = Array.isArray(answer) ? answer : answer ? [answer] : [];
            q.options.filter((option) => selectedIds.includes(option.id)).forEach((option) => {
              Object.entries(option.scoreWeights).forEach(([key, val]) => {
                scores[key] = (scores[key] || 0) + val;
              });
            });

            const dimensions = new Set(q.options.flatMap((option) => Object.keys(option.scoreWeights)));
            dimensions.forEach((dimension) => {
              const weights = q.options.map((option) => Math.max(0, option.scoreWeights[dimension] || 0)).sort((a, b) => b - a);
              const selectionCount = q.type === 'multi' ? Math.max(1, q.maxSelections || q.options.length) : 1;
              maximumScores[dimension] = (maximumScores[dimension] || 0) + weights.slice(0, selectionCount).reduce((sum, value) => sum + value, 0);
            });
          });
        }

        const rankedDimensions = Object.entries(scores).sort(([, a], [, b]) => b - a);
        const topKey = rankedDimensions[0]?.[0] || 'balanced';
        const tiedKeys = rankedDimensions.filter(([, score]) => score === (rankedDimensions[0]?.[1] || 0)).map(([key]) => key);
        const outcome = quiz?.outcomes?.find((definition) => definition.key === topKey);
        const humanize = (value: string) => value.replace(/_/g, ' ').replace(/\b\w/g, (letter) => letter.toUpperCase());
        const primaryResult = outcome?.label || (tiedKeys.length > 1 ? tiedKeys.map(humanize).join(' + ') : humanize(topKey));
        const secondaryResults = rankedDimensions.slice(1, 4).map(([key]) => humanize(key));
        const dimensionPercentages = Object.fromEntries(Object.entries(scores).map(([key, score]) => [
          key,
          maximumScores[key] ? Math.min(100, Math.round((score / maximumScores[key]) * 100)) : 0,
        ]));
        const previousHistory = get().resultHistory[quizId] || [];

        const newResult: QuizResult = {
          id: `res_${quizId}_${Date.now()}`,
          quizId,
          visitorId,
          completedAt: new Date().toISOString(),
          scores,
          dimensionPercentages,
          primaryResult,
          secondaryResults,
          summary: outcome?.summary || `Your strongest pattern is ${primaryResult}. This describes your current preferences, not a fixed identity, and may change across relationships or seasons.`,
          recommendations: outcome?.recommendations || [
            `Tell matches that ${humanize(topKey).toLowerCase()} is important to your comfort.`,
            'Compare this result with your real behavior rather than treating it as a rule.',
            'Retake the assessment when your circumstances or relationship needs change.',
          ],
          answers,
          retakeNumber: previousHistory.length + 1,
          profileVisibility: 'private',
          useForRecommendations: true,
          appliedEffects: quiz?.profileEffects,
        };

        soundEngine.playCue('quiz.complete');

        set((state) => ({
          completedResults: {
            ...state.completedResults,
            [quizId]: newResult,
          },
          resultHistory: {
            ...state.resultHistory,
            [quizId]: [...(state.resultHistory[quizId] || []), newResult],
          },
          activeDrafts: Object.fromEntries(Object.entries(state.activeDrafts).filter(([id]) => id !== quizId)),
        }));

        return newResult;
      },

      saveQuizDraft: (quizId, answers) => set((state) => ({
        activeDrafts: { ...state.activeDrafts, [quizId]: answers },
      })),

      setResultPreferences: (quizId, resultId, preferences) => set((state) => {
        const current = (state.resultHistory[quizId] || []).find((result) => result.id === resultId)
          || (state.completedResults[quizId]?.id === resultId ? state.completedResults[quizId] : undefined);
        if (!current) return state;
        const updated = { ...current, ...preferences };
        return {
          completedResults: state.completedResults[quizId]?.id === resultId
            ? { ...state.completedResults, [quizId]: updated }
            : state.completedResults,
          resultHistory: {
            ...state.resultHistory,
            [quizId]: (state.resultHistory[quizId] || []).map((result) => result.id === updated.id ? updated : result),
          },
        };
      }),

      initiateTogetherQuiz: (quizId, relationshipId, partnerUserId, visitorAnswers) => {
        const sessionId = `sess_${quizId}_${Date.now()}`;
        const newSession: SharedQuizSession = {
          sessionId,
          quizId,
          relationshipId,
          partnerUserId,
          participantAnswers: {
            visitor: visitorAnswers,
            partner: {},
          },
          completionState: 'waiting_partner',
          sharedResult: {
            overlapPercentage: 88,
            agreements: ['Both prefer quiet evening tea talks'],
            differences: ['Minor difference on airport arrival buffer time'],
            conversationStarter: 'Ask about their ideal unhurried Sunday morning.',
          },
        };

        soundEngine.playCue('ui.save');

        set((state) => ({
          sharedSessions: {
            ...state.sharedSessions,
            [sessionId]: newSession,
          },
        }));

        // Trigger simulated partner completion after authored delay (3.5s)
        setTimeout(() => {
          get().simulatePartnerCompletion(sessionId);
        }, 3500);

        return newSession;
      },

      simulatePartnerCompletion: (sessionId) => {
        const session = get().sharedSessions[sessionId];
        if (!session) return;

        const simulatedPartnerAnswers: Record<string, string> = {
          tca_q1: 'opt_tca1_b',
          tca_q2: 'opt_tca2_a',
          tis_q1: 'opt_tis1_a',
          tts_q1: 'opt_tts1_a',
        };

        const updatedSession: SharedQuizSession = {
          ...session,
          participantAnswers: {
            ...session.participantAnswers,
            partner: simulatedPartnerAnswers,
          },
          completionState: 'ready_to_reveal',
          sharedResult: {
            overlapPercentage: 92,
            agreements: ['Both prefer tea talks in the evening', 'Shared appreciation for quiet morning coffee in bed'],
            differences: ['Minor divergence on airport arrival buffer time (3 hrs vs 1.5 hrs)'],
            conversationStarter: 'Ask how their idea of a peaceful morning evolved over time.',
          },
        };

        soundEngine.playCue('quiz.sharedReveal');

        set((state) => ({
          sharedSessions: {
            ...state.sharedSessions,
            [sessionId]: updatedSession,
          },
        }));
      },

      answerDailyQuestion: (questionId, answerText, privacy) => {
        soundEngine.playCue('dailyQuestion.submit');
        const newAnswer: UserDailyAnswer = {
          questionId,
          answerText,
          privacy,
          answeredAt: new Date().toISOString(),
        };
        set((state) => ({
          userDailyAnswers: {
            ...state.userDailyAnswers,
            [questionId]: newAnswer,
          },
        }));
        return newAnswer;
      },

      drawStarterCard: (deckId) => {
        const deck = CONVERSATION_STARTER_DECKS.find((d) => d.id === deckId) || CONVERSATION_STARTER_DECKS[0];
        const randomCard = deck.cards[Math.floor(Math.random() * deck.cards.length)];
        soundEngine.playCue('ui.navigation');
        set({ activeStarterCard: randomCard });
        return randomCard;
      },

      resetQuizStore: () => {
        set({
          completedResults: {},
          resultHistory: {},
          activeDrafts: {},
          sharedSessions: {},
          userDailyAnswers: {},
          activeStarterCard: null,
        });
      },
    }),
    {
      name: 'everfold.quizzes.v2',
      version: 3,
      migrate: (persisted: any) => {
        if (!persisted) return persisted;
        const completedResults = persisted.completedResults || {};
        return {
          ...persisted,
          soloQuizzes: SEEDED_SOLO_QUIZZES,
          togetherQuizzes: SEEDED_TOGETHER_QUIZZES,
          dailyQuestions: SEEDED_DAILY_QUESTIONS,
          completedResults: Object.fromEntries(Object.entries(completedResults).map(([id, result]: [string, any]) => [id, {
            profileVisibility: 'private',
            useForRecommendations: true,
            retakeNumber: 1,
            ...result,
          }])),
          resultHistory: persisted.resultHistory || Object.fromEntries(Object.entries(completedResults).map(([id, result]) => [id, [result]])),
          activeDrafts: persisted.activeDrafts || {},
        };
      },
    }
  )
);
