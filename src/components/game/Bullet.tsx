
import React from 'react';
import { BulletType } from '@/types/game';

interface BulletProps {
  bullet: BulletType;
}

export const Bullet: React.FC<BulletProps> = ({ bullet }) => {
  const getBulletColor = () => {
    if (bullet.fromPlayer) {
      return bullet.isPoweredUp ? 'text-neon-green' : 'text-neon-blue';
    } else {
      return 'text-neon-red';
    }
  };

  return (
    <div 
      className={`absolute ${getBulletColor()} animate-pulse-neon`}
      style={{
        left: `${bullet.x}px`,
        top: `${bullet.y}px`,
        width: `${bullet.width}px`,
        height: `${bullet.height}px`
      }}
    >
      {bullet.isPoweredUp ? (
        <svg viewBox="0 0 10 20" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <ellipse cx="5" cy="10" rx="5" ry="10" fill="currentColor" />
          <ellipse cx="5" cy="10" rx="3" ry="7" fill="white" opacity="0.7" />
        </svg>
      ) : (
        <svg viewBox="0 0 6 12" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <rect x="0" y="0" width="6" height="12" rx="3" fill="currentColor" />
        </svg>
      )}
    </div>
  );
};
