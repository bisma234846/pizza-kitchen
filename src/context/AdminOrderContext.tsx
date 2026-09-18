"use client";

import React, { createContext, useContext, useState, useEffect, useMemo } from "react";
import type { Order, OrderStatus, OrderType, Rider, RiderStatus } from "@/types/orders";
import { SAMPLE_ORDERS, SAMPLE_RIDERS } from "@/lib/mockOrders";

const STORAGE_KEY_ORDERS = "tpk_admin_orders_v1";
const STORAGE_KEY_RIDERS = "tpk_admin_riders_v1";

interface CreateOrderInput {
  customerName: string;
  phone: string;
  orderType: OrderType;
  deliveryAddress?: {
    street: string;
    area: string;
    city: string;
    houseNumber?: string;
    landmark?: string;
    fullAddress: string;
  };
  tableNumber?: string;
  items: Array<{
    menuItemId: string;
    name: string;
    price: number;
    quantity: number;
    size?: string;
    crust?: string;
    customizations?: string[];
    notes?: string;
  }>;
  subtotal: number;
  deliveryFee?: number;
  discount?: number;
  total: number;
  source: "pos" | "website" | "whatsapp";
  paymentMethod: "cash" | "card" | "jazzcash" | "easypaisa" | "online";
  paymentStatus?: "pending" | "paid" | "refunded";
  notes?: string;
}

interface AdminOrderContextType {
  orders: Order[];
  riders: Rider[];
  isHydrated: boolean;
  // Mutations
  createOrder: (input: CreateOrderInput) => Order;
  updateOrderStatus: (orderId: string, status: OrderStatus, cancelReason?: string) => void;
  assignRider: (orderId: string, riderId: string) => void;
  unassignRider: (orderId: string) => void;
  cancelOrder: (orderId: string, reason: string) => void;
  updateOrder: (orderId: string, updates: Partial<Order>) => void;
  deleteOrder: (orderId: string) => void;
  updateRiderStatus: (riderId: string, status: RiderStatus) => void;
  resetToMockData: () => void;
  // Selectors & Computed
  getOrderById: (orderId: string) => Order | undefined;
  activeOrders: Order[];
  kitchenOrders: Order[];
  cancelRequests: Order[];
  activeOrdersCount: number;
  cancelRequestsCount: number;
  availableRidersCount: number;
  todayTotalRevenue: number;
  todayCompletedCount: number;
}

const AdminOrderContext = createContext<AdminOrderContextType | undefined>(undefined);

