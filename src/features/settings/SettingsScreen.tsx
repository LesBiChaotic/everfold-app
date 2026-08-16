import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import {
  Settings,
  Volume2,
  VolumeX,
  Sun,
  Moon,
  Type,
  Eye,
  Download,
  RotateCcw,
  Shield,
  User,
  Sliders,
  CheckCircle,
  Unlock,
  ChevronRight,
  AlertTriangle,
  Smartphone,
} from 'lucide-react';
import { useSettingsStore } from '../../store/settingsStore';
import { useProfileStore } from '../../store/profileStore';
import { useAppStore } from '../../store/appStore';
import { useARGStore } from '../../store/argStore';
import { useStoryAccessStore } from '../../store/storyAccessStore';
import { useRewardStore } from '../../store/rewardStore';
import { Foldmark } from '../../components/brand/Foldmark';
import { soundEngine } from '../../audio/soundEngine';

export const SettingsScreen: React.FC = () => {
  const { resetRewardProgress, foldScore, milestoneIdsUnlocked } = useRewardStore();
  const {
    theme,
    setTheme,
    font,
    setFont,
    contrast,
    setContrast,
    reducedMotion,
    setReducedMotion,
    density,
    setDensity,
    soundMuted,
    setSoundMuted,
    uiVolume,
    setUiVolume,
    ambientVolume,
    setAmbientVolume,
    ambientSoundEnabled,
    setAmbientSoundEnabled
  } = useSettingsStore();

  const { visitorProfile } = useProfileStore();
  const { matches, threads, datePlans, journalEntries } = useAppStore();
  const { stage, storyFlags } = useARGStore();
  const { mode } = useStoryAccessStore();

  const [exportDownloaded, setExportDownloaded] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    const handler = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };
    window.addEventListener('beforeinstallprompt', handler);

    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
    }

    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setIsInstalled(true);
      setDeferredPrompt(null);
    }
  };

  const handleExportData = () => {
    soundEngine.playCue('ui.save');

    const exportData = {
      export_version: '2026.4.1_EVERFOLD_CORE',
      generated_at: new Date().toISOString(),
      account_summary: {
        id: visitorProfile.id,
        displayName: visitorProfile.displayName,
        handle: visitorProfile.handle,
        account_created: visitorProfile.createdAt,
        status: visitorProfile.status,
      },
      relational_mesh_telemetry: {
        active_matches_count: matches.length,
        relationship_records: matches.map((m) => ({
          match_id: m.id,
          target_user_id: m.userId,
          relationship_uuid: m.relationshipId,
          continuity_confidence: 0.998,
          status: m.status,
          system_tags: m.tags,
        })),
        threads_indexed: threads.length,
        scheduled_dates_count: datePlans.length,
        journal_entries_count: journalEntries.length,
      },
      system_flags: storyFlags,
      arg_stage: stage,
      story_access_mode: mode,
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `everfold_privacy_export_${Date.now()}.json`;
    a.click();
    setExportDownloaded(true);
  };

  return (
    <div
      className="settings-screen"
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
      <div>
        <h1 style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.03em' }}>
          Preferences, Typography & System Controls
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: 'var(--font-size-sm)', margin: '2px 0 0 0' }}>
          Configure editorial canvas theme, accessibility parameters, acoustic cues, and data sovereignty.
        </p>
      </div>

      {/* Story Access Mode Fast Portal */}
      <NavLink
        to="/story-access"
        className="ef-card-featured flex justify-between items-center"
        style={{
          textDecoration: 'none',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
          <div style={{ width: 42, height: 42, borderRadius: 'var(--radius-md)', backgroundColor: 'var(--accent-surface)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Unlock size={20} color="var(--accent-plum)" />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
              <h3 style={{ fontSize: 'var(--font-size-base)', fontWeight: 800, color: 'var(--text-primary)' }}>
                Story Access & Narrative Mode
              </h3>
              <span className="badge badge-plum" style={{ textTransform: 'capitalize' }}>
                {mode} Mode
              </span>
            </div>
            <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-muted)', margin: '2px 0 0 0' }}>
              Switch between Natural Discovery, Full Story Access, or Reader Archive inspection.
            </p>
          </div>
        </div>
        <ChevronRight size={20} color="var(--text-muted)" />
      </NavLink>

      {/* 1. Theme & Appearance Section */}
      <div className="ef-card" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
        <h3 style={{ fontSize: 'var(--font-size-sm)', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          Visual Canvas & Theme
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--space-3)' }}>
          <button
            onClick={() => {
              soundEngine.playCue('ui.save');
              setTheme('light');
            }}
            className={`btn ${theme === 'light' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ justifyContent: 'flex-start', padding: 'var(--space-3)', height: 'auto' }}
          >
            <Sun size={18} />
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontWeight: 700, fontSize: 'var(--font-size-sm)' }}>Warm Ivory Stationery</div>
              <div style={{ fontSize: '0.7rem', opacity: 0.8 }}>Editorial Light Mode</div>
            </div>
          </button>

          <button
            onClick={() => {
              soundEngine.playCue('ui.save');
              setTheme('dark');
            }}
            className={`btn ${theme === 'dark' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ justifyContent: 'flex-start', padding: 'var(--space-3)', height: 'auto' }}
          >
            <Moon size={18} />
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontWeight: 700, fontSize: 'var(--font-size-sm)' }}>Dim Modern Lounge</div>
              <div style={{ fontSize: '0.7rem', opacity: 0.8 }}>Low-stimulation Dark Mode</div>
            </div>
          </button>
        </div>
      </div>

      {/* 2. Typography & Legibility */}
      <div className="ef-card" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
        <h3 style={{ fontSize: 'var(--font-size-sm)', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          Typography & Font Family
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 'var(--space-2)' }}>
          {(
            [
              { id: 'everfold', name: 'Everfold Curated', desc: 'Manrope, Newsreader & IBM Plex Mono' },
              { id: 'device', name: 'Device System Font', desc: 'Native OS font (San Francisco, Segoe UI, Roboto)' },
            ] as const
          ).map((f) => (
            <button
              key={f.id}
              onClick={() => {
                soundEngine.playCue('ui.save');
                setFont(f.id);
              }}
              className={`btn ${font === f.id ? 'btn-primary' : 'btn-secondary'}`}
              style={{ justifyContent: 'flex-start', padding: 'var(--space-3)', height: 'auto' }}
            >
              <Type size={16} />
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontWeight: 700, fontSize: 'var(--font-size-sm)' }}>{f.name}</div>
                <div style={{ fontSize: '0.68rem', opacity: 0.8 }}>{f.desc}</div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* 3. Acoustic Soundscapes & Sensory Cues */}
      <div className="ef-card" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
        <h3 style={{ fontSize: 'var(--font-size-sm)', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          Soundscape & Acoustic Feedback
        </h3>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontWeight: 700, fontSize: 'var(--font-size-sm)', color: 'var(--text-primary)' }}>
              Interactive Audio Feedback
            </div>
            <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-muted)' }}>
              Soft tonal cues for clicks, sends, matches, and archival transitions.
            </div>
          </div>
          <button
            className={`btn ${soundMuted ? 'btn-secondary' : 'btn-primary'} btn-sm`}
            onClick={() => {
              setSoundMuted(!soundMuted);
              soundEngine.setMuted(!soundMuted);
            }}
          >
            {soundMuted ? <VolumeX size={15} /> : <Volume2 size={15} />}
            {soundMuted ? 'Muted' : 'Enabled'}
          </button>
        </div>

        {!soundMuted && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', borderTop: '1px solid var(--border-subtle)', paddingTop: 'var(--space-3)' }}>
            {/* UI Volume Slider */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'var(--font-size-xs)' }}>
                <span style={{ color: 'var(--text-muted)', fontWeight: 600 }}>Master UI Volume:</span>
                <span style={{ fontWeight: 700, color: 'var(--accent-plum)' }}>{Math.round(uiVolume * 100)}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={uiVolume}
                onChange={(e) => {
                  const v = parseFloat(e.target.value);
                  setUiVolume(v);
                  soundEngine.setVolumes(v, ambientVolume);
                }}
              />
            </div>

            {/* Sound Palette / Theme */}
            <div>
              <label style={{ fontSize: 'var(--font-size-xs)', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '6px', textTransform: 'uppercase' }}>
                Sound Palette
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: 'var(--space-2)' }}>
                {[
                  { id: 'soft', label: 'Soft Wood / Sine' },
                  { id: 'paper', label: 'Paper & Tactile' },
                  { id: 'glass', label: 'Glass Resonant' },
                  { id: 'minimal', label: 'Minimal Ticks' },
                ].map((st) => (
                  <button
                    key={st.id}
                    type="button"
                    className={`btn ${useSettingsStore.getState().soundTheme === st.id ? 'btn-primary' : 'btn-secondary'} btn-sm`}
                    onClick={() => {
                      soundEngine.playCue('ui.save');
                      useSettingsStore.getState().setSoundTheme(st.id as any);
                    }}
                  >
                    {st.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Ambient Soundscapes */}
            <div>
              <label style={{ fontSize: 'var(--font-size-xs)', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '6px', textTransform: 'uppercase' }}>
                Ambient Soundscape
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 'var(--space-2)' }}>
                {[
                  { id: 'rain_window', label: 'Rain on Window' },
                  { id: 'quiet_office', label: 'Quiet Room Tone' },
                  { id: 'evening_lounge', label: 'Evening Lounge' },
                  { id: 'archive_room', label: 'Archive Vault' },
                ].map((amb) => (
                  <button
                    key={amb.id}
                    type="button"
                    className={`btn ${useSettingsStore.getState().ambientTheme === amb.id ? 'btn-primary' : 'btn-secondary'} btn-sm`}
                    onClick={() => {
                      soundEngine.playCue('ui.save');
                      useSettingsStore.getState().setAmbientTheme(amb.id as any);
                    }}
                  >
                    {amb.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Experience & Delight Controls */}
      <div className="ef-card" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
        <h3 style={{ fontSize: 'var(--font-size-sm)', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          Player Experience & Immersion
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
          <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}>
            <div>
              <div style={{ fontSize: 'var(--font-size-xs)', fontWeight: 700, color: 'var(--text-primary)' }}>
                Avatar Idle Life
              </div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                Subtle natural eye blinks and breathing on prominent profile avatars.
              </div>
            </div>
            <input
              type="checkbox"
              checked={useSettingsStore.getState().avatarIdleAnimation}
              onChange={(e) => useSettingsStore.getState().setAvatarIdleAnimation(e.target.checked)}
            />
          </label>

          <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer', borderTop: '1px solid var(--border-subtle)', paddingTop: 'var(--space-3)' }}>
            <div>
              <div style={{ fontSize: 'var(--font-size-xs)', fontWeight: 700, color: 'var(--text-primary)' }}>
                Micro-Celebrations
              </div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                Restrained two-tone Foldmark particle glow on saves, milestones, and matches.
              </div>
            </div>
            <input
              type="checkbox"
              checked={useSettingsStore.getState().microCelebrations}
              onChange={(e) => useSettingsStore.getState().setMicroCelebrations(e.target.checked)}
            />
          </label>
        </div>
      </div>

      {/* Progressive Web App (PWA) Installation */}
      <div className="ef-card" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 'var(--space-3)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
            <div
              style={{
                width: '40px',
                height: '40px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--bg-surface-subtle)',
                border: '1px solid var(--border-subtle)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--accent-plum)',
              }}
            >
              <Smartphone size={20} />
            </div>
            <div>
              <div style={{ fontWeight: 800, fontSize: 'var(--font-size-sm)', color: 'var(--text-primary)' }}>
                Progressive Web App (PWA)
              </div>
              <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-muted)' }}>
                {isInstalled
                  ? 'Everfold is installed in standalone desktop/mobile mode.'
                  : 'Install Everfold as a native-like app on your Home Screen or Desktop.'}
              </div>
            </div>
          </div>

          {deferredPrompt && (
            <button
              type="button"
              className="btn btn-primary btn-sm"
              onClick={handleInstallClick}
            >
              <Smartphone size={14} /> Install Everfold App
            </button>
          )}
        </div>

        <div
          style={{
            padding: 'var(--space-3)',
            backgroundColor: 'var(--bg-surface-subtle)',
            borderRadius: 'var(--radius-md)',
            fontSize: '11px',
            color: 'var(--text-secondary)',
            lineHeight: 1.5,
          }}
        >
          <strong>How to install on your device:</strong>
          <ul style={{ paddingLeft: 'var(--space-4)', marginTop: '4px', margin: 0 }}>
            <li><strong>iPhone / iPad (Safari):</strong> Tap the <em>Share</em> button (box with arrow) and choose <em>Add to Home Screen</em>.</li>
            <li><strong>Android (Chrome):</strong> Tap the three-dot menu and select <em>Install app</em> or <em>Add to Home Screen</em>.</li>
            <li><strong>Desktop (Chrome / Edge / Brave):</strong> Click the install icon in the URL address bar or select <em>Install Everfold</em>.</li>
          </ul>
        </div>
      </div>

      {/* 4. Privacy & Data Sovereignty */}
      <div className="ef-card" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
        <h3 style={{ fontSize: 'var(--font-size-sm)', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          Data Sovereignty &amp; Local Privacy
        </h3>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 'var(--space-3)' }}>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontWeight: 700, fontSize: 'var(--font-size-sm)', color: 'var(--text-primary)' }}>
              Download Complete Relational Archive (JSON)
            </div>
            <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-muted)', marginTop: '2px' }}>
              Export all matches, correspondence telemetry, journal entries, and system flags.
            </div>
          </div>
          <button className="btn btn-secondary btn-sm" onClick={handleExportData} style={{ flexShrink: 0 }}>
            <Download size={15} /> Export Archive
          </button>
        </div>

        {/* Export How-To Guide — rendered as structured HTML, not raw markdown */}
        <div
          style={{
            backgroundColor: 'var(--bg-surface-subtle)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-md)',
            padding: 'var(--space-4)',
            fontSize: 'var(--font-size-xs)',
            color: 'var(--text-secondary)',
            lineHeight: 1.7,
          }}
        >
          <p style={{ fontWeight: 700, color: 'var(--text-primary)', marginBottom: 'var(--space-2)' }}>
            Exporting Your Data
          </p>
          <p style={{ margin: '0 0 var(--space-1) 0' }}>
            Everfold believes you have absolute ownership over your relational records, message transcripts, and date plans.
          </p>
          <ol style={{ paddingLeft: 'var(--space-5)', display: 'flex', flexDirection: 'column', gap: '4px', margin: '0' }}>
            <li>Navigate to <strong>Settings</strong> from the sidebar or bottom drawer.</li>
            <li>Scroll to the <strong>Data &amp; Archive Management</strong> section.</li>
            <li>Click <strong>Export My Everfold Data (.JSON)</strong>.</li>
            <li>Your browser will download a file named <code style={{ fontFamily: 'var(--font-family-mono)', fontSize: '0.8em', backgroundColor: 'var(--bg-surface)', padding: '0 4px', borderRadius: '3px', border: '1px solid var(--border-subtle)' }}>everfold_user_data_export_[handle].json</code>.</li>
          </ol>
        </div>

        {exportDownloaded && (
          <div style={{ color: 'var(--color-success)', fontSize: '0.75rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
            <CheckCircle size={14} /> Full telemetry export generated and downloaded to your device.
          </div>
        )}
      </div>

      {/* Optional: Reset Reward Progress */}
      <div className="ef-card" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', border: '1px dashed var(--border-default)' }}>
        <h3 style={{ fontSize: 'var(--font-size-sm)', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          Rewards & Progression Management
        </h3>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 'var(--space-3)' }}>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontWeight: 700, fontSize: 'var(--font-size-sm)', color: 'var(--text-primary)' }}>
              Reset Reward Progress
            </div>
            <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-muted)', marginTop: '2px' }}>
              This clears Fold Score ({foldScore}), unlocked milestones ({milestoneIdsUnlocked.length}), and cosmetic unlocks. It does <strong>not</strong> delete your profile, messages, Journal, matches, stories, or ARG progress.
            </div>
          </div>
          <button
            className="btn btn-secondary btn-sm"
            onClick={() => {
              if (window.confirm('Reset all Fold Score and cosmetic unlocks? Your messages and profile will NOT be affected.')) {
                resetRewardProgress();
              }
            }}
            style={{ flexShrink: 0 }}
          >
            <RotateCcw size={15} /> Reset Rewards
          </button>
        </div>
      </div>
    </div>
  );
};
