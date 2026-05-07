'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import PublicLayout from '@/components/layout/PublicLayout';

const galleryImages = [
  { src: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&q=90', thumb: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80', category: 'Food', alt: 'Fine dining plate' },
  { src: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&q=90', thumb: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&q=80', category: 'Interior', alt: 'Restaurant dining room' },
  { src: 'https://images.unsplash.com/photo-1546833998-877b37c2e5c6?w=1200&q=90', thumb: 'https://images.unsplash.com/photo-1546833998-877b37c2e5c6?w=600&q=80', category: 'Food', alt: 'Wagyu beef dish' },
  { src: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=1200&q=90', thumb: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=600&q=80', category: 'Interior', alt: 'Bar area' },
  { src: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=1200&q=90', thumb: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=600&q=80', category: 'Food', alt: 'Chocolate dessert' },
  { src: 'https://images.unsplash.com/photo-1508424757105-b6d5ad9329d0?w=1200&q=90', thumb: 'https://images.unsplash.com/photo-1508424757105-b6d5ad9329d0?w=600&q=80', category: 'Kitchen', alt: 'Chef at work' },
  { src: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=1200&q=90', thumb: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=600&q=80', category: 'Drinks', alt: 'Wine collection' },
  { src: 'https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=1200&q=90', thumb: 'https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=600&q=80', category: 'Drinks', alt: 'Cocktail' },
  { src: 'https://images.unsplash.com/photo-1544025162-d76594e8bb5c?w=1200&q=90', thumb: 'https://images.unsplash.com/photo-1544025162-d76594e8bb5c?w=600&q=80', category: 'Food', alt: 'Lamb rack' },
  { src: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=1200&q=90', thumb: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=600&q=80', category: 'Food', alt: 'Duck breast' },
  { src: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=1200&q=90', thumb: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=600&q=80', category: 'Food', alt: 'Fish dish' },
  { src: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=90', thumb: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80', category: 'Drinks', alt: 'Champagne' },
];

const categories = ['All', 'Food', 'Interior', 'Drinks', 'Kitchen'];

export default function GalleryPage() {
  const [lightboxIndex, setLightboxIndex] = useState(-1);
  const [activeFilter, setActiveFilter] = useState('All');

  const filtered = activeFilter === 'All' ? galleryImages : galleryImages.filter(img => img.category === activeFilter);

  return (
    <PublicLayout>
      <section className="relative pt-40 pb-16 bg-noir-950">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="section-label">✦ Visual Stories ✦</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="section-title">
            Our <span className="gold-text italic">Gallery</span>
          </motion.h1>
          <div className="divider-gold" />
        </div>
      </section>

      {/* Filters */}
      <section className="bg-noir-900 border-y border-noir-800 py-4">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex gap-2 justify-center flex-wrap">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`font-accent text-xs tracking-widest uppercase px-5 py-2 border transition-all duration-300 ${
                  activeFilter === cat
                    ? 'bg-gold-400 text-noir-950 border-gold-400'
                    : 'text-noir-400 border-noir-700 hover:border-gold-400/50 hover:text-cream-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="py-16 bg-noir-950">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4">
            {filtered.map((img, i) => (
              <motion.div
                key={img.src}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="break-inside-avoid mb-4 overflow-hidden cursor-pointer group relative"
                onClick={() => setLightboxIndex(galleryImages.indexOf(img))}
              >
                <div className="relative overflow-hidden">
                  <Image
                    src={img.thumb}
                    alt={img.alt}
                    width={600}
                    height={400}
                    className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-noir-950/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="font-accent text-[10px] tracking-ultra-wide uppercase text-gold-400 border border-gold-400 px-4 py-2">
                      View
                    </span>
                  </div>
                  <div className="absolute top-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="font-accent text-[8px] tracking-widest uppercase text-cream-100 bg-noir-950/70 px-2 py-1">
                      {img.category}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Lightbox
        open={lightboxIndex >= 0}
        close={() => setLightboxIndex(-1)}
        index={lightboxIndex}
        slides={galleryImages.map(img => ({ src: img.src, alt: img.alt }))}
      />
    </PublicLayout>
  );
}
