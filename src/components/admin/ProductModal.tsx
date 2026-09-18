"use client";

import React, { useState, useEffect } from "react";
import { X, Plus, Trash2, Flame, Star, Image as ImageIcon, CheckCircle2 } from "lucide-react";
import { useMenu } from "@/context/MenuContext";
import type { MenuItem, MenuItemVariant } from "@/types";

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  productToEdit?: MenuItem & { categoryId?: string; subCategoryId?: string } | null;
}

const PRESET_IMAGES = [
  { name: "Signature Pizza", url: "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=600&auto=format&fit=crop" },
  { name: "Spicy Wings", url: "https://images.unsplash.com/photo-1567620832903-9fc6debc209f?q=80&w=600&auto=format&fit=crop" },
  { name: "Creamy Pasta", url: "https://images.unsplash.com/photo-1621996346565-e3d5d628103d?q=80&w=600&auto=format&fit=crop" },
  { name: "Sharing Platter", url: "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=600&auto=format&fit=crop" },
  { name: "Grilled Sandwich", url: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?q=80&w=600&auto=format&fit=crop" },
  { name: "Cold Beverages", url: "https://images.unsplash.com/photo-1517256064527-09c73fc73e38?q=80&w=600&auto=format&fit=crop" },
  { name: "Dessert Brownie", url: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?q=80&w=600&auto=format&fit=crop" },
];

export default function ProductModal({
  isOpen,
  onClose,
  productToEdit,
}: ProductModalProps) {
  const { categories, addProduct, updateProduct } = useMenu();

  const [name, setName] = useState("");
  const [categoryId, setCategoryId] = useState(categories[0]?.id || "pizza");
  const [subCategoryId, setSubCategoryId] = useState("");
  const [price, setPrice] = useState<number>(1540);
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [isSpicy, setIsSpicy] = useState(false);
  const [isPopular, setIsPopular] = useState(false);
  const [inStock, setInStock] = useState(true);
  const [priceNote, setPriceNote] = useState("");
  const [variants, setVariants] = useState<MenuItemVariant[]>([]);

  // Selected category object
  const selectedCategoryObj = categories.find((c) => c.id === categoryId) || categories[0];

  useEffect(() => {
    if (productToEdit) {
      setName(productToEdit.name || "");
      setCategoryId(productToEdit.categoryId || categories[0]?.id || "pizza");
      setSubCategoryId(productToEdit.subCategoryId || "");
      setPrice(productToEdit.price || 0);
      setDescription(productToEdit.description || "");
      setImage(productToEdit.image || "");
      setIsSpicy(!!productToEdit.isSpicy);
      setIsPopular(!!productToEdit.isPopular);
      setInStock(productToEdit.inStock !== false);
      setPriceNote(productToEdit.priceNote || "");
      setVariants(productToEdit.variants || []);
    } else {
      setName("");
      setCategoryId(categories[0]?.id || "pizza");
      setSubCategoryId(categories[0]?.subCategories[0]?.id || "");
      setPrice(1540);
      setDescription("");
      setImage(PRESET_IMAGES[0].url);
      setIsSpicy(false);
      setIsPopular(false);
      setInStock(true);
      setPriceNote("");
      setVariants([]);
    }
  }, [productToEdit, isOpen, categories]);

  // When categoryId changes, update default subcategory if not already set
  useEffect(() => {
    if (selectedCategoryObj && selectedCategoryObj.subCategories.length > 0) {
      const currentSubValid = selectedCategoryObj.subCategories.some((s) => s.id === subCategoryId);
      if (!currentSubValid) {
        setSubCategoryId(selectedCategoryObj.subCategories[0].id);
      }
    }
  }, [categoryId, selectedCategoryObj, subCategoryId]);

  if (!isOpen) return null;

  const handleAddVariant = () => {
    setVariants((prev) => [...prev, { size: "Regular", price: price || 1000 }]);
  };

  const handleRemoveVariant = (index: number) => {
    setVariants((prev) => prev.filter((_, idx) => idx !== index));
  };

  const handleUpdateVariant = (index: number, field: "size" | "price", value: string | number) => {
    setVariants((prev) =>
      prev.map((v, idx) => {
        if (idx !== index) return v;
        return {
          ...v,
          [field]: field === "price" ? Number(value) : value,
        };
      })
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      alert("Please enter a product name.");
      return;
    }

    const payload = {
      name: name.trim(),
      price: Number(price) || 0,
      description: description.trim() || undefined,
      image: image.trim() || undefined,
      isSpicy,
      isPopular,
      inStock,
      priceNote: priceNote.trim() || undefined,
      variants: variants.length > 0 ? variants : undefined,
    };

    if (productToEdit) {
      updateProduct(productToEdit.id, payload);
    } else {
      addProduct(categoryId, subCategoryId, payload);
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs overflow-y-auto">
      <div className="w-full max-w-2xl rounded-3xl bg-stone-900 border border-stone-800 text-stone-100 shadow-2xl p-6 sm:p-8 space-y-6 animate-in fade-in zoom-in-95 duration-200 my-8">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-stone-800 pb-4">
          <div>
            <h3 className="text-lg font-black text-white">
              {productToEdit ? "Edit Menu Product" : "Add New Menu Product"}
            </h3>
            <p className="text-xs text-stone-400">
              Changes will immediately update POS and the customer menu
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-stone-400 hover:text-white hover:bg-stone-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Row 1: Product Name */}
          <div>
            <label className="block text-xs font-bold text-stone-300 uppercase tracking-wider mb-1.5">
              Product Name *
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Super Supreme Pizza"
              className="w-full px-4 py-3 rounded-xl bg-stone-950 border border-stone-800 text-sm text-white placeholder-stone-500 focus:outline-none focus:border-red-500"
            />
          </div>

          {/* Row 2: Category & Subcategory Selectors */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-stone-300 uppercase tracking-wider mb-1.5">
                Category *
              </label>
              <select
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-stone-950 border border-stone-800 text-sm text-white focus:outline-none focus:border-red-500"
              >
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-300 uppercase tracking-wider mb-1.5">
                Subcategory Section
              </label>
              <select
                value={subCategoryId}
                onChange={(e) => setSubCategoryId(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-stone-950 border border-stone-800 text-sm text-white focus:outline-none focus:border-red-500"
              >
                {selectedCategoryObj?.subCategories.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Row 3: Base Price & Price Note */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-stone-300 uppercase tracking-wider mb-1.5">
                Base Price (PKR) *
              </label>
              <input
                type="number"
                required
                min={0}
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                placeholder="1540"
                className="w-full px-4 py-3 rounded-xl bg-stone-950 border border-stone-800 text-sm text-white placeholder-stone-500 focus:outline-none focus:border-red-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-300 uppercase tracking-wider mb-1.5">
                Price Note / Size Guide (Optional)
              </label>
              <input
                type="text"
                value={priceNote}
                onChange={(e) => setPriceNote(e.target.value)}
                placeholder="e.g. S:590 | R:1340 | L:1790"
                className="w-full px-4 py-3 rounded-xl bg-stone-950 border border-stone-800 text-sm text-white placeholder-stone-500 focus:outline-none focus:border-red-500"
              />
            </div>
          </div>

          {/* Optional Multi-Size Variants */}
          <div className="p-4 rounded-2xl bg-stone-950 border border-stone-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-stone-300 uppercase tracking-wider">
                Multi-Size Pricing / Variants
              </span>
              <button
                type="button"
                onClick={handleAddVariant}
                className="inline-flex items-center gap-1 text-xs font-bold text-red-400 hover:text-red-300"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>+ Add Size</span>
              </button>
            </div>

            {variants.length === 0 ? (
              <p className="text-[11px] text-stone-500 italic">
                No variants configured. Base price will apply for all orders.
              </p>
            ) : (
              <div className="space-y-2">
                {variants.map((v, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <input
                      type="text"
                      placeholder="Size (e.g. Medium / Large / XL)"
                      value={v.size}
                      onChange={(e) => handleUpdateVariant(idx, "size", e.target.value)}
                      className="flex-1 px-3 py-1.5 rounded-lg bg-stone-900 border border-stone-800 text-xs text-white"
                    />
                    <input
                      type="number"
                      placeholder="Price (PKR)"
                      value={v.price}
                      onChange={(e) => handleUpdateVariant(idx, "price", e.target.value)}
                      className="w-32 px-3 py-1.5 rounded-lg bg-stone-900 border border-stone-800 text-xs text-white"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveVariant(idx)}
                      className="p-1.5 rounded-lg bg-stone-850 hover:bg-red-600/30 text-stone-400 hover:text-red-400"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Row 4: Description */}
          <div>
            <label className="block text-xs font-bold text-stone-300 uppercase tracking-wider mb-1.5">
              Description
            </label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="e.g. Tender chicken tikka with onions, secret herbs and mozzarella cheese."
              className="w-full px-4 py-2.5 rounded-xl bg-stone-950 border border-stone-800 text-sm text-white placeholder-stone-500 focus:outline-none focus:border-red-500 resize-none"
            />
          </div>

          {/* Row 5: Image Presets & URL */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-stone-300 uppercase tracking-wider">
              Product Image
            </label>

            {/* Quick Preset Selector */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              {PRESET_IMAGES.map((preset, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setImage(preset.url)}
                  className={`px-3 py-1 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${
                    image === preset.url
                      ? "bg-red-600 text-white shadow-sm"
                      : "bg-stone-950 border border-stone-800 text-stone-400 hover:text-white"
                  }`}
                >
                  {preset.name}
                </button>
              ))}
            </div>

            <input
              type="url"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              placeholder="https://... (or select preset above)"
              className="w-full px-4 py-2.5 rounded-xl bg-stone-950 border border-stone-800 text-xs text-white placeholder-stone-500 focus:outline-none focus:border-red-500"
            />
          </div>

          {/* Row 6: Toggles (Spicy, Popular, In Stock) */}
          <div className="grid grid-cols-3 gap-3 pt-2">
            {/* Spicy Toggle */}
            <button
              type="button"
              onClick={() => setIsSpicy(!isSpicy)}
              className={`p-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                isSpicy
                  ? "bg-red-600/20 border-red-500 text-red-400"
                  : "bg-stone-950 border-stone-800 text-stone-400 hover:text-white"
              }`}
            >
              <Flame className="w-4 h-4" />
              <span>{isSpicy ? "Spicy Item" : "Mild"}</span>
            </button>

            {/* Popular Toggle */}
            <button
              type="button"
              onClick={() => setIsPopular(!isPopular)}
              className={`p-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                isPopular
                  ? "bg-amber-500/20 border-amber-500 text-amber-300"
                  : "bg-stone-950 border-stone-800 text-stone-400 hover:text-white"
              }`}
            >
              <Star className="w-4 h-4" />
              <span>{isPopular ? "Popular Item" : "Regular"}</span>
            </button>

            {/* In Stock Toggle */}
            <button
              type="button"
              onClick={() => setInStock(!inStock)}
              className={`p-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                inStock
                  ? "bg-green-500/20 border-green-500 text-green-300"
                  : "bg-stone-950 border-stone-800 text-stone-500 line-through"
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{inStock ? "In Stock" : "Out of Stock"}</span>
            </button>
          </div>

          {/* Modal Actions */}
          <div className="pt-4 border-t border-stone-800 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-3 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs font-bold transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold uppercase tracking-wider transition-all shadow-md shadow-red-600/30 active:scale-95"
            >
              {productToEdit ? "Save Changes" : "Create Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
