"use client";

import { motion } from "framer-motion";
import { proizvodi } from "@/lib/data";
import ProizvodKartica from "./ProductCard";
import { ArrowRight } from "lucide-react";

export default function Noviteti() {
  const novi = proizvodi.filter((p) => p.novinkat || p.oznaka === "Novo").slice(0, 4);
  const prikaz = novi.length >= 4 ? novi : proizvodi.slice(4, 8);

  return (
    <section className="py-24 lg:py-32 px-6 lg:px-12 max-w-[1400px] mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-[#6F6F6F] mb-3 font-medium">Upravo stiglo</p>
          <h2
            className="text-4xl lg:text-5xl font-light text-[#1D1D1D]"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Noviteti
          </h2>
        </div>
        <a
          href="/kolekcije"
          className="flex items-center gap-2 text-sm font-medium text-[#183B2D] hover:gap-3 transition-all duration-300"
        >
          Pogledaj sve <ArrowRight size={15} />
        </a>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
        {prikaz.map((p, i) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.5 }}
          >
            <ProizvodKartica proizvod={p} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
