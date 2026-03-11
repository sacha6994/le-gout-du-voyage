"use client";

import { motion } from "framer-motion";
import { useDayNight } from "@/context/DayNightContext";

export default function TransitionRipple() {
  const { ripple, isDay } = useDayNight();
  if (!ripple) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[100]">
      {/* Main burst */}
      <motion.div
        initial={{ scale: 0, opacity: 0.7 }}
        animate={{ scale: 15, opacity: 0 }}
        transition={{ duration: 1.4, ease: "easeOut" }}
        className="absolute rounded-full"
        style={{
          left: ripple.x - 100,
          top: ripple.y - 100,
          width: 200,
          height: 200,
          background: !isDay
            ? "radial-gradient(circle, rgba(201,169,110,0.5) 0%, rgba(245,240,232,0.15) 40%, transparent 70%)"
            : "radial-gradient(circle, rgba(27,58,75,0.5) 0%, rgba(12,12,12,0.15) 40%, transparent 70%)",
        }}
      />
      {/* Flash */}
      <motion.div
        initial={{ scale: 0, opacity: 1 }}
        animate={{ scale: 4, opacity: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="absolute rounded-full"
        style={{
          left: ripple.x - 60,
          top: ripple.y - 60,
          width: 120,
          height: 120,
          background: !isDay
            ? "radial-gradient(circle, rgba(255,255,255,0.7) 0%, rgba(201,169,110,0.3) 50%, transparent 70%)"
            : "radial-gradient(circle, rgba(12,12,12,0.5) 0%, rgba(27,58,75,0.2) 50%, transparent 70%)",
        }}
      />
      {/* Ring */}
      <motion.div
        initial={{ scale: 0, opacity: 0.5 }}
        animate={{ scale: 10, opacity: 0 }}
        transition={{ duration: 1.1, ease: "easeOut", delay: 0.1 }}
        className="absolute rounded-full"
        style={{
          left: ripple.x - 100,
          top: ripple.y - 100,
          width: 200,
          height: 200,
          border: !isDay
            ? "2px solid rgba(201,169,110,0.5)"
            : "2px solid rgba(27,58,75,0.3)",
        }}
      />
    </div>
  );
}
