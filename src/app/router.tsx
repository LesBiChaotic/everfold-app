import React, { useEffect } from 'react';
import { createBrowserRouter, Navigate, useLocation } from 'react-router-dom';
import { AppLayout } from '../components/layout/AppLayout';
import { HomeScreen } from '../features/home/HomeScreen';
import { OnboardingFlow } from '../features/onboarding/OnboardingFlow';
import { DiscoverScreen } from '../features/discover/DiscoverScreen';
import { ProfileDetailScreen } from '../features/discover/ProfileDetailScreen';
import { MatchesScreen } from '../features/matches/MatchesScreen';
import { MessagingScreen } from '../features/messages/MessagingScreen';
import { ConnectionsScreen } from '../features/connections/ConnectionsScreen';
import { ForecastScreen } from '../features/forecast/ForecastScreen';
import { PulseScreen } from '../features/pulse/PulseScreen';
import { DatePlannerScreen } from '../features/planner/DatePlannerScreen';
import { JournalScreen } from '../features/journal/JournalScreen';
import { ArchiveScreen } from '../features/archive/ArchiveScreen';
import { Pairwise1999Screen } from '../features/archive/Pairwise1999Screen';
import { AffinityRoom2003Screen } from '../features/archive/AffinityRoom2003Screen';
import { Correspond2008Screen } from '../features/archive/Correspond2008Screen';
import { Fold2015Screen } from '../features/archive/Fold2015Screen';
import { SafetyScreen } from '../features/safety/SafetyScreen';
import { ProfileScreen } from '../features/profile/ProfileScreen';
import { ProfileEditScreen } from '../features/profile/ProfileEditScreen';
import { AvatarBuilderScreen } from '../features/avatar/AvatarBuilderScreen';
import { SettingsScreen } from '../features/settings/SettingsScreen';
import { EvidenceBoardScreen } from '../features/evidence/EvidenceBoardScreen';
import { PreviouslyMatchedScreen } from '../features/member/PreviouslyMatchedScreen';
import { PatternIntegrityScreen } from '../features/archive/PatternIntegrityScreen';
import { RoleResolverScreen } from '../features/internal/RoleResolverScreen';
import { ReturnsScreen } from '../features/archive/ReturnsScreen';
import { Ethics2017Screen } from '../features/internal/Ethics2017Screen';
import { CollisionsScreen } from '../features/archive/CollisionsScreen';
import { TimelineScreen } from '../features/timeline/TimelineScreen';
import { CompareProfilesScreen } from '../features/discover/CompareProfilesScreen';
import { StoryAccessSettings } from '../features/settings/StoryAccessSettings';

// New Social Ecosystem & Community Screens
import { QuizHubScreen } from '../features/quizzes/QuizHubScreen';
import { QuizDetailScreen } from '../features/quizzes/QuizDetailScreen';
import { QuizResultScreen } from '../features/quizzes/QuizResultScreen';
import { TogetherQuizScreen } from '../features/quizzes/TogetherQuizScreen';

import { AdviceHubScreen } from '../features/advice/AdviceHubScreen';
import { AdviceArticleScreen } from '../features/advice/AdviceArticleScreen';
import { AskEverfoldScreen } from '../features/advice/AskEverfoldScreen';

import { SharedStoriesHubScreen } from '../features/stories/SharedStoriesHubScreen';
import { SharedStoryDetailScreen } from '../features/stories/SharedStoryDetailScreen';
import { WhereAreTheyNowScreen } from '../features/stories/WhereAreTheyNowScreen';
import { StorySubmissionWizard } from '../features/stories/StorySubmissionWizard';

import { CommunityHubScreen } from '../features/community/CommunityHubScreen';
import { CommunityRoomScreen } from '../features/community/CommunityRoomScreen';
import { UnsentConfessionsScreen } from '../features/community/UnsentConfessionsScreen';
import { EventsScreen } from '../features/community/EventsScreen';
import { EventChatScreen } from '../features/community/EventChatScreen';
import { AmasScreen } from '../features/community/AmasScreen';

import { HelpCenterScreen } from '../features/help/HelpCenterScreen';
import { HelpArticleScreen } from '../features/help/HelpArticleScreen';
import { SupportTicketScreen } from '../features/help/SupportTicketScreen';
import { MeetTheTeamScreen } from '../features/team/MeetTheTeamScreen';
import { StaffProfileScreen } from '../features/team/StaffProfileScreen';

