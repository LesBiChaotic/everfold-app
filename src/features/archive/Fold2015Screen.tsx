import React from 'react';
import { NavLink } from 'react-router-dom';

export const Fold2015Screen: React.FC = () => {
  return (
    <div
      className="fold-2015-screen"
      style={{
        maxWidth: '850px',
        margin: '0 auto',
        backgroundColor: '#f0f2f5',
        padding: 'var(--space-6)',
        color: '#1c1e21',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
      }}
    >
      <div style={{ backgroundColor: '#ffffff', border: '1px solid #dddfe2', borderRadius: '8px', padding: 'var(--space-6)', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e5e5e5', paddingBottom: 'var(--space-3)', marginBottom: 'var(--space-4)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: 24, height: 24, borderRadius: '4px', backgroundColor: '#3b5998', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '0.8rem' }}>F</div>
            <span style={{ fontSize: '1.3rem', fontWeight: 600 }}>Fold (Beta 2015)</span>
          </div>
          <NavLink to="/archive" style={{ color: '#3b5998', textDecoration: 'none', fontSize: '0.85rem' }}>
            ← Return to Modern Archive
          </NavLink>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
          <div style={{ padding: 'var(--space-4)', backgroundColor: '#f7f8fa', borderRadius: '6px' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 600, margin: '0 0 6px' }}>Case EF-TS-2218: Meredith Cole Relational Container</h3>
            <div style={{ fontSize: '0.75rem', color: '#65676b', marginBottom: '8px' }}>Status: Invariant Node (September 2017)</div>
            <p style={{ fontSize: '0.85rem', lineHeight: 1.5, margin: 0 }}>
              "When participant Meredith Cole passed away, the automated Forecast service continued to fire 30-day and 1-year trajectory milestones for her partner. Relational container #4417 was marked as an immortal lattice coordinate."
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
