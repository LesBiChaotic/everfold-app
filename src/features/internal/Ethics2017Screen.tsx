import React from 'react';
import { NavLink } from 'react-router-dom';
import { Scale, ArrowLeft, Bookmark, AlertCircle } from 'lucide-react';
import { useARGStore } from '../../store/argStore';
import { soundEngine } from '../../audio/soundEngine';

export const Ethics2017Screen: React.FC = () => {
  const { addEvidenceBookmark } = useARGStore();

  const handleBookmark = () => {
    soundEngine.playCue('ui.save');
    addEvidenceBookmark({
      category: 'Internal',
      sourceType: 'CompanyDoc',
      sourceId: 'doc_ethics_board_2017',
      title: 'Ethics Advisory Board Meeting Minutes (Nov 2017)',
      summary: 'Dissenting memorandum by Dr. Nia Banerjee regarding platform-induced recurrence and lack of user informed consent.',
      date: '2017-11-04',
      linkedIds: ['usr_dr_nia_banerjee', 'usr_celia_moreno', 'case_ef_ts_1919'],
      confidence: 'Strongly Supported',
      playerNote: 'Dr. Banerjee resigned after discovering Everfold was nudging participants to complete pre-existing relational arcs.'
    });
  };

  return (
    <div className="ethics-2017-screen" style={{ maxWidth: '900px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <NavLink to="/archive" className="btn btn-ghost" style={{ gap: 'var(--space-2)' }}>
          <ArrowLeft size={16} /> Back to Archive
        </NavLink>
        <button className="btn btn-secondary" onClick={handleBookmark} style={{ fontSize: 'var(--font-size-xs)' }}>
          Bookmark to Case Notes
        </button>
      </div>

      <div className="card" style={{ borderLeft: '4px solid var(--accent-secondary)', backgroundColor: 'var(--bg-surface-subtle)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-2)' }}>
          <Scale size={18} color="var(--accent-secondary)" />
          <span style={{ fontSize: 'var(--font-size-xs)', fontWeight: 700, fontFamily: 'var(--font-family-mono)' }}>
            CONFIDENTIAL ARCHIVE // ETHICS ADVISORY BOARD PROCEEDINGS
          </span>
        </div>
        <h1 style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 800 }}>
          Session 19: The Determinism & Informed Consent Controversy (Nov 4, 2017)
        </h1>
        <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-secondary)', marginTop: '4px' }}>
          Participants: Dr. Celia Moreno, Dr. Nia Banerjee (Chair), Jonah Feld, Janelle Wu.
        </p>
      </div>

      <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
        <div style={{ borderBottom: '1px solid var(--border-subtle)', paddingBottom: 'var(--space-3)' }}>
          <div style={{ fontWeight: 700, fontSize: 'var(--font-size-sm)', color: 'var(--text-primary)' }}>
            Excerpt from Dr. Nia Banerjee's Opening Dissent:
          </div>
          <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-secondary)', lineHeight: 1.6, marginTop: '4px', fontStyle: 'italic' }}>
            "We tell the public that our algorithms simply observe human chemistry. But when an algorithm calculates a 99.8% recurrence probability, and the interface selectively suppresses competing matches until the user accepts the designated partner, we are no longer observing love. We are executing an orchestration."
          </p>
        </div>

        <div style={{ borderBottom: '1px solid var(--border-subtle)', paddingBottom: 'var(--space-3)' }}>
          <div style={{ fontWeight: 700, fontSize: 'var(--font-size-sm)', color: 'var(--text-primary)' }}>
            Response from Dr. Celia Moreno:
          </div>
          <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-secondary)', lineHeight: 1.6, marginTop: '4px' }}>
            "Nia, the platform did not create these relationships. These relational geometries existed across decades on Pairwise and Affinity Room before Everfold wrote a single line of code. We do not trap people in roles; we give resilient human unions a stable place to land."
          </p>
        </div>

        <div>
          <div style={{ fontWeight: 700, fontSize: 'var(--font-size-sm)', color: 'var(--text-primary)' }}>
            Outcome:
          </div>
          <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-secondary)', lineHeight: 1.6, marginTop: '4px' }}>
            Motion to publicly disclose Recurrence Index scores failed (3–1). Dr. Banerjee tendered her resignation effective December 15, 2017. Her employee credentials (`nbanerjee`) were placed in restricted read-only status.
          </p>
        </div>
      </div>
    </div>
  );
};
