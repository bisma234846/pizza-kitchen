"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Calculator,
  Flame,
  AlertOctagon,
  ShoppingBag,
  ChefHat,
  Bike,
  ShoppingCart,
  Star,
  MessageSquare,
  Cake,
  Award,
  Tag,
  LogOut,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Store,
  X,
} from "lucide-react";
import { ADMIN_NAV_SECTIONS } from "@/lib/adminData";
import type { NavBadge } from "@/types/admin";
import { useAdminOrders } from "@/context/AdminOrderContext";
import { useAuth } from "@/context/AuthContext";

interface AdminSidebarProps {
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  isMobileOpen: boolean;
  onCloseMobile: () => void;
}

export default function AdminSidebar({
  isCollapsed,
  onToggleCollapse,
  isMobileOpen,
  onCloseMobile,
}: AdminSidebarProps) {
  const pathname = usePathname();
  const [showSignOutModal, setShowSignOutModal] = useState(false);
  const { activeOrdersCount, cancelRequestsCount, availableRidersCount, orders } = useAdminOrders();
  const { user, logout } = useAuth();

  // Icon Resolver
  const getNavIcon = (iconName: string, className = "w-5 h-5") => {
    switch (iconName) {
      case "LayoutDashboard":
        return <LayoutDashboard className={className} />;
      case "Calculator":
        return <Calculator className={className} />;
      case "Flame":
        return <Flame className={className} />;
      case "AlertOctagon":
        return <AlertOctagon className={className} />;
      case "ShoppingBag":
        return <ShoppingBag className={className} />;
      case "ChefHat":
        return <ChefHat className={className} />;
      case "Bike":
        return <Bike className={className} />;
      case "ShoppingCart":
        return <ShoppingCart className={className} />;
      case "Star":
        return <Star className={className} />;
      case "MessageSquare":
        return <MessageSquare className={className} />;
      case "Cake":
        return <Cake className={className} />;
      case "Award":
        return <Award className={className} />;
      case "Tag":
        return <Tag className={className} />;
      case "Utensils":
        return <ChefHat className={className} />;
      case "Layers":
        return <LayoutDashboard className={className} />;
      default:
        return <Store className={className} />;
    }
  };

  const isRouteActive = (href: string) => {
    if (href === "/admin") {
      return pathname === "/admin";
    }
    return pathname === href || pathname.startsWith(href + "/");
  };

  const getItemBadge = (item: { id: string; badge?: NavBadge }): NavBadge | undefined => {
    if (item.id === "active-orders") {
      return { text: `${activeOrdersCount} Live`, variant: "red", pulse: activeOrdersCount > 0 };
    }
    if (item.id === "cancel-requests") {
      return cancelRequestsCount > 0 ? { text: `${cancelRequestsCount}`, variant: "amber" } : undefined;
    }
    if (item.id === "all-orders") {
      return { text: `${orders.length}`, variant: "stone" };
    }
    if (item.id === "riders") {
      return { text: `${availableRidersCount} Free`, variant: "green" };
    }
    return item.badge;
  };

  const renderBadge = (badge?: NavBadge) => {
    if (!badge) return null;

    let badgeClasses = "bg-stone-800 text-stone-300 border-stone-700";
    if (badge.variant === "red") {
      badgeClasses = "bg-red-600/20 text-red-400 border-red-500/30";
    } else if (badge.variant === "amber") {
      badgeClasses = "bg-amber-500/20 text-amber-300 border-amber-500/30";
    } else if (badge.variant === "green") {
      badgeClasses = "bg-green-500/20 text-green-300 border-green-500/30";
    }

    return (
      <span
        className={`ml-auto inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold border ${badgeClasses}`}
      >
        {badge.pulse && (
          <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
        )}
        {badge.text}
      </span>
    );
  };

  const handleSignOut = () => {
    setShowSignOutModal(false);
    logout();
  };

  const userInitials = user?.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "PK";

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isMobileOpen && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 z-40 bg-black/70 backdrop-blur-xs lg:hidden transition-opacity"
          aria-hidden="true"
        />
      )}

      {/* Main Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 flex flex-col bg-[#0F0F11] border-r border-stone-800 text-stone-300 transition-all duration-300 ease-in-out ${
          isCollapsed ? "w-20" : "w-72"
        } ${
          isMobileOpen
            ? "translate-x-0 shadow-2xl"
            : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* TOP BRAND HEADER */}
        <div className="h-18 px-4 flex items-center justify-between border-b border-stone-800/80 shrink-0 bg-stone-950/40">
          <Link
            href="/admin"
            className={`flex items-center gap-3 group overflow-hidden ${
              isCollapsed ? "justify-center w-full" : ""
            }`}
          >
            {/* Logo Badge */}
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-600 to-red-700 flex items-center justify-center font-black text-white text-base shadow-lg shadow-red-600/30 shrink-0 group-hover:scale-105 transition-transform">
              PK
            </div>

            {/* Brand Titles */}
            {!isCollapsed && (
              <div className="flex flex-col min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="font-black text-sm tracking-tight text-white uppercase truncate">
                    The Pizza
                  </span>
                  <span className="text-xs font-black text-amber-500 uppercase">
                    Kitchen
                  </span>
                </div>
                <div className="flex items-center gap-1 text-[10px] text-stone-400 font-semibold tracking-wider uppercase">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-red-500" />
                  <span>Admin Hub</span>
                </div>
              </div>
            )}
          </Link>

          {/* Close button for mobile drawer */}
          <button
            onClick={onCloseMobile}
            className="lg:hidden p-1.5 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800 transition-colors"
            aria-label="Close Sidebar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* ADMIN USER INFO CARD */}
        <div className="p-3 border-b border-stone-800/80 bg-stone-950/20">
          <div
            className={`flex items-center gap-3 p-2.5 rounded-xl bg-stone-900/70 border border-stone-800/80 ${
              isCollapsed ? "justify-center p-2" : ""
            }`}
          >
            {/* Avatar with live status dot */}
            <div className="relative shrink-0">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-amber-500 to-red-600 flex items-center justify-center text-stone-950 font-black text-sm shadow-md">
                {userInitials}
              </div>
              <span
                className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-green-500 border-2 border-stone-900"
                title="Online"
              />
            </div>

            {/* Admin Info */}
            {!isCollapsed && (
              <div className="flex flex-col min-w-0 flex-1">
                <div className="flex items-center justify-between gap-1">
                  <span className="text-xs font-bold text-white truncate">
                    {user?.name || "Management User"}
                  </span>
                  <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-red-600/20 text-red-400 text-[9px] font-extrabold border border-red-500/30 uppercase shrink-0">
                    <ShieldCheck className="w-2.5 h-2.5" />
                    {user?.authRole === "admin" ? "Admin" : "Staff"}
                  </span>
                </div>
                <span className="text-[10px] text-stone-400 truncate mt-0.5">
                  {user?.branch || "Susan Road Branch"}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* SCROLLABLE NAVIGATION LIST */}
        <div className="flex-1 overflow-y-auto py-4 px-3 space-y-6 scrollbar-thin scrollbar-thumb-stone-800">
          {ADMIN_NAV_SECTIONS.map((section) => (
            <div key={section.id} className="space-y-1">
              {/* Section Header */}
              {!isCollapsed ? (
                <div className="px-3 pb-1.5 text-[10px] font-extrabold uppercase tracking-wider text-stone-400">
                  {section.title}
                </div>
              ) : (
                <div className="h-px bg-stone-800/80 my-2 mx-2" />
              )}

              {/* Items List */}
              <nav className="space-y-1">
                {section.items.map((item) => {
                  const active = isRouteActive(item.href);

                  return (
                    <Link
                      key={item.id}
                      href={item.href}
                      onClick={() => onCloseMobile()}
                      title={isCollapsed ? `${section.title}: ${item.title}` : undefined}
                      className={`group relative flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 ${
                        active
                          ? "bg-red-600 text-white font-bold shadow-md shadow-red-600/30"
                          : "text-stone-300 hover:text-white hover:bg-stone-850"
                      } ${isCollapsed ? "justify-center px-2" : ""}`}
                    >
                      {/* Icon */}
                      <span
                        className={`shrink-0 transition-transform duration-200 group-hover:scale-110 ${
                          active ? "text-white" : "text-stone-400 group-hover:text-red-400"
                        }`}
                      >
                        {getNavIcon(item.icon, "w-4.5 h-4.5")}
                      </span>

                      {/* Title & Badge (when expanded) */}
                      {!isCollapsed && (
                        <>
                          <span className="truncate flex-1">{item.title}</span>
                          {renderBadge(getItemBadge(item))}
                        </>
                      )}

                      {/* Active indicator dot when collapsed */}
                      {isCollapsed && active && (
                        <span className="absolute right-1.5 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-white" />
                      )}
                    </Link>
                  );
                })}
              </nav>
            </div>
          ))}
        </div>

        {/* BOTTOM ACTIONS (Store link, Collapse Toggle, Sign Out) */}
        <div className="p-3 border-t border-stone-800/80 bg-stone-950/40 space-y-1.5 shrink-0">
          {/* View Customer Storefront */}
          <Link
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            title={isCollapsed ? "View Live Customer Store" : undefined}
            className={`flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold text-stone-400 hover:text-white hover:bg-stone-850 transition-colors ${
              isCollapsed ? "justify-center px-2" : ""
            }`}
          >
            <ExternalLink className="w-4 h-4 text-amber-500 shrink-0" />
            {!isCollapsed && (
              <div className="flex items-center justify-between w-full">
                <span>View Storefront</span>
                <span className="text-[10px] text-stone-400 bg-stone-800 px-1.5 py-0.5 rounded">
                  Live
                </span>
              </div>
            )}
          </Link>

          {/* Desktop Sidebar Collapse Toggle */}
          <button
            onClick={onToggleCollapse}
            aria-label={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
            className="hidden lg:flex items-center gap-3 w-full px-3 py-2 rounded-xl text-xs font-semibold text-stone-400 hover:text-white hover:bg-stone-850 transition-colors"
          >
            {isCollapsed ? (
              <ChevronRight className="w-4 h-4 mx-auto text-stone-400" />
            ) : (
              <>
                <ChevronLeft className="w-4 h-4 text-stone-400" />
                <span>Collapse Sidebar</span>
              </>
            )}
          </button>

          {/* Sign Out Button */}
          <button
            onClick={() => setShowSignOutModal(true)}
            title={isCollapsed ? "Sign Out" : undefined}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold text-red-400 hover:text-white hover:bg-red-600/20 border border-transparent hover:border-red-500/30 transition-all ${
              isCollapsed ? "justify-center px-2" : ""
            }`}
          >
            <LogOut className="w-4 h-4 shrink-0" />
            {!isCollapsed && <span>Sign Out</span>}
          </button>
        </div>
      </aside>

      {/* SIGN OUT CONFIRMATION MODAL */}
      {showSignOutModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
          <div className="w-full max-w-sm rounded-2xl bg-stone-900 border border-stone-800 p-6 text-white shadow-2xl space-y-4 animate-in fade-in zoom-in-95 duration-200">
            <div className="w-12 h-12 rounded-full bg-red-600/20 border border-red-500/30 text-red-500 flex items-center justify-center mx-auto">
              <LogOut className="w-6 h-6" />
            </div>

            <div className="text-center space-y-1">
              <h3 className="text-lg font-bold text-white">Sign Out of Admin Hub?</h3>
              <p className="text-xs text-stone-400">
                You will be returned to the customer storefront. Any unsaved changes in POS will be retained.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowSignOutModal(false)}
                className="px-4 py-2.5 rounded-xl bg-stone-800 text-stone-300 hover:bg-stone-700 text-xs font-bold transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSignOut}
                className="px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold transition-colors shadow-md shadow-red-600/20"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
