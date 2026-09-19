"use client";

import React, { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  Plus,
  Minus,
  Trash2,
  Printer,
  CreditCard,
  Banknote,
  Send,
  User,
  Phone,
  MapPin,
  Flame,
  CheckCircle2,
  X,
  Sparkles,
  Percent,
  SlidersHorizontal,
  ArrowRight,
  RotateCcw,
} from "lucide-react";
import { formatPrice } from "@/lib/data";
import type { MenuItem } from "@/types";
import { useMenu } from "@/context/MenuContext";
import { usePOS } from "@/context/POSContext";
import type { OrderType } from "@/types/orders";
import POSProductCustomizationModal from "@/components/pos/POSProductCustomizationModal";
import POSThermalReceiptModal from "@/components/pos/POSThermalReceiptModal";

const DINE_IN_TABLES = [
  "Table 1", "Table 2", "Table 3", "Table 4",
  "Table 5", "Table 6", "Table 7", "Table 8",
  "Table 9", "Table 10", "Table 11", "Table 12",
  "VIP Lounge 1", "VIP Lounge 2",
];

const DISCOUNT_PRESETS = [0, 5, 10, 15, 20];

export default function POSTerminalPage() {
  const router = useRouter();
  const { categories } = useMenu();
  const {
    cart,
    orderType,
    tableNumber,
    customerName,
    customerPhone,
    deliveryAddress,
    orderNotes,
    discount,
    customizingItem,
    openCustomizationModal,
    closeCustomizationModal,
    addQuickItem,
    updateQuantity,
    removeItem,
    clearCart,
    setOrderType,
    setTableNumber,
    setCustomerName,
    setCustomerPhone,
    setDeliveryAddress,
    setOrderNotes,
    setDiscount,
    subtotal,
    deliveryFee,
    discountAmount,
    total,
    submitOrder,
    lastCompletedOrder,
    setLastCompletedOrder,
    isReceiptModalOpen,
    setIsReceiptModalOpen,
  } = usePOS();

  const [selectedCategory, setSelectedCategory] = useState("pizza");
  const [searchQuery, setSearchQuery] = useState("");
  const [showDiscountSelector, setShowDiscountSelector] = useState(false);
  const [quickCashSuccess, setQuickCashSuccess] = useState<string | null>(null);

  const effectiveCategory = categories.some((c) => c.id === selectedCategory)
    ? selectedCategory
    : categories[0]?.id || "pizza";

  const activeCategory =
    categories.find((c) => c.id === effectiveCategory) || categories[0];

  // Filtered menu items based on search query or active category
  const displayedItems = useMemo(() => {
    if (!searchQuery.trim()) {
      return activeCategory?.subCategories?.flatMap((sub) => sub.items) || [];
    }

    const q = searchQuery.toLowerCase();
    const all = categories.flatMap((c) => c.subCategories.flatMap((sub) => sub.items));
    return all.filter(
      (item) =>
        item.name.toLowerCase().includes(q) ||
        (item.description && item.description.toLowerCase().includes(q))
    );
  }, [searchQuery, activeCategory, categories]);

  // Quick 1-tap Cash Order Submission
  const handleQuickCash = () => {
    if (cart.length === 0) {
      alert("Please add items to ticket first.");
      return;
    }

    try {
      const order = submitOrder("cash", "pending");
      setQuickCashSuccess(`Ticket ${order.orderNumber} created! Total: ${formatPrice(order.total)}`);
      setTimeout(() => setQuickCashSuccess(null), 4000);
    } catch (err: any) {
      alert(err.message || "Failed to create order");
    }
  };

  const handleProceedToPayment = () => {
    if (cart.length === 0) {
      alert("Please add items to ticket before proceeding to payment.");
      return;
    }
    router.push("/pos/payment");
  };

  return (
    <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5 min-h-0 lg:h-full select-none">
      {/* LEFT: Menu Explorer & Item Grid (7 or 8 columns) */}
      <div className="lg:col-span-7 xl:col-span-8 flex flex-col gap-3 min-h-0 lg:h-full">
        {/* Top Controls: Search Bar & Quick Category Switcher */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 shrink-0">
          {/* Real-time Item Search */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-stone-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search dishes (e.g. Fajita, Tikka, Pasta, Wings)..."
              className="w-full pl-10 pr-9 py-2.5 rounded-2xl bg-stone-900 border border-stone-800 text-xs text-white placeholder-stone-500 focus:outline-none focus:border-red-500"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Quick Clear Filter / Category Pill Switcher */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none shrink-0">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setSelectedCategory(cat.id);
                  setSearchQuery("");
                }}
                className={`px-3 py-2 rounded-xl text-xs font-black whitespace-nowrap transition-all ${
                  effectiveCategory === cat.id && !searchQuery
                    ? "bg-red-600 text-white shadow-md shadow-red-600/30 ring-1 ring-red-500"
                    : "bg-stone-900 border border-stone-800 text-stone-300 hover:bg-stone-850 hover:text-white"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Quick Cash Alert Banner */}
        {quickCashSuccess && (
          <div className="p-3 rounded-2xl bg-green-600 text-white font-bold text-xs flex items-center justify-between shadow-lg animate-in fade-in">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{quickCashSuccess}</span>
            </div>
            <button
              onClick={() => setIsReceiptModalOpen(true)}
              className="px-2.5 py-1 rounded-lg bg-black/20 hover:bg-black/40 text-[11px] font-black uppercase"
            >
              View Receipt
            </button>
          </div>
        )}

        {/* Food Items Grid (Scrollable) */}
        <div className="flex-1 overflow-y-auto pr-1">
          {displayedItems.length === 0 ? (
            <div className="p-12 text-center rounded-3xl bg-stone-900/50 border border-stone-800 text-stone-400">
              <p className="text-sm font-bold text-stone-300">No menu items found</p>
              <p className="text-xs text-stone-500 mt-1">Try clearing your search query.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-3">
              {displayedItems.map((item) => {
                const isOutOfStock = item.inStock === false;
                const isPizza = item.name.toLowerCase().includes("pizza");

                return (
                  <div
                    key={item.id}
                    className={`p-3.5 rounded-2xl border text-left flex flex-col justify-between group transition-all relative ${
                      isOutOfStock
                        ? "bg-stone-900/40 border-stone-800/40 opacity-50 cursor-not-allowed"
                        : "bg-stone-900 border-stone-800 hover:border-red-500/60 hover:bg-[#18181c]"
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-1.5">
                        <h4 className={`text-xs font-black line-clamp-1 ${
                          isOutOfStock ? "text-stone-500 line-through" : "text-white group-hover:text-red-400"
                        }`}>
                          {item.name}
                        </h4>
                        {isOutOfStock ? (
                          <span className="px-1.5 py-0.5 rounded bg-red-950/80 text-red-400 border border-red-800/50 text-[9px] font-bold">
                            Out
                          </span>
                        ) : item.isPopular ? (
                          <span className="px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[9px] font-black">
                            ★ Top
                          </span>
                        ) : null}
                      </div>

                      {item.description && (
                        <p className="text-[11px] text-stone-400 line-clamp-2 mt-1 leading-snug">
                          {item.description}
                        </p>
                      )}
                    </div>

                    <div className="mt-3 pt-2.5 border-t border-stone-800 flex items-center justify-between gap-2">
                      <div>
                        <span className={`text-xs font-black ${isOutOfStock ? "text-stone-500" : "text-red-400"}`}>
                          {formatPrice(item.price)}
                        </span>
                        {item.priceNote && (
                          <span className="text-[9px] text-stone-500 block leading-tight">
                            {item.priceNote}
                          </span>
                        )}
                      </div>

                      {/* Action Buttons */}
                      <div className="flex items-center gap-1.5">
                        {isPizza && (
                          <button
                            type="button"
                            disabled={isOutOfStock}
                            onClick={() => openCustomizationModal(item)}
                            title="Customize Size / Crust / Toppings"
                            className="px-2.5 py-1.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 text-[10px] font-extrabold transition-colors flex items-center gap-1"
                          >
                            <SlidersHorizontal className="w-3 h-3" />
                            <span>Options</span>
                          </button>
                        )}
                        <button
                          type="button"
                          disabled={isOutOfStock}
                          onClick={() => addQuickItem(item)}
                          title="Add to Ticket"
                          className="p-2 rounded-xl bg-red-600 hover:bg-red-700 active:scale-95 text-white transition-all shadow-sm flex items-center justify-center"
                        >
                          <Plus className="w-4 h-4 stroke-[3]" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* RIGHT: Ticket Cart & Order Management Panel (5 or 4 columns) */}
      <div className="lg:col-span-5 xl:col-span-4 rounded-3xl bg-[#121215] border border-stone-800 p-4 sm:p-5 flex flex-col justify-between shadow-2xl min-h-0 lg:h-full">
        {/* Top: Order Type & Customer Details */}
        <div className="space-y-3 shrink-0">
          <div className="flex items-center justify-between border-b border-stone-800 pb-2.5">
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-black text-white uppercase tracking-wider">
                Current Ticket
              </h3>
              <span className="px-2 py-0.5 rounded-full bg-red-600/20 text-red-400 border border-red-500/30 text-[10px] font-black">
                {cart.reduce((sum, i) => sum + i.quantity, 0)} Items
              </span>
            </div>

            {cart.length > 0 && (
              <button
                type="button"
                onClick={() => {
                  if (confirm("Clear all items from current ticket?")) {
                    clearCart();
                  }
                }}
                className="text-[11px] text-stone-400 hover:text-red-400 transition-colors flex items-center gap-1"
              >
                <Trash2 className="w-3 h-3" />
                <span>Clear</span>
              </button>
            )}
          </div>

          {/* Dine-In / Takeaway / Delivery Switcher */}
          <div className="grid grid-cols-3 gap-1 p-1 rounded-2xl bg-stone-950 border border-stone-800">
            {(["dine-in", "takeaway", "delivery"] as const).map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => setOrderType(type)}
                className={`py-2 rounded-xl text-xs font-black capitalize transition-all ${
                  orderType === type
                    ? "bg-red-600 text-white shadow-md shadow-red-600/30 ring-1 ring-red-500"
                    : "text-stone-400 hover:text-white"
                }`}
              >
                {type}
              </button>
            ))}
          </div>

          {/* Dine-In Table Picker */}
          {orderType === "dine-in" && (
            <div className="space-y-1">
              <label className="text-[10px] font-extrabold text-stone-400 uppercase tracking-wider">
                Assign Dining Table
              </label>
              <select
                value={tableNumber}
                onChange={(e) => setTableNumber(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-stone-950 border border-stone-800 text-xs font-bold text-white focus:outline-none focus:border-red-500"
              >
                {DINE_IN_TABLES.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Customer Inputs */}
          <div className="grid grid-cols-2 gap-2">
            <input
              type="text"
              placeholder="Guest Name (Optional)"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              className="px-3 py-2 rounded-xl bg-stone-950 border border-stone-800 text-xs text-stone-200 placeholder-stone-600 focus:outline-none focus:border-red-500"
            />
            <input
              type="text"
              placeholder="Phone (0300...)"
              value={customerPhone}
              onChange={(e) => setCustomerPhone(e.target.value)}
              className="px-3 py-2 rounded-xl bg-stone-950 border border-stone-800 text-xs text-stone-200 placeholder-stone-600 focus:outline-none focus:border-red-500 font-mono"
            />
          </div>

          {/* Delivery Address if Delivery */}
          {orderType === "delivery" && (
            <input
              type="text"
              placeholder="Delivery Address (e.g. Susan Rd, Sector 4, House 12)"
              value={deliveryAddress}
              onChange={(e) => setDeliveryAddress(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-stone-950 border border-stone-800 text-xs text-stone-200 placeholder-stone-600 focus:outline-none focus:border-red-500"
            />
          )}
        </div>

        {/* Middle: Cart Line Items List (Scrollable) */}
        <div className="my-2.5 flex-1 overflow-y-auto space-y-2 pr-1 min-h-[140px]">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-stone-500">
              <span className="text-3xl mb-2">📋</span>
              <p className="text-xs font-bold text-stone-400">Ticket is empty</p>
              <p className="text-[11px] text-stone-600 mt-0.5">
                Tap items on the left to add dishes.
              </p>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={item.cartItemId}
                className="p-2.5 rounded-2xl bg-stone-950/80 border border-stone-800/90 flex flex-col gap-1.5"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0 flex-1">
                    <h5 className="text-xs font-black text-white truncate">
                      {item.name}
                    </h5>
                    {(item.size || item.crust) && (
                      <div className="text-[10px] text-stone-400">
                        {item.size} {item.crust ? `• ${item.crust}` : ""}
                      </div>
                    )}
                    {item.customizations && item.customizations.length > 0 && (
                      <div className="text-[9px] text-amber-300/80 line-clamp-1">
                        + {item.customizations.join(", ")}
                      </div>
                    )}
                    {item.notes && (
                      <div className="text-[9px] text-red-400 italic line-clamp-1">
                        Note: {item.notes}
                      </div>
                    )}
                  </div>

                  <span className="text-xs font-black text-white shrink-0">
                    {formatPrice(item.itemTotal)}
                  </span>
                </div>

                {/* Quantity Steppers & Remove */}
                <div className="flex items-center justify-between pt-1 border-t border-stone-850">
                  <span className="text-[10px] text-stone-500">
                    {formatPrice(item.price)} each
                  </span>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.cartItemId, -1)}
                      className="w-6 h-6 rounded-lg bg-stone-900 hover:bg-stone-800 text-stone-300 hover:text-white flex items-center justify-center transition-colors"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="text-xs font-black text-white w-5 text-center font-mono">
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.cartItemId, 1)}
                      className="w-6 h-6 rounded-lg bg-stone-900 hover:bg-stone-800 text-stone-300 hover:text-white flex items-center justify-center transition-colors"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                    <button
                      type="button"
                      onClick={() => removeItem(item.cartItemId)}
                      title="Remove Item"
                      className="w-6 h-6 rounded-lg bg-red-950/40 hover:bg-red-900/60 text-red-400 flex items-center justify-center ml-1 transition-colors"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Bottom: Discounts, Subtotal, Totals & Settlement Buttons */}
        <div className="pt-3 border-t border-stone-800 space-y-3 shrink-0">
          {/* Discount Pill Selector */}
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-stone-400">Discount:</span>
            <div className="flex items-center gap-1">
              {DISCOUNT_PRESETS.map((pct) => (
                <button
                  key={pct}
                  type="button"
                  onClick={() => setDiscount({ type: "percent", value: pct })}
                  className={`px-2 py-0.5 rounded-lg text-[10px] font-black transition-all ${
                    discount.type === "percent" && discount.value === pct
                      ? "bg-amber-500 text-black shadow-sm"
                      : "bg-stone-950 border border-stone-800 text-stone-400 hover:text-white"
                  }`}
                >
                  {pct === 0 ? "None" : `${pct}%`}
                </button>
              ))}
            </div>
          </div>

          {/* Pricing Breakdown */}
          <div className="space-y-1 text-xs text-stone-400">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="text-stone-200 font-bold">{formatPrice(subtotal)}</span>
            </div>
            {deliveryFee > 0 && (
              <div className="flex justify-between">
                <span>Delivery Charge</span>
                <span className="text-stone-200 font-bold">{formatPrice(deliveryFee)}</span>
              </div>
            )}
            {discountAmount > 0 && (
              <div className="flex justify-between text-amber-400 font-bold">
                <span>Discount Applied</span>
                <span>-{formatPrice(discountAmount)}</span>
              </div>
            )}
            <div className="flex justify-between items-baseline text-base text-white font-black pt-1.5 border-t border-stone-800">
              <span>Total Payable</span>
              <span className="text-red-400 text-lg">{formatPrice(total)}</span>
            </div>
          </div>

          {/* Action Triggers: Quick Cash vs Proceed to Payment */}
          <div className="grid grid-cols-2 gap-2 pt-1">
            <button
              type="button"
              disabled={cart.length === 0}
              onClick={handleQuickCash}
              className={`py-3.5 rounded-2xl font-black text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 ${
                cart.length === 0
                  ? "bg-stone-900 border border-stone-800 text-stone-600 cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-700 active:scale-95 text-white shadow-md shadow-green-600/30"
              }`}
            >
              <Banknote className="w-4 h-4" />
              <span>Quick Cash</span>
            </button>

            <button
              type="button"
              disabled={cart.length === 0}
              onClick={handleProceedToPayment}
              className={`py-3.5 rounded-2xl font-black text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 shadow-lg ${
                cart.length === 0
                  ? "bg-stone-900 border border-stone-800 text-stone-600 cursor-not-allowed"
                  : "bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 active:scale-95 text-white shadow-red-600/30"
              }`}
            >
              <span>Payment</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Product Customization Modal */}
      <POSProductCustomizationModal
        item={customizingItem}
        onClose={closeCustomizationModal}
      />

      {/* Thermal Receipt Preview Modal */}
      <POSThermalReceiptModal
        order={lastCompletedOrder}
        isOpen={isReceiptModalOpen}
        onClose={() => setIsReceiptModalOpen(false)}
        onNewOrder={() => clearCart()}
      />
    </div>
  );
}
