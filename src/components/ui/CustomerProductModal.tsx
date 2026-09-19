"use client";

import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Minus, MessageCircle, ShoppingBag, Sparkles, Check } from "lucide-react";
import { useCustomerCart } from "@/context/CustomerCartContext";
import { formatPrice, CONTACT } from "@/lib/data";
import CustomerButton from "./CustomerButton";
import CustomerBadge from "./CustomerBadge";

interface ParsedSizeOption {
  label: string;
  price: number;
}

const TOPPING_OPTIONS = [
  { id: "extra_cheese", name: "Extra Mozzarella Cheese", price: 200 },
  { id: "extra_chicken", name: "Extra Chicken Chunks", price: 250 },
  { id: "olives_mushrooms", name: "Black Olives & Mushrooms", price: 150 },
  { id: "jalapenos", name: "Spicy Jalapeños", price: 100 },
  { id: "dip_sauce", name: "Garlic Mayo Dip Sauce", price: 100 },
];

const CRUST_OPTIONS = [
  { id: "normal", name: "Classic Golden Crust", extraPrice: 0 },
  { id: "thin", name: "Italian Thin Crust", extraPrice: 0 },
  { id: "thick", name: "Pan Thick Crust", extraPrice: 0 },
  { id: "square", name: "Square Thick Crust", extraPrice: 150 },
];

