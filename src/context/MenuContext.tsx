"use client";

import React, { createContext, useContext, useState, useEffect, useMemo } from "react";
import type { MenuCategory, MenuItem, MenuSubCategory } from "@/types";
import { MENU_CATEGORIES } from "@/lib/data";

const STORAGE_KEY_CATEGORIES = "tpk_menu_categories_v2";

export interface FlatProductItem extends MenuItem {
  categoryId: string;
  categoryName: string;
  subCategoryId: string;
  subCategoryName: string;
}

interface MenuContextType {
  categories: MenuCategory[];
  allProducts: FlatProductItem[];
  isHydrated: boolean;
  // Product Mutations
  addProduct: (
    categoryId: string,
    subCategoryId: string,
    product: Omit<MenuItem, "id">
  ) => MenuItem;
  updateProduct: (productId: string, updates: Partial<MenuItem>) => void;
  deleteProduct: (productId: string) => void;
  toggleProductStock: (productId: string) => void;
  // Category Mutations
  addCategory: (category: { name: string; icon: string; description?: string }) => MenuCategory;
  updateCategory: (categoryId: string, updates: Partial<MenuCategory>) => void;
  deleteCategory: (categoryId: string) => void;
  moveCategory: (categoryId: string, direction: "up" | "down") => void;
  reorderCategories: (startIndex: number, endIndex: number) => void;
  addSubCategory: (categoryId: string, name: string, description?: string) => void;
  deleteSubCategory: (categoryId: string, subCategoryId: string) => void;
  resetToDefaultMenu: () => void;
  // Helper
  getCategoryById: (id: string) => MenuCategory | undefined;
}

const MenuContext = createContext<MenuContextType | undefined>(undefined);

