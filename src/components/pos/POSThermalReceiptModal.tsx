"use client";

import React from "react";
import {
  Printer,
  X,
  CheckCircle2,
  Share2,
  ArrowRight,
  Receipt,
} from "lucide-react";
import type { Order } from "@/types/orders";
import { formatPrice, CONTACT } from "@/lib/data";

interface POSThermalReceiptModalProps {
  order: Order | null;
  isOpen: boolean;
  onClose: () => void;
  onNewOrder?: () => void;
}

export default function POSThermalReceiptModal({
  order,
  isOpen,
  onClose,
  onNewOrder,
}: POSThermalReceiptModalProps) {
  if (!isOpen || !order) return null;

  const handlePrint = () => {
    window.print();
  };

  const formattedDate = new Date(order.createdAt).toLocaleString("en-PK", {
    dateStyle: "medium",
    timeStyle: "short",
  });

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 select-none animate-in fade-in duration-150">
      <div className="bg-[#141417] border border-stone-800 rounded-3xl w-full max-w-md max-h-[95vh] flex flex-col shadow-2xl shadow-black overflow-hidden">
        {/* Modal Action Bar (Not printed) */}
        <div className="p-4 bg-stone-900 border-b border-stone-800 flex items-center justify-between shrink-0 print:hidden">
          <div className="flex items-center gap-2 text-green-400 font-extrabold text-xs">
            <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />
            <span>Order Confirmed & Sent to Kitchen!</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3 py-1.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-white text-xs font-bold flex items-center gap-1.5 transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Scrollable Receipt Body */}
        <div className="p-6 overflow-y-auto flex-1 flex justify-center bg-stone-950/50">
          {/* Thermal Receipt Paper Layout */}
          <div
            id="printable-receipt"
            className="w-full max-w-[340px] bg-white text-black p-5 rounded-xl shadow-md font-mono text-[11px] leading-tight space-y-3 select-text"
          >
            {/* Header */}
            <div className="text-center space-y-1 pb-2 border-b border-dashed border-stone-400">
              <h2 className="text-base font-black tracking-tight uppercase font-sans">
                The Pizza Kitchen
              </h2>
              <p className="text-[10px] text-stone-700 font-sans">
                Susan Road Branch HQ, Faisalabad
              </p>
              <p className="text-[10px] text-stone-600 font-sans">
                UAN: {CONTACT.phone1} • WA: {CONTACT.whatsapp}
              </p>
            </div>

            {/* Ticket Info */}
            <div className="space-y-1 text-[10px] pb-2 border-b border-dashed border-stone-400">
              <div className="flex justify-between font-bold">
                <span>ORDER: {order.orderNumber}</span>
                <span className="uppercase">{order.orderType}</span>
              </div>
              {order.tableNumber && (
                <div className="flex justify-between font-bold text-red-700">
                  <span>DINE-IN TABLE:</span>
                  <span>{order.tableNumber}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Date:</span>
                <span>{formattedDate}</span>
              </div>
              <div className="flex justify-between">
                <span>Customer:</span>
                <span className="font-bold">{order.customerName}</span>
              </div>
              {order.phone && (
                <div className="flex justify-between">
                  <span>Phone:</span>
                  <span>{order.phone}</span>
                </div>
              )}
              {order.deliveryAddress && (
                <div className="text-[9px] text-stone-600 mt-1">
                  <span>Delivery: {order.deliveryAddress.fullAddress}</span>
                </div>
              )}
            </div>

            {/* Line Items */}
            <div className="space-y-2 py-1 pb-2 border-b border-dashed border-stone-400">
              <div className="flex justify-between font-bold text-[10px] uppercase pb-1 border-b border-stone-200">
                <span>Item</span>
                <span>Qty x Price</span>
                <span>Total</span>
              </div>

              {order.items.map((item, idx) => (
                <div key={idx} className="space-y-0.5">
                  <div className="flex justify-between font-bold">
                    <span className="truncate pr-1">
                      {item.quantity}x {item.name}
                    </span>
                    <span className="shrink-0">{formatPrice(item.itemTotal)}</span>
                  </div>

                  {(item.size || item.crust) && (
                    <div className="text-[9px] text-stone-600 pl-3">
                      ↳ {item.size} {item.crust ? `• ${item.crust}` : ""}
                    </div>
                  )}

                  {item.customizations && item.customizations.length > 0 && (
                    <div className="text-[9px] text-stone-600 pl-3">
                      ↳ Extra: {item.customizations.join(", ")}
                    </div>
                  )}

                  {item.notes && (
                    <div className="text-[9px] text-stone-600 italic pl-3">
                      ↳ Note: {item.notes}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Price Calculations */}
            <div className="space-y-1 text-[11px] pb-2 border-b border-dashed border-stone-400">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>{formatPrice(order.subtotal)}</span>
              </div>
              {order.deliveryFee > 0 && (
                <div className="flex justify-between">
                  <span>Delivery Fee:</span>
                  <span>{formatPrice(order.deliveryFee)}</span>
                </div>
              )}
              {order.discount > 0 && (
                <div className="flex justify-between text-stone-700">
                  <span>Discount:</span>
                  <span>-{formatPrice(order.discount)}</span>
                </div>
              )}
              <div className="flex justify-between font-black text-sm pt-1 border-t border-black">
                <span>TOTAL PAYABLE:</span>
                <span>{formatPrice(order.total)}</span>
              </div>
            </div>

            {/* Payment & Settlement Summary */}
            <div className="space-y-1 text-[10px] pb-2 border-b border-dashed border-stone-400">
              <div className="flex justify-between">
                <span>Payment Method:</span>
                <span className="font-bold uppercase">{order.paymentMethod}</span>
              </div>
              <div className="flex justify-between">
                <span>Payment Status:</span>
                <span className="font-bold uppercase text-green-700">
                  {order.paymentStatus}
                </span>
              </div>
            </div>

            {/* Footer */}
            <div className="text-center text-[9px] text-stone-600 pt-1 space-y-0.5">
              <p className="font-bold">Thank you for dining with The Pizza Kitchen!</p>
              <p>Freshly Baked • 100% Halal • Quality Guaranteed</p>
            </div>
          </div>
        </div>

        {/* Modal Footer (Not printed) */}
        <div className="p-4 bg-stone-900 border-t border-stone-800 flex items-center justify-between gap-3 shrink-0 print:hidden">
          <button
            onClick={onClose}
            className="flex-1 py-3 rounded-2xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-bold transition-colors text-center"
          >
            Close
          </button>
          <button
            onClick={() => {
              onClose();
              if (onNewOrder) onNewOrder();
            }}
            className="flex-1 py-3 rounded-2xl bg-red-600 hover:bg-red-700 active:scale-95 text-white text-xs font-black uppercase tracking-wider transition-all shadow-md shadow-red-600/30 flex items-center justify-center gap-1.5"
          >
            <span>New Order Ticket</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
