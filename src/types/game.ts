
// Game State
export interface GameState {
  isGameStarted: boolean;
  isPaused: boolean;
  isGameOver: boolean;
  score: number;
  highScore: number;
  level: number;
  player: PlayerType;
  enemies: EnemyType[];
  bullets: BulletType[];
  explosions: ExplosionType[];
  powerUps: PowerUpType[];
  lastEnemySpawnTime: number;
  gameTime: number;
  difficultyMultiplier: number;
}

// Player Ship
export interface PlayerType {
  x: number;
  y: number;
  width: number;
  height: number;
  speed: number;
  lives: number;
  isMoving: boolean;
  movingDirection: 'left' | 'right' | 'none';
  powerUpActive: boolean;
  powerUpTimeRemaining: number;
  lastBulletTime: number;
  isShielded: boolean;
}

// Enemy Ship
export interface EnemyType {
  x: number;
  y: number;
  width: number;
  height: number;
  speed: number;
  health: number;
  type: 'basic' | 'bomber' | 'elite' | 'boss';
  lastBulletTime: number;
  isDiving: boolean;
  pointValue: number;
}

// Bullet
export interface BulletType {
  x: number;
  y: number;
  width: number;
  height: number;
  speed: number;
  damage: number;
  fromPlayer: boolean;
  isPoweredUp: boolean;
}

// Explosion
export interface ExplosionType {
  x: number;
  y: number;
  type: 'small' | 'medium' | 'large';
  startTime: number;
  duration: number;
}

// Power-Up
export interface PowerUpType {
  x: number;
  y: number;
  width: number;
  height: number;
  type: 'extraLife' | 'speedBoost' | 'weaponUpgrade' | 'shield';
  duration: number;
}
