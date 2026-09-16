"use client";

import AnimatedSection from "@/components/ui/AnimatedSection";
import SectionHeading from "@/components/ui/SectionHeading";
import { Star, MessageCircle, CheckCircle } from "lucide-react";
import { TESTIMONIALS, RESTAURANT } from "@/lib/data";

export default function TestimonialsSection() {
  return (
    <section id="reviews" className="py-20 bg-[#FFF8F0] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Customer Reviews"
          title="Loved By Pizza Enthusiasts"
          subtitle={`With over ${RESTAURANT.reviewCount}+ Google reviews and a ${RESTAURANT.rating}★ rating, see why Faisalabad loves The Pizza Kitchen.`}
        />

        {/* Rating Header Box */}
        <AnimatedSection className="max-w-xl mx-auto mb-14 p-6 rounded-3xl bg-white border border-stone-200/80 shadow-sm text-center flex flex-col sm:flex-row items-center justify-around gap-4">
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
            <p className="text-xs text-stone-500 font-medium mt-1">Google Verified Rating</p>
          </div>

          <div className="h-10 w-px bg-stone-200 hidden sm:block" />

          <div className="flex flex-col items-center sm:items-start">
            <span className="text-2xl font-black text-stone-900">{RESTAURANT.reviewCount}+</span>
            <p className="text-xs text-stone-500 font-medium mt-1">Satisfied Foodies</p>
            <span className="inline-flex items-center gap-1 text-[10px] font-bold text-green-700 bg-green-50 px-2 py-0.5 rounded-full mt-1">
              <CheckCircle className="w-3 h-3" />
              Verified Feedback
            </span>
          </div>
        </AnimatedSection>

        {/* Testimonial Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TESTIMONIALS.map((review, idx) => (
            <AnimatedSection
              key={review.id}
              delay={idx * 0.08}
              className="p-6 rounded-2xl bg-white border border-stone-100 shadow-sm flex flex-col justify-between hover:border-red-200 hover:shadow-md transition-all duration-300"
            >
              <div>
                {/* Stars */}
                <div className="flex text-amber-400 mb-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>

                {/* Review Text */}
                <p className="text-stone-700 text-sm leading-relaxed italic mb-6">
                  "{review.text}"
                </p>
              </div>

              {/* Author */}
              <div className="flex items-center gap-3 pt-4 border-t border-stone-50">
                <div className="w-10 h-10 rounded-full bg-stone-900 text-white font-extrabold flex items-center justify-center text-sm shadow-xs">
                  {review.initial}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-stone-900">{review.name}</h4>
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