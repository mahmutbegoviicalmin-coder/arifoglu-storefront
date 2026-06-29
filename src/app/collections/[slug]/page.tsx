"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
import { motion } from "framer-motion";
import { SlidersHorizontal, X, ChevronDown } from "lucide-react";
import { products, categories } from "@/lib/data";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";

const sortOptions = ["Featured", "Price: Low to High", "Price: High to Low", "Best Rating", "Newest"];

export default function CollectionPage() {
  const { slug } = useParams();
  const category = categories.find((c) => c.slug === slug);
  const [sort, setSort] = useState("Featured");
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [onlyOrganic, setOnlyOrganic] = useState(false);
  const [onlyInStock, setOnlyInStock] = useState(false);

  let filtered = products.filter((p) => !slug || slug === "all" || p.category === slug);
  if (onlyOrganic) filtered = filtered.filter((p) => p.isOrganic);
  if (onlyInStock) filtered = filtered.filter((p) => p.inStock);
  filtered = filtered.filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1]);

  if (sort === "Price: Low to High") filtered = [...filtered].sort((a, b) => a.price - b.price);
  if (sort === "Price: High to Low") filtered = [...filtered].sort((a, b) => b.price - a.price);
  if (sort === "Best Rating") filtered = [...filtered].sort((a, b) => b.rating - a.rating);

  if (filtered.length === 0) filtered = products;

  return (
    <>
      <Navbar />
      <main className="pt-24 min-h-screen" style={{ background: "var(--color-bg)" }}>
        {/* Header */}
        <div
          className="relative py-16 lg:py-20 mb-8 overflow-hidden"
          style={{ background: "var(--color-primary)" }}
        >
          {category?.image && (
            <img
              src={category.image}
              alt=""
              className="absolute inset-0 w-full h-full object-cover opacity-20"
            />
          )}
          <div className="relative max-w-[1400px] mx-auto px-6 lg:px-12 text-center text-white">
            <p className="text-[#D8E8B8] text-xs uppercase tracking-widest mb-3 font-medium">Collection</p>
            <h1 className="text-5xl lg:text-6xl font-light" style={{ fontFamily: "var(--font-heading)" }}>
              {category?.name || "All Products"}
            </h1>
            {category?.description && (
              <p className="text-white/60 mt-4 text-sm max-w-md mx-auto">{category.description}</p>
            )}
          </div>
        </div>

        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 pb-24">
          {/* Toolbar */}
          <div className="flex items-center justify-between mb-8 gap-4 flex-wrap">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 text-sm font-medium text-[#1D1D1D] border border-[#ECECEC] bg-white px-4 py-2.5 rounded-full hover:border-[#183B2D] transition-colors"
              >
                <SlidersHorizontal size={15} />
                Filters
                {(onlyOrganic || onlyInStock) && (
                  <span className="w-5 h-5 bg-[#183B2D] text-white text-[10px] rounded-full flex items-center justify-center">
                    {Number(onlyOrganic) + Number(onlyInStock)}
                  </span>
                )}
              </button>
              <p className="text-sm text-[#6F6F6F]">{filtered.length} products</p>
            </div>

            <div className="relative">
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="appearance-none bg-white border border-[#ECECEC] text-sm font-medium text-[#1D1D1D] px-4 py-2.5 pr-8 rounded-full outline-none cursor-pointer hover:border-[#183B2D] transition-colors"
              >
                {sortOptions.map((o) => <option key={o}>{o}</option>)}
              </select>
              <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6F6F6F] pointer-events-none" />
            </div>
          </div>

          <div className="flex gap-8">
            {/* Sidebar filters */}
            {showFilters && (
              <motion.aside
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                className="w-64 flex-shrink-0 hidden lg:block"
              >
                <div className="bg-white rounded-2xl p-6 space-y-6 sticky top-28">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-[#1D1D1D] text-sm">Filters</h3>
                    <button onClick={() => setShowFilters(false)} className="text-[#6F6F6F] hover:text-[#1D1D1D]">
                      <X size={16} />
                    </button>
                  </div>

                  <div>
                    <p className="text-xs uppercase tracking-widest text-[#6F6F6F] mb-3 font-semibold">Availability</p>
                    <label className="flex items-center gap-2 text-sm text-[#1D1D1D] cursor-pointer">
                      <input type="checkbox" checked={onlyInStock} onChange={(e) => setOnlyInStock(e.target.checked)} className="accent-[#183B2D]" />
                      In Stock Only
                    </label>
                  </div>

                  <div>
                    <p className="text-xs uppercase tracking-widest text-[#6F6F6F] mb-3 font-semibold">Certifications</p>
                    <label className="flex items-center gap-2 text-sm text-[#1D1D1D] cursor-pointer">
                      <input type="checkbox" checked={onlyOrganic} onChange={(e) => setOnlyOrganic(e.target.checked)} className="accent-[#183B2D]" />
                      Organic Only
                    </label>
                  </div>

                  <div>
                    <p className="text-xs uppercase tracking-widest text-[#6F6F6F] mb-3 font-semibold">Price Range</p>
                    <input
                      type="range"
                      min={0}
                      max={100}
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([0, Number(e.target.value)])}
                      className="w-full accent-[#183B2D]"
                    />
                    <p className="text-xs text-[#6F6F6F] mt-1">Up to ${priceRange[1]}</p>
                  </div>

                  <button
                    onClick={() => { setOnlyOrganic(false); setOnlyInStock(false); setPriceRange([0, 100]); }}
                    className="text-xs text-[#183B2D] font-medium hover:underline"
                  >
                    Clear all filters
                  </button>
                </div>
              </motion.aside>
            )}

            {/* Grid */}
            <div className="flex-1 grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-5">
              {filtered.map((product, i) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.4 }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
