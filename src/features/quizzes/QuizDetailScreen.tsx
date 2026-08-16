import React, { useState } from 'react';
import { useParams, useNavigate, NavLink } from 'react-router-dom';
import { ArrowLeft, ArrowRight, CheckCircle, HelpCircle } from 'lucide-react';
import { useQuizStore } from '../../store/quizStore';
import { useProfileStore } from '../../store/profileStore';
import { soundEngine } from '../../audio/soundEngine';

export const QuizDetailScreen: React.FC = () => {
  const { quizId } = useParams<{ quizId: string }>();
  const navigate = useNavigate();
  const { soloQuizzes, submitSoloQuiz } = useQuizStore();
  const { visitorProfile } = useProfileStore();

  const quiz = soloQuizzes.find((q) => q.id === quizId);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});

  if (!quiz) {
    return (
      <div className="card" style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
        <h2>Quiz Not Found</h2>
        <NavLink to="/quizzes" className="btn btn-primary" style={{ marginTop: 'var(--space-3)' }}>
          Return to Quizzes
        </NavLink>
      </div>
    );
  }

  const currentQuestion = quiz.questions[currentStepIndex];
  const progressPercent = Math.round(((currentStepIndex + 1) / quiz.questions.length) * 100);

  const handleSelectOption = (optId: string) => {
    soundEngine.playCue('ui.navigation');
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: optId,
    }));
  };

  const handleNext = () => {
    if (currentStepIndex < quiz.questions.length - 1) {
      setCurrentStepIndex((prev) => prev + 1);
    } else {
      // Complete quiz
      const result = submitSoloQuiz(quiz.id, visitorProfile.id, selectedAnswers);
      navigate(`/quizzes/results/${result.id}`);
    }
  };

  const handleBack = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex((prev) => prev - 1);
    } else {
      navigate('/quizzes');
    }
  };

  const isCurrentAnswered = !!selectedAnswers[currentQuestion.id];

  return (
    <div className="quiz-detail-screen" style={{ maxWidth: '680px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
      {/* Top Header & Progress */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <button className="btn btn-ghost" onClick={handleBack} style={{ gap: 'var(--space-1)', fontSize: 'var(--font-size-xs)' }}>
          <ArrowLeft size={15} /> Back
        </button>
        <span style={{ fontSize: 'var(--font-size-xs)', fontWeight: 600, color: 'var(--text-muted)' }}>
          Question {currentStepIndex + 1} of {quiz.questions.length}
        </span>
      </div>

      {/* Progress Bar */}
      <div style={{ width: '100%', height: '6px', backgroundColor: 'var(--bg-surface-subtle)', borderRadius: '3px', overflow: 'hidden' }}>
        <div
          style={{
            width: `${progressPercent}%`,
            height: '100%',
            backgroundColor: 'var(--accent-primary)',
            transition: 'width var(--transition-normal)',
          }}
        />
      </div>

      {/* Question Card */}
      <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', backgroundColor: 'var(--bg-surface)' }}>
        <div>
          <span className="badge badge-subtle" style={{ fontSize: '10px', textTransform: 'uppercase' }}>{quiz.category}</span>
          <h1 style={{ fontSize: 'var(--font-size-lg)', fontWeight: 700, marginTop: 'var(--space-2)' }}>
            {currentQuestion.prompt}
          </h1>
          {currentQuestion.subtitle && (
            <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-secondary)', margin: '4px 0 0' }}>
              {currentQuestion.subtitle}
            </p>
          )}
        </div>

        {/* Options List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }} role="radiogroup" aria-label="Question options">
          {currentQuestion.options.map((opt) => {
            const isSelected = selectedAnswers[currentQuestion.id] === opt.id;

            return (
              <div
                key={opt.id}
                onClick={() => handleSelectOption(opt.id)}
                className="card"
                role="radio"
                aria-checked={isSelected}
                tabIndex={0}
                onKeyDown={(e) => (e.key === ' ' || e.key === 'Enter') && handleSelectOption(opt.id)}
                style={{
                  cursor: 'pointer',
                  padding: 'var(--space-3) var(--space-4)',
                  border: isSelected ? '2px solid var(--accent-primary)' : '1px solid var(--border-subtle)',
                  backgroundColor: isSelected ? 'var(--bg-surface-subtle)' : 'var(--bg-surface)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <div>
                  <div style={{ fontSize: 'var(--font-size-sm)', fontWeight: isSelected ? 600 : 500 }}>{opt.label}</div>
                  {opt.sublabel && <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{opt.sublabel}</div>}
                </div>
                {isSelected && <CheckCircle size={18} color="var(--accent-primary)" />}
              </div>
            );
          })}
        </div>

        {/* Sticky/Bottom Navigation Controls */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 'var(--space-2)' }}>
          <button className="btn btn-ghost" onClick={handleBack} style={{ fontSize: 'var(--font-size-xs)' }}>
            Previous
          </button>
          <button
            className="btn btn-primary"
            onClick={handleNext}
            disabled={!isCurrentAnswered && !currentQuestion.allowSkip}
            style={{ fontSize: 'var(--font-size-xs)', minWidth: '120px' }}
          >
            {currentStepIndex === quiz.questions.length - 1 ? 'Complete Quiz' : 'Next'} <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};
