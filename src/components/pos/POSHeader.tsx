"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Calculator,
  ChefHat,
  ShoppingBag,
  Clock,
  LogOut,
  Shield,
  User,
  Radio,
  ExternalLink,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useAdminOrders } from "@/context/AdminOrderContext";
import { BRANCH_STATUS } from "@/lib/adminData";

export default function POSHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();
  const { kitchenOrders, activeOrders } = useAdminOrders();
  const [timeStr, setTimeStr] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(
        now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const navItems = [
    {
      label: "POS Terminal",
      href: "/pos",
      icon: Calculator,
      active: pathname === "/pos" || pathname.startsWith("/pos/payment"),
    },
    {
      label: "Kitchen KDS",
      href: "/pos/kitchen",
      icon: ChefHat,
      badge: kitchenOrders.length,
      badgeColor: "bg-amber-500/20 text-amber-300 border-amber-500/30",
      active: pathname.startsWith("/pos/kitchen"),
    },
    {
      label: "Counter Orders",
      href: "/pos/orders",
      icon: ShoppingBag,
      badge: activeOrders.length,
      badgeColor: "bg-red-500/20 text-red-300 border-red-500/30",
      active: pathname.startsWith("/pos/orders"),
    },
  ];

  return (
    <header className="sticky top-0 z-40 h-16 bg-[#0c0c0e] border-b border-stone-800/80 px-4 sm:px-6 flex items-center justify-between gap-3 select-none">
      {/* LEFT: Branding & Branch */}
      <div className="flex items-center gap-3 shrink-0">
        <Link href="/pos" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-red-600 to-red-700 flex items-center justify-center font-black text-white text-base shadow-md shadow-red-600/30">
            🍕
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-black tracking-wider uppercase text-white group-hover:text-red-400 transition-colors">
              The Pizza Kitchen
            </span>
            <span className="text-[10px] font-bold text-stone-400 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              POS Terminal • Susan Rd
            </span>
          </div>
        </Link>
      </div>

      {/* CENTER: Navigation Tabs */}
      <nav className="flex items-center gap-1 bg-stone-950 p-1 rounded-2xl border border-stone-800/80 shrink-0">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-1.5 px-2.5 sm:px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                item.active
                  ? "bg-red-600 text-white shadow-md shadow-red-600/30"
                  : "text-stone-400 hover:text-stone-200 hover:bg-stone-900"
              }`}
            >
              <Icon className="w-3.5 sm:w-4 h-3.5 sm:h-4 shrink-0" />
              <span className="hidden sm:inline">{item.label}</span>
              <span className="sm:hidden">{item.label.split(" ")[0]}</span>
              {typeof item.badge === "number" && item.badge > 0 && (
                <span
                  className={`text-[9px] sm:text-[10px] font-black px-1.5 py-0.2 rounded-full border ${
                    item.active
                      ? "bg-white text-red-600 border-white"
                      : item.badgeColor
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* RIGHT: Clock, Cashier Profile, Admin Link & Logout */}
      <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
        {/* Live Digital Clock */}
        <div className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-900 border border-stone-800 text-xs font-bold text-stone-300">
          <Clock className="w-3.5 h-3.5 text-amber-400" />
          <span className="font-mono text-white">{timeStr || "--:--:--"}</span>
        </div>

        {/* Cashier / Staff Pill */}
        <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl bg-stone-900/80 border border-stone-800">
          <div className="w-6 h-6 rounded-lg bg-red-600/20 text-red-400 flex items-center justify-center text-xs font-black">
            <User className="w-3.5 h-3.5" />
          </div>
          <div className="hidden sm:flex flex-col text-left">
            <span className="text-[11px] font-extrabold text-white leading-tight truncate max-w-[120px]">
              {user?.name || "Staff Cashier"}
            </span>
            <span className="text-[9px] font-bold text-stone-400 uppercase tracking-wider">
              {user?.role || "Cashier"}
            </span>
          </div>
        </div>

        {/* Link back to Admin Dashboard (if admin user) */}
        {user?.authRole === "admin" && (
          <Link
            href="/admin"
            className="hidden xl:inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-stone-900 hover:bg-stone-800 border border-stone-800 text-stone-400 hover:text-white text-xs font-semibold transition-colors"
            title="Switch to Admin Hub"
          >
            <Shield className="w-3.5 h-3.5 text-amber-400" />
            <span>Admin</span>
            <ExternalLink className="w-3 h-3 text-stone-500" />
          </Link>
        )}

        {/* 1-Tap Logout */}
        <button
          onClick={logout}
          title="Sign out of POS Terminal"
          className="p-2 rounded-xl bg-stone-900 hover:bg-red-950/40 border border-stone-800 hover:border-red-800/60 text-stone-400 hover:text-red-400 transition-colors"
        >
          <LogOut className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
}
