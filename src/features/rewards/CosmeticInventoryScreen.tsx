import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  Sparkles,
  Check,
  Lock,
  Heart,
  Shuffle,
  Bookmark,
  Layers,
  ArrowLeft,
  Filter,
  Eye,
  Info,
  Gift,
  Plus,
  Trash2,
} from 'lucide-react';
import { useRewardStore } from '../../store/rewardStore';
import { COSMETICS_CATALOG } from '../../data/cosmeticsCatalog';
import { CosmeticCategory, CosmeticItem } from '../../types/rewards';
import { Foldmark } from '../../components/brand/Foldmark';
import { soundEngine } from '../../audio/soundEngine';

const CATEGORY_TABS: { id: 'all' | CosmeticCategory; label: string }[] = [
  { id: 'all', label: 'All Items' },
  { id: 'avatarFrame', label: 'Avatar Frames' },
  { id: 'avatarBackground', label: 'Backgrounds' },
  { id: 'profileAccent', label: 'Profile Accents' },
  { id: 'journalCover', label: 'Journal Covers' },
  { id: 'messageTheme', label: 'Message Themes' },
  { id: 'relationshipCardSkin', label: 'Card Skins' },
  { id: 'stamp', label: 'Flair & Stamps' },
  { id: 'uiSoundTheme', label: 'Sound Palettes' },
  { id: 'ambientTheme', label: 'Ambience' },
];

