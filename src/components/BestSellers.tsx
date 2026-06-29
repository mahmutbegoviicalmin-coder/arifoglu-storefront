"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { proizvodi } from "@/lib/data";
import ProizvodKartica from "./ProductCard";

const tabovi = ["Najprodavanije", "Noviteti", "Akcija"];

export default function NajprodavanijiProizvodi() {
  const [aktivniTab, setAktivniTab] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const filtrirani = proizvodi.filter((p) => {
    if (aktivniTab === 0) return p.oznaka === "Najprodavanije" || p.oznaka === "Premium";
    if (aktivniTab === 1) return p.novinkat || p.oznaka === "Novo";
    if (aktivniTab === 2) return p.staraCijena !== null || p.oznaka === "Akcija";
    return true;
  });

  const prikaz = filtrirani.length > 0 ? filtrirani : proizvodi.slice(0, 8);

  const skrolaj = (smjer: "lijevo" | "desno") => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: smjer === "lijevo" ? -320 : 320, behavior: "smooth" });
  };

  return (
    <section className="py-24 lg:py-32" style={{ background: "var(--color-bg)" }}>
      <div className="px-6 lg:px-12 max-w-[1400px] mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-[#6F6F6F] mb-3 font-medium">Selekcija</p>
            <h2
              className="text-4xl lg:text-5xl font-light text-[#1D1D1D]"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Pronađi svoj proizvod
            </h2>
            <a
              href="/prodavnica"
              className="inline-flex items-center gap-2 text-sm font-medium text-[#183B2D] hover:gap-3 transition-all duration-300 mt-3"
            >
              Pogledaj sve <ArrowRight size={15} />
            </a>
          </div>
          <div className="flex bg-white rounded-full p-1 gap-1 shadow-sm border border-[#ECECEC]">
            {tabovi.map((tab, i) => (
              <button
                key={tab}
                onClick={() => setAktivniTab(i)}
                className="relative px-5 py-2 rounded-full text-sm font-medium transition-colors duration-200"
                style={{ color: aktivniTab === i ? "white" : "var(--color-muted)" }}
              >
                {aktivniTab === i && (
                  <motion.div
                    layoutId="tab-pill"
                    className="absolute inset-0 rounded-full"
                    style={{ background: "var(--color-primary)" }}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{tab}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="relative px-6 lg:px-12 max-w-[1400px] mx-auto">
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {prikaz.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.5 }}
              className="flex-shrink-0 snap-start"
              style={{ width: "clamp(220px, 260px, 280px)" }}
            >
              <ProizvodKartica proizvod={p} priority={i < 4} />
            </motion.div>
          ))}
        </div>

        <button
          onClick={() => skrolaj("lijevo")}
          className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-md items-center justify-center hover:bg-[#183B2D] hover:text-white transition-colors duration-200 text-[#1D1D1D] hidden md:flex"
        >
          <ChevronLeft size={18} />
        </button>
        <button
          onClick={() => skrolaj("desno")}
          className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-md items-center justify-center hover:bg-[#183B2D] hover:text-white transition-colors duration-200 text-[#1D1D1D] hidden md:flex"
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </section>
  );
}
