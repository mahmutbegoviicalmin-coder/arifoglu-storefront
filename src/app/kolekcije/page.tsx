"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { categories } from "@/lib/data";
import Navbar from "@/components/Navbar";
import Podnozje from "@/components/Footer";

export default function KolekcijeStrana() {
  return (
    <>
      <Navbar />
      <main className="pt-24 min-h-screen" style={{ background: "var(--color-bg)" }}>
        <div className="py-14 lg:py-20 text-center" style={{ background: "var(--color-primary)" }}>
          <p className="text-[#D8E8B8] text-xs uppercase tracking-widest mb-3 font-medium">Arifoğlu</p>
          <h1 className="text-5xl lg:text-6xl font-light text-white" style={{ fontFamily: "var(--font-heading)" }}>
            Kolekcije
          </h1>
          <p className="text-white/60 mt-4 text-sm max-w-md mx-auto">
            Istražite naše kategorije premium prirodnih proizvoda
          </p>
        </div>

        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-16 pb-28">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((kat, i) => (
              <motion.a
                key={kat.id}
                href={`/kolekcije/${kat.slug}`}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                whileHover={{ y: -4 }}
                className="group relative rounded-2xl overflow-hidden cursor-pointer"
                style={{ aspectRatio: "4/3" }}
              >
                <img src={kat.image} alt={kat.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#183B2D]/80 via-[#183B2D]/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h2 className="text-white text-2xl font-light mb-1" style={{ fontFamily: "var(--font-heading)" }}>{kat.name}</h2>
                  <p className="text-white/60 text-xs mb-3">{kat.opis}</p>
                  <div className="flex items-center gap-2 text-[#D8E8B8] text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Istraži <ArrowRight size={13} />
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </main>
      <Podnozje />
    </>
  );
}
