"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";

const slajdovi = [
  {
    tag: "Ljekovite biljke",
    naslov: "Mudrost prirode,",
    naslovKurziv: "u svakoj šolji.",
    podnaslov: "Premium biljni proizvodi iz srca Anadolije, dostupni u Bosni i Hercegovini.",
    cta: "Istraži biljke",
    ctaDrugi: "Naša priča",
    href: "/kolekcije/ljekovite-biljke",
    slikaLijevo: "/hero/43.png",
    slikaDesno: "/hero/53.png",
  },
  {
    tag: "Bestseller — Biljni čajevi",
    naslov: "Lipa koja liječi,",
    naslovKurziv: "u svakoj šolji.",
    podnaslov: "Lipa (Tilia spp.) 250g — najprodavaniji biljni čaj iz Anadolije. Smiruje, zagrijava, opušta.",
    cta: "Naruči lipu",
    ctaDrugi: "Sve kolekcije",
    href: "/proizvodi/lipa-list-250g",
    slikaLijevo: "/hero/pozadina1.png",
    slikaDesno: "/hero/pozadina2.png",
  },
];

export default function Hero() {
  const [trenutni, setTrenutni] = useState(0);

  useEffect(() => {
    if (trenutni >= slajdovi.length) setTrenutni(0);
  }, [trenutni]);

  useEffect(() => {
    const timer = setInterval(() => setTrenutni((c) => (c + 1) % slajdovi.length), 6000);
    return () => clearInterval(timer);
  }, []);

  const slajd = slajdovi[trenutni];

  return (
    <section className="relative h-screen min-h-[640px] overflow-hidden">
      <div className="absolute inset-0 flex">
        <motion.div
          key={`lijevo-${trenutni}`}
          className="w-1/2 h-full relative overflow-hidden"
          initial={{ scale: 1.08 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          <img src={slajd.slikaLijevo} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-[#183B2D]/40" />
        </motion.div>
        <motion.div
          key={`desno-${trenutni}`}
          className="w-1/2 h-full relative overflow-hidden"
          initial={{ scale: 1.08 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.1 }}
        >
          <img src={slajd.slikaDesno} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-[#183B2D]/20" />
        </motion.div>
      </div>

      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center text-white px-6 max-w-3xl">
          <motion.p
            key={`tag-${trenutni}`}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-xs uppercase tracking-[0.3em] text-[#D8E8B8] mb-6 font-medium"
          >
            {slajd.tag}
          </motion.p>

          <motion.h1
            key={`h1-${trenutni}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="text-5xl sm:text-6xl lg:text-7xl font-light leading-[1.1] mb-4"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            {slajd.naslov}
            <br />
            <em className="font-normal italic">{slajd.naslovKurziv}</em>
          </motion.h1>

          <motion.p
            key={`pod-${trenutni}`}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.6 }}
            className="text-white/75 text-base md:text-lg mb-10 max-w-lg mx-auto leading-relaxed"
          >
            {slajd.podnaslov}
          </motion.p>

          <motion.div
            key={`dugmad-${trenutni}`}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <a
              href={slajd.href}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-medium transition-all duration-300 hover:gap-3 active:scale-95"
              style={{ background: "var(--color-accent)", color: "var(--color-primary)" }}
            >
              {slajd.cta} <ArrowRight size={16} />
            </a>
            <a
              href="/o-nama"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-medium border border-white/40 text-white hover:bg-white/10 transition-all duration-300 active:scale-95"
            >
              {slajd.ctaDrugi}
            </a>
          </motion.div>
        </div>
      </div>

      {/* Indikatori slajdova */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-6">
        <span className="text-white/50 text-xs">
          {String(trenutni + 1).padStart(2, "0")} / {String(slajdovi.length).padStart(2, "0")}
        </span>
        <div className="flex gap-2">
          {slajdovi.map((_, i) => (
            <button
              key={i}
              onClick={() => setTrenutni(i)}
              className="relative h-[2px] rounded-full overflow-hidden transition-all duration-300"
              style={{ width: i === trenutni ? 40 : 20, background: "rgba(255,255,255,0.3)" }}
            >
              {i === trenutni && (
                <motion.div
                  className="absolute inset-y-0 left-0 bg-white rounded-full"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 6, ease: "linear" }}
                />
              )}
            </button>
          ))}
        </div>
      </div>

      <motion.div
        animate={{ y: [0, 6, 0] }}
        transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
        className="absolute bottom-10 right-10 hidden md:flex flex-col items-center gap-1.5"
      >
        <div className="w-[1px] h-10 bg-white/30" />
        <p className="text-white/40 text-[10px] tracking-[0.2em] rotate-90 origin-center translate-x-5 mt-2">SKROLAJ</p>
      </motion.div>
    </section>
  );
}
