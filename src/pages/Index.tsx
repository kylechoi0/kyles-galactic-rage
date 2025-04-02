
import { useState } from 'react';
import GameCanvas from '@/components/game/GameCanvas';
import GameLayout from '@/components/layout/GameLayout';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Gamepad, Zap, Star, Rocket, Shield, Heart } from 'lucide-react';

const Index = () => {
  const [showInstructions, setShowInstructions] = useState(false);

  return (
    <GameLayout>
      <div className="h-screen flex flex-col items-center justify-center overflow-hidden">
        <GameCanvas />
        
        {/* Instructions and Controls as Overlays */}
        <div className="absolute top-4 right-4 flex gap-2 z-10">
          <Dialog>
            <DialogTrigger asChild>
              <Button size="sm" variant="outline" className="bg-neon-purple bg-opacity-30 hover:bg-neon-purple/50 border-neon-purple">
                <Gamepad className="mr-2 h-4 w-4" />
                Controls
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
              <Button size="sm" variant="outline" className="bg-neon-green bg-opacity-30 hover:bg-neon-green/50 border-neon-green">
                <Star className="mr-2 h-4 w-4" />
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
                      <Heart className="h-6 w-6 text-white" />
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
                      <Zap className="h-6 w-6 text-black" />
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
                      <Rocket className="h-6 w-6 text-black" />
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
                      <Shield className="h-6 w-6 text-white" />
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
    </GameLayout>
  );
};

export default Index;
