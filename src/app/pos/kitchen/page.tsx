"use client";

import React, { useState } from "react";
import {
  ChefHat,
  Clock,
  Flame,
  CheckCircle,
  AlertTriangle,
  RefreshCw,
  Filter,
  Sparkles,
} from "lucide-react";
import { useAdminOrders } from "@/context/AdminOrderContext";
import type { OrderStatus } from "@/types/orders";
import KitchenTicketCard from "@/components/pos/KitchenTicketCard";

export default function POSKitchenKDSPage() {
  const { kitchenOrders, updateOrderStatus } = useAdminOrders();
  const [stationFilter, setStationFilter] = useState<string>("all");

  const filteredTickets = kitchenOrders.filter((order) => {
    if (stationFilter === "all") return true;
    return order.status === stationFilter;
  });

  const pendingCount = kitchenOrders.filter((o) => o.status === "pending").length;
  const preparingCount = kitchenOrders.filter((o) => o.status === "preparing").length;
  const readyCount = kitchenOrders.filter((o) => o.status === "ready").length;

  return (
    <div className="flex-1 flex flex-col gap-4 min-h-0 lg:h-full select-none">
      {/* Top Station Status & Filter Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 shrink-0">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg sm:text-xl font-black text-white tracking-tight">
              Kitchen Display System (KDS)
            </h2>
            <span className="px-2.5 py-0.5 rounded-full bg-red-600/20 text-red-400 border border-red-500/30 text-xs font-black">
              Susan Road Oven Lines
            </span>
          </div>
          <p className="text-xs text-stone-400">
            Real-time station order progression and live elapsed timers
          </p>
        </div>

        {/* Station Filter Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          {[
            { id: "all", label: "All Active", count: kitchenOrders.length, color: "bg-stone-900" },
            { id: "pending", label: "New / Pending", count: pendingCount, color: "bg-red-950/40 text-red-400" },
            { id: "preparing", label: "In Oven", count: preparingCount, color: "bg-amber-950/40 text-amber-400" },
            { id: "ready", label: "Ready at Dispatch", count: readyCount, color: "bg-green-950/40 text-green-400" },
          ].map((tab) => {
            const isSelected = stationFilter === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setStationFilter(tab.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-black whitespace-nowrap transition-all flex items-center gap-1.5 ${
                  isSelected
                    ? "bg-red-600 text-white shadow-md shadow-red-600/30 ring-1 ring-red-500"
                    : "bg-stone-900 border border-stone-800 text-stone-400 hover:text-white"
                }`}
              >
                <span>{tab.label}</span>
                <span
                  className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono ${
                    isSelected ? "bg-white text-red-600" : "bg-stone-800 text-stone-300"
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main KDS Grid (Scrollable) */}
      <div className="flex-1 overflow-y-auto pr-1 min-h-0">
        {filteredTickets.length === 0 ? (
          <div className="h-full min-h-[300px] flex flex-col items-center justify-center text-center p-12 rounded-3xl bg-stone-900/40 border border-dashed border-stone-800 text-stone-400">
            <div className="w-16 h-16 rounded-3xl bg-stone-900 flex items-center justify-center mb-3">
              <ChefHat className="w-8 h-8 text-stone-600" />
            </div>
            <h3 className="text-base font-bold text-stone-300">
              {stationFilter === "all"
                ? "All Kitchen Tickets Cleared!"
                : `No orders currently in "${stationFilter}" state`}
            </h3>
            <p className="text-xs text-stone-500 mt-1 max-w-sm">
              New orders created via POS, Website, or WhatsApp will appear here automatically with live elapsed timers.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
            {filteredTickets.map((ticket) => (
              <KitchenTicketCard
                key={ticket.id}
                order={ticket}
                onUpdateStatus={updateOrderStatus}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
