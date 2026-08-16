import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Save,
  ArrowLeft,
  Plus,
  Trash2,
  AlertCircle,
  CheckCircle2,
  Sparkles,
  User,
  Heart,
  MessageSquare,
  Shield,
  Eye,
  Sliders,
} from 'lucide-react';
import { useProfileStore } from '../../store/profileStore';
import { soundEngine } from '../../audio/soundEngine';
import { UndoToast } from '../../components/common/UndoToast';
import { MicroCelebration } from '../../components/common/MicroCelebration';
import { GLOBAL_COUNTRIES } from '../../data/locations';

const GENDER_SUGGESTIONS = [
  'Nonbinary',
  'Woman',
  'Man',
  'Genderfluid',
  'Agender',
  'Questioning',
  'Self-describe',
  'Prefer not to say',
];

const PRONOUN_SUGGESTIONS = [
  'they/them',
  'she/her',
  'he/him',
  'they/she',
  'they/he',
  'any/all',
  'Custom',
];

const SEXUALITY_SUGGESTIONS = [
  'Open-minded / Queer',
  'Lesbian',
  'Gay',
  'Bisexual',
  'Pansexual',
  'Asexual / Demisexual',
  'Straight',
  'Questioning',
  'Custom',
];

const PROMPT_SUGGESTIONS = [
  'My ideal Sunday evening looks like',
  'A boundary I hold firmly',
  'Something I am quietly proud of',
  'The kind of conversation that energizes me',
  'A small ritual that grounds my day',
  'How I navigate conflict with care',
];

