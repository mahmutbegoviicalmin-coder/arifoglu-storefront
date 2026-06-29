import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "images.arifoglu.com" },
    ],
  },
  async redirects() {
    return [
      { source: "/collections", destination: "/kolekcije", permanent: true },
      { source: "/collections/:slug", destination: "/kolekcije/:slug", permanent: true },
      { source: "/products/:slug", destination: "/proizvodi/:slug", permanent: true },
      { source: "/shop", destination: "/prodavnica", permanent: true },
    ];
  },
};

export default nextConfig;
