import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useARGStore } from '../../store/argStore';
import { useStoryAccessStore } from '../../store/storyAccessStore';
import { soundEngine } from '../../audio/soundEngine';

export const Pairwise1999Screen: React.FC = () => {
  const [tapePasswordInput, setTapePasswordInput] = useState('');
  const [tapeUnlocked, setTapeUnlocked] = useState(false);
  const [tapeError, setTapeError] = useState('');
  const [answerRevealed, setAnswerRevealed] = useState(false);

  const { solvePuzzle, solvedPuzzleIds } = useARGStore();
  const { unlockAllStoryPages, revealPuzzleAnswers } = useStoryAccessStore();

  const handleDecryptTape = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = tapePasswordInput.toLowerCase().replace(/[^a-z0-9]/g, '');
    if (clean === 'contexttimingreturn') {
      soundEngine.playCue('ui.success');
      setTapeUnlocked(true);
      setTapeError('');
      solvePuzzle('gate_pairwise_export');
    } else {
      soundEngine.playCue('ui.failure');
      setTapeError('DECRYPTION FAILURE: Check the 1999 administrator memorandum.');
    }
  };

  const isTapeDecrypted = tapeUnlocked || solvedPuzzleIds.includes('gate_pairwise_export') || unlockAllStoryPages;

  return (
    <div
      className="pairwise-1999-screen"
      style={{
        maxWidth: '850px',
        margin: '0 auto',
        backgroundColor: '#008080',
        padding: 'var(--space-6)',
        color: '#000000',
        fontFamily: '"Times New Roman", Times, serif',
      }}
    >
      <div style={{ backgroundColor: '#c0c0c0', border: '3px outset #ffffff', padding: 'var(--space-4)', boxShadow: '4px 4px 0px #000000' }}>
        {/* Retro Header */}
        <div style={{ backgroundColor: '#000080', color: '#ffffff', padding: '4px 8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontWeight: 'bold' }}>
          <span>PAIRWISE MATCHING ENGINE — VERSION 1.0 (BUILD 1999.08.14)</span>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            {unlockAllStoryPages && <span style={{ backgroundColor: '#ffcc00', color: '#000000', padding: '1px 4px', fontSize: '0.7rem' }}>Story Access: Full</span>}
            <NavLink to="/archive" style={{ color: '#ffffff', textDecoration: 'none', fontSize: '0.8rem' }}>
              [X] CLOSE
            </NavLink>
          </div>
        </div>

        {/* Banner */}
        <div style={{ textAlign: 'center', margin: 'var(--space-4) 0', borderBottom: '2px groove #ffffff', paddingBottom: 'var(--space-3)' }}>
          <h1 style={{ fontSize: '1.8rem', margin: 0, fontFamily: 'monospace' }}>WELCOME TO PAIRWISE (1999)</h1>
          <p style={{ fontSize: '0.85rem', margin: '4px 0 0' }}>
            Dial-up relational affinity network • Hosted on FreeBSD 3.2
          </p>
        </div>

        {/* Main Content Layout */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
          {/* Left: Questionnaire & Guestbook */}
          <div style={{ backgroundColor: '#ffffff', border: '2px inset #ffffff', padding: 'var(--space-3)', fontSize: '0.85rem' }}>
            <h3 style={{ margin: '0 0 8px', borderBottom: '1px solid #808080' }}>System Status & Inception Logs</h3>
            <p>
              Pairwise indexes relational affinity using 48-factor questionnaire scoring.
            </p>
            <table style={{ width: '100%', fontSize: '0.75rem', borderCollapse: 'collapse' }}>
              <tbody>
                <tr>
                  <td><strong>Total Slots:</strong> 1000</td>
                  <td><strong>Vacant Slots:</strong> 42</td>
                </tr>
                <tr>
                  <td><strong>Slot 01:</strong> PRE-ASSIGNED</td>
                  <td><strong>Continuity:</strong> 99.8%</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Right: Tape Backup Decryption Terminal (Gate 2) */}
          <div style={{ backgroundColor: '#000000', color: '#00ff00', fontFamily: 'monospace', padding: 'var(--space-3)', fontSize: '0.8rem', borderRadius: '2px' }}>
            <div style={{ color: '#ffffff', borderBottom: '1px dashed #00ff00', paddingBottom: '4px', marginBottom: '8px', display: 'flex', justifyContent: 'space-between' }}>
              <span>TAPE RESTORATION TERMINAL (DAT-1999-0814)</span>
            </div>

            {!isTapeDecrypted ? (
              <form onSubmit={handleDecryptTape}>
                <p style={{ margin: '0 0 8px' }}>ENTER BACKUP TAPE DECRYPTION KEYPHRASE:</p>
                <input
                  type="text"
                  value={tapePasswordInput}
                  onChange={(e) => setTapePasswordInput(e.target.value)}
                  placeholder="passphrase..."
                  style={{
                    width: '100%',
                    backgroundColor: '#000000',
                    color: '#00ff00',
                    border: '1px solid #00ff00',
                    fontFamily: 'monospace',
                    padding: '4px',
                    marginBottom: '8px',
                  }}
                />
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <button
                    type="submit"
                    style={{
                      backgroundColor: '#c0c0c0',
                      color: '#000000',
                      border: '2px outset #ffffff',
                      padding: '3px 10px',
                      cursor: 'pointer',
                      fontFamily: 'monospace',
                    }}
                  >
                    RUN DECRYPT.EXE
                  </button>

                  {revealPuzzleAnswers && (
                    <button
                      type="button"
                      onClick={() => setAnswerRevealed(!answerRevealed)}
                      style={{
                        backgroundColor: '#333333',
                        color: '#00ff00',
                        border: '1px solid #00ff00',
                        padding: '2px 6px',
                        cursor: 'pointer',
                        fontSize: '0.7rem',
                      }}
                    >
                      {answerRevealed ? 'HIDE KEY' : 'SHOW KEY'}
                    </button>
                  )}
                </div>

                {answerRevealed && (
                  <div style={{ marginTop: '6px', color: '#ffff00', fontSize: '0.75rem' }}>
                    Keyphrase: <strong>contexttimingreturn</strong>
                  </div>
                )}
              </form>
            ) : (
              <div>
                <div style={{ color: '#00ff00', fontWeight: 'bold' }}>✓ TAPE RESTORED: CONTEXT_TIMING_RETURN</div>
                <pre style={{ fontSize: '0.7rem', marginTop: '8px', whiteSpace: 'pre-wrap' }}>
                  SLOT_01 ALLOCATION CONFIRMED:
                  - Initial Vector: (0.92, 0.88, 0.94)
                  - Recurrence Horizon: 27 Years
                  - Invariant Event: RETURN
                </pre>
              </div>
            )}

            {tapeError && <div style={{ color: '#ff4444', marginTop: '6px' }}>{tapeError}</div>}
          </div>
        </div>
      </div>
    </div>
  );
};
