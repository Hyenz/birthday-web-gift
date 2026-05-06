"use client";

import { useEffect, useState, useCallback, useRef } from "react";

interface Particle {
  id: string;
  x: number;
  y: number;
  size: number;
  color: string;
  velocity: { x: number; y: number };
  alpha: number;
  decay: number;
}

interface Firework {
  id: string;
  x: number;
  y: number;
  targetY: number;
  exploded: boolean;
  color: string;
}

const colors = [
  "rgb(255, 182, 193)",
  "rgb(255, 105, 180)",
  "rgb(255, 192, 203)",
  "rgb(255, 20, 147)",
  "rgb(255, 240, 245)",
];

interface FireworksProps {
  isActive?: boolean;
  duration?: number;
  onComplete?: () => void;
}

export function Fireworks({ isActive = false, duration = 4000, onComplete }: FireworksProps) {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [fireworks, setFireworks] = useState<Firework[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const idCounter = useRef(0);

  const generateId = useCallback(() => {
    idCounter.current += 1;
    return `${Date.now()}-${idCounter.current}`;
  }, []);

  const createExplosion = useCallback((x: number, y: number) => {
    const newParticles: Particle[] = [];
    const particleCount = 25;

    for (let i = 0; i < particleCount; i++) {
      const angle = (Math.PI * 2 * i) / particleCount;
      const speed = 2 + Math.random() * 2;

      newParticles.push({
        id: generateId(),
        x,
        y,
        size: 3 + Math.random() * 3,
        color: colors[Math.floor(Math.random() * colors.length)],
        velocity: {
          x: Math.cos(angle) * speed,
          y: Math.sin(angle) * speed,
        },
        alpha: 1,
        decay: 0.02 + Math.random() * 0.015,
      });
    }

    setParticles((prev) => [...prev.slice(-50), ...newParticles]);
  }, [generateId]);

  const launchFirework = useCallback(() => {
    const newFirework: Firework = {
      id: generateId(),
      x: Math.random() * (typeof window !== "undefined" ? window.innerWidth : 800),
      y: typeof window !== "undefined" ? window.innerHeight : 600,
      targetY: 150 + Math.random() * 200,
      exploded: false,
      color: colors[Math.floor(Math.random() * colors.length)],
    };
    setFireworks((prev) => [...prev.slice(-3), newFirework]);
  }, [generateId]);

  // Start/stop based on isActive prop
  useEffect(() => {
    if (isActive && !isRunning) {
      setIsRunning(true);
      
      // Auto-stop after duration
      const stopTimer = setTimeout(() => {
        setIsRunning(false);
        onComplete?.();
      }, duration);

      return () => clearTimeout(stopTimer);
    }
  }, [isActive, isRunning, duration, onComplete]);

  // Launch interval - only when running
  useEffect(() => {
    if (!isRunning) return;

    const launchInterval = setInterval(() => {
      launchFirework();
    }, 600);

    return () => clearInterval(launchInterval);
  }, [isRunning, launchFirework]);

  // Animation loop
  useEffect(() => {
    if (!isRunning && particles.length === 0 && fireworks.length === 0) return;

    const animationFrame = setInterval(() => {
      setFireworks((prev) =>
        prev
          .map((fw) => {
            if (fw.exploded) return null;
            const newY = fw.y - 10;
            if (newY <= fw.targetY) {
              createExplosion(fw.x, newY);
              return null;
            }
            return { ...fw, y: newY };
          })
          .filter(Boolean) as Firework[]
      );

      setParticles((prev) =>
        prev
          .map((p) => ({
            ...p,
            x: p.x + p.velocity.x,
            y: p.y + p.velocity.y + 0.8,
            velocity: {
              x: p.velocity.x * 0.96,
              y: p.velocity.y * 0.96,
            },
            alpha: p.alpha - p.decay,
          }))
          .filter((p) => p.alpha > 0)
      );
    }, 20);

    return () => clearInterval(animationFrame);
  }, [isRunning, createExplosion, particles.length, fireworks.length]);

  if (!isActive && particles.length === 0 && fireworks.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      {fireworks.map((fw) => (
        <div
          key={fw.id}
          className="absolute w-2 h-2 rounded-full"
          style={{
            left: fw.x,
            top: fw.y,
            backgroundColor: fw.color,
            boxShadow: `0 0 8px ${fw.color}`,
          }}
        />
      ))}
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: p.x,
            top: p.y,
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            opacity: p.alpha,
            transform: "translate(-50%, -50%)",
            boxShadow: `0 0 ${p.size}px ${p.color}`,
          }}
        />
      ))}
    </div>
  );
}
