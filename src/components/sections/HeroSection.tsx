"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Star, ArrowRight, Flame, CheckCircle, MessageCircle, ShoppingBag } from "lucide-react";
import { useDevicePerformance } from "@/hooks/useDevicePerformance";
import { useCustomerCart } from "@/context/CustomerCartContext";
import { RESTAURANT, CONTACT } from "@/lib/data";

export default function HeroSection() {
  const caps = useDevicePerformance();
  const { openCart } = useCustomerCart();

  return (
    <section
      id="home"
      className="relative min-h-[85vh] lg:min-h-[90vh] flex items-center justify-center bg-stone-950 overflow-hidden py-14 sm:py-18 lg:py-24 text-white"
    >
      {/* Background Image with Dark Tint Overlay */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-25 transform scale-105"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=1920&auto=format&fit=crop')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/85 to-stone-950/70" />
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Text Column */}
          <motion.div
            initial={caps.prefersReducedMotion ? false : { opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7 flex flex-col gap-5 text-center lg:text-left"
          >
            {/* Top Rating & Badges */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-red-600/20 border border-red-500/40 text-red-400 text-xs font-black uppercase tracking-wider">
                <Flame className="w-3.5 h-3.5 text-red-500" />
                Susan Road, Faisalabad
              </span>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-stone-900 border border-stone-800 text-stone-300 text-xs font-semibold">
                <div className="flex text-amber-400">
                  <Star className="w-3.5 h-3.5 fill-current" />
                </div>
                <span className="font-extrabold text-white">{RESTAURANT.rating}</span>
                <span className="text-stone-400">({RESTAURANT.reviewCount}+ Google Reviews)</span>
              </div>
            </div>

            {/* Main Headline */}
            <h1 className="text-3.5xl sm:text-5xl md:text-6xl xl:text-7xl font-black tracking-tight text-white leading-[1.08]">
              FLAVOR FIRST. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-amber-400 to-amber-300">
                ALWAYS.
              </span>
            </h1>

            {/* Subtitle */}
            <p className="max-w-xl mx-auto lg:mx-0 text-stone-300 text-sm sm:text-base md:text-lg leading-relaxed">
              Faisalabad's favorite pizza destination. Hand-kneaded dough, rich mozzarella blends, oven-baked hot wings, and creamy pastas crafted to solve every craving.
            </p>

            {/* Services Available */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4 text-xs font-bold text-stone-300 my-1">
              {RESTAURANT.services.map((service) => (
                <span key={service} className="inline-flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5 text-green-500" />
                  {service}
                </span>
              ))}
              <span className="inline-flex items-center gap-1.5 text-amber-400">
                ⚡ 30-Min Delivery
              </span>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-2">
              {/* Primary Order Now Button */}
              <Link
                href="/menu"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-red-600 hover:bg-red-700 active:scale-95 text-white font-black text-xs sm:text-sm uppercase tracking-wider transition-all shadow-lg shadow-red-600/30 min-h-[48px]"
              >
                <span>Order Now</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              {/* Browse Menu Secondary Button */}
              <Link
                href="/menu"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full bg-stone-900 border border-stone-700 hover:border-stone-500 hover:bg-stone-800 text-stone-200 font-bold text-xs sm:text-sm uppercase tracking-wider transition-all min-h-[48px]"
              >
                <ShoppingBag className="w-4 h-4 text-amber-400" />
                <span>Browse Menu</span>
              </Link>

              {/* WhatsApp Quick Order */}
              <a
                href={`https://wa.me/${CONTACT.whatsapp.replace("+", "")}?text=${encodeURIComponent(
                  "Hi! I want to order from The Pizza Kitchen."
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full bg-green-600/90 hover:bg-green-600 text-white font-bold text-xs sm:text-sm uppercase tracking-wider active:scale-95 transition-all shadow-md min-h-[48px]"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp</span>
              </a>
            </div>
          </motion.div>

          {/* Right Hero Visual Card */}
          <motion.div
            initial={caps.prefersReducedMotion ? false : { opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="lg:col-span-5 flex justify-center"
          >
            <div className="relative w-full max-w-md">
              <div className="relative rounded-3xl overflow-hidden bg-stone-900 border border-stone-800 shadow-2xl p-6 sm:p-8 text-white">
                <div className="inline-block px-3 py-1 rounded-full bg-amber-500 text-stone-950 font-black text-xs uppercase tracking-wider mb-4">
                  🔥 Special Offer
                </div>

                <h3 className="text-2xl sm:text-3xl font-black mb-2 leading-tight">
                  EID & FAMILY FEAST <br />
                  <span className="text-red-500">20% OFF</span> ENTIRE MENU
                </h3>

                <p className="text-stone-400 text-xs sm:text-sm mb-6 leading-relaxed">
                  Dine in, Takeaway, or Direct 30-Min Delivery right across Faisalabad.
                </p>

                <div className="space-y-3 border-t border-stone-800 pt-4 text-xs text-stone-300">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-stone-400">Location</span>
                    <span className="font-bold text-white">Susan Road, Faisalabad</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-stone-400">Operating Hours</span>
                    <span className="font-bold text-amber-400">12:00 PM – 2:00 AM</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-stone-400">Delivery Hotline</span>
                    <span className="font-bold text-red-400">{CONTACT.phone1}</span>
                  </div>
                </div>

                <Link
                  href="/specials"
                  className="mt-6 w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-black text-xs uppercase tracking-wider transition-colors shadow-md shadow-red-600/20"
                >
                  <span>Explore Feast Deals</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}