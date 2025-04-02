
import React from 'react';
import { Button } from '@/components/ui/button';
import { Gamepad, PauseCircle, Play, ArrowLeft, ArrowRight } from 'lucide-react';

interface GameControlsProps {
  onMoveLeft: () => void;
  onMoveRight: () => void;
  onFire: () => void;
  onPause: () => void;
  onResume: () => void;
  isPaused: boolean;
}

export const GameControls: React.FC<GameControlsProps> = ({
  onMoveLeft,
  onMoveRight,
  onFire,
  onPause,
  onResume,
  isPaused
}) => {
  return (
    <div className="w-full p-4 bg-game-darker rounded-lg border border-neon-blue">
      <div className="grid grid-cols-3 gap-2">
        <div className="flex justify-center">
          <Button 
            variant="outline" 
            size="lg"
            className="h-16 w-16 rounded-full bg-game-accent text-white border-neon-blue"
            onTouchStart={onMoveLeft}
            onMouseDown={onMoveLeft}
          >
            <ArrowLeft className="h-8 w-8" />
          </Button>
        </div>
        
        <div className="flex justify-center">
          <Button 
            variant="outline" 
            size="lg"
            className="h-16 w-16 rounded-full bg-neon-red text-white border-neon-red"
            onTouchStart={onFire}
            onMouseDown={onFire}
          >
            <Gamepad className="h-8 w-8" />
          </Button>
        </div>
        
        <div className="flex justify-center">
          <Button 
            variant="outline" 
            size="lg"
            className="h-16 w-16 rounded-full bg-game-accent text-white border-neon-blue"
            onTouchStart={onMoveRight}
            onMouseDown={onMoveRight}
          >
            <ArrowRight className="h-8 w-8" />
          </Button>
        </div>
      </div>
      
      <div className="flex justify-center mt-4">
        <Button 
          variant="outline" 
          size="sm"
          className="px-4 bg-neon-yellow bg-opacity-20 text-neon-yellow border-neon-yellow"
          onClick={isPaused ? onResume : onPause}
        >
          {isPaused ? (
            <>
              <Play className="mr-2 h-4 w-4" />
              Resume
            </>
          ) : (
            <>
              <PauseCircle className="mr-2 h-4 w-4" />
              Pause
            </>
          )}
        </Button>
      </div>
    </div>
  );
};
