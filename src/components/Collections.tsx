"use client";

import { motion } from "framer-motion";
import { categories } from "@/lib/data";

const istaknute = [
  { slug: "organski",        naziv: "Organsko",         boja: "#E8F5E9" },
  { slug: "bitki-cajevi",    naziv: "Biljni čajevi",    boja: "#FFF8E1" },
  { slug: "dodaci-prehrani", naziv: "Dodaci prehrani",  boja: "#EDE7F6" },
  { slug: "zacini",          naziv: "Začini",           boja: "#FBE9E7" },
  { slug: "med-pcela",       naziv: "Med i pčela",      boja: "#FFF3E0" },
  { slug: "ulja-arome",      naziv: "Ulja i arome",     boja: "#E3F2FD" },
  { slug: "kozmetika",       naziv: "Kozmetika",        boja: "#FCE4EC" },
];

export default function Kolekcije() {
  return (
    <section className="py-24 lg:py-32" style={{ background: "#FFFFFF" }}>
      <div className="px-6 lg:px-12 max-w-[1400px] mx-auto">
        <div className="text-center mb-16">
          <p className="text-xs uppercase tracking-[0.25em] text-[#6F6F6F] mb-3 font-medium">Kolekcije</p>
          <h2 className="text-4xl lg:text-5xl font-light text-[#1D1D1D]" style={{ fontFamily: "var(--font-heading)" }}>
            Kupuj po kolekciji
          </h2>
        </div>

        <div className="flex gap-4 overflow-x-auto pb-4 snap-x justify-center flex-wrap md:flex-nowrap" style={{ scrollbarWidth: "none" }}>
          {istaknute.map((kol, i) => {
            const podaci = categories.find((c) => c.slug === kol.slug);
            return (
              <motion.a
                key={kol.slug}
                href={`/kolekcije/${kol.slug}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07, duration: 0.5 }}
                whileHover={{ y: -5 }}
                className="group flex-shrink-0 snap-start flex flex-col items-center gap-3 cursor-pointer"
                style={{ width: 130 }}
              >
                <div
                  className="w-24 h-24 rounded-2xl overflow-hidden relative transition-shadow duration-300 group-hover:shadow-lg"
                  style={{ background: kol.boja }}
                >
                  {podaci?.image && (
                    <img
                      src={podaci.image}
                      alt={kol.naziv}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  )}
                </div>
                <span className="text-sm font-medium text-[#1D1D1D] text-center group-hover:text-[#183B2D] transition-colors leading-tight">
                  {kol.naziv}
                </span>
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
