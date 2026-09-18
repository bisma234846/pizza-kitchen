"use client";

import React, { useState, useEffect } from "react";
import { X, Pizza, Flame, Utensils, Coffee, IceCream, Sandwich, Star, UtensilsCrossed } from "lucide-react";
import { useMenu } from "@/context/MenuContext";
import type { MenuCategory } from "@/types";

interface CategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  categoryToEdit?: MenuCategory | null;
}

const AVAILABLE_ICONS = [
  { id: "Pizza", label: "Pizza", icon: Pizza },
  { id: "Flame", label: "Flame / Grill", icon: Flame },
  { id: "UtensilsCrossed", label: "Pasta", icon: UtensilsCrossed },
  { id: "Utensils", label: "Platters", icon: Utensils },
  { id: "Sandwich", label: "Sandwich", icon: Sandwich },
  { id: "Coffee", label: "Beverages", icon: Coffee },
  { id: "IceCreamCone", label: "Desserts", icon: IceCream },
  { id: "Star", label: "Special", icon: Star },
];

export default function CategoryModal({
  isOpen,
  onClose,
  categoryToEdit,
}: CategoryModalProps) {
  const { addCategory, updateCategory } = useMenu();

  const [name, setName] = useState("");
  const [icon, setIcon] = useState("Pizza");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (categoryToEdit) {
      setName(categoryToEdit.name || "");
      setIcon(categoryToEdit.icon || "Pizza");
      setDescription(categoryToEdit.description || "");
    } else {
      setName("");
      setIcon("Pizza");
      setDescription("");
    }
  }, [categoryToEdit, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      alert("Please enter a category name.");
      return;
    }

    if (categoryToEdit) {
      updateCategory(categoryToEdit.id, {
        name: name.trim(),
        icon,
        description: description.trim() || undefined,
      });
    } else {
      addCategory({
        name: name.trim(),
        icon,
        description: description.trim() || undefined,
      });
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs">
      <div className="w-full max-w-md rounded-3xl bg-stone-900 border border-stone-800 text-stone-100 shadow-2xl p-6 sm:p-8 space-y-6 animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between border-b border-stone-800 pb-4">
          <div>
            <h3 className="text-lg font-black text-white">
              {categoryToEdit ? "Edit Category" : "Add New Category"}
            </h3>
            <p className="text-xs text-stone-400">
              Controls tab ordering on POS and customer menu
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-stone-400 hover:text-white hover:bg-stone-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-stone-300 uppercase tracking-wider mb-1.5">
              Category Name *
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Burgers, Pizza, Pastas..."
              className="w-full px-4 py-3 rounded-xl bg-stone-950 border border-stone-800 text-sm text-white placeholder-stone-500 focus:outline-none focus:border-red-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-300 uppercase tracking-wider mb-1.5">
              Choose Icon
            </label>
            <div className="grid grid-cols-4 gap-2">
              {AVAILABLE_ICONS.map((item) => {
                const IconComponent = item.icon;
                const isSelected = icon === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setIcon(item.id)}
                    className={`p-2.5 rounded-xl border flex flex-col items-center gap-1 text-[11px] font-bold transition-all ${
                      isSelected
                        ? "bg-red-600/20 border-red-500 text-red-400 shadow-sm"
                        : "bg-stone-950 border-stone-800 text-stone-400 hover:text-white"
                    }`}
                  >
                    <IconComponent className="w-4 h-4" />
                    <span className="truncate w-full text-center">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-300 uppercase tracking-wider mb-1.5">
              Subtitle / Description
            </label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="e.g. Freshly baked with secret herbs..."
              className="w-full px-4 py-2.5 rounded-xl bg-stone-950 border border-stone-800 text-sm text-white placeholder-stone-500 focus:outline-none focus:border-red-500 resize-none"
            />
          </div>

          <div className="pt-4 border-t border-stone-800 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs font-bold transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold uppercase tracking-wider transition-all shadow-md shadow-red-600/30 active:scale-95"
            >
              {categoryToEdit ? "Save Category" : "Create Category"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
