"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { fadeInUp } from "@/lib/animations";
import { useDayNight } from "@/context/DayNightContext";

const avis = [
  {
    texte: "Il nous vend du rêve en racontant ses recettes, et quand on goûte sa cuisine, le rêve devient réalité.",
    source: "Tripadvisor",
  },
  {
    texte: "Rodez a de la chance de pouvoir profiter d'une cuisine aussi raffinée, travaillée et fine. Bravo à Thomas.",
    source: "Tripadvisor",
  },
  {
    texte: "The fusion of French and international flavours was incredible, and every bite was a delight. Cosy yet elegant.",
    source: "Google",
  },
  {
    texte: "Découvert au hasard d'une rue... Une expérience culinaire exceptionnelle, où chaque plat reflète une véritable maîtrise.",
    source: "Google",
  },
  {
    texte: "Une cuisine fusion, abordable, originale. La terrasse à l'arrière est un vrai bonheur.",
    source: "Petit Futé",
  },
];

const stats = [
  { value: 4.9, label: "Note Google", suffix: "", decimals: 1 },
  { value: 158, label: "Avis clients", suffix: "+", decimals: 0 },
  { value: 21, label: "Menu déjeuner", suffix: "€", decimals: 0 },
  { value: 2023, label: "Année d'ouverture", suffix: "", decimals: 0 },
];

function CountUp({ target, suffix, decimals, active }: { target: number; suffix: string; decimals: number; active: boolean }) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!active) return;
    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) { setValue(target); clearInterval(timer); }
      else setValue(current);
    }, duration / steps);
    return () => clearInterval(timer);
  }, [active, target]);
  return <span>{decimals > 0 ? value.toFixed(decimals) : Math.floor(value)}{suffix}</span>;
}

export default function Avis() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [current, setCurrent] = useState(0);
  const { isDay } = useDayNight();

  useEffect(() => {
    const timer = setInterval(() => setCurrent((p) => (p + 1) % avis.length), 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section
      ref={ref}
      id="avis"
      className="relative py-24 md:py-32 overflow-hidden transition-colors duration-[1200ms]"
      style={{ backgroundColor: isDay ? "rgba(253,251,247,0.88)" : "rgba(12,12,12,0.92)" }}
    >
      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full particle"
            style={{
              width: isDay ? 3 : 1.5,
              height: isDay ? 3 : 1.5,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              backgroundColor: "#C9A96E",
              opacity: isDay ? 0.15 : 0.3,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center mb-16"
        >
          <span
            className="text-sm tracking-[0.3em] uppercase mb-4 block transition-colors duration-1000"
            style={{ color: isDay ? "rgba(139,115,85,0.6)" : "rgba(201,169,110,0.6)" }}
          >
            Témoignages
          </span>
          <h2
            className="font-[family-name:var(--font-cormorant)] text-4xl md:text-5xl lg:text-6xl font-light transition-colors duration-1000"
            style={{ color: isDay ? "#3D2B1F" : "#C9A96E" }}
          >
            Ce qu&apos;ils en disent
          </h2>
        </motion.div>

        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mb-20"
        >
          <div className="relative h-[200px] md:h-[160px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0 flex flex-col items-center justify-center text-center"
              >
                <div className="flex gap-1 mb-6">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg key={i} className="w-4 h-4" fill={isDay ? "#8B6914" : "#C9A96E"} viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <blockquote
                  className="font-[family-name:var(--font-playfair)] italic text-lg md:text-xl lg:text-2xl max-w-3xl leading-relaxed mb-4 transition-colors duration-1000"
                  style={{ color: isDay ? "rgba(44,36,24,0.9)" : "rgba(245,240,232,0.9)" }}
                >
                  &laquo;&nbsp;{avis[current].texte}&nbsp;&raquo;
                </blockquote>
                <span
                  className="text-sm tracking-widest uppercase transition-colors duration-1000"
                  style={{ color: isDay ? "rgba(139,115,85,0.6)" : "rgba(201,169,110,0.6)" }}
                >
                  {avis[current].source}
                </span>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex justify-center gap-2 mt-8">
            {avis.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className="h-2 rounded-full transition-all duration-300"
                style={{
                  width: i === current ? 24 : 8,
                  backgroundColor:
                    i === current
                      ? isDay ? "#8B6914" : "#C9A96E"
                      : isDay ? "rgba(139,105,20,0.25)" : "rgba(201,169,110,0.3)",
                }}
                aria-label={`Avis ${i + 1}`}
              />
            ))}
          </div>
        </motion.div>

        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div
                className="font-[family-name:var(--font-cormorant)] text-4xl md:text-5xl font-light mb-2 transition-colors duration-1000"
                style={{ color: isDay ? "#8B6914" : "#C9A96E" }}
              >
                <CountUp target={stat.value} suffix={stat.suffix} decimals={stat.decimals} active={isInView} />
              </div>
              <p
                className="text-sm tracking-wider uppercase transition-colors duration-1000"
                style={{ color: isDay ? "rgba(61,43,31,0.45)" : "rgba(245,240,232,0.5)" }}
              >
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
