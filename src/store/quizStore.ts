import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {
  Quiz,
  QuizResult,
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
  sharedSessions: Record<string, SharedQuizSession>;
  userDailyAnswers: Record<string, UserDailyAnswer>;
  activeStarterCard: string | null;

  // Actions
  submitSoloQuiz: (quizId: string, visitorId: string, answers: Record<string, string>) => QuizResult;
  initiateTogetherQuiz: (quizId: string, relationshipId: string, partnerUserId: string, visitorAnswers: Record<string, string>) => SharedQuizSession;
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
      sharedSessions: {},
      userDailyAnswers: {},
      activeStarterCard: null,

      submitSoloQuiz: (quizId, visitorId, answers) => {
        const quiz = get().soloQuizzes.find((q) => q.id === quizId);
        const scores: Record<string, number> = {};

        if (quiz) {
          quiz.questions.forEach((q) => {
            const selectedOptId = answers[q.id];
            const option = q.options.find((o) => o.id === selectedOptId);
            if (option) {
              Object.entries(option.scoreWeights).forEach(([key, val]) => {
                scores[key] = (scores[key] || 0) + val;
              });
            }
          });
        }

        const topKey = Object.keys(scores).reduce((a, b) => (scores[a] > scores[b] ? a : b), 'balanced');
        const primaryResult = topKey.replace(/_/g, ' ').toUpperCase();

        const newResult: QuizResult = {
          id: `res_${quizId}_${Date.now()}`,
          quizId,
          visitorId,
          completedAt: new Date().toISOString(),
          scores,
          primaryResult,
          summary: `Your responses indicate a ${primaryResult} resonance. You thrive in low-pressure, intentional environments.`,
          recommendations: ['Explore quiet tea rooms', 'Establish clear texting rhythms', 'Opt for parallel quiet dates'],
          appliedEffects: quiz?.profileEffects,
        };

        soundEngine.playCue('quiz.complete');

        set((state) => ({
          completedResults: {
            ...state.completedResults,
            [quizId]: newResult,
          },
        }));

        return newResult;
      },

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
          sharedSessions: {},
          userDailyAnswers: {},
          activeStarterCard: null,
        });
      },
    }),
    {
      name: 'everfold.quizzes.v1',
    }
  )
);
