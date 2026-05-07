"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useGetMenuItemsQuery } from "@/features/api";

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] },
  }),
};

function SkeletonCard() {
  return (
    <div className="card-luxury overflow-hidden">
      <div className="skeleton h-64 w-full" />
      <div className="p-6 space-y-3">
        <div className="skeleton h-4 w-3/4" />
        <div className="skeleton h-3 w-full" />
        <div className="skeleton h-3 w-2/3" />
      </div>
    </div>
  );
}

export default function SignatureDishes() {
  const { data, isLoading } = useGetMenuItemsQuery({
    featured: "true",
    limit: 3,
  });

  const dishes = data?.data?.items?.slice(0, 3) ?? [];

  // Fonction pour formater l'URL de l'image
  // const getImageUrl = (imagePath: string) => {
  //   if (!imagePath)
  //     return "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80";

  //   if (imagePath.startsWith("http")) return imagePath;

  //   // On utilise UPLOADS_URL car il n'a pas le "/api" à la fin
  //   const baseUrl =
  //     process.env.NEXT_PUBLIC_UPLOADS_URL || "http://localhost:5000";

  //   // On nettoie pour éviter les doubles slashes (//)
  //   const cleanBaseUrl = baseUrl.endsWith("/") ? baseUrl.slice(0, -1) : baseUrl;

  //   return `${cleanBaseUrl}${imagePath}`;
  // };

  const getImageUrl = (imagePath: string) => {
    if (!imagePath) {
      return "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80";
    }

    // SI l'image vient de Cloudinary (elle commence par http)
    // ON LA RETOURNE TELLE QUELLE !
    if (imagePath.startsWith("http")) {
      return imagePath;
    }

    // Ancienne logique pour les vieilles images locales (à garder temporairement)
    const baseUrl =
      process.env.NEXT_PUBLIC_UPLOADS_URL || "http://localhost:5000";
    return `${baseUrl.endsWith("/") ? baseUrl.slice(0, -1) : baseUrl}${imagePath}`;
  };

  return (
    <section className="py-32 bg-noir-950">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="text-center mb-20">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="section-label"
          >
            ✦ Chef's Selection ✦
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="section-title"
          >
            Les Plats
            <br />
            <span className="gold-text italic">Signatures</span>
          </motion.h2>
          <div className="divider-gold" />
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="font-body text-noir-300 max-w-xl mx-auto text-sm leading-relaxed"
          >
            Chaque plat incarne notre philosophie : l'excellence des produits de
            saison, la rigueur de la préparation et la passion du service.
          </motion.p>
        </div>

        {/* Dishes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {isLoading
            ? Array.from({ length: 3 }).map((_, i) => <SkeletonCard key={i} />)
            : dishes.map((dish: any, i: number) => (
                <motion.div
                  key={dish._id}
                  custom={i}
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="card-luxury overflow-hidden group cursor-pointer"
                >
                  <div className="relative h-72 overflow-hidden">
                    <Image
                      src={getImageUrl(dish.image)}
                      alt={dish.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, 33vw"
                      unoptimized={true} // Optionnel: aide si tu as des problèmes de configuration de domaine
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-noir-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    {dish.featured && (
                      <div className="absolute top-4 left-4 bg-gold-400 text-noir-950 font-accent text-[9px] tracking-widest uppercase px-3 py-1">
                        Chef's Choice
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="font-display text-xl text-cream-100 font-light leading-tight">
                        {dish.name}
                      </h3>
                      <span className="price-tag ml-4 whitespace-nowrap">
                        ${dish.price}
                      </span>
                    </div>
                    <p className="font-body text-noir-300 text-sm leading-relaxed line-clamp-3">
                      {dish.description}
                    </p>
                    {dish.tags && dish.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-4">
                        {dish.tags.slice(0, 2).map((tag: string) => (
                          <span
                            key={tag}
                            className="font-accent text-[9px] tracking-widest uppercase text-gold-400/70 border border-gold-400/20 px-2 py-1"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="flex text-center mt-16 justify-center"
        >
          <Link href="/menu" className="btn-gold relative z-10 text-[11px]">
            Découvrir le menu complet
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
