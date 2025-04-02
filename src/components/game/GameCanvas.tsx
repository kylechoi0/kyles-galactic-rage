import React, { useEffect, useRef, useState } from 'react';
import { useGameState } from '@/hooks/useGameState';
import { PlayerShip } from './PlayerShip';
import { Enemy } from './Enemy';
import { Bullet } from './Bullet';
import { Explosion } from './Explosion';
import { PowerUp } from './PowerUp';
import { GameControls } from './GameControls';
import { toast } from 'sonner';
import { Gamepad } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

export const GameCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number>(0);
  const { 
    gameState, 
    startGame, 
    pauseGame, 
    resumeGame, 
    movePlayer, 
    firePlayerBullet,
    updateGameState,
    endGame
  } = useGameState();
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (canvasRef.current) {
      const { width, height } = canvasRef.current.getBoundingClientRect();
      setDimensions({ width, height });
    }

    const handleResize = () => {
      if (canvasRef.current) {
        const { width, height } = canvasRef.current.getBoundingClientRect();
        setDimensions({ width, height });
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (!gameState.isGameStarted || gameState.isPaused) return;

    const gameLoop = () => {
      updateGameState(dimensions);
      requestRef.current = requestAnimationFrame(gameLoop);
    };

    requestRef.current = requestAnimationFrame(gameLoop);
    return () => cancelAnimationFrame(requestRef.current);
  }, [gameState.isGameStarted, gameState.isPaused, dimensions, updateGameState]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!gameState.isGameStarted || gameState.isPaused) return;
      
      switch (e.key) {
        case 'ArrowLeft':
          movePlayer('left', dimensions);
          break;
        case 'ArrowRight':
          movePlayer('right', dimensions);
          break;
        case ' ':
          firePlayerBullet();
          break;
        case 'p':
          pauseGame();
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameState.isGameStarted, gameState.isPaused, dimensions, movePlayer, firePlayerBullet, pauseGame]);

  return (
    <div className="flex flex-col items-center justify-center h-screen w-screen relative overflow-hidden">
      <div 
        ref={canvasRef} 
        className="relative w-full h-full bg-game-darker border-2 border-neon-blue overflow-hidden"
      >
        {gameState.isGameStarted && (
          <>
            <PlayerShip player={gameState.player} />
            
            {gameState.enemies.map((enemy, index) => (
              <Enemy key={`enemy-${index}`} enemy={enemy} />
            ))}
            
            {gameState.bullets.map((bullet, index) => (
              <Bullet key={`bullet-${index}`} bullet={bullet} />
            ))}
            
            {gameState.explosions.map((explosion, index) => (
              <Explosion key={`explosion-${index}`} explosion={explosion} />
            ))}
            
            {gameState.powerUps.map((powerUp, index) => (
              <PowerUp key={`powerup-${index}`} powerUp={powerUp} />
            ))}
          </>
        )}

        {!gameState.isGameStarted && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-game-darker bg-opacity-90 z-20">
            <h1 className="text-4xl md:text-6xl font-bold text-gradient mb-8 animate-pulse-neon">
              Kyle's Galactic Rage
            </h1>
            
            <div className="flex flex-col items-center space-y-6">
              <Separator className="w-64 bg-neon-purple mb-4" />
              
              <button 
                onClick={startGame}
                className="flex items-center justify-center px-10 py-4 bg-neon-purple text-white rounded-lg 
                           hover:bg-opacity-80 transition-all transform hover:scale-105 
                           focus:outline-none focus:ring-2 focus:ring-neon-purple focus:ring-opacity-50"
              >
                <Gamepad className="mr-3 h-6 w-6" />
                Start Game
              </button>
            </div>
          </div>
        )}

        {gameState.isPaused && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-70 z-10">
            <h2 className="text-4xl font-bold text-neon-blue mb-8">PAUSED</h2>
            <button 
              onClick={resumeGame}
              className="px-6 py-3 bg-neon-blue text-white rounded-md hover:bg-opacity-80 transition-all"
            >
              Resume
            </button>
          </div>
        )}

        {gameState.isGameOver && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-80 z-10">
            <h2 className="text-4xl font-bold text-neon-red mb-2">GAME OVER</h2>
            <p className="text-xl text-white mb-6">Final Score: {gameState.score}</p>
            <button 
              onClick={startGame}
              className="px-6 py-3 bg-neon-red text-white rounded-md hover:bg-opacity-80 transition-all"
            >
              Play Again
            </button>
          </div>
        )}

        {gameState.isGameStarted && (
          <div className="absolute top-0 left-0 right-0 flex justify-between items-center p-2 bg-game-darker bg-opacity-80 z-5">
            <div className="flex items-center space-x-4">
              <div className="text-neon-green font-bold text-sm">
                LIVES: {gameState.player.lives}
              </div>
              <div className="text-neon-blue font-bold text-sm">
                LEVEL: {gameState.level}
              </div>
            </div>
            <div className="text-neon-yellow font-bold text-sm">
              SCORE: {gameState.score}
            </div>
          </div>
        )}
      </div>

      {gameState.isGameStarted && !gameState.isGameOver && (
        <div className="absolute bottom-8 left-0 right-0 flex justify-center">
          <GameControls 
            onMoveLeft={() => movePlayer('left', dimensions)}
            onMoveRight={() => movePlayer('right', dimensions)}
            onFire={firePlayerBullet}
            onPause={pauseGame}
            onResume={resumeGame}
            isPaused={gameState.isPaused}
          />
        </div>
      )}
    </div>
  );
};

export default GameCanvas;
