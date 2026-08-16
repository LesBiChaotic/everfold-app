import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { MessageSquare, Lock, Unlock, ArrowLeft } from 'lucide-react';
import { useARGStore } from '../../store/argStore';
import { useStoryAccessStore } from '../../store/storyAccessStore';
import { soundEngine } from '../../audio/soundEngine';

export const AffinityRoom2003Screen: React.FC = () => {
  const [sessionInput, setSessionInput] = useState('');
  const [sessionUnlocked, setSessionUnlocked] = useState(false);
  const [sessionError, setSessionError] = useState('');
  const [answerRevealed, setAnswerRevealed] = useState(false);

  const { solvePuzzle, solvedPuzzleIds } = useARGStore();
  const { unlockAllStoryPages, revealPuzzleAnswers } = useStoryAccessStore();

  const handleUnlockSession = (e: React.FormEvent) => {
    e.preventDefault();
    if (sessionInput.trim() === '0712') {
      soundEngine.playCue('ui.success');
      setSessionUnlocked(true);
      setSessionError('');
      solvePuzzle('gate_0712_leah');
    } else {
      soundEngine.playCue('ui.failure');
      setSessionError('SESSION NOT FOUND: Enter valid 4-digit chat session ID (0712).');
    }
  };

  const isSessionDecrypted = sessionUnlocked || solvedPuzzleIds.includes('gate_0712_leah') || unlockAllStoryPages;

  return (
    <div
      className="affinity-room-2003-screen"
      style={{
        maxWidth: '850px',
        margin: '0 auto',
        backgroundColor: '#e6eaf0',
        padding: 'var(--space-6)',
        color: '#1a2a3a',
        fontFamily: 'Verdana, Geneva, sans-serif',
      }}
    >
      <div style={{ backgroundColor: '#ffffff', border: '2px solid #5a7a9a', borderRadius: '6px', padding: 'var(--space-4)', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid #5a7a9a', paddingBottom: 'var(--space-3)', marginBottom: 'var(--space-4)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
            <span style={{ fontSize: '1.4rem', fontWeight: 'bold', color: '#2a5a8a' }}>AffinityRoom.net (2003)</span>
            <span style={{ fontSize: '0.75rem', backgroundColor: '#d0e0f0', padding: '2px 6px', borderRadius: '4px' }}>Build v2.4</span>
            {unlockAllStoryPages && <span className="badge badge-anomaly" style={{ fontSize: '0.65rem' }}>Story Access: Full</span>}
          </div>
          <NavLink to="/archive" style={{ color: '#2a5a8a', textDecoration: 'none', fontSize: '0.85rem' }}>
            ← Back to Modern Archive
          </NavLink>
        </div>

        {/* Layout */}
        <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: 'var(--space-4)' }}>
          {/* Left: Who's Online & Channel Directory */}
          <div style={{ backgroundColor: '#f0f4f8', padding: 'var(--space-3)', borderRadius: '4px', fontSize: '0.8rem' }}>
            <h4 style={{ margin: '0 0 6px', color: '#2a5a8a' }}>Channels:</h4>
            <ul style={{ paddingLeft: '18px', margin: '0 0 12px' }}>
              <li>#general-chat</li>
              <li>#book-conservators</li>
              <li>#boston-singles</li>
            </ul>

            <h4 style={{ margin: '0 0 6px', color: '#2a5a8a' }}>Active Members (2003):</h4>
            <div style={{ fontSize: '0.75rem', color: '#4a6a8a' }}>
              • leah_morgan_pairwise<br />
              • sreedsunday<br />
              • m_cole_boston
            </div>
          </div>

          {/* Right: Restored Session #0712 */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
            <div style={{ padding: 'var(--space-3)', backgroundColor: '#f5f9fc', border: '1px solid #d0e0f0', borderRadius: '4px' }}>
              <h3 style={{ fontSize: '0.95rem', margin: '0 0 6px', color: '#2a5a8a' }}>Private Session Archive (#0712)</h3>
              <p style={{ fontSize: '0.8rem', color: '#555', margin: 0 }}>
                Restored dialogue between Leah Morgan and Samuel Reed.
              </p>
            </div>

            {!isSessionDecrypted ? (
              <form onSubmit={handleUnlockSession} style={{ padding: 'var(--space-4)', backgroundColor: '#fff8e8', border: '1px solid #e0c880', borderRadius: '4px' }}>
                <p style={{ fontSize: '0.8rem', margin: '0 0 8px' }}>
                  Enter the 4-digit private chat session ID referenced in Leah’s records:
                </p>
                <div style={{ display: 'flex', gap: 'var(--space-2)', alignItems: 'center' }}>
                  <input
                    type="text"
                    placeholder="e.g. 0712"
                    value={sessionInput}
                    onChange={(e) => setSessionInput(e.target.value)}
                    style={{ padding: '6px', border: '1px solid #aaa', borderRadius: '3px', fontSize: '0.85rem' }}
                  />
                  <button type="submit" style={{ backgroundColor: '#2a5a8a', color: '#fff', border: 'none', padding: '6px 14px', borderRadius: '3px', cursor: 'pointer' }}>
                    Load Session
                  </button>

                  {revealPuzzleAnswers && (
                    <button
                      type="button"
                      onClick={() => setAnswerRevealed(!answerRevealed)}
                      style={{ backgroundColor: '#eee', color: '#333', border: '1px solid #aaa', padding: '6px 10px', borderRadius: '3px', cursor: 'pointer', fontSize: '0.75rem' }}
                    >
                      {answerRevealed ? 'Hide' : 'Show Answer'}
                    </button>
                  )}
                </div>

                {answerRevealed && (
                  <div style={{ marginTop: '6px', color: '#2a5a8a', fontSize: '0.75rem' }}>
                    Session ID: <strong>0712</strong> (July 12, 2003)
                  </div>
                )}

                {sessionError && <div style={{ color: '#c00', fontSize: '0.75rem', marginTop: '6px' }}>{sessionError}</div>}
              </form>
            ) : (
              <div style={{ padding: 'var(--space-3)', backgroundColor: '#ffffff', border: '1px solid #c0d0e0', borderRadius: '4px', fontSize: '0.8rem', lineHeight: 1.6 }}>
                <div><strong>sreedsunday (19:40):</strong> Leah, the shop delivered the marbled paper sheets from Florence today. The peacock pattern is exactly as you described.</div>
                <div><strong>leah_morgan_pairwise (19:42):</strong> Did you check the watermark on the endpapers? The binder in Milan told me the paper mill closed in 1984.</div>
                <div><strong>sreedsunday (19:43):</strong> It’s authentic. The texture under the lamp is unmistakable. When are you coming downstairs?</div>
                <div><strong>leah_morgan_pairwise (19:45):</strong> In ten minutes. I’m saving this session transcript so we don’t lose the order references.</div>
                <div style={{ marginTop: '8px', color: '#008000', fontWeight: 'bold' }}>
                  ✓ SESSION RECONCILED INTO EVERFOLD ACTIVE INBOX
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
