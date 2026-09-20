"use client";

import React from "react";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { Phone, MessageCircle, ArrowRight, Flame } from "lucide-react";
import { CONTACT } from "@/lib/data";

export default function CTASection() {
  return (
    <section className="bg-[#fffaf0] py-14 sm:py-18 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <div className="rounded-[2rem] bg-[#153b2e] p-8 sm:p-12 lg:p-14 shadow-2xl relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-8">
          {/* Text Content */}
          <AnimatedSection className="max-w-2xl text-center lg:text-left flex flex-col gap-3.5">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/10 text-[#ffd34e] text-xs font-black uppercase tracking-wider self-center lg:self-start">
              <Flame className="w-3.5 h-3.5 text-[#ffd34e]" />
              <span>Satisfy Your Hunger Now</span>
            </div>

            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[#fff9e7] leading-tight font-serif">
              Hungry? <br className="hidden sm:block" />
              Your pizza is 30 minutes away!
            </h2>

            <p className="text-white/70 text-sm sm:text-base leading-relaxed max-w-lg">
              Order direct for fast delivery across Faisalabad. Hand-tossed, extra cheesy, and delivered piping hot straight to your door.
            </p>
          </AnimatedSection>

          {/* Action Buttons */}
          <AnimatedSection delay={0.15} className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto shrink-0">
            <a
              href={`https://wa.me/${CONTACT.whatsapp.replace("+", "")}?text=${encodeURIComponent(
                "Hi! I want to order pizza for delivery."
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-[#e74728] text-white font-black text-sm uppercase tracking-wider hover:bg-[#ffd34e] hover:text-[#153b2e] active:scale-95 transition-all shadow-xl min-h-[48px]"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Order</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <a
              href={`tel:${CONTACT.phone1.replace(/\s+/g, "")}`}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full bg-white/10 border border-white/20 text-[#fff9e7] font-bold text-sm uppercase tracking-wider hover:bg-white/20 active:scale-95 transition-all min-h-[48px]"
            >
              <Phone className="w-4 h-4 text-[#ffd34e]" />
              <span>Call {CONTACT.phone1}</span>
            </a>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}