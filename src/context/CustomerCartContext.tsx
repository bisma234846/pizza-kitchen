"use client";

import React, { createContext, useContext, useState, useEffect, useMemo } from "react";
import type { MenuItem } from "@/types";
import type { OrderItem } from "@/types/orders";

const STORAGE_KEY_CUSTOMER_CART = "tpk_customer_cart_v1";

export interface CustomerCartContextType {
  cartItems: OrderItem[];
  addToCart: (item: Omit<OrderItem, "id" | "itemTotal">) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, quantity: number) => void;
  clearCart: () => void;
  subtotal: number;
  totalItemsCount: number;
  // Drawer state
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  // Customization Modal state
  customizingItem: MenuItem | null;
  openCustomizeModal: (item: MenuItem) => void;
  closeCustomizeModal: () => void;
}

const CustomerCartContext = createContext<CustomerCartContextType | undefined>(undefined);

export function CustomerCartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<OrderItem[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [customizingItem, setCustomizingItem] = useState<MenuItem | null>(null);

  // Hydrate cart from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_CUSTOMER_CART);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          setCartItems(parsed);
        }
      }
    } catch (e) {
      console.warn("Failed to load customer cart from localStorage:", e);
    } finally {
      setIsHydrated(true);
    }
  }, []);

  // Save cart to localStorage
  useEffect(() => {
    if (!isHydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY_CUSTOMER_CART, JSON.stringify(cartItems));
    } catch (e) {
      console.warn("Failed to persist customer cart:", e);
    }
  }, [cartItems, isHydrated]);

  // Calculate Subtotal & Total Items
  const subtotal = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + (item.itemTotal || item.price * item.quantity), 0);
  }, [cartItems]);

  const totalItemsCount = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + item.quantity, 0);
  }, [cartItems]);

  // Add To Cart
  const addToCart = (newItem: Omit<OrderItem, "id" | "itemTotal">) => {
    const itemTotal = newItem.price * newItem.quantity;
    
    // Check if an identical configured item is already in cart
    const existingIndex = cartItems.findIndex((ci) => {
      const sameId = ci.menuItemId === newItem.menuItemId;
      const sameSize = (ci.size || "") === (newItem.size || "");
      const sameCrust = (ci.crust || "") === (newItem.crust || "");
      const sameNotes = (ci.notes || "") === (newItem.notes || "");
      const sameCustoms =
        JSON.stringify(ci.customizations?.slice().sort() || []) ===
        JSON.stringify(newItem.customizations?.slice().sort() || []);
      return sameId && sameSize && sameCrust && sameNotes && sameCustoms;
    });

    if (existingIndex > -1) {
      setCartItems((prev) =>
        prev.map((item, idx) => {
          if (idx !== existingIndex) return item;
          const newQty = item.quantity + newItem.quantity;
          return {
            ...item,
            quantity: newQty,
            itemTotal: item.price * newQty,
          };
        })
      );
    } else {
      const uniqueId = `cart-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
      const cartItem: OrderItem = {
        ...newItem,
        id: uniqueId,
        itemTotal,
      };
      setCartItems((prev) => [cartItem, ...prev]);
    }

    // Automatically open the cart drawer so customer sees their item added
    setIsCartOpen(true);
  };

  // Remove From Cart
  const removeFromCart = (cartItemId: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== cartItemId));
  };

  // Update Quantity
  const updateQuantity = (cartItemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === cartItemId
          ? {
              ...item,
              quantity,
              itemTotal: item.price * quantity,
            }
          : item
      )
    );
  };

  // Clear Cart
  const clearCart = () => {
    setCartItems([]);
  };

  // Drawer Controls
  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);
  const toggleCart = () => setIsCartOpen((prev) => !prev);

  // Customization Modal Controls
  const openCustomizeModal = (item: MenuItem) => setCustomizingItem(item);
  const closeCustomizeModal = () => setCustomizingItem(null);

  return (
    <CustomerCartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        subtotal,
        totalItemsCount,
        isCartOpen,
        openCart,
        closeCart,
        toggleCart,
        customizingItem,
        openCustomizeModal,
        closeCustomizeModal,
      }}
    >
      {children}
    </CustomerCartContext.Provider>
  );
}

export function useCustomerCart() {
  const context = useContext(CustomerCartContext);
  if (!context) {
    throw new Error("useCustomerCart must be used within a CustomerCartProvider");
  }
  return context;
}
