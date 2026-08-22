import { beforeEach, describe, expect, it } from 'vitest';
import { PLUS_GIFT_DROPS } from '../data/giftDropsCatalog';
import { isPlusGiftAvailable, useRewardStore } from '../store/rewardStore';

describe('Everfold Plus gifts', () => {
  beforeEach(() => {
    useRewardStore.getState().resetRewardProgress();
    useRewardStore.setState((state) => ({
      membershipState: {
        ...state.membershipState,
        isActive: true,
        startedAt: '2026-01-01T00:00:00.000Z',
      },
    }));
  });

  it('only makes elapsed membership months available', () => {
    const membership = useRewardStore.getState().membershipState;
    expect(isPlusGiftAvailable(membership, PLUS_GIFT_DROPS[1], new Date('2026-02-01T00:00:00.000Z'))).toBe(true);
    expect(isPlusGiftAvailable(membership, PLUS_GIFT_DROPS[2], new Date('2026-02-28T23:59:59.000Z'))).toBe(false);
  });

  it('refuses claims while membership is paused', () => {
    useRewardStore.getState().toggleFictionalPlus(false);
    expect(useRewardStore.getState().claimPlusGift('gift_month_1')).toBe(false);
    expect(useRewardStore.getState().claimedGiftDropIds).not.toContain('gift_month_1');
  });

  it('grants ownership before the cosmetic is equipped', () => {
    const store = useRewardStore.getState();
    expect(store.claimPlusGift('gift_month_1')).toBe(true);
    expect(useRewardStore.getState().cosmeticItemIdsOwned).toContain('bg_moonlit_museum');

    useRewardStore.getState().equipCosmetic('avatarBackground', 'bg_moonlit_museum');
    expect(useRewardStore.getState().equippedCosmetics.avatarBackgroundId).toBe('bg_moonlit_museum');
  });
});
