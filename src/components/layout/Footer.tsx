"use client";

import Link from "next/link";
import { Phone, Mail, MapPin, Clock, ChevronRight, User, ShieldCheck } from "lucide-react";
import { RESTAURANT, CONTACT, NAV_LINKS, SOCIAL_LINKS } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="bg-stone-950 text-stone-300 pt-16 pb-8 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 mb-12">
          {/* Brand & Mission */}
          <div className="flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-red-600 to-red-700 flex items-center justify-center font-black text-white text-xl shadow-md shadow-red-600/30">
                PK
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-black tracking-tight text-white uppercase leading-none">
                  The Pizza
                </span>
                <span className="text-xs font-extrabold tracking-widest text-amber-400 uppercase leading-none mt-0.5">
                  Kitchen
                </span>
              </div>
            </Link>

            <p className="text-stone-400 text-sm leading-relaxed">
              {RESTAURANT.fullTagline} Serving freshly oven-baked pizzas, crispy wings, creamy pastas, and refreshing shakes across Faisalabad.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-3 pt-1">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.id}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className="w-9 h-9 rounded-xl bg-stone-900 border border-stone-800 flex items-center justify-center text-stone-400 hover:bg-red-600 hover:text-white hover:border-red-500 transition-all"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                    <path d={social.svgPath} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-extrabold text-sm uppercase tracking-wider mb-4 border-l-2 border-red-600 pl-3">
              Explore Menu & More
            </h3>
            <ul className="flex flex-col gap-2.5 text-sm">
              {NAV_LINKS.map((link) => (
                <li key={link.id}>
                  <Link
                    href={link.href}
                    className="inline-flex items-center gap-1.5 text-stone-400 hover:text-white hover:translate-x-1 transition-all text-xs sm:text-sm"
                  >
                    <ChevronRight className="w-3.5 h-3.5 text-red-500 shrink-0" />
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/admin/login"
                  className="inline-flex items-center gap-1.5 text-stone-500 hover:text-stone-300 transition-colors text-xs pt-1"
                >
                  <User className="w-3 h-3 text-stone-600" />
                  <span>Management Login</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h3 className="text-white font-extrabold text-sm uppercase tracking-wider mb-4 border-l-2 border-red-600 pl-3">
              Visit & Contact
            </h3>
            <ul className="flex flex-col gap-3 text-xs sm:text-sm text-stone-400">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                <span>{CONTACT.address}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-red-500 shrink-0" />
                <div className="flex flex-col">
                  <a href={`tel:${CONTACT.phone1.replace(/\s+/g, "")}`} className="font-bold text-white hover:text-red-400 transition-colors">
                    UAN: {CONTACT.phone1}
                  </a>
                  <a href={`tel:${CONTACT.phone2.replace(/\s+/g, "")}`} className="hover:text-stone-300 transition-colors text-[11px] text-stone-500">
                    Mobile: {CONTACT.phone2}
                  </a>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-red-500 shrink-0" />
                <a href={`mailto:${CONTACT.email}`} className="hover:text-white transition-colors">
                  {CONTACT.email}
                </a>
              </li>
            </ul>
          </div>

          {/* Operating Hours */}
          <div>
            <h3 className="text-white font-extrabold text-sm uppercase tracking-wider mb-4 border-l-2 border-red-600 pl-3">
              Store Timings
            </h3>
            <div className="flex items-start gap-3 text-xs sm:text-sm text-stone-400 mb-4">
              <Clock className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-white">Daily Service:</p>
                <p className="mt-0.5 text-stone-300">{CONTACT.hours}</p>
              </div>
            </div>
            <div className="p-3.5 rounded-2xl bg-stone-900 border border-stone-800 text-xs text-stone-300 space-y-1">
              <div className="flex items-center gap-1.5 text-green-400 font-bold">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span>Open for Dining & Delivery</span>
              </div>
              <p className="text-[11px] text-stone-400">
                30-min delivery across Susan Road, Kohinoor, and Madina Town.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-stone-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <p>© {new Date().getFullYear()} {RESTAURANT.name}. All Rights Reserved.</p>
          <div className="flex items-center gap-4">
            <span className="hover:text-stone-400 cursor-pointer">Privacy Policy</span>
            <span>•</span>
            <span className="hover:text-stone-400 cursor-pointer">Terms of Service</span>
            <span>•</span>
            <span className="text-stone-600">Susan Road HQ, Faisalabad</span>
          </div>
        </div>
      </div>
    </footer>
  );
}