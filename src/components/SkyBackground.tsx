"use client";

import { useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDayNight } from "@/context/DayNightContext";

function generateStars(count: number) {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: 1 + Math.random() * 2,
    delay: Math.random() * 5,
    duration: 2 + Math.random() * 3,
    bright: Math.random() > 0.85,
  }));
}

function generateClouds(count: number) {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 120 - 10,
    y: 3 + Math.random() * 20,
    width: 80 + Math.random() * 160,
    opacity: 0.015 + Math.random() * 0.03,
    duration: 40 + Math.random() * 30,
  }));
}

export default function SkyBackground() {
  const { isDay } = useDayNight();
  const stars = useMemo(() => generateStars(50), []);
  const clouds = useMemo(() => generateClouds(5), []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <AnimatePresence mode="wait">
        {!isDay ? (
          /* === STARRY NIGHT SKY === */
          <motion.div
            key="night-sky"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0"
          >
            {/* Subtle deep blue glow at top */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(ellipse at 50% 10%, rgba(27,58,75,0.12) 0%, transparent 50%)",
              }}
            />
            {/* Stars */}
            {stars.map((star) => (
              <motion.div
                key={star.id}
                className="absolute rounded-full"
                style={{
                  left: `${star.x}%`,
                  top: `${star.y}%`,
                  width: star.bright ? star.size + 1 : star.size,
                  height: star.bright ? star.size + 1 : star.size,
                  backgroundColor: star.bright ? "#F5F0E8" : "#C9A96E",
                  boxShadow: star.bright
                    ? "0 0 6px 2px rgba(201,169,110,0.4), 0 0 12px 4px rgba(201,169,110,0.15)"
                    : "0 0 3px 1px rgba(201,169,110,0.15)",
                }}
                animate={{
                  opacity: star.bright
                    ? [0.4, 0.9, 0.4]
                    : [0.1, 0.5, 0.1],
                  scale: star.bright ? [1, 1.3, 1] : [1, 1.1, 1],
                }}
                transition={{
                  duration: star.duration,
                  repeat: Infinity,
                  delay: star.delay,
                  ease: "easeInOut",
                }}
              />
            ))}
          </motion.div>
        ) : (
          /* === SUNNY DAY SKY === */
          <motion.div
            key="day-sky"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0"
          >
            {/* Sky blue gradient at top */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(180deg, rgba(135,180,220,0.15) 0%, rgba(135,180,220,0.06) 8%, transparent 20%)",
              }}
            />
            {/* Sun glow top-right */}
            <motion.div
              animate={{
                scale: [1, 1.05, 1],
                opacity: [0.12, 0.18, 0.12],
              }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute"
              style={{
                top: "-5%",
                right: "10%",
                width: 400,
                height: 400,
                borderRadius: "50%",
                background:
                  "radial-gradient(circle, rgba(201,169,110,0.3) 0%, rgba(201,169,110,0.1) 30%, transparent 60%)",
              }}
            />
            {/* Subtle light rays */}
            <div
              className="absolute inset-0"
              style={{
                opacity: 0.025,
                backgroundImage:
                  "repeating-conic-gradient(from 20deg at 85% 5%, transparent 0deg, rgba(201,169,110,0.5) 1deg, transparent 3deg)",
              }}
            />
            {/* Drifting clouds */}
            {clouds.map((cloud) => (
              <motion.div
                key={cloud.id}
                className="absolute rounded-full"
                style={{
                  top: `${cloud.y}%`,
                  width: cloud.width,
                  height: cloud.width * 0.35,
                  background:
                    "radial-gradient(ellipse, rgba(255,255,255,0.6) 0%, transparent 70%)",
                  opacity: cloud.opacity,
                  filter: "blur(20px)",
                }}
                animate={{
                  x: [
                    `${cloud.x}vw`,
                    `${cloud.x + 30}vw`,
                    `${cloud.x}vw`,
                  ],
                }}
                transition={{
                  duration: cloud.duration,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
