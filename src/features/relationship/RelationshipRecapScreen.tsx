import React from 'react';
import { useParams, NavLink } from 'react-router-dom';
import { ArrowLeft, Calendar, MessageSquare, Heart, Sparkles, Lock } from 'lucide-react';
import { useRelationshipEcosystemStore } from '../../store/relationshipEcosystemStore';
import { useStoryAccessStore } from '../../store/storyAccessStore';

export const RelationshipRecapScreen: React.FC = () => {
  const { relationshipId = 'rel_2347_previouslymatched' } = useParams<{ relationshipId: string }>();
  const { recaps } = useRelationshipEcosystemStore();
  const { unlockAllStoryPages } = useStoryAccessStore();

  const visibleRecaps = recaps.filter((r) => {
    if (r.storyTier > 0 && !unlockAllStoryPages) return false;
    return true;
  });

  return (
    <div className="relationship-recap-screen" style={{ maxWidth: '780px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
      <NavLink to={`/relationship/${relationshipId}/timeline`} className="btn btn-ghost" style={{ alignSelf: 'flex-start', gap: 'var(--space-1)', fontSize: 'var(--font-size-xs)' }}>
        <ArrowLeft size={15} /> Back to Timeline
      </NavLink>

      {/* Header */}
      <div className="card" style={{ borderLeft: '4px solid var(--accent-primary)', backgroundColor: 'var(--bg-surface)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
          <Calendar size={18} color="var(--accent-primary)" />
          <h1 style={{ fontSize: 'var(--font-size-xl)', fontWeight: 800, margin: 0 }}>Monthly Connection Recaps</h1>
        </div>
        <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-secondary)', marginTop: '4px', marginBottom: 0 }}>
          Gentle monthly reflections on conversation volume, planned dates, and shared topics. Non-obsessive metrics.
        </p>
      </div>

      {/* Recaps Stream */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
        {visibleRecaps.map((recap) => (
          <div
            key={recap.id}
            className="card"
            style={{
              backgroundColor: 'var(--bg-surface)',
              border: recap.storyTier > 0 ? '2px solid var(--accent-primary)' : '1px solid var(--border-subtle)',
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--space-3)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span className="badge" style={{ fontSize: '11px', fontWeight: 700 }}>{recap.month}</span>
              <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--accent-primary)' }}>
                Age: {recap.relationshipAgeDisplay}
              </span>
            </div>

            {/* Metrics Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: 'var(--space-2)' }}>
              <div style={{ padding: 'var(--space-2)', backgroundColor: 'var(--bg-surface-subtle)', borderRadius: 'var(--radius-sm)' }}>
                <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Messages Exchanged</div>
                <div style={{ fontSize: 'var(--font-size-sm)', fontWeight: 700 }}>{recap.messagesExchanged}</div>
              </div>
              <div style={{ padding: 'var(--space-2)', backgroundColor: 'var(--bg-surface-subtle)', borderRadius: 'var(--radius-sm)' }}>
                <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Dates Completed</div>
                <div style={{ fontSize: 'var(--font-size-sm)', fontWeight: 700 }}>{recap.datesCompleted}</div>
              </div>
              <div style={{ padding: 'var(--space-2)', backgroundColor: 'var(--bg-surface-subtle)', borderRadius: 'var(--radius-sm)' }}>
                <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Prompts Answered</div>
                <div style={{ fontSize: 'var(--font-size-sm)', fontWeight: 700 }}>{recap.sharedQuestionsAnswered}</div>
              </div>
              <div style={{ padding: 'var(--space-2)', backgroundColor: 'var(--bg-surface-subtle)', borderRadius: 'var(--radius-sm)' }}>
                <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Memories Saved</div>
                <div style={{ fontSize: 'var(--font-size-sm)', fontWeight: 700 }}>{recap.memoriesSaved}</div>
              </div>
            </div>

            <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-secondary)', borderTop: '1px solid var(--border-subtle)', paddingTop: 'var(--space-2)' }}>
              <strong>Top Shared Focus:</strong> {recap.topSharedInterest}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
