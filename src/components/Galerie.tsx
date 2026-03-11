"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { fadeInUp } from "@/lib/animations";

const images = [
  { label: "Hibiscus", span: "col-span-2 row-span-2" },
  { label: "Pacifique", span: "col-span-1 row-span-1" },
  { label: "Aubrac", span: "col-span-1 row-span-1" },
  { label: "Épices", span: "col-span-1 row-span-1" },
  { label: "Terrasse", span: "col-span-1 row-span-1" },
  { label: "Terroir", span: "col-span-2 row-span-1" },
];

const bgColors = [
  "from-hibiscus/20 to-noir",
  "from-pacifique/20 to-noir",
  "from-tropical/20 to-noir",
  "from-or/10 to-noir",
  "from-tropical/15 to-noir",
  "from-pacifique/15 to-noir",
];

export default function Galerie() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section ref={ref} id="galerie" className="py-24 md:py-32 bg-noir">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center mb-16"
        >
          <span className="text-or/60 text-sm tracking-[0.3em] uppercase mb-4 block">
            Carnets de table
          </span>
          <h2 className="font-[family-name:var(--font-cormorant)] text-or text-4xl md:text-5xl lg:text-6xl font-light">
            Galerie
          </h2>
        </motion.div>

        {/* Desktop grid */}
        <div className="hidden md:grid grid-cols-4 grid-rows-3 gap-3 aspect-[16/10]">
          {images.map((img, i) => (
            <motion.div
              key={img.label}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={
                isInView
                  ? { opacity: 1, scale: 1 }
                  : { opacity: 0, scale: 0.95 }
              }
              transition={{ delay: i * 0.12, duration: 0.7 }}
              className={`${img.span} relative overflow-hidden group cursor-pointer`}
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${bgColors[i]} transition-transform duration-700 group-hover:scale-105`}
              />
              {/* Placeholder content */}
              <div className="absolute inset-0 flex items-center justify-center">
                <svg
                  className="w-12 h-12 text-or/20"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-noir/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                <span className="font-[family-name:var(--font-cormorant)] text-or text-2xl italic">
                  {img.label}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mobile horizontal scroll */}
        <div className="md:hidden flex gap-3 overflow-x-auto snap-x snap-mandatory pb-4 -mx-6 px-6 scrollbar-hide">
          {images.map((img, i) => (
            <motion.div
              key={img.label}
              initial={{ opacity: 0, x: 30 }}
              animate={
                isInView
                  ? { opacity: 1, x: 0 }
                  : { opacity: 0, x: 30 }
              }
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="snap-center flex-shrink-0 w-[75vw] aspect-[4/5] relative overflow-hidden"
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${bgColors[i]}`}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <svg
                  className="w-10 h-10 text-or/20"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <div className="absolute bottom-4 left-4">
                <span className="font-[family-name:var(--font-cormorant)] text-or text-xl italic">
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
