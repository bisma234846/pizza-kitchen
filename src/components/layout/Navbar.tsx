"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, Menu, X, MessageCircle } from "lucide-react";
import { CONTACT, NAV_LINKS } from "@/lib/data";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Top Banner */}
      <div className="bg-stone-900 text-stone-300 text-xs py-2 px-4 border-b border-stone-800">
        <div className="max-w-7xl mx-auto flex justify-between items-center flex-wrap gap-2">
          <div className="flex items-center gap-4 text-[11px] sm:text-xs">
            <span>📍 {CONTACT.addressShort}</span>
            <span className="hidden md:inline text-stone-600">|</span>
            <span className="hidden md:inline">🕒 {CONTACT.hours}</span>
          </div>
          <div className="flex items-center gap-3">
            <a
              href={`tel:${CONTACT.phone1.replace(/\s+/g, "")}`}
              className="inline-flex items-center gap-1 hover:text-white transition-colors"
            >
              <Phone className="w-3 h-3 text-red-500" />
              <span>UAN: {CONTACT.phone1}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Sticky Navbar */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          scrolled
            ? "bg-stone-900/95 backdrop-blur-md shadow-lg shadow-black/10 py-3"
            : "bg-stone-900 py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center font-black text-white text-xl shadow-md shadow-red-600/30 group-hover:scale-105 transition-transform">
              PK
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-black tracking-tight text-white uppercase leading-none group-hover:text-red-500 transition-colors">
                The Pizza
              </span>
              <span className="text-xs font-extrabold tracking-widest text-amber-500 uppercase leading-none mt-0.5">
                Kitchen
              </span>
            </div>
          </Link>

          {/* Desktop Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.id}
                href={link.href}
                className={`px-3.5 py-2 rounded-full text-sm font-semibold transition-all ${
                  isActive(link.href)
                    ? "bg-red-600 text-white"
                    : "text-stone-200 hover:text-white hover:bg-stone-800"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTAs */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href={`https://wa.me/${CONTACT.whatsapp.replace("+", "")}?text=${encodeURIComponent(
                "Hi! I would like to place an order from your website."
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-green-600 text-white text-xs font-bold uppercase tracking-wider hover:bg-green-700 active:scale-95 transition-all shadow-md shadow-green-900/20"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Order</span>
            </a>
            <Link
              href="/menu"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-red-600 text-white text-xs font-bold uppercase tracking-wider hover:bg-red-700 active:scale-95 transition-all shadow-md shadow-red-900/30"
            >
              Order Online
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
            className="md:hidden p-2 rounded-lg text-stone-200 hover:text-white hover:bg-stone-800 transition-colors"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-[105px] z-30 bg-stone-900 border-b border-stone-800 shadow-2xl p-6 md:hidden flex flex-col gap-4"
          >
            <nav className="flex flex-col gap-2">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.id}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-4 py-3 rounded-xl text-base font-semibold transition-colors ${
                    isActive(link.href)
                      ? "bg-red-600 text-white"
                      : "text-stone-200 hover:text-white hover:bg-stone-800"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="pt-4 border-t border-stone-800 flex flex-col gap-3">
              <a
                href={`https://wa.me/${CONTACT.whatsapp.replace("+", "")}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-green-600 text-white font-bold text-sm uppercase tracking-wide hover:bg-green-700 transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp Order
              </a>
              <a
                href={`tel:${CONTACT.phone1.replace(/\s+/g, "")}`}
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-red-600 text-white font-bold text-sm uppercase tracking-wide hover:bg-red-700 transition-colors"
              >
                <Phone className="w-4 h-4" />
                Call UAN: {CONTACT.phone1}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}