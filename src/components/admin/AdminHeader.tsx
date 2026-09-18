"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  Search,
  Bell,
  Plus,
  Radio,
  Clock,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";
import { CURRENT_ADMIN_USER, BRANCH_STATUS } from "@/lib/adminData";
import { useAdminOrders } from "@/context/AdminOrderContext";
import { formatPrice } from "@/lib/data";

interface AdminHeaderProps {
  onOpenMobileSidebar: () => void;
  isCollapsed: boolean;
}

export default function AdminHeader({
  onOpenMobileSidebar,
}: AdminHeaderProps) {
  const pathname = usePathname();
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { orders, activeOrders, cancelRequests } = useAdminOrders();

  // Derive current page title from pathname
  const getPageTitle = () => {
    if (pathname === "/admin") return { title: "Operations Dashboard", subtitle: "Real-time kitchen, rider & order metrics" };
    if (pathname.includes("/admin/pos")) return { title: "Point of Sale (POS)", subtitle: "Counter & dine-in terminal" };
    if (pathname.includes("/admin/orders/active")) return { title: "Active Orders", subtitle: "Live orders in preparation & dispatch" };
    if (pathname.includes("/admin/orders/cancel-requests")) return { title: "Cancel Requests", subtitle: "Review cancellation & refund requests" };
    if (pathname.includes("/admin/orders")) return { title: "All Orders", subtitle: "Full order logs, search & history" };
    if (pathname.includes("/admin/kitchen")) return { title: "Kitchen Display System", subtitle: "Oven stations, queues & prep timers" };
    if (pathname.includes("/admin/riders")) return { title: "Riders & Delivery Fleet", subtitle: "Live dispatch & rider status" };
    if (pathname.includes("/admin/abandoned-carts")) return { title: "Abandoned Carts", subtitle: "WhatsApp recovery & drop-off analytics" };
    if (pathname.includes("/admin/reviews")) return { title: "Customer Reviews", subtitle: "Google & direct customer feedback" };
    if (pathname.includes("/admin/follow-up-wa")) return { title: "WhatsApp Follow-ups", subtitle: "Post-delivery reviews & repeat customer prompts" };
    if (pathname.includes("/admin/birthdays")) return { title: "Birthday Club", subtitle: "Automated birthday greetings & promo codes" };
    if (pathname.includes("/admin/loyalty")) return { title: "Loyalty & Rewards", subtitle: "Customer tiers, points & cashback" };
    if (pathname.includes("/admin/deals")) return { title: "Deals & Promotions", subtitle: "Manage bundles, percentages & specials" };
    return { title: "Admin Portal", subtitle: "The Pizza Kitchen Management" };
  };

  const { title, subtitle } = getPageTitle();

  const notifications = orders.slice(0, 4).map((order) => ({
    id: order.id,
    title: `${order.orderNumber} • ${order.customerName}`,
    desc: order.items.map((i) => `${i.quantity}x ${i.name}`).join(", "),
    time: order.status.toUpperCase(),
    type: order.status === "cancelled" ? "warning" : order.status === "completed" ? "success" : "order",
  }));

  return (
    <header className="sticky top-0 z-30 h-18 bg-[#0F0F11]/90 backdrop-blur-md border-b border-stone-800 px-4 sm:px-6 flex items-center justify-between gap-4">
      {/* LEFT: Mobile Toggle + Breadcrumb / Title */}
      <div className="flex items-center gap-3 min-w-0">
        <button
          onClick={onOpenMobileSidebar}
          aria-label="Open Sidebar Navigation"
          className="lg:hidden p-2 rounded-xl bg-stone-900 border border-stone-800 text-stone-300 hover:text-white hover:bg-stone-800 transition-colors"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="flex flex-col min-w-0">
          <div className="flex items-center gap-2">
            <h1 className="text-base sm:text-lg font-black text-white truncate tracking-tight">
              {title}
            </h1>
            <span className="hidden sm:inline-block text-stone-600 font-normal">|</span>
            <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-stone-900 border border-stone-800 text-[11px] font-semibold text-stone-400">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
              Susan Road Branch
            </span>
          </div>
          <p className="text-[11px] text-stone-400 truncate hidden md:block">
            {subtitle}
          </p>
        </div>
      </div>

      {/* RIGHT: Search, Live Status, Quick POS, Notifications */}
      <div className="flex items-center gap-2.5 sm:gap-3.5 shrink-0">
        {/* Branch Live Status Pill */}
        <div className="hidden xl:flex items-center gap-2 px-3 py-1.5 rounded-full bg-stone-900 border border-stone-800 text-xs text-stone-300">
          <Radio className="w-3.5 h-3.5 text-green-500 animate-pulse" />
          <span className="font-semibold text-white">{BRANCH_STATUS.statusText}</span>
          <span className="text-stone-600">•</span>
          <span className="text-stone-400 text-[11px]">{BRANCH_STATUS.averagePrepTime} avg</span>
        </div>

        {/* Quick Search */}
        <div className="relative hidden md:block w-44 lg:w-60">
          <Search className="w-3.5 h-3.5 text-stone-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search orders, phone..."
            className="w-full pl-8.5 pr-3 py-1.5 rounded-xl bg-stone-900/80 border border-stone-800 text-xs text-stone-200 placeholder-stone-500 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all"
          />
        </div>

        {/* Quick POS Button */}
        <Link
          href="/admin/pos"
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-red-600 hover:bg-red-700 active:scale-95 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md shadow-red-600/30"
        >
          <Plus className="w-4 h-4 stroke-[3]" />
          <span className="hidden sm:inline">New POS Order</span>
          <span className="sm:hidden">POS</span>
        </Link>

        {/* Notifications Bell with Popover */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            aria-label="View Notifications"
            className="relative p-2 rounded-xl bg-stone-900 border border-stone-800 text-stone-300 hover:text-white hover:bg-stone-800 transition-colors"
          >
            <Bell className="w-4.5 h-4.5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500 ring-2 ring-stone-900 animate-pulse" />
          </button>

          {/* Notifications Dropdown */}
          {showNotifications && (
            <>
              <div
                onClick={() => setShowNotifications(false)}
                className="fixed inset-0 z-40"
              />
              <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl bg-stone-900 border border-stone-800 shadow-2xl p-4 z-50 text-stone-200 space-y-3 animate-in fade-in zoom-in-95 duration-150">
                <div className="flex items-center justify-between border-b border-stone-800 pb-2.5">
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-sm text-white">Live Activity</span>
                    <span className="px-1.5 py-0.5 rounded-full bg-red-600/20 text-red-400 text-[10px] font-bold">
                      3 New
                    </span>
                  </div>
                  <button
                    onClick={() => setShowNotifications(false)}
                    className="text-[11px] text-stone-400 hover:text-white"
                  >
                    Mark read
                  </button>
                </div>

                <div className="space-y-2 max-h-72 overflow-y-auto">
                  {notifications.map((n) => (
                    <div
                      key={n.id}
                      className="p-2.5 rounded-xl bg-stone-950/60 border border-stone-800/80 hover:border-stone-700 transition-colors flex items-start gap-3"
                    >
                      <div className="mt-0.5 shrink-0">
                        {n.type === "order" && (
                          <div className="w-6 h-6 rounded-full bg-red-600/20 text-red-400 flex items-center justify-center">
                            <Clock className="w-3.5 h-3.5" />
                          </div>
                        )}
                        {n.type === "warning" && (
                          <div className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center">
                            <AlertTriangle className="w-3.5 h-3.5" />
                          </div>
                        )}
                        {n.type === "success" && (
                          <div className="w-6 h-6 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold text-white truncate">{n.title}</p>
                        <p className="text-[11px] text-stone-400 line-clamp-1">{n.desc}</p>
                        <span className="text-[10px] text-stone-400 mt-1 block">{n.time}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <Link
                  href="/admin/orders/active"
                  onClick={() => setShowNotifications(false)}
                  className="block text-center text-xs font-bold text-red-400 hover:text-red-300 py-1.5 rounded-lg bg-stone-800/50 hover:bg-stone-800 transition-colors"
                >
                  View All Active Kitchen Orders →
                </Link>
              </div>
            </>
          )}
        </div>

        {/* User Mini Avatar */}
        <div className="flex items-center gap-2 pl-2 border-l border-stone-800">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-red-600 to-amber-500 flex items-center justify-center text-white font-black text-xs shadow-sm">
            MH
          </div>
          <div className="hidden 2xl:flex flex-col">
            <span className="text-xs font-bold text-white leading-none">
              {CURRENT_ADMIN_USER.name}
            </span>
            <span className="text-[10px] text-stone-400 mt-0.5">
              {CURRENT_ADMIN_USER.role}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
