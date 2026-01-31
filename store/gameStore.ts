import { create } from "zustand";
import type { Ball, Brick, PowerUp, Enemy, Particle } from "@/types/game";
import { LEVELS } from "@/lib/levelData";
import {
  GAME_WIDTH,
  GAME_HEIGHT,
  PADDLE_WIDTH,
  PADDLE_HEIGHT,
  BALL_RADIUS,
  BALL_SPEED,
  BRICK_WIDTH,
  BRICK_HEIGHT,
  BRICK_COLORS,
} from "@/lib/constants";
import type { BrickType } from "@/types/game";

function createBricksFromLayout(levelId: number): Brick[] {
  const level = LEVELS.find((l) => l.id === levelId) || LEVELS[0];
  const bricks: Brick[] = [];
  const startX = (GAME_WIDTH - level.brickLayout[0]?.length * BRICK_WIDTH) / 2 + BRICK_WIDTH / 2;
  const startY = 80;

  level.brickLayout.forEach((row, rowIdx) => {
    row.forEach((cell, colIdx) => {
      if (cell === 0) return;
      const x = startX + colIdx * BRICK_WIDTH;
      const y = startY + rowIdx * BRICK_HEIGHT;
      const type = cell as BrickType;
      const hitsRequired = type === 8 ? Math.min(2 + Math.floor(levelId / 8), 5) : type === 9 ? 999 : 1;
      const points = type <= 7 ? 100 - (type - 1) * 10 : type === 8 ? 50 * levelId : 0;
      bricks.push({
        x,
        y,
        width: BRICK_WIDTH - 2,
        height: BRICK_HEIGHT - 2,
        type,
        hits: 0,
        hitsRequired,
        points,
        id: `brick-${rowIdx}-${colIdx}`,
      });
    });
  });
  return bricks;
}

interface GameState {
  // Game state
  isPlaying: boolean;
  isPaused: boolean;
  gameOver: boolean;
  level: number;
  score: number;
  lives: number;
  paddleX: number;
  paddleWidth: number;
  balls: Ball[];
  bricks: Brick[];
  powerUps: PowerUp[];
  enemies: Enemy[];
  particles: Particle[];
  ballSpeed: number;
  // Power-up states
  catchMode: boolean;
  ballStuck: boolean;
  hasLaser: boolean;
  enlarged: boolean;
  // Actions
  startGame: () => void;
  resetLevel: () => void;
  setPaddleX: (x: number) => void;
  setBalls: (balls: Ball[] | ((b: Ball[]) => Ball[])) => void;
  setBricks: (bricks: Brick[] | ((b: Brick[]) => Brick[])) => void;
  setPowerUps: (p: PowerUp[] | ((p: PowerUp[]) => PowerUp[])) => void;
  addParticle: (p: Particle) => void;
  addScore: (s: number) => void;
  loseLife: () => void;
  nextLevel: () => void;
  togglePause: () => void;
  applyPowerUp: (type: string) => void;
  releaseBall: () => void;
  fireLaser: () => void;
}

const createInitialBall = (): Ball => ({
  x: GAME_WIDTH / 2,
  y: GAME_HEIGHT - PADDLE_HEIGHT - 50,
  vx: 0,
  vy: -BALL_SPEED,
  radius: BALL_RADIUS,
  isMega: false,
  id: "ball-0",
});

export const useGameStore = create<GameState>((set, get) => ({
  isPlaying: false,
  isPaused: false,
  gameOver: false,
  level: 1,
  score: 0,
  lives: 3,
  paddleX: GAME_WIDTH / 2,
  paddleWidth: PADDLE_WIDTH,
  balls: [],
  bricks: [],
  powerUps: [],
  enemies: [],
  particles: [],
  ballSpeed: BALL_SPEED,
  catchMode: false,
  ballStuck: true,
  hasLaser: false,
  enlarged: false,

  startGame: () =>
    set({
      isPlaying: true,
      isPaused: false,
      gameOver: false,
      level: 1,
      score: 0,
      lives: 3,
      paddleX: GAME_WIDTH / 2,
      paddleWidth: PADDLE_WIDTH,
      balls: [createInitialBall()],
      bricks: createBricksFromLayout(1),
      powerUps: [],
      particles: [],
      ballStuck: true,
      catchMode: false,
      hasLaser: false,
      enlarged: false,
    }),

  resetLevel: () =>
    set((s) => ({
      balls: [createInitialBall()],
      bricks: createBricksFromLayout(s.level),
      powerUps: [],
      ballStuck: true,
    })),

  setPaddleX: (x) =>
    set((s) => ({
      paddleX: Math.max(s.paddleWidth / 2, Math.min(GAME_WIDTH - s.paddleWidth / 2, x)),
    })),

  setBalls: (balls) =>
    set((s) => ({
      balls: typeof balls === "function" ? balls(s.balls) : balls,
    })),

  setBricks: (bricks) =>
    set((s) => ({
      bricks: typeof bricks === "function" ? bricks(s.bricks) : bricks,
    })),

  setPowerUps: (p) =>
    set((s) => ({
      powerUps: typeof p === "function" ? p(s.powerUps) : p,
    })),

  addParticle: (p) =>
    set((s) => ({ particles: [...s.particles, p].slice(-100) })),

  addScore: (s) => set((state) => ({ score: state.score + s })),

  loseLife: () => set((s) => ({ lives: s.lives - 1 })),

  nextLevel: () =>
    set((s) => ({
      level: Math.min(s.level + 1, LEVELS.length),
      balls: [{ ...createInitialBall(), vy: -s.ballSpeed }],
      bricks: createBricksFromLayout(Math.min(s.level + 1, LEVELS.length)),
      powerUps: [],
      ballStuck: true,
      enlarged: false,
      hasLaser: false,
      catchMode: false,
    })),

  togglePause: () => set((s) => ({ isPaused: !s.isPaused })),

  applyPowerUp: (type) => {
    const s = get();
    set({
      enlarged: type === "enlarge" ? true : s.enlarged,
      hasLaser: type === "laser" ? true : s.hasLaser,
      ballSpeed: type === "slow" ? BALL_SPEED * 0.5 : BALL_SPEED,
      catchMode: type === "catch" ? true : s.catchMode,
      lives: type === "extraLife" ? s.lives + 1 : s.lives,
      paddleWidth:
        type === "enlarge"
          ? PADDLE_WIDTH * 1.5
          : s.enlarged
            ? PADDLE_WIDTH * 1.5
            : PADDLE_WIDTH,
    });
    if (type === "disruption" && s.balls.length > 0) {
      const b = s.balls[0];
      const speed = s.ballSpeed || BALL_SPEED;
      const scale = speed / 5;
      set({
        balls: [
          { ...b, id: "ball-0", vx: -1.5 * scale, vy: -2.5 * scale },
          { ...b, id: "ball-1", vx: 0, vy: -3 * scale },
          { ...b, id: "ball-2", vx: 1.5 * scale, vy: -2.5 * scale },
        ],
      });
    }
  },

  releaseBall: () =>
    set((s) => {
      if (!s.ballStuck) return { ballStuck: false };
      if (s.balls.length === 0) return { ballStuck: false };
      const ball = s.balls[0];
      if (ball.vx === 0 && ball.vy === 0) {
        return {
          ballStuck: false,
          balls: [{ ...ball, vy: -(s.ballSpeed || BALL_SPEED), vx: 0 }],
        };
      }
      return { ballStuck: false };
    }),

  fireLaser: () => {},
}));
