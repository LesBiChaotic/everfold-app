import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {
  PlayerRewardState,
  RewardTier,
  EquippedCosmetics,
  CosmeticPreset,
  CosmeticCategory,
} from '../types/rewards';
import { MILESTONES_CATALOG } from '../data/milestonesCatalog';
import { COSMETICS_CATALOG } from '../data/cosmeticsCatalog';
import { PLUS_GIFT_DROPS } from '../data/giftDropsCatalog';
import { soundEngine } from '../audio/soundEngine';

export const isPlusGiftAvailable = (
  membership: PlayerRewardState['membershipState'],
  gift: (typeof PLUS_GIFT_DROPS)[number],
  now = new Date(),
) => {
  if (!membership.isActive) return false;
  const startedAt = new Date(membership.startedAt);
  if (Number.isNaN(startedAt.getTime())) return false;
  const unlockAt = new Date(startedAt);
  unlockAt.setMonth(unlockAt.getMonth() + gift.monthIndex - 1);
  return now.getTime() >= unlockAt.getTime();
};

export const calculateTier = (score: number): RewardTier => {
  if (score >= 1000) return 'Archive';
  if (score >= 600) return 'Constellation';
  if (score >= 300) return 'Pattern';
  if (score >= 150) return 'Fold';
  if (score >= 50) return 'Thread';
  return 'Seed';
};

export const defaultEquippedCosmetics: EquippedCosmetics = {
  avatarFrameId: 'frame_default',
  avatarBackgroundId: '',
  profileAccentId: 'accent_museum_plum',
  journalCoverId: 'journal_paper_garden',
  messageThemeId: 'msg_theme_soft_plum',
  commentFlairId: 'flair_foldmark',
  relationshipCardSkinId: 'rel_skin_museum_ticket',
  timelineThemeId: 'timeline_default',
  datePlanSkinId: 'date_default',
  uiSoundThemeId: 'snd_soft_wood',
  ambientThemeId: 'amb_quiet_room',
  journalStampId: 'stamp_foldmark',
};

const defaultPresets: CosmeticPreset[] = [
  {
    id: 'preset_reading_night',
    name: 'Reading Night',
    cosmetics: {
      avatarFrameId: 'frame_paper_edge',
      avatarBackgroundId: 'bg_reading_room',
      profileAccentId: 'accent_warm_paper',
      journalCoverId: 'journal_dark_linen',
      messageThemeId: 'msg_theme_paper',
      uiSoundThemeId: 'snd_paper_tactile',
      ambientThemeId: 'amb_quiet_room',
    },
  },
  {
    id: 'preset_sunday_market',
    name: 'Sunday Market',
    cosmetics: {
      avatarFrameId: 'frame_plum_thread',
      avatarBackgroundId: 'bg_sunday_market',
      profileAccentId: 'accent_dusty_rose',
      journalCoverId: 'journal_sunday_notes',
      messageThemeId: 'msg_theme_soft_plum',
      uiSoundThemeId: 'snd_soft_wood',
      ambientThemeId: 'amb_rain_window',
    },
  },
  {
    id: 'preset_archive',
    name: 'Archive Minimal',
    cosmetics: {
      avatarFrameId: 'frame_museum_brass',
      avatarBackgroundId: 'bg_soft_library',
      profileAccentId: 'accent_archive_blue',
      journalCoverId: 'journal_archive_cream',
      messageThemeId: 'msg_theme_correspond',
      uiSoundThemeId: 'snd_paper_tactile',
      ambientThemeId: 'amb_archive_room',
    },
  },
  {
    id: 'preset_night_train',
    name: 'Night Train',
    cosmetics: {
      avatarFrameId: 'frame_night_train',
      avatarBackgroundId: 'bg_late_cafe',
      profileAccentId: 'accent_museum_plum',
      journalCoverId: 'journal_dark_linen',
      messageThemeId: 'msg_theme_minimal',
      uiSoundThemeId: 'snd_glass_resonant',
      ambientThemeId: 'amb_evening_lounge',
    },
  },
];

