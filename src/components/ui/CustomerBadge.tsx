"use client";

import React from "react";
import { Flame, Star, CheckCircle, Tag, Sparkles } from "lucide-react";

export type CustomerBadgeVariant =
  | "popular"
  | "spicy"
  | "sale"
  | "out-of-stock"
  | "halal"
  | "new"
  | "rating"
  | "neutral";

export interface CustomerBadgeProps {
  variant?: CustomerBadgeVariant;
  children?: React.ReactNode;
  className?: string;
  icon?: boolean;
}

export function CustomerBadge({
  variant = "popular",
  children,
  className = "",
  icon = true,
}: CustomerBadgeProps) {
  const configs = {
    popular: {
      classes: "bg-amber-500 text-white shadow-xs",
      defaultText: "Popular",
      IconComponent: Star,
    },
    spicy: {
      classes: "bg-red-600 text-white shadow-xs",
      defaultText: "Spicy",
      IconComponent: Flame,
    },
    sale: {
      classes: "bg-gradient-to-r from-red-600 to-amber-500 text-white shadow-xs",
      defaultText: "Special Offer",
      IconComponent: Tag,
    },
    "out-of-stock": {
      classes: "bg-stone-800 text-stone-300",
      defaultText: "Out of Stock",
      IconComponent: null,
    },
    halal: {
      classes: "bg-green-700/10 text-green-800 border border-green-700/20",
      defaultText: "100% Halal",
      IconComponent: CheckCircle,
    },
    new: {
      classes: "bg-red-600/10 text-red-600 border border-red-600/20",
      defaultText: "New",
      IconComponent: Sparkles,
    },
    rating: {
      classes: "bg-amber-500/10 text-amber-800 border border-amber-500/20",
      defaultText: "4.1★",
      IconComponent: Star,
    },
    neutral: {
      classes: "bg-stone-100 text-stone-600 border border-stone-200",
      defaultText: "Item",
      IconComponent: null,
    },
  }[variant];

  const { classes, defaultText, IconComponent } = configs;

  return (
    <span
      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider ${classes} ${className}`}
    >
      {icon && IconComponent && <IconComponent className="w-3 h-3 fill-current shrink-0" />}
      <span>{children || defaultText}</span>
    </span>
  );
}

export default CustomerBadge;
