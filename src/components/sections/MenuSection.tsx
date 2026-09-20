"use client";

import { useState, useMemo, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Search, Plus, MessageCircle, X, Flame } from "lucide-react";
import { useMenu } from "@/context/MenuContext";
import { useCustomerCart } from "@/context/CustomerCartContext";
import { CONTACT } from "@/lib/data";
import type { MenuItem } from "@/types";

// 4 Signature Pizzas from the redesign folder
const REDESIGN_PIZZAS: MenuItem[] = [
  {
    id: "the-faisalabadi",
    name: "The Faisalabadi",
    description: "Tandoori chicken, jalapeño, onion & our smoky house sauce.",
    price: 1290,
    tag: "Bestseller",
    isPopular: true,
    image: "/pizza-menu.png",
    categoryId: "pizza",
    subCategoryId: "signature-pizza",
  },
  {
    id: "spicy-pepperoni",
    name: "Spicy Pepperoni",
    description: "Double pepperoni, roasted peppers, chilli honey & mozzarella.",
    price: 1490,
    tag: "Chef pick",
    isSpicy: true,
    image: "/pizza-hero.png",
    categoryId: "pizza",
    subCategoryId: "signature-pizza",
  },
  {
    id: "garden-margherita",
    name: "Garden Margherita",
    description: "San Marzano tomato, fresh basil, mozzarella & olive oil.",
    price: 1090,
    image: "/pizza-detail.png",
    categoryId: "pizza",
    subCategoryId: "signature-pizza",
  },
  {
    id: "smoky-bbq-beef",
    name: "Smoky BBQ Beef",
    description: "Smoked beef, caramelised onion, cheddar & BBQ glaze.",
    price: 1590,
    image: "/pizza-scene.png",
    categoryId: "pizza",
    subCategoryId: "signature-pizza",
  },
];

// Helper to determine food image for menu items
function getItemImage(item: MenuItem): string {
  if (item.image) return item.image;
  const name = item.name.toLowerCase();
  const cat = item.categoryId?.toLowerCase() || "";

  if (name.includes("pepperoni") || name.includes("bonfire") || name.includes("peri") || name.includes("spicy") || name.includes("hot wings")) {
    return "/pizza-hero.png";
  }
  if (name.includes("tikka") || name.includes("fajita") || name.includes("sicilian") || name.includes("supreme") || name.includes("sandwich") || name.includes("bread")) {
    return "/pizza-menu.png";
  }
  if (name.includes("bbq") || name.includes("beef") || name.includes("kebab") || name.includes("platter") || name.includes("square")) {
    return "/pizza-scene.png";
  }
  if (name.includes("vegi") || name.includes("cheese") || name.includes("margherita") || name.includes("pasta") || name.includes("alfredo") || name.includes("salad") || cat.includes("dessert") || cat.includes("beverage")) {
    return "/pizza-detail.png";
  }
  return "/pizza-menu.png";
}

// Helper to get item tag badge
function getItemTag(item: MenuItem): string | undefined {
  if (item.tag) return item.tag;
  if (item.isPopular) return "Popular";
  if (item.isSpicy) return "Spicy";
  return undefined;
}

