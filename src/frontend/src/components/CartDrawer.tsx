import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCartStore } from "../store/cartStore";

export function CartDrawer() {
  const {
    isOpen,
    closeCart,
    items,
    removeItem,
    updateQuantity,
    totalPrice,
    clearCart,
  } = useCartStore();
  const total = totalPrice();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm"
            onClick={closeCart}
          />
          <motion.div
            data-ocid="cart.panel"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 300 }}
            className="fixed right-0 top-0 h-full w-full sm:w-[400px] z-50 bg-card shadow-2xl flex flex-col"
          >
            <div className="flex items-center justify-between p-5 border-b border-border">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-primary" />
                <h2 className="font-serif text-lg font-semibold text-foreground">
                  Shopping Cart
                </h2>
                {items.length > 0 && (
                  <span className="text-xs text-muted-foreground">
                    ({items.length} {items.length === 1 ? "item" : "items"})
                  </span>
                )}
              </div>
              <Button
                data-ocid="cart.close_button"
                variant="ghost"
                size="icon"
                className="rounded-full w-8 h-8"
                onClick={closeCart}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
            {items.length === 0 ? (
              <div
                data-ocid="cart.empty_state"
                className="flex-1 flex flex-col items-center justify-center gap-3 text-center px-6"
              >
                <ShoppingBag className="w-14 h-14 text-muted-foreground/30" />
                <p className="font-serif text-lg text-muted-foreground">
                  Your cart is empty
                </p>
                <p className="text-sm text-muted-foreground">
                  Browse our collection and add some books!
                </p>
                <Button
                  onClick={closeCart}
                  className="rounded-full mt-2 bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  Continue Shopping
                </Button>
              </div>
            ) : (
              <>
                <ScrollArea className="flex-1">
                  <div className="p-4 space-y-3">
                    {items.map((item, i) => (
                      <div
                        key={item.book.id}
                        data-ocid={`cart.item.${i + 1}`}
                        className="flex gap-3 bg-background rounded-xl p-3"
                      >
                        <img
                          src={item.book.coverImage}
                          alt={item.book.title}
                          className="w-14 h-20 object-cover rounded-lg flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-foreground leading-snug line-clamp-2 mb-0.5">
                            {item.book.title}
                          </p>
                          <p className="text-xs text-muted-foreground mb-2">
                            {item.book.author}
                          </p>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="icon"
                              className="w-6 h-6 rounded-full p-0"
                              onClick={() =>
                                updateQuantity(item.book.id, item.quantity - 1)
                              }
                            >
                              <Minus className="w-3 h-3" />
                            </Button>
                            <span className="text-sm font-medium w-5 text-center">
                              {item.quantity}
                            </span>
                            <Button
                              variant="outline"
                              size="icon"
                              className="w-6 h-6 rounded-full p-0"
                              onClick={() =>
                                updateQuantity(item.book.id, item.quantity + 1)
                              }
                            >
                              <Plus className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                        <div className="flex flex-col items-end justify-between">
                          <button
                            type="button"
                            data-ocid={`cart.item.${i + 1}.delete_button`}
                            onClick={() => removeItem(item.book.id)}
                            className="text-muted-foreground hover:text-destructive transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                          <p className="text-sm font-semibold text-foreground">
                            ${(item.book.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
                <div className="p-5 border-t border-border space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      Subtotal
                    </span>
                    <span className="font-semibold text-foreground">
                      ${total.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      Shipping
                    </span>
                    <span className="text-sm text-green-600 font-medium">
                      Free
                    </span>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-foreground">Total</span>
                    <span className="text-lg font-bold text-primary">
                      ${total.toFixed(2)}
                    </span>
                  </div>
                  <Button
                    data-ocid="cart.primary_button"
                    className="w-full rounded-full py-5 bg-primary text-primary-foreground hover:bg-primary/90 font-medium"
                    onClick={closeCart}
                  >
                    Continue Shopping
                  </Button>
                  <Button
                    data-ocid="cart.delete_button"
                    variant="ghost"
                    size="sm"
                    className="w-full text-xs text-muted-foreground hover:text-destructive"
                    onClick={clearCart}
                  >
                    Clear cart
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
