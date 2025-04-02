
import { useState, useCallback, useEffect } from 'react';
import { 
  GameState, 
  PlayerType,
  EnemyType,
  BulletType,
  ExplosionType,
  PowerUpType
} from '@/types/game';
import { toast } from 'sonner';

// Constants
const PLAYER_SPEED = 8;
const BULLET_SPEED = 10;
const ENEMY_BULLET_SPEED = 5;
const ENEMY_SPEED = 1.5;
const ENEMY_DIVE_SPEED = 5;
const POWER_UP_SPEED = 2;
const PLAYER_BULLET_COOLDOWN = 300;
const ENEMY_BULLET_COOLDOWN = 2000;
const ENEMY_SPAWN_DELAY = 1000;
const POWER_UP_CHANCE = 0.05;
const DIVE_CHANCE = 0.005;

const initialPlayer: PlayerType = {
  x: 0,
  y: 0,
  width: 40,
  height: 40,
  speed: PLAYER_SPEED,
  lives: 3,
  isMoving: false,
  movingDirection: 'none',
  powerUpActive: false,
  powerUpTimeRemaining: 0,
  lastBulletTime: 0,
  isShielded: false
};

const initialGameState: GameState = {
  isGameStarted: false,
  isPaused: false,
  isGameOver: false,
  score: 0,
  highScore: 0,
  level: 1,
  player: initialPlayer,
  enemies: [],
  bullets: [],
  explosions: [],
  powerUps: [],
  lastEnemySpawnTime: 0,
  gameTime: 0,
  difficultyMultiplier: 1
};

