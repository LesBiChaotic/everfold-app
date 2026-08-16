import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Columns, ArrowLeft, Bookmark, CheckCircle, Sparkles } from 'lucide-react';
import { SEEDED_USERS } from '../../data/users';
import { UserAccount } from '../../types';
import { useARGStore } from '../../store/argStore';
import { soundEngine } from '../../audio/soundEngine';

export const CompareProfilesScreen: React.FC = () => {
  const [selectedUser1Id, setSelectedUser1Id] = useState<string>('usr_naomi_serrano');
  const [selectedUser2Id, setSelectedUser2Id] = useState<string>('usr_hana_prasetyo');

  const { addEvidenceBookmark, addStoryFlag } = useARGStore();

  const allAvailableUsers: UserAccount[] = SEEDED_USERS.filter(u => u.visibility === 'public');
  const user1 = allAvailableUsers.find(u => u.id === selectedUser1Id) || allAvailableUsers[0];
  const user2 = allAvailableUsers.find(u => u.id === selectedUser2Id) || allAvailableUsers[1];

  const handleBookmarkComparison = () => {
    soundEngine.playCue('ui.save');
    addStoryFlag('clue_compare_chain');
    addEvidenceBookmark({
      category: 'People',
      sourceType: 'Profile',
      sourceId: `compare_${user1.id}_${user2.id}`,
      title: `Linguistic Overlap: ${user1.displayName} & ${user2.displayName}`,
      summary: 'Prompt answers exhibit synchronized phrasing across members who have never met.',
      date: '2026-08-16',
      linkedIds: [user1.id, user2.id],
      confidence: 'Strongly Supported',
      playerNote: 'Vocabulary cadences and rhythm match across independent member accounts.'
    });
  };

  return (
    <div className="compare-profiles-screen" style={{ maxWidth: '1000px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <NavLink to="/discover" className="btn btn-ghost" style={{ gap: 'var(--space-2)' }}>
          <ArrowLeft size={16} /> Back to Discover
        </NavLink>
        <button className="btn btn-secondary" onClick={handleBookmarkComparison} style={{ fontSize: 'var(--font-size-xs)' }}>
          Bookmark Comparison to Case Notes
        </button>
      </div>

      <div className="card" style={{ borderLeft: '4px solid var(--accent-primary)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-2)' }}>
          <Columns size={18} color="var(--accent-primary)" />
          <span style={{ fontSize: 'var(--font-size-xs)', fontWeight: 700, fontFamily: 'var(--font-family-mono)' }}>
            DISCOVERY TOOLS // SIDE-BY-SIDE PROFILE ANALYSIS
          </span>
        </div>
        <h1 style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 800 }}>
          Compare Member Profiles & Communication Cadence
        </h1>
        <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-secondary)', marginTop: '4px' }}>
          Evaluate shared values, lifestyle alignment, and prompt vocabulary across independent members.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
        {/* Profile 1 */}
        <div className="card">
          <div style={{ marginBottom: 'var(--space-3)' }}>
            <label style={{ fontSize: 'var(--font-size-xs)', fontWeight: 600, color: 'var(--text-muted)' }}>Select First Member</label>
            <select
              className="input"
              value={selectedUser1Id}
              onChange={(e) => setSelectedUser1Id(e.target.value)}
              style={{ marginTop: 'var(--space-1)', width: '100%' }}
            >
              {allAvailableUsers.map(u => (
                <option key={u.id} value={u.id}>{u.displayName} ({u.city})</option>
              ))}
            </select>
          </div>

          <div style={{ padding: 'var(--space-3)', backgroundColor: 'var(--bg-surface-subtle)', borderRadius: 'var(--radius-md)' }}>
            <h3 style={{ fontSize: 'var(--font-size-md)', fontWeight: 700 }}>{user1.displayName}</h3>
            <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-muted)' }}>@{user1.handle} &bull; {user1.city}</div>
            <p style={{ fontSize: 'var(--font-size-xs)', marginTop: 'var(--space-2)' }}><strong>Occupation:</strong> {user1.occupation}</p>
            <p style={{ fontSize: 'var(--font-size-xs)' }}><strong>Goals:</strong> {user1.relationshipGoals}</p>
            <div style={{ marginTop: 'var(--space-3)' }}>
              <div style={{ fontSize: 'var(--font-size-xs)', fontWeight: 600, color: 'var(--text-muted)' }}>Prompts:</div>
              {user1.profilePromptAnswers.map((p: { id: string; question: string; answer: string }) => (
                <div key={p.id} style={{ marginTop: 'var(--space-2)', fontSize: 'var(--font-size-xs)' }}>
                  <div style={{ fontStyle: 'italic', color: 'var(--text-muted)' }}>"{p.question}"</div>
                  <div style={{ marginTop: '2px', paddingLeft: '8px', borderLeft: '2px solid var(--accent-primary)' }}>{p.answer}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Profile 2 */}
        <div className="card">
          <div style={{ marginBottom: 'var(--space-3)' }}>
            <label style={{ fontSize: 'var(--font-size-xs)', fontWeight: 600, color: 'var(--text-muted)' }}>Select Second Member</label>
            <select
              className="input"
              value={selectedUser2Id}
              onChange={(e) => setSelectedUser2Id(e.target.value)}
              style={{ marginTop: 'var(--space-1)', width: '100%' }}
            >
              {allAvailableUsers.map(u => (
                <option key={u.id} value={u.id}>{u.displayName} ({u.city})</option>
              ))}
            </select>
          </div>

          <div style={{ padding: 'var(--space-3)', backgroundColor: 'var(--bg-surface-subtle)', borderRadius: 'var(--radius-md)' }}>
            <h3 style={{ fontSize: 'var(--font-size-md)', fontWeight: 700 }}>{user2.displayName}</h3>
            <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-muted)' }}>@{user2.handle} &bull; {user2.city}</div>
            <p style={{ fontSize: 'var(--font-size-xs)', marginTop: 'var(--space-2)' }}><strong>Occupation:</strong> {user2.occupation}</p>
            <p style={{ fontSize: 'var(--font-size-xs)' }}><strong>Goals:</strong> {user2.relationshipGoals}</p>
            <div style={{ marginTop: 'var(--space-3)' }}>
              <div style={{ fontSize: 'var(--font-size-xs)', fontWeight: 600, color: 'var(--text-muted)' }}>Prompts:</div>
              {user2.profilePromptAnswers.map((p: { id: string; question: string; answer: string }) => (
                <div key={p.id} style={{ marginTop: 'var(--space-2)', fontSize: 'var(--font-size-xs)' }}>
                  <div style={{ fontStyle: 'italic', color: 'var(--text-muted)' }}>"{p.question}"</div>
                  <div style={{ marginTop: '2px', paddingLeft: '8px', borderLeft: '2px solid var(--accent-secondary)' }}>{p.answer}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
