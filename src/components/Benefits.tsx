"use client";

import { motion } from "framer-motion";
import { Leaf, Award, Zap, ShieldCheck } from "lucide-react";
import { prednosti } from "@/lib/data";

const ikone: Record<string, React.ReactNode> = {
  Leaf: <Leaf size={26} />,
  Award: <Award size={26} />,
  Zap: <Zap size={26} />,
  ShieldCheck: <ShieldCheck size={26} />,
};

export default function Prednosti() {
  return (
    <section className="py-20 lg:py-28 px-6 lg:px-12" style={{ background: "var(--color-primary)" }}>
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {prednosti.map((p, i) => (
            <motion.div
              key={p.naslov}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="flex flex-col items-center text-center gap-4"
            >
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center"
                style={{ background: "rgba(216,232,184,0.15)", color: "var(--color-accent)" }}
              >
                {ikone[p.ikona]}
              </div>
              <div>
                <h3
                  className="text-xl font-light text-white mb-2"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {p.naslov}
                </h3>
                <p className="text-sm text-white/60 leading-relaxed">{p.opis}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
