"use client";

import Link from "next/link";
import { Phone, Mail, MapPin, Clock, ChevronRight } from "lucide-react";
import { RESTAURANT, CONTACT, NAV_LINKS, SOCIAL_LINKS } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="bg-stone-950 text-stone-300 pt-16 pb-8 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 mb-12">
          {/* Brand */}
          <div className="flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center font-black text-white text-xl">
                PK
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-black tracking-tight text-white uppercase leading-none">
                  The Pizza
                </span>
                <span className="text-xs font-extrabold tracking-widest text-amber-500 uppercase leading-none mt-0.5">
                  Kitchen
                </span>
              </div>
            </Link>
            <p className="text-stone-400 text-sm leading-relaxed mt-2">
              {RESTAURANT.fullTagline} Crafting hot, cheesy, flavor-packed pizzas and appetizers in Faisalabad.
            </p>
            <div className="flex items-center gap-3 mt-2">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.id}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className="w-9 h-9 rounded-full bg-stone-800 flex items-center justify-center text-stone-300 hover:bg-red-600 hover:text-white transition-all"
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
            <h3 className="text-white font-bold text-base uppercase tracking-wider mb-4 border-l-2 border-red-600 pl-3">
              Quick Links
            </h3>
            <ul className="flex flex-col gap-2.5 text-sm">
              {NAV_LINKS.map((link) => (
                <li key={link.id}>
                  <Link
                    href={link.href}
                    className="inline-flex items-center gap-1.5 text-stone-400 hover:text-white hover:translate-x-1 transition-all"
                  >
                    <ChevronRight className="w-3.5 h-3.5 text-red-500" />
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-bold text-base uppercase tracking-wider mb-4 border-l-2 border-red-600 pl-3">
              Get In Touch
            </h3>
            <ul className="flex flex-col gap-3 text-sm text-stone-400">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                <span>{CONTACT.address}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-red-500 shrink-0" />
                <div className="flex flex-col">
                  <a href={`tel:${CONTACT.phone1.replace(/\s+/g, "")}`} className="hover:text-white transition-colors">
                    UAN: {CONTACT.phone1}
                  </a>
                  <a href={`tel:${CONTACT.phone2.replace(/\s+/g, "")}`} className="hover:text-white transition-colors text-xs text-stone-500">
                    Mobile: {CONTACT.phone2}
                  </a>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-red-500 shrink-0" />
                <a href={`mailto:${CONTACT.email}`} className="hover:text-white transition-colors">
                  {CONTACT.email}
                </a>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h3 className="text-white font-bold text-base uppercase tracking-wider mb-4 border-l-2 border-red-600 pl-3">
              Working Hours
            </h3>
            <div className="flex items-start gap-3 text-sm text-stone-400 mb-4">
              <Clock className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-white">Daily Timings:</p>
                <p className="mt-0.5">{CONTACT.hours}</p>
              </div>
            </div>
            <div className="p-3.5 rounded-xl bg-stone-900 border border-stone-800 text-xs text-stone-400">
              <span className="text-green-400 font-bold">● We are Open!</span> Dine In, Takeaway & 30-Min Fast Delivery available.
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-stone-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <p>© {new Date().getFullYear()} {RESTAURANT.name}. All Rights Reserved.</p>
          <div className="flex items-center gap-4">
            <span className="hover:text-stone-400 cursor-pointer">Privacy Policy</span>
            <span>•</span>
            <span className="hover:text-stone-400 cursor-pointer">Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
}