"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { fadeInUp } from "@/lib/animations";

const images = [
  {
    label: "Le Chef",
    span: "col-span-2 row-span-2",
    src: "https://images.unsplash.com/photo-1648376884841-b7fe8b8f0765?w=900&q=80",
  },
  {
    label: "Pacifique",
    span: "col-span-1 row-span-1",
    src: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=600&q=80",
  },
  {
    label: "Aubrac",
    span: "col-span-1 row-span-1",
    src: "https://images.unsplash.com/photo-1594041680534-e8c8cdebd659?w=600&q=80",
  },
  {
    label: "Épices",
    span: "col-span-1 row-span-1",
    src: "https://images.unsplash.com/photo-1553267574-277716d448fb?w=600&q=80",
  },
  {
    label: "Terrasse",
    span: "col-span-1 row-span-1",
    src: "https://images.unsplash.com/photo-1640703607347-a5cefc15c86b?w=600&q=80",
  },
  {
    label: "Terroir",
    span: "col-span-2 row-span-1",
    src: "https://images.unsplash.com/photo-1541832676-9b763b0239ab?w=900&q=80",
  },
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
              <Image
                src={img.src}
                alt={img.label}
                fill
                sizes={img.span.includes("col-span-2") ? "50vw" : "25vw"}
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />
              {/* Dark vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-noir/70 via-transparent to-noir/20 pointer-events-none" />
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-noir/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                <span className="font-[family-name:var(--font-cormorant)] text-or text-2xl italic translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
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
              <Image
                src={img.src}
                alt={img.label}
                fill
                sizes="75vw"
                className="object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-noir/80 via-transparent to-transparent pointer-events-none" />
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
