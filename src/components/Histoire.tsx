"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { fadeInUp, slideInLeft, slideInRight } from "@/lib/animations";
import { useDayNight } from "@/context/DayNightContext";

export default function Histoire() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const { isDay } = useDayNight();

  return (
    <section
      ref={sectionRef}
      id="histoire"
      className="relative py-24 md:py-32 overflow-hidden transition-colors duration-[1200ms]"
      style={{ backgroundColor: isDay ? "#F5F0E8" : "#0C0C0C" }}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            variants={slideInLeft}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <motion.span
              variants={fadeInUp}
              className="text-sm tracking-[0.3em] uppercase mb-4 block transition-colors duration-1000"
              style={{ color: isDay ? "rgba(139,115,85,0.6)" : "rgba(201,169,110,0.6)" }}
            >
              L&apos;Histoire
            </motion.span>
            <motion.h2
              variants={fadeInUp}
              className="font-[family-name:var(--font-cormorant)] text-4xl md:text-5xl lg:text-6xl font-light mb-8 transition-colors duration-1000"
              style={{ color: isDay ? "#3D2B1F" : "#C9A96E" }}
            >
              Le Voyage
            </motion.h2>
            <motion.div variants={fadeInUp} className="space-y-6 text-base md:text-lg leading-relaxed">
              <p
                className="transition-colors duration-1000"
                style={{ color: isDay ? "rgba(61,43,31,0.75)" : "rgba(245,240,232,0.7)" }}
              >
                Formé à l&apos;École Ferrandi, passé par les cuisines de Joël
                Robuchon, Thomas Sabrié a un jour quitté les étoiles
                parisiennes pour voyager. Le Pacifique, l&apos;Asie, la
                Méditerranée — chaque escale est devenue une saveur.
              </p>
              <p
                className="transition-colors duration-1000"
                style={{ color: isDay ? "rgba(61,43,31,0.75)" : "rgba(245,240,232,0.7)" }}
              >
                De retour en Aveyron, sa terre natale, il a posé ses couteaux
                rue de Bonald, dans les murs d&apos;un ancien restaurant
                étoilé. Ici, le terroir d&apos;Aubrac rencontre les épices du
                monde.
              </p>
              <p
                className="font-[family-name:var(--font-playfair)] italic text-xl transition-colors duration-1000"
                style={{ color: isDay ? "rgba(61,43,31,0.9)" : "rgba(245,240,232,0.9)" }}
              >
                Chaque plat est un voyage. Chaque bouchée, un retour.
              </p>
            </motion.div>
          </motion.div>

          <motion.div
            variants={slideInRight}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="relative"
          >
            <div
              className="relative aspect-[3/4] overflow-hidden transition-shadow duration-1000"
              style={{
                borderRadius: isDay ? 12 : 0,
                boxShadow: isDay ? "0 10px 40px rgba(0,0,0,0.12)" : "none",
              }}
            >
              <Image
                src="https://images.unsplash.com/photo-1502364271109-0a9a75a2a9df?w=800&q=80"
                alt="Chef Thomas Sabrié en cuisine"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover transition-[filter] duration-1000"
                style={{ filter: isDay ? "brightness(1.05) saturate(1.1)" : "" }}
                priority
              />
              <div
                className="absolute inset-0 pointer-events-none transition-all duration-1000"
                style={{
                  background: isDay
                    ? "linear-gradient(to top, rgba(245,240,232,0.3) 0%, transparent 40%)"
                    : "linear-gradient(to top, rgba(12,12,12,0.6) 0%, transparent 40%, rgba(12,12,12,0.2) 100%)",
                }}
              />
              <div
                className="absolute inset-4 pointer-events-none transition-colors duration-1000"
                style={{
                  border: isDay ? "1px solid rgba(201,169,110,0.15)" : "1px solid rgba(201,169,110,0.1)",
                  borderRadius: isDay ? 8 : 0,
                }}
              />
            </div>
            <div
              className="absolute -bottom-4 -right-4 w-full h-full -z-10 transition-colors duration-1000"
              style={{
                border: isDay ? "1px solid rgba(201,169,110,0.15)" : "1px solid rgba(201,169,110,0.1)",
                borderRadius: isDay ? 12 : 0,
              }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
