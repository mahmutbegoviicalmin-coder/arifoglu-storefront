"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Heart, ShoppingBag, Menu, X, ChevronDown } from "lucide-react";
import { categories } from "@/lib/data";
import { useKorpa } from "@/lib/CartContext";

const navLinkovi = [
  { naziv: "Prodavnica", href: "/prodavnica", megaMenu: true },
  { naziv: "Kolekcije", href: "/kolekcije" },
  { naziv: "O nama", href: "/o-nama" },
  { naziv: "Recepti", href: "/recepti" },
  { naziv: "Blog", href: "/blog" },
  { naziv: "Kontakt", href: "/kontakt" },
];

const stubci = [
  { naslov: "Čajevi i biljke", kategorije: [0, 1, 2] },
  { naslov: "Zdravlje i ljepota", kategorije: [4, 6, 7, 8] },
  { naslov: "Hrana i priroda", kategorije: [3, 5] },
];

export default function Navbar() {
  const { brojStavki, setKorpaOtvorena } = useKorpa();
  const [skrolovan, setSkrolovan] = useState(false);
  const [mobilniOtvoren, setMobilniOtvoren] = useState(false);
  const [megaOtvoren, setMegaOtvoren] = useState(false);
  const [pretragaOtvorena, setPretragaOtvorena] = useState(false);
  const [upitPretrage, setUpitPretrage] = useState("");

  useEffect(() => {
    const naSkrolu = () => setSkrolovan(window.scrollY > 40);
    window.addEventListener("scroll", naSkrolu);
    return () => window.removeEventListener("scroll", naSkrolu);
  }, []);

  const filtrirane = upitPretrage.length > 1
    ? categories.filter(c => c.name.toLowerCase().includes(upitPretrage.toLowerCase())).slice(0, 5)
    : [];

  return (
    <>
      <motion.nav
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          skrolovan
            ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-[#ECECEC]"
            : "bg-[#183B2D]/15 backdrop-blur-sm"
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <a href="/" className="flex-shrink-0 z-10">
              <span
                className="text-2xl font-semibold tracking-wide transition-colors duration-300"
                style={{
                  fontFamily: "var(--font-heading)",
                  color: skrolovan ? "var(--color-primary)" : "white",
                }}
              >
                arifoğlu
              </span>
            </a>

            {/* Desktop navigacija */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinkovi.map((link) => (
                <div
                  key={link.naziv}
                  className="relative"
                  onMouseEnter={() => link.megaMenu && setMegaOtvoren(true)}
                  onMouseLeave={() => link.megaMenu && setMegaOtvoren(false)}
                >
                  <a
                    href={link.href}
                    className={`flex items-center gap-1 text-sm font-medium transition-colors duration-300 py-2 ${
                      skrolovan ? "text-[#1D1D1D] hover:text-[#183B2D]" : "text-white/90 hover:text-white"
                    }`}
                  >
                    {link.naziv}
                    {link.megaMenu && (
                      <ChevronDown size={14} className={`transition-transform ${megaOtvoren ? "rotate-180" : ""}`} />
                    )}
                  </a>
                </div>
              ))}
            </div>

            {/* Ikone */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setPretragaOtvorena(!pretragaOtvorena)}
                className={`p-2 rounded-full transition-colors duration-300 ${
                  skrolovan ? "text-[#1D1D1D] hover:bg-[#F8F7F4]" : "text-white hover:bg-white/10"
                }`}
              >
                <Search size={19} />
              </button>
              <button
                className={`p-2 rounded-full transition-colors duration-300 hidden md:flex relative ${
                  skrolovan ? "text-[#1D1D1D] hover:bg-[#F8F7F4]" : "text-white hover:bg-white/10"
                }`}
              >
                <Heart size={19} />
              </button>
              <button
                onClick={() => setKorpaOtvorena(true)}
                className={`p-2 rounded-full transition-colors duration-300 relative ${
                  skrolovan ? "text-[#1D1D1D] hover:bg-[#F8F7F4]" : "text-white hover:bg-white/10"
                }`}
              >
                <ShoppingBag size={19} />
                {brojStavki > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-[#D8E8B8] text-[#183B2D] text-[10px] rounded-full flex items-center justify-center font-medium">
                    {brojStavki}
                  </span>
                )}
              </button>
              <button
                className={`lg:hidden p-2 rounded-full transition-colors duration-300 ${
                  skrolovan ? "text-[#1D1D1D]" : "text-white"
                }`}
                onClick={() => setMobilniOtvoren(!mobilniOtvoren)}
              >
                {mobilniOtvoren ? <X size={21} /> : <Menu size={21} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mega meni */}
        <AnimatePresence>
          {megaOtvoren && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full left-0 right-0 bg-white shadow-xl border-t border-[#ECECEC]"
              onMouseEnter={() => setMegaOtvoren(true)}
              onMouseLeave={() => setMegaOtvoren(false)}
            >
              <div className="max-w-[1400px] mx-auto px-12 py-10">
                <div className="grid grid-cols-4 gap-8">
                  {stubci.map((stub) => (
                    <div key={stub.naslov}>
                      <p className="text-xs uppercase tracking-widest text-[#6F6F6F] mb-4 font-medium">{stub.naslov}</p>
                      <ul className="space-y-2.5">
                        {stub.kategorije.map((i) => (
                          <li key={i}>
                            <a href={`/kolekcije/${categories[i]?.slug}`} className="text-sm text-[#1D1D1D] hover:text-[#183B2D] transition-colors font-medium">
                              {categories[i]?.name}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                  <div className="relative rounded-2xl overflow-hidden h-48">
                    <Image
                      src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&q=80"
                      alt="Istaknuto"
                      fill
                      sizes="300px"
                      className="object-cover"
                      quality={75}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#183B2D]/70 to-transparent flex flex-col justify-end p-5">
                      <p className="text-white font-medium" style={{ fontFamily: "var(--font-heading)", fontSize: "1.3rem" }}>Nova sezona</p>
                      <p className="text-white/80 text-xs mt-1">Proljetni wellness asortiman</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Traka za pretragu */}
        <AnimatePresence>
          {pretragaOtvorena && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-white border-t border-[#ECECEC] overflow-hidden"
            >
              <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-4">
                <div className="relative">
                  <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6F6F6F]" />
                  <input
                    autoFocus
                    value={upitPretrage}
                    onChange={(e) => setUpitPretrage(e.target.value)}
                    placeholder="Pretražite proizvode, kategorije..."
                    className="w-full pl-11 pr-4 py-3 bg-[#F8F7F4] rounded-xl text-sm outline-none text-[#1D1D1D] placeholder:text-[#6F6F6F]"
                  />
                  {upitPretrage && (
                    <button onClick={() => setUpitPretrage("")} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#6F6F6F]">
                      <X size={16} />
                    </button>
                  )}
                </div>
                {filtrirane.length > 0 && (
                  <div className="mt-3 space-y-1">
                    {filtrirane.map((item) => (
                      <a
                        key={item.id}
                        href={`/kolekcije/${item.slug}`}
                        className="flex items-center gap-3 px-4 py-2.5 rounded-lg hover:bg-[#F8F7F4] transition-colors text-sm text-[#1D1D1D]"
                      >
                        <Search size={14} className="text-[#6F6F6F]" />
                        {item.name}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Mobilni meni */}
      <AnimatePresence>
        {mobilniOtvoren && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed inset-0 z-40 bg-white lg:hidden flex flex-col pt-24 px-6 pb-8 overflow-y-auto"
          >
            <div className="space-y-1">
              {navLinkovi.map((link, i) => (
                <motion.a
                  key={link.naziv}
                  href={link.href}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-center justify-between py-4 border-b border-[#ECECEC] text-lg font-medium text-[#1D1D1D]"
                  style={{ fontFamily: "var(--font-heading)" }}
                  onClick={() => setMobilniOtvoren(false)}
                >
                  {link.naziv}
                </motion.a>
              ))}
            </div>
            <div className="mt-8 grid grid-cols-2 gap-3">
              <a href="/kontakt" className="flex items-center gap-2 text-sm text-[#6F6F6F] py-2">
                <Heart size={16} /> Kontakt
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
