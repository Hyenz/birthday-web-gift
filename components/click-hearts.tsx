"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useMobileDetection } from "@/hooks/use-mobile-detection";

interface ClickHeart {
  id: number;
  x: number;
  y: number;
}

export function ClickHearts() {
  const [hearts, setHearts] = useState<ClickHeart[]>([]);
  const { shouldReduceEffects } = useMobileDetection();
  const lastClickRef = useRef(0);

  const addHeart = useCallback((x: number, y: number) => {
    const now = Date.now();
    // Throttle clicks - at least 150ms between hearts
    if (now - lastClickRef.current < 150) return;
    lastClickRef.current = now;

    const newHeart: ClickHeart = { id: now, x, y };
    setHearts((prev) => [...prev.slice(-5), newHeart]); // Limit to 6 hearts max
  }, []);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      addHeart(e.clientX, e.clientY);
    };

    window.addEventListener("click", handleClick, { passive: true });
    return () => window.removeEventListener("click", handleClick);
  }, [addHeart]);

  // Auto-cleanup hearts
  useEffect(() => {
    if (hearts.length === 0) return;
    
    const timer = setTimeout(() => {
      setHearts((prev) => prev.slice(1));
    }, 800);

    return () => clearTimeout(timer);
  }, [hearts]);

  // Reduce effect on mobile
  if (shouldReduceEffects && hearts.length > 2) {
    setHearts((prev) => prev.slice(-2));
  }

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      <AnimatePresence>
        {hearts.map((heart) => (
          <motion.div
            key={heart.id}
            initial={{ 
              x: heart.x - 12, 
              y: heart.y - 12, 
              scale: 0, 
              opacity: 1 
            }}
            animate={{
              y: heart.y - 80,
              scale: [0, 1.2, 1],
              opacity: [1, 1, 0],
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="absolute text-2xl"
          >
            💕
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
