"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { fadeInUp, staggerContainer, staggerItem } from "@/lib/animations";

function PassportStamp() {
  return (
    <svg viewBox="0 0 200 200" className="w-28 h-28 md:w-36 md:h-36 opacity-[0.07]">
      <defs>
        <path
          id="stampCircle"
          d="M 100,100 m -72,0 a 72,72 0 1,1 144,0 a 72,72 0 1,1 -144,0"
        />
      </defs>
      <circle cx="100" cy="100" r="80" stroke="#C9A96E" strokeWidth="2" fill="none" />
      <circle cx="100" cy="100" r="72" stroke="#C9A96E" strokeWidth="1" fill="none" />
      <text fill="#C9A96E" fontSize="11" fontFamily="serif" letterSpacing="3">
        <textPath href="#stampCircle">
          LE GOÛT DU VOYAGE • RODEZ • AVEYRON • FRANCE •
        </textPath>
      </text>
      <text
        x="100"
        y="96"
        textAnchor="middle"
        fill="#C9A96E"
        fontSize="20"
        fontFamily="serif"
      >
        GDV
      </text>
      <text
        x="100"
        y="116"
        textAnchor="middle"
        fill="#C9A96E"
        fontSize="10"
        fontFamily="serif"
        letterSpacing="2"
      >
        EST. 2023
      </text>
    </svg>
  );
}

function CompassRose() {
  return (
    <motion.svg
      viewBox="0 0 100 100"
      className="w-14 h-14 text-or/15"
      animate={{ rotate: 360 }}
      transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
    >
      <g fill="currentColor" stroke="currentColor" strokeWidth="0.5">
        {/* N */}
        <polygon points="50,10 47,40 53,40" />
        {/* S */}
        <polygon points="50,90 47,60 53,60" opacity="0.5" />
        {/* E */}
        <polygon points="90,50 60,47 60,53" opacity="0.5" />
        {/* W */}
        <polygon points="10,50 40,47 40,53" opacity="0.5" />
        {/* NE */}
        <polygon points="78,22 56,44 60,48" opacity="0.3" />
        {/* NW */}
        <polygon points="22,22 44,44 40,48" opacity="0.3" />
        {/* SE */}
        <polygon points="78,78 56,56 60,52" opacity="0.3" />
        {/* SW */}
        <polygon points="22,78 44,56 40,52" opacity="0.3" />
        <circle cx="50" cy="50" r="3" fill="none" strokeWidth="1" />
      </g>
    </motion.svg>
  );
}

export default function Reservation() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [formData, setFormData] = useState({
    nom: "",
    telephone: "",
    email: "",
    date: "",
    heure: "19h30",
    couverts: "2",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(
      `Réservation - ${formData.nom} - ${formData.date} ${formData.heure}`
    );
    const body = encodeURIComponent(
      `Nom : ${formData.nom}\nTéléphone : ${formData.telephone}\nEmail : ${formData.email}\nDate : ${formData.date}\nHeure : ${formData.heure}\nNombre de couverts : ${formData.couverts}\n\nMessage : ${formData.message}`
    );
    window.location.href = `mailto:restaurant.le.gout.du.voyage@gmail.com?subject=${subject}&body=${body}`;
  };

  const update = (field: string, value: string) =>
    setFormData((prev) => ({ ...prev, [field]: value }));

  return (
    <section ref={ref} id="reservation" className="py-24 md:py-32 bg-noir-light">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center mb-16"
        >
          <span className="text-or/60 text-sm tracking-[0.3em] uppercase mb-4 block">
            Votre prochaine escale
          </span>
          <h2 className="font-[family-name:var(--font-cormorant)] text-or text-4xl md:text-5xl lg:text-6xl font-light">
            Réservation
          </h2>
        </motion.div>

        {/* Boarding pass */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <form onSubmit={handleSubmit}>
            <div className="relative border border-or/20 bg-noir/80 backdrop-blur-sm">
              {/* Top decorative bar */}
              <div className="border-b border-or/15 px-6 md:px-10 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rotate-45 bg-or/60" />
                  <span className="font-[family-name:var(--font-cormorant)] text-or text-lg md:text-xl tracking-[0.15em] uppercase">
                    Billet de Voyage
                  </span>
                </div>
                <span className="text-or/25 text-xs tracking-[0.2em] font-mono hidden sm:block">
                  N° GDV—{new Date().getFullYear()}
                </span>
              </div>

              {/* Main ticket body */}
              <div className="flex flex-col lg:flex-row">
                {/* LEFT — Form section */}
                <div className="flex-1 p-6 md:p-10 relative">
                  {/* Passport stamp watermark */}
                  <div className="absolute top-6 right-6 hidden md:block">
                    <PassportStamp />
                  </div>

                  <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    className="space-y-6"
                  >
                    {/* Row 1 — Voyageur */}
                    <motion.div variants={staggerItem}>
                      <label className="text-or/50 text-[10px] tracking-[0.25em] uppercase mb-2 block">
                        Voyageur
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.nom}
                        onChange={(e) => update("nom", e.target.value)}
                        placeholder="Votre nom"
                        className="w-full bg-transparent border-b border-or/20 text-creme text-lg font-[family-name:var(--font-cormorant)] pb-2 focus:border-or focus:outline-none transition-colors duration-500 placeholder:text-creme/15"
                      />
                    </motion.div>

                    {/* Row 2 — Contact */}
                    <motion.div
                      variants={staggerItem}
                      className="grid sm:grid-cols-2 gap-6"
                    >
                      <div>
                        <label className="text-or/50 text-[10px] tracking-[0.25em] uppercase mb-2 block">
                          Téléphone
                        </label>
                        <input
                          type="tel"
                          required
                          value={formData.telephone}
                          onChange={(e) => update("telephone", e.target.value)}
                          placeholder="06 00 00 00 00"
                          className="w-full bg-transparent border-b border-or/20 text-creme text-lg font-[family-name:var(--font-cormorant)] pb-2 focus:border-or focus:outline-none transition-colors duration-500 placeholder:text-creme/15"
                        />
                      </div>
                      <div>
                        <label className="text-or/50 text-[10px] tracking-[0.25em] uppercase mb-2 block">
                          Email
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => update("email", e.target.value)}
                          placeholder="email@exemple.com"
                          className="w-full bg-transparent border-b border-or/20 text-creme text-lg font-[family-name:var(--font-cormorant)] pb-2 focus:border-or focus:outline-none transition-colors duration-500 placeholder:text-creme/15"
                        />
                      </div>
                    </motion.div>

                    {/* Row 3 — Date / Heure / Couverts */}
                    <motion.div
                      variants={staggerItem}
                      className="grid grid-cols-3 gap-4 sm:gap-6"
                    >
                      <div>
                        <label className="text-or/50 text-[10px] tracking-[0.25em] uppercase mb-2 block">
                          Date
                        </label>
                        <input
                          type="date"
                          required
                          value={formData.date}
                          onChange={(e) => update("date", e.target.value)}
                          className="w-full bg-transparent border-b border-or/20 text-creme text-base font-[family-name:var(--font-cormorant)] pb-2 focus:border-or focus:outline-none transition-colors duration-500"
                        />
                      </div>
                      <div>
                        <label className="text-or/50 text-[10px] tracking-[0.25em] uppercase mb-2 block">
                          Heure de départ
                        </label>
                        <select
                          value={formData.heure}
                          onChange={(e) => update("heure", e.target.value)}
                          className="w-full bg-transparent border-b border-or/20 text-creme text-base font-[family-name:var(--font-cormorant)] pb-2 focus:border-or focus:outline-none transition-colors duration-500 appearance-none"
                        >
                          <option value="12h00">12h00</option>
                          <option value="12h15">12h15</option>
                          <option value="12h30">12h30</option>
                          <option value="12h45">12h45</option>
                          <option value="13h00">13h00</option>
                          <option value="19h30">19h30</option>
                          <option value="19h45">19h45</option>
                          <option value="20h00">20h00</option>
                          <option value="20h15">20h15</option>
                          <option value="20h30">20h30</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-or/50 text-[10px] tracking-[0.25em] uppercase mb-2 block">
                          Voyageurs
                        </label>
                        <select
                          value={formData.couverts}
                          onChange={(e) => update("couverts", e.target.value)}
                          className="w-full bg-transparent border-b border-or/20 text-creme text-base font-[family-name:var(--font-cormorant)] pb-2 focus:border-or focus:outline-none transition-colors duration-500 appearance-none"
                        >
                          {Array.from({ length: 10 }, (_, i) => i + 1).map(
                            (n) => (
                              <option key={n} value={String(n)}>
                                {n}
                              </option>
                            )
                          )}
                        </select>
                      </div>
                    </motion.div>

                    {/* Row 4 — Notes */}
                    <motion.div variants={staggerItem}>
                      <label className="text-or/50 text-[10px] tracking-[0.25em] uppercase mb-2 block">
                        Notes de voyage
                      </label>
                      <textarea
                        rows={2}
                        value={formData.message}
                        onChange={(e) => update("message", e.target.value)}
                        placeholder="Allergies, occasion spéciale, demandes particulières..."
                        className="w-full bg-transparent border-b border-or/20 text-creme text-base font-[family-name:var(--font-cormorant)] pb-2 focus:border-or focus:outline-none transition-colors duration-500 resize-none placeholder:text-creme/15"
                      />
                    </motion.div>
                  </motion.div>
                </div>

                {/* Perforation line */}
                <div className="hidden lg:flex flex-col items-center relative">
                  {/* Top cutout */}
                  <div className="w-6 h-3 bg-noir-light rounded-b-full -mt-[1px] border-x border-b border-or/20" />
                  {/* Dotted line */}
                  <div className="flex-1 border-l border-dashed border-or/15" />
                  {/* Bottom cutout */}
                  <div className="w-6 h-3 bg-noir-light rounded-t-full -mb-[1px] border-x border-t border-or/20" />
                </div>

                {/* Mobile separator */}
                <div className="lg:hidden flex items-center mx-6">
                  <div className="flex-1 border-t border-dashed border-or/15" />
                </div>

                {/* RIGHT — Destination stub */}
                <div className="lg:w-[320px] p-6 md:p-10 flex flex-col justify-between relative">
                  {/* Compass */}
                  <div className="absolute top-4 right-4">
                    <CompassRose />
                  </div>

                  <div className="space-y-6">
                    <div>
                      <span className="text-or/50 text-[10px] tracking-[0.25em] uppercase block mb-1">
                        Destination
                      </span>
                      <p className="font-[family-name:var(--font-cormorant)] text-creme text-xl">
                        Le Goût du Voyage
                      </p>
                      <p className="text-creme/40 text-sm mt-1">
                        38 rue de Bonald, 12000 Rodez
                      </p>
                    </div>

                    <div>
                      <span className="text-or/50 text-[10px] tracking-[0.25em] uppercase block mb-2">
                        Horaires d&apos;embarquement
                      </span>
                      <div className="space-y-1.5 text-sm">
                        <div className="flex justify-between">
                          <span className="text-creme/40">Mercredi</span>
                          <span className="text-creme/70">12h — 14h</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-creme/40">Jeu — Sam</span>
                          <span className="text-creme/70">
                            12h–14h | 19h30–21h30
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-creme/40">Dimanche</span>
                          <span className="text-creme/70">12h — 14h</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-creme/40">Lun & Mar</span>
                          <span className="text-hibiscus/80">Fermé</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <svg className="w-3.5 h-3.5 text-or/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                        </svg>
                        <a href="tel:0565427510" className="text-creme/60 text-sm hover:text-or transition-colors">
                          05 65 42 75 10
                        </a>
                      </div>
                      <div className="flex items-center gap-2">
                        <svg className="w-3.5 h-3.5 text-or/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                        </svg>
                        <span className="text-creme/60 text-xs break-all">
                          restaurant.le.gout.du.voyage@gmail.com
                        </span>
                      </div>
                    </div>

                    {/* Facebook */}
                    <div className="flex items-center gap-2">
                      <svg className="w-3.5 h-3.5 text-or/40" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                      </svg>
                      <span className="text-creme/40 text-xs">
                        Retrouvez-nous sur Facebook
                      </span>
                    </div>
                  </div>

                  {/* Barcode decoration */}
                  <div className="mt-6 flex items-end gap-[2px] h-8 opacity-10">
                    {Array.from({ length: 30 }).map((_, i) => (
                      <div
                        key={i}
                        className="bg-or flex-1"
                        style={{
                          height: `${40 + Math.sin(i * 0.8) * 30 + Math.random() * 30}%`,
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom bar with button */}
              <div className="border-t border-or/15 px-6 md:px-10 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-creme/20 text-xs text-center sm:text-left">
                  Réservation par téléphone au{" "}
                  <a
                    href="tel:0565427510"
                    className="text-or/40 hover:text-or transition-colors"
                  >
                    05 65 42 75 10
                  </a>
                </p>
                <motion.button
                  type="submit"
                  whileHover={{
                    scale: 1.03,
                    backgroundColor: "#C9A96E",
                    color: "#0C0C0C",
                  }}
                  whileTap={{ scale: 0.97 }}
                  className="border border-or text-or px-10 py-3 text-sm tracking-[0.25em] uppercase transition-all duration-500 flex items-center gap-3"
                >
                  <span className="w-1.5 h-1.5 rotate-45 bg-current" />
                  Embarquer
                  <span className="w-1.5 h-1.5 rotate-45 bg-current" />
                </motion.button>
              </div>

              {/* Corner decorations */}
              <div className="absolute top-0 left-0 w-5 h-5 border-t-2 border-l-2 border-or/30" />
              <div className="absolute top-0 right-0 w-5 h-5 border-t-2 border-r-2 border-or/30" />
              <div className="absolute bottom-0 left-0 w-5 h-5 border-b-2 border-l-2 border-or/30" />
              <div className="absolute bottom-0 right-0 w-5 h-5 border-b-2 border-r-2 border-or/30" />
            </div>
          </form>
        </motion.div>

        {/* Map placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mt-8 aspect-[21/6] bg-noir border border-or/10 flex items-center justify-center relative overflow-hidden"
        >
          <div className="absolute inset-0 opacity-5">
            {/* Abstract map grid lines */}
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={`h-${i}`}
                className="absolute w-full h-[1px] bg-or"
                style={{ top: `${(i + 1) * 12}%` }}
              />
            ))}
            {Array.from({ length: 12 }).map((_, i) => (
              <div
                key={`v-${i}`}
                className="absolute h-full w-[1px] bg-or"
                style={{ left: `${(i + 1) * 8}%` }}
              />
            ))}
          </div>
          <div className="text-center z-10">
            <svg
              className="w-6 h-6 text-or/30 mx-auto mb-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
              />
            </svg>
            <p className="text-or/25 text-xs tracking-[0.15em]">
              38 rue de Bonald, 12000 Rodez
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
