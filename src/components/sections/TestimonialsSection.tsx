"use client";

import React from "react";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { Star, MessageCircle, CheckCircle } from "lucide-react";
import { TESTIMONIALS, RESTAURANT } from "@/lib/data";

export default function TestimonialsSection() {
  return (
    <section id="reviews" className="py-16 sm:py-20 bg-[#fffaf0] relative">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-[#e74728]">
            Customer Reviews
          </p>
          <h2 className="mt-3 font-serif text-5xl font-black text-[#153b2e]">
            Loved by Faisalabad
          </h2>
          <p className="mt-3 max-w-xl mx-auto text-[#61766b]">
            With over {RESTAURANT.reviewCount}+ Google reviews and an authentic {RESTAURANT.rating}★ rating, see what our customers have to say.
          </p>
        </div>

        {/* Rating Header Box */}
        <AnimatedSection className="max-w-xl mx-auto mb-12 p-6 rounded-[1.5rem] bg-white border border-[#eadfca] shadow-[0_4px_20px_rgba(38,60,45,.04)] text-center flex flex-col sm:flex-row items-center justify-around gap-4">
          <div className="flex flex-col items-center sm:items-start">
            <div className="flex items-center gap-1.5 text-2xl font-black text-[#153b2e]">
              <span className="text-3xl font-black text-[#e74728]">{RESTAURANT.rating}</span>
              <span>/ 5.0</span>
            </div>
            <div className="flex text-[#f1a32b] mt-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
            </div>
            <p className="text-xs text-[#70847a] font-bold mt-1">Google Rating</p>
          </div>

          <div className="h-10 w-px bg-[#eadfca] hidden sm:block" />

          <div className="flex flex-col items-center sm:items-start">
            <span className="text-2xl font-black text-[#153b2e]">{RESTAURANT.reviewCount}+</span>
            <p className="text-xs text-[#70847a] font-bold mt-1">Reviews on Google</p>
            <span className="inline-flex items-center gap-1 text-[10px] font-extrabold text-[#4e853e] bg-[#edf4df] px-2 py-0.5 rounded-full mt-1 border border-[#4e853e]/20">
              <CheckCircle className="w-3 h-3" />
              Verified Dine-in & Delivery
            </span>
          </div>
        </AnimatedSection>

        {/* Testimonial Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TESTIMONIALS.map((review, idx) => (
            <AnimatedSection
              key={review.id}
              delay={idx * 0.08}
              className="p-6 rounded-[1.5rem] bg-white border border-[#eadfca] shadow-[0_4px_20px_rgba(38,60,45,.04)] flex flex-col justify-between hover:border-[#e74728]/30 hover:shadow-md transition-all duration-300"
            >
              <div>
                {/* Stars */}
                <div className="flex text-[#f1a32b] mb-3.5">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>

                {/* Review Text */}
                <p className="text-[#4a5e52] text-sm leading-relaxed italic mb-6">
                  &quot;{review.text}&quot;
                </p>
              </div>

              {/* Author */}
              <div className="flex items-center gap-3 pt-4 border-t border-[#eadfca]">
                <div className="w-10 h-10 rounded-full bg-[#153b2e] text-[#ffd34e] font-black flex items-center justify-center text-sm shadow-xs shrink-0">
                  {review.initial}
                </div>
                <div>
                  <h4 className="text-sm font-black text-[#153b2e]">{review.name}</h4>
                  <span className="text-[11px] text-[#70847a] font-medium flex items-center gap-1">
                    <MessageCircle className="w-3 h-3 text-[#e74728]" />
                    Verified Customer
                  </span>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}