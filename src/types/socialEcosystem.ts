import { StoryAccessMode } from './index';

// --- QUIZZES ---
export type QuizCategory =
  | 'Know Yourself'
  | 'Dating Style'
  | 'Communication'
  | 'Compatibility'
  | 'First Dates'
  | 'Lifestyle'
  | 'Relationship Pace'
  | 'Shared Life'
  | 'Just for Fun'
  | 'Together';

export interface QuizOption {
  id: string;
  label: string;
  sublabel?: string;
  categoryTag?: string;
  scoreWeights: Record<string, number>;
}

export interface QuizQuestion {
  id: string;
  prompt: string;
  subtitle?: string;
  type: 'single' | 'multi' | 'scale';
  options: QuizOption[];
  allowSkip?: boolean;
  minSelections?: number;
  maxSelections?: number;
  scaleLabels?: { low: string; high: string };
  storyFlags?: string[];
}

export type QuizAnswerValue = string | string[];
export type QuizAnswerMap = Record<string, QuizAnswerValue>;

export interface QuizOutcomeDefinition {
  key: string;
  label: string;
  summary: string;
  recommendations: string[];
}

export interface QuizResultProfileEffect {
  badgeLabel: string;
  discoverBoostTag?: string;
  datePlannerPreference?: string;
}

export interface Quiz {
  id: string;
  title: string;
  description: string;
  category: QuizCategory;
  estimatedMinutes: number;
  iconName?: string;
  isTogether?: boolean;
  isRepeatable?: boolean;
  questions: QuizQuestion[];
  resultType: 'archetype' | 'percentage' | 'compatibility';
  storyTier: number; // 0 normal to 7 ARG
  unlockRequirements?: string[];
  profileEffects?: QuizResultProfileEffect[];
  outcomes?: QuizOutcomeDefinition[];
}

export interface QuizResult {
  id: string;
  quizId: string;
  visitorId: string;
  completedAt: string;
  scores: Record<string, number>;
  dimensionPercentages?: Record<string, number>;
  primaryResult: string;
  secondaryResults?: string[];
  summary: string;
  recommendations: string[];
  answers?: QuizAnswerMap;
  retakeNumber?: number;
  profileVisibility?: 'private' | 'matches' | 'public';
  useForRecommendations?: boolean;
  appliedEffects?: QuizResultProfileEffect[];
}

export interface SharedQuizSession {
  sessionId: string;
  quizId: string;
  relationshipId: string;
  partnerUserId: string;
  participantAnswers: {
    visitor: QuizAnswerMap;
    partner: QuizAnswerMap;
  };
  completionState: 'waiting_partner' | 'ready_to_reveal' | 'revealed';
  sharedResult?: {
    overlapPercentage: number;
    agreements: string[];
    differences: string[];
    conversationStarter: string;
  };
}

export interface DailyQuestion {
  id: string;
  dayIndex: number;
  prompt: string;
  category: string;
  suggestedAnswers?: string[];
}

export interface UserDailyAnswer {
  questionId: string;
  answerText: string;
  privacy: 'public' | 'matches' | 'private';
  answeredAt: string;
}

export interface ConversationStarterDeck {
  id: string;
  name: string;
  category: 'Silly' | 'Curious' | 'Deep' | 'Practical' | 'Date-night' | 'Reflective' | 'Wildcard';
  cards: string[];
}

// --- ADVICE LIBRARY ---
export interface AdviceCategory {
  id: string;
  name: string;
  description: string;
  iconName: string;
}

export interface AdviceComment {
  id: string;
  articleId: string;
  authorId: string;
  authorName: string;
  authorHandle: string;
  avatarSeed: string;
  body: string;
  publishedAt: string;
  helpfulCount: number;
  relatableCount: number;
  replies?: AdviceComment[];
  isStaff?: boolean;
  staffRole?: string;
  storyTier?: number;
}

export interface AdviceArticle {
  id: string;
  title: string;
  dek: string;
  categoryId: string;
  authorName: string;
  authorRole: string;
  authorAvatar: string;
  authorType: 'Relationship Science' | 'Trust & Safety' | 'Community' | 'Editorial' | 'Guest Expert';
  publishedAt: string;
  updatedAt?: string;
  readingTimeMinutes: number;
  contentMarkdown: string;
  relatedArticleIds?: string[];
  commentsCount: number;
  storyTier: number;
  previewSummary?: string;
}

export interface AskEverfoldSubmission {
  id: string;
  category: 'Relationship Science' | 'Trust & Safety' | 'Community' | 'Date Planning';
  question: string;
  privacy: 'public' | 'anonymous' | 'private';
  submittedAt: string;
  status: 'received' | 'answered';
  scriptedAnswer?: {
    author: string;
    role: string;
    answeredAt: string;
    body: string;
  };
}

// --- SHARED STORIES ---
export interface SharedStoryChapter {
  id: string;
  title: string;
  date: string;
  body: string;
  milestoneTitle?: string;
}

