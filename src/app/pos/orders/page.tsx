"use client";

import React, { useState } from "react";
import {
  Search,
  Printer,
  Eye,
  ShoppingBag,
  Filter,
  CheckCircle,
  Clock,
  MapPin,
  XCircle,
  RotateCcw,
  Check,
} from "lucide-react";
import { formatPrice } from "@/lib/data";
import { useAdminOrders } from "@/context/AdminOrderContext";
import type { Order, OrderStatus, OrderType } from "@/types/orders";
import POSThermalReceiptModal from "@/components/pos/POSThermalReceiptModal";

export default function POSOrdersPage() {
  const { orders, updateOrderStatus, cancelOrder } = useAdminOrders();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [selectedReceiptOrder, setSelectedReceiptOrder] = useState<Order | null>(null);

  const filteredOrders = orders.filter((order) => {
    const term = searchTerm.toLowerCase().trim();
    const matchesSearch =
      !term ||
      order.orderNumber.toLowerCase().includes(term) ||
      order.customerName.toLowerCase().includes(term) ||
      order.phone.toLowerCase().includes(term) ||
      (order.tableNumber && order.tableNumber.toLowerCase().includes(term));

    const matchesStatus = statusFilter === "all" || order.status === statusFilter;
    const matchesType = typeFilter === "all" || order.orderType === typeFilter;

    return matchesSearch && matchesStatus && matchesType;
  });

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
        return "bg-red-950/40 text-red-400 border-red-800/40";
      default:
        return "bg-stone-800 text-stone-300 border-stone-700";
    }
  };

  const handleCancel = (order: Order) => {
    const reason = prompt(`Enter cancellation reason for order ${order.orderNumber}:`, "Customer cancelled at counter");
    if (reason) {
      cancelOrder(order.id, reason);
    }
  };

  return (
    <div className="flex-1 flex flex-col gap-4 min-h-0 lg:h-full select-none">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 shrink-0">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg sm:text-xl font-black text-white tracking-tight">
              Counter Orders ({orders.length})
            </h2>
            <span className="px-2.5 py-0.5 rounded-full bg-red-600/20 text-red-400 border border-red-500/30 text-xs font-black">
              POS Ledger
            </span>
          </div>
          <p className="text-xs text-stone-400">
            Real-time cashier order tickets, status updates and receipt reprinting
          </p>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-2.5 shrink-0">
        {/* Search */}
        <div className="sm:col-span-6 relative">
          <Search className="w-4 h-4 text-stone-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search order #, customer, phone, or table..."
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-stone-900 border border-stone-800 text-xs text-white placeholder-stone-500 focus:outline-none focus:border-red-500"
          />
        </div>

        {/* Status Filter */}
        <div className="sm:col-span-3">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full px-3 py-2.5 rounded-2xl bg-stone-900 border border-stone-800 text-xs font-bold text-stone-300 focus:outline-none focus:border-red-500"
          >
            <option value="all">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="preparing">In Oven (Preparing)</option>
            <option value="ready">Ready at Dispatch</option>
            <option value="out-for-delivery">Out for Delivery</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>

        {/* Channel / Order Type Filter */}
        <div className="sm:col-span-3">
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="w-full px-3 py-2.5 rounded-2xl bg-stone-900 border border-stone-800 text-xs font-bold text-stone-300 focus:outline-none focus:border-red-500"
          >
            <option value="all">All Channels & Types</option>
            <option value="dine-in">Dine-In Tables</option>
            <option value="takeaway">Takeaway</option>
            <option value="delivery">Delivery</option>
          </select>
        </div>
      </div>

      {/* Orders Table (Scrollable) */}
      <div className="flex-1 rounded-3xl bg-[#121215] border border-stone-800 p-4 overflow-hidden shadow-2xl flex flex-col min-h-0">
        {filteredOrders.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-8 text-stone-500">
            <ShoppingBag className="w-8 h-8 text-stone-600 mb-2" />
            <p className="text-sm font-bold text-stone-300">No orders found</p>
            <p className="text-xs text-stone-500 mt-0.5">
              Try adjusting your search query or status filter.
            </p>
          </div>
        ) : (
          <div className="flex-1 overflow-auto">
            <table className="w-full text-left text-xs text-stone-300">
              <thead className="text-[11px] uppercase tracking-wider text-stone-400 border-b border-stone-800 sticky top-0 bg-[#121215] z-10">
                <tr>
                  <th className="py-2.5 px-3 font-bold">Ticket #</th>
                  <th className="py-2.5 px-3 font-bold">Customer & Channel</th>
                  <th className="py-2.5 px-3 font-bold">Items</th>
                  <th className="py-2.5 px-3 font-bold">Amount</th>
                  <th className="py-2.5 px-3 font-bold">Payment</th>
                  <th className="py-2.5 px-3 font-bold">Status</th>
                  <th className="py-2.5 px-3 font-bold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-800/60">
                {filteredOrders.map((order) => (
                  <tr
                    key={order.id}
                    className="hover:bg-stone-900/60 transition-colors"
                  >
                    <td className="py-3 px-3 font-black text-white font-mono whitespace-nowrap">
                      {order.orderNumber}
                    </td>

                    <td className="py-3 px-3">
                      <div className="font-extrabold text-stone-200">
                        {order.customerName}
                      </div>
                      <div className="text-[11px] text-stone-400 capitalize">
                        {order.orderType}{" "}
                        {order.tableNumber ? `(${order.tableNumber})` : ""} •{" "}
                        <span className="uppercase text-stone-500">
                          {order.source}
                        </span>
                      </div>
                    </td>

                    <td className="py-3 px-3 max-w-xs">
                      <div className="line-clamp-1 font-medium text-stone-300">
                        {order.items
                          .map((i) => `${i.quantity}x ${i.name}`)
                          .join(", ")}
                      </div>
                      <span className="text-[10px] text-stone-500">
                        {order.items.length} unique dish
                        {order.items.length > 1 ? "es" : ""}
                      </span>
                    </td>

                    <td className="py-3 px-3 font-black text-white whitespace-nowrap">
                      {formatPrice(order.total)}
                    </td>

                    <td className="py-3 px-3 whitespace-nowrap">
                      <span className="capitalize font-bold text-stone-300">
                        {order.paymentMethod}
                      </span>
                      <span
                        className={`block text-[10px] font-bold ${
                          order.paymentStatus === "paid"
                            ? "text-green-400"
                            : order.paymentStatus === "refunded"
                            ? "text-red-400"
                            : "text-amber-400"
                        }`}
                      >
                        {order.paymentStatus.toUpperCase()}
                      </span>
                    </td>

                    <td className="py-3 px-3 whitespace-nowrap">
                      <span
                        className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-black border uppercase ${getStatusBadge(
                          order.status
                        )}`}
                      >
                        {order.status}
                      </span>
                    </td>

                    <td className="py-3 px-3 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1.5">
                        {/* Print Receipt Button */}
                        <button
                          type="button"
                          onClick={() => setSelectedReceiptOrder(order)}
                          title="Print / View Thermal Receipt"
                          className="p-2 rounded-xl bg-stone-900 hover:bg-stone-800 border border-stone-800 text-stone-300 hover:text-white transition-colors"
                        >
                          <Printer className="w-3.5 h-3.5" />
                        </button>

                        {/* Fast Complete Action if ready */}
                        {order.status === "ready" && (
                          <button
                            type="button"
                            onClick={() =>
                              updateOrderStatus(order.id, "completed")
                            }
                            title="Mark Order Completed"
                            className="p-2 rounded-xl bg-green-600/20 hover:bg-green-600 text-green-400 hover:text-white border border-green-500/30 transition-all"
                          >
                            <Check className="w-3.5 h-3.5 stroke-[3]" />
                          </button>
                        )}

                        {/* Cancel order action if active */}
                        {order.status !== "completed" &&
                          order.status !== "cancelled" && (
                            <button
                              type="button"
                              onClick={() => handleCancel(order)}
                              title="Cancel Order Ticket"
                              className="p-2 rounded-xl bg-red-950/20 hover:bg-red-900/40 text-red-400 border border-red-900/30 transition-colors"
                            >
                              <XCircle className="w-3.5 h-3.5" />
                            </button>
                          )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Re-Print Receipt Modal */}
      <POSThermalReceiptModal
        order={selectedReceiptOrder}
        isOpen={!!selectedReceiptOrder}
        onClose={() => setSelectedReceiptOrder(null)}
      />
    </div>
  );
}
