import Image from "next/image";
import Navbar from "@/components/Navbar";
import Podnozje from "@/components/Footer";

export default function ONamaStrana() {
  return (
    <>
      <Navbar />
      <main className="pt-24 min-h-screen" style={{ background: "var(--color-bg)" }}>
        {/* Hero */}
        <div className="relative py-24 lg:py-32 overflow-hidden" style={{ background: "var(--color-primary)" }}>
          <div className="max-w-[1400px] mx-auto px-6 lg:px-12 text-center text-white">
            <p className="text-[#D8E8B8] text-xs uppercase tracking-widest mb-4 font-medium">Naša priča</p>
            <h1 className="text-5xl lg:text-7xl font-light leading-tight" style={{ fontFamily: "var(--font-heading)" }}>
              Tradicija od<br /><em>1964. godine</em>
            </h1>
            <p className="text-white/60 mt-6 text-base max-w-xl mx-auto leading-relaxed">
              Šest desetljeća predanosti čistoći, kvaliteti i mudrosti prirode.
            </p>
          </div>
        </div>

        {/* Priča */}
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-20 lg:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center mb-24">
            <div>
              <p className="text-xs uppercase tracking-widest text-[#6F6F6F] mb-4 font-medium">Ko smo mi</p>
              <h2 className="text-4xl lg:text-5xl font-light text-[#1D1D1D] mb-6 leading-tight" style={{ fontFamily: "var(--font-heading)" }}>
                Iz srca Anadolije<br />do vaše šolje
              </h2>
              <p className="text-[#6F6F6F] leading-relaxed mb-4">
                Arifoğlu je porodično preduzeće osnovano 1964. godine u Turskoj, s jednom misijom — donijeti najčišće prirodne biljke i začine direktno od prirode do vašeg doma.
              </p>
              <p className="text-[#6F6F6F] leading-relaxed mb-4">
                Svaki naš proizvod pažljivo se bira, suši i pakira bez konzervansa, umjetnih aroma ili boja. Vjerujemo da priroda nudi sve što nam treba za zdravlje i dobrobit.
              </p>
              <p className="text-[#6F6F6F] leading-relaxed">
                Danas naše proizvode dostavljamo i u Bosnu i Hercegovinu — jer zdravlje je univerzalno, a priroda ne poznaje granice.
              </p>
            </div>
            <div className="rounded-3xl overflow-hidden aspect-square relative">
              <Image src="/hero/ljekovitobilje.png" alt="Arifoğlu tradicija" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" quality={85} />
            </div>
          </div>

          {/* Vrijednosti */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
            {[
              { broj: "60+", opis: "godina tradicije i iskustva u biljnoj farmaceutici" },
              { broj: "200+", opis: "vrsta biljaka, začina i prirodnih proizvoda u ponudi" },
              { broj: "100%", opis: "prirodni sastojci — bez konzervansa i dodanih aroma" },
            ].map((s) => (
              <div key={s.broj} className="bg-white rounded-2xl p-8 text-center border border-[#ECECEC]">
                <p className="text-5xl font-light text-[#183B2D] mb-3" style={{ fontFamily: "var(--font-heading)" }}>{s.broj}</p>
                <p className="text-sm text-[#6F6F6F] leading-relaxed">{s.opis}</p>
              </div>
            ))}
          </div>

          {/* Obećanje kvaliteta */}
          <div className="rounded-3xl p-10 lg:p-16 text-center" style={{ background: "var(--color-primary)" }}>
            <p className="text-[#D8E8B8] text-xs uppercase tracking-widest mb-4 font-medium">Naše obećanje</p>
            <h2 className="text-4xl lg:text-5xl font-light text-white mb-6 leading-tight" style={{ fontFamily: "var(--font-heading)" }}>
              Kvalitet koji možete<br /><em>osjetiti u svakom gutljaju</em>
            </h2>
            <p className="text-white/60 max-w-xl mx-auto leading-relaxed mb-8">
              Svaka serija naših proizvoda prolazi stroge kontrole kvalitete. Laboratorijski testovi, prirodno sušenje i pažljivo pakiranje — to je Arifoğlu standard.
            </p>
            <a href="/prodavnica" className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-semibold transition-all hover:opacity-90" style={{ background: "var(--color-accent)", color: "var(--color-primary)" }}>
              Istraži proizvode
            </a>
          </div>
        </div>
      </main>
      <Podnozje />
    </>
  );
}
