import React, { useEffect, useState } from 'react';
import { RotateCcw, CheckCircle2, X } from 'lucide-react';
import { soundEngine } from '../../audio/soundEngine';

interface UndoToastProps {
  message: string;
  onUndo: () => void;
  onDismiss: () => void;
  durationMs?: number;
}

export const UndoToast: React.FC<UndoToastProps> = ({
  message,
  onUndo,
  onDismiss,
  durationMs = 8000,
}) => {
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const remaining = Math.max(0, 100 - (elapsed / durationMs) * 100);
      setProgress(remaining);
      if (elapsed >= durationMs) {
        clearInterval(interval);
        onDismiss();
      }
    }, 50);

    return () => clearInterval(interval);
  }, [durationMs, onDismiss]);

  const handleUndo = () => {
    soundEngine.playCue('ui.undo');
    onUndo();
    onDismiss();
  };

  return (
    <div
      className="undo-toast"
      style={{
        position: 'fixed',
        bottom: 'calc(var(--mobile-nav-height, 64px) + 16px)',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--space-3)',
        backgroundColor: 'var(--bg-surface)',
        border: '1px solid var(--border-default)',
        borderRadius: 'var(--radius-full)',
        boxShadow: 'var(--shadow-lg)',
        padding: '8px 16px',
        maxWidth: '92vw',
        width: 'max-content',
        animation: 'slideUpToast 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
      role="status"
      aria-live="polite"
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <CheckCircle2 size={16} color="var(--color-success)" />
        <span style={{ fontSize: 'var(--font-size-xs)', fontWeight: 600, color: 'var(--text-primary)' }}>
          {message}
        </span>
      </div>

      <button
        type="button"
        className="btn btn-secondary btn-xs"
        onClick={handleUndo}
        style={{
          borderRadius: 'var(--radius-full)',
          padding: '4px 10px',
          fontSize: '11px',
          gap: '4px',
        }}
      >
        <RotateCcw size={12} /> Undo
      </button>

      <button
        type="button"
        className="btn-ghost"
        onClick={onDismiss}
        style={{ width: 22, height: 22, padding: 0, color: 'var(--text-muted)' }}
        aria-label="Dismiss toast"
      >
        <X size={13} />
      </button>

      {/* Subtle timer line */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: '15%',
          width: `${progress * 0.7}%`,
          height: '2px',
          backgroundColor: 'var(--accent-plum)',
          borderRadius: '1px',
          opacity: 0.6,
          transition: 'width 0.05s linear',
        }}
      />
    </div>
  );
};
