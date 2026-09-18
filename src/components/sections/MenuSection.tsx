"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Flame, Utensils, Coffee, Star } from "lucide-react";
import AnimatedSection from "@/components/ui/AnimatedSection";
import SectionHeading from "@/components/ui/SectionHeading";
import MenuCard from "@/components/ui/MenuCard";
import { useMenu } from "@/context/MenuContext";
import type { MenuCategory, MenuItem } from "@/types";

export default function MenuSection() {
  const { categories } = useMenu();
  const [activeTab, setActiveTab] = useState<string>("pizza");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Ensure active tab points to a valid category ID if categories are reordered/deleted
  const effectiveActiveTab = categories.some((c) => c.id === activeTab)
    ? activeTab
    : categories[0]?.id || "pizza";

  // Category Icon Resolver
  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case "Pizza":
        return <span className="text-lg">🍕</span>;
      case "Flame":
        return <Flame className="w-4 h-4 text-red-500" />;
      case "UtensilsCrossed":
      case "Utensils":
        return <Utensils className="w-4 h-4 text-amber-500" />;
      case "Coffee":
        return <Coffee className="w-4 h-4 text-amber-600" />;
      case "IceCreamCone":
      case "IceCream":
        return <span className="text-lg">🍨</span>;
      default:
        return <Star className="w-4 h-4 text-amber-500" />;
    }
  };

  const currentCategory = useMemo(() => {
    return categories.find((cat) => cat.id === effectiveActiveTab) || categories[0];
  }, [categories, effectiveActiveTab]);

  // Filter items if user searches
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return null;
    const query = searchQuery.toLowerCase().trim();

    const matchedItems: { categoryName: string; item: MenuItem }[] = [];
    categories.forEach((cat) => {
      cat.subCategories.forEach((sub) => {
        sub.items.forEach((item) => {
          if (
            item.name.toLowerCase().includes(query) ||
            item.description?.toLowerCase().includes(query)
          ) {
            matchedItems.push({ categoryName: cat.name, item });
          }
        });
      });
    });
    return matchedItems;
  }, [searchQuery, categories]);

  return (
    <section id="menu" className="py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Explore Our Menu"
          title="Fresh, Hot & Flavor Packed"
          subtitle="Explore our full selection of oven-baked pizzas, hot wings, pasta dishes, platters, drinks & desserts."
        />

        {/* Search Bar */}
        <AnimatedSection className="max-w-md mx-auto mb-10">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search pizza, wings, fettuccine..."
              className="w-full pl-12 pr-4 py-3.5 rounded-full bg-stone-50 border border-stone-200 text-stone-900 placeholder-stone-400 text-sm focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-stone-400 hover:text-stone-700"
              >
                Clear
              </button>
            )}
          </div>
        </AnimatedSection>

        {/* Category Tabs (Horizontal Scrollable on Mobile) */}
        {!searchQuery && (
          <AnimatedSection className="flex items-center justify-start md:justify-center gap-2 overflow-x-auto pb-4 mb-12 no-scrollbar">
            {categories.map((category) => {
              const isActive = effectiveActiveTab === category.id;
              return (
                <button
                  key={category.id}
                  onClick={() => setActiveTab(category.id)}
                  className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold whitespace-nowrap transition-all duration-300 ${
                    isActive
                      ? "bg-red-600 text-white shadow-lg shadow-red-600/25 scale-105"
                      : "bg-stone-100 text-stone-600 hover:bg-stone-200 hover:text-stone-900"
                  }`}
                >
                  {getCategoryIcon(category.icon)}
                  <span>{category.name}</span>
                </button>
              );
            })}
          </AnimatedSection>
        )}

        {/* Search Results Display */}
        {searchResults !== null ? (
          <div>
            <h3 className="text-lg font-bold text-stone-900 mb-6">
              Found {searchResults.length} result(s) for "{searchQuery}":
            </h3>
            {searchResults.length === 0 ? (
              <div className="text-center py-16 bg-stone-50 rounded-3xl border border-dashed border-stone-200">
                <p className="text-stone-500 text-base">No food items matched your search.</p>
                <button
                  onClick={() => setSearchQuery("")}
                  className="mt-4 px-6 py-2.5 rounded-full bg-red-600 text-white text-xs font-bold uppercase tracking-wider"
                >
                  View Full Menu
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {searchResults.map(({ item }, index) => (
                  <MenuCard key={item.id} item={item} index={index} />
                ))}
              </div>
            )}
          </div>
        ) : (
          /* Subcategories & Cards View */
          <AnimatePresence mode="wait">
            <motion.div
              key={currentCategory.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
              className="space-y-12"
            >
              {currentCategory.subCategories.map((subCategory) => (
                <div key={subCategory.id} className="space-y-6">
                  {/* Subcategory Header */}
                  <div className="flex items-center justify-between border-b border-stone-200 pb-3">
                    <div>
                      <h3 className="text-xl font-extrabold text-stone-900">
                        {subCategory.name}
                      </h3>
                      {subCategory.description && (
                        <p className="text-xs text-stone-500 mt-0.5">
                          {subCategory.description}
                        </p>
                      )}
                    </div>
                    <span className="text-xs font-semibold text-stone-400 bg-stone-100 px-3 py-1 rounded-full">
                      {subCategory.items.length} items
                    </span>
                  </div>

                  {/* Grid of Menu Items */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {subCategory.items.map((item, idx) => (
                      <MenuCard key={item.id} item={item} index={idx} />
                    ))}
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </section>
  );
}