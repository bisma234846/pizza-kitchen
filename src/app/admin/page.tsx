"use client";

import React from "react";
import Link from "next/link";
import {
  TrendingUp,
  ShoppingBag,
  Clock,
  Bike,
  Plus,
  ArrowRight,
  Flame,
  ChefHat,
  Star,
  Users,
  MessageSquare,
  AlertCircle,
  Eye,
  CheckCircle2,
  Phone,
} from "lucide-react";
import { formatPrice } from "@/lib/data";
import { BRANCH_STATUS } from "@/lib/adminData";
import { useAdminOrders } from "@/context/AdminOrderContext";
import type { OrderStatus } from "@/types/orders";

export default function AdminDashboardPage() {
  const {
    orders,
    riders,
    activeOrders,
    kitchenOrders,
    cancelRequests,
    todayTotalRevenue,
    todayCompletedCount,
    activeOrdersCount,
    availableRidersCount,
  } = useAdminOrders();

  const pendingCount = orders.filter((o) => o.status === "pending").length;
  const preparingCount = orders.filter((o) => o.status === "preparing").length;
  const outForDeliveryCount = orders.filter((o) => o.status === "out-for-delivery").length;

  const stats = [
    {
      id: "sales",
      title: "Today's Gross Sales",
      value: formatPrice(todayTotalRevenue),
      change: `+${orders.length} orders today`,
      changeType: "positive",
      subtext: "Live revenue calculated",
      icon: TrendingUp,
      accentColor: "from-red-600 to-amber-600",
    },
    {
      id: "active",
      title: "Live Active Orders",
      value: `${activeOrdersCount} Orders`,
      change: `${kitchenOrders.length} in Kitchen`,
      changeType: "neutral",
      subtext: `${outForDeliveryCount} Out for Delivery`,
      icon: Flame,
      accentColor: "from-amber-500 to-yellow-500",
    },
    {
      id: "prep-time",
      title: "Avg. Prep & Delivery",
      value: "22 mins",
      change: "-3 mins vs target",
      changeType: "positive",
      subtext: "30-min SLA 98.2%",
      icon: Clock,
      accentColor: "from-green-600 to-emerald-600",
    },
    {
      id: "riders",
      title: "Active Fleet (Riders)",
      value: `${availableRidersCount} Free / ${riders.length}`,
      change: `${riders.filter((r) => r.status === "on-trip").length} on trip`,
      changeType: "neutral",
      subtext: "Susan Rd & Kohinoor zones",
      icon: Bike,
      accentColor: "from-blue-600 to-cyan-600",
    },
  ];

  const getStatusBadge = (status: OrderStatus) => {
    switch (status) {
      case "pending":
        return "bg-amber-500/20 text-amber-300 border-amber-500/30";
      case "preparing":
        return "bg-red-600/20 text-red-400 border-red-500/30";
      case "ready":
        return "bg-green-500/20 text-green-300 border-green-500/30";
      case "out-for-delivery":
        return "bg-blue-500/20 text-blue-300 border-blue-500/30";
      case "completed":
        return "bg-stone-800 text-stone-300 border-stone-700";
      case "cancelled":
        return "bg-red-500/20 text-red-400 border-red-500/30";
      default:
        return "bg-stone-800 text-stone-300 border-stone-700";
    }
  };

  return (
    <div className="space-y-8 pb-10">
      {/* BRANCH HIGHLIGHT BANNER */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-stone-900 via-stone-900 to-stone-950 border border-stone-800 p-6 sm:p-8 text-white shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-500/20 text-green-400 border border-green-500/30 text-xs font-bold uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                Live Branch Operations
              </span>
              <span className="text-stone-400 text-xs font-semibold">
                Shift: Muhammad Hamza (Super Admin)
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              Susan Road Kitchen Hub
            </h2>

            <p className="text-stone-400 text-xs sm:text-sm leading-relaxed">
              Serving Faisalabad with 30-min hot delivery. Tracking <strong className="text-amber-400 font-bold">{activeOrdersCount} live orders</strong> across Kitchen KDS and {availableRidersCount} available delivery riders.
            </p>
          </div>

          {/* Quick Action Shortcuts */}
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Link
              href="/admin/pos"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-red-600 hover:bg-red-700 active:scale-95 text-white font-extrabold text-xs uppercase tracking-wider transition-all shadow-lg shadow-red-600/30"
            >
              <Plus className="w-4 h-4 stroke-[3]" />
              <span>Launch POS</span>
            </Link>

            <Link
              href="/admin/kitchen"
              className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-stone-800 hover:bg-stone-700 active:scale-95 text-stone-200 hover:text-white font-bold text-xs uppercase tracking-wider transition-all border border-stone-700"
            >
              <ChefHat className="w-4 h-4 text-amber-400" />
              <span>Kitchen KDS ({kitchenOrders.length})</span>
            </Link>

            <Link
              href="/admin/orders/active"
              className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-stone-800 hover:bg-stone-700 active:scale-95 text-stone-200 hover:text-white font-bold text-xs uppercase tracking-wider transition-all border border-stone-700"
            >
              <Flame className="w-4 h-4 text-red-400" />
              <span>Active Orders ({activeOrdersCount})</span>
            </Link>
          </div>
        </div>
      </div>

      {/* 4 STAT CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {stats.map((item) => {
          const IconComponent = item.icon;
          return (
            <div
              key={item.id}
              className="group relative rounded-2xl bg-stone-900/90 border border-stone-800/90 p-5 sm:p-6 text-white hover:border-red-500/40 hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div className="flex items-start justify-between gap-3 mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-stone-400">
                  {item.title}
                </span>
                <div
                  className={`w-10 h-10 rounded-xl bg-gradient-to-br ${item.accentColor} flex items-center justify-center text-white shadow-md shadow-red-950/40 shrink-0 group-hover:scale-110 transition-transform`}
                >
                  <IconComponent className="w-5 h-5" />
                </div>
              </div>

              <div>
                <div className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  {item.value}
                </div>

                <div className="flex items-center gap-2 mt-2 pt-2 border-t border-stone-800/80 text-xs">
                  <span
                    className={`font-bold ${
                      item.changeType === "positive"
                        ? "text-green-400"
                        : "text-amber-400"
                    }`}
                  >
                    {item.change}
                  </span>
                  <span className="text-stone-400 truncate">{item.subtext}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* LIVE OPERATIONS WORKFLOW PIPELINE */}
      <div className="rounded-3xl bg-stone-900/80 border border-stone-800 p-6 space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <Flame className="w-5 h-5 text-red-500" />
            <h3 className="text-base font-extrabold text-white">
              Live Order Fulfillment Pipeline
            </h3>
          </div>
          <Link
            href="/admin/orders/active"
            className="text-xs font-bold text-red-400 hover:text-red-300 flex items-center gap-1"
          >
            <span>Manage Live Orders</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-stone-950/70 border border-stone-800 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-stone-400">1. Pending / New</p>
              <p className="text-xl font-black text-white mt-0.5">{pendingCount} Orders</p>
              <p className="text-[11px] text-amber-400 mt-0.5">Awaiting Kitchen</p>
            </div>
            <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
              ⏳
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-stone-950/70 border border-stone-800 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-stone-400">2. In Oven / Kitchen</p>
              <p className="text-xl font-black text-white mt-0.5">{preparingCount} Orders</p>
              <p className="text-[11px] text-red-400 mt-0.5">Baking & Prep</p>
            </div>
            <div className="w-9 h-9 rounded-xl bg-red-600/20 text-red-400 flex items-center justify-center font-bold">
              🍕
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-stone-950/70 border border-stone-800 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-stone-400">3. Out with Riders</p>
              <p className="text-xl font-black text-white mt-0.5">{outForDeliveryCount} Orders</p>
              <p className="text-[11px] text-blue-400 mt-0.5">In Transit</p>
            </div>
            <div className="w-9 h-9 rounded-xl bg-blue-600/20 text-blue-400 flex items-center justify-center font-bold">
              🛵
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-stone-950/70 border border-stone-800 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-stone-400">4. Completed Today</p>
              <p className="text-xl font-black text-white mt-0.5">{todayCompletedCount} Orders</p>
              <p className="text-[11px] text-green-400 mt-0.5">100% on time</p>
            </div>
            <div className="w-9 h-9 rounded-xl bg-green-600/20 text-green-400 flex items-center justify-center font-bold">
              ✅
            </div>
          </div>
        </div>
      </div>

      {/* 2-COLUMN SECTION: RECENT ORDERS TABLE & MARKETING/OPERATIONS PULSE */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* RECENT ORDERS TABLE (8 cols) */}
        <div className="lg:col-span-8 rounded-3xl bg-stone-900/90 border border-stone-800 p-6 space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-2 border-b border-stone-800 pb-4">
            <div>
              <h3 className="text-base font-extrabold text-white">Recent Kitchen & POS Orders</h3>
              <p className="text-xs text-stone-400">Live order queue and payment status</p>
            </div>
            <Link
              href="/admin/orders"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs font-bold transition-colors"
            >
              <span>View All {orders.length} Orders</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-stone-300">
              <thead className="text-[11px] uppercase tracking-wider text-stone-400 border-b border-stone-800">
                <tr>
                  <th className="py-3 px-2 font-bold">Order ID</th>
                  <th className="py-3 px-2 font-bold">Customer</th>
                  <th className="py-3 px-2 font-bold hidden md:table-cell">Items</th>
                  <th className="py-3 px-2 font-bold">Amount</th>
                  <th className="py-3 px-2 font-bold">Status</th>
                  <th className="py-3 px-2 font-bold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-800/60">
                {orders.slice(0, 6).map((order) => (
                  <tr key={order.id} className="hover:bg-stone-800/30 transition-colors">
                    <td className="py-3 px-2 font-black text-white whitespace-nowrap">
                      {order.orderNumber}
                      <span className="block text-[10px] text-stone-400 font-normal">
                        {order.source.toUpperCase()}
                      </span>
                    </td>

                    <td className="py-3 px-2 whitespace-nowrap">
                      <div className="font-bold text-stone-200">{order.customerName}</div>
                      <div className="text-[10px] text-stone-400">{order.phone}</div>
                    </td>

                    <td className="py-3 px-2 hidden md:table-cell max-w-xs truncate text-stone-400">
                      {order.items.map((i) => `${i.quantity}x ${i.name}`).join(", ")}
                    </td>

                    <td className="py-3 px-2 font-black text-white whitespace-nowrap">
                      {formatPrice(order.total)}
                      <span className="block text-[10px] text-stone-400 font-normal">
                        {order.orderType}
                      </span>
                    </td>

                    <td className="py-3 px-2 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold border capitalize ${getStatusBadge(
                          order.status
                        )}`}
                      >
                        {order.status}
                      </span>
                    </td>

                    <td className="py-3 px-2 text-right whitespace-nowrap">
                      <Link
                        href={`/admin/orders/active`}
                        className="p-1.5 rounded-lg bg-stone-800 hover:bg-red-600 text-stone-300 hover:text-white transition-colors inline-block"
                        title="View Order Details"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* MARKETING & OPERATIONS QUICK HIGHLIGHTS (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Quick Shortcuts Card */}
          <div className="rounded-3xl bg-stone-900/90 border border-stone-800 p-6 space-y-4">
            <h3 className="text-sm font-extrabold text-white uppercase tracking-wider">
              Marketing Quick Actions
            </h3>

            <div className="space-y-2.5">
              <Link
                href="/admin/follow-up-wa"
                className="flex items-center justify-between p-3 rounded-2xl bg-stone-950/70 border border-stone-800 hover:border-green-500/40 hover:bg-stone-850 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-green-500/20 text-green-400 flex items-center justify-center">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white group-hover:text-green-400 transition-colors">
                      WhatsApp Follow-up
                    </h4>
                    <p className="text-[10px] text-stone-400">Post-meal review automated prompts</p>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-stone-500 group-hover:text-green-400 transition-colors" />
              </Link>

              <Link
                href="/admin/birthdays"
                className="flex items-center justify-between p-3 rounded-2xl bg-stone-950/70 border border-stone-800 hover:border-red-500/40 hover:bg-stone-850 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-red-600/20 text-red-400 flex items-center justify-center">
                    <Users className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white group-hover:text-red-400 transition-colors">
                      Birthday Greetings
                    </h4>
                    <p className="text-[10px] text-stone-400">Automated discounts & vouchers</p>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-stone-500 group-hover:text-red-400 transition-colors" />
              </Link>

              <Link
                href="/admin/orders/cancel-requests"
                className="flex items-center justify-between p-3 rounded-2xl bg-stone-950/70 border border-stone-800 hover:border-amber-500/40 hover:bg-stone-850 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
                    <AlertCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white group-hover:text-amber-400 transition-colors">
                      Cancel Requests
                    </h4>
                    <p className="text-[10px] text-stone-400">{cancelRequests.length} pending review</p>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-stone-500 group-hover:text-amber-400 transition-colors" />
              </Link>
            </div>
          </div>

          {/* Customer Rating Card */}
          <div className="rounded-3xl bg-gradient-to-br from-stone-900 to-stone-950 border border-stone-800 p-6 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                Customer Satisfaction
              </span>
              <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[10px] font-bold border border-amber-500/30">
                Google Verified
              </span>
            </div>

            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-white">4.1★</span>
              <span className="text-xs text-stone-400">938+ reviews on Susan Road</span>
            </div>

            <p className="text-xs text-stone-400 italic">
              "Malai Boti pizza is my go-to order. Creamy, tender, and full of flavor."
            </p>

            <Link
              href="/admin/reviews"
              className="block text-center text-xs font-bold text-red-400 hover:text-white py-2 rounded-xl bg-stone-800 hover:bg-red-600 transition-colors mt-2"
            >
              Manage & Reply to Reviews
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
