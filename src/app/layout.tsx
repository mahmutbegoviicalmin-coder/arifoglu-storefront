import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import { KorpaProvider } from "@/lib/CartContext";
import KorpaDrawer from "@/components/KorpaDrawer";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-heading",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Arifoğlu | Premium Natural & Organic Products",
  description: "Discover premium organic herbs, teas, honey, spices, and wellness products. Pure nature, delivered to your door.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable}`}>
      <body style={{ fontFamily: "var(--font-body)" }}>
        <KorpaProvider>
          {children}
          <KorpaDrawer />
        </KorpaProvider>
      </body>
    </html>
  );
}
