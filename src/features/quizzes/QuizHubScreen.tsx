import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  HelpCircle,
  Users,
  Sparkles,
  Layers,
  Clock,
  CheckCircle,
  Play,
  ArrowRight,
  Filter,
} from 'lucide-react';
import { useQuizStore } from '../../store/quizStore';
import { useStoryAccessStore } from '../../store/storyAccessStore';
import { useARGStore } from '../../store/argStore';
import { DailyQuestionWidget } from '../../components/quizzes/DailyQuestionWidget';
import { StarterDeckModal } from '../../components/quizzes/StarterDeckModal';
import { MiniGamesModal } from '../../components/quizzes/MiniGamesModal';
import { QuizCategory } from '../../types/socialEcosystem';

export const QuizHubScreen: React.FC = () => {
  const { soloQuizzes, togetherQuizzes, completedResults } = useQuizStore();
  const { mode, unlockAllStoryPages } = useStoryAccessStore();
  const { solvedPuzzleIds } = useARGStore();

  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [starterDeckOpen, setStarterDeckOpen] = useState(false);
  const [miniGamesOpen, setMiniGamesOpen] = useState(false);

  const categories: string[] = [
    'All',
    'Know Yourself',
    'Dating Style',
    'Communication',
    'Compatibility',
    'First Dates',
    'Lifestyle',
    'Relationship Pace',
    'Shared Life',
    'Just for Fun',
    'Together',
  ];

  const filteredSoloQuizzes = soloQuizzes.filter((q) => {
    // Story Tier check
    if (q.storyTier > 0 && !unlockAllStoryPages) {
      if (q.unlockRequirements && !q.unlockRequirements.some((req) => solvedPuzzleIds.includes(req))) {
        return false;
      }
    }
    if (selectedCategory !== 'All' && q.category !== selectedCategory) {
      return false;
    }
    return true;
  });

  return (
    <div className="quiz-hub-screen" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)', maxWidth: '1100px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 'var(--space-4)' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
            <h1 style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 800, margin: 0 }}>Quizzes & Relational Alignment</h1>
            {unlockAllStoryPages && <span className="badge badge-anomaly" style={{ fontSize: '0.65rem' }}>Story Access: Full</span>}
          </div>
          <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--font-size-sm)', marginTop: '4px', marginBottom: 0 }}>
            Self-paced reflections, communication style benchmarks, and shared partner explorations.
          </p>
        </div>

        {/* Action buttons for Starter Decks & Mini-Games */}
        <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
          <button className="btn btn-secondary" onClick={() => setStarterDeckOpen(true)} style={{ fontSize: 'var(--font-size-xs)' }}>
            <Layers size={15} /> Conversation Decks
          </button>
          <button className="btn btn-secondary" onClick={() => setMiniGamesOpen(true)} style={{ fontSize: 'var(--font-size-xs)' }}>
            <Sparkles size={15} /> Mini-Games
          </button>
        </div>
      </div>

      {/* Daily Rotating Question Widget */}
      <DailyQuestionWidget />

      {/* Together Quizzes Section */}
      <div className="card" style={{ backgroundColor: 'var(--bg-surface)', borderLeft: '4px solid var(--accent-primary)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-3)' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
              <Users size={18} color="var(--accent-primary)" />
              <h2 style={{ fontSize: 'var(--font-size-md)', fontWeight: 700, margin: 0 }}>Take Together: 2-Person Alignment</h2>
            </div>
            <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-secondary)', margin: '2px 0 0' }}>
              Answer independently; results and agreements are revealed once both participants complete the questions.
            </p>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'var(--space-3)' }}>
          {togetherQuizzes.map((tq) => (
            <div
              key={tq.id}
              className="card"
              style={{
                backgroundColor: 'var(--bg-surface-subtle)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: 'var(--space-2)',
              }}
            >
              <div>
                <span className="badge badge-subtle" style={{ fontSize: '10px' }}>Two-Person Shared</span>
                <h3 style={{ fontSize: 'var(--font-size-sm)', fontWeight: 700, marginTop: '4px' }}>{tq.title}</h3>
                <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-secondary)', margin: 0 }}>{tq.description}</p>
              </div>

              <NavLink
                to={`/quizzes/together/${tq.id}`}
                className="btn btn-primary"
                style={{ fontSize: 'var(--font-size-xs)', alignSelf: 'flex-start', marginTop: 'var(--space-2)' }}
              >
                <Play size={13} /> Start Together Quiz
              </NavLink>
            </div>
          ))}
        </div>
      </div>

      {/* Category Chips Bar */}
      <div style={{ display: 'flex', gap: 'var(--space-2)', overflowX: 'auto', paddingBottom: 'var(--space-1)' }} role="tablist">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`btn ${selectedCategory === cat ? 'btn-primary' : 'btn-secondary'}`}
            style={{ fontSize: 'var(--font-size-xs)', whiteSpace: 'nowrap', borderRadius: 'var(--radius-full)' }}
            role="tab"
            aria-selected={selectedCategory === cat}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Solo Quizzes Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 'var(--space-4)' }}>
        {filteredSoloQuizzes.map((quiz) => {
          const result = completedResults[quiz.id];

          return (
            <div
              key={quiz.id}
              className="card"
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                border: result ? '1px solid var(--accent-primary)' : '1px solid var(--border-subtle)',
                backgroundColor: 'var(--bg-surface)',
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-2)' }}>
                  <span className="badge badge-subtle" style={{ fontSize: '10px' }}>{quiz.category}</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', color: 'var(--text-muted)' }}>
                    <Clock size={12} /> {quiz.estimatedMinutes} min
                  </div>
                </div>

                <h3 style={{ fontSize: 'var(--font-size-md)', fontWeight: 700, margin: '0 0 6px' }}>{quiz.title}</h3>
                <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-secondary)', lineHeight: 1.5, margin: 0 }}>
                  {quiz.description}
                </p>

                {quiz.storyTier > 0 && (
                  <div className="badge badge-anomaly" style={{ marginTop: 'var(--space-2)', fontSize: '10px' }}>
                    Archived Invariant Survey
                  </div>
                )}
              </div>

              <div style={{ marginTop: 'var(--space-4)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                {result ? (
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                    <CheckCircle size={15} color="var(--color-success)" />
                    <span style={{ fontSize: 'var(--font-size-xs)', fontWeight: 600, color: 'var(--color-success)' }}>
                      Result: {result.primaryResult}
                    </span>
                  </div>
                ) : (
                  <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-muted)' }}>{quiz.questions.length} questions</div>
                )}

                <NavLink
                  to={result ? `/quizzes/results/${result.id}` : `/quizzes/${quiz.id}`}
                  className={`btn ${result ? 'btn-secondary' : 'btn-primary'}`}
                  style={{ fontSize: 'var(--font-size-xs)' }}
                >
                  {result ? 'View Results' : 'Take Quiz'} <ArrowRight size={13} />
                </NavLink>
              </div>
            </div>
          );
        })}
      </div>

      {/* Starter Deck Modal */}
      {starterDeckOpen && <StarterDeckModal onClose={() => setStarterDeckOpen(false)} />}

      {/* Mini-Games Modal */}
      {miniGamesOpen && <MiniGamesModal onClose={() => setMiniGamesOpen(false)} />}
    </div>
  );
};
