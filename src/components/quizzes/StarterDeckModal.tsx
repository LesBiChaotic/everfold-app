import React, { useState } from 'react';
import { X, Layers, RefreshCw, Send, Bookmark } from 'lucide-react';
import { CONVERSATION_STARTER_DECKS } from '../../data/quizzesData';
import { useQuizStore } from '../../store/quizStore';

export const StarterDeckModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [selectedDeckId, setSelectedDeckId] = useState<string>('deck_curious');
  const { drawStarterCard, activeStarterCard } = useQuizStore();

  const handleDraw = () => {
    drawStarterCard(selectedDeckId);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="starter-deck-title"
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
          maxWidth: '520px',
          width: '100%',
          backgroundColor: 'var(--bg-surface)',
          borderRadius: 'var(--radius-lg)',
          boxShadow: 'var(--shadow-xl)',
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--space-4)',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
            <Layers size={18} color="var(--accent-primary)" />
            <h2 id="starter-deck-title" style={{ fontSize: 'var(--font-size-md)', fontWeight: 700, margin: 0 }}>
              Conversation Starter Decks
            </h2>
          </div>
          <button className="btn-ghost" onClick={onClose} aria-label="Close starter deck" style={{ padding: '4px' }}>
            <X size={18} />
          </button>
        </div>

        {/* Deck Selector Tabs */}
        <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
          {CONVERSATION_STARTER_DECKS.map((deck) => (
            <button
              key={deck.id}
              onClick={() => setSelectedDeckId(deck.id)}
              className={`btn ${selectedDeckId === deck.id ? 'btn-primary' : 'btn-secondary'}`}
              style={{ fontSize: 'var(--font-size-xs)', flex: 1 }}
            >
              {deck.name}
            </button>
          ))}
        </div>

        {/* Card Display */}
        <div
          style={{
            minHeight: '140px',
            backgroundColor: 'var(--bg-surface-subtle)',
            borderRadius: 'var(--radius-md)',
            padding: 'var(--space-5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            border: '1px dashed var(--border-subtle)',
          }}
        >
          <p style={{ fontSize: 'var(--font-size-md)', fontWeight: 600, margin: 0, lineHeight: 1.5 }}>
            {activeStarterCard || 'Tap "Draw a Card" to draw a thought-provoking prompt from this deck.'}
          </p>
        </div>

        {/* Action Controls */}
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 'var(--space-2)' }}>
          <button className="btn btn-secondary" onClick={onClose} style={{ fontSize: 'var(--font-size-xs)' }}>
            Close
          </button>
          <button className="btn btn-primary" onClick={handleDraw} style={{ fontSize: 'var(--font-size-xs)' }}>
            <RefreshCw size={14} /> Draw a Card
          </button>
        </div>
      </div>
    </div>
  );
};
