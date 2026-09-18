"use client";

import React, { useState } from "react";
import {
  Flame,
  Clock,
  Bike,
  CheckCircle2,
  Phone,
  MapPin,
  ChefHat,
  Eye,
  AlertTriangle,
  ArrowRight,
  XCircle,
  Sparkles,
} from "lucide-react";
import { formatPrice } from "@/lib/data";
import { useAdminOrders } from "@/context/AdminOrderContext";
import type { OrderStatus } from "@/types/orders";

export default function ActiveOrdersPage() {
  const {
    activeOrders,
    riders,
    updateOrderStatus,
    assignRider,
    cancelOrder,
  } = useAdminOrders();
  const [filter, setFilter] = useState<string>("all");
  const [selectedRiderMap, setSelectedRiderMap] = useState<Record<string, string>>({});

  const filteredOrders = activeOrders.filter((order) => {
    if (filter === "all") return true;
    return order.status === filter;
  });

  const getStageBadgeColor = (status: OrderStatus) => {
    switch (status) {
      case "pending":
        return "bg-amber-500/20 text-amber-300 border-amber-500/30";
      case "preparing":
        return "bg-red-600/20 text-red-400 border-red-500/30";
      case "ready":
        return "bg-green-500/20 text-green-300 border-green-500/30";
      case "out-for-delivery":
        return "bg-blue-500/20 text-blue-300 border-blue-500/30";
      default:
        return "bg-stone-800 text-stone-300 border-stone-700";
    }
  };

  const handleCancel = (orderId: string, orderNumber: string) => {
    const reason = prompt(`Enter cancellation reason for ${orderNumber}:`, "Customer requested cancellation");
    if (reason) {
      cancelOrder(orderId, reason);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header with Live Counter Badges */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl font-black text-white">Live Kitchen & Dispatch Stream</h2>
          <p className="text-xs text-stone-400">
            {activeOrders.length} active orders live in Susan Road system
          </p>
        </div>

        {/* Status Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {[
            { id: "all", label: `All Active (${activeOrders.length})` },
            { id: "pending", label: "Pending" },
            { id: "preparing", label: "In Kitchen" },
            { id: "ready", label: "Ready" },
            { id: "out-for-delivery", label: "Out for Delivery" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                filter === tab.id
                  ? "bg-red-600 text-white shadow-md shadow-red-600/30"
                  : "bg-stone-900 border border-stone-800 text-stone-400 hover:text-white"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Active Order Cards */}
      {filteredOrders.length === 0 ? (
        <div className="p-12 text-center rounded-3xl bg-stone-900/60 border border-dashed border-stone-800 text-stone-400">
          <ChefHat className="w-8 h-8 text-stone-600 mx-auto mb-2" />
          <p className="text-sm font-bold text-stone-300">No orders matching this filter</p>
          <p className="text-xs text-stone-500 mt-1">Orders created via POS or Web will appear here in real-time.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredOrders.map((order) => {
            const assignedRider = riders.find((r) => r.id === order.riderId);
            const availableRiders = riders.filter((r) => r.status === "available" || r.id === order.riderId);

            return (
              <div
                key={order.id}
                className="rounded-3xl bg-stone-900/90 border border-stone-800 p-6 flex flex-col justify-between shadow-xl space-y-4 hover:border-red-500/40 transition-colors"
              >
                {/* Top Bar */}
                <div className="flex items-start justify-between border-b border-stone-800 pb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-base font-black text-white">{order.orderNumber}</span>
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold border capitalize ${getStageBadgeColor(
                          order.status
                        )}`}
                      >
                        {order.status}
                      </span>
                      <span className="text-[10px] font-bold text-stone-400 uppercase bg-stone-950 px-2 py-0.5 rounded border border-stone-800">
                        {order.orderType}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mt-1 text-xs text-stone-400">
                      <span className="font-bold text-stone-200">{order.customerName}</span>
                      <span>•</span>
                      <span>{order.phone}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-stone-950 border border-stone-800">
                    <Clock className="w-3.5 h-3.5 text-amber-400" />
                    <span className="text-xs font-extrabold text-amber-400">
                      {order.source.toUpperCase()}
                    </span>
                  </div>
                </div>

                {/* Delivery Address or Dine-In Table */}
                {order.deliveryAddress && (
                  <div className="flex items-start gap-2 text-xs text-stone-300 bg-stone-950/60 p-2.5 rounded-xl border border-stone-800/80">
                    <MapPin className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                    <span className="truncate">{order.deliveryAddress.fullAddress}</span>
                  </div>
                )}

                {order.tableNumber && (
                  <div className="flex items-center gap-2 text-xs text-amber-300 bg-amber-500/10 p-2.5 rounded-xl border border-amber-500/20">
                    <span className="font-bold">{order.tableNumber}</span>
                  </div>
                )}

                {/* Items Checklist */}
                <div className="space-y-2 py-1 flex-1">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-start text-xs">
                      <div>
                        <span className="font-bold text-white">
                          {item.quantity}x {item.name}
                        </span>
                        {item.size && (
                          <span className="text-stone-400 text-[11px] ml-1">({item.size})</span>
                        )}
                        {item.notes && (
                          <span className="block text-[10px] text-stone-400 italic">
                            ↳ {item.notes}
                          </span>
                        )}
                      </div>
                      <span className="text-stone-400">{formatPrice(item.itemTotal)}</span>
                    </div>
                  ))}
                </div>

                {/* Rider Assignment for Delivery Orders */}
                {order.orderType === "delivery" && order.status !== "completed" && (
                  <div className="p-3 rounded-2xl bg-stone-950/80 border border-stone-800/80 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 text-xs">
                      <Bike className="w-4 h-4 text-blue-400 shrink-0" />
                      <span className="text-stone-400">
                        {assignedRider ? (
                          <strong className="text-white">Rider: {assignedRider.name}</strong>
                        ) : (
                          "Assign Rider:"
                        )}
                      </span>
                    </div>

                    {!assignedRider ? (
                      <select
                        value={selectedRiderMap[order.id] || ""}
                        onChange={(e) => {
                          const val = e.target.value;
                          setSelectedRiderMap((prev) => ({ ...prev, [order.id]: val }));
                          if (val) assignRider(order.id, val);
                        }}
                        className="px-2.5 py-1 rounded-lg bg-stone-900 border border-stone-700 text-xs text-white focus:outline-none focus:border-blue-500"
                      >
                        <option value="">Select Rider...</option>
                        {availableRiders.map((r) => (
                          <option key={r.id} value={r.id}>
                            {r.name} ({r.primaryZone})
                          </option>
                        ))}
                      </select>
                    ) : (
                      <span className="text-[11px] font-bold text-green-400 px-2 py-0.5 rounded bg-green-500/20">
                        Dispatched ({assignedRider.phone})
                      </span>
                    )}
                  </div>
                )}

                {/* Bottom Actions Bar */}
                <div className="pt-3 border-t border-stone-800 flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <span className="text-[10px] text-stone-400 uppercase tracking-wider block">
                      Total ({order.paymentMethod.toUpperCase()})
                    </span>
                    <span className="text-sm font-black text-red-400">
                      {formatPrice(order.total)}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {/* Cancellation Trigger */}
                    <button
                      onClick={() => handleCancel(order.id, order.orderNumber)}
                      className="p-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-400 hover:text-red-400 transition-colors"
                      title="Cancel Order"
                    >
                      <XCircle className="w-4 h-4" />
                    </button>

                    {/* Progression Actions based on status */}
                    {order.status === "pending" && (
                      <button
                        onClick={() => updateOrderStatus(order.id, "preparing")}
                        className="px-3.5 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-red-600/30"
                      >
                        <ChefHat className="w-3.5 h-3.5" />
                        <span>Start Cooking</span>
                      </button>
                    )}

                    {order.status === "preparing" && (
                      <button
                        onClick={() => updateOrderStatus(order.id, "ready")}
                        className="px-3.5 py-2 rounded-xl bg-green-600 hover:bg-green-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-md"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Mark Ready</span>
                      </button>
                    )}

                    {order.status === "ready" && order.orderType !== "delivery" && (
                      <button
                        onClick={() => updateOrderStatus(order.id, "completed")}
                        className="px-3.5 py-2 rounded-xl bg-green-600 hover:bg-green-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-md"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Handover / Paid</span>
                      </button>
                    )}

                    {order.status === "out-for-delivery" && (
                      <button
                        onClick={() => updateOrderStatus(order.id, "completed")}
                        className="px-3.5 py-2 rounded-xl bg-green-600 hover:bg-green-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-md"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Delivered & Paid</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
