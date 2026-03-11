"use client";

import { useRef, useState, useCallback } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { fadeInUp } from "@/lib/animations";

const images = [
  {
    label: "Le Chef",
    span: "col-span-2 row-span-2",
    src: "https://images.unsplash.com/photo-1648376884841-b7fe8b8f0765?w=900&q=80",
    rotation: -1.5,
  },
  {
    label: "Pacifique",
    span: "col-span-1 row-span-1",
    src: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=600&q=80",
    rotation: 2,
  },
  {
    label: "Aubrac",
    span: "col-span-1 row-span-1",
    src: "https://images.unsplash.com/photo-1594041680534-e8c8cdebd659?w=600&q=80",
    rotation: -1,
  },
  {
    label: "Épices",
    span: "col-span-1 row-span-1",
    src: "https://images.unsplash.com/photo-1553267574-277716d448fb?w=600&q=80",
    rotation: 2.5,
  },
  {
    label: "Terrasse",
    span: "col-span-1 row-span-1",
    src: "https://images.unsplash.com/photo-1640703607347-a5cefc15c86b?w=600&q=80",
    rotation: -2,
  },
  {
    label: "Terroir",
    span: "col-span-2 row-span-1",
    src: "https://images.unsplash.com/photo-1541832676-9b763b0239ab?w=900&q=80",
    rotation: 0.8,
  },
];