function MenuContent() {
  const { categories } = useMenu();
  const { openCustomizeModal, addToCart } = useCustomerCart();
  const searchParams = useSearchParams();
  const catParam = searchParams.get("cat");

  const [activeTab, setActiveTab] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Sync active tab with URL query parameter
  useEffect(() => {
    if (catParam && (catParam === "all" || categories.some((c) => c.id === catParam))) {
      setActiveTab(catParam);
    }
  }, [catParam, categories]);

  // Handle Add to Cart action
  const handleAddToCart = (item: MenuItem) => {
    const hasVariantsOrOptions =
      !!item.priceNote ||
      item.categoryId?.toLowerCase().includes("pizza") ||
      item.name.toLowerCase().includes("pizza") ||
      (item.variants && item.variants.length > 0);

    if (hasVariantsOrOptions) {
      openCustomizeModal(item);
    } else {
      addToCart({
        menuItemId: item.id,
        name: item.name,
        price: item.price,
        quantity: 1,
      });
    }
  };

  // Compile all items for display
  const allItems = useMemo(() => {
    const itemsList: MenuItem[] = [];
    const seenIds = new Set<string>();

    // Always include redesign featured pizzas at top
    REDESIGN_PIZZAS.forEach((p) => {
      itemsList.push(p);
      seenIds.add(p.id);
    });

    categories.forEach((cat) => {
      cat.subCategories.forEach((sub) => {
        sub.items.forEach((item) => {
          if (!seenIds.has(item.id)) {
            itemsList.push({
              ...item,
              categoryId: item.categoryId || cat.id,
              subCategoryId: item.subCategoryId || sub.id,
            });
            seenIds.add(item.id);
          }
        });
      });
    });

    return itemsList;
  }, [categories]);

  // Filter items based on active tab and search query
  const displayedItems = useMemo(() => {
    let list = allItems;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      return list.filter(
        (item) =>
          item.name.toLowerCase().includes(q) ||
          item.description?.toLowerCase().includes(q)
      );
    }

    if (activeTab === "all") {
      return list;
    }

    return list.filter((item) => item.categoryId?.toLowerCase() === activeTab.toLowerCase());
  }, [allItems, activeTab, searchQuery]);

  return (
    <section className="bg-[#fffaf0] min-h-screen">
      <main className="mx-auto max-w-7xl px-5 py-12 lg:px-8 lg:py-16">
        {/* Redesign Page Header */}
        <div className="flex flex-wrap items-end justify-between gap-5 border-b border-[#eadfca] pb-8">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-[#e74728]">
              Straight from the oven
            </p>
            <h1 className="mt-3 font-serif text-5xl sm:text-6xl font-black tracking-tight text-[#153b2e]">
              Our menu
            </h1>
            <p className="mt-3 max-w-xl text-sm sm:text-base text-[#61766b]">
              Hand-stretched dough, rich mozzarella blend, and generous toppings baked golden to order.
            </p>
          </div>

          {/* Search bar styled like the redesign's pill */}
          <div className="flex items-center gap-2.5 rounded-full border border-[#e1d8c3] bg-white px-4 py-3 text-sm text-[#70847a] shadow-xs focus-within:border-[#e74728] focus-within:ring-2 focus-within:ring-[#e74728]/15 transition">
            <Search className="size-4 text-[#70847a] shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search pizza, wings, pasta..."
              className="outline-none bg-transparent text-sm text-[#153b2e] placeholder-[#70847a] w-44 sm:w-56"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="text-xs font-bold text-[#70847a] hover:text-[#153b2e] cursor-pointer"
                title="Clear search"
              >
                <X className="size-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Category Selector Tabs */}
        {!searchQuery && (
          <div className="mt-8 flex items-center gap-2 overflow-x-auto pb-4 no-scrollbar">
            <button
              onClick={() => setActiveTab("all")}
              className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-xs sm:text-sm font-black whitespace-nowrap transition-all duration-200 cursor-pointer ${
                activeTab === "all"
                  ? "bg-[#153b2e] text-[#fff9e7] shadow-md shadow-[#153b2e]/20 scale-102"
                  : "border border-[#eadfca] bg-white text-[#527064] hover:bg-[#f7edcf] hover:text-[#153b2e]"
              }`}
            >
              <span>All Items</span>
              <span className="text-[10px] opacity-75">({allItems.length})</span>
            </button>

            {categories.map((cat) => {
              const isActive = activeTab === cat.id;
              const count = allItems.filter(
                (item) => item.categoryId?.toLowerCase() === cat.id.toLowerCase()
              ).length;

              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveTab(cat.id)}
                  className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-xs sm:text-sm font-black whitespace-nowrap transition-all duration-200 cursor-pointer ${
                    isActive
                      ? "bg-[#153b2e] text-[#fff9e7] shadow-md shadow-[#153b2e]/20 scale-102"
                      : "border border-[#eadfca] bg-white text-[#527064] hover:bg-[#f7edcf] hover:text-[#153b2e]"
                  }`}
                >
                  <span>{cat.name}</span>
                  {count > 0 && <span className="text-[10px] opacity-75">({count})</span>}
                </button>
              );
            })}
          </div>
        )}

        {/* Section Heading */}
        <div className="mt-8 mb-8 flex items-end justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-[#e74728]">
              {searchQuery ? "Search Results" : activeTab === "all" ? "Pick your pleasure" : categories.find((c) => c.id === activeTab)?.name || "Pick your pleasure"}
            </p>
            <h2 className="mt-2 font-serif text-3xl sm:text-4xl font-black text-[#153b2e]">
              {searchQuery ? `Dishes matching "${searchQuery}"` : activeTab === "all" ? "All fresh creations" : categories.find((c) => c.id === activeTab)?.description || "Made fresh for you"}
            </h2>
          </div>
          <span className="text-xs font-bold text-[#70847a]">
            {displayedItems.length} item{displayedItems.length === 1 ? "" : "s"}
          </span>
        </div>

        {/* Empty State */}
        {displayedItems.length === 0 ? (
          <div className="rounded-[1.75rem] border border-[#eadfca] bg-white p-12 text-center shadow-xs max-w-lg mx-auto mt-12">
            <Flame className="mx-auto size-12 text-[#e74728]/60 mb-4" />
            <h3 className="font-serif text-2xl font-black text-[#153b2e]">No dishes found</h3>
            <p className="mt-2 text-sm text-[#74867b]">
              We couldn&apos;t find anything matching &quot;{searchQuery}&quot;. Try checking your spelling or view our full category list.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setActiveTab("all");
              }}
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#153b2e] px-6 py-3 text-xs font-black text-white transition hover:bg-[#e74728] cursor-pointer"
            >
              View all items
            </button>
          </div>
        ) : (
          /* Redesign Food Cards Grid - 4 cards per row on desktop */
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {displayedItems.map((item) => {
              const imageSrc = getItemImage(item);
              const tag = getItemTag(item);
              const whatsappUrl = `https://wa.me/${CONTACT.whatsapp.replace("+", "")}?text=${encodeURIComponent(
                `Hi! I would like to order: ${item.name} (Rs. ${item.price.toLocaleString()})`
              )}`;

              return (
                <article
                  key={item.id}
                  className="group overflow-hidden rounded-[1.5rem] border border-[#eadfca] bg-white shadow-[0_10px_30px_rgba(38,60,45,.05)] flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_35px_rgba(38,60,45,.1)]"
                >
                  {/* Food Image Banner */}
                  <div className="relative overflow-hidden bg-[#f7edcf]">
                    <img
                      src={imageSrc}
                      alt={item.name}
                      className="aspect-[1.15] w-full object-cover transition duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    {tag && (
                      <span className="absolute left-4 top-4 rounded-full bg-[#ffd34e] px-3 py-1 text-[10px] font-black uppercase tracking-widest text-[#153b2e] shadow-xs">
                        {tag}
                      </span>
                    )}
                  </div>

                  {/* Card Body */}
                  <div className="p-5 flex flex-col flex-1 justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-3">
                        <h3 className="font-serif text-2xl font-black text-[#153b2e] leading-snug">
                          {item.name}
                        </h3>
                        <span className="whitespace-nowrap text-sm font-black text-[#e74728]">
                          Rs. {item.price.toLocaleString()}
                        </span>
                      </div>

                      {item.description && (
                        <p className="mt-2 min-h-12 text-sm leading-6 text-[#74867b] line-clamp-2">
                          {item.description}
                        </p>
                      )}

                      {item.priceNote && (
                        <p className="mt-1 text-[11px] font-bold text-[#9aa89f]">
                          {item.priceNote}
                        </p>
                      )}
                    </div>

                    {/* Action Buttons: Add to Cart + WhatsApp */}
                    <div className="mt-5 flex items-center gap-2 pt-4 border-t border-[#f4ede0]">
                      <button
                        type="button"
                        onClick={() => handleAddToCart(item)}
                        className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-[#153b2e] py-3 text-sm font-black text-white transition hover:bg-[#e74728] cursor-pointer active:scale-98"
                      >
                        <Plus className="size-4" /> Add to cart
                      </button>

                      <a
                        href={whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        title="Order via WhatsApp"
                        aria-label={`Order ${item.name} via WhatsApp`}
                        className="flex size-11 items-center justify-center rounded-xl border border-[#eadfca] bg-[#fffaf0] text-[#153b2e] transition hover:bg-[#25D366] hover:text-white hover:border-[#25D366] cursor-pointer shrink-0"
                      >
                        <MessageCircle className="size-4" />
                      </a>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </main>
    </section>
  );
}

export default function MenuSection() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#fffaf0] flex items-center justify-center py-24">
          <div className="text-center">
            <div className="inline-block size-8 animate-spin rounded-full border-4 border-[#153b2e] border-t-transparent mb-4" />
            <p className="font-serif text-lg font-bold text-[#153b2e]">Loading menu...</p>
          </div>
        </div>
      }
    >
      <MenuContent />
    </Suspense>
  );
}