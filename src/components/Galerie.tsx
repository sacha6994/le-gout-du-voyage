"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { fadeInUp } from "@/lib/animations";
import { useDayNight } from "@/context/DayNightContext";

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
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const { isDay, animKey } = useDayNight();

  return (
    <section
      ref={ref}
      id="galerie"
      className="relative py-24 md:py-32 overflow-hidden transition-colors duration-[1200ms]"
      style={{ backgroundColor: isDay ? "#F5F0E8" : "#0C0C0C" }}
    >
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center mb-16"
        >
          <span
            className="text-sm tracking-[0.3em] uppercase mb-4 block transition-colors duration-1000"
            style={{ color: isDay ? "rgba(61,43,31,0.4)" : "rgba(201,169,110,0.6)" }}
          >
            Carnets de table
          </span>
          <h2
            className="font-[family-name:var(--font-cormorant)] text-4xl md:text-5xl lg:text-6xl font-light mb-2 transition-colors duration-1000"
            style={{ color: isDay ? "#3D2B1F" : "#C9A96E" }}
          >
            Galerie
          </h2>
          <p
            className="font-[family-name:var(--font-playfair)] italic text-sm transition-colors duration-1000"
            style={{ color: isDay ? "rgba(61,43,31,0.45)" : "rgba(245,240,232,0.35)" }}
          >
            {isDay ? "Sous la lumière du midi" : "Dîner aux chandelles"}
          </p>
        </motion.div>

        {/* Desktop grid */}
        <div
          key={`desktop-${animKey}`}
          className="hidden md:grid grid-cols-4 grid-rows-3 transition-[gap] duration-1000"
          style={{ gap: isDay ? 20 : 12, aspectRatio: "16/10", perspective: "1200px" }}
        >
          {images.map((img, i) => (
            <motion.div
              key={img.label}
              initial={{ opacity: 0, rotateY: 90, scale: 0.7 }}
              animate={{ opacity: 1, rotateY: 0, scale: 1, rotate: isDay ? img.rotation : 0 }}
              transition={{
                delay: i * 0.1 + 0.15,
                duration: 0.7,
                ease: [0.16, 1, 0.3, 1],
                rotate: { duration: 0.8, delay: i * 0.08 + 0.3 },
              }}
              className={`${img.span} relative overflow-hidden group cursor-pointer`}
              style={{
                borderRadius: isDay ? 14 : 0,
                boxShadow: isDay ? "0 10px 40px rgba(0,0,0,0.15)" : "none",
                transformStyle: "preserve-3d",
              }}
            >
              {isDay && (
                <motion.div
                  animate={{ opacity: 1 }}
                  className="absolute inset-0 z-10 pointer-events-none border-[5px] border-white/90"
                  style={{ borderRadius: 14 }}
                />
              )}
              <Image
                src={img.src}
                alt={img.label}
                fill
                sizes={img.span.includes("col-span-2") ? "50vw" : "25vw"}
                className="object-cover group-hover:scale-110"
                style={{
                  filter: isDay ? "brightness(1.1) saturate(1.15) contrast(1.05)" : "brightness(0.9) saturate(0.9)",
                  transition: "filter 1s, transform 0.7s",
                }}
                loading="lazy"
              />
              <motion.div
                animate={{ opacity: isDay ? 0 : 1 }}
                transition={{ duration: 0.8 }}
                className="absolute inset-0 bg-gradient-to-t from-noir/70 via-transparent to-noir/20 pointer-events-none"
              />
              <motion.div
                animate={{ opacity: isDay ? 1 : 0 }}
                transition={{ duration: 0.8 }}
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: "linear-gradient(to top, rgba(201,169,110,0.08) 0%, transparent 50%, rgba(255,255,255,0.08) 100%)",
                }}
              />
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end p-4"
                style={{
                  background: isDay
                    ? "linear-gradient(to top, rgba(255,255,255,0.7) 0%, transparent 60%)"
                    : "linear-gradient(to top, rgba(12,12,12,0.8) 0%, transparent 60%)",
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

        {/* Mobile scroll */}
        <div
          key={`mobile-${animKey}`}
          className="md:hidden flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 -mx-6 px-6"
          style={{ scrollbarWidth: "none" }}
        >
          {images.map((img, i) => (
            <motion.div
              key={img.label}
              initial={{ opacity: 0, rotateY: 60, x: 50 }}
              animate={{ opacity: 1, rotateY: 0, x: 0, rotate: isDay ? img.rotation * 0.5 : 0 }}
              transition={{ delay: i * 0.08 + 0.15, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="snap-center flex-shrink-0 w-[72vw] aspect-[3/4] relative overflow-hidden"
              style={{
                borderRadius: isDay ? 14 : 0,
                boxShadow: isDay ? "0 8px 30px rgba(0,0,0,0.15)" : "none",
              }}
            >
              {isDay && (
                <div className="absolute inset-0 z-10 pointer-events-none border-[4px] border-white/90" style={{ borderRadius: 14 }} />
              )}
              <Image src={img.src} alt={img.label} fill sizes="72vw" className="object-cover"
                style={{ filter: isDay ? "brightness(1.1) saturate(1.15)" : "brightness(0.9)" }}
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
