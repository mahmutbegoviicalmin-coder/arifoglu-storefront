"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";

export default function Bilten() {
  const [email, setEmail] = useState("");
  const [prijavljeno, setPrijavljeno] = useState(false);

  const handlePrijava = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setPrijavljeno(true);
  };

  return (
    <section className="px-4 lg:px-12 pb-24">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-[1400px] mx-auto rounded-3xl overflow-hidden relative"
        style={{ background: "var(--color-accent)" }}
      >
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-[#183B2D] -translate-y-1/2 translate-x-1/4" />
          <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-[#183B2D] translate-y-1/2 -translate-x-1/4" />
        </div>

        <div className="relative px-8 py-16 lg:py-20 text-center max-w-2xl mx-auto">
          <p className="text-xs uppercase tracking-[0.25em] text-[#3D6B50] mb-4 font-semibold">Newsletter</p>
          <h2
            className="text-4xl lg:text-5xl font-light text-[#183B2D] mb-4 leading-tight"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Wellness savjeti &<br /><em>ekskluzivne ponude</em>
          </h2>
          <p className="text-[#3D6B50] text-sm mb-8 leading-relaxed">
            Pridružite se 40.000+ wellness entuzijasta. Dobijajte sezonske recepte, vodiče za biljke i 15% popusta na prvu narudžbu.
          </p>

          {prijavljeno ? (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="inline-flex items-center gap-3 bg-[#183B2D] text-white px-8 py-4 rounded-full"
            >
              <Check size={18} />
              <span className="font-medium">Prijavljeni ste! Provjerite inbox.</span>
            </motion.div>
          ) : (
            <form onSubmit={handlePrijava} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="vasa@email.com"
                required
                className="flex-1 px-5 py-4 rounded-full bg-white text-sm outline-none text-[#1D1D1D] placeholder:text-[#6F6F6F] shadow-sm"
              />
              <button
                type="submit"
                className="flex items-center justify-center gap-2 px-7 py-4 rounded-full text-sm font-semibold transition-all duration-200 hover:opacity-90 active:scale-95 whitespace-nowrap"
                style={{ background: "var(--color-primary)", color: "white" }}
              >
                Pretplati se <ArrowRight size={15} />
              </button>
            </form>
          )}
          <p className="text-[#6F6F6F] text-xs mt-4">Bez spama. Odjava u svakom trenutku.</p>
        </div>
      </motion.div>
    </section>
  );
}
