import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, CheckCircle, Plus, Send } from 'lucide-react';
import { useStoriesStore } from '../../store/storiesStore';
import { useProfileStore } from '../../store/profileStore';
import { SharedStory } from '../../types/socialEcosystem';

export const StorySubmissionWizard: React.FC = () => {
  const navigate = useNavigate();
  const { publishStory } = useStoriesStore();
  const { visitorProfile } = useProfileStore();

  const [step, setStep] = useState(1);
  const [title, setTitle] = useState('');
  const [partnerName, setPartnerName] = useState('');
  const [storyType, setStoryType] = useState<SharedStory['storyType']>('How We Met');
  const [summary, setSummary] = useState('');
  const [chapter1Title, setChapter1Title] = useState('Chapter 1: The Beginning');
  const [chapter1Body, setChapter1Body] = useState('');

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      // Publish story
      const created = publishStory({
        title: title || 'Our Unhurried Connection',
        coverStyle: 'gradient-warm',
        participantIds: [visitorProfile.id, 'usr_partner_local'],
        participantNames: [visitorProfile.displayName, partnerName || 'My Partner'],
        participantHandles: [visitorProfile.handle, 'partner'],
        relationshipId: `rel_user_${Date.now()}`,
        summary: summary || 'A quiet relationship chronicle authored on Everfold.',
        storyType,
        storyTier: 0,
        chapters: [
          {
            id: `ch_${Date.now()}`,
            title: chapter1Title,
            date: new Date().toISOString().split('T')[0],
            body: chapter1Body || 'We met over a shared appreciation for quiet afternoons and slow conversation.',
          },
        ],
      });

      navigate(`/stories/${created.id}`);
    }
  };

  return (
    <div className="story-submission-wizard" style={{ maxWidth: '640px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <button className="btn btn-ghost" onClick={() => step > 1 ? setStep(step - 1) : navigate('/stories')} style={{ gap: 'var(--space-1)', fontSize: 'var(--font-size-xs)' }}>
          <ArrowLeft size={15} /> {step > 1 ? 'Previous Step' : 'Cancel'}
        </button>
        <span style={{ fontSize: 'var(--font-size-xs)', fontWeight: 600, color: 'var(--text-muted)' }}>
          Step {step} of 3
        </span>
      </div>

      <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', backgroundColor: 'var(--bg-surface)' }}>
        {step === 1 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
            <h1 style={{ fontSize: 'var(--font-size-lg)', fontWeight: 700, margin: 0 }}>Step 1: Story Details & Partner</h1>
            <div>
              <label style={{ fontSize: 'var(--font-size-xs)', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
                Story Title:
              </label>
              <input
                type="text"
                className="input"
                placeholder="e.g. Two Cups of Tea on a Tuesday"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                style={{ width: '100%', fontSize: 'var(--font-size-xs)' }}
              />
            </div>

            <div>
              <label style={{ fontSize: 'var(--font-size-xs)', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
                Partner Name / Display Handle:
              </label>
              <input
                type="text"
                className="input"
                placeholder="e.g. Rafael Alvarez"
                value={partnerName}
                onChange={(e) => setPartnerName(e.target.value)}
                style={{ width: '100%', fontSize: 'var(--font-size-xs)' }}
              />
            </div>

            <div>
              <label style={{ fontSize: 'var(--font-size-xs)', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
                Story Type:
              </label>
              <select
                className="input"
                value={storyType}
                onChange={(e) => setStoryType(e.target.value as any)}
                style={{ width: '100%', fontSize: 'var(--font-size-xs)' }}
              >
                <option value="How We Met">How We Met</option>
                <option value="Dating After Grief">Dating After Grief</option>
                <option value="Long Distance">Long Distance</option>
                <option value="Moving In">Moving In</option>
                <option value="Kind Breakups">Kind Breakups</option>
                <option value="Second Chances">Second Chances</option>
              </select>
            </div>
          </div>
        )}

        {step === 2 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
            <h1 style={{ fontSize: 'var(--font-size-lg)', fontWeight: 700, margin: 0 }}>Step 2: Summary Synopsis</h1>
            <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-secondary)', margin: 0 }}>
              Write a 1-2 sentence overview for the community feed:
            </p>
            <textarea
              className="input"
              rows={4}
              placeholder="e.g. A book conservator and an archivist cross paths over misdelivered marbled paper in Boston..."
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              style={{ width: '100%', fontSize: 'var(--font-size-xs)', lineHeight: 1.5 }}
            />
          </div>
        )}

        {step === 3 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
            <h1 style={{ fontSize: 'var(--font-size-lg)', fontWeight: 700, margin: 0 }}>Step 3: Chapter 1 Entry</h1>
            <div>
              <label style={{ fontSize: 'var(--font-size-xs)', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
                Chapter 1 Title:
              </label>
              <input
                type="text"
                className="input"
                value={chapter1Title}
                onChange={(e) => setChapter1Title(e.target.value)}
                style={{ width: '100%', fontSize: 'var(--font-size-xs)' }}
              />
            </div>

            <div>
              <label style={{ fontSize: 'var(--font-size-xs)', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
                Chapter Narrative:
              </label>
              <textarea
                className="input"
                rows={6}
                placeholder="Narrate your first date or meaningful milestone in your own words..."
                value={chapter1Body}
                onChange={(e) => setChapter1Body(e.target.value)}
                style={{ width: '100%', fontSize: 'var(--font-size-xs)', lineHeight: 1.6 }}
              />
            </div>
          </div>
        )}

        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 'var(--space-2)' }}>
          {step > 1 ? (
            <button className="btn btn-ghost" onClick={() => setStep(step - 1)} style={{ fontSize: 'var(--font-size-xs)' }}>
              Back
            </button>
          ) : <div />}
          <button className="btn btn-primary" onClick={handleNext} style={{ fontSize: 'var(--font-size-xs)', minWidth: '120px' }}>
            {step === 3 ? 'Publish Story' : 'Next Step'} <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};
