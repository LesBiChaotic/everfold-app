import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  Key,
  Bookmark,
  Link,
  Plus,
  Trash2,
  FileText,
  Search,
  Filter,
  CheckCircle,
  HelpCircle,
  TrendingUp,
  AlertTriangle,
  Sparkles,
} from 'lucide-react';
import { useARGStore } from '../../store/argStore';
import { Foldmark } from '../../components/brand/Foldmark';
import { soundEngine } from '../../audio/soundEngine';
import { EvidenceItem, TheoryStatus } from '../../types';

export const EvidenceBoardScreen: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeNoteEditId, setActiveNoteEditId] = useState<string | null>(null);
  const [noteDraft, setNoteDraft] = useState('');
  const [linkingSourceId, setLinkingSourceId] = useState<string | null>(null);

  const {
    evidenceItems,
    theories,
    setTheoryStance,
    updateEvidenceNote,
    linkEvidenceItems,
    removeEvidence,
    stage
  } = useARGStore();

  const categories = ['All', 'People', 'Messages', 'Dates', 'Places', 'Archive', 'Safety', 'Internal', 'Unresolved'];

  const filteredEvidence = evidenceItems.filter((ev) => {
    if (selectedCategory !== 'All' && ev.category !== selectedCategory) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        ev.title.toLowerCase().includes(q) ||
        ev.summary.toLowerCase().includes(q) ||
        (ev.playerNote && ev.playerNote.toLowerCase().includes(q))
      );
    }
    return true;
  });

  const handleStartNoteEdit = (item: EvidenceItem) => {
    setActiveNoteEditId(item.id);
    setNoteDraft(item.playerNote || '');
  };

  const handleSaveNote = (id: string) => {
    soundEngine.playCue('ui.save');
    updateEvidenceNote(id, noteDraft);
    setActiveNoteEditId(null);
  };

  const handleLinkClick = (id: string) => {
    if (!linkingSourceId) {
      soundEngine.playCue('ui.navigation');
      setLinkingSourceId(id);
    } else if (linkingSourceId === id) {
      setLinkingSourceId(null);
    } else {
      soundEngine.playCue('ui.success');
      linkEvidenceItems(linkingSourceId, id);
      setLinkingSourceId(null);
    }
  };

  return (
    <div
      className="evidence-board-screen"
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-5)',
        maxWidth: '1100px',
        margin: '0 auto',
        width: '100%',
      }}
    >
      {/* Header */}
      <div>
        <h1 style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.03em' }}>
          Investigative Casebook & Evidence Synthesis
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: 'var(--font-size-sm)', margin: '2px 0 0 0' }}>
          Synthesize cross-platform contradictions, link relational anomalies, and formulate hypothesis vectors.
        </p>
      </div>

      {/* Core Research Questions Tracker */}
      <div className="ef-card-featured">
        <div style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--accent-plum)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 'var(--space-3)' }}>
          KEY INVESTIGATIVE INQUIRIES
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'var(--space-3)', fontSize: 'var(--font-size-xs)' }}>
          <div className="ef-card-subtle">
            <strong style={{ color: 'var(--text-primary)' }}>1. Can a relationship survive an account?</strong>
            <div style={{ color: 'var(--color-success)', marginTop: '2px', fontWeight: 600 }}>✓ Confirmed in Pairwise 1999 schema</div>
          </div>
          <div className="ef-card-subtle">
            <strong style={{ color: 'var(--text-primary)' }}>2. Can a relationship survive a participant?</strong>
            <div style={{ color: 'var(--color-success)', marginTop: '2px', fontWeight: 600 }}>✓ Confirmed in Meredith Cole Case EF-TS-2218</div>
          </div>
          <div className="ef-card-subtle">
            <strong style={{ color: 'var(--text-primary)' }}>3. Can a relationship survive the platform itself?</strong>
            <div style={{ color: 'var(--accent-plum)', marginTop: '2px', fontWeight: 600 }}>● Active Inquiry in Everfold 2026 Core</div>
          </div>
        </div>
      </div>

      {/* Category Tabs & Search Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
        <div style={{ display: 'flex', gap: 'var(--space-1)', overflowX: 'auto' }}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                soundEngine.playCue('ui.navigation');
                setSelectedCategory(cat);
              }}
              className="badge"
              style={{
                backgroundColor: selectedCategory === cat ? 'var(--accent-plum)' : 'var(--bg-surface)',
                color: selectedCategory === cat ? 'var(--text-inverse)' : 'var(--text-secondary)',
                padding: '0.35rem 0.75rem',
                fontSize: '0.72rem',
                fontWeight: selectedCategory === cat ? 700 : 500,
                border: '1px solid',
                borderColor: selectedCategory === cat ? 'var(--accent-plum)' : 'var(--border-subtle)',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--space-2)',
            padding: '0 var(--space-3)',
            backgroundColor: 'var(--bg-surface)',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-subtle)',
            height: '34px',
          }}
        >
          <Search size={14} color="var(--text-muted)" />
          <input
            type="text"
            placeholder="Search evidence..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ border: 'none', background: 'transparent', width: '160px', fontSize: 'var(--font-size-xs)', outline: 'none' }}
          />
        </div>
      </div>

      {/* Evidence Items Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: 'var(--space-4)',
        }}
      >
        {filteredEvidence.map((item) => (
          <div
            key={item.id}
            className="ef-card-interactive flex flex-col justify-between"
            style={{
              padding: 'var(--space-4)',
              borderColor: linkingSourceId === item.id ? 'var(--accent-plum)' : 'var(--border-subtle)',
            }}
          >
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-2)' }}>
                <span className="badge badge-plum" style={{ fontSize: '0.65rem' }}>
                  {item.category} • {item.confidence}
                </span>
                <span className="font-mono" style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>
                  {item.date}
                </span>
              </div>

              <h3 style={{ fontSize: 'var(--font-size-base)', fontWeight: 800, color: 'var(--text-primary)' }}>
                {item.title}
              </h3>

              <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-secondary)', lineHeight: 1.45, marginTop: '4px' }}>
                {item.summary}
              </p>

              {/* Player Notes Section */}
              {activeNoteEditId === item.id ? (
                <div style={{ marginTop: 'var(--space-3)' }}>
                  <textarea
                    className="textarea"
                    rows={2}
                    value={noteDraft}
                    onChange={(e) => setNoteDraft(e.target.value)}
                    placeholder="Add your deduction note..."
                    style={{ width: '100%', fontSize: 'var(--font-size-xs)' }}
                  />
                  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--space-2)', marginTop: '4px' }}>
                    <button className="btn btn-ghost btn-sm" onClick={() => setActiveNoteEditId(null)}>
                      Cancel
                    </button>
                    <button className="btn btn-primary btn-sm" onClick={() => handleSaveNote(item.id)}>
                      Save Note
                    </button>
                  </div>
                </div>
              ) : (
                <div
                  onClick={() => handleStartNoteEdit(item)}
                  style={{
                    marginTop: 'var(--space-3)',
                    padding: 'var(--space-2)',
                    backgroundColor: 'var(--bg-surface-subtle)',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: 'var(--font-size-xs)',
                    color: item.playerNote ? 'var(--text-primary)' : 'var(--text-muted)',
                    cursor: 'pointer',
                    fontStyle: item.playerNote ? 'normal' : 'italic',
                  }}
                >
                  {item.playerNote ? `“${item.playerNote}”` : '+ Click to add synthesis note...'}
                </div>
              )}
            </div>

            {/* Evidence Card Actions (Link & Remove) */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border-subtle)', paddingTop: 'var(--space-3)', marginTop: 'var(--space-3)' }}>
              <button
                className={`btn ${linkingSourceId === item.id ? 'btn-primary' : 'btn-secondary'} btn-sm`}
                onClick={() => handleLinkClick(item.id)}
              >
                <Link size={13} /> {linkingSourceId === item.id ? 'Select Target...' : 'Link'}
              </button>

              <button
                className="btn-ghost"
                onClick={() => removeEvidence(item.id)}
                style={{ width: 28, height: 28, padding: 0, color: 'var(--text-muted)' }}
                title="Remove Evidence"
              >
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Theories & Hypotheses Formulation Matrix */}
      <div className="ef-card" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
        <h3 style={{ fontSize: 'var(--font-size-base)', fontWeight: 800, color: 'var(--text-primary)' }}>
          Working Hypotheses & Stance Calibration
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
          {theories.map((th) => (
            <div
              key={th.id}
              className="ef-card-subtle"
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: 'var(--space-3)',
              }}
            >
              <div style={{ flex: 1, minWidth: '240px' }}>
                <h4 style={{ fontSize: 'var(--font-size-sm)', fontWeight: 800, color: 'var(--text-primary)' }}>
                  {th.name}
                </h4>
                <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-secondary)', marginTop: '2px', margin: 0 }}>
                  {th.description}
                </p>
              </div>

              <div style={{ display: 'flex', gap: 'var(--space-1)' }}>
                {(['Unmarked', 'Possible', 'Most Likely', 'Rejected'] as const).map((st) => (
                  <button
                    key={st}
                    onClick={() => {
                      soundEngine.playCue('ui.save');
                      setTheoryStance(th.id, st);
                    }}
                    className="badge"
                    style={{
                      backgroundColor: th.stance === st ? 'var(--accent-plum)' : 'var(--bg-surface)',
                      color: th.stance === st ? 'var(--text-inverse)' : 'var(--text-secondary)',
                      padding: '0.35rem 0.65rem',
                      fontSize: '0.68rem',
                      fontWeight: th.stance === st ? 700 : 500,
                      border: '1px solid',
                      borderColor: th.stance === st ? 'var(--accent-plum)' : 'var(--border-subtle)',
                      cursor: 'pointer',
                    }}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
