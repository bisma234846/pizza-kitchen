"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, MessageCircle, Plus, Sparkles } from "lucide-react";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { SPECIAL_DEALS, CONTACT, formatPrice } from "@/lib/data";

export default function SpecialsSection() {
  return (
    <section id="specials" className="bg-[#f7edcf] px-5 py-20 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="flex flex-wrap items-end justify-between gap-5">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-[#e74728]">Hot from the kitchen</p>
            <h2 className="mt-3 font-serif text-5xl font-black text-[#153b2e]">Featured deals</h2>
            <p className="mt-3 max-w-xl text-[#61766b]">
              Big flavour, better value. Grab a crowd-pleasing combo while it&apos;s hot.
            </p>
          </div>
          <Link
            href="/specials"
            className="inline-flex items-center gap-2 text-sm font-black text-[#e74728]"
          >
            See all deals <ArrowRight className="size-4" />
          </Link>
        </div>

        {/* Deal Cards Grid */}
        <div className="mt-9 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {SPECIAL_DEALS.map((deal, idx) => {
            const savings =
              deal.price && deal.oldPrice ? deal.oldPrice - deal.price : null;

            return (
              <AnimatedSection
                key={deal.id}
                delay={idx * 0.08}
                className="group overflow-hidden rounded-[1.5rem] border border-[#eadfca] bg-white shadow-[0_10px_30px_rgba(38,60,45,.06)] flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_35px_rgba(38,60,45,.1)]"
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

                <div className="p-5 flex flex-col flex-1 justify-between">
                  <div>
                    {/* Title */}
                    <h3 className="font-serif text-2xl font-black text-[#153b2e]">
                      {deal.title}
                    </h3>

                    {/* Description */}
                    <p className="mt-2 min-h-12 text-sm leading-6 text-[#74867b]">
                      {deal.description}
                    </p>
                  </div>

                  {/* Savings pill */}
                  {savings && savings > 0 && (
                    <div className="mt-3 inline-flex items-center gap-1 rounded-full bg-[#edf4df] px-3 py-1 text-xs font-black text-[#4e853e]">
                      <Sparkles className="size-3" />
                      Save {formatPrice(savings)}
                    </div>
                  )}

                  {/* Price + Action */}
                  <div className="mt-4 flex items-center justify-between gap-3">
                    {deal.price ? (
                      <div>
                        <span className="text-xl font-black text-[#e74728]">
                          {formatPrice(deal.price)}
                        </span>
                        {deal.oldPrice && (
                          <span className="ml-2 text-xs text-[#9aa89f] line-through">
                            {formatPrice(deal.oldPrice)}
                          </span>
                        )}
                      </div>
                    ) : (
                      <span className="text-sm font-bold text-[#e74728]">
                        Special Discount
                      </span>
                    )}
                    <a
                      href={`https://wa.me/${CONTACT.whatsapp.replace("+", "")}?text=${encodeURIComponent(
                        `Hi! I want to order the deal: ${deal.title} (${deal.price ? formatPrice(deal.price) : "Special"})`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-xl bg-[#153b2e] px-4 py-3 text-xs font-black text-white transition hover:bg-[#e74728]"
                    >
                      <Plus className="size-4" /> {deal.ctaText || "Order"}
                    </a>
                  </div>
                </div>
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </section>
  );
}