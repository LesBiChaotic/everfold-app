import React, { useState } from 'react';
import { Send, Sparkles } from 'lucide-react';

interface LiveCommentComposerProps {
  placeholder?: string;
  onPost: (text: string) => void;
}

export const LiveCommentComposer: React.FC<LiveCommentComposerProps> = ({
  placeholder = 'Add a comment or observation...',
  onPost,
}) => {
  const [inputText, setInputText] = useState('');
  const intentChips = [
    'Agree',
    'This Happened to Me',
    'Ask for Evidence',
    'Seen This Too',
    'Needs Clarification',
  ];

  const handleChipClick = (chip: string) => {
    setInputText((prev) => (prev ? `${prev} [${chip}]` : `[${chip}] `));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    onPost(inputText.trim());
    setInputText('');
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
      {/* Quick Intent Chips */}
      <div style={{ display: 'flex', gap: 'var(--space-1)', overflowX: 'auto', paddingBottom: '2px' }}>
        {intentChips.map((chip) => (
          <button
            key={chip}
            type="button"
            onClick={() => handleChipClick(chip)}
            className="btn btn-ghost btn-xs"
            style={{
              fontSize: '10px',
              backgroundColor: 'var(--bg-surface-subtle)',
              borderRadius: 'var(--radius-full)',
              padding: '2px 8px',
              whiteSpace: 'nowrap',
            }}
          >
            {chip}
          </button>
        ))}
      </div>

      <div style={{ display: 'flex', gap: 'var(--space-2)', alignItems: 'center' }}>
        <input
          type="text"
          className="input"
          placeholder={placeholder}
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          style={{ flex: 1, minHeight: '40px', fontSize: 'var(--font-size-xs)' }}
        />
        <button type="submit" className="btn btn-primary" style={{ minHeight: '40px', fontSize: 'var(--font-size-xs)' }}>
          <Send size={14} /> Send
        </button>
      </div>
    </form>
  );
};
