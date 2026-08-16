import React, { useState } from 'react';
import { useParams, NavLink } from 'react-router-dom';
import { ArrowLeft, Lock, PlusCircle, Bookmark, Sparkles, Send } from 'lucide-react';
import { useRelationshipEcosystemStore } from '../../store/relationshipEcosystemStore';
import { SavedRelationshipMemory } from '../../types/socialEcosystem';

export const MemoryCapsuleScreen: React.FC = () => {
  const { relationshipId = 'rel_2347_previouslymatched' } = useParams<{ relationshipId: string }>();
  const { memories, saveMemory } = useRelationshipEcosystemStore();

  const [modalOpen, setModalOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [contentType, setContentType] = useState<SavedRelationshipMemory['contentType']>('reflection');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    saveMemory(relationshipId, contentType, title.trim(), content.trim(), 'visitor');
    setTitle('');
    setContent('');
    setModalOpen(false);
  };

  return (
    <div className="memory-capsule-screen" style={{ maxWidth: '850px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <NavLink to={`/relationship/${relationshipId}/timeline`} className="btn btn-ghost" style={{ gap: 'var(--space-1)', fontSize: 'var(--font-size-xs)' }}>
          <ArrowLeft size={15} /> Back to Timeline
        </NavLink>

        <button className="btn btn-primary" onClick={() => setModalOpen(true)} style={{ fontSize: 'var(--font-size-xs)' }}>
          <PlusCircle size={14} /> Seal New Memory
        </button>
      </div>

      {/* Header */}
      <div className="card" style={{ borderLeft: '4px solid var(--accent-primary)', backgroundColor: 'var(--bg-surface)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
          <Lock size={18} color="var(--accent-primary)" />
          <h1 style={{ fontSize: 'var(--font-size-xl)', fontWeight: 800, margin: 0 }}>Shared Memory Capsules</h1>
        </div>
        <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-secondary)', marginTop: '4px', marginBottom: 0 }}>
          Preserved text snippets, date reflections, and recovered historical fragments saved to container {relationshipId}.
        </p>
      </div>

      {/* Memories Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 'var(--space-4)' }}>
        {memories.map((mem) => (
          <div
            key={mem.id}
            className="card"
            style={{
              backgroundColor: 'var(--bg-surface)',
              border: mem.savedBy === 'systemRecovered' ? '2px solid var(--accent-primary)' : '1px solid var(--border-subtle)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: 'var(--space-2)',
            }}
          >
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-1)' }}>
                <span className="badge badge-subtle" style={{ fontSize: '9px', textTransform: 'uppercase' }}>{mem.contentType}</span>
                <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>{new Date(mem.savedAt).toLocaleDateString()}</span>
              </div>

              <h2 style={{ fontSize: 'var(--font-size-sm)', fontWeight: 700, margin: '2px 0 6px' }}>{mem.title}</h2>
              <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-secondary)', fontStyle: 'italic', lineHeight: 1.5, margin: 0 }}>
                {mem.content}
              </p>
            </div>

            <div style={{ fontSize: '10px', color: 'var(--text-muted)', borderTop: '1px solid var(--border-subtle)', paddingTop: 'var(--space-2)' }}>
              Saved by: <strong>{mem.savedBy === 'visitor' ? 'You' : mem.savedBy === 'partner' ? 'Partner' : 'System Recovered (Archive Lineage)'}</strong>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {modalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="seal-memory-modal-title"
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.65)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: 'var(--space-4)',
          }}
        >
          <div
            className="card"
            style={{
              maxWidth: '500px',
              width: '100%',
              backgroundColor: 'var(--bg-surface)',
              borderRadius: 'var(--radius-lg)',
              boxShadow: 'var(--shadow-xl)',
            }}
          >
            <h2 id="seal-memory-modal-title" style={{ fontSize: 'var(--font-size-md)', fontWeight: 700, margin: '0 0 var(--space-3)' }}>
              Seal Memory Capsule
            </h2>

            <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
              <div>
                <label style={{ fontSize: 'var(--font-size-xs)', fontWeight: 600, color: 'var(--text-muted)' }}>Memory Title:</label>
                <input
                  type="text"
                  className="input"
                  placeholder="e.g. The bench on Charles Street"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  style={{ width: '100%', fontSize: 'var(--font-size-xs)' }}
                />
              </div>

              <div>
                <label style={{ fontSize: 'var(--font-size-xs)', fontWeight: 600, color: 'var(--text-muted)' }}>Content / Quote:</label>
                <textarea
                  className="input"
                  rows={4}
                  placeholder="Write a message, date memory, or tiny reflection..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  style={{ width: '100%', fontSize: 'var(--font-size-xs)' }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--space-2)' }}>
                <button type="button" className="btn btn-ghost" onClick={() => setModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Seal Memory
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
