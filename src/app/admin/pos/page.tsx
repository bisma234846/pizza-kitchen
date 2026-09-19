"use client";

import React, { useState } from "react";
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
} from "lucide-react";
import { formatPrice } from "@/lib/data";
import type { MenuItem } from "@/types";
import { useAdminOrders } from "@/context/AdminOrderContext";
import { useMenu } from "@/context/MenuContext";
import type { OrderType, PaymentMethod } from "@/types/orders";

export default function POSPage() {
  const { createOrder } = useAdminOrders();
  const { categories } = useMenu();
  const [selectedCategory, setSelectedCategory] = useState("pizza");
  const [cart, setCart] = useState<{ item: MenuItem; quantity: number }[]>([]);
  const [orderType, setOrderType] = useState<OrderType>("delivery");
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [tableNumber, setTableNumber] = useState("Table 2");
  const [orderNotes, setOrderNotes] = useState("");
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const effectiveCategory = categories.some((c) => c.id === selectedCategory)
    ? selectedCategory
    : categories[0]?.id || "pizza";

  const activeCategory =
    categories.find((c) => c.id === effectiveCategory) || categories[0];

  const addToCart = (item: MenuItem) => {
    setCart((prev) => {
      const existing = prev.find((p) => p.item.id === item.id);
      if (existing) {
        return prev.map((p) =>
          p.item.id === item.id ? { ...p, quantity: p.quantity + 1 } : p
        );
      }
      return [...prev, { item, quantity: 1 }];
    });
  };

  const updateQuantity = (itemId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((p) => {
          if (p.item.id === itemId) {
            const newQ = p.quantity + delta;
            return newQ > 0 ? { ...p, quantity: newQ } : null;
          }
          return p;
        })
        .filter(Boolean) as { item: MenuItem; quantity: number }[]
    );
  };

  const subtotal = cart.reduce((acc, p) => acc + p.item.price * p.quantity, 0);
  const deliveryFee = orderType === "delivery" ? 150 : 0;
  const total = subtotal + deliveryFee;

  const handleCreateOrder = (paymentMethod: PaymentMethod) => {
    if (cart.length === 0) {
      alert("Cart is empty! Please select food items first.");
      return;
    }

    const created = createOrder({
      customerName: customerName.trim() || (orderType === "dine-in" ? `Dine-in (${tableNumber})` : "Counter Walk-in"),
      phone: customerPhone.trim() || "0300-0000000",
      orderType,
      tableNumber: orderType === "dine-in" ? tableNumber : undefined,
      deliveryAddress:
        orderType === "delivery"
          ? {
              street: deliveryAddress.trim() || "Susan Road",
              area: "Susan Road",
              city: "Faisalabad",
              fullAddress: deliveryAddress.trim() || "Susan Road, Faisalabad",
            }
          : undefined,
      items: cart.map((p) => ({
        menuItemId: p.item.id,
        name: p.item.name,
        price: p.item.price,
        quantity: p.quantity,
        size: p.item.name.includes("Pizza") ? "Large" : undefined,
      })),
      subtotal,
      deliveryFee,
      discount: 0,
      total,
      source: "pos",
      paymentMethod,
      paymentStatus: paymentMethod === "cash" ? "pending" : "paid",
      notes: orderNotes,
    });

    setSuccessMessage(`Order ${created.orderNumber} placed successfully! Total: ${formatPrice(created.total)}`);
    setCart([]);
    setCustomerName("");
    setCustomerPhone("");
    setDeliveryAddress("");
    setOrderNotes("");

    setTimeout(() => {
      setSuccessMessage(null);
    }, 4500);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[calc(100vh-8.5rem)] min-h-[600px]">
      {/* LEFT: Category Tabs & Menu Grid (8 cols) */}
      <div className="lg:col-span-7 xl:col-span-8 flex flex-col gap-4 min-h-0">
        {/* Quick Launch Dedicated POS Terminal Banner */}
        <div className="p-3 rounded-2xl bg-stone-900 border border-red-500/30 flex items-center justify-between gap-2 shrink-0 shadow-lg">
          <div className="flex items-center gap-2 text-xs">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <span className="font-extrabold text-white">Touch-Optimized Dedicated POS Terminal Available</span>
          </div>
          <a
            href="/pos"
            className="px-3 py-1.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-black text-xs uppercase tracking-wider transition-colors shadow-sm"
          >
            Open /pos Terminal →
          </a>
        </div>

        {/* Success Alert Banner */}
        {successMessage && (
          <div className="p-3 rounded-2xl bg-green-600 text-white font-bold text-xs flex items-center gap-2 shadow-lg animate-in fade-in zoom-in-95">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{successMessage}</span>
          </div>
        )}

        {/* Category Switcher */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none shrink-0">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                effectiveCategory === cat.id
                  ? "bg-red-600 text-white shadow-md shadow-red-600/30"
                  : "bg-stone-900 border border-stone-800 text-stone-300 hover:bg-stone-800 hover:text-white"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Menu Grid View */}
        <div className="flex-1 overflow-y-auto pr-1 space-y-6">
          {activeCategory?.subCategories?.map((sub) => (
            <div key={sub.id} className="space-y-3">
              <h3 className="text-xs font-bold text-stone-400 uppercase tracking-wider">
                {sub.name}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
                {sub.items.map((item) => {
                  const isOutOfStock = item.inStock === false;
                  return (
                    <button
                      key={item.id}
                      disabled={isOutOfStock}
                      onClick={() => addToCart(item)}
                      className={`p-4 rounded-2xl border text-left flex flex-col justify-between group transition-all ${
                        isOutOfStock
                          ? "bg-stone-900/40 border-stone-800/50 opacity-60 cursor-not-allowed"
                          : "bg-stone-900/80 border-stone-800 hover:border-red-500/50 hover:bg-stone-850 active:scale-98"
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between gap-1">
                          <h4 className={`text-xs font-extrabold line-clamp-1 transition-colors ${
                            isOutOfStock ? "text-stone-500 line-through" : "text-white group-hover:text-red-400"
                          }`}>
                            {item.name}
                          </h4>
                          {isOutOfStock ? (
                            <span className="px-1.5 py-0.5 rounded bg-red-950/60 text-red-400 border border-red-800/40 text-[9px] font-bold">
                              Out
                            </span>
                          ) : item.isPopular ? (
                            <span className="px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 text-[9px] font-bold">
                              Top
                            </span>
                          ) : null}
                        </div>
                        {item.description && (
                          <p className="text-[11px] text-stone-400 line-clamp-1 mt-0.5">
                            {item.description}
                          </p>
                        )}
                      </div>

                      <div className="mt-3 pt-2 border-t border-stone-800/80 flex items-center justify-between">
                        <span className={`text-xs font-extrabold ${isOutOfStock ? "text-stone-500" : "text-red-400"}`}>
                          {formatPrice(item.price)}
                        </span>
                        <span className={`w-6 h-6 rounded-lg flex items-center justify-center transition-colors ${
                          isOutOfStock
                            ? "bg-stone-900 text-stone-600"
                            : "bg-stone-800 group-hover:bg-red-600 text-stone-300 group-hover:text-white"
                        }`}>
                          <Plus className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT: Order Cart & Checkout Terminal (4 cols) */}
      <div className="lg:col-span-5 xl:col-span-4 rounded-3xl bg-stone-900 border border-stone-800 p-5 flex flex-col justify-between shadow-2xl">
        {/* Top: Order Type & Customer Details */}
        <div className="space-y-3">
          <div className="flex items-center justify-between border-b border-stone-800 pb-2.5">
            <h3 className="text-sm font-extrabold text-white">POS Terminal Ticket</h3>
            <span className="text-xs font-bold text-red-400">#NEW-COUNTER</span>
          </div>

          {/* Dine In / Takeaway / Delivery Switcher */}
          <div className="grid grid-cols-3 gap-1.5 p-1 rounded-xl bg-stone-950 border border-stone-800">
            {(["delivery", "takeaway", "dine-in"] as const).map((type) => (
              <button
                key={type}
                onClick={() => setOrderType(type)}
                className={`py-1.5 rounded-lg text-xs font-bold capitalize transition-all ${
                  orderType === type
                    ? "bg-red-600 text-white shadow-sm"
                    : "text-stone-400 hover:text-white"
                }`}
              >
                {type}
              </button>
            ))}
          </div>

          {/* Quick Customer Inputs */}
          <div className="grid grid-cols-2 gap-2">
            <input
              type="text"
              placeholder="Customer Name"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              className="px-3 py-2 rounded-xl bg-stone-950 border border-stone-800 text-xs text-stone-200 placeholder-stone-500 focus:outline-none focus:border-red-500"
            />
            <input
              type="text"
              placeholder="Phone (0300...)"
              value={customerPhone}
              onChange={(e) => setCustomerPhone(e.target.value)}
              className="px-3 py-2 rounded-xl bg-stone-950 border border-stone-800 text-xs text-stone-200 placeholder-stone-500 focus:outline-none focus:border-red-500"
            />
          </div>

          {orderType === "delivery" && (
            <input
              type="text"
              placeholder="Delivery Address (e.g. Susan Rd, House 12)"
              value={deliveryAddress}
              onChange={(e) => setDeliveryAddress(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-stone-950 border border-stone-800 text-xs text-stone-200 placeholder-stone-500 focus:outline-none focus:border-red-500"
            />
          )}

          {orderType === "dine-in" && (
            <input
              type="text"
              placeholder="Table Number (e.g. Table 4)"
              value={tableNumber}
              onChange={(e) => setTableNumber(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-stone-950 border border-stone-800 text-xs text-stone-200 placeholder-stone-500 focus:outline-none focus:border-red-500"
            />
          )}
        </div>

        {/* Middle: Cart Items list */}
        <div className="my-3 flex-1 overflow-y-auto space-y-2 pr-1 max-h-52">
          {cart.length === 0 ? (
            <div className="text-center py-8 text-stone-500 text-xs">
              Cart is empty. Click menu items to add.
            </div>
          ) : (
            cart.map(({ item, quantity }) => (
              <div
                key={item.id}
                className="p-2.5 rounded-xl bg-stone-950/70 border border-stone-800 flex items-center justify-between gap-2"
              >
                <div className="min-w-0 flex-1">
                  <h5 className="text-xs font-bold text-white truncate">{item.name}</h5>
                  <span className="text-[11px] text-stone-400">
                    {formatPrice(item.price * quantity)}
                  </span>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    onClick={() => updateQuantity(item.id, -1)}
                    className="w-6 h-6 rounded-md bg-stone-800 hover:bg-stone-700 text-stone-300 flex items-center justify-center"
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="text-xs font-bold text-white w-4 text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.id, 1)}
                    className="w-6 h-6 rounded-md bg-stone-800 hover:bg-stone-700 text-stone-300 flex items-center justify-center"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Bottom: Summary & Settlement */}
        <div className="pt-3 border-t border-stone-800 space-y-3">
          <div className="space-y-1 text-xs text-stone-400">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="text-white font-bold">{formatPrice(subtotal)}</span>
            </div>
            {deliveryFee > 0 && (
              <div className="flex justify-between">
                <span>Delivery Fee</span>
                <span className="text-white font-bold">{formatPrice(deliveryFee)}</span>
              </div>
            )}
            <div className="flex justify-between text-sm text-white font-black pt-1 border-t border-stone-800/80">
              <span>Total Payable</span>
              <span className="text-red-400">{formatPrice(total)}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => handleCreateOrder("cash")}
              className="flex items-center justify-center gap-1.5 py-3 rounded-xl bg-green-600 hover:bg-green-700 active:scale-95 text-white font-extrabold text-xs uppercase tracking-wider transition-all"
            >
              <Banknote className="w-4 h-4" />
              <span>Cash Order</span>
            </button>
            <button
              onClick={() => handleCreateOrder("card")}
              className="flex items-center justify-center gap-1.5 py-3 rounded-xl bg-red-600 hover:bg-red-700 active:scale-95 text-white font-extrabold text-xs uppercase tracking-wider transition-all shadow-md shadow-red-600/30"
            >
              <Send className="w-4 h-4" />
              <span>Kitchen Push</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
