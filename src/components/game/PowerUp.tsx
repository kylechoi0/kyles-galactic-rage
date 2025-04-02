
import React from 'react';
import { PowerUpType } from '@/types/game';

interface PowerUpProps {
  powerUp: PowerUpType;
}

export const PowerUp: React.FC<PowerUpProps> = ({ powerUp }) => {
  const getPowerUpColor = () => {
    switch (powerUp.type) {
      case 'extraLife': return 'text-neon-red';
      case 'speedBoost': return 'text-neon-yellow';
      case 'weaponUpgrade': return 'text-neon-green';
      case 'shield': return 'text-neon-blue';
      default: return 'text-white';
    }
  };

  const renderPowerUpIcon = () => {
    switch (powerUp.type) {
      case 'extraLife':
        return (
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-full h-full animate-pulse-neon">
            <path d="M12,21.35l-1.45-1.32C5.4,15.36,2,12.28,2,8.5C2,5.42,4.42,3,7.5,3c1.74,0,3.41,0.81,4.5,2.09C13.09,3.81,14.76,3,16.5,3C19.58,3,22,5.42,22,8.5c0,3.78-3.4,6.86-8.55,11.54L12,21.35z" fill="currentColor" />
          </svg>
        );
      
      case 'speedBoost':
        return (
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-full h-full animate-pulse-neon">
            <path d="M13.5,2l-7.5,7.5l3,3l-6,6.5l9,-7.5l-3,-3z" fill="currentColor" />
          </svg>
        );
      
      case 'weaponUpgrade':
        return (
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-full h-full animate-pulse-neon">
            <rect x="4" y="14" width="16" height="6" rx="1" fill="currentColor" />
            <rect x="10" y="4" width="4" height="10" fill="currentColor" />
          </svg>
        );
      
      case 'shield':
        return (
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-full h-full animate-pulse-neon">
            <path d="M12,2L4,5v6.09c0,5.05,3.41,9.76,8,10.91c4.59,-1.15,8,-5.86,8,-10.91V5L12,2z" fill="currentColor" opacity="0.7" />
            <path d="M12,7v10c2.75,-0.69,4.8,-3.52,4.8,-6.55V8.5L12,7z" fill="white" opacity="0.3" />
          </svg>
        );
      
      default:
        return (
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <circle cx="12" cy="12" r="10" fill="currentColor" />
          </svg>
        );
    }
  };

  return (
    <div 
      className={`absolute ${getPowerUpColor()} animate-float`}
      style={{
        left: `${powerUp.x}px`,
        top: `${powerUp.y}px`,
        width: `${powerUp.width}px`,
        height: `${powerUp.height}px`,
        filter: 'drop-shadow(0 0 5px currentColor)'
      }}
    >
      {renderPowerUpIcon()}
    </div>
  );
};
