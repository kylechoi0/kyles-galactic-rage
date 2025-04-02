
import React, { useEffect, useState } from 'react';
import { ExplosionType } from '@/types/game';

interface ExplosionProps {
  explosion: ExplosionType;
}

export const Explosion: React.FC<ExplosionProps> = ({ explosion }) => {
  const [frame, setFrame] = useState(0);
  const totalFrames = 5;
  
  useEffect(() => {
    const frameInterval = setInterval(() => {
      setFrame(prevFrame => {
        const nextFrame = prevFrame + 1;
        if (nextFrame >= totalFrames) {
          clearInterval(frameInterval);
        }
        return nextFrame;
      });
    }, explosion.duration / totalFrames);
    
    return () => clearInterval(frameInterval);
  }, [explosion.duration]);

  const getExplosionColor = () => {
    switch (explosion.type) {
      case 'small': return 'text-neon-red';
      case 'medium': return 'text-neon-yellow';
      case 'large': return 'text-neon-pink';
      default: return 'text-white';
    }
  };

  const getExplosionSize = () => {
    const baseSize = frame * 20; // Grow with each frame
    switch (explosion.type) {
      case 'small': return baseSize;
      case 'medium': return baseSize * 1.5;
      case 'large': return baseSize * 2;
      default: return baseSize;
    }
  };

  const size = getExplosionSize();
  const opacity = 1 - frame / totalFrames;

  return (
    <div 
      className={`absolute ${getExplosionColor()}`}
      style={{
        left: `${explosion.x - size/2}px`,
        top: `${explosion.y - size/2}px`,
        width: `${size}px`,
        height: `${size}px`,
        opacity: opacity
      }}
    >
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        {/* Outer explosion ring */}
        <circle 
          cx="50" 
          cy="50" 
          r={50 - frame * 5} 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="3"
          opacity={opacity} 
        />
        
        {/* Inner explosion */}
        <circle 
          cx="50" 
          cy="50" 
          r={25 - frame * 2} 
          fill="currentColor" 
          opacity={opacity} 
        />
        
        {/* Explosion particles */}
        {[...Array(8)].map((_, i) => {
          const angle = (i * 45) * Math.PI / 180;
          const distance = 30 + frame * 5;
          const x = 50 + Math.cos(angle) * distance;
          const y = 50 + Math.sin(angle) * distance;
          return (
            <circle 
              key={i} 
              cx={x} 
              cy={y} 
              r={6 - frame * 0.5} 
              fill="white" 
              opacity={opacity * 0.8} 
            />
          );
        })}
      </svg>
    </div>
  );
};
