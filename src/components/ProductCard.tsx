"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Heart, ShoppingBag, Star } from "lucide-react";
import { useState } from "react";
import { useKorpa } from "@/lib/CartContext";

interface Proizvod {
  id: string;
  naziv: string;
  kategorija: string;
  slug: string;
  cijena: number;
  staraCijena: number | null;
  ocjena: number;
  brojRecenzija: number;
  oznaka: string | null;
  slika: string;
  organsko: boolean;
  naStanju: boolean;
}

const oznakaBoja: Record<string, { bg: string; tekst: string }> = {
  "Akcija":         { bg: "#EF4444", tekst: "white" },
  "Novo":           { bg: "#183B2D", tekst: "white" },
  "Premium":        { bg: "#1D1D1D", tekst: "white" },
  "Najprodavanije": { bg: "#D8E8B8", tekst: "#183B2D" },
  "Organsko":       { bg: "#D8E8B8", tekst: "#183B2D" },
};

export default function ProizvodKartica({ proizvod, priority = false }: { proizvod: Proizvod; priority?: boolean }) {
  const { dodaj } = useKorpa();
  const [zelja, setZelja] = useState(false);
  const [dodano, setDodano] = useState(false);

  const handleDodaj = (e: React.MouseEvent) => {
    e.preventDefault();
    dodaj({ id: proizvod.id, slug: proizvod.slug, naziv: proizvod.naziv, cijena: proizvod.cijena, slika: proizvod.slika });
    setDodano(true);
    setTimeout(() => setDodano(false), 1800);
  };

  const popust = proizvod.staraCijena
    ? Math.round(((proizvod.staraCijena - proizvod.cijena) / proizvod.staraCijena) * 100)
    : null;

  const boje = proizvod.oznaka ? oznakaBoja[proizvod.oznaka] : null;

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col"
      style={{ willChange: "transform" }}
    >
      <a href={`/proizvodi/${proizvod.slug}`} className="block relative overflow-hidden" style={{ aspectRatio: "1 / 1" }}>
        <Image
          src={proizvod.slika}
          alt={proizvod.naziv}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 260px"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          style={{ willChange: "transform" }}
          priority={priority}
          quality={85}
        />

        {/* Oznake */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {boje && proizvod.oznaka && (
            <span
              className="text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full"
              style={{ background: boje.bg, color: boje.tekst }}
            >
              {proizvod.oznaka}
            </span>
          )}
          {proizvod.organsko && !proizvod.oznaka && (
            <span className="text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#D8E8B8] text-[#183B2D]">
              Organsko
            </span>
          )}
          {popust && (
            <span className="text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full bg-red-100 text-red-600">
              -{popust}%
            </span>
          )}
        </div>

        {/* Lista želja */}
        <button
          onClick={(e) => { e.preventDefault(); setZelja(!zelja); }}
          className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm opacity-0 group-hover:opacity-100 transition-all duration-200 hover:scale-110 active:scale-95"
        >
          <Heart size={15} className={zelja ? "fill-red-500 text-red-500" : "text-[#6F6F6F]"} />
        </button>

        {/* Brzo dodaj */}
        <div className="absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <button
            onClick={handleDodaj}
            className="w-full py-3 text-sm font-medium transition-colors duration-200 flex items-center justify-center gap-2"
            style={{ background: dodano ? "#3D6B50" : "#183B2D", color: "white" }}
          >
            <ShoppingBag size={15} />
            {dodano ? "Dodano!" : "Brzo dodaj"}
          </button>
        </div>
      </a>

      <div className="p-4 flex flex-col gap-2 flex-1">
        <p className="text-[10px] uppercase tracking-wider text-[#6F6F6F] font-medium">
          {proizvod.kategorija.replace(/-/g, " ")}
        </p>
        <a href={`/proizvodi/${proizvod.slug}`}>
          <h3 className="text-sm font-medium text-[#1D1D1D] leading-snug hover:text-[#183B2D] transition-colors line-clamp-2">
            {proizvod.naziv}
          </h3>
        </a>

        <div className="flex items-center gap-1.5 mt-auto pt-1">
          <div className="flex items-center gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={11}
                className={i < Math.floor(proizvod.ocjena) ? "fill-amber-400 text-amber-400" : "text-[#ECECEC]"}
              />
            ))}
          </div>
          <span className="text-[11px] text-[#6F6F6F]">({proizvod.brojRecenzija})</span>
        </div>

        <div className="flex items-center gap-2 mt-1">
          <span className="text-base font-semibold text-[#183B2D]">{proizvod.cijena.toFixed(2)} KM</span>
          {proizvod.staraCijena && (
            <span className="text-xs text-[#6F6F6F] line-through">{proizvod.staraCijena.toFixed(2)} KM</span>
          )}
        </div>
      </div>
    </motion.div>
  );
}
