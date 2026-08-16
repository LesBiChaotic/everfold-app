import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { MessageSquare, TrendingUp, Users, Calendar, Sparkles, Clock, AlertCircle } from 'lucide-react';
import { useAppStore } from '../../store/appStore';
import { useARGStore } from '../../store/argStore';
import { SEEDED_USERS } from '../../data/users';
import { AvatarRenderer } from '../../components/avatar/AvatarRenderer';
import { Foldmark } from '../../components/brand/Foldmark';
import { soundEngine } from '../../audio/soundEngine';

export const MatchesScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'All' | 'New' | 'Mutual' | 'Talking' | 'Paused' | 'Archived' | 'Prior Connections'>('All');
  const { matches } = useAppStore();
  const { stage, storyFlags } = useARGStore();

  const handleTabChange = (tab: typeof activeTab) => {
    soundEngine.playCue('ui.navigation');
    setActiveTab(tab);
  };

  const tabs: (typeof activeTab)[] = ['All', 'New', 'Mutual', 'Talking', 'Paused', 'Archived'];
  if (stage >= 2 || storyFlags.includes('foundPreviouslyMatched')) {
    tabs.push('Prior Connections');
  }

  const filteredMatches = matches.filter((m) => {
    if (activeTab === 'All') {
      if (m.status === 'Prior Connection' && stage < 2) return false;
      return true;
    }
    if (activeTab === 'Prior Connections') return m.status === 'Prior Connection';
    return m.status === activeTab;
  });

  return (
    <div
      className="matches-screen"
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-5)',
        maxWidth: '1080px',
        margin: '0 auto',
        width: '100%',
      }}
    >
      {/* Header */}
      <div>
        <h1 style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.03em' }}>
          Mutual Connections & Relationship Inbox
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: 'var(--font-size-sm)', margin: '2px 0 0 0' }}>
          Manage your active dialogues, compatibility trajectories, and longitudinal connections.
        </p>
      </div>

      {/* Segmented Filter Bar */}
      <div
        style={{
          display: 'flex',
          gap: 'var(--space-2)',
          borderBottom: '1px solid var(--border-subtle)',
          paddingBottom: 'var(--space-3)',
          overflowX: 'auto',
          whiteSpace: 'nowrap',
        }}
      >
        {tabs.map((tab) => {
          const isActive = activeTab === tab;
          const count = matches.filter((m) =>
            tab === 'All' ? (m.status === 'Prior Connection' && stage < 2 ? false : true) : tab === 'Prior Connections' ? m.status === 'Prior Connection' : m.status === tab
          ).length;

          return (
            <button
              key={tab}
              onClick={() => handleTabChange(tab)}
              className="badge"
              style={{
                backgroundColor: isActive ? 'var(--accent-plum)' : 'var(--bg-surface)',
                color: isActive ? 'var(--text-inverse)' : 'var(--text-secondary)',
                padding: '0.4rem 0.9rem',
                fontSize: 'var(--font-size-xs)',
                fontWeight: isActive ? 700 : 500,
                border: '1px solid',
                borderColor: isActive ? 'var(--accent-plum)' : 'var(--border-subtle)',
                boxShadow: isActive ? '0 1px 3px rgba(107, 40, 72, 0.2)' : 'var(--shadow-sm)',
              }}
            >
              {tab} {count > 0 && <span style={{ opacity: 0.85, marginLeft: '4px' }}>({count})</span>}
            </button>
          );
        })}
      </div>

      {/* Matches Grid */}
      {filteredMatches.length === 0 ? (
        <div className="ef-card" style={{ padding: 'var(--space-10)', textAlign: 'center', color: 'var(--text-muted)' }}>
          <Users size={36} color="var(--text-muted)" style={{ margin: '0 auto var(--space-2)' }} />
          <h3>No connections found in {activeTab}</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: 'var(--font-size-xs)', marginTop: '4px' }}>
            Explore Discover to find new candidates matching your communication rhythm.
          </p>
          <NavLink to="/discover" className="btn btn-secondary btn-sm" style={{ marginTop: 'var(--space-3)' }}>
            Open Discover
          </NavLink>
        </div>
      ) : (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(310px, 1fr))',
            gap: 'var(--space-4)',
          }}
        >
          {filteredMatches.map((match) => {
            const partner = SEEDED_USERS.find((u) => u.id === match.userId);
            const isPrior = match.status === 'Prior Connection';

            return (
              <div
                key={match.id}
                className="ef-card-interactive flex flex-col justify-between"
                style={{
                  padding: 'var(--space-4)',
                  backgroundColor: isPrior ? 'var(--arg-anomaly-surface)' : 'var(--bg-card)',
                  borderColor: isPrior ? 'var(--arg-anomaly-border)' : 'var(--border-subtle)',
                }}
              >
                <div>
                  {/* Card Header: Avatar & Info */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', marginBottom: 'var(--space-3)' }}>
                    {partner ? (
                      <AvatarRenderer config={partner.avatarConfig} size={54} />
                    ) : (
                      <div
                        style={{
                          width: 54,
                          height: 54,
                          borderRadius: 'var(--radius-lg)',
                          backgroundColor: 'var(--bg-surface-subtle)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          border: '1px solid var(--border-subtle)',
                        }}
                      >
                        <Foldmark size={28} color="var(--accent-plum)" />
                      </div>
                    )}

                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <h3 style={{ fontSize: 'var(--font-size-base)', fontWeight: 800, color: 'var(--text-primary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {partner ? partner.displayName : 'Previously Matched'}
                        </h3>
                        <span
                          style={{
                            fontWeight: 800,
                            fontSize: 'var(--font-size-sm)',
                            color: isPrior ? 'var(--accent-plum)' : 'var(--color-success)',
                          }}
                        >
                          {match.compatibilityScore}%
                        </span>
                      </div>
                      <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-muted)' }}>
                        {partner ? `@${partner.handle} • ${partner.city}` : 'Invariant Container'}
                      </div>
                    </div>
                  </div>

                  {/* Why You Matched / Resonance Quote */}
                  <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-secondary)', marginBottom: 'var(--space-3)', lineHeight: 1.45 }}>
                    {match.whyYouMatched}
                  </p>

                  {/* Metrics Bar */}
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(3, 1fr)',
                      gap: 'var(--space-1)',
                      padding: 'var(--space-2)',
                      backgroundColor: 'var(--bg-surface-subtle)',
                      borderRadius: 'var(--radius-md)',
                      textAlign: 'center',
                      fontSize: '0.7rem',
                      marginBottom: 'var(--space-3)',
                    }}
                  >
                    <div>
                      <div style={{ color: 'var(--text-muted)', fontWeight: 600 }}>Mutual Fit</div>
                      <div style={{ fontWeight: 800, color: 'var(--text-primary)' }}>{match.mutualFit}%</div>
                    </div>
                    <div>
                      <div style={{ color: 'var(--text-muted)', fontWeight: 600 }}>Alignment</div>
                      <div style={{ fontWeight: 800, color: 'var(--text-primary)' }}>{match.lifeAlignment}%</div>
                    </div>
                    <div>
                      <div style={{ color: 'var(--text-muted)', fontWeight: 600 }}>Status</div>
                      <div style={{ fontWeight: 800, color: 'var(--accent-plum)' }}>{match.status}</div>
                    </div>
                  </div>

                  {/* Tags */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginBottom: 'var(--space-3)' }}>
                    {match.tags.map((tag) => (
                      <span key={tag} className={`badge ${isPrior ? 'badge-anomaly' : ''}`} style={{ fontSize: '0.66rem' }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div style={{ display: 'flex', gap: 'var(--space-2)', borderTop: '1px solid var(--border-subtle)', paddingTop: 'var(--space-3)' }}>
                  <NavLink
                    to={isPrior ? `/member/${partner?.handle || 'previouslymatched'}` : `/messages/th_${partner?.id?.replace('usr_', '') || '1'}_visitor`}
                    className="btn btn-primary btn-sm flex-1"
                  >
                    <MessageSquare size={14} /> Open Thread
                  </NavLink>

                  <NavLink
                    to={`/forecast/${match.relationshipId}`}
                    className="btn btn-secondary btn-sm"
                    style={{ width: '38px', padding: 0 }}
                    title="View Forecast Trajectory"
                  >
                    <TrendingUp size={15} />
                  </NavLink>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
