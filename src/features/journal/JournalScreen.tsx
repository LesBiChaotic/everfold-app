import React, { useState } from 'react';
import {
  BookOpen,
  Plus,
  Star,
  Trash2,
  Edit3,
  Search,
  Sparkles,
  Tag,
  AlertTriangle,
  Lightbulb,
} from 'lucide-react';
import { useAppStore } from '../../store/appStore';
import { useARGStore } from '../../store/argStore';
import { SEEDED_JOURNAL_PROMPTS } from '../../data/journalPrompts';
import { Foldmark } from '../../components/brand/Foldmark';
import { soundEngine } from '../../audio/soundEngine';
import { JournalEntry } from '../../types';

export const JournalScreen: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMoodFilter, setSelectedMoodFilter] = useState('All');
  const [isCreating, setIsCreating] = useState(false);
  const [selectedPrompt, setSelectedPrompt] = useState<string | null>(null);

  // New Entry Form State
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [mood, setMood] = useState<JournalEntry['mood']>('Curious');
  const [tagsInput, setTagsInput] = useState('');

  const { journalEntries, createJournalEntry, deleteJournalEntry } = useAppStore();
  const { solvePuzzle } = useARGStore();

  const moods: JournalEntry['mood'][] = [
    'Open',
    'Settled',
    'Unsure',
    'Energized',
    'Guarded',
    'Overwhelmed',
    'Curious',
    'Tender',
    'Disconnected',
    'Hopeful'
  ];

  const filteredEntries = journalEntries.filter((entry) => {
    if (selectedMoodFilter !== 'All' && entry.mood !== selectedMoodFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        entry.title.toLowerCase().includes(q) ||
        entry.content.toLowerCase().includes(q) ||
        entry.tags.some((t) => t.toLowerCase().includes(q))
      );
    }
    return true;
  });

  const handleSaveEntry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    createJournalEntry({
      title: title.trim(),
      content: content.trim(),
      promptText: selectedPrompt || undefined,
      mood,
      tags: tagsInput.split(',').map((t) => t.trim()).filter(Boolean),
      isFavorite: false
    });

    setIsCreating(false);
    setTitle('');
    setContent('');
    setSelectedPrompt(null);
    setTagsInput('');
  };

  return (
    <div
      className="journal-screen"
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-5)',
        maxWidth: '860px',
        margin: '0 auto',
        width: '100%',
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 'var(--space-3)' }}>
        <div>
          <h1 style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.03em' }}>
            Private Relational Journal & Field Notes
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: 'var(--font-size-sm)', margin: '2px 0 0 0' }}>
            Private local reflection space for emotional cadence, date notes, and unhurried reflections.
          </p>
        </div>

        <button
          className="btn btn-primary btn-sm"
          onClick={() => {
            soundEngine.playCue('ui.navigation');
            setIsCreating(!isCreating);
          }}
        >
          <Plus size={15} /> {isCreating ? 'Cancel' : 'New Reflection'}
        </button>
      </div>

      {/* Write New Reflection Form Drawer */}
      {isCreating && (
        <form onSubmit={handleSaveEntry} className="ef-card-featured" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
          <h2 style={{ fontSize: 'var(--font-size-base)', fontWeight: 800, color: 'var(--text-primary)' }}>
            New Journal Reflection
          </h2>

          {/* Inspiration Prompts Carousel */}
          <div>
            <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '6px' }}>
              Optional Reflective Prompt
            </div>
            <div style={{ display: 'flex', gap: 'var(--space-2)', overflowX: 'auto', paddingBottom: 'var(--space-1)' }}>
              {SEEDED_JOURNAL_PROMPTS.slice(0, 5).map((p) => (
                <button
                  type="button"
                  key={p.id}
                  onClick={() => setSelectedPrompt(p.prompt)}
                  className="badge"
                  style={{
                    backgroundColor: selectedPrompt === p.prompt ? 'var(--accent-plum)' : 'var(--bg-surface-subtle)',
                    color: selectedPrompt === p.prompt ? 'var(--text-inverse)' : 'var(--text-secondary)',
                    padding: '0.35rem 0.75rem',
                    fontSize: '0.72rem',
                    fontWeight: 600,
                    border: '1px solid',
                    borderColor: selectedPrompt === p.prompt ? 'var(--accent-plum)' : 'var(--border-subtle)',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {p.category}
                </button>
              ))}
            </div>
            {selectedPrompt && (
              <div className="ef-prompt-quote" style={{ marginTop: 'var(--space-2)', fontSize: '0.95rem' }}>
                “{selectedPrompt}”
              </div>
            )}
          </div>

          <div>
            <label style={{ fontSize: 'var(--font-size-xs)', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '4px', textTransform: 'uppercase' }}>
              Entry Title
            </label>
            <input
              type="text"
              className="input"
              placeholder="e.g. Afternoon walk with Hana..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          {/* Emotional State Selection */}
          <div>
            <label style={{ fontSize: 'var(--font-size-xs)', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '6px', textTransform: 'uppercase' }}>
              Emotional State / Internal Tone
            </label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-1)' }}>
              {moods.map((m) => (
                <button
                  type="button"
                  key={m}
                  onClick={() => setMood(m)}
                  className="badge"
                  style={{
                    backgroundColor: mood === m ? 'var(--accent-plum)' : 'var(--bg-surface-subtle)',
                    color: mood === m ? 'var(--text-inverse)' : 'var(--text-secondary)',
                    padding: '0.3rem 0.7rem',
                    fontSize: 'var(--font-size-xs)',
                    fontWeight: mood === m ? 700 : 500,
                    border: '1px solid',
                    borderColor: mood === m ? 'var(--accent-plum)' : 'var(--border-subtle)',
                    cursor: 'pointer',
                  }}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label style={{ fontSize: 'var(--font-size-xs)', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '4px', textTransform: 'uppercase' }}>
              Personal Reflection Body
            </label>
            <textarea
              className="textarea font-serif"
              rows={5}
              placeholder="Write unhurriedly..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              style={{ width: '100%', fontSize: '1rem', lineHeight: 1.6 }}
            />
          </div>

          <div>
            <label style={{ fontSize: 'var(--font-size-xs)', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '4px', textTransform: 'uppercase' }}>
              Tags (comma-separated)
            </label>
            <input
              type="text"
              className="input"
              placeholder="e.g. boundaries, cadence, gratitude"
              value={tagsInput}
              onChange={(e) => setTagsInput(e.target.value)}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--space-2)' }}>
            <button type="button" className="btn btn-ghost btn-sm" onClick={() => setIsCreating(false)}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary btn-sm" disabled={!title.trim() || !content.trim()}>
              Save Entry
            </button>
          </div>
        </form>
      )}

      {/* Mood Filters & Search */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
        <div style={{ display: 'flex', gap: 'var(--space-1)', overflowX: 'auto' }}>
          {['All', 'Settled', 'Open', 'Curious', 'Hopeful', 'Unsure'].map((m) => (
            <button
              key={m}
              onClick={() => setSelectedMoodFilter(m)}
              className="badge"
              style={{
                backgroundColor: selectedMoodFilter === m ? 'var(--accent-plum)' : 'var(--bg-surface)',
                color: selectedMoodFilter === m ? 'var(--text-inverse)' : 'var(--text-secondary)',
                padding: '0.35rem 0.75rem',
                fontSize: '0.72rem',
                fontWeight: selectedMoodFilter === m ? 700 : 500,
                border: '1px solid',
                borderColor: selectedMoodFilter === m ? 'var(--accent-plum)' : 'var(--border-subtle)',
                cursor: 'pointer',
              }}
            >
              {m}
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
            placeholder="Search entries..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ border: 'none', background: 'transparent', width: '150px', fontSize: 'var(--font-size-xs)', outline: 'none' }}
          />
        </div>
      </div>

      {/* Entries List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
        {filteredEntries.map((entry) => (
          <div
            key={entry.id}
            className="ef-card-interactive journal-cosmetic-entry"
            style={{
              padding: 'var(--space-4)',
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--space-2)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span className="badge badge-plum" style={{ fontSize: '0.68rem' }}>
                {entry.mood} • {new Date(entry.createdAt).toLocaleDateString()}
              </span>
              <button
                className="btn-ghost"
                onClick={() => deleteJournalEntry(entry.id)}
                style={{ width: 28, height: 28, padding: 0, color: 'var(--text-muted)' }}
                title="Delete Entry"
              >
                <Trash2 size={14} />
              </button>
            </div>

            <h3 style={{ fontSize: 'var(--font-size-base)', fontWeight: 800, color: 'var(--text-primary)' }}>
              {entry.title}
            </h3>

            {entry.promptText && (
              <div className="ef-prompt-quote" style={{ fontSize: '0.88rem', margin: '4px 0' }}>
                “{entry.promptText}”
              </div>
            )}

            <div style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              {entry.content}
            </div>

            {entry.tags.length > 0 && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginTop: 'var(--space-2)' }}>
                {entry.tags.map((t) => (
                  <span key={t} className="badge" style={{ fontSize: '0.65rem' }}>
                    #{t}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
