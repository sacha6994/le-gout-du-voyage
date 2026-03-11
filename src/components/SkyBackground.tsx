"use client";

import { useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDayNight } from "@/context/DayNightContext";

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
  duration: number;
  type: "soft" | "medium" | "bright";
  color: string;
}

function generateStars(count: number): Star[] {
  const colors = ["#F5F0E8", "#C9A96E", "#E8DCC8", "#FFFAEF", "#D4C4A0"];
  return Array.from({ length: count }, (_, i) => {
    const r = Math.random();
    const type: Star["type"] =
      r > 0.82 ? "bright" : r > 0.45 ? "medium" : "soft";
    return {
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size:
        type === "bright"
          ? 2.5 + Math.random() * 2
          : type === "medium"
          ? 1.5 + Math.random() * 1.5
          : 1 + Math.random(),
      delay: Math.random() * 8,
      duration: 2 + Math.random() * 4,
      type,
      color: colors[Math.floor(Math.random() * colors.length)],
    };
  });
}

interface Cloud {
  id: number;
  y: number;
  width: number;
  height: number;
  opacity: number;
  duration: number;
  delay: number;
}

function generateClouds(count: number): Cloud[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    y: 3 + Math.random() * 30,
    width: 180 + Math.random() * 280,
    height: 50 + Math.random() * 70,
    opacity: 0.3 + Math.random() * 0.45,
    duration: 80 + Math.random() * 60,
    delay: -(Math.random() * 80),
  }));
}

