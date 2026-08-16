import React, { useState } from 'react';
import { X, Sparkles, Send } from 'lucide-react';
import { useRelationshipEcosystemStore } from '../../store/relationshipEcosystemStore';
import { RelationshipCheckIn } from '../../types/socialEcosystem';

interface RelationshipCheckInModalProps {
  relationshipId: string;
  onClose: () => void;
}

export const RelationshipCheckInModal: React.FC<RelationshipCheckInModalProps> = ({
  relationshipId,
  onClose,
}) => {
  const { submitCheckIn } = useRelationshipEcosystemStore();
  const [selectedStatus, setSelectedStatus] = useState<RelationshipCheckIn['visitorStatus']>('Growing');
  const [note, setNote] = useState('');

  const statuses: RelationshipCheckIn['visitorStatus'][] = [
    'Curious',
    'Comfortable',
    'Growing',
    'Uncertain',
    'Paused',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitCheckIn(
      relationshipId,
      'How has the pace of our connection felt over the past two weeks?',
      selectedStatus,
      note.trim() || undefined
    );
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="checkin-modal-title"
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
          maxWidth: '480px',
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
            <Sparkles size={18} color="var(--accent-primary)" />
            <h2 id="checkin-modal-title" style={{ fontSize: 'var(--font-size-md)', fontWeight: 700, margin: 0 }}>
              Bi-Weekly Relational Check-In
            </h2>
          </div>
          <button className="btn-ghost" onClick={onClose} aria-label="Close check-in" style={{ padding: '4px' }}>
            <X size={18} />
          </button>
        </div>

        <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.5 }}>
          Check-ins are gentle pulses to ensure both people feel unhurried, comfortable, and heard in their relational pace.
        </p>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
          <div>
            <label style={{ fontSize: 'var(--font-size-xs)', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: 'var(--space-1)' }}>
              How is this connection feeling to you right now?
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(85px, 1fr))', gap: 'var(--space-1)' }}>
              {statuses.map((st) => (
                <button
                  key={st}
                  type="button"
                  onClick={() => setSelectedStatus(st)}
                  className={`btn ${selectedStatus === st ? 'btn-primary' : 'btn-secondary'}`}
                  style={{ fontSize: '11px', padding: 'var(--space-2)' }}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label style={{ fontSize: 'var(--font-size-xs)', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: 'var(--space-1)' }}>
              Optional Note for Match:
            </label>
            <textarea
              className="input"
              rows={3}
              placeholder="e.g. I’ve loved our quiet tea dates; looking forward to next week..."
              value={note}
              onChange={(e) => setNote(e.target.value)}
              style={{ width: '100%', fontSize: 'var(--font-size-xs)' }}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--space-2)' }}>
            <button type="button" className="btn btn-ghost" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Submit Check-In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
