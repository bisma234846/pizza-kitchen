"use client";

import React from "react";
import Link from "next/link";
import { Flame, ArrowRight, MessageCircle, Sparkles, Check } from "lucide-react";
import AnimatedSection from "@/components/ui/AnimatedSection";
import SectionHeading from "@/components/ui/SectionHeading";
import { SPECIAL_DEALS, CONTACT, formatPrice } from "@/lib/data";

export default function SpecialsSection() {
  return (
    <section id="specials" className="py-16 sm:py-20 bg-stone-950 text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          badge="Limited Time Offers"
          title="Exclusive Deals & Feast Bundles"
          subtitle="Save big with our combination feast bundles, festival specials, and family pizza deals across Faisalabad."
          light
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SPECIAL_DEALS.map((deal, idx) => {
            const savings =
              deal.price && deal.oldPrice ? deal.oldPrice - deal.price : null;

            return (
              <AnimatedSection
                key={deal.id}
                delay={idx * 0.08}
                className="group relative flex flex-col justify-between rounded-3xl bg-stone-900 border border-stone-800 p-6 hover:border-red-500/60 transition-all duration-300 shadow-xl"
              >
                {/* Badge */}
                {deal.badge && (
                  <div className="absolute top-4 right-4">
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gradient-to-r from-red-600 to-amber-500 text-white text-[11px] font-black uppercase tracking-wider shadow-md">
                      <Flame className="w-3 h-3" />
                      {deal.badge}
                    </span>
                  </div>
                )}

                <div>
                  <span className="text-xs font-bold text-amber-400 uppercase tracking-widest block mb-1">
                    {deal.subtitle || "The Pizza Kitchen"}
                  </span>

                  <h3 className="text-xl font-black text-white group-hover:text-red-400 transition-colors mb-3 leading-snug">
                    {deal.title}
                  </h3>

                  <p className="text-stone-400 text-xs sm:text-sm leading-relaxed mb-5">
                    {deal.description}
                  </p>

                  {/* Savings pill if calculated */}
                  {savings && savings > 0 && (
                    <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-green-950/60 border border-green-800/50 text-green-400 text-[11px] font-extrabold mb-4">
                      <Sparkles className="w-3 h-3" />
                      <span>Save {formatPrice(savings)}</span>
                    </div>
                  )}
                </div>

                <div className="pt-4 border-t border-stone-800 flex flex-col gap-3">
                  {/* Price Section */}
                  {deal.price ? (
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-black text-white">
                        {formatPrice(deal.price)}
                      </span>
                      {deal.oldPrice && (
                        <span className="text-xs text-stone-500 line-through font-medium">
                          {formatPrice(deal.oldPrice)}
                        </span>
                      )}
                    </div>
                  ) : (
                    <span className="text-sm font-bold text-amber-400">
                      Special Discount
                    </span>
                  )}

                  {/* WhatsApp Action Button */}
                  <a
                    href={`https://wa.me/${CONTACT.whatsapp.replace("+", "")}?text=${encodeURIComponent(
                      `Hi! I want to order the deal: ${deal.title} (${deal.price ? formatPrice(deal.price) : "Special"})`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-red-600 hover:bg-red-700 active:scale-95 text-white font-extrabold text-xs uppercase tracking-wider transition-all shadow-md shadow-red-600/20 min-h-[42px]"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>{deal.ctaText || "Order Deal"}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </section>
  );
}