"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { fadeInUp, staggerContainer, staggerItem } from "@/lib/animations";

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

  return (
    <section ref={ref} id="carte" className="py-24 md:py-32 bg-noir-light">
      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center mb-16"
        >
          <span className="text-or/60 text-sm tracking-[0.3em] uppercase mb-4 block">
            Migrations culinaires
          </span>
          <h2 className="font-[family-name:var(--font-cormorant)] text-or text-4xl md:text-5xl lg:text-6xl font-light mb-4">
            La Carte
          </h2>
          <p className="font-[family-name:var(--font-playfair)] italic text-creme/60 text-lg">
            Chaque saison est un nouveau voyage
          </p>
        </motion.div>

        {/* Categories */}
        {categories.map((cat, catIdx) => (
          <motion.div
            key={cat.titre}
            variants={staggerContainer}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="mb-16"
          >
            {/* Category title */}
            <motion.div variants={staggerItem} className="flex items-center gap-4 mb-8">
              <h3 className="font-[family-name:var(--font-cormorant)] text-creme text-2xl md:text-3xl">
                {cat.titre}
              </h3>
              <div className="h-[1px] flex-1 bg-gradient-to-r from-or/30 to-transparent" />
              <span className="font-[family-name:var(--font-playfair)] italic text-or/50 text-sm">
                {cat.sousTitre}
              </span>
            </motion.div>

            {/* Dishes */}
            <div className="space-y-4">
              {cat.plats.map((plat) => (
                <motion.div
                  key={plat.nom}
                  variants={staggerItem}
                  className="flex items-baseline gap-3 group"
                >
                  <span className="font-[family-name:var(--font-playfair)] italic text-creme/80 text-base md:text-lg group-hover:text-creme transition-colors duration-300 flex-1">
                    {plat.nom}
                  </span>
                  <span className="hidden sm:block flex-1 border-b border-dotted border-or/15 min-w-[40px] -translate-y-1" />
                  <span className="text-or font-light text-lg">{plat.prix}</span>
                </motion.div>
              ))}
            </div>

            {catIdx < categories.length - 1 && (
              <div className="mt-12 flex justify-center">
                <div className="w-1 h-1 rounded-full bg-or/40" />
              </div>
            )}
          </motion.div>
        ))}

        {/* Formules */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mt-20 border border-or/30 p-8 md:p-12 relative"
        >
          {/* Corner decorations */}
          <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-or" />
          <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-or" />
          <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-or" />
          <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-or" />

          <h3 className="font-[family-name:var(--font-cormorant)] text-or text-2xl md:text-3xl text-center mb-8">
            Formules
          </h3>
          <div className="space-y-6">
            {formules.map((f) => (
              <div key={f.nom} className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3">
                <span className="font-[family-name:var(--font-cormorant)] text-creme text-xl font-medium">
                  {f.nom}
                </span>
                {f.desc && (
                  <span className="text-creme/50 text-sm">{f.desc}</span>
                )}
                <span className="hidden sm:block flex-1 border-b border-dotted border-or/15 min-w-[20px] -translate-y-1" />
                <span className="text-or text-2xl font-[family-name:var(--font-cormorant)] font-semibold">
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
