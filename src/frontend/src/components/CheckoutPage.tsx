import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  CheckCircle,
  ChevronLeft,
  Loader2,
  Lock,
  Package,
  ShoppingBag,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { useActor } from "../hooks/useActor";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import { useCartStore } from "../store/cartStore";

type Step = "review" | "shipping" | "confirmation";

interface ShippingForm {
  fullName: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}

const emptyForm: ShippingForm = {
  fullName: "",
  addressLine1: "",
  addressLine2: "",
  city: "",
  state: "",
  zip: "",
  country: "",
};

interface CheckoutPageProps {
  onBack: () => void;
  onContinueShopping: () => void;
  onGoToAccount: () => void;
}

export function CheckoutPage({
  onBack,
  onContinueShopping,
  onGoToAccount,
}: CheckoutPageProps) {
  const [step, setStep] = useState<Step>("review");
  const [form, setForm] = useState<ShippingForm>(emptyForm);
  const [isPlacing, setIsPlacing] = useState(false);
  const [orderId, setOrderId] = useState<bigint | null>(null);
  const { items, totalPrice, clearCart } = useCartStore();
  const { actor } = useActor();
  const { identity, login, isLoggingIn } = useInternetIdentity();
  const isAuthenticated = !!identity;
  const total = totalPrice();

  const handleFormChange = (field: keyof ShippingForm, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const buildAddress = () =>
    [
      form.fullName,
      form.addressLine1,
      form.addressLine2,
      form.city,
      form.state,
      form.zip,
      form.country,
    ]
      .filter(Boolean)
      .join(", ");

  const isFormValid = () =>
    form.fullName &&
    form.addressLine1 &&
    form.city &&
    form.state &&
    form.zip &&
    form.country;

  const handlePlaceOrder = async () => {
    if (!actor || !isFormValid()) return;
    setIsPlacing(true);
    try {
      const address = buildAddress();
      const id = await actor.placeOrder(address);
      setOrderId(id);
      clearCart();
      setStep("confirmation");
      toast.success("Order placed successfully!");
    } catch {
      toast.error("Failed to place order. Please try again.");
    } finally {
      setIsPlacing(false);
    }
  };

  const steps = ["review", "shipping", "confirmation"];
  const stepIndex = steps.indexOf(step);
  const stepLabels = ["Cart Review", "Shipping", "Confirmation"];

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-[1200px] mx-auto px-4 sm:px-6 py-8"
      data-ocid="checkout.page"
    >
      {/* Back button */}
      {step !== "confirmation" && (
        <button
          type="button"
          onClick={step === "review" ? onBack : () => setStep("review")}
          className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
          data-ocid="checkout.cancel_button"
        >
          <ChevronLeft className="w-4 h-4" />
          {step === "review" ? "Back to Shop" : "Back to Cart"}
        </button>
      )}

      {/* Step indicator */}
      <div className="flex items-center gap-2 mb-8">
        {stepLabels.map((label, i) => (
          <div key={label} className="flex items-center gap-2">
            <div
              className={`flex items-center gap-1.5 text-sm font-medium transition-colors ${
                i === stepIndex
                  ? "text-primary"
                  : i < stepIndex
                    ? "text-primary/60"
                    : "text-muted-foreground"
              }`}
            >
              <span
                className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                  i < stepIndex
                    ? "bg-primary/20 text-primary"
                    : i === stepIndex
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                }`}
              >
                {i < stepIndex ? (
                  <CheckCircle className="w-3.5 h-3.5" />
                ) : (
                  i + 1
                )}
              </span>
              <span className="hidden sm:inline">{label}</span>
            </div>
            {i < stepLabels.length - 1 && (
              <div
                className={`h-px w-8 ${
                  i < stepIndex ? "bg-primary/40" : "bg-border"
                }`}
              />
            )}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main content */}
        <div className="lg:col-span-2 space-y-4">
          {/* STEP 1: Review */}
          {step === "review" && (
            <motion.div
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              data-ocid="checkout.review.panel"
            >
              <h1 className="font-serif text-2xl font-bold text-foreground mb-4">
                Review Your Cart
              </h1>
              {items.length === 0 ? (
                <div
                  data-ocid="checkout.empty_state"
                  className="text-center py-16"
                >
                  <ShoppingBag className="w-14 h-14 text-muted-foreground/30 mx-auto mb-3" />
                  <p className="text-muted-foreground">Your cart is empty.</p>
                  <Button
                    className="mt-4 rounded-full"
                    onClick={onContinueShopping}
                  >
                    Browse Books
                  </Button>
                </div>
              ) : (
                <div className="space-y-3">
                  {items.map((item, i) => (
                    <Card
                      key={item.book.id}
                      data-ocid={`checkout.item.${i + 1}`}
                    >
                      <CardContent className="flex gap-4 p-4">
                        <img
                          src={item.book.coverImage}
                          alt={item.book.title}
                          className="w-14 h-20 object-cover rounded-lg flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-foreground line-clamp-2">
                            {item.book.title}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {item.book.author}
                          </p>
                          <p className="text-sm text-muted-foreground mt-1">
                            Qty: {item.quantity}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-foreground">
                            ${(item.book.price * item.quantity).toFixed(2)}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            ${item.book.price.toFixed(2)} each
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}

                  {!isAuthenticated && (
                    <Card className="border-amber-200 bg-amber-50">
                      <CardContent className="flex items-start gap-3 p-4">
                        <Lock className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-sm font-medium text-amber-800">
                            Sign in to continue
                          </p>
                          <p className="text-xs text-amber-700 mt-0.5">
                            You need to be signed in to place an order.
                          </p>
                          <Button
                            size="sm"
                            className="mt-3 rounded-full bg-amber-600 hover:bg-amber-700 text-white"
                            onClick={login}
                            disabled={isLoggingIn}
                            data-ocid="checkout.sign_in.button"
                          >
                            {isLoggingIn ? (
                              <Loader2 className="w-4 h-4 animate-spin mr-1.5" />
                            ) : null}
                            Sign In
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  <Button
                    className="w-full rounded-full py-5 bg-primary text-primary-foreground hover:bg-primary/90 font-medium mt-2"
                    disabled={!isAuthenticated || items.length === 0}
                    onClick={() => setStep("shipping")}
                    data-ocid="checkout.primary_button"
                  >
                    {!isAuthenticated
                      ? "Sign In to Checkout"
                      : "Proceed to Shipping"}
                  </Button>
                </div>
              )}
            </motion.div>
          )}

          {/* STEP 2: Shipping */}
          {step === "shipping" && (
            <motion.div
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              data-ocid="checkout.shipping.panel"
            >
              <h1 className="font-serif text-2xl font-bold text-foreground mb-4">
                Shipping Information
              </h1>
              <Card>
                <CardContent className="p-6 space-y-4">
                  <div>
                    <Label htmlFor="fullName">Full Name *</Label>
                    <Input
                      id="fullName"
                      value={form.fullName}
                      onChange={(e) =>
                        handleFormChange("fullName", e.target.value)
                      }
                      placeholder="Jane Doe"
                      className="mt-1.5"
                      data-ocid="checkout.fullname.input"
                    />
                  </div>
                  <div>
                    <Label htmlFor="addressLine1">Address Line 1 *</Label>
                    <Input
                      id="addressLine1"
                      value={form.addressLine1}
                      onChange={(e) =>
                        handleFormChange("addressLine1", e.target.value)
                      }
                      placeholder="123 Main Street"
                      className="mt-1.5"
                      data-ocid="checkout.address1.input"
                    />
                  </div>
                  <div>
                    <Label htmlFor="addressLine2">
                      Address Line 2{" "}
                      <span className="text-muted-foreground">(optional)</span>
                    </Label>
                    <Input
                      id="addressLine2"
                      value={form.addressLine2}
                      onChange={(e) =>
                        handleFormChange("addressLine2", e.target.value)
                      }
                      placeholder="Apt 4B"
                      className="mt-1.5"
                      data-ocid="checkout.address2.input"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="city">City *</Label>
                      <Input
                        id="city"
                        value={form.city}
                        onChange={(e) =>
                          handleFormChange("city", e.target.value)
                        }
                        placeholder="New York"
                        className="mt-1.5"
                        data-ocid="checkout.city.input"
                      />
                    </div>
                    <div>
                      <Label htmlFor="state">State / Province *</Label>
                      <Input
                        id="state"
                        value={form.state}
                        onChange={(e) =>
                          handleFormChange("state", e.target.value)
                        }
                        placeholder="NY"
                        className="mt-1.5"
                        data-ocid="checkout.state.input"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="zip">ZIP / Postal Code *</Label>
                      <Input
                        id="zip"
                        value={form.zip}
                        onChange={(e) =>
                          handleFormChange("zip", e.target.value)
                        }
                        placeholder="10001"
                        className="mt-1.5"
                        data-ocid="checkout.zip.input"
                      />
                    </div>
                    <div>
                      <Label htmlFor="country">Country *</Label>
                      <Input
                        id="country"
                        value={form.country}
                        onChange={(e) =>
                          handleFormChange("country", e.target.value)
                        }
                        placeholder="United States"
                        className="mt-1.5"
                        data-ocid="checkout.country.input"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Button
                className="w-full rounded-full py-5 bg-primary text-primary-foreground hover:bg-primary/90 font-medium mt-4"
                disabled={!isFormValid() || isPlacing}
                onClick={handlePlaceOrder}
                data-ocid="checkout.submit_button"
              >
                {isPlacing ? (
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                ) : (
                  <Lock className="w-4 h-4 mr-2" />
                )}
                {isPlacing ? "Placing Order..." : "Place Order"}
              </Button>
            </motion.div>
          )}

          {/* STEP 3: Confirmation */}
          {step === "confirmation" && (
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-8"
              data-ocid="checkout.confirmation.panel"
            >
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Package className="w-10 h-10 text-primary" />
              </div>
              <h1 className="font-serif text-3xl font-bold text-foreground mb-2">
                Order Confirmed!
              </h1>
              <p className="text-muted-foreground mb-2">
                Thank you for your purchase.
              </p>
              {orderId !== null && (
                <Badge
                  variant="secondary"
                  className="text-sm px-3 py-1 font-mono"
                >
                  Order #{orderId.toString()}
                </Badge>
              )}

              <div className="flex flex-col sm:flex-row gap-3 justify-center mt-8">
                <Button
                  variant="outline"
                  className="rounded-full"
                  onClick={onGoToAccount}
                  data-ocid="checkout.account.button"
                >
                  View My Orders
                </Button>
                <Button
                  className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
                  onClick={onContinueShopping}
                  data-ocid="checkout.continue.button"
                >
                  Continue Shopping
                </Button>
              </div>
            </motion.div>
          )}
        </div>

        {/* Order summary sidebar */}
        {step !== "confirmation" && (
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardContent className="p-5">
                <h2 className="font-serif text-lg font-semibold text-foreground mb-4">
                  Order Summary
                </h2>
                <div className="space-y-2 mb-4">
                  {items.map((item) => (
                    <div
                      key={item.book.id}
                      className="flex justify-between text-sm"
                    >
                      <span className="text-muted-foreground line-clamp-1 flex-1 mr-2">
                        {item.book.title}{" "}
                        <span className="text-xs">×{item.quantity}</span>
                      </span>
                      <span className="font-medium text-foreground flex-shrink-0">
                        ${(item.book.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>
                <Separator className="my-3" />
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-medium">${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm mb-3">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="text-green-600 font-medium">Free</span>
                </div>
                <Separator className="my-3" />
                <div className="flex justify-between">
                  <span className="font-semibold text-foreground">Total</span>
                  <span className="text-lg font-bold text-primary">
                    ${total.toFixed(2)}
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </motion.div>
  );
}
