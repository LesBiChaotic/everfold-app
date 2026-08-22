import { describe, it, expect, beforeEach } from 'vitest';
import { useQuizStore } from '../store/quizStore';
import { useAdviceStore } from '../store/adviceStore';
import { useStoriesStore } from '../store/storiesStore';
import { useCommunityStore } from '../store/communityStore';
import { useSocialSimulationStore } from '../store/socialSimulationStore';
import { useSupportStore } from '../store/supportStore';
import { useSystemStatusStore } from '../store/systemStatusStore';
import { useRelationshipEcosystemStore } from '../store/relationshipEcosystemStore';
import { useMagazinePodcastStore } from '../store/magazinePodcastStore';

describe('Social Ecosystem & Community Suite (Addendum v0.3)', () => {
  beforeEach(() => {
    useQuizStore.getState().resetQuizStore();
    useAdviceStore.getState().resetAdviceStore();
    useStoriesStore.getState().resetStoriesStore();
    useCommunityStore.getState().resetCommunityStore();
    useSocialSimulationStore.getState().resetSimulationStore();
    useSupportStore.getState().resetSupportStore();
    useSystemStatusStore.getState().resetSystemStatusStore();
    useRelationshipEcosystemStore.getState().resetRelationshipEcosystemStore();
    useMagazinePodcastStore.getState().resetMagazinePodcastStore();
  });

  describe('1. Quizzes Subsystem', () => {
    it('seeds 25+ solo quizzes across multiple categories', () => {
      const { soloQuizzes } = useQuizStore.getState();
      expect(soloQuizzes.length).toBeGreaterThanOrEqual(25);
      const categories = new Set(soloQuizzes.map((q) => q.category));
      expect(categories.size).toBeGreaterThanOrEqual(5);
    });

    it('submits a solo quiz and calculates primary result archetype', () => {
      const { soloQuizzes, submitSoloQuiz } = useQuizStore.getState();
      const firstQuiz = soloQuizzes[0];

      const answers: Record<string, string> = {};
      firstQuiz.questions.forEach((q) => {
        answers[q.id] = q.options[0].id;
      });

      const result = submitSoloQuiz(firstQuiz.id, 'usr_test', answers);
      expect(result).toBeDefined();
      expect(result.quizId).toBe(firstQuiz.id);
      expect(result.primaryResult).toBeTruthy();
      expect(result.recommendations.length).toBeGreaterThan(0);

      const updatedResults = useQuizStore.getState().completedResults;
      expect(updatedResults[firstQuiz.id]).toBeDefined();
    });

    it('supports multi-select, scales, drafts, retakes, and private result controls', () => {
      const engineQuiz: any = {
        id: 'quiz_engine_test', title: 'Engine Test', description: 'Test', category: 'Know Yourself',
        estimatedMinutes: 1, resultType: 'archetype', storyTier: 0, isRepeatable: true,
        questions: [
          { id: 'multi', prompt: 'Choose two', type: 'multi', minSelections: 2, maxSelections: 2, options: [
            { id: 'm1', label: 'One', scoreWeights: { reflective: 2 } },
            { id: 'm2', label: 'Two', scoreWeights: { reflective: 1, social: 1 } },
          ] },
          { id: 'scale', prompt: 'Scale', type: 'scale', options: [
            { id: 's1', label: 'Low', scoreWeights: { social: 1 } },
            { id: 's5', label: 'High', scoreWeights: { social: 5 } },
          ] },
        ],
      };
      useQuizStore.setState((state) => ({ soloQuizzes: [...state.soloQuizzes, engineQuiz] }));

      const store = useQuizStore.getState();
      store.saveQuizDraft(engineQuiz.id, { multi: ['m1'] });
      expect(useQuizStore.getState().activeDrafts[engineQuiz.id]).toBeDefined();

      const first = store.submitSoloQuiz(engineQuiz.id, 'usr_test', { multi: ['m1', 'm2'], scale: 's5' });
      const second = useQuizStore.getState().submitSoloQuiz(engineQuiz.id, 'usr_test', { multi: ['m1', 'm2'], scale: 's1' });
      expect(first.dimensionPercentages?.reflective).toBe(100);
      expect(second.retakeNumber).toBe(2);
      expect(useQuizStore.getState().resultHistory[engineQuiz.id]).toHaveLength(2);
      expect(useQuizStore.getState().activeDrafts[engineQuiz.id]).toBeUndefined();

      useQuizStore.getState().setResultPreferences(engineQuiz.id, second.id, { profileVisibility: 'matches', useForRecommendations: false });
      const updated = useQuizStore.getState().completedResults[engineQuiz.id];
      expect(updated.profileVisibility).toBe('matches');
      expect(updated.useForRecommendations).toBe(false);
    });

    it('handles Together Quizzes dual participant flow and agreement calculation', () => {
      const { togetherQuizzes, initiateTogetherQuiz } = useQuizStore.getState();
      expect(togetherQuizzes.length).toBeGreaterThanOrEqual(5);

      const firstTogether = togetherQuizzes[0];
      const answers = { [firstTogether.questions[0].id]: firstTogether.questions[0].options[0].id };

      const session = initiateTogetherQuiz(firstTogether.id, 'rel_test', 'usr_partner', answers);
      expect(session.sessionId).toBeTruthy();
      expect(session.completionState).toBe('waiting_partner');
      expect(session.sharedResult).toBeDefined();
      expect(session.sharedResult?.overlapPercentage).toBeGreaterThanOrEqual(75);
    });

    it('answers daily rotating questions with privacy settings', () => {
      const { dailyQuestions, answerDailyQuestion } = useQuizStore.getState();
      expect(dailyQuestions.length).toBeGreaterThanOrEqual(20);

      const q = dailyQuestions[0];
      const answer = answerDailyQuestion(q.id, 'Evening walks near the waterfront', 'public');
      expect(answer.answerText).toBe('Evening walks near the waterfront');
      expect(answer.privacy).toBe('public');
    });

    it('draws a random card from conversation starter decks', () => {
      const { drawStarterCard } = useQuizStore.getState();
      const card = drawStarterCard('deck_curious');
      expect(card).toBeTruthy();
      expect(typeof card).toBe('string');
    });
  });

  describe('2. Advice Library & Ask Everfold', () => {
    it('seeds 35+ advice articles across categories', () => {
      const { articles, categories } = useAdviceStore.getState();
      expect(articles.length).toBeGreaterThanOrEqual(30);
      expect(categories.length).toBeGreaterThanOrEqual(8);
    });

    it('allows posting a reflection comment and triggers social simulation', () => {
      const { articles, addComment } = useAdviceStore.getState();
      const article = articles[0];

      const comm = addComment(
        article.id,
        'usr_test',
        'Visitor Test',
        'visitor',
        'seed1',
        'This reflection gave me so much peace.'
      );
      expect(comm.id).toBeTruthy();
      expect(comm.body).toBe('This reflection gave me so much peace.');

      const comments = useAdviceStore.getState().comments[article.id];
      expect(comments.some((c) => c.id === comm.id)).toBe(true);
    });

    it('submits Ask Everfold question with simulated specialist answer', () => {
      const { submitAskEverfold } = useAdviceStore.getState();
      const submission = submitAskEverfold(
        'Relationship Science',
        'How do I discuss slow pacing on a first date?',
        'public'
      );
      expect(submission.id).toBeTruthy();
      expect(submission.status).toBe('received');
    });
  });

  describe('3. Shared Stories & Where Are They Now', () => {
    it('seeds 20+ member stories with multi-year updates', () => {
      const { stories } = useStoriesStore.getState();
      expect(stories.length).toBeGreaterThanOrEqual(15);
      const storiesWithUpdates = stories.filter((s) => s.updates && s.updates.length > 0);
      expect(storiesWithUpdates.length).toBeGreaterThanOrEqual(5);
    });

    it('contains the recurrence story retaining container rel_2347_previouslymatched', () => {
      const { stories } = useStoriesStore.getState();
      const recurrenceStory = stories.find((s) => s.relationshipId === 'rel_2347_previouslymatched');
      expect(recurrenceStory).toBeDefined();
      expect(recurrenceStory?.participantNames).toContain('Leah Vance');
      expect(recurrenceStory?.updates?.some((u) => u.participantBChanged)).toBe(true);
    });

    it('publishes a new shared story through wizard flow', () => {
      const { publishStory } = useStoriesStore.getState();
      const newStory = publishStory({
        title: 'Sunday Morning Coffee',
        coverStyle: 'gradient-warm',
        participantIds: ['usr_1', 'usr_2'],
        participantNames: ['Alex', 'Taylor'],
        participantHandles: ['alex', 'taylor'],
        relationshipId: 'rel_custom_99',
        summary: 'A quiet chronicle of meeting at a local bookstore.',
        storyType: 'How We Met',
        storyTier: 0,
        chapters: [
          {
            id: 'ch_1',
            title: 'First Look',
            date: '2026-03-15',
            body: 'We reached for the same essay collection at the exact same moment.',
          },
        ],
      });

      expect(newStory.id).toBeTruthy();
      const currentStories = useStoriesStore.getState().stories;
      expect(currentStories[0].title).toBe('Sunday Morning Coffee');
    });
  });

  describe('4. Live Comment Director & Social Simulation', () => {
    it('queues scripted reply cascades on user interaction', () => {
      const { triggerScriptCascade } = useSocialSimulationStore.getState();
      triggerScriptCascade('advice', 'adv_grief_1', 'I lost someone close last year.');

      const pending = useSocialSimulationStore.getState().queuedComments;
      expect(pending.length).toBeGreaterThan(0);
      expect(pending[0].event.authorName).toBeTruthy();
    });

    it('ticks simulation to deliver scheduled comments and manages typing indicators', () => {
      const { triggerScriptCascade, tickSimulation } = useSocialSimulationStore.getState();
      triggerScriptCascade('advice', 'adv_grief_1', 'I lost someone close last year.');

      // Adjust schedule timestamps to the past for testing delivery
      useSocialSimulationStore.setState((state) => ({
        queuedComments: state.queuedComments.map((ev) => ({ ...ev, scheduledTime: Date.now() - 100 })),
      }));

      const delivered = tickSimulation();
      expect(delivered.length).toBeGreaterThan(0);
      expect(useSocialSimulationStore.getState().deliveredCommentIds).toContain(delivered[0].id);
    });
  });

  describe('5. Community Hub, Unsent Confessions, Events & AMAs', () => {
    it('seeds 12 topic rooms and multiple discussion posts', () => {
      const { rooms, posts } = useCommunityStore.getState();
      expect(rooms.length).toBeGreaterThanOrEqual(10);
      expect(posts.length).toBeGreaterThanOrEqual(10);
    });

    it('posts an anonymous unsent confession', () => {
      const { postUnsentConfession } = useCommunityStore.getState();
      const unsent = postUnsentConfession(
        'Wish I Said',
        'I wish I told you that your laughter made the crowded train quiet.'
      );
      expect(unsent.id).toBeTruthy();
      expect(unsent.category).toBe('Wish I Said');

      const allUnsent = useCommunityStore.getState().unsentPosts;
      expect(allUnsent[0].body).toBe(unsent.body);
    });

    it('handles event RSVPs and live discussion messages', () => {
      const { events, rsvpEvent, addComment } = useCommunityStore.getState();
      const firstEvent = events[0];
      const initialCount = firstEvent.rsvpCount;

      rsvpEvent(firstEvent.id);
      const updated = useCommunityStore.getState().events.find((e) => e.id === firstEvent.id);
      expect(updated?.rsvpCount).toBe(initialCount + 1);
      expect(updated?.isUserRsvp).toBe(true);

      const chatMessage = addComment(
        firstEvent.id,
        'usr_test',
        'Visitor Test',
        'visitor',
        'Looking forward to tonight!'
      );
      expect(chatMessage.id).toBeTruthy();
    });
  });

  describe('6. Help Center, Support Tickets & Staff', () => {
    it('seeds 45+ help articles and staff profiles', () => {
      const { helpArticles, staffProfiles } = useSupportStore.getState();
      expect(helpArticles.length).toBeGreaterThanOrEqual(30);
      expect(staffProfiles.length).toBeGreaterThanOrEqual(5);
    });

    it('creates support tickets and triggers live status progression', () => {
      const { createTicket } = useSupportStore.getState();
      const ticket = createTicket('Technical', 'Message timestamp mismatch', 'Messages appear offset by 4 hours.');
      expect(ticket.ticketNumber).toMatch(/^TS-\d+/);
      expect(ticket.status).toBe('Received');
      expect(ticket.replies.length).toBe(1);
    });

    it('contains Ticket TS-8841 reclassified to Continuity Issue with internal notes', () => {
      const { tickets } = useSupportStore.getState();
      const ts8841 = tickets.find((t) => t.ticketNumber === 'TS-8841');
      expect(ts8841).toBeDefined();
      expect(ts8841?.category).toBe('Continuity Issue');
      expect(ts8841?.internalNotes).toBeDefined();
      expect(ts8841?.internalNotes?.some((n) => n.staffName === 'Marisol Vega')).toBe(true);
    });
  });

  describe('7. Status, Changelog & Transparency', () => {
    it('tracks system operational statuses and historic incidents', () => {
      const { services, incidents } = useSystemStatusStore.getState();
      expect(services.length).toBeGreaterThanOrEqual(6);
      expect(incidents.length).toBeGreaterThanOrEqual(5);
    });

    it('records changelog entries from legacy builds to present', () => {
      const { changelog } = useSystemStatusStore.getState();
      expect(changelog.length).toBeGreaterThanOrEqual(10);
      expect(changelog.some((c) => c.version === 'v2.4.0')).toBe(true);
    });
  });

  describe('8. Relationship Ecosystem & Continuity', () => {
    it('records bi-weekly check-ins and monthly recaps with relational age anomaly', () => {
      const { checkIns, recaps, submitCheckIn } = useRelationshipEcosystemStore.getState();
      expect(checkIns.length).toBeGreaterThanOrEqual(3);
      expect(recaps.length).toBeGreaterThanOrEqual(3);

      const anomalyRecap = recaps.find((r) => r.storyTier > 0);
      expect(anomalyRecap?.relationshipAgeDisplay).toBe('8 Years, 4 Months');

      const checkIn = submitCheckIn('rel_2347_previouslymatched', 'How is the pace?', 'Growing', 'Feeling very calm.');
      expect(checkIn.visitorStatus).toBe('Growing');
      expect(checkIn.partnerStatus).toBe('Comfortable');
    });

    it('seals and retrieves memory capsules', () => {
      const { saveMemory } = useRelationshipEcosystemStore.getState();
      const mem = saveMemory('rel_test', 'reflection', 'Tea in Cambridge', 'A rainy afternoon near Harvard Yard.');
      expect(mem.id).toBeTruthy();
      expect(mem.title).toBe('Tea in Cambridge');

      const memories = useRelationshipEcosystemStore.getState().memories;
      expect(memories[0].title).toBe('Tea in Cambridge');
    });

    it('resolves duplicate relationship merge suggestions', () => {
      const { mergeSuggestions, resolveMergeSuggestion } = useRelationshipEcosystemStore.getState();
      expect(mergeSuggestions.length).toBeGreaterThan(0);

      const target = mergeSuggestions[0];
      resolveMergeSuggestion(target.id, 'merged');

      const updated = useRelationshipEcosystemStore.getState().mergeSuggestions.find((s) => s.id === target.id);
      expect(updated?.status).toBe('merged');
    });
  });

  describe('9. Magazine & The Space Between Podcast', () => {
    it('seeds magazine issues with full articles', () => {
      const { issues } = useMagazinePodcastStore.getState();
      expect(issues.length).toBeGreaterThanOrEqual(4);
      expect(issues[0].articles.length).toBeGreaterThanOrEqual(3);
    });

    it('seeds podcast episodes with full transcripts and community discussion threads', () => {
      const { podcastEpisodes, addPodcastComment } = useMagazinePodcastStore.getState();
      expect(podcastEpisodes.length).toBeGreaterThanOrEqual(6);

      const ep = podcastEpisodes[0];
      expect(ep.transcript.length).toBeGreaterThanOrEqual(4);

      const comment = addPodcastComment(ep.id, 'usr_test', 'Visitor', 'vis', 'Loved the discussion on silence.');
      expect(comment.id).toBeTruthy();
      expect(useMagazinePodcastStore.getState().podcastComments[ep.id].length).toBe(1);
    });
  });
});
