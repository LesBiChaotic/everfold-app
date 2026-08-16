import React, { useState } from 'react';
import { HelpCircle, Send, CheckCircle, Globe, Lock, Heart } from 'lucide-react';
import { useQuizStore } from '../../store/quizStore';

export const DailyQuestionWidget: React.FC = () => {
  const { dailyQuestions, userDailyAnswers, answerDailyQuestion } = useQuizStore();
  const currentQ = dailyQuestions[0]; // Seeded rotating daily prompt
  const existingAnswer = userDailyAnswers[currentQ?.id || ''];

  const [inputText, setInputText] = useState('');
  const [privacy, setPrivacy] = useState<'public' | 'matches' | 'private'>('public');

  if (!currentQ) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    answerDailyQuestion(currentQ.id, inputText.trim(), privacy);
    setInputText('');
  };

  return (
    <div className="card" style={{ backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
          <span className="badge badge-subtle" style={{ fontSize: '10px', textTransform: 'uppercase' }}>Daily Prompt</span>
          <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Rotates Every 24h</span>
        </div>
        {existingAnswer && (
          <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-success)', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <CheckCircle size={13} /> Answered
          </span>
        )}
      </div>

      <h2 style={{ fontSize: 'var(--font-size-md)', fontWeight: 700, margin: 0 }}>{currentQ.prompt}</h2>

      {existingAnswer ? (
        <div style={{ padding: 'var(--space-3)', backgroundColor: 'var(--bg-surface-subtle)', borderRadius: 'var(--radius-md)', display: 'flex', flexDirection: 'column', gap: 'var(--space-1)' }}>
          <div style={{ fontSize: '11px', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
            {existingAnswer.privacy === 'public' ? <Globe size={12} /> : existingAnswer.privacy === 'matches' ? <Heart size={12} /> : <Lock size={12} />}
            {existingAnswer.privacy.toUpperCase()}
          </div>
          <p style={{ fontSize: 'var(--font-size-sm)', fontStyle: 'italic', margin: 0 }}>“{existingAnswer.answerText}”</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
          {currentQ.suggestedAnswers && currentQ.suggestedAnswers.length > 0 && (
            <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap' }}>
              {currentQ.suggestedAnswers.map((sug) => (
                <button
                  key={sug}
                  type="button"
                  onClick={() => setInputText(sug)}
                  className="btn btn-ghost btn-xs"
                  style={{ fontSize: '11px', backgroundColor: 'var(--bg-surface-subtle)', borderRadius: 'var(--radius-sm)' }}
                >
                  {sug}
                </button>
              ))}
            </div>
          )}

          <div style={{ display: 'flex', gap: 'var(--space-2)', alignItems: 'center' }}>
            <input
              type="text"
              className="input"
              placeholder="Your answer..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              style={{ flex: 1, minHeight: '38px', fontSize: 'var(--font-size-xs)' }}
            />

            <select
              className="input"
              value={privacy}
              onChange={(e) => setPrivacy(e.target.value as any)}
              style={{ width: '110px', minHeight: '38px', fontSize: 'var(--font-size-xs)' }}
              aria-label="Daily Question Privacy"
            >
              <option value="public">Public</option>
              <option value="matches">Matches</option>
              <option value="private">Private</option>
            </select>

            <button type="submit" className="btn btn-primary" style={{ minHeight: '38px', fontSize: 'var(--font-size-xs)' }}>
              <Send size={14} /> Submit
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
