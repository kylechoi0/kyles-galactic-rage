
import React from 'react';
import { PlayerType } from '@/types/game';

interface PlayerShipProps {
  player: PlayerType;
}

export const PlayerShip: React.FC<PlayerShipProps> = ({ player }) => {
  const getPlayerColor = () => {
    if (player.powerUpActive) {
      return 'text-neon-green filter drop-shadow-lg animate-pulse-neon';
    }
    return 'text-neon-blue';
  };

  return (
    <div 
      className={`absolute ${getPlayerColor()} transition-transform duration-75`}
      style={{
        left: `${player.x}px`,
        top: `${player.y}px`,
        width: `${player.width}px`,
        height: `${player.height}px`,
        transform: player.isMoving ? `rotate(${player.movingDirection === 'left' ? -5 : 5}deg)` : 'rotate(0deg)'
      }}
    >
      <svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <polygon 
          points="20,0 30,30 20,25 10,30" 
          fill="currentColor"
          className="filter drop-shadow-md"
        />
        {player.powerUpActive && (
          <circle cx="20" cy="15" r="10" fill="rgba(0,245,160,0.3)" className="animate-pulse-neon" />
        )}
      </svg>
      
      {/* Engine flames */}
      <div className="absolute bottom-[-5px] left-[45%] w-[10%] h-[30%]">
        <svg viewBox="0 0 10 15" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <polygon 
            points="0,0 5,15 10,0" 
            fill="#FF5722" 
            className="animate-pulse"
          />
        </svg>
      </div>
    </div>
  );
};
