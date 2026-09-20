"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Star, ArrowRight, Flame, Check } from "lucide-react";
import { useDevicePerformance } from "@/hooks/useDevicePerformance";
import { RESTAURANT } from "@/lib/data";

export default function HeroSection() {
  const caps = useDevicePerformance();

  return (
    <>
      {/* Hero Section */}
      <section
        id="home"
        className="bg-[#fffaf0] overflow-hidden"
      >
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 pb-20 pt-12 lg:grid-cols-[0.9fr_1.1fr] lg:px-8 lg:pb-28 lg:pt-20">
          {/* Left Text Column */}
          <motion.div
            initial={caps.prefersReducedMotion ? false : { opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Top Badge */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-[#f9e9bb] px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-[#a74721]">
              <Flame className="size-4" /> Fired fresh in Faisalabad
            </div>

            {/* Main Headline */}
            <h1 className="max-w-xl font-serif text-6xl font-black leading-[.92] tracking-[-0.05em] text-[#153b2e] md:text-8xl">
              Good food.<br />
              <span className="text-[#e74728]">Good mood.</span>
            </h1>

            {/* Subtitle */}
            <p className="mt-7 max-w-md text-lg leading-8 text-[#61766b]">
              Hand-stretched, stone-baked pizza made with local love and a little Italian soul. Your next favourite slice is waiting.
            </p>

            {/* Action Buttons */}
            <div className="mt-9 flex flex-wrap gap-3">
              <Link
                href="/menu"
                className="inline-flex items-center gap-3 rounded-full bg-[#e74728] px-6 py-4 text-sm font-black text-white shadow-[0_12px_25px_rgba(231,71,40,.2)] transition hover:-translate-y-0.5"
              >
                Order your pizza <ArrowRight className="size-4" />
              </Link>
              <button
                onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
                className="rounded-full border border-[#cfdacc] px-6 py-4 text-sm font-black text-[#153b2e]"
              >
                Our story
              </button>
            </div>

            {/* Trust Indicators */}
            <div className="mt-12 flex items-center gap-6 text-sm text-[#61766b]">
              <span className="flex items-center gap-2">
                <Star className="size-4 fill-[#f1a32b] text-[#f1a32b]" /> {RESTAURANT.rating} rating
              </span>
              <span className="h-5 w-px bg-[#d9d5c6]" />
              <span>30 min delivery</span>
            </div>
          </motion.div>

          {/* Right Hero Visual */}
          <motion.div
            initial={caps.prefersReducedMotion ? false : { opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="relative"
          >
            <div className="absolute -inset-4 rounded-[2.5rem] bg-[#f6bc42]/20 blur-2xl" />
            <div className="relative overflow-hidden rounded-[2rem] rounded-br-[7rem] shadow-[0_28px_60px_rgba(22,59,46,.18)]">
              <Image
                src="/pizza-hero.png"
                alt="Fresh bubbling pepperoni pizza"
                width={800}
                height={600}
                className="aspect-[4/3] w-full object-cover"
                priority
              />
              <div className="absolute bottom-5 left-5 flex items-center gap-3 rounded-2xl bg-[#fffaf0]/95 px-4 py-3 shadow-lg">
                <span className="flex size-10 items-center justify-center rounded-full bg-[#ffd34e] text-xl">✦</span>
                <div>
                  <div className="text-xs font-bold text-[#70847a]">Made with love</div>
                  <div className="font-serif text-base font-black text-[#153b2e]">Since 2018, Faisalabad</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Confidence Strip */}
      <section className="bg-[#153b2e] py-5 text-[#fff9e7]">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-12 gap-y-3 px-5 text-center text-sm font-bold sm:justify-between lg:px-8">
          <span className="flex items-center gap-2">
            <Check className="size-4 text-[#ffd34e]" /> 100% fresh dough
          </span>
          <span className="flex items-center gap-2">
            <Check className="size-4 text-[#ffd34e]" /> No frozen toppings
          </span>
          <span className="flex items-center gap-2">
            <Check className="size-4 text-[#ffd34e]" /> Free delivery over Rs. 2,000
          </span>
        </div>
      </section>
    </>
  );
}