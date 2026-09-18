"use client";

import { motion } from "framer-motion";
import { Flame } from "lucide-react";
import { useDevicePerformance } from "@/hooks/useDevicePerformance";
import { formatPrice } from "@/lib/data";
import type { MenuItem } from "@/types";

interface MenuCardProps {
  item: MenuItem;
  index?: number;
}

export default function MenuCard({ item, index = 0 }: MenuCardProps) {
  const caps = useDevicePerformance();
  const delay = caps.enableHeavyAnimations ? index * 0.05 : 0;

  return (
    <motion.div
      initial={caps.prefersReducedMotion ? false : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{ duration: 0.35, delay }}
      whileHover={
        caps.enableHeavyAnimations
          ? { y: -4, boxShadow: "0 12px 28px -8px rgba(220,38,38,0.25)" }
          : undefined
      }
      className="group relative flex flex-col gap-2 rounded-2xl bg-white border border-stone-100 p-4 sm:p-5 shadow-sm hover:border-red-200 transition-colors duration-300"
    >
      {/* Badges */}
      <div className="absolute top-3 right-3 flex gap-1.5">
        {item.inStock === false && (
          <span className="px-2 py-0.5 rounded-full bg-stone-800 text-stone-300 text-[10px] font-bold uppercase tracking-wide">
            Out of Stock
          </span>
        )}
        {item.isPopular && (
          <span className="px-2 py-0.5 rounded-full bg-amber-500 text-white text-[10px] font-bold uppercase tracking-wide">
            Popular
          </span>
        )}
        {item.isSpicy && (
          <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full bg-red-600 text-white text-[10px] font-bold uppercase tracking-wide">
            <Flame className="w-3 h-3" />
            Spicy
          </span>
        )}
      </div>

      {/* Name */}
      <h4 className="text-base sm:text-lg font-bold text-stone-900 pr-20 group-hover:text-red-600 transition-colors">
        {item.name}
      </h4>

      {/* Description */}
      {item.description && (
        <p className="text-sm text-stone-500 leading-relaxed line-clamp-2">
          {item.description}
        </p>
      )}

      {/* Price row */}
      <div className="mt-auto pt-3 flex flex-wrap items-end justify-between gap-2 border-t border-stone-50">
        <div>
          <span className="text-xl font-extrabold text-red-600">
            {formatPrice(item.price)}
          </span>
          {item.priceNote && (
            <p className="text-[11px] text-stone-400 mt-0.5 leading-tight">
              {item.priceNote}
            </p>
          )}
        </div>
        {item.inStock !== false ? (
          <a
            href={`https://wa.me/923222192021?text=${encodeURIComponent(
              `Hi! I'd like to order: ${item.name}`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-red-600 text-white text-xs font-semibold hover:bg-red-700 active:scale-95 transition-all"
          >
            Order
          </a>
        ) : (
          <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-stone-100 text-stone-400 text-xs font-semibold cursor-not-allowed">
            Unavailable
          </span>
        )}
      </div>
    </motion.div>
  );
}