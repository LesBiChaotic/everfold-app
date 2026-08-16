import React from 'react';
import { NavLink } from 'react-router-dom';
import { ShieldAlert, ArrowLeft, Database, Key, CheckCircle, Clock } from 'lucide-react';
import { useARGStore } from '../../store/argStore';
import { soundEngine } from '../../audio/soundEngine';

export const PatternIntegrityScreen: React.FC = () => {
  const { stage, solvedPuzzleIds, addEvidenceBookmark } = useARGStore();

  const handleBookmark = () => {
    soundEngine.playCue('ui.save');
    addEvidenceBookmark({
      category: 'Internal',
      sourceType: 'CompanyDoc',
      sourceId: 'doc_pattern_integrity_founding',
      title: 'Pattern Integrity Charter (2008)',
      summary: 'Confidential research group founded to investigate why relationship structures persist across platform migrations.',
      date: '2008-11-12',
      linkedIds: ['usr_meredith_cole', 'rel_4417_meredith'],
      confidence: 'Strongly Supported',
      playerNote: 'Pattern Integrity is not a data cleanup team; it was formed to document recurring relationships.'
    });
  };

  return (
    <div className="pattern-integrity-screen" style={{ maxWidth: '900px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <NavLink to="/archive" className="btn btn-ghost" style={{ gap: 'var(--space-2)' }}>
          <ArrowLeft size={16} /> Back to Archive
        </NavLink>
        <button className="btn btn-secondary" onClick={handleBookmark} style={{ fontSize: 'var(--font-size-xs)' }}>
          Bookmark to Case Notes
        </button>
      </div>

      <div className="card" style={{ borderLeft: '4px solid var(--arg-anomaly-tag)', backgroundColor: 'var(--arg-anomaly-surface)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-2)' }}>
          <ShieldAlert size={18} color="var(--arg-anomaly-tag)" />
          <span style={{ fontSize: 'var(--font-size-xs)', fontWeight: 700, fontFamily: 'var(--font-family-mono)', color: 'var(--arg-anomaly-tag)' }}>
            CONFIDENTIAL // PATTERN INTEGRITY RESEARCH DIVISION
          </span>
        </div>
        <h1 style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 800 }}>
          Pattern Integrity Group Charter & Case Repository (2008–2026)
        </h1>
        <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-secondary)', marginTop: '4px' }}>
          Publicly described as "data quality assurance and longitudinal telemetry." Privately tasked with cataloguing structural recurrence and participant role replacement.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'var(--space-4)' }}>
        <div className="card">
          <h3 style={{ fontSize: 'var(--font-size-sm)', fontWeight: 700, marginBottom: 'var(--space-2)' }}>
            Core Directives
          </h3>
          <ul style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-secondary)', lineHeight: 1.6, paddingLeft: '18px', margin: 0 }}>
            <li>Isolate and track relationship UUIDs that survive member account deletion.</li>
            <li>Monitor replacement participants when an invariant relational slot is re-occupied.</li>
            <li>Maintain posthumous continuity records without public notification.</li>
            <li>Evaluate whether Forecast algorithms measure or induce relational recurrence.</li>
          </ul>
        </div>

        <div className="card">
          <h3 style={{ fontSize: 'var(--font-size-sm)', fontWeight: 700, marginBottom: 'var(--space-2)' }}>
            Historical Inception Case: AR-03-117
          </h3>
          <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>
            First documented instance where an Affinity Room trajectory model predicted a 3-year relationship milestone before the partner registered on the platform. The slot was pre-allocated 8 months prior to user creation.
          </p>
        </div>
      </div>

      <div className="card">
        <h2 style={{ fontSize: 'var(--font-size-md)', fontWeight: 700, marginBottom: 'var(--space-3)' }}>
          Active Recurrence Classification Codes
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 'var(--space-3)' }}>
          <div style={{ padding: 'var(--space-3)', backgroundColor: 'var(--bg-surface-subtle)', borderRadius: 'var(--radius-md)' }}>
            <div style={{ fontWeight: 700, fontSize: 'var(--font-size-xs)', fontFamily: 'var(--font-family-mono)' }}>PERSISTENT_PAIR</div>
            <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-secondary)', marginTop: '2px' }}>Two participants whose relational edge re-forms across platforms regardless of account termination.</div>
          </div>
          <div style={{ padding: 'var(--space-3)', backgroundColor: 'var(--bg-surface-subtle)', borderRadius: 'var(--radius-md)' }}>
            <div style={{ fontWeight: 700, fontSize: 'var(--font-size-xs)', fontFamily: 'var(--font-family-mono)' }}>ROLE_REPLACEMENT</div>
            <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-secondary)', marginTop: '2px' }}>A new participant slots into an empty relational coordinate, adopting private phrases and behavioral cadences.</div>
          </div>
          <div style={{ padding: 'var(--space-3)', backgroundColor: 'var(--bg-surface-subtle)', borderRadius: 'var(--radius-md)' }}>
            <div style={{ fontWeight: 700, fontSize: 'var(--font-size-xs)', fontFamily: 'var(--font-family-mono)' }}>INTERRUPTED_UNION</div>
            <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-secondary)', marginTop: '2px' }}>A union severed by external factors (bereavement, relocation) that re-initiates under substituted identities.</div>
          </div>
          <div style={{ padding: 'var(--space-3)', backgroundColor: 'var(--bg-surface-subtle)', borderRadius: 'var(--radius-md)' }}>
            <div style={{ fontWeight: 700, fontSize: 'var(--font-size-xs)', fontFamily: 'var(--font-family-mono)' }}>POSTHUMOUS_RECURRENCE</div>
            <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-secondary)', marginTop: '2px' }}>Relational milestones continue firing after verified participant death (e.g. Case EF-TS-2218).</div>
          </div>
        </div>
      </div>
    </div>
  );
};
