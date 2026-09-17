"use client";

import { motion } from "framer-motion";
import { Star, Phone, ArrowRight, Flame, CheckCircle, MessageCircle } from "lucide-react";
import { useDevicePerformance } from "@/hooks/useDevicePerformance";
import { RESTAURANT, CONTACT } from "@/lib/data";

export default function HeroSection() {
  const caps = useDevicePerformance();

  return (
    <section id="home" className="relative min-h-[90vh] flex items-center justify-center bg-stone-950 overflow-hidden py-16 lg:py-24">
      {/* Background Image with Dark Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30 transform scale-105"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=1920&auto=format&fit=crop')`,
          }}
        />
        {/* Gradients for ambient light and dark readibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-stone-950 via-stone-950/90 to-stone-950/60" />
      </div>

      {/* Floating Decorative Elements (High-end devices only) */}
      {caps.enableHeavyAnimations && (
        <>
          <motion.div
            animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-20 right-[10%] hidden xl:block z-10 pointer-events-none"
          >
            <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 text-white shadow-2xl">
              <span className="text-3xl">🍕</span>
              <p className="text-xs font-bold mt-1">Freshly Baked</p>
            </div>
          </motion.div>

          <motion.div
            animate={{ y: [0, 15, 0], rotate: [0, -5, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute bottom-24 left-[5%] hidden xl:block z-10 pointer-events-none"
          >
            <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 text-white shadow-2xl flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center font-bold text-lg">
                ⚡
              </div>
              <div>
                <p className="text-xs font-bold">30-Min Delivery</p>
                <p className="text-[10px] text-stone-300">Hot at your doorstep</p>
              </div>
            </div>
          </motion.div>
        </>
      )}

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text Column */}
          <motion.div
            initial={caps.prefersReducedMotion ? false : { opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 flex flex-col gap-6 text-center lg:text-left"
          >
            {/* Top Rating & Badges */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-red-600/20 border border-red-500/30 text-red-400 text-xs font-bold uppercase tracking-wider">
                <Flame className="w-3.5 h-3.5" />
                Faisalabad's Favorite
              </span>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-stone-900/80 border border-stone-800 text-stone-300 text-xs font-medium">
                <div className="flex text-amber-400">
                  <Star className="w-3.5 h-3.5 fill-current" />
                </div>
                <span className="font-bold text-white">{RESTAURANT.rating}</span>
                <span className="text-stone-400">({RESTAURANT.reviewCount}+ Google Reviews)</span>
              </div>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-black tracking-tight text-white leading-[1.08]">
              FLAVOR FIRST. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-amber-500 to-yellow-400">
                ALWAYS.
              </span>
            </h1>

            {/* Subtitle */}
            <p className="max-w-xl mx-auto lg:mx-0 text-stone-300 text-base sm:text-lg leading-relaxed">
              Not just pizza... it's your next obsession. Oven-baked hot wings, creamy Alfredo pastas, crispy wedges & cheesy pizzas crafted to solve every craving.
            </p>

            {/* Services Available */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs font-semibold text-stone-300 my-1">
              {RESTAURANT.services.map((service) => (
                <span key={service} className="inline-flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  {service}
                </span>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
              <a
                href="/menu"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-red-600 text-white font-extrabold text-sm uppercase tracking-wider hover:bg-red-700 active:scale-95 transition-all shadow-xl shadow-red-600/30"
              >
                <span>Explore Full Menu</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href={`https://wa.me/${CONTACT.whatsapp.replace("+", "")}?text=${encodeURIComponent(
                  "Hi! I want to order from The Pizza Kitchen."
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full bg-green-600/90 hover:bg-green-600 text-white font-bold text-sm uppercase tracking-wider active:scale-95 transition-all shadow-lg shadow-green-900/20"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp Order</span>
              </a>

              <a
                href={`tel:${CONTACT.phone1.replace(/\s+/g, "")}`}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full bg-stone-900 border border-stone-800 text-stone-200 font-bold text-sm hover:bg-stone-800 hover:text-white transition-all"
              >
                <Phone className="w-4 h-4 text-red-500" />
                <span>{CONTACT.phone1}</span>
              </a>
            </div>
          </motion.div>

          {/* Right Hero Visual Card */}
          <motion.div
            initial={caps.prefersReducedMotion ? false : { opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-5 flex justify-center"
          >
            <div className="relative w-full max-w-md lg:max-w-none">
              {/* Main Card */}
              <div className="relative rounded-3xl overflow-hidden bg-gradient-to-b from-stone-900 to-stone-950 border border-stone-800 shadow-2xl p-6 sm:p-8 text-white">
                <div className="absolute top-0 right-0 w-32 h-32 bg-red-600/20 rounded-full blur-3xl pointer-events-none" />

                {/* Deal Tag */}
                <div className="inline-block px-3 py-1 rounded-full bg-amber-500 text-stone-950 font-black text-xs uppercase tracking-wider mb-4">
                  🔥 Special Offer
                </div>

                <h3 className="text-2xl sm:text-3xl font-extrabold mb-2">
                  EID FEAST NOW <br />
                  <span className="text-red-500">20% OFF</span> ENTIRE MENU
                </h3>

                <p className="text-stone-400 text-sm mb-6 leading-relaxed">
                  Dine in, Takeaway, or Direct Delivery right to your doorstep.
                </p>

                <div className="space-y-3 border-t border-stone-800/80 pt-4 text-xs text-stone-300">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-stone-400">Location</span>
                    <span className="font-bold text-white">Susan Road, Faisalabad</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-stone-400">Timings</span>
                    <span className="font-bold text-amber-400">12:00 PM – 2:00 AM</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-stone-400">Delivery UAN</span>
                    <span className="font-bold text-red-400">{CONTACT.phone1}</span>
                  </div>
                </div>

                <a
                  href="/specials"
                  className="mt-6 w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-extrabold text-xs uppercase tracking-wider transition-colors shadow-lg shadow-red-600/20"
                >
                  View All Deals
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}