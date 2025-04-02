
import React from 'react';
import { GameState } from '@/types/game';
import StarField from '../game/StarField';

interface GameLayoutProps {
  children: React.ReactNode;
  gameState?: GameState;
}

export const GameLayout: React.FC<GameLayoutProps> = ({ children, gameState }) => {
  return (
    <div className="h-screen w-screen overflow-hidden flex flex-col relative bg-game-dark">
      <header className="absolute top-0 left-0 right-0 z-10 p-2">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl sm:text-2xl font-bold text-gradient animate-pulse-neon">
            Kyle's Galactic Rage
          </h1>
          
          {gameState && (
            <div className="flex space-x-4">
              <div className="hidden sm:block text-neon-yellow">
                High Score: {gameState.highScore}
              </div>
            </div>
          )}
        </div>
      </header>
      
      <main className="flex-1 relative">
        {children}
      </main>
      
      <footer className="absolute bottom-0 left-0 right-0 p-1 text-center text-xs text-muted-foreground z-10">
        <p>&copy; {new Date().getFullYear()} Kyle's Galactic Rage</p>
      </footer>
      
      <StarField starCount={150} />
    </div>
  );
};

export default GameLayout;
