export type RewardTier = 'Seed' | 'Thread' | 'Fold' | 'Pattern' | 'Constellation' | 'Archive';

export type MilestoneCategory =
  | 'Profile'
  | 'Messages'
  | 'Community'
  | 'Journal'
  | 'Relationships'
  | 'Quizzes'
  | 'Stories'
  | 'Memories'
  | 'Date Planner'
  | 'Exploration'
  | 'Secret';

export type CosmeticCategory =
  | 'avatarFrame'
  | 'avatarBackground'
  | 'profileAccent'
  | 'journalCover'
  | 'messageTheme'
  | 'commentFlair'
  | 'relationshipCardSkin'
  | 'timelineTheme'
  | 'datePlanSkin'
  | 'uiSoundTheme'
  | 'ambientTheme'
  | 'icon'
  | 'stamp';

export interface MilestoneDefinition {
  id: string;
  category: MilestoneCategory;
  title: string;
  description: string;
  foldScore: number;
  targetValue: number;
  cosmeticRewardId?: string;
  isSecret?: boolean;
  hint?: string;
}

export interface MilestoneProgress {
  milestoneId: string;
  visitorAccountId: string;
  currentValue: number;
  targetValue: number;
  unlockedAt?: string;
  claimedAt?: string;
  isSeen: boolean;
}

export interface CosmeticItem {
  id: string;
  category: CosmeticCategory;
  name: string;
  description: string;
  flavorText?: string;
  source: string;
  sourceType: 'milestone' | 'plus_gift' | 'archive' | 'special_thank_you' | 'seasonal' | 'base';
  previewColor?: string;
  previewClass?: string;
  previewAsset?: string;
  unlockedAt?: string;
  isEquipped?: boolean;
  isPlusExclusive?: boolean;
  season?: string;
}

export interface EquippedCosmetics {
  avatarFrameId: string;
  avatarBackgroundId: string;
  profileAccentId: string;
  journalCoverId: string;
  messageThemeId: string;
  commentFlairId: string;
  relationshipCardSkinId: string;
  timelineThemeId: string;
  datePlanSkinId: string;
  uiSoundThemeId: string;
  ambientThemeId: string;
  journalStampId?: string;
}

export interface GiftDrop {
  id: string;
  monthName: string;
  monthIndex: number;
  title: string;
  note: string;
  cosmeticItemId: string;
  illustrationPattern: string;
  accentColor: string;
  isClaimed: boolean;
  claimedAt?: string;
}

export interface MembershipState {
  planId: 'everfold_plus';
  isActive: boolean;
  startedAt: string;
  nextGiftAt: string;
  giftDropHistory: string[];
  isFictional: true;
}

export interface CosmeticPreset {
  id: string;
  name: string;
  cosmetics: Partial<EquippedCosmetics>;
}

export interface RewardLedgerEntry {
  rewardId: string;
  visitorAccountId: string;
  sourceType: 'milestone' | 'gift' | 'recap' | 'anniversary';
  sourceId: string;
  scoreDelta: number;
  createdAt: string;
}

export interface PlayerRewardState {
  visitorAccountId: string;
  foldScore: number;
  lifetimeFoldScore: number;
  currentTier: RewardTier;
  milestoneIdsUnlocked: string[];
  cosmeticItemIdsOwned: string[];
  cosmeticItemIdsSeen: string[];
  wishlistCosmeticIds: string[];
  rewardNotificationIds: string[];
  membershipState: MembershipState;
  equippedCosmetics: EquippedCosmetics;
  cosmeticPresets: CosmeticPreset[];
  claimedGiftDropIds: string[];
  isRetroactiveMigrated: boolean;
  schemaVersion: number;
}

export interface FirstsRecord {
  firstMatchDate?: string;
  firstMatchName?: string;
  firstMessageDate?: string;
  firstJournalDate?: string;
  firstQuizDate?: string;
  firstMemoryDate?: string;
  firstDatePlanDate?: string;
  firstStoryDate?: string;
  firstCommunityReplyDate?: string;
  firstMilestoneDate?: string;
}

export interface ActivitySummary {
  messagesSent: number;
  journalEntries: number;
  communityPosts: number;
  communityComments: number;
  quizzesCompleted: number;
  sharedQuizzes: number;
  memoriesSaved: number;
  datePlansCreated: number;
  storiesRead: number;
  eventsAttended: number;
  archiveRecordsOpened: number;
  milestonesUnlocked: number;
  cosmeticsCollected: number;
}
