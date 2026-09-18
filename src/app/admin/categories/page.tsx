"use client";

import React, { useState } from "react";
import {
  Plus,
  ArrowUp,
  ArrowDown,
  Edit,
  Trash2,
  Pizza,
  Flame,
  UtensilsCrossed,
  Utensils,
  Coffee,
  IceCream,
  Sandwich,
  Star,
  Layers,
  Sparkles,
} from "lucide-react";
import { useMenu } from "@/context/MenuContext";
import CategoryModal from "@/components/admin/CategoryModal";
import type { MenuCategory } from "@/types";

export default function CategoriesManagementPage() {
  const { categories, moveCategory, deleteCategory, resetToDefaultMenu } = useMenu();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [categoryToEdit, setCategoryToEdit] = useState<MenuCategory | null>(null);
  const [categoryToDelete, setCategoryToDelete] = useState<MenuCategory | null>(null);

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case "Pizza":
        return <Pizza className="w-5 h-5 text-red-500" />;
      case "Flame":
        return <Flame className="w-5 h-5 text-amber-500" />;
      case "UtensilsCrossed":
        return <UtensilsCrossed className="w-5 h-5 text-amber-500" />;
      case "Utensils":
        return <Utensils className="w-5 h-5 text-amber-500" />;
      case "Coffee":
        return <Coffee className="w-5 h-5 text-amber-600" />;
      case "IceCreamCone":
      case "IceCream":
        return <IceCream className="w-5 h-5 text-pink-400" />;
      case "Sandwich":
        return <Sandwich className="w-5 h-5 text-yellow-500" />;
      default:
        return <Star className="w-5 h-5 text-amber-500" />;
    }
  };

  const handleOpenAdd = () => {
    setCategoryToEdit(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (category: MenuCategory) => {
    setCategoryToEdit(category);
    setIsModalOpen(true);
  };

  const confirmDelete = () => {
    if (categoryToDelete) {
      deleteCategory(categoryToDelete.id);
      setCategoryToDelete(null);
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl font-black text-white">Menu Categories & Tab Order</h2>
          <p className="text-xs text-stone-400">
            Reorder categories to control tab sequence on POS terminal and the customer menu
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={resetToDefaultMenu}
            className="px-3 py-2 rounded-xl bg-stone-900 border border-stone-800 hover:bg-stone-800 text-stone-400 hover:text-white text-xs font-semibold transition-colors"
          >
            Reset Default Order
          </button>
          <button
            onClick={handleOpenAdd}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 active:scale-95 text-white font-extrabold text-xs uppercase tracking-wider transition-all shadow-md shadow-red-600/30 shrink-0"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            <span>Add Category</span>
          </button>
        </div>
      </div>

      {/* Categories List in Display Sequence */}
      <div className="space-y-3">
        {categories.map((category, index) => {
          const totalItems = category.subCategories.reduce((sum, s) => sum + s.items.length, 0);
          const isFirst = index === 0;
          const isLast = index === categories.length - 1;

          return (
            <div
              key={category.id}
              className="p-5 rounded-3xl bg-stone-900 border border-stone-800 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 shadow-lg hover:border-stone-700 transition-all"
            >
              {/* Left: Position Number + Icon + Name + Description */}
              <div className="flex items-center gap-4 min-w-0">
                {/* Order Index Pill */}
                <div className="w-8 h-8 rounded-xl bg-stone-950 border border-stone-800 text-stone-400 font-black text-xs flex items-center justify-center shrink-0">
                  #{index + 1}
                </div>

                {/* Icon */}
                <div className="w-12 h-12 rounded-2xl bg-stone-950 border border-stone-800 flex items-center justify-center shrink-0 shadow-sm">
                  {getCategoryIcon(category.icon)}
                </div>

                {/* Category Info */}
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-black text-white truncate">
                      {category.name}
                    </h3>
                    <span className="px-2 py-0.5 rounded-full bg-stone-800 text-stone-300 text-[10px] font-bold">
                      {totalItems} items
                    </span>
                  </div>
                  {category.description && (
                    <p className="text-xs text-stone-400 mt-0.5 line-clamp-1">
                      {category.description}
                    </p>
                  )}
                  <div className="flex items-center gap-2 mt-1 text-[11px] text-stone-500">
                    <span>{category.subCategories.length} sub-sections:</span>
                    <span className="text-stone-400 font-semibold truncate">
                      {category.subCategories.map((s) => s.name).join(", ")}
                    </span>
                  </div>
                </div>
              </div>

              {/* Right: Reorder Up/Down + Edit + Delete */}
              <div className="flex items-center justify-end gap-2 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-stone-800">
                {/* Move Up */}
                <button
                  disabled={isFirst}
                  onClick={() => moveCategory(category.id, "up")}
                  className={`p-2 rounded-xl border text-xs font-bold transition-colors ${
                    isFirst
                      ? "bg-stone-950 border-stone-850 text-stone-700 cursor-not-allowed"
                      : "bg-stone-950 border-stone-800 text-stone-300 hover:text-white hover:bg-stone-800"
                  }`}
                  title="Move Tab Up"
                >
                  <ArrowUp className="w-4 h-4" />
                </button>

                {/* Move Down */}
                <button
                  disabled={isLast}
                  onClick={() => moveCategory(category.id, "down")}
                  className={`p-2 rounded-xl border text-xs font-bold transition-colors ${
                    isLast
                      ? "bg-stone-950 border-stone-850 text-stone-700 cursor-not-allowed"
                      : "bg-stone-950 border-stone-800 text-stone-300 hover:text-white hover:bg-stone-800"
                  }`}
                  title="Move Tab Down"
                >
                  <ArrowDown className="w-4 h-4" />
                </button>

                {/* Edit */}
                <button
                  onClick={() => handleOpenEdit(category)}
                  className="px-3.5 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-bold flex items-center gap-1.5 transition-colors"
                >
                  <Edit className="w-3.5 h-3.5" />
                  <span>Edit</span>
                </button>

                {/* Delete */}
                <button
                  onClick={() => setCategoryToDelete(category)}
                  className="p-2 rounded-xl bg-stone-800 hover:bg-red-600/30 text-stone-400 hover:text-red-400 transition-colors"
                  title="Delete Category"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add / Edit Category Modal */}
      <CategoryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        categoryToEdit={categoryToEdit}
      />

      {/* Delete Confirmation Modal */}
      {categoryToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs">
          <div className="w-full max-w-sm rounded-3xl bg-stone-900 border border-stone-800 p-6 text-white shadow-2xl space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="w-12 h-12 rounded-full bg-red-600/20 text-red-500 flex items-center justify-center mx-auto">
              <Trash2 className="w-6 h-6" />
            </div>

            <div className="text-center space-y-1">
              <h3 className="text-base font-bold text-white">Delete "{categoryToDelete.name}"?</h3>
              <p className="text-xs text-stone-400">
                Deleting this category will remove it from POS and the customer menu tabs.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                type="button"
                onClick={() => setCategoryToDelete(null)}
                className="px-4 py-2.5 rounded-xl bg-stone-800 text-stone-300 hover:bg-stone-700 text-xs font-bold"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmDelete}
                className="px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold shadow-md shadow-red-600/20"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
