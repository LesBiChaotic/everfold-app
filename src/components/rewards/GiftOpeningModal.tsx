import React, { useState, useEffect } from 'react';
import { X, Sparkles, Check, Gift, ArrowRight } from 'lucide-react';
import { GiftDrop, CosmeticItem } from '../../types/rewards';
import { COSMETICS_CATALOG } from '../../data/cosmeticsCatalog';
import { Foldmark } from '../brand/Foldmark';
import { soundEngine } from '../../audio/soundEngine';
import { useRewardStore } from '../../store/rewardStore';

interface GiftOpeningModalProps {
  gift: GiftDrop;
  onClose: () => void;
  onEquip?: (cosmetic: CosmeticItem) => void;
}

export const GiftOpeningModal: React.FC<GiftOpeningModalProps> = ({ gift, onClose, onEquip }) => {
  const { equipCosmetic } = useRewardStore();
  const [stage, setStage] = useState<'closed' | 'tracing' | 'revealed'>('closed');
  const cosmetic = COSMETICS_CATALOG.find((c) => c.id === gift.cosmeticItemId);

  const handleOpenGift = () => {
    soundEngine.playCue('gift.ready');
    setStage('tracing');
    setTimeout(() => {
      soundEngine.playCue('gift.open');
      setStage('revealed');
    }, 700);
  };

  const handleEquip = () => {
    if (cosmetic) {
      equipCosmetic(cosmetic.category, cosmetic.id);
      if (onEquip) onEquip(cosmetic);
    }
    onClose();
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(18, 14, 20, 0.75)',
        backdropFilter: 'blur(8px)',
        zIndex: 1050,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'var(--space-4)',
      }}
      onClick={onClose}
    >
      <div
        className="ef-card-featured"
        style={{
          maxWidth: '520px',
          width: '100%',
          padding: 'var(--space-6)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          gap: 'var(--space-5)',
          borderRadius: 'var(--radius-xl)',
          position: 'relative',
          boxShadow: 'var(--shadow-xl)',
          background: 'linear-gradient(180deg, var(--bg-surface) 0%, var(--bg-surface-subtle) 100%)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          style={{
            position: 'absolute',
            top: 'var(--space-4)',
            right: 'var(--space-4)',
            background: 'none',
            border: 'none',
            color: 'var(--text-muted)',
            cursor: 'pointer',
            padding: '4px',
          }}
        >
          <X size={20} />
        </button>

        {stage !== 'revealed' ? (
          /* ================= CLOSED / POSTCARD STATE ================= */
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--space-4)', width: '100%' }}>
            <div
              style={{
                width: '100%',
                maxWidth: '380px',
                height: '220px',
                borderRadius: 'var(--radius-lg)',
                backgroundColor: gift.accentColor || 'var(--accent-plum)',
                color: '#ffffff',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: 'var(--space-5)',
                boxShadow: 'var(--shadow-md)',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', opacity: 0.85 }}>
                  Everfold Plus • {gift.monthName}
                </span>
                <Foldmark size={24} color="#ffffff" />
              </div>

              <div style={{ textAlign: 'left' }}>
                <div style={{ fontSize: 'var(--font-size-xs)', opacity: 0.8 }}>Monthly Digital Postcard</div>
                <div style={{ fontSize: 'var(--font-size-lg)', fontWeight: 800, letterSpacing: '-0.02em', marginTop: '2px' }}>
                  {gift.title}
                </div>
              </div>

              <div style={{ fontSize: '11px', opacity: 0.75, textAlign: 'left', fontStyle: 'italic' }}>
                “{gift.note}”
              </div>
            </div>

            <div>
              <span className="badge badge-plum" style={{ marginBottom: 'var(--space-2)' }}>
                Deterministic Fictional Gift
              </span>
              <h2 style={{ fontSize: 'var(--font-size-xl)', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
                A gift for your collection
              </h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--font-size-xs)', marginTop: '4px', maxWidth: '360px' }}>
                Every monthly gift drop is handcrafted and guaranteed. Unfold to discover your cosmetic reward.
              </p>
            </div>

            <button
              type="button"
              className="btn btn-primary"
              onClick={handleOpenGift}
              style={{
                width: '100%',
                maxWidth: '280px',
                minHeight: '46px',
                fontSize: 'var(--font-size-base)',
                fontWeight: 700,
                justifyContent: 'center',
                gap: '8px',
                borderRadius: 'var(--radius-lg)',
              }}
            >
              <Gift size={18} /> {stage === 'tracing' ? 'Unfolding...' : 'Open Gift'}
            </button>
          </div>
        ) : (
          /* ================= REVEALED STATE ================= */
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--space-4)', width: '100%' }}>
            <div
              style={{
                padding: 'var(--space-4)',
                borderRadius: 'var(--radius-xl)',
                backgroundColor: 'var(--bg-surface-subtle)',
                border: '1px solid var(--border-subtle)',
                display: 'inline-flex',
                boxShadow: 'var(--shadow-md)',
              }}
            >
              <div
                style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: 'var(--radius-lg)',
                  backgroundColor: cosmetic?.previewColor || 'var(--accent-plum)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ffffff',
                }}
              >
                <Sparkles size={36} />
              </div>
            </div>

            <div>
              <span className="badge badge-plum" style={{ marginBottom: 'var(--space-2)' }}>
                Unlocked & Added to Inventory
              </span>
              <h2 style={{ fontSize: 'var(--font-size-xl)', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
                {cosmetic?.name || gift.title}
              </h2>
              <div style={{ color: 'var(--text-muted)', fontSize: 'var(--font-size-xs)', marginTop: '2px', textTransform: 'capitalize' }}>
                Category: {cosmetic?.category.replace(/([A-Z])/g, ' $1')}
              </div>
              <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--font-size-xs)', marginTop: '6px', maxWidth: '380px' }}>
                {cosmetic?.description}
              </p>
              {cosmetic?.flavorText && (
                <div
                  style={{
                    fontStyle: 'italic',
                    fontSize: '11px',
                    color: 'var(--text-muted)',
                    marginTop: '8px',
                    padding: '6px 12px',
                    backgroundColor: 'var(--bg-surface-subtle)',
                    borderRadius: 'var(--radius-md)',
                    display: 'inline-block',
                  }}
                >
                  “{cosmetic.flavorText}”
                </div>
              )}
            </div>

            <div style={{ display: 'flex', gap: 'var(--space-3)', width: '100%', maxWidth: '360px', marginTop: 'var(--space-2)' }}>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={onClose}
                style={{ flex: 1, minHeight: '44px', justifyContent: 'center' }}
              >
                Keep for Later
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleEquip}
                style={{ flex: 1, minHeight: '44px', justifyContent: 'center', gap: '6px' }}
              >
                <Check size={16} /> Equip Now
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
