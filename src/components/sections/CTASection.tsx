"use client";

import AnimatedSection from "@/components/ui/AnimatedSection";
import { Phone, MessageCircle, ArrowRight, Flame } from "lucide-react";
import { CONTACT, RESTAURANT } from "@/lib/data";

export default function CTASection() {
  return (
    <section className="py-16 sm:py-20 bg-stone-950 relative overflow-hidden text-white">
      {/* Background Image Overlay */}
      <div className="absolute inset-0 z-0 opacity-25 pointer-events-none">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1574071318508-1cdbab80d002?q=80&w=1920&auto=format&fit=crop')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-red-950/90 via-stone-950/90 to-stone-950/90" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="rounded-3xl bg-gradient-to-r from-red-600 to-amber-600 p-8 sm:p-12 lg:p-16 shadow-2xl relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-8">
          {/* Subtle Glow Circle */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none" />

          {/* Text Content */}
          <AnimatedSection className="max-w-2xl text-center lg:text-left flex flex-col gap-4">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-stone-950/30 backdrop-blur-sm text-stone-100 text-xs font-black uppercase tracking-wider self-center lg:self-start">
              <Flame className="w-3.5 h-3.5 text-amber-300" />
              <span>Satisfy Your Hunger Now</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight">
              HUNGRY? <br className="hidden sm:block" />
              YOUR PIZZA IS 30 MINUTES AWAY!
            </h2>

            <p className="text-white/90 text-sm sm:text-base leading-relaxed">
              Order direct for fast delivery across Faisalabad. Freshly baked, extra cheesy, and delivered hot right to your door.
            </p>
          </AnimatedSection>

          {/* Action Buttons */}
          <AnimatedSection delay={0.2} className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto shrink-0">
            <a
              href={`https://wa.me/${CONTACT.whatsapp.replace("+", "")}?text=${encodeURIComponent(
                "Hi! I want to order pizza for delivery."
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-stone-950 text-white font-extrabold text-xs uppercase tracking-wider hover:bg-stone-900 active:scale-95 transition-all shadow-xl"
            >
              <MessageCircle className="w-4 h-4 text-green-400" />
              <span>WhatsApp Order</span>
              <ArrowRight className="w-4 h-4 text-amber-400" />
            </a>

            <a
              href={`tel:${CONTACT.phone1.replace(/\s+/g, "")}`}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white font-bold text-xs uppercase tracking-wider hover:bg-white/20 active:scale-95 transition-all"
            >
              <Phone className="w-4 h-4 text-amber-300" />
              <span>Call {CONTACT.phone1}</span>
            </a>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}