import React, { useState } from 'react';
import { useParams, NavLink, useNavigate } from 'react-router-dom';
import { Users, ArrowLeft, ArrowRight, CheckCircle, Clock, Sparkles } from 'lucide-react';
import { useQuizStore } from '../../store/quizStore';
import { soundEngine } from '../../audio/soundEngine';

export const TogetherQuizScreen: React.FC = () => {
  const { quizId } = useParams<{ quizId: string }>();
  const navigate = useNavigate();
  const { togetherQuizzes, sharedSessions, initiateTogetherQuiz } = useQuizStore();

  const quiz = togetherQuizzes.find((q) => q.id === quizId) || togetherQuizzes[0];
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [activeSessionId, setActiveSessionId] = useState<string | null>(null);

  const activeSession = activeSessionId ? sharedSessions[activeSessionId] : null;

  const handleSelectOption = (qId: string, optId: string) => {
    soundEngine.playCue('ui.navigation');
    setSelectedAnswers((prev) => ({
      ...prev,
      [qId]: optId,
    }));
  };

  const handleFinishVisitor = () => {
    // Initiate shared quiz session with active match (e.g. Rafael Alvarez)
    const session = initiateTogetherQuiz(quiz.id, 'rel_2347_previouslymatched', 'usr_rafael', selectedAnswers);
    setActiveSessionId(session.sessionId);
  };

  return (
    <div className="together-quiz-screen" style={{ maxWidth: '720px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
      <NavLink to="/quizzes" className="btn btn-ghost" style={{ alignSelf: 'flex-start', gap: 'var(--space-1)', fontSize: 'var(--font-size-xs)' }}>
        <ArrowLeft size={15} /> All Quizzes
      </NavLink>

      {/* Header */}
      <div className="card" style={{ borderLeft: '4px solid var(--accent-primary)', backgroundColor: 'var(--bg-surface)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-1)' }}>
          <Users size={18} color="var(--accent-primary)" />
          <span className="badge badge-subtle" style={{ fontSize: '10px' }}>Two-Person Alignment</span>
        </div>
        <h1 style={{ fontSize: 'var(--font-size-xl)', fontWeight: 800, margin: '4px 0' }}>{quiz.title}</h1>
        <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-secondary)', margin: 0 }}>
          {quiz.description}
        </p>
      </div>

      {/* If waiting for partner or ready to reveal */}
      {activeSession ? (
        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', textAlign: 'center', padding: 'var(--space-6)' }}>
          {activeSession.completionState === 'waiting_partner' ? (
            <div>
              <div style={{ width: 44, height: 44, borderRadius: '50%', backgroundColor: 'var(--bg-surface-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto var(--space-3)' }}>
                <Clock size={20} color="var(--accent-primary)" />
              </div>
              <h2 style={{ fontSize: 'var(--font-size-md)', fontWeight: 700 }}>Your Answers Are Sealed</h2>
              <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-secondary)', margin: '4px 0 0' }}>
                Waiting for your match (@rafa_books) to answer independently. Both responses will unlock simultaneously.
              </p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', textAlign: 'left' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                <Sparkles size={20} color="var(--color-success)" />
                <h2 style={{ fontSize: 'var(--font-size-lg)', fontWeight: 800, margin: 0, color: 'var(--color-success)' }}>
                  Shared Alignment: {activeSession.sharedResult?.overlapPercentage}%
                </h2>
              </div>

              {/* Shared Agreements */}
              <div className="card" style={{ backgroundColor: 'var(--bg-surface-subtle)' }}>
                <h3 style={{ fontSize: 'var(--font-size-xs)', fontWeight: 700, textTransform: 'uppercase', color: 'var(--accent-primary)', marginBottom: 'var(--space-2)' }}>
                  Where You Agree:
                </h3>
                <ul style={{ margin: 0, paddingLeft: '20px', fontSize: 'var(--font-size-xs)' }}>
                  {activeSession.sharedResult?.agreements.map((agr, i) => (
                    <li key={i} style={{ marginBottom: '4px' }}>{agr}</li>
                  ))}
                </ul>
              </div>

              {/* Shared Differences */}
              <div className="card" style={{ backgroundColor: 'var(--bg-surface-subtle)' }}>
                <h3 style={{ fontSize: 'var(--font-size-xs)', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 'var(--space-2)' }}>
                  Nuanced Differences:
                </h3>
                <ul style={{ margin: 0, paddingLeft: '20px', fontSize: 'var(--font-size-xs)' }}>
                  {activeSession.sharedResult?.differences.map((diff, i) => (
                    <li key={i} style={{ marginBottom: '4px' }}>{diff}</li>
                  ))}
                </ul>
              </div>

              {/* Suggested Conversation Starter */}
              <div style={{ padding: 'var(--space-3)', backgroundColor: 'var(--accent-primary)', color: 'var(--text-inverse)', borderRadius: 'var(--radius-md)' }}>
                <div style={{ fontSize: '10px', textTransform: 'uppercase', fontWeight: 700, opacity: 0.9 }}>Suggested Next Chat Topic</div>
                <div style={{ fontSize: 'var(--font-size-xs)', fontWeight: 600, marginTop: '2px' }}>
                  “{activeSession.sharedResult?.conversationStarter}”
                </div>
              </div>

              <NavLink to="/messages" className="btn btn-primary" style={{ alignSelf: 'flex-start', fontSize: 'var(--font-size-xs)' }}>
                Discuss in Chat
              </NavLink>
            </div>
          )}
        </div>
      ) : (
        /* Questions list */
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
          {quiz.questions.map((q, idx) => (
            <div key={q.id} className="card" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
              <div style={{ fontSize: 'var(--font-size-xs)', fontWeight: 700, color: 'var(--text-muted)' }}>
                Question {idx + 1} of {quiz.questions.length}
              </div>
              <h3 style={{ fontSize: 'var(--font-size-md)', fontWeight: 700, margin: 0 }}>{q.prompt}</h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                {q.options.map((opt) => {
                  const isSelected = selectedAnswers[q.id] === opt.id;

                  return (
                    <div
                      key={opt.id}
                      onClick={() => handleSelectOption(q.id, opt.id)}
                      className="card"
                      style={{
                        cursor: 'pointer',
                        padding: 'var(--space-2) var(--space-3)',
                        border: isSelected ? '2px solid var(--accent-primary)' : '1px solid var(--border-subtle)',
                        backgroundColor: isSelected ? 'var(--bg-surface-subtle)' : 'var(--bg-surface)',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        fontSize: 'var(--font-size-xs)',
                      }}
                    >
                      <span>{opt.label}</span>
                      {isSelected && <CheckCircle size={15} color="var(--accent-primary)" />}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}

          <button
            className="btn btn-primary"
            onClick={handleFinishVisitor}
            disabled={Object.keys(selectedAnswers).length < quiz.questions.length}
            style={{ fontSize: 'var(--font-size-xs)', alignSelf: 'flex-end', minWidth: '140px' }}
          >
            Submit & Invite Match <ArrowRight size={14} />
          </button>
        </div>
      )}
    </div>
  );
};