interface RewardStoreActions {
  // Milestone unlocks
  unlockMilestone: (milestoneId: string, options?: { silent?: boolean }) => void;
  claimMilestone: (milestoneId: string) => void;
  isMilestoneUnlocked: (milestoneId: string) => boolean;

  // Cosmetic Inventory & Equipment
  equipCosmetic: (category: CosmeticCategory, itemId: string) => void;
  unequipCosmetic: (category: CosmeticCategory) => void;
  isCosmeticOwned: (itemId: string) => boolean;
  toggleWishlist: (itemId: string) => void;
  isWishlisted: (itemId: string) => boolean;
  savePreset: (name: string) => void;
  applyPreset: (presetId: string) => void;
  deletePreset: (presetId: string) => void;
  surpriseMe: () => void;

  // Fictional Everfold Plus
  toggleFictionalPlus: (active: boolean) => void;
  claimPlusGift: (giftId: string) => boolean;

  // Idempotent Migration & Reset
  runRetroactiveMigration: (canonicalCounts: {
    messagesCount: number;
    journalCount: number;
    postsCount: number;
    commentsCount: number;
    quizzesCount: number;
    storiesCount: number;
    memoriesCount: number;
    datePlansCount: number;
    connectionsCount: number;
  }) => number;
  resetRewardProgress: () => void;
}

