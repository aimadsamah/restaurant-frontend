"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

export default function ReservationCTA() {
  return (
    <section className="relative py-40 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=1920&q=80"
          alt="Reserve a table"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-noir-950/80" />
      </div>

      {/* Decorative gold lines */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-400/50 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-400/50 to-transparent" />

      <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="section-label"
        >
          ✦ Join Us ✦
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="font-display text-6xl md:text-7xl font-light text-cream-50 leading-none mb-6"
        >
          Reserve Your
          <br />
          <span className="gold-text italic">Evening</span>
        </motion.h2>
        <div className="divider-gold" />
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="font-body text-noir-300 text-sm leading-relaxed mb-12 max-w-md mx-auto"
        >
          Secure your table for an unforgettable dining experience. We
          accommodate groups from two to twenty guests.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link href="/reservation" className="btn-gold-filled text-[11px]">
            Make a Reservation
          </Link>
          <Link href="/contact" className="btn-gold relative z-10 text-[11px]">
            Contact Us
          </Link>
        </motion.div>

        {/* Contact info */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-16 flex flex-col sm:flex-row gap-8 justify-center"
        >
          {[
            { label: "Phone", value: "+33 1 23 45 67 89" },
            { label: "Email", value: "reservations@maisonnoir.com" },
          ].map(({ label, value }) => (
            <div key={label} className="text-center">
              <p className="font-accent text-[9px] tracking-ultra-wide uppercase text-gold-400/60 mb-1">
                {label}
              </p>
              <p className="font-body text-cream-300 text-sm">{value}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