export function MenuProvider({ children }: { children: React.ReactNode }) {
  const [categories, setCategories] = useState<MenuCategory[]>(() => MENU_CATEGORIES);
  const [isHydrated, setIsHydrated] = useState(false);

  // Hydrate from localStorage in browser
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_CATEGORIES);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setCategories(parsed);
        }
      }
    } catch (e) {
      console.warn("Failed to load categories from localStorage:", e);
    } finally {
      setIsHydrated(true);
    }
  }, []);

  // Sync to localStorage
  useEffect(() => {
    if (!isHydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY_CATEGORIES, JSON.stringify(categories));
    } catch (e) {
      console.warn("Failed to save categories to localStorage:", e);
    }
  }, [categories, isHydrated]);

  // ADD PRODUCT
  const addProduct = (
    categoryId: string,
    subCategoryId: string,
    product: Omit<MenuItem, "id">
  ): MenuItem => {
    const newId = `item-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    const newProduct: MenuItem = {
      ...product,
      id: newId,
      inStock: product.inStock !== false,
      categoryId,
      subCategoryId,
    };

    setCategories((prev) =>
      prev.map((cat) => {
        if (cat.id !== categoryId) return cat;

        const subExists = cat.subCategories.some((sub) => sub.id === subCategoryId);
        if (!subExists) {
          // If no subcategory matching, add to first subcategory or create one
          if (cat.subCategories.length > 0) {
            const updatedSubs = [...cat.subCategories];
            updatedSubs[0] = {
              ...updatedSubs[0],
              items: [newProduct, ...updatedSubs[0].items],
            };
            return { ...cat, subCategories: updatedSubs };
          } else {
            return {
              ...cat,
              subCategories: [
                {
                  id: `sub-${Date.now()}`,
                  name: "General",
                  items: [newProduct],
                },
              ],
            };
          }
        }

        return {
          ...cat,
          subCategories: cat.subCategories.map((sub) =>
            sub.id === subCategoryId
              ? { ...sub, items: [newProduct, ...sub.items] }
              : sub
          ),
        };
      })
    );

    return newProduct;
  };

  // UPDATE PRODUCT
  const updateProduct = (productId: string, updates: Partial<MenuItem>) => {
    setCategories((prev) =>
      prev.map((cat) => ({
        ...cat,
        subCategories: cat.subCategories.map((sub) => ({
          ...sub,
          items: sub.items.map((item) =>
            item.id === productId ? { ...item, ...updates } : item
          ),
        })),
      }))
    );
  };

  // DELETE PRODUCT
  const deleteProduct = (productId: string) => {
    setCategories((prev) =>
      prev.map((cat) => ({
        ...cat,
        subCategories: cat.subCategories.map((sub) => ({
          ...sub,
          items: sub.items.filter((item) => item.id !== productId),
        })),
      }))
    );
  };

  // TOGGLE PRODUCT STOCK
  const toggleProductStock = (productId: string) => {
    setCategories((prev) =>
      prev.map((cat) => ({
        ...cat,
        subCategories: cat.subCategories.map((sub) => ({
          ...sub,
          items: sub.items.map((item) =>
            item.id === productId
              ? { ...item, inStock: item.inStock === false ? true : false }
              : item
          ),
        })),
      }))
    );
  };

  // ADD CATEGORY
  const addCategory = (category: { name: string; icon: string; description?: string }): MenuCategory => {
    const slug = category.name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    const newCategory: MenuCategory = {
      id: `${slug}-${Date.now()}`,
      name: category.name,
      icon: category.icon || "Utensils",
      description: category.description,
      subCategories: [
        {
          id: `sub-${slug}-main`,
          name: "Main Items",
          items: [],
        },
      ],
    };

    setCategories((prev) => [...prev, newCategory]);
    return newCategory;
  };

  // UPDATE CATEGORY
  const updateCategory = (categoryId: string, updates: Partial<MenuCategory>) => {
    setCategories((prev) =>
      prev.map((cat) => (cat.id === categoryId ? { ...cat, ...updates } : cat))
    );
  };

  // DELETE CATEGORY
  const deleteCategory = (categoryId: string) => {
    setCategories((prev) => prev.filter((cat) => cat.id !== categoryId));
  };

  // MOVE CATEGORY (UP or DOWN)
  const moveCategory = (categoryId: string, direction: "up" | "down") => {
    setCategories((prev) => {
      const index = prev.findIndex((c) => c.id === categoryId);
      if (index === -1) return prev;

      const targetIndex = direction === "up" ? index - 1 : index + 1;
      if (targetIndex < 0 || targetIndex >= prev.length) return prev;

      const next = [...prev];
      const [removed] = next.splice(index, 1);
      next.splice(targetIndex, 0, removed);
      return next;
    });
  };

  // REORDER CATEGORIES
  const reorderCategories = (startIndex: number, endIndex: number) => {
    setCategories((prev) => {
      const next = [...prev];
      const [removed] = next.splice(startIndex, 1);
      next.splice(endIndex, 0, removed);
      return next;
    });
  };

  // ADD SUBCATEGORY
  const addSubCategory = (categoryId: string, name: string, description?: string) => {
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    const newSub: MenuSubCategory = {
      id: `sub-${slug}-${Date.now()}`,
      name,
      description,
      items: [],
    };

    setCategories((prev) =>
      prev.map((cat) =>
        cat.id === categoryId
          ? { ...cat, subCategories: [...cat.subCategories, newSub] }
          : cat
      )
    );
  };

  // DELETE SUBCATEGORY
  const deleteSubCategory = (categoryId: string, subCategoryId: string) => {
    setCategories((prev) =>
      prev.map((cat) =>
        cat.id === categoryId
          ? {
              ...cat,
              subCategories: cat.subCategories.filter((sub) => sub.id !== subCategoryId),
            }
          : cat
      )
    );
  };

  // RESET TO DEFAULT
  const resetToDefaultMenu = () => {
    setCategories(MENU_CATEGORIES);
    try {
      localStorage.removeItem(STORAGE_KEY_CATEGORIES);
    } catch (e) {
      console.warn(e);
    }
  };

  // Helper
  const getCategoryById = (id: string) => categories.find((c) => c.id === id);

  // Flat product collection with category info
  const allProducts = useMemo(() => {
    const list: FlatProductItem[] = [];
    categories.forEach((cat) => {
      cat.subCategories.forEach((sub) => {
        sub.items.forEach((item) => {
          list.push({
            ...item,
            inStock: item.inStock !== false,
            categoryId: cat.id,
            categoryName: cat.name,
            subCategoryId: sub.id,
            subCategoryName: sub.name,
          });
        });
      });
    });
    return list;
  }, [categories]);

  return (
    <MenuContext.Provider
      value={{
        categories,
        allProducts,
        isHydrated,
        addProduct,
        updateProduct,
        deleteProduct,
        toggleProductStock,
        addCategory,
        updateCategory,
        deleteCategory,
        moveCategory,
        reorderCategories,
        addSubCategory,
        deleteSubCategory,
        resetToDefaultMenu,
        getCategoryById,
      }}
    >
      {children}
    </MenuContext.Provider>
  );
}

export function useMenu() {
  const context = useContext(MenuContext);
  if (!context) {
    throw new Error("useMenu must be used within a MenuProvider");
  }
  return context;
}
