"use client";

import { motion } from "framer-motion";
import { config } from "@/lib/config";
import { ChevronDown } from "lucide-react";

export function HeroSection() {
  const scrollToContent = () => {
    const element = document.getElementById("love-message");
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/30 to-background" />

      {/* Simplified glowing orbs - CSS only */}
      <div className="absolute top-1/4 left-1/4 w-48 h-48 bg-primary/15 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-accent/15 rounded-full blur-3xl" />

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 text-center max-w-4xl mx-auto"
      >
        {/* Decorative hearts - simplified */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="flex justify-center gap-4 mb-8"
        >
          {[24, 32, 40].map((size, i) => (
            <svg
              key={i}
              width={size}
              height={size}
              viewBox="0 0 24 24"
              fill="currentColor"
              className="text-primary animate-pulse"
              style={{ animationDelay: `${i * 200}ms` }}
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          ))}
        </motion.div>

        {/* Main title */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-4xl sm:text-5xl md:text-7xl font-bold text-foreground mb-6 tracking-tight"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          {config.heroTitle}
          <span className="inline-block ml-2 animate-pulse">❤️</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="text-lg sm:text-xl md:text-2xl text-muted-foreground mb-4"
        >
          For my dearest{" "}
          <span className="text-primary font-semibold">
            {config.girlfriendName}
          </span>
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="text-base sm:text-lg text-muted-foreground/80 mb-12"
        >
          {config.subtitle}
        </motion.p>

        {/* CTA Button */}
        <motion.button
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          onClick={scrollToContent}
          className="group relative px-8 py-4 bg-primary text-primary-foreground rounded-full font-medium text-lg shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 hover:scale-105 active:scale-95 transition-all duration-300"
        >
          <span className="relative z-10 flex items-center gap-2">
            Start the Journey
            <span className="animate-pulse">💖</span>
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </motion.button>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-2 text-muted-foreground animate-bounce">
          <span className="text-sm">Scroll down</span>
          <ChevronDown className="w-5 h-5" />
        </div>
      </motion.div>
    </section>
  );
}
