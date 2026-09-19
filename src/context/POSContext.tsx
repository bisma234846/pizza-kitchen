"use client";

import React, { createContext, useContext, useState, useEffect, useMemo } from "react";
import type { MenuItem } from "@/types";
import type { Order, OrderType, PaymentMethod, PaymentStatus } from "@/types/orders";
import { useAdminOrders } from "./AdminOrderContext";

export interface POSCartItem {
  cartItemId: string;
  menuItemId: string;
  name: string;
  price: number; // Base or customized unit price
  quantity: number;
  size?: string;
  crust?: string;
  customizations?: string[];
  notes?: string;
  itemTotal: number;
}

export interface POSDiscount {
  type: "percent" | "fixed";
  value: number; // e.g. 10 for 10% or 200 for Rs 200
  label?: string;
}

interface POSContextType {
  // Cart & Draft State
  cart: POSCartItem[];
  orderType: OrderType;
  tableNumber: string;
  customerName: string;
  customerPhone: string;
  deliveryAddress: string;
  orderNotes: string;
  discount: POSDiscount;
  
  // Customization Modal State
  customizingItem: MenuItem | null;
  openCustomizationModal: (item: MenuItem) => void;
  closeCustomizationModal: () => void;

  // Cart Actions
  addCustomizedItemToCart: (item: {
    menuItem: MenuItem;
    size?: string;
    crust?: string;
    customizations?: string[];
    notes?: string;
    quantity: number;
    unitPrice: number;
  }) => void;
  addQuickItem: (item: MenuItem) => void;
  updateQuantity: (cartItemId: string, delta: number) => void;
  removeItem: (cartItemId: string) => void;
  clearCart: () => void;

  // Form Field Setters
  setOrderType: (type: OrderType) => void;
  setTableNumber: (table: string) => void;
  setCustomerName: (name: string) => void;
  setCustomerPhone: (phone: string) => void;
  setDeliveryAddress: (address: string) => void;
  setOrderNotes: (notes: string) => void;
  setDiscount: (discount: POSDiscount) => void;

  // Totals & Calculations
  subtotal: number;
  deliveryFee: number;
  discountAmount: number;
  total: number;

  // Checkout & Submission
  submitOrder: (paymentMethod: PaymentMethod, paymentStatus: PaymentStatus, receivedAmount?: number) => Order;
  
  // Receipt & Active Order State
  lastCompletedOrder: Order | null;
  setLastCompletedOrder: (order: Order | null) => void;
  isReceiptModalOpen: boolean;
  setIsReceiptModalOpen: (open: boolean) => void;
}

const POSContext = createContext<POSContextType | undefined>(undefined);

const STORAGE_KEY_POS_DRAFT = "tpk_pos_draft_cart_v1";

