import Image from "next/image";
import Navbar from "@/components/Navbar";
import Podnozje from "@/components/Footer";
import { ArrowRight } from "lucide-react";

const clanci = [
  {
    slug: "zdravstvene-koristi-lipe",
    naslov: "5 dokazanih zdravstvenih koristi čaja od lipe",
    podnaslov: "Lipa se koristi u narodnoj medicini vijekovima — nauka to sada potvrđuje.",
    kategorija: "Zdravlje",
    datum: "15. juni 2025.",
    citanje: "4 min čitanja",
    slika: "/hero/biljnicaj.png",
  },
  {
    slug: "vodic-za-biljne-cajeve",
    naslov: "Potpuni vodič: Koji biljni čaj piti i kada?",
    podnaslov: "Jutarnji, poslijepodnevni i večernji čajevi — savjeti za svaki dio dana.",
    kategorija: "Vodič",
    datum: "8. juni 2025.",
    citanje: "6 min čitanja",
    slika: "/hero/ljekovitobilje.png",
  },
  {
    slug: "ljekovite-biljke-bosna",
    naslov: "Ljekovite biljke iz Anadolije koje su stigle u BiH",
    podnaslov: "Otkrijte koje biljke Bosanci sve više koriste za zdravlje i dobrobit.",
    kategorija: "Kultura",
    datum: "1. juni 2025.",
    citanje: "5 min čitanja",
    slika: "/hero/43.png",
  },
  {
    slug: "zimska-apoteka",
    naslov: "Zimska kućna apoteka: 10 biljaka koje morate imati",
    podnaslov: "Prirodna zaštita od prehlade i gripe — bez kemikalija.",
    kategorija: "Sezona",
    datum: "24. maja 2025.",
    citanje: "7 min čitanja",
    slika: "/hero/53.png",
  },
  {
    slug: "casopis-wellness",
    naslov: "Arifoğlu u bosanskom wellness pokretu",
    podnaslov: "Kako sve više Bosanaca otkriva moć prirodnih biljnih proizvoda.",
    kategorija: "Priča",
    datum: "17. maja 2025.",
    citanje: "3 min čitanja",
    slika: "/hero/pozadina1.png",
  },
  {
    slug: "cuvanje-cajeva",
    naslov: "Kako pravilno čuvati biljne čajeve i začine?",
    podnaslov: "Savjeti za maksimalnu svježinu i duži rok trajanja vaših biljnih proizvoda.",
    kategorija: "Savjeti",
    datum: "10. maja 2025.",
    citanje: "3 min čitanja",
    slika: "/hero/pozadina2.png",
  },
];

export default function BlogStrana() {
  const [istaknuti, ...ostali] = clanci;

  return (
    <>
      <Navbar />
      <main className="pt-24 min-h-screen" style={{ background: "var(--color-bg)" }}>
        <div className="py-14 lg:py-20 text-center" style={{ background: "var(--color-primary)" }}>
          <p className="text-[#D8E8B8] text-xs uppercase tracking-widest mb-3 font-medium">Wellness blog</p>
          <h1 className="text-5xl lg:text-6xl font-light text-white" style={{ fontFamily: "var(--font-heading)" }}>
            Znanje & inspiracija
          </h1>
          <p className="text-white/60 mt-4 text-sm max-w-md mx-auto">
            Savjeti o biljkama, zdravlju i prirodnom načinu života
          </p>
        </div>

        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-16 pb-28">
          {/* Istaknuti članak */}
          <a href="/blog" className="group block mb-12 rounded-3xl overflow-hidden bg-white border border-[#ECECEC] hover:shadow-lg transition-shadow lg:grid lg:grid-cols-2">
            <div className="aspect-[4/3] lg:aspect-auto overflow-hidden relative">
              <Image src={istaknuti.slika} alt={istaknuti.naslov} fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover transition-transform duration-500 group-hover:scale-105" priority quality={85} />
            </div>
            <div className="p-8 lg:p-12 flex flex-col justify-center">
              <span className="text-[10px] uppercase tracking-widest text-[#3D6B50] font-semibold bg-[#D8E8B8]/50 px-2.5 py-1 rounded-full w-fit mb-4">{istaknuti.kategorija}</span>
              <h2 className="text-3xl lg:text-4xl font-light text-[#1D1D1D] mb-4 leading-snug" style={{ fontFamily: "var(--font-heading)" }}>{istaknuti.naslov}</h2>
              <p className="text-[#6F6F6F] mb-6 leading-relaxed">{istaknuti.podnaslov}</p>
              <div className="flex items-center justify-between">
                <div className="text-xs text-[#6F6F6F]">{istaknuti.datum} · {istaknuti.citanje}</div>
                <div className="flex items-center gap-2 text-sm font-medium text-[#183B2D] group-hover:gap-3 transition-all duration-200">
                  Čitaj <ArrowRight size={14} />
                </div>
              </div>
            </div>
          </a>

          {/* Ostali članci */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ostali.map(c => (
              <a key={c.slug} href="/blog" className="group bg-white rounded-2xl overflow-hidden border border-[#ECECEC] hover:shadow-md transition-shadow">
                <div className="aspect-[4/3] overflow-hidden relative">
                  <Image src={c.slika} alt={c.naslov} fill sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-cover transition-transform duration-500 group-hover:scale-105" quality={80} />
                </div>
                <div className="p-6">
                  <span className="text-[10px] uppercase tracking-widest text-[#3D6B50] font-semibold">{c.kategorija}</span>
                  <h2 className="text-lg font-medium text-[#1D1D1D] mt-2 mb-2 leading-snug" style={{ fontFamily: "var(--font-heading)" }}>{c.naslov}</h2>
                  <p className="text-sm text-[#6F6F6F] mb-4 line-clamp-2">{c.podnaslov}</p>
                  <p className="text-xs text-[#6F6F6F]">{c.datum} · {c.citanje}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </main>
      <Podnozje />
    </>
  );
}
