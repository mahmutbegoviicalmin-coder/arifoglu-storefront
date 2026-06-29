"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { SlidersHorizontal, ChevronDown, X } from "lucide-react";
import { proizvodi, categories } from "@/lib/data";
import Navbar from "@/components/Navbar";
import Podnozje from "@/components/Footer";
import ProizvodKartica from "@/components/ProductCard";

const opcijeSortiranja = ["Istaknuto", "Cijena: od najniže", "Cijena: od najviše", "Najbolja ocjena", "Najnovije"];

export default function ProdavnicaStrana() {
  const [sortiranje, setSortiranje] = useState("Istaknuto");
  const [aktivnaKat, setAktivnaKat] = useState("sve");
  const [prikaziFiltre, setPrikaziFiltre] = useState(false);
  const [maksCijena, setMaksCijena] = useState(60);
  const [samoOrgansko, setSamoOrgansko] = useState(false);

  let filtrirani = aktivnaKat === "sve" ? [...proizvodi] : proizvodi.filter(p => p.kategorija === aktivnaKat);
  if (samoOrgansko) filtrirani = filtrirani.filter(p => p.organsko);
  filtrirani = filtrirani.filter(p => p.cijena <= maksCijena);
  if (sortiranje === "Cijena: od najniže") filtrirani.sort((a, b) => a.cijena - b.cijena);
  if (sortiranje === "Cijena: od najviše") filtrirani.sort((a, b) => b.cijena - a.cijena);
  if (sortiranje === "Najbolja ocjena") filtrirani.sort((a, b) => b.ocjena - a.ocjena);

  return (
    <>
      <Navbar />
      <main className="pt-24 min-h-screen" style={{ background: "var(--color-bg)" }}>
        {/* Hero */}
        <div className="py-14 lg:py-20 text-center" style={{ background: "var(--color-primary)" }}>
          <p className="text-[#D8E8B8] text-xs uppercase tracking-widest mb-3 font-medium">Arifoğlu</p>
          <h1 className="text-5xl lg:text-6xl font-light text-white" style={{ fontFamily: "var(--font-heading)" }}>
            Svi proizvodi
          </h1>
          <p className="text-white/60 mt-4 text-sm max-w-md mx-auto">
            Više od 30 premium prirodnih i biljnih proizvoda iz srca Anadolije
          </p>
        </div>

        {/* Kategorija tabovi */}
        <div className="overflow-x-auto border-b border-[#ECECEC] bg-white sticky top-16 z-10">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-12 flex gap-1 py-3">
            <button
              onClick={() => setAktivnaKat("sve")}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${aktivnaKat === "sve" ? "bg-[#183B2D] text-white" : "text-[#6F6F6F] hover:text-[#1D1D1D]"}`}
            >
              Sve
            </button>
            {categories.slice(0, 8).map(k => (
              <button
                key={k.id}
                onClick={() => setAktivnaKat(k.slug)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${aktivnaKat === k.slug ? "bg-[#183B2D] text-white" : "text-[#6F6F6F] hover:text-[#1D1D1D]"}`}
              >
                {k.name}
              </button>
            ))}
          </div>
        </div>

        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-8 pb-28">
          {/* Alatna traka */}
          <div className="flex items-center justify-between mb-6 gap-4 flex-wrap">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setPrikaziFiltre(!prikaziFiltre)}
                className="flex items-center gap-2 text-sm font-medium border border-[#ECECEC] bg-white px-4 py-2.5 rounded-full hover:border-[#183B2D] transition-colors"
              >
                <SlidersHorizontal size={15} />
                Filtri
                {samoOrgansko && <span className="w-4 h-4 bg-[#183B2D] text-white text-[10px] rounded-full flex items-center justify-center">1</span>}
              </button>
              <p className="text-sm text-[#6F6F6F]">{filtrirani.length} proizvoda</p>
            </div>
            <div className="relative">
              <select
                value={sortiranje}
                onChange={e => setSortiranje(e.target.value)}
                className="appearance-none bg-white border border-[#ECECEC] text-sm font-medium px-4 py-2.5 pr-8 rounded-full outline-none cursor-pointer hover:border-[#183B2D] transition-colors"
              >
                {opcijeSortiranja.map(o => <option key={o}>{o}</option>)}
              </select>
              <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6F6F6F] pointer-events-none" />
            </div>
          </div>

          <div className="flex gap-8">
            {prikaziFiltre && (
              <motion.aside initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} className="w-60 flex-shrink-0 hidden lg:block">
                <div className="bg-white rounded-2xl p-6 space-y-6 sticky top-36 shadow-sm border border-[#ECECEC]">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-sm">Filtri</h3>
                    <button onClick={() => setPrikaziFiltre(false)}><X size={16} className="text-[#6F6F6F]" /></button>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-widest text-[#6F6F6F] mb-3 font-semibold">Certifikati</p>
                    <label className="flex items-center gap-2 text-sm cursor-pointer">
                      <input type="checkbox" checked={samoOrgansko} onChange={e => setSamoOrgansko(e.target.checked)} className="accent-[#183B2D]" />
                      Samo organsko
                    </label>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-widest text-[#6F6F6F] mb-3 font-semibold">Maksimalna cijena</p>
                    <input type="range" min={0} max={60} value={maksCijena} onChange={e => setMaksCijena(Number(e.target.value))} className="w-full accent-[#183B2D]" />
                    <p className="text-xs text-[#6F6F6F] mt-1">Do {maksCijena.toFixed(2)} KM</p>
                  </div>
                  <button onClick={() => { setSamoOrgansko(false); setMaksCijena(60); }} className="text-xs text-[#183B2D] font-medium hover:underline">Očisti filtre</button>
                </div>
              </motion.aside>
            )}

            <div className="flex-1 grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-5">
              {filtrirani.map((p, i) => (
                <motion.div key={p.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}>
                  <ProizvodKartica proizvod={p} />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Podnozje />
    </>
  );
}
