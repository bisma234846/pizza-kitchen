"use client";

import React from "react";
import { ChefHat, Clock, Flame, CheckCircle, AlertCircle, RefreshCw, Eye } from "lucide-react";
import { useAdminOrders } from "@/context/AdminOrderContext";

export default function KitchenKDSPage() {
  const { kitchenOrders, updateOrderStatus } = useAdminOrders();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl font-black text-white">Kitchen Display System (KDS)</h2>
          <p className="text-xs text-stone-400">Live Station Orders • Susan Road Main Oven & Prep Lines</p>
        </div>

        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 text-xs text-green-400 font-bold bg-green-500/10 px-3 py-1.5 rounded-full border border-green-500/20">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            {kitchenOrders.length} Station Tickets Active
          </span>
        </div>
      </div>

      {/* KDS Screen Grid */}
      {kitchenOrders.length === 0 ? (
        <div className="p-16 text-center rounded-3xl bg-stone-900/60 border border-dashed border-stone-800 text-stone-400">
          <ChefHat className="w-12 h-12 text-stone-600 mx-auto mb-3" />
          <h3 className="text-base font-bold text-stone-300">All Kitchen Tickets Cleared!</h3>
          <p className="text-xs text-stone-500 mt-1">New orders from POS, WhatsApp, and Website will appear here instantly.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {kitchenOrders.map((ticket) => {
            const isPending = ticket.status === "pending";
            const isPreparing = ticket.status === "preparing";

            return (
              <div
                key={ticket.id}
                className={`rounded-3xl border p-6 flex flex-col justify-between shadow-2xl space-y-4 ${
                  isPreparing
                    ? "bg-stone-900 border-red-500/40 shadow-red-950/20"
                    : isPending
                    ? "bg-amber-950/20 border-amber-500/40"
                    : "bg-stone-900 border-green-500/40"
                }`}
              >
                {/* Ticket Header */}
                <div className="flex items-start justify-between border-b border-stone-800 pb-3">
                  <div>
                    <h3 className="text-base font-black text-white">{ticket.orderNumber}</h3>
                    <span className="text-xs text-stone-400 font-semibold capitalize">
                      {ticket.orderType} {ticket.tableNumber ? `(${ticket.tableNumber})` : ""} • {ticket.customerName}
                    </span>
                  </div>

                  <div className="flex items-center gap-1 px-3 py-1 rounded-xl bg-stone-950 text-amber-400 text-xs font-black border border-stone-800">
                    <Clock className="w-3.5 h-3.5" />
                    <span className="uppercase">{ticket.status}</span>
                  </div>
                </div>

                {/* Items */}
                <div className="space-y-3 py-2 flex-1">
                  {ticket.items.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-2xl bg-stone-950/70 border border-stone-800/80 space-y-1"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-extrabold text-white text-xs">
                          {item.quantity}x {item.name}
                        </span>
                        {item.size && (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-stone-800 text-stone-300">
                            {item.size}
                          </span>
                        )}
                      </div>
                      {item.notes && (
                        <p className="text-[11px] text-amber-300 italic">↳ {item.notes}</p>
                      )}
                    </div>
                  ))}
                </div>

                {/* Status Advancement Buttons */}
                <div className="pt-2">
                  {isPending && (
                    <button
                      onClick={() => updateOrderStatus(ticket.id, "preparing")}
                      className="w-full py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-all active:scale-95"
                    >
                      <ChefHat className="w-4 h-4" />
                      <span>Start Cooking (In Oven)</span>
                    </button>
                  )}

                  {isPreparing && (
                    <button
                      onClick={() => updateOrderStatus(ticket.id, "ready")}
                      className="w-full py-3 rounded-xl bg-green-600 hover:bg-green-700 text-white font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-all active:scale-95"
                    >
                      <CheckCircle className="w-4 h-4" />
                      <span>Mark Oven Ready</span>
                    </button>
                  )}

                  {ticket.status === "ready" && (
                    <div className="p-3 rounded-xl bg-green-500/10 border border-green-500/20 text-center text-xs font-bold text-green-400">
                      ✓ Cooked & Ready at Dispatch Table
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
