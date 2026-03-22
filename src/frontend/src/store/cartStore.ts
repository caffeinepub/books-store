import { create } from "zustand";
import type { SampleBook } from "../data/books";

export interface CartItem {
  book: SampleBook;
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  isOpen: boolean;
  addItem: (book: SampleBook) => void;
  removeItem: (bookId: number) => void;
  updateQuantity: (bookId: number, quantity: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  totalItems: () => number;
  totalPrice: () => number;
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  isOpen: false,
  addItem: (book: SampleBook) => {
    set((state) => {
      const existing = state.items.find((i) => i.book.id === book.id);
      if (existing) {
        return {
          items: state.items.map((i) =>
            i.book.id === book.id ? { ...i, quantity: i.quantity + 1 } : i,
          ),
        };
      }
      return { items: [...state.items, { book, quantity: 1 }] };
    });
  },
  removeItem: (bookId: number) =>
    set((state) => ({
      items: state.items.filter((i) => i.book.id !== bookId),
    })),
  updateQuantity: (bookId: number, quantity: number) => {
    if (quantity <= 0) {
      get().removeItem(bookId);
      return;
    }
    set((state) => ({
      items: state.items.map((i) =>
        i.book.id === bookId ? { ...i, quantity } : i,
      ),
    }));
  },
  clearCart: () => set({ items: [] }),
  openCart: () => set({ isOpen: true }),
  closeCart: () => set({ isOpen: false }),
  toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
  totalItems: () => get().items.reduce((sum, i) => sum + i.quantity, 0),
  totalPrice: () =>
    get().items.reduce((sum, i) => sum + i.book.price * i.quantity, 0),
}));
