import Image from "next/image";
import Navbar from "@/components/Navbar";
import Podnozje from "@/components/Footer";
import { ArrowRight } from "lucide-react";

const recepti = [
  {
    naziv: "Čaj od lipe s medom i limunom",
    opis: "Klasični zimski napitak koji grije dušu i jača imunitet. Pripremite za 10 minuta.",
    kategorija: "Biljni čajevi",
    trajanje: "10 min",
    slika: "/hero/biljnicaj.png",
    slug: "caj-od-lipe",
    sastojci: ["Lipa (list) 250g", "Med", "Limun", "Voda"],
  },
  {
    naziv: "Antistresni čaj od lavande i kamilice",
    opis: "Savršena kombinacija za opuštanje nakon napornog dana.",
    kategorija: "Relaksacija",
    trajanje: "8 min",
    slika: "/hero/ljekovitobilje.png",
    slug: "antistresni-caj",
    sastojci: ["Lavanda", "Kamilica", "Med po ukusu"],
  },
  {
    naziv: "Zlatno mlijeko s kurkumom",
    opis: "Protuupalni napitak pun antioksidanata — trend koji dolazi iz Ayurvede.",
    kategorija: "Zdravlje",
    trajanje: "5 min",
    slika: "/hero/43.png",
    slug: "zlatno-mlijeko",
    sastojci: ["Kurkuma u prahu", "Biljno mlijeko", "Đumbir", "Med", "Crni biber"],
  },
  {
    naziv: "Osvježavajući hladni čaj od hibiskusa",
    opis: "Živopisan, kiselkast i pun vitamina C. Savršen za ljeto.",
    kategorija: "Osvježavajući napici",
    trajanje: "15 min + hlađenje",
    slika: "/hero/53.png",
    slug: "hladni-hibiskus",
    sastojci: ["Hibiskus cvijet", "Naranča", "Med", "Ledeni kockice"],
  },
  {
    naziv: "Čaj za probavu s anasonom i koprom",
    opis: "Tradicionalni recept koji olakšava probavu i smanjuje nadutost.",
    kategorija: "Probava",
    trajanje: "7 min",
    slika: "/hero/pozadina1.png",
    slug: "caj-za-probavu",
    sastojci: ["Anason", "Kopar sjeme", "Komorač", "Đumbir"],
  },
  {
    naziv: "Energetski čaj od zelenog čaja i đumbira",
    opis: "Prirodni boost energije bez kofeina iz kafe. Savršen ujutro.",
    kategorija: "Energija",
    trajanje: "5 min",
    slika: "/hero/pozadina2.png",
    slug: "energetski-caj",
    sastojci: ["Zeleni čaj", "Svježi đumbir", "Limun", "Med"],
  },
];

export default function ReceptiStrana() {
  return (
    <>
      <Navbar />
      <main className="pt-24 min-h-screen" style={{ background: "var(--color-bg)" }}>
        <div className="py-14 lg:py-20 text-center" style={{ background: "var(--color-primary)" }}>
          <p className="text-[#D8E8B8] text-xs uppercase tracking-widest mb-3 font-medium">Wellness kuhinja</p>
          <h1 className="text-5xl lg:text-6xl font-light text-white" style={{ fontFamily: "var(--font-heading)" }}>
            Recepti & napici
          </h1>
          <p className="text-white/60 mt-4 text-sm max-w-md mx-auto">
            Naučite kako pripremiti savršen biljni napitak i maksimalno iskoristiti blagodati prirode
          </p>
        </div>

        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-16 pb-28">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recepti.map((r) => (
              <article key={r.slug} className="bg-white rounded-2xl overflow-hidden border border-[#ECECEC] hover:shadow-md transition-shadow group">
                <div className="aspect-[4/3] overflow-hidden relative">
                  <Image src={r.slika} alt={r.naziv} fill sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-cover transition-transform duration-500 group-hover:scale-105" quality={80} />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-[10px] uppercase tracking-widest text-[#3D6B50] font-semibold bg-[#D8E8B8]/50 px-2.5 py-1 rounded-full">{r.kategorija}</span>
                    <span className="text-[10px] text-[#6F6F6F]">· {r.trajanje}</span>
                  </div>
                  <h2 className="text-lg font-medium text-[#1D1D1D] mb-2 leading-snug" style={{ fontFamily: "var(--font-heading)" }}>{r.naziv}</h2>
                  <p className="text-sm text-[#6F6F6F] mb-4 leading-relaxed">{r.opis}</p>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {r.sastojci.map(s => (
                      <span key={s} className="text-[10px] bg-[#F8F7F4] text-[#6F6F6F] px-2.5 py-1 rounded-full border border-[#ECECEC]">{s}</span>
                    ))}
                  </div>
                  <a href="/recepti" className="inline-flex items-center gap-2 text-sm font-medium text-[#183B2D] hover:gap-3 transition-all duration-200">
                    Pročitaj recept <ArrowRight size={14} />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </main>
      <Podnozje />
    </>
  );
}