export function AdminOrderProvider({ children }: { children: React.ReactNode }) {
  const [orders, setOrders] = useState<Order[]>(() => SAMPLE_ORDERS);
  const [riders, setRiders] = useState<Rider[]>(() => SAMPLE_RIDERS);
  const [isHydrated, setIsHydrated] = useState(false);

  // Hydrate from localStorage in browser (if exists)
  useEffect(() => {
    try {
      const savedOrders = localStorage.getItem(STORAGE_KEY_ORDERS);
      const savedRiders = localStorage.getItem(STORAGE_KEY_RIDERS);

      if (savedOrders) {
        const parsed = JSON.parse(savedOrders);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setOrders(parsed);
        }
      }

      if (savedRiders) {
        const parsed = JSON.parse(savedRiders);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setRiders(parsed);
        }
      }
    } catch (e) {
      console.warn("Failed to load admin orders from localStorage:", e);
    } finally {
      setIsHydrated(true);
    }
  }, []);

  // Sync to localStorage on change
  useEffect(() => {
    if (!isHydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY_ORDERS, JSON.stringify(orders));
      localStorage.setItem(STORAGE_KEY_RIDERS, JSON.stringify(riders));
    } catch (e) {
      console.warn("Failed to save admin orders to localStorage:", e);
    }
  }, [orders, riders, isHydrated]);

  // CREATE ORDER
  const createOrder = (input: CreateOrderInput): Order => {
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const newId = `order-${Date.now()}`;
    const newOrderNumber = `#PK-${randomNum}`;
    const nowISO = new Date().toISOString();

    const formattedItems = input.items.map((item, idx) => ({
      id: `item-${Date.now()}-${idx}`,
      menuItemId: item.menuItemId,
      name: item.name,
      price: item.price,
      quantity: item.quantity,
      size: item.size,
      crust: item.crust,
      customizations: item.customizations,
      notes: item.notes,
      itemTotal: item.price * item.quantity,
    }));

    const newOrder: Order = {
      id: newId,
      orderNumber: newOrderNumber,
      customerName: input.customerName || "Walk-in Guest",
      phone: input.phone || "0300-0000000",
      orderType: input.orderType,
      deliveryAddress: input.deliveryAddress,
      tableNumber: input.tableNumber,
      status: "pending",
      items: formattedItems,
      subtotal: input.subtotal,
      deliveryFee: input.deliveryFee || 0,
      discount: input.discount || 0,
      total: input.total,
      source: input.source,
      riderAssigned: null,
      riderId: null,
      paymentMethod: input.paymentMethod,
      paymentStatus: input.paymentStatus || (input.paymentMethod === "cash" ? "pending" : "paid"),
      notes: input.notes,
      createdAt: nowISO,
      updatedAt: nowISO,
    };

    setOrders((prev) => [newOrder, ...prev]);
    return newOrder;
  };

  // UPDATE ORDER STATUS
  const updateOrderStatus = (orderId: string, status: OrderStatus, cancelReason?: string) => {
    const nowISO = new Date().toISOString();
    setOrders((prev) =>
      prev.map((order) => {
        if (order.id !== orderId) return order;

        return {
          ...order,
          status,
          cancelReason: cancelReason || order.cancelReason,
          updatedAt: nowISO,
          // Auto update payment if completed
          paymentStatus:
            status === "completed"
              ? "paid"
              : status === "cancelled" && order.paymentStatus === "paid"
              ? "refunded"
              : order.paymentStatus,
        };
      })
    );

    // If order was completed or cancelled, free assigned rider
    if (status === "completed" || status === "cancelled") {
      setRiders((prev) =>
        prev.map((r) =>
          r.currentOrderId === orderId
            ? {
                ...r,
                status: "available",
                currentOrderId: null,
                completedDeliveriesToday:
                  status === "completed"
                    ? r.completedDeliveriesToday + 1
                    : r.completedDeliveriesToday,
              }
            : r
        )
      );
    }
  };

  // ASSIGN RIDER
  const assignRider = (orderId: string, riderId: string) => {
    const targetRider = riders.find((r) => r.id === riderId);
    if (!targetRider) return;

    const nowISO = new Date().toISOString();

    setOrders((prev) =>
      prev.map((order) =>
        order.id === orderId
          ? {
              ...order,
              riderId,
              riderAssigned: targetRider,
              status: "out-for-delivery",
              updatedAt: nowISO,
            }
          : order
      )
    );

    setRiders((prev) =>
      prev.map((r) =>
        r.id === riderId
          ? { ...r, status: "on-trip", currentOrderId: orderId }
          : r.currentOrderId === orderId
          ? { ...r, status: "available", currentOrderId: null }
          : r
      )
    );
  };

  // UNASSIGN RIDER
  const unassignRider = (orderId: string) => {
    const nowISO = new Date().toISOString();
    setOrders((prev) =>
      prev.map((order) =>
        order.id === orderId
          ? {
              ...order,
              riderId: null,
              riderAssigned: null,
              status: "ready",
              updatedAt: nowISO,
            }
          : order
      )
    );

    setRiders((prev) =>
      prev.map((r) =>
        r.currentOrderId === orderId
          ? { ...r, status: "available", currentOrderId: null }
          : r
      )
    );
  };

  // CANCEL ORDER
  const cancelOrder = (orderId: string, reason: string) => {
    updateOrderStatus(orderId, "cancelled", reason);
  };

  // UPDATE ORDER (GENERIC)
  const updateOrder = (orderId: string, updates: Partial<Order>) => {
    const nowISO = new Date().toISOString();
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, ...updates, updatedAt: nowISO } : o))
    );
  };

  // DELETE ORDER
  const deleteOrder = (orderId: string) => {
    setOrders((prev) => prev.filter((o) => o.id !== orderId));
  };

  // UPDATE RIDER STATUS
  const updateRiderStatus = (riderId: string, status: RiderStatus) => {
    setRiders((prev) =>
      prev.map((r) => (r.id === riderId ? { ...r, status } : r))
    );
  };

  // RESET TO DEFAULT MOCK DATA
  const resetToMockData = () => {
    setOrders(SAMPLE_ORDERS);
    setRiders(SAMPLE_RIDERS);
    try {
      localStorage.removeItem(STORAGE_KEY_ORDERS);
      localStorage.removeItem(STORAGE_KEY_RIDERS);
    } catch (e) {
      console.warn(e);
    }
  };

  const getOrderById = (orderId: string) => {
    return orders.find((o) => o.id === orderId || o.orderNumber === orderId);
  };

  // Derived memoized collections
  const activeOrders = useMemo(() => {
    return orders.filter(
      (o) =>
        o.status === "pending" ||
        o.status === "preparing" ||
        o.status === "ready" ||
        o.status === "out-for-delivery"
    );
  }, [orders]);

  const kitchenOrders = useMemo(() => {
    return orders.filter(
      (o) =>
        o.status === "pending" ||
        o.status === "preparing" ||
        o.status === "ready"
    );
  }, [orders]);

  const cancelRequests = useMemo(() => {
    return orders.filter((o) => o.status === "cancelled");
  }, [orders]);

  const activeOrdersCount = activeOrders.length;
  const cancelRequestsCount = cancelRequests.length;
  const availableRidersCount = riders.filter((r) => r.status === "available").length;

  const todayTotalRevenue = useMemo(() => {
    return orders
      .filter((o) => o.status !== "cancelled")
      .reduce((sum, o) => sum + o.total, 0);
  }, [orders]);

  const todayCompletedCount = useMemo(() => {
    return orders.filter((o) => o.status === "completed").length;
  }, [orders]);

  return (
    <AdminOrderContext.Provider
      value={{
        orders,
        riders,
        isHydrated,
        createOrder,
        updateOrderStatus,
        assignRider,
        unassignRider,
        cancelOrder,
        updateOrder,
        deleteOrder,
        updateRiderStatus,
        resetToMockData,
        getOrderById,
        activeOrders,
        kitchenOrders,
        cancelRequests,
        activeOrdersCount,
        cancelRequestsCount,
        availableRidersCount,
        todayTotalRevenue,
        todayCompletedCount,
      }}
    >
      {children}
    </AdminOrderContext.Provider>
  );
}

export function useAdminOrders() {
  const context = useContext(AdminOrderContext);
  if (!context) {
    throw new Error("useAdminOrders must be used within an AdminOrderProvider");
  }
  return context;
}
