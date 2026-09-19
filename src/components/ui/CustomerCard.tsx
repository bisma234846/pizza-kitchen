"use client";

import React, { HTMLAttributes } from "react";

export interface CustomerCardProps extends HTMLAttributes<HTMLDivElement> {
  hoverEffect?: boolean;
  padding?: "none" | "sm" | "md" | "lg";
  variant?: "white" | "cream" | "dark";
}

export function CustomerCard({
  children,
  className = "",
  hoverEffect = true,
  padding = "md",
  variant = "white",
  ...props
}: CustomerCardProps) {
  const paddingClasses = {
    none: "p-0",
    sm: "p-3 sm:p-4",
    md: "p-4 sm:p-6",
    lg: "p-6 sm:p-8",
  }[padding];

  const variantClasses = {
    white: "bg-white text-stone-900 border border-stone-100/90 shadow-xs",
    cream: "bg-[#FFF8F0] text-stone-900 border border-stone-200/80 shadow-xs",
    dark: "bg-stone-900 text-stone-100 border border-stone-800 shadow-xl",
  }[variant];

  const hoverClasses = hoverEffect
    ? "hover:border-red-200 hover:shadow-md transition-all duration-300"
    : "";

  return (
    <div
      className={`rounded-2xl sm:rounded-3xl ${variantClasses} ${paddingClasses} ${hoverClasses} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export default CustomerCard;
