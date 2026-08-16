import React from 'react';
import { X, Repeat, CheckCircle, AlertTriangle } from 'lucide-react';
import { useRelationshipEcosystemStore } from '../../store/relationshipEcosystemStore';
import { RelationshipMergeSuggestion } from '../../types/socialEcosystem';

interface RelationshipMergeReviewModalProps {
  suggestion: RelationshipMergeSuggestion;
  onClose: () => void;
}

export const RelationshipMergeReviewModal: React.FC<RelationshipMergeReviewModalProps> = ({
  suggestion,
  onClose,
}) => {
  const { resolveMergeSuggestion } = useRelationshipEcosystemStore();

  const handleMerge = () => {
    resolveMergeSuggestion(suggestion.id, 'merged');
    onClose();
  };

  const handleKeepSeparate = () => {
    resolveMergeSuggestion(suggestion.id, 'kept_separate');
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="merge-modal-title"
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.65)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        padding: 'var(--space-4)',
      }}
    >
      <div
        className="card"
        style={{
          maxWidth: '520px',
          width: '100%',
          backgroundColor: 'var(--bg-surface)',
          borderRadius: 'var(--radius-lg)',
          boxShadow: 'var(--shadow-xl)',
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--space-4)',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
            <Repeat size={18} color="var(--accent-primary)" />
            <h2 id="merge-modal-title" style={{ fontSize: 'var(--font-size-md)', fontWeight: 700, margin: 0 }}>
              Duplicate Record Reconciliation
            </h2>
          </div>
          <button className="btn-ghost" onClick={onClose} aria-label="Close merge review" style={{ padding: '4px' }}>
            <X size={18} />
          </button>
        </div>

        <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.5 }}>
          Our schema reconciliation daemon identified matching relational telemetry between two candidate records:
        </p>

        {/* Comparison Box */}
        <div style={{ padding: 'var(--space-3)', backgroundColor: 'var(--bg-surface-subtle)', borderRadius: 'var(--radius-md)', display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
          <div style={{ fontSize: 'var(--font-size-xs)' }}>
            <strong>Current Container:</strong> {suggestion.relationshipIdA} ({suggestion.participantAName})
          </div>
          <div style={{ fontSize: 'var(--font-size-xs)' }}>
            <strong>Historical Predecessor:</strong> {suggestion.relationshipIdB} ({suggestion.participantBName})
          </div>
          <div style={{ fontSize: '11px', color: 'var(--color-success)', fontWeight: 700 }}>
            Invariant Continuity Confidence: {Math.round(suggestion.confidence * 100)}%
          </div>

          <ul style={{ margin: 'var(--space-1) 0 0', paddingLeft: '20px', fontSize: '11px', color: 'var(--text-muted)' }}>
            {suggestion.reasons.map((r, i) => (
              <li key={i}>{r}</li>
            ))}
          </ul>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--space-2)' }}>
          <button className="btn btn-secondary" onClick={handleKeepSeparate} style={{ fontSize: 'var(--font-size-xs)' }}>
            Keep Separate
          </button>
          <button className="btn btn-primary" onClick={handleMerge} style={{ fontSize: 'var(--font-size-xs)' }}>
            Confirm & Merge Lineage
          </button>
        </div>
      </div>
    </div>
  );
};
