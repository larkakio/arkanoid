export const GAME_WIDTH = 400;
export const GAME_HEIGHT = 600;
export const PADDLE_WIDTH = 80;
export const PADDLE_HEIGHT = 16;
export const BALL_RADIUS = 8;
export const BALL_SPEED = 400; // pixels per second
export const BRICK_WIDTH = 36;
export const BRICK_HEIGHT = 18;
export const POWERUP_SIZE = 24;
export const BRICK_COLORS: Record<number, string> = {
  1: "#ff3366",   // Red
  2: "#ff8833",   // Orange
  3: "#ffdd00",   // Yellow
  4: "#00ff88",   // Green
  5: "#3366ff",   // Blue
  6: "#bb66ff",   // Purple
  7: "#ffffff",   // White
  8: "#c0c0c0",   // Silver
  9: "#ffd700",   // Gold
};
export const POWERUP_COLORS: Record<string, string> = {
  enlarge: "#3366ff",
  laser: "#ff3366",
  slow: "#00ff88",
  catch: "#ffdd00",
  disruption: "#00fff2",
  break: "#bb66ff",
  extraLife: "#c0c0c0",
  mega: "#8b5cf6",
};
