import React from 'react';

// Inline parser for bold, italic, inline code
export const renderMarkdownText = (text: string): React.ReactNode => {
  if (!text) return text;
  
  // Tokens: `code`, **bold**, *italic*, _italic_
  const parts = text.split(/(`[^`]+`|\*\*[^*]+\*\*|\*[^*]+\*|_[^_]+_)/g);
  
  return parts.map((part, index) => {
    if (part.startsWith('`') && part.endsWith('`') && part.length >= 2) {
      return (
        <code
          key={index}
          style={{
            backgroundColor: 'var(--bg-surface-subtle)',
            padding: '2px 5px',
            borderRadius: '4px',
            fontSize: '0.9em',
            fontFamily: 'monospace',
          }}
        >
          {part.slice(1, -1)}
        </code>
      );
    }
    if (part.startsWith('**') && part.endsWith('**') && part.length >= 4) {
      return <strong key={index}>{part.slice(2, -2)}</strong>;
    }
    if (
      (part.startsWith('*') && part.endsWith('*') && part.length >= 2) ||
      (part.startsWith('_') && part.endsWith('_') && part.length >= 2)
    ) {
      return <em key={index}>{part.slice(1, -1)}</em>;
    }
    return <React.Fragment key={index}>{part}</React.Fragment>;
  });
};

interface Block {
  type: 'h1' | 'h2' | 'h3' | 'h4' | 'blockquote' | 'ul' | 'ol' | 'p';
  items?: string[];
  text?: string;
}

export const MarkdownRenderer: React.FC<{
  content: string;
  className?: string;
  style?: React.CSSProperties;
}> = ({ content, className, style }) => {
  if (!content) return null;

  // Normalize line endings
  const rawLines = content.replace(/\r\n/g, '\n').split('\n');

  const blocks: Block[] = [];
  let currentList: { type: 'ul' | 'ol'; items: string[] } | null = null;
  let currentBlockquote: string[] = [];
  let currentParagraph: string[] = [];

  const flushParagraph = () => {
    if (currentParagraph.length > 0) {
      blocks.push({ type: 'p', text: currentParagraph.join(' ') });
      currentParagraph = [];
    }
  };

  const flushList = () => {
    if (currentList) {
      blocks.push(currentList);
      currentList = null;
    }
  };

  const flushBlockquote = () => {
    if (currentBlockquote.length > 0) {
      blocks.push({ type: 'blockquote', text: currentBlockquote.join('\n') });
      currentBlockquote = [];
    }
  };

  for (let i = 0; i < rawLines.length; i++) {
    const line = rawLines[i].trim();

    if (!line) {
      flushParagraph();
      flushList();
      flushBlockquote();
      continue;
    }

    // Headings
    if (line.startsWith('# ')) {
      flushParagraph();
      flushList();
      flushBlockquote();
      blocks.push({ type: 'h1', text: line.replace(/^#\s+/, '') });
      continue;
    }
    if (line.startsWith('## ')) {
      flushParagraph();
      flushList();
      flushBlockquote();
      blocks.push({ type: 'h2', text: line.replace(/^##\s+/, '') });
      continue;
    }
    if (line.startsWith('### ')) {
      flushParagraph();
      flushList();
      flushBlockquote();
      blocks.push({ type: 'h3', text: line.replace(/^###\s+/, '') });
      continue;
    }
    if (line.startsWith('#### ')) {
      flushParagraph();
      flushList();
      flushBlockquote();
      blocks.push({ type: 'h4', text: line.replace(/^####\s+/, '') });
      continue;
    }

    // Blockquote
    if (line.startsWith('>')) {
      flushParagraph();
      flushList();
      currentBlockquote.push(line.replace(/^>\s?/, ''));
      continue;
    }

    // Unordered List
    if (/^[-*]\s+/.test(line)) {
      flushParagraph();
      flushBlockquote();
      const itemText = line.replace(/^[-*]\s+/, '');
      if (!currentList || currentList.type !== 'ul') {
        flushList();
        currentList = { type: 'ul', items: [itemText] };
      } else {
        currentList.items.push(itemText);
      }
      continue;
    }

    // Ordered List
    if (/^\d+\.\s+/.test(line)) {
      flushParagraph();
      flushBlockquote();
      const itemText = line.replace(/^\d+\.\s+/, '');
      if (!currentList || currentList.type !== 'ol') {
        flushList();
        currentList = { type: 'ol', items: [itemText] };
      } else {
        currentList.items.push(itemText);
      }
      continue;
    }

    // Regular text line
    if (currentList) {
      flushList();
    }
    if (currentBlockquote.length > 0) {
      flushBlockquote();
    }
    currentParagraph.push(line);
  }

  flushParagraph();
  flushList();
  flushBlockquote();

  return (
    <div
      className={`markdown-rendered-content ${className || ''}`}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-3)',
        lineHeight: 1.75,
        ...style,
      }}
    >
      {blocks.map((block, idx) => {
        switch (block.type) {
          case 'h1':
            return (
              <h1
                key={idx}
                style={{
                  fontSize: 'var(--font-size-xl)',
                  fontWeight: 800,
                  margin: 'var(--space-4) 0 var(--space-1)',
                  color: 'var(--text-primary)',
                  letterSpacing: '-0.02em',
                }}
              >
                {renderMarkdownText(block.text || '')}
              </h1>
            );
          case 'h2':
            return (
              <h2
                key={idx}
                style={{
                  fontSize: 'var(--font-size-lg)',
                  fontWeight: 700,
                  margin: 'var(--space-3) 0 var(--space-1)',
                  color: 'var(--text-primary)',
                  letterSpacing: '-0.01em',
                }}
              >
                {renderMarkdownText(block.text || '')}
              </h2>
            );
          case 'h3':
            return (
              <h3
                key={idx}
                style={{
                  fontSize: 'var(--font-size-md)',
                  fontWeight: 700,
                  margin: 'var(--space-3) 0 var(--space-1)',
                  color: 'var(--text-primary)',
                }}
              >
                {renderMarkdownText(block.text || '')}
              </h3>
            );
          case 'h4':
            return (
              <h4
                key={idx}
                style={{
                  fontSize: 'var(--font-size-sm)',
                  fontWeight: 600,
                  margin: 'var(--space-2) 0 2px',
                  color: 'var(--text-primary)',
                }}
              >
                {renderMarkdownText(block.text || '')}
              </h4>
            );
          case 'blockquote':
            return (
              <blockquote
                key={idx}
                style={{
                  margin: 'var(--space-2) 0',
                  padding: 'var(--space-3) var(--space-4)',
                  backgroundColor: 'var(--bg-surface-subtle)',
                  borderLeft: '4px solid var(--accent-primary)',
                  borderRadius: '0 var(--radius-sm) var(--radius-sm) 0',
                  fontSize: '0.95em',
                  fontStyle: 'italic',
                  color: 'var(--text-secondary)',
                  lineHeight: 1.6,
                }}
              >
                {renderMarkdownText(block.text || '')}
              </blockquote>
            );
          case 'ul':
            return (
              <ul
                key={idx}
                style={{
                  margin: 'var(--space-1) 0 var(--space-2)',
                  paddingLeft: 'var(--space-5)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 'var(--space-1)',
                }}
              >
                {block.items?.map((item, itemIdx) => (
                  <li key={itemIdx} style={{ lineHeight: 1.6 }}>
                    {renderMarkdownText(item)}
                  </li>
                ))}
              </ul>
            );
          case 'ol':
            return (
              <ol
                key={idx}
                style={{
                  margin: 'var(--space-1) 0 var(--space-2)',
                  paddingLeft: 'var(--space-5)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 'var(--space-1)',
                }}
              >
                {block.items?.map((item, itemIdx) => (
                  <li key={itemIdx} style={{ lineHeight: 1.6 }}>
                    {renderMarkdownText(item)}
                  </li>
                ))}
              </ol>
            );
          case 'p':
          default:
            return (
              <p
                key={idx}
                style={{
                  margin: 0,
                  color: 'var(--text-primary)',
                  lineHeight: 1.75,
                }}
              >
                {renderMarkdownText(block.text || '')}
              </p>
            );
        }
      })}
    </div>
  );
};
