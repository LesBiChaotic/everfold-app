import React from 'react';
import { ArrowDown } from 'lucide-react';

interface ScrollToNewRepliesChipProps {
  newCount: number;
  onClick: () => void;
}

export const ScrollToNewRepliesChip: React.FC<ScrollToNewRepliesChipProps> = ({ newCount, onClick }) => {
  if (newCount <= 0) return null;

  return (
    <button
      onClick={onClick}
      className="badge badge-subtle"
      style={{
        position: 'sticky',
        bottom: 'var(--space-4)',
        alignSelf: 'center',
        backgroundColor: 'var(--accent-primary)',
        color: 'var(--text-inverse)',
        boxShadow: 'var(--shadow-md)',
        cursor: 'pointer',
        padding: '0.35rem 0.8rem',
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        fontSize: '11px',
        fontWeight: 700,
        zIndex: 20,
        border: 'none',
        borderRadius: 'var(--radius-full)',
      }}
      aria-label={`${newCount} new live replies. Tap to scroll.`}
    >
      <ArrowDown size={13} /> {newCount} new {newCount === 1 ? 'reply' : 'replies'}
    </button>
  );
};
