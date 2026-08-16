import React from 'react';
import { useParams, NavLink, useNavigate } from 'react-router-dom';
import { CheckCircle, ArrowLeft, Share2, Compass, Heart, Sparkles } from 'lucide-react';
import { useQuizStore } from '../../store/quizStore';

export const QuizResultScreen: React.FC = () => {
  const { resultId } = useParams<{ resultId: string }>();
  const navigate = useNavigate();
  const { completedResults, soloQuizzes } = useQuizStore();

  const result = Object.values(completedResults).find((r) => r.id === resultId);
  const quiz = soloQuizzes.find((q) => q.id === result?.quizId);

  if (!result || !quiz) {
    return (
      <div className="card" style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
        <h2>Quiz Result Not Found</h2>
        <NavLink to="/quizzes" className="btn btn-primary" style={{ marginTop: 'var(--space-3)' }}>
          Return to Quizzes
        </NavLink>
      </div>
    );
  }

  return (
    <div className="quiz-result-screen" style={{ maxWidth: '680px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
      <NavLink to="/quizzes" className="btn btn-ghost" style={{ alignSelf: 'flex-start', gap: 'var(--space-1)', fontSize: 'var(--font-size-xs)' }}>
        <ArrowLeft size={15} /> All Quizzes
      </NavLink>

      {/* Main Result Card */}
      <div className="card" style={{ textAlign: 'center', padding: 'var(--space-6)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--space-3)', borderTop: '4px solid var(--accent-primary)' }}>
        <div style={{ width: 48, height: 48, borderRadius: 'var(--radius-full)', backgroundColor: 'var(--bg-surface-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Sparkles size={24} color="var(--accent-primary)" />
        </div>

        <div>
          <span className="badge badge-subtle" style={{ fontSize: '11px', textTransform: 'uppercase' }}>{quiz.title}</span>
          <h1 style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 800, margin: '8px 0 4px', color: 'var(--accent-primary)' }}>
            {result.primaryResult}
          </h1>
          <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-secondary)', maxWidth: '520px', margin: '0 auto', lineHeight: 1.6 }}>
            {result.summary}
          </p>
        </div>

        {/* Applied Profile Badge Effects */}
        {result.appliedEffects && result.appliedEffects.length > 0 && (
          <div style={{ marginTop: 'var(--space-2)', padding: 'var(--space-2) var(--space-4)', backgroundColor: 'var(--bg-surface-subtle)', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
            <CheckCircle size={15} color="var(--color-success)" />
            <span style={{ fontSize: 'var(--font-size-xs)', fontWeight: 600 }}>
              Profile Badge Added: <em>“{result.appliedEffects[0].badgeLabel}”</em>
            </span>
          </div>
        )}
      </div>

      {/* Recommendations Card */}
      <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
        <h2 style={{ fontSize: 'var(--font-size-md)', fontWeight: 700, margin: 0 }}>Recommended Relational Blueprints</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
          {result.recommendations.map((rec, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', padding: 'var(--space-2) 0', fontSize: 'var(--font-size-xs)', borderBottom: '1px solid var(--border-subtle)' }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: 'var(--accent-primary)' }} />
              <span>{rec}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Next Actions */}
      <div style={{ display: 'flex', gap: 'var(--space-2)', justifyContent: 'space-between' }}>
        <NavLink to="/discover" className="btn btn-secondary" style={{ fontSize: 'var(--font-size-xs)' }}>
          <Compass size={14} /> Apply to Discover Matches
        </NavLink>
        <NavLink to="/quizzes" className="btn btn-primary" style={{ fontSize: 'var(--font-size-xs)' }}>
          Explore More Quizzes
        </NavLink>
      </div>
    </div>
  );
};
