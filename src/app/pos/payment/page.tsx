"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Banknote,
  CreditCard,
  Smartphone,
  CheckCircle2,
  AlertCircle,
  Receipt,
  Printer,
  Sparkles,
  Info,
  DollarSign,
  Send,
} from "lucide-react";
import { formatPrice } from "@/lib/data";
import { usePOS } from "@/context/POSContext";
import type { PaymentMethod, PaymentStatus } from "@/types/orders";
import POSThermalReceiptModal from "@/components/pos/POSThermalReceiptModal";

export default function POSPaymentPage() {
  const router = useRouter();
  const {
    cart,
    orderType,
    tableNumber,
    customerName,
    customerPhone,
    deliveryAddress,
    orderNotes,
    subtotal,
    deliveryFee,
    discountAmount,
    total,
    submitOrder,
    lastCompletedOrder,
    isReceiptModalOpen,
    setIsReceiptModalOpen,
  } = usePOS();

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("cash");
  const [cashTendered, setCashTendered] = useState<number>(total);
  const [customCashInput, setCustomCashInput] = useState<string>(String(total));
  const [transactionRef, setTransactionRef] = useState<string>("");
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // If cart is empty and no last completed order, redirect back to /pos
  if (cart.length === 0 && !lastCompletedOrder) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center text-center p-6 space-y-4">
        <span className="text-4xl">🛒</span>
        <h2 className="text-lg font-black text-white">No Active Order for Payment</h2>
        <p className="text-xs text-stone-400">
          Please add dishes to the ticket before accessing payment settlement.
        </p>
        <Link
          href="/pos"
          className="px-5 py-2.5 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase tracking-wider transition-colors"
        >
          Return to POS Terminal
        </Link>
      </div>
    );
  }

  // Quick cash denomination presets
  const quickCashPresets = [
    { label: "Exact", amount: total },
    { label: "Rs 500", amount: 500 },
    { label: "Rs 1,000", amount: 1000 },
    { label: "Rs 2,000", amount: 2000 },
    { label: "Rs 5,000", amount: 5000 },
  ].filter((p) => p.amount >= total || p.label === "Exact");

  const handlePresetClick = (amount: number) => {
    setCashTendered(amount);
    setCustomCashInput(String(amount));
  };

  const handleCustomCashChange = (val: string) => {
    setCustomCashInput(val);
    const num = parseFloat(val);
    setCashTendered(isNaN(num) ? 0 : num);
  };

  const changeDue = Math.max(0, cashTendered - total);
  const balanceRemaining = Math.max(0, total - cashTendered);

  // Execute payment settlement
  const handleConfirmPayment = (status: PaymentStatus) => {
    setErrorMessage(null);
    setSubmitting(true);

    try {
      submitOrder(paymentMethod, status, cashTendered);
    } catch (err: any) {
      setErrorMessage(err.message || "Failed to process payment settlement.");
      setSubmitting(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col min-h-0 h-full select-none max-w-6xl mx-auto w-full">
      {/* Top Breadcrumb & Return Action */}
      <div className="flex items-center justify-between pb-3 shrink-0">
        <Link
          href="/pos"
          className="inline-flex items-center gap-2 text-xs font-bold text-stone-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>← Back to Menu / Edit Ticket</span>
        </Link>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-stone-400">Step 2 of 2:</span>
          <span className="px-2.5 py-0.5 rounded-full bg-red-600/20 text-red-400 border border-red-500/30 text-[11px] font-black uppercase">
            Payment & Kitchen Dispatch
          </span>
        </div>
      </div>

      {/* Main Grid: Left Review Ticket, Right Payment Settlement */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-5 min-h-0">
        {/* LEFT: Ticket Review (5 cols) */}
        <div className="lg:col-span-5 rounded-3xl bg-[#121215] border border-stone-800 p-5 flex flex-col justify-between shadow-xl min-h-0">
          <div className="space-y-4 shrink-0">
            <div className="flex items-center justify-between border-b border-stone-800 pb-3">
              <div>
                <h3 className="text-sm font-black text-white uppercase tracking-wider">
                  Order Summary
                </h3>
                <span className="text-[11px] text-stone-400 font-bold capitalize">
                  {orderType} {orderType === "dine-in" ? `(${tableNumber})` : ""}
                </span>
              </div>
              <span className="px-2 py-1 rounded-xl bg-stone-900 border border-stone-800 text-stone-300 font-mono text-xs font-bold">
                {cart.reduce((sum, i) => sum + i.quantity, 0)} Items
              </span>
            </div>

            {/* Customer Details info */}
            {(customerName || customerPhone || deliveryAddress) && (
              <div className="p-3 rounded-2xl bg-stone-950/80 border border-stone-800/80 text-xs space-y-1">
                {customerName && (
                  <div className="flex justify-between">
                    <span className="text-stone-400">Customer:</span>
                    <span className="font-bold text-white">{customerName}</span>
                  </div>
                )}
                {customerPhone && (
                  <div className="flex justify-between">
                    <span className="text-stone-400">Phone:</span>
                    <span className="font-bold text-stone-200">{customerPhone}</span>
                  </div>
                )}
                {deliveryAddress && (
                  <div className="text-stone-400 text-[11px] pt-1 border-t border-stone-850">
                    <span className="text-stone-500">Delivery: </span>
                    <span className="text-stone-300">{deliveryAddress}</span>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Line items list */}
          <div className="my-3 flex-1 overflow-y-auto space-y-2 pr-1 min-h-[120px]">
            {cart.map((item) => (
              <div
                key={item.cartItemId}
                className="p-2.5 rounded-xl bg-stone-950/60 border border-stone-800/80 flex items-start justify-between text-xs"
              >
                <div className="min-w-0 flex-1">
                  <span className="font-extrabold text-white">
                    {item.quantity}x {item.name}
                  </span>
                  {(item.size || item.crust) && (
                    <div className="text-[10px] text-stone-400">
                      {item.size} {item.crust ? `• ${item.crust}` : ""}
                    </div>
                  )}
                  {item.customizations && item.customizations.length > 0 && (
                    <div className="text-[9px] text-amber-300/80">
                      + {item.customizations.join(", ")}
                    </div>
                  )}
                  {item.notes && (
                    <div className="text-[9px] text-red-400 italic">
                      Note: {item.notes}
                    </div>
                  )}
                </div>

                <span className="font-black text-white shrink-0">
                  {formatPrice(item.itemTotal)}
                </span>
              </div>
            ))}
          </div>

          {/* Pricing Totals */}
          <div className="pt-3 border-t border-stone-800 space-y-1.5 text-xs shrink-0">
            <div className="flex justify-between text-stone-400">
              <span>Subtotal</span>
              <span className="font-bold text-stone-200">{formatPrice(subtotal)}</span>
            </div>
            {deliveryFee > 0 && (
              <div className="flex justify-between text-stone-400">
                <span>Delivery Charge</span>
                <span className="font-bold text-stone-200">{formatPrice(deliveryFee)}</span>
              </div>
            )}
            {discountAmount > 0 && (
              <div className="flex justify-between text-amber-400 font-bold">
                <span>Discount</span>
                <span>-{formatPrice(discountAmount)}</span>
              </div>
            )}
            <div className="flex justify-between items-baseline text-base font-black text-white pt-2 border-t border-stone-800">
              <span>Net Payable</span>
              <span className="text-red-400 text-xl">{formatPrice(total)}</span>
            </div>
          </div>
        </div>

        {/* RIGHT: Payment Settlement Controls (7 cols) */}
        <div className="lg:col-span-7 rounded-3xl bg-[#121215] border border-stone-800 p-5 sm:p-6 flex flex-col justify-between shadow-xl min-h-0">
          <div className="space-y-5">
            <div className="flex items-center justify-between border-b border-stone-800 pb-3">
              <div>
                <h3 className="text-base font-black text-white uppercase tracking-wider">
                  Payment Method
                </h3>
                <p className="text-xs text-stone-400">
                  Select payment method and calculate tender
                </p>
              </div>
              <span className="px-3 py-1 rounded-full bg-stone-900 border border-stone-800 text-stone-400 text-xs font-bold">
                Susan Rd Counter POS
              </span>
            </div>

            {/* Payment Method Selector Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { id: "cash", label: "Cash", icon: Banknote, activeBg: "bg-green-600" },
                { id: "card", label: "Card Swipe", icon: CreditCard, activeBg: "bg-blue-600" },
                { id: "jazzcash", label: "JazzCash QR", icon: Smartphone, activeBg: "bg-amber-600" },
                { id: "easypaisa", label: "EasyPaisa", icon: Smartphone, activeBg: "bg-emerald-600" },
              ].map((m) => {
                const Icon = m.icon;
                const isSelected = paymentMethod === m.id;
                return (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setPaymentMethod(m.id as PaymentMethod)}
                    className={`p-3.5 rounded-2xl border text-center flex flex-col items-center justify-center gap-2 transition-all ${
                      isSelected
                        ? `${m.activeBg} border-transparent text-white shadow-lg shadow-black/40 ring-2 ring-white/30`
                        : "bg-stone-950 border-stone-800 text-stone-400 hover:bg-stone-900 hover:text-white"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="text-xs font-black">{m.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Error Message */}
            {errorMessage && (
              <div className="p-3 rounded-2xl bg-red-950/50 border border-red-800/60 text-red-300 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* CASH SPECIFIC SETTLEMENT CALCULATOR */}
            {paymentMethod === "cash" && (
              <div className="p-4 rounded-3xl bg-stone-950/90 border border-stone-800 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold text-stone-300 uppercase tracking-wider">
                    Cash Tendered
                  </span>
                  <span className="text-xs text-stone-400">Total: {formatPrice(total)}</span>
                </div>

                {/* Quick Denomination Preset Buttons */}
                <div className="flex items-center gap-2 flex-wrap">
                  {quickCashPresets.map((preset) => (
                    <button
                      key={preset.label}
                      type="button"
                      onClick={() => handlePresetClick(preset.amount)}
                      className={`px-3 py-2 rounded-xl text-xs font-extrabold transition-all ${
                        cashTendered === preset.amount
                          ? "bg-green-600 text-white shadow-sm"
                          : "bg-stone-900 border border-stone-800 text-stone-300 hover:bg-stone-800 hover:text-white"
                      }`}
                    >
                      {preset.label} {preset.label !== "Exact" ? `(${formatPrice(preset.amount)})` : ""}
                    </button>
                  ))}
                </div>

                {/* Custom Cash Tendered Input */}
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-stone-400">
                    Amount Received from Customer (PKR):
                  </label>
                  <input
                    type="number"
                    value={customCashInput}
                    onChange={(e) => handleCustomCashChange(e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl bg-stone-900 border border-stone-800 text-base font-black text-white font-mono focus:outline-none focus:border-green-500"
                    placeholder="Enter cash received..."
                  />
                </div>

                {/* Dynamic Change Due / Balance Due Banner */}
                <div className="p-4 rounded-2xl bg-stone-900/90 border border-stone-800 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-stone-400 block">
                      {cashTendered >= total ? "Change Return Due:" : "Balance Remaining Needed:"}
                    </span>
                    <span
                      className={`text-xl font-black font-mono ${
                        cashTendered >= total ? "text-green-400" : "text-amber-400"
                      }`}
                    >
                      {cashTendered >= total ? formatPrice(changeDue) : formatPrice(balanceRemaining)}
                    </span>
                  </div>

                  {cashTendered >= total ? (
                    <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-300 border border-green-500/30 text-xs font-black">
                      ✓ Paid in Full
                    </span>
                  ) : (
                    <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-black">
                      ⚠ Partial
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* CARD / JAZZCASH / EASYPAISA MANUAL RECORD NOTATION */}
            {paymentMethod !== "cash" && (
              <div className="p-4 rounded-3xl bg-stone-950/90 border border-stone-800 space-y-3 text-xs">
                <div className="flex items-start gap-2.5 text-stone-300">
                  <Info className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-white">Manual Counter Verification</p>
                    <p className="text-[11px] text-stone-400 mt-0.5">
                      Verify swipe terminal receipt or customer wallet transfer confirmation on the counter before marking as paid.
                    </p>
                  </div>
                </div>

                <div className="space-y-1.5 pt-2 border-t border-stone-850">
                  <label className="text-[11px] font-bold text-stone-400">
                    Terminal Auth / Transaction ID (Optional):
                  </label>
                  <input
                    type="text"
                    value={transactionRef}
                    onChange={(e) => setTransactionRef(e.target.value)}
                    placeholder="e.g. AUTH-882194 or TXN-449102"
                    className="w-full px-3 py-2.5 rounded-xl bg-stone-900 border border-stone-800 text-xs text-stone-200 placeholder-stone-600 focus:outline-none focus:border-blue-500 font-mono"
                  />
                </div>
              </div>
            )}
          </div>

          {/* BOTTOM CONFIRMATION TRIGGERS */}
          <div className="pt-5 border-t border-stone-800 space-y-2.5 shrink-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Option A: Mark Paid & Push to Kitchen */}
              <button
                type="button"
                disabled={submitting}
                onClick={() => handleConfirmPayment("paid")}
                className="py-4 px-4 rounded-2xl bg-gradient-to-r from-green-600 to-green-700 hover:from-green-500 hover:to-green-600 active:scale-98 text-white font-black text-xs uppercase tracking-wider transition-all shadow-lg shadow-green-600/30 flex items-center justify-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Confirm Paid & Send to Kitchen</span>
              </button>

              {/* Option B: Mark as Pending / Pay Later (e.g. Dine-In post-meal) */}
              <button
                type="button"
                disabled={submitting}
                onClick={() => handleConfirmPayment("pending")}
                className="py-4 px-4 rounded-2xl bg-stone-900 hover:bg-stone-800 border border-stone-800 hover:border-stone-700 active:scale-98 text-stone-200 font-black text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4 text-amber-400" />
                <span>Pay Later (Dine-In Ticket)</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Thermal Receipt Preview Modal */}
      <POSThermalReceiptModal
        order={lastCompletedOrder}
        isOpen={isReceiptModalOpen}
        onClose={() => {
          setIsReceiptModalOpen(false);
          router.push("/pos");
        }}
        onNewOrder={() => {
          router.push("/pos");
        }}
      />
    </div>
  );
}
