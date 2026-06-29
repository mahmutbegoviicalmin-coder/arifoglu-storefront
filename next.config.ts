import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [64, 96, 128, 256, 384],
    minimumCacheTTL: 2592000, // 30 days
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "images.arifoglu.com" },
    ],
  },
  async redirects() {
    return [
      { source: "/collections", destination: "/kolekcije", permanent: true },
      { source: "/collections/:slug", destination: "/kolekcije/:slug", permanent: true },
      { source: "/products/:slug((?!.*\\.[a-z]{2,4}$).*)", destination: "/proizvodi/:slug", permanent: true },
      { source: "/shop", destination: "/prodavnica", permanent: true },
    ];
  },
};

export default nextConfig;