export const ProfileEditScreen: React.FC = () => {
  const navigate = useNavigate();
  const { visitorProfile, patchVisitorProfile, undoProfileEdit } = useProfileStore();

  // Active section tab for mobile & desktop
  const [activeSection, setActiveSection] = useState<'basics' | 'about' | 'connect' | 'matters' | 'prompts' | 'privacy'>('basics');

  // Form State initialized from existing visitor profile
  const [displayName, setDisplayName] = useState(visitorProfile.displayName || '');
  const [handle, setHandle] = useState(visitorProfile.handle || '');
  const [age, setAge] = useState<number>(visitorProfile.age || 32);
  const [genderIdentity, setGenderIdentity] = useState<string>(visitorProfile.genderIdentity || '');
  const [isCustomGender, setIsCustomGender] = useState<boolean>(
    Boolean(visitorProfile.genderIdentity && !GENDER_SUGGESTIONS.includes(visitorProfile.genderIdentity))
  );
  const [pronouns, setPronouns] = useState(visitorProfile.pronouns || 'they/them');
  const [orientation, setOrientation] = useState(visitorProfile.orientation || 'Open-minded / Queer');
  const [city, setCity] = useState(visitorProfile.city || '');
  const [country, setCountry] = useState(visitorProfile.country || 'USA');

  const [occupation, setOccupation] = useState(visitorProfile.occupation || '');
  const [languagesStr, setLanguagesStr] = useState((visitorProfile.languages || []).join(', '));
  const [goals, setGoals] = useState(visitorProfile.relationshipGoals || '');

  const [commStyle, setCommStyle] = useState(visitorProfile.communicationStyle || '');
  const [socialEnergy, setSocialEnergy] = useState(visitorProfile.socialEnergy || 'Ambivert');
  const [schedule, setSchedule] = useState(visitorProfile.schedule || 'Evenings and weekends');

  const [interestsStr, setInterestsStr] = useState((visitorProfile.interests || []).join(', '));
  const [boundariesStr, setBoundariesStr] = useState((visitorProfile.boundaries || []).join(', '));
  const [dealBreakersStr, setDealBreakersStr] = useState((visitorProfile.dealBreakers || []).join(', '));

  const [prompts, setPrompts] = useState(visitorProfile.profilePromptAnswers || []);
  const [visibility, setVisibility] = useState<'public' | 'matches_only' | 'hidden'>(
    visitorProfile.visibility === 'archived' ? 'hidden' : visitorProfile.visibility || 'public'
  );

  // Validation & UI State
  const [validationError, setValidationError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [showUndoToast, setShowUndoToast] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);

  const handleGenderSelect = (val: string) => {
    if (val === 'Self-describe') {
      setIsCustomGender(true);
      setGenderIdentity('');
    } else {
      setIsCustomGender(false);
      setGenderIdentity(val);
    }
  };

  const handlePromptChange = (id: string, newAnswer: string) => {
    setPrompts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, answer: newAnswer } : p))
    );
  };

  const handleAddPrompt = () => {
    const unused = PROMPT_SUGGESTIONS.find((ps) => !prompts.some((p) => p.question === ps)) || 'A thought I hold gently';
    const newP = {
      id: `vp_${Date.now()}`,
      question: unused,
      answer: '',
    };
    setPrompts((prev) => [...prev, newP]);
  };

  const handleRemovePrompt = (id: string) => {
    setPrompts((prev) => prev.filter((p) => p.id !== id));
  };

  const handleSave = (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    // Age Safety Validation
    if (isNaN(age) || age < 18) {
      setValidationError('Everfold is an adult platform. Age must be 18 or older.');
      soundEngine.playCue('ui.error');
      return;
    }

    if (!displayName.trim()) {
      setValidationError('Display name is required.');
      return;
    }

    setValidationError(null);
    setIsSaving(true);
    soundEngine.playCue('ui.save');

    const cleanInterests = interestsStr.split(',').map((s) => s.trim()).filter(Boolean);
    const cleanBoundaries = boundariesStr.split(',').map((s) => s.trim()).filter(Boolean);
    const cleanDealBreakers = dealBreakersStr.split(',').map((s) => s.trim()).filter(Boolean);
    const cleanLanguages = languagesStr.split(',').map((s) => s.trim()).filter(Boolean);

    patchVisitorProfile({
      displayName: displayName.trim(),
      handle: handle.trim().replace(/^@/, ''),
      age: Number(age),
      genderIdentity: genderIdentity.trim() || null,
      pronouns: pronouns.trim(),
      orientation: orientation.trim(),
      city: city.trim(),
      country: country.trim(),
      occupation: occupation.trim(),
      languages: cleanLanguages,
      relationshipGoals: goals.trim(),
      communicationStyle: commStyle.trim(),
      socialEnergy: socialEnergy.trim(),
      schedule: schedule.trim(),
      interests: cleanInterests,
      boundaries: cleanBoundaries,
      dealBreakers: cleanDealBreakers,
      profilePromptAnswers: prompts,
      visibility,
    });

    setIsSaving(false);
    setShowCelebration(true);
    setShowUndoToast(true);
  };

  const handleUndo = () => {
    const success = undoProfileEdit();
    if (success) {
      // Re-sync local form state from rolled back profile
      const restored = useProfileStore.getState().visitorProfile;
      setDisplayName(restored.displayName);
      setHandle(restored.handle);
      setAge(restored.age);
      setGenderIdentity(restored.genderIdentity || '');
      setPronouns(restored.pronouns);
      setOrientation(restored.orientation);
      setCity(restored.city);
      setCountry(restored.country);
      setOccupation(restored.occupation);
      setGoals(restored.relationshipGoals);
      setCommStyle(restored.communicationStyle);
      setSocialEnergy(restored.socialEnergy);
      setInterestsStr((restored.interests || []).join(', '));
      setPrompts(restored.profilePromptAnswers || []);
    }
  };

  return (
    <div
      className="profile-edit-screen"
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-5)',
        maxWidth: '780px',
        margin: '0 auto',
        width: '100%',
        paddingBottom: '80px', // Room for sticky bottom save bar
      }}
    >
      {/* Top Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 'var(--space-3)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
          <button
            type="button"
            className="btn-ghost"
            onClick={() => navigate('/profile')}
            style={{ width: 38, height: 38, padding: 0 }}
            aria-label="Back to profile"
          >
            <ArrowLeft size={18} />
          </button>
          <div>
            <h1 style={{ fontSize: 'clamp(1.4rem, 2.5vw, 1.8rem)', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
              Edit Profile Identity
            </h1>
            <p style={{ color: 'var(--text-muted)', fontSize: 'var(--font-size-xs)', margin: '2px 0 0 0' }}>
              Refine your presence. Changes apply immediately and can be undone.
            </p>
          </div>
        </div>

        <button
          type="button"
          className="btn btn-primary"
          onClick={() => handleSave()}
          disabled={isSaving}
          style={{ minHeight: '40px' }}
        >
          <Save size={15} /> {isSaving ? 'Saving...' : 'Save Profile'}
        </button>
      </div>

      {/* Validation Error Banner */}
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
            gap: 'var(--space-3)',
            borderRadius: 'var(--radius-md)',
            fontSize: 'var(--font-size-sm)',
            fontWeight: 600,
          }}
          role="alert"
        >
          <AlertCircle size={18} />
          <span>{validationError}</span>
        </div>
      )}

      {/* Section Navigation Tabs (Horizontal Scrollable Chips) */}
      <div
        style={{
          display: 'flex',
          gap: 'var(--space-2)',
          overflowX: 'auto',
          paddingBottom: 'var(--space-2)',
          scrollbarWidth: 'none',
        }}
        role="tablist"
      >
        {[
          { id: 'basics', label: '1. Basics', icon: User },
          { id: 'about', label: '2. About', icon: Sparkles },
          { id: 'connect', label: '3. Connection', icon: Heart },
          { id: 'matters', label: '4. Values & Fit', icon: Sliders },
          { id: 'prompts', label: '5. Prompts', icon: MessageSquare },
          { id: 'privacy', label: '6. Privacy', icon: Shield },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeSection === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => {
                soundEngine.playCue('ui.navigation');
                setActiveSection(tab.id as any);
              }}
              className="badge"
              style={{
                backgroundColor: isActive ? 'var(--accent-plum)' : 'var(--bg-surface)',
                color: isActive ? 'var(--text-inverse)' : 'var(--text-secondary)',
                border: `1px solid ${isActive ? 'var(--accent-plum)' : 'var(--border-default)'}`,
                padding: '8px 14px',
                fontSize: 'var(--font-size-xs)',
                fontWeight: isActive ? 700 : 500,
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                borderRadius: 'var(--radius-full)',
                flexShrink: 0,
              }}
              role="tab"
              aria-selected={isActive}
            >
              <Icon size={13} /> {tab.label}
            </button>
          );
        })}
      </div>

      {/* Main Form Container */}
      <form onSubmit={handleSave} className="ef-card" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
        {/* SECTION 1: BASICS */}
        {activeSection === 'basics' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 'var(--space-3)' }}>
              <div>
                <label style={{ fontSize: 'var(--font-size-xs)', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '6px', textTransform: 'uppercase' }}>
                  Name / Display Name *
                </label>
                <input
                  type="text"
                  className="input"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  placeholder="Your public name"
                  required
                  style={{ width: '100%', minHeight: '42px' }}
                />
              </div>

              <div>
                <label style={{ fontSize: 'var(--font-size-xs)', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '6px', textTransform: 'uppercase' }}>
                  Handle *
                </label>
                <input
                  type="text"
                  className="input"
                  value={handle}
                  onChange={(e) => setHandle(e.target.value)}
                  placeholder="e.g. alexrivers"
                  required
                  style={{ width: '100%', minHeight: '42px' }}
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 'var(--space-3)' }}>
              <div>
                <label style={{ fontSize: 'var(--font-size-xs)', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '6px', textTransform: 'uppercase' }}>
                  Age (18+) *
                </label>
                <input
                  type="number"
                  className="input"
                  value={age}
                  onChange={(e) => setAge(parseInt(e.target.value, 10))}
                  min={18}
                  max={120}
                  required
                  style={{ width: '100%', minHeight: '42px' }}
                />
              </div>

              <div>
                <label style={{ fontSize: 'var(--font-size-xs)', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '6px', textTransform: 'uppercase' }}>
                  Pronouns
                </label>
                <select
                  className="input"
                  value={PRONOUN_SUGGESTIONS.includes(pronouns) ? pronouns : 'Custom'}
                  onChange={(e) => {
                    if (e.target.value !== 'Custom') setPronouns(e.target.value);
                  }}
                  style={{ width: '100%', minHeight: '42px' }}
                >
                  {PRONOUN_SUGGESTIONS.map((p) => (
                    <option key={p} value={p}>{p}</option>
                  ))}
                </select>
                {!PRONOUN_SUGGESTIONS.filter((p) => p !== 'Custom').includes(pronouns) && (
                  <input
                    type="text"
                    className="input"
                    value={pronouns}
                    onChange={(e) => setPronouns(e.target.value)}
                    placeholder="Enter your pronouns"
                    style={{ width: '100%', minHeight: '42px', marginTop: '6px' }}
                  />
                )}
              </div>

              <div>
                <label style={{ fontSize: 'var(--font-size-xs)', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '6px', textTransform: 'uppercase' }}>
                  Sexuality / Orientation
                </label>
                <select
                  className="input"
                  value={SEXUALITY_SUGGESTIONS.includes(orientation) ? orientation : 'Custom'}
                  onChange={(e) => {
                    if (e.target.value !== 'Custom') setOrientation(e.target.value);
                  }}
                  style={{ width: '100%', minHeight: '42px' }}
                >
                  {SEXUALITY_SUGGESTIONS.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
                {!SEXUALITY_SUGGESTIONS.filter((s) => s !== 'Custom').includes(orientation) && (
                  <input
                    type="text"
                    className="input"
                    value={orientation}
                    onChange={(e) => setOrientation(e.target.value)}
                    placeholder="Describe your orientation"
                    style={{ width: '100%', minHeight: '42px', marginTop: '6px' }}
                  />
                )}
              </div>
            </div>

            {/* Gender Identity (Additive Safe Field) */}
            <div>
              <label style={{ fontSize: 'var(--font-size-xs)', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '6px', textTransform: 'uppercase' }}>
                Gender Identity (Optional)
              </label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)', marginBottom: '8px' }}>
                {GENDER_SUGGESTIONS.map((g) => {
                  const isSelected = (genderIdentity === g && !isCustomGender) || (g === 'Self-describe' && isCustomGender);
                  return (
                    <button
                      key={g}
                      type="button"
                      onClick={() => handleGenderSelect(g)}
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

              {isCustomGender && (
                <input
                  type="text"
                  className="input"
                  placeholder="Self-describe your gender identity..."
                  value={genderIdentity}
                  onChange={(e) => setGenderIdentity(e.target.value)}
                  style={{ width: '100%', minHeight: '42px' }}
                />
              )}
            </div>

            {/* Location */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--space-3)' }}>
              <div>
                <label style={{ fontSize: 'var(--font-size-xs)', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '6px', textTransform: 'uppercase' }}>
                  Country
                </label>
                <select
                  className="input"
                  value={GLOBAL_COUNTRIES.some(c => c.name === country) ? country : 'Other Country'}
                  onChange={(e) => {
                    const selectedCountry = e.target.value;
                    if (selectedCountry === 'Other Country') {
                      setCountry('');
                    } else {
                      const countryData = GLOBAL_COUNTRIES.find(c => c.name === selectedCountry);
                      const defaultCity = countryData && countryData.majorCities.length > 0 ? countryData.majorCities[0] : city;
                      setCountry(selectedCountry);
                      if (!city) setCity(defaultCity);
                    }
                  }}
                  style={{ width: '100%', minHeight: '42px' }}
                >
                  {GLOBAL_COUNTRIES.map((c) => (
                    <option key={c.code} value={c.name}>{c.name}</option>
                  ))}
                </select>
                {!GLOBAL_COUNTRIES.some(c => c.name === country) && (
                  <input
                    type="text"
                    className="input"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
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
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="e.g. Portland, London, Jakarta..."
                  style={{ width: '100%', minHeight: '42px' }}
                />
              </div>
            </div>

            {/* Major City Quick Picks */}
            {(() => {
              const currentCountryData = GLOBAL_COUNTRIES.find(c => c.name === country);
              if (currentCountryData && currentCountryData.majorCities.length > 0) {
                return (
                  <div>
                    <span style={{ fontSize: '11px', color: 'var(--text-muted)', display: 'block', marginBottom: '6px', fontWeight: 600 }}>
                      Suggested cities in {country}:
                    </span>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
                      {currentCountryData.majorCities.map((cName) => (
                        <button
                          key={cName}
                          type="button"
                          onClick={() => setCity(cName)}
                          className="badge"
                          style={{
                            backgroundColor: city === cName ? 'var(--accent-plum)' : 'var(--bg-surface-subtle)',
                            color: city === cName ? 'var(--text-inverse)' : 'var(--text-secondary)',
                            border: `1px solid ${city === cName ? 'var(--accent-plum)' : 'var(--border-default)'}`,
                            padding: '4px 10px',
                            fontSize: '11px',
                            cursor: 'pointer',
                            borderRadius: 'var(--radius-full)',
                          }}
                        >
                          {cName}
                        </button>
                      ))}
                    </div>
                  </div>
                );
              }
              return null;
            })()}
          </div>
        )}

        {/* SECTION 2: ABOUT */}
        {activeSection === 'about' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            <div>
              <label style={{ fontSize: 'var(--font-size-xs)', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '6px', textTransform: 'uppercase' }}>
                Occupation / Craft
              </label>
              <input
                type="text"
                className="input"
                value={occupation}
                onChange={(e) => setOccupation(e.target.value)}
                placeholder="What fills your days?"
                style={{ width: '100%', minHeight: '42px' }}
              />
            </div>

            <div>
              <label style={{ fontSize: 'var(--font-size-xs)', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '6px', textTransform: 'uppercase' }}>
                Languages (comma separated)
              </label>
              <input
                type="text"
                className="input"
                value={languagesStr}
                onChange={(e) => setLanguagesStr(e.target.value)}
                placeholder="e.g. English, French, Japanese"
                style={{ width: '100%', minHeight: '42px' }}
              />
            </div>

            <div>
              <label style={{ fontSize: 'var(--font-size-xs)', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '6px', textTransform: 'uppercase' }}>
                Relationship Goals
              </label>
              <textarea
                className="textarea"
                rows={3}
                value={goals}
                onChange={(e) => setGoals(e.target.value)}
                placeholder="What kind of rhythm or partnership are you holding space for?"
                style={{ width: '100%', resize: 'vertical' }}
              />
            </div>
          </div>
        )}

        {/* SECTION 3: HOW YOU CONNECT */}
        {activeSection === 'connect' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            <div>
              <label style={{ fontSize: 'var(--font-size-xs)', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '6px', textTransform: 'uppercase' }}>
                Communication Style & Pacing
              </label>
              <input
                type="text"
                className="input"
                value={commStyle}
                onChange={(e) => setCommStyle(e.target.value)}
                placeholder="e.g. Direct and reflective, unhurried letters"
                style={{ width: '100%', minHeight: '42px' }}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 'var(--space-3)' }}>
              <div>
                <label style={{ fontSize: 'var(--font-size-xs)', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '6px', textTransform: 'uppercase' }}>
                  Social Energy
                </label>
                <select
                  className="input"
                  value={socialEnergy}
                  onChange={(e) => setSocialEnergy(e.target.value)}
                  style={{ width: '100%', minHeight: '42px' }}
                >
                  <option value="Introvert">Introvert</option>
                  <option value="Ambivert">Ambivert</option>
                  <option value="Extrovert">Extrovert</option>
                  <option value="Quiet observer">Quiet observer</option>
                  <option value="Dynamic host">Dynamic host</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: 'var(--font-size-xs)', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '6px', textTransform: 'uppercase' }}>
                  Schedule Rhythm
                </label>
                <input
                  type="text"
                  className="input"
                  value={schedule}
                  onChange={(e) => setSchedule(e.target.value)}
                  placeholder="e.g. Evenings and slow weekends"
                  style={{ width: '100%', minHeight: '42px' }}
                />
              </div>
            </div>
          </div>
        )}

        {/* SECTION 4: WHAT MATTERS (Values & Fit) */}
        {activeSection === 'matters' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            <div>
              <label style={{ fontSize: 'var(--font-size-xs)', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '6px', textTransform: 'uppercase' }}>
                Curated Interests (comma separated)
              </label>
              <input
                type="text"
                className="input"
                value={interestsStr}
                onChange={(e) => setInterestsStr(e.target.value)}
                placeholder="e.g. Architecture, Ceramics, Tea Ceremony, Film Photography"
                style={{ width: '100%', minHeight: '42px' }}
              />
            </div>

            <div>
              <label style={{ fontSize: 'var(--font-size-xs)', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '6px', textTransform: 'uppercase' }}>
                Boundaries & Care Points (comma separated)
              </label>
              <input
                type="text"
                className="input"
                value={boundariesStr}
                onChange={(e) => setBoundariesStr(e.target.value)}
                placeholder="e.g. Emotional honesty, Respecting creative quiet"
                style={{ width: '100%', minHeight: '42px' }}
              />
            </div>

            <div>
              <label style={{ fontSize: 'var(--font-size-xs)', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '6px', textTransform: 'uppercase' }}>
                Deal-Breakers (comma separated)
              </label>
              <input
                type="text"
                className="input"
                value={dealBreakersStr}
                onChange={(e) => setDealBreakersStr(e.target.value)}
                placeholder="e.g. Inauthenticity, Passive-aggression"
                style={{ width: '100%', minHeight: '42px' }}
              />
            </div>
          </div>
        )}

        {/* SECTION 5: PROMPTS */}
        {activeSection === 'prompts' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-muted)' }}>
                Share moments and perspectives to make opening a conversation easy.
              </div>
              <button
                type="button"
                className="btn btn-secondary btn-xs"
                onClick={handleAddPrompt}
                style={{ gap: '4px' }}
              >
                <Plus size={13} /> Add Prompt
              </button>
            </div>

            {prompts.map((p, idx) => (
              <div
                key={p.id}
                className="ef-card-subtle"
                style={{
                  padding: 'var(--space-3) var(--space-4)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 'var(--space-2)',
                  borderRadius: 'var(--radius-md)',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <select
                    className="input"
                    value={p.question}
                    onChange={(e) => {
                      const newQ = e.target.value;
                      setPrompts((prev) => prev.map((pr) => (pr.id === p.id ? { ...pr, question: newQ } : pr)));
                    }}
                    style={{ flex: 1, fontWeight: 700, fontSize: 'var(--font-size-xs)', minHeight: '34px' }}
                  >
                    {PROMPT_SUGGESTIONS.map((q) => (
                      <option key={q} value={q}>{q}</option>
                    ))}
                  </select>

                  <button
                    type="button"
                    className="btn-ghost"
                    onClick={() => handleRemovePrompt(p.id)}
                    style={{ width: 28, height: 28, padding: 0, color: 'var(--text-muted)' }}
                    aria-label="Remove prompt"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>

                <textarea
                  className="textarea"
                  rows={2}
                  value={p.answer}
                  onChange={(e) => handlePromptChange(p.id, e.target.value)}
                  placeholder="Your reflection..."
                  style={{ width: '100%', resize: 'vertical', fontSize: 'var(--font-size-sm)' }}
                />
                <div style={{ display: 'flex', justifyContent: 'flex-end', fontSize: '10px', color: 'var(--text-muted)' }}>
                  {p.answer.length} characters
                </div>
              </div>
            ))}
          </div>
        )}

        {/* SECTION 6: PRIVACY & VISIBILITY */}
        {activeSection === 'privacy' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            <div>
              <label style={{ fontSize: 'var(--font-size-xs)', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '6px', textTransform: 'uppercase' }}>
                Profile Visibility
              </label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                {[
                  { id: 'public', title: 'Public (Recommended)', desc: 'Discoverable by all respectful members in your rhythm pool.' },
                  { id: 'matches_only', title: 'Matches Only', desc: 'Visible only to members you have mutually connected with.' },
                  { id: 'hidden', title: 'Quiet Mode / Hidden', desc: 'Pauses profile discovery while preserving all conversations and history.' },
                ].map((v) => (
                  <label
                    key={v.id}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: 'var(--space-3)',
                      padding: 'var(--space-3)',
                      backgroundColor: visibility === v.id ? 'var(--accent-surface)' : 'var(--bg-surface-subtle)',
                      border: `1px solid ${visibility === v.id ? 'var(--accent-plum)' : 'var(--border-subtle)'}`,
                      borderRadius: 'var(--radius-md)',
                      cursor: 'pointer',
                    }}
                  >
                    <input
                      type="radio"
                      name="visibility"
                      value={v.id}
                      checked={visibility === v.id}
                      onChange={() => setVisibility(v.id as any)}
                      style={{ marginTop: '3px' }}
                    />
                    <div>
                      <div style={{ fontSize: 'var(--font-size-xs)', fontWeight: 700, color: 'var(--text-primary)' }}>
                        {v.title}
                      </div>
                      <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>
                        {v.desc}
                      </div>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </div>
        )}
      </form>

      {/* Sticky Mobile/Desktop Bottom Action Bar */}
      <div
        className="sticky-save-bar"
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: 'var(--bg-surface)',
          borderTop: '1px solid var(--border-default)',
          padding: '12px 20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          zIndex: 990,
          boxShadow: '0 -4px 16px rgba(0,0,0,0.06)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={() => navigate('/profile')}
          >
            Cancel
          </button>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => handleSave()}
            disabled={isSaving}
            style={{ minHeight: '40px', padding: '0 24px' }}
          >
            <Save size={15} /> {isSaving ? 'Saving...' : 'Save Profile'}
          </button>
        </div>
      </div>

      {/* Undo Toast & Micro Celebration */}
      {showUndoToast && (
        <UndoToast
          message="Profile changes saved successfully."
          onUndo={handleUndo}
          onDismiss={() => setShowUndoToast(false)}
        />
      )}

      {showCelebration && (
        <MicroCelebration onComplete={() => setShowCelebration(false)} />
      )}
    </div>
  );
};
