"use client";

import React, { useState, useEffect, useMemo } from "react";
import {
  X,
  Plus,
  Minus,
  Check,
  Flame,
  ChefHat,
  ShoppingBag,
} from "lucide-react";
import type { MenuItem } from "@/types";
import { formatPrice } from "@/lib/data";
import { usePOS } from "@/context/POSContext";

interface POSProductCustomizationModalProps {
  item: MenuItem | null;
  onClose: () => void;
}

const DEFAULT_CRUSTS = [
  { name: "Normal Crust", price: 0 },
  { name: "Thick Pan Crust", price: 0 },
  { name: "Thin & Crispy", price: 0 },
  { name: "Cheese Stuffed Crust", price: 200 },
  { name: "Square Deep Dish", price: 150 },
];

const DEFAULT_TOPPINGS = [
  { name: "Extra Mozzarella", price: 150 },
  { name: "Extra Chicken / Meat", price: 180 },
  { name: "Spicy Jalapeños", price: 60 },
  { name: "Black Olives", price: 70 },
  { name: "Mushrooms", price: 80 },
  { name: "Garlic Ranch Sauce Dip", price: 90 },
];

export default function POSProductCustomizationModal({
  item,
  onClose,
}: POSProductCustomizationModalProps) {
  const { addCustomizedItemToCart } = usePOS();

  const isPizza = item?.name.toLowerCase().includes("pizza") || false;

  // Derive sizes from variants if present, otherwise default
  const sizeOptions = useMemo(() => {
    if (!item) return [];
    if (item.variants && item.variants.length > 0) {
      return item.variants.map((v) => ({ name: v.size, price: v.price }));
    }
    if (isPizza) {
      return [
        { name: "Small (7\")", price: Math.round(item.price * 0.55) },
        { name: "Medium (10\")", price: Math.round(item.price * 0.8) },
        { name: "Large (13\")", price: item.price },
        { name: "Family / XL (16\")", price: Math.round(item.price * 1.35) },
      ];
    }
    return [{ name: "Standard", price: item.price }];
  }, [item, isPizza]);

  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedCrust, setSelectedCrust] = useState<string>("");
  const [selectedToppings, setSelectedToppings] = useState<string[]>([]);
  const [kitchenNotes, setKitchenNotes] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);

  // Initialize defaults on item load
  useEffect(() => {
    if (item) {
      if (sizeOptions.length > 0) {
        // Default to Large or standard
        const defaultSize = sizeOptions.find((s) => s.name.includes("Large")) || sizeOptions[0];
        setSelectedSize(defaultSize.name);
      } else {
        setSelectedSize("Standard");
      }
      setSelectedCrust(isPizza ? "Normal Crust" : "");
      setSelectedToppings([]);
      setKitchenNotes("");
      setQuantity(1);
    }
  }, [item, sizeOptions, isPizza]);

  if (!item) return null;

  // Calculate unit price based on selections
  const baseSizePrice = sizeOptions.find((s) => s.name === selectedSize)?.price || item.price;
  const crustPrice = DEFAULT_CRUSTS.find((c) => c.name === selectedCrust)?.price || 0;
  const toppingsPrice = selectedToppings.reduce((sum, name) => {
    const t = DEFAULT_TOPPINGS.find((top) => top.name === name);
    return sum + (t ? t.price : 0);
  }, 0);

  const unitPrice = baseSizePrice + crustPrice + toppingsPrice;
  const totalPrice = unitPrice * quantity;

  const toggleTopping = (toppingName: string) => {
    setSelectedToppings((prev) =>
      prev.includes(toppingName)
        ? prev.filter((t) => t !== toppingName)
        : [...prev, toppingName]
    );
  };

  const handleAddToCart = () => {
    addCustomizedItemToCart({
      menuItem: item,
      size: selectedSize || undefined,
      crust: selectedCrust || undefined,
      customizations: selectedToppings.length > 0 ? selectedToppings : undefined,
      notes: kitchenNotes.trim() || undefined,
      quantity,
      unitPrice,
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 select-none animate-in fade-in duration-150">
      <div className="bg-[#141417] border border-stone-800 rounded-3xl w-full max-w-xl max-h-[90vh] flex flex-col shadow-2xl shadow-black overflow-hidden">
        {/* Modal Header */}
        <div className="p-4 sm:p-5 bg-stone-900/90 border-b border-stone-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-600/20 text-red-400 flex items-center justify-center font-bold text-lg">
              🍕
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-black text-white">{item.name}</h3>
              <p className="text-[11px] text-stone-400">
                {item.description || "Select options for POS ticket"}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Close Customization Modal"
            className="p-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body - Scrollable */}
        <div className="p-4 sm:p-5 overflow-y-auto space-y-5 flex-1 text-xs">
          {/* 1. Size Selection */}
          {sizeOptions.length > 1 && (
            <div className="space-y-2">
              <label className="font-extrabold text-stone-300 uppercase tracking-wider text-[11px] flex items-center justify-between">
                <span>1. Select Size</span>
                <span className="text-red-400 font-bold">*Required</span>
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {sizeOptions.map((s) => {
                  const isSelected = selectedSize === s.name;
                  return (
                    <button
                      key={s.name}
                      type="button"
                      onClick={() => setSelectedSize(s.name)}
                      className={`p-3 rounded-2xl border text-center transition-all flex flex-col items-center justify-between gap-1 ${
                        isSelected
                          ? "bg-red-600/20 border-red-500 text-white shadow-sm ring-1 ring-red-500"
                          : "bg-stone-950 border-stone-800 text-stone-300 hover:bg-stone-900 hover:border-stone-700"
                      }`}
                    >
                      <span className="font-black text-xs">{s.name}</span>
                      <span className={`text-[11px] font-bold ${isSelected ? "text-red-300" : "text-stone-400"}`}>
                        {formatPrice(s.price)}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* 2. Crust Selection (For Pizzas) */}
          {isPizza && (
            <div className="space-y-2">
              <label className="font-extrabold text-stone-300 uppercase tracking-wider text-[11px]">
                2. Crust Style
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {DEFAULT_CRUSTS.map((c) => {
                  const isSelected = selectedCrust === c.name;
                  return (
                    <button
                      key={c.name}
                      type="button"
                      onClick={() => setSelectedCrust(c.name)}
                      className={`p-2.5 rounded-xl border text-left flex items-center justify-between transition-all ${
                        isSelected
                          ? "bg-red-600/20 border-red-500 text-white ring-1 ring-red-500"
                          : "bg-stone-950 border-stone-800 text-stone-300 hover:bg-stone-900"
                      }`}
                    >
                      <span className="font-bold text-[11px]">{c.name}</span>
                      {c.price > 0 && (
                        <span className="text-[10px] text-amber-400 font-bold shrink-0">
                          +{formatPrice(c.price)}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* 3. Extra Toppings (For Pizzas) */}
          {isPizza && (
            <div className="space-y-2">
              <label className="font-extrabold text-stone-300 uppercase tracking-wider text-[11px]">
                3. Extra Toppings & Add-ons
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {DEFAULT_TOPPINGS.map((t) => {
                  const isChecked = selectedToppings.includes(t.name);
                  return (
                    <button
                      key={t.name}
                      type="button"
                      onClick={() => toggleTopping(t.name)}
                      className={`p-2.5 rounded-xl border text-left flex items-center justify-between transition-all ${
                        isChecked
                          ? "bg-amber-500/20 border-amber-500/80 text-amber-200 ring-1 ring-amber-500/50"
                          : "bg-stone-950 border-stone-800 text-stone-400 hover:bg-stone-900 hover:text-stone-300"
                      }`}
                    >
                      <div className="flex items-center gap-2 truncate">
                        <div
                          className={`w-4 h-4 rounded flex items-center justify-center border ${
                            isChecked
                              ? "bg-amber-500 border-amber-500 text-black"
                              : "border-stone-700 bg-stone-900"
                          }`}
                        >
                          {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                        <span className="font-bold text-[11px] truncate">{t.name}</span>
                      </div>
                      <span className="text-[10px] text-stone-400 font-bold shrink-0">
                        +{formatPrice(t.price)}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* 4. Kitchen Cooking Notes */}
          <div className="space-y-1.5">
            <label className="font-extrabold text-stone-300 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
              <ChefHat className="w-3.5 h-3.5 text-red-500" />
              <span>Special Kitchen Instructions</span>
            </label>
            <input
              type="text"
              value={kitchenNotes}
              onChange={(e) => setKitchenNotes(e.target.value)}
              placeholder="e.g. Less spicy, Extra crispy base, Slice into 8 pieces..."
              className="w-full px-3 py-2.5 rounded-xl bg-stone-950 border border-stone-800 text-xs text-stone-200 placeholder-stone-600 focus:outline-none focus:border-red-500"
            />
          </div>
        </div>

        {/* Modal Footer: Quantity Stepper & Add Action */}
        <div className="p-4 sm:p-5 bg-stone-900/90 border-t border-stone-800 flex items-center justify-between gap-4 shrink-0">
          {/* Quantity Stepper */}
          <div className="flex items-center gap-2 bg-stone-950 p-1 rounded-2xl border border-stone-800">
            <button
              type="button"
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="w-9 h-9 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-300 hover:text-white flex items-center justify-center transition-colors"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="w-8 text-center font-black text-sm text-white">
              {quantity}
            </span>
            <button
              type="button"
              onClick={() => setQuantity((q) => q + 1)}
              className="w-9 h-9 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-300 hover:text-white flex items-center justify-center transition-colors"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          {/* Add to Ticket Button */}
          <button
            type="button"
            onClick={handleAddToCart}
            className="flex-1 py-3.5 px-5 rounded-2xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 active:scale-98 text-white font-black text-xs uppercase tracking-wider transition-all shadow-lg shadow-red-600/30 flex items-center justify-between"
          >
            <span className="flex items-center gap-2">
              <ShoppingBag className="w-4 h-4" />
              <span>Add to POS Ticket</span>
            </span>
            <span className="font-black text-sm">{formatPrice(totalPrice)}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
