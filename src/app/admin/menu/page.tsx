"use client";

import React, { useState } from "react";
import {
  Plus,
  Search,
  LayoutGrid,
  List,
  Flame,
  Star,
  Edit,
  Trash2,
  CheckCircle2,
  XCircle,
  ToggleLeft,
  ToggleRight,
  Filter,
  ArrowUpDown,
} from "lucide-react";
import { useMenu, type FlatProductItem } from "@/context/MenuContext";
import { formatPrice } from "@/lib/data";
import ProductModal from "@/components/admin/ProductModal";
import type { MenuItem } from "@/types";

export default function MenuManagementPage() {
  const { allProducts, categories, toggleProductStock, deleteProduct, resetToDefaultMenu } = useMenu();

  const [viewMode, setViewMode] = useState<"grid" | "table">("table");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedStockStatus, setSelectedStockStatus] = useState<string>("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productToEdit, setProductToEdit] = useState<FlatProductItem | null>(null);
  const [productToDelete, setProductToDelete] = useState<FlatProductItem | null>(null);

  // Filter products
  const filteredProducts = allProducts.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === "all" || product.categoryId === selectedCategory;

    const matchesStock =
      selectedStockStatus === "all" ||
      (selectedStockStatus === "in-stock" && product.inStock !== false) ||
      (selectedStockStatus === "out-of-stock" && product.inStock === false);

    return matchesSearch && matchesCategory && matchesStock;
  });

  const handleOpenAdd = () => {
    setProductToEdit(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (product: FlatProductItem) => {
    setProductToEdit(product);
    setIsModalOpen(true);
  };

  const confirmDelete = () => {
    if (productToDelete) {
      deleteProduct(productToDelete.id);
      setProductToDelete(null);
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header with Title and Add Action */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl font-black text-white">Menu & Product Catalog</h2>
          <p className="text-xs text-stone-400">
            {allProducts.length} total products across {categories.length} categories
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={resetToDefaultMenu}
            className="px-3 py-2 rounded-xl bg-stone-900 border border-stone-800 hover:bg-stone-800 text-stone-400 hover:text-white text-xs font-semibold transition-colors"
          >
            Reset Default Menu
          </button>
          <button
            onClick={handleOpenAdd}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 active:scale-95 text-white font-extrabold text-xs uppercase tracking-wider transition-all shadow-md shadow-red-600/30 shrink-0"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            <span>Add Product</span>
          </button>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
        {/* Search */}
        <div className="sm:col-span-5 relative">
          <Search className="w-4 h-4 text-stone-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search pizza, wings, pasta by name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-stone-900 border border-stone-800 text-xs text-stone-200 placeholder-stone-500 focus:outline-none focus:border-red-500"
          />
        </div>

        {/* Category Filter */}
        <div className="sm:col-span-3">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full px-3 py-2.5 rounded-xl bg-stone-900 border border-stone-800 text-xs text-stone-300 focus:outline-none focus:border-red-500"
          >
            <option value="all">All Categories ({categories.length})</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        {/* Stock Filter */}
        <div className="sm:col-span-2">
          <select
            value={selectedStockStatus}
            onChange={(e) => setSelectedStockStatus(e.target.value)}
            className="w-full px-3 py-2.5 rounded-xl bg-stone-900 border border-stone-800 text-xs text-stone-300 focus:outline-none focus:border-red-500"
          >
            <option value="all">All Stock Status</option>
            <option value="in-stock">In Stock Only</option>
            <option value="out-of-stock">Out of Stock</option>
          </select>
        </div>

        {/* View Toggle (Grid / Table) */}
        <div className="sm:col-span-2 flex items-center justify-end gap-1.5 p-1 rounded-xl bg-stone-900 border border-stone-800">
          <button
            onClick={() => setViewMode("table")}
            className={`flex-1 py-1.5 rounded-lg flex items-center justify-center transition-colors ${
              viewMode === "table"
                ? "bg-red-600 text-white shadow-sm"
                : "text-stone-400 hover:text-white"
            }`}
            title="Table View"
          >
            <List className="w-4 h-4" />
          </button>
          <button
            onClick={() => setViewMode("grid")}
            className={`flex-1 py-1.5 rounded-lg flex items-center justify-center transition-colors ${
              viewMode === "grid"
                ? "bg-red-600 text-white shadow-sm"
                : "text-stone-400 hover:text-white"
            }`}
            title="Card Grid View"
          >
            <LayoutGrid className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Content View */}
      {filteredProducts.length === 0 ? (
        <div className="p-12 text-center rounded-3xl bg-stone-900/60 border border-dashed border-stone-800 text-stone-400">
          <p className="text-sm font-bold text-stone-300">No menu products match your filters</p>
          <button
            onClick={() => {
              setSearchQuery("");
              setSelectedCategory("all");
              setSelectedStockStatus("all");
            }}
            className="mt-3 px-4 py-2 rounded-xl bg-red-600 text-white text-xs font-bold"
          >
            Clear Filters
          </button>
        </div>
      ) : viewMode === "table" ? (
        /* TABLE VIEW */
        <div className="rounded-3xl bg-stone-900 border border-stone-800 overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-stone-300">
              <thead className="text-[11px] uppercase tracking-wider text-stone-400 border-b border-stone-800 bg-stone-950/40">
                <tr>
                  <th className="py-3.5 px-4 font-bold">Product</th>
                  <th className="py-3.5 px-4 font-bold">Category</th>
                  <th className="py-3.5 px-4 font-bold">Base Price</th>
                  <th className="py-3.5 px-4 font-bold">Tags</th>
                  <th className="py-3.5 px-4 font-bold">Stock Status</th>
                  <th className="py-3.5 px-4 font-bold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-800/60">
                {filteredProducts.map((product) => {
                  const isInStock = product.inStock !== false;

                  return (
                    <tr key={product.id} className="hover:bg-stone-850/50 transition-colors">
                      {/* Product Image & Name */}
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl overflow-hidden bg-stone-800 border border-stone-700 shrink-0 flex items-center justify-center">
                            {product.image ? (
                              <img
                                src={product.image}
                                alt={product.name}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <span className="text-base">🍕</span>
                            )}
                          </div>
                          <div>
                            <div className="font-extrabold text-white text-sm">
                              {product.name}
                            </div>
                            {product.description && (
                              <div className="text-[11px] text-stone-400 line-clamp-1 max-w-xs">
                                {product.description}
                              </div>
                            )}
                          </div>
                        </div>
                      </td>

                      {/* Category & Subcategory */}
                      <td className="py-3 px-4">
                        <span className="font-bold text-stone-200 block">
                          {product.categoryName}
                        </span>
                        <span className="text-[10px] text-stone-500">
                          {product.subCategoryName}
                        </span>
                      </td>

                      {/* Price & Price Note */}
                      <td className="py-3 px-4 font-black text-white whitespace-nowrap">
                        {formatPrice(product.price)}
                        {product.priceNote && (
                          <span className="block text-[10px] text-stone-400 font-normal">
                            {product.priceNote}
                          </span>
                        )}
                      </td>

                      {/* Tags */}
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          {product.isPopular && (
                            <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[10px] font-bold">
                              Popular
                            </span>
                          )}
                          {product.isSpicy && (
                            <span className="px-2 py-0.5 rounded-full bg-red-600/20 text-red-400 text-[10px] font-bold">
                              Spicy
                            </span>
                          )}
                          {!product.isPopular && !product.isSpicy && (
                            <span className="text-[10px] text-stone-500">—</span>
                          )}
                        </div>
                      </td>

                      {/* Live 1-Click Stock Toggle */}
                      <td className="py-3 px-4">
                        <button
                          onClick={() => toggleProductStock(product.id)}
                          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold transition-all ${
                            isInStock
                              ? "bg-green-500/20 text-green-300 border border-green-500/30 hover:bg-green-500/30"
                              : "bg-stone-800 text-stone-500 border border-stone-700 hover:text-stone-300"
                          }`}
                          title="Click to toggle In-Stock / Out-of-Stock"
                        >
                          <span
                            className={`w-2 h-2 rounded-full ${
                              isInStock ? "bg-green-400 animate-pulse" : "bg-stone-500"
                            }`}
                          />
                          <span>{isInStock ? "In Stock" : "Out of Stock"}</span>
                        </button>
                      </td>

                      {/* Actions */}
                      <td className="py-3 px-4 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => handleOpenEdit(product)}
                            className="p-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white transition-colors"
                            title="Edit Product"
                          >
                            <Edit className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => setProductToDelete(product)}
                            className="p-1.5 rounded-lg bg-stone-800 hover:bg-red-600/30 text-stone-400 hover:text-red-400 transition-colors"
                            title="Delete Product"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* CARD GRID VIEW */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => {
            const isInStock = product.inStock !== false;

            return (
              <div
                key={product.id}
                className="rounded-3xl bg-stone-900 border border-stone-800 overflow-hidden shadow-xl flex flex-col justify-between hover:border-red-500/40 transition-all group"
              >
                <div>
                  {/* Image header */}
                  <div className="relative aspect-16/10 bg-stone-950 overflow-hidden">
                    {product.image ? (
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-4xl">
                        🍕
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-transparent to-transparent" />

                    {/* Top Badges */}
                    <div className="absolute top-3 right-3 flex items-center gap-1.5">
                      {product.isPopular && (
                        <span className="px-2 py-0.5 rounded-full bg-amber-500 text-stone-950 text-[10px] font-black uppercase shadow-md">
                          Popular
                        </span>
                      )}
                      {product.isSpicy && (
                        <span className="px-2 py-0.5 rounded-full bg-red-600 text-white text-[10px] font-black uppercase shadow-md flex items-center gap-0.5">
                          <Flame className="w-3 h-3" />
                          Spicy
                        </span>
                      )}
                    </div>

                    <div className="absolute bottom-2 left-3">
                      <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest bg-stone-950/80 px-2 py-0.5 rounded">
                        {product.categoryName}
                      </span>
                    </div>
                  </div>

                  {/* Body Details */}
                  <div className="p-5 space-y-2">
                    <h4 className="text-sm font-black text-white group-hover:text-red-400 transition-colors line-clamp-1">
                      {product.name}
                    </h4>
                    {product.description && (
                      <p className="text-xs text-stone-400 line-clamp-2 leading-relaxed">
                        {product.description}
                      </p>
                    )}
                  </div>
                </div>

                {/* Card Footer */}
                <div className="p-5 pt-0 space-y-3">
                  <div className="flex items-baseline justify-between border-t border-stone-800/80 pt-3">
                    <div>
                      <span className="text-base font-black text-white">
                        {formatPrice(product.price)}
                      </span>
                      {product.priceNote && (
                        <span className="block text-[10px] text-stone-400">
                          {product.priceNote}
                        </span>
                      )}
                    </div>

                    {/* Stock Switch */}
                    <button
                      onClick={() => toggleProductStock(product.id)}
                      className={`px-2.5 py-1 rounded-full text-[11px] font-bold border transition-all ${
                        isInStock
                          ? "bg-green-500/20 text-green-300 border-green-500/30"
                          : "bg-stone-800 text-stone-500 border-stone-700"
                      }`}
                    >
                      {isInStock ? "In Stock" : "Out of Stock"}
                    </button>
                  </div>

                  {/* Actions */}
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => handleOpenEdit(product)}
                      className="py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <Edit className="w-3.5 h-3.5" />
                      <span>Edit</span>
                    </button>
                    <button
                      onClick={() => setProductToDelete(product)}
                      className="py-2 rounded-xl bg-stone-800 hover:bg-red-600/20 text-stone-400 hover:text-red-400 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Add / Edit Product Modal */}
      <ProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        productToEdit={productToEdit}
      />

      {/* Delete Confirmation Modal */}
      {productToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs">
          <div className="w-full max-w-sm rounded-3xl bg-stone-900 border border-stone-800 p-6 text-white shadow-2xl space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="w-12 h-12 rounded-full bg-red-600/20 text-red-500 flex items-center justify-center mx-auto">
              <Trash2 className="w-6 h-6" />
            </div>

            <div className="text-center space-y-1">
              <h3 className="text-base font-bold text-white">Delete "{productToDelete.name}"?</h3>
              <p className="text-xs text-stone-400">
                This item will be permanently removed from POS and the customer menu.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                type="button"
                onClick={() => setProductToDelete(null)}
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
