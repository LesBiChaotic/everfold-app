import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  Shield,
  Eye,
  Unlock,
  AlertTriangle,
  RotateCcw,
  CheckCircle,
  HelpCircle,
  ArrowLeft,
  ChevronDown,
  ChevronUp,
  Sliders,
  Sparkles,
} from 'lucide-react';
import { useStoryAccessStore } from '../../store/storyAccessStore';
import { Foldmark } from '../../components/brand/Foldmark';
import { soundEngine } from '../../audio/soundEngine';
import { StoryAccessMode } from '../../types';

export const StoryAccessSettings: React.FC = () => {
  const {
    mode,
    rememberOnDevice,
    revealHiddenLabels,
    showLockedPagePreviews,
    revealHiddenRoutes,
    unlockAllStoryPages,
    revealPuzzleAnswers,
    showPostARGStates,
    setMode,
    setAdvancedToggle,
    setRememberOnDevice,
    resetStoryAccess,
  } = useStoryAccessStore();

  const [pendingMode, setPendingMode] = useState<StoryAccessMode | null>(null);
  const [modalRememberChoice, setModalRememberChoice] = useState<boolean>(rememberOnDevice);
  const [advancedOpen, setAdvancedOpen] = useState(false);
  const [resetConfirmOpen, setResetConfirmOpen] = useState(false);

  const handleSelectMode = (newMode: StoryAccessMode) => {
    if (newMode === mode) return;

    if (newMode === 'SPOILER_FREE') {
      setMode('SPOILER_FREE');
      return;
    }

    soundEngine.playCue('storyAccess.warningOpen');
    setModalRememberChoice(rememberOnDevice);
    setPendingMode(newMode);
  };

  const handleConfirmModal = () => {
    if (pendingMode) {
      setMode(pendingMode, modalRememberChoice);
      setPendingMode(null);
    }
  };

  const handleCancelModal = () => {
    soundEngine.playCue('ui.navigation');
    setPendingMode(null);
  };

  const handleConfirmReset = () => {
    resetStoryAccess();
    setResetConfirmOpen(false);
  };

  return (
    <div
      className="story-access-settings"
      style={{
        maxWidth: '880px',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-5)',
        width: '100%',
      }}
    >
      {/* Top Header & Breadcrumb */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
        <NavLink to="/settings" className="btn btn-ghost btn-sm" style={{ gap: 'var(--space-2)' }}>
          <ArrowLeft size={16} /> Back to Settings
        </NavLink>

        <div
          className="badge badge-plum"
          style={{
            fontWeight: 800,
            fontSize: 'var(--font-size-xs)',
          }}
          aria-label={`Current Story Access: ${mode}`}
        >
          {mode === 'FULL_ACCESS'
            ? 'Story Access: Full'
            : mode === 'LORE_PREVIEW'
            ? 'Story Access: Preview'
            : 'Story Access: Spoiler-Free'}
        </div>
      </div>

      <div>
        <h1 style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.03em' }}>
          Story Access & Narrative Pacing Settings
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: 'var(--font-size-sm)', margin: '2px 0 0 0' }}>
          Configure how the layered mystery unfolds. Everfold can be experienced purely as an authentic intentional dating service, or explored as an investigative narrative archive.
        </p>
      </div>

      {/* 3 Main Mode Selection Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 'var(--space-4)' }}>
        {/* 1. Spoiler-Free Mode */}
        <div
          className={`ef-card-interactive flex flex-col justify-between ${mode === 'SPOILER_FREE' ? 'ef-card-featured' : ''}`}
          style={{
            padding: 'var(--space-4)',
            cursor: 'pointer',
            borderColor: mode === 'SPOILER_FREE' ? 'var(--accent-plum)' : 'var(--border-subtle)',
          }}
          onClick={() => handleSelectMode('SPOILER_FREE')}
        >
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-2)' }}>
              <div style={{ width: 36, height: 36, borderRadius: 'var(--radius-md)', backgroundColor: 'var(--bg-surface-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Shield size={18} color="var(--text-primary)" />
              </div>
              {mode === 'SPOILER_FREE' && <CheckCircle size={18} color="var(--color-success)" />}
            </div>

            <h3 style={{ fontSize: 'var(--font-size-base)', fontWeight: 800, color: 'var(--text-primary)' }}>
              Spoiler-Free (Default)
            </h3>
            <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-secondary)', marginTop: '4px', lineHeight: 1.45 }}>
              Standard functional dating experience. Anomalies and story layers appear only as you naturally discover and solve puzzle gates.
            </p>
          </div>

          <div style={{ marginTop: 'var(--space-3)', paddingTop: 'var(--space-2)', borderTop: '1px solid var(--border-subtle)' }}>
            <span className="badge" style={{ fontSize: '0.68rem' }}>
              Organic Investigation
            </span>
          </div>
        </div>

        {/* 2. Lore Preview Mode */}
        <div
          className={`ef-card-interactive flex flex-col justify-between ${mode === 'LORE_PREVIEW' ? 'ef-card-featured' : ''}`}
          style={{
            padding: 'var(--space-4)',
            cursor: 'pointer',
            borderColor: mode === 'LORE_PREVIEW' ? 'var(--accent-plum)' : 'var(--border-subtle)',
          }}
          onClick={() => handleSelectMode('LORE_PREVIEW')}
        >
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-2)' }}>
              <div style={{ width: 36, height: 36, borderRadius: 'var(--radius-md)', backgroundColor: 'var(--accent-surface)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Eye size={18} color="var(--accent-plum)" />
              </div>
              {mode === 'LORE_PREVIEW' && <CheckCircle size={18} color="var(--color-success)" />}
            </div>

            <h3 style={{ fontSize: 'var(--font-size-base)', fontWeight: 800, color: 'var(--text-primary)' }}>
              Guided Lore Preview
            </h3>
            <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-secondary)', marginTop: '4px', lineHeight: 1.45 }}>
              Displays gentle visual indicators near locked lore items, showing hints and summaries without solving the underlying gates for you.
            </p>
          </div>

          <div style={{ marginTop: 'var(--space-3)', paddingTop: 'var(--space-2)', borderTop: '1px solid var(--border-subtle)' }}>
            <span className="badge badge-plum" style={{ fontSize: '0.68rem' }}>
              Hints & Overviews
            </span>
          </div>
        </div>

        {/* 3. Full Access Mode */}
        <div
          className={`ef-card-interactive flex flex-col justify-between ${mode === 'FULL_ACCESS' ? 'ef-card-featured' : ''}`}
          style={{
            padding: 'var(--space-4)',
            cursor: 'pointer',
            borderColor: mode === 'FULL_ACCESS' ? 'var(--accent-plum)' : 'var(--border-subtle)',
          }}
          onClick={() => handleSelectMode('FULL_ACCESS')}
        >
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-2)' }}>
              <div style={{ width: 36, height: 36, borderRadius: 'var(--radius-md)', backgroundColor: 'var(--accent-surface)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Unlock size={18} color="var(--accent-plum)" />
              </div>
              {mode === 'FULL_ACCESS' && <CheckCircle size={18} color="var(--color-success)" />}
            </div>

            <h3 style={{ fontSize: 'var(--font-size-base)', fontWeight: 800, color: 'var(--text-primary)' }}>
              Full Archive Access
            </h3>
            <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-secondary)', marginTop: '4px', lineHeight: 1.45 }}>
              Unlocks all hidden routes, historical transcripts, evidence items, and terminal logs for review and archival exploration.
            </p>
          </div>

          <div style={{ marginTop: 'var(--space-3)', paddingTop: 'var(--space-2)', borderTop: '1px solid var(--border-subtle)' }}>
            <span className="badge badge-anomaly" style={{ fontSize: '0.68rem' }}>
              Full Unrestricted Review
            </span>
          </div>
        </div>
      </div>

      {/* Live Interactive Mini-Mockup Preview (Section 27) */}
      <div className="ef-card" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ fontSize: 'var(--font-size-sm)', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Live Mini-Mockup Preview ({mode})
          </h3>
          <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
            Preview of interface response under current configuration
          </span>
        </div>

        <div
          style={{
            padding: 'var(--space-4)',
            borderRadius: 'var(--radius-md)',
            backgroundColor: 'var(--bg-surface-subtle)',
            border: '1px solid var(--border-subtle)',
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--space-3)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
              <div style={{ width: 28, height: 28, borderRadius: 'var(--radius-full)', backgroundColor: 'var(--accent-surface)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Foldmark size={14} color="var(--accent-plum)" />
              </div>
              <span style={{ fontWeight: 700, fontSize: 'var(--font-size-sm)' }}>
                {mode === 'FULL_ACCESS' ? 'Record #2347: @previouslymatched' : 'Mina Okafor, 29'}
              </span>
            </div>
            {mode === 'FULL_ACCESS' ? (
              <span className="badge badge-anomaly" style={{ fontSize: '0.65rem' }}>UNRESTRICTED</span>
            ) : mode === 'LORE_PREVIEW' ? (
              <span className="badge badge-plum" style={{ fontSize: '0.65rem' }}>LORE HINT ACTIVE</span>
            ) : (
              <span className="badge" style={{ fontSize: '0.65rem' }}>STANDARD</span>
            )}
          </div>

          <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-secondary)' }}>
            {mode === 'FULL_ACCESS'
              ? 'Telemetry indicates 99.8% continuity across Platform Iteration 1999–2026. All gates bypassed for reader convenience.'
              : mode === 'LORE_PREVIEW'
              ? 'Mina values slow correspondence. [Hint: Notice the recurring timestamp markers in archive logs].'
              : 'Mina is an architectural conservator who enjoys restorative historic walks and unhurried correspondence.'}
          </div>
        </div>
      </div>

      {/* Advanced Granular Toggles Accordion */}
      <div className="ef-card" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
        <button
          className="btn-ghost"
          onClick={() => setAdvancedOpen(!advancedOpen)}
          style={{ display: 'flex', justifyContent: 'space-between', width: '100%', padding: 0 }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
            <Sliders size={16} color="var(--accent-plum)" />
            <span style={{ fontWeight: 800, fontSize: 'var(--font-size-sm)', color: 'var(--text-primary)' }}>
              Fine-Grained Advanced Toggles
            </span>
          </div>
          {advancedOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>

        {advancedOpen && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', borderTop: '1px solid var(--border-subtle)', paddingTop: 'var(--space-3)' }}>
            {[
              { key: 'revealHiddenLabels', label: 'Reveal Hidden Anomaly Labels', state: revealHiddenLabels },
              { key: 'showLockedPagePreviews', label: 'Show Summaries for Locked Pages', state: showLockedPagePreviews },
              { key: 'revealHiddenRoutes', label: 'Reveal Navigation to Secret Partitions', state: revealHiddenRoutes },
              { key: 'unlockAllStoryPages', label: 'Bypass All Puzzle Gates Unconditionally', state: unlockAllStoryPages },
              { key: 'revealPuzzleAnswers', label: 'Show Direct Solution Hints in Puzzles', state: revealPuzzleAnswers },
            ].map((item) => (
              <label
                key={item.key}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: 'var(--space-2) 0',
                  cursor: 'pointer',
                  fontSize: 'var(--font-size-xs)',
                  color: 'var(--text-primary)',
                }}
              >
                <span>{item.label}</span>
                <input
                  type="checkbox"
                  checked={item.state}
                  onChange={(e) => setAdvancedToggle(item.key as any, e.target.checked)}
                />
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Reset Section */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--space-2)' }}>
        <button
          className="btn btn-ghost btn-sm"
          onClick={() => setResetConfirmOpen(true)}
          style={{ color: 'var(--color-error)' }}
        >
          <RotateCcw size={14} /> Reset Story Access
        </button>
      </div>

      {/* Confirmation Modal for Lore Preview or Full Access */}
      {pendingMode && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'var(--bg-overlay)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 50,
            padding: 'var(--space-4)',
          }}
        >
          <div
            className="ef-card-featured"
            style={{
              maxWidth: '500px',
              width: '100%',
              backgroundColor: 'var(--bg-surface)',
              border: '1px solid var(--border-default)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', marginBottom: 'var(--space-3)' }}>
              <div style={{ width: 40, height: 40, borderRadius: 'var(--radius-md)', backgroundColor: 'var(--accent-surface)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <AlertTriangle size={20} color="var(--accent-plum)" />
              </div>
              <div>
                <h3 style={{ fontWeight: 800, fontSize: 'var(--font-size-base)', color: 'var(--text-primary)' }}>
                  Confirm Switch to {pendingMode === 'FULL_ACCESS' ? 'Full Archive Access' : 'Lore Preview'}
                </h3>
                <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-muted)' }}>
                  This will reveal narrative secrets and historic platform anomalies.
                </div>
              </div>
            </div>

            <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-secondary)', lineHeight: 1.5, margin: 'var(--space-2) 0' }}>
              {pendingMode === 'FULL_ACCESS'
                ? 'All puzzle gates, transcripts, deceased user cases, and platform history will be accessible directly.'
                : 'Hints and summaries will appear across profiles, maps, and archive documents.'}
            </p>

            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: 'var(--font-size-xs)', color: 'var(--text-primary)', margin: 'var(--space-3) 0' }}>
              <input
                type="checkbox"
                checked={modalRememberChoice}
                onChange={(e) => setModalRememberChoice(e.target.checked)}
              />
              Remember this choice across browser sessions
            </label>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--space-2)', marginTop: 'var(--space-4)' }}>
              <button className="btn btn-ghost btn-sm" onClick={handleCancelModal}>
                Cancel
              </button>
              <button className="btn btn-primary btn-sm" onClick={handleConfirmModal}>
                Proceed to {pendingMode === 'FULL_ACCESS' ? 'Full Access' : 'Lore Preview'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reset Confirmation Modal */}
      {resetConfirmOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'var(--bg-overlay)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 50,
            padding: 'var(--space-4)',
          }}
        >
          <div className="ef-card-featured" style={{ maxWidth: '440px', width: '100%', backgroundColor: 'var(--bg-surface)' }}>
            <h3 style={{ fontWeight: 800, fontSize: 'var(--font-size-base)' }}>Reset Story Access Settings?</h3>
            <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-muted)', margin: 'var(--space-2) 0 var(--space-4)' }}>
              This restores Story Access to Spoiler-Free mode and resets all advanced narrative visibility toggles to default.
            </p>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--space-2)' }}>
              <button className="btn btn-ghost btn-sm" onClick={() => setResetConfirmOpen(false)}>Cancel</button>
              <button className="btn btn-primary btn-sm" onClick={handleConfirmReset}>Confirm Reset</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
