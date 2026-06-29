"use client";

import { motion } from "framer-motion";
import { Camera } from "lucide-react";

const objave = [
  "/products/ihlamur-yaprak.jpg",
  "/products/hibiskus.jpg",
  "/products/lavanta.jpg",
  "/products/safran.jpg",
  "/products/gul-tomurcuk.jpg",
  "/products/mate-caj.jpg",
];

export default function GalerijaInstagram() {
  return (
    <section className="py-24 lg:py-32 px-6 lg:px-12 max-w-[1400px] mx-auto">
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 text-[#6F6F6F] mb-3">
          <Camera size={16} />
          <p className="text-xs uppercase tracking-[0.25em] font-medium">@arifoglu_official</p>
        </div>
        <h2
          className="text-4xl lg:text-5xl font-light text-[#1D1D1D]"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Pratite naše putovanje
        </h2>
      </div>

      <div className="grid grid-cols-3 md:grid-cols-6 gap-2 lg:gap-3">
        {objave.map((src, i) => (
          <motion.a
            key={i}
            href="#"
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06, duration: 0.4 }}
            className="group relative aspect-square rounded-xl overflow-hidden"
          >
            <img
              src={src}
              alt="Galerija"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-[#183B2D]/0 group-hover:bg-[#183B2D]/40 transition-colors duration-300 flex items-center justify-center">
              <Camera size={22} className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  );
}
