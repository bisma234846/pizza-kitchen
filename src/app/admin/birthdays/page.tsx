"use client";

import React from "react";
import { Cake, Gift, Send, Users, Calendar, Phone } from "lucide-react";

export default function BirthdaysPage() {
  const birthdaysToday = [
    { id: "B-1", name: "Zubair Hashmi", phone: "0321-8849102", birthday: "Today (18 Sep)", ordersCount: 16, rewardSent: "Free Brownie Sundae Voucher", status: "Sent at 9:00 AM" },
    { id: "B-2", name: "Fatima Noor", phone: "0300-5512984", birthday: "Today (18 Sep)", ordersCount: 8, rewardSent: "25% OFF Birthday Pizza Voucher", status: "Sent at 9:00 AM" },
    { id: "B-3", name: "Ahmed Raza", phone: "0333-7729104", birthday: "Tomorrow (19 Sep)", ordersCount: 22, rewardSent: "VIP Birthday Deal Access", status: "Queued for 9:00 AM" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl font-black text-white">Birthday Club Automation</h2>
          <p className="text-xs text-stone-400">Delight loyal customers on their special day with automated perks & vouchers</p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3.5 py-1.5 rounded-full bg-red-600/20 text-red-400 border border-red-500/30 text-xs font-bold flex items-center gap-1.5">
            <Cake className="w-3.5 h-3.5" />
            <span>2 Celebrating Today</span>
          </span>
        </div>
      </div>

      <div className="space-y-4">
        {birthdaysToday.map((b) => (
          <div
            key={b.id}
            className="p-6 rounded-3xl bg-stone-900 border border-stone-800 flex flex-col md:flex-row md:items-center md:justify-between gap-4 shadow-xl"
          >
            <div className="flex items-start gap-4">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-red-600 to-amber-500 text-white flex items-center justify-center shrink-0 shadow-md shadow-red-950/40">
                <Cake className="w-6 h-6" />
              </div>

              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-black text-white">{b.name}</h4>
                  <span className="text-xs text-stone-400 font-semibold">({b.phone})</span>
                  <span className="px-2 py-0.5 rounded-full bg-stone-800 text-amber-300 text-[10px] font-bold">
                    {b.ordersCount} Lifetime Orders
                  </span>
                </div>
                <p className="text-xs text-stone-300 font-medium flex items-center gap-1.5">
                  <Gift className="w-3.5 h-3.5 text-amber-400" />
                  <span>Assigned Perk: <strong className="text-white">{b.rewardSent}</strong></span>
                </p>
                <span className="text-[10px] text-green-400 block pt-0.5">{b.status}</span>
              </div>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={() => alert(`Resending birthday WhatsApp greetings to ${b.name}`)}
                className="px-4 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-bold transition-colors"
              >
                Resend WA
              </button>
              <button
                onClick={() => alert(`Custom VIP bonus perk added for ${b.name}`)}
                className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold transition-colors shadow-md shadow-red-600/30"
              >
                + Add Bonus Perk
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
