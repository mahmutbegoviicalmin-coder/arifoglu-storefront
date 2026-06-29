"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useRef } from "react";

export default function IstaknutiBaner() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <section ref={ref} className="relative overflow-hidden h-[70vh] min-h-[480px] my-12 mx-4 lg:mx-12 rounded-3xl">
      <motion.div className="absolute inset-0" style={{ y }}>
        <Image
          src="https://images.unsplash.com/photo-1556909211-36987daf7b4d?w=1600&q=85"
          alt="Priroda i wellness"
          fill
          sizes="100vw"
          className="object-cover"
          quality={85}
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-r from-[#183B2D]/80 via-[#183B2D]/50 to-transparent" />

      <div className="absolute inset-0 flex items-center">
        <div className="px-10 lg:px-20 max-w-2xl">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[#D8E8B8] text-xs uppercase tracking-[0.3em] mb-5 font-medium"
          >
            Naša filozofija
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-5xl lg:text-6xl font-light text-white leading-tight mb-6"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Naučno potvrđene
            <br />
            <em>formulacije.</em>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-white/70 text-base mb-8 leading-relaxed max-w-md"
          >
            Svaki proizvod razvijen je uz stručnost biljnih ljekara i potvrđen modernim laboratorijskim analizama. Bez kompromisa u pogledu čistoće.
          </motion.p>
          <motion.a
            href="/o-nama"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="inline-flex items-center gap-3 text-sm font-medium text-white border border-white/40 px-8 py-4 rounded-full hover:bg-white/10 transition-colors duration-300"
          >
            Upoznajte nas <ArrowRight size={15} />
          </motion.a>
        </div>
      </div>
    </section>
  );
}
