import React from 'react';
import { useRewardStore } from '../../store/rewardStore';

interface CosmeticAvatarFrameProps {
  children: React.ReactNode;
  size: number;
  className?: string;
}

export const CosmeticAvatarFrame: React.FC<CosmeticAvatarFrameProps> = ({ children, size, className = '' }) => {
  const { avatarFrameId, avatarBackgroundId } = useRewardStore((state) => state.equippedCosmetics);

  return (
    <div
      className={`cosmetic-avatar-frame ${className}`}
      data-frame={avatarFrameId || 'frame_default'}
      data-background={avatarBackgroundId || 'none'}
      style={{ '--cosmetic-avatar-size': `${size}px` } as React.CSSProperties}
    >
      <div className="cosmetic-avatar-frame__scene">{children}</div>
    </div>
  );
};
