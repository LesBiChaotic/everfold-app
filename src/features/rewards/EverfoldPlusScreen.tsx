import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  Sparkles,
  Gift,
  ArrowLeft,
  Check,
  Shield,
  Clock,
  Heart,
  Calendar,
  AlertCircle,
  Eye,
} from 'lucide-react';
import { useRewardStore } from '../../store/rewardStore';
import { PLUS_GIFT_DROPS } from '../../data/giftDropsCatalog';
import { COSMETICS_CATALOG } from '../../data/cosmeticsCatalog';
import { GiftDrop } from '../../types/rewards';
import { Foldmark } from '../../components/brand/Foldmark';
import { GiftOpeningModal } from '../../components/rewards/GiftOpeningModal';

export const EverfoldPlusScreen: React.FC = () => {
  const {
    membershipState,
    claimedGiftDropIds,
    toggleFictionalPlus,
    claimPlusGift,
  } = useRewardStore();

  const [activeGiftModal, setActiveGiftModal] = useState<GiftDrop | null>(null);

  return (
    <div
      className="plus-screen"
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-5)',
        maxWidth: '860px',
        margin: '0 auto',
        width: '100%',
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 'var(--space-3)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
          <NavLink to="/profile" className="btn btn-secondary btn-sm">
            <ArrowLeft size={16} /> Back
          </NavLink>
          <div>
            <h1 style={{ fontSize: 'clamp(1.4rem, 3vw, 1.85rem)', fontWeight: 800, color: 'var(--text-primary)', margin: 0, letterSpacing: '-0.02em' }}>
              Everfold Plus
            </h1>
            <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-muted)', margin: 0 }}>
              Monthly digital postcards, cosmetic drops, and aesthetic keepsakes.
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
          <button
            type="button"
            className={`btn ${membershipState.isActive ? 'btn-primary' : 'btn-secondary'} btn-sm`}
            onClick={() => toggleFictionalPlus(!membershipState.isActive)}
          >
            {membershipState.isActive ? 'Membership Active (Fictional)' : 'Activate Fictional Plus'}
          </button>
        </div>
      </div>

      {/* Prominent Fictional Disclosure Banner */}
      <div
        className="ef-card-subtle"
        style={{
          padding: 'var(--space-4) var(--space-5)',
          borderLeft: '4px solid var(--accent-plum)',
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--space-2)',
          borderRadius: 'var(--radius-lg)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', fontWeight: 800, fontSize: 'var(--font-size-xs)', color: 'var(--text-primary)' }}>
          <Shield size={16} color="var(--accent-plum)" />
          <span>Fictional In-App Membership Notice</span>
        </div>
        <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.5 }}>
          Everfold Plus is 100% fictional flavor. There is no real credit card billing, payment gateway, or subscription fee. It solely grants monthly cosmetic postcard drops, soundscapes, and journal textures without affecting matching or safety.
        </p>
      </div>

      {/* Hero Presentation */}
      <div
        className="ef-card-featured"
        style={{
          padding: 'clamp(var(--space-5), 4vw, var(--space-7))',
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--space-5)',
          borderRadius: 'var(--radius-xl)',
          background: 'linear-gradient(180deg, var(--bg-surface) 0%, var(--bg-surface-subtle) 100%)',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 'var(--space-3)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)', marginLeft: 'var(--space-2)' }}>
            <div
              style={{
                padding: 'var(--space-3)',
                borderRadius: 'var(--radius-xl)',
                backgroundColor: 'var(--bg-surface-subtle)',
                border: '1px solid var(--border-subtle)',
                display: 'inline-flex',
              }}
            >
              <Foldmark size={36} color="var(--accent-plum)" />
            </div>

            <div>
              <span className="badge badge-plum" style={{ marginBottom: '4px' }}>
                Fictional Patron Tier
              </span>
              <h2 style={{ fontSize: 'var(--font-size-xl)', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
                Aesthetic & Keepsake Drops
              </h2>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>
                Next seasonal drop arriving on schedule.
              </div>
            </div>
          </div>
        </div>

        {/* Benefits Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: 'var(--space-3)',
            margin: '0 var(--space-2)',
          }}
        >
          <div className="ef-card-subtle" style={{ padding: 'var(--space-4)' }}>
            <Gift size={16} color="var(--accent-plum)" />
            <div style={{ fontWeight: 700, fontSize: 'var(--font-size-xs)', color: 'var(--text-primary)', marginTop: '6px' }}>
              12 Monthly Postcards
            </div>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
              Deterministic cosmetic drops
            </div>
          </div>

          <div className="ef-card-subtle" style={{ padding: 'var(--space-4)' }}>
            <Sparkles size={16} color="var(--accent-plum)" />
            <div style={{ fontWeight: 700, fontSize: 'var(--font-size-xs)', color: 'var(--text-primary)', marginTop: '6px' }}>
              Anniversary Keepsakes
            </div>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
              1, 3, 6, and 12-month frames
            </div>
          </div>

          <div className="ef-card-subtle" style={{ padding: 'var(--space-4)' }}>
            <Heart size={16} color="var(--accent-plum)" />
            <div style={{ fontWeight: 700, fontSize: 'var(--font-size-xs)', color: 'var(--text-primary)', marginTop: '6px' }}>
              Zero Pay-to-Win
            </div>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
              Never gates matching or safety
            </div>
          </div>
        </div>
      </div>

      {/* Monthly Postcard Drops Grid */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
        <div>
          <h2 style={{ fontSize: 'var(--font-size-lg)', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
            Monthly Digital Postcards
          </h2>
          <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-muted)', marginTop: '2px' }}>
            Unfold each monthly postcard to add its guaranteed cosmetic item to your inventory.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
            gap: 'var(--space-4)',
          }}
        >
          {PLUS_GIFT_DROPS.map((drop) => {
            const isClaimed = claimedGiftDropIds.includes(drop.id);
            const cosmetic = COSMETICS_CATALOG.find((c) => c.id === drop.cosmeticItemId);

            return (
              <div
                key={drop.id}
                className="ef-card"
                style={{
                  padding: 'var(--space-4)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  gap: 'var(--space-3)',
                  borderRadius: 'var(--radius-lg)',
                }}
              >
                <div>
                  <div
                    style={{
                      width: '100%',
                      height: '110px',
                      borderRadius: 'var(--radius-md)',
                      backgroundColor: drop.accentColor || 'var(--accent-plum)',
                      color: '#ffffff',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      padding: 'var(--space-3)',
                      marginBottom: 'var(--space-3)',
                      boxShadow: 'var(--shadow-sm)',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '9px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                        {drop.monthName}
                      </span>
                      <Foldmark size={16} color="#ffffff" />
                    </div>

                    <div style={{ fontSize: 'var(--font-size-xs)', fontWeight: 700, lineHeight: 1.3 }}>
                      {drop.title}
                    </div>
                  </div>

                  <p style={{ fontSize: '11px', color: 'var(--text-secondary)', margin: 0, fontStyle: 'italic', lineHeight: 1.4 }}>
                    “{drop.note}”
                  </p>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid var(--border-subtle)', paddingTop: 'var(--space-2)' }}>
                  <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>
                    Reward: {cosmetic?.name}
                  </span>

                  {isClaimed ? (
                    <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--accent-plum)', display: 'flex', alignItems: 'center', gap: '3px' }}>
                      <Check size={12} /> Claimed
                    </span>
                  ) : (
                    <button
                      type="button"
                      className="btn btn-primary btn-xs"
                      onClick={() => setActiveGiftModal(drop)}
                    >
                      <Gift size={12} /> Open Drop
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
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
