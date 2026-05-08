"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { config } from "@/lib/config";
import { X } from "lucide-react";
import Image from "next/image";

export function MemoriesGallery() {
  const [selectedImage, setSelectedImage] = useState<{
    url: string;
    caption: string;
  } | null>(null);

  return (
    <section className="relative py-20 px-4">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-accent/10 to-background" />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2
            className="text-3xl md:text-4xl font-bold mb-4"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Our Beautiful Memories
            <span className="inline-block ml-2">📸</span>
          </h2>
          <p className="text-muted-foreground">
            Every moment with you is a treasure
          </p>
        </motion.div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {config.galleryImages.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              viewport={{ once: true }}
              onClick={() => setSelectedImage(image)}
              className="group relative aspect-square cursor-pointer overflow-hidden rounded-2xl bg-secondary hover:scale-[1.02] transition-transform duration-300"
            >
              {/* Check if actual image exists, otherwise show placeholder */}
              {image.url.startsWith("/images/") ? (
                <Image
                  src={image.url}
                  alt={image.caption}
                  fill
                  className="object-cover"
                  loading="lazy"
                  sizes="(max-width: 768px) 50vw, 33vw"
                />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-accent/20 to-secondary flex items-center justify-center">
                  <div className="text-center p-4">
                    <div className="text-4xl mb-2">💕</div>
                    <p className="text-sm text-foreground/70">{image.caption}</p>
                  </div>
                </div>
              )}

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/20 transition-colors duration-300" />

              {/* Caption on hover */}
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-foreground/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="text-primary-foreground text-sm font-medium">
                  {image.caption}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Add photos hint */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center text-muted-foreground/60 text-sm mt-8"
        >
          Happy to add more photos here in the future! For now, these are some of our cherished moments together.
        </motion.p>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/80 backdrop-blur-sm p-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-3xl w-full bg-card rounded-3xl overflow-hidden shadow-2xl"
            >
              {/* Close button */}
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 z-10 p-2 bg-foreground/20 hover:bg-foreground/30 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-primary-foreground" />
              </button>

              {/* Image */}
              <div className="aspect-video bg-gradient-to-br from-primary/30 via-accent/20 to-secondary flex items-center justify-center relative">
                {selectedImage.url.startsWith("/images/") ? (
                  <Image
                    src={selectedImage.url}
                    alt={selectedImage.caption}
                    fill
                    className="object-contain"
                    sizes="(max-width: 1200px) 100vw, 1200px"
                  />
                ) : (
                  <div className="text-center">
                    <div className="text-6xl mb-4">💕</div>
                    <p className="text-foreground/70">{selectedImage.caption}</p>
                  </div>
                )}
              </div>

              {/* Caption */}
              <div className="p-6 text-center">
                <p
                  className="text-lg font-medium"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  {selectedImage.caption}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
