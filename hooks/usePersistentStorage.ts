"use client";

import { useEffect, useState, useCallback } from "react";

export interface LeaderboardEntry {
  username: string;
  displayName: string;
  score: number;
  level: number;
  timestamp: number;
}

const STORAGE_KEY = "arkanoid:leaderboard";

export function usePersistentStorage() {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
          setLeaderboard(JSON.parse(stored));
        }
      }
    } catch {
      setLeaderboard([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const saveScore = useCallback(
    (entry: LeaderboardEntry) => {
      const updated = [...leaderboard, entry]
        .sort((a, b) => b.score - a.score)
        .slice(0, 100);
      setLeaderboard(updated);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch {
        // Storage full
      }
    },
    [leaderboard]
  );

  const getPersonalBest = useCallback(
    (username: string) => {
      return leaderboard
        .filter((e) => e.username === username)
        .sort((a, b) => b.score - a.score)[0];
    },
    [leaderboard]
  );

  return { leaderboard, saveScore, getPersonalBest, isLoading };
}
