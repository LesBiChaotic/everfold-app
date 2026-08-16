import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Sparkles,
  Shuffle,
  RotateCcw,
  Save,
  Bookmark,
  Check,
  ArrowLeft,
  Trash2,
  Smile,
  Palette,
  Eye,
  Shirt,
} from 'lucide-react';
import { AvatarRenderer, defaultAvatarConfig } from '../../components/avatar/AvatarRenderer';
import { useProfileStore } from '../../store/profileStore';
import { AvatarConfig } from '../../types';
import { soundEngine } from '../../audio/soundEngine';

export const AvatarBuilderScreen: React.FC = () => {
  const navigate = useNavigate();
  const { visitorProfile, updateVisitorAvatar, avatarPresets, saveAvatarPreset, deleteAvatarPreset } = useProfileStore();

  const [currentConfig, setCurrentConfig] = useState<AvatarConfig>({ ...visitorProfile.avatarConfig });
  const [prevConfig, setPrevConfig] = useState<AvatarConfig | null>(null);
  const [activeCategory, setActiveCategory] = useState<'face' | 'hair' | 'details' | 'clothing' | 'style'>('face');
  const [presetName, setPresetName] = useState('');

  const skinTones = ['#f5d0a9', '#e0b59b', '#d4a373', '#c68642', '#a06846', '#8d5524', '#603813', '#4a2c1d'];
  const hairColors = ['#1a110a', '#2b1d14', '#4a3728', '#8a4b27', '#b87333', '#d4a373', '#6e5d53', '#e2e8f0'];
  const backgroundColors = ['#f5ede8', '#f3ebd4', '#e2eee6', '#e4e9f5', '#efe5f0', '#252028'];

  const handleUpdate = (field: keyof AvatarConfig, val: any) => {
    soundEngine.playCue('ui.save');
    setCurrentConfig((prev) => ({ ...prev, [field]: val }));
  };

  const handleRandomize = () => {
    soundEngine.playCue('ui.navigation');
    setPrevConfig({ ...currentConfig });
    const randomSkin = skinTones[Math.floor(Math.random() * skinTones.length)];
    const randomHair = hairColors[Math.floor(Math.random() * hairColors.length)];
    const randomBg = backgroundColors[Math.floor(Math.random() * backgroundColors.length)];
    const hairStyles = ['bob', 'pixie', 'crew', 'curtain_bangs', 'shoulder_waves', 'high_bun', 'side_part', 'afro'];
    const tops = ['crew_sweater', 'collared_shirt', 'turtleneck', 'v_neck', 'hoodie'];
    const glasses = ['none', 'wire_round', 'thick_square', 'aviator'];

    setCurrentConfig((prev) => ({
      ...prev,
      skinTone: randomSkin,
      hairColor: randomHair,
      backgroundColor: randomBg,
      hairStyle: hairStyles[Math.floor(Math.random() * hairStyles.length)],
      top: tops[Math.floor(Math.random() * tops.length)],
      glasses: glasses[Math.floor(Math.random() * glasses.length)],
      freckles: Math.random() > 0.6,
      beautyMarks: Math.random() > 0.7,
    }));
  };

  const handleUndo = () => {
    if (prevConfig) {
      soundEngine.playCue('ui.navigation');
      setCurrentConfig({ ...prevConfig });
      setPrevConfig(null);
    }
  };

  const handleSaveToProfile = () => {
    soundEngine.playCue('ui.success');
    updateVisitorAvatar(currentConfig);
    navigate('/profile');
  };

  const handleSavePreset = (e: React.FormEvent) => {
    e.preventDefault();
    if (!presetName.trim()) return;
    saveAvatarPreset(presetName.trim(), currentConfig);
    setPresetName('');
    soundEngine.playCue('ui.save');
  };

  return (
    <div
      className="avatar-builder-screen"
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-5)',
        maxWidth: '1080px',
        margin: '0 auto',
        width: '100%',
      }}
    >
      {/* Top Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 'var(--space-3)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
          <button className="btn-ghost" onClick={() => navigate('/profile')} style={{ width: 36, height: 36, padding: 0 }}>
            <ArrowLeft size={18} />
          </button>
          <div>
            <h1 style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.03em' }}>
              Modular Avatar Studio
            </h1>
            <p style={{ color: 'var(--text-muted)', fontSize: 'var(--font-size-sm)', margin: '2px 0 0 0' }}>
              Everfold uses modular vector avatars to prioritize authentic intentional presence over superficial photo bias.
            </p>
          </div>
        </div>

        <button className="btn btn-primary" onClick={handleSaveToProfile}>
          <Save size={15} /> Save to Profile
        </button>
      </div>

      {/* Flagship 2-Column Studio Layout */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(280px, 360px) 1fr',
          gap: 'var(--space-5)',
          alignItems: 'start',
        }}
      >
        {/* Left Column: Sticky Avatar Preview Card & Quick Controls */}
        <div
          className="ef-card-featured"
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            gap: 'var(--space-4)',
            position: 'sticky',
            top: 'calc(var(--header-height) + var(--space-4))',
          }}
        >
          <div
            style={{
              padding: 'var(--space-4)',
              borderRadius: 'var(--radius-xl)',
              backgroundColor: 'var(--bg-surface-subtle)',
              border: '1px solid var(--border-subtle)',
              display: 'inline-flex',
              boxShadow: 'var(--shadow-sm)',
            }}
          >
            <AvatarRenderer config={currentConfig} size={180} />
          </div>

          <div style={{ width: '100%' }}>
            <h3 style={{ fontSize: 'var(--font-size-base)', fontWeight: 800, color: 'var(--text-primary)' }}>
              Alex Rivers
            </h3>
            <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-muted)' }}>
              Identity Matrix: Active Visual Vector
            </div>
          </div>

          {/* Quick Action Buttons */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-2)', width: '100%' }}>
            <button className="btn btn-secondary btn-sm" onClick={handleRandomize}>
              <Shuffle size={14} /> Randomize
            </button>
            <button className="btn btn-secondary btn-sm" onClick={handleUndo} disabled={!prevConfig}>
              <RotateCcw size={14} /> Undo
            </button>
          </div>

          {/* Preset Saving Mini Form */}
          <form onSubmit={handleSavePreset} style={{ width: '100%', borderTop: '1px solid var(--border-subtle)', paddingTop: 'var(--space-3)' }}>
            <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-muted)', textAlign: 'left', marginBottom: '4px', textTransform: 'uppercase' }}>
              Save Preset
            </div>
            <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
              <input
                type="text"
                className="input"
                placeholder="e.g. Autumn Warmth"
                value={presetName}
                onChange={(e) => setPresetName(e.target.value)}
                style={{ flex: 1, minHeight: '34px', fontSize: 'var(--font-size-xs)' }}
              />
              <button type="submit" className="btn btn-secondary btn-sm" disabled={!presetName.trim()}>
                <Bookmark size={14} />
              </button>
            </div>
          </form>
        </div>

        {/* Right Column: Tabbed Customization Panel */}
        <div className="ef-card" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
          {/* Category Tabs */}
          <div style={{ display: 'flex', gap: 'var(--space-1)', borderBottom: '1px solid var(--border-subtle)', paddingBottom: 'var(--space-3)', overflowX: 'auto' }}>
            {(
              [
                { id: 'face', label: 'Face & Skin' },
                { id: 'hair', label: 'Hair & Hue' },
                { id: 'details', label: 'Eyes & Glasses' },
                { id: 'clothing', label: 'Attire & Tops' },
                { id: 'style', label: 'Canvas Tone' },
              ] as const
            ).map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  soundEngine.playCue('ui.navigation');
                  setActiveCategory(cat.id);
                }}
                className="badge"
                style={{
                  backgroundColor: activeCategory === cat.id ? 'var(--accent-plum)' : 'var(--bg-surface-subtle)',
                  color: activeCategory === cat.id ? 'var(--text-inverse)' : 'var(--text-secondary)',
                  padding: '0.4rem 0.85rem',
                  fontSize: 'var(--font-size-xs)',
                  fontWeight: activeCategory === cat.id ? 700 : 500,
                  border: '1px solid',
                  borderColor: activeCategory === cat.id ? 'var(--accent-plum)' : 'var(--border-subtle)',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                }}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Tab 1: Face & Skin */}
          {activeCategory === 'face' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
              <div>
                <label style={{ fontSize: 'var(--font-size-xs)', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: 'var(--space-2)', textTransform: 'uppercase' }}>
                  Skin Tone
                </label>
                <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap' }}>
                  {skinTones.map((tone) => (
                    <button
                      key={tone}
                      onClick={() => handleUpdate('skinTone', tone)}
                      style={{
                        width: 38,
                        height: 38,
                        borderRadius: 'var(--radius-full)',
                        backgroundColor: tone,
                        border: currentConfig.skinTone === tone ? '3px solid var(--accent-plum)' : '1px solid var(--border-default)',
                        cursor: 'pointer',
                      }}
                      aria-label={`Skin tone ${tone}`}
                    />
                  ))}
                </div>
              </div>

              <div>
                <label style={{ fontSize: 'var(--font-size-xs)', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: 'var(--space-2)', textTransform: 'uppercase' }}>
                  Head / Jaw Shape
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: 'var(--space-2)' }}>
                  {(['oval', 'square', 'round', 'heart'] as const).map((shape) => (
                    <button
                      key={shape}
                      onClick={() => handleUpdate('faceShape', shape)}
                      className={`btn ${currentConfig.faceShape === shape ? 'btn-primary' : 'btn-secondary'} btn-sm`}
                      style={{ textTransform: 'capitalize' }}
                    >
                      {shape}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: Hair */}
          {activeCategory === 'hair' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
              <div>
                <label style={{ fontSize: 'var(--font-size-xs)', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: 'var(--space-2)', textTransform: 'uppercase' }}>
                  Hair Hue
                </label>
                <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap' }}>
                  {hairColors.map((color) => (
                    <button
                      key={color}
                      onClick={() => handleUpdate('hairColor', color)}
                      style={{
                        width: 38,
                        height: 38,
                        borderRadius: 'var(--radius-full)',
                        backgroundColor: color,
                        border: currentConfig.hairColor === color ? '3px solid var(--accent-plum)' : '1px solid var(--border-default)',
                        cursor: 'pointer',
                      }}
                      aria-label={`Hair color ${color}`}
                    />
                  ))}
                </div>
              </div>

              <div>
                <label style={{ fontSize: 'var(--font-size-xs)', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: 'var(--space-2)', textTransform: 'uppercase' }}>
                  Hair Style
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: 'var(--space-2)' }}>
                  {['bob', 'pixie', 'crew', 'curtain_bangs', 'shoulder_waves', 'high_bun', 'side_part', 'afro'].map((style) => (
                    <button
                      key={style}
                      onClick={() => handleUpdate('hairStyle', style)}
                      className={`btn ${currentConfig.hairStyle === style ? 'btn-primary' : 'btn-secondary'} btn-sm`}
                      style={{ textTransform: 'capitalize' }}
                    >
                      {style.replace('_', ' ')}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Tab 3: Details */}
          {activeCategory === 'details' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
              <div>
                <label style={{ fontSize: 'var(--font-size-xs)', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: 'var(--space-2)', textTransform: 'uppercase' }}>
                  Eyewear
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: 'var(--space-2)' }}>
                  {['none', 'wire_round', 'thick_square', 'aviator'].map((g) => (
                    <button
                      key={g}
                      onClick={() => handleUpdate('glasses', g)}
                      className={`btn ${currentConfig.glasses === g ? 'btn-primary' : 'btn-secondary'} btn-sm`}
                      style={{ textTransform: 'capitalize' }}
                    >
                      {g.replace('_', ' ')}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label style={{ fontSize: 'var(--font-size-xs)', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: 'var(--space-2)', textTransform: 'uppercase' }}>
                  Distinguishing Marks
                </label>
                <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: 'var(--font-size-sm)' }}>
                    <input
                      type="checkbox"
                      checked={currentConfig.freckles}
                      onChange={(e) => handleUpdate('freckles', e.target.checked)}
                    />
                    Freckles
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: 'var(--font-size-sm)' }}>
                    <input
                      type="checkbox"
                      checked={currentConfig.beautyMarks}
                      onChange={(e) => handleUpdate('beautyMarks', e.target.checked)}
                    />
                    Beauty Mark
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* Tab 4: Clothing */}
          {activeCategory === 'clothing' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
              <div>
                <label style={{ fontSize: 'var(--font-size-xs)', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: 'var(--space-2)', textTransform: 'uppercase' }}>
                  Top / Attire
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: 'var(--space-2)' }}>
                  {['crew_sweater', 'collared_shirt', 'turtleneck', 'v_neck', 'hoodie'].map((t) => (
                    <button
                      key={t}
                      onClick={() => handleUpdate('top', t)}
                      className={`btn ${currentConfig.top === t ? 'btn-primary' : 'btn-secondary'} btn-sm`}
                      style={{ textTransform: 'capitalize' }}
                    >
                      {t.replace('_', ' ')}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Tab 5: Canvas Tone */}
          {activeCategory === 'style' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
              <div>
                <label style={{ fontSize: 'var(--font-size-xs)', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: 'var(--space-2)', textTransform: 'uppercase' }}>
                  Avatar Backdrop Tone
                </label>
                <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap' }}>
                  {backgroundColors.map((bg) => (
                    <button
                      key={bg}
                      onClick={() => handleUpdate('backgroundColor', bg)}
                      style={{
                        width: 38,
                        height: 38,
                        borderRadius: 'var(--radius-md)',
                        backgroundColor: bg,
                        border: currentConfig.backgroundColor === bg ? '3px solid var(--accent-plum)' : '1px solid var(--border-default)',
                        cursor: 'pointer',
                      }}
                      aria-label={`Background ${bg}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