export function POSProvider({ children }: { children: React.ReactNode }) {
  const { createOrder } = useAdminOrders();

  const [cart, setCart] = useState<POSCartItem[]>([]);
  const [orderType, setOrderType] = useState<OrderType>("dine-in");
  const [tableNumber, setTableNumber] = useState("Table 1");
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [orderNotes, setOrderNotes] = useState("");
  const [discount, setDiscount] = useState<POSDiscount>({ type: "percent", value: 0 });
  
  const [customizingItem, setCustomizingItem] = useState<MenuItem | null>(null);
  const [lastCompletedOrder, setLastCompletedOrder] = useState<Order | null>(null);
  const [isReceiptModalOpen, setIsReceiptModalOpen] = useState(false);

  // Restore draft cart from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_POS_DRAFT);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed.cart)) setCart(parsed.cart);
        if (parsed.orderType) setOrderType(parsed.orderType);
        if (parsed.tableNumber) setTableNumber(parsed.tableNumber);
        if (parsed.customerName) setCustomerName(parsed.customerName);
        if (parsed.customerPhone) setCustomerPhone(parsed.customerPhone);
        if (parsed.deliveryAddress) setDeliveryAddress(parsed.deliveryAddress);
        if (parsed.orderNotes) setOrderNotes(parsed.orderNotes);
        if (parsed.discount) setDiscount(parsed.discount);
      }
    } catch (e) {
      console.warn("Failed to load POS draft:", e);
    }
  }, []);

  // Save draft to localStorage
  useEffect(() => {
    try {
      const draftData = {
        cart,
        orderType,
        tableNumber,
        customerName,
        customerPhone,
        deliveryAddress,
        orderNotes,
        discount,
      };
      localStorage.setItem(STORAGE_KEY_POS_DRAFT, JSON.stringify(draftData));
    } catch (e) {
      console.warn("Failed to save POS draft:", e);
    }
  }, [cart, orderType, tableNumber, customerName, customerPhone, deliveryAddress, orderNotes, discount]);

  const openCustomizationModal = (item: MenuItem) => {
    setCustomizingItem(item);
  };

  const closeCustomizationModal = () => {
    setCustomizingItem(null);
  };

  // Add customized item from modal
  const addCustomizedItemToCart = ({
    menuItem,
    size,
    crust,
    customizations = [],
    notes = "",
    quantity,
    unitPrice,
  }: {
    menuItem: MenuItem;
    size?: string;
    crust?: string;
    customizations?: string[];
    notes?: string;
    quantity: number;
    unitPrice: number;
  }) => {
    const cartItemId = `pos-item-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
    const newItem: POSCartItem = {
      cartItemId,
      menuItemId: menuItem.id,
      name: menuItem.name,
      price: unitPrice,
      quantity,
      size,
      crust,
      customizations,
      notes,
      itemTotal: unitPrice * quantity,
    };

    setCart((prev) => [...prev, newItem]);
    closeCustomizationModal();
  };

  // Quick 1-tap add for simple non-custom items
  const addQuickItem = (item: MenuItem) => {
    // If item has variants, open modal instead
    if (item.variants && item.variants.length > 0) {
      openCustomizationModal(item);
      return;
    }

    setCart((prev) => {
      const existing = prev.find((i) => i.menuItemId === item.id && !i.size && !i.crust && (!i.customizations || i.customizations.length === 0));
      if (existing) {
        return prev.map((i) =>
          i.cartItemId === existing.cartItemId
            ? { ...i, quantity: i.quantity + 1, itemTotal: i.price * (i.quantity + 1) }
            : i
        );
      }
      const cartItemId = `pos-item-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
      return [
        ...prev,
        {
          cartItemId,
          menuItemId: item.id,
          name: item.name,
          price: item.price,
          quantity: 1,
          itemTotal: item.price,
        },
      ];
    });
  };

  const updateQuantity = (cartItemId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.cartItemId === cartItemId) {
            const newQty = item.quantity + delta;
            if (newQty <= 0) return null;
            return {
              ...item,
              quantity: newQty,
              itemTotal: item.price * newQty,
            };
          }
          return item;
        })
        .filter(Boolean) as POSCartItem[]
    );
  };

  const removeItem = (cartItemId: string) => {
    setCart((prev) => prev.filter((i) => i.cartItemId !== cartItemId));
  };

  const clearCart = () => {
    setCart([]);
    setDiscount({ type: "percent", value: 0 });
    setOrderNotes("");
    try {
      localStorage.removeItem(STORAGE_KEY_POS_DRAFT);
    } catch (e) {
      console.warn(e);
    }
  };

  // Financial calculations
  const subtotal = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.itemTotal, 0);
  }, [cart]);

  const deliveryFee = orderType === "delivery" ? 150 : 0;

  const discountAmount = useMemo(() => {
    if (!discount.value || discount.value <= 0) return 0;
    if (discount.type === "percent") {
      return Math.round((subtotal * discount.value) / 100);
    }
    return Math.min(discount.value, subtotal);
  }, [subtotal, discount]);

  const total = Math.max(0, subtotal + deliveryFee - discountAmount);

  // Submit and create finalized order
  const submitOrder = (paymentMethod: PaymentMethod, paymentStatus: PaymentStatus, receivedAmount?: number): Order => {
    if (cart.length === 0) {
      throw new Error("Cannot submit an empty order ticket.");
    }

    const defaultCustomerName =
      orderType === "dine-in"
        ? `Dine-in (${tableNumber})`
        : orderType === "takeaway"
        ? "Takeaway Guest"
        : "Delivery Customer";

    const newOrder = createOrder({
      customerName: customerName.trim() || defaultCustomerName,
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
      items: cart.map((i) => ({
        menuItemId: i.menuItemId,
        name: i.name,
        price: i.price,
        quantity: i.quantity,
        size: i.size,
        crust: i.crust,
        customizations: i.customizations,
        notes: i.notes,
      })),
      subtotal,
      deliveryFee,
      discount: discountAmount,
      total,
      source: "pos",
      paymentMethod,
      paymentStatus,
      notes: orderNotes.trim() ? orderNotes : undefined,
    });

    setLastCompletedOrder(newOrder);
    setIsReceiptModalOpen(true);
    clearCart();

    return newOrder;
  };

  return (
    <POSContext.Provider
      value={{
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
        addCustomizedItemToCart,
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
      }}
    >
      {children}
    </POSContext.Provider>
  );
}

export function usePOS() {
  const context = useContext(POSContext);
  if (!context) {
    throw new Error("usePOS must be used within a POSProvider");
  }
  return context;
}
