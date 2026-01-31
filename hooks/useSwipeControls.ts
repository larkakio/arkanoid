"use client";

import { useEffect, useRef, useState, useCallback } from "react";

export function useSwipeControls(canvasWidth: number, paddleWidth: number) {
  const [paddlePosition, setPaddlePosition] = useState(canvasWidth / 2);
  const [isTouching, setIsTouching] = useState(false);
  const lastTouchX = useRef<number | null>(null);
  const lastTouchTime = useRef(Date.now());
  const animationFrameRef = useRef<number>();

  useEffect(() => {
    setPaddlePosition(canvasWidth / 2);
  }, [canvasWidth]);

  const handleTouchStart = useCallback(
    (e: TouchEvent) => {
      const touch = e.touches[0];
      lastTouchX.current = touch.clientX;
      lastTouchTime.current = Date.now();
      setIsTouching(true);
      if ("vibrate" in navigator) navigator.vibrate(10);
    },
    []
  );

  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      e.preventDefault();
      if (lastTouchX.current === null) return;
      const touch = e.touches[0];
      const deltaX = touch.clientX - lastTouchX.current;
      lastTouchX.current = touch.clientX;
      lastTouchTime.current = Date.now();

      setPaddlePosition((prev) => {
        const newPos = prev + deltaX;
        const minX = paddleWidth / 2;
        const maxX = canvasWidth - paddleWidth / 2;
        return Math.max(minX, Math.min(maxX, newPos));
      });
    },
    [canvasWidth, paddleWidth]
  );

  const handleTouchEnd = useCallback(() => {
    setIsTouching(false);
    lastTouchX.current = null;
  }, []);

  const handleMouseDown = useCallback((e: MouseEvent) => {
    lastTouchX.current = e.clientX;
    setIsTouching(true);
  }, []);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (lastTouchX.current === null || !e.buttons) return;
      const deltaX = e.clientX - lastTouchX.current;
      lastTouchX.current = e.clientX;

      setPaddlePosition((prev) => {
        const newPos = prev + deltaX;
        const minX = paddleWidth / 2;
        const maxX = canvasWidth - paddleWidth / 2;
        return Math.max(minX, Math.min(maxX, newPos));
      });
    },
    [canvasWidth, paddleWidth]
  );

  const handleMouseUp = useCallback(() => {
    setIsTouching(false);
    lastTouchX.current = null;
  }, []);

  useEffect(() => {
    const el = document.getElementById("game-canvas-wrapper");
    if (!el) return;

    el.addEventListener("touchstart", handleTouchStart, { passive: true });
    el.addEventListener("touchmove", handleTouchMove, { passive: false });
    el.addEventListener("touchend", handleTouchEnd);
    el.addEventListener("mousedown", handleMouseDown);
    el.addEventListener("mousemove", handleMouseMove);
    el.addEventListener("mouseup", handleMouseUp);
    el.addEventListener("mouseleave", handleMouseUp);

    return () => {
      el.removeEventListener("touchstart", handleTouchStart);
      el.removeEventListener("touchmove", handleTouchMove);
      el.removeEventListener("touchend", handleTouchEnd);
      el.removeEventListener("mousedown", handleMouseDown);
      el.removeEventListener("mousemove", handleMouseMove);
      el.removeEventListener("mouseup", handleMouseUp);
      el.removeEventListener("mouseleave", handleMouseUp);
      if (animationFrameRef.current)
        cancelAnimationFrame(animationFrameRef.current);
    };
  }, [handleTouchStart, handleTouchMove, handleTouchEnd, handleMouseDown, handleMouseMove, handleMouseUp]);

  const setPosition = useCallback(
    (pos: number) => {
      const minX = paddleWidth / 2;
      const maxX = canvasWidth - paddleWidth / 2;
      setPaddlePosition(Math.max(minX, Math.min(maxX, pos)));
    },
    [canvasWidth, paddleWidth]
  );

  return { paddlePosition, isTouching, setPaddlePosition: setPosition };
}
