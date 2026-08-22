import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Clock, ArrowLeft, Filter, Bookmark, ShieldAlert, CheckCircle } from 'lucide-react';
import { useARGStore } from '../../store/argStore';
import { soundEngine } from '../../audio/soundEngine';

interface TimelineEvent {
  year: number;
  date: string;
  category: 'Platform' | 'Story' | 'Ethics' | 'Technical';
  title: string;
  description: string;
  sourceDoc?: string;
  isAnomaly?: boolean;
}

export const TimelineScreen: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const { stage, addEvidenceBookmark } = useARGStore();

  const events: TimelineEvent[] = [
    {
      year: 1999,
      date: 'August 14, 1999',
      category: 'Platform',
      title: 'Pairwise Founded in Boston',
      description: 'First web-based psychological questionnaire platform deployed. Relationship container rel_0814_pairwise established.',
      sourceDoc: 'PW-99-INIT'
    },
    {
      year: 2001,
      date: 'March 22, 2001',
      category: 'Technical',
      title: 'First Documented Graph Discrepancy',
      description: 'Two users severed their connection, yet database integrity audits reported continuous active message entropy between their coordinates.',
      isAnomaly: true
    },
    {
      year: 2003,
      date: 'July 12, 2003',
      category: 'Platform',
      title: 'Affinity Room 2003 Launches',
      description: 'Transition from mail questionnaires to real-time chatrooms. Private session keys mapped directly to persistent relationship IDs.',
      sourceDoc: 'AR-03-LAUNCH'
    },
    {
      year: 2006,
      date: 'November 2, 2006',
      category: 'Story',
      title: 'Meredith Cole Bereavement Event (Case EF-TS-2218)',
      description: 'Meredith Cole passed away. Despite death certificate upload, system predicted a 5-year anniversary milestone on schedule.',
      isAnomaly: true,
      sourceDoc: 'CASE-EF-TS-2218'
    },
    {
      year: 2008,
      date: 'October 10, 2008',
      category: 'Platform',
      title: 'Correspond Bulletin Platform Launches',
      description: 'Long-form letter exchange format introduced. Pattern Integrity Group quietly established inside the research department.',
      sourceDoc: 'COR-08-CHARTER'
    },
    {
      year: 2012,
      date: 'May 14, 2012',
      category: 'Story',
      title: 'First Verified Participant Role Replacement',
      description: 'Samuel Reed registered on Correspond and adopted the exact conversational cadences of a severed 2004 Affinity Room pair within 14 days.',
      isAnomaly: true
    },
    {
      year: 2015,
      date: 'September 1, 2015',
      category: 'Technical',
      title: 'Fold Graph Architecture Migration',
      description: 'Decoupled relational schema deployed. Relationship containers (rel_uuid) became primary independent database entities.',
      sourceDoc: 'FOLD-15-SCHEMA'
    },
    {
      year: 2017,
      date: 'November 4, 2017',
      category: 'Ethics',
      title: 'Dr. Nia Banerjee Ethics Board Dissent',
      description: 'Dr. Banerjee challenged algorithmic nudging and deterministic relationship enforcement before resigning from the company.',
      isAnomaly: true,
      sourceDoc: 'ETH-17-SESSION19'
    },
    {
      year: 2024,
      date: 'January 10, 2024',
      category: 'Technical',
      title: 'ROLE_RESOLVER Daemon Deployed',
      description: 'Backend automated pre-registration slot allocation. Container UNRESOLVED-0001 instantiated for pending visitor convergence.',
      sourceDoc: 'SYS-24-RESOLVER'
    },
    {
      year: 2026,
      date: 'August 16, 2026',
      category: 'Platform',
      title: 'Everfold Modern Experience Live',
      description: 'Everfold operating across 30 cities worldwide. @previouslymatched maintains 99.8% continuity confidence.',
      isAnomaly: true
    }
  ];

  const filteredEvents = selectedCategory === 'all'
    ? events
    : events.filter(e => e.category === selectedCategory);

  const handleBookmark = (e: TimelineEvent) => {
    soundEngine.playCue('ui.save');
    addEvidenceBookmark({
      category: 'Archive',
      sourceType: 'CompanyDoc',
      sourceId: `timeline_${e.year}`,
      title: `${e.year}: ${e.title}`,
      summary: e.description,
      date: e.date,
      linkedIds: e.sourceDoc ? [e.sourceDoc] : [],
      confidence: 'Strongly Supported',
      playerNote: `Timeline event from ${e.year}`
    });
  };

  return (
    <div className="timeline-screen" style={{ maxWidth: '900px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <NavLink to="/archive" className="btn btn-ghost" style={{ gap: 'var(--space-2)' }}>
          <ArrowLeft size={16} /> Back to Archive
        </NavLink>
        <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
          {['all', 'Platform', 'Story', 'Ethics', 'Technical'].map(cat => (
            <button
              key={cat}
              className={`btn btn-xs ${selectedCategory === cat ? 'btn-primary' : 'btn-subtle'}`}
              onClick={() => {
                soundEngine.playCue('ui.tab');
                setSelectedCategory(cat);
              }}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="card" style={{ borderLeft: '4px solid var(--accent-primary)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-2)' }}>
          <Clock size={18} color="var(--accent-primary)" />
          <span style={{ fontSize: 'var(--font-size-xs)', fontWeight: 700, fontFamily: 'var(--font-family-mono)' }}>
            HISTORICAL CHRONOLOGY // 1999–2026
          </span>
        </div>
        <h1 style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 800 }}>
          Twenty-Seven Years of Relational Continuity
        </h1>
        <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-secondary)', marginTop: '4px' }}>
          From Pairwise web questionnaires to Everfold graph topologies: the evolution of persistent human connection.
        </p>
      </div>

      <div className="timeline-cosmetic-track" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', position: 'relative', paddingLeft: 'var(--space-4)' }}>
        <div className="timeline-cosmetic-line" style={{ position: 'absolute', top: 0, bottom: 0, left: '19px', width: '2px', backgroundColor: 'var(--border-subtle)', zIndex: 0 }} />

        {filteredEvents.map((evt, idx) => (
          <div key={idx} className="card timeline-cosmetic-event" style={{ position: 'relative', zIndex: 1, marginLeft: 'var(--space-4)', borderLeft: evt.isAnomaly ? '3px solid var(--arg-anomaly-tag)' : '1px solid var(--border-subtle)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'var(--space-1)' }}>
              <div>
                <span className={`badge ${evt.isAnomaly ? 'badge-anomaly' : 'badge-subtle'}`} style={{ marginRight: 'var(--space-2)' }}>
                  {evt.year}
                </span>
                <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-muted)' }}>{evt.date}</span>
              </div>
              <button
                className="btn btn-ghost btn-xs"
                onClick={() => handleBookmark(evt)}
                title="Bookmark event"
              >
                <Bookmark size={12} />
              </button>
            </div>

            <h3 style={{ fontSize: 'var(--font-size-sm)', fontWeight: 700, margin: 'var(--space-1) 0' }}>
              {evt.title}
            </h3>
            <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>
              {evt.description}
            </p>

            {evt.sourceDoc && (
              <div style={{ marginTop: 'var(--space-2)', fontSize: '11px', fontFamily: 'var(--font-family-mono)', color: 'var(--text-muted)' }}>
                Doc Ref: {evt.sourceDoc}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
