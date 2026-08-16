import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Check, Sparkles, Heart } from 'lucide-react';
import { useProfileStore } from '../../store/profileStore';
import { useARGStore } from '../../store/argStore';
import { AvatarRenderer, defaultAvatarConfig } from '../../components/avatar/AvatarRenderer';
import { Foldmark } from '../../components/brand/Foldmark';
import { soundEngine } from '../../audio/soundEngine';
import { UserAccount } from '../../types';

export const OnboardingFlow: React.FC = () => {
  const navigate = useNavigate();
  const { visitorProfile, updateVisitorProfile, setOnboardingCompleted } = useProfileStore();
  const { setStage } = useARGStore();

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<Partial<UserAccount>>({
    displayName: visitorProfile.displayName || 'Alex Rivers',
    handle: visitorProfile.handle || 'alexrivers',
    age: visitorProfile.age || 32,
    pronouns: visitorProfile.pronouns || 'they/them',
    orientation: visitorProfile.orientation || 'Queer',
    city: visitorProfile.city || 'Portland',
    relationshipGoals: visitorProfile.relationshipGoals || 'Long-term partnership with creative space',
    communicationStyle: visitorProfile.communicationStyle || 'Direct and reflective',
    socialEnergy: visitorProfile.socialEnergy || 'Ambivert',
    schedule: visitorProfile.schedule || 'Flexible weekday evenings',
    interests: visitorProfile.interests || ['Architecture', 'Film Photography', 'Ceramics', 'Tea Ceremony'],
    boundaries: visitorProfile.boundaries || ['Emotional honesty', 'Respecting creative quiet'],
    profilePromptAnswers: visitorProfile.profilePromptAnswers || [
      { id: 'vp1', question: 'My ideal Sunday evening looks like', answer: 'Low warm lighting, boiling a pot of tea, and listening to rain on the window.' },
      { id: 'vp2', question: 'A boundary I hold firmly', answer: 'I value clear, calm conversations over passive-aggressive guessing games.' },
      { id: 'vp3', question: 'Something I am quietly proud of', answer: 'Restoring a 1910 timber frame porch using traditional joinery.' }
    ],
    avatarConfig: { ...visitorProfile.avatarConfig }
  });

  const totalSteps = 17;

  const handleNext = () => {
    soundEngine.playCue('ui.navigation');
    if (step < totalSteps) {
      setStep((s) => s + 1);
    } else {
      soundEngine.playCue('ui.success');
      updateVisitorProfile(formData);
      setOnboardingCompleted(true);
      setStage(0);
      navigate('/home');
    }
  };

  const handleBack = () => {
    soundEngine.playCue('ui.navigation');
    if (step > 1) {
      setStep((s) => s - 1);
    }
  };

  return (
    <div className="onboarding-flow" style={{ maxWidth: '640px', margin: '0 auto', padding: 'var(--space-6) var(--space-4)', width: '100%' }}>
      {/* Progress Bar */}
      <div style={{ marginBottom: 'var(--space-6)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'var(--font-size-xs)', color: 'var(--text-muted)', marginBottom: 'var(--space-2)' }}>
          <span style={{ fontWeight: 700 }}>Step {step} of {totalSteps}</span>
          <span style={{ fontWeight: 700, color: 'var(--accent-plum)' }}>{Math.round((step / totalSteps) * 100)}%</span>
        </div>
        <div style={{ height: '6px', backgroundColor: 'var(--border-subtle)', borderRadius: 'var(--radius-full)', overflow: 'hidden' }}>
          <div
            style={{
              height: '100%',
              width: `${(step / totalSteps) * 100}%`,
              backgroundColor: 'var(--accent-plum)',
              transition: 'width var(--transition-normal)',
            }}
          />
        </div>
      </div>

      {/* Step Content Card */}
      <div className="ef-card-featured" style={{ padding: 'var(--space-8)', display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
        {step === 1 && (
          <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            <div style={{ margin: '0 auto' }}>
              <Foldmark size={48} color="var(--accent-plum)" />
            </div>
            <h1 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.03em' }}>
              Welcome to Everfold
            </h1>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, fontSize: 'var(--font-size-sm)' }}>
              Everfold is an intentional platform designed around relational continuity, emotional pacing, and modular vector avatars without photo swipe fatigue.
            </p>
          </div>
        )}

        {step === 2 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
            <h2 style={{ fontSize: 'var(--font-size-lg)', fontWeight: 800, color: 'var(--text-primary)' }}>What is your display name?</h2>
            <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-muted)' }}>How matches and community members will address you.</p>
            <input
              type="text"
              className="input"
              value={formData.displayName}
              onChange={(e) => setFormData({ ...formData, displayName: e.target.value })}
              placeholder="e.g. Alex Rivers"
              autoFocus
            />
          </div>
        )}

        {step === 3 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
            <h2 style={{ fontSize: 'var(--font-size-lg)', fontWeight: 800, color: 'var(--text-primary)' }}>Choose a unique handle</h2>
            <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-muted)' }}>Your platform identifier for mentions and directories.</p>
            <input
              type="text"
              className="input font-mono"
              value={formData.handle}
              onChange={(e) => setFormData({ ...formData, handle: e.target.value.toLowerCase().replace(/[^a-z0-9_.]/g, '') })}
              placeholder="e.g. alexrivers"
              autoFocus
            />
          </div>
        )}

        {step === 4 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
            <h2 style={{ fontSize: 'var(--font-size-lg)', fontWeight: 800, color: 'var(--text-primary)' }}>Confirm your age</h2>
            <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-muted)' }}>Everfold is strictly for adults (18+).</p>
            <input
              type="number"
              className="input font-mono"
              value={formData.age}
              onChange={(e) => setFormData({ ...formData, age: Number(e.target.value) })}
              min={18}
              max={120}
              autoFocus
            />
          </div>
        )}

        {step === 5 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
            <h2 style={{ fontSize: 'var(--font-size-lg)', fontWeight: 800, color: 'var(--text-primary)' }}>What are your pronouns?</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
              {['she/her', 'he/him', 'they/them', 'she/they', 'he/they'].map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setFormData({ ...formData, pronouns: p })}
                  className={`btn ${formData.pronouns === p ? 'btn-primary' : 'btn-secondary'} btn-sm`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 6 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
            <h2 style={{ fontSize: 'var(--font-size-lg)', fontWeight: 800, color: 'var(--text-primary)' }}>Your orientation</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
              {['Queer', 'Bisexual', 'Pansexual', 'Lesbian', 'Gay', 'Heterosexual'].map((o) => (
                <button
                  key={o}
                  type="button"
                  onClick={() => setFormData({ ...formData, orientation: o })}
                  className={`btn ${formData.orientation === o ? 'btn-primary' : 'btn-secondary'} btn-sm`}
                >
                  {o}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 7 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
            <h2 style={{ fontSize: 'var(--font-size-lg)', fontWeight: 800, color: 'var(--text-primary)' }}>Select your city or coordinates</h2>
            <select
              className="select"
              value={formData.city}
              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
            >
              <option value="Portland">Portland, OR</option>
              <option value="San Francisco">San Francisco, CA</option>
              <option value="Seattle">Seattle, WA</option>
              <option value="Chicago">Chicago, IL</option>
              <option value="Boston">Boston, MA</option>
              <option value="Montreal">Montreal, QC</option>
              <option value="London">London, UK</option>
              <option value="Tokyo">Tokyo, JP</option>
            </select>
          </div>
        )}

        {step === 8 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
            <h2 style={{ fontSize: 'var(--font-size-lg)', fontWeight: 800, color: 'var(--text-primary)' }}>Primary relationship goal</h2>
            <input
              type="text"
              className="input"
              value={formData.relationshipGoals}
              onChange={(e) => setFormData({ ...formData, relationshipGoals: e.target.value })}
              placeholder="e.g. Long-term partnership with creative space"
            />
          </div>
        )}

        {step === 9 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
            <h2 style={{ fontSize: 'var(--font-size-lg)', fontWeight: 800, color: 'var(--text-primary)' }}>Communication style & rhythm</h2>
            <input
              type="text"
              className="input"
              value={formData.communicationStyle}
              onChange={(e) => setFormData({ ...formData, communicationStyle: e.target.value })}
              placeholder="e.g. Direct and reflective, unhurried letters"
            />
          </div>
        )}

        {step >= 10 && step < totalSteps && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
            <h2 style={{ fontSize: 'var(--font-size-lg)', fontWeight: 800, color: 'var(--text-primary)' }}>
              {step === 10 ? 'Social Energy Level' : step === 11 ? 'Weekly Schedule' : step === 12 ? 'Your Interests & Passions' : 'Intentional Profile Prompt'}
            </h2>
            <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-muted)' }}>
              Everfold builds compatibility vectors around relational lifestyle pacing.
            </p>
            <input
              type="text"
              className="input"
              value={step === 10 ? formData.socialEnergy : step === 11 ? formData.schedule : formData.interests?.join(', ')}
              onChange={(e) => {
                if (step === 10) setFormData({ ...formData, socialEnergy: e.target.value });
                else if (step === 11) setFormData({ ...formData, schedule: e.target.value });
                else setFormData({ ...formData, interests: e.target.value.split(',').map((t) => t.trim()) });
              }}
            />
          </div>
        )}

        {step === totalSteps && (
          <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            <div
              style={{
                padding: 'var(--space-3)',
                borderRadius: 'var(--radius-xl)',
                backgroundColor: 'var(--bg-surface-subtle)',
                border: '1px solid var(--border-subtle)',
                display: 'inline-flex',
                margin: '0 auto',
              }}
            >
              <AvatarRenderer config={formData.avatarConfig || defaultAvatarConfig} size={120} />
            </div>
            <div>
              <h2 style={{ fontSize: 'var(--font-size-xl)', fontWeight: 800, color: 'var(--text-primary)' }}>
                {formData.displayName}, {formData.age}
              </h2>
              <div style={{ color: 'var(--text-muted)', fontSize: 'var(--font-size-xs)' }}>
                @{formData.handle} • {formData.city}
              </div>
            </div>
            <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-secondary)' }}>
              Your profile is ready. You can refine your modular avatar and prompts anytime in Settings.
            </p>
          </div>
        )}

        {/* Navigation Buttons */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border-subtle)', paddingTop: 'var(--space-4)' }}>
          {step > 1 ? (
            <button type="button" className="btn btn-secondary btn-sm" onClick={handleBack}>
              <ArrowLeft size={15} /> Back
            </button>
          ) : (
            <div />
          )}

          <button type="button" className="btn btn-primary btn-sm" onClick={handleNext}>
            {step === totalSteps ? 'Enter Everfold' : 'Continue'} <ArrowRight size={15} />
          </button>
        </div>
      </div>
    </div>
  );
};
