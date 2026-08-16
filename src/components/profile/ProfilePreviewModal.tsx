import React from 'react';
import { X, MapPin, Sparkles, Heart, Eye, Bookmark } from 'lucide-react';
import { UserAccount } from '../../types';
import { AvatarRenderer } from '../avatar/AvatarRenderer';

interface ProfilePreviewModalProps {
  profile: UserAccount;
  onClose: () => void;
}

export const ProfilePreviewModal: React.FC<ProfilePreviewModalProps> = ({ profile, onClose }) => {
  return (
    <div
      className="profile-preview-overlay"
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(28, 25, 23, 0.65)',
        backdropFilter: 'blur(6px)',
        zIndex: 9990,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'var(--space-4)',
        animation: 'fadeIn 0.2s ease-out',
      }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="preview-modal-title"
    >
      <div
        className="profile-preview-card ef-card"
        style={{
          backgroundColor: 'var(--bg-surface)',
          maxWidth: '680px',
          width: '100%',
          maxHeight: '90vh',
          overflowY: 'auto',
          borderRadius: 'var(--radius-xl)',
          padding: 'var(--space-6)',
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--space-5)',
          boxShadow: 'var(--shadow-xl)',
          position: 'relative',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-subtle)', paddingBottom: 'var(--space-3)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
            <span className="badge badge-plum" style={{ gap: '4px' }}>
              <Eye size={12} /> View as Others See Me
            </span>
            <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-muted)' }}>
              Public Everfold Perspective
            </span>
          </div>

          <button
            type="button"
            className="btn-ghost"
            onClick={onClose}
            style={{ width: 32, height: 32, padding: 0 }}
            aria-label="Close preview"
          >
            <X size={18} />
          </button>
        </div>

        {/* Profile Identity Card */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--space-4)',
            flexWrap: 'wrap',
            padding: 'var(--space-4)',
            backgroundColor: 'var(--bg-surface-subtle)',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--border-subtle)',
          }}
        >
          <div style={{ flexShrink: 0 }}>
            <AvatarRenderer config={profile.avatarConfig} size={90} enableIdle={true} />
          </div>

          <div style={{ flex: 1, minWidth: 200 }}>
            <h2 id="preview-modal-title" style={{ fontSize: 'var(--font-size-xl)', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
              {profile.displayName}, {profile.age}
            </h2>
            <div style={{ color: 'var(--text-muted)', fontSize: 'var(--font-size-sm)', marginTop: '2px' }}>
              @{profile.handle} • {profile.pronouns} {profile.genderIdentity ? `• ${profile.genderIdentity}` : ''}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px', fontSize: 'var(--font-size-xs)', color: 'var(--text-secondary)' }}>
              <MapPin size={13} color="var(--accent-plum)" /> {profile.city}, {profile.country} • {profile.orientation}
            </div>
            {profile.occupation && (
              <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-muted)', marginTop: '2px' }}>
                {profile.occupation}
              </div>
            )}
          </div>
        </div>

        {/* Intentional Relationship Goals */}
        <div>
          <div style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '4px' }}>
            Intentional Goal
          </div>
          <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-primary)', margin: 0, fontWeight: 500 }}>
            {profile.relationshipGoals || 'Looking for intentional connection'}
          </p>
        </div>

        {/* Pacing & Connection Style */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--space-3)' }}>
          <div className="ef-card-subtle" style={{ padding: 'var(--space-3)' }}>
            <div style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
              Communication
            </div>
            <div style={{ fontSize: 'var(--font-size-xs)', fontWeight: 600, color: 'var(--text-primary)', marginTop: '2px' }}>
              {profile.communicationStyle}
            </div>
          </div>
          <div className="ef-card-subtle" style={{ padding: 'var(--space-3)' }}>
            <div style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
              Social Rhythm
            </div>
            <div style={{ fontSize: 'var(--font-size-xs)', fontWeight: 600, color: 'var(--text-primary)', marginTop: '2px' }}>
              {profile.socialEnergy} • {profile.schedule}
            </div>
          </div>
        </div>

        {/* Interests */}
        <div>
          <div style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: 'var(--space-2)' }}>
            Curated Passions & Interests
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
            {profile.interests.map((interest) => (
              <span key={interest} className="badge">
                {interest}
              </span>
            ))}
          </div>
        </div>

        {/* Prompts */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
          {profile.profilePromptAnswers.map((p) => (
            <div
              key={p.id}
              className="ef-card"
              style={{
                borderLeft: '4px solid var(--accent-plum)',
                backgroundColor: 'var(--bg-surface-subtle)',
                padding: 'var(--space-3) var(--space-4)',
              }}
            >
              <div style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '4px' }}>
                {p.question}
              </div>
              <div className="ef-prompt-quote" style={{ fontSize: '1rem' }}>
                “{p.answer}”
              </div>
            </div>
          ))}
        </div>

        {/* Close button */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 'var(--space-2)' }}>
          <button type="button" className="btn btn-secondary" onClick={onClose}>
            Done Previewing
          </button>
        </div>
      </div>
    </div>
  );
};
