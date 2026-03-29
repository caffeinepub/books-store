import { type ReactNode, createContext, useContext, useState } from "react";
import type { MockBook } from "../data/mockBooks";

export interface CartEntry {
  book: MockBook;
  quantity: number;
}

interface CartContextValue {
  items: CartEntry[];
  isOpen: boolean;
  addToCart: (book: MockBook) => void;
  removeFromCart: (bookId: number) => void;
  updateQty: (bookId: number, qty: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartEntry[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const addToCart = (book: MockBook) => {
    setItems((prev) => {
      const existing = prev.find((e) => e.book.id === book.id);
      if (existing) {
        return prev.map((e) =>
          e.book.id === book.id ? { ...e, quantity: e.quantity + 1 } : e,
        );
      }
      return [...prev, { book, quantity: 1 }];
    });
    setIsOpen(true);
  };

  const removeFromCart = (bookId: number) => {
    setItems((prev) => prev.filter((e) => e.book.id !== bookId));
  };

  const updateQty = (bookId: number, qty: number) => {
    if (qty <= 0) {
      removeFromCart(bookId);
      return;
    }
    setItems((prev) =>
      prev.map((e) => (e.book.id === bookId ? { ...e, quantity: qty } : e)),
    );
  };

  const clearCart = () => setItems([]);

  const totalItems = items.reduce((sum, e) => sum + e.quantity, 0);
  const totalPrice = items.reduce(
    (sum, e) => sum + e.book.price * e.quantity,
    0,
  );

  return (
    <CartContext.Provider
      value={{
        items,
        isOpen,
        addToCart,
        removeFromCart,
        updateQty,
        clearCart,
        openCart: () => setIsOpen(true),
        closeCart: () => setIsOpen(false),
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
