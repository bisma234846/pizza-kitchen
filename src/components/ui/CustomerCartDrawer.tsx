"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ShoppingBag,
  Phone,
  MessageCircle,
  ArrowRight,
  ArrowLeft,
  Trash2,
  Plus,
  Minus,
  CheckCircle2,
  MapPin,
  Clock,
  Sparkles,
} from "lucide-react";
import { useCustomerCart } from "@/context/CustomerCartContext";
import { CONTACT, formatPrice, RESTAURANT } from "@/lib/data";
import CustomerButton from "./CustomerButton";

export function CustomerCartDrawer() {
  const {
    isCartOpen,
    closeCart,
    cartItems,
    updateQuantity,
    removeFromCart,
    clearCart,
    subtotal,
    totalItemsCount,
  } = useCustomerCart();

  // 3-Step Checkout State: 1 = Review, 2 = Details, 3 = Confirmation
  const [step, setStep] = useState<1 | 2 | 3>(1);

  // Customer Delivery Details State
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [orderType, setOrderType] = useState<"delivery" | "takeaway" | "dine-in">("delivery");
  const [streetAddress, setStreetAddress] = useState("");
  const [specialInstructions, setSpecialInstructions] = useState("");

  const deliveryFee = orderType === "delivery" ? (subtotal > 0 ? 150 : 0) : 0;
  const orderTotal = subtotal + deliveryFee;

  // Reset step to 1 when drawer closes or opens
  const handleClose = () => {
    closeCart();
    // Keep form data intact for convenience, reset step after small delay
    setTimeout(() => setStep(1), 300);
  };

  // Build Structured WhatsApp Order Message
  const generateWhatsAppOrderUrl = () => {
    let text = `*NEW ORDER — THE PIZZA KITCHEN*%0A`;
    text += `--------------------------------%0A`;
    text += `*Customer:* ${encodeURIComponent(customerName || "Customer")}%0A`;
    text += `*Phone:* ${encodeURIComponent(customerPhone || "N/A")}%0A`;
    text += `*Order Type:* ${orderType.toUpperCase()}%0A`;
    if (orderType === "delivery" && streetAddress) {
      text += `*Address:* ${encodeURIComponent(streetAddress)}%0A`;
    }
    text += `--------------------------------%0A`;
    text += `*ITEMS ORDERED:*%0A`;

    cartItems.forEach((item, idx) => {
      const sizeStr = item.size ? ` (${item.size})` : "";
      const crustStr = item.crust ? ` | ${item.crust}` : "";
      const customStr = item.customizations?.length ? ` [${item.customizations.join(", ")}]` : "";
      const noteStr = item.notes ? ` (Note: ${item.notes})` : "";
      text += `${idx + 1}. *${encodeURIComponent(item.name)}* x${item.quantity}${sizeStr}${crustStr}${customStr}${noteStr} — ${formatPrice(item.itemTotal)}%0A`;
    });

    text += `--------------------------------%0A`;
    text += `*Subtotal:* ${formatPrice(subtotal)}%0A`;
    if (deliveryFee > 0) {
      text += `*Delivery Fee:* ${formatPrice(deliveryFee)}%0A`;
    }
    text += `*TOTAL PAYABLE:* ${formatPrice(orderTotal)}%0A`;

    if (specialInstructions.trim()) {
      text += `*Instructions:* ${encodeURIComponent(specialInstructions.trim())}%0A`;
    }
    text += `--------------------------------%0A`;
    text += `Please confirm my order and approximate delivery time!`;

    return `https://wa.me/${CONTACT.whatsapp.replace("+", "")}?text=${text}`;
  };

  const handleProceedToDetails = (e: React.FormEvent) => {
    e.preventDefault();
    if (cartItems.length === 0) return;
    setStep(2);
  };

  const handleProceedToConfirmation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !customerPhone.trim()) return;
    if (orderType === "delivery" && !streetAddress.trim()) return;
    setStep(3);
  };

  const handleDispatchWhatsApp = () => {
    const url = generateWhatsAppOrderUrl();
    window.open(url, "_blank");
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs transition-opacity"
            aria-hidden="true"
          />

          {/* Slide-over Drawer Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 26, stiffness: 320 }}
            className="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-stone-900 text-stone-100 shadow-2xl border-l border-stone-800 flex flex-col justify-between overflow-hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Your Order & Cart"
          >
            {/* Header */}
            <div className="p-5 border-b border-stone-800 flex items-center justify-between bg-stone-950/70">
              <div className="flex items-center gap-3">
                {step > 1 && (
                  <button
                    onClick={() => setStep((s) => (s === 3 ? 2 : 1))}
                    aria-label="Previous step"
                    className="p-1.5 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800 transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4" />
                  </button>
                )}
                <div className="w-9 h-9 rounded-xl bg-red-600 flex items-center justify-center text-white shadow-md shadow-red-600/30">
                  <ShoppingBag className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-black text-white leading-tight">
                    {step === 1 && "Your Cart & Items"}
                    {step === 2 && "Delivery Information"}
                    {step === 3 && "Order Confirmation"}
                  </h3>
                  <p className="text-[11px] text-stone-400">
                    {step === 1 && `${totalItemsCount} item(s) selected`}
                    {step === 2 && "Faisalabad direct delivery / takeaway"}
                    {step === 3 && "Review & send order"}
                  </p>
                </div>
              </div>

              <button
                onClick={handleClose}
                aria-label="Close cart drawer"
                className="p-2 rounded-xl text-stone-400 hover:text-white hover:bg-stone-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Body Content */}
            <div className="flex-1 overflow-y-auto p-5 space-y-5">
              {/* STEP 1: CART ITEMS */}
              {step === 1 && (
                <>
                  {cartItems.length === 0 ? (
                    <div className="py-12 text-center space-y-4">
                      <div className="w-16 h-16 rounded-full bg-stone-800 text-stone-500 flex items-center justify-center mx-auto text-2xl">
                        🍕
                      </div>
                      <div>
                        <h4 className="text-base font-bold text-white">Your cart is empty</h4>
                        <p className="text-xs text-stone-400 mt-1 max-w-xs mx-auto leading-relaxed">
                          Add delicious oven-baked pizzas, crispy wings, or creamy pastas to get started!
                        </p>
                      </div>
                      <Link
                        href="/menu"
                        onClick={handleClose}
                        className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-red-600 text-white font-bold text-xs uppercase tracking-wider hover:bg-red-700 transition-all shadow-md"
                      >
                        <span>Browse Full Menu</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-xs text-stone-400 pb-1">
                        <span>Items in Order</span>
                        <button
                          onClick={clearCart}
                          className="text-stone-400 hover:text-red-400 flex items-center gap-1 text-[11px] cursor-pointer"
                        >
                          <Trash2 className="w-3 h-3" />
                          <span>Clear All</span>
                        </button>
                      </div>

                      {cartItems.map((item) => (
                        <div
                          key={item.id}
                          className="p-3.5 rounded-2xl bg-stone-950 border border-stone-800 flex flex-col gap-2.5"
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <h4 className="text-xs font-bold text-white leading-tight">
                                {item.name}
                              </h4>
                              {item.size && (
                                <span className="inline-block text-[10px] font-bold text-red-400 bg-red-950/60 px-2 py-0.5 rounded-md mt-1 mr-1">
                                  {item.size}
                                </span>
                              )}
                              {item.crust && (
                                <span className="inline-block text-[10px] text-stone-400 bg-stone-900 px-2 py-0.5 rounded-md mt-1 mr-1">
                                  {item.crust}
                                </span>
                              )}
                              {item.customizations && item.customizations.length > 0 && (
                                <p className="text-[10px] text-stone-400 mt-1">
                                  + {item.customizations.join(", ")}
                                </p>
                              )}
                              {item.notes && (
                                <p className="text-[10px] text-amber-400/90 italic mt-0.5">
                                  Note: "{item.notes}"
                                </p>
                              )}
                            </div>

                            <span className="text-xs font-black text-amber-400 shrink-0">
                              {formatPrice(item.itemTotal)}
                            </span>
                          </div>

                          <div className="flex items-center justify-between pt-2 border-t border-stone-900">
                            <div className="flex items-center gap-2 bg-stone-900 px-2 py-1 rounded-xl">
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="text-stone-400 hover:text-white p-0.5"
                                aria-label="Decrease quantity"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="text-xs font-bold text-white w-4 text-center">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="text-stone-400 hover:text-white p-0.5"
                                aria-label="Increase quantity"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>

                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="text-stone-500 hover:text-red-400 text-xs p-1"
                              aria-label="Remove item"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Fast order channel alternative banner */}
                  <div className="p-3.5 rounded-2xl bg-stone-950/60 border border-stone-800 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-red-500" />
                      <span className="text-stone-300 font-medium">Prefer calling?</span>
                    </div>
                    <a
                      href={`tel:${CONTACT.phone1.replace(/\s+/g, "")}`}
                      className="font-bold text-red-400 hover:underline"
                    >
                      {CONTACT.phone1}
                    </a>
                  </div>
                </>
              )}

              {/* STEP 2: DELIVERY DETAILS FORM */}
              {step === 2 && (
                <form onSubmit={handleProceedToConfirmation} className="space-y-4">
                  {/* Order Type Tabs */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-stone-400 mb-2">
                      Order Service Type
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {(["delivery", "takeaway", "dine-in"] as const).map((type) => (
                        <button
                          key={type}
                          type="button"
                          onClick={() => setOrderType(type)}
                          className={`py-2 px-2 rounded-xl text-xs font-bold capitalize transition-all cursor-pointer ${
                            orderType === type
                              ? "bg-red-600 text-white shadow-md"
                              : "bg-stone-950 text-stone-400 border border-stone-800 hover:bg-stone-800"
                          }`}
                        >
                          {type === "delivery" && "🛵 Delivery"}
                          {type === "takeaway" && "🛍️ Takeaway"}
                          {type === "dine-in" && "🍽️ Dine-In"}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Name */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-stone-300 mb-1">
                      Your Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="e.g. Usama Khan"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-stone-950 border border-stone-800 text-white text-xs placeholder-stone-500 focus:outline-none focus:border-red-500"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-stone-300 mb-1">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      placeholder="0300 1234567"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-stone-950 border border-stone-800 text-white text-xs placeholder-stone-500 focus:outline-none focus:border-red-500"
                    />
                  </div>

                  {/* Delivery Address (only if delivery) */}
                  {orderType === "delivery" && (
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-stone-300 mb-1">
                        Delivery Address (Faisalabad) <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        rows={2}
                        required
                        value={streetAddress}
                        onChange={(e) => setStreetAddress(e.target.value)}
                        placeholder="House / Street #, Sector, Area or Landmark..."
                        className="w-full px-3.5 py-2.5 rounded-xl bg-stone-950 border border-stone-800 text-white text-xs placeholder-stone-500 focus:outline-none focus:border-red-500 resize-none"
                      />
                    </div>
                  )}

                  {/* Special Instructions */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-stone-300 mb-1">
                      Order Notes (Optional)
                    </label>
                    <input
                      type="text"
                      value={specialInstructions}
                      onChange={(e) => setSpecialInstructions(e.target.value)}
                      placeholder="e.g. Ring bell twice, deliver by 8 PM"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-stone-950 border border-stone-800 text-white text-xs placeholder-stone-500 focus:outline-none focus:border-red-500"
                    />
                  </div>
                </form>
              )}

              {/* STEP 3: ORDER CONFIRMATION SUMMARY */}
              {step === 3 && (
                <div className="space-y-4">
                  <div className="p-4 rounded-2xl bg-green-950/30 border border-green-800/40 text-center space-y-2">
                    <CheckCircle2 className="w-8 h-8 text-green-400 mx-auto" />
                    <h4 className="text-sm font-black text-white">Order Summary Ready</h4>
                    <p className="text-[11px] text-stone-300">
                      Click below to dispatch your order directly to our WhatsApp Desk for instant confirmation!
                    </p>
                  </div>

                  {/* Customer Info Box */}
                  <div className="p-4 rounded-2xl bg-stone-950 border border-stone-800 space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-stone-400">Customer:</span>
                      <span className="font-bold text-white">{customerName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-stone-400">Phone:</span>
                      <span className="font-bold text-white">{customerPhone}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-stone-400">Service:</span>
                      <span className="font-bold text-red-400 uppercase">{orderType}</span>
                    </div>
                    {orderType === "delivery" && streetAddress && (
                      <div className="flex justify-between">
                        <span className="text-stone-400">Address:</span>
                        <span className="font-bold text-white text-right max-w-[200px]">{streetAddress}</span>
                      </div>
                    )}
                  </div>

                  {/* Items List Preview */}
                  <div className="p-4 rounded-2xl bg-stone-950 border border-stone-800 space-y-2 text-xs">
                    <span className="font-bold text-stone-400 block border-b border-stone-850 pb-1">
                      Ordered Items ({cartItems.length})
                    </span>
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex justify-between items-center text-xs">
                        <span className="text-stone-300">
                          {item.quantity}x {item.name} {item.size ? `(${item.size})` : ""}
                        </span>
                        <span className="font-bold text-amber-400">{formatPrice(item.itemTotal)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Footer Summary & Actions */}
            {cartItems.length > 0 && (
              <div className="p-5 border-t border-stone-800 bg-stone-950 space-y-3">
                {/* Price Breakdown */}
                <div className="space-y-1.5 text-xs text-stone-300">
                  <div className="flex justify-between">
                    <span className="text-stone-400">Subtotal:</span>
                    <span className="font-bold text-white">{formatPrice(subtotal)}</span>
                  </div>
                  {orderType === "delivery" && (
                    <div className="flex justify-between">
                      <span className="text-stone-400">Estimated Delivery:</span>
                      <span className="font-bold text-white">{formatPrice(deliveryFee)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm font-black text-white pt-2 border-t border-stone-850">
                    <span>Total Amount:</span>
                    <span className="text-amber-400 text-base">{formatPrice(orderTotal)}</span>
                  </div>
                </div>

                {/* Step Action Buttons */}
                {step === 1 && (
                  <CustomerButton
                    variant="primary"
                    size="lg"
                    onClick={handleProceedToDetails}
                    icon={<ArrowRight className="w-4 h-4" />}
                    className="w-full justify-center"
                  >
                    Proceed to Delivery Details
                  </CustomerButton>
                )}

                {step === 2 && (
                  <CustomerButton
                    variant="primary"
                    size="lg"
                    onClick={handleProceedToConfirmation}
                    disabled={
                      !customerName.trim() ||
                      !customerPhone.trim() ||
                      (orderType === "delivery" && !streetAddress.trim())
                    }
                    icon={<ArrowRight className="w-4 h-4" />}
                    className="w-full justify-center"
                  >
                    Review Order Summary
                  </CustomerButton>
                )}

                {step === 3 && (
                  <CustomerButton
                    variant="whatsapp"
                    size="lg"
                    onClick={handleDispatchWhatsApp}
                    icon={<MessageCircle className="w-4 h-4" />}
                    className="w-full justify-center"
                  >
                    Send Order via WhatsApp
                  </CustomerButton>
                )}
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default CustomerCartDrawer;
