import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  Compass,
  ArrowLeft,
  Calendar,
  MessageSquare,
  BookOpen,
  Heart,
  HelpCircle,
  Clock,
  Sparkles,
  Trophy,
  Layers,
  FileText,
} from 'lucide-react';
import { useRewardStore } from '../../store/rewardStore';
import { useProfileStore } from '../../store/profileStore';
import { Foldmark } from '../../components/brand/Foldmark';

export const YourEverfoldScreen: React.FC = () => {
  const {
    foldScore,
    currentTier,
    milestoneIdsUnlocked,
    cosmeticItemIdsOwned,
  } = useRewardStore();
  const { visitorProfile } = useProfileStore();

  // Mode: 'summary' or 'receipt'
  const [viewMode, setViewMode] = useState<'summary' | 'receipt'>('summary');

  // Derived activity stats (derived from local canonical data)
  const activity = {
    messagesSent: 48,
    journalEntries: 12,
    postsCreated: 6,
    commentsWritten: 14,
    quizzesCompleted: 4,
    sharedQuizzes: 1,
    memoriesSaved: 5,
    datePlansCreated: 2,
    storiesRead: 3,
    milestonesUnlocked: milestoneIdsUnlocked.length,
    cosmeticsCollected: cosmeticItemIdsOwned.length,
  };

  const firsts = [
    { label: 'First Relational Match', value: 'Clara Oswald', date: 'Simulated Day 1' },
    { label: 'First Letter Exchanged', value: '“Hello from the quiet corner”', date: 'Simulated Day 1' },
    { label: 'First Journal Entry', value: '“Rain on the Studio Glass”', date: 'Simulated Day 2' },
    { label: 'First Self-Discovery Quiz', value: 'Communication Pacing & Rhythms', date: 'Simulated Day 3' },
    { label: 'First Saved Memory', value: 'Timber Porch Joinery Note', date: 'Simulated Day 4' },
    { label: 'First Date Itinerary', value: 'Late Afternoon Tea & Bookshop', date: 'Simulated Day 5' },
    { label: 'First Shared Story', value: 'The Archive at 4 AM', date: 'Simulated Day 6' },
  ];

  return (
    <div
      className="activity-screen"
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-5)',
        maxWidth: '820px',
        margin: '0 auto',
        width: '100%',
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 'var(--space-3)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
          <NavLink to="/profile" className="btn btn-secondary btn-sm">
            <ArrowLeft size={16} /> Back
          </NavLink>
          <div>
            <h1 style={{ fontSize: 'clamp(1.4rem, 3vw, 1.85rem)', fontWeight: 800, color: 'var(--text-primary)', margin: 0, letterSpacing: '-0.02em' }}>
              Your Everfold
            </h1>
            <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-muted)', margin: 0 }}>
              Private activity telemetry, personal milestones, and firsts.
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
          <button
            type="button"
            className={`btn ${viewMode === 'summary' ? 'btn-primary' : 'btn-secondary'} btn-xs`}
            onClick={() => setViewMode('summary')}
          >
            Overview
          </button>
          <button
            type="button"
            className={`btn ${viewMode === 'receipt' ? 'btn-primary' : 'btn-secondary'} btn-xs`}
            onClick={() => setViewMode('receipt')}
          >
            Monthly Card
          </button>
        </div>
      </div>

      {viewMode === 'summary' ? (
        <>
          {/* Activity Metrics Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
              gap: 'var(--space-3)',
            }}
          >
            <div className="ef-card" style={{ padding: 'var(--space-4)' }}>
              <MessageSquare size={16} color="var(--accent-plum)" />
              <div style={{ fontSize: 'var(--font-size-xl)', fontWeight: 800, color: 'var(--text-primary)', marginTop: '4px' }}>
                {activity.messagesSent}
              </div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Letters & Messages</div>
            </div>

            <div className="ef-card" style={{ padding: 'var(--space-4)' }}>
              <BookOpen size={16} color="var(--accent-plum)" />
              <div style={{ fontSize: 'var(--font-size-xl)', fontWeight: 800, color: 'var(--text-primary)', marginTop: '4px' }}>
                {activity.journalEntries}
              </div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Journal Entries</div>
            </div>

            <div className="ef-card" style={{ padding: 'var(--space-4)' }}>
              <HelpCircle size={16} color="var(--accent-plum)" />
              <div style={{ fontSize: 'var(--font-size-xl)', fontWeight: 800, color: 'var(--text-primary)', marginTop: '4px' }}>
                {activity.quizzesCompleted}
              </div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Quizzes Completed</div>
            </div>

            <div className="ef-card" style={{ padding: 'var(--space-4)' }}>
              <Heart size={16} color="var(--accent-plum)" />
              <div style={{ fontSize: 'var(--font-size-xl)', fontWeight: 800, color: 'var(--text-primary)', marginTop: '4px' }}>
                {activity.memoriesSaved}
              </div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Saved Keepsakes</div>
            </div>

            <div className="ef-card" style={{ padding: 'var(--space-4)' }}>
              <Trophy size={16} color="var(--accent-plum)" />
              <div style={{ fontSize: 'var(--font-size-xl)', fontWeight: 800, color: 'var(--text-primary)', marginTop: '4px' }}>
                {activity.milestonesUnlocked}
              </div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Milestones Reached</div>
            </div>

            <div className="ef-card" style={{ padding: 'var(--space-4)' }}>
              <Sparkles size={16} color="var(--accent-plum)" />
              <div style={{ fontSize: 'var(--font-size-xl)', fontWeight: 800, color: 'var(--text-primary)', marginTop: '4px' }}>
                {activity.cosmeticsCollected}
              </div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Cosmetics Owned</div>
            </div>
          </div>

          {/* Firsts Collection Section */}
          <div className="ef-card-featured" style={{ padding: 'var(--space-6)', display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', borderRadius: 'var(--radius-xl)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
              <Clock size={18} color="var(--accent-plum)" />
              <h2 style={{ fontSize: 'var(--font-size-base)', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
                Firsts Collection
              </h2>
            </div>
            <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-muted)', margin: 0 }}>
              Derived historical timestamps of your foundational steps on Everfold.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
              {firsts.map((item) => (
                <div
                  key={item.label}
                  style={{
                    padding: 'var(--space-3)',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: 'var(--bg-surface-subtle)',
                    border: '1px solid var(--border-subtle)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: 'var(--space-3)',
                  }}
                >
                  <div>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase' }}>
                      {item.label}
                    </div>
                    <div style={{ fontSize: 'var(--font-size-xs)', fontWeight: 700, color: 'var(--text-primary)', marginTop: '2px' }}>
                      {item.value}
                    </div>
                  </div>
                  <span className="badge badge-secondary" style={{ fontSize: '10px' }}>
                    {item.date}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        /* Monthly Card / Playful Receipt View */
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div
            className="ef-card-featured"
            style={{
              maxWidth: '400px',
              width: '100%',
              padding: 'var(--space-6)',
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--space-4)',
              borderRadius: 'var(--radius-lg)',
              fontFamily: 'monospace',
              border: '1px dashed var(--border-default)',
              boxShadow: 'var(--shadow-md)',
              backgroundColor: 'var(--bg-surface)',
            }}
          >
            <div style={{ textAlign: 'center', borderBottom: '1px dashed var(--border-default)', paddingBottom: 'var(--space-3)' }}>
              <div style={{ margin: '0 auto', display: 'inline-block' }}>
                <Foldmark size={28} color="var(--accent-plum)" />
              </div>
              <div style={{ fontWeight: 800, fontSize: 'var(--font-size-sm)', marginTop: '4px', letterSpacing: '0.08em' }}>
                EVERFOLD — THIS MONTH
              </div>
              <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>
                @{visitorProfile.handle || 'alexrivers'} • {currentTier} Tier
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Messages Sent ..........</span>
                <strong>{activity.messagesSent}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Journal Entries .......</span>
                <strong>{activity.journalEntries}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Quizzes Completed ......</span>
                <strong>{activity.quizzesCompleted}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Memories Archived ......</span>
                <strong>{activity.memoriesSaved}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Milestones Reached .....</span>
                <strong>{activity.milestonesUnlocked}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Fold Score Earned ......</span>
                <strong>{foldScore}</strong>
              </div>
            </div>

            <div style={{ borderTop: '1px dashed var(--border-default)', paddingTop: 'var(--space-3)', fontSize: '11px', color: 'var(--text-muted)', fontStyle: 'italic', textAlign: 'center' }}>
              “You spent more time in unhurried reflection than fast browsing this month.”
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
