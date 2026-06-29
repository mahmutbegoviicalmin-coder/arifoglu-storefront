"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Clock, Check } from "lucide-react";
import Navbar from "@/components/Navbar";
import Podnozje from "@/components/Footer";

export default function KontaktStrana() {
  const [forma, setForma] = useState({ ime: "", email: "", tema: "", poruka: "" });
  const [poslano, setPoslano] = useState(false);

  const handleSlanje = (e: React.FormEvent) => {
    e.preventDefault();
    setPoslano(true);
    setForma({ ime: "", email: "", tema: "", poruka: "" });
  };

  return (
    <>
      <Navbar />
      <main className="pt-24 min-h-screen" style={{ background: "var(--color-bg)" }}>
        <div className="py-14 lg:py-20 text-center" style={{ background: "var(--color-primary)" }}>
          <p className="text-[#D8E8B8] text-xs uppercase tracking-widest mb-3 font-medium">Tu smo za vas</p>
          <h1 className="text-5xl lg:text-6xl font-light text-white" style={{ fontFamily: "var(--font-heading)" }}>
            Kontaktirajte nas
          </h1>
          <p className="text-white/60 mt-4 text-sm max-w-md mx-auto">
            Imate pitanje o narudžbi ili proizvodu? Odgovoramo u roku od 24 sata.
          </p>
        </div>

        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-16 pb-28">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Kontakt info */}
            <div>
              <h2 className="text-3xl font-light text-[#1D1D1D] mb-8" style={{ fontFamily: "var(--font-heading)" }}>
                Kako možete<br />stupiti u kontakt?
              </h2>

              <div className="space-y-6 mb-12">
                {[
                  { ikona: Mail, naziv: "Email", vrijednost: "info@arifoglu.ba", opis: "Odgovaramo u roku od 24h" },
                  { ikona: Phone, naziv: "Telefon / WhatsApp", vrijednost: "+387 61 000 000", opis: "Pon–Pet, 9:00–17:00" },
                  { ikona: MapPin, naziv: "Dostava u BiH", vrijednost: "Sarajevo, Mostar, Banja Luka i cijela BiH", opis: "Rok dostave 3–5 radnih dana" },
                  { ikona: Clock, naziv: "Radno vrijeme", vrijednost: "Ponedjeljak – Petak", opis: "9:00 – 17:00 po lokalnom vremenu" },
                ].map(({ ikona: Ikona, naziv, vrijednost, opis }) => (
                  <div key={naziv} className="flex gap-4 items-start">
                    <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "var(--color-accent)" }}>
                      <Ikona size={18} className="text-[#183B2D]" />
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-widest text-[#6F6F6F] font-medium mb-0.5">{naziv}</p>
                      <p className="text-sm font-medium text-[#1D1D1D]">{vrijednost}</p>
                      <p className="text-xs text-[#6F6F6F]">{opis}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* FAQ kratki */}
              <div className="bg-white rounded-2xl p-6 border border-[#ECECEC]">
                <h3 className="font-semibold text-[#1D1D1D] mb-4 text-sm">Česta pitanja</h3>
                <div className="space-y-4">
                  {[
                    { p: "Kako se vrši plaćanje?", o: "Isključivo pouzećem — plaćate kuriru pri preuzimanju paketa." },
                    { p: "Koliko traje dostava?", o: "3–5 radnih dana za cijelu Bosnu i Hercegovinu." },
                    { p: "Mogu li vratiti proizvod?", o: "Da, u roku od 30 dana od dana prijema ako je proizvod neotvoren." },
                    { p: "Da li je dostava besplatna?", o: "Besplatna dostava za narudžbe iznad 50 KM." },
                  ].map(({ p, o }) => (
                    <div key={p} className="border-b border-[#ECECEC] pb-4 last:border-0 last:pb-0">
                      <p className="text-sm font-medium text-[#1D1D1D] mb-1">{p}</p>
                      <p className="text-xs text-[#6F6F6F]">{o}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Forma */}
            <div>
              <div className="bg-white rounded-3xl p-8 lg:p-10 border border-[#ECECEC] shadow-sm">
                {poslano ? (
                  <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center py-12">
                    <div className="w-16 h-16 rounded-full bg-[#D8E8B8] flex items-center justify-center mx-auto mb-4">
                      <Check size={28} className="text-[#183B2D]" />
                    </div>
                    <h3 className="text-xl font-semibold text-[#1D1D1D] mb-2">Poruka primljena!</h3>
                    <p className="text-sm text-[#6F6F6F]">Odgovoramo u roku od 24 sata. Hvala na povjerenju.</p>
                    <button onClick={() => setPoslano(false)} className="mt-6 text-sm text-[#183B2D] font-medium hover:underline">
                      Pošalji novu poruku
                    </button>
                  </motion.div>
                ) : (
                  <>
                    <h3 className="text-2xl font-light text-[#1D1D1D] mb-6" style={{ fontFamily: "var(--font-heading)" }}>
                      Pošaljite nam poruku
                    </h3>
                    <form onSubmit={handleSlanje} className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-xs text-[#6F6F6F] font-medium mb-1.5 block">Ime i prezime *</label>
                          <input required value={forma.ime} onChange={e => setForma({ ...forma, ime: e.target.value })}
                            placeholder="Vaše ime"
                            className="w-full border border-[#ECECEC] rounded-xl px-4 py-3 text-sm outline-none focus:border-[#183B2D] transition-colors" />
                        </div>
                        <div>
                          <label className="text-xs text-[#6F6F6F] font-medium mb-1.5 block">Email *</label>
                          <input required type="email" value={forma.email} onChange={e => setForma({ ...forma, email: e.target.value })}
                            placeholder="vasa@email.com"
                            className="w-full border border-[#ECECEC] rounded-xl px-4 py-3 text-sm outline-none focus:border-[#183B2D] transition-colors" />
                        </div>
                      </div>
                      <div>
                        <label className="text-xs text-[#6F6F6F] font-medium mb-1.5 block">Tema</label>
                        <select value={forma.tema} onChange={e => setForma({ ...forma, tema: e.target.value })}
                          className="w-full border border-[#ECECEC] rounded-xl px-4 py-3 text-sm outline-none focus:border-[#183B2D] transition-colors bg-white">
                          <option value="">Odaberite temu</option>
                          <option>Pitanje o narudžbi</option>
                          <option>Informacije o proizvodu</option>
                          <option>Povrat robe</option>
                          <option>Saradnja / veleprodaja</option>
                          <option>Ostalo</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-xs text-[#6F6F6F] font-medium mb-1.5 block">Poruka *</label>
                        <textarea required value={forma.poruka} onChange={e => setForma({ ...forma, poruka: e.target.value })}
                          placeholder="Opišite vaš upit..."
                          rows={5}
                          className="w-full border border-[#ECECEC] rounded-xl px-4 py-3 text-sm outline-none focus:border-[#183B2D] transition-colors resize-none" />
                      </div>
                      <button type="submit"
                        className="w-full py-4 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90 active:scale-95"
                        style={{ background: "var(--color-primary)" }}>
                        Pošalji poruku
                      </button>
                      <p className="text-xs text-[#6F6F6F] text-center">Odgovaramo u roku od 24h radnim danom.</p>
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Podnozje />
    </>
  );
}
