"use client";

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import GoldenThread from "@/components/GoldenThread";
import Histoire from "@/components/Histoire";
import Carte from "@/components/Carte";
import Galerie from "@/components/Galerie";
import Terrasse from "@/components/Terrasse";
import Avis from "@/components/Avis";
import Reservation from "@/components/Reservation";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="relative">
        <GoldenThread />
        <Hero />
        <Histoire />
        <Carte />
        <Galerie />
        <Terrasse />
        <Avis />
        <Reservation />
      </main>
      <Footer />
    </>
  );
}
