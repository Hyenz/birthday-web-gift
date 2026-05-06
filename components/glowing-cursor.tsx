"use client";

import { useEffect, useState, useRef } from "react";
import { useMobileDetection } from "@/hooks/use-mobile-detection";

export function GlowingCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const { isMobile } = useMobileDetection();
  const rafRef = useRef<number | null>(null);
  const targetRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Don't show on mobile
    if (isMobile) return;

    const handleMouseMove = (e: MouseEvent) => {
      targetRef.current = { x: e.clientX, y: e.clientY };
      setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    // Smooth animation loop with lower frequency
    const animate = () => {
      setMousePosition((prev) => ({
        x: prev.x + (targetRef.current.x - prev.x) * 0.15,
        y: prev.y + (targetRef.current.y - prev.y) * 0.15,
      }));
      rafRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isMobile]);

  // Don't render on mobile
  if (isMobile || !isVisible) return null;

  return (
    <>
      {/* Main glow - simplified */}
      <div
        className="fixed pointer-events-none z-40 w-[200px] h-[200px] rounded-full bg-primary/8 blur-3xl will-change-transform"
        style={{
          transform: `translate(${mousePosition.x - 100}px, ${mousePosition.y - 100}px)`,
        }}
      />

      {/* Small cursor dot */}
      <div
        className="fixed pointer-events-none z-50 w-2 h-2 bg-primary rounded-full will-change-transform"
        style={{
          transform: `translate(${mousePosition.x - 4}px, ${mousePosition.y - 4}px)`,
          boxShadow: "0 0 12px rgba(255, 182, 193, 0.6)",
        }}
      />
    </>
  );
}
