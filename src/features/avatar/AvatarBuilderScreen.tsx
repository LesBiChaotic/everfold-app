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
  Layers,
} from 'lucide-react';
import { AvatarRenderer, defaultAvatarConfig } from '../../components/avatar/AvatarRenderer';
import { useProfileStore } from '../../store/profileStore';
import { AvatarConfig } from '../../types';
import { soundEngine } from '../../audio/soundEngine';
import { MicroCelebration } from '../../components/common/MicroCelebration';

export const AvatarBuilderScreen: React.FC = () => {
  const navigate = useNavigate();
  const { visitorProfile, updateVisitorAvatar, avatarPresets, saveAvatarPreset, deleteAvatarPreset, applyAvatarPreset } = useProfileStore();

  const [currentConfig, setCurrentConfig] = useState<AvatarConfig>({ ...visitorProfile.avatarConfig });
  const [prevConfig, setPrevConfig] = useState<AvatarConfig | null>(null);
  const [activeCategory, setActiveCategory] = useState<'face' | 'hair' | 'details' | 'clothing' | 'expression' | 'canvas' | 'presets'>('face');
  const [presetName, setPresetName] = useState('');
  const [showCelebration, setShowCelebration] = useState(false);

  const skinTones = ['#f5d0a9', '#e0b59b', '#d4a373', '#c68642', '#a06846', '#8d5524', '#603813', '#4a2c1d'];
  const hairColors = ['#1a110a', '#2b1d14', '#4a3728', '#8a4b27', '#b87333', '#d4a373', '#6e5d53', '#e2e8f0'];
  const backgroundColors = ['#f5ede8', '#f3ebd4', '#e2eee6', '#e4e9f5', '#efe5f0', '#252028'];

  const handleUpdate = (field: keyof AvatarConfig, val: any) => {
    soundEngine.playCue('ui.tick');
    setPrevConfig({ ...currentConfig });
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
    const moods = ['warm', 'curious', 'joyful', 'grounded'];

    setCurrentConfig((prev) => ({
      ...prev,
      skinTone: randomSkin,
      hairColor: randomHair,
      backgroundColor: randomBg,
      hairStyle: hairStyles[Math.floor(Math.random() * hairStyles.length)],
      top: tops[Math.floor(Math.random() * tops.length)],
      glasses: glasses[Math.floor(Math.random() * glasses.length)],
      moodExpression: moods[Math.floor(Math.random() * moods.length)],
      freckles: Math.random() > 0.6,
      beautyMarks: Math.random() > 0.7,
    }));
  };

  const handleUndo = () => {
    if (prevConfig) {
      soundEngine.playCue('ui.undo');
      setCurrentConfig({ ...prevConfig });
      setPrevConfig(null);
    }
  };

  const handleSaveToProfile = () => {
    soundEngine.playCue('ui.save');
    updateVisitorAvatar(currentConfig);
    setShowCelebration(true);
    setTimeout(() => {
      navigate('/profile');
    }, 400);
  };

  const handleSavePreset = (e: React.FormEvent) => {
    e.preventDefault();
    if (!presetName.trim()) return;
    saveAvatarPreset(presetName.trim(), currentConfig);
    setPresetName('');
    soundEngine.playCue('ui.save');
  };

  const handleApplyPreset = (preset: { id: string; config: AvatarConfig }) => {
    soundEngine.playCue('ui.save');
    setPrevConfig({ ...currentConfig });
    setCurrentConfig({ ...preset.config });
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
        paddingBottom: '80px',
      }}
    >
      {/* Top Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 'var(--space-3)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
          <button
            type="button"
            className="btn-ghost"
            onClick={() => navigate('/profile')}
            style={{ width: 38, height: 38, padding: 0 }}
            aria-label="Back to profile"
          >
            <ArrowLeft size={18} />
          </button>
          <div>
            <h1 style={{ fontSize: 'clamp(1.4rem, 3vw, 1.9rem)', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.03em', margin: 0 }}>
              Illustrated Profile Studio
            </h1>
            <p style={{ color: 'var(--text-muted)', fontSize: 'var(--font-size-xs)', margin: '2px 0 0 0' }}>
              Build a warm illustrated portrait without uploading a photograph.
            </p>
          </div>
        </div>

        <button type="button" className="btn btn-primary" onClick={handleSaveToProfile} style={{ minHeight: '40px' }}>
          <Save size={15} /> Save Avatar
        </button>
      </div>

      {/* Flagship Responsive Studio Layout */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: 'var(--space-5)',
          alignItems: 'start',
        }}
      >
        {/* Left / Top Column: Live Avatar Preview Card & Quick Actions */}
        <div
          className="ef-card-featured avatar-studio-preview"
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            gap: 'var(--space-4)',
            position: 'sticky',
            top: 'calc(var(--header-height, 60px) + 16px)',
          }}
        >
          <div
            style={{
              padding: 'var(--space-4)',
              borderRadius: 'var(--radius-xl)',
              backgroundColor: 'var(--bg-surface-subtle)',
              border: '1px solid var(--border-subtle)',
              display: 'inline-flex',
              boxShadow: 'var(--shadow-md)',
              transition: 'all 0.2s ease',
            }}
          >
            <AvatarRenderer config={currentConfig} size={210} enableIdle={true} />
          </div>

          <div style={{ width: '100%' }}>
            <h3 style={{ fontSize: 'var(--font-size-base)', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
              {visitorProfile.displayName}
            </h3>
            <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-muted)', marginTop: '2px' }}>
              Mood: {currentConfig.moodExpression || 'warm'} · Frame: {currentConfig.frame || 'circle'}
            </div>
          </div>

          {/* Quick Action Buttons */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-2)', width: '100%' }}>
            <button type="button" className="btn btn-secondary btn-sm" onClick={handleRandomize}>
              <Shuffle size={14} /> Randomize
            </button>
            <button type="button" className="btn btn-secondary btn-sm" onClick={handleUndo} disabled={!prevConfig}>
              <RotateCcw size={14} /> Undo
            </button>
          </div>
        </div>

        {/* Right / Bottom Column: Tabbed Customization Panel */}
        <div className="ef-card" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
          {/* Category Chips Bar */}
          <div
            style={{
              display: 'flex',
              gap: 'var(--space-1)',
              borderBottom: '1px solid var(--border-subtle)',
              paddingBottom: 'var(--space-3)',
              overflowX: 'auto',
              scrollbarWidth: 'none',
            }}
            role="tablist"
          >
            {[
              { id: 'face', label: 'Face & Skin' },
              { id: 'hair', label: 'Hair & Hue' },
              { id: 'details', label: 'Eyes & Details' },
              { id: 'clothing', label: 'Attire' },
              { id: 'expression', label: 'Expression' },
              { id: 'canvas', label: 'Frame & Canvas' },
              { id: 'presets', label: 'Presets' },
            ].map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => {
                  soundEngine.playCue('ui.navigation');
                  setActiveCategory(cat.id as any);
                }}
                className="badge"
                style={{
                  backgroundColor: activeCategory === cat.id ? 'var(--accent-plum)' : 'var(--bg-surface-subtle)',
                  color: activeCategory === cat.id ? 'var(--text-inverse)' : 'var(--text-secondary)',
                  padding: '8px 14px',
                  fontSize: 'var(--font-size-xs)',
                  fontWeight: activeCategory === cat.id ? 700 : 500,
                  border: `1px solid ${activeCategory === cat.id ? 'var(--accent-plum)' : 'var(--border-subtle)'}`,
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  borderRadius: 'var(--radius-full)',
                  flexShrink: 0,
                }}
                role="tab"
                aria-selected={activeCategory === cat.id}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Tab 1: Face & Skin */}
          {activeCategory === 'face' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
              <div>
                <label style={{ fontSize: 'var(--font-size-xs)', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '8px', textTransform: 'uppercase' }}>
                  Skin Tone
                </label>
                <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap' }}>
                  {skinTones.map((tone) => (
                    <button
                      key={tone}
                      type="button"
                      onClick={() => handleUpdate('skinTone', tone)}
                      style={{
                        width: 40,
                        height: 40,
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
                <label style={{ fontSize: 'var(--font-size-xs)', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '8px', textTransform: 'uppercase' }}>
                  Jaw / Face Shape
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(110px, 1fr))', gap: 'var(--space-2)' }}>
                  {(['oval', 'square', 'round', 'heart'] as const).map((shape) => (
                    <button
                      key={shape}
                      type="button"
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
                <label style={{ fontSize: 'var(--font-size-xs)', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '8px', textTransform: 'uppercase' }}>
                  Hair Color
                </label>
                <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap' }}>
                  {hairColors.map((color) => (
                    <button
                      key={color}
                      type="button"
                      onClick={() => handleUpdate('hairColor', color)}
                      style={{
                        width: 40,
                        height: 40,
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
                <label style={{ fontSize: 'var(--font-size-xs)', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '8px', textTransform: 'uppercase' }}>
                  Hair Style
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: 'var(--space-2)' }}>
                  {['bob', 'pixie', 'crew', 'curtain_bangs', 'shoulder_waves', 'high_bun', 'side_part', 'afro'].map((style) => (
                    <button
                      key={style}
                      type="button"
                      onClick={() => handleUpdate('hairStyle', style)}
                      className={`btn ${currentConfig.hairStyle === style ? 'btn-primary' : 'btn-secondary'} btn-sm`}
                      style={{ textTransform: 'capitalize' }}
                    >
                      {style.replace('_', ' ')}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label style={{ fontSize: 'var(--font-size-xs)', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '8px', textTransform: 'uppercase' }}>
                  Facial Hair
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(110px, 1fr))', gap: 'var(--space-2)' }}>
                  {['none', 'stubble', 'full_beard', 'mustache'].map((f) => (
                    <button
                      key={f}
                      type="button"
                      onClick={() => handleUpdate('facialHair', f)}
                      className={`btn ${currentConfig.facialHair === f ? 'btn-primary' : 'btn-secondary'} btn-sm`}
                      style={{ textTransform: 'capitalize' }}
                    >
                      {f.replace('_', ' ')}
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
                <label style={{ fontSize: 'var(--font-size-xs)', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '8px', textTransform: 'uppercase' }}>
                  Eyewear
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: 'var(--space-2)' }}>
                  {['none', 'wire_round', 'thick_square', 'aviator'].map((g) => (
                    <button
                      key={g}
                      type="button"
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
                <label style={{ fontSize: 'var(--font-size-xs)', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '8px', textTransform: 'uppercase' }}>
                  Jewelry & Accents
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: 'var(--space-2)' }}>
                  {[
                    { id: 'none', label: 'None' },
                    { id: 'gold_hoops', label: 'Gold Hoops' },
                  ].map((j) => (
                    <button
                      key={j.id}
                      type="button"
                      onClick={() => handleUpdate('jewelry', j.id)}
                      className={`btn ${currentConfig.jewelry === j.id ? 'btn-primary' : 'btn-secondary'} btn-sm`}
                    >
                      {j.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label style={{ fontSize: 'var(--font-size-xs)', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '8px', textTransform: 'uppercase' }}>
                  Facial Marks
                </label>
                <div style={{ display: 'flex', gap: 'var(--space-4)' }}>
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

          {/* Tab 4: Attire */}
          {activeCategory === 'clothing' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
              <div>
                <label style={{ fontSize: 'var(--font-size-xs)', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '8px', textTransform: 'uppercase' }}>
                  Top / Attire
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: 'var(--space-2)' }}>
                  {['crew_sweater', 'collared_shirt', 'turtleneck', 'v_neck', 'hoodie'].map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => handleUpdate('top', t)}
                      className={`btn ${currentConfig.top === t ? 'btn-primary' : 'btn-secondary'} btn-sm`}
                      style={{ textTransform: 'capitalize' }}
                    >
                      {t.replace('_', ' ')}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label style={{ fontSize: 'var(--font-size-xs)', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '8px', textTransform: 'uppercase' }}>
                  Head Coverings
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(110px, 1fr))', gap: 'var(--space-2)' }}>
                  {['none', 'beanie', 'hijab'].map((hc) => (
                    <button
                      key={hc}
                      type="button"
                      onClick={() => handleUpdate('headCoverings', hc)}
                      className={`btn ${currentConfig.headCoverings === hc ? 'btn-primary' : 'btn-secondary'} btn-sm`}
                      style={{ textTransform: 'capitalize' }}
                    >
                      {hc}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Tab 5: Expression */}
          {activeCategory === 'expression' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
              <div>
                <label style={{ fontSize: 'var(--font-size-xs)', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '8px', textTransform: 'uppercase' }}>
                  Mood / Expression
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: 'var(--space-2)' }}>
                  {[
                    { id: 'warm', label: 'Warm' },
                    { id: 'curious', label: 'Curious' },
                    { id: 'joyful', label: 'Joyful' },
                    { id: 'grounded', label: 'Grounded / Calm' },
                  ].map((m) => (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => handleUpdate('moodExpression', m.id)}
                      className={`btn ${currentConfig.moodExpression === m.id ? 'btn-primary' : 'btn-secondary'} btn-sm`}
                    >
                      {m.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Tab 6: Frame & Canvas */}
          {activeCategory === 'canvas' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
              <div>
                <label style={{ fontSize: 'var(--font-size-xs)', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '8px', textTransform: 'uppercase' }}>
                  Avatar Frame
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(110px, 1fr))', gap: 'var(--space-2)' }}>
                  {[
                    { id: 'circle', label: 'Circle' },
                    { id: 'rounded_rect', label: 'Soft Rect' },
                    { id: 'arch', label: 'Arch' },
                    { id: 'square', label: 'Square' },
                  ].map((f) => (
                    <button
                      key={f.id}
                      type="button"
                      onClick={() => handleUpdate('frame', f.id)}
                      className={`btn ${currentConfig.frame === f.id ? 'btn-primary' : 'btn-secondary'} btn-sm`}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label style={{ fontSize: 'var(--font-size-xs)', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '8px', textTransform: 'uppercase' }}>
                  Backdrop Tone
                </label>
                <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap' }}>
                  {backgroundColors.map((bg) => (
                    <button
                      key={bg}
                      type="button"
                      onClick={() => handleUpdate('backgroundColor', bg)}
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 'var(--radius-md)',
                        backgroundColor: bg,
                        border: currentConfig.backgroundColor === bg ? '3px solid var(--accent-plum)' : '1px solid var(--border-default)',
                        cursor: 'pointer',
                      }}
                      aria-label={`Background color ${bg}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Tab 7: Presets */}
          {activeCategory === 'presets' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
              <div>
                <label style={{ fontSize: 'var(--font-size-xs)', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '8px', textTransform: 'uppercase' }}>
                  Saved Presets
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 'var(--space-3)' }}>
                  {avatarPresets.map((preset) => (
                    <div
                      key={preset.id}
                      className="ef-card-subtle"
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: 'var(--space-2)',
                        padding: 'var(--space-3)',
                        borderRadius: 'var(--radius-md)',
                      }}
                    >
                      <AvatarRenderer config={preset.config} size={64} enableIdle={false} />
                      <span style={{ fontSize: 'var(--font-size-xs)', fontWeight: 700, color: 'var(--text-primary)' }}>
                        {preset.name}
                      </span>
                      <div style={{ display: 'flex', gap: 'var(--space-1)', width: '100%' }}>
                        <button
                          type="button"
                          className="btn btn-secondary btn-xs"
                          onClick={() => handleApplyPreset(preset)}
                          style={{ flex: 1 }}
                        >
                          Apply
                        </button>
                        {avatarPresets.length > 2 && (
                          <button
                            type="button"
                            className="btn-ghost"
                            onClick={() => deleteAvatarPreset(preset.id)}
                            style={{ width: 26, height: 26, padding: 0, color: 'var(--text-muted)' }}
                            aria-label={`Delete preset ${preset.name}`}
                          >
                            <Trash2 size={12} />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Save Current as New Preset */}
              <form onSubmit={handleSavePreset} style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: 'var(--space-3)' }}>
                <label style={{ fontSize: 'var(--font-size-xs)', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '6px', textTransform: 'uppercase' }}>
                  Save Current Look as Preset
                </label>
                <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
                  <input
                    type="text"
                    className="input"
                    placeholder="e.g. Autumn Reading Room"
                    value={presetName}
                    onChange={(e) => setPresetName(e.target.value)}
                    style={{ flex: 1, minHeight: '38px', fontSize: 'var(--font-size-xs)' }}
                  />
                  <button type="submit" className="btn btn-primary btn-sm" disabled={!presetName.trim()}>
                    <Bookmark size={14} /> Save Preset
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>

      {/* Sticky Bottom Save Bar */}
      <div
        className="sticky-save-bar"
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: 'var(--bg-surface)',
          borderTop: '1px solid var(--border-default)',
          padding: '12px 20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          zIndex: 990,
          boxShadow: '0 -4px 16px rgba(0,0,0,0.06)',
        }}
      >
        <button
          type="button"
          className="btn btn-secondary btn-sm"
          onClick={() => navigate('/profile')}
        >
          Cancel
        </button>

        <button
          type="button"
          className="btn btn-primary"
          onClick={handleSaveToProfile}
          style={{ minHeight: '40px', padding: '0 24px' }}
        >
          <Save size={15} /> Save to Profile
        </button>
      </div>

      {showCelebration && (
        <MicroCelebration onComplete={() => setShowCelebration(false)} />
      )}
    </div>
  );
};
