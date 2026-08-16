import React, { useEffect } from 'react';
import { Foldmark } from '../brand/Foldmark';
import { useSettingsStore } from '../../store/settingsStore';
import { soundEngine } from '../../audio/soundEngine';

interface MicroCelebrationProps {
  onComplete?: () => void;
  durationMs?: number;
}

export const MicroCelebration: React.FC<MicroCelebrationProps> = ({
  onComplete,
  durationMs = 1600,
}) => {
  const { microCelebrations, reducedMotion } = useSettingsStore();

  useEffect(() => {
    if (microCelebrations) {
      soundEngine.playCue('ui.celebration');
    }
    const timer = setTimeout(() => {
      onComplete?.();
    }, durationMs);
    return () => clearTimeout(timer);
  }, [onComplete, durationMs, microCelebrations]);

  if (!microCelebrations || reducedMotion) return null;

  return (
    <div
      className="micro-celebration"
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 9998,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        animation: 'celebrationFade 1.6s ease-out forwards',
      }}
      aria-hidden="true"
    >
      <div
        style={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Soft Radial Ambient Glow */}
        <div
          style={{
            position: 'absolute',
            width: 140,
            height: 140,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(107, 40, 72, 0.18) 0%, rgba(245, 158, 11, 0.08) 60%, transparent 100%)',
            animation: 'glowPulse 1.4s ease-out',
          }}
        />

        {/* Central Foldmark */}
        <div
          style={{
            animation: 'foldmarkScale 1.2s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          <Foldmark size={44} color="var(--accent-plum)" />
        </div>

        {/* Orbiting Subtle Gem Dots */}
        {[0, 60, 120, 180, 240, 300].map((deg, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              width: 6,
              height: 6,
              borderRadius: '50%',
              backgroundColor: i % 2 === 0 ? 'var(--accent-plum)' : '#d97706',
              transform: `rotate(${deg}deg) translate(${42 + (i % 2) * 12}px)`,
              opacity: 0.75,
              animation: `particleBurst 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards`,
            }}
          />
        ))}
      </div>
    </div>
  );
};
