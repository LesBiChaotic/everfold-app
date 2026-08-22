import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Edit3, MapPin, Sparkles, User, Settings, Bookmark, Heart, Eye, CheckCircle, Info, X, UserPlus, Trophy, Gift, Compass, Layers } from 'lucide-react';
import { useProfileStore } from '../../store/profileStore';
import { useAppStore } from '../../store/appStore';
import { useRewardStore } from '../../store/rewardStore';
import { AvatarRenderer } from '../../components/avatar/AvatarRenderer';
import { ProfilePreviewModal } from '../../components/profile/ProfilePreviewModal';
import { Foldmark } from '../../components/brand/Foldmark';
import { CosmeticAvatarFrame } from '../../components/rewards/CosmeticAvatarFrame';

export const ProfileScreen: React.FC = () => {
  const navigate = useNavigate();
  const { visitorProfile, savedUserIds, isFirstRevisitNoticeDismissed, dismissFirstRevisitNotice, setOnboardingCompleted } = useProfileStore();
  const { matches = [] } = useAppStore();
  const { foldScore, currentTier, milestoneIdsUnlocked, cosmeticItemIdsOwned } = useRewardStore();
  const [showPreviewModal, setShowPreviewModal] = useState(false);

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
      {/* 1. One-Time Revisit Welcome Notice */}
      {!isFirstRevisitNoticeDismissed && (
        <div
          className="ef-card"
          style={{
            backgroundColor: 'var(--accent-surface)',
            border: '1px solid var(--accent-plum)',
            padding: 'var(--space-3) var(--space-4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 'var(--space-3)',
            borderRadius: 'var(--radius-lg)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
            <div style={{ flexShrink: 0 }}>
              <Foldmark size={18} color="var(--accent-plum)" />
            </div>
            <div>
              <div style={{ fontSize: 'var(--font-size-xs)', fontWeight: 700, color: 'var(--accent-plum)' }}>
                This is how you're appearing on Everfold.
              </div>
              <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>
                Everything here can be refined, edited, or updated at any time without resetting your connections.
              </div>
            </div>
          </div>
          <button
            type="button"
            className="btn-ghost"
            onClick={dismissFirstRevisitNotice}
            style={{ width: 28, height: 28, padding: 0, color: 'var(--accent-plum)', flexShrink: 0 }}
            aria-label="Dismiss notice"
          >
            <X size={15} />
          </button>
        </div>
      )}

      {/* 2. Top Header Profile Card */}
      <div
        className="ef-card-featured"
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--space-4)',
        }}
      >
        <div
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
              <CosmeticAvatarFrame size={92}>
                <AvatarRenderer config={visitorProfile.avatarConfig} size={92} enableIdle={true} />
              </CosmeticAvatarFrame>
            </div>

            <div style={{ minWidth: 0 }}>
              <h1
                style={{
                  fontSize: 'clamp(1.3rem, 2.5vw, 1.75rem)',
                  fontWeight: 800,
                  color: 'var(--text-primary)',
                  letterSpacing: '-0.02em',
                  margin: 0,
                  lineHeight: 1.2,
                }}
              >
                {visitorProfile.displayName}, {visitorProfile.age}
              </h1>
              <div style={{ color: 'var(--text-muted)', fontSize: 'var(--font-size-xs)', marginTop: '4px' }}>
                @{visitorProfile.handle} • {visitorProfile.pronouns} {visitorProfile.genderIdentity ? `• ${visitorProfile.genderIdentity}` : ''}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px', fontSize: 'var(--font-size-xs)', color: 'var(--text-secondary)' }}>
                <MapPin size={13} color="var(--accent-plum)" /> {visitorProfile.city}, {visitorProfile.country}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap', width: '100%', maxWidth: 'max-content' }}>
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={() => setShowPreviewModal(true)}
              style={{ fontSize: 'var(--font-size-xs)', flex: '1 1 auto' }}
            >
              <Eye size={14} /> View as Others
            </button>
            <NavLink to="/avatar" className="btn btn-secondary btn-sm" style={{ fontSize: 'var(--font-size-xs)', flex: '1 1 auto' }}>
              <Sparkles size={14} /> Modular Avatar
            </NavLink>
            <NavLink to="/profile/edit" className="btn btn-primary btn-sm" style={{ fontSize: 'var(--font-size-xs)', flex: '1 1 auto' }}>
              <Edit3 size={14} /> Edit Identity
            </NavLink>
          </div>
        </div>

        {/* Gentle Contextual Profile Depth Banner */}
        <div
          style={{
            borderTop: '1px solid var(--border-subtle)',
            paddingTop: 'var(--space-3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 'var(--space-2)',
            fontSize: 'var(--font-size-xs)',
            color: 'var(--text-secondary)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <CheckCircle size={14} color="var(--color-success)" />
            <span>Your profile has rich context to connect meaningfully.</span>
          </div>
          <span style={{ color: 'var(--text-muted)', fontSize: '11px' }}>
            {visitorProfile.profilePromptAnswers.length} prompts shared · Sexuality: {visitorProfile.orientation}
          </span>
        </div>
      </div>

      {/* Your Everfold Progression & Rewards Hub */}
      <div
        className="ef-card"
        style={{
          padding: 'var(--space-4) var(--space-5)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 'var(--space-3)',
          borderRadius: 'var(--radius-xl)',
          background: 'linear-gradient(135deg, var(--bg-surface) 0%, var(--bg-surface-subtle) 100%)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
          <div
            style={{
              padding: '6px',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'rgba(107, 50, 72, 0.1)',
              color: 'var(--accent-plum)',
              display: 'inline-flex',
            }}
          >
            <Trophy size={18} />
          </div>
          <div>
            <div style={{ fontSize: '11px', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
              {currentTier} Tier • {foldScore} Fold Score
            </div>
            <div style={{ fontSize: 'var(--font-size-xs)', fontWeight: 700, color: 'var(--text-primary)' }}>
              {milestoneIdsUnlocked.length} Milestones Reached • {cosmeticItemIdsOwned.length} Cosmetics
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap' }}>
          <NavLink to="/profile/milestones" className="btn btn-secondary btn-xs">
            <Trophy size={13} /> Milestones Hub
          </NavLink>
          <NavLink to="/profile/cosmetics" className="btn btn-secondary btn-xs">
            <Sparkles size={13} /> Wardrobe
          </NavLink>
          <NavLink to="/profile/activity" className="btn btn-secondary btn-xs">
            <Compass size={13} /> Firsts & Activity
          </NavLink>
          <NavLink to="/plus" className="btn btn-primary btn-xs">
            <Gift size={13} /> Everfold Plus
          </NavLink>
        </div>
      </div>

      {/* 3. Relational Stats Bar */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 'var(--space-3)',
          textAlign: 'center',
        }}
      >
        <div className="ef-card-subtle">
          <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase' }}>Active Connections</div>
          <div style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-primary)', marginTop: '2px' }}>{matches.length}</div>
        </div>
        <div className="ef-card-subtle">
          <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase' }}>Saved Profiles</div>
          <div style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-primary)', marginTop: '2px' }}>{savedUserIds.length}</div>
        </div>
        <div className="ef-card-subtle">
          <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase' }}>Platform Status</div>
          <div style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--color-success)', marginTop: '2px' }}>Active</div>
        </div>
      </div>

      {/* 4. Core Profile Details */}
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
            {visitorProfile.communicationStyle} • Social Energy: {visitorProfile.socialEnergy} • Schedule: {visitorProfile.schedule}
          </p>
        </div>

        {visitorProfile.boundaries && visitorProfile.boundaries.length > 0 && (
          <div>
            <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '4px' }}>
              RESPECTED BOUNDARIES
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
              {visitorProfile.boundaries.map((b) => (
                <span key={b} className="badge badge-subtle" style={{ fontSize: '11px' }}>
                  {b}
                </span>
              ))}
            </div>
          </div>
        )}

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

      {/* 5. Profile Prompts in Newsreader Serif */}
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

      {/* Account Switcher / Create New Profile Entrance */}
      <div style={{ display: 'flex', justifyContent: 'center', margin: 'var(--space-2) 0' }}>
        <button
          type="button"
          className="btn btn-ghost btn-sm"
          onClick={() => {
            setOnboardingCompleted(false);
            navigate('/onboarding');
          }}
          style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-muted)', gap: '6px' }}
        >
          <UserPlus size={14} /> Create a New Profile / Re-run Onboarding
        </button>
      </div>

      {/* Profile Preview Modal */}
      {showPreviewModal && (
        <ProfilePreviewModal
          profile={visitorProfile}
          onClose={() => setShowPreviewModal(false)}
        />
      )}
    </div>
  );
};
