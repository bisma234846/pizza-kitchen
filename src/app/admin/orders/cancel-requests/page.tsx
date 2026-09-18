"use client";

import React from "react";
import { AlertOctagon, CheckCircle, XCircle, Clock, Phone, ArrowLeft, RefreshCw } from "lucide-react";
import { formatPrice } from "@/lib/data";
import { useAdminOrders } from "@/context/AdminOrderContext";

export default function CancelRequestsPage() {
  const { cancelRequests, updateOrderStatus } = useAdminOrders();

  const handleReactivate = (orderId: string) => {
    updateOrderStatus(orderId, "pending", undefined);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-black text-white">Cancellation & Refund Logs</h2>
          <p className="text-xs text-stone-400">Review cancelled orders, refund status, and customer cancellation reasons</p>
        </div>
        <span className="px-3 py-1 rounded-full bg-red-600/20 text-red-400 border border-red-500/30 text-xs font-bold">
          {cancelRequests.length} Cancelled Records
        </span>
      </div>

      {cancelRequests.length === 0 ? (
        <div className="p-12 text-center rounded-3xl bg-stone-900/60 border border-dashed border-stone-800 text-stone-400">
          <CheckCircle className="w-8 h-8 text-green-500 mx-auto mb-2" />
          <p className="text-sm font-bold text-stone-300">No cancelled orders</p>
          <p className="text-xs text-stone-500 mt-1">All orders are running smoothly.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {cancelRequests.map((req) => (
            <div
              key={req.id}
              className="p-6 rounded-3xl bg-stone-900 border border-stone-800 space-y-4 shadow-xl"
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-stone-800 pb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-red-600/20 text-red-500 flex items-center justify-center">
                    <AlertOctagon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-white">{req.orderNumber} - {req.customerName}</h4>
                    <p className="text-xs text-stone-400">{req.phone} • {req.source.toUpperCase()} ({req.orderType})</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-sm font-black text-red-400">
                    {formatPrice(req.total)}
                  </span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-stone-800 text-stone-300 border border-stone-700">
                    {req.paymentStatus.toUpperCase()}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-stone-300">
                <div className="p-3 rounded-xl bg-stone-950 border border-stone-800">
                  <span className="font-bold text-stone-400 block mb-1">Reason for Cancellation:</span>
                  <p className="text-white font-medium">"{req.cancelReason || 'Customer requested order cancellation'}"</p>
                </div>

                <div className="p-3 rounded-xl bg-stone-950 border border-stone-800">
                  <span className="font-bold text-stone-400 block mb-1">Ordered Items:</span>
                  <p className="text-stone-300">
                    {req.items.map((i) => `${i.quantity}x ${i.name}`).join(", ")}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  onClick={() => handleReactivate(req.id)}
                  className="px-4 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white text-xs font-bold flex items-center gap-1.5 transition-colors"
                >
                  <RefreshCw className="w-3.5 h-3.5 text-amber-400" />
                  <span>Re-open as Pending</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