export default function SkyBackground() {
  const { isDay } = useDayNight();
  const stars = useMemo(() => generateStars(120), []);
  const clouds = useMemo(() => generateClouds(8), []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <AnimatePresence mode="wait">
        {!isDay ? (
          /* ================= NIGHT SKY ================= */
          <motion.div
            key="night-sky"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0"
          >
            {/* Deep space gradients - dreamy blues & purples */}
            <div
              className="absolute inset-0"
              style={{
                background: [
                  "radial-gradient(ellipse at 25% 8%, rgba(20,35,80,0.35) 0%, transparent 45%)",
                  "radial-gradient(ellipse at 75% 15%, rgba(50,20,70,0.22) 0%, transparent 40%)",
                  "radial-gradient(ellipse at 50% 50%, rgba(15,25,55,0.18) 0%, transparent 60%)",
                  "radial-gradient(ellipse at 60% 85%, rgba(25,15,45,0.12) 0%, transparent 40%)",
                ].join(", "),
              }}
            />

            {/* Warm vignette for cozy feel */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(ellipse at 50% 50%, transparent 40%, rgba(12,8,4,0.2) 100%)",
              }}
            />

            {/* Stars - CSS animated for performance */}
            {stars.map((star) => (
              <div
                key={star.id}
                className="absolute rounded-full"
                style={{
                  left: `${star.x}%`,
                  top: `${star.y}%`,
                  width: star.size,
                  height: star.size,
                  backgroundColor: star.color,
                  boxShadow:
                    star.type === "bright"
                      ? `0 0 ${star.size * 4}px ${star.size}px rgba(201,169,110,0.5), 0 0 ${star.size * 8}px ${star.size * 2}px rgba(201,169,110,0.2), 0 0 ${star.size * 2}px rgba(255,250,240,0.8)`
                      : star.type === "medium"
                      ? `0 0 ${star.size * 3}px ${star.size * 0.5}px rgba(201,169,110,0.3), 0 0 ${star.size}px rgba(255,250,240,0.5)`
                      : `0 0 ${star.size * 2}px rgba(201,169,110,0.2)`,
                  animation: `twinkle-${star.type} ${star.duration}s ease-in-out ${star.delay}s infinite`,
                }}
              />
            ))}

            {/* Shooting star 1 */}
            <motion.div
              className="absolute"
              style={{
                top: "12%",
                left: "15%",
                width: 3,
                height: 3,
                borderRadius: "50%",
                backgroundColor: "#FFFAEF",
                boxShadow:
                  "0 0 6px 3px rgba(255,250,240,0.7), -60px 0 40px 1px rgba(201,169,110,0.3), -30px 0 20px 1px rgba(201,169,110,0.4)",
              }}
              animate={{
                x: [0, 350],
                y: [0, 180],
                opacity: [0, 1, 1, 0],
              }}
              transition={{
                duration: 1.8,
                repeat: Infinity,
                repeatDelay: 14,
                ease: "easeOut",
              }}
            />

            {/* Shooting star 2 */}
            <motion.div
              className="absolute"
              style={{
                top: "28%",
                right: "8%",
                width: 2,
                height: 2,
                borderRadius: "50%",
                backgroundColor: "#F5F0E8",
                boxShadow:
                  "0 0 4px 2px rgba(245,240,232,0.6), 50px 0 30px 1px rgba(201,169,110,0.25)",
              }}
              animate={{
                x: [0, -300],
                y: [0, 140],
                opacity: [0, 1, 1, 0],
              }}
              transition={{
                duration: 1.4,
                repeat: Infinity,
                repeatDelay: 22,
                delay: 9,
                ease: "easeOut",
              }}
            />
          </motion.div>
        ) : (
          /* ================= DAY SKY ================= */
          <motion.div
            key="day-sky"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0"
          >
            {/* Blue sky gradient - vivid and visible */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(180deg, rgba(85,155,220,0.6) 0%, rgba(110,175,235,0.45) 10%, rgba(150,200,240,0.3) 22%, rgba(185,215,245,0.15) 38%, rgba(215,230,248,0.06) 52%, transparent 68%)",
              }}
            />

            {/* Sun orb - visible warm glow */}
            <motion.div
              animate={{
                scale: [1, 1.06, 1],
              }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute"
              style={{
                top: "-3%",
                right: "10%",
                width: 140,
                height: 140,
                borderRadius: "50%",
                background:
                  "radial-gradient(circle, rgba(255,245,200,0.95) 0%, rgba(255,230,140,0.7) 25%, rgba(255,210,90,0.3) 55%, transparent 70%)",
                boxShadow:
                  "0 0 60px 20px rgba(255,230,140,0.35), 0 0 120px 60px rgba(255,210,90,0.15), 0 0 200px 100px rgba(255,200,80,0.08)",
              }}
            />

            {/* Slowly rotating sun rays */}
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 150, repeat: Infinity, ease: "linear" }}
              className="absolute"
              style={{
                top: "-20%",
                right: "-2%",
                width: 400,
                height: 400,
                opacity: 0.05,
                backgroundImage:
                  "repeating-conic-gradient(from 0deg at 50% 50%, transparent 0deg, rgba(255,220,120,0.7) 1.5deg, transparent 4deg)",
              }}
            />

            {/* Drifting clouds - visible and fluffy */}
            {clouds.map((cloud) => (
              <div
                key={cloud.id}
                className="absolute cloud-drift"
                style={{
                  top: `${cloud.y}%`,
                  width: cloud.width,
                  height: cloud.height,
                  opacity: cloud.opacity,
                  filter: "blur(6px)",
                  animationDuration: `${cloud.duration}s`,
                  animationDelay: `${cloud.delay}s`,
                }}
              >
                <div className="relative w-full h-full">
                  <div
                    className="absolute rounded-full"
                    style={{
                      width: "55%",
                      height: "85%",
                      top: "8%",
                      left: "22%",
                      background:
                        "radial-gradient(ellipse, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.4) 50%, transparent 70%)",
                    }}
                  />
                  <div
                    className="absolute rounded-full"
                    style={{
                      width: "45%",
                      height: "75%",
                      top: "0%",
                      left: "38%",
                      background:
                        "radial-gradient(ellipse, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0.3) 50%, transparent 70%)",
                    }}
                  />
                  <div
                    className="absolute rounded-full"
                    style={{
                      width: "48%",
                      height: "68%",
                      top: "18%",
                      left: "5%",
                      background:
                        "radial-gradient(ellipse, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0.25) 50%, transparent 70%)",
                    }}
                  />
                  <div
                    className="absolute rounded-full"
                    style={{
                      width: "35%",
                      height: "60%",
                      top: "12%",
                      left: "55%",
                      background:
                        "radial-gradient(ellipse, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0.2) 50%, transparent 70%)",
                    }}
                  />
                </div>
              </div>
            ))}

            {/* Warm light wash from sun direction */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(ellipse at 82% 8%, rgba(255,225,130,0.1) 0%, transparent 45%)",
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
