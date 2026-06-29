"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { recenzije } from "@/lib/data";

export default function Recenzije() {
  return (
    <section className="py-24 lg:py-32" style={{ background: "#FFFFFF" }}>
      <div className="px-6 lg:px-12 max-w-[1400px] mx-auto">
        <div className="text-center mb-16">
          <p className="text-xs uppercase tracking-[0.25em] text-[#6F6F6F] mb-3 font-medium">Iskustva kupaca</p>
          <h2
            className="text-4xl lg:text-5xl font-light text-[#1D1D1D]"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Šta kažu naši kupci
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {recenzije.map((r, i) => (
            <motion.div
              key={r.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="bg-[#F8F7F4] rounded-2xl p-6 flex flex-col gap-4"
            >
              <Quote size={24} className="text-[#D8E8B8]" />
              <p className="text-sm text-[#1D1D1D] leading-relaxed flex-1">„{r.tekst}"</p>
              <div className="flex items-center gap-0.5">
                {[...Array(r.ocjena)].map((_, j) => (
                  <Star key={j} size={12} className="fill-amber-400 text-amber-400" />
                ))}
              </div>
              <div className="flex items-center gap-3 pt-2 border-t border-[#ECECEC]">
                <img src={r.avatar} alt={r.ime} className="w-9 h-9 rounded-full object-cover" />
                <div>
                  <p className="text-sm font-semibold text-[#1D1D1D]">{r.ime}</p>
                  <p className="text-[11px] text-[#6F6F6F]">{r.lokacija}</p>
                </div>
              </div>
              <p className="text-[10px] uppercase tracking-wider text-[#183B2D] font-semibold">{r.proizvod}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
