"use client";

import { motion } from "framer-motion";
import { fadeInUp } from "@/lib/animations";

export default function Footer() {
  return (
    <footer className="py-16 bg-[#050505] border-t border-or/5">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center"
        >
          <h3 className="font-[family-name:var(--font-cormorant)] text-or text-3xl md:text-4xl mb-3">
            Le Goût du Voyage
          </h3>
          <p className="font-[family-name:var(--font-playfair)] italic text-creme/40 text-sm mb-8">
            Cuisine fusion &bull; Terroir & Monde &bull; Rodez
          </p>

          {/* Social links */}
          <div className="flex justify-center gap-6 mb-10">
            {/* Facebook */}
            <a
              href="#"
              aria-label="Facebook"
              className="text-creme/30 hover:text-or transition-colors duration-300"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </a>
            {/* Google Maps */}
            <a
              href="#"
              aria-label="Google Maps"
              className="text-creme/30 hover:text-or transition-colors duration-300"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                />
              </svg>
            </a>
            {/* Tripadvisor */}
            <a
              href="#"
              aria-label="Tripadvisor"
              className="text-creme/30 hover:text-or transition-colors duration-300"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18c-4.418 0-8-3.582-8-8s3.582-8 8-8 8 3.582 8 8-3.582 8-8 8zm-2.5-6a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm5 0a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM12 7c-2.5 0-5 1-6.5 2.5h1.5a4 4 0 118 0h1.5C15 8 14.5 7 12 7z" />
              </svg>
            </a>
          </div>

          {/* Separator */}
          <div className="w-16 h-[1px] bg-or/20 mx-auto mb-6" />

          <p className="text-creme/20 text-xs mb-2">
            &copy; 2025 Le Goût du Voyage — Tous droits réservés
          </p>
          <p className="text-creme/15 text-[10px] tracking-wider">
            Site réalisé par{" "}
            <span className="text-creme/25 hover:text-or/40 transition-colors">
              IRYA — irya.fr
            </span>
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
