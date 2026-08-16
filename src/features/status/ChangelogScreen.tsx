import React from 'react';
import { NavLink } from 'react-router-dom';
import { ArrowLeft, Clock, Sparkles, Shield, Archive } from 'lucide-react';
import { useSystemStatusStore } from '../../store/systemStatusStore';
import { useStoryAccessStore } from '../../store/storyAccessStore';

export const ChangelogScreen: React.FC = () => {
  const { changelog } = useSystemStatusStore();
  const { unlockAllStoryPages } = useStoryAccessStore();

  const visibleEntries = changelog.filter((c) => {
    if (c.storyTier > 0 && !unlockAllStoryPages) return false;
    return true;
  });

  return (
    <div className="changelog-screen" style={{ maxWidth: '850px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
      <NavLink to="/status" className="btn btn-ghost" style={{ alignSelf: 'flex-start', gap: 'var(--space-1)', fontSize: 'var(--font-size-xs)' }}>
        <ArrowLeft size={15} /> System Status
      </NavLink>

      {/* Header */}
      <div className="card" style={{ borderLeft: '4px solid var(--accent-primary)', backgroundColor: 'var(--bg-surface)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
          <Clock size={18} color="var(--accent-primary)" />
          <h1 style={{ fontSize: 'var(--font-size-xl)', fontWeight: 800, margin: 0 }}>Public Platform Changelog</h1>
        </div>
        <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-secondary)', marginTop: '4px', marginBottom: 0 }}>
          Detailed release notes, schema migration logs, and accessibility refinements across Everfold builds.
        </p>
      </div>

      {/* Changelog Entries */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
        {visibleEntries.map((entry) => (
          <div key={entry.version} className="card" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', backgroundColor: 'var(--bg-surface)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                <span style={{ fontSize: 'var(--font-size-md)', fontWeight: 800, fontFamily: 'var(--font-family-mono)' }}>
                  {entry.version}
                </span>
                <span className="badge badge-subtle" style={{ fontSize: '10px' }}>{entry.category}</span>
              </div>
              <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{entry.releaseDate}</span>
            </div>

            <h2 style={{ fontSize: 'var(--font-size-sm)', fontWeight: 700, margin: 0 }}>{entry.title}</h2>

            <ul style={{ margin: 0, paddingLeft: '20px', fontSize: 'var(--font-size-xs)', lineHeight: 1.6, color: 'var(--text-secondary)' }}>
              {entry.highlights.map((h, i) => (
                <li key={i}>{h}</li>
              ))}
            </ul>

            {entry.storyTier > 0 && (
              <div className="badge badge-anomaly" style={{ alignSelf: 'flex-start', fontSize: '10px', marginTop: 'var(--space-1)' }}>
                Archived Lineage Amendment
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
