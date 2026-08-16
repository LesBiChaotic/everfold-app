import React, { useState, useMemo, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import {
  Heart,
  X,
  Bookmark,
  Send,
  SlidersHorizontal,
  LayoutGrid,
  CreditCard,
  Compass,
  MapPin,
  Sparkles,
  ShieldAlert,
  ArrowRight,
  Clock,
  MessageCircle,
} from 'lucide-react';
import { SEEDED_USERS } from '../../data/users';
import { useProfileStore } from '../../store/profileStore';
import { useAppStore } from '../../store/appStore';
import { useARGStore } from '../../store/argStore';
import { AvatarRenderer } from '../../components/avatar/AvatarRenderer';
import { Foldmark } from '../../components/brand/Foldmark';
import { soundEngine } from '../../audio/soundEngine';
import { UserAccount } from '../../types';

export const DiscoverScreen: React.FC = () => {
  const [browseMode, setBrowseMode] = useState<'portrait' | 'grid'>('portrait');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showFilters, setShowFilters] = useState(false);
  const [noteModalUser, setNoteModalUser] = useState<UserAccount | null>(null);
  const [noteText, setNoteText] = useState('');
  const [selectedCity, setSelectedCity] = useState('All');
  const [selectedGoal, setSelectedGoal] = useState('All');
  const [selectedEnergy, setSelectedEnergy] = useState('All');

  const {
    savedUserIds,
    skippedUserIds,
    saveUserProfile,
    unsaveUserProfile,
    skipUserProfile,
    expressInterest,
  } = useProfileStore();

  const { addMatch, sendMessage } = useAppStore();
  const { stage, recordVisit } = useARGStore();

  useEffect(() => {
    recordVisit('discover');
  }, [recordVisit]);

  const discoverCandidates = useMemo(() => {
    return SEEDED_USERS.filter((u) => {
      if (u.id === 'visitor_user') return false;
      if (u.visibility === 'archived' && stage < 3) return false;
      if (u.visibility === 'hidden' && stage < 7) return false;
      if (skippedUserIds.includes(u.id)) return false;

      if (selectedCity !== 'All' && !u.city.includes(selectedCity)) return false;
      if (selectedGoal !== 'All' && !u.relationshipGoals.toLowerCase().includes(selectedGoal.toLowerCase())) return false;
      if (selectedEnergy !== 'All' && !u.socialEnergy.toLowerCase().includes(selectedEnergy.toLowerCase())) return false;

      return true;
    });
  }, [skippedUserIds, stage, selectedCity, selectedGoal, selectedEnergy]);

  const currentCandidate = discoverCandidates[currentIndex];

  const handleSkip = () => {
    if (!currentCandidate) return;
    soundEngine.playCue('ui.failure');
    skipUserProfile(currentCandidate.id);
    if (currentIndex >= discoverCandidates.length - 1) {
      setCurrentIndex(0);
    }
  };

  const handleInterest = () => {
    if (!currentCandidate) return;
    soundEngine.playCue('ui.match');
    expressInterest(currentCandidate.id);

    addMatch({
      id: `mtch_${currentCandidate.id}_${Date.now()}`,
      userId: currentCandidate.id,
      relationshipId: `rel_${currentCandidate.id}_visitor`,
      matchedAt: new Date().toISOString(),
      status: 'Mutual',
      compatibilityScore: 92,
      mutualFit: 94,
      conversationRhythm: currentCandidate.communicationStyle,
      lifeAlignment: 90,
      whyYouMatched: `Shared resonance on ${currentCandidate.interests.slice(0, 2).join(' and ')}.`,
      sharedInterests: currentCandidate.interests.slice(0, 3),
      tags: ['Mutual Match', 'Active']
    });

    if (currentIndex >= discoverCandidates.length - 1) {
      setCurrentIndex(0);
    } else {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleSaveToggle = (userId: string) => {
    if (savedUserIds.includes(userId)) {
      unsaveUserProfile(userId);
    } else {
      soundEngine.playCue('ui.save');
      saveUserProfile(userId);
    }
  };

  const handleSendNote = () => {
    if (!noteModalUser || !noteText.trim()) return;
    soundEngine.playCue('ui.match');
    expressInterest(noteModalUser.id);
    addMatch({
      id: `mtch_${noteModalUser.id}_${Date.now()}`,
      userId: noteModalUser.id,
      relationshipId: `rel_${noteModalUser.id}_visitor`,
      matchedAt: new Date().toISOString(),
      status: 'Talking',
      compatibilityScore: 95,
      mutualFit: 96,
      conversationRhythm: noteModalUser.communicationStyle,
      lifeAlignment: 92,
      whyYouMatched: `You sent a direct note regarding "${noteText.trim().substring(0, 30)}..."`,
      sharedInterests: noteModalUser.interests.slice(0, 3),
      tags: ['Talking', 'Direct Note']
    });
    sendMessage(`th_${noteModalUser.id}_visitor`, noteText.trim());
    setNoteModalUser(null);
    setNoteText('');
  };

  return (
    <div
      className="discover-screen"
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-5)',
        maxWidth: '860px',
        margin: '0 auto',
        width: '100%',
      }}
    >
      {/* Top Header & View Controls */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 'var(--space-3)' }}>
        <div>
          <h1 style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.03em' }}>
            Discover
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: 'var(--font-size-sm)', margin: '2px 0 0 0' }}>
            {discoverCandidates.length} intentional candidates matching your unhurried communication rhythm.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
          <div
            style={{
              display: 'flex',
              backgroundColor: 'var(--bg-surface)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-md)',
              padding: '2px',
            }}
          >
            <button
              onClick={() => setBrowseMode('portrait')}
              className="btn-ghost"
              style={{
                height: '34px',
                padding: '0 var(--space-3)',
                borderRadius: 'var(--radius-sm)',
                backgroundColor: browseMode === 'portrait' ? 'var(--bg-surface-subtle)' : 'transparent',
                fontWeight: browseMode === 'portrait' ? 700 : 500,
                color: browseMode === 'portrait' ? 'var(--accent-plum)' : 'var(--text-muted)',
              }}
              aria-label="Portrait card mode"
            >
              <CreditCard size={16} />
            </button>
            <button
              onClick={() => setBrowseMode('grid')}
              className="btn-ghost"
              style={{
                height: '34px',
                padding: '0 var(--space-3)',
                borderRadius: 'var(--radius-sm)',
                backgroundColor: browseMode === 'grid' ? 'var(--bg-surface-subtle)' : 'transparent',
                fontWeight: browseMode === 'grid' ? 700 : 500,
                color: browseMode === 'grid' ? 'var(--accent-plum)' : 'var(--text-muted)',
              }}
              aria-label="Context grid mode"
            >
              <LayoutGrid size={16} />
            </button>
          </div>

          <button
            className={`btn ${showFilters ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setShowFilters(!showFilters)}
            style={{ height: '36px', fontSize: 'var(--font-size-xs)' }}
          >
            <SlidersHorizontal size={14} /> Filters
          </button>
        </div>
      </div>

      {/* Filter Drawer */}
      {showFilters && (
        <div className="ef-card" style={{ display: 'flex', gap: 'var(--space-4)', flexWrap: 'wrap', backgroundColor: 'var(--bg-surface-subtle)' }}>
          <div style={{ flex: '1 1 180px' }}>
            <label style={{ fontSize: 'var(--font-size-xs)', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
              City / Coordinates:
            </label>
            <select className="select" value={selectedCity} onChange={(e) => setSelectedCity(e.target.value)} style={{ minHeight: '36px' }}>
              <option value="All">All Regions</option>
              <option value="San Francisco">San Francisco</option>
              <option value="Seattle">Seattle</option>
              <option value="Portland">Portland</option>
              <option value="Chicago">Chicago</option>
              <option value="Boston">Boston</option>
              <option value="Montreal">Montreal</option>
              <option value="London">London</option>
              <option value="Tokyo">Tokyo</option>
            </select>
          </div>

          <div style={{ flex: '1 1 180px' }}>
            <label style={{ fontSize: 'var(--font-size-xs)', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
              Relationship Goal:
            </label>
            <select className="select" value={selectedGoal} onChange={(e) => setSelectedGoal(e.target.value)} style={{ minHeight: '36px' }}>
              <option value="All">All Goals</option>
              <option value="Long-term">Long-term partnership</option>
              <option value="Intentional">Intentional connection</option>
              <option value="Companionship">Companionship</option>
            </select>
          </div>

          <div style={{ flex: '1 1 180px' }}>
            <label style={{ fontSize: 'var(--font-size-xs)', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
              Social Energy / Pace:
            </label>
            <select className="select" value={selectedEnergy} onChange={(e) => setSelectedEnergy(e.target.value)} style={{ minHeight: '36px' }}>
              <option value="All">All Energies</option>
              <option value="Introvert">Introvert (Low Stimulation)</option>
              <option value="Ambivert">Ambivert (Balanced)</option>
              <option value="Extrovert">Extrovert (Dynamic)</option>
            </select>
          </div>
        </div>
      )}

      {/* Main Discover Portrait Card */}
      {discoverCandidates.length === 0 ? (
        <div className="ef-card" style={{ textAlign: 'center', padding: 'var(--space-12)' }}>
          <Compass size={40} color="var(--text-muted)" style={{ margin: '0 auto var(--space-3)' }} />
          <h3>All current discovery profiles reviewed</h3>
          <p style={{ color: 'var(--text-muted)', maxWidth: '420px', margin: 'var(--space-2) auto' }}>
            New candidates arrive every Thursday at 9:00 AM local time. You can reset filters to browse other cities.
          </p>
          <button className="btn btn-secondary" onClick={() => { setSelectedCity('All'); setSelectedGoal('All'); setSelectedEnergy('All'); }} style={{ marginTop: 'var(--space-3)' }}>
            Reset Filters
          </button>
        </div>
      ) : browseMode === 'portrait' && currentCandidate ? (
        <div
          className="ef-card-featured"
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--space-5)',
            border: '1px solid var(--border-default)',
            background: 'var(--bg-surface)',
          }}
        >
          {/* Card Top: City Tag left, Presence & Bookmark right */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span className="badge badge-plum" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <MapPin size={12} /> {currentCandidate.city}, {currentCandidate.country}
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
              <span className="badge" style={{ color: 'var(--color-success)', backgroundColor: 'var(--color-success-bg)' }}>
                ● {currentCandidate.status}
              </span>
              <button
                className="btn-ghost"
                onClick={() => handleSaveToggle(currentCandidate.id)}
                aria-label={savedUserIds.includes(currentCandidate.id) ? 'Unsave profile' : 'Save profile'}
                style={{ width: 36, height: 36, padding: 0, borderRadius: 'var(--radius-md)' }}
              >
                <Bookmark
                  size={19}
                  color={savedUserIds.includes(currentCandidate.id) ? 'var(--color-warning)' : 'var(--text-muted)'}
                  fill={savedUserIds.includes(currentCandidate.id) ? 'var(--color-warning)' : 'none'}
                />
              </button>
            </div>
          </div>

          {/* Hero Avatar & Identity Section */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 'var(--space-3)' }}>
            <div
              style={{
                padding: 'var(--space-4)',
                borderRadius: 'var(--radius-xl)',
                backgroundColor: 'var(--bg-surface-subtle)',
                border: '1px solid var(--border-subtle)',
                display: 'inline-flex',
                boxShadow: 'var(--shadow-sm)',
              }}
            >
              <AvatarRenderer config={currentCandidate.avatarConfig} size={150} />
            </div>

            <div>
              <h2 style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
                {currentCandidate.displayName}, {currentCandidate.age}
              </h2>
              <div style={{ color: 'var(--text-muted)', fontSize: 'var(--font-size-sm)', marginTop: '2px' }}>
                @{currentCandidate.handle} • {currentCandidate.pronouns} • {currentCandidate.occupation}
              </div>
              <div style={{ color: 'var(--accent-plum)', fontSize: 'var(--font-size-xs)', fontWeight: 600, marginTop: '4px' }}>
                Seeking: {currentCandidate.relationshipGoals}
              </div>
            </div>
          </div>

          {/* Standout Prompt in Newsreader Serif */}
          {currentCandidate.profilePromptAnswers.length > 0 && (
            <div
              style={{
                padding: 'var(--space-4) var(--space-5)',
                backgroundColor: 'var(--bg-surface-subtle)',
                borderRadius: 'var(--radius-lg)',
                borderLeft: '4px solid var(--accent-plum)',
                margin: 'var(--space-1) 0',
              }}
            >
              <div style={{ fontSize: 'var(--font-size-xs)', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '6px' }}>
                {currentCandidate.profilePromptAnswers[0].question}
              </div>
              <div className="ef-prompt-quote">
                “{currentCandidate.profilePromptAnswers[0].answer}”
              </div>
            </div>
          )}

          {/* 3 Compact Context Tiles */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 'var(--space-2)' }}>
            <div className="ef-card-subtle" style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase' }}>Social Pace</div>
              <div style={{ fontWeight: 700, fontSize: 'var(--font-size-sm)', color: 'var(--text-primary)', marginTop: '2px' }}>
                {currentCandidate.socialEnergy}
              </div>
            </div>

            <div className="ef-card-subtle" style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase' }}>Communication</div>
              <div style={{ fontWeight: 700, fontSize: 'var(--font-size-sm)', color: 'var(--text-primary)', marginTop: '2px' }}>
                {currentCandidate.communicationStyle}
              </div>
            </div>

            <div className="ef-card-subtle" style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase' }}>Schedule</div>
              <div style={{ fontWeight: 700, fontSize: 'var(--font-size-sm)', color: 'var(--text-primary)', marginTop: '2px' }}>
                {currentCandidate.lifestyle.drinking || 'Standard'}
              </div>
            </div>
          </div>

          {/* Interests Mosaic */}
          <div>
            <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 'var(--space-2)' }}>
              Shared Curiosities & Values
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
              {currentCandidate.interests.map((interest) => (
                <span key={interest} className="badge">
                  {interest}
                </span>
              ))}
            </div>
          </div>

          {/* Mutual Fit Bar */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: 'var(--space-3) var(--space-4)',
              backgroundColor: 'var(--accent-surface)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--accent-border)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
              <Foldmark size={20} color="var(--accent-plum)" />
              <span style={{ fontWeight: 700, fontSize: 'var(--font-size-sm)', color: 'var(--accent-plum)' }}>
                Mutual Affinity Index
              </span>
            </div>
            <span style={{ fontWeight: 800, fontSize: 'var(--font-size-md)', color: 'var(--accent-plum)' }}>
              88%
            </span>
          </div>

          {/* Action Row: Skip, Send Note, Interested */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1.2fr 1.2fr',
              gap: 'var(--space-3)',
              paddingTop: 'var(--space-3)',
              borderTop: '1px solid var(--border-subtle)',
            }}
          >
            <button className="btn btn-secondary" onClick={handleSkip}>
              <X size={16} /> Skip
            </button>

            <button className="btn btn-secondary" onClick={() => setNoteModalUser(currentCandidate)}>
              <MessageCircle size={16} /> Send Note
            </button>

            <button className="btn btn-primary" onClick={handleInterest}>
              <Heart size={16} fill="currentColor" /> Interested
            </button>
          </div>
        </div>
      ) : (
        /* Context Grid Mode */
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
            gap: 'var(--space-4)',
          }}
        >
          {discoverCandidates.map((c) => (
            <div
              key={c.id}
              className="ef-card-interactive flex flex-col justify-between"
              style={{
                textAlign: 'center',
                padding: 'var(--space-5) var(--space-4)',
              }}
            >
              <div>
                <AvatarRenderer config={c.avatarConfig} size={90} />
                <h3 style={{ fontSize: 'var(--font-size-md)', fontWeight: 800, marginTop: 'var(--space-2)', color: 'var(--text-primary)' }}>
                  {c.displayName}, {c.age}
                </h3>
                <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-muted)' }}>
                  {c.city} • {c.occupation}
                </div>
                <p className="ef-prompt-quote" style={{ fontSize: '0.85rem', margin: 'var(--space-2) 0', color: 'var(--text-secondary)' }}>
                  “{c.profilePromptAnswers[0]?.answer.substring(0, 75)}...”
                </p>
              </div>

              <div style={{ display: 'flex', gap: 'var(--space-2)', marginTop: 'var(--space-3)' }}>
                <NavLink to={`/discover/${c.id}`} className="btn btn-secondary btn-sm flex-1">
                  Inspect
                </NavLink>
                <button
                  className="btn btn-primary btn-sm flex-1"
                  onClick={() => {
                    soundEngine.playCue('ui.match');
                    expressInterest(c.id);
                  }}
                >
                  <Heart size={14} fill="currentColor" /> Connect
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Note Modal */}
      {noteModalUser && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'var(--bg-overlay)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 50,
            padding: 'var(--space-4)',
          }}
        >
          <div
            className="ef-card-featured"
            style={{
              maxWidth: '480px',
              width: '100%',
              backgroundColor: 'var(--bg-surface)',
              border: '1px solid var(--border-default)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', marginBottom: 'var(--space-3)' }}>
              <AvatarRenderer config={noteModalUser.avatarConfig} size={48} />
              <div>
                <h3 style={{ fontWeight: 800, fontSize: 'var(--font-size-md)' }}>
                  Send an Unhurried Note to {noteModalUser.displayName}
                </h3>
                <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-muted)' }}>
                  Your note will start a direct private thread in your messages.
                </div>
              </div>
            </div>

            <textarea
              className="textarea"
              rows={4}
              placeholder="What specifically caught your attention in their profile or values?"
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
              style={{ width: '100%', resize: 'vertical' }}
            />

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--space-2)', marginTop: 'var(--space-4)' }}>
              <button className="btn btn-ghost" onClick={() => setNoteModalUser(null)}>
                Cancel
              </button>
              <button className="btn btn-primary" onClick={handleSendNote} disabled={!noteText.trim()}>
                <Send size={15} /> Send Letter
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
