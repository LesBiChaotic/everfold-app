import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Sparkles,
  Heart,
  User,
  Shield,
  MapPin,
  Smile,
  Shuffle,
  LogIn,
  AlertCircle,
  Clock,
  Compass,
} from 'lucide-react';
import { useProfileStore, initialVisitorProfile } from '../../store/profileStore';
import { useARGStore } from '../../store/argStore';
import { AvatarRenderer, defaultAvatarConfig } from '../../components/avatar/AvatarRenderer';
import { Foldmark } from '../../components/brand/Foldmark';
import { soundEngine } from '../../audio/soundEngine';
import { UserAccount, AvatarConfig } from '../../types';
import { MicroCelebration } from '../../components/common/MicroCelebration';
import { GLOBAL_COUNTRIES } from '../../data/locations';

const GENDER_OPTIONS = [
  'Nonbinary',
  'Woman',
  'Man',
  'Genderfluid',
  'Agender',
  'Questioning',
  'Self-describe',
  'Prefer not to say',
];

const PRONOUN_OPTIONS = [
  'they/them',
  'she/her',
  'he/him',
  'they/she',
  'they/he',
  'any/all',
  'Custom',
];

const SEXUALITY_OPTIONS = [
  'Open-minded / Queer',
  'Lesbian',
  'Gay',
  'Bisexual',
  'Pansexual',
  'Asexual / Demisexual',
  'Straight',
  'Questioning',
];

const INTEREST_SUGGESTIONS = [
  'Architecture',
  'Film Photography',
  'Ceramics',
  'Tea Ceremony',
  'Old Libraries',
  'Poetry',
  'Indie Cinema',
  'Cooking Together',
  'Hiking & Trail Walks',
  'Vinyl Records',
  'Museum Evenings',
  'Late Night Talks',
];

