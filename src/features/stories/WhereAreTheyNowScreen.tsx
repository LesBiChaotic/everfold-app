import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { ArrowLeft, Repeat, Calendar, ArrowRight } from 'lucide-react';
import { useStoriesStore } from '../../store/storiesStore';

export const WhereAreTheyNowScreen: React.FC = () => {
  const { stories } = useStoriesStore();
  const [selectedYear, setSelectedYear] = useState<number | 'all'>('all');

  const storiesWithUpdates = stories.filter((s) => s.updates && s.updates.length > 0);

  return (
    <div className="where-are-they-now-screen" style={{ maxWidth: '850px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
      <NavLink to="/stories" className="btn btn-ghost" style={{ alignSelf: 'flex-start', gap: 'var(--space-1)', fontSize: 'var(--font-size-xs)' }}>
        <ArrowLeft size={15} /> All Shared Stories
      </NavLink>

      {/* Header */}
      <div className="card" style={{ borderLeft: '4px solid var(--accent-primary)', backgroundColor: 'var(--bg-surface)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
          <Repeat size={18} color="var(--accent-primary)" />
          <h1 style={{ fontSize: 'var(--font-size-xl)', fontWeight: 800, margin: 0 }}>Where Are They Now?</h1>
        </div>
        <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-secondary)', marginTop: '4px', marginBottom: 0 }}>
          Tracking member pairs across multi-year milestones (2017–2026)—from shared workshops to long-distance reunions.
        </p>
      </div>

      {/* Year Filter Chips */}
      <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
        {['all', 2017, 2019, 2022, 2024, 2026].map((yr) => (
          <button
            key={String(yr)}
            onClick={() => setSelectedYear(yr as any)}
            className={`btn ${selectedYear === yr ? 'btn-primary' : 'btn-secondary'}`}
            style={{ fontSize: 'var(--font-size-xs)', flex: 1 }}
          >
            {yr === 'all' ? 'All Years' : yr}
          </button>
        ))}
      </div>

      {/* Updates Stream */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
        {storiesWithUpdates.map((story) => (
          <div key={story.id} className="card" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h2 style={{ fontSize: 'var(--font-size-md)', fontWeight: 700, margin: 0 }}>{story.title}</h2>
                <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--accent-primary)', fontWeight: 600 }}>
                  {story.participantNames.join(' & ')}
                </div>
              </div>
              <NavLink to={`/stories/${story.id}`} className="btn btn-secondary" style={{ fontSize: 'var(--font-size-xs)' }}>
                View Story <ArrowRight size={13} />
              </NavLink>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
              {story.updates
                ?.filter((upd) => (selectedYear === 'all' ? true : upd.year === selectedYear))
                .map((upd) => (
                  <div
                    key={upd.id}
                    style={{
                      padding: 'var(--space-3)',
                      backgroundColor: 'var(--bg-surface-subtle)',
                      borderRadius: 'var(--radius-md)',
                      borderLeft: '3px solid var(--accent-primary)',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                      <span className="badge" style={{ fontSize: '10px' }}>{upd.year}</span>
                      <span style={{ fontSize: 'var(--font-size-xs)', fontWeight: 700 }}>{upd.status}</span>
                      {upd.participantBChanged && (
                        <span className="badge badge-anomaly" style={{ fontSize: '9px' }}>
                          Participant Re-allocated
                        </span>
                      )}
                    </div>
                    <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-secondary)', margin: '4px 0 0', lineHeight: 1.5 }}>
                      {upd.body}
                    </p>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
