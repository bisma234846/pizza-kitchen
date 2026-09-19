"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Phone,
  Menu,
  X,
  MessageCircle,
  ShoppingBag,
  User,
  Clock,
  MapPin,
  ArrowRight,
} from "lucide-react";
import { CONTACT, NAV_LINKS } from "@/lib/data";
import { useCustomerCart } from "@/context/CustomerCartContext";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { openCart, totalItemsCount } = useCustomerCart();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Top Banner Notice */}
      <div className="bg-stone-950 text-stone-300 text-xs py-2 px-4 border-b border-stone-800">
        <div className="max-w-7xl mx-auto flex justify-between items-center flex-wrap gap-2">
          <div className="flex items-center gap-4 text-[11px] sm:text-xs">
            <span className="inline-flex items-center gap-1.5 text-stone-300">
              <MapPin className="w-3.5 h-3.5 text-red-500 shrink-0" />
              <span>{CONTACT.addressShort}</span>
            </span>
            <span className="hidden md:inline text-stone-700">|</span>
            <span className="hidden md:inline-flex items-center gap-1.5 text-stone-400">
              <Clock className="w-3.5 h-3.5 text-amber-500 shrink-0" />
              <span>Daily: {CONTACT.hours}</span>
            </span>
          </div>

          <div className="flex items-center gap-4 text-[11px] sm:text-xs">
            <a
              href={`tel:${CONTACT.phone1.replace(/\s+/g, "")}`}
              className="inline-flex items-center gap-1.5 text-stone-300 hover:text-white transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-red-500 shrink-0" />
              <span className="font-bold">UAN: {CONTACT.phone1}</span>
            </a>

            <span className="hidden sm:inline text-stone-700">|</span>

            <Link
              href="/admin/login"
              className="hidden sm:inline-flex items-center gap-1 text-stone-400 hover:text-white transition-colors text-[11px]"
              title="Management & Staff Portal"
            >
              <User className="w-3 h-3 text-stone-500" />
              <span>Staff Login</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Sticky Navbar */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          scrolled
            ? "bg-stone-900/95 backdrop-blur-md shadow-lg shadow-black/15 py-3"
            : "bg-stone-900 py-3.5 sm:py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-3">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-2.5 group shrink-0">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-red-600 to-red-700 flex items-center justify-center font-black text-white text-lg shadow-md shadow-red-600/30 group-hover:scale-105 transition-transform">
              PK
            </div>
            <div className="flex flex-col">
              <span className="text-base sm:text-lg font-black tracking-tight text-white uppercase leading-none group-hover:text-red-500 transition-colors">
                The Pizza
              </span>
              <span className="text-[10px] sm:text-xs font-extrabold tracking-widest text-amber-400 uppercase leading-none mt-0.5">
                Kitchen
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.id}
                href={link.href}
                className={`px-3.5 py-2 rounded-full text-xs xl:text-sm font-bold transition-all ${
                  isActive(link.href)
                    ? "bg-red-600 text-white shadow-sm"
                    : "text-stone-300 hover:text-white hover:bg-stone-800"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop Actions (Cart, Login, Order Now) */}
          <div className="hidden md:flex items-center gap-2.5 shrink-0">
            {/* Cart Button */}
            <button
              onClick={openCart}
              aria-label={`View Cart with ${totalItemsCount} items`}
              className="px-3.5 py-2 rounded-full bg-stone-800 hover:bg-stone-750 text-stone-200 hover:text-white transition-all relative flex items-center gap-2 cursor-pointer border border-stone-700/60"
            >
              <ShoppingBag className="w-4 h-4 text-red-500" />
              <span className="text-xs font-bold">Cart</span>
              {totalItemsCount > 0 ? (
                <span className="px-1.5 py-0.5 rounded-full bg-red-600 text-white text-[10px] font-black min-w-[18px] text-center">
                  {totalItemsCount}
                </span>
              ) : (
                <span className="w-2 h-2 rounded-full bg-stone-600" />
              )}
            </button>

            {/* Login Link */}
            <Link
              href="/admin/login"
              aria-label="Management Login"
              className="p-2.5 rounded-full bg-stone-800 hover:bg-stone-700 text-stone-200 hover:text-white transition-colors"
              title="Management Login"
            >
              <User className="w-4 h-4" />
            </Link>

            {/* WhatsApp CTA */}
            <a
              href={`https://wa.me/${CONTACT.whatsapp.replace("+", "")}?text=${encodeURIComponent(
                "Hi! I would like to place an order from The Pizza Kitchen."
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-green-600 hover:bg-green-700 active:scale-95 text-white text-xs font-extrabold uppercase tracking-wider transition-all shadow-md shadow-green-900/20"
            >
              <MessageCircle className="w-4 h-4" />
              <span className="hidden xl:inline">WhatsApp</span>
            </a>

            {/* Order Online Primary CTA */}
            <Link
              href="/menu"
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-red-600 hover:bg-red-700 active:scale-95 text-white text-xs font-black uppercase tracking-wider transition-all shadow-md shadow-red-600/30"
            >
              <span>Order Now</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Mobile Right Icons (Cart + Hamburger) */}
          <div className="flex md:hidden items-center gap-2">
            {/* Mobile Cart Button */}
            <button
              onClick={openCart}
              aria-label={`View Cart with ${totalItemsCount} items`}
              className="p-2.5 rounded-xl bg-stone-800 text-stone-200 hover:text-white transition-colors relative flex items-center justify-center cursor-pointer min-w-[44px] min-h-[44px]"
            >
              <ShoppingBag className="w-5 h-5 text-red-500" />
              {totalItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 px-1.5 py-0.2 rounded-full bg-red-600 text-white text-[10px] font-black shadow-xs">
                  {totalItemsCount}
                </span>
              )}
            </button>

            {/* Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Navigation Menu"
              className="p-2.5 rounded-xl bg-stone-800 text-stone-200 hover:text-white transition-colors cursor-pointer min-w-[44px] min-h-[44px] flex items-center justify-center"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-x-0 top-[102px] z-40 bg-stone-900/98 backdrop-blur-xl border-b border-stone-800 shadow-2xl p-6 md:hidden flex flex-col gap-4 overflow-y-auto max-h-[calc(100vh-102px)]"
          >
            {/* Navigation Links */}
            <nav className="flex flex-col gap-1.5">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.id}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-4 py-3 rounded-2xl text-sm font-bold transition-all flex items-center justify-between min-h-[44px] ${
                    isActive(link.href)
                      ? "bg-red-600 text-white shadow-sm"
                      : "text-stone-300 hover:text-white hover:bg-stone-800"
                  }`}
                >
                  <span>{link.label}</span>
                  {isActive(link.href) && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                </Link>
              ))}
            </nav>

            {/* Actions & Buttons in Mobile Drawer */}
            <div className="pt-4 border-t border-stone-800 flex flex-col gap-2.5">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openCart();
                }}
                className="w-full flex items-center justify-between px-4 py-3 rounded-2xl bg-stone-800 text-white font-bold text-xs uppercase tracking-wider transition-colors min-h-[44px]"
              >
                <div className="flex items-center gap-2">
                  <ShoppingBag className="w-4 h-4 text-red-500" />
                  <span>View Current Order Cart</span>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-red-600 text-white text-[10px] font-black">
                  {totalItemsCount}
                </span>
              </button>

              <Link
                href="/menu"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-black text-xs uppercase tracking-wider transition-colors shadow-md shadow-red-600/30 min-h-[44px]"
              >
                <span>Explore Full Menu & Order</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <a
                href={`https://wa.me/${CONTACT.whatsapp.replace("+", "")}?text=${encodeURIComponent(
                  "Hi! I want to order from The Pizza Kitchen."
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-green-600 hover:bg-green-700 text-white font-extrabold text-xs uppercase tracking-wider transition-colors min-h-[44px]"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp Order Desk</span>
              </a>

              <a
                href={`tel:${CONTACT.phone1.replace(/\s+/g, "")}`}
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl bg-stone-800 text-stone-200 font-bold text-xs uppercase tracking-wider hover:bg-stone-700 transition-colors min-h-[44px]"
              >
                <Phone className="w-3.5 h-3.5 text-red-500" />
                <span>Call Hotline: {CONTACT.phone1}</span>
              </a>

              {/* Login / Portal Link */}
              <Link
                href="/admin/login"
                onClick={() => setMobileMenuOpen(false)}
                className="pt-2 text-center text-xs font-semibold text-stone-400 hover:text-white flex items-center justify-center gap-1.5 min-h-[40px]"
              >
                <User className="w-3.5 h-3.5 text-stone-500" />
                <span>Management / Staff Portal</span>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}