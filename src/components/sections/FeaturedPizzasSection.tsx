"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import { ArrowRight, Plus, MessageCircle } from "lucide-react";
import { useMenu } from "@/context/MenuContext";
import { useCustomerCart } from "@/context/CustomerCartContext";
import { CONTACT } from "@/lib/data";
import type { MenuItem } from "@/types";

// High-quality free Unsplash food photography images for popular pizzas
const FEATURED_PIZZAS_DATA: MenuItem[] = [
  {
    id: "the-faisalabadi",
    name: "The Faisalabadi",
    description: "Tandoori chicken, jalapeño, onion & our smoky house sauce.",
    price: 1290,
    tag: "Bestseller",
    isPopular: true,
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80",
    categoryId: "pizza",
  },
  {
    id: "spicy-pepperoni",
    name: "Spicy Pepperoni",
    description: "Double pepperoni, roasted peppers, chilli honey & mozzarella.",
    price: 1490,
    tag: "Chef pick",
    isSpicy: true,
    image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=800&q=80",
    categoryId: "pizza",
  },
  {
    id: "garden-margherita",
    name: "Garden Margherita",
    description: "San Marzano tomato, fresh basil, mozzarella & olive oil.",
    price: 1090,
    tag: "Fresh Basil",
    image: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&w=800&q=80",
    categoryId: "pizza",
  },
  {
    id: "smoky-bbq-beef",
    name: "Smoky BBQ Beef",
    description: "Smoked beef, caramelised onion, cheddar & BBQ glaze.",
    price: 1590,
    tag: "Smoky BBQ",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=800&q=80",
    categoryId: "pizza",
  },
  {
    id: "chicken-tikka",
    name: "Chicken Tikka",
    description: "Tender roasted chicken tikka chunks with onions & signature spices.",
    price: 1540,
    tag: "Popular",
    isPopular: true,
    image: "https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?auto=format&fit=crop&w=800&q=80",
    categoryId: "pizza",
  },
  {
    id: "super-supreme",
    name: "Super Supreme",
    description: "Loaded with chicken, olives, mushrooms, peppers & double mozzarella.",
    price: 1790,
    tag: "Supreme",
    isPopular: true,
    image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=800&q=80",
    categoryId: "pizza",
  },
];

// Helper to determine Unsplash image for any pizza
function getPizzaImage(item: MenuItem): string {
  if (item.image && item.image.startsWith("http")) return item.image;
  const name = item.name.toLowerCase();
  if (name.includes("pepperoni") || name.includes("bonfire") || name.includes("peri")) {
    return "https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=800&q=80";
  }
  if (name.includes("tikka") || name.includes("fajita") || name.includes("faisalabadi")) {
    return "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80";
  }
  if (name.includes("margherita") || name.includes("vegi") || name.includes("cheese")) {
    return "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&w=800&q=80";
  }
  if (name.includes("bbq") || name.includes("beef") || name.includes("kebab")) {
    return "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=800&q=80";
  }
  return "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=800&q=80";
}

export default function FeaturedPizzasSection() {
  const { allProducts } = useMenu();
  const { openCustomizeModal, addToCart } = useCustomerCart();

  // Pick top popular pizzas, prioritizing the curated Unsplash list and dynamic menu
  const featuredPizzas = useMemo(() => {
    const list: MenuItem[] = [...FEATURED_PIZZAS_DATA];
    const seenNames = new Set(list.map((p) => p.name.toLowerCase()));

    const dynamicPopular = allProducts.filter(
      (p) =>
        (p.categoryId?.toLowerCase().includes("pizza") || p.name.toLowerCase().includes("pizza")) &&
        !seenNames.has(p.name.toLowerCase())
    );

    dynamicPopular.forEach((p) => {
      if (list.length < 6) {
        list.push({
          ...p,
          image: getPizzaImage(p),
          tag: p.isPopular ? "Popular" : p.isSpicy ? "Spicy" : undefined,
        });
      }
    });

    return list.slice(0, 6);
  }, [allProducts]);

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

  return (
    <section className="bg-[#fffaf0] overflow-hidden">
      <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
        {/* Section Header */}
        <div className="mb-9 flex flex-wrap items-end justify-between gap-5">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-[#e74728]">
              Popular pizzas
            </p>
            <h2 className="mt-3 font-serif text-5xl font-black text-[#153b2e]">
              The slices everyone loves
            </h2>
            <p className="mt-3 max-w-xl text-[#61766b]">
              Hand-tossed dough, rich mozzarella blend, and generous toppings baked golden to order.
            </p>
          </div>

          <Link
            href="/menu"
            className="hidden items-center gap-2 text-sm font-black text-[#e74728] sm:flex"
          >
            View full menu <ArrowRight className="size-4" />
          </Link>
        </div>

        {/* Pizza Cards Grid - Matching visual style of menu page */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredPizzas.map((item) => {
            const imageSrc = item.image || getPizzaImage(item);
            const tag = item.tag || (item.isPopular ? "Popular" : undefined);
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

        {/* Mobile view-all link */}
        <div className="mt-8 flex justify-center sm:hidden">
          <Link
            href="/menu"
            className="inline-flex items-center gap-2 rounded-full bg-[#153b2e] px-6 py-3 text-sm font-black text-white"
          >
            View full menu <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
