import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Save, ArrowLeft, Plus, Trash2 } from 'lucide-react';
import { useProfileStore } from '../../store/profileStore';
import { soundEngine } from '../../audio/soundEngine';

export const ProfileEditScreen: React.FC = () => {
  const navigate = useNavigate();
  const { visitorProfile, updateVisitorProfile } = useProfileStore();

  const [displayName, setDisplayName] = useState(visitorProfile.displayName);
  const [handle, setHandle] = useState(visitorProfile.handle);
  const [age, setAge] = useState(visitorProfile.age);
  const [pronouns, setPronouns] = useState(visitorProfile.pronouns);
  const [city, setCity] = useState(visitorProfile.city);
  const [occupation, setOccupation] = useState(visitorProfile.occupation);
  const [goals, setGoals] = useState(visitorProfile.relationshipGoals);
  const [commStyle, setCommStyle] = useState(visitorProfile.communicationStyle);
  const [socialEnergy, setSocialEnergy] = useState(visitorProfile.socialEnergy);
  const [interestsStr, setInterestsStr] = useState(visitorProfile.interests.join(', '));
  const [prompts, setPrompts] = useState(visitorProfile.profilePromptAnswers);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    soundEngine.playCue('ui.save');
    updateVisitorProfile({
      displayName,
      handle,
      age: Number(age),
      pronouns,
      city,
      occupation,
      relationshipGoals: goals,
      communicationStyle: commStyle,
      socialEnergy,
      interests: interestsStr.split(',').map((s) => s.trim()).filter(Boolean),
      profilePromptAnswers: prompts
    });
    navigate('/profile');
  };

  const handlePromptChange = (id: string, newAnswer: string) => {
    setPrompts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, answer: newAnswer } : p))
    );
  };

  return (
    <div className="profile-edit-screen" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)', maxWidth: '720px', margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
        <button className="btn-ghost" onClick={() => navigate('/profile')} style={{ width: 36, height: 36, padding: 0 }}>
          <ArrowLeft size={18} />
        </button>
        <h1 style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 700 }}>Edit Profile Information</h1>
      </div>

      <form onSubmit={handleSave} className="card" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-3)' }}>
          <div>
            <label style={{ fontSize: 'var(--font-size-xs)', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
              Display Name:
            </label>
            <input type="text" className="input" value={displayName} onChange={(e) => setDisplayName(e.target.value)} required />
          </div>
          <div>
            <label style={{ fontSize: 'var(--font-size-xs)', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
              Handle:
            </label>
            <input type="text" className="input" value={handle} onChange={(e) => setHandle(e.target.value)} required />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 'var(--space-3)' }}>
          <div>
            <label style={{ fontSize: 'var(--font-size-xs)', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
              Age:
            </label>
            <input type="number" className="input" value={age} onChange={(e) => setAge(Number(e.target.value))} required min={18} max={120} />
          </div>
          <div>
            <label style={{ fontSize: 'var(--font-size-xs)', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
              Pronouns:
            </label>
            <input type="text" className="input" value={pronouns} onChange={(e) => setPronouns(e.target.value)} />
          </div>
          <div>
            <label style={{ fontSize: 'var(--font-size-xs)', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
              City:
            </label>
            <input type="text" className="input" value={city} onChange={(e) => setCity(e.target.value)} required />
          </div>
        </div>

        <div>
          <label style={{ fontSize: 'var(--font-size-xs)', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
            Occupation:
          </label>
          <input type="text" className="input" value={occupation} onChange={(e) => setOccupation(e.target.value)} />
        </div>

        <div>
          <label style={{ fontSize: 'var(--font-size-xs)', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
            Relationship Goal:
          </label>
          <input type="text" className="input" value={goals} onChange={(e) => setGoals(e.target.value)} />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-3)' }}>
          <div>
            <label style={{ fontSize: 'var(--font-size-xs)', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
              Communication Style:
            </label>
            <input type="text" className="input" value={commStyle} onChange={(e) => setCommStyle(e.target.value)} />
          </div>
          <div>
            <label style={{ fontSize: 'var(--font-size-xs)', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
              Social Energy:
            </label>
            <input type="text" className="input" value={socialEnergy} onChange={(e) => setSocialEnergy(e.target.value)} />
          </div>
        </div>

        <div>
          <label style={{ fontSize: 'var(--font-size-xs)', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
            Interests (comma separated):
          </label>
          <input type="text" className="input" value={interestsStr} onChange={(e) => setInterestsStr(e.target.value)} />
        </div>

        {/* Prompts Editing */}
        <div>
          <label style={{ fontSize: 'var(--font-size-xs)', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: 'var(--space-2)' }}>
            Profile Prompts:
          </label>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
            {prompts.map((p) => (
              <div key={p.id} style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <span style={{ fontSize: 'var(--font-size-xs)', fontWeight: 600 }}>{p.question}</span>
                <textarea
                  className="textarea"
                  rows={2}
                  value={p.answer}
                  onChange={(e) => handlePromptChange(p.id, e.target.value)}
                />
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--space-2)', marginTop: 'var(--space-2)' }}>
          <button type="button" className="btn btn-ghost" onClick={() => navigate('/profile')}>
            Cancel
          </button>
          <button type="submit" className="btn btn-primary">
            <Save size={16} /> Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};
