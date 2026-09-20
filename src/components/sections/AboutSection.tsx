"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Star, Package, Users, CheckCircle, Clock } from "lucide-react";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { RESTAURANT, FEATURES } from "@/lib/data";

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
    <section id="about" className="bg-[#fffaf0] overflow-hidden">
      {/* Story Section */}
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-24 lg:grid-cols-2 lg:px-8">
        {/* Left Image */}
        <AnimatedSection className="relative">
          <Image
            src="/pizza-scene.png"
            alt="The Pizza Kitchen team preparing pizzas"
            width={800}
            height={600}
            className="aspect-[4/3] w-full rounded-[2rem] object-cover shadow-xl"
          />
          <div className="absolute -bottom-5 -right-3 rounded-2xl bg-[#ffd34e] px-5 py-4 text-center shadow-lg">
            <div className="font-serif text-3xl font-black text-[#153b2e]">8+</div>
            <div className="text-[10px] font-black uppercase tracking-widest text-[#153b2e]">years of flavour</div>
          </div>
        </AnimatedSection>

        {/* Right Text */}
        <AnimatedSection delay={0.15}>
          <p className="text-xs font-black uppercase tracking-[0.2em] text-[#e74728]">Our kitchen, your table</p>
          <h2 className="mt-4 max-w-lg font-serif text-5xl font-black leading-tight text-[#153b2e]">A little slice of joy, made here.</h2>
          <p className="mt-5 max-w-lg leading-8 text-[#61766b]">
            We started with one oven, a family recipe and a big love for feeding our city. Today, every pizza still gets the same care: dough mixed fresh each morning, sauces simmered in-house, and toppings chosen for flavour, not shortcuts.
          </p>
          <Link href="/menu" className="mt-7 inline-flex items-center gap-2 font-black text-[#e74728]">
            Meet the menu <ChevronRight className="size-4" />
          </Link>
        </AnimatedSection>
      </div>

      {/* Feature Cards */}
      <div className="mx-auto max-w-7xl px-5 pb-20 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {FEATURES.map((feature, idx) => (
            <AnimatedSection
              key={feature.id}
              delay={idx * 0.08}
              className="p-6 rounded-2xl bg-white border border-[#eadfca] shadow-[0_4px_20px_rgba(38,60,45,.04)] hover:border-[#e74728]/30 hover:shadow-md transition-all duration-300 flex flex-col gap-3"
            >
              <div className="w-12 h-12 rounded-xl bg-[#fef3d4] flex items-center justify-center">
                {getFeatureIcon(feature.icon)}
              </div>
              <h4 className="text-base font-black text-[#153b2e]">{feature.title}</h4>
              <p className="text-sm text-[#61766b] leading-relaxed">
                {feature.description}
              </p>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}