export default function Galerie() {
  const ref = useRef<HTMLElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [isDay, setIsDay] = useState(false);
  const [animKey, setAnimKey] = useState(0);
  const [ripple, setRipple] = useState<{ x: number; y: number } | null>(null);

  const toggle = useCallback(() => {
    if (btnRef.current && ref.current) {
      const br = btnRef.current.getBoundingClientRect();
      const sr = ref.current.getBoundingClientRect();
      setRipple({
        x: br.left + br.width / 2 - sr.left,
        y: br.top + br.height / 2 - sr.top,
      });
    }
    setTimeout(() => {
      setIsDay((d) => !d);
      setAnimKey((k) => k + 1);
    }, 350);
    setTimeout(() => setRipple(null), 1600);
  }, []);

  return (
    <section
      ref={ref}
      id="galerie"
      className="relative py-24 md:py-32 overflow-hidden transition-colors duration-[1200ms] ease-in-out"
      style={{ backgroundColor: isDay ? "#F5F0E8" : "#0C0C0C" }}
    >
      {/* === RIPPLE SHOCKWAVE === */}
      {ripple && (
        <>
          {/* Main burst */}
          <motion.div
            initial={{ scale: 0, opacity: 0.7 }}
            animate={{ scale: 10, opacity: 0 }}
            transition={{ duration: 1.4, ease: "easeOut" }}
            className="absolute rounded-full pointer-events-none z-30"
            style={{
              left: ripple.x - 100,
              top: ripple.y - 100,
              width: 200,
              height: 200,
              background: !isDay
                ? "radial-gradient(circle, rgba(201,169,110,0.5) 0%, rgba(245,240,232,0.2) 40%, transparent 70%)"
                : "radial-gradient(circle, rgba(27,58,75,0.5) 0%, rgba(12,12,12,0.2) 40%, transparent 70%)",
            }}
          />
          {/* Inner bright flash */}
          <motion.div
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: 3, opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="absolute rounded-full pointer-events-none z-30"
            style={{
              left: ripple.x - 60,
              top: ripple.y - 60,
              width: 120,
              height: 120,
              background: !isDay
                ? "radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(201,169,110,0.4) 50%, transparent 70%)"
                : "radial-gradient(circle, rgba(12,12,12,0.6) 0%, rgba(27,58,75,0.3) 50%, transparent 70%)",
            }}
          />
          {/* Ring */}
          <motion.div
            initial={{ scale: 0, opacity: 0.5 }}
            animate={{ scale: 6, opacity: 0 }}
            transition={{ duration: 1.1, ease: "easeOut", delay: 0.1 }}
            className="absolute rounded-full pointer-events-none z-30"
            style={{
              left: ripple.x - 100,
              top: ripple.y - 100,
              width: 200,
              height: 200,
              border: !isDay
                ? "2px solid rgba(201,169,110,0.6)"
                : "2px solid rgba(27,58,75,0.4)",
            }}
          />
        </>
      )}

      {/* === AMBIENT PARTICLES === */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={`p-${isDay}-${i}`}
            className="absolute rounded-full"
            style={{
              width: isDay ? 4 : 1.5,
              height: isDay ? 4 : 1.5,
              left: `${8 + Math.random() * 84}%`,
              top: `${8 + Math.random() * 84}%`,
              backgroundColor: isDay ? "#C9A96E" : "#C9A96E",
              opacity: 0,
            }}
            animate={{
              y: [0, isDay ? -40 : -20, 0],
              opacity: isDay ? [0.1, 0.4, 0.1] : [0.05, 0.2, 0.05],
              scale: [1, isDay ? 1.8 : 1.3, 1],
            }}
            transition={{
              duration: 4 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 4,
              ease: "easeInOut",
            }}
          />
        ))}
        {/* Day mode: light rays */}
        {isDay && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.06 }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0"
            style={{
              backgroundImage:
                "repeating-conic-gradient(from 0deg at 80% -10%, transparent 0deg, rgba(201,169,110,0.3) 1deg, transparent 2deg)",
            }}
          />
        )}
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* === HEADER === */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center mb-16"
        >
          <motion.span
            animate={{ color: isDay ? "#0C0C0C66" : "#C9A96E99" }}
            transition={{ duration: 1 }}
            className="text-sm tracking-[0.3em] uppercase mb-4 block"
          >
            Carnets de table
          </motion.span>
          <motion.h2
            animate={{ color: isDay ? "#0C0C0C" : "#C9A96E" }}
            transition={{ duration: 1 }}
            className="font-[family-name:var(--font-cormorant)] text-4xl md:text-5xl lg:text-6xl font-light mb-2"
          >
            Galerie
          </motion.h2>
          <motion.p
            animate={{ color: isDay ? "#0C0C0C55" : "#F5F0E855" }}
            transition={{ duration: 1 }}
            className="font-[family-name:var(--font-playfair)] italic text-sm mb-8"
          >
            {isDay ? "Sous la lumière du midi" : "Dîner aux chandelles"}
          </motion.p>

          {/* === SUN / MOON TOGGLE === */}
          <button
            ref={btnRef}
            onClick={toggle}
            className="group relative w-24 h-12 rounded-full border overflow-hidden transition-all duration-1000 focus:outline-none"
            style={{
              borderColor: isDay
                ? "rgba(201,169,110,0.4)"
                : "rgba(201,169,110,0.2)",
              backgroundColor: isDay
                ? "rgba(201,169,110,0.12)"
                : "rgba(17,17,17,1)",
            }}
            aria-label={isDay ? "Mode nuit" : "Mode jour"}
          >
            {/* Sliding knob */}
            <motion.div
              animate={{ x: isDay ? 48 : 0 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              className="absolute top-1 left-1 w-10 h-10 rounded-full flex items-center justify-center"
              style={{
                background: isDay
                  ? "linear-gradient(135deg, #C9A96E, #E8D5A8)"
                  : "linear-gradient(135deg, #1B3A4B, #2A5568)",
                boxShadow: isDay
                  ? "0 0 20px rgba(201,169,110,0.5)"
                  : "0 0 15px rgba(27,58,75,0.4)",
              }}
            >
              <motion.div
                animate={{ rotate: isDay ? 180 : 0, scale: [1, 1.2, 1] }}
                transition={{ duration: 0.6, scale: { duration: 0.3 } }}
              >
                {isDay ? (
                  <svg
                    className="w-5 h-5 text-noir"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <circle cx="12" cy="12" r="4" />
                    <path d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32l1.41 1.41M2 12h2m16 0h2M4.93 19.07l1.41-1.41m11.32-11.32l1.41-1.41" />
                  </svg>
                ) : (
                  <svg
                    className="w-4 h-4 text-creme"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
                  </svg>
                )}
              </motion.div>
            </motion.div>

            {/* Track labels */}
            <span
              className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[9px] tracking-wider transition-opacity duration-500"
              style={{
                color: isDay ? "#C9A96E" : "#C9A96E40",
                opacity: isDay ? 0 : 1,
              }}
            >
              NUIT
            </span>
            <span
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[9px] tracking-wider transition-opacity duration-500"
              style={{
                color: isDay ? "#0C0C0C50" : "#C9A96E40",
                opacity: isDay ? 1 : 0,
              }}
            >
              JOUR
            </span>
          </button>
        </motion.div>

        {/* === DESKTOP GRID === */}
        <div
          key={`desktop-${animKey}`}
          className="hidden md:grid grid-cols-4 grid-rows-3 transition-[gap] duration-1000"
          style={{
            gap: isDay ? 20 : 12,
            aspectRatio: "16/10",
            perspective: "1200px",
          }}
        >
          {images.map((img, i) => (
            <motion.div
              key={img.label}
              initial={{ opacity: 0, rotateY: 90, scale: 0.7 }}
              animate={{
                opacity: 1,
                rotateY: 0,
                scale: 1,
                rotate: isDay ? img.rotation : 0,
              }}
              transition={{
                delay: i * 0.1 + 0.15,
                duration: 0.7,
                ease: [0.16, 1, 0.3, 1],
                rotate: { duration: 0.8, delay: i * 0.08 + 0.3 },
              }}
              className={`${img.span} relative overflow-hidden group cursor-pointer`}
              style={{
                borderRadius: isDay ? 14 : 0,
                boxShadow: isDay
                  ? "0 10px 40px rgba(0,0,0,0.15), 0 2px 10px rgba(0,0,0,0.08)"
                  : "none",
                transformStyle: "preserve-3d",
              }}
            >
              {/* White frame border (day) */}
              <motion.div
                animate={{
                  opacity: isDay ? 1 : 0,
                  borderWidth: isDay ? 5 : 0,
                }}
                transition={{ duration: 0.6 }}
                className="absolute inset-0 z-10 pointer-events-none border-white/90"
                style={{ borderRadius: isDay ? 14 : 0 }}
              />

              <Image
                src={img.src}
                alt={img.label}
                fill
                sizes={img.span.includes("col-span-2") ? "50vw" : "25vw"}
                className="object-cover transition-[filter] duration-1000 group-hover:scale-110"
                style={{
                  filter: isDay
                    ? "brightness(1.1) saturate(1.15) contrast(1.05)"
                    : "brightness(0.9) saturate(0.9)",
                  transition: "filter 1s, transform 0.7s",
                }}
                loading="lazy"
              />

              {/* Night overlay */}
              <motion.div
                animate={{ opacity: isDay ? 0 : 1 }}
                transition={{ duration: 0.8 }}
                className="absolute inset-0 bg-gradient-to-t from-noir/70 via-transparent to-noir/20 pointer-events-none"
              />

              {/* Day warm overlay */}
              <motion.div
                animate={{ opacity: isDay ? 1 : 0 }}
                transition={{ duration: 0.8 }}
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(to top, rgba(201,169,110,0.08) 0%, transparent 50%, rgba(255,255,255,0.08) 100%)",
                }}
              />

              {/* Hover overlay */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end p-4"
                style={{
                  background: isDay
                    ? "linear-gradient(to top, rgba(255,255,255,0.7) 0%, transparent 60%)"
                    : "linear-gradient(to top, rgba(12,12,12,0.8) 0%, rgba(12,12,12,0.2) 50%, transparent 100%)",
                }}
              >
                <span
                  className="font-[family-name:var(--font-cormorant)] text-xl md:text-2xl italic translate-y-3 group-hover:translate-y-0 transition-transform duration-500"
                  style={{ color: isDay ? "#0C0C0C" : "#C9A96E" }}
                >
                  {img.label}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* === MOBILE SCROLL === */}
        <div
          key={`mobile-${animKey}`}
          className="md:hidden flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 -mx-6 px-6"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {images.map((img, i) => (
            <motion.div
              key={img.label}
              initial={{ opacity: 0, rotateY: 60, x: 50 }}
              animate={{
                opacity: 1,
                rotateY: 0,
                x: 0,
                rotate: isDay ? img.rotation * 0.5 : 0,
              }}
              transition={{
                delay: i * 0.08 + 0.15,
                duration: 0.6,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="snap-center flex-shrink-0 w-[72vw] aspect-[3/4] relative overflow-hidden"
              style={{
                borderRadius: isDay ? 14 : 0,
                boxShadow: isDay
                  ? "0 8px 30px rgba(0,0,0,0.15)"
                  : "none",
              }}
            >
              {isDay && (
                <div
                  className="absolute inset-0 z-10 pointer-events-none border-[4px] border-white/90"
                  style={{ borderRadius: 14 }}
                />
              )}

              <Image
                src={img.src}
                alt={img.label}
                fill
                sizes="72vw"
                className="object-cover"
                style={{
                  filter: isDay
                    ? "brightness(1.1) saturate(1.15)"
                    : "brightness(0.9)",
                }}
                loading="lazy"
              />

              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: isDay
                    ? "linear-gradient(to top, rgba(255,255,255,0.2) 0%, transparent 40%)"
                    : "linear-gradient(to top, rgba(12,12,12,0.8) 0%, transparent 50%)",
                }}
              />

              <div className="absolute bottom-4 left-4 z-10">
                <span
                  className="font-[family-name:var(--font-cormorant)] text-xl italic"
                  style={{ color: isDay ? "#0C0C0C" : "#C9A96E" }}
                >
                  {img.label}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
