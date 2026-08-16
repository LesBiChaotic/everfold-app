import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  Shield,
  Lock,
  Unlock,
  AlertTriangle,
  FileText,
  Search,
  CheckCircle,
  Eye,
  Key,
  Bookmark,
  X,
} from 'lucide-react';
import { SEEDED_TRUST_SAFETY_CASES } from '../../data/trustSafety';
import { useARGStore } from '../../store/argStore';
import { Foldmark } from '../../components/brand/Foldmark';
import { soundEngine } from '../../audio/soundEngine';
import { TrustSafetyCase } from '../../types';

export const SafetyScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'public' | 'internal'>('public');
  const [selectedCase, setSelectedCase] = useState<TrustSafetyCase | null>(null);
  const [caseSearchQuery, setCaseSearchQuery] = useState('');
  const [gateCodeInput, setGateCodeInput] = useState('');
  const [gateError, setGateError] = useState('');

  const { stage, solvedPuzzleIds, solvePuzzle, addEvidenceBookmark } = useARGStore();

  const isInternalUnlocked = stage >= 4 || solvedPuzzleIds.includes('gate_4417_meredith');

  const handleUnlockCase = (e: React.FormEvent) => {
    e.preventDefault();
    if (gateCodeInput.trim() === '4417') {
      soundEngine.playCue('ui.success');
      solvePuzzle('gate_4417_meredith');
      setGateError('');
    } else {
      soundEngine.playCue('ui.failure');
      setGateError('Verification Failed: Relational ID invalid. (Hint: 4417)');
    }
  };

  const filteredCases = SEEDED_TRUST_SAFETY_CASES.filter((c) => {
    if (caseSearchQuery.trim()) {
      const q = caseSearchQuery.toLowerCase();
      return (
        c.caseNumber.toLowerCase().includes(q) ||
        c.title.toLowerCase().includes(q) ||
        c.tags.some((t) => t.toLowerCase().includes(q))
      );
    }
    return true;
  });

  const handleBookmarkCase = (c: TrustSafetyCase) => {
    soundEngine.playCue('ui.save');
    addEvidenceBookmark({
      category: 'Safety',
      sourceType: 'TrustCase',
      sourceId: c.id,
      title: `${c.caseNumber}: ${c.title}`,
      summary: c.summary,
      date: c.openedDate,
      linkedIds: c.subjectUserIds,
      confidence: 'Strongly Supported',
      playerNote: `Trust & Safety Case regarding ${c.title}.`
    });
  };

  return (
    <div
      className="safety-screen"
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-5)',
        maxWidth: '1000px',
        margin: '0 auto',
        width: '100%',
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 'var(--space-3)' }}>
        <div>
          <h1 style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.03em' }}>
            Safety, Boundaries & Trust Architecture
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: 'var(--font-size-sm)', margin: '2px 0 0 0' }}>
            Community standards, emotional boundaries, date check-ins, and governance case files.
          </p>
        </div>

        {/* Tab Switcher */}
        <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
          <button
            className={`btn ${activeTab === 'public' ? 'btn-primary' : 'btn-secondary'} btn-sm`}
            onClick={() => setActiveTab('public')}
          >
            Public Principles
          </button>

          <button
            className={`btn ${activeTab === 'internal' ? 'btn-primary' : 'btn-secondary'} btn-sm`}
            onClick={() => setActiveTab('internal')}
          >
            <Key size={14} /> Trust Governance {isInternalUnlocked ? '(Unlocked)' : '(Protected)'}
          </button>
        </div>
      </div>

      {activeTab === 'public' ? (
        /* Public Safety Content */
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
          <div className="ef-card">
            <h2 style={{ fontSize: 'var(--font-size-base)', fontWeight: 800, color: 'var(--text-primary)', marginBottom: 'var(--space-3)' }}>
              Everfold Relational Principles
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'var(--space-3)' }}>
              <div className="ef-card-subtle">
                <h3 style={{ fontSize: 'var(--font-size-sm)', fontWeight: 800, color: 'var(--text-primary)' }}>
                  1. Intentional Pacing & Consent
                </h3>
                <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-secondary)', marginTop: '4px', lineHeight: 1.45 }}>
                  Everfold eliminates infinite swipe fatigue to prioritize thoughtful correspondence, mutual curiosity, and respected emotional boundaries.
                </p>
              </div>

              <div className="ef-card-subtle">
                <h3 style={{ fontSize: 'var(--font-size-sm)', fontWeight: 800, color: 'var(--text-primary)' }}>
                  2. Clear Boundaries
                </h3>
                <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-secondary)', marginTop: '4px', lineHeight: 1.45 }}>
                  All participants publish their pacing and boundaries clearly on their profile, eliminating awkward guesswork before first contact.
                </p>
              </div>

              <div className="ef-card-subtle">
                <h3 style={{ fontSize: 'var(--font-size-sm)', fontWeight: 800, color: 'var(--text-primary)' }}>
                  3. In-Person Safety Ping
                </h3>
                <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-secondary)', marginTop: '4px', lineHeight: 1.45 }}>
                  When meeting in person, our Date Planner offers pre-agreed safety check-ins with low-friction exit protocols.
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Internal Governance Case Portal */
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
          {!isInternalUnlocked ? (
            <div className="ef-card-featured">
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-2)' }}>
                <Lock size={18} color="var(--accent-plum)" />
                <h2 style={{ fontSize: 'var(--font-size-base)', fontWeight: 800, color: 'var(--text-primary)' }}>
                  Restricted Trust & Safety Incident Archive
                </h2>
              </div>
              <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-muted)', marginBottom: 'var(--space-3)' }}>
                Access requires verified incident coordinator authorization code (Meredith Cole Case EF-TS-2218).
              </p>

              <form onSubmit={handleUnlockCase} style={{ display: 'flex', gap: 'var(--space-2)', maxWidth: '380px' }}>
                <input
                  type="text"
                  className="input font-mono"
                  placeholder="e.g. 4417"
                  value={gateCodeInput}
                  onChange={(e) => setGateCodeInput(e.target.value)}
                  style={{ flex: 1, minHeight: '36px', fontSize: 'var(--font-size-xs)' }}
                />
                <button type="submit" className="btn btn-secondary btn-sm">
                  Verify Access
                </button>
              </form>
              {gateError && <div style={{ color: 'var(--color-error)', fontSize: '0.75rem', marginTop: '6px' }}>{gateError}</div>}
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 'var(--space-4)' }}>
              {filteredCases.map((c) => (
                <div
                  key={c.id}
                  className="ef-card-interactive flex flex-col justify-between"
                  style={{
                    padding: 'var(--space-4)',
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-2)' }}>
                      <span className="badge badge-anomaly" style={{ fontSize: '0.65rem' }}>
                        {c.caseNumber} • {c.status}
                      </span>
                      <span className="font-mono" style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>
                        {c.openedDate}
                      </span>
                    </div>

                    <h3 style={{ fontSize: 'var(--font-size-base)', fontWeight: 800, color: 'var(--text-primary)' }}>
                      {c.title}
                    </h3>

                    <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-secondary)', lineHeight: 1.45, marginTop: '4px' }}>
                      {c.summary}
                    </p>
                  </div>

                  <div style={{ display: 'flex', gap: 'var(--space-2)', borderTop: '1px solid var(--border-subtle)', paddingTop: 'var(--space-3)', marginTop: 'var(--space-3)' }}>
                    <button
                      className="btn btn-primary btn-sm flex-1"
                      onClick={() => {
                        soundEngine.playCue('ui.navigation');
                        setSelectedCase(c);
                      }}
                    >
                      <Eye size={14} /> Review Case
                    </button>
                    <button
                      className="btn btn-secondary btn-sm"
                      onClick={() => handleBookmarkCase(c)}
                      title="Bookmark Casebook Evidence"
                      style={{ width: 36, padding: 0 }}
                    >
                      <Bookmark size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Case Review Modal */}
      {selectedCase && (
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
              maxWidth: '680px',
              width: '100%',
              backgroundColor: 'var(--bg-surface)',
              border: '1px solid var(--border-default)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px solid var(--border-subtle)', paddingBottom: 'var(--space-3)' }}>
              <div>
                <span className="badge badge-anomaly" style={{ fontSize: '0.68rem', marginBottom: '4px' }}>
                  {selectedCase.caseNumber} • {selectedCase.severity} Severity
                </span>
                <h2 style={{ fontSize: 'var(--font-size-lg)', fontWeight: 800, color: 'var(--text-primary)' }}>
                  {selectedCase.title}
                </h2>
              </div>
              <button className="btn-ghost" onClick={() => setSelectedCase(null)} style={{ width: 32, height: 32, padding: 0 }}>
                <X size={18} />
              </button>
            </div>

            <div style={{ padding: 'var(--space-4) 0', fontSize: 'var(--font-size-sm)', color: 'var(--text-primary)', lineHeight: 1.6 }}>
              <div className="font-mono" style={{ backgroundColor: 'var(--bg-surface-subtle)', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)', marginBottom: 'var(--space-3)', fontSize: '0.8rem' }}>
                Status: {selectedCase.status} • Assigned: {selectedCase.assignedStaff}
              </div>
              <p>{selectedCase.summary}</p>
              {selectedCase.investigatorNotes && selectedCase.investigatorNotes.length > 0 && (
                <div style={{ marginTop: 'var(--space-3)', display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                  <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Investigator Logs</div>
                  {selectedCase.investigatorNotes.map((n, i) => (
                    <div key={i} style={{ padding: 'var(--space-2) var(--space-3)', backgroundColor: 'var(--bg-surface-subtle)', borderRadius: 'var(--radius-sm)', fontSize: 'var(--font-size-xs)' }}>
                      <strong>{n.author} ({n.date}):</strong> {n.text}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--space-2)', borderTop: '1px solid var(--border-subtle)', paddingTop: 'var(--space-3)' }}>
              <button
                className="btn btn-secondary btn-sm"
                onClick={() => {
                  handleBookmarkCase(selectedCase);
                  setSelectedCase(null);
                }}
              >
                <Bookmark size={14} /> Bookmark as Evidence
              </button>
              <button className="btn btn-primary btn-sm" onClick={() => setSelectedCase(null)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
