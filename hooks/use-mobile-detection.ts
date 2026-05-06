"use client";

import { useState, useEffect } from "react";

export function useMobileDetection() {
  const [isMobile, setIsMobile] = useState(false);
  const [isLowEnd, setIsLowEnd] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768 || 
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      setIsMobile(mobile);
    };

    const checkLowEnd = () => {
      // Check for low-end device indicators
      const memory = (navigator as { deviceMemory?: number }).deviceMemory;
      const cores = navigator.hardwareConcurrency;
      const lowEnd = (memory && memory < 4) || (cores && cores < 4);
      setIsLowEnd(!!lowEnd);
    };

    checkMobile();
    checkLowEnd();

    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return { isMobile, isLowEnd, shouldReduceEffects: isMobile || isLowEnd };
}
