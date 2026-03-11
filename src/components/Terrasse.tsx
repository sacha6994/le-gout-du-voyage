"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { fadeInUp, staggerContainer, staggerItem } from "@/lib/animations";
import { useDayNight } from "@/context/DayNightContext";

const features = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18a3.75 3.75 0 00.495-7.467 5.99 5.99 0 00-1.925 3.546 5.974 5.974 0 01-2.133-1A3.75 3.75 0 0012 18z" />
      </svg>
    ),
    titre: "Intimiste",
    desc: "30 couverts dans un cadre feutré",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12.75 3.03v.568c0 .334.148.65.405.864l1.068.89c.442.369.535 1.01.216 1.49l-.51.766a2.25 2.25 0 01-1.161.886l-.143.048a1.107 1.107 0 00-.57 1.664c.369.555.169 1.307-.427 1.605L9 13.125l.423 1.059a.956.956 0 01-1.652.928l-.679-.906a1.125 1.125 0 00-1.906.172L4.5 15.75l-.612.153M12.75 3.031a9 9 0 00-8.862 12.872M12.75 3.031a9 9 0 016.69 14.036m0 0l-.177-.529A2.25 2.25 0 0017.128 15H16.5l-.324-.324a1.453 1.453 0 00-2.328.377l-.036.073a1.586 1.586 0 01-.982.816l-.99.282c-.55.157-.894.702-.8 1.267l.073.438c.08.474.49.821.97.821.846 0 1.598.542 1.865 1.345l.215.643m5.276-3.67a9.012 9.012 0 01-5.276 3.67" />
      </svg>
    ),
    titre: "Terrasse ombragée",
    desc: "Un jardin caché en plein centre historique",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z" />
      </svg>
    ),
    titre: "Lieu historique",
    desc: "Ancien restaurant étoilé Michelin de Rodez",
  },
];

export default function Terrasse() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { isDay } = useDayNight();

  return (
    <section
      ref={ref}
      id="terrasse"
      className="py-24 md:py-32 transition-colors duration-[1200ms]"
      style={{ backgroundColor: isDay ? "#F5F0E8" : "#0C0C0C" }}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8 }}
            className="relative aspect-[4/3] overflow-hidden"
            style={{
              borderRadius: isDay ? 12 : 0,
              boxShadow: isDay ? "0 10px 40px rgba(0,0,0,0.12)" : "none",
            }}
          >
            <Image
              src="https://images.unsplash.com/photo-1677779455198-7773892a8021?w=900&q=80"
              alt="Terrasse ombragée du restaurant Le Goût du Voyage"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
              style={{ filter: isDay ? "brightness(1.08) saturate(1.1)" : "" }}
              loading="lazy"
            />
            <div
              className="absolute inset-0 pointer-events-none transition-all duration-1000"
              style={{
                background: isDay
                  ? "linear-gradient(to top, rgba(245,240,232,0.3) 0%, transparent 40%)"
                  : "linear-gradient(to top, rgba(12,12,12,0.5) 0%, transparent 40%, rgba(12,12,12,0.2) 100%)",
              }}
            />
            <div
              className="absolute inset-3 pointer-events-none transition-all duration-1000"
              style={{
                border: "1px solid rgba(201,169,110,0.1)",
                borderRadius: isDay ? 8 : 0,
              }}
            />
          </motion.div>

          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <span
              className="text-sm tracking-[0.3em] uppercase mb-4 block transition-colors duration-1000"
              style={{ color: isDay ? "rgba(139,115,85,0.6)" : "rgba(201,169,110,0.6)" }}
            >
              Le secret de la rue de Bonald
            </span>
            <h2
              className="font-[family-name:var(--font-cormorant)] text-4xl md:text-5xl font-light mb-6 transition-colors duration-1000"
              style={{ color: isDay ? "#3D2B1F" : "#C9A96E" }}
            >
              La Terrasse
            </h2>
            <p
              className="text-base md:text-lg leading-relaxed mb-10 transition-colors duration-1000"
              style={{ color: isDay ? "rgba(61,43,31,0.7)" : "rgba(245,240,232,0.7)" }}
            >
              Nichée à l&apos;arrière du restaurant, notre terrasse ombragée est
              un secret bien gardé du centre-ville de Rodez. Un écrin de verdure
              pour des dîners sous les étoiles.
            </p>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="space-y-6"
            >
              {features.map((f) => (
                <motion.div key={f.titre} variants={staggerItem} className="flex items-start gap-4">
                  <div
                    className="mt-0.5 flex-shrink-0 transition-colors duration-1000"
                    style={{ color: isDay ? "#8B6914" : "#C9A96E" }}
                  >
                    {f.icon}
                  </div>
                  <div>
                    <h4
                      className="font-[family-name:var(--font-cormorant)] text-xl mb-1 transition-colors duration-1000"
                      style={{ color: isDay ? "#2C2418" : "#F5F0E8" }}
                    >
                      {f.titre}
                    </h4>
                    <p
                      className="text-sm transition-colors duration-1000"
                      style={{ color: isDay ? "rgba(61,43,31,0.5)" : "rgba(245,240,232,0.5)" }}
                    >
                      {f.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
