"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const stats = [
  { number: "12", label: "Years of Excellence" },
  { number: "3", label: "Michelin Stars" },
  { number: "48", label: "Covers per Evening" },
  { number: "200+", label: "Wine Labels" },
];

export default function AmbianceSection() {
  return (
    <section className="py-32 bg-noir-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          {/* Images collage */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="relative h-[600px]"
          >
            {/* Main image */}
            <div className="absolute top-0 left-0 w-3/4 h-4/5 overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80"
                alt="Restaurant Interior"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            {/* Secondary image */}
            <div className="absolute bottom-0 right-0 w-1/2 h-2/5 overflow-hidden border-4 border-noir-900">
              <Image
                src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80"
                alt="Restaurant Table Setting"
                fill
                className="object-cover"
                sizes="25vw"
              />
            </div>
            {/* Gold accent */}
            <div className="absolute -bottom-4 -left-4 w-24 h-24 border border-gold-400/30 hidden lg:block" />
            <div className="absolute -top-4 -right-8 w-16 h-16 border border-gold-400/20 hidden lg:block" />
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="section-label">✦ The Atmosphere ✦</p>
            <h2 className="section-title mb-6">
              Where Every
              <br />
              Moment
              <br />
              <span className="gold-text italic">Matters</span>
            </h2>
            <div className="w-12 h-px bg-gold-400 mb-8" />
            <p className="font-body text-noir-300 text-sm leading-relaxed mb-6">
              Pénétrez dans un univers où chaque détail a été pensé — du
              mobilier sélectionné à la main à l'éclairage subtilement étudié,
              diffusant une lueur chaleureuse et intimiste sur chaque table.
            </p>
            <p className="font-body text-noir-300 text-sm leading-relaxed mb-10">
              Notre salle est un sanctuaire d'élégance raffinée, où la
              conversation s'épanouit librement et où le temps s'efface devant
              le plaisir.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-8 mb-10">
              {stats.map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="border-l border-gold-400/30 pl-4"
                >
                  <div className="font-display text-3xl gold-text">
                    {stat.number}
                  </div>
                  <div className="font-accent text-[10px] tracking-widest uppercase text-noir-400 mt-1">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>

            <Link
              href="/about"
              className=" flex justify-center w-1/3 px-2 btn-gold relative z-10 text-[11px]"
            >
              Notre Histoire
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