import { StatusScreen } from '../features/status/StatusScreen';
import { ChangelogScreen } from '../features/status/ChangelogScreen';
import { TransparencyReportsScreen } from '../features/status/TransparencyReportsScreen';

import { RelationshipTimelineScreen } from '../features/relationship/RelationshipTimelineScreen';
import { RelationshipRecapScreen } from '../features/relationship/RelationshipRecapScreen';
import { MemoryCapsuleScreen } from '../features/relationship/MemoryCapsuleScreen';

import { MagazineHubScreen } from '../features/magazine/MagazineHubScreen';
import { MagazineIssueScreen } from '../features/magazine/MagazineIssueScreen';
import { PodcastHubScreen } from '../features/podcast/PodcastHubScreen';
import { PodcastEpisodeScreen } from '../features/podcast/PodcastEpisodeScreen';

import { useARGStore } from '../store/argStore';

// Dynamic route title updater & page visit tracker
export const RouteTitleSync: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const { recordVisit } = useARGStore();

  useEffect(() => {
    const path = location.pathname;
    let title = 'Everfold — Slow Dating & Relational Depth';

    if (path.includes('/discover')) {
      title = 'Discover Matches — Everfold';
      recordVisit('discover');
    } else if (path.includes('/matches')) {
      title = 'Mutual Connections — Everfold';
      recordVisit('connections');
    } else if (path.includes('/messages')) {
      title = 'Unhurried Letters — Everfold';
      recordVisit('messages');
    } else if (path.includes('/quizzes')) {
      title = 'Relational Alignment & Quizzes — Everfold';
    } else if (path.includes('/advice')) {
      title = 'Relationship Science & Advice — Everfold';
    } else if (path.includes('/stories')) {
      title = 'Shared Stories — Everfold';
    } else if (path.includes('/community')) {
      title = 'Community Hub — Everfold';
    } else if (path.includes('/help')) {
      title = 'Help & Knowledge Base — Everfold';
    } else if (path.includes('/status')) {
      title = 'System Status — Everfold';
    } else if (path.includes('/magazine')) {
      title = 'Everfold Magazine & Journal — Everfold';
    }

    document.title = title;
  }, [location.pathname]);

  return <>{children}</>;
};

