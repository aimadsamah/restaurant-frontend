"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import PublicLayout from "@/components/layout/PublicLayout";
import { useGetMenuByCategoryQuery } from "@/features/api";
import type { MenuItem, MenuByCategory } from "@/types";

/**
 * SKELETON LOADER
 */
function SkeletonMenuItem() {
  return (
    <div className="bg-noir-900/50 border border-noir-800 rounded-sm overflow-hidden">
      <div className="skeleton aspect-[4/3] w-full" />
      <div className="p-6 space-y-3">
        <div className="flex justify-between">
          <div className="skeleton h-5 w-1/2" />
          <div className="skeleton h-5 w-12" />
        </div>
        <div className="skeleton h-3 w-full" />
        <div className="skeleton h-3 w-2/3" />
      </div>
    </div>
  );
}

/**
 * IMAGE URL HELPER
 */
const getImageUrl = (imagePath: string) => {
  if (!imagePath) {
    return "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80";
  }
  if (imagePath.startsWith("http")) return imagePath;
  const baseUrl =
    process.env.NEXT_PUBLIC_UPLOADS_URL || "http://localhost:5000";
  return `${baseUrl.endsWith("/") ? baseUrl.slice(0, -1) : baseUrl}${imagePath}`;
};

/**
 * MENU ITEM CARD
 */
function MenuItemCard({ item }: { item: MenuItem }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.5 }}
      className={`group bg-noir-900 border border-noir-800/50 hover:border-gold-400/30 transition-all duration-500 overflow-hidden ${
        !item.availability ? "opacity-60 grayscale" : ""
      }`}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={getImageUrl(item.image || "")}
          alt={item.name}
          fill
          className="object-cover transition-transform duration-1000 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {item.featured && (
            <span className="bg-gold-400 text-noir-950 font-accent text-[9px] tracking-[0.2em] uppercase px-3 py-1 font-bold shadow-lg">
              Chef's Choice
            </span>
          )}
          {!item.availability && (
            <span className="bg-noir-950/80 text-white font-accent text-[9px] tracking-[0.2em] uppercase px-3 py-1 backdrop-blur-md">
              Unavailable
            </span>
          )}
        </div>
      </div>

      <div className="p-6">
        <div className="flex justify-between items-start mb-3">
          <h4 className="font-display text-xl text-cream-100 group-hover:text-gold-400 transition-colors duration-300">
            {item.name}
          </h4>
          <span className="font-display text-lg text-gold-400 italic">
            {item.price} da
          </span>
        </div>

        <p className="font-body text-noir-400 text-sm leading-relaxed mb-6 line-clamp-3 min-h-[4.5rem]">
          {item.description}
        </p>

        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-noir-800/50">
          <div className="flex flex-wrap gap-2">
            {item.allergens.slice(0, 3).map((a) => (
              <span
                key={a}
                className="font-accent text-[8px] tracking-widest uppercase text-noir-500 border border-noir-800 px-2 py-0.5"
              >
                {a}
              </span>
            ))}
          </div>
          {item.preparationTime && (
            <span className="font-accent text-[9px] tracking-widest uppercase text-gold-500/60 flex items-center gap-1">
              <svg
                className="w-3 h-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              {item.preparationTime} min
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function MenuPage() {
  const { data, isLoading } = useGetMenuByCategoryQuery();
  const categories: MenuByCategory[] = data?.data ?? [];
  const [activeTab, setActiveTab] = useState<string | null>(null);

  const activeCategory = activeTab
    ? (categories.find((c) => c._id === activeTab) ?? categories[0])
    : categories[0];

  return (
    <PublicLayout>
      {/* Hero Section */}
      <section className="relative pt-48 pb-32 bg-noir-950 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=1920&q=80"
            alt="Menu Background"
            fill
            className="object-cover opacity-20"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-noir-950/50 via-noir-950 to-noir-950" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="section-label text-gold-400 mb-4"
          >
            ✦ Gastronomie ✦
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-display text-cream-100 font-light mb-8"
          >
            Notre <span className="gold-text italic">Menu</span> Signature
          </motion.h1>
          <div className="divider-gold mx-auto" />
        </div>
      </section>

      {/* FIXED: Sticky Category Navigation (Scrollable on Mobile) */}
      <section className="bg-noir-900 border-y border-noir-800 sticky top-[72px] lg:top-[80px] z-30 shadow-2xl backdrop-blur-md bg-noir-900/90">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-start lg:justify-center items-center overflow-x-auto scrollbar-hide px-4">
            {isLoading
              ? Array.from({ length: 4 }).map((_, i) => (
                  <div
                    key={i}
                    className="skeleton h-10 w-32 mx-4 flex-shrink-0 my-4"
                  />
                ))
              : categories.map((cat) => (
                  <button
                    key={cat._id}
                    onClick={() => setActiveTab(cat._id)}
                    className={`flex-shrink-0 px-6 lg:px-8 py-5 font-accent text-[10px] tracking-[0.2em] uppercase transition-all duration-500 relative whitespace-nowrap ${
                      activeCategory?._id === cat._id
                        ? "text-gold-400"
                        : "text-noir-400 hover:text-cream-200"
                    }`}
                  >
                    {cat.name}
                    <span className="ml-1 text-[8px] opacity-50">
                      ({cat.items?.length || 0})
                    </span>
                    {activeCategory?._id === cat._id && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-gold-400"
                      />
                    )}
                  </button>
                ))}
          </div>
        </div>
      </section>

      {/* Menu Grid Section */}
      <section className="py-24 bg-noir-950 min-h-screen">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 6 }).map((_, i) => (
                <SkeletonMenuItem key={i} />
              ))}
            </div>
          ) : (
            <AnimatePresence mode="wait">
              {activeCategory && (
                <motion.div
                  key={activeCategory._id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="mb-16 text-center">
                    <h2 className="font-display text-4xl text-cream-100 font-light mb-4">
                      {activeCategory.name}
                    </h2>
                    {activeCategory.description && (
                      <p className="font-body text-noir-400 text-sm max-w-2xl mx-auto italic">
                        "{activeCategory.description}"
                      </p>
                    )}
                  </div>

                  {activeCategory.items?.length === 0 ? (
                    <div className="text-center py-20 border border-dashed border-noir-800">
                      <p className="font-body text-noir-500 uppercase tracking-widest text-xs">
                        Prochainement
                      </p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
                      {activeCategory.items?.map((item) => (
                        <MenuItemCard key={item._id} item={item} />
                      ))}
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          )}
        </div>
      </section>
    </PublicLayout>
  );
}
