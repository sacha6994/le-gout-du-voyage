"use client";

import { motion } from "framer-motion";

export default function Hero() {
  const title = "Le Goût du Voyage";

  return (
    <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Background with overlay */}
      <div className="absolute inset-0 bg-noir">
        {/* Placeholder for hero image - dark atmospheric photo */}
        <div className="absolute inset-0 bg-gradient-to-b from-noir/60 via-noir/40 to-noir" />
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "radial-gradient(ellipse at 50% 40%, #C9A96E10 0%, transparent 60%)",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl">
        {/* Title - letter by letter */}
        <h1 className="font-[family-name:var(--font-cormorant)] text-or text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light tracking-wide mb-6">
          {title.split("").map((char, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.5 + i * 0.05,
                duration: 0.6,
                ease: "easeOut",
              }}
              className="inline-block"
              style={{ whiteSpace: char === " " ? "pre" : undefined }}
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 1 }}
          className="text-creme/60 text-xs sm:text-sm tracking-[0.3em] uppercase mb-6"
        >
          Cuisine Fusion • Terroir & Monde • Rodez
        </motion.p>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2, duration: 1 }}
          className="font-[family-name:var(--font-playfair)] italic text-creme/80 text-lg sm:text-xl md:text-2xl mb-10"
        >
          Quand le terroir rencontre le monde
        </motion.p>

        {/* CTA */}
        <motion.a
          href="#reservation"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.6, duration: 0.8 }}
          whileHover={{ scale: 1.03, backgroundColor: "#C9A96E", color: "#0C0C0C" }}
          className="inline-block border border-or text-or px-8 py-3 text-sm tracking-[0.2em] uppercase transition-all duration-500"
        >
          Réserver une table
        </motion.a>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-or/50 text-xs tracking-[0.2em] uppercase">Découvrir</span>
        <div className="w-[1px] h-8 bg-gradient-to-b from-or/60 to-transparent scroll-indicator" />
      </motion.div>
    </section>
  );
}
