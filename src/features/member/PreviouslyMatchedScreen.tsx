import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Sparkles, Clock, Layers, MessageSquare, TrendingUp, AlertTriangle } from 'lucide-react';
import { SEEDED_USERS } from '../../data/users';
import { AvatarRenderer } from '../../components/avatar/AvatarRenderer';
import { useProfileStore } from '../../store/profileStore';
import { useARGStore } from '../../store/argStore';
import { soundEngine } from '../../audio/soundEngine';

export const PreviouslyMatchedScreen: React.FC = () => {
  const { visitorProfile } = useProfileStore();
  const { stage, addStoryFlag } = useARGStore();
  const previouslyMatchedUser = SEEDED_USERS.find((u) => u.id === 'usr_previouslymatched')!;

  const [visitCount, setVisitCount] = useState(1);

  useEffect(() => {
    soundEngine.playCue('arg.previouslyMatched');
    addStoryFlag('foundPreviouslyMatched');
  }, [addStoryFlag]);

  return (
    <div className="previously-matched-screen" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)', maxWidth: '820px', margin: '0 auto' }}>
      {/* Header Banner */}
      <div
        className="card"
        style={{
          borderLeft: '4px solid var(--arg-anomaly-tag)',
          backgroundColor: 'var(--arg-anomaly-surface)',
          padding: 'var(--space-6)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-2)' }}>
          <Clock size={18} color="var(--arg-anomaly-tag)" />
          <span style={{ fontSize: 'var(--font-size-xs)', fontWeight: 700, fontFamily: 'var(--font-family-mono)', color: 'var(--arg-anomaly-tag)' }}>
            RECONCILED RELATIONAL ROLE // SLOT 01
          </span>
        </div>
        <h1 style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 800 }}>
          @previouslymatched
        </h1>
        <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-secondary)', marginTop: '4px', maxWidth: '640px' }}>
          This connection slot was instantiated on August 14, 1999 during Pairwise inception. It has persisted across four platform migrations.
        </p>
      </div>

      {/* Profile & Confidence Metrics */}
      <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-6)', flexWrap: 'wrap' }}>
          <AvatarRenderer config={previouslyMatchedUser.avatarConfig} size={130} renderMode="normal" />

          <div style={{ flex: 1, minWidth: '240px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2 style={{ fontSize: 'var(--font-size-lg)', fontWeight: 700 }}>Unresolved Participant Slot</h2>
              <span className="badge badge-anomaly">Status: Ongoing</span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-3)', marginTop: 'var(--space-3)' }}>
              <div style={{ padding: 'var(--space-2) var(--space-3)', backgroundColor: 'var(--bg-surface-subtle)', borderRadius: 'var(--radius-sm)' }}>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Participant Assignment Confidence</div>
                <div style={{ fontSize: 'var(--font-size-md)', fontWeight: 700, color: 'var(--color-warning)' }}>63.0%</div>
              </div>
              <div style={{ padding: 'var(--space-2) var(--space-3)', backgroundColor: 'var(--bg-surface-subtle)', borderRadius: 'var(--radius-sm)' }}>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Relationship Continuity Confidence</div>
                <div style={{ fontSize: 'var(--font-size-md)', fontWeight: 700, color: 'var(--color-success)' }}>99.8%</div>
              </div>
            </div>
          </div>
        </div>

        {/* Prompt Answers */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
          {previouslyMatchedUser.profilePromptAnswers.map((p) => (
            <div key={p.id} style={{ padding: 'var(--space-3) var(--space-4)', backgroundColor: 'var(--bg-surface-subtle)', borderRadius: 'var(--radius-md)', borderLeft: '3px solid var(--arg-anomaly-border)' }}>
              <div style={{ fontSize: 'var(--font-size-xs)', fontWeight: 600, color: 'var(--text-muted)' }}>{p.question}</div>
              <div style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-primary)', marginTop: '4px' }}>{p.answer}</div>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', gap: 'var(--space-3)', paddingTop: 'var(--space-4)', borderTop: '1px solid var(--border-subtle)' }}>
          <NavLink to="/messages/th_previouslymatched_active" className="btn btn-primary" style={{ flex: 1 }}>
            <MessageSquare size={16} /> Open Reconciled Conversation
          </NavLink>

          <NavLink to="/forecast/raw/rel_2347_previouslymatched" className="btn btn-secondary" style={{ flex: 1 }}>
            <TrendingUp size={16} /> View Raw Trajectory
          </NavLink>
        </div>
      </div>
    </div>
  );
};
