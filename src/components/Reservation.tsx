"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { fadeInUp, staggerContainer, staggerItem } from "@/lib/animations";
import { useDayNight } from "@/context/DayNightContext";

function PassportStamp({ isDay }: { isDay: boolean }) {
  const c = isDay ? "#8B7355" : "#C9A96E";
  return (
    <svg viewBox="0 0 200 200" className="w-28 h-28 md:w-36 md:h-36 opacity-[0.07]">
      <defs>
        <path id="stampCircle" d="M 100,100 m -72,0 a 72,72 0 1,1 144,0 a 72,72 0 1,1 -144,0" />
      </defs>
      <circle cx="100" cy="100" r="80" stroke={c} strokeWidth="2" fill="none" />
      <circle cx="100" cy="100" r="72" stroke={c} strokeWidth="1" fill="none" />
      <text fill={c} fontSize="11" fontFamily="serif" letterSpacing="3">
        <textPath href="#stampCircle">LE GOÛT DU VOYAGE • RODEZ • AVEYRON • FRANCE •</textPath>
      </text>
      <text x="100" y="96" textAnchor="middle" fill={c} fontSize="20" fontFamily="serif">GDV</text>
      <text x="100" y="116" textAnchor="middle" fill={c} fontSize="10" fontFamily="serif" letterSpacing="2">EST. 2023</text>
    </svg>
  );
}

function CompassRose({ isDay }: { isDay: boolean }) {
  return (
    <motion.svg
      viewBox="0 0 100 100"
      className="w-14 h-14"
      style={{ color: isDay ? "rgba(139,115,85,0.15)" : "rgba(201,169,110,0.15)" }}
      animate={{ rotate: 360 }}
      transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
    >
      <g fill="currentColor" stroke="currentColor" strokeWidth="0.5">
        <polygon points="50,10 47,40 53,40" />
        <polygon points="50,90 47,60 53,60" opacity="0.5" />
        <polygon points="90,50 60,47 60,53" opacity="0.5" />
        <polygon points="10,50 40,47 40,53" opacity="0.5" />
        <polygon points="78,22 56,44 60,48" opacity="0.3" />
        <polygon points="22,22 44,44 40,48" opacity="0.3" />
        <polygon points="78,78 56,56 60,52" opacity="0.3" />
        <polygon points="22,78 44,56 40,52" opacity="0.3" />
        <circle cx="50" cy="50" r="3" fill="none" strokeWidth="1" />
      </g>
    </motion.svg>
  );
}

