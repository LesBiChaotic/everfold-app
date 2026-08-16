export type ARGStage =
  | 0 // NORMAL
  | 1 // MINOR_ODDITIES
  | 2 // PRIOR_CONNECTIONS
  | 3 // LEGACY_ARCHIVE
  | 4 // TRUST_SAFETY_INTERNAL
  | 5 // RECURRENCE
  | 6 // POSTHUMOUS
  | 7 // VISITOR_INVOLVEMENT
  | 8 // CONFLICTED_REALITY;

export type PresenceStatus =
  | 'Active now'
  | 'Recently active'
  | 'Earlier today'
  | 'This week'
  | 'Paused'
  | 'On a date'
  | 'Away'
  | 'Quiet mode'
  | 'Active previously'
  | 'Active elsewhere'
  | 'Status unresolved'
  | 'Present';

export type RelationshipStatus =
  | 'Active'
  | 'Exploring'
  | 'Dating'
  | 'Paused'
  | 'Archived'
  | 'Replaced'
  | 'Ongoing'
  | 'Unresolved';

export interface AvatarConfig {
  faceShape: string;
  skinTone: string;
  eyeShape: string;
  eyeColor: string;
  brows: string;
  nose: string;
  mouth: string;
  lipTone: string;
  freckles: boolean;
  beautyMarks: boolean;
  facialHair: string;
  hairTexture: string;
  hairStyle: string;
  hairColor: string;
  glasses: string;
  piercings: string;
  hearingAids: boolean;
  headCoverings: string;
  jewelry: string;
  top: string;
  outerwear: string;
  background: string;
  backgroundColor: string;
  smallIcon: string;
  moodExpression: string;
  frame: string;
  accentPack: string;
  renderMode?: 'normal' | '1999_dither' | '2003_pixel' | '2008_web2' | '2015_flat';
}

export interface ProfilePromptAnswer {
  id: string;
  question: string;
  answer: string;
}

export interface UserAccount {
  id: string;
  displayName: string;
  handle: string;
  age: number;
  pronouns: string;
  orientation: string;
  city: string;
  country: string;
  occupation: string;
  languages: string[];
  relationshipGoals: string;
  interests: string[];
  lifestyle: {
    drinking?: string;
    smoking?: string;
    pets?: string;
    children?: string;
    diet?: string;
  };
  communicationStyle: string;
  socialEnergy: string;
  schedule: string;
  boundaries: string[];
  dealBreakers: string[];
  profilePromptAnswers: ProfilePromptAnswer[];
  avatarConfig: AvatarConfig;
  status: PresenceStatus;
  createdAt: string;
  lastActive: string;
  isArchived: boolean;
  isDeceased?: boolean;
  legacyAliases: string[];
  visibility: 'public' | 'matches_only' | 'archived' | 'hidden';
  storyFlags: string[];
  bio?: string;
  verified?: boolean;
  locationArea?: string;
  genderIdentity?: string | null; // Additive field as per Addendum v1.0
}

export interface VisitorProfileEcho {
  echoId: string;
  visitorAccountId: string;
  sourcePlatform: string;
  apparentDate: string;
  displaySnapshot: Partial<UserAccount>;
  avatarEcho?: Partial<AvatarConfig>;
  promptFragments?: string[];
  relationshipId?: string;
  provenance: string;
  confidence: number;
  storyTier: number;
}

export interface ExperienceSettings {
  experienceIntensity: 'calm' | 'standard' | 'rich';
  soundTheme: 'soft' | 'paper' | 'glass' | 'minimal';
  ambientTheme: 'rain_window' | 'quiet_office' | 'evening_lounge' | 'archive_room';
  avatarIdleAnimation: boolean;
  microCelebrations: boolean;
  profileEffects: boolean;
}

export interface Relationship {
  relationshipId: string; // STRICTLY decoupled from user account ID
  participantAccountIds: string[];
  participantRoleIds: string[];
  status: RelationshipStatus;
  createdAt: string;
  sourcePlatform: 'Everfold' | 'Pairwise' | 'Affinity Room' | 'Correspond' | 'Fold' | 'Unknown';
  recurrenceIndex: number;
  roleReplacementStatus?: 'None' | 'Candidate_Identified' | 'Active_Replacement' | 'Posthumous_Loop' | 'Unresolved_Continuity';
  continuityConfidence: number; // e.g. 0.998
  participantAssignmentConfidence: number; // e.g. 0.63
  forecastIds: string[];
  messageThreadIds: string[];
  datePlanIds: string[];
  archiveIds: string[];
  previousRelationshipIds: string[];
  systemTags: string[];
  historicalNotes?: string;
}

export interface ProfileVersion {
  versionId: string;
  userId: string;
  platform: string;
  effectiveDate: string;
  fields: Record<string, any>;
  avatarVersion?: Partial<AvatarConfig>;
  source: string;
  integrity: number;
  anomalyTags: string[];
}

