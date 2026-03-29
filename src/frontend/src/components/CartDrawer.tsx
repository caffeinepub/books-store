import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCart } from "../context/CartContext";

interface CartDrawerProps {
  onCheckout?: () => void;
}

export function CartDrawer({ onCheckout }: CartDrawerProps) {
  const {
    items,
    isOpen,
    closeCart,
    removeFromCart,
    updateQty,
    totalPrice,
    clearCart,
  } = useCart();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm"
            onClick={closeCart}
          />
          {/* Drawer */}
          <motion.div
            key="drawer"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-sm bg-card shadow-2xl flex flex-col"
            data-ocid="cart.panel"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-border/60">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-primary" />
                <h2 className="font-serif font-bold text-lg text-foreground">
                  Your Cart
                </h2>
                {items.length > 0 && (
                  <span className="text-xs text-muted-foreground">
                    ({items.length} item{items.length !== 1 ? "s" : ""})
                  </span>
                )}
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={closeCart}
                aria-label="Close cart"
                data-ocid="cart.close_button"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            {/* Items */}
            {items.length === 0 ? (
              <div
                className="flex-1 flex flex-col items-center justify-center gap-3 text-center px-8"
                data-ocid="cart.empty_state"
              >
                <ShoppingBag className="w-14 h-14 text-border" />
                <p className="font-serif text-lg font-semibold text-foreground">
                  Your cart is empty
                </p>
                <p className="text-sm text-muted-foreground">
                  Add some books to get started!
                </p>
                <Button variant="outline" className="mt-2" onClick={closeCart}>
                  Continue Shopping
                </Button>
              </div>
            ) : (
              <>
                <ScrollArea className="flex-1 px-4 py-3">
                  <div className="flex flex-col gap-4">
                    {items.map((entry, i) => (
                      <div
                        key={entry.book.id}
                        className="flex gap-3"
                        data-ocid={`cart.item.${i + 1}`}
                      >
                        <div className="w-14 h-20 rounded-lg overflow-hidden bg-secondary/60 shrink-0">
                          <img
                            src={entry.book.cover}
                            alt={entry.book.title}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              (e.target as HTMLImageElement).style.display =
                                "none";
                            }}
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-serif font-semibold text-sm text-foreground line-clamp-2 leading-snug">
                            {entry.book.title}
                          </h4>
                          <p className="text-xs text-muted-foreground mt-0.5">
                            {entry.book.author}
                          </p>
                          <p className="text-sm font-semibold text-foreground mt-1">
                            ${(entry.book.price * entry.quantity).toFixed(2)}
                          </p>
                          <div className="flex items-center gap-2 mt-2">
                            <Button
                              variant="outline"
                              size="icon"
                              className="w-6 h-6 rounded-md"
                              onClick={() =>
                                updateQty(entry.book.id, entry.quantity - 1)
                              }
                              aria-label="Decrease quantity"
                            >
                              <Minus className="w-3 h-3" />
                            </Button>
                            <span className="text-sm w-4 text-center">
                              {entry.quantity}
                            </span>
                            <Button
                              variant="outline"
                              size="icon"
                              className="w-6 h-6 rounded-md"
                              onClick={() =>
                                updateQty(entry.book.id, entry.quantity + 1)
                              }
                              aria-label="Increase quantity"
                            >
                              <Plus className="w-3 h-3" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="w-6 h-6 rounded-md ml-auto text-destructive hover:text-destructive"
                              onClick={() => removeFromCart(entry.book.id)}
                              aria-label="Remove item"
                              data-ocid={`cart.delete_button.${i + 1}`}
                            >
                              <Trash2 className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>

                {/* Footer */}
                <div className="px-5 py-4 border-t border-border/60">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm text-muted-foreground">
                      Subtotal
                    </span>
                    <span className="font-semibold text-foreground">
                      ${totalPrice.toFixed(2)}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mb-4">
                    Shipping calculated at checkout
                  </p>
                  <Button
                    className="w-full rounded-xl mb-2"
                    size="lg"
                    onClick={() => {
                      closeCart();
                      onCheckout?.();
                    }}
                    data-ocid="cart.primary_button"
                  >
                    Proceed to Checkout
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full rounded-xl text-sm"
                    onClick={clearCart}
                    data-ocid="cart.secondary_button"
                  >
                    Clear Cart
                  </Button>
                </div>
              </>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
