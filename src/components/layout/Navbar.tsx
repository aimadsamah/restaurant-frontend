"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { toggleMobileMenu, closeMobileMenu } from "@/features/ui/uiSlice";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/menu", label: "Menu" },
  { href: "/about", label: "About" },
  { href: "/gallery", label: "Gallery" },
  { href: "/reservation", label: "Reservations" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const mobileMenuOpen = useAppSelector((s) => s.ui.mobileMenuOpen);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Fermer le menu lors du changement de page
  useEffect(() => {
    dispatch(closeMobileMenu());
  }, [pathname, dispatch]);

  // Bloquer le scroll du corps quand le menu est ouvert
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [mobileMenuOpen]);

  const isAdmin = pathname.startsWith("/admin");
  if (isAdmin) return null;

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-noir-950/95 backdrop-blur-md border-b border-noir-800"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between h-20 lg:h-24">
            {/* Logo */}
            <Link href="/" className="flex flex-col items-start group">
              <span className="font-accent text-gold-400 text-xs tracking-ultra-wide uppercase">
                Maison
              </span>
              <span className="font-display text-cream-100 text-2xl font-light leading-none tracking-widest group-hover:text-gold-400 transition-colors duration-300">
                NOIR
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-10">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`nav-link relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:bg-gold-400 after:transition-all after:duration-300 hover:after:w-full ${
                    pathname === link.href ? "text-gold-400 after:w-full" : ""
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Reserve CTA */}
            <div className="hidden lg:block">
              <Link
                href="/reservation"
                className="flex btn-gold text-[10px] relative z-10"
              >
                Réserver une Table
              </Link>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => dispatch(toggleMobileMenu())}
              className="lg:hidden text-cream-100 hover:text-gold-400 transition-colors z-50"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[45] bg-noir-950 flex flex-col items-center justify-center overflow-hidden"
            /* 
               Note: J'ai retiré le backdrop-blur ici et mis un fond plein (bg-noir-950) 
               car sur mobile, le flou sur plein écran est instable. 
               Si tu tiens absolument au flou, utilise : "bg-noir-950/98 backdrop-blur-2xl"
            */
          >
            <nav className="flex flex-col items-center gap-8 px-6 text-center">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.08 }}
                >
                  <Link
                    href={link.href}
                    className={`font-display text-4xl font-light tracking-widest hover:text-gold-400 transition-colors duration-300 ${
                      pathname === link.href
                        ? "text-gold-400"
                        : "text-cream-100"
                    }`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="pt-4"
              >
                <Link
                  href="/reservation"
                  className="flex btn-gold text-[12px] px-8 py-4 relative z-10"
                >
                  Réserver une Table
                </Link>
              </motion.div>
            </nav>

            {/* Decorative Footer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="absolute bottom-12 flex flex-col items-center gap-4"
            >
              <div className="w-px h-12 bg-gold-400/30" />
              <p className="font-accent text-[10px] tracking-ultra-wide text-gold-400/50 uppercase">
                Depuis. 2018
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
