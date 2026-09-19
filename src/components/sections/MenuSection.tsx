"use client";

import { useState, useMemo, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Flame, Utensils, Coffee, Star, Sparkles } from "lucide-react";
import AnimatedSection from "@/components/ui/AnimatedSection";
import SectionHeading from "@/components/ui/SectionHeading";
import MenuCard from "@/components/ui/MenuCard";
import CustomerEmptyState from "@/components/ui/CustomerEmptyState";
import CustomerLoadingState from "@/components/ui/CustomerLoadingState";
import { useMenu } from "@/context/MenuContext";
import type { MenuCategory, MenuItem } from "@/types";

function MenuContent() {
  const { categories } = useMenu();
  const searchParams = useSearchParams();
  const catParam = searchParams.get("cat");

  const [activeTab, setActiveTab] = useState<string>("pizza");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Sync active tab with URL query parameter on load/change
  useEffect(() => {
    if (catParam && categories.some((c) => c.id === catParam)) {
      setActiveTab(catParam);
    }
  }, [catParam, categories]);

  // Ensure active tab points to a valid category ID
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
    <section id="menu" className="py-12 sm:py-16 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Explore Our Menu"
          title="Fresh, Hot & Flavor Packed"
          subtitle="Hand-tossed pizzas, oven-baked hot wings, creamy Alfredo pastas, feast platters & desserts."
        />

        {/* Search Bar */}
        <AnimatedSection className="max-w-md mx-auto mb-8 sm:mb-10">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-stone-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search pizza, wings, pasta, sauce..."
              className="w-full pl-11 pr-16 py-3 rounded-full bg-stone-50 border border-stone-200 text-stone-900 placeholder-stone-400 text-xs sm:text-sm focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all shadow-xs"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-stone-400 hover:text-stone-700 cursor-pointer"
              >
                Clear
              </button>
            )}
          </div>
        </AnimatedSection>

        {/* Category Tabs (Horizontal Scrollable on Mobile) */}
        {!searchQuery && (
          <AnimatedSection className="flex items-center justify-start md:justify-center gap-2 overflow-x-auto pb-4 mb-10 sm:mb-12 no-scrollbar">
            {categories.map((category) => {
              const isActive = effectiveActiveTab === category.id;
              return (
                <button
                  key={category.id}
                  onClick={() => setActiveTab(category.id)}
                  className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold whitespace-nowrap transition-all duration-200 cursor-pointer min-h-[40px] ${
                    isActive
                      ? "bg-red-600 text-white shadow-md shadow-red-600/25 scale-102"
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

        {searchResults !== null ? (
          /* Search Results Display */
          <div>
            <h3 className="text-base sm:text-lg font-black text-stone-900 mb-6">
              Found {searchResults.length} result(s) for "{searchQuery}":
            </h3>
            {searchResults.length === 0 ? (
              <CustomerEmptyState
                title="No dishes found"
                description={`We couldn't find any food items matching "${searchQuery}". Please check your spelling or browse our full category list.`}
                actionText="View Full Menu"
                onAction={() => setSearchQuery("")}
              />
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
              key={currentCategory?.id || "default"}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="space-y-12"
            >
              {currentCategory?.subCategories.map((subCategory) => (
                <div key={subCategory.id} className="space-y-6">
                  {/* Subcategory Header */}
                  <div className="flex items-center justify-between border-b border-stone-200 pb-3">
                    <div>
                      <h3 className="text-lg sm:text-xl font-black text-stone-900">
                        {subCategory.name}
                      </h3>
                      {subCategory.description && (
                        <p className="text-xs text-stone-500 mt-0.5">
                          {subCategory.description}
                        </p>
                      )}
                    </div>
                    <span className="text-xs font-bold text-stone-500 bg-stone-100 px-3 py-1 rounded-full">
                      {subCategory.items.length} items
                    </span>
                  </div>

                  {/* Grid of Menu Items */}
                  {subCategory.items.length === 0 ? (
                    <CustomerEmptyState
                      title="No items in this section yet"
                      description="Items added by restaurant management will appear here."
                    />
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {subCategory.items.map((item, idx) => (
                        <MenuCard key={item.id} item={item} index={idx} />
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </section>
  );
}

export default function MenuSection() {
  return (
    <Suspense fallback={<CustomerLoadingState count={6} />}>
      <MenuContent />
    </Suspense>
  );
}