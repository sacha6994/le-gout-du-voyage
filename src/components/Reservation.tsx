"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { fadeInUp, slideInLeft, slideInRight } from "@/lib/animations";

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

  const inputClasses =
    "w-full bg-transparent border border-or/30 text-creme px-4 py-3 text-sm focus:border-or focus:outline-none transition-colors duration-300 placeholder:text-creme/30";

  return (
    <section ref={ref} id="reservation" className="py-24 md:py-32 bg-noir-light">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center mb-16"
        >
          <span className="text-or/60 text-sm tracking-[0.3em] uppercase mb-4 block">
            Votre table vous attend
          </span>
          <h2 className="font-[family-name:var(--font-cormorant)] text-or text-4xl md:text-5xl lg:text-6xl font-light">
            Réservation
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Form */}
          <motion.form
            onSubmit={handleSubmit}
            variants={slideInLeft}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="space-y-5"
          >
            <div className="grid sm:grid-cols-2 gap-5">
              <input
                type="text"
                placeholder="Nom"
                required
                value={formData.nom}
                onChange={(e) =>
                  setFormData({ ...formData, nom: e.target.value })
                }
                className={inputClasses}
              />
              <input
                type="tel"
                placeholder="Téléphone"
                required
                value={formData.telephone}
                onChange={(e) =>
                  setFormData({ ...formData, telephone: e.target.value })
                }
                className={inputClasses}
              />
            </div>
            <input
              type="email"
              placeholder="Email"
              required
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className={inputClasses}
            />
            <div className="grid sm:grid-cols-3 gap-5">
              <input
                type="date"
                required
                value={formData.date}
                onChange={(e) =>
                  setFormData({ ...formData, date: e.target.value })
                }
                className={inputClasses}
              />
              <select
                value={formData.heure}
                onChange={(e) =>
                  setFormData({ ...formData, heure: e.target.value })
                }
                className={`${inputClasses} appearance-none`}
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
              <select
                value={formData.couverts}
                onChange={(e) =>
                  setFormData({ ...formData, couverts: e.target.value })
                }
                className={`${inputClasses} appearance-none`}
              >
                {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
                  <option key={n} value={String(n)}>
                    {n} {n === 1 ? "couvert" : "couverts"}
                  </option>
                ))}
              </select>
            </div>
            <textarea
              placeholder="Message (allergies, occasion spéciale...)"
              rows={4}
              value={formData.message}
              onChange={(e) =>
                setFormData({ ...formData, message: e.target.value })
              }
              className={`${inputClasses} resize-none`}
            />
            <motion.button
              type="submit"
              whileHover={{
                scale: 1.03,
                backgroundColor: "#C9A96E",
                color: "#0C0C0C",
              }}
              whileTap={{ scale: 0.98 }}
              className="w-full border border-or text-or py-4 text-sm tracking-[0.2em] uppercase transition-all duration-500"
            >
              Réserver
            </motion.button>
            <p className="text-creme/30 text-xs text-center">
              Vous pouvez aussi réserver par téléphone au 05 65 42 75 10
            </p>
          </motion.form>

          {/* Info */}
          <motion.div
            variants={slideInRight}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="space-y-8"
          >
            {/* Address */}
            <div className="flex gap-4">
              <svg
                className="w-5 h-5 text-or flex-shrink-0 mt-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
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
              <div>
                <p className="text-creme font-medium">38 rue de Bonald</p>
                <p className="text-creme/60 text-sm">12000 Rodez, Aveyron</p>
              </div>
            </div>

            {/* Phone */}
            <div className="flex gap-4">
              <svg
                className="w-5 h-5 text-or flex-shrink-0 mt-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                />
              </svg>
              <div>
                <a
                  href="tel:0565427510"
                  className="text-creme hover:text-or transition-colors"
                >
                  05 65 42 75 10
                </a>
              </div>
            </div>

            {/* Email */}
            <div className="flex gap-4">
              <svg
                className="w-5 h-5 text-or flex-shrink-0 mt-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                />
              </svg>
              <a
                href="mailto:restaurant.le.gout.du.voyage@gmail.com"
                className="text-creme hover:text-or transition-colors text-sm break-all"
              >
                restaurant.le.gout.du.voyage@gmail.com
              </a>
            </div>

            {/* Hours */}
            <div className="flex gap-4">
              <svg
                className="w-5 h-5 text-or flex-shrink-0 mt-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between gap-8">
                  <span className="text-creme/60">Mercredi</span>
                  <span className="text-creme">12h — 14h</span>
                </div>
                <div className="flex justify-between gap-8">
                  <span className="text-creme/60">Jeudi — Samedi</span>
                  <span className="text-creme">
                    12h — 14h | 19h30 — 21h30
                  </span>
                </div>
                <div className="flex justify-between gap-8">
                  <span className="text-creme/60">Dimanche</span>
                  <span className="text-creme">12h — 14h</span>
                </div>
                <div className="flex justify-between gap-8">
                  <span className="text-creme/60">Lundi & Mardi</span>
                  <span className="text-hibiscus">Fermé</span>
                </div>
              </div>
            </div>

            {/* Social link */}
            <div className="flex gap-4">
              <svg
                className="w-5 h-5 text-or flex-shrink-0 mt-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m9.924 0a4.5 4.5 0 00-1.242-7.244l-4.5-4.5a4.5 4.5 0 00-6.364 6.364L4.86 8.88"
                />
              </svg>
              <span className="text-creme/60 text-sm">
                Retrouvez-nous sur Facebook
              </span>
            </div>

            {/* Map placeholder */}
            <div className="mt-8 aspect-[16/9] bg-noir border border-or/10 flex items-center justify-center">
              <div className="text-center">
                <svg
                  className="w-10 h-10 text-or/20 mx-auto mb-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z"
                  />
                </svg>
                <p className="text-or/30 text-xs tracking-widest uppercase">
                  Google Maps
                </p>
                <p className="text-creme/20 text-xs mt-1">
                  38 rue de Bonald, 12000 Rodez
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
