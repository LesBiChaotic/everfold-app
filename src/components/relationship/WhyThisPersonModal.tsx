import React, { useState } from 'react';
import { X, HelpCircle, CheckCircle } from 'lucide-react';
import { useRelationshipEcosystemStore } from '../../store/relationshipEcosystemStore';

interface WhyThisPersonModalProps {
  userId: string;
  userName: string;
  onClose: () => void;
}

export const WhyThisPersonModal: React.FC<WhyThisPersonModalProps> = ({
  userId,
  userName,
  onClose,
}) => {
  const { recordWhyThisPersonFeedback, whyThisPersonFeedback } = useRelationshipEcosystemStore();
  const [feedbackRecorded, setFeedbackRecorded] = useState(!!whyThisPersonFeedback[userId]);

  const reasons = [
    'Shared quiet schedule (Weekends & Late Evenings)',
    'High sensory compatibility (Low-stimulation dates)',
    'Complementary texting cadences (Asynchronous letter writing)',
    'Strong mutual interest in print culture & book arts',
  ];

  const feedbackOptions = [
    'Too far geographically',
    'Different relationship goals',
    'Not my type',
    'Too similar',
    'Already know them in real life',
  ];

  const handleSelectFeedback = (fb: string) => {
    recordWhyThisPersonFeedback(userId, fb);
    setFeedbackRecorded(true);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="why-person-modal-title"
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
            <HelpCircle size={18} color="var(--accent-primary)" />
            <h2 id="why-person-modal-title" style={{ fontSize: 'var(--font-size-md)', fontWeight: 700, margin: 0 }}>
              Why was {userName} recommended?
            </h2>
          </div>
          <button className="btn-ghost" onClick={onClose} aria-label="Close why this person" style={{ padding: '4px' }}>
            <X size={18} />
          </button>
        </div>

        {/* Reasons Breakdown */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
          {reasons.map((r, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', fontSize: 'var(--font-size-xs)' }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: 'var(--accent-primary)' }} />
              <span>{r}</span>
            </div>
          ))}
        </div>

        {/* Feedback Section */}
        <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: 'var(--space-3)' }}>
          <div style={{ fontSize: 'var(--font-size-xs)', fontWeight: 700, marginBottom: 'var(--space-2)' }}>
            Help tune your future recommendations:
          </div>

          {feedbackRecorded ? (
            <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-success)', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <CheckCircle size={14} /> Feedback recorded. Thank you for helping refine our model.
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-1)' }}>
              {feedbackOptions.map((fb) => (
                <button
                  key={fb}
                  onClick={() => handleSelectFeedback(fb)}
                  className="btn btn-secondary btn-xs"
                  style={{ textAlign: 'left', fontSize: '11px' }}
                >
                  {fb}
                </button>
              ))}
            </div>
          )}
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <button className="btn btn-primary" onClick={onClose} style={{ fontSize: 'var(--font-size-xs)' }}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
