import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { ArrowLeft, HelpCircle, Send, CheckCircle, Clock } from 'lucide-react';
import { useAdviceStore } from '../../store/adviceStore';

export const AskEverfoldScreen: React.FC = () => {
  const { askSubmissions, submitAskEverfold } = useAdviceStore();
  const [selectedCategory, setSelectedCategory] = useState<'Relationship Science' | 'Trust & Safety' | 'Community' | 'Date Planning'>('Relationship Science');
  const [questionText, setQuestionText] = useState('');
  const [privacy, setPrivacy] = useState<'public' | 'anonymous' | 'private'>('public');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!questionText.trim()) return;

    submitAskEverfold(selectedCategory, questionText.trim(), privacy);
    setQuestionText('');
    setSubmitted(true);
  };

  return (
    <div className="ask-everfold-screen" style={{ maxWidth: '680px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
      <NavLink to="/advice" className="btn btn-ghost" style={{ alignSelf: 'flex-start', gap: 'var(--space-1)', fontSize: 'var(--font-size-xs)' }}>
        <ArrowLeft size={15} /> Back to Advice
      </NavLink>

      {/* Header */}
      <div className="card" style={{ borderLeft: '4px solid var(--accent-primary)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
          <HelpCircle size={18} color="var(--accent-primary)" />
          <h1 style={{ fontSize: 'var(--font-size-xl)', fontWeight: 800, margin: 0 }}>Ask Everfold Editorial & Science</h1>
        </div>
        <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-secondary)', marginTop: '4px', marginBottom: 0 }}>
          Submit an unhurried relational question to our behavioral research team, Trust & Safety facilitators, or community council.
        </p>
      </div>

      {/* Submission Form */}
      <form onSubmit={handleSubmit} className="card" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
        <div>
          <label style={{ fontSize: 'var(--font-size-xs)', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: 'var(--space-1)' }}>
            Topic Category:
          </label>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 'var(--space-2)' }}>
            {(['Relationship Science', 'Trust & Safety', 'Community', 'Date Planning'] as const).map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`btn ${selectedCategory === cat ? 'btn-primary' : 'btn-secondary'}`}
                style={{ fontSize: 'var(--font-size-xs)', padding: 'var(--space-2)' }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label style={{ fontSize: 'var(--font-size-xs)', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: 'var(--space-1)' }}>
            Your Question or Scenario:
          </label>
          <textarea
            className="input"
            rows={4}
            placeholder="Describe the situation, communication impasse, or boundary question..."
            value={questionText}
            onChange={(e) => setQuestionText(e.target.value)}
            style={{ width: '100%', fontSize: 'var(--font-size-xs)', lineHeight: 1.5 }}
          />
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 'var(--space-3)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
            <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-muted)' }}>Posting as:</span>
            <select
              className="input"
              value={privacy}
              onChange={(e) => setPrivacy(e.target.value as any)}
              style={{ fontSize: 'var(--font-size-xs)', minHeight: '34px' }}
            >
              <option value="public">Public Q&A</option>
              <option value="anonymous">Anonymous</option>
              <option value="private">Private Staff Inquiry</option>
            </select>
          </div>

          <button type="submit" className="btn btn-primary" style={{ fontSize: 'var(--font-size-xs)', minWidth: '120px' }}>
            <Send size={14} /> Send Question
          </button>
        </div>
      </form>

      {/* Submitted Questions Stream */}
      {askSubmissions.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
          <h2 style={{ fontSize: 'var(--font-size-md)', fontWeight: 700, margin: 0 }}>Recent Inquiries & Guidance</h2>
          {askSubmissions.map((sub) => (
            <div key={sub.id} className="card" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span className="badge badge-subtle" style={{ fontSize: '10px' }}>{sub.category}</span>
                <div style={{ fontSize: '10px', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Clock size={11} /> {new Date(sub.submittedAt).toLocaleDateString()}
                </div>
              </div>

              <p style={{ fontSize: 'var(--font-size-xs)', fontWeight: 600, margin: 0 }}>“{sub.question}”</p>

              {sub.status === 'answered' && sub.scriptedAnswer && (
                <div style={{ padding: 'var(--space-3)', backgroundColor: 'var(--bg-surface-subtle)', borderRadius: 'var(--radius-md)', borderLeft: '3px solid var(--accent-primary)' }}>
                  <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--accent-primary)', marginBottom: '2px' }}>
                    Response from {sub.scriptedAnswer.author} ({sub.scriptedAnswer.role}):
                  </div>
                  <p style={{ fontSize: 'var(--font-size-xs)', lineHeight: 1.5, margin: 0 }}>
                    {sub.scriptedAnswer.body}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
