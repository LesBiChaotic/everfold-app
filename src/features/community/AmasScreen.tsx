import React from 'react';
import { NavLink } from 'react-router-dom';
import { ArrowLeft, Radio, MessageSquare, CheckCircle } from 'lucide-react';
import { useCommunityStore } from '../../store/communityStore';

export const AmasScreen: React.FC = () => {
  const { amas } = useCommunityStore();

  return (
    <div className="amas-screen" style={{ maxWidth: '850px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
      <NavLink to="/community" className="btn btn-ghost" style={{ alignSelf: 'flex-start', gap: 'var(--space-1)', fontSize: 'var(--font-size-xs)' }}>
        <ArrowLeft size={15} /> Community Hub
      </NavLink>

      {/* Header */}
      <div className="card" style={{ borderLeft: '4px solid var(--accent-primary)', backgroundColor: 'var(--bg-surface)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
          <Radio size={18} color="var(--accent-primary)" />
          <h1 style={{ fontSize: 'var(--font-size-xl)', fontWeight: 800, margin: 0 }}>Community & Staff AMAs</h1>
        </div>
        <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-secondary)', marginTop: '4px', marginBottom: 0 }}>
          Open question-and-answer archives with Relationship Science researchers, Trust & Safety leads, and longtime members.
        </p>
      </div>

      {/* AMAs Stream */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
        {amas.map((ama) => (
          <div key={ama.id} className="card" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', backgroundColor: 'var(--bg-surface)' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-1)' }}>
                <span className="badge badge-subtle" style={{ fontSize: '10px' }}>ARCHIVED SESSION</span>
                <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>
                  {new Date(ama.scheduledTime).toLocaleDateString()}
                </div>
              </div>
              <h2 style={{ fontSize: 'var(--font-size-md)', fontWeight: 700, margin: '2px 0 4px' }}>{ama.title}</h2>
              <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-muted)' }}>
                Hosted by <strong>{ama.hostName}</strong> ({ama.hostRole})
              </div>
            </div>

            {/* Q&A Pairs */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
              {ama.qaPairs.map((qa) => (
                <div key={qa.id} style={{ padding: 'var(--space-3)', backgroundColor: 'var(--bg-surface-subtle)', borderRadius: 'var(--radius-md)', display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                  <div style={{ fontSize: 'var(--font-size-xs)', fontWeight: 700 }}>
                    Q: “{qa.question}”
                  </div>
                  <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-secondary)', lineHeight: 1.6, borderLeft: '2px solid var(--accent-primary)', paddingLeft: 'var(--space-2)' }}>
                    <strong>{qa.answeredBy}</strong>: {qa.answer}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
