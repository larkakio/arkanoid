"use client";

import { useEffect, useRef } from "react";
import { FarcasterReady } from "@/components/FarcasterReady";
import { GameCanvas } from "@/components/game/GameCanvas";
import { GameHUD } from "@/components/game/GameHUD";
import { useGameStore } from "@/store/gameStore";
import { usePersistentStorage } from "@/hooks/usePersistentStorage";
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
  const { isPlaying, startGame, score, gameOver, level } = useGameStore();
  const { leaderboard, saveScore } = usePersistentStorage();

  const savedRef = useRef(false);
  useEffect(() => {
    if (gameOver && score > 0 && !savedRef.current) {
      savedRef.current = true;
      saveScore({
        username: "player",
        displayName: "Player",
        score,
        level,
        timestamp: Date.now(),
      });
    }
    if (!gameOver) savedRef.current = false;
  }, [gameOver, score, level, saveScore]);

  return (
    <main className="min-h-screen bg-[#0a0a0f] flex flex-col items-center justify-center p-4 pb-8">
      <FarcasterReady />
      <AnimatePresence mode="wait">
        {!isPlaying ? (
          <motion.div
            key="home"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex flex-col items-center gap-8 max-w-md w-full"
          >
            <h1
              className="font-orbitron text-4xl md:text-5xl font-bold text-center bg-gradient-to-r from-neon-cyan via-neon-magenta to-neon-cyan bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(0,255,242,0.5)]"
              style={{ textShadow: "0 0 30px rgba(0,255,242,0.3)" }}
            >
              ARKANOID
            </h1>
            <p className="text-gray-400 text-center text-sm md:text-base">
              Break bricks. Collect power-ups. Dominate the leaderboard.
            </p>
            <motion.button
              onClick={startGame}
              className="touch-target min-h-[52px] px-12 py-4 rounded-xl font-orbitron font-bold text-lg bg-gradient-to-r from-neon-cyan to-neon-magenta text-[#0a0a0f] hover:opacity-90 transition-opacity shadow-[0_0_30px_rgba(0,255,242,0.4)]"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              PLAY
            </motion.button>
            <div className="grid grid-cols-3 gap-4 text-center text-xs text-gray-500">
              <div>
                <div className="text-neon-cyan font-semibold">33</div>
                <div>Levels</div>
              </div>
              <div>
                <div className="text-neon-magenta font-semibold">8</div>
                <div>Power-ups</div>
              </div>
              <div>
                <div className="text-electric-purple font-semibold">∞</div>
                <div>Fun</div>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="game"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center gap-2 w-full"
          >
            <GameHUD />
            <GameCanvas />
          </motion.div>
        )}
      </AnimatePresence>
      {gameOver && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/90 flex flex-col items-center justify-center z-50 gap-4 p-4"
        >
          <h2 className="font-orbitron text-2xl text-red-500">GAME OVER</h2>
          <p className="text-white text-xl">Score: {score}</p>
          <div className="text-gray-400 text-sm max-h-32 overflow-y-auto">
            <p className="font-semibold text-neon-cyan mb-2">Top Scores</p>
            {leaderboard.slice(0, 5).map((e, i) => (
              <p key={i}>
                {i + 1}. {e.displayName || e.username} — {e.score}
              </p>
            ))}
          </div>
          <button
            onClick={startGame}
            className="touch-target min-h-[52px] px-8 py-4 rounded-xl font-orbitron font-bold bg-neon-cyan text-[#0a0a0f]"
          >
            Play Again
          </button>
        </motion.div>
      )}
    </main>
  );
}
