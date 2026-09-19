"use client";

import React from "react";

export interface CustomerLoadingStateProps {
  type?: "cards" | "spinner" | "banner";
  count?: number;
  message?: string;
}

export function CustomerLoadingState({
  type = "cards",
  count = 6,
  message = "Baking fresh menu items...",
}: CustomerLoadingStateProps) {
  if (type === "spinner") {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center space-y-4">
        <div className="relative flex items-center justify-center">
          <div className="w-14 h-14 rounded-full border-4 border-stone-200 border-t-red-600 animate-spin" />
          <span className="absolute text-xl select-none">🍕</span>
        </div>
        <p className="text-xs font-bold uppercase tracking-widest text-stone-500 animate-pulse">
          {message}
        </p>
      </div>
    );
  }

  if (type === "banner") {
    return (
      <div className="w-full h-48 rounded-3xl bg-stone-100 animate-pulse border border-stone-200" />
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(count)].map((_, i) => (
        <div
          key={i}
          className="rounded-2xl bg-white border border-stone-100 p-5 shadow-xs animate-pulse space-y-4"
        >
          <div className="flex justify-between items-start">
            <div className="h-5 w-2/3 bg-stone-200 rounded-md" />
            <div className="h-4 w-12 bg-stone-100 rounded-full" />
          </div>
          <div className="space-y-2">
            <div className="h-3 w-full bg-stone-100 rounded" />
            <div className="h-3 w-4/5 bg-stone-100 rounded" />
          </div>
          <div className="pt-3 border-t border-stone-50 flex justify-between items-center">
            <div className="h-6 w-20 bg-stone-200 rounded" />
            <div className="h-7 w-16 bg-stone-200 rounded-full" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default CustomerLoadingState;
