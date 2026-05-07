"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import toast from "react-hot-toast";
import PublicLayout from "@/components/layout/PublicLayout";
import { useCreateContactMutation } from "@/features/api";

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z
    .string()
    .min(20, "Message must be at least 20 characters")
    .max(1000),
});
type FormData = z.infer<typeof schema>;

const contactInfo = [
  {
    icon: MapPin,
    label: "Addresse",
    value: "12 Rue de la Paix\nParis, 75002 France",
  },
  { icon: Phone, label: "Téléphone", value: "+33 1 23 45 67 89" },
  { icon: Mail, label: "Email", value: "reservations@maisonnoir.com" },
  {
    icon: Clock,
    label: "Horaires",
    value: "Mon–Thu 6pm–11pm\nFri–Sat 5:30pm–12am\nSun 6pm–10pm",
  },
];

export default function ContactPage() {
  const [createContact, { isLoading }] = useCreateContactMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    try {
      await createContact(data).unwrap();
      toast.success("Message sent successfully! We'll be in touch soon.");
      reset();
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to send message.");
    }
  };

  return (
    <PublicLayout>
      <section className="relative pt-40 pb-16 bg-noir-950">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="section-label"
          >
            ✦ Get in Touch ✦
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="section-title"
          >
            Nous <span className="gold-text italic">Contacter</span>
          </motion.h1>
          <div className="divider-gold" />
        </div>
      </section>

      <section className="py-20 bg-noir-950">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-20">
            {/* Info */}
            <div className="lg:col-span-2">
              <h2 className="font-display text-3xl text-cream-100 font-light mb-8">
                Accès & Contact
                <br />
                <span className="gold-text italic">Maison Noir</span>
              </h2>
              <div className="space-y-8">
                {contactInfo.map(({ icon: Icon, label, value }) => (
                  <div key={label} className="flex gap-4">
                    <div className="w-10 h-10 border border-gold-400/30 flex items-center justify-center flex-shrink-0">
                      <Icon size={16} className="text-gold-400" />
                    </div>
                    <div>
                      <p className="font-accent text-[9px] tracking-ultra-wide uppercase text-gold-400/60 mb-1">
                        {label}
                      </p>
                      <p className="font-body text-cream-300 text-sm whitespace-pre-line leading-relaxed">
                        {value}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Map placeholder */}
              <div className="mt-10 relative h-48 bg-noir-800 border border-noir-700 overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin size={24} className="text-gold-400 mx-auto mb-2" />
                    <p className="font-accent text-[9px] tracking-widest uppercase text-noir-400">
                      12 Rue de la Paix, Paris
                    </p>
                  </div>
                </div>
                {/* Decorative grid */}
                <div
                  className="absolute inset-0 opacity-10"
                  style={{
                    backgroundImage:
                      "linear-gradient(#d4af37 1px, transparent 1px), linear-gradient(90deg, #d4af37 1px, transparent 1px)",
                    backgroundSize: "30px 30px",
                  }}
                />
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-3">
              <motion.form
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <div>
                    <label className="label-luxury">Nom complet *</label>
                    <input
                      {...register("name")}
                      placeholder="Votre nom"
                      className="input-luxury"
                    />
                    {errors.name && (
                      <p className="text-red-400 text-xs mt-1">
                        {errors.name.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="label-luxury">Email *</label>
                    <input
                      {...register("email")}
                      type="email"
                      placeholder="your@email.com"
                      className="input-luxury"
                    />
                    {errors.email && (
                      <p className="text-red-400 text-xs mt-1">
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                </div>
                <div>
                  <label className="label-luxury">Sujet *</label>
                  <input
                    {...register("subject")}
                    placeholder="Comment pouvons-nous vous aider ?"
                    className="input-luxury"
                  />
                  {errors.subject && (
                    <p className="text-red-400 text-xs mt-1">
                      {errors.subject.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className="label-luxury">Message *</label>
                  <textarea
                    {...register("message")}
                    rows={6}
                    placeholder="Votre message..."
                    className="input-luxury resize-none"
                  />
                  {errors.message && (
                    <p className="text-red-400 text-xs mt-1">
                      {errors.message.message}
                    </p>
                  )}
                </div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="btn-gold-filled text-[11px] w-full disabled:opacity-50"
                >
                  {isLoading ? "Sending..." : "Envoyer"}
                </button>
              </motion.form>
            </div>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
