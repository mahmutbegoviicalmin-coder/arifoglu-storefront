"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { categories } from "@/lib/data";

const istaknute = categories.slice(0, 6);

export default function IstaknuteKategorije() {
  return (
    <section className="py-24 lg:py-32 px-6 lg:px-12 max-w-[1400px] mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-[#6F6F6F] mb-3 font-medium">Otkrijte</p>
          <h2
            className="text-4xl lg:text-5xl font-light text-[#1D1D1D] leading-tight"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Kupuj po kategoriji
          </h2>
        </div>
        <a
          href="/kolekcije"
          className="flex items-center gap-2 text-sm font-medium text-[#183B2D] hover:gap-3 transition-all duration-300"
        >
          Sve kategorije <ArrowRight size={15} />
        </a>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 lg:gap-5">
        {istaknute.map((kat, i) => (
          <motion.a
            key={kat.id}
            href={`/kolekcije/${kat.slug}`}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: i * 0.06, ease: "easeOut" }}
            className={`group relative rounded-2xl overflow-hidden cursor-pointer ${
              i === 0 ? "md:col-span-2 md:row-span-2" : ""
            }`}
            style={{
              aspectRatio: i === 0 ? "auto" : "4/3",
              minHeight: i === 0 ? 420 : undefined,
              willChange: "transform",
            }}
            whileHover={{ y: -3 }}
          >
            <div className="w-full h-full relative" style={{ minHeight: i === 0 ? 420 : 200 }}>
              <Image
                src={kat.image}
                alt={kat.name}
                fill
                sizes={i === 0
                  ? "(max-width: 768px) 100vw, 66vw"
                  : "(max-width: 768px) 50vw, 33vw"
                }
                className="object-cover transition-transform duration-600 group-hover:scale-105"
                style={{ willChange: "transform" }}
                quality={85}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#183B2D]/70 via-[#183B2D]/10 to-transparent transition-opacity duration-300 group-hover:opacity-90" />

              <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-7">
                <h3
                  className="text-white font-light leading-tight mb-2"
                  style={{
                    fontFamily: "var(--font-heading)",
                    fontSize: i === 0 ? "2rem" : "1.3rem",
                  }}
                >
                  {kat.name}
                </h3>
                <div className="flex items-center gap-2 text-white/70 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Istraži <ArrowRight size={12} />
                </div>
              </div>
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  );
}