export const useRewardStore = create<PlayerRewardState & RewardStoreActions>()(
  persist(
    (set, get) => ({
      visitorAccountId: 'visitor_user',
      foldScore: 0,
      lifetimeFoldScore: 0,
      currentTier: 'Seed',
      milestoneIdsUnlocked: [],
      cosmeticItemIdsOwned: [
        'frame_default',
        'accent_museum_plum',
        'msg_theme_soft_plum',
        'journal_paper_garden',
        'rel_skin_museum_ticket',
        'timeline_default',
        'date_default',
        'snd_soft_wood',
        'amb_quiet_room',
        'flair_foldmark',
        'stamp_foldmark',
        'bg_moonlit_museum',
        'journal_rain_margin',
      ],
      cosmeticItemIdsSeen: [],
      wishlistCosmeticIds: [],
      rewardNotificationIds: [],
      membershipState: {
        planId: 'everfold_plus',
        isActive: true,
        startedAt: '2026-01-01T00:00:00.000Z',
        nextGiftAt: '2026-09-01T00:00:00.000Z',
        giftDropHistory: ['gift_month_1', 'gift_month_2'],
        isFictional: true,
      },
      equippedCosmetics: { ...defaultEquippedCosmetics },
      cosmeticPresets: [...defaultPresets],
      claimedGiftDropIds: ['gift_month_1', 'gift_month_2'],
      isRetroactiveMigrated: false,
      schemaVersion: 1,

      unlockMilestone: (milestoneId: string, options) => {
        const state = get();
        if (state.milestoneIdsUnlocked.includes(milestoneId)) return;

        const definition = MILESTONES_CATALOG.find((m) => m.id === milestoneId);
        if (!definition) return;

        const newScore = state.foldScore + definition.foldScore;
        const newLifetime = state.lifetimeFoldScore + definition.foldScore;
        const newTier = calculateTier(newScore);

        const newOwned = [...state.cosmeticItemIdsOwned];
        if (definition.cosmeticRewardId && !newOwned.includes(definition.cosmeticRewardId)) {
          newOwned.push(definition.cosmeticRewardId);
        }

        if (!options?.silent) {
          soundEngine.playCue(definition.foldScore >= 30 ? 'milestone.major' : 'milestone.small');
        }

        set({
          milestoneIdsUnlocked: [...state.milestoneIdsUnlocked, milestoneId],
          foldScore: newScore,
          lifetimeFoldScore: newLifetime,
          currentTier: newTier,
          cosmeticItemIdsOwned: newOwned,
        });
      },

      claimMilestone: (milestoneId: string) => {
        get().unlockMilestone(milestoneId);
      },

      isMilestoneUnlocked: (milestoneId: string) => {
        return get().milestoneIdsUnlocked.includes(milestoneId);
      },

      equipCosmetic: (category: CosmeticCategory, itemId: string) => {
        const state = get();
        if (!state.cosmeticItemIdsOwned.includes(itemId)) return;

        soundEngine.playCue('cosmetic.equip');

        const slotMap: Record<CosmeticCategory, keyof EquippedCosmetics> = {
          avatarFrame: 'avatarFrameId',
          avatarBackground: 'avatarBackgroundId',
          profileAccent: 'profileAccentId',
          journalCover: 'journalCoverId',
          messageTheme: 'messageThemeId',
          commentFlair: 'commentFlairId',
          relationshipCardSkin: 'relationshipCardSkinId',
          timelineTheme: 'timelineThemeId',
          datePlanSkin: 'datePlanSkinId',
          uiSoundTheme: 'uiSoundThemeId',
          ambientTheme: 'ambientThemeId',
          icon: 'commentFlairId',
          stamp: 'journalStampId',
        };

        const targetSlot = slotMap[category];
        if (!targetSlot) return;

        set({
          equippedCosmetics: {
            ...state.equippedCosmetics,
            [targetSlot]: itemId,
          },
        });
      },

      unequipCosmetic: (category: CosmeticCategory) => {
        const state = get();
        const slotMap: Record<CosmeticCategory, keyof EquippedCosmetics> = {
          avatarFrame: 'avatarFrameId',
          avatarBackground: 'avatarBackgroundId',
          profileAccent: 'profileAccentId',
          journalCover: 'journalCoverId',
          messageTheme: 'messageThemeId',
          commentFlair: 'commentFlairId',
          relationshipCardSkin: 'relationshipCardSkinId',
          timelineTheme: 'timelineThemeId',
          datePlanSkin: 'datePlanSkinId',
          uiSoundTheme: 'uiSoundThemeId',
          ambientTheme: 'ambientThemeId',
          icon: 'commentFlairId',
          stamp: 'journalStampId',
        };

        const targetSlot = slotMap[category];
        if (!targetSlot) return;

        set({
          equippedCosmetics: {
            ...state.equippedCosmetics,
            [targetSlot]: defaultEquippedCosmetics[targetSlot] || '',
          },
        });
      },

      isCosmeticOwned: (itemId: string) => {
        return get().cosmeticItemIdsOwned.includes(itemId);
      },

      toggleWishlist: (itemId: string) => {
        const state = get();
        soundEngine.playCue('ui.tick');
        const exists = state.wishlistCosmeticIds.includes(itemId);
        set({
          wishlistCosmeticIds: exists
            ? state.wishlistCosmeticIds.filter((id) => id !== itemId)
            : [...state.wishlistCosmeticIds, itemId],
        });
      },

      isWishlisted: (itemId: string) => {
        return get().wishlistCosmeticIds.includes(itemId);
      },

      savePreset: (name: string) => {
        const state = get();
        soundEngine.playCue('ui.save');
        const newPreset: CosmeticPreset = {
          id: `preset_${Date.now()}`,
          name: name.trim() || 'Custom Look',
          cosmetics: { ...state.equippedCosmetics },
        };
        set({
          cosmeticPresets: [...state.cosmeticPresets, newPreset],
        });
      },

      applyPreset: (presetId: string) => {
        const state = get();
        const preset = state.cosmeticPresets.find((p) => p.id === presetId);
        if (!preset) return;

        soundEngine.playCue('cosmetic.equip');
        set({
          equippedCosmetics: {
            ...state.equippedCosmetics,
            ...preset.cosmetics,
          },
        });
      },

      deletePreset: (presetId: string) => {
        const state = get();
        soundEngine.playCue('ui.tick');
        set({
          cosmeticPresets: state.cosmeticPresets.filter((p) => p.id !== presetId),
        });
      },

      surpriseMe: () => {
        const state = get();
        soundEngine.playCue('cosmetic.equip');

        const getRandomOwnedOfCategory = (category: CosmeticCategory): string => {
          const eligible = COSMETICS_CATALOG.filter(
            (c) => c.category === category && state.cosmeticItemIdsOwned.includes(c.id)
          );
          if (eligible.length === 0) return '';
          return eligible[Math.floor(Math.random() * eligible.length)].id;
        };

        const randomFrame = getRandomOwnedOfCategory('avatarFrame') || state.equippedCosmetics.avatarFrameId;
        const randomBg = getRandomOwnedOfCategory('avatarBackground') || state.equippedCosmetics.avatarBackgroundId;
        const randomAccent = getRandomOwnedOfCategory('profileAccent') || state.equippedCosmetics.profileAccentId;
        const randomCover = getRandomOwnedOfCategory('journalCover') || state.equippedCosmetics.journalCoverId;
        const randomMsg = getRandomOwnedOfCategory('messageTheme') || state.equippedCosmetics.messageThemeId;

        set({
          equippedCosmetics: {
            ...state.equippedCosmetics,
            avatarFrameId: randomFrame,
            avatarBackgroundId: randomBg,
            profileAccentId: randomAccent,
            journalCoverId: randomCover,
            messageThemeId: randomMsg,
          },
        });
      },

      toggleFictionalPlus: (active: boolean) => {
        const state = get();
        soundEngine.playCue('ui.save');
        set({
          membershipState: {
            ...state.membershipState,
            isActive: active,
          },
        });
      },

      claimPlusGift: (giftId: string) => {
        const state = get();
        if (state.claimedGiftDropIds.includes(giftId)) return true;

        const gift = PLUS_GIFT_DROPS.find((g) => g.id === giftId);
        if (!gift || !isPlusGiftAvailable(state.membershipState, gift)) return false;

        soundEngine.playCue('gift.open');

        const newOwned = [...state.cosmeticItemIdsOwned];
        if (!newOwned.includes(gift.cosmeticItemId)) {
          newOwned.push(gift.cosmeticItemId);
        }

        set({
          claimedGiftDropIds: [...state.claimedGiftDropIds, giftId],
          cosmeticItemIdsOwned: newOwned,
          membershipState: {
            ...state.membershipState,
            giftDropHistory: state.membershipState.giftDropHistory.includes(giftId)
              ? state.membershipState.giftDropHistory
              : [...state.membershipState.giftDropHistory, giftId],
          },
        });
        return true;
      },

      runRetroactiveMigration: (counts) => {
        const state = get();
        let unlockedCount = 0;
        const toUnlock: string[] = [];
        const toAddCosmetics: string[] = [...state.cosmeticItemIdsOwned];
        let scoreToAdd = 0;

        // Check Profile
        if (!state.milestoneIdsUnlocked.includes('prof_first_impression')) {
          toUnlock.push('prof_first_impression');
          toAddCosmetics.push('frame_plum_thread');
          scoreToAdd += 25;
          unlockedCount++;
        }
        if (!state.milestoneIdsUnlocked.includes('prof_changing_things_up')) {
          toUnlock.push('prof_changing_things_up');
          toAddCosmetics.push('stamp_plant');
          scoreToAdd += 25;
          unlockedCount++;
        }

        // Check Messages
        if (counts.messagesCount >= 1 && !state.milestoneIdsUnlocked.includes('msg_hello_there')) {
          toUnlock.push('msg_hello_there');
          scoreToAdd += 10;
          unlockedCount++;
        }
        if (counts.messagesCount >= 10 && !state.milestoneIdsUnlocked.includes('msg_ten_messages')) {
          toUnlock.push('msg_ten_messages');
          toAddCosmetics.push('msg_theme_paper');
          scoreToAdd += 15;
          unlockedCount++;
        }

        // Check Journal
        if (counts.journalCount >= 1 && !state.milestoneIdsUnlocked.includes('jnl_first_page')) {
          toUnlock.push('jnl_first_page');
          toAddCosmetics.push('frame_paper_edge');
          scoreToAdd += 10;
          unlockedCount++;
        }
        if (counts.journalCount >= 5 && !state.milestoneIdsUnlocked.includes('jnl_five_entries')) {
          toUnlock.push('jnl_five_entries');
          toAddCosmetics.push('journal_paper_garden');
          scoreToAdd += 15;
          unlockedCount++;
        }

        // Check Community
        if (counts.postsCount >= 1 && !state.milestoneIdsUnlocked.includes('comm_first_post')) {
          toUnlock.push('comm_first_post');
          scoreToAdd += 10;
          unlockedCount++;
        }
        if (counts.commentsCount >= 1 && !state.milestoneIdsUnlocked.includes('comm_first_reply')) {
          toUnlock.push('comm_first_reply');
          toAddCosmetics.push('accent_dusty_rose');
          scoreToAdd += 10;
          unlockedCount++;
        }

        // Check Quizzes & Stories
        if (counts.quizzesCount >= 1 && !state.milestoneIdsUnlocked.includes('quiz_one_question')) {
          toUnlock.push('quiz_one_question');
          scoreToAdd += 10;
          unlockedCount++;
        }
        if (counts.storiesCount >= 1 && !state.milestoneIdsUnlocked.includes('story_chapter_one')) {
          toUnlock.push('story_chapter_one');
          scoreToAdd += 10;
          unlockedCount++;
        }

        if (toUnlock.length > 0) {
          const finalScore = state.foldScore + scoreToAdd;
          set({
            milestoneIdsUnlocked: [...state.milestoneIdsUnlocked, ...toUnlock],
            cosmeticItemIdsOwned: Array.from(new Set(toAddCosmetics)),
            foldScore: finalScore,
            lifetimeFoldScore: state.lifetimeFoldScore + scoreToAdd,
            currentTier: calculateTier(finalScore),
            isRetroactiveMigrated: true,
          });
        } else {
          set({ isRetroactiveMigrated: true });
        }

        return unlockedCount;
      },

      resetRewardProgress: () => {
        soundEngine.playCue('ui.undo');
        set({
          foldScore: 0,
          lifetimeFoldScore: 0,
          currentTier: 'Seed',
          milestoneIdsUnlocked: [],
          cosmeticItemIdsOwned: [
            'frame_default',
            'accent_museum_plum',
            'msg_theme_soft_plum',
            'journal_paper_garden',
            'rel_skin_museum_ticket',
            'timeline_default',
            'date_default',
            'snd_soft_wood',
            'amb_quiet_room',
            'flair_foldmark',
            'stamp_foldmark',
          ],
          wishlistCosmeticIds: [],
          equippedCosmetics: { ...defaultEquippedCosmetics },
          claimedGiftDropIds: [],
          isRetroactiveMigrated: true,
        });
      },
    }),
    {
      name: 'everfold_rewards_v1',
      version: 3,
      migrate: (persisted: any) => {
        if (!persisted) return persisted;
        const baseItems = [
          'frame_default', 'accent_museum_plum', 'msg_theme_soft_plum',
          'journal_paper_garden', 'rel_skin_museum_ticket', 'timeline_default',
          'date_default', 'snd_soft_wood', 'amb_quiet_room', 'flair_foldmark',
          'stamp_foldmark',
        ];
        const claimedGiftDropIds: string[] = persisted.claimedGiftDropIds || [];
        const claimedCosmeticIds = PLUS_GIFT_DROPS
          .filter((gift) => claimedGiftDropIds.includes(gift.id))
          .map((gift) => gift.cosmeticItemId);
        return {
          ...persisted,
          cosmeticItemIdsOwned: Array.from(new Set([...(persisted.cosmeticItemIdsOwned || []), ...baseItems, ...claimedCosmeticIds])),
          equippedCosmetics: {
            ...defaultEquippedCosmetics,
            ...(persisted.equippedCosmetics || {}),
            commentFlairId: persisted.equippedCosmetics?.commentFlairId === 'stamp_foldmark'
              ? 'flair_foldmark'
              : (persisted.equippedCosmetics?.commentFlairId || 'flair_foldmark'),
            journalStampId: persisted.equippedCosmetics?.journalStampId || 'stamp_foldmark',
          },
          schemaVersion: 3,
        };
      },
    }
  )
);
