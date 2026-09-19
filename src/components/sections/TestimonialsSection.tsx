"use client";

import React from "react";
import AnimatedSection from "@/components/ui/AnimatedSection";
import SectionHeading from "@/components/ui/SectionHeading";
import { Star, MessageCircle, CheckCircle } from "lucide-react";
import { TESTIMONIALS, RESTAURANT } from "@/lib/data";

export default function TestimonialsSection() {
  return (
    <section id="reviews" className="py-16 sm:py-20 bg-[#FFF8F0] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Customer Reviews"
          title="Loved By Faisalabad Pizza Lovers"
          subtitle={`With over ${RESTAURANT.reviewCount}+ Google reviews and an authentic ${RESTAURANT.rating}★ rating, see what our customers have to say.`}
        />

        {/* Rating Header Box */}
        <AnimatedSection className="max-w-xl mx-auto mb-12 p-6 rounded-3xl bg-white border border-stone-200/80 shadow-xs text-center flex flex-col sm:flex-row items-center justify-around gap-4">
          <div className="flex flex-col items-center sm:items-start">
            <div className="flex items-center gap-1.5 text-2xl font-black text-stone-900">
              <span className="text-3xl font-black text-red-600">{RESTAURANT.rating}</span>
              <span>/ 5.0</span>
            </div>
            <div className="flex text-amber-400 mt-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
            </div>
            <p className="text-xs text-stone-500 font-bold mt-1">Google Rating</p>
          </div>

          <div className="h-10 w-px bg-stone-200 hidden sm:block" />

          <div className="flex flex-col items-center sm:items-start">
            <span className="text-2xl font-black text-stone-900">{RESTAURANT.reviewCount}+</span>
            <p className="text-xs text-stone-500 font-bold mt-1">Reviews on Google</p>
            <span className="inline-flex items-center gap-1 text-[10px] font-extrabold text-green-700 bg-green-50 px-2 py-0.5 rounded-full mt-1 border border-green-200/60">
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
              className="p-6 rounded-2xl bg-white border border-stone-200/80 shadow-xs flex flex-col justify-between hover:border-red-300 hover:shadow-md transition-all duration-300"
            >
              <div>
                {/* Stars */}
                <div className="flex text-amber-400 mb-3.5">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>

                {/* Review Text */}
                <p className="text-stone-700 text-xs sm:text-sm leading-relaxed italic mb-6">
                  "{review.text}"
                </p>
              </div>

              {/* Author */}
              <div className="flex items-center gap-3 pt-4 border-t border-stone-100">
                <div className="w-10 h-10 rounded-full bg-stone-900 text-white font-black flex items-center justify-center text-sm shadow-xs shrink-0">
                  {review.initial}
                </div>
                <div>
                  <h4 className="text-sm font-black text-stone-900">{review.name}</h4>
                  <span className="text-[11px] text-stone-400 font-medium flex items-center gap-1">
                    <MessageCircle className="w-3 h-3 text-red-500" />
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