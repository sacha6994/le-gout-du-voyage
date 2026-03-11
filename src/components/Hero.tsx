"use client";

import { motion } from "framer-motion";
import { useDayNight } from "@/context/DayNightContext";

export default function Hero() {
  const { isDay } = useDayNight();
  const title = "Le Goût du Voyage";

  return (
    <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Video background */}
      <div className="absolute inset-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover scale-110 transition-[filter] duration-[1500ms]"
          style={{
            filter: isDay
              ? "blur(4px) brightness(0.55) saturate(1.1)"
              : "blur(4px) brightness(0.35)",
          }}
        >
          <source
            src="https://videos.pexels.com/video-files/2894888/2894888-hd_1920_1080_24fps.mp4"
            type="video/mp4"
          />
        </video>
        {/* Gradient overlays */}
        <div
          className="absolute inset-0 transition-all duration-[1200ms]"
          style={{
            background: isDay
              ? "linear-gradient(to bottom, rgba(245,240,232,0.2) 0%, transparent 40%, rgba(245,240,232,0.7) 100%)"
              : "linear-gradient(to bottom, rgba(12,12,12,0.5) 0%, rgba(12,12,12,0.3) 50%, rgba(12,12,12,1) 100%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(ellipse at 50% 40%, #C9A96E08 0%, transparent 60%)",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl">
        <h1 className="font-[family-name:var(--font-cormorant)] text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light tracking-wide mb-6">
          {title.split("").map((char, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + i * 0.05, duration: 0.6, ease: "easeOut" }}
              className="inline-block transition-colors duration-1000"
              style={{
                color: isDay ? "#3D2B1F" : "#C9A96E",
                whiteSpace: char === " " ? "pre" : undefined,
              }}
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 1 }}
          className="text-xs sm:text-sm tracking-[0.3em] uppercase mb-6 transition-colors duration-1000"
          style={{ color: isDay ? "rgba(61,43,31,0.5)" : "rgba(245,240,232,0.6)" }}
        >
          Cuisine Fusion • Terroir & Monde • Rodez
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2, duration: 1 }}
          className="font-[family-name:var(--font-playfair)] italic text-lg sm:text-xl md:text-2xl mb-10 transition-colors duration-1000"
          style={{ color: isDay ? "rgba(61,43,31,0.7)" : "rgba(245,240,232,0.8)" }}
        >
          Quand le terroir rencontre le monde
        </motion.p>

        <motion.a
          href="#reservation"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.6, duration: 0.8 }}
          whileHover={{ scale: 1.03, backgroundColor: "#C9A96E", color: "#0C0C0C" }}
          className="inline-block border px-8 py-3 text-sm tracking-[0.2em] uppercase transition-all duration-500"
          style={{
            borderColor: isDay ? "#3D2B1F" : "#C9A96E",
            color: isDay ? "#3D2B1F" : "#C9A96E",
          }}
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
        <span
          className="text-xs tracking-[0.2em] uppercase transition-colors duration-1000"
          style={{ color: isDay ? "rgba(61,43,31,0.35)" : "rgba(201,169,110,0.5)" }}
        >
          Découvrir
        </span>
        <div
          className="w-[1px] h-8 scroll-indicator"
          style={{
            background: isDay
              ? "linear-gradient(to bottom, rgba(61,43,31,0.4), transparent)"
              : "linear-gradient(to bottom, rgba(201,169,110,0.6), transparent)",
          }}
        />
      </motion.div>
    </section>
  );
}
