"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { config } from "@/lib/config";
import { Play, Pause, Volume2, VolumeX, Music } from "lucide-react";

export function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [hasAudio, setHasAudio] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio(config.backgroundMusic);
    audioRef.current.loop = true;
    audioRef.current.volume = 0.5;
    
    audioRef.current.addEventListener("error", () => {
      setHasAudio(false);
    });

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(() => {
        setHasAudio(false);
      });
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    audioRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1 }}
      className="fixed bottom-24 right-4 z-40"
    >
      <div className="flex items-center gap-2 bg-card/90 backdrop-blur-xl rounded-full p-2 shadow-lg border border-border/50">
        {/* Music indicator */}
        <div className="flex items-center gap-1 px-2">
          <Music className="w-4 h-4 text-primary" />
          {isPlaying && (
            <div className="flex items-end gap-0.5 h-4">
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-0.5 bg-primary rounded-full"
                  animate={{
                    height: ["4px", "12px", "4px"],
                  }}
                  transition={{
                    duration: 0.5,
                    repeat: Infinity,
                    delay: i * 0.15,
                  }}
                />
              ))}
            </div>
          )}
        </div>

        {/* Play/Pause button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={togglePlay}
          className="w-10 h-10 flex items-center justify-center bg-primary text-primary-foreground rounded-full"
          title={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? (
            <Pause className="w-4 h-4" />
          ) : (
            <Play className="w-4 h-4 ml-0.5" />
          )}
        </motion.button>

        {/* Mute button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={toggleMute}
          className="w-8 h-8 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
          title={isMuted ? "Unmute" : "Mute"}
        >
          {isMuted ? (
            <VolumeX className="w-4 h-4" />
          ) : (
            <Volume2 className="w-4 h-4" />
          )}
        </motion.button>
      </div>

      {/* No audio file hint */}
      {!hasAudio && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute bottom-full right-0 mb-2 px-3 py-2 bg-card rounded-lg shadow-lg text-xs text-muted-foreground whitespace-nowrap"
        >
          💡 Add music to /public/music/romantic.mp3
        </motion.div>
      )}
    </motion.div>
  );
}
