"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { fadeInUp, staggerContainer, staggerItem } from "@/lib/animations";
import { useDayNight } from "@/context/DayNightContext";

interface Plat {
  nom: string;
  prix: string;
}

interface Categorie {
  titre: string;
  sousTitre: string;
  plats: Plat[];
}

const categories: Categorie[] = [
  {
    titre: "Entrées",
    sousTitre: "Escales",
    plats: [
      { nom: "Tartare de dorade au soja, agrumes et herbes fraîches", prix: "14€" },
      { nom: "Rillettes de poulet à la citronnelle, mesclun et toasts croustillants", prix: "12€" },
      { nom: "Brandade de patate douce, condiment d'épices douces", prix: "13€" },
    ],
  },
  {
    titre: "Plats",
    sousTitre: "Destinations",
    plats: [
      { nom: "Magret de canard laqué à l'hibiscus, légumes glacés", prix: "28€" },
      { nom: "Quasi de veau bio Causselot, coulis de sauge, crème de Laguiole", prix: "28€" },
      { nom: "Retour de pêche du jour, chou-fleur vanille, émulsion aux agrumes", prix: "26€" },
      { nom: "Pigeon du Mont Royal cuit rosé, réduction de vin rouge à la réglisse", prix: "34€" },
    ],
  },
  {
    titre: "Desserts",
    sousTitre: "Souvenirs",
    plats: [
      { nom: "Pavlova déstructurée aux fruits de la maison", prix: "10€" },
      { nom: "Choux citron pralinés", prix: "10€" },
      { nom: "Banane flambée, épices du voyage", prix: "9€" },
    ],
  },
];

const formules = [
  { nom: "Menu Déjeuner", desc: "Entrée + plat ou plat + dessert", prix: "21€" },
  { nom: "Menu Expression Libre", desc: "Entrée + plat + dessert", prix: "37€" },
  { nom: "Menu Enfant", desc: "", prix: "12€" },
];

export default function Carte() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { isDay } = useDayNight();

  return (
    <section
      ref={ref}
      id="carte"
      className="py-24 md:py-32 transition-colors duration-[1200ms]"
      style={{ backgroundColor: isDay ? "rgba(253,251,247,0.88)" : "rgba(17,17,17,0.92)" }}
    >
      <div className="max-w-4xl mx-auto px-6">
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
            Migrations culinaires
          </span>
          <h2
            className="font-[family-name:var(--font-cormorant)] text-4xl md:text-5xl lg:text-6xl font-light mb-4 transition-colors duration-1000"
            style={{ color: isDay ? "#3D2B1F" : "#C9A96E" }}
          >
            La Carte
          </h2>
          <p
            className="font-[family-name:var(--font-playfair)] italic text-lg transition-colors duration-1000"
            style={{ color: isDay ? "rgba(61,43,31,0.5)" : "rgba(245,240,232,0.6)" }}
          >
            Chaque saison est un nouveau voyage
          </p>
        </motion.div>

        {categories.map((cat, catIdx) => (
          <motion.div
            key={cat.titre}
            variants={staggerContainer}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="mb-16"
          >
            <motion.div variants={staggerItem} className="flex items-center gap-4 mb-8">
              <h3
                className="font-[family-name:var(--font-cormorant)] text-2xl md:text-3xl transition-colors duration-1000"
                style={{ color: isDay ? "#2C2418" : "#F5F0E8" }}
              >
                {cat.titre}
              </h3>
              <div
                className="h-[1px] flex-1 transition-colors duration-1000"
                style={{
                  background: isDay
                    ? "linear-gradient(to right, rgba(201,169,110,0.35), transparent)"
                    : "linear-gradient(to right, rgba(201,169,110,0.3), transparent)",
                }}
              />
              <span
                className="font-[family-name:var(--font-playfair)] italic text-sm transition-colors duration-1000"
                style={{ color: isDay ? "rgba(139,115,85,0.5)" : "rgba(201,169,110,0.5)" }}
              >
                {cat.sousTitre}
              </span>
            </motion.div>

            <div className="space-y-4">
              {cat.plats.map((plat) => (
                <motion.div key={plat.nom} variants={staggerItem} className="flex items-baseline gap-3 group">
                  <span
                    className="font-[family-name:var(--font-playfair)] italic text-base md:text-lg flex-1 transition-colors duration-700"
                    style={{ color: isDay ? "rgba(44,36,24,0.8)" : "rgba(245,240,232,0.8)" }}
                  >
                    {plat.nom}
                  </span>
                  <span
                    className="hidden sm:block flex-1 min-w-[40px] -translate-y-1 transition-colors duration-1000"
                    style={{
                      borderBottom: isDay
                        ? "1px dotted rgba(201,169,110,0.2)"
                        : "1px dotted rgba(201,169,110,0.15)",
                    }}
                  />
                  <span
                    className="font-light text-lg transition-colors duration-1000"
                    style={{ color: isDay ? "#8B6914" : "#C9A96E" }}
                  >
                    {plat.prix}
                  </span>
                </motion.div>
              ))}
            </div>

            {catIdx < categories.length - 1 && (
              <div className="mt-12 flex justify-center">
                <div
                  className="w-1 h-1 rounded-full transition-colors duration-1000"
                  style={{ backgroundColor: isDay ? "rgba(139,105,20,0.4)" : "rgba(201,169,110,0.4)" }}
                />
              </div>
            )}
          </motion.div>
        ))}

        {/* Formules */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mt-20 p-8 md:p-12 relative transition-colors duration-1000"
          style={{
            border: isDay
              ? "1px solid rgba(201,169,110,0.3)"
              : "1px solid rgba(201,169,110,0.3)",
          }}
        >
          <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-or" />
          <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-or" />
          <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-or" />
          <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-or" />

          <h3
            className="font-[family-name:var(--font-cormorant)] text-2xl md:text-3xl text-center mb-8 transition-colors duration-1000"
            style={{ color: isDay ? "#8B6914" : "#C9A96E" }}
          >
            Formules
          </h3>
          <div className="space-y-6">
            {formules.map((f) => (
              <div key={f.nom} className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3">
                <span
                  className="font-[family-name:var(--font-cormorant)] text-xl font-medium transition-colors duration-1000"
                  style={{ color: isDay ? "#2C2418" : "#F5F0E8" }}
                >
                  {f.nom}
                </span>
                {f.desc && (
                  <span
                    className="text-sm transition-colors duration-1000"
                    style={{ color: isDay ? "rgba(44,36,24,0.5)" : "rgba(245,240,232,0.5)" }}
                  >
                    {f.desc}
                  </span>
                )}
                <span
                  className="hidden sm:block flex-1 min-w-[20px] -translate-y-1"
                  style={{ borderBottom: "1px dotted rgba(201,169,110,0.15)" }}
                />
                <span
                  className="text-2xl font-[family-name:var(--font-cormorant)] font-semibold transition-colors duration-1000"
                  style={{ color: isDay ? "#8B6914" : "#C9A96E" }}
                >
                  {f.prix}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
