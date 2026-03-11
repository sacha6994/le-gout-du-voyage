"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { fadeInUp, slideInLeft, slideInRight } from "@/lib/animations";

export default function Histoire() {
  const sectionRef = useRef<HTMLElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const pathLength = useTransform(scrollYProgress, [0.1, 0.6], [0, 1]);

  return (
    <section
      ref={sectionRef}
      id="histoire"
      className="relative py-24 md:py-32 bg-noir overflow-hidden"
    >
      {/* Golden travel line SVG */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 1200 800"
        fill="none"
        preserveAspectRatio="none"
      >
        <motion.path
          ref={pathRef}
          d="M-50,400 C100,200 300,600 500,350 S700,100 900,400 S1100,600 1300,300"
          stroke="#C9A96E"
          strokeWidth="1"
          strokeOpacity="0.2"
          fill="none"
          style={{ pathLength }}
        />
      </svg>

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Text */}
          <motion.div
            variants={slideInLeft}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <motion.span
              variants={fadeInUp}
              className="text-or/60 text-sm tracking-[0.3em] uppercase mb-4 block"
            >
              L&apos;Histoire
            </motion.span>
            <motion.h2
              variants={fadeInUp}
              className="font-[family-name:var(--font-cormorant)] text-or text-4xl md:text-5xl lg:text-6xl font-light mb-8"
            >
              Le Voyage
            </motion.h2>
            <motion.div
              variants={fadeInUp}
              className="space-y-6 text-creme/70 text-base md:text-lg leading-relaxed"
            >
              <p>
                Formé à l&apos;École Ferrandi, passé par les cuisines de Joël
                Robuchon, Thomas Sabrié a un jour quitté les étoiles
                parisiennes pour voyager. Le Pacifique, l&apos;Asie, la
                Méditerranée — chaque escale est devenue une saveur.
              </p>
              <p>
                De retour en Aveyron, sa terre natale, il a posé ses couteaux
                rue de Bonald, dans les murs d&apos;un ancien restaurant
                étoilé. Ici, le terroir d&apos;Aubrac rencontre les épices du
                monde.
              </p>
              <p className="font-[family-name:var(--font-playfair)] italic text-creme/90 text-xl">
                Chaque plat est un voyage. Chaque bouchée, un retour.
              </p>
            </motion.div>
          </motion.div>

          {/* Chef photo placeholder */}
          <motion.div
            variants={slideInRight}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="relative"
          >
            <div className="relative aspect-[3/4] bg-noir-light overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1502364271109-0a9a75a2a9df?w=800&q=80"
                alt="Chef Thomas Sabrié en cuisine"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
                priority
              />
              {/* Dark gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-noir/60 via-transparent to-noir/20 pointer-events-none" />
              {/* Decorative border */}
              <div className="absolute inset-4 border border-or/10 pointer-events-none" />
            </div>
            {/* Decorative offset element */}
            <div className="absolute -bottom-4 -right-4 w-full h-full border border-or/10 -z-10" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
