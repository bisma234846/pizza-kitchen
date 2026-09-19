"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import { ArrowRight, Flame, Sparkles } from "lucide-react";
import AnimatedSection from "@/components/ui/AnimatedSection";
import SectionHeading from "@/components/ui/SectionHeading";
import MenuCard from "@/components/ui/MenuCard";
import { useMenu } from "@/context/MenuContext";

export default function FeaturedPizzasSection() {
  const { allProducts } = useMenu();

  // Pick top popular pizzas from menu
  const featuredPizzas = useMemo(() => {
    const pizzaProducts = allProducts.filter(
      (p) => p.categoryId?.toLowerCase().includes("pizza") || p.name.toLowerCase().includes("pizza") || p.isPopular
    );

    // Filter by isPopular first or take first 6
    const popular = pizzaProducts.filter((p) => p.isPopular);
    if (popular.length >= 4) {
      return popular.slice(0, 6);
    }
    return pizzaProducts.slice(0, 6);
  }, [allProducts]);

  return (
    <section className="py-16 sm:py-20 bg-[#FFF8F0] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-12 gap-4">
          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-100 text-red-700 text-xs font-black uppercase tracking-wider mb-2">
              <Flame className="w-3.5 h-3.5 text-red-600" />
              Faisalabad's Favorites
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-stone-900 tracking-tight">
              Signature Oven-Baked Pizzas
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 mt-1 max-w-xl">
              Hand-tossed dough, rich mozzarella blend, and generous toppings baked golden to order.
            </p>
          </div>

          <Link
            href="/menu"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-stone-900 hover:bg-stone-800 text-white text-xs font-extrabold uppercase tracking-wider transition-all self-start md:self-auto shrink-0 shadow-sm"
          >
            <span>View All Pizzas</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredPizzas.map((item, idx) => (
            <MenuCard key={item.id} item={item} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}
