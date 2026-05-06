"use client";

import { FloatingHearts } from "@/components/floating-hearts";
import { HeroSection } from "@/components/hero-section";
import { LoveMessage } from "@/components/love-message";
import { MemoriesGallery } from "@/components/memories-gallery";
import { Timeline } from "@/components/timeline";
import { SurpriseSection } from "@/components/surprise-section";
import { MusicPlayer } from "@/components/music-player";
import { Footer, FooterProtection } from "@/components/footer";
import { Preloader } from "@/components/preloader";
import { ClickHearts } from "@/components/click-hearts";
import { GlowingCursor } from "@/components/glowing-cursor";

export default function BirthdayPage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden">
      {/* Preloader */}
      <Preloader />

      {/* Background effects - reduced */}
      <FloatingHearts />

      {/* Interactive effects */}
      <GlowingCursor />
      <ClickHearts />

      {/* Main sections */}
      <HeroSection />
      <LoveMessage />
      <MemoriesGallery />
      <Timeline />
      <SurpriseSection />

      {/* Fixed elements */}
      <MusicPlayer />
      <Footer />
      <FooterProtection />
    </main>
  );
}
