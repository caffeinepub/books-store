import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import {
  ChevronRight,
  ClipboardList,
  Edit3,
  Loader2,
  LogIn,
  LogOut,
  MapPin,
  Package,
  Save,
  User,
  X,
} from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import type { Order } from "../backend";
import { useActor } from "../hooks/useActor";
import { useInternetIdentity } from "../hooks/useInternetIdentity";

const STATUS_COLORS: Record<string, string> = {
  pending: "bg-amber-100 text-amber-700",
  processing: "bg-blue-100 text-blue-700",
  shipped: "bg-purple-100 text-purple-700",
  delivered: "bg-green-100 text-green-700",
};

function formatDate(nanoseconds: bigint) {
  const ms = Number(nanoseconds / BigInt(1_000_000));
  return new Date(ms).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

interface AccountPageProps {
  onStartShopping: () => void;
}

export function AccountPage({ onStartShopping }: AccountPageProps) {
  const { identity, login, clear, isLoggingIn } = useInternetIdentity();
  const { actor, isFetching: actorLoading } = useActor();
  const isAuthenticated = !!identity;

  const [profileName, setProfileName] = useState("");
  const [editingName, setEditingName] = useState(false);
  const [savingProfile, setSavingProfile] = useState(false);
  const [loadingProfile, setLoadingProfile] = useState(false);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  useEffect(() => {
    if (!actor || !isAuthenticated || actorLoading) return;

    const loadData = async () => {
      setLoadingProfile(true);
      setLoadingOrders(true);
      try {
        const [profile, orderList] = await Promise.all([
          actor.getCallerUserProfile(),
          actor.getMyOrders(),
        ]);
        if (profile) setProfileName(profile.name);
        setOrders(orderList);
      } catch {
        toast.error("Failed to load account data.");
      } finally {
        setLoadingProfile(false);
        setLoadingOrders(false);
      }
    };

    loadData();
  }, [actor, isAuthenticated, actorLoading]);

  const handleSaveProfile = async () => {
    if (!actor) return;
    setSavingProfile(true);
    try {
      await actor.saveCallerUserProfile({ name: profileName });
      setEditingName(false);
      toast.success("Profile updated!");
    } catch {
      toast.error("Failed to save profile.");
    } finally {
      setSavingProfile(false);
    }
  };

  const principal = identity?.getPrincipal().toString();

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-[1200px] mx-auto px-4 sm:px-6 py-8"
      data-ocid="account.page"
    >
      <h1 className="font-serif text-3xl font-bold text-foreground mb-2">
        My Account
      </h1>
      <p className="text-muted-foreground mb-8">
        {isAuthenticated
          ? "Manage your profile and view order history."
          : "Sign in to access your account."}
      </p>

      {!isAuthenticated && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="max-w-sm mx-auto text-center py-16"
          data-ocid="account.login.panel"
        >
          <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <User className="w-10 h-10 text-primary" />
          </div>
          <h2 className="font-serif text-xl font-semibold text-foreground mb-2">
            Welcome Back
          </h2>
          <p className="text-sm text-muted-foreground mb-6">
            Sign in to view your orders, manage your profile, and more.
          </p>
          <Button
            className="rounded-full px-8 bg-primary text-primary-foreground hover:bg-primary/90"
            onClick={login}
            disabled={isLoggingIn}
            data-ocid="account.sign_in.button"
          >
            {isLoggingIn ? (
              <Loader2 className="w-4 h-4 animate-spin mr-2" />
            ) : (
              <LogIn className="w-4 h-4 mr-2" />
            )}
            {isLoggingIn ? "Signing In..." : "Sign In"}
          </Button>
        </motion.div>
      )}

      {isAuthenticated && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="space-y-5">
            <Card data-ocid="account.profile.card">
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <User className="w-4 h-4 text-primary" />
                  Profile
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {loadingProfile ? (
                  <div
                    className="space-y-2"
                    data-ocid="account.profile.loading_state"
                  >
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-9 w-full" />
                  </div>
                ) : (
                  <div>
                    <Label htmlFor="displayName">Display Name</Label>
                    <div className="flex items-center gap-2 mt-1.5">
                      {editingName ? (
                        <>
                          <Input
                            id="displayName"
                            value={profileName}
                            onChange={(e) => setProfileName(e.target.value)}
                            placeholder="Your name"
                            className="flex-1"
                            data-ocid="account.name.input"
                            onKeyDown={(e) => {
                              if (e.key === "Enter") handleSaveProfile();
                              if (e.key === "Escape") setEditingName(false);
                            }}
                          />
                          <Button
                            size="icon"
                            variant="ghost"
                            className="w-8 h-8"
                            onClick={() => setEditingName(false)}
                            data-ocid="account.name.cancel_button"
                          >
                            <X className="w-4 h-4" />
                          </Button>
                          <Button
                            size="icon"
                            className="w-8 h-8"
                            onClick={handleSaveProfile}
                            disabled={savingProfile}
                            data-ocid="account.name.save_button"
                          >
                            {savingProfile ? (
                              <Loader2 className="w-3.5 h-3.5 animate-spin" />
                            ) : (
                              <Save className="w-3.5 h-3.5" />
                            )}
                          </Button>
                        </>
                      ) : (
                        <>
                          <p className="flex-1 text-sm text-foreground">
                            {profileName || (
                              <span className="text-muted-foreground italic">
                                No name set
                              </span>
                            )}
                          </p>
                          <Button
                            size="icon"
                            variant="ghost"
                            className="w-8 h-8"
                            onClick={() => setEditingName(true)}
                            data-ocid="account.name.edit_button"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                )}

                <Separator />

                <div>
                  <Label className="text-xs text-muted-foreground uppercase tracking-wider">
                    Principal ID
                  </Label>
                  <p className="text-xs font-mono text-muted-foreground mt-1 break-all leading-relaxed">
                    {principal}
                  </p>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  className="w-full rounded-full text-destructive border-destructive/30 hover:bg-destructive/5"
                  onClick={clear}
                  data-ocid="account.sign_out.button"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-2">
            {selectedOrder ? (
              <motion.div
                initial={{ opacity: 0, x: 8 }}
                animate={{ opacity: 1, x: 0 }}
                data-ocid="account.order.panel"
              >
                <button
                  type="button"
                  onClick={() => setSelectedOrder(null)}
                  className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4"
                  data-ocid="account.order.cancel_button"
                >
                  <ChevronRight className="w-4 h-4 rotate-180" />
                  Back to Orders
                </button>
                <Card>
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-base font-mono">
                          Order #{selectedOrder.orderId.toString()}
                        </CardTitle>
                        <p className="text-sm text-muted-foreground mt-0.5">
                          {formatDate(selectedOrder.placedAt)}
                        </p>
                      </div>
                      <Badge
                        className={`capitalize ${
                          STATUS_COLORS[
                            selectedOrder.status as unknown as string
                          ] || "bg-muted text-muted-foreground"
                        }`}
                      >
                        {selectedOrder.status as unknown as string}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">
                        Items
                      </p>
                      <div className="space-y-2">
                        {selectedOrder.items.map((item) => (
                          <div
                            key={item.bookId.toString()}
                            className="flex justify-between text-sm bg-muted/40 rounded-lg px-3 py-2"
                          >
                            <span className="text-muted-foreground">
                              Book #{item.bookId.toString()} &times;{" "}
                              {item.quantity.toString()}
                            </span>
                            <span className="font-medium">
                              ${item.priceAtPurchase.toFixed(2)}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <Separator />
                    <div className="flex justify-between">
                      <span className="font-semibold">Total</span>
                      <span className="text-lg font-bold text-primary">
                        ${selectedOrder.totalAmount.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex items-start gap-2 text-sm text-muted-foreground bg-muted/40 rounded-lg px-3 py-2">
                      <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-primary" />
                      <span>{selectedOrder.shippingAddress}</span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ) : (
              <div data-ocid="account.orders.panel">
                <h2 className="font-serif text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                  <ClipboardList className="w-5 h-5 text-primary" />
                  Order History
                </h2>

                {loadingOrders ? (
                  <div
                    className="space-y-3"
                    data-ocid="account.orders.loading_state"
                  >
                    {[1, 2, 3].map((n) => (
                      <Card key={n}>
                        <CardContent className="p-4 space-y-2">
                          <Skeleton className="h-4 w-32" />
                          <Skeleton className="h-4 w-48" />
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : orders.length === 0 ? (
                  <div
                    className="text-center py-16"
                    data-ocid="account.orders.empty_state"
                  >
                    <Package className="w-14 h-14 text-muted-foreground/30 mx-auto mb-3" />
                    <p className="text-muted-foreground mb-4">No orders yet.</p>
                    <Button
                      className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
                      onClick={onStartShopping}
                      data-ocid="account.shop.button"
                    >
                      Start Shopping
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {orders.map((order, i) => (
                      <Card
                        key={order.orderId.toString()}
                        data-ocid={`account.orders.item.${i + 1}`}
                        className="cursor-pointer transition-shadow hover:shadow-card-hover"
                        onClick={() => setSelectedOrder(order)}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between">
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 flex-wrap">
                                <p className="text-sm font-semibold font-mono text-foreground">
                                  #{order.orderId.toString()}
                                </p>
                                <Badge
                                  className={`text-xs capitalize ${
                                    STATUS_COLORS[
                                      order.status as unknown as string
                                    ] || "bg-muted text-muted-foreground"
                                  }`}
                                >
                                  {order.status as unknown as string}
                                </Badge>
                              </div>
                              <p className="text-xs text-muted-foreground mt-0.5">
                                {formatDate(order.placedAt)} &middot;{" "}
                                {order.items.length}{" "}
                                {order.items.length === 1 ? "item" : "items"}
                              </p>
                            </div>
                            <div className="flex items-center gap-2 ml-3">
                              <span className="font-semibold text-foreground">
                                ${order.totalAmount.toFixed(2)}
                              </span>
                              <ChevronRight className="w-4 h-4 text-muted-foreground" />
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </motion.div>
  );
}
