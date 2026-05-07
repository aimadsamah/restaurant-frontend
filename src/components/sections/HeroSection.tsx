"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1920&q=90"
          alt="Maison Noir Restaurant"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-noir-950/50 via-noir-950/40 to-noir-950/90" />
        <div className="absolute inset-0 bg-gradient-to-r from-noir-950/60 via-transparent to-noir-950/30" />
      </div>

      {/* Vertical decorative text */}
      <div className="absolute left-8 top-1/2 -translate-y-1/2 z-10 hidden lg:block">
        <p className="writing-vertical font-accent text-[10px] tracking-ultra-wide text-gold-400/50 uppercase">
          Jijel · Depuis. 2018
        </p>
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="section-label mb-6"
        >
          ✦ Fine Dining Experience ✦
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-7xl md:text-8xl lg:text-[10rem] font-light text-cream-50 leading-none tracking-tight mb-4"
        >
          Maison
          <br />
          <span className="gold-text italic">Noir</span>
        </motion.h1>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="w-24 h-px bg-gold-400 mx-auto mb-8"
        />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="font-body text-cream-300 text-lg md:text-xl font-light tracking-wide max-w-lg mx-auto mb-8 leading-relaxed"
        >
          {/* Where gastronomy transcends the ordinary. A symphony of flavors
          crafted by our Michelin-starred chef. */}
          Vivez une expérience gastronomique inoubliable.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className=" flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link
            href="/reservation"
            className="btn-gold relative z-10 text-[11px]"
          >
            Réserver une Table
          </Link>
          <Link href="/menu" className="btn-gold relative z-10 text-[11px]">
            Découvrir le Menu
          </Link>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-1 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <span className="font-accent text-[9px] tracking-ultra-wide text-gold-400/60 uppercase">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-px h-10 bg-gradient-to-b from-gold-400/60 to-transparent"
        />
      </motion.div>
    </section>
  );
}
