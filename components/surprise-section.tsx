"use client";

import { useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { config } from "@/lib/config";
import { Gift } from "lucide-react";
import { Fireworks } from "./fireworks";
import { useMobileDetection } from "@/hooks/use-mobile-detection";

interface Particle {
  id: string;
  x: number;
  y: number;
  color: string;
  size: number;
  angle: number;
  speed: number;
}

export function SurpriseSection() {
  const [isRevealed, setIsRevealed] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [showFireworks, setShowFireworks] = useState(false);
  const { shouldReduceEffects } = useMobileDetection();
  const idCounter = useRef(0);

  const colors = ["#FFB6C1", "#FF69B4", "#FFC0CB", "#FF1493", "#FFE4E1"];

  const generateId = useCallback(() => {
    idCounter.current += 1;
    return `surprise-${Date.now()}-${idCounter.current}`;
  }, []);

  const createExplosion = useCallback(() => {
    const newParticles: Particle[] = [];
    const count = shouldReduceEffects ? 40 : 60;
    
    for (let i = 0; i < count; i++) {
      newParticles.push({
        id: generateId(),
        x: 50,
        y: 50,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: 4 + Math.random() * 8,
        angle: (Math.PI * 2 * i) / count,
        speed: 4 + Math.random() * 8,
      });
    }
    setParticles(newParticles);
    setTimeout(() => setParticles([]), 2000);
  }, [shouldReduceEffects, generateId]);

  const handleReveal = () => {
    setIsRevealed(true);
    createExplosion();
    
    // Only show fireworks on non-mobile devices
    if (!shouldReduceEffects) {
      setShowFireworks(true);
    }
  };

  const handleFireworksComplete = () => {
    setShowFireworks(false);
  };

  return (
    <section className="relative py-20 px-4 min-h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-accent/10 to-background" />

      {/* Fireworks - only in this section and auto-stops */}
      <Fireworks 
        isActive={showFireworks} 
        duration={4000} 
        onComplete={handleFireworksComplete}
      />

      {/* Explosion particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full"
            style={{
              backgroundColor: particle.color,
              width: particle.size,
              height: particle.size,
              left: `${particle.x}%`,
              top: `${particle.y}%`,
            }}
            initial={{ x: 0, y: 0, opacity: 1 }}
            animate={{
              x: Math.cos(particle.angle) * particle.speed * 40,
              y: Math.sin(particle.angle) * particle.speed * 40 + 80,
              opacity: 0,
            }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />
        ))}
      </div>

      <div className="relative z-10 text-center max-w-2xl mx-auto">
        <AnimatePresence mode="wait">
          {!isRevealed ? (
            <motion.div
              key="button"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="space-y-8"
            >
              {/* Title */}
              <h2
                className="text-3xl md:text-4xl font-bold"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                A Special Surprise Awaits
                <span className="inline-block ml-2">✨</span>
              </h2>

              <p className="text-muted-foreground">
                Click below to reveal something special just for you
              </p>

              {/* Surprise button */}
              <button
                onClick={handleReveal}
                className="group relative px-8 py-4 bg-primary text-primary-foreground rounded-full font-medium text-lg shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 hover:scale-105 active:scale-95 transition-all duration-300"
              >
                <span className="relative z-10 flex items-center gap-3">
                  <Gift className="w-5 h-5" />
                  Click for a Surprise
                  <span className="animate-[wiggle_0.5s_ease-in-out_infinite]">🎁</span>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="revealed"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 250, damping: 25 }}
              className="space-y-8"
            >
              {/* Hearts burst - simplified */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.1 }}
                className="flex justify-center gap-2"
              >
                {[...Array(5)].map((_, i) => (
                  <motion.span
                    key={i}
                    initial={{ y: 0, opacity: 0 }}
                    animate={{ y: [-20, 0], opacity: 1 }}
                    transition={{ delay: 0.2 + i * 0.08, duration: 0.4 }}
                    className="text-3xl"
                  >
                    💕
                  </motion.span>
                ))}
              </motion.div>

              {/* Revealed card */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.4 }}
                className="bg-card/90 backdrop-blur-xl rounded-3xl p-8 md:p-12 shadow-2xl border border-primary/30"
              >
                <div className="text-6xl mb-6 animate-pulse">💖</div>

                <p
                  className="text-xl md:text-2xl text-foreground leading-relaxed"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  {config.surpriseMessage}
                </p>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="mt-8 flex justify-center gap-2"
                >
                  {["❤️", "💕", "💗", "💖", "💝"].map((heart, i) => (
                    <span
                      key={i}
                      className="text-2xl animate-pulse"
                      style={{ animationDelay: `${i * 100}ms` }}
                    >
                      {heart}
                    </span>
                  ))}
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
