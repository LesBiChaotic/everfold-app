import React, { useEffect } from 'react';
import { X, RefreshCw, Key, CheckCircle, Flame, ShieldAlert, Cpu } from 'lucide-react';
import { useARGStore } from '../../store/argStore';
import { useAppStore } from '../../store/appStore';
import { useProfileStore } from '../../store/profileStore';
import { useLiveStore } from '../../store/liveStore';
import { SEEDED_PUZZLES } from '../../data/puzzles';
import { ARGStage } from '../../types';

export const DebugDrawer: React.FC = () => {
  const {
    stage,
    setStage,
    storyFlags,
    addStoryFlag,
    solvedPuzzleIds,
    solvePuzzle,
    visitCounts,
    debugDrawerOpen,
    toggleDebugDrawer,
    resetARGStore
  } = useARGStore();

  const { resetAppStore } = useAppStore();
  const { resetProfileStore } = useProfileStore();
  const { triggerEligibleEvents } = useLiveStore();

  // Keyboard shortcut Ctrl+Shift+D
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toUpperCase() === 'D') {
        e.preventDefault();
        toggleDebugDrawer();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [toggleDebugDrawer]);

  if (!debugDrawerOpen) return null;

  const stageNames: Record<ARGStage, string> = {
    0: '0: NORMAL',
    1: '1: MINOR_ODDITIES',
    2: '2: PRIOR_CONNECTIONS',
    3: '3: LEGACY_ARCHIVE',
    4: '4: TRUST_SAFETY_INTERNAL',
    5: '5: RECURRENCE',
    6: '6: POSTHUMOUS',
    7: '7: VISITOR_INVOLVEMENT',
    8: '8: CONFLICTED_REALITY'
  };

  const handleFullReset = () => {
    if (window.confirm('Reset all experience data and return to Stage 0?')) {
      resetARGStore();
      resetAppStore();
      resetProfileStore();
      toggleDebugDrawer();
      window.location.href = '/home';
    }
  };

  const handleJumpToStage = (targetStage: ARGStage) => {
    setStage(targetStage);
    if (targetStage >= 3) addStoryFlag('foundLegacyArchive');
    if (targetStage >= 4) {
      addStoryFlag('foundMeredith');
      addStoryFlag('gate4417Solved');
      solvePuzzle('gate_0814_legacy');
      solvePuzzle('gate_4417_meredith');
    }
    if (targetStage >= 5) {
      addStoryFlag('foundRoleResolver');
      addStoryFlag('foundRecurrenceGraph');
      solvePuzzle('gate_role_resolver');
      solvePuzzle('gate_graph_alignment');
    }
    if (targetStage >= 6) {
      addStoryFlag('foundReturn');
      addStoryFlag('foundRawForecast');
      solvePuzzle('gate_97_2_forecast');
      solvePuzzle('gate_return_memo');
    }
    if (targetStage >= 7) {
      addStoryFlag('visitorExportAnomaly');
      addStoryFlag('foundPreviouslyMatched');
      solvePuzzle('gate_10_previouslymatched');
    }
    if (targetStage >= 8) {
      addStoryFlag('final_sequence_unlocked');
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 'var(--space-4)',
        right: 'var(--space-4)',
        width: '380px',
        maxWidth: '92vw',
        maxHeight: '80vh',
        backgroundColor: '#0f172a',
        color: '#f8fafc',
        border: '1px solid #334155',
        borderRadius: 'var(--radius-lg)',
        boxShadow: 'var(--shadow-xl)',
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        fontFamily: 'var(--font-family-mono)',
        fontSize: '0.8rem',
        overflow: 'hidden',
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: 'var(--space-3)',
          backgroundColor: '#1e293b',
          borderBottom: '1px solid #334155',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
          <Cpu size={16} color="#38bdf8" />
          <span style={{ fontWeight: 700, color: '#38bdf8' }}>ARG DEV CONTROLLER</span>
        </div>
        <button className="btn-ghost" onClick={toggleDebugDrawer} style={{ width: 28, height: 28, padding: 0, color: '#94a3b8' }}>
          <X size={16} />
        </button>
      </div>

      {/* Content Body */}
      <div style={{ flex: 1, overflowY: 'auto', padding: 'var(--space-3)', display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
        {/* Stage Selector */}
        <div>
          <div style={{ color: '#94a3b8', marginBottom: '4px', fontWeight: 600 }}>CURRENT STAGE:</div>
          <select
            value={stage}
            onChange={(e) => handleJumpToStage(Number(e.target.value) as ARGStage)}
            style={{
              width: '100%',
              backgroundColor: '#1e293b',
              color: '#f8fafc',
              border: '1px solid #475569',
              padding: '6px',
              borderRadius: '4px',
              fontFamily: 'inherit',
            }}
          >
            {([0, 1, 2, 3, 4, 5, 6, 7, 8] as ARGStage[]).map((s) => (
              <option key={s} value={s}>
                {stageNames[s]}
              </option>
            ))}
          </select>
        </div>

        {/* Quick Puzzle Solver */}
        <div>
          <div style={{ color: '#94a3b8', marginBottom: '4px', fontWeight: 600 }}>PUZZLE GATES:</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', maxHeight: '140px', overflowY: 'auto' }}>
            {SEEDED_PUZZLES.map((p) => {
              const isSolved = solvedPuzzleIds.includes(p.id);
              return (
                <div
                  key={p.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '4px 6px',
                    backgroundColor: '#1e293b',
                    borderRadius: '4px',
                    fontSize: '0.72rem',
                  }}
                >
                  <span style={{ color: isSolved ? '#4ade80' : '#cbd5e1', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {p.title}
                  </span>
                  <button
                    onClick={() => solvePuzzle(p.id)}
                    disabled={isSolved}
                    style={{
                      padding: '2px 6px',
                      backgroundColor: isSolved ? '#166534' : '#2563eb',
                      color: '#ffffff',
                      borderRadius: '3px',
                      fontSize: '0.68rem',
                    }}
                  >
                    {isSolved ? 'SOLVED' : 'SOLVE'}
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Story Flags */}
        <div>
          <div style={{ color: '#94a3b8', marginBottom: '4px', fontWeight: 600 }}>
            FLAGS ({storyFlags.length}):
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
            {storyFlags.length === 0 ? (
              <span style={{ color: '#64748b' }}>None</span>
            ) : (
              storyFlags.map((f) => (
                <span
                  key={f}
                  style={{
                    backgroundColor: '#334155',
                    color: '#e2e8f0',
                    padding: '2px 5px',
                    borderRadius: '3px',
                    fontSize: '0.68rem',
                  }}
                >
                  {f}
                </span>
              ))
            )}
          </div>
        </div>

        {/* Visit Counts */}
        <div>
          <div style={{ color: '#94a3b8', marginBottom: '4px', fontWeight: 600 }}>PAGE VISITS:</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '4px', fontSize: '0.7rem' }}>
            <div>Home: {visitCounts.home}</div>
            <div>Discover: {visitCounts.discover}</div>
            <div>Archive: {visitCounts.archive}</div>
            <div>Forecast: {visitCounts.forecast}</div>
            <div>Connect: {visitCounts.connections}</div>
            <div>Pulse: {visitCounts.pulse}</div>
          </div>
        </div>

        {/* Action Controls */}
        <div style={{ display: 'flex', gap: 'var(--space-2)', marginTop: 'var(--space-2)' }}>
          <button
            onClick={() => triggerEligibleEvents(99)}
            style={{
              flex: 1,
              padding: '6px',
              backgroundColor: '#0284c7',
              color: '#ffffff',
              borderRadius: '4px',
              fontSize: '0.72rem',
              fontWeight: 600,
            }}
          >
            FIRE LIVE EVENTS
          </button>

          <button
            onClick={handleFullReset}
            style={{
              padding: '6px 12px',
              backgroundColor: '#991b1b',
              color: '#ffffff',
              borderRadius: '4px',
              fontSize: '0.72rem',
              fontWeight: 600,
            }}
          >
            RESET ALL
          </button>
        </div>
      </div>
    </div>
  );
};
