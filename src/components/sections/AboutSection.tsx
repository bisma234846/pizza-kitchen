"use client";

import React from "react";
import AnimatedSection from "@/components/ui/AnimatedSection";
import SectionHeading from "@/components/ui/SectionHeading";
import { Star, Package, Users, CheckCircle, Clock, MapPin } from "lucide-react";
import { RESTAURANT, FEATURES, CONTACT } from "@/lib/data";

export default function AboutSection() {
  const getFeatureIcon = (iconName: string) => {
    switch (iconName) {
      case "Star":
        return <Star className="w-6 h-6 text-amber-500" />;
      case "Flame":
        return <Clock className="w-6 h-6 text-red-500" />;
      case "Package":
        return <Package className="w-6 h-6 text-red-500" />;
      case "Users":
        return <Users className="w-6 h-6 text-green-600" />;
      default:
        return <CheckCircle className="w-6 h-6 text-red-500" />;
    }
  };

  return (
    <section id="about" className="py-16 sm:py-20 bg-[#FFF8F0] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Our Story & Quality"
          title="Crafted With Passion In Faisalabad"
          subtitle="From hand-kneaded dough to our secret spice recipes, every slice tells a story of taste and commitment."
        />

        {/* Main 2-Column Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center mb-14 sm:mb-16">
          {/* Left Column: Story Text & Badges */}
          <AnimatedSection className="lg:col-span-7 flex flex-col gap-5">
            <h3 className="text-2xl sm:text-3xl font-black text-stone-900 leading-snug">
              Welcome to <span className="text-red-600">The Pizza Kitchen</span> — Faisalabad's Favorite Slice
            </h3>

            <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
              Located at Susan Road, Faisalabad, The Pizza Kitchen has grown into one of the city’s most beloved spots for pizza enthusiasts, hot wing lovers, and pasta connoisseurs alike.
            </p>

            <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
              Whether you are stopping by for a cozy family dine-in meal, picking up a hot takeaway, or ordering home delivery right to your doorstep, we guarantee golden-baked crusts, generous toppings, and prompt service every single time.
            </p>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-3 gap-3 sm:gap-4 pt-4 border-t border-stone-200">
              <div className="p-4 rounded-2xl bg-white border border-stone-200/80 text-center shadow-xs">
                <span className="text-2xl sm:text-3xl font-black text-red-600 block">{RESTAURANT.rating}★</span>
                <span className="text-xs text-stone-500 font-bold">{RESTAURANT.reviewCount}+ Reviews</span>
              </div>
              <div className="p-4 rounded-2xl bg-white border border-stone-200/80 text-center shadow-xs">
                <span className="text-2xl sm:text-3xl font-black text-stone-900 block">30M</span>
                <span className="text-xs text-stone-500 font-bold">Fast Delivery</span>
              </div>
              <div className="p-4 rounded-2xl bg-white border border-stone-200/80 text-center shadow-xs">
                <span className="text-2xl sm:text-3xl font-black text-green-700 block">100%</span>
                <span className="text-xs text-stone-500 font-bold">Fresh & Halal</span>
              </div>
            </div>
          </AnimatedSection>

          {/* Right Column: Branch Showcase Card */}
          <AnimatedSection delay={0.15} className="lg:col-span-5">
            <div className="relative rounded-3xl overflow-hidden shadow-xl bg-stone-900 aspect-4/3 sm:aspect-square flex items-center justify-center border-4 border-white">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 hover:scale-105"
                style={{
                  backgroundImage: `url('https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1000&auto=format&fit=crop')`,
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-stone-950/30 to-transparent" />

              {/* Bottom Ambiance Overlay Tag */}
              <div className="absolute bottom-5 inset-x-5 p-4 rounded-2xl bg-stone-900/95 backdrop-blur-md border border-stone-700/60 text-white flex items-center justify-between">
                <div>
                  <p className="font-black text-sm">Susan Road Branch</p>
                  <p className="text-[11px] text-stone-400">Cozy Family Dining & Takeaway</p>
                </div>
                <span className="px-3 py-1.5 rounded-full bg-red-600 text-white text-[10px] font-black uppercase tracking-wider">
                  Open Daily
                </span>
              </div>
            </div>
          </AnimatedSection>
        </div>

        {/* 4 Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {FEATURES.map((feature, idx) => (
            <AnimatedSection
              key={feature.id}
              delay={idx * 0.08}
              className="p-6 rounded-2xl bg-white border border-stone-200/80 shadow-xs hover:border-red-300 hover:shadow-md transition-all duration-300 flex flex-col gap-3"
            >
              <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center">
                {getFeatureIcon(feature.icon)}
              </div>
              <h4 className="text-base font-black text-stone-900">{feature.title}</h4>
              <p className="text-xs sm:text-sm text-stone-500 leading-relaxed">
                {feature.description}
              </p>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}