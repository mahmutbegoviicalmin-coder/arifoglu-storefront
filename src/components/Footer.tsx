"use client";

import { Camera, Globe, Music2, Send } from "lucide-react";
import { categories } from "@/lib/data";

export default function Podnozje() {
  return (
    <footer style={{ background: "var(--color-primary)" }} className="text-white">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-16 lg:py-20">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="col-span-2 md:col-span-4 lg:col-span-1">
            <h3 className="text-2xl font-semibold mb-4" style={{ fontFamily: "var(--font-heading)" }}>
              arifoğlu
            </h3>
            <p className="text-white/60 text-sm leading-relaxed mb-6">
              Premium prirodni i organski proizvodi iz Anadolije. Povjerenje od 1964. Dostupno u Bosni i Hercegovini.
            </p>
            <div className="flex gap-3">
              {[Camera, Globe, Music2, Send].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors duration-200"
                  style={{ background: "rgba(255,255,255,0.08)" }}
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Kategorije */}
          <div>
            <p className="text-[10px] uppercase tracking-widest text-white/40 mb-4 font-semibold">Kategorije</p>
            <ul className="space-y-2.5">
              {categories.slice(0, 6).map((c) => (
                <li key={c.id}>
                  <a href={`/kolekcije/${c.slug}`} className="text-sm text-white/70 hover:text-white transition-colors">
                    {c.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Korisnički servis */}
          <div>
            <p className="text-[10px] uppercase tracking-widest text-white/40 mb-4 font-semibold">Servis</p>
            <ul className="space-y-2.5">
              {[
                { naziv: "Moj nalog", href: "#" },
                { naziv: "Praćenje narudžbe", href: "/kontakt" },
                { naziv: "Dostava", href: "/kontakt" },
                { naziv: "Povrat robe", href: "/kontakt" },
                { naziv: "Česta pitanja", href: "/kontakt" },
                { naziv: "Kontaktirajte nas", href: "/kontakt" },
              ].map((item) => (
                <li key={item.naziv}>
                  <a href={item.href} className="text-sm text-white/70 hover:text-white transition-colors">
                    {item.naziv}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* O nama */}
          <div>
            <p className="text-[10px] uppercase tracking-widest text-white/40 mb-4 font-semibold">O nama</p>
            <ul className="space-y-2.5">
              {[
                { naziv: "Naša priča", href: "/o-nama" },
                { naziv: "Održivost", href: "#" },
                { naziv: "Obećanje kvaliteta", href: "/o-nama" },
                { naziv: "Saradnje", href: "#" },
                { naziv: "Novosti", href: "/blog" },
                { naziv: "Karijere", href: "#" },
              ].map((item) => (
                <li key={item.naziv}>
                  <a href={item.href} className="text-sm text-white/70 hover:text-white transition-colors">
                    {item.naziv}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Plaćanje */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <p className="text-white/30 text-xs mb-4 text-center">Prihvatamo plaćanje</p>
          <div className="flex gap-3 justify-center flex-wrap mb-10">
            {["Visa", "Mastercard", "PayPal", "Gotovina", "Pouzećem"].map((m) => (
              <span key={m} className="text-[11px] font-medium px-3 py-1.5 rounded-lg text-white/70 border border-white/10">
                {m}
              </span>
            ))}
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/40 text-xs">© 2024 Arifoğlu Bosna. Sva prava zadržana.</p>
          <div className="flex gap-6">
            {["Politika privatnosti", "Uvjeti korištenja", "Politika kolačića"].map((item) => (
              <a key={item} href="#" className="text-white/40 hover:text-white/70 text-xs transition-colors">
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
