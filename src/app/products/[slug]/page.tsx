"use client";

import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { ShoppingBag, Heart, Star, ChevronDown, Check, Minus, Plus, ArrowLeft } from "lucide-react";
import { useState } from "react";
import { products } from "@/lib/data";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";

export default function ProductPage() {
  const { slug } = useParams();
  const product = products.find((p) => p.slug === slug) || products[0];
  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);

  const [qty, setQty] = useState(1);
  const [activeImg, setActiveImg] = useState(0);
  const [wished, setWished] = useState(false);
  const [added, setAdded] = useState(false);
  const [openSection, setOpenSection] = useState<string | null>("benefits");

  const handleAdd = () => {
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const toggle = (key: string) => setOpenSection(openSection === key ? null : key);

  return (
    <>
      <Navbar />
      <main className="pt-24 min-h-screen" style={{ background: "var(--color-bg)" }}>
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-10">
          <a
            href="/"
            className="inline-flex items-center gap-2 text-sm text-[#6F6F6F] hover:text-[#183B2D] transition-colors mb-10"
          >
            <ArrowLeft size={15} /> Back to shop
          </a>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Gallery */}
            <div className="flex flex-col gap-4">
              <motion.div
                className="rounded-2xl overflow-hidden aspect-square bg-white"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <img
                  src={product.images[activeImg]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </motion.div>
              {product.images.length > 1 && (
                <div className="flex gap-3">
                  {product.images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveImg(i)}
                      className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-colors ${
                        activeImg === i ? "border-[#183B2D]" : "border-transparent"
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex flex-col gap-6 lg:sticky lg:top-28 lg:self-start"
            >
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-[10px] uppercase tracking-widest text-[#6F6F6F] font-medium">
                    {product.category.replace("-", " ")}
                  </span>
                  {product.isOrganic && (
                    <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full bg-[#D8E8B8] text-[#183B2D]">
                      Organic
                    </span>
                  )}
                </div>
                <h1
                  className="text-4xl lg:text-5xl font-light text-[#1D1D1D] leading-tight mb-4"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {product.name}
                </h1>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={13} className={i < Math.floor(product.rating) ? "fill-amber-400 text-amber-400" : "text-[#ECECEC]"} />
                    ))}
                  </div>
                  <span className="text-sm text-[#6F6F6F]">{product.rating} · {product.reviewCount} reviews</span>
                </div>
              </div>

              <div className="flex items-end gap-3">
                <span className="text-3xl font-semibold text-[#183B2D]">${product.price.toFixed(2)}</span>
                {product.originalPrice && (
                  <span className="text-lg text-[#6F6F6F] line-through mb-0.5">${product.originalPrice.toFixed(2)}</span>
                )}
                <span className="text-sm text-[#6F6F6F] mb-0.5">/ {product.weight}</span>
              </div>

              <p className="text-sm text-[#6F6F6F] leading-relaxed">{product.description}</p>

              {/* Qty + Add */}
              <div className="flex gap-3">
                <div className="flex items-center border border-[#ECECEC] rounded-full bg-white">
                  <button
                    onClick={() => setQty(Math.max(1, qty - 1))}
                    className="w-11 h-11 flex items-center justify-center text-[#1D1D1D] hover:text-[#183B2D] transition-colors"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="w-10 text-center text-sm font-medium">{qty}</span>
                  <button
                    onClick={() => setQty(qty + 1)}
                    className="w-11 h-11 flex items-center justify-center text-[#1D1D1D] hover:text-[#183B2D] transition-colors"
                  >
                    <Plus size={16} />
                  </button>
                </div>

                <motion.button
                  onClick={handleAdd}
                  whileTap={{ scale: 0.97 }}
                  className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-full text-sm font-semibold transition-colors duration-200"
                  style={{ background: added ? "#3D6B50" : "#183B2D", color: "white" }}
                >
                  {added ? <><Check size={16} /> Added to Cart</> : <><ShoppingBag size={16} /> Add to Cart</>}
                </motion.button>

                <button
                  onClick={() => setWished(!wished)}
                  className="w-12 h-12 rounded-full border border-[#ECECEC] bg-white flex items-center justify-center hover:border-[#183B2D] transition-colors"
                >
                  <Heart size={17} className={wished ? "fill-red-500 text-red-500" : "text-[#6F6F6F]"} />
                </button>
              </div>

              {/* Subscription */}
              <div className="bg-[#D8E8B8]/40 rounded-2xl p-4 border border-[#D8E8B8]">
                <p className="text-sm font-medium text-[#183B2D] mb-1">Subscribe & Save 15%</p>
                <p className="text-xs text-[#6F6F6F]">Flexible delivery · Cancel anytime · Never run out</p>
              </div>

              {/* Accordion */}
              <div className="space-y-1 border-t border-[#ECECEC] pt-4">
                {[
                  { key: "benefits", label: "Benefits", content: product.benefits.join(" · ") },
                  { key: "ingredients", label: "Ingredients", content: product.ingredients },
                  { key: "usage", label: "How to Use", content: product.usage },
                ].map((section) => (
                  <div key={section.key} className="border-b border-[#ECECEC] pb-1">
                    <button
                      onClick={() => toggle(section.key)}
                      className="flex items-center justify-between w-full py-3 text-sm font-medium text-[#1D1D1D] hover:text-[#183B2D] transition-colors"
                    >
                      {section.label}
                      <ChevronDown
                        size={16}
                        className={`transition-transform duration-200 ${openSection === section.key ? "rotate-180" : ""}`}
                      />
                    </button>
                    {openSection === section.key && (
                      <motion.p
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-sm text-[#6F6F6F] pb-3 leading-relaxed"
                      >
                        {section.content}
                      </motion.p>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Related */}
          {related.length > 0 && (
            <div className="mt-24">
              <h2 className="text-3xl font-light mb-10 text-[#1D1D1D]" style={{ fontFamily: "var(--font-heading)" }}>
                You might also like
              </h2>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {related.map((p) => <ProductCard key={p.id} product={p} />)}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
