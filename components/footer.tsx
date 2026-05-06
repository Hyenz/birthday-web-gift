"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { config } from "@/lib/config";
import { X, ExternalLink, Heart } from "lucide-react";

export function Footer() {
  const [showPopup, setShowPopup] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <>
      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="fixed bottom-0 left-0 right-0 z-30 py-4 px-4 bg-gradient-to-t from-background/90 to-transparent backdrop-blur-sm"
      >
        <div className="flex items-center justify-center gap-1 text-sm">
          <span className="text-muted-foreground/70">Made with</span>
          <motion.span
            animate={
              isHovered
                ? {
                    scale: [1, 1.2, 1],
                  }
                : {}
            }
            transition={{ duration: 0.5, repeat: isHovered ? Infinity : 0 }}
          >
            <Heart
              className="w-4 h-4 text-primary fill-primary"
            />
          </motion.span>
          <span className="text-muted-foreground/70">by</span>
          <motion.button
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={() => setShowPopup(true)}
            whileHover={{ scale: 1.05 }}
            className="text-primary font-medium hover:text-primary/80 transition-colors relative"
            style={{
              textShadow: isHovered ? "0 0 10px rgba(255, 182, 193, 0.8)" : "none",
            }}
          >
            Hyenz
            {isHovered && (
              <motion.span
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                className="absolute bottom-0 left-0 h-0.5 bg-primary"
              />
            )}
          </motion.button>
        </div>
      </motion.footer>

      {/* Popup Modal */}
      <AnimatePresence>
        {showPopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowPopup(false)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/50 backdrop-blur-sm p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-sm w-full bg-card rounded-3xl p-8 shadow-2xl border border-border"
            >
              {/* Close button */}
              <button
                onClick={() => setShowPopup(false)}
                className="absolute top-4 right-4 p-2 hover:bg-secondary rounded-full transition-colors"
              >
                <X className="w-4 h-4 text-muted-foreground" />
              </button>

              {/* Content */}
              <div className="text-center">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-5xl mb-4"
                >
                  💖
                </motion.div>

                <h3
                  className="text-2xl font-bold mb-2"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  Made by Hyenz
                </h3>

                <p className="text-muted-foreground mb-6">
                  Crafting digital experiences with love
                </p>

                <motion.a
                  href={config.credit.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-full font-medium shadow-lg hover:shadow-xl transition-shadow"
                >
                  Visit my website
                  <ExternalLink className="w-4 h-4" />
                </motion.a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// Footer protection component
export function FooterProtection() {
  const [showWarning, setShowWarning] = useState(false);

  useEffect(() => {
    const checkFooter = () => {
      const footerExists = document.querySelector("footer");
      const hasHyenzCredit = document.body.innerHTML.includes("Hyenz");
      
      if (!footerExists || !hasHyenzCredit) {
        setShowWarning(true);
      }
    };

    // Check periodically
    const interval = setInterval(checkFooter, 5000);
    
    return () => clearInterval(interval);
  }, []);

  if (!showWarning) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-foreground/90 backdrop-blur-md"
    >
      <div className="text-center p-8 max-w-md">
        <div className="text-6xl mb-4">⚠️</div>
        <h2 className="text-2xl font-bold text-primary-foreground mb-4">
          Please keep the original credit
        </h2>
        <p className="text-primary-foreground/80">
          Made with ❤️ by Hyenz
        </p>
        <p className="text-primary-foreground/60 text-sm mt-4">
          Refresh the page to continue
        </p>
      </div>
    </motion.div>
  );
}
