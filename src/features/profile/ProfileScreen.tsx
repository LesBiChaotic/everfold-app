import React from 'react';
import { NavLink } from 'react-router-dom';
import { Edit3, MapPin, Sparkles, User, Settings, Bookmark, Heart } from 'lucide-react';
import { useProfileStore } from '../../store/profileStore';
import { useAppStore } from '../../store/appStore';
import { AvatarRenderer } from '../../components/avatar/AvatarRenderer';
import { Foldmark } from '../../components/brand/Foldmark';

export const ProfileScreen: React.FC = () => {
  const { visitorProfile, savedUserIds } = useProfileStore();
  const { matches } = useAppStore();

  return (
    <div
      className="profile-screen"
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-5)',
        maxWidth: '820px',
        margin: '0 auto',
        width: '100%',
      }}
    >
      {/* Header Profile Card */}
      <div
        className="ef-card-featured"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 'var(--space-4)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)', minWidth: 0 }}>
          <div
            style={{
              padding: 'var(--space-2)',
              borderRadius: 'var(--radius-xl)',
              backgroundColor: 'var(--bg-surface-subtle)',
              border: '1px solid var(--border-subtle)',
              display: 'inline-flex',
              flexShrink: 0,
            }}
          >
            <AvatarRenderer config={visitorProfile.avatarConfig} size={100} />
          </div>

          <div style={{ minWidth: 0 }}>
            <h1 style={{ fontSize: 'clamp(1.4rem, 2.5vw, 1.8rem)', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.02em', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {visitorProfile.displayName}, {visitorProfile.age}
            </h1>
            <div style={{ color: 'var(--text-muted)', fontSize: 'var(--font-size-sm)', marginTop: '2px' }}>
              @{visitorProfile.handle} • {visitorProfile.pronouns}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px', fontSize: 'var(--font-size-xs)', color: 'var(--text-secondary)' }}>
              <MapPin size={14} color="var(--accent-plum)" /> {visitorProfile.city}, {visitorProfile.country}
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 'var(--space-2)', flexShrink: 0 }}>
          <NavLink to="/avatar" className="btn btn-secondary btn-sm">
            <Sparkles size={14} /> Modular Avatar
          </NavLink>
          <NavLink to="/profile/edit" className="btn btn-primary btn-sm">
            <Edit3 size={14} /> Edit Identity
          </NavLink>
        </div>
      </div>

      {/* Relational Stats Bar */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 'var(--space-3)',
          textAlign: 'center',
        }}
      >
        <div className="ef-card-subtle">
          <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase' }}>Active Connections</div>
          <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-primary)', marginTop: '2px' }}>{matches.length}</div>
        </div>
        <div className="ef-card-subtle">
          <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase' }}>Saved Profiles</div>
          <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-primary)', marginTop: '2px' }}>{savedUserIds.length}</div>
        </div>
        <div className="ef-card-subtle">
          <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase' }}>Platform Status</div>
          <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--color-success)', marginTop: '2px' }}>Active</div>
        </div>
      </div>

      {/* Core Profile Details */}
      <div className="ef-card" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
        <div>
          <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '4px' }}>
            RELATIONSHIP GOAL
          </div>
          <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-primary)', margin: 0, fontWeight: 500 }}>
            {visitorProfile.relationshipGoals}
          </p>
        </div>

        <div>
          <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '4px' }}>
            COMMUNICATION STYLE & PACING
          </div>
          <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-primary)', margin: 0, fontWeight: 500 }}>
            {visitorProfile.communicationStyle} • Social Energy: {visitorProfile.socialEnergy}
          </p>
        </div>

        <div>
          <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: 'var(--space-2)' }}>
            CURATED INTERESTS
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
            {visitorProfile.interests.map((interest) => (
              <span key={interest} className="badge">
                {interest}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Profile Prompts in Newsreader Serif */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
        {visitorProfile.profilePromptAnswers.map((prompt) => (
          <div
            key={prompt.id}
            className="ef-card"
            style={{
              borderLeft: '4px solid var(--accent-plum)',
            }}
          >
            <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '4px' }}>
              {prompt.question}
            </div>
            <div className="ef-prompt-quote" style={{ fontSize: '1.05rem' }}>
              “{prompt.answer}”
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