export default function CustomerProductModal() {
  const { customizingItem, closeCustomizeModal, addToCart } = useCustomerCart();

  const isPizza = useMemo(() => {
    if (!customizingItem) return false;
    const catId = customizingItem.categoryId?.toLowerCase() || "";
    const name = customizingItem.name.toLowerCase();
    return catId.includes("pizza") || name.includes("pizza") || !!customizingItem.priceNote;
  }, [customizingItem]);

  // Parse available sizes from priceNote or fallback to default
  const sizeOptions: ParsedSizeOption[] = useMemo(() => {
    if (!customizingItem) return [];
    const note = customizingItem.priceNote || "";

    // If format like "S:590 | R:1340 | L:1790 | XL:2650"
    if (note.includes("S:") && note.includes("L:")) {
      const matchS = note.match(/S:\s*(\d+)/i);
      const matchR = note.match(/R:\s*(\d+)/i);
      const matchL = note.match(/L:\s*(\d+)/i);
      const matchXL = note.match(/XL:\s*(\d+)/i);

      const list: ParsedSizeOption[] = [];
      if (matchS) list.push({ label: "Small (6\")", price: parseInt(matchS[1], 10) });
      if (matchR) list.push({ label: "Regular (9\")", price: parseInt(matchR[1], 10) });
      if (matchL) list.push({ label: "Large (12\")", price: parseInt(matchL[1], 10) });
      if (matchXL) list.push({ label: "XL (14\")", price: parseInt(matchXL[1], 10) });
      if (list.length > 0) return list;
    }

    // If format like "Round: Medium 1540 | Large 2399"
    if (note.toLowerCase().includes("medium") && note.toLowerCase().includes("large")) {
      const matchM = note.match(/Medium\s*(\d+)/i);
      const matchL = note.match(/Large\s*(\d+)/i);
      const list: ParsedSizeOption[] = [];
      if (matchM) list.push({ label: "Medium (9\")", price: parseInt(matchM[1], 10) });
      if (matchL) list.push({ label: "Large (12\")", price: parseInt(matchL[1], 10) });
      if (list.length > 0) return list;
    }

    // Default standard single size
    return [{ label: "Standard Serving", price: customizingItem.price }];
  }, [customizingItem]);

  // State
  const [selectedSize, setSelectedSize] = useState<ParsedSizeOption | null>(null);
  const [selectedCrust, setSelectedCrust] = useState<string>("Classic Golden Crust");
  const [selectedToppings, setSelectedToppings] = useState<string[]>([]);
  const [quantity, setQuantity] = useState<number>(1);
  const [notes, setNotes] = useState<string>("");

  // Reset state when customizingItem changes
  useEffect(() => {
    if (customizingItem && sizeOptions.length > 0) {
      // Pick first size or Large if available
      const defaultSize = sizeOptions.find((s) => s.label.includes("Large") || s.label.includes("Regular")) || sizeOptions[0];
      setSelectedSize(defaultSize);
      setSelectedCrust("Classic Golden Crust");
      setSelectedToppings([]);
      setQuantity(1);
      setNotes("");
    }
  }, [customizingItem, sizeOptions]);

  // Calculate Unit Price and Total
  const unitPrice = useMemo(() => {
    let price = selectedSize ? selectedSize.price : (customizingItem?.price || 0);

    // Add crust extra if applicable
    const crustObj = CRUST_OPTIONS.find((c) => c.name === selectedCrust);
    if (crustObj && crustObj.extraPrice) {
      price += crustObj.extraPrice;
    }

    // Add toppings
    selectedToppings.forEach((topName) => {
      const topObj = TOPPING_OPTIONS.find((t) => t.name === topName);
      if (topObj) price += topObj.price;
    });

    return price;
  }, [selectedSize, selectedCrust, selectedToppings, customizingItem]);

  const totalPrice = unitPrice * quantity;

  if (!customizingItem) return null;

  // Toggle Topping Checkbox
  const toggleTopping = (toppingName: string) => {
    setSelectedToppings((prev) =>
      prev.includes(toppingName)
        ? prev.filter((t) => t !== toppingName)
        : [...prev, toppingName]
    );
  };

  // Add to Cart Action
  const handleAddToCart = () => {
    const selectedSizeLabel = selectedSize?.label || "Standard";
    addToCart({
      menuItemId: customizingItem.id,
      name: customizingItem.name,
      price: unitPrice,
      quantity,
      size: isPizza ? selectedSizeLabel : undefined,
      crust: isPizza ? selectedCrust : undefined,
      customizations: selectedToppings.length > 0 ? selectedToppings : undefined,
      notes: notes.trim() ? notes.trim() : undefined,
    });
    closeCustomizeModal();
  };

  // Order via WhatsApp Action
  const handleWhatsAppOrder = () => {
    const sizeStr = isPizza && selectedSize ? ` (Size: ${selectedSize.label})` : "";
    const crustStr = isPizza ? `%0A• Crust: ${selectedCrust}` : "";
    const topStr =
      selectedToppings.length > 0
        ? `%0A• Add-ons: ${selectedToppings.join(", ")}`
        : "";
    const notesStr = notes.trim() ? `%0A• Instructions: ${encodeURIComponent(notes.trim())}` : "";
    
    const message = `*Order from The Pizza Kitchen Website*%0A*Item:* ${encodeURIComponent(customizingItem.name)}${sizeStr}%0A*Quantity:* ${quantity}${crustStr}${topStr}${notesStr}%0A*Total:* ${formatPrice(totalPrice)}%0A%0APlease confirm my order!`;

    window.open(`https://wa.me/${CONTACT.whatsapp.replace("+", "")}?text=${message}`, "_blank");
    closeCustomizeModal();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeCustomizeModal}
          className="fixed inset-0 bg-black/70 backdrop-blur-xs transition-opacity"
          aria-hidden="true"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 350 }}
          className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden z-10 my-8 text-stone-900"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-item-title"
        >
          {/* Header Bar */}
          <div className="relative p-6 bg-[#FFF8F0] border-b border-stone-200/80 flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                {customizingItem.isPopular && <CustomerBadge variant="popular" />}
                {customizingItem.isSpicy && <CustomerBadge variant="spicy" />}
                <span className="text-xs font-bold uppercase tracking-wider text-red-600 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  Customize Your Dish
                </span>
              </div>
              <h3 id="modal-item-title" className="text-xl sm:text-2xl font-black text-stone-900 leading-tight">
                {customizingItem.name}
              </h3>
              {customizingItem.description && (
                <p className="text-xs sm:text-sm text-stone-500 mt-1 leading-relaxed">
                  {customizingItem.description}
                </p>
              )}
            </div>

            <button
              onClick={closeCustomizeModal}
              aria-label="Close modal"
              className="p-2 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-200/60 transition-colors ml-4 shrink-0"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Modal Scrollable Body */}
          <div className="p-6 space-y-6 max-h-[60vh] overflow-y-auto">
            {/* 1. Size Selection (if multiple sizes available) */}
            {sizeOptions.length > 1 && (
              <div>
                <label className="block text-xs font-extrabold uppercase tracking-wider text-stone-700 mb-2.5">
                  1. Choose Size <span className="text-red-600">*</span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {sizeOptions.map((opt) => {
                    const isSelected = selectedSize?.label === opt.label;
                    return (
                      <button
                        key={opt.label}
                        type="button"
                        onClick={() => setSelectedSize(opt)}
                        className={`p-3 rounded-2xl border text-center transition-all cursor-pointer ${
                          isSelected
                            ? "bg-red-600 text-white border-red-600 shadow-md shadow-red-600/20 scale-102"
                            : "bg-stone-50 text-stone-700 border-stone-200 hover:border-stone-300 hover:bg-stone-100"
                        }`}
                      >
                        <span className="text-xs font-black block">{opt.label}</span>
                        <span className={`text-[11px] font-bold block mt-0.5 ${isSelected ? "text-white/90" : "text-stone-500"}`}>
                          {formatPrice(opt.price)}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* 2. Crust Style (Pizzas only) */}
            {isPizza && (
              <div>
                <label className="block text-xs font-extrabold uppercase tracking-wider text-stone-700 mb-2.5">
                  2. Select Crust Style
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {CRUST_OPTIONS.map((crust) => {
                    const isSelected = selectedCrust === crust.name;
                    return (
                      <button
                        key={crust.id}
                        type="button"
                        onClick={() => setSelectedCrust(crust.name)}
                        className={`p-3 rounded-2xl border flex items-center justify-between text-left transition-all cursor-pointer ${
                          isSelected
                            ? "bg-red-50 border-red-500 text-red-950 font-bold"
                            : "bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${isSelected ? "border-red-600 bg-red-600 text-white" : "border-stone-400 bg-white"}`}>
                            {isSelected && <Check className="w-3 h-3" />}
                          </div>
                          <span className="text-xs">{crust.name}</span>
                        </div>
                        {crust.extraPrice > 0 && (
                          <span className="text-[11px] font-bold text-amber-600">
                            +{formatPrice(crust.extraPrice)}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* 3. Add-ons & Extra Toppings */}
            {isPizza && (
              <div>
                <label className="block text-xs font-extrabold uppercase tracking-wider text-stone-700 mb-2.5">
                  3. Extra Toppings & Dips (Optional)
                </label>
                <div className="space-y-2">
                  {TOPPING_OPTIONS.map((top) => {
                    const isChecked = selectedToppings.includes(top.name);
                    return (
                      <button
                        key={top.id}
                        type="button"
                        onClick={() => toggleTopping(top.name)}
                        className={`w-full p-3 rounded-2xl border flex items-center justify-between text-left transition-all cursor-pointer ${
                          isChecked
                            ? "bg-stone-900 border-stone-900 text-white font-bold"
                            : "bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100"
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <div className={`w-4 h-4 rounded-md border flex items-center justify-center ${isChecked ? "border-red-500 bg-red-500 text-white" : "border-stone-400 bg-white"}`}>
                            {isChecked && <Check className="w-3 h-3" />}
                          </div>
                          <span className="text-xs">{top.name}</span>
                        </div>
                        <span className={`text-xs font-bold ${isChecked ? "text-amber-400" : "text-stone-500"}`}>
                          +{formatPrice(top.price)}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* 4. Special Instructions */}
            <div>
              <label className="block text-xs font-extrabold uppercase tracking-wider text-stone-700 mb-1.5">
                Special Instructions
              </label>
              <input
                type="text"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="e.g. Extra crispy crust, less spicy sauce, etc."
                className="w-full px-4 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-xs sm:text-sm text-stone-900 placeholder-stone-400 focus:outline-none focus:border-red-500"
              />
            </div>

            {/* 5. Quantity Stepper */}
            <div className="flex items-center justify-between pt-2 border-t border-stone-100">
              <span className="text-xs font-extrabold uppercase tracking-wider text-stone-700">
                Quantity
              </span>
              <div className="flex items-center gap-3 bg-stone-100 p-1.5 rounded-2xl">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  disabled={quantity <= 1}
                  className="w-8 h-8 rounded-xl bg-white border border-stone-200 flex items-center justify-center text-stone-700 hover:bg-stone-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="w-6 text-center font-black text-sm text-stone-900">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => q + 1)}
                  className="w-8 h-8 rounded-xl bg-white border border-stone-200 flex items-center justify-center text-stone-700 hover:bg-stone-50 transition-all"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Footer Bar with Price & Buttons */}
          <div className="p-6 bg-stone-950 text-white flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-stone-800">
            <div>
              <span className="text-[11px] font-bold text-stone-400 block uppercase tracking-wider">
                Total Price
              </span>
              <span className="text-2xl font-black text-amber-400">
                {formatPrice(totalPrice)}
              </span>
            </div>

            <div className="flex items-center gap-2.5 w-full sm:w-auto">
              <CustomerButton
                variant="whatsapp"
                size="md"
                onClick={handleWhatsAppOrder}
                icon={<MessageCircle className="w-4 h-4" />}
                className="w-full sm:w-auto justify-center"
              >
                WhatsApp
              </CustomerButton>

              <CustomerButton
                variant="primary"
                size="md"
                onClick={handleAddToCart}
                icon={<ShoppingBag className="w-4 h-4" />}
                className="w-full sm:w-auto justify-center"
              >
                Add to Cart
              </CustomerButton>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
