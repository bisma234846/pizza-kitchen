"use client";

import React from "react";
import {
  Clock,
  ChefHat,
  CheckCircle,
  Flame,
  AlertTriangle,
  User,
  MapPin,
  Check,
  Sparkles,
} from "lucide-react";
import type { Order, OrderStatus } from "@/types/orders";
import { useKitchenTimer } from "@/hooks/useKitchenTimer";

interface KitchenTicketCardProps {
  order: Order;
  onUpdateStatus: (orderId: string, nextStatus: OrderStatus) => void;
}

export default function KitchenTicketCard({
  order,
  onUpdateStatus,
}: KitchenTicketCardProps) {
  const { formattedTime, elapsedMinutes, urgency } = useKitchenTimer(order.createdAt);

  const isPending = order.status === "pending";
  const isPreparing = order.status === "preparing";
  const isReady = order.status === "ready";

  const getUrgencyBorder = () => {
    if (urgency === "critical") return "border-red-500 shadow-red-950/40 ring-1 ring-red-500/50";
    if (urgency === "warning") return "border-amber-500/80 shadow-amber-950/30 ring-1 ring-amber-500/40";
    if (isPreparing) return "border-red-600/50";
    if (isReady) return "border-green-500/60";
    return "border-stone-800";
  };

  const getUrgencyBadge = () => {
    if (urgency === "critical") {
      return (
        <span className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-red-600 text-white font-black text-xs animate-pulse">
          <AlertTriangle className="w-3.5 h-3.5" />
          <span>{formattedTime} (DELAYED)</span>
        </span>
      );
    }
    if (urgency === "warning") {
      return (
        <span className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/40 font-black text-xs">
          <Clock className="w-3.5 h-3.5 text-amber-400" />
          <span>{formattedTime}</span>
        </span>
      );
    }
    return (
      <span className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-stone-950 border border-stone-800 text-stone-300 font-mono font-bold text-xs">
        <Clock className="w-3.5 h-3.5 text-stone-400" />
        <span>{formattedTime}</span>
      </span>
    );
  };

  return (
    <div
      className={`rounded-3xl bg-[#121215] border p-5 flex flex-col justify-between shadow-2xl transition-all ${getUrgencyBorder()}`}
    >
      {/* Top: Ticket Number, Channel & Live Timer */}
      <div className="space-y-3 pb-3 border-b border-stone-800">
        <div className="flex items-start justify-between gap-2">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base sm:text-lg font-black text-white tracking-tight">
                {order.orderNumber}
              </h3>
              <span className="px-2 py-0.5 rounded-full bg-stone-900 border border-stone-800 text-[10px] font-black uppercase text-stone-300">
                {order.source}
              </span>
            </div>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="text-xs font-black text-red-400 capitalize">
                {order.orderType}
              </span>
              {order.tableNumber && (
                <span className="text-xs font-black text-amber-400">
                  • {order.tableNumber}
                </span>
              )}
              <span className="text-xs text-stone-400 truncate">
                • {order.customerName}
              </span>
            </div>
          </div>

          <div className="shrink-0">{getUrgencyBadge()}</div>
        </div>

        {/* Delivery / Address hint */}
        {order.deliveryAddress && (
          <div className="flex items-center gap-1.5 text-[11px] text-stone-400 bg-stone-950 p-2 rounded-xl border border-stone-800/80">
            <MapPin className="w-3.5 h-3.5 text-red-500 shrink-0" />
            <span className="truncate">{order.deliveryAddress.fullAddress}</span>
          </div>
        )}
      </div>

      {/* Middle: Items List (Dense, high readability) */}
      <div className="my-3 space-y-2.5 flex-1 overflow-y-auto max-h-60 pr-1">
        {order.items.map((item, idx) => (
          <div
            key={idx}
            className="p-3 rounded-2xl bg-stone-950/80 border border-stone-800/90 space-y-1"
          >
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-red-600/20 text-red-400 flex items-center justify-center font-black text-xs">
                  {item.quantity}x
                </span>
                <span className="text-xs sm:text-sm font-black text-white">
                  {item.name}
                </span>
              </div>

              {item.size && (
                <span className="px-2 py-0.5 rounded-lg bg-stone-800 text-stone-300 text-[10px] font-bold">
                  {item.size}
                </span>
              )}
            </div>

            {item.crust && (
              <div className="text-[11px] font-bold text-stone-400 pl-8">
                Crust: <span className="text-stone-200">{item.crust}</span>
              </div>
            )}

            {item.customizations && item.customizations.length > 0 && (
              <div className="text-[11px] font-bold text-amber-300 pl-8">
                Toppings: {item.customizations.join(", ")}
              </div>
            )}

            {item.notes && (
              <div className="text-[11px] font-extrabold text-red-400 italic pl-8">
                ↳ Kitchen Note: {item.notes}
              </div>
            )}
          </div>
        ))}

        {order.notes && (
          <div className="p-2.5 rounded-xl bg-amber-950/30 border border-amber-800/40 text-[11px] text-amber-300">
            <span className="font-bold">Order Note: </span>
            <span>{order.notes}</span>
          </div>
        )}
      </div>

      {/* Bottom: 1-Tap Status Advancement Button */}
      <div className="pt-3 border-t border-stone-800 shrink-0">
        {isPending && (
          <button
            type="button"
            onClick={() => onUpdateStatus(order.id, "preparing")}
            className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 active:scale-98 text-white font-black text-xs uppercase tracking-wider transition-all shadow-lg shadow-red-600/30 flex items-center justify-center gap-2"
          >
            <ChefHat className="w-4 h-4" />
            <span>Start Cooking (Put in Oven)</span>
          </button>
        )}

        {isPreparing && (
          <button
            type="button"
            onClick={() => onUpdateStatus(order.id, "ready")}
            className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 active:scale-98 text-black font-black text-xs uppercase tracking-wider transition-all shadow-lg shadow-amber-500/30 flex items-center justify-center gap-2"
          >
            <Flame className="w-4 h-4" />
            <span>Mark Baked & Oven Ready</span>
          </button>
        )}

        {isReady && (
          <div className="space-y-2">
            <div className="p-2.5 rounded-xl bg-green-500/10 border border-green-500/30 text-center text-xs font-bold text-green-400 flex items-center justify-center gap-1.5">
              <CheckCircle className="w-4 h-4" />
              <span>Ready at Counter / Dispatch</span>
            </div>

            {/* Complete order button for dine-in / takeaway */}
            <button
              type="button"
              onClick={() => onUpdateStatus(order.id, "completed")}
              className="w-full py-3 rounded-xl bg-green-600 hover:bg-green-700 active:scale-98 text-white font-black text-xs uppercase tracking-wider transition-all shadow-sm flex items-center justify-center gap-2"
            >
              <Check className="w-4 h-4 stroke-[3]" />
              <span>Complete & Bump Off Screen</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
