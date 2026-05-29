"use client";

import { CartItem } from "@/types/cart";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface CartStoreState {
  items: CartItem[];
  isOpen: boolean;

  // selectors
  count: () => number;
  subtotal: () => number;
  isInCart: (productId: string) => boolean;

  // mutations
  addItem: (item: CartItem) => boolean;
  removeItem: (productId: string) => void;
  clearCart: () => void;

  // ui state
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
}

/**
 * Cart store global, persistent di localStorage.
 *
 * `isOpen` (UI state) tidak ikut di-persist supaya drawer tidak terbuka
 * sendiri saat reload halaman.
 */
export const useCartStore = create<CartStoreState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      count: () => get().items.length,
      subtotal: () =>
        get().items.reduce((total, item) => total + item.price, 0),
      isInCart: (productId) =>
        get().items.some((item) => item.productId === productId),

      addItem: (item) => {
        if (get().isInCart(item.productId)) {
          return false;
        }
        set((state) => ({ items: [...state.items, item] }));
        return true;
      },

      removeItem: (productId) =>
        set((state) => ({
          items: state.items.filter((item) => item.productId !== productId),
        })),

      clearCart: () => set({ items: [] }),

      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
    }),
    {
      name: "selvo-cart",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ items: state.items }),
      version: 1,
    },
  ),
);
