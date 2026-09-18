"use client";

import React from "react";
import { Star, MessageSquare, CheckCircle, Reply } from "lucide-react";
import { TESTIMONIALS, RESTAURANT } from "@/lib/data";

export default function AdminReviewsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl font-black text-white">Customer Reviews & Ratings</h2>
          <p className="text-xs text-stone-400">Google Verified Rating: {RESTAURANT.rating}★ ({RESTAURANT.reviewCount}+ total reviews)</p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-bold flex items-center gap-1.5">
            <Star className="w-3.5 h-3.5 fill-current" />
            <span>4.1 / 5.0 Average</span>
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {TESTIMONIALS.map((review) => (
          <div
            key={review.id}
            className="p-6 rounded-3xl bg-stone-900 border border-stone-800 shadow-xl space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-red-600 text-white font-black text-xs flex items-center justify-center">
                    {review.initial}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">{review.name}</h4>
                    <span className="text-[10px] text-stone-500">Google Verified</span>
                  </div>
                </div>

                <div className="flex text-amber-400">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
              </div>

              <p className="text-xs text-stone-300 leading-relaxed italic">
                "{review.text}"
              </p>
            </div>

            <div className="pt-3 border-t border-stone-800 flex items-center justify-between">
              <span className="text-[10px] text-green-400 font-semibold flex items-center gap-1">
                <CheckCircle className="w-3 h-3" />
                Published on Web
              </span>

              <button
                onClick={() => alert(`Reply box opened for ${review.name}`)}
                className="px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white text-xs font-bold flex items-center gap-1 transition-colors"
              >
                <Reply className="w-3 h-3" />
                <span>Reply</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
