import React from 'react';
import { useParams, useNavigate, NavLink } from 'react-router-dom';
import { ArrowLeft, MapPin, Heart, MessageSquare, Bookmark, ShieldAlert, Sparkles, TrendingUp } from 'lucide-react';
import { SEEDED_USERS } from '../../data/users';
import { useProfileStore } from '../../store/profileStore';
import { useAppStore } from '../../store/appStore';
import { AvatarRenderer } from '../../components/avatar/AvatarRenderer';
import { Foldmark } from '../../components/brand/Foldmark';
import { soundEngine } from '../../audio/soundEngine';

export const ProfileDetailScreen: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const navigate = useNavigate();
  const { savedUserIds, saveUserProfile, unsaveUserProfile, expressInterest } = useProfileStore();
  const { addMatch } = useAppStore();

  const user = SEEDED_USERS.find((u) => u.id === userId || u.handle === userId);

  if (!user) {
    return (
      <div className="ef-card" style={{ padding: 'var(--space-8)', textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}>
        <h2>Profile Not Found</h2>
        <p style={{ color: 'var(--text-muted)' }}>The requested profile does not exist or has been archived.</p>
        <button className="btn btn-secondary" onClick={() => navigate('/discover')} style={{ marginTop: 'var(--space-3)' }}>
          Back to Discover
        </button>
      </div>
    );
  }

  const isSaved = savedUserIds.includes(user.id);

  const handleSaveToggle = () => {
    if (isSaved) unsaveUserProfile(user.id);
    else {
      soundEngine.playCue('ui.save');
      saveUserProfile(user.id);
    }
  };

  const handleConnect = () => {
    soundEngine.playCue('ui.match');
    expressInterest(user.id);
    addMatch({
      id: `mtch_${user.id}_${Date.now()}`,
      userId: user.id,
      relationshipId: `rel_${user.id}_visitor`,
      matchedAt: new Date().toISOString(),
      status: 'Mutual',
      compatibilityScore: 93,
      mutualFit: 95,
      conversationRhythm: user.communicationStyle,
      lifeAlignment: 91,
      whyYouMatched: `Shared values in ${user.interests.slice(0, 2).join(' and ')}.`,
      sharedInterests: user.interests.slice(0, 3),
      tags: ['Mutual Match']
    });
    navigate('/matches');
  };

  return (
    <div
      className="profile-detail-screen"
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-5)',
        maxWidth: '820px',
        margin: '0 auto',
        width: '100%',
      }}
    >
      {/* Top Navigation */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
        <button className="btn btn-ghost btn-sm" onClick={() => navigate(-1)} style={{ gap: 'var(--space-2)' }}>
          <ArrowLeft size={16} /> Back
        </button>

        <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
          <button className="btn btn-secondary btn-sm" onClick={handleSaveToggle}>
            <Bookmark size={15} fill={isSaved ? 'currentColor' : 'none'} /> {isSaved ? 'Saved' : 'Save'}
          </button>
          <button className="btn btn-primary btn-sm" onClick={handleConnect}>
            <Heart size={15} fill="currentColor" /> Express Interest
          </button>
        </div>
      </div>

      {/* Main Profile Header Card */}
      <div
        className="ef-card-featured"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--space-6)',
          flexWrap: 'wrap',
        }}
      >
        <div
          style={{
            padding: 'var(--space-3)',
            borderRadius: 'var(--radius-xl)',
            backgroundColor: 'var(--bg-surface-subtle)',
            border: '1px solid var(--border-subtle)',
            display: 'inline-flex',
          }}
        >
          <AvatarRenderer config={user.avatarConfig} size={130} />
        </div>

        <div style={{ flex: 1, minWidth: '240px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 'var(--space-2)' }}>
            <div>
              <h1 style={{ fontSize: 'clamp(1.4rem, 2.5vw, 1.8rem)', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
                {user.displayName}, {user.age}
              </h1>
              <div style={{ color: 'var(--text-muted)', fontSize: 'var(--font-size-sm)', marginTop: '2px' }}>
                @{user.handle} • {user.pronouns}
              </div>
            </div>
            <span className="badge badge-plum">{user.status}</span>
          </div>

          <div style={{ marginTop: 'var(--space-3)', display: 'flex', flexDirection: 'column', gap: 'var(--space-1)', fontSize: 'var(--font-size-sm)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', color: 'var(--text-secondary)' }}>
              <MapPin size={15} color="var(--text-muted)" />
              <span>{user.city}, {user.country}</span>
            </div>
            <div style={{ color: 'var(--text-secondary)' }}>
              <strong>Occupation:</strong> {user.occupation}
            </div>
            <div style={{ color: 'var(--accent-plum)', fontWeight: 600 }}>
              <strong>Intent:</strong> {user.relationshipGoals}
            </div>
          </div>
        </div>
      </div>

      {/* 3 Context Tiles */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 'var(--space-3)' }}>
        <div className="ef-card-subtle">
          <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase' }}>Social Rhythm</div>
          <div style={{ fontWeight: 800, fontSize: 'var(--font-size-sm)', color: 'var(--text-primary)', marginTop: '2px' }}>
            {user.socialEnergy}
          </div>
        </div>

        <div className="ef-card-subtle">
          <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase' }}>Communication</div>
          <div style={{ fontWeight: 800, fontSize: 'var(--font-size-sm)', color: 'var(--text-primary)', marginTop: '2px' }}>
            {user.communicationStyle}
          </div>
        </div>

        <div className="ef-card-subtle">
          <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase' }}>Drinking / Rhythm</div>
          <div style={{ fontWeight: 800, fontSize: 'var(--font-size-sm)', color: 'var(--text-primary)', marginTop: '2px' }}>
            {user.lifestyle.drinking || 'Moderate'}
          </div>
        </div>
      </div>

      {/* Prompts in Newsreader Serif */}
      <div className="ef-card" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
        <h3 style={{ fontSize: 'var(--font-size-sm)', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          Intentional Prompt Responses
        </h3>
        {user.profilePromptAnswers.map((p) => (
          <div
            key={p.id}
            style={{
              padding: 'var(--space-4)',
              backgroundColor: 'var(--bg-surface-subtle)',
              borderRadius: 'var(--radius-lg)',
              borderLeft: '4px solid var(--accent-plum)',
            }}
          >
            <div style={{ fontSize: 'var(--font-size-xs)', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '6px' }}>
              {p.question}
            </div>
            <div className="ef-prompt-quote" style={{ fontSize: '1.05rem' }}>
              “{p.answer}”
            </div>
          </div>
        ))}
      </div>

      {/* Interests & Values */}
      <div className="ef-card">
        <h3 style={{ fontSize: 'var(--font-size-sm)', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 'var(--space-3)' }}>
          Curiosities & Values
        </h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
          {user.interests.map((interest) => (
            <span key={interest} className="badge">
              {interest}
            </span>
          ))}
        </div>
      </div>

      {/* Boundaries & Relational Agreements */}
      <div className="ef-card">
        <h3 style={{ fontSize: 'var(--font-size-sm)', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 'var(--space-3)' }}>
          Relational Boundaries & Commitments
        </h3>
        <ul style={{ paddingLeft: 'var(--space-4)', fontSize: 'var(--font-size-sm)', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
          {user.boundaries.map((b, i) => (
            <li key={i}>{b}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};