export const router = createBrowserRouter([
  {
    path: '/onboarding',
    element: <OnboardingFlow />
  },
  {
    path: '/',
    element: (
      <RouteTitleSync>
        <AppLayout />
      </RouteTitleSync>
    ),
    children: [
      { index: true, element: <Navigate to="/home" replace /> },
      { path: 'home', element: <HomeScreen /> },
      { path: 'discover', element: <DiscoverScreen /> },
      { path: 'discover/compare', element: <CompareProfilesScreen /> },
      { path: 'discover/:userId', element: <ProfileDetailScreen /> },
      { path: 'matches', element: <MatchesScreen /> },
      { path: 'messages', element: <MessagingScreen /> },
      { path: 'messages/:conversationId', element: <MessagingScreen /> },
      { path: 'connections', element: <ConnectionsScreen /> },
      { path: 'connections/:userId', element: <ProfileDetailScreen /> },
      { path: 'connections/recurrence', element: <ConnectionsScreen /> },
      { path: 'forecast', element: <ForecastScreen /> },
      { path: 'forecast/:relationshipId', element: <ForecastScreen /> },
      { path: 'forecast/raw/:relationshipId', element: <ForecastScreen /> },
      { path: 'pulse', element: <PulseScreen /> },
      { path: 'pulse/:postId', element: <PulseScreen /> },
      { path: 'date-planner', element: <DatePlannerScreen /> },
      { path: 'date-planner/:relationshipId', element: <DatePlannerScreen /> },
      { path: 'journal', element: <JournalScreen /> },
      { path: 'journal/:entryId', element: <JournalScreen /> },

      // Quizzes
      { path: 'quizzes', element: <QuizHubScreen /> },
      { path: 'quizzes/:quizId', element: <QuizDetailScreen /> },
      { path: 'quizzes/results/:resultId', element: <QuizResultScreen /> },
      { path: 'quizzes/together/:quizId', element: <TogetherQuizScreen /> },

      // Advice
      { path: 'advice', element: <AdviceHubScreen /> },
      { path: 'advice/:articleId', element: <AdviceArticleScreen /> },
      { path: 'advice/ask', element: <AskEverfoldScreen /> },

      // Shared Stories
      { path: 'stories', element: <SharedStoriesHubScreen /> },
      { path: 'stories/:storyId', element: <SharedStoryDetailScreen /> },
      { path: 'stories/where-are-they-now', element: <WhereAreTheyNowScreen /> },
      { path: 'stories/submit', element: <StorySubmissionWizard /> },

      // Community
      { path: 'community', element: <CommunityHubScreen /> },
      { path: 'community/rooms/:roomId', element: <CommunityRoomScreen /> },
      { path: 'community/unsent', element: <UnsentConfessionsScreen /> },
      { path: 'community/events', element: <EventsScreen /> },
      { path: 'community/events/:eventId/chat', element: <EventChatScreen /> },
      { path: 'community/amas', element: <AmasScreen /> },
      { path: 'events', element: <EventsScreen /> },
      { path: 'events/:eventId/chat', element: <EventChatScreen /> },

      // Help Center & Support Tickets
      { path: 'help', element: <HelpCenterScreen /> },
      { path: 'help/articles/:articleId', element: <HelpArticleScreen /> },
      { path: 'help/tickets', element: <SupportTicketScreen /> },
      { path: 'help/tickets/:ticketId', element: <SupportTicketScreen /> },
      { path: 'team', element: <MeetTheTeamScreen /> },
      { path: 'team/:staffId', element: <StaffProfileScreen /> },

      // Status & Changelog
      { path: 'status', element: <StatusScreen /> },
      { path: 'changelog', element: <ChangelogScreen /> },
      { path: 'transparency', element: <TransparencyReportsScreen /> },

      // Relationship Ecosystem
      { path: 'relationship/:relationshipId/timeline', element: <RelationshipTimelineScreen /> },
      { path: 'relationship/:relationshipId/recaps', element: <RelationshipRecapScreen /> },
      { path: 'relationship/:relationshipId/memories', element: <MemoryCapsuleScreen /> },

      // Magazine & Podcast
      { path: 'magazine', element: <MagazineHubScreen /> },
      { path: 'magazine/:issueId', element: <MagazineIssueScreen /> },
      { path: 'magazine/articles/:articleId', element: <MagazineIssueScreen /> },
      { path: 'magazine/podcast', element: <PodcastHubScreen /> },
      { path: 'magazine/podcast/:episodeId', element: <PodcastEpisodeScreen /> },

      // Archive & System Internal
      { path: 'archive', element: <ArchiveScreen /> },
      { path: 'archive/item/:archiveId', element: <ArchiveScreen /> },
      { path: 'archive/profile/:archiveId', element: <ArchiveScreen /> },
      { path: 'archive/legacy', element: <ArchiveScreen /> },
      { path: 'archive/legacy/pairwise', element: <Pairwise1999Screen /> },
      { path: 'archive/legacy/affinity-room', element: <AffinityRoom2003Screen /> },
      { path: 'archive/legacy/correspond', element: <Correspond2008Screen /> },
      { path: 'archive/legacy/fold', element: <Fold2015Screen /> },
      { path: 'archive/pattern-integrity', element: <PatternIntegrityScreen /> },
      { path: 'archive/returns', element: <ReturnsScreen /> },
      { path: 'archive/collisions', element: <CollisionsScreen /> },
      { path: 'timeline', element: <TimelineScreen /> },
      { path: 'internal/trust', element: <SafetyScreen /> },
      { path: 'internal/trust/:caseId', element: <SafetyScreen /> },
      { path: 'internal/role-resolver', element: <RoleResolverScreen /> },
      { path: 'internal/ethics/2017', element: <Ethics2017Screen /> },
      { path: 'safety', element: <SafetyScreen /> },
      { path: 'profile', element: <ProfileScreen /> },
      { path: 'profile/edit', element: <ProfileEditScreen /> },
      { path: 'avatar', element: <AvatarBuilderScreen /> },
      { path: 'settings', element: <SettingsScreen /> },
      { path: 'settings/story-access', element: <StoryAccessSettings /> },
      { path: 'story-access', element: <Navigate to="/settings/story-access" replace /> },
      { path: 'settings/appearance', element: <SettingsScreen /> },
      { path: 'settings/accessibility', element: <SettingsScreen /> },
      { path: 'settings/notifications', element: <SettingsScreen /> },
      { path: 'settings/privacy', element: <SettingsScreen /> },
      { path: 'settings/data', element: <SettingsScreen /> },
      { path: 'case-notes', element: <EvidenceBoardScreen /> },
      { path: 'case-notes/interpretation', element: <EvidenceBoardScreen /> },
      { path: 'member/previouslymatched', element: <PreviouslyMatchedScreen /> },
      { path: '*', element: <Navigate to="/home" replace /> }
    ]
  }
]);
