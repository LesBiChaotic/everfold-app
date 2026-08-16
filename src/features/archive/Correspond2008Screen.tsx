import React from 'react';
import { NavLink } from 'react-router-dom';

export const Correspond2008Screen: React.FC = () => {
  return (
    <div
      className="correspond-2008-screen"
      style={{
        maxWidth: '850px',
        margin: '0 auto',
        backgroundColor: '#faf6f0',
        padding: 'var(--space-6)',
        color: '#2c2520',
        fontFamily: 'Georgia, serif',
      }}
    >
      <div style={{ backgroundColor: '#ffffff', border: '1px solid #dcd5cb', padding: 'var(--space-6)', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #dcd5cb', paddingBottom: 'var(--space-3)', marginBottom: 'var(--space-4)' }}>
          <span style={{ fontSize: '1.5rem', fontWeight: 'bold', letterSpacing: '-0.02em' }}>Correspond (2008)</span>
          <NavLink to="/archive" style={{ color: '#8b6f56', textDecoration: 'none', fontSize: '0.85rem' }}>
            ← Return to Modern Archive
          </NavLink>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
          <div style={{ padding: 'var(--space-4)', backgroundColor: '#f7f4ee', borderLeft: '3px solid #8b6f56' }}>
            <h3 style={{ fontSize: '1.05rem', margin: '0 0 6px' }}>Bulletin #109: When an account is deleted, where does the relational tension go?</h3>
            <div style={{ fontSize: '0.75rem', color: '#776b5d', marginBottom: '8px' }}>By meredith_c (Boston) • November 2, 2008</div>
            <p style={{ fontSize: '0.85rem', lineHeight: 1.6, margin: 0 }}>
              "I have been analyzing the database schema of Correspond and its predecessor Pairwise. When two accounts sever a match, the relationship record does not zero out; it is marked as 'IDLE_CONTAINER'. When a new user joins with similar embeddings, they inherit someone else's unfinished conversation."
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
