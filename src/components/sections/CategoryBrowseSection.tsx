"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Flame, Utensils, Coffee, Star, Sparkles } from "lucide-react";
import AnimatedSection from "@/components/ui/AnimatedSection";
import SectionHeading from "@/components/ui/SectionHeading";
import { useMenu } from "@/context/MenuContext";

export default function CategoryBrowseSection() {
  const { categories } = useMenu();

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case "Pizza":
        return <span className="text-3xl">🍕</span>;
      case "Flame":
        return <span className="text-3xl">🍗</span>;
      case "UtensilsCrossed":
      case "Utensils":
        return <span className="text-3xl">🍝</span>;
      case "Coffee":
        return <span className="text-3xl">🥤</span>;
      case "IceCreamCone":
      case "IceCream":
        return <span className="text-3xl">🍨</span>;
      default:
        return <span className="text-3xl">🍽️</span>;
    }
  };

  return (
    <section className="py-16 sm:py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Menu Categories"
          title="What Are You Craving Today?"
          subtitle="Explore our handcrafted selection of pizzas, hot wings, pastas, platters & desserts."
        />

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {categories.map((cat, idx) => {
            const totalItems = cat.subCategories.reduce(
              (acc, sub) => acc + sub.items.length,
              0
            );

            return (
              <AnimatedSection
                key={cat.id}
                delay={idx * 0.05}
                className="h-full"
              >
                <Link
                  href={`/menu?cat=${cat.id}`}
                  className="group flex flex-col items-center justify-between p-4 sm:p-5 rounded-2xl bg-[#FFF8F0] border border-stone-200/80 hover:border-red-500/50 hover:bg-white transition-all duration-300 shadow-xs hover:shadow-md h-full text-center"
                >
                  <div className="w-14 h-14 rounded-2xl bg-white border border-stone-200/60 flex items-center justify-center mb-3 shadow-xs group-hover:scale-110 group-hover:bg-red-50 transition-all">
                    {getCategoryIcon(cat.icon)}
                  </div>

                  <div>
                    <h3 className="text-xs sm:text-sm font-extrabold text-stone-900 group-hover:text-red-600 transition-colors">
                      {cat.name}
                    </h3>
                    <span className="text-[11px] text-stone-400 font-medium block mt-0.5">
                      {totalItems} Items
                    </span>
                  </div>

                  <div className="mt-3 w-6 h-6 rounded-full bg-stone-100 group-hover:bg-red-600 group-hover:text-white text-stone-400 flex items-center justify-center transition-all">
                    <ArrowRight className="w-3 h-3" />
                  </div>
                </Link>
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </section>
  );
}
