
import React from 'react';
import { EnemyType } from '@/types/game';

interface EnemyProps {
  enemy: EnemyType;
}

export const Enemy: React.FC<EnemyProps> = ({ enemy }) => {
  // Return different enemy designs based on type
  const renderEnemyDesign = () => {
    switch (enemy.type) {
      case 'basic':
        return (
          <svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <path 
              d="M10,25 L10,15 L15,10 L25,10 L30,15 L30,25 L25,30 L15,30 L10,25 Z" 
              fill="currentColor"
              strokeWidth="2"
              stroke="#FF3366"
            />
            <circle cx="15" cy="20" r="3" fill="#FFF" />
            <circle cx="25" cy="20" r="3" fill="#FFF" />
          </svg>
        );
      
      case 'bomber':
        return (
          <svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <polygon 
              points="20,10 30,15 35,25 20,30 5,25 10,15" 
              fill="currentColor"
              strokeWidth="2"
              stroke="#FF3366"
            />
            <circle cx="20" cy="20" r="5" fill="#FEE440" />
            <circle cx="20" cy="20" r="2" fill="#FF3366" className="animate-pulse" />
          </svg>
        );
      
      case 'elite':
        return (
          <svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg" className="w-full h-full animate-pulse-neon">
            <path 
              d="M5,25 L5,15 L15,5 L25,5 L35,15 L35,25 L25,35 L15,35 L5,25 Z" 
              fill="currentColor"
              strokeWidth="2"
              stroke="#9B5DE5"
            />
            <circle cx="15" cy="18" r="3" fill="#4DEEEA" />
            <circle cx="25" cy="18" r="3" fill="#4DEEEA" />
            <path d="M15,25 Q20,30 25,25" fill="none" stroke="#FFF" strokeWidth="2" />
          </svg>
        );
      
      case 'boss':
        return (
          <svg viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg" className="w-full h-full animate-pulse-neon">
            <polygon 
              points="30,5 45,15 55,30 45,45 30,55 15,45 5,30 15,15" 
              fill="currentColor"
              strokeWidth="3"
              stroke="#FF3366"
            />
            <circle cx="20" cy="20" r="5" fill="#FEE440" />
            <circle cx="40" cy="20" r="5" fill="#FEE440" />
            <path d="M20,40 Q30,50 40,40" fill="none" stroke="#FEE440" strokeWidth="3" />
            <circle cx="30" cy="30" r="8" fill="rgba(255,51,102,0.5)" className="animate-pulse" />
          </svg>
        );
      
      default:
        return (
          <svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <rect x="10" y="10" width="20" height="20" fill="currentColor" />
          </svg>
        );
    }
  };

  const getEnemyColor = () => {
    switch (enemy.type) {
      case 'basic': return 'text-neon-red';
      case 'bomber': return 'text-neon-yellow';
      case 'elite': return 'text-neon-purple';
      case 'boss': return 'text-neon-pink';
      default: return 'text-gray-500';
    }
  };

  return (
    <div 
      className={`absolute ${getEnemyColor()} transition-all duration-300 ${enemy.isDiving ? 'rotate-180' : ''}`}
      style={{
        left: `${enemy.x}px`,
        top: `${enemy.y}px`,
        width: `${enemy.width}px`,
        height: `${enemy.height}px`,
        transform: `scale(${enemy.isDiving ? 1.2 : 1})`,
        transition: 'transform 0.3s ease'
      }}
    >
      {renderEnemyDesign()}
    </div>
  );
};
