import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Sparkles, Trophy, ChevronRight, Gift, Layers, Compass } from 'lucide-react';
import { useRewardStore } from '../../store/rewardStore';
import { MILESTONES_CATALOG } from '../../data/milestonesCatalog';
import { Foldmark } from '../brand/Foldmark';
import { PLUS_GIFT_DROPS } from '../../data/giftDropsCatalog';
import { GiftOpeningModal } from './GiftOpeningModal';
import { GiftDrop } from '../../types/rewards';

export const YourEverfoldHomeCard: React.FC = () => {
  const {
    foldScore,
    currentTier,
    milestoneIdsUnlocked,
    cosmeticItemIdsOwned,
    claimedGiftDropIds,
    membershipState,
    claimPlusGift,
  } = useRewardStore();

  const [activeGiftModal, setActiveGiftModal] = useState<GiftDrop | null>(null);

  // Find next locked milestone
  const nextMilestone = MILESTONES_CATALOG.find((m) => !milestoneIdsUnlocked.includes(m.id));

  // Find available unclaimed gift
  const availableGift = membershipState.isActive
    ? PLUS_GIFT_DROPS.find((g) => !claimedGiftDropIds.includes(g.id))
    : null;

  return (
    <div
      className="ef-card-featured"
      style={{
        padding: 'var(--space-5)',
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-4)',
        borderRadius: 'var(--radius-xl)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Header Row */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
          <div
            style={{
              padding: '8px',
              borderRadius: 'var(--radius-lg)',
              backgroundColor: 'var(--bg-surface-subtle)',
              border: '1px solid var(--border-subtle)',
              display: 'inline-flex',
            }}
          >
            <Foldmark size={24} color="var(--accent-plum)" />
          </div>
          <div>
            <div style={{ fontSize: '11px', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Your Everfold
            </div>
            <h2 style={{ fontSize: 'var(--font-size-lg)', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
              {currentTier} Tier • {foldScore} Fold Score
            </h2>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
          <span className="badge badge-plum" style={{ fontSize: '11px' }}>
            {milestoneIdsUnlocked.length} Milestones
          </span>
          <span className="badge badge-secondary" style={{ fontSize: '11px' }}>
            {cosmeticItemIdsOwned.length} Cosmetics
          </span>
        </div>
      </div>

      {/* Unclaimed Gift Banner */}
      {availableGift && (
        <div
          style={{
            padding: 'var(--space-3) var(--space-4)',
            borderRadius: 'var(--radius-lg)',
            backgroundColor: 'var(--bg-surface-subtle)',
            border: '1px solid var(--border-default)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 'var(--space-3)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', minWidth: 0 }}>
            <Gift size={20} color="var(--accent-plum)" style={{ flexShrink: 0 }} />
            <div style={{ minWidth: 0 }}>
              <div style={{ fontSize: 'var(--font-size-xs)', fontWeight: 700, color: 'var(--text-primary)' }}>
                Everfold Plus Gift Drop is Ready
              </div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {availableGift.title} ({availableGift.monthName})
              </div>
            </div>
          </div>

          <button
            type="button"
            className="btn btn-primary btn-xs"
            onClick={() => setActiveGiftModal(availableGift)}
            style={{ flexShrink: 0 }}
          >
            Open Drop
          </button>
        </div>
      )}

      {/* Next Milestone Tracking */}
      {nextMilestone && (
        <div className="ef-card-subtle" style={{ padding: 'var(--space-3) var(--space-4)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '11px', color: 'var(--text-muted)' }}>
            <span style={{ fontWeight: 700, textTransform: 'uppercase' }}>Next Milestone</span>
            <span style={{ fontWeight: 700, color: 'var(--accent-plum)' }}>+{nextMilestone.foldScore} pts</span>
          </div>
          <div style={{ fontSize: 'var(--font-size-xs)', fontWeight: 700, color: 'var(--text-primary)', marginTop: '2px' }}>
            {nextMilestone.title}
          </div>
          <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '2px' }}>
            {nextMilestone.description}
          </div>
        </div>
      )}

      {/* Bottom Quick Navigation Links */}
      <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap', borderTop: '1px solid var(--border-subtle)', paddingTop: 'var(--space-3)' }}>
        <NavLink
          to="/profile/milestones"
          className="btn btn-secondary btn-xs"
          style={{ flex: '1 1 auto', justifyContent: 'center', fontSize: '11px' }}
        >
          <Trophy size={13} /> Milestone Hub
        </NavLink>
        <NavLink
          to="/profile/cosmetics"
          className="btn btn-secondary btn-xs"
          style={{ flex: '1 1 auto', justifyContent: 'center', fontSize: '11px' }}
        >
          <Sparkles size={13} /> Cosmetics Wardrobe
        </NavLink>
        <NavLink
          to="/profile/activity"
          className="btn btn-secondary btn-xs"
          style={{ flex: '1 1 auto', justifyContent: 'center', fontSize: '11px' }}
        >
          <Compass size={13} /> Activity & Firsts
        </NavLink>
      </div>

      {activeGiftModal && (
        <GiftOpeningModal
          gift={activeGiftModal}
          onClose={() => {
            claimPlusGift(activeGiftModal.id);
            setActiveGiftModal(null);
          }}
        />
      )}
    </div>
  );
};
