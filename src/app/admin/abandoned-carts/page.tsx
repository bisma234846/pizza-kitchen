"use client";

import React from "react";
import { ShoppingCart, MessageSquare, Clock, ArrowRight, RefreshCw } from "lucide-react";
import { formatPrice } from "@/lib/data";

export default function AbandonedCartsPage() {
  const carts = [
    { id: "CART-881", customer: "Usman Ghani", phone: "0321-4567890", items: "1x Super Supreme Large, 2x Cold Drinks", value: 2090, droppedAt: "35 mins ago", status: "Unrecovered" },
    { id: "CART-880", customer: "Mariam Khalid", phone: "0300-1122334", items: "1x Chicken Tikka Medium, 1x Malai Boti Roll", value: 2330, droppedAt: "1h 10m ago", status: "WA Sent" },
    { id: "CART-879", customer: "Saad Rehman", phone: "0333-9988776", items: "2x Fettuccine Alfredo, 6x Wings", value: 2148, droppedAt: "2h 40m ago", status: "Recovered (15% OFF)" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl font-black text-white">Abandoned Carts & Recovery</h2>
          <p className="text-xs text-stone-400">Recover lost revenue with 1-click WhatsApp discount reminders</p>
        </div>

        <button
          onClick={() => alert("WhatsApp recovery broadcast triggered for all active abandoned carts!")}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-green-600 hover:bg-green-700 text-white text-xs font-bold transition-all shadow-lg"
        >
          <MessageSquare className="w-4 h-4" />
          <span>Send Batch WhatsApp Promos</span>
        </button>
      </div>

      <div className="space-y-4">
        {carts.map((cart) => (
          <div
            key={cart.id}
            className="p-6 rounded-3xl bg-stone-900 border border-stone-800 flex flex-col md:flex-row md:items-center md:justify-between gap-4 shadow-xl"
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-black text-white text-sm">{cart.id}</span>
                <span className="text-xs text-stone-400">({cart.customer} • {cart.phone})</span>
                <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[10px] font-bold">
                  {cart.status}
                </span>
              </div>
              <p className="text-xs text-stone-300">{cart.items}</p>
              <span className="text-[11px] text-stone-500 block">Dropped {cart.droppedAt}</span>
            </div>

            <div className="flex items-center gap-4 shrink-0">
              <span className="text-base font-black text-white">{formatPrice(cart.value)}</span>
              <button
                onClick={() => alert(`Sent WhatsApp recovery link with 10% discount to ${cart.customer}`)}
                className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-red-600/30"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Recover via WA</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
