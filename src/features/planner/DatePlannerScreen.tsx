import React, { useState } from 'react';
import {
  Calendar,
  Clock,
  MapPin,
  Shield,
  Heart,
  Sparkles,
  CheckCircle,
  Plus,
  Layers,
  ArrowRight,
} from 'lucide-react';
import { useAppStore } from '../../store/appStore';
import { useARGStore } from '../../store/argStore';
import { SEEDED_USERS } from '../../data/users';
import { Foldmark } from '../../components/brand/Foldmark';
import { soundEngine } from '../../audio/soundEngine';

export const DatePlannerScreen: React.FC = () => {
  const [selectedMatchId, setSelectedMatchId] = useState('usr_hana_prasetyo');
  const [selectedMood, setSelectedMood] = useState<'Quiet' | 'Curious' | 'Playful' | 'Outdoors' | 'Food' | 'Arts' | 'Low-key'>('Quiet');
  const [activityType, setActivityType] = useState('Botanical Greenhouse Walk & Tea');
  const [venueName, setVenueName] = useState('Portland Japanese Garden');
  const [venueCategory, setVenueCategory] = useState('park');
  const [dateStr, setDateStr] = useState('2026-08-22');
  const [timeStr, setTimeStr] = useState('10:00 AM');
  const [safetyInterval, setSafetyInterval] = useState(60);
  const [isStackingPuzzleOpen, setIsStackingPuzzleOpen] = useState(false);
  const [stackedCards, setStackedCards] = useState<number[]>([]);

  const { datePlans, createDatePlan } = useAppStore();
  const { stage, solvePuzzle, solvedPuzzleIds } = useARGStore();

  const matchesOptions = SEEDED_USERS.filter((u) => u.id !== 'visitor_user' && u.visibility !== 'archived');

  const handleCreatePlan = (e: React.FormEvent) => {
    e.preventDefault();
    createDatePlan({
      relationshipId: `rel_${selectedMatchId}_visitor`,
      matchUserId: selectedMatchId,
      mood: selectedMood,
      activityType,
      venueName,
      venueAddress: 'Local Historic District',
      venueCategory,
      scheduledDate: dateStr,
      scheduledTime: timeStr,
      scheduleFitScore: 94,
      comfortNotes: ['Low ambient decibel level', 'Accessible seating'],
      safetyCheckInIntervalMinutes: safetyInterval,
      status: 'Confirmed',
      previouslyVisitedAnomaly: false
    });
  };

  const handleCardStack = (cardNum: number) => {
    soundEngine.playCue('ui.save');
    const updated = stackedCards.includes(cardNum)
      ? stackedCards.filter((c) => c !== cardNum)
      : [...stackedCards, cardNum];
    setStackedCards(updated);

    if (updated.includes(44) && updated.includes(17)) {
      soundEngine.playCue('ui.success');
      solvePuzzle('gate_4417_meredith');
    }
  };

  return (
    <div
      className="date-planner-screen"
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-5)',
        maxWidth: '1000px',
        margin: '0 auto',
        width: '100%',
      }}
    >
      {/* Header */}
      <div>
        <h1 style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.03em' }}>
          Date Orchestration & Comfort Architecture
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: 'var(--font-size-sm)', margin: '2px 0 0 0' }}>
          Orchestrate intentional, low-pressure dates with pre-agreed comfort parameters and safety check-ins.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 'var(--space-5)', alignItems: 'start' }}>
        {/* Step-by-Step Date Builder Form */}
        <form onSubmit={handleCreatePlan} className="ef-card" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
          <h2 style={{ fontSize: 'var(--font-size-base)', fontWeight: 800, color: 'var(--text-primary)' }}>
            Plan a New Gathering
          </h2>

          {/* 1. Match Selection */}
          <div>
            <label style={{ fontSize: 'var(--font-size-xs)', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '4px', textTransform: 'uppercase' }}>
              1. Choose Partner
            </label>
            <select
              className="select"
              value={selectedMatchId}
              onChange={(e) => setSelectedMatchId(e.target.value)}
              style={{ minHeight: '38px', fontWeight: 600 }}
            >
              {matchesOptions.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.displayName} (@{u.handle})
                </option>
              ))}
            </select>
          </div>

          {/* 2. Mood & Pacing */}
          <div>
            <label style={{ fontSize: 'var(--font-size-xs)', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '6px', textTransform: 'uppercase' }}>
              2. Atmospheric Mood
            </label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-1)' }}>
              {(['Quiet', 'Curious', 'Playful', 'Outdoors', 'Food', 'Arts', 'Low-key'] as const).map((m) => (
                <button
                  type="button"
                  key={m}
                  onClick={() => setSelectedMood(m)}
                  className="badge"
                  style={{
                    backgroundColor: selectedMood === m ? 'var(--accent-plum)' : 'var(--bg-surface-subtle)',
                    color: selectedMood === m ? 'var(--text-inverse)' : 'var(--text-secondary)',
                    padding: '0.35rem 0.75rem',
                    fontSize: 'var(--font-size-xs)',
                    fontWeight: selectedMood === m ? 700 : 500,
                    border: '1px solid',
                    borderColor: selectedMood === m ? 'var(--accent-plum)' : 'var(--border-subtle)',
                    cursor: 'pointer',
                  }}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>

          {/* 3. Activity & Venue */}
          <div>
            <label style={{ fontSize: 'var(--font-size-xs)', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '4px', textTransform: 'uppercase' }}>
              3. Proposed Venue & Activity
            </label>
            <input
              type="text"
              className="input"
              value={activityType}
              onChange={(e) => setActivityType(e.target.value)}
              placeholder="e.g. Botanical Garden Walk"
              style={{ marginBottom: 'var(--space-2)' }}
            />
            <input
              type="text"
              className="input"
              value={venueName}
              onChange={(e) => setVenueName(e.target.value)}
              placeholder="Venue name..."
            />
          </div>

          {/* 4. Date & Time */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-2)' }}>
            <div>
              <label style={{ fontSize: 'var(--font-size-xs)', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '4px', textTransform: 'uppercase' }}>
                Date
              </label>
              <input
                type="date"
                className="input"
                value={dateStr}
                onChange={(e) => setDateStr(e.target.value)}
              />
            </div>
            <div>
              <label style={{ fontSize: 'var(--font-size-xs)', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '4px', textTransform: 'uppercase' }}>
                Time
              </label>
              <input
                type="text"
                className="input"
                value={timeStr}
                onChange={(e) => setTimeStr(e.target.value)}
              />
            </div>
          </div>

          {/* 5. Safety & Comfort Slider */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
              <label style={{ fontSize: 'var(--font-size-xs)', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                Safety Check-in Ping Interval
              </label>
              <span className="badge badge-plum" style={{ fontSize: '0.7rem' }}>
                Every {safetyInterval} mins
              </span>
            </div>
            <input
              type="range"
              min="30"
              max="180"
              step="15"
              value={safetyInterval}
              onChange={(e) => setSafetyInterval(parseInt(e.target.value))}
              style={{ width: '100%' }}
            />
          </div>

          <button type="submit" className="btn btn-primary" style={{ marginTop: 'var(--space-2)' }}>
            <Calendar size={15} /> Confirm Date Plan
          </button>
        </form>

        {/* Confirmed Date Plans List & Card Stacking Puzzle */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
          <h2 style={{ fontSize: 'var(--font-size-base)', fontWeight: 800, color: 'var(--text-primary)' }}>
            Confirmed Itineraries ({datePlans.length})
          </h2>

          {datePlans.map((plan) => {
            const partner = SEEDED_USERS.find((u) => u.id === plan.matchUserId);

            return (
              <div
                key={plan.id}
                className="ef-card-featured date-plan-cosmetic-card flex flex-col justify-between"
                style={{
                  padding: 'var(--space-4)',
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-2)' }}>
                    <span className="badge badge-plum" style={{ fontSize: '0.68rem' }}>
                      {plan.mood} • {plan.status}
                    </span>
                    <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-success)', fontWeight: 700 }}>
                      Fit: {plan.scheduleFitScore}%
                    </span>
                  </div>

                  <h3 style={{ fontSize: 'var(--font-size-base)', fontWeight: 800, color: 'var(--text-primary)' }}>
                    {plan.activityType}
                  </h3>
                  <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-secondary)', marginTop: '2px' }}>
                    With {partner ? partner.displayName : 'Participant'} • {plan.venueName}
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', marginTop: 'var(--space-3)', fontSize: 'var(--font-size-xs)', color: 'var(--text-muted)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Calendar size={14} /> {plan.scheduledDate}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Clock size={14} /> {plan.scheduledTime}
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginTop: 'var(--space-3)', borderTop: '1px solid var(--border-subtle)', paddingTop: 'var(--space-2)' }}>
                  <Shield size={14} color="var(--accent-plum)" />
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>
                    Check-in scheduled every {plan.safetyCheckInIntervalMinutes}m
                  </span>
                </div>
              </div>
            );
          })}

          {/* Stacking Card Puzzle Section (Section 23) */}
          <div className="ef-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                <Layers size={16} color="var(--accent-plum)" />
                <h3 style={{ fontSize: 'var(--font-size-sm)', fontWeight: 800, color: 'var(--text-primary)' }}>
                  Card Stacking Calibration Gate
                </h3>
              </div>
              <button
                className="btn btn-secondary btn-sm"
                onClick={() => setIsStackingPuzzleOpen(!isStackingPuzzleOpen)}
              >
                {isStackingPuzzleOpen ? 'Hide' : 'Open'}
              </button>
            </div>

            {isStackingPuzzleOpen && (
              <div style={{ marginTop: 'var(--space-3)', display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-muted)' }}>
                  Stack relational coordinate cards to unlock historical resonance parameters.
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 'var(--space-2)' }}>
                  {[12, 17, 29, 44, 58, 73, 86, 99].map((cardNum) => (
                    <button
                      key={cardNum}
                      onClick={() => handleCardStack(cardNum)}
                      className={`btn ${stackedCards.includes(cardNum) ? 'btn-primary' : 'btn-secondary'} btn-sm`}
                      style={{ fontWeight: 800 }}
                    >
                      #{cardNum}
                    </button>
                  ))}
                </div>
                {solvedPuzzleIds.includes('gate_4417_meredith') && (
                  <div style={{ color: 'var(--color-success)', fontSize: 'var(--font-size-xs)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <CheckCircle size={14} /> Resonance #44 + #17 Synchronized (Meredith Cole Unlocked)
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
