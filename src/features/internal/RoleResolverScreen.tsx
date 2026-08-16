import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Cpu, ArrowLeft, RefreshCw, Key, CheckCircle, AlertTriangle } from 'lucide-react';
import { useARGStore } from '../../store/argStore';
import { soundEngine } from '../../audio/soundEngine';

export const RoleResolverScreen: React.FC = () => {
  const [testParticipantName, setTestParticipantName] = useState('Alex Rivers');
  const [resolvedRole, setResolvedRole] = useState<{ slotId: string; roleType: string; continuityScore: number; assignmentConfidence: number } | null>({
    slotId: 'SLOT_01_INVARIANT',
    roleType: 'Alpha Continuum [1999–2026]',
    continuityScore: 99.8,
    assignmentConfidence: 63.0
  });

  const { addEvidenceBookmark, solvedPuzzleIds } = useARGStore();

  const handleSimulateResolve = () => {
    soundEngine.playCue('ui.graphAlign');
    setResolvedRole({
      slotId: 'SLOT_01_INVARIANT',
      roleType: 'Alpha Continuum [1999–2026]',
      continuityScore: 99.8,
      assignmentConfidence: 63.0
    });
  };

  const handleBookmark = () => {
    soundEngine.playCue('ui.save');
    addEvidenceBookmark({
      category: 'Internal',
      sourceType: 'CompanyDoc',
      sourceId: 'doc_role_resolver_spec',
      title: 'ROLE_RESOLVER Service Documentation (2024)',
      summary: 'Backend daemon that instantiates placeholder participant records for unfilled recurrence patterns.',
      date: '2024-05-18',
      linkedIds: ['usr_previouslymatched', 'rel_2347_previouslymatched'],
      confidence: 'Strongly Supported',
      playerNote: 'ROLE_RESOLVER proves Everfold creates placeholders before a real person even joins the site.'
    });
  };

  return (
    <div className="role-resolver-screen" style={{ maxWidth: '900px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <NavLink to="/archive" className="btn btn-ghost" style={{ gap: 'var(--space-2)' }}>
          <ArrowLeft size={16} /> Back to Archive
        </NavLink>
        <button className="btn btn-secondary" onClick={handleBookmark} style={{ fontSize: 'var(--font-size-xs)' }}>
          Bookmark to Case Notes
        </button>
      </div>

      <div className="card" style={{ borderLeft: '4px solid var(--accent-primary)', backgroundColor: 'var(--bg-surface-subtle)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-2)' }}>
          <Cpu size={18} color="var(--accent-primary)" />
          <span style={{ fontSize: 'var(--font-size-xs)', fontWeight: 700, fontFamily: 'var(--font-family-mono)' }}>
            INTERNAL SERVICE SPECIFICATION // ROLE_RESOLVER DAEMON (v3.2)
          </span>
        </div>
        <h1 style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 800 }}>
          ROLE_RESOLVER: Pre-Registration Occupancy & Slot Allocation
        </h1>
        <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-secondary)', marginTop: '4px' }}>
          Author: Janelle Wu (VP Product) & Dee Kapoor (Lead DB Architect). Initial deployment: January 2024.
        </p>
      </div>

      <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
        <h2 style={{ fontSize: 'var(--font-size-md)', fontWeight: 700 }}>Abstract & System Logic</h2>
        <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-primary)', lineHeight: 1.6, margin: 0 }}>
          "When a relationship trajectory demonstrates a Recurrence Index \(R \ge 0.95\), the model does not wait for two registered users to initiate contact. The backend instantiates an immutable relational container (`rel_uuid`) with a placeholder participant. When a candidate user joins whose communicative vectors match the vacant role, the resolver maps the participant ID to the container."
        </p>
        <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>
          "In 2025, three placeholders resolved into newly created accounts. One invariant container (UNRESOLVED-0001 / REL-2347) has remained active across four platform generations without a permanent single-user binding."
        </p>
      </div>

      {/* Interactive Role Resolver Simulator */}
      <div className="card" style={{ border: '2px solid var(--border-subtle)' }}>
        <h3 style={{ fontSize: 'var(--font-size-sm)', fontWeight: 700, marginBottom: 'var(--space-3)' }}>
          Interactive Slot Resolution Simulator
        </h3>

        <div style={{ display: 'flex', gap: 'var(--space-3)', alignItems: 'center', marginBottom: 'var(--space-4)' }}>
          <input
            type="text"
            className="input"
            value={testParticipantName}
            onChange={(e) => setTestParticipantName(e.target.value)}
            placeholder="Participant Name..."
            style={{ maxWidth: '280px' }}
          />
          <button className="btn btn-primary" onClick={handleSimulateResolve}>
            <RefreshCw size={14} /> Run Resolver
          </button>
        </div>

        {resolvedRole && (
          <div style={{ padding: 'var(--space-4)', backgroundColor: 'var(--arg-anomaly-surface)', borderRadius: 'var(--radius-md)', border: '1px solid var(--arg-anomaly-border)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-2)' }}>
              <span style={{ fontWeight: 700, fontSize: 'var(--font-size-sm)' }}>Target Slot: {resolvedRole.slotId}</span>
              <span className="badge badge-anomaly">PRE-ALLOCATED 1999</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-3)', fontSize: 'var(--font-size-xs)' }}>
              <div>
                <span style={{ color: 'var(--text-muted)' }}>Assigned Role:</span>
                <div style={{ fontWeight: 600 }}>{resolvedRole.roleType}</div>
              </div>
              <div>
                <span style={{ color: 'var(--text-muted)' }}>Target Identity:</span>
                <div style={{ fontWeight: 600 }}>{testParticipantName}</div>
              </div>
              <div>
                <span style={{ color: 'var(--text-muted)' }}>Participant Assignment Confidence:</span>
                <div style={{ fontWeight: 700, color: 'var(--color-warning)' }}>{resolvedRole.assignmentConfidence}%</div>
              </div>
              <div>
                <span style={{ color: 'var(--text-muted)' }}>Relationship Continuity Confidence:</span>
                <div style={{ fontWeight: 700, color: 'var(--color-success)' }}>{resolvedRole.continuityScore}%</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
