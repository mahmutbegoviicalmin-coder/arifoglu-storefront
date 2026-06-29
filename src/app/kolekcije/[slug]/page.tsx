"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
import { motion } from "framer-motion";
import { SlidersHorizontal, X, ChevronDown } from "lucide-react";
import { proizvodi, categories } from "@/lib/data";
import Navbar from "@/components/Navbar";
import Podnozje from "@/components/Footer";
import ProizvodKartica from "@/components/ProductCard";

const opcijeSortiranja = [
  "Istaknuto",
  "Cijena: od najniže",
  "Cijena: od najviše",
  "Najbolja ocjena",
  "Najnovije",
];

export default function StraniceKolekcije() {
  const { slug } = useParams();
  const kategorija = categories.find((c) => c.slug === slug);
  const [sortiranje, setSortiranje] = useState("Istaknuto");
  const [prikaziFiltre, setPrikaziFiltre] = useState(false);
  const [maksCijena, setMaksCijena] = useState(60);
  const [samoOrgansko, setSamoOrgansko] = useState(false);
  const [samoNaStanju, setSamoNaStanju] = useState(false);

  let filtrirani = proizvodi.filter((p) => !slug || slug === "svi" || p.kategorija === slug);
  if (samoOrgansko) filtrirani = filtrirani.filter((p) => p.organsko);
  if (samoNaStanju) filtrirani = filtrirani.filter((p) => p.naStanju);
  filtrirani = filtrirani.filter((p) => p.cijena <= maksCijena);

  if (sortiranje === "Cijena: od najniže") filtrirani = [...filtrirani].sort((a, b) => a.cijena - b.cijena);
  if (sortiranje === "Cijena: od najviše") filtrirani = [...filtrirani].sort((a, b) => b.cijena - a.cijena);
  if (sortiranje === "Najbolja ocjena") filtrirani = [...filtrirani].sort((a, b) => b.ocjena - a.ocjena);

  if (filtrirani.length === 0) filtrirani = proizvodi.slice(0, 12);

  const ocistiFiltre = () => {
    setSamoOrgansko(false);
    setSamoNaStanju(false);
    setMaksCijena(60);
  };

  return (
    <>
      <Navbar />
      <main className="pt-24 min-h-screen" style={{ background: "var(--color-bg)" }}>
        {/* Zaglavlje */}
        <div
          className="relative py-16 lg:py-20 mb-8 overflow-hidden"
          style={{ background: "var(--color-primary)" }}
        >
          {kategorija?.image && (
            <img src={kategorija.image} alt="" className="absolute inset-0 w-full h-full object-cover opacity-15" />
          )}
          <div className="relative max-w-[1400px] mx-auto px-6 lg:px-12 text-center text-white">
            <p className="text-[#D8E8B8] text-xs uppercase tracking-widest mb-3 font-medium">Kolekcija</p>
            <h1 className="text-5xl lg:text-6xl font-light" style={{ fontFamily: "var(--font-heading)" }}>
              {kategorija?.name || "Svi proizvodi"}
            </h1>
            {kategorija?.opis && (
              <p className="text-white/60 mt-4 text-sm max-w-md mx-auto">{kategorija.opis}</p>
            )}
          </div>
        </div>

        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 pb-28">
          {/* Alatna traka */}
          <div className="flex items-center justify-between mb-8 gap-4 flex-wrap">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setPrikaziFiltre(!prikaziFiltre)}
                className="flex items-center gap-2 text-sm font-medium text-[#1D1D1D] border border-[#ECECEC] bg-white px-4 py-2.5 rounded-full hover:border-[#183B2D] transition-colors"
              >
                <SlidersHorizontal size={15} />
                Filtri
                {(samoOrgansko || samoNaStanju) && (
                  <span className="w-5 h-5 bg-[#183B2D] text-white text-[10px] rounded-full flex items-center justify-center">
                    {Number(samoOrgansko) + Number(samoNaStanju)}
                  </span>
                )}
              </button>
              <p className="text-sm text-[#6F6F6F]">{filtrirani.length} proizvoda</p>
            </div>

            <div className="relative">
              <select
                value={sortiranje}
                onChange={(e) => setSortiranje(e.target.value)}
                className="appearance-none bg-white border border-[#ECECEC] text-sm font-medium text-[#1D1D1D] px-4 py-2.5 pr-8 rounded-full outline-none cursor-pointer hover:border-[#183B2D] transition-colors"
              >
                {opcijeSortiranja.map((o) => <option key={o}>{o}</option>)}
              </select>
              <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6F6F6F] pointer-events-none" />
            </div>
          </div>

          <div className="flex gap-8">
            {/* Bočna traka s filtrima */}
            {prikaziFiltre && (
              <motion.aside
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                className="w-64 flex-shrink-0 hidden lg:block"
              >
                <div className="bg-white rounded-2xl p-6 space-y-6 sticky top-28 shadow-sm border border-[#ECECEC]">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-[#1D1D1D] text-sm">Filtri</h3>
                    <button onClick={() => setPrikaziFiltre(false)} className="text-[#6F6F6F] hover:text-[#1D1D1D]">
                      <X size={16} />
                    </button>
                  </div>

                  <div>
                    <p className="text-xs uppercase tracking-widest text-[#6F6F6F] mb-3 font-semibold">Dostupnost</p>
                    <label className="flex items-center gap-2 text-sm text-[#1D1D1D] cursor-pointer">
                      <input type="checkbox" checked={samoNaStanju} onChange={(e) => setSamoNaStanju(e.target.checked)} className="accent-[#183B2D]" />
                      Samo na stanju
                    </label>
                  </div>

                  <div>
                    <p className="text-xs uppercase tracking-widest text-[#6F6F6F] mb-3 font-semibold">Certifikati</p>
                    <label className="flex items-center gap-2 text-sm text-[#1D1D1D] cursor-pointer">
                      <input type="checkbox" checked={samoOrgansko} onChange={(e) => setSamoOrgansko(e.target.checked)} className="accent-[#183B2D]" />
                      Samo organsko
                    </label>
                  </div>

                  <div>
                    <p className="text-xs uppercase tracking-widest text-[#6F6F6F] mb-3 font-semibold">Maksimalna cijena</p>
                    <input
                      type="range"
                      min={0}
                      max={60}
                      value={maksCijena}
                      onChange={(e) => setMaksCijena(Number(e.target.value))}
                      className="w-full accent-[#183B2D]"
                    />
                    <p className="text-xs text-[#6F6F6F] mt-1">Do {maksCijena.toFixed(2)} KM</p>
                  </div>

                  <button
                    onClick={ocistiFiltre}
                    className="text-xs text-[#183B2D] font-medium hover:underline"
                  >
                    Očisti sve filtre
                  </button>
                </div>
              </motion.aside>
            )}

            {/* Mreža proizvoda */}
            <div className="flex-1 grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-5">
              {filtrirani.map((p, i) => (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.04, duration: 0.4 }}
                >
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