export interface Match {
  id: string;
  userId: string;
  relationshipId: string;
  matchedAt: string;
  status: 'New' | 'Mutual' | 'Talking' | 'Paused' | 'Archived' | 'Prior Connection';
  compatibilityScore: number;
  mutualFit: number;
  conversationRhythm: string;
  lifeAlignment: number;
  whyYouMatched: string;
  sharedInterests: string[];
  tags: string[];
  isRecurring?: boolean;
  isHistorical?: boolean;
  isUnresolved?: boolean;
  isPosthumous?: boolean;
}

export interface DialogueChoice {
  choiceId: string;
  label: string;
  userMessage: string;
  responseDelayMs: number;
  botReply: string;
  nextMessageIds?: string[];
  unlockFlags?: string[];
  relationshipImpact?: string;
  delayedEventIds?: string[];
  branchTriggered?: string;
}

export interface Message {
  id: string;
  threadId: string;
  senderId: string;
  createdAt: string;
  serverTimestamp?: string;
  displayTimestamp: string;
  body: string;
  replyToId?: string;
  reactions?: Record<string, string[]>;
  edited?: boolean;
  versions?: { timestamp: string; body: string }[];
  sourcePlatform?: string;
  isSystemGenerated?: boolean;
  storyFlags?: string[];
  dialogueChoices?: DialogueChoice[];
  isAnomalousTimestamp?: boolean;
}

export interface MessageThread {
  id: string;
  relationshipId: string;
  participantIds: string[];
  unreadCount: number;
  lastMessage?: Message;
  isArchived?: boolean;
  isHistorical?: boolean;
  historicalPlatform?: string;
  title?: string;
  storyUnlocked?: boolean;
  activeChoiceBranch?: string;
}

export interface PulsePollOption {
  id: string;
  text: string;
  votes: number;
}

export interface PulsePoll {
  question: string;
  options: PulsePollOption[];
  userVotedOptionId?: string;
  totalVotes: number;
}

export interface PulseReply {
  id: string;
  postId: string;
  authorId: string;
  authorName: string;
  authorHandle: string;
  authorAvatar?: AvatarConfig;
  body: string;
  timestamp: string;
  likes: number;
  userLiked?: boolean;
}

export interface PulsePost {
  id: string;
  authorId: string;
  authorName: string;
  authorHandle: string;
  authorAvatar?: AvatarConfig;
  type: 'text' | 'poll' | 'tiny_win' | 'advice' | 'science' | 'safety' | 'date_recap' | 'prompt' | 'system' | 'archived_repost';
  title?: string;
  body: string;
  poll?: PulsePoll;
  timestamp: string;
  tags: string[];
  reactions: Record<string, number>;
  userReactions: string[];
  replies: PulseReply[];
  storyUnlocked?: boolean;
  requiresStage?: number;
  isHistorical?: boolean;
  anomaly?: boolean;
  pinned?: boolean;
}

export interface ForecastEvent {
  id: string;
  monthOffset: number; // e.g. 1, 3, 6, 12
  title: string;
  description: string;
  category: 'Milestone' | 'Friction' | 'Convergence' | 'External' | 'RETURN' | 'Recurrence';
  probability: number;
  isInvariantReturn?: boolean; // Remains invariant across all scenario toggles
  requiresStage?: number;
}

export interface Forecast {
  id: string;
  relationshipId: string;
  title: string;
  overallScore: number;
  strengths: string[];
  stressPoints: string[];
  communicationPressure: number;
  scheduleFit: number;
  relocationPressure: number;
  familyIntegration: number;
  goalConvergence: number;
  timeline30Days: string;
  timeline6Months: string;
  timeline1Year: string;
  events: ForecastEvent[];
  isRaw?: boolean;
  rawConfidence?: number;
  unresolvedParticipant?: boolean;
  systemNotes?: string;
}

export interface DatePlan {
  id: string;
  relationshipId: string;
  matchUserId: string;
  mood: 'Quiet' | 'Curious' | 'Playful' | 'Outdoors' | 'Food' | 'Arts' | 'Low-key';
  activityType: string;
  venueName: string;
  venueAddress: string;
  venueCategory: string;
  scheduledDate: string;
  scheduledTime: string;
  scheduleFitScore: number;
  comfortNotes: string[];
  safetyCheckInIntervalMinutes: number;
  status: 'Draft' | 'Sent' | 'Confirmed' | 'Completed' | 'Archived';
  previouslyVisitedAnomaly?: boolean;
  createdAt: string;
}

export interface JournalPrompt {
  id: string;
  prompt: string;
  category: string;
  initialLetter: string; // for the RETURN puzzle
}

export interface JournalEntry {
  id: string;
  title: string;
  content: string;
  promptId?: string;
  promptText?: string;
  mood: 'Open' | 'Settled' | 'Unsure' | 'Energized' | 'Guarded' | 'Overwhelmed' | 'Curious' | 'Tender' | 'Disconnected' | 'Hopeful';
  tags: string[];
  matchUserId?: string;
  createdAt: string;
  updatedAt: string;
  isFavorite: boolean;
  isRecoveredDraft?: boolean;
  draftSource?: string;
}

