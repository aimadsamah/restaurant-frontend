"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import PublicLayout from "@/components/layout/PublicLayout";

const team = [
  {
    name: "Chef Julien Moreau",
    role: "Executive Chef & Founder",
    image:
      "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=400&q=80",
    bio: "Trained under Alain Ducasse, Chef Julien brings 20 years of Michelin-starred experience.",
  },
  {
    name: "Sophie Laurent",
    role: "Head Sommelier",
    image:
      "https://images.unsplash.com/photo-1607631568010-a87245c0daf8?w=400&q=80",
    bio: "A Master Sommelier with a collection of over 1,200 labels from the world's finest estates.",
  },
  {
    name: "Pierre Dubois",
    role: "Pastry Chef",
    image:
      "https://images.unsplash.com/photo-1583394293214-dbb5f378f61d?w=400&q=80",
    bio: "Former Ladurée pastry artist, Pierre crafts desserts that blur the line between art and cuisine.",
  },
];

export default function AboutPage() {
  return (
    <PublicLayout>
      {/* Hero */}
      <section className="relative pt-40 pb-32 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?w=1920&q=80"
            alt="About"
            fill
            className="object-cover opacity-15"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-noir-950/80 to-noir-950" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 text-center">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="section-label"
          >
            ✦ Our Story ✦
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="section-title"
          >
            Une Tradition
            <br />
            <span className="gold-text italic">d'Excellence</span>
          </motion.h1>
          <div className="divider-gold" />
        </div>
      </section>

      {/* Story section */}
      <section className="py-24 bg-noir-950">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-32">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <p className="section-label">✦ Origines ✦</p>
              <h2 className="font-display text-5xl font-light text-cream-100 mb-6">
                Le Fruit
                <br />
                <span className="gold-text italic">d’une Passion</span>
              </h2>
              <div className="w-12 h-px bg-gold-400 mb-8" />
              <p className="font-body text-noir-300 text-sm leading-loose mb-6">
                Maison Noir est née en 2018 d'une vision singulière : créer une
                expérience culinaire qui transcende l'ordinaire pour élever
                chaque instant vers l'extraordinaire. Fondé par le Chef Mohamed
                Bou, disciple du légendaire Alain Ducasse, notre restaurant est
                devenu une destination de pèlerinage pour les amoureux de la
                haute gastronomie du monde entier.
              </p>
              <p className="font-body text-noir-300 text-sm leading-loose">
                Notre philosophie est d'une simplicité désarmante : ne sourcer
                que les meilleurs ingrédients de saison, les traiter avec le
                plus grand respect et les présenter de manière à surprendre et
                émerveiller. Ce qui n'était au départ qu'un restaurant intimiste
                de 20 couverts est devenu l'une des adresses les plus célèbres
                de Jijel, tout en préservant ce sentiment précieux d'intimité et
                d'attention personnelle qui définit notre esprit.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="relative h-[500px] overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1508424757105-b6d5ad9329d0?w=800&q=80"
                  alt="Chef cooking"
                  fill
                  className="object-cover"
                  sizes="50vw"
                />
                <div className="absolute bottom-6 right-6 bg-noir-950/90 border border-gold-400/30 p-6 max-w-xs">
                  <p className="font-display text-cream-100 text-lg italic leading-snug">
                    "La cuisine ne consiste pas seulement à nourrir le corps,
                    elle consiste à nourrir l'âme."
                  </p>
                  <p className="font-accent text-[10px] tracking-widest uppercase text-gold-400 mt-3">
                    — Chef nom du chef
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Philosophy */}
          <div className="border-t border-b border-noir-800 py-20 mb-32">
            <div className="max-w-3xl mx-auto text-center">
              <p className="section-label">✦ Philosophy ✦</p>
              <h2 className="font-display text-5xl font-light text-cream-100 mb-6">
                L'Art
                <br />
                <span className="gold-text italic">de l’Accueil</span>
              </h2>
              <div className="divider-gold" />
              <p className="font-body text-noir-300 text-sm leading-loose">
                Nous croyons qu’un grand repas est un dialogue entre le chef et
                son convive — une conversation menée à travers les textures, les
                saveurs et le dressage. Chaque élément dans l'assiette raconte
                l'histoire de son origine, de sa saison et des mains qui l'ont
                façonné. Chez Maison Noir, dîner n'est pas un simple acte de
                consommation. C'est une célébration de l'art.
              </p>
            </div>
          </div>

          {/* Team */}
          <div>
            <div className="text-center mb-20">
              <p className="section-label">✦ The People ✦</p>
              <h2 className="section-title">
                Nos
                <br />
                <span className="gold-text italic">Artisans</span>
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {team.map((member, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15, duration: 0.6 }}
                  className="text-center"
                >
                  <div className="relative w-48 h-48 mx-auto mb-6 overflow-hidden rounded-full border-2 border-gold-400/20">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
                      sizes="192px"
                    />
                  </div>
                  <h3 className="font-display text-xl text-cream-100 mb-1">
                    {member.name}
                  </h3>
                  <p className="font-accent text-[10px] tracking-widest uppercase text-gold-400 mb-3">
                    {member.role}
                  </p>
                  <p className="font-body text-noir-400 text-sm leading-relaxed">
                    {member.bio}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
