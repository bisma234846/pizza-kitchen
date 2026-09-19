"use client";

import React from "react";
import { motion } from "framer-motion";
import { MessageCircle, Plus, SlidersHorizontal } from "lucide-react";
import { useDevicePerformance } from "@/hooks/useDevicePerformance";
import { useCustomerCart } from "@/context/CustomerCartContext";
import { formatPrice, CONTACT } from "@/lib/data";
import type { MenuItem } from "@/types";
import CustomerBadge from "./CustomerBadge";

interface MenuCardProps {
  item: MenuItem;
  index?: number;
}

export default function MenuCard({ item, index = 0 }: MenuCardProps) {
  const caps = useDevicePerformance();
  const { openCustomizeModal } = useCustomerCart();
  const delay = caps.enableHeavyAnimations ? Math.min(index * 0.03, 0.25) : 0;
  const isAvailable = item.inStock !== false;

  const hasVariantsOrOptions =
    !!item.priceNote ||
    item.categoryId?.toLowerCase().includes("pizza") ||
    item.name.toLowerCase().includes("pizza");

  const whatsappUrl = `https://wa.me/${CONTACT.whatsapp.replace("+", "")}?text=${encodeURIComponent(
    `Hi! I would like to order: ${item.name} (${formatPrice(item.price)})`
  )}`;

  return (
    <motion.div
      initial={caps.prefersReducedMotion ? false : { opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{ duration: 0.3, delay }}
      whileHover={
        caps.enableHeavyAnimations
          ? { y: -3, boxShadow: "0 10px 25px -5px rgba(220,38,38,0.12)" }
          : undefined
      }
      className={`group relative flex flex-col justify-between rounded-2xl bg-white border p-5 shadow-xs transition-all duration-200 ${
        isAvailable
          ? "border-stone-200/80 hover:border-red-300"
          : "border-stone-100/60 opacity-75"
      }`}
    >
      <div>
        {/* Top Badges Row */}
        <div className="flex items-center justify-between gap-2 mb-2.5">
          <div className="flex items-center gap-1.5 flex-wrap">
            {item.isPopular && <CustomerBadge variant="popular" />}
            {item.isSpicy && <CustomerBadge variant="spicy" />}
            {!isAvailable && <CustomerBadge variant="out-of-stock" />}
          </div>
        </div>

        {/* Item Name */}
        <h4 className="text-base sm:text-lg font-black text-stone-900 group-hover:text-red-600 transition-colors leading-snug">
          {item.name}
        </h4>

        {/* Description */}
        {item.description && (
          <p className="text-xs sm:text-sm text-stone-500 leading-relaxed line-clamp-2 mt-1.5">
            {item.description}
          </p>
        )}
      </div>

      {/* Price & Action Row */}
      <div className="mt-5 pt-3.5 flex flex-wrap items-end justify-between gap-2 border-t border-stone-100">
        <div>
          <span className="text-lg sm:text-xl font-black text-red-600 tracking-tight">
            {formatPrice(item.price)}
          </span>
          {item.priceNote && (
            <p className="text-[11px] text-stone-400 mt-0.5 leading-tight font-medium">
              {item.priceNote}
            </p>
          )}
        </div>

        {isAvailable ? (
          <div className="flex items-center gap-1.5">
            {/* Direct WhatsApp Quick Order */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              title="Quick order on WhatsApp"
              aria-label={`Order ${item.name} via WhatsApp`}
              className="p-2 rounded-xl bg-green-50 hover:bg-green-600 text-green-700 hover:text-white transition-all border border-green-200/60 hover:border-green-600 flex items-center justify-center min-w-[36px] min-h-[36px]"
            >
              <MessageCircle className="w-4 h-4" />
            </a>

            {/* Customize & Add to Cart Action */}
            <button
              type="button"
              onClick={() => openCustomizeModal(item)}
              aria-label={`Customize and add ${item.name} to cart`}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-red-600 text-white text-xs font-extrabold uppercase tracking-wider hover:bg-red-700 active:scale-95 transition-all shadow-xs min-h-[36px] cursor-pointer"
            >
              {hasVariantsOrOptions ? (
                <>
                  <SlidersHorizontal className="w-3.5 h-3.5" />
                  <span>Customize</span>
                </>
              ) : (
                <>
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add</span>
                </>
              )}
            </button>
          </div>
        ) : (
          <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-stone-100 text-stone-400 text-xs font-semibold cursor-not-allowed">
            Unavailable
          </span>
        )}
      </div>
    </motion.div>
  );
}