export interface NotificationItem {
  id: string;
  category: 'Matches' | 'Messages' | 'Pulse' | 'Forecast' | 'Dates' | 'Safety' | 'Archive' | 'System';
  title: string;
  body: string;
  timestamp: string;
  isRead: boolean;
  linkUrl?: string;
  isAnomaly?: boolean;
  storyFlag?: string;
}

export interface ArchiveItem {
  id: string;
  platform: 'Everfold' | 'Pairwise' | 'Affinity Room' | 'Correspond' | 'Fold' | 'Internal System';
  year: number;
  type: 'Message Thread' | 'Profile Snapshot' | 'Forecast Artifact' | 'Support Case' | 'Technical Memo' | 'Date Record' | 'Audio Capture' | 'System Log';
  title: string;
  summary: string;
  content: string;
  linkedUserIds: string[];
  linkedRelationshipIds: string[];
  integrity: number; // 0 to 100%
  anomalyCount: number;
  metadata: Record<string, any>;
  requiresUnlocks?: string[];
  puzzleGateId?: string;
  storyFlags?: string[];
  scanImageUrl?: string;
  annotations?: string[];
  isBookmarked?: boolean;
}

export interface TrustSafetyCase {
  id: string;
  caseNumber: string; // e.g. EF-TS-2218
  title: string;
  subjectUserIds: string[];
  linkedRelationshipIds: string[];
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL' | 'RESTRICTED_LORE';
  status: 'OPEN' | 'IN_REVIEW' | 'CLOSED' | 'MONITORED' | 'SEALED_RECURRENCE';
  openedDate: string;
  closedDate?: string;
  assignedStaff: string;
  summary: string;
  investigatorNotes: { author: string; date: string; text: string }[];
  evidenceItems: string[];
  tags: string[];
  relatedCaseNumbers: string[];
}

export interface CompanyDocument {
  id: string;
  title: string;
  department: 'Research & Ethics' | 'Engineering' | 'Executive' | 'Trust & Operations' | 'Longitudinal Studies';
  classification: 'Confidential' | 'Internal Eyes Only' | 'Executive Committee' | 'Ethics Board 2017' | 'Decommissioned Archive';
  date: string;
  author: string;
  content: string;
  tags: string[];
  gateId?: string;
}

export interface EvidenceItem {
  id: string;
  category: 'People' | 'Messages' | 'Dates' | 'Places' | 'Archive' | 'Safety' | 'Internal' | 'Unresolved';
  sourceType: 'Profile' | 'Message' | 'DatePlan' | 'ArchiveItem' | 'TrustCase' | 'CompanyDoc' | 'Forecast' | 'Journal';
  sourceId: string;
  title: string;
  summary: string;
  date: string;
  linkedIds: string[];
  playerNote?: string;
  confidence: 'Unverified' | 'Supported' | 'Strongly Supported';
  autoContradictions?: string[];
}

export interface Puzzle {
  id: string;
  gateNumber?: number;
  title: string;
  type:
    | 'text_input'
    | 'numeric_code'
    | 'select_options'
    | 'graph_align'
    | 'overlay_compare'
    | 'timeline_scrub'
    | 'profile_compare'
    | 'color_sequence'
    | 'document_light_table'
    | 'message_alignment'
    | 'date_card_stack'
    | 'metadata_lookup'
    | 'audio_motif';
  route: string;
  instructions: string;
  inputMode: 'text' | 'numeric' | 'interactive';
  solution: string | string[] | Record<string, any>;
  normalizer: (val: string) => string;
  prerequisites: string[];
  hints: [string, string, string, string]; // 4 hint levels: category, page, method, near-solution
  attemptCount: number;
  completed: boolean;
  rewardFlags: string[];
  failureMessage: string;
  successMessage: string;
}

export interface LiveEvent {
  id: string;
  type:
    | 'message_arrival'
    | 'typing_state'
    | 'pulse_post'
    | 'pulse_reply'
    | 'match_created'
    | 'presence_change'
    | 'notification'
    | 'forecast_recalc'
    | 'archive_unlock'
    | 'arg_anomaly';
  eligibleAt: number; // timestamp or visit count
  delayMs: number;
  prerequisites: string[];
  exclusions?: string[];
  once: boolean;
  payload: any;
  consumed: boolean;
}

export interface TheoryStatus {
  id: 'Predictive' | 'Causative' | 'Continuity' | 'Replacement' | 'Model_Contamination' | 'External_Phenomenon';
  name: string;
  description: string;
  stance: 'Unmarked' | 'Most Likely' | 'Possible' | 'Rejected';
  playerReasoning?: string;
}

export type StoryAccessMode =
  | 'SPOILER_FREE'
  | 'LORE_PREVIEW'
  | 'FULL_ACCESS';

export interface StoryAccessState {
  mode: StoryAccessMode;
  rememberOnDevice: boolean;
  revealHiddenLabels: boolean;
  showLockedPagePreviews: boolean;
  revealHiddenRoutes: boolean;
  unlockAllStoryPages: boolean;
  revealPuzzleAnswers: boolean;
  showPostARGStates: boolean;
  lastChangedAt: string | null;
  warningAcknowledged: boolean;
}

export * from './socialEcosystem';

