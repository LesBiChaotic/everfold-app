import React from 'react';

export const renderMarkdownText = (text: string) => {
  if (!text) return text;
  
  // Split by bold (**text**) or italic (*text*)
  const parts = text.split(/(\*\*.*?\*\*|\*.*?\*)/g);
  
  return parts.map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**') && part.length >= 4) {
      return <strong key={index}>{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith('*') && part.endsWith('*') && part.length >= 2) {
      return <em key={index}>{part.slice(1, -1)}</em>;
    }
    return <React.Fragment key={index}>{part}</React.Fragment>;
  });
};
