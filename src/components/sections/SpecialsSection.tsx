"use client";

import AnimatedSection from "@/components/ui/AnimatedSection";
import SectionHeading from "@/components/ui/SectionHeading";
import { Flame, ArrowRight, MessageCircle } from "lucide-react";
import { SPECIAL_DEALS, CONTACT, formatPrice } from "@/lib/data";

export default function SpecialsSection() {
  return (
    <section id="specials" className="py-20 bg-stone-900 text-white relative overflow-hidden">
      {/* Glow Effects */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          badge="Limited Time Offers"
          title="Exclusive Deals & Feast Bundles"
          subtitle="Save big with our popular combination deals, festival specials, and family pizza feast bundles."
          light
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SPECIAL_DEALS.map((deal, idx) => (
            <AnimatedSection
              key={deal.id}
              delay={idx * 0.1}
              className="group relative flex flex-col justify-between rounded-3xl bg-stone-950/80 border border-stone-800 p-6 hover:border-red-500/50 transition-all duration-300 shadow-xl"
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

                <h3 className="text-xl font-black text-white group-hover:text-red-400 transition-colors mb-3">
                  {deal.title}
                </h3>

                <p className="text-stone-400 text-xs leading-relaxed mb-6">
                  {deal.description}
                </p>
              </div>

              <div className="pt-4 border-t border-stone-800/80 flex flex-col gap-4">
                {/* Price Section */}
                {deal.price ? (
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-black text-white">
                      {formatPrice(deal.price)}
                    </span>
                    {deal.oldPrice && (
                      <span className="text-xs text-stone-500 line-through">
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
                    `Hi! I'd like to order the deal: ${deal.title}`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-extrabold text-xs uppercase tracking-wider transition-all shadow-md shadow-red-600/20 active:scale-95"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>{deal.ctaText}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}