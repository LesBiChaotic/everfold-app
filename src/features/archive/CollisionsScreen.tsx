import React from 'react';
import { NavLink } from 'react-router-dom';
import { GitMerge, ArrowLeft, Bookmark } from 'lucide-react';
import { useARGStore } from '../../store/argStore';
import { soundEngine } from '../../audio/soundEngine';

export const CollisionsScreen: React.FC = () => {
  const { addEvidenceBookmark } = useARGStore();

  const handleBookmark = () => {
    soundEngine.playCue('ui.save');
    addEvidenceBookmark({
      category: 'Archive',
      sourceType: 'CompanyDoc',
      sourceId: 'doc_cross_platform_collisions',
      title: 'Historical Migration & Collision Logs (1999–2026)',
      summary: 'Data migration audits showing how relationship records were preserved across four database overhauls.',
      date: '2026-01-15',
      linkedIds: ['rel_0814_pairwise', 'rel_0712_affinity', 'rel_1102_correspond', 'rel_4417_meredith', 'rel_2347_previouslymatched'],
      confidence: 'Strongly Supported',
      playerNote: 'Even when account handles were lost or collisions occurred, the relationship container IDs remained unbroken.'
    });
  };

  const platforms = [
    { year: '1999–2002', name: 'Pairwise (Flat File)', records: '14,200 questionnaires', collisions: 'Tape degradation re-indexed under 0814' },
    { year: '2003–2007', name: 'Affinity Room (MySQL 3.23)', records: '88,000 threads', collisions: 'Room session keys converted to rel_ UUIDs' },
    { year: '2008–2014', name: 'Correspond (PostgreSQL 8.4)', records: '240,000 letter pairs', collisions: 'Posthumous member accounts merged into persistent slots' },
    { year: '2015–2022', name: 'Fold (Neo4j Graph DB)', records: '1,200,000 nodes', collisions: 'Decoupled relationship containers established as first-class entities' },
    { year: '2023–2026', name: 'Everfold (Distributed Graph)', records: '3,800,000 active nodes', collisions: 'ROLE_RESOLVER active; 99.8% recurrence preservation' }
  ];

  return (
    <div className="collisions-screen" style={{ maxWidth: '900px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
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
          <GitMerge size={18} color="var(--accent-primary)" />
          <span style={{ fontSize: 'var(--font-size-xs)', fontWeight: 700, fontFamily: 'var(--font-family-mono)' }}>
            DATABASE MIGRATION HISTORY // COLLISION & LINEAGE AUDIT
          </span>
        </div>
        <h1 style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 800 }}>
          Four Generations of Relational Preservation
        </h1>
        <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-secondary)', marginTop: '4px' }}>
          Prepared by Callum Price (Legacy Systems Archivist) & Janelle Wu (VP Product).
        </p>
      </div>

      <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
        <h2 style={{ fontSize: 'var(--font-size-md)', fontWeight: 700 }}>Migration Timeline & Schema Evolution</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
          {platforms.map((p, idx) => (
            <div key={idx} style={{ padding: 'var(--space-3)', backgroundColor: 'var(--bg-surface-subtle)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-1)' }}>
                <span style={{ fontWeight: 700, fontSize: 'var(--font-size-sm)' }}>{p.name}</span>
                <span className="badge badge-subtle">{p.year}</span>
              </div>
              <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-secondary)' }}>
                <strong>Scale:</strong> {p.records} &bull; <strong>Collision Resolution:</strong> {p.collisions}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