export const OnboardingFlow: React.FC = () => {
  const navigate = useNavigate();
  const { visitorProfile, updateVisitorProfile, setOnboardingCompleted } = useProfileStore();
  const { setStage } = useARGStore();

  // Mode: 'landing' (Log In / Sign Up gate) or 'wizard' (Step-by-step creation)
  const [flowMode, setFlowMode] = useState<'landing' | 'wizard'>('landing');
  const [step, setStep] = useState(1);
  const totalSteps = 6;

  // Form State
  const [formData, setFormData] = useState<UserAccount>({
    ...initialVisitorProfile,
    displayName: '',
    handle: '',
    age: 28,
    genderIdentity: null,
    pronouns: 'they/them',
    orientation: 'Open-minded / Queer',
    city: 'Portland',
    country: 'USA',
    occupation: '',
    languages: ['English'],
    relationshipGoals: 'Intentional, grounded partnership with creative space',
    communicationStyle: 'Direct and reflective, unhurried letters',
    socialEnergy: 'Ambivert',
    schedule: 'Flexible weekday evenings',
    interests: ['Architecture', 'Film Photography', 'Ceramics', 'Tea Ceremony'],
    boundaries: ['Emotional honesty', 'Respecting creative quiet'],
    profilePromptAnswers: [
      { id: 'vp1', question: 'My ideal Sunday evening looks like', answer: 'Low warm lighting, boiling a pot of tea, and listening to rain on the window.' },
      { id: 'vp2', question: 'A boundary I hold firmly', answer: 'I value clear, calm conversations over passive-aggressive guessing games.' },
      { id: 'vp3', question: 'Something I am quietly proud of', answer: 'Building a personal rhythm that prioritizes real presence.' },
    ],
    avatarConfig: { ...defaultAvatarConfig },
  });

  const [customGenderText, setCustomGenderText] = useState('');
  const [isSelfDescribeGender, setIsSelfDescribeGender] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [showCelebration, setShowCelebration] = useState(false);

  // Avatar Builder palettes
  const skinTones = ['#f5d0a9', '#e0b59b', '#d4a373', '#c68642', '#a06846', '#8d5524', '#603813', '#4a2c1d'];
  const hairColors = ['#1a110a', '#2b1d14', '#4a3728', '#8a4b27', '#b87333', '#d4a373', '#6e5d53', '#e2e8f0'];
  const backgroundColors = ['#f5ede8', '#f3ebd4', '#e2eee6', '#e4e9f5', '#efe5f0', '#252028'];

  // Fast Login with Existing / Demo Account
  const handleQuickLogin = () => {
    soundEngine.playCue('ui.save');
    setOnboardingCompleted(true);
    navigate('/home');
  };

  // Start Sign Up Wizard
  const handleStartSignUp = () => {
    soundEngine.playCue('ui.navigation');
    setFlowMode('wizard');
    setStep(1);
  };

  // Validation on Next
  const handleNext = () => {
    setValidationError(null);

    // Step 1 validation
    if (step === 1) {
      if (!formData.displayName.trim()) {
        setValidationError('Please enter a display name to continue.');
        return;
      }
      if (formData.age < 18 || isNaN(formData.age)) {
        setValidationError('Everfold is an adult community. You must be 18 or older.');
        return;
      }
      // Auto-generate handle if empty
      if (!formData.handle.trim()) {
        formData.handle = formData.displayName.toLowerCase().replace(/[^a-z0-9]/g, '');
      }
    }

    soundEngine.playCue('ui.navigation');

    if (step < totalSteps) {
      setStep((s) => s + 1);
    } else {
      // Final Step Complete
      soundEngine.playCue('ui.save');
      setShowCelebration(true);

      const finalProfile: UserAccount = {
        ...formData,
        genderIdentity: isSelfDescribeGender ? customGenderText.trim() || null : formData.genderIdentity,
        handle: formData.handle.replace(/^@/, '') || 'member',
        status: 'Active now',
        createdAt: new Date().toISOString(),
        lastActive: new Date().toISOString(),
      };

      updateVisitorProfile(finalProfile);
      setOnboardingCompleted(true);
      setStage(0);

      setTimeout(() => {
        navigate('/home');
      }, 700);
    }
  };

  const handleBack = () => {
    soundEngine.playCue('ui.navigation');
    if (step > 1) {
      setStep((s) => s - 1);
    } else {
      setFlowMode('landing');
    }
  };

  const toggleInterest = (interest: string) => {
    const current = formData.interests || [];
    const updated = current.includes(interest)
      ? current.filter((i) => i !== interest)
      : [...current, interest];
    setFormData({ ...formData, interests: updated });
    soundEngine.playCue('ui.tick');
  };

  const updateAvatar = (field: keyof AvatarConfig, val: any) => {
    soundEngine.playCue('ui.tick');
    setFormData({
      ...formData,
      avatarConfig: { ...formData.avatarConfig, [field]: val },
    });
  };

  const handleRandomizeAvatar = () => {
    soundEngine.playCue('ui.navigation');
    const randomSkin = skinTones[Math.floor(Math.random() * skinTones.length)];
    const randomHair = hairColors[Math.floor(Math.random() * hairColors.length)];
    const randomBg = backgroundColors[Math.floor(Math.random() * backgroundColors.length)];
    const hairStyles = ['bob', 'pixie', 'crew', 'curtain_bangs', 'shoulder_waves', 'high_bun', 'side_part', 'afro'];
    const tops = ['crew_sweater', 'collared_shirt', 'turtleneck', 'v_neck', 'hoodie'];
    const glasses = ['none', 'wire_round', 'thick_square', 'aviator'];

    setFormData({
      ...formData,
      avatarConfig: {
        ...formData.avatarConfig,
        skinTone: randomSkin,
        hairColor: randomHair,
        backgroundColor: randomBg,
        hairStyle: hairStyles[Math.floor(Math.random() * hairStyles.length)],
        top: tops[Math.floor(Math.random() * tops.length)],
        glasses: glasses[Math.floor(Math.random() * glasses.length)],
      },
    });
  };

  return (
    <div
      className="onboarding-container"
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'var(--space-6) var(--space-4)',
        backgroundColor: 'var(--bg-app)',
      }}
    >
      {/* =========================================================================
          SCREEN A: LANDING / ENTRANCE GATE (Sign Up or Log In)
          ========================================================================= */}
      {flowMode === 'landing' && (
        <div
          className="ef-card-featured"
          style={{
            maxWidth: '560px',
            width: '100%',
            padding: 'clamp(var(--space-6), 5vw, var(--space-8))',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            gap: 'var(--space-6)',
            boxShadow: 'var(--shadow-xl)',
            borderRadius: 'var(--radius-xl)',
            border: '1px solid var(--border-default)',
            background: 'linear-gradient(180deg, var(--bg-surface) 0%, var(--bg-surface-subtle) 100%)',
          }}
        >
          {/* Logo & Headline */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--space-3)' }}>
            <div style={{ padding: 'var(--space-2)' }}>
              <Foldmark size={54} color="var(--accent-plum)" />
            </div>

            <div>
              <span className="badge badge-plum" style={{ marginBottom: 'var(--space-2)' }}>
                Slow Dating & Relational Continuity
              </span>
              <h1
                style={{
                  fontSize: 'clamp(1.75rem, 4vw, 2.35rem)',
                  fontWeight: 800,
                  color: 'var(--text-primary)',
                  letterSpacing: '-0.03em',
                  lineHeight: 1.2,
                  margin: 0,
                }}
              >
                Everfold
              </h1>
            </div>

            <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--font-size-sm)', lineHeight: 1.6, margin: 0, maxWidth: '440px' }}>
              An unhurried space for thoughtful connection, communication pacing, and modular illustrated avatars without superficial swipe fatigue.
            </p>
          </div>

          {/* Core Feature Highlights */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
              gap: 'var(--space-3)',
              width: '100%',
              textAlign: 'left',
            }}
          >
            <div className="ef-card-subtle" style={{ padding: 'var(--space-3)' }}>
              <Sparkles size={16} color="var(--accent-plum)" />
              <div style={{ fontWeight: 700, fontSize: 'var(--font-size-xs)', color: 'var(--text-primary)', marginTop: '4px' }}>
                Modular Avatars
              </div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                Authentic vector presence
              </div>
            </div>

            <div className="ef-card-subtle" style={{ padding: 'var(--space-3)' }}>
              <Heart size={16} color="var(--accent-plum)" />
              <div style={{ fontWeight: 700, fontSize: 'var(--font-size-xs)', color: 'var(--text-primary)', marginTop: '4px' }}>
                Unhurried Letters
              </div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                Deep, deliberate pacing
              </div>
            </div>

            <div className="ef-card-subtle" style={{ padding: 'var(--space-3)' }}>
              <Shield size={16} color="var(--accent-plum)" />
              <div style={{ fontWeight: 700, fontSize: 'var(--font-size-xs)', color: 'var(--text-primary)', marginTop: '4px' }}>
                Private & Grounded
              </div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                Your data stays local
              </div>
            </div>
          </div>

          {/* Action Choice Buttons */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', width: '100%' }}>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleStartSignUp}
              style={{
                width: '100%',
                minHeight: '48px',
                fontSize: 'var(--font-size-base)',
                fontWeight: 700,
                justifyContent: 'center',
                borderRadius: 'var(--radius-lg)',
              }}
            >
              <User size={18} /> Create Your Profile (Sign Up)
            </button>

            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleQuickLogin}
              style={{
                width: '100%',
                minHeight: '44px',
                fontSize: 'var(--font-size-sm)',
                fontWeight: 600,
                justifyContent: 'center',
                borderRadius: 'var(--radius-lg)',
              }}
            >
              <LogIn size={16} /> Sign In with Demo Account (Alex Rivers)
            </button>
          </div>

          <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
            Everfold is 100% local-first. All profile data and relationship telemetry remain securely stored on your device.
          </div>
        </div>
      )}

      {/* =========================================================================
          SCREEN B: 6-STEP SIGN UP & PROFILE CREATION WIZARD
          ========================================================================= */}
      {flowMode === 'wizard' && (
        <div
          style={{
            maxWidth: '680px',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--space-5)',
          }}
        >
          {/* Progress Header */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 'var(--font-size-xs)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                <Foldmark size={18} color="var(--accent-plum)" />
                <span style={{ fontWeight: 800, color: 'var(--text-primary)' }}>
                  Profile Creation
                </span>
              </div>
              <span style={{ color: 'var(--text-muted)', fontWeight: 600 }}>
                Step {step} of {totalSteps}
              </span>
            </div>

            {/* Progress Track */}
            <div style={{ height: '6px', backgroundColor: 'var(--border-subtle)', borderRadius: 'var(--radius-full)', overflow: 'hidden' }}>
              <div
                style={{
                  height: '100%',
                  width: `${(step / totalSteps) * 100}%`,
                  backgroundColor: 'var(--accent-plum)',
                  transition: 'width 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
              />
            </div>
          </div>

          {/* Validation Alert */}
          {validationError && (
            <div
              className="ef-card"
              style={{
                backgroundColor: 'rgba(239, 68, 68, 0.08)',
                border: '1px solid var(--color-error, #ef4444)',
                color: 'var(--color-error, #ef4444)',
                padding: 'var(--space-3) var(--space-4)',
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--space-2)',
                borderRadius: 'var(--radius-md)',
                fontSize: 'var(--font-size-xs)',
                fontWeight: 600,
              }}
            >
              <AlertCircle size={16} />
              <span>{validationError}</span>
            </div>
          )}

          {/* Wizard Card Body */}
          <div
            className="ef-card-featured"
            style={{
              padding: 'clamp(var(--space-5), 4vw, var(--space-8))',
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--space-5)',
              borderRadius: 'var(--radius-xl)',
            }}
          >
            {/* STEP 1: IDENTITY & BASICS */}
            {step === 1 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                <div>
                  <h2 style={{ fontSize: 'var(--font-size-xl)', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
                    What should we call you?
                  </h2>
                  <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-muted)', marginTop: '4px' }}>
                    Set your public name, age, gender identity, and orientation.
                  </p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 'var(--space-3)' }}>
                  <div>
                    <label style={{ fontSize: 'var(--font-size-xs)', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '6px', textTransform: 'uppercase' }}>
                      Display Name *
                    </label>
                    <input
                      type="text"
                      className="input"
                      value={formData.displayName}
                      onChange={(e) => setFormData({ ...formData, displayName: e.target.value })}
                      placeholder="e.g. Alex Rivers"
                      autoFocus
                      style={{ width: '100%', minHeight: '44px' }}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: 'var(--font-size-xs)', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '6px', textTransform: 'uppercase' }}>
                      Age (18+) *
                    </label>
                    <input
                      type="number"
                      className="input"
                      value={formData.age}
                      onChange={(e) => setFormData({ ...formData, age: parseInt(e.target.value, 10) })}
                      min={18}
                      max={120}
                      style={{ width: '100%', minHeight: '44px' }}
                    />
                  </div>
                </div>

                {/* Gender Identity */}
                <div>
                  <label style={{ fontSize: 'var(--font-size-xs)', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '6px', textTransform: 'uppercase' }}>
                    Gender Identity
                  </label>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)', marginBottom: '8px' }}>
                    {GENDER_OPTIONS.map((g) => {
                      const isSelected = (formData.genderIdentity === g && !isSelfDescribeGender) || (g === 'Self-describe' && isSelfDescribeGender);
                      return (
                        <button
                          key={g}
                          type="button"
                          onClick={() => {
                            if (g === 'Self-describe') {
                              setIsSelfDescribeGender(true);
                              setFormData({ ...formData, genderIdentity: customGenderText || 'Self-describe' });
                            } else {
                              setIsSelfDescribeGender(false);
                              setFormData({ ...formData, genderIdentity: g });
                            }
                          }}
                          className="badge"
                          style={{
                            backgroundColor: isSelected ? 'var(--accent-plum)' : 'var(--bg-surface-subtle)',
                            color: isSelected ? 'var(--text-inverse)' : 'var(--text-secondary)',
                            border: `1px solid ${isSelected ? 'var(--accent-plum)' : 'var(--border-default)'}`,
                            padding: '6px 12px',
                            fontSize: '11px',
                            cursor: 'pointer',
                            borderRadius: 'var(--radius-full)',
                          }}
                        >
                          {g}
                        </button>
                      );
                    })}
                  </div>

                  {isSelfDescribeGender && (
                    <input
                      type="text"
                      className="input"
                      placeholder="Self-describe your gender identity..."
                      value={customGenderText}
                      onChange={(e) => {
                        setCustomGenderText(e.target.value);
                        setFormData({ ...formData, genderIdentity: e.target.value });
                      }}
                      style={{ width: '100%', minHeight: '40px' }}
                    />
                  )}
                </div>

                {/* Pronouns */}
                <div>
                  <label style={{ fontSize: 'var(--font-size-xs)', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '6px', textTransform: 'uppercase' }}>
                    Pronouns
                  </label>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
                    {PRONOUN_OPTIONS.map((p) => (
                      <button
                        key={p}
                        type="button"
                        onClick={() => setFormData({ ...formData, pronouns: p })}
                        className="badge"
                        style={{
                          backgroundColor: formData.pronouns === p ? 'var(--accent-plum)' : 'var(--bg-surface-subtle)',
                          color: formData.pronouns === p ? 'var(--text-inverse)' : 'var(--text-secondary)',
                          border: `1px solid ${formData.pronouns === p ? 'var(--accent-plum)' : 'var(--border-default)'}`,
                          padding: '6px 12px',
                          fontSize: '11px',
                          cursor: 'pointer',
                          borderRadius: 'var(--radius-full)',
                        }}
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Sexuality / Orientation */}
                <div>
                  <label style={{ fontSize: 'var(--font-size-xs)', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '6px', textTransform: 'uppercase' }}>
                    Sexuality / Orientation
                  </label>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
                    {SEXUALITY_OPTIONS.map((o) => (
                      <button
                        key={o}
                        type="button"
                        onClick={() => setFormData({ ...formData, orientation: o })}
                        className="badge"
                        style={{
                          backgroundColor: formData.orientation === o ? 'var(--accent-plum)' : 'var(--bg-surface-subtle)',
                          color: formData.orientation === o ? 'var(--text-inverse)' : 'var(--text-secondary)',
                          border: `1px solid ${formData.orientation === o ? 'var(--accent-plum)' : 'var(--border-default)'}`,
                          padding: '6px 12px',
                          fontSize: '11px',
                          cursor: 'pointer',
                          borderRadius: 'var(--radius-full)',
                        }}
                      >
                        {o}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* STEP 2: LOCATION & OCCUPATION */}
            {step === 2 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                <div>
                  <h2 style={{ fontSize: 'var(--font-size-xl)', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
                    Where are you based?
                  </h2>
                  <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-muted)', marginTop: '4px' }}>
                    Select your country and city to contextualize your timezone and regional community.
                  </p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 'var(--space-3)' }}>
                  <div>
                    <label style={{ fontSize: 'var(--font-size-xs)', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '6px', textTransform: 'uppercase' }}>
                      Country
                    </label>
                    <select
                      className="input"
                      value={GLOBAL_COUNTRIES.some(c => c.name === formData.country) ? formData.country : 'Other Country'}
                      onChange={(e) => {
                        const selectedCountry = e.target.value;
                        if (selectedCountry === 'Other Country') {
                          setFormData({ ...formData, country: '' });
                        } else {
                          const countryData = GLOBAL_COUNTRIES.find(c => c.name === selectedCountry);
                          const defaultCity = countryData && countryData.majorCities.length > 0 ? countryData.majorCities[0] : formData.city;
                          setFormData({ ...formData, country: selectedCountry, city: defaultCity });
                        }
                      }}
                      style={{ width: '100%', minHeight: '44px' }}
                    >
                      {GLOBAL_COUNTRIES.map((c) => (
                        <option key={c.code} value={c.name}>{c.name}</option>
                      ))}
                    </select>

                    {!GLOBAL_COUNTRIES.some(c => c.name === formData.country) && (
                      <input
                        type="text"
                        className="input"
                        value={formData.country}
                        onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                        placeholder="Type your country name..."
                        style={{ width: '100%', minHeight: '42px', marginTop: '6px' }}
                      />
                    )}
                  </div>

                  <div>
                    <label style={{ fontSize: 'var(--font-size-xs)', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '6px', textTransform: 'uppercase' }}>
                      City / Area
                    </label>
                    <input
                      type="text"
                      className="input"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      placeholder="e.g. Portland, London, Jakarta..."
                      style={{ width: '100%', minHeight: '44px' }}
                    />
                  </div>
                </div>

                {/* Major City Quick Picks */}
                {(() => {
                  const currentCountryData = GLOBAL_COUNTRIES.find(c => c.name === formData.country);
                  if (currentCountryData && currentCountryData.majorCities.length > 0) {
                    return (
                      <div>
                        <span style={{ fontSize: '11px', color: 'var(--text-muted)', display: 'block', marginBottom: '6px', fontWeight: 600 }}>
                          Suggested cities in {formData.country}:
                        </span>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
                          {currentCountryData.majorCities.map((city) => (
                            <button
                              key={city}
                              type="button"
                              onClick={() => setFormData({ ...formData, city })}
                              className="badge"
                              style={{
                                backgroundColor: formData.city === city ? 'var(--accent-plum)' : 'var(--bg-surface-subtle)',
                                color: formData.city === city ? 'var(--text-inverse)' : 'var(--text-secondary)',
                                border: `1px solid ${formData.city === city ? 'var(--accent-plum)' : 'var(--border-default)'}`,
                                padding: '4px 10px',
                                fontSize: '11px',
                                cursor: 'pointer',
                                borderRadius: 'var(--radius-full)',
                              }}
                            >
                              {city}
                            </button>
                          ))}
                        </div>
                      </div>
                    );
                  }
                  return null;
                })()}

                <div>
                  <label style={{ fontSize: 'var(--font-size-xs)', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '6px', textTransform: 'uppercase' }}>
                    Occupation / Craft
                  </label>
                  <input
                    type="text"
                    className="input"
                    value={formData.occupation}
                    onChange={(e) => setFormData({ ...formData, occupation: e.target.value })}
                    placeholder="What occupies your focus? (e.g. Architectural Conservator)"
                    style={{ width: '100%', minHeight: '44px' }}
                  />
                </div>
              </div>
            )}

            {/* STEP 3: RELATIONAL PACE & GOALS */}
            {step === 3 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                <div>
                  <h2 style={{ fontSize: 'var(--font-size-xl)', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
                    What kind of pace do you seek?
                  </h2>
                  <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-muted)', marginTop: '4px' }}>
                    Everfold matches around communication style and intentional relationship goals.
                  </p>
                </div>

                <div>
                  <label style={{ fontSize: 'var(--font-size-xs)', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '6px', textTransform: 'uppercase' }}>
                    Primary Relationship Goal
                  </label>
                  <input
                    type="text"
                    className="input"
                    value={formData.relationshipGoals}
                    onChange={(e) => setFormData({ ...formData, relationshipGoals: e.target.value })}
                    placeholder="e.g. Grounded, intentional partnership"
                    autoFocus
                    style={{ width: '100%', minHeight: '44px' }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 'var(--space-3)' }}>
                  <div>
                    <label style={{ fontSize: 'var(--font-size-xs)', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '6px', textTransform: 'uppercase' }}>
                      Social Energy
                    </label>
                    <select
                      className="input"
                      value={formData.socialEnergy}
                      onChange={(e) => setFormData({ ...formData, socialEnergy: e.target.value })}
                      style={{ width: '100%', minHeight: '44px' }}
                    >
                      <option value="Introvert">Introvert</option>
                      <option value="Ambivert">Ambivert</option>
                      <option value="Extrovert">Extrovert</option>
                      <option value="Quiet observer">Quiet observer</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ fontSize: 'var(--font-size-xs)', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '6px', textTransform: 'uppercase' }}>
                      Weekly Schedule Rhythm
                    </label>
                    <input
                      type="text"
                      className="input"
                      value={formData.schedule}
                      onChange={(e) => setFormData({ ...formData, schedule: e.target.value })}
                      placeholder="e.g. Evenings and unhurried weekends"
                      style={{ width: '100%', minHeight: '44px' }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ fontSize: 'var(--font-size-xs)', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '6px', textTransform: 'uppercase' }}>
                    Communication Style
                  </label>
                  <input
                    type="text"
                    className="input"
                    value={formData.communicationStyle}
                    onChange={(e) => setFormData({ ...formData, communicationStyle: e.target.value })}
                    placeholder="e.g. Direct and reflective, unhurried letters"
                    style={{ width: '100%', minHeight: '44px' }}
                  />
                </div>
              </div>
            )}

            {/* STEP 4: PASSIONS & INTERESTS */}
            {step === 4 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                <div>
                  <h2 style={{ fontSize: 'var(--font-size-xl)', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
                    Select your curated passions
                  </h2>
                  <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-muted)', marginTop: '4px' }}>
                    Pick at least 3 things that bring texture to your everyday life.
                  </p>
                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
                  {INTEREST_SUGGESTIONS.map((interest) => {
                    const isSelected = (formData.interests || []).includes(interest);
                    return (
                      <button
                        key={interest}
                        type="button"
                        onClick={() => toggleInterest(interest)}
                        className="badge"
                        style={{
                          backgroundColor: isSelected ? 'var(--accent-plum)' : 'var(--bg-surface-subtle)',
                          color: isSelected ? 'var(--text-inverse)' : 'var(--text-secondary)',
                          border: `1px solid ${isSelected ? 'var(--accent-plum)' : 'var(--border-default)'}`,
                          padding: '8px 14px',
                          fontSize: 'var(--font-size-xs)',
                          cursor: 'pointer',
                          borderRadius: 'var(--radius-full)',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                        }}
                      >
                        {isSelected && <Check size={12} />} {interest}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* STEP 5: MODULAR VECTOR AVATAR BUILDER */}
            {step === 5 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
                  <div>
                    <h2 style={{ fontSize: 'var(--font-size-xl)', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
                      Create your illustrated profile
                    </h2>
                    <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-muted)', marginTop: '2px' }}>
                      A warm, expressive portrait without photo-swipe pressure.
                    </p>
                  </div>

                  <button
                    type="button"
                    className="btn btn-secondary btn-xs"
                    onClick={handleRandomizeAvatar}
                    style={{ gap: '4px' }}
                  >
                    <Shuffle size={13} /> Randomize
                  </button>
                </div>

                {/* Avatar Preview Centerpiece */}
                <div className="onboarding-avatar-stage" style={{ display: 'flex', justifyContent: 'center', margin: 'var(--space-2) 0' }}>
                  <div
                    style={{
                      padding: 'var(--space-3)',
                      borderRadius: 'var(--radius-xl)',
                      backgroundColor: 'var(--bg-surface-subtle)',
                      border: '1px solid var(--border-subtle)',
                      boxShadow: 'var(--shadow-md)',
                      display: 'inline-flex',
                    }}
                  >
                    <AvatarRenderer config={formData.avatarConfig} size={180} enableIdle={true} />
                  </div>
                </div>

                {/* Skin Tone Selector */}
                <div>
                  <label style={{ fontSize: 'var(--font-size-xs)', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '6px', textTransform: 'uppercase' }}>
                    Skin Tone
                  </label>
                  <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap' }}>
                    {skinTones.map((tone) => (
                      <button
                        key={tone}
                        type="button"
                        onClick={() => updateAvatar('skinTone', tone)}
                        style={{
                          width: 36,
                          height: 36,
                          borderRadius: 'var(--radius-full)',
                          backgroundColor: tone,
                          border: formData.avatarConfig.skinTone === tone ? '3px solid var(--accent-plum)' : '1px solid var(--border-default)',
                          cursor: 'pointer',
                        }}
                      />
                    ))}
                  </div>
                </div>

                {/* Hair Color & Style */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--space-3)' }}>
                  <div>
                    <label style={{ fontSize: 'var(--font-size-xs)', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '6px', textTransform: 'uppercase' }}>
                      Hair Style
                    </label>
                    <select
                      className="input"
                      value={formData.avatarConfig.hairStyle}
                      onChange={(e) => updateAvatar('hairStyle', e.target.value)}
                      style={{ width: '100%', minHeight: '40px' }}
                    >
                      {['bob', 'pixie', 'crew', 'curtain_bangs', 'shoulder_waves', 'high_bun', 'side_part', 'afro'].map((h) => (
                        <option key={h} value={h}>{h.replace('_', ' ')}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label style={{ fontSize: 'var(--font-size-xs)', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '6px', textTransform: 'uppercase' }}>
                      Attire / Top
                    </label>
                    <select
                      className="input"
                      value={formData.avatarConfig.top}
                      onChange={(e) => updateAvatar('top', e.target.value)}
                      style={{ width: '100%', minHeight: '40px' }}
                    >
                      {['crew_sweater', 'collared_shirt', 'turtleneck', 'v_neck', 'hoodie'].map((t) => (
                        <option key={t} value={t}>{t.replace('_', ' ')}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Eyewear & Mood */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--space-3)' }}>
                  <div>
                    <label style={{ fontSize: 'var(--font-size-xs)', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '6px', textTransform: 'uppercase' }}>
                      Eyewear
                    </label>
                    <select
                      className="input"
                      value={formData.avatarConfig.glasses}
                      onChange={(e) => updateAvatar('glasses', e.target.value)}
                      style={{ width: '100%', minHeight: '40px' }}
                    >
                      {['none', 'wire_round', 'thick_square', 'aviator'].map((g) => (
                        <option key={g} value={g}>{g.replace('_', ' ')}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label style={{ fontSize: 'var(--font-size-xs)', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '6px', textTransform: 'uppercase' }}>
                      Mood Expression
                    </label>
                    <select
                      className="input"
                      value={formData.avatarConfig.moodExpression || 'warm'}
                      onChange={(e) => updateAvatar('moodExpression', e.target.value)}
                      style={{ width: '100%', minHeight: '40px' }}
                    >
                      {['warm', 'curious', 'joyful', 'grounded'].map((m) => (
                        <option key={m} value={m}>{m}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 6: CONFIRMATION & REVIEW */}
            {step === 6 && (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 'var(--space-4)' }}>
                <div
                  style={{
                    padding: 'var(--space-3)',
                    borderRadius: 'var(--radius-xl)',
                    backgroundColor: 'var(--bg-surface-subtle)',
                    border: '1px solid var(--border-subtle)',
                    display: 'inline-flex',
                    boxShadow: 'var(--shadow-md)',
                  }}
                >
                  <AvatarRenderer config={formData.avatarConfig} size={140} enableIdle={true} />
                </div>

                <div>
                  <h2 style={{ fontSize: 'var(--font-size-xl)', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
                    {formData.displayName}, {formData.age}
                  </h2>
                  <div style={{ color: 'var(--text-muted)', fontSize: 'var(--font-size-xs)', marginTop: '2px' }}>
                    @{formData.handle} • {formData.pronouns} {formData.genderIdentity ? `• ${formData.genderIdentity}` : ''}
                  </div>
                  <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-secondary)', marginTop: '4px' }}>
                    <MapPin size={12} color="var(--accent-plum)" style={{ display: 'inline', verticalAlign: 'middle' }} /> {formData.city}, {formData.country} • {formData.orientation}
                  </div>
                </div>

                <div className="ef-card-subtle" style={{ width: '100%', padding: 'var(--space-3) var(--space-4)', textAlign: 'left' }}>
                  <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                    Your Relational Rhythm
                  </div>
                  <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-primary)', fontWeight: 600, marginTop: '2px' }}>
                    {formData.relationshipGoals}
                  </div>
                </div>

                <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-muted)', margin: 0 }}>
                  Your profile is ready. You can refine your look, answers, and pace at any time from your profile settings.
                </p>
              </div>
            )}

            {/* Navigation Action Buttons */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border-subtle)', paddingTop: 'var(--space-4)', marginTop: 'var(--space-2)' }}>
              <button
                type="button"
                className="btn btn-secondary btn-sm"
                onClick={handleBack}
              >
                <ArrowLeft size={15} /> Back
              </button>

              <button
                type="button"
                className="btn btn-primary"
                onClick={handleNext}
                style={{ minHeight: '42px', padding: '0 24px' }}
              >
                {step === totalSteps ? 'Enter Everfold' : 'Continue'} <ArrowRight size={15} />
              </button>
            </div>
          </div>
        </div>
      )}

      {showCelebration && <MicroCelebration onComplete={() => setShowCelebration(false)} />}
    </div>
  );
};