export const CosmeticInventoryScreen: React.FC = () => {
  const {
    cosmeticItemIdsOwned,
    equippedCosmetics,
    wishlistCosmeticIds,
    cosmeticPresets,
    equipCosmetic,
    unequipCosmetic,
    toggleWishlist,
    savePreset,
    applyPreset,
    deletePreset,
    surpriseMe,
  } = useRewardStore();

  const [activeCategory, setActiveCategory] = useState<'all' | CosmeticCategory>('all');
  const [filterMode, setFilterMode] = useState<'all' | 'owned' | 'locked' | 'wishlist'>('all');
  const [selectedItem, setSelectedItem] = useState<CosmeticItem | null>(null);
  const [newPresetName, setNewPresetName] = useState('');
  const [showPresetManager, setShowPresetManager] = useState(false);

  const filteredCosmetics = COSMETICS_CATALOG.filter((item) => {
    if (activeCategory !== 'all' && item.category !== activeCategory) return false;
    const isOwned = cosmeticItemIdsOwned.includes(item.id);
    const isWishlisted = wishlistCosmeticIds.includes(item.id);

    if (filterMode === 'owned' && !isOwned) return false;
    if (filterMode === 'locked' && isOwned) return false;
    if (filterMode === 'wishlist' && !isWishlisted) return false;

    return true;
  });

  const isItemEquipped = (item: CosmeticItem): boolean => {
    return Object.values(equippedCosmetics).includes(item.id);
  };

  const handleSavePreset = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPresetName.trim()) return;
    savePreset(newPresetName);
    setNewPresetName('');
  };

  return (
    <div
      className="cosmetics-screen"
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-5)',
        maxWidth: '920px',
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
              Cosmetics & Wardrobe
            </h1>
            <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-muted)', margin: 0 }}>
              Customize your aesthetic touchpoints across Everfold.
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap' }}>
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={() => surpriseMe()}
            title="Randomize among owned cosmetics"
          >
            <Shuffle size={14} /> Surprise Me
          </button>

          <button
            type="button"
            className={`btn ${showPresetManager ? 'btn-primary' : 'btn-secondary'} btn-sm`}
            onClick={() => setShowPresetManager(!showPresetManager)}
          >
            <Layers size={14} /> Presets ({cosmeticPresets.length})
          </button>
        </div>
      </div>

      {/* Preset Manager Drawer (Expandable) */}
      {showPresetManager && (
        <div
          className="ef-card-featured"
          style={{
            padding: 'var(--space-5)',
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--space-4)',
            borderRadius: 'var(--radius-xl)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ fontSize: 'var(--font-size-base)', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
              Saved Cosmetic Presets
            </h3>
            <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
              Store complete looks with one tap.
            </span>
          </div>

          {/* Quick Apply Presets Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 'var(--space-2)' }}>
            {cosmeticPresets.map((preset) => (
              <div
                key={preset.id}
                style={{
                  padding: 'var(--space-3)',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--bg-surface-subtle)',
                  border: '1px solid var(--border-default)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: 'var(--space-2)',
                }}
              >
                <button
                  type="button"
                  onClick={() => applyPreset(preset.id)}
                  style={{
                    background: 'none',
                    border: 'none',
                    textAlign: 'left',
                    fontWeight: 700,
                    fontSize: 'var(--font-size-xs)',
                    color: 'var(--text-primary)',
                    cursor: 'pointer',
                    flex: 1,
                  }}
                >
                  {preset.name}
                </button>
                <button
                  type="button"
                  onClick={() => deletePreset(preset.id)}
                  style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: '2px' }}
                >
                  <Trash2 size={13} />
                </button>
              </div>
            ))}
          </div>

          {/* Save Current Look as Preset */}
          <form onSubmit={handleSavePreset} style={{ display: 'flex', gap: 'var(--space-2)', marginTop: 'var(--space-2)' }}>
            <input
              type="text"
              className="input"
              value={newPresetName}
              onChange={(e) => setNewPresetName(e.target.value)}
              placeholder="Name current aesthetic look..."
              style={{ flex: 1, minHeight: '38px' }}
            />
            <button type="submit" className="btn btn-primary btn-sm" style={{ flexShrink: 0 }}>
              <Plus size={14} /> Save Current Look
            </button>
          </form>
        </div>
      )}

      {/* Filter Tabs & Category Bar */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
        {/* State Filter Buttons */}
        <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap' }}>
          {[
            { id: 'all', label: 'All Items' },
            { id: 'owned', label: `Owned (${cosmeticItemIdsOwned.length})` },
            { id: 'locked', label: 'Locked & Upcoming' },
            { id: 'wishlist', label: `Wishlist (${wishlistCosmeticIds.length})` },
          ].map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => setFilterMode(f.id as any)}
              className={`btn ${filterMode === f.id ? 'btn-primary' : 'btn-secondary'} btn-xs`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Category Wrap Chips */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 'var(--space-2)',
            paddingBottom: 'var(--space-1)',
          }}
          role="tablist"
        >
          {CATEGORY_TABS.map((tab) => {
            const isActive = activeCategory === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveCategory(tab.id)}
                className="badge"
                style={{
                  backgroundColor: isActive ? 'var(--accent-plum)' : 'var(--bg-surface-subtle)',
                  color: isActive ? 'var(--text-inverse)' : 'var(--text-secondary)',
                  border: `1px solid ${isActive ? 'var(--accent-plum)' : 'var(--border-default)'}`,
                  padding: '6px 14px',
                  fontSize: '11px',
                  cursor: 'pointer',
                  borderRadius: 'var(--radius-full)',
                  whiteSpace: 'nowrap',
                }}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Items Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
          gap: 'var(--space-4)',
        }}
      >
        {filteredCosmetics.map((item) => {
          const isOwned = cosmeticItemIdsOwned.includes(item.id);
          const isEquipped = isItemEquipped(item);
          const isWishlisted = wishlistCosmeticIds.includes(item.id);

          return (
            <div
              key={item.id}
              className="ef-card"
              style={{
                padding: 'var(--space-4)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: 'var(--space-3)',
                borderRadius: 'var(--radius-lg)',
                border: isEquipped ? '2px solid var(--accent-plum)' : '1px solid var(--border-default)',
                opacity: isOwned ? 1 : 0.85,
                position: 'relative',
              }}
              onClick={() => setSelectedItem(item)}
            >
              <div>
                {/* Header Swatch & Badges */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'var(--space-3)' }}>
                  <div
                    className="cosmetic-catalog-preview"
                    data-category={item.category}
                    data-cosmetic={item.id}
                    style={{
                      width: '68px',
                      height: '52px',
                      borderRadius: 'var(--radius-md)',
                      backgroundColor: item.previewColor || 'var(--accent-plum)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#ffffff',
                      boxShadow: 'var(--shadow-sm)',
                    }}
                  >
                    {item.category === 'messageTheme' ? (
                      <span className="cosmetic-preview-bubbles"><i /><i /></span>
                    ) : item.category === 'journalCover' ? (
                      <span className="cosmetic-preview-journal"><i /></span>
                    ) : item.category === 'uiSoundTheme' || item.category === 'ambientTheme' ? (
                      <span className="cosmetic-preview-wave"><i /><i /><i /><i /></span>
                    ) : item.category === 'avatarFrame' || item.category === 'avatarBackground' ? (
                      <span className="cosmetic-preview-avatar"><i /></span>
                    ) : (
                      <Sparkles size={20} />
                    )}
                  </div>

                  <div style={{ display: 'flex', gap: '4px' }}>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleWishlist(item.id);
                      }}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: isWishlisted ? 'var(--accent-plum)' : 'var(--text-muted)',
                        cursor: 'pointer',
                        padding: '4px',
                      }}
                      title="Toggle wishlist"
                    >
                      <Heart size={16} fill={isWishlisted ? 'currentColor' : 'none'} />
                    </button>
                  </div>
                </div>

                <div style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 800 }}>
                  {item.category.replace(/([A-Z])/g, ' $1')}
                </div>

                <h3 style={{ fontSize: 'var(--font-size-sm)', fontWeight: 800, color: 'var(--text-primary)', margin: '2px 0 0 0' }}>
                  {item.name}
                </h3>

                <p style={{ fontSize: '11px', color: 'var(--text-secondary)', margin: '4px 0 0 0', lineHeight: 1.4 }}>
                  {item.description}
                </p>

                {item.flavorText && (
                  <div style={{ fontStyle: 'italic', fontSize: '10px', color: 'var(--text-muted)', marginTop: '6px' }}>
                    “{item.flavorText}”
                  </div>
                )}
              </div>

              {/* Action / Status Bar */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid var(--border-subtle)', paddingTop: 'var(--space-2)' }}>
                <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>
                  {item.source}
                </span>

                {isOwned ? (
                  isEquipped ? (
                    <button
                      type="button"
                      className="btn btn-secondary btn-xs"
                      onClick={(e) => {
                        e.stopPropagation();
                        unequipCosmetic(item.category);
                      }}
                      style={{ gap: '4px', color: 'var(--accent-plum)', fontWeight: 700 }}
                    >
                      <Check size={12} /> Equipped
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="btn btn-primary btn-xs"
                      onClick={(e) => {
                        e.stopPropagation();
                        equipCosmetic(item.category, item.id);
                      }}
                    >
                      Equip
                    </button>
                  )
                ) : (
                  <span style={{ fontSize: '10px', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '3px' }}>
                    <Lock size={11} /> Locked
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Collection Passport Banner */}
      <div
        className="ef-card-subtle"
        style={{
          padding: 'var(--space-5)',
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--space-3)',
          borderRadius: 'var(--radius-xl)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
          <Foldmark size={20} color="var(--accent-plum)" />
          <h3 style={{ fontSize: 'var(--font-size-sm)', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
            Archive Collection Passport
          </h3>
        </div>
        <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-muted)', margin: 0 }}>
          Trace historical eras across Everfold to collect vintage aesthetics:
        </p>

        <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap' }}>
          {['Pairwise 1999', 'Affinity 2004', 'Correspond 2008', 'Fold 2015'].map((era) => (
            <span key={era} className="badge badge-secondary" style={{ fontSize: '11px' }}>
              ✓ {era} Stamp
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
