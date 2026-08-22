import React from 'react';
import { useParams, NavLink } from 'react-router-dom';
import { CheckCircle, ArrowLeft, Compass, Sparkles, RotateCcw, Lock } from 'lucide-react';
import { useQuizStore } from '../../store/quizStore';

export const QuizResultScreen: React.FC = () => {
  const { resultId } = useParams<{ resultId: string }>();
  const { completedResults, resultHistory, soloQuizzes, setResultPreferences } = useQuizStore();

  const result = [...Object.values(completedResults), ...Object.values(resultHistory).flat()].find((r) => r.id === resultId);
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
              Badge available: <em>“{result.appliedEffects[0].badgeLabel}”</em> · Private until you change visibility
            </span>
          </div>
        )}
      </div>

      {/* Scored dimensions */}
      {result.dimensionPercentages && Object.keys(result.dimensionPercentages).length > 0 && (
        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
          <h2 style={{ fontSize: 'var(--font-size-md)', fontWeight: 700, margin: 0 }}>Your Pattern Dimensions</h2>
          {Object.entries(result.dimensionPercentages)
            .sort(([, a], [, b]) => b - a)
            .slice(0, 6)
            .map(([dimension, percentage]) => (
              <div key={dimension}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'var(--font-size-xs)', marginBottom: '4px' }}>
                  <span style={{ fontWeight: 600 }}>{dimension.replace(/_/g, ' ').replace(/\b\w/g, (letter) => letter.toUpperCase())}</span>
                  <span style={{ color: 'var(--text-muted)' }}>{percentage}%</span>
                </div>
                <div style={{ height: 7, borderRadius: 8, background: 'var(--bg-surface-subtle)', overflow: 'hidden' }}>
                  <div style={{ width: `${percentage}%`, height: '100%', borderRadius: 8, background: 'var(--accent-primary)' }} />
                </div>
              </div>
            ))}
          {result.secondaryResults && result.secondaryResults.length > 0 && (
            <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-muted)', margin: 0 }}>
              Secondary patterns: {result.secondaryResults.join(' · ')}
            </p>
          )}
        </div>
      )}

      {/* Privacy and recommendation controls */}
      <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
          <Lock size={16} color="var(--accent-primary)" />
          <h2 style={{ fontSize: 'var(--font-size-md)', fontWeight: 700, margin: 0 }}>Result Privacy & Use</h2>
        </div>
        <label style={{ display: 'flex', flexDirection: 'column', gap: '5px', fontSize: 'var(--font-size-xs)' }}>
          Who may see this result?
          <select
            className="select"
            value={result.profileVisibility || 'private'}
            onChange={(event) => setResultPreferences(quiz.id, result.id, { profileVisibility: event.target.value as 'private' | 'matches' | 'public' })}
          >
            <option value="private">Only me (default)</option>
            <option value="matches">My matches</option>
            <option value="public">Visible on profile</option>
          </select>
        </label>
        <label style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-2)', fontSize: 'var(--font-size-xs)', cursor: 'pointer' }}>
          <input
            type="checkbox"
            checked={result.useForRecommendations ?? true}
            onChange={(event) => setResultPreferences(quiz.id, result.id, { useForRecommendations: event.target.checked })}
          />
          <span><strong>Use for recommendations</strong><br /><span style={{ color: 'var(--text-muted)' }}>Allow Discover, date ideas and advice suggestions to use this result.</span></span>
        </label>
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
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)', justifyContent: 'space-between' }}>
        <NavLink to="/discover" className="btn btn-secondary" style={{ fontSize: 'var(--font-size-xs)' }}>
          <Compass size={14} /> Apply to Discover Matches
        </NavLink>
        <NavLink to="/quizzes" className="btn btn-primary" style={{ fontSize: 'var(--font-size-xs)' }}>
          Explore More Quizzes
        </NavLink>
        {quiz.isRepeatable !== false && (
          <NavLink to={`/quizzes/${quiz.id}`} className="btn btn-secondary" style={{ fontSize: 'var(--font-size-xs)' }}>
            <RotateCcw size={14} /> Retake
          </NavLink>
        )}
      </div>
    </div>
  );
};
