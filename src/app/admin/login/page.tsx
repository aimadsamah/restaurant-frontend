"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useLoginMutation } from "@/features/api";
import { setCredentials } from "@/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";

const schema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(1, "Password required"),
});
type FormData = z.infer<typeof schema>;

export default function AdminLoginPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector((s) => s.auth.isAuthenticated);
  const [login, { isLoading }] = useLoginMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  useEffect(() => {
    if (isAuthenticated) router.push("/admin");
  }, [isAuthenticated, router]);

  const onSubmit = async (data: FormData) => {
    try {
      const result = await login(data).unwrap();
      dispatch(
        setCredentials({ token: result.data.token, user: result.data.user }),
      );
      toast.success(`Welcome back, ${result.data.user.name}!`);
      router.push("/admin");
    } catch (err: any) {
      toast.error(err?.data?.message || "Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen bg-noir-950 flex items-center justify-center px-6">
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 25% 25%, #d4af37 0%, transparent 50%), radial-gradient(circle at 75% 75%, #d4af37 0%, transparent 50%)",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-12">
          <span className="font-accent text-gold-400 text-xs tracking-ultra-wide uppercase">
            Maison
          </span>
          <h1 className="font-display text-5xl font-light text-cream-100 tracking-widest">
            NOIR
          </h1>
          <div className="divider-gold" />
          <p className="font-accent text-[10px] tracking-ultra-wide uppercase text-noir-400">
            Admin Portal
          </p>
        </div>

        <div className="bg-noir-900 border border-noir-700 p-10">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <div>
              <label className="label-luxury">Email Address</label>
              <input
                {...register("email")}
                type="email"
                placeholder="admin@maisonnoir.com"
                className="input-luxury"
                autoComplete="email"
              />
              {errors.email && (
                <p className="text-red-400 text-xs mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div>
              <label className="label-luxury">Password</label>
              <input
                {...register("password")}
                type="password"
                placeholder="••••••••"
                className="input-luxury"
                autoComplete="current-password"
              />
              {errors.password && (
                <p className="text-red-400 text-xs mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="btn-gold-filled w-full text-[11px] mt-4 disabled:opacity-50"
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </button>
          </form>
        </div>

        <p className="text-center font-body text-noir-600 text-xs mt-6">
          Restricted access. Authorized personnel only.
        </p>
      </motion.div>
    </div>
  );
}