export interface SharedStoryUpdate {
  id: string;
  year: number;
  title: string;
  status: 'Together' | 'Married' | 'Bereaved' | 'Together Again' | 'Reconnected' | 'Amicable Friends' | 'Paused' | 'Close Friends' | 'Moving In';
  body: string;
  participantBChanged?: boolean;
  participantBName?: string;
}

export interface SharedStoryComment {
  id: string;
  storyId: string;
  authorId: string;
  authorName: string;
  authorHandle: string;
  body: string;
  publishedAt: string;
  heartCount: number;
}

export interface SharedStory {
  id: string;
  title: string;
  coverStyle: string; // gradient or theme tag
  participantIds: string[];
  participantNames: string[];
  participantHandles: string[];
  relationshipId: string;
  summary: string;
  storyType:
    | 'How We Met'
    | 'First Date Disaster'
    | 'Becoming Official'
    | 'Long Distance'
    | 'Moving In'
    | 'Second Chances'
    | 'Queer Late Bloomers'
    | 'Friendship After Dating'
    | 'Kind Breakups'
    | 'Marriage'
    | 'Blended Families'
    | 'Reconnecting'
    | 'Dating After Grief';
  publishedAt: string;
  featured?: boolean;
  chapters: SharedStoryChapter[];
  updates?: SharedStoryUpdate[];
  storyTier: number;
  memorializedParticipantIds?: string[];
}

// --- COMMUNITY, ROOMS & UNSENT ---
export interface CommunityRoom {
  id: string;
  name: string;
  slug: string;
  category: 'Interests' | 'Identity & Life' | 'Lifestyle' | 'Local Boards';
  description: string;
  memberCount: number;
  pinnedPostId?: string;
  moderators: string[];
}

export interface CommunityReactionMap {
  helpful: number;
  relatable: number;
  laugh: number;
  thoughtful: number;
  seenThisToo?: number;
  needsEvidence?: number;
}

export interface CommunityComment {
  id: string;
  postId: string;
  authorId: string;
  authorName: string;
  authorHandle: string;
  body: string;
  publishedAt: string;
  replyToCommentId?: string;
  reactions: CommunityReactionMap;
  isEdited?: boolean;
  isDeleted?: boolean;
  isModeratorRemoved?: boolean;
  storyTier?: number;
}

export interface CommunityPollOption {
  id: string;
  text: string;
  votes: number;
}

export interface CommunityPost {
  id: string;
  roomId: string;
  authorId: string;
  authorName: string;
  authorHandle: string;
  title: string;
  body: string;
  publishedAt: string;
  isPinned?: boolean;
  reactions: CommunityReactionMap;
  poll?: {
    id: string;
    question: string;
    options: CommunityPollOption[];
    totalVotes: number;
    userVotedOptionId?: string;
  };
  commentsCount: number;
  storyTier: number;
  moderationLabel?: 'Rumor' | 'Unverified' | 'Needs Evidence' | 'Verified' | 'Debunked' | 'Unresolved';
}

export interface AnonymousUnsentPost {
  id: string;
  category: 'Wish I Said' | 'First Date Regret' | 'Secret Admiration' | 'Breakup Words' | 'Late Realization';
  body: string;
  postedAt: string;
  reactions: {
    feltThis: number;
    heartbroken: number;
    healing: number;
  };
  storyTier: number;
}

export interface CommunityEvent {
  id: string;
  title: string;
  description: string;
  category: string;
  hostName: string;
  scheduledTime: string;
  locationOrUrl: string;
  capacity: number;
  rsvpCount: number;
  isUserRsvp: boolean;
  rules: string[];
  accessibilityNotes: string;
  storyTier: number;
}

export interface EventChatMessage {
  id: string;
  eventId: string;
  authorId: string;
  authorName: string;
  authorHandle: string;
  body: string;
  timestamp: string;
  isStaff?: boolean;
}

export interface CommunityAMA {
  id: string;
  title: string;
  hostName: string;
  hostRole: string;
  hostAvatar: string;
  scheduledTime: string;
  status: 'upcoming' | 'live' | 'archived';
  description: string;
  qaPairs: Array<{
    id: string;
    askedBy: string;
    question: string;
    answeredBy: string;
    answer: string;
    answeredAt: string;
  }>;
  storyTier: number;
}

// --- SOCIAL SIMULATION & LIVE COMMENTS ---
export interface LiveCommentEvent {
  id: string;
  delayMs: number;
  authorId: string;
  authorName: string;
  authorHandle: string;
  body: string;
  replyToAuthorHandle?: string;
  reactionType?: keyof CommunityReactionMap;
  typingDurationMs?: number;
  storyTier?: number;
}

export interface LiveCommentScript {
  id: string;
  sourceType: 'post' | 'advice' | 'story' | 'podcast' | 'event';
  sourceId: string;
  triggerKeywords: string[];
  defaultBranchEvents: LiveCommentEvent[];
  intentBranches?: Record<string, LiveCommentEvent[]>;
}

// --- HELP CENTER & SUPPORT ---
export interface SupportArticle {
  id: string;
  categoryId: string;
  title: string;
  summary: string;
  contentMarkdown: string;
  helpfulYesCount: number;
  helpfulNoCount: number;
  relatedArticleIds?: string[];
  storyTier: number;
  lateSearchKeywords?: string[];
}

