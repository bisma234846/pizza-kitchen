"use client";

import React from "react";
import { Award, Star, Users, Gift, TrendingUp, Search } from "lucide-react";

export default function LoyaltyProgramPage() {
  const tiers = [
    { name: "Bronze Foodie", req: "0 - 4 Orders", cashback: "2% Points", activeMembers: 842, color: "from-amber-700 to-amber-900" },
    { name: "Silver Lover", req: "5 - 14 Orders", cashback: "5% Points + Free Garlic Bread", activeMembers: 310, color: "from-stone-400 to-stone-600" },
    { name: "Gold VIP", req: "15+ Orders", cashback: "10% Points + Priority Delivery", activeMembers: 124, color: "from-amber-400 to-yellow-600" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl font-black text-white">Loyalty & Rewards Program</h2>
          <p className="text-xs text-stone-400">1,276 enrolled members earning pizza reward points</p>
        </div>

        <button
          onClick={() => alert("Add new loyalty reward tier modal")}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold transition-all shadow-md shadow-red-600/30"
        >
          <Award className="w-4 h-4" />
          <span>+ Add Reward Tier</span>
        </button>
      </div>

      {/* 3 Loyalty Tiers */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {tiers.map((tier) => (
          <div
            key={tier.name}
            className="p-6 rounded-3xl bg-stone-900 border border-stone-800 shadow-xl space-y-4 flex flex-col justify-between"
          >
            <div>
              <div
                className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${tier.color} text-white flex items-center justify-center mb-4 shadow-lg`}
              >
                <Award className="w-6 h-6" />
              </div>

              <h3 className="text-base font-extrabold text-white">{tier.name}</h3>
              <p className="text-xs text-stone-400 mt-0.5">{tier.req}</p>

              <div className="mt-4 p-3 rounded-xl bg-stone-950 border border-stone-800 text-xs text-amber-300 font-semibold">
                Perk: {tier.cashback}
              </div>
            </div>

            <div className="pt-4 border-t border-stone-800 flex items-center justify-between text-xs text-stone-400">
              <span>Active Members:</span>
              <span className="font-extrabold text-white">{tier.activeMembers}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
