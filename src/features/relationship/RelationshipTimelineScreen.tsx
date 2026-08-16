import React, { useState } from 'react';
import { useParams, NavLink } from 'react-router-dom';
import {
  ArrowLeft,
  Calendar,
  Heart,
  MessageSquare,
  Lock,
  Repeat,
  Sparkles,
  PlusCircle,
  Clock,
} from 'lucide-react';
import { useRelationshipEcosystemStore } from '../../store/relationshipEcosystemStore';
import { useStoryAccessStore } from '../../store/storyAccessStore';
import { RelationshipCheckInModal } from '../../components/relationship/RelationshipCheckInModal';
import { RelationshipMergeReviewModal } from '../../components/relationship/RelationshipMergeReviewModal';

export const RelationshipTimelineScreen: React.FC = () => {
  const { relationshipId = 'rel_2347_previouslymatched' } = useParams<{ relationshipId: string }>();
  const { milestones, checkIns, memories, recaps, mergeSuggestions } = useRelationshipEcosystemStore();
  const { unlockAllStoryPages } = useStoryAccessStore();

  const [checkInModalOpen, setCheckInModalOpen] = useState(false);
  const [mergeModalOpen, setMergeModalOpen] = useState(false);

  const relMilestones = milestones.filter((m) => {
    if (m.storyTier > 0 && !unlockAllStoryPages) return false;
    return true;
  });

  const pendingMerge = mergeSuggestions.find((s) => s.status === 'pending');

  return (
    <div className="relationship-timeline-screen" style={{ maxWidth: '850px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
        <NavLink to="/connections" className="btn btn-ghost" style={{ gap: 'var(--space-1)', fontSize: 'var(--font-size-xs)' }}>
          <ArrowLeft size={15} /> Connections Topology
        </NavLink>

        <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
          <NavLink to={`/relationship/${relationshipId}/recaps`} className="btn btn-secondary" style={{ fontSize: 'var(--font-size-xs)' }}>
            <Calendar size={14} /> Monthly Recaps
          </NavLink>
          <NavLink to={`/relationship/${relationshipId}/memories`} className="btn btn-secondary" style={{ fontSize: 'var(--font-size-xs)' }}>
            <Lock size={14} /> Memory Capsules ({memories.length})
          </NavLink>
          <button className="btn btn-primary" onClick={() => setCheckInModalOpen(true)} style={{ fontSize: 'var(--font-size-xs)' }}>
            <Sparkles size={14} /> Bi-Weekly Check-In
          </button>
        </div>
      </div>

      {/* Header */}
      <div className="card" style={{ borderLeft: '4px solid var(--accent-primary)', backgroundColor: 'var(--bg-surface)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
          <Heart size={18} color="var(--accent-primary)" />
          <h1 style={{ fontSize: 'var(--font-size-xl)', fontWeight: 800, margin: 0 }}>Shared Connection Timeline</h1>
        </div>
        <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-secondary)', marginTop: '4px', marginBottom: 0 }}>
          Chronological journal of milestones, shared memories, check-ins, and verified encounters for container {relationshipId}.
        </p>
      </div>

      {/* Duplicate Record Merge Banner if pending */}
      {pendingMerge && (
        <div
          className="card"
          style={{
            border: '2px dashed var(--accent-primary)',
            backgroundColor: 'var(--bg-surface-subtle)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 'var(--space-3)',
          }}
        >
          <div>
            <div style={{ fontSize: 'var(--font-size-xs)', fontWeight: 700, color: 'var(--accent-primary)' }}>
              RELATIONSHIP DATA RECONCILIATION AVAILABLE
            </div>
            <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-secondary)', margin: '2px 0 0' }}>
              Everfold detected a potential duplicate historical record matching this connection ({Math.round(pendingMerge.confidence * 100)}% continuity match).
            </p>
          </div>
          <button className="btn btn-primary btn-xs" onClick={() => setMergeModalOpen(true)} style={{ fontSize: '11px' }}>
            Review Merge Suggestion
          </button>
        </div>
      )}

      {/* Vertical Timeline */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', position: 'relative', paddingLeft: 'var(--space-4)', borderLeft: '2px solid var(--border-subtle)' }}>
        {relMilestones.map((ms) => (
          <div key={ms.id} style={{ display: 'flex', flexDirection: 'column', gap: '4px', position: 'relative' }}>
            {/* Timeline Dot */}
            <div
              style={{
                position: 'absolute',
                left: 'calc(-1 * var(--space-4) - 7px)',
                top: '4px',
                width: 12,
                height: 12,
                borderRadius: '50%',
                backgroundColor: 'var(--accent-primary)',
                border: '2px solid var(--bg-app)',
              }}
            />

            <div className="card" style={{ padding: 'var(--space-3)', backgroundColor: 'var(--bg-surface)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span className="badge badge-subtle" style={{ fontSize: '10px' }}>{ms.category}</span>
                <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>{ms.date}</span>
              </div>

              <h2 style={{ fontSize: 'var(--font-size-sm)', fontWeight: 700, margin: '4px 0 0' }}>{ms.title}</h2>

              {ms.storyTier > 0 && (
                <div className="badge badge-anomaly" style={{ alignSelf: 'flex-start', fontSize: '9px', marginTop: 'var(--space-1)' }}>
                  Invariant Recurrence Point
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Check In Modal */}
      {checkInModalOpen && (
        <RelationshipCheckInModal
          relationshipId={relationshipId}
          onClose={() => setCheckInModalOpen(false)}
        />
      )}

      {/* Merge Modal */}
      {mergeModalOpen && pendingMerge && (
        <RelationshipMergeReviewModal
          suggestion={pendingMerge}
          onClose={() => setMergeModalOpen(false)}
        />
      )}
    </div>
  );
};
