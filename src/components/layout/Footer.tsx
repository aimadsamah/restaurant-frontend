import Link from "next/link";
import { Instagram, Facebook } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-noir-950 border-t border-noir-800">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex flex-col mb-6">
              <span className="font-accent text-gold-400 text-xs tracking-ultra-wide uppercase">
                Maison
              </span>
              <span className="font-display text-cream-100 text-3xl font-light leading-none tracking-widest">
                NOIR
              </span>
            </div>
            <p className="font-body text-noir-300 text-sm leading-relaxed">
              Un voyage extraordinaire entre saveurs, art et haute tradition
              culinaire.
            </p>
            <div className="flex gap-4 mt-6">
              {[Instagram, Facebook].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="text-noir-400 hover:text-gold-400 transition-colors duration-300"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-accent text-xs tracking-ultra-wide uppercase text-gold-400 mb-6">
              Explorer
            </h4>
            <ul className="space-y-3">
              {[
                ["/", "Home"],
                ["/menu", "Menu"],
                ["/about", "About"],
                ["/gallery", "Gallery"],
                ["/reservation", "Reservations"],
                ["/contact", "Contact"],
              ].map(([href, label]) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="font-body text-sm text-noir-300 hover:text-cream-100 transition-colors duration-300"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h4 className="font-accent text-xs tracking-ultra-wide uppercase text-gold-400 mb-6">
              Horaires
            </h4>
            <ul className="space-y-3 font-body text-sm text-noir-300">
              <li className="flex justify-between gap-8">
                <span>Mon – Thu</span>
                <span className="text-cream-200">6pm – 11pm</span>
              </li>
              <li className="flex justify-between gap-8">
                <span>Fri – Sat</span>
                <span className="text-cream-200">5:30pm – 12am</span>
              </li>
              <li className="flex justify-between gap-8">
                <span>Sunday</span>
                <span className="text-cream-200">6pm – 10pm</span>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-accent text-xs tracking-ultra-wide uppercase text-gold-400 mb-6">
              Nous trouver
            </h4>
            <address className="font-body text-sm text-noir-300 not-italic space-y-3">
              <p className="text-cream-200">
                12 Rue de la Paix
                <br />
                Jijel, 18000 Algérie
              </p>
              <p>
                <a
                  href="tel:+213770707070"
                  className="hover:text-gold-400 transition-colors"
                >
                  0770707070
                </a>
              </p>
              <p>
                <a
                  href="mailto:reservations@maisonnoir.com"
                  className="hover:text-gold-400 transition-colors"
                >
                  reservations@maisonnoir.com
                </a>
              </p>
            </address>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-noir-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-body text-xs text-noir-500">
            © {new Date().getFullYear()} Maison Noir. All rights reserved.
          </p>
          <div className="flex gap-6">
            <span className="font-body text-xs text-noir-500 hover:text-noir-300 cursor-pointer transition-colors">
              Privacy Policy
            </span>
            <span className="font-body text-xs text-noir-500 hover:text-noir-300 cursor-pointer transition-colors">
              Terms of Service
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
