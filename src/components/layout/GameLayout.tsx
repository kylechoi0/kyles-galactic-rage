
import React from 'react';
import { GameState } from '@/types/game';
import StarField from '../game/StarField';

interface GameLayoutProps {
  children: React.ReactNode;
  gameState?: GameState;
}

export const GameLayout: React.FC<GameLayoutProps> = ({ children, gameState }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="p-4 border-b border-neon-blue">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl sm:text-3xl font-bold text-gradient animate-pulse-neon">
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
      
      <main className="flex-1 container mx-auto px-4 py-8">
        {children}
      </main>
      
      <footer className="p-4 border-t border-neon-blue text-center text-sm text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} Kyle's Galactic Rage - The Ultimate Space Challenge</p>
      </footer>
      
      <StarField starCount={150} />
    </div>
  );
};

export default GameLayout;
