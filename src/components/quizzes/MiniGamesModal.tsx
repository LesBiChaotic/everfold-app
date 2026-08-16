import React, { useState } from 'react';
import { X, Sparkles, Check, ArrowRight } from 'lucide-react';
import { soundEngine } from '../../audio/soundEngine';

export const MiniGamesModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [selectedGame, setSelectedGame] = useState<'wyr' | 'food' | 'weekend'>('wyr');
  const [choiceMade, setChoiceMade] = useState<string | null>(null);

  const games = [
    { id: 'wyr' as const, name: 'Would You Rather' },
    { id: 'food' as const, name: 'Pick Three Foods' },
    { id: 'weekend' as const, name: 'Build a Weekend' },
  ];

  const handleChoose = (opt: string) => {
    soundEngine.playCue('ui.save');
    setChoiceMade(opt);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="minigames-title"
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
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--space-4)',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
            <Sparkles size={18} color="var(--accent-primary)" />
            <h2 id="minigames-title" style={{ fontSize: 'var(--font-size-md)', fontWeight: 700, margin: 0 }}>
              Match Mini-Games
            </h2>
          </div>
          <button className="btn-ghost" onClick={onClose} aria-label="Close mini-games" style={{ padding: '4px' }}>
            <X size={18} />
          </button>
        </div>

        {/* Game Selector */}
        <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
          {games.map((g) => (
            <button
              key={g.id}
              onClick={() => {
                setSelectedGame(g.id);
                setChoiceMade(null);
              }}
              className={`btn ${selectedGame === g.id ? 'btn-primary' : 'btn-secondary'}`}
              style={{ fontSize: 'var(--font-size-xs)', flex: 1 }}
            >
              {g.name}
            </button>
          ))}
        </div>

        {/* Game Content */}
        <div style={{ padding: 'var(--space-3)', backgroundColor: 'var(--bg-surface-subtle)', borderRadius: 'var(--radius-md)' }}>
          {selectedGame === 'wyr' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
              <div style={{ fontSize: 'var(--font-size-xs)', fontWeight: 600, color: 'var(--text-muted)' }}>WOULD YOU RATHER:</div>
              <button
                className="btn btn-secondary"
                onClick={() => handleChoose('opt_a')}
                style={{
                  textAlign: 'left',
                  padding: 'var(--space-3)',
                  border: choiceMade === 'opt_a' ? '2px solid var(--accent-primary)' : '1px solid var(--border-subtle)',
                }}
              >
                A rainy Sunday in a wood cabin with a fireplace and no WiFi
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => handleChoose('opt_b')}
                style={{
                  textAlign: 'left',
                  padding: 'var(--space-3)',
                  border: choiceMade === 'opt_b' ? '2px solid var(--accent-primary)' : '1px solid var(--border-subtle)',
                }}
              >
                An unguided night walk through Tokyo side streets in mild autumn
              </button>
            </div>
          )}

          {selectedGame === 'food' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
              <div style={{ fontSize: 'var(--font-size-xs)', fontWeight: 600, color: 'var(--text-muted)' }}>CHOOSE YOUR COMFORT STAPLE:</div>
              {['Warm sourdough with salty butter', 'Spicy noodle soup with scallions', 'Dark chocolate with sea salt'].map((item) => (
                <button
                  key={item}
                  className="btn btn-secondary"
                  onClick={() => handleChoose(item)}
                  style={{
                    textAlign: 'left',
                    padding: 'var(--space-2) var(--space-3)',
                    border: choiceMade === item ? '2px solid var(--accent-primary)' : '1px solid var(--border-subtle)',
                    fontSize: 'var(--font-size-xs)',
                  }}
                >
                  {item}
                </button>
              ))}
            </div>
          )}

          {selectedGame === 'weekend' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
              <div style={{ fontSize: 'var(--font-size-xs)', fontWeight: 600, color: 'var(--text-muted)' }}>PICK YOUR SATURDAY MORNING:</div>
              {['Slow pour-over coffee + reading in bed', 'Early morning farmers market stroll', 'Quiet bike ride along the river'].map((item) => (
                <button
                  key={item}
                  className="btn btn-secondary"
                  onClick={() => handleChoose(item)}
                  style={{
                    textAlign: 'left',
                    padding: 'var(--space-2) var(--space-3)',
                    border: choiceMade === item ? '2px solid var(--accent-primary)' : '1px solid var(--border-subtle)',
                    fontSize: 'var(--font-size-xs)',
                  }}
                >
                  {item}
                </button>
              ))}
            </div>
          )}
        </div>

        {choiceMade && (
          <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-success)', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Check size={14} /> Outcome saved to relationship activity history.
          </div>
        )}

        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <button className="btn btn-primary" onClick={onClose} style={{ fontSize: 'var(--font-size-xs)' }}>
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
