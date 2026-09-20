"use client";

import React from "react";
import { MessageCircle, ArrowRight, Sparkles } from "lucide-react";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { SPECIAL_DEALS, CONTACT, formatPrice } from "@/lib/data";

export default function SpecialsPageContent() {
  return (
    <section className="bg-[#fffaf0]">
      <div className="mx-auto max-w-7xl px-5 py-12 lg:px-8 lg:py-16">
        {/* Page Header */}
        <div className="max-w-2xl">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-[#e74728]">
            Good things come in boxes
          </p>
          <h1 className="mt-3 font-serif text-6xl font-black tracking-tight text-[#153b2e]">
            Deals worth sharing.
          </h1>
          <p className="mt-5 text-lg leading-8 text-[#61766b]">
            More pizza, more sides, more reasons to gather around the table. Freshly made combos for every kind of craving.
          </p>
        </div>

        {/* Deal Cards Grid */}
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {SPECIAL_DEALS.map((deal, idx) => {
            const savings =
              deal.price && deal.oldPrice ? deal.oldPrice - deal.price : null;

            return (
              <AnimatedSection
                key={deal.id}
                delay={idx * 0.08}
                className="group overflow-hidden rounded-[1.75rem] border border-[#eadfca] bg-white shadow-[0_12px_35px_rgba(38,60,45,.07)] flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(38,60,45,.12)]"
              >
                {/* Food Image Banner */}
                <div className="relative overflow-hidden bg-[#f7edcf]">
                  <img
                    src={deal.image}
                    alt={deal.title}
                    className="aspect-[1.25] w-full object-cover transition duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  {deal.badge && (
                    <span className="absolute left-4 top-4 rounded-full bg-[#ffd34e] px-3 py-1 text-[10px] font-black uppercase tracking-widest text-[#153b2e] shadow-xs">
                      {deal.badge}
                    </span>
                  )}
                </div>

                <div className="p-6 flex flex-col flex-1 justify-between">
                  <div>
                    {/* Title */}
                    <h2 className="font-serif text-3xl font-black text-[#153b2e]">
                      {deal.title}
                    </h2>

                    {/* Subtitle */}
                    {deal.subtitle && (
                      <p className="mt-1 text-xs font-bold text-[#e74728] uppercase tracking-wider">
                        {deal.subtitle}
                      </p>
                    )}

                    {/* Description */}
                    <p className="mt-3 min-h-14 text-sm leading-6 text-[#74867b]">
                      {deal.description}
                    </p>
                  </div>

                  {/* Savings */}
                  {savings && savings > 0 && (
                    <div className="mt-3 inline-flex items-center gap-1 rounded-full bg-[#edf4df] px-3 py-1 text-xs font-black text-[#4e853e]">
                      <Sparkles className="size-3" />
                      Save {formatPrice(savings)}
                    </div>
                  )}

                  {/* Price */}
                  <div className="mt-5 flex items-end justify-between gap-3">
                    {deal.price ? (
                      <div>
                        <span className="text-2xl font-black text-[#e74728]">
                          {formatPrice(deal.price)}
                        </span>
                        {deal.oldPrice && (
                          <span className="ml-2 text-sm text-[#9aa89f] line-through">
                            {formatPrice(deal.oldPrice)}
                          </span>
                        )}
                      </div>
                    ) : (
                      <span className="text-lg font-black text-[#e74728]">
                        Special Discount
                      </span>
                    )}
                    {savings && savings > 0 && (
                      <span className="rounded-full bg-[#edf4df] px-3 py-1 text-xs font-black text-[#4e853e]">Save</span>
                    )}
                  </div>

                  {/* Order Button */}
                  <a
                    href={`https://wa.me/${CONTACT.whatsapp.replace("+", "")}?text=${encodeURIComponent(
                      `Hi! I want to order the deal: ${deal.title} (${deal.price ? formatPrice(deal.price) : "Special"})`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-[#153b2e] py-3.5 text-sm font-black text-white transition hover:bg-[#e74728]"
                  >
                    <MessageCircle className="size-4" /> {deal.ctaText || "Order this deal"}
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
