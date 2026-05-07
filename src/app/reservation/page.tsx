"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import { CheckCircle } from "lucide-react";
import toast from "react-hot-toast";
import PublicLayout from "@/components/layout/PublicLayout";
import { useCreateReservationMutation } from "@/features/api";

const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(7, "Valid phone number required"),
  date: z.string().refine((val) => {
    const d = new Date(val);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return d >= today;
  }, "Date must be today or in the future"),
  time: z.string().min(1, "Please select a time"),
  guests: z.string().min(1, "Please select guest count"),
  occasion: z.string().optional(),
  specialRequests: z.string().max(500).optional(),
});

type FormData = z.infer<typeof schema>;

const timeSlots = [
  "17:30",
  "18:00",
  "18:30",
  "19:00",
  "19:30",
  "20:00",
  "20:30",
  "21:00",
  "21:30",
  "22:00",
];
const occasions = [
  "",
  "birthday",
  "anniversary",
  "business",
  "romantic",
  "family",
  "other",
];

export default function ReservationPage() {
  const [confirmed, setConfirmed] = useState<string | null>(null);
  const [createReservation, { isLoading }] = useCreateReservationMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      const result = await createReservation({
        ...data,
        guests: parseInt(data.guests),
      }).unwrap();
      setConfirmed(result.data.confirmationCode);
      reset();
      toast.success("Reservation submitted successfully!");
    } catch (err: any) {
      toast.error(
        err?.data?.message || "Failed to create reservation. Please try again.",
      );
    }
  };

  const today = new Date().toISOString().split("T")[0];

  if (confirmed) {
    return (
      <PublicLayout>
        <section className="min-h-screen pt-40 pb-24 bg-noir-950 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center max-w-lg mx-auto px-6"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
            >
              <CheckCircle className="w-20 h-20 text-gold-400 mx-auto mb-8" />
            </motion.div>
            <h1 className="font-display text-5xl font-light text-cream-100 mb-4">
              Réservation
              <br />
              <span className="gold-text italic">Confirmée</span>
            </h1>
            <div className="divider-gold" />
            <p className="font-body text-noir-300 text-sm leading-relaxed mb-6">
              Merci d'avoir choisi Maison Noir. Nous avons bien reçu votre
              demande de réservation et vous transmettrons une confirmation par
              courriel dans les plus brefs délais.
            </p>
            <div className="bg-noir-800 border border-gold-400/20 p-6 mb-10">
              <p className="font-accent text-[10px] tracking-ultra-wide uppercase text-gold-400/60 mb-2">
                Code de Confirmation
              </p>
              <p className="font-display text-3xl text-gold-400 tracking-widest">
                {confirmed}
              </p>
            </div>
            <button
              onClick={() => setConfirmed(null)}
              className="btn-gold relative z-10 text-[11px]"
            >
              Nouvelle réservation
            </button>
          </motion.div>
        </section>
      </PublicLayout>
    );
  }

  return (
    <PublicLayout>
      <section className="relative pt-40 pb-8 bg-noir-950">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=1920&q=80"
            alt="Reserve"
            fill
            className="object-cover opacity-10"
            sizes="100vw"
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 text-center">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="section-label"
          >
            ✦ Join Us ✦
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="section-title"
          >
            Demander Une
            <br />
            <span className="gold-text italic">Réservation</span>
          </motion.h1>
          <div className="divider-gold" />
          <p className="font-body text-noir-300 text-sm max-w-md mx-auto">
            Complétez le formulaire ci-dessous. Notre équipe confirmera votre
            réservation dans un délai de 2 heures.
          </p>
        </div>
      </section>

      <section className="py-20 bg-noir-950">
        <div className="max-w-2xl mx-auto px-6 lg:px-12">
          <motion.form
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-10"
          >
            {/* Personal Info */}
            <div>
              <h2 className="font-accent text-xs tracking-ultra-wide uppercase text-gold-400 mb-6 pb-4 border-b border-noir-800">
                Vos Informations
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div>
                  <label className="label-luxury">Nom Complet *</label>
                  <input
                    {...register("name")}
                    placeholder="Mohamed Kadri"
                    className="input-luxury"
                  />
                  {errors.name && (
                    <p className="text-red-400 text-xs mt-1 font-body">
                      {errors.name.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className="label-luxury">Téléphone *</label>
                  <input
                    {...register("phone")}
                    placeholder="07 70 70 70 70"
                    className="input-luxury"
                  />
                  {errors.phone && (
                    <p className="text-red-400 text-xs mt-1 font-body">
                      {errors.phone.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="mt-8">
                <label className="label-luxury">Addresse Email *</label>
                <input
                  {...register("email")}
                  type="email"
                  placeholder="moha01@example.com"
                  className="input-luxury"
                />
                {errors.email && (
                  <p className="text-red-400 text-xs mt-1 font-body">
                    {errors.email.message}
                  </p>
                )}
              </div>
            </div>

            {/* Reservation Details */}
            <div>
              <h2 className="font-accent text-xs tracking-ultra-wide uppercase text-gold-400 mb-6 pb-4 border-b border-noir-800">
                Votre Réservation
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div>
                  <label className="label-luxury">Date *</label>
                  <input
                    {...register("date")}
                    type="date"
                    min={today}
                    className="input-luxury [color-scheme:dark]"
                  />
                  {errors.date && (
                    <p className="text-red-400 text-xs mt-1 font-body">
                      {errors.date.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className="label-luxury">Heure *</label>
                  <select
                    {...register("time")}
                    className="input-luxury bg-transparent cursor-pointer"
                  >
                    <option value="" className="bg-noir-800">
                      Choisir
                    </option>
                    {timeSlots.map((t) => (
                      <option key={t} value={t} className="bg-noir-800">
                        {t}
                      </option>
                    ))}
                  </select>
                  {errors.time && (
                    <p className="text-red-400 text-xs mt-1 font-body">
                      {errors.time.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-8">
                <div>
                  <label className="label-luxury">Nombre de personnes *</label>
                  <select
                    {...register("guests")}
                    className="input-luxury bg-transparent cursor-pointer"
                  >
                    <option value="" className="bg-noir-800">
                      Choisir
                    </option>
                    {Array.from({ length: 20 }, (_, i) => i + 1).map((n) => (
                      <option key={n} value={n} className="bg-noir-800">
                        {n} {n === 1 ? "Guest" : "Guests"}
                      </option>
                    ))}
                  </select>
                  {errors.guests && (
                    <p className="text-red-400 text-xs mt-1 font-body">
                      {errors.guests.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className="label-luxury">Occasion</label>
                  <select
                    {...register("occasion")}
                    className="input-luxury bg-transparent cursor-pointer"
                  >
                    {occasions.map((o) => (
                      <option
                        key={o}
                        value={o}
                        className="bg-noir-800 capitalize"
                      >
                        {o ? o.charAt(0).toUpperCase() + o.slice(1) : "Aucune"}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Special Requests */}
            <div>
              <label className="label-luxury">Demandes particulières</label>
              <textarea
                {...register("specialRequests")}
                rows={4}
                placeholder="Régimes, allergies, préférence de table..."
                className="input-luxury resize-none"
              />
              {errors.specialRequests && (
                <p className="text-red-400 text-xs mt-1 font-body">
                  {errors.specialRequests.message}
                </p>
              )}
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={isLoading}
                className="btn-gold-filled w-full text-[11px] disabled:opacity-50 disabled:cursor-not-allowed relative z-10"
              >
                {isLoading ? "Submitting..." : "Confirmer la demande"}
              </button>
              <p className="font-body text-noir-500 text-xs text-center mt-4">
                En réservant, vous acceptez nos conditions d'annulation. Une
                confirmation vous sera adressée par courriel.
              </p>
            </div>
          </motion.form>
        </div>
      </section>
    </PublicLayout>
  );
}
