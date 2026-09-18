"use client";

import React, { useState } from "react";
import { Tag, Plus, Flame, Edit, Trash2, CheckCircle2, XCircle } from "lucide-react";
import { SPECIAL_DEALS, formatPrice } from "@/lib/data";

export default function DealsManagerPage() {
  const [deals, setDeals] = useState(SPECIAL_DEALS);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl font-black text-white">Deals & Promotional Bundles</h2>
          <p className="text-xs text-stone-400">Manage festival specials, combo discounts & seasonal deals shown on the customer storefront</p>
        </div>

        <button
          onClick={() => alert("Create new promotional deal modal")}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold transition-all shadow-md shadow-red-600/30"
        >
          <Plus className="w-4 h-4 stroke-[3]" />
          <span>+ Create New Deal</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {deals.map((deal) => (
          <div
            key={deal.id}
            className="p-6 rounded-3xl bg-stone-900 border border-stone-800 shadow-xl flex flex-col justify-between space-y-4 hover:border-red-500/40 transition-colors"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest">
                  {deal.subtitle || "The Pizza Kitchen"}
                </span>
                {deal.badge && (
                  <span className="px-2 py-0.5 rounded-full bg-red-600/20 text-red-400 text-[9px] font-bold border border-red-500/30">
                    {deal.badge}
                  </span>
                )}
              </div>

              <h4 className="text-base font-black text-white">{deal.title}</h4>
              <p className="text-xs text-stone-400 line-clamp-2 leading-relaxed">
                {deal.description}
              </p>
            </div>

            <div className="pt-3 border-t border-stone-800 flex items-center justify-between">
              <div>
                {deal.price ? (
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-sm font-black text-red-400">
                      {formatPrice(deal.price)}
                    </span>
                    {deal.oldPrice && (
                      <span className="text-[10px] text-stone-500 line-through">
                        {formatPrice(deal.oldPrice)}
                      </span>
                    )}
                  </div>
                ) : (
                  <span className="text-xs font-bold text-amber-400">Special Promo</span>
                )}
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => alert(`Editing deal: ${deal.title}`)}
                  className="p-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white transition-colors"
                  title="Edit Deal"
                >
                  <Edit className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => alert(`Toggled active status for ${deal.title}`)}
                  className="p-1.5 rounded-lg bg-green-500/20 text-green-400 hover:bg-green-500/30 transition-colors"
                  title="Active on Customer Store"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
