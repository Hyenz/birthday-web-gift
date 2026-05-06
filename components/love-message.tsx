"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { config } from "@/lib/config";

export function LoveMessage() {
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
          setIsTyping(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [hasStarted]);

  useEffect(() => {
    if (!isTyping) return;

    const text = config.loveMessage;
    let index = 0;

    const interval = setInterval(() => {
      if (index < text.length) {
        setDisplayedText(text.slice(0, index + 1));
        index++;
      } else {
        setIsTyping(false);
        clearInterval(interval);
      }
    }, 25);

    return () => clearInterval(interval);
  }, [isTyping]);

  return (
    <section
      id="love-message"
      ref={sectionRef}
      className="relative min-h-screen py-20 px-4 flex items-center justify-center"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/20 to-background" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="relative z-10 max-w-3xl mx-auto"
      >
        {/* Card */}
        <div className="bg-card/80 backdrop-blur-xl rounded-3xl p-8 md:p-12 shadow-2xl border border-border/50 relative">
          {/* Decorative corner hearts */}
          <div className="absolute -top-3 -left-3 text-primary text-2xl">💕</div>
          <div className="absolute -top-3 -right-3 text-primary text-2xl">💕</div>
          <div className="absolute -bottom-3 -left-3 text-primary text-2xl">💕</div>
          <div className="absolute -bottom-3 -right-3 text-primary text-2xl">💕</div>

          {/* Title */}
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-center mb-8"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            A Letter For You
            <span className="inline-block ml-2">💌</span>
          </motion.h2>

          {/* Message */}
          <div className="relative">
            <p
              className="text-foreground/90 leading-relaxed text-base md:text-lg whitespace-pre-line"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              {displayedText}
              {isTyping && (
                <span className="inline-block w-0.5 h-5 bg-primary ml-1 animate-pulse" />
              )}
            </p>
          </div>

          {/* Signature */}
          {!isTyping && displayedText.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-8 text-right"
            >
              <span className="text-3xl animate-pulse">❤️</span>
            </motion.div>
          )}
        </div>
      </motion.div>
    </section>
  );
}
