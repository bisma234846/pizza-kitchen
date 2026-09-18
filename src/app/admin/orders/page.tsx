"use client";

import React, { useState } from "react";
import { Search, Filter, Download, Eye, Calendar, ShoppingBag, Trash2 } from "lucide-react";
import { formatPrice } from "@/lib/data";
import { useAdminOrders } from "@/context/AdminOrderContext";
import type { OrderStatus, OrderType } from "@/types/orders";

export default function AllOrdersPage() {
  const { orders, deleteOrder, resetToMockData } = useAdminOrders();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.phone.toLowerCase().includes(searchTerm.toLowerCase());

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
        return "bg-red-500/20 text-red-400 border-red-500/30";
      default:
        return "bg-stone-800 text-stone-300 border-stone-700";
    }
  };

  const handleExportCSV = () => {
    const headers = ["Order Number,Customer Name,Phone,Type,Total,Status,Payment,Source,Date"];
    const rows = filteredOrders.map(
      (o) =>
        `"${o.orderNumber}","${o.customerName}","${o.phone}","${o.orderType}","${o.total}","${o.status}","${o.paymentMethod}","${o.source}","${o.createdAt}"`
    );
    const csvContent = "data:text/csv;charset=utf-8," + [headers, ...rows].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `pizza_kitchen_orders_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl font-black text-white">All Orders ({orders.length})</h2>
          <p className="text-xs text-stone-400">Searchable orders ledger with export tools and channel filters</p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={resetToMockData}
            className="px-3 py-2 rounded-xl bg-stone-900 border border-stone-800 hover:bg-stone-800 text-stone-400 hover:text-white text-xs font-semibold transition-colors"
          >
            Reset Mock Data
          </button>
          <button
            onClick={handleExportCSV}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 active:scale-95 text-white text-xs font-bold transition-all shadow-md shadow-red-600/30 shrink-0"
          >
            <Download className="w-4 h-4" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
        <div className="sm:col-span-6 relative">
          <Search className="w-4 h-4 text-stone-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by order ID, customer name or phone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-stone-900 border border-stone-800 text-xs text-stone-200 placeholder-stone-500 focus:outline-none focus:border-red-500"
          />
        </div>

        <div className="sm:col-span-3">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full px-3 py-2.5 rounded-xl bg-stone-900 border border-stone-800 text-xs text-stone-300 focus:outline-none focus:border-red-500"
          >
            <option value="all">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="preparing">Preparing</option>
            <option value="ready">Ready</option>
            <option value="out-for-delivery">Out for Delivery</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>

        <div className="sm:col-span-3">
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="w-full px-3 py-2.5 rounded-xl bg-stone-900 border border-stone-800 text-xs text-stone-300 focus:outline-none focus:border-red-500"
          >
            <option value="all">All Order Types</option>
            <option value="delivery">Delivery</option>
            <option value="takeaway">Takeaway</option>
            <option value="dine-in">Dine-In</option>
          </select>
        </div>
      </div>

      {/* Orders Table */}
      <div className="rounded-3xl bg-stone-900 border border-stone-800 p-6 overflow-hidden shadow-xl">
        {filteredOrders.length === 0 ? (
          <div className="p-8 text-center text-xs text-stone-500">
            No orders found matching your search and filter criteria.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-stone-300">
              <thead className="text-[11px] uppercase tracking-wider text-stone-400 border-b border-stone-800">
                <tr>
                  <th className="py-3 px-3 font-bold">Order ID</th>
                  <th className="py-3 px-3 font-bold">Customer</th>
                  <th className="py-3 px-3 font-bold">Channel</th>
                  <th className="py-3 px-3 font-bold">Items</th>
                  <th className="py-3 px-3 font-bold">Amount</th>
                  <th className="py-3 px-3 font-bold">Payment</th>
                  <th className="py-3 px-3 font-bold">Status</th>
                  <th className="py-3 px-3 font-bold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-800/60">
                {filteredOrders.map((o) => (
                  <tr key={o.id} className="hover:bg-stone-850/50 transition-colors">
                    <td className="py-3 px-3 font-black text-white whitespace-nowrap">
                      {o.orderNumber}
                      <span className="block text-[10px] text-stone-400 font-normal capitalize">
                        {o.orderType}
                      </span>
                    </td>
                    <td className="py-3 px-3 font-bold text-stone-200 whitespace-nowrap">
                      <div>{o.customerName}</div>
                      <div className="text-[10px] text-stone-400 font-normal">{o.phone}</div>
                    </td>
                    <td className="py-3 px-3 text-stone-300 uppercase font-semibold text-[11px]">
                      {o.source}
                    </td>
                    <td className="py-3 px-3 text-stone-300 max-w-xs truncate">
                      {o.items.map((i) => `${i.quantity}x ${i.name}`).join(", ")}
                    </td>
                    <td className="py-3 px-3 font-black text-white whitespace-nowrap">
                      {formatPrice(o.total)}
                    </td>
                    <td className="py-3 px-3 text-stone-400 uppercase text-[11px]">
                      {o.paymentMethod}
                    </td>
                    <td className="py-3 px-3 whitespace-nowrap">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold border capitalize ${getStatusBadge(
                          o.status
                        )}`}
                      >
                        {o.status}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-right whitespace-nowrap">
                      <button
                        onClick={() => deleteOrder(o.id)}
                        className="p-1.5 rounded-lg bg-stone-800 hover:bg-red-600/30 text-stone-400 hover:text-red-400 transition-colors"
                        title="Delete Order"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
