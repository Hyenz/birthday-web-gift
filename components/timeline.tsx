"use client";

import { motion } from "framer-motion";
import { config } from "@/lib/config";

export function Timeline() {
  return (
    <section className="relative py-20 px-4">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/20 to-background" />

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2
            className="text-3xl md:text-4xl font-bold mb-4"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Our Journey Together
            <span className="inline-block ml-2">✨</span>
          </h2>
          <p className="text-muted-foreground">
            Every step of our love story
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary/50 via-primary to-primary/50 md:-translate-x-1/2" />

          {config.timelineEvents.map((event, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              viewport={{ once: true }}
              className={`relative flex items-center mb-12 ${
                index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              }`}
            >
              {/* Content */}
              <div
                className={`ml-12 md:ml-0 md:w-1/2 ${
                  index % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"
                }`}
              >
                <div className="bg-card/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-border/50 hover:scale-[1.01] transition-transform duration-300">
                  {/* Date */}
                  <span className="inline-block px-3 py-1 bg-primary/20 text-primary text-sm font-medium rounded-full mb-3">
                    {event.date}
                  </span>

                  {/* Title */}
                  <h3
                    className="text-xl font-bold mb-2"
                    style={{ fontFamily: "var(--font-playfair)" }}
                  >
                    {event.title}
                  </h3>

                  {/* Description */}
                  <p className="text-muted-foreground text-sm">
                    {event.description}
                  </p>
                </div>
              </div>

              {/* Timeline dot */}
              <div className="absolute left-4 md:left-1/2 w-8 h-8 bg-primary rounded-full border-4 border-background flex items-center justify-center md:-translate-x-1/2 z-10">
                <span className="text-sm">💕</span>
              </div>

              {/* Spacer for opposite side */}
              <div className="hidden md:block md:w-1/2" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
