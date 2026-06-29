import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import IstaknuteKategorije from "@/components/FeaturedCategories";
import NajprodavanijiProizvodi from "@/components/BestSellers";
import Kolekcije from "@/components/Collections";
import Prednosti from "@/components/Benefits";
import IstaknutiBaner from "@/components/FeaturedBanner";
import Noviteti from "@/components/NewArrivals";
import Recenzije from "@/components/Testimonials";
import GalerijaInstagram from "@/components/InstagramGallery";
import Bilten from "@/components/Newsletter";
import Podnozje from "@/components/Footer";

export default function PocetnaStrana() {
  return (
    <main>
      <Navbar />
      <Hero />
      <IstaknuteKategorije />
      <NajprodavanijiProizvodi />
      <Kolekcije />
      <Prednosti />
      <IstaknutiBaner />
      <Noviteti />
      <Recenzije />
      <GalerijaInstagram />
      <Bilten />
      <Podnozje />
    </main>
  );
}