export const useGameState = () => {
  const [gameState, setGameState] = useState<GameState>(initialGameState);
  
  // Load high score from local storage
  useEffect(() => {
    const savedHighScore = localStorage.getItem('kylesGalacticRageHighScore');
    if (savedHighScore) {
      setGameState(prev => ({
        ...prev,
        highScore: parseInt(savedHighScore, 10)
      }));
    }
  }, []);
  
  // Start game
  const startGame = useCallback(() => {
    const centerX = window.innerWidth / 2 - 20;
    const bottomY = window.innerHeight - 100;
    
    setGameState({
      ...initialGameState,
      isGameStarted: true,
      isGameOver: false,
      highScore: gameState.highScore,
      player: {
        ...initialPlayer,
        x: centerX,
        y: bottomY
      }
    });
    
    toast.success("Game started! Destroy the alien invaders!");
  }, [gameState.highScore]);
  
  // Pause game
  const pauseGame = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      isPaused: true
    }));
    toast("Game paused");
  }, []);
  
  // Resume game
  const resumeGame = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      isPaused: false
    }));
    toast("Game resumed");
  }, []);
  
  // End game
  const endGame = useCallback(() => {
    setGameState(prev => {
      // Update high score if current score is higher
      if (prev.score > prev.highScore) {
        localStorage.setItem('kylesGalacticRageHighScore', prev.score.toString());
        toast.success(`New high score: ${prev.score}!`);
        return {
          ...prev,
          isGameOver: true,
          highScore: prev.score
        };
      }
      
      toast.error("Game over!");
      return {
        ...prev,
        isGameOver: true
      };
    });
  }, []);
  
  // Move player
  const movePlayer = useCallback((direction: 'left' | 'right', dimensions: { width: number, height: number }) => {
    setGameState(prev => {
      const player = { ...prev.player };
      
      if (direction === 'left') {
        player.x = Math.max(0, player.x - player.speed);
        player.isMoving = true;
        player.movingDirection = 'left';
      } else {
        player.x = Math.min(dimensions.width - player.width, player.x + player.speed);
        player.isMoving = true;
        player.movingDirection = 'right';
      }
      
      // Reset movement state after a delay
      setTimeout(() => {
        setGameState(current => ({
          ...current,
          player: {
            ...current.player,
            isMoving: false,
            movingDirection: 'none'
          }
        }));
      }, 100);
      
      return {
        ...prev,
        player
      };
    });
  }, []);
  
  // Fire player bullet
  const firePlayerBullet = useCallback(() => {
    setGameState(prev => {
      const currentTime = Date.now();
      
      // Check cooldown
      if (currentTime - prev.player.lastBulletTime < PLAYER_BULLET_COOLDOWN) {
        return prev;
      }
      
      const bulletWidth = prev.player.powerUpActive ? 8 : 6;
      const bulletHeight = prev.player.powerUpActive ? 16 : 12;
      
      const newBullet: BulletType = {
        x: prev.player.x + (prev.player.width / 2) - (bulletWidth / 2),
        y: prev.player.y - bulletHeight,
        width: bulletWidth,
        height: bulletHeight,
        speed: BULLET_SPEED,
        damage: prev.player.powerUpActive ? 2 : 1,
        fromPlayer: true,
        isPoweredUp: prev.player.powerUpActive
      };
      
      // If powered up, fire three bullets
      const bullets = [...prev.bullets, newBullet];
      
      if (prev.player.powerUpActive) {
        // Add two more bullets at angles
        bullets.push({
          ...newBullet,
          x: newBullet.x - 10,
        });
        
        bullets.push({
          ...newBullet,
          x: newBullet.x + 10,
        });
      }
      
      return {
        ...prev,
        player: {
          ...prev.player,
          lastBulletTime: currentTime
        },
        bullets
      };
    });
  }, []);
  
  // Spawn enemies
  const spawnEnemies = useCallback((level: number, difficultyMultiplier: number, dimensions: { width: number, height: number }) => {
    // Create new enemies based on level
    const newEnemies: EnemyType[] = [];
    
    // Basic enemies
    const basicCount = Math.min(5 + level, 10);
    for (let i = 0; i < basicCount; i++) {
      newEnemies.push({
        x: (dimensions.width / (basicCount + 1)) * (i + 1),
        y: 50,
        width: 40,
        height: 40,
        speed: ENEMY_SPEED * difficultyMultiplier,
        health: 1,
        type: 'basic',
        lastBulletTime: 0,
        isDiving: false,
        pointValue: 100
      });
    }
    
    // Bomber enemies (from level 2)
    if (level >= 2) {
      const bomberCount = Math.min(2 + Math.floor(level/2), 6);
      for (let i = 0; i < bomberCount; i++) {
        newEnemies.push({
          x: (dimensions.width / (bomberCount + 1)) * (i + 1),
          y: 100,
          width: 50,
          height: 50,
          speed: ENEMY_SPEED * 0.8 * difficultyMultiplier,
          health: 2,
          type: 'bomber',
          lastBulletTime: 0,
          isDiving: false,
          pointValue: 200
        });
      }
    }
    
    // Elite enemies (from level 3)
    if (level >= 3) {
      const eliteCount = Math.min(1 + Math.floor(level/3), 4);
      for (let i = 0; i < eliteCount; i++) {
        newEnemies.push({
          x: (dimensions.width / (eliteCount + 1)) * (i + 1),
          y: 150,
          width: 60,
          height: 60,
          speed: ENEMY_SPEED * 1.2 * difficultyMultiplier,
          health: 3,
          type: 'elite',
          lastBulletTime: 0,
          isDiving: false,
          pointValue: 300
        });
      }
    }
    
    // Boss enemy (every 5 levels)
    if (level % 5 === 0) {
      newEnemies.push({
        x: dimensions.width / 2 - 40,
        y: 80,
        width: 80,
        height: 80,
        speed: ENEMY_SPEED * 0.7 * difficultyMultiplier,
        health: 10 + level,
        type: 'boss',
        lastBulletTime: 0,
        isDiving: false,
        pointValue: 1000
      });
    }
    
    return newEnemies;
  }, []);
  
  // Update game state
  const updateGameState = useCallback((dimensions: { width: number, height: number }) => {
    setGameState(prev => {
      if (prev.isGameOver || !prev.isGameStarted) return prev;
      
      const currentTime = Date.now();
      let { 
        player, enemies, bullets, explosions, powerUps, 
        score, level, lastEnemySpawnTime, gameTime, difficultyMultiplier 
      } = prev;
      
      // Update game time
      gameTime += 16; // Approximately 60fps
      
      // Update player power-up status
      if (player.powerUpActive && player.powerUpTimeRemaining > 0) {
        player = {
          ...player,
          powerUpTimeRemaining: player.powerUpTimeRemaining - 16
        };
        
        if (player.powerUpTimeRemaining <= 0) {
          player = {
            ...player,
            powerUpActive: false
          };
          toast.info("Power-up expired!");
        }
      }
      
      // Move bullets
      bullets = bullets.map(bullet => ({
        ...bullet,
        y: bullet.fromPlayer ? bullet.y - bullet.speed : bullet.y + bullet.speed
      })).filter(bullet => 
        bullet.y > -bullet.height && 
        bullet.y < dimensions.height + bullet.height
      );
      
      // Move power-ups
      powerUps = powerUps.map(powerUp => ({
        ...powerUp,
        y: powerUp.y + POWER_UP_SPEED
      })).filter(powerUp => powerUp.y < dimensions.height + powerUp.height);
      
      // Remove old explosions
      explosions = explosions.filter(explosion => 
        currentTime - explosion.startTime < explosion.duration
      );
      
      // Spawn new enemies if needed
      if (enemies.length === 0 && currentTime - lastEnemySpawnTime > ENEMY_SPAWN_DELAY) {
        // Level up!
        level += 1;
        difficultyMultiplier = 1 + (level - 1) * 0.1; // Increase difficulty with each level
        
        enemies = spawnEnemies(level, difficultyMultiplier, dimensions);
        lastEnemySpawnTime = currentTime;
        
        toast.success(`Level ${level} - Difficulty increased!`);
      }
      
      // Move enemies
      enemies = enemies.map(enemy => {
        let newX = enemy.x;
        let newY = enemy.y;
        
        if (enemy.isDiving) {
          // Diving enemy moves straight down
          newY = enemy.y + ENEMY_DIVE_SPEED * difficultyMultiplier;
          
          // Reset diving status if enemy goes off-screen
          if (newY > dimensions.height) {
            return {
              ...enemy,
              isDiving: false,
              y: 0,
              x: Math.random() * (dimensions.width - enemy.width)
            };
          }
        } else {
          // Regular left-right movement pattern
          newX = enemy.x + enemy.speed;
          
          // Reverse direction at edges
          if (newX <= 0 || newX >= dimensions.width - enemy.width) {
            return {
              ...enemy,
              speed: -enemy.speed,
              x: newX <= 0 ? 0 : dimensions.width - enemy.width,
              y: enemy.y + 10 // Move down a bit when hitting edge
            };
          }
          
          // Random chance to dive
          if (Math.random() < DIVE_CHANCE * difficultyMultiplier) {
            return {
              ...enemy,
              isDiving: true
            };
          }
          
          // Random chance to fire
          if (currentTime - enemy.lastBulletTime > ENEMY_BULLET_COOLDOWN / difficultyMultiplier) {
            if (Math.random() < 0.1 * difficultyMultiplier) {
              bullets.push({
                x: enemy.x + enemy.width / 2,
                y: enemy.y + enemy.height,
                width: 4,
                height: 8,
                speed: ENEMY_BULLET_SPEED,
                damage: 1,
                fromPlayer: false,
                isPoweredUp: false
              });
              
              return {
                ...enemy,
                x: newX,
                y: newY,
                lastBulletTime: currentTime
              };
            }
          }
        }
        
        return {
          ...enemy,
          x: newX,
          y: newY
        };
      });
      
      // Check bullet collisions with enemies
      bullets = bullets.filter(bullet => {
        if (!bullet.fromPlayer) return true;
        
        let bulletHit = false;
        
        enemies = enemies.map(enemy => {
          // Check for collision
          if (
            bullet.x < enemy.x + enemy.width &&
            bullet.x + bullet.width > enemy.x &&
            bullet.y < enemy.y + enemy.height &&
            bullet.y + bullet.height > enemy.y
          ) {
            bulletHit = true;
            
            // Reduce enemy health
            const newHealth = enemy.health - bullet.damage;
            
            if (newHealth <= 0) {
              // Enemy destroyed
              score += enemy.pointValue;
              
              // Add explosion
              explosions.push({
                x: enemy.x + enemy.width / 2,
                y: enemy.y + enemy.height / 2,
                type: enemy.type === 'boss' ? 'large' : enemy.type === 'basic' ? 'small' : 'medium',
                startTime: currentTime,
                duration: enemy.type === 'boss' ? 1000 : 500
              });
              
              // Random chance to spawn power-up
              if (Math.random() < POWER_UP_CHANCE) {
                const powerUpTypes: PowerUpType['type'][] = ['extraLife', 'speedBoost', 'weaponUpgrade', 'shield'];
                const randomType = powerUpTypes[Math.floor(Math.random() * powerUpTypes.length)];
                
                powerUps.push({
                  x: enemy.x + enemy.width / 2 - 15,
                  y: enemy.y,
                  width: 30,
                  height: 30,
                  type: randomType,
                  duration: 10000
                });
              }
              
              // Destroyed enemy
              return null;
            }
            
            // Enemy still alive
            return {
              ...enemy,
              health: newHealth
            };
          }
          
          return enemy;
        }).filter(Boolean) as EnemyType[];
        
        return !bulletHit;
      });
      
      // Check bullet collisions with player
      bullets = bullets.filter(bullet => {
        if (bullet.fromPlayer) return true;
        
        // Check for collision with player
        if (
          bullet.x < player.x + player.width &&
          bullet.x + bullet.width > player.x &&
          bullet.y < player.y + player.height &&
          bullet.y + bullet.height > player.y
        ) {
          // Only apply damage if player isn't shielded
          if (!player.isShielded) {
            player = {
              ...player,
              lives: player.lives - 1
            };
            
            // Add explosion
            explosions.push({
              x: bullet.x,
              y: bullet.y,
              type: 'small',
              startTime: currentTime,
              duration: 300
            });
            
            // Check for game over
            if (player.lives <= 0) {
              endGame();
            } else {
              toast.error(`Hit! Lives remaining: ${player.lives}`);
            }
          } else {
            // Shield absorbed the hit
            player = {
              ...player,
              isShielded: false
            };
            toast.info("Shield absorbed the hit!");
            
            // Add shield break explosion
            explosions.push({
              x: bullet.x,
              y: bullet.y,
              type: 'small',
              startTime: currentTime,
              duration: 300
            });
          }
          
          return false;
        }
        
        return true;
      });
      
      // Check collision between player and enemies (crashed)
      enemies = enemies.filter(enemy => {
        // Check for collision with player
        if (
          enemy.x < player.x + player.width &&
          enemy.x + enemy.width > player.x &&
          enemy.y < player.y + player.height &&
          enemy.y + enemy.height > player.y
        ) {
          // Only apply damage if player isn't shielded
          if (!player.isShielded) {
            player = {
              ...player,
              lives: player.lives - 1
            };
            
            // Add explosion
            explosions.push({
              x: enemy.x + enemy.width / 2,
              y: enemy.y + enemy.height / 2,
              type: enemy.type === 'boss' ? 'large' : 'medium',
              startTime: currentTime,
              duration: enemy.type === 'boss' ? 1000 : 500
            });
            
            score += enemy.pointValue / 2; // Half points for collisions
            
            // Check for game over
            if (player.lives <= 0) {
              endGame();
            } else {
              toast.error(`Crash! Lives remaining: ${player.lives}`);
            }
          } else {
            // Shield absorbed the crash
            player = {
              ...player,
              isShielded: false
            };
            
            toast.info("Shield protected you from crash!");
            
            // Add shield break explosion
            explosions.push({
              x: enemy.x + enemy.width / 2,
              y: enemy.y + enemy.height / 2,
              type: 'medium',
              startTime: currentTime,
              duration: 500
            });
            
            score += enemy.pointValue; // Full points when shield protects
          }
          
          return false;
        }
        
        return true;
      });
      
      // Check for power-up collection
      powerUps = powerUps.filter(powerUp => {
        // Check for collision with player
        if (
          powerUp.x < player.x + player.width &&
          powerUp.x + powerUp.width > player.x &&
          powerUp.y < player.y + player.height &&
          powerUp.y + powerUp.height > player.y
        ) {
          // Apply power-up effect
          switch (powerUp.type) {
            case 'extraLife':
              player = {
                ...player,
                lives: player.lives + 1
              };
              toast.success("Extra life collected! Lives: " + (player.lives));
              break;
              
            case 'speedBoost':
              player = {
                ...player,
                speed: PLAYER_SPEED * 1.5,
                powerUpActive: true,
                powerUpTimeRemaining: powerUp.duration
              };
              toast.success("Speed boost activated!");
              break;
              
            case 'weaponUpgrade':
              player = {
                ...player,
                powerUpActive: true,
                powerUpTimeRemaining: powerUp.duration
              };
              toast.success("Weapon upgrade activated!");
              break;
              
            case 'shield':
              player = {
                ...player,
                isShielded: true
              };
              toast.success("Shield activated!");
              break;
          }
          
          return false;
        }
        
        return true;
      });
      
      return {
        ...prev,
        player,
        enemies,
        bullets,
        explosions,
        powerUps,
        score,
        level,
        lastEnemySpawnTime,
        gameTime,
        difficultyMultiplier
      };
    });
  }, [endGame, spawnEnemies]);
  
  return {
    gameState,
    startGame,
    pauseGame,
    resumeGame,
    endGame,
    movePlayer,
    firePlayerBullet,
    updateGameState
  };
};
