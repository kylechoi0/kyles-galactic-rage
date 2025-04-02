
import { useState } from 'react';
import GameCanvas from '@/components/game/GameCanvas';
import GameLayout from '@/components/layout/GameLayout';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { gamepad, zap, star, rocket, shield, heart } from 'lucide-react';

const Index = () => {
  const [showInstructions, setShowInstructions] = useState(false);

  return (
    <GameLayout>
      <div className="flex flex-col items-center gap-6">
        <div className="text-center mb-4">
          <h1 className="text-3xl md:text-5xl font-bold text-gradient mb-4 animate-pulse-neon">
            Kyle's Galactic Rage
          </h1>
          <p className="text-lg text-neon-blue mb-6">
            A high-difficulty galaga-style space shooter
          </p>
          
          {/* Instructions and Controls Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-neon-purple text-white hover:bg-neon-purple/80">
                  <gamepad className="mr-2 h-4 w-4" />
                  How to Play
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md bg-game-space border-neon-blue">
                <DialogHeader>
                  <DialogTitle className="text-neon-blue">Game Controls</DialogTitle>
                  <DialogDescription>
                    Master these controls to survive the galactic onslaught
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-[1fr_2fr] items-center gap-4">
                    <div className="text-right font-bold text-neon-yellow">Movement:</div>
                    <div>Arrow keys (Left/Right) or touch controls</div>
                  </div>
                  <div className="grid grid-cols-[1fr_2fr] items-center gap-4">
                    <div className="text-right font-bold text-neon-yellow">Fire:</div>
                    <div>Spacebar or Fire button</div>
                  </div>
                  <div className="grid grid-cols-[1fr_2fr] items-center gap-4">
                    <div className="text-right font-bold text-neon-yellow">Pause:</div>
                    <div>'P' key or Pause button</div>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
            
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-neon-green text-black hover:bg-neon-green/80">
                  <star className="mr-2 h-4 w-4" />
                  Power-Ups
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md bg-game-space border-neon-blue">
                <DialogHeader>
                  <DialogTitle className="text-neon-blue">Power-Ups Guide</DialogTitle>
                  <DialogDescription>
                    Collect these to enhance your fighting capabilities
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-[80px_1fr] items-center gap-4">
                    <div className="flex justify-center">
                      <div className="w-10 h-10 bg-neon-red rounded-full flex items-center justify-center">
                        <heart className="h-6 w-6 text-white" />
                      </div>
                    </div>
                    <div>
                      <h4 className="font-bold text-neon-red">Extra Life</h4>
                      <p className="text-sm">Grants an additional life</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-[80px_1fr] items-center gap-4">
                    <div className="flex justify-center">
                      <div className="w-10 h-10 bg-neon-yellow rounded-full flex items-center justify-center">
                        <zap className="h-6 w-6 text-black" />
                      </div>
                    </div>
                    <div>
                      <h4 className="font-bold text-neon-yellow">Speed Boost</h4>
                      <p className="text-sm">Increases ship speed temporarily</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-[80px_1fr] items-center gap-4">
                    <div className="flex justify-center">
                      <div className="w-10 h-10 bg-neon-green rounded-full flex items-center justify-center">
                        <rocket className="h-6 w-6 text-black" />
                      </div>
                    </div>
                    <div>
                      <h4 className="font-bold text-neon-green">Weapon Upgrade</h4>
                      <p className="text-sm">Triple shot with increased damage</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-[80px_1fr] items-center gap-4">
                    <div className="flex justify-center">
                      <div className="w-10 h-10 bg-neon-blue rounded-full flex items-center justify-center">
                        <shield className="h-6 w-6 text-white" />
                      </div>
                    </div>
                    <div>
                      <h4 className="font-bold text-neon-blue">Shield</h4>
                      <p className="text-sm">Absorbs one hit from enemies</p>
                    </div>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
        
        {/* Game Canvas */}
        <GameCanvas />
        
        {/* Game description */}
        <div className="mt-8 max-w-2xl text-center">
          <h2 className="text-xl font-bold text-neon-yellow mb-3">About Kyle's Galactic Rage</h2>
          <p className="text-gray-300 mb-4">
            Face off against increasingly challenging waves of alien invaders in this 
            high-difficulty tribute to classic arcade shooters. Each level brings 
            tougher enemies, faster bullets, and more aggressive attack patterns.
          </p>
          <p className="text-neon-green">
            Can you become the ultimate defender of the galaxy?
          </p>
        </div>
      </div>
    </GameLayout>
  );
};

export default Index;
