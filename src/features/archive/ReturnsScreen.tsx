import React from 'react';
import { NavLink } from 'react-router-dom';
import { RefreshCw, ArrowLeft, Bookmark, FileText } from 'lucide-react';
import { useARGStore } from '../../store/argStore';
import { soundEngine } from '../../audio/soundEngine';

export const ReturnsScreen: React.FC = () => {
  const { addEvidenceBookmark } = useARGStore();

  const handleBookmark = () => {
    soundEngine.playCue('ui.save');
    addEvidenceBookmark({
      category: 'Archive',
      sourceType: 'CompanyDoc',
      sourceId: 'doc_return_invariant_memo',
      title: 'Persistent Event Invariant: The RETURN Protocol',
      summary: 'Confidential memorandum documenting why the RETURN milestone cannot be perturbed by external life stressors.',
      date: '2022-09-14',
      linkedIds: ['fc_9918_naomi', 'fc_2347_final_raw'],
      confidence: 'Strongly Supported',
      playerNote: 'Across every single scenario stress test (relocation, job loss, distance), RETURN remains at 99.8% probability.'
    });
  };

  return (
    <div className="returns-screen" style={{ maxWidth: '900px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <NavLink to="/archive" className="btn btn-ghost" style={{ gap: 'var(--space-2)' }}>
          <ArrowLeft size={16} /> Back to Archive
        </NavLink>
        <button className="btn btn-secondary" onClick={handleBookmark} style={{ fontSize: 'var(--font-size-xs)' }}>
          Bookmark to Case Notes
        </button>
      </div>

      <div className="card" style={{ borderLeft: '4px solid var(--color-warning)', backgroundColor: 'var(--arg-anomaly-surface)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-2)' }}>
          <RefreshCw size={18} color="var(--color-warning)" />
          <span style={{ fontSize: 'var(--font-size-xs)', fontWeight: 700, fontFamily: 'var(--font-family-mono)', color: 'var(--color-warning)' }}>
            RESEARCH MEMORANDUM // PERSISTENT EVENT TAXONOMY
          </span>
        </div>
        <h1 style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 800 }}>
          The Invariant Milestone: Definition & Analysis of "RETURN"
        </h1>
        <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-secondary)', marginTop: '4px' }}>
          Document Reference: MEMO-2022-RETURN // Classification: Restricted Internal.
        </p>
      </div>

      <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
        <div>
          <h3 style={{ fontSize: 'var(--font-size-sm)', fontWeight: 700 }}>1. Mathematical Invariance</h3>
          <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-primary)', lineHeight: 1.6, marginTop: '4px' }}>
            In standard Forecast modeling, life stressors (such as international relocation, career disruption, or social tension) attenuate trajectory continuity by 18% to 42%. However, in a subset of 0.4% of all relationships across the company's 27-year history, a terminal event labeled <strong>RETURN</strong> exhibits zero variance.
          </p>
        </div>

        <div>
          <h3 style={{ fontSize: 'var(--font-size-sm)', fontWeight: 700 }}>2. Behavioral Manifestation</h3>
          <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-primary)', lineHeight: 1.6, marginTop: '4px' }}>
            Regardless of whether participants sever contact, change cities, marry third parties, or delete their accounts, the relational graph re-converges at a specific topological milestone. When one participant is absent, a substituted individual occupying the identical psychological coordinates will fulfill the re-convergence event.
          </p>
        </div>

        <div>
          <h3 style={{ fontSize: 'var(--font-size-sm)', fontWeight: 700 }}>3. Acrostic Prompt Generation</h3>
          <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-primary)', lineHeight: 1.6, marginTop: '4px' }}>
            The reflective journaling system's prompt engine automatically synthesizes reflection questions beginning with the letters <strong>R - E - T - U - R - N</strong> when a visitor profile enters proximity with an invariant container.
          </p>
        </div>
      </div>
    </div>
  );
};
