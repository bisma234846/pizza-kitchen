"use client";

import React from "react";
import { Bike, Phone, MapPin, CheckCircle, Clock, Shield, ToggleLeft, ToggleRight } from "lucide-react";
import { useAdminOrders } from "@/context/AdminOrderContext";
import type { RiderStatus } from "@/types/orders";

export default function RidersPage() {
  const { riders, orders, updateRiderStatus } = useAdminOrders();

  const toggleStatus = (riderId: string, currentStatus: RiderStatus) => {
    const nextStatus: RiderStatus =
      currentStatus === "available"
        ? "offline"
        : currentStatus === "offline"
        ? "available"
        : "available";
    updateRiderStatus(riderId, nextStatus);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl font-black text-white">Riders & Delivery Fleet ({riders.length})</h2>
          <p className="text-xs text-stone-400">Live dispatch, active delivery routes & rider performance</p>
        </div>

        <div className="flex items-center gap-3">
          <span className="px-3 py-1.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30 text-xs font-bold">
            {riders.filter((r) => r.status === "available").length} Available • {riders.filter((r) => r.status === "on-trip").length} on Trip
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {riders.map((r) => {
          const activeOrder = orders.find((o) => o.riderId === r.id && o.status === "out-for-delivery");

          return (
            <div
              key={r.id}
              className="p-6 rounded-3xl bg-stone-900 border border-stone-800 shadow-xl space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between border-b border-stone-800 pb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-600/20 text-blue-400 flex items-center justify-center">
                      <Bike className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-black text-white">{r.name}</h4>
                      <span className="text-[11px] text-stone-400">{r.vehicleNumber}</span>
                    </div>
                  </div>

                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-bold border capitalize ${
                      r.status === "available"
                        ? "bg-green-500/20 text-green-300 border-green-500/30"
                        : r.status === "on-trip"
                        ? "bg-amber-500/20 text-amber-300 border-amber-500/30"
                        : "bg-stone-800 text-stone-400 border-stone-700"
                    }`}
                  >
                    {r.status}
                  </span>
                </div>

                <div className="space-y-2 text-xs text-stone-300">
                  <div className="flex justify-between">
                    <span className="text-stone-400">Phone:</span>
                    <span className="font-bold text-white">{r.phone}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-400">Active Task:</span>
                    <span className="font-bold text-amber-400">
                      {activeOrder ? `${activeOrder.orderNumber} (${activeOrder.deliveryAddress?.area || 'Delivery'})` : "At Susan Rd Branch"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-400">Primary Sector:</span>
                    <span className="font-bold text-stone-200">{r.primaryZone}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-400">Deliveries Today:</span>
                    <span className="font-bold text-green-400">{r.completedDeliveriesToday} orders</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-400">Rating:</span>
                    <span className="font-bold text-amber-400">{r.rating || 4.8}★</span>
                  </div>
                </div>
              </div>

              <div className="pt-3 flex items-center justify-between gap-2 border-t border-stone-800">
                <a
                  href={`tel:${r.phone}`}
                  className="flex-1 text-center py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-amber-400" />
                  <span>Call Rider</span>
                </a>
                <button
                  onClick={() => toggleStatus(r.id, r.status)}
                  className="flex-1 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white text-xs font-bold transition-colors"
                >
                  {r.status === "offline" ? "Set Online" : "Set Offline"}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
