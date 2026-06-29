"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, Minus, Plus, Trash2, ShoppingBag, Truck, Check } from "lucide-react";
import { useState } from "react";
import { useKorpa } from "@/lib/CartContext";

export default function KorpaDrawer() {
  const { stavke, ukloni, promijeniKolicinu, ocisti, ukupno, brojStavki, korpaOtvorena, setKorpaOtvorena } = useKorpa();
  const [narudzbaPoslana, setNarudzbaPoslana] = useState(false);
  const [forma, setForma] = useState({ ime: "", adresa: "", telefon: "", grad: "" });

  const handleNarudzba = (e: React.FormEvent) => {
    e.preventDefault();
    setNarudzbaPoslana(true);
    ocisti();
    setTimeout(() => {
      setNarudzbaPoslana(false);
      setKorpaOtvorena(false);
      setForma({ ime: "", adresa: "", telefon: "", grad: "" });
    }, 4000);
  };

  return (
    <AnimatePresence>
      {korpaOtvorena && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setKorpaOtvorena(false)}
            className="fixed inset-0 bg-black/40 z-50"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white z-50 flex flex-col shadow-2xl"
          >
            {/* Zaglavlje */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-[#ECECEC]">
              <div className="flex items-center gap-3">
                <ShoppingBag size={20} className="text-[#183B2D]" />
                <h2 className="font-semibold text-[#1D1D1D]">Vaša korpa</h2>
                {brojStavki > 0 && (
                  <span className="w-6 h-6 rounded-full bg-[#183B2D] text-white text-xs flex items-center justify-center font-medium">
                    {brojStavki}
                  </span>
                )}
              </div>
              <button onClick={() => setKorpaOtvorena(false)} className="text-[#6F6F6F] hover:text-[#1D1D1D] transition-colors">
                <X size={20} />
              </button>
            </div>

            {narudzbaPoslana ? (
              <div className="flex-1 flex flex-col items-center justify-center gap-4 px-6 text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-16 h-16 rounded-full bg-[#D8E8B8] flex items-center justify-center"
                >
                  <Check size={28} className="text-[#183B2D]" />
                </motion.div>
                <h3 className="text-xl font-semibold text-[#1D1D1D]">Narudžba primljena!</h3>
                <p className="text-sm text-[#6F6F6F]">Kontaktirat ćemo vas uskoro radi potvrde i dogovora isporuke.</p>
              </div>
            ) : stavke.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center gap-4 text-center px-6">
                <ShoppingBag size={48} className="text-[#ECECEC]" />
                <p className="text-[#6F6F6F] text-sm">Vaša korpa je prazna</p>
                <button
                  onClick={() => setKorpaOtvorena(false)}
                  className="px-6 py-3 rounded-full text-sm font-medium text-white"
                  style={{ background: "var(--color-primary)" }}
                >
                  Nastavi kupovinu
                </button>
              </div>
            ) : (
              <>
                {/* Stavke */}
                <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
                  {stavke.map((s) => (
                    <div key={s.id} className="flex gap-4 items-start">
                      <div className="w-20 h-20 rounded-xl overflow-hidden bg-[#F8F7F4] flex-shrink-0 relative">
                        <Image src={s.slika} alt={s.naziv} fill sizes="80px" className="object-cover" quality={70} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-[#1D1D1D] leading-snug line-clamp-2">{s.naziv}</p>
                        {s.tezina && <p className="text-xs text-[#6F6F6F] mt-0.5">{s.tezina}</p>}
                        <p className="text-sm font-semibold text-[#183B2D] mt-1">{(s.cijena * s.kolicina).toFixed(2)} KM</p>
                        <div className="flex items-center gap-2 mt-2">
                          <button
                            onClick={() => promijeniKolicinu(s.id, s.kolicina - 1)}
                            className="w-7 h-7 rounded-full border border-[#ECECEC] flex items-center justify-center hover:border-[#183B2D] transition-colors"
                          >
                            <Minus size={12} />
                          </button>
                          <span className="text-sm font-medium w-5 text-center">{s.kolicina}</span>
                          <button
                            onClick={() => promijeniKolicinu(s.id, s.kolicina + 1)}
                            className="w-7 h-7 rounded-full border border-[#ECECEC] flex items-center justify-center hover:border-[#183B2D] transition-colors"
                          >
                            <Plus size={12} />
                          </button>
                        </div>
                      </div>
                      <button onClick={() => ukloni(s.id)} className="text-[#ECECEC] hover:text-red-400 transition-colors mt-1">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Checkout forma */}
                <div className="border-t border-[#ECECEC] px-6 pt-4 pb-6 space-y-4">
                  {/* Ukupno */}
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-[#6F6F6F]">Međuzbir</span>
                    <span className="font-semibold text-[#1D1D1D]">{ukupno.toFixed(2)} KM</span>
                  </div>

                  {/* Pouzećem badge */}
                  <div className="flex items-center gap-2 bg-[#D8E8B8]/40 border border-[#D8E8B8] rounded-xl px-4 py-3">
                    <Truck size={16} className="text-[#183B2D] flex-shrink-0" />
                    <div>
                      <p className="text-xs font-semibold text-[#183B2D]">Plaćanje pouzećem</p>
                      <p className="text-[10px] text-[#6F6F6F]">Platite kuriru pri preuzimanju · Dostava 3-5 radnih dana</p>
                    </div>
                  </div>

                  {/* Forma */}
                  <form onSubmit={handleNarudzba} className="space-y-3">
                    <input
                      required
                      placeholder="Ime i prezime *"
                      value={forma.ime}
                      onChange={(e) => setForma({ ...forma, ime: e.target.value })}
                      className="w-full border border-[#ECECEC] rounded-xl px-4 py-3 text-sm outline-none focus:border-[#183B2D] transition-colors"
                    />
                    <input
                      required
                      placeholder="Telefon *"
                      value={forma.telefon}
                      onChange={(e) => setForma({ ...forma, telefon: e.target.value })}
                      className="w-full border border-[#ECECEC] rounded-xl px-4 py-3 text-sm outline-none focus:border-[#183B2D] transition-colors"
                    />
                    <input
                      required
                      placeholder="Grad i poštanski broj *"
                      value={forma.grad}
                      onChange={(e) => setForma({ ...forma, grad: e.target.value })}
                      className="w-full border border-[#ECECEC] rounded-xl px-4 py-3 text-sm outline-none focus:border-[#183B2D] transition-colors"
                    />
                    <input
                      required
                      placeholder="Adresa dostave *"
                      value={forma.adresa}
                      onChange={(e) => setForma({ ...forma, adresa: e.target.value })}
                      className="w-full border border-[#ECECEC] rounded-xl px-4 py-3 text-sm outline-none focus:border-[#183B2D] transition-colors"
                    />
                    <button
                      type="submit"
                      className="w-full py-4 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90 active:scale-95"
                      style={{ background: "var(--color-primary)" }}
                    >
                      Naruči pouzećem · {ukupno.toFixed(2)} KM
                    </button>
                  </form>
                </div>
              </>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
