"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import { ShoppingBag, Heart, Star, ChevronDown, Check, Minus, Plus, ArrowLeft, Truck, RotateCcw, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { proizvodi } from "@/lib/data";
import Navbar from "@/components/Navbar";
import Podnozje from "@/components/Footer";
import ProizvodKartica from "@/components/ProductCard";
import { useKorpa } from "@/lib/CartContext";

export default function StraniceProizvoda() {
  const { slug } = useParams();
  const proizvod = proizvodi.find((p) => p.slug === slug) || proizvodi[0];
  const slicni = proizvodi.filter((p) => p.kategorija === proizvod.kategorija && p.id !== proizvod.id).slice(0, 4);

  const { dodaj } = useKorpa();
  const [kolicina, setKolicina] = useState(1);
  const [aktivnaSlika, setAktivnaSlika] = useState(0);
  const [zelja, setZelja] = useState(false);
  const [dodano, setDodano] = useState(false);
  const [otvorenOdjeljak, setOtvorenOdjeljak] = useState<string | null>("prednosti");

  const handleDodaj = () => {
    for (let i = 0; i < kolicina; i++) {
      dodaj({ id: proizvod.id, slug: proizvod.slug, naziv: proizvod.naziv, cijena: proizvod.cijena, slika: proizvod.slike[0], tezina: proizvod.tezina });
    }
    setDodano(true);
    setTimeout(() => setDodano(false), 2000);
  };

  const toggle = (kljuc: string) => setOtvorenOdjeljak(otvorenOdjeljak === kljuc ? null : kljuc);

  return (
    <>
      <Navbar />
      <main className="pt-24 min-h-screen" style={{ background: "var(--color-bg)" }}>
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-10">

          {/* Breadcrumb */}
          <a
            href="/"
            className="inline-flex items-center gap-2 text-sm text-[#6F6F6F] hover:text-[#183B2D] transition-colors mb-10"
          >
            <ArrowLeft size={15} /> Nazad u prodavnicu
          </a>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">

            {/* Galerija */}
            <div className="flex flex-col gap-4">
              <motion.div
                className="rounded-3xl overflow-hidden bg-white shadow-sm relative"
                style={{ aspectRatio: "1 / 1" }}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <Image
                  src={proizvod.slike[aktivnaSlika]}
                  alt={proizvod.naziv}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-contain p-8"
                  priority
                  quality={90}
                />
              </motion.div>
              {proizvod.slike.length > 1 && (
                <div className="flex gap-3">
                  {proizvod.slike.map((slika, i) => (
                    <button
                      key={i}
                      onClick={() => setAktivnaSlika(i)}
                      className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all bg-white relative ${
                        aktivnaSlika === i ? "border-[#183B2D] shadow-sm" : "border-transparent"
                      }`}
                    >
                      <Image src={slika} alt="" fill sizes="80px" className="object-contain p-2" quality={70} />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Informacije */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex flex-col gap-5 lg:sticky lg:top-28 lg:self-start"
            >
              {/* Kategorija i oznaka */}
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase tracking-widest text-[#6F6F6F] font-medium">
                  {proizvod.kategorija.replace(/-/g, " ")}
                </span>
                {proizvod.oznaka && (
                  <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full"
                    style={{
                      background: proizvod.oznaka === "Akcija" ? "#EF4444" : proizvod.oznaka === "Najprodavanije" ? "#D8E8B8" : "#183B2D",
                      color: proizvod.oznaka === "Najprodavanije" ? "#183B2D" : "white"
                    }}>
                    {proizvod.oznaka}
                  </span>
                )}
              </div>

              {/* Naziv */}
              <h1
                className="text-4xl lg:text-5xl font-light text-[#1D1D1D] leading-tight"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                {proizvod.naziv}
              </h1>

              {/* Ocjena */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} className={i < Math.floor(proizvod.ocjena) ? "fill-amber-400 text-amber-400" : "text-[#ECECEC]"} />
                  ))}
                </div>
                <span className="text-sm text-[#6F6F6F]">{proizvod.ocjena} · {proizvod.brojRecenzija} recenzija</span>
              </div>

              {/* Cijena */}
              <div className="flex items-end gap-3 py-1">
                <span className="text-4xl font-semibold text-[#183B2D]">{proizvod.cijena.toFixed(2)} KM</span>
                {proizvod.staraCijena && (
                  <span className="text-xl text-[#6F6F6F] line-through mb-0.5">{proizvod.staraCijena.toFixed(2)} KM</span>
                )}
                <span className="text-sm text-[#6F6F6F] mb-0.5">/ {proizvod.tezina}</span>
              </div>

              {/* Opis */}
              <p className="text-sm text-[#6F6F6F] leading-relaxed border-t border-[#ECECEC] pt-4">
                {proizvod.opis}
              </p>

              {/* Količina i dodaj */}
              <div className="flex gap-3 pt-1">
                <div className="flex items-center border border-[#ECECEC] rounded-full bg-white">
                  <button
                    onClick={() => setKolicina(Math.max(1, kolicina - 1))}
                    className="w-11 h-11 flex items-center justify-center text-[#1D1D1D] hover:text-[#183B2D] transition-colors"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="w-10 text-center text-sm font-semibold">{kolicina}</span>
                  <button
                    onClick={() => setKolicina(kolicina + 1)}
                    className="w-11 h-11 flex items-center justify-center text-[#1D1D1D] hover:text-[#183B2D] transition-colors"
                  >
                    <Plus size={16} />
                  </button>
                </div>

                <motion.button
                  onClick={handleDodaj}
                  whileTap={{ scale: 0.97 }}
                  className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-full text-sm font-semibold transition-colors duration-300"
                  style={{ background: dodano ? "#3D6B50" : "#183B2D", color: "white" }}
                >
                  {dodano ? <><Check size={16} /> Dodano u korpu</> : <><ShoppingBag size={16} /> Dodaj u korpu</>}
                </motion.button>

                <button
                  onClick={() => setZelja(!zelja)}
                  className="w-12 h-12 rounded-full border border-[#ECECEC] bg-white flex items-center justify-center hover:border-[#183B2D] transition-colors"
                >
                  <Heart size={17} className={zelja ? "fill-red-500 text-red-500" : "text-[#6F6F6F]"} />
                </button>
              </div>

              {/* Pretplata */}
              <div className="bg-[#D8E8B8]/40 rounded-2xl p-4 border border-[#D8E8B8]">
                <p className="text-sm font-semibold text-[#183B2D] mb-1">Pretplati se i uštedi 15%</p>
                <p className="text-xs text-[#6F6F6F]">Fleksibilna isporuka · Otkaz u svakom trenutku · Nikad ne ostajte bez</p>
              </div>

              {/* Prednosti dostave */}
              <div className="grid grid-cols-3 gap-3">
                {[
                  { ikona: Truck, tekst: "Dostava 3-5 dana" },
                  { ikona: RotateCcw, tekst: "30 dana povrat" },
                  { ikona: ShieldCheck, tekst: "Lab. testirano" },
                ].map(({ ikona: Ikona, tekst }) => (
                  <div key={tekst} className="flex flex-col items-center gap-1.5 text-center bg-white rounded-xl p-3 border border-[#ECECEC]">
                    <Ikona size={18} className="text-[#183B2D]" />
                    <span className="text-[10px] text-[#6F6F6F] font-medium">{tekst}</span>
                  </div>
                ))}
              </div>

              {/* Akordion */}
              <div className="space-y-1 border-t border-[#ECECEC] pt-4">
                {[
                  { kljuc: "prednosti", naziv: "Prednosti", sadrzaj: proizvod.prednosti.join(" · ") },
                  { kljuc: "sastojci", naziv: "Sastojci", sadrzaj: proizvod.sastojci },
                  { kljuc: "upotreba", naziv: "Kako koristiti", sadrzaj: proizvod.upotreba },
                ].map((odjeljak) => (
                  <div key={odjeljak.kljuc} className="border-b border-[#ECECEC]">
                    <button
                      onClick={() => toggle(odjeljak.kljuc)}
                      className="flex items-center justify-between w-full py-3.5 text-sm font-medium text-[#1D1D1D] hover:text-[#183B2D] transition-colors"
                    >
                      {odjeljak.naziv}
                      <ChevronDown
                        size={16}
                        className={`transition-transform duration-200 ${otvorenOdjeljak === odjeljak.kljuc ? "rotate-180" : ""}`}
                      />
                    </button>
                    {otvorenOdjeljak === odjeljak.kljuc && (
                      <motion.p
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-sm text-[#6F6F6F] pb-4 leading-relaxed"
                      >
                        {odjeljak.sadrzaj}
                      </motion.p>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Slični proizvodi */}
          {slicni.length > 0 && (
            <div className="mt-24 lg:mt-32">
              <h2
                className="text-3xl lg:text-4xl font-light mb-10 text-[#1D1D1D]"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Možda vam se sviđa
              </h2>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
                {slicni.map((p) => <ProizvodKartica key={p.id} proizvod={p} />)}
              </div>
            </div>
          )}
        </div>
      </main>
      <Podnozje />
    </>
  );
}