export default function Reservation() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { isDay } = useDayNight();
  const [formData, setFormData] = useState({
    nom: "", telephone: "", email: "", date: "", heure: "19h30", couverts: "2", message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Réservation - ${formData.nom} - ${formData.date} ${formData.heure}`);
    const body = encodeURIComponent(`Nom : ${formData.nom}\nTéléphone : ${formData.telephone}\nEmail : ${formData.email}\nDate : ${formData.date}\nHeure : ${formData.heure}\nNombre de couverts : ${formData.couverts}\n\nMessage : ${formData.message}`);
    window.location.href = `mailto:restaurant.le.gout.du.voyage@gmail.com?subject=${subject}&body=${body}`;
  };

  const update = (field: string, value: string) => setFormData((p) => ({ ...p, [field]: value }));

  // Theme-dependent colors
  const labelColor = isDay ? "rgba(139,105,20,0.6)" : "rgba(201,169,110,0.5)";
  const inputBorder = isDay ? "rgba(201,169,110,0.25)" : "rgba(201,169,110,0.2)";
  const inputText = isDay ? "#2C2418" : "#F5F0E8";
  const mutedText = isDay ? "rgba(61,43,31,0.45)" : "rgba(245,240,232,0.4)";
  const bodyText = isDay ? "rgba(44,36,24,0.7)" : "rgba(245,240,232,0.7)";
  const accentColor = isDay ? "#8B6914" : "#C9A96E";
  const sectionBg = isDay ? "#F5F0E8" : "#111111";
  const cardBg = isDay ? "rgba(255,255,255,0.85)" : "rgba(12,12,12,0.8)";

  const labelCls = "text-[10px] tracking-[0.25em] uppercase mb-2 block transition-colors duration-1000";
  const inputCls = "w-full bg-transparent border-b pb-2 focus:outline-none transition-colors duration-500 font-[family-name:var(--font-cormorant)]";

  return (
    <section
      ref={ref}
      id="reservation"
      className="py-24 md:py-32 transition-colors duration-[1200ms]"
      style={{ backgroundColor: sectionBg }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div variants={fadeInUp} initial="hidden" animate={isInView ? "visible" : "hidden"} className="text-center mb-16">
          <span className="text-sm tracking-[0.3em] uppercase mb-4 block transition-colors duration-1000" style={{ color: isDay ? "rgba(139,115,85,0.6)" : "rgba(201,169,110,0.6)" }}>
            Votre prochaine escale
          </span>
          <h2 className="font-[family-name:var(--font-cormorant)] text-4xl md:text-5xl lg:text-6xl font-light transition-colors duration-1000" style={{ color: isDay ? "#3D2B1F" : "#C9A96E" }}>
            Réservation
          </h2>
        </motion.div>

        <motion.div variants={fadeInUp} initial="hidden" animate={isInView ? "visible" : "hidden"}>
          <form onSubmit={handleSubmit}>
            <div className="relative backdrop-blur-sm transition-all duration-1000" style={{ border: `1px solid ${inputBorder}`, backgroundColor: cardBg }}>
              {/* Top bar */}
              <div className="border-b px-6 md:px-10 py-4 flex items-center justify-between transition-colors duration-1000" style={{ borderColor: inputBorder }}>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rotate-45 transition-colors duration-1000" style={{ backgroundColor: accentColor }} />
                  <span className="font-[family-name:var(--font-cormorant)] text-lg md:text-xl tracking-[0.15em] uppercase transition-colors duration-1000" style={{ color: accentColor }}>
                    Billet de Voyage
                  </span>
                </div>
                <span className="text-xs tracking-[0.2em] font-mono hidden sm:block transition-colors duration-1000" style={{ color: `${accentColor}40` }}>
                  N° GDV—{new Date().getFullYear()}
                </span>
              </div>

              <div className="flex flex-col lg:flex-row">
                {/* Form */}
                <div className="flex-1 p-6 md:p-10 relative">
                  <div className="absolute top-6 right-6 hidden md:block"><PassportStamp isDay={isDay} /></div>

                  <motion.div variants={staggerContainer} initial="hidden" animate={isInView ? "visible" : "hidden"} className="space-y-6">
                    <motion.div variants={staggerItem}>
                      <label className={labelCls} style={{ color: labelColor }}>Voyageur</label>
                      <input type="text" required value={formData.nom} onChange={(e) => update("nom", e.target.value)} placeholder="Votre nom"
                        className={`${inputCls} text-lg`} style={{ borderColor: inputBorder, color: inputText }} />
                    </motion.div>

                    <motion.div variants={staggerItem} className="grid sm:grid-cols-2 gap-6">
                      <div>
                        <label className={labelCls} style={{ color: labelColor }}>Téléphone</label>
                        <input type="tel" required value={formData.telephone} onChange={(e) => update("telephone", e.target.value)} placeholder="06 00 00 00 00"
                          className={`${inputCls} text-lg`} style={{ borderColor: inputBorder, color: inputText }} />
                      </div>
                      <div>
                        <label className={labelCls} style={{ color: labelColor }}>Email</label>
                        <input type="email" required value={formData.email} onChange={(e) => update("email", e.target.value)} placeholder="email@exemple.com"
                          className={`${inputCls} text-lg`} style={{ borderColor: inputBorder, color: inputText }} />
                      </div>
                    </motion.div>

                    <motion.div variants={staggerItem} className="grid grid-cols-3 gap-4 sm:gap-6">
                      <div>
                        <label className={labelCls} style={{ color: labelColor }}>Date</label>
                        <input type="date" required value={formData.date} onChange={(e) => update("date", e.target.value)}
                          className={`${inputCls} text-base`} style={{ borderColor: inputBorder, color: inputText }} />
                      </div>
                      <div>
                        <label className={labelCls} style={{ color: labelColor }}>Heure de départ</label>
                        <select value={formData.heure} onChange={(e) => update("heure", e.target.value)}
                          className={`${inputCls} text-base appearance-none`} style={{ borderColor: inputBorder, color: inputText }}>
                          <option value="12h00">12h00</option><option value="12h15">12h15</option><option value="12h30">12h30</option>
                          <option value="12h45">12h45</option><option value="13h00">13h00</option><option value="19h30">19h30</option>
                          <option value="19h45">19h45</option><option value="20h00">20h00</option><option value="20h15">20h15</option>
                          <option value="20h30">20h30</option>
                        </select>
                      </div>
                      <div>
                        <label className={labelCls} style={{ color: labelColor }}>Voyageurs</label>
                        <select value={formData.couverts} onChange={(e) => update("couverts", e.target.value)}
                          className={`${inputCls} text-base appearance-none`} style={{ borderColor: inputBorder, color: inputText }}>
                          {Array.from({ length: 10 }, (_, i) => <option key={i + 1} value={String(i + 1)}>{i + 1}</option>)}
                        </select>
                      </div>
                    </motion.div>

                    <motion.div variants={staggerItem}>
                      <label className={labelCls} style={{ color: labelColor }}>Notes de voyage</label>
                      <textarea rows={2} value={formData.message} onChange={(e) => update("message", e.target.value)}
                        placeholder="Allergies, occasion spéciale, demandes particulières..."
                        className={`${inputCls} text-base resize-none`} style={{ borderColor: inputBorder, color: inputText }} />
                    </motion.div>
                  </motion.div>
                </div>

                {/* Perforation */}
                <div className="hidden lg:flex flex-col items-center relative">
                  <div className="w-6 h-3 rounded-b-full -mt-[1px] border-x border-b transition-colors duration-1000" style={{ backgroundColor: sectionBg, borderColor: inputBorder }} />
                  <div className="flex-1 border-l border-dashed transition-colors duration-1000" style={{ borderColor: inputBorder }} />
                  <div className="w-6 h-3 rounded-t-full -mb-[1px] border-x border-t transition-colors duration-1000" style={{ backgroundColor: sectionBg, borderColor: inputBorder }} />
                </div>
                <div className="lg:hidden flex items-center mx-6">
                  <div className="flex-1 border-t border-dashed transition-colors duration-1000" style={{ borderColor: inputBorder }} />
                </div>

                {/* Stub */}
                <div className="lg:w-[320px] p-6 md:p-10 flex flex-col justify-between relative">
                  <div className="absolute top-4 right-4"><CompassRose isDay={isDay} /></div>

                  <div className="space-y-6">
                    <div>
                      <span className={labelCls} style={{ color: labelColor }}>Destination</span>
                      <p className="font-[family-name:var(--font-cormorant)] text-xl transition-colors duration-1000" style={{ color: inputText }}>Le Goût du Voyage</p>
                      <p className="text-sm mt-1 transition-colors duration-1000" style={{ color: mutedText }}>38 rue de Bonald, 12000 Rodez</p>
                    </div>

                    <div>
                      <span className={labelCls} style={{ color: labelColor }}>Horaires d&apos;embarquement</span>
                      <div className="space-y-1.5 text-sm">
                        {[
                          ["Mercredi", "12h — 14h"],
                          ["Jeu — Sam", "12h–14h | 19h30–21h30"],
                          ["Dimanche", "12h — 14h"],
                        ].map(([day, hours]) => (
                          <div key={day} className="flex justify-between">
                            <span className="transition-colors duration-1000" style={{ color: mutedText }}>{day}</span>
                            <span className="transition-colors duration-1000" style={{ color: bodyText }}>{hours}</span>
                          </div>
                        ))}
                        <div className="flex justify-between">
                          <span className="transition-colors duration-1000" style={{ color: mutedText }}>Lun & Mar</span>
                          <span className="text-hibiscus/80">Fermé</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <svg className="w-3.5 h-3.5 flex-shrink-0" style={{ color: `${accentColor}66` }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                        </svg>
                        <a href="tel:0565427510" className="text-sm hover:text-or transition-colors" style={{ color: bodyText }}>05 65 42 75 10</a>
                      </div>
                      <div className="flex items-center gap-2">
                        <svg className="w-3.5 h-3.5 flex-shrink-0" style={{ color: `${accentColor}66` }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                        </svg>
                        <span className="text-xs break-all transition-colors duration-1000" style={{ color: mutedText }}>restaurant.le.gout.du.voyage@gmail.com</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <svg className="w-3.5 h-3.5" style={{ color: `${accentColor}66` }} fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                      </svg>
                      <span className="text-xs transition-colors duration-1000" style={{ color: mutedText }}>Retrouvez-nous sur Facebook</span>
                    </div>
                  </div>

                  <div className="mt-6 flex items-end gap-[2px] h-8 opacity-10">
                    {Array.from({ length: 30 }).map((_, i) => (
                      <div key={i} style={{ backgroundColor: accentColor, height: `${40 + Math.sin(i * 0.8) * 30 + Math.random() * 30}%` }} className="flex-1" />
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom bar */}
              <div className="border-t px-6 md:px-10 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 transition-colors duration-1000" style={{ borderColor: inputBorder }}>
                <p className="text-xs text-center sm:text-left transition-colors duration-1000" style={{ color: mutedText }}>
                  Réservation par téléphone au{" "}
                  <a href="tel:0565427510" className="hover:text-or transition-colors" style={{ color: `${accentColor}66` }}>05 65 42 75 10</a>
                </p>
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.03, backgroundColor: "#C9A96E", color: "#0C0C0C" }}
                  whileTap={{ scale: 0.97 }}
                  className="border px-10 py-3 text-sm tracking-[0.25em] uppercase transition-all duration-500 flex items-center gap-3"
                  style={{ borderColor: accentColor, color: accentColor }}
                >
                  <span className="w-1.5 h-1.5 rotate-45 bg-current" />
                  Embarquer
                  <span className="w-1.5 h-1.5 rotate-45 bg-current" />
                </motion.button>
              </div>

              {/* Corners */}
              <div className="absolute top-0 left-0 w-5 h-5 border-t-2 border-l-2 transition-colors duration-1000" style={{ borderColor: `${accentColor}50` }} />
              <div className="absolute top-0 right-0 w-5 h-5 border-t-2 border-r-2 transition-colors duration-1000" style={{ borderColor: `${accentColor}50` }} />
              <div className="absolute bottom-0 left-0 w-5 h-5 border-b-2 border-l-2 transition-colors duration-1000" style={{ borderColor: `${accentColor}50` }} />
              <div className="absolute bottom-0 right-0 w-5 h-5 border-b-2 border-r-2 transition-colors duration-1000" style={{ borderColor: `${accentColor}50` }} />
            </div>
          </form>
        </motion.div>

        {/* Map placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mt-8 aspect-[21/6] flex items-center justify-center relative overflow-hidden transition-colors duration-1000"
          style={{ backgroundColor: isDay ? "#EEEBE4" : "#0C0C0C", border: `1px solid ${inputBorder}` }}
        >
          <div className="absolute inset-0 opacity-5">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={`h-${i}`} className="absolute w-full h-[1px]" style={{ top: `${(i + 1) * 12}%`, backgroundColor: accentColor }} />
            ))}
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={`v-${i}`} className="absolute h-full w-[1px]" style={{ left: `${(i + 1) * 8}%`, backgroundColor: accentColor }} />
            ))}
          </div>
          <div className="text-center z-10">
            <svg className="w-6 h-6 mx-auto mb-1" style={{ color: `${accentColor}50` }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
            </svg>
            <p className="text-xs tracking-[0.15em] transition-colors duration-1000" style={{ color: `${accentColor}40` }}>38 rue de Bonald, 12000 Rodez</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
