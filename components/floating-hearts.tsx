"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { useMobileDetection } from "@/hooks/use-mobile-detection";

interface Heart {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  speed: number;
  wobble: number;
  wobbleSpeed: number;
}

export function FloatingHearts() {
  const [hearts, setHearts] = useState<Heart[]>([]);
  const { shouldReduceEffects } = useMobileDetection();
  const animationRef = useRef<number | null>(null);

  const createHeart = useCallback(() => {
    const newHeart: Heart = {
      id: Date.now() + Math.random(),
      x: Math.random() * 100,
      y: 105,
      size: 10 + Math.random() * 14,
      opacity: 0.2 + Math.random() * 0.3,
      speed: 0.2 + Math.random() * 0.3,
      wobble: 0,
      wobbleSpeed: 0.015 + Math.random() * 0.02,
    };
    // Limit to fewer hearts on mobile
    const maxHearts = shouldReduceEffects ? 8 : 15;
    setHearts((prev) => [...prev.slice(-maxHearts), newHeart]);
  }, [shouldReduceEffects]);

  useEffect(() => {
    // Slower interval on mobile
    const interval = shouldReduceEffects ? 1500 : 800;
    const timer = setInterval(createHeart, interval);
    return () => clearInterval(timer);
  }, [createHeart, shouldReduceEffects]);

  useEffect(() => {
    let lastTime = 0;
    const fps = shouldReduceEffects ? 20 : 30; // Lower FPS for better performance
    const frameInterval = 1000 / fps;

    const animate = (currentTime: number) => {
      if (currentTime - lastTime >= frameInterval) {
        lastTime = currentTime;
        setHearts((prev) =>
          prev
            .map((heart) => ({
              ...heart,
              y: heart.y - heart.speed,
              wobble: heart.wobble + heart.wobbleSpeed,
            }))
            .filter((heart) => heart.y > -5)
        );
      }
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [shouldReduceEffects]);

  // Don't render on very low-end devices
  if (shouldReduceEffects && hearts.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="absolute will-change-transform"
          style={{
            left: `calc(${heart.x}% + ${Math.sin(heart.wobble) * 20}px)`,
            top: `${heart.y}%`,
            opacity: heart.opacity,
          }}
        >
          <svg
            width={heart.size}
            height={heart.size}
            viewBox="0 0 24 24"
            fill="currentColor"
            className="text-primary"
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </div>
      ))}
    </div>
  );
}
