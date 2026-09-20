"use client";

import Link from "next/link";
import { Phone, User } from "lucide-react";
import { RESTAURANT, CONTACT, NAV_LINKS, SOCIAL_LINKS } from "@/lib/data";

function FooterLogo() {
  return (
    <div className="flex items-center gap-3 text-[#fff9e7]">
      <div className="relative flex size-10 items-center justify-center">
        <span className="absolute text-[42px] leading-none text-[#e74728]">▲</span>
        <span className="relative mt-1 text-[18px] text-[#ffd34e]">•</span>
      </div>
      <div className="leading-none">
        <div className="font-serif text-[19px] font-black tracking-tight">The Pizza</div>
        <div className="mt-0.5 text-[11px] font-bold uppercase tracking-[0.24em] text-[#e74728]">Kitchen</div>
      </div>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="mt-16 bg-[#153b2e] text-[#fff9e7]">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 lg:grid-cols-[1.3fr_1fr_1fr_1fr] lg:px-8">
        {/* Brand & Mission */}
        <div>
          <FooterLogo />
          <p className="mt-5 max-w-xs text-sm leading-7 text-white/65">
            Hand-stretched, stone-baked pizza made with local love in the heart of Faisalabad. {RESTAURANT.fullTagline}
          </p>
          <div className="mt-6 flex gap-3">
            {SOCIAL_LINKS.map((social) => (
              <a
                key={social.id}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.name}
                className="flex size-10 items-center justify-center rounded-full bg-white/10 transition hover:bg-[#e74728]"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                  <path d={social.svgPath} />
                </svg>
              </a>
            ))}
          </div>
        </div>

        {/* Visit Us */}
        <div>
          <h2 className="font-serif text-xl font-black">Visit us</h2>
          <p className="mt-4 text-sm leading-7 text-white/65">
            {CONTACT.address}
          </p>
          <a href={`tel:${CONTACT.phone1.replace(/\s+/g, "")}`} className="mt-3 block text-sm font-bold text-[#ffd34e]">
            {CONTACT.phone1}
          </a>
          <a href={`tel:${CONTACT.phone2.replace(/\s+/g, "")}`} className="mt-1 block text-sm font-bold text-[#ffd34e]">
            {CONTACT.phone2}
          </a>
        </div>

        {/* Opening Hours */}
        <div>
          <h2 className="font-serif text-xl font-black">Opening hours</h2>
          <div className="mt-4 flex flex-col gap-2 text-sm text-white/65">
            <p>
              Daily Service
              <span className="block font-bold text-white">{CONTACT.hours}</span>
            </p>
            <p className="mt-2">
              <span className="inline-flex items-center gap-1.5 text-green-400 font-bold text-xs">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                Open for Dining &amp; Delivery
              </span>
            </p>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="font-serif text-xl font-black">Quick links</h2>
          <div className="mt-4 flex flex-col items-start gap-3 text-sm font-bold text-white/65">
            {NAV_LINKS.slice(0, 4).map((link) => (
              <Link key={link.id} href={link.href} className="transition hover:text-[#ffd34e]">
                {link.label}
              </Link>
            ))}
            <Link
              href="/admin/login"
              className="mt-2 inline-flex items-center gap-1.5 text-white/40 transition hover:text-white/65 text-xs"
            >
              <User className="w-3 h-3" />
              Management Login
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10 px-5 py-5 text-center text-xs text-white/45 lg:px-8">
        © {new Date().getFullYear()} {RESTAURANT.name}. Made fresh in Faisalabad.
      </div>
    </footer>
  );
}