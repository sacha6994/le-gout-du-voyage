"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDayNight } from "@/context/DayNightContext";

const navLinks = [
  { href: "#histoire", label: "L'Histoire" },
  { href: "#carte", label: "La Carte" },
  { href: "#galerie", label: "Galerie" },
  { href: "#terrasse", label: "Terrasse" },
  { href: "#avis", label: "Avis" },
  { href: "#reservation", label: "Réserver" },
];

function DayNightToggle() {
  const { isDay, toggle } = useDayNight();
  const btnRef = useRef<HTMLButtonElement>(null);

  const handleToggle = () => {
    if (btnRef.current) {
      const r = btnRef.current.getBoundingClientRect();
      toggle({ x: r.left + r.width / 2, y: r.top + r.height / 2 });
    }
  };

  return (
    <button
      ref={btnRef}
      onClick={handleToggle}
      className="relative w-16 h-8 rounded-full border overflow-hidden transition-all duration-700 focus:outline-none flex-shrink-0"
      style={{
        borderColor: isDay ? "rgba(201,169,110,0.35)" : "rgba(201,169,110,0.2)",
        backgroundColor: isDay ? "rgba(201,169,110,0.1)" : "rgba(17,17,17,0.8)",
      }}
      aria-label={isDay ? "Mode nuit" : "Mode jour"}
    >
      <motion.div
        animate={{ x: isDay ? 32 : 0 }}
        transition={{ type: "spring", stiffness: 400, damping: 28 }}
        className="absolute top-0.5 left-0.5 w-7 h-7 rounded-full flex items-center justify-center"
        style={{
          background: isDay
            ? "linear-gradient(135deg, #C9A96E, #E8D5A8)"
            : "linear-gradient(135deg, #1B3A4B, #2A5568)",
          boxShadow: isDay
            ? "0 0 12px rgba(201,169,110,0.5)"
            : "0 0 8px rgba(27,58,75,0.4)",
        }}
      >
        <motion.div animate={{ rotate: isDay ? 180 : 0 }} transition={{ duration: 0.5 }}>
          {isDay ? (
            <svg className="w-3.5 h-3.5 text-noir" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="4" />
              <path d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32l1.41 1.41M2 12h2m16 0h2M4.93 19.07l1.41-1.41m11.32-11.32l1.41-1.41" />
            </svg>
          ) : (
            <svg className="w-3 h-3 text-creme" fill="currentColor" viewBox="0 0 24 24">
              <path d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
            </svg>
          )}
        </motion.div>
      </motion.div>
    </button>
  );
}

export default function Navbar() {
  const { isDay } = useDayNight();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const scrolledBg = isDay
    ? "bg-white/90 backdrop-blur-md shadow-md"
    : "bg-noir/90 backdrop-blur-md shadow-lg";

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
          scrolled ? scrolledBg : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <a
            href="#"
            className="font-[family-name:var(--font-cormorant)] text-xl md:text-2xl tracking-wide transition-colors duration-700"
            style={{ color: isDay ? "#3D2B1F" : "#C9A96E" }}
          >
            Le Goût du Voyage
          </a>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm tracking-widest uppercase transition-colors duration-500"
                style={{
                  color: isDay
                    ? "rgba(61,43,31,0.6)"
                    : "rgba(245,240,232,0.7)",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = isDay ? "#C9A96E" : "#C9A96E")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = isDay
                    ? "rgba(61,43,31,0.6)"
                    : "rgba(245,240,232,0.7)")
                }
              >
                {link.label}
              </a>
            ))}
            <DayNightToggle />
          </div>

          {/* Mobile: toggle + hamburger */}
          <div className="lg:hidden flex items-center gap-4">
            <DayNightToggle />
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="relative z-60 w-8 h-8 flex flex-col justify-center items-center gap-1.5"
              aria-label="Menu"
            >
              <motion.span
                animate={menuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                className="block w-6 h-[1.5px] origin-center transition-colors duration-700"
                style={{ backgroundColor: isDay && !menuOpen ? "#3D2B1F" : "#C9A96E" }}
              />
              <motion.span
                animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
                className="block w-6 h-[1.5px] transition-colors duration-700"
                style={{ backgroundColor: isDay && !menuOpen ? "#3D2B1F" : "#C9A96E" }}
              />
              <motion.span
                animate={menuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                className="block w-6 h-[1.5px] origin-center transition-colors duration-700"
                style={{ backgroundColor: isDay && !menuOpen ? "#3D2B1F" : "#C9A96E" }}
              />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile fullscreen menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-8"
            style={{
              backgroundColor: isDay
                ? "rgba(245,240,232,0.98)"
                : "rgba(12,12,12,0.98)",
            }}
          >
            {navLinks.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
                className="font-[family-name:var(--font-cormorant)] text-3xl tracking-wider transition-colors"
                style={{ color: isDay ? "#3D2B1F" : "#C9A96E" }}
              >
                {link.label}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
