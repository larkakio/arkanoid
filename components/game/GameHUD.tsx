"use client";

import { useGameStore } from "@/store/gameStore";

export function GameHUD() {
  const { level, score, lives, isPlaying, isPaused, togglePause } = useGameStore();

  if (!isPlaying) return null;

  return (
    <div className="flex justify-between items-center w-full max-w-[400px] mx-auto px-4 py-2 font-rajdhani">
      <div className="text-neon-cyan font-bold text-lg">SCORE: {score}</div>
      <button
        onClick={togglePause}
        className="touch-target min-w-[44px] text-white font-semibold hover:text-neon-cyan transition-colors"
      >
        {isPaused ? "▶" : "⏸"} LVL {level}
      </button>
      <div className="flex gap-1">
        {Array.from({ length: lives }, (_, i) => (
          <span key={i} className="text-red-500 text-xl">❤</span>
        ))}
      </div>
    </div>
  );
}