export interface SupportReply {
  id: string;
  authorName: string;
  authorRole: string;
  isStaff: boolean;
  timestamp: string;
  body: string;
}

export interface SupportInternalNote {
  id: string;
  staffName: string;
  timestamp: string;
  note: string;
  classification: string;
  linkedCaseId?: string;
}

export interface SupportTicket {
  id: string;
  ticketNumber: string;
  category: 'Account' | 'Matching' | 'Forecast' | 'Archive' | 'Privacy' | 'Technical' | 'Continuity Issue';
  subject: string;
  description: string;
  status: 'Received' | 'Assigned' | 'Reviewing' | 'Waiting for User' | 'Escalated' | 'Resolved' | 'Closed';
  createdAt: string;
  updatedAt: string;
  replies: SupportReply[];
  internalNotes?: SupportInternalNote[];
  reclassifiedToContinuity?: boolean;
  storyTier?: number;
}

export interface StaffProfile {
  id: string;
  name: string;
  role: string;
  department: 'Relationship Science' | 'Trust & Safety' | 'Product Engineering' | 'Editorial';
  bio: string;
  avatarSeed: string;
  joinedYear: number;
  specialty: string;
  publicArticlesCount: number;
  storyTier: number;
}

// --- SYSTEM STATUS & CHANGELOG ---
export interface CompanyStatusService {
  name: string;
  status: 'Operational' | 'Degraded Performance' | 'Partial Outage' | 'Maintenance';
  uptimePercent: number;
}

export interface StatusIncident {
  id: string;
  title: string;
  service: string;
  severity: 'Minor' | 'Major' | 'Maintenance';
  status: 'Investigating' | 'Identified' | 'Monitoring' | 'Resolved';
  startedAt: string;
  resolvedAt?: string;
  description: string;
  storyTier: number;
}

export interface ChangelogEntry {
  version: string;
  releaseDate: string;
  category: 'Features' | 'Performance' | 'Safety' | 'Archive Engine' | 'Core';
  title: string;
  highlights: string[];
  storyTier: number;
}

export interface TransparencyReport {
  id: string;
  period: string; // e.g. "Q1 2026"
  publishedDate: string;
  spamRemoved: number;
  harassmentReports: number;
  accountsSuspended: number;
  appealsProcessed: number;
  appealGrantRate: string;
  continuityInquiries?: number;
  summary: string;
  storyTier: number;
}

// --- RELATIONSHIP ECOSYSTEM & MEMORIES ---
export interface RelationshipCheckIn {
  id: string;
  relationshipId: string;
  prompt: string;
  date: string;
  visitorStatus: 'Curious' | 'Comfortable' | 'Growing' | 'Uncertain' | 'Paused';
  visitorNote?: string;
  partnerStatus?: 'Curious' | 'Comfortable' | 'Growing' | 'Uncertain' | 'Paused';
  partnerNote?: string;
}

export interface RelationshipRecap {
  id: string;
  relationshipId: string;
  month: string; // e.g. "April 2026"
  messagesExchanged: number;
  sharedQuestionsAnswered: number;
  datesCompleted: number;
  memoriesSaved: number;
  topSharedInterest: string;
  relationshipAgeDisplay: string; // Anomaly in late stage: "8 years, 4 months"
  storyTier: number;
}

export interface SavedRelationshipMemory {
  id: string;
  relationshipId: string;
  contentType: 'message' | 'date_note' | 'shared_question' | 'reflection' | 'playlist';
  title: string;
  content: string;
  savedBy: 'visitor' | 'partner' | 'systemRecovered';
  savedAt: string;
  openAt?: string;
  isShared: boolean;
}

export interface RelationshipMilestone {
  id: string;
  relationshipId: string;
  title: string;
  date: string;
  category: 'Connection' | 'Communication' | 'Date' | 'Memory';
  icon: string;
  storyTier: number;
}

export interface RelationshipMergeSuggestion {
  id: string;
  relationshipIdA: string;
  relationshipIdB: string;
  participantAName: string;
  participantBName: string;
  confidence: number;
  reasons: string[];
  status: 'pending' | 'merged' | 'kept_separate';
}

// --- MAGAZINE & PODCAST ---
export interface MagazineArticle {
  id: string;
  issueNumber: number;
  title: string;
  dek: string;
  category: 'Essay' | 'Advice' | 'Community' | 'Data Science' | 'Interview' | 'Date Blueprint' | 'Architecture' | 'Science' | 'Manifesto';
  author: string;
  readTimeMinutes: number;
  contentMarkdown: string;
}

export interface MagazineIssue {
  id: string;
  number: number;
  title: string;
  publishedMonth: string;
  theme: string;
  coverGradient: string;
  articles: MagazineArticle[];
}

export interface PodcastEpisode {
  id: string;
  number: number;
  title: string;
  subtitle: string;
  guest: string;
  durationText: string;
  publishedDate: string;
  summary: string;
  transcript: Array<{
    speaker: string;
    timestamp: string;
    text: string;
  }>;
  discussionThreadId: string;
  storyTier: number;
}
