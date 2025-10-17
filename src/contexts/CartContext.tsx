"use client";
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { Cart, AddLineInput, UpdateLineInput } from "@/types/shopify-cart";

type CartContextValue = {
  cart: Cart | null;
  loading: boolean;
  refresh: () => Promise<void>;
  add: (lines: AddLineInput[]) => Promise<void>;
  update: (lines: UpdateLineInput[]) => Promise<void>;
  remove: (lineIds: string[]) => Promise<void>;
  checkout: () => Promise<void>;
};

const CartContext = createContext<CartContextValue | undefined>(undefined);

// clave para sincronizar entre pestañas
const SYNC_KEY = "mantoo_cart_sync";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const refresh = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/cart", { cache: "no-store" });
    const data = (await res.json()) as Cart;
    setCart(data);
    setLoading(false);
  }, []);

  // carga inicial + escucha cambios de otras pestañas
  useEffect(() => {
    void refresh();
    const onStorage = (e: StorageEvent) => {
      if (e.key === SYNC_KEY) void refresh();
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, [refresh]);

  const signalOthers = () => {
    try { localStorage.setItem(SYNC_KEY, Date.now().toString()); } catch {}
  };

  const add = useCallback(async (lines: AddLineInput[]) => {
    const res = await fetch("/api/cart/lines", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ lines })
    });
    const data = (await res.json()) as Cart;
    setCart(data);
    signalOthers();
  }, []);

  const update = useCallback(async (lines: UpdateLineInput[]) => {
    const res = await fetch("/api/cart/lines", {
      method: "PUT", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ lines })
    });
    const data = (await res.json()) as Cart;
    setCart(data);
    signalOthers();
  }, []);

  const remove = useCallback(async (lineIds: string[]) => {
    const res = await fetch("/api/cart/lines", {
      method: "DELETE", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ lineIds })
    });
    const data = (await res.json()) as Cart;
    setCart(data);
    signalOthers();
  }, []);

  const checkout = useCallback(async () => {
    const res = await fetch("/api/cart/checkout", { method: "POST" });
    const data = (await res.json()) as { checkoutUrl?: string };
    if (data.checkoutUrl) window.location.href = data.checkoutUrl;
  }, []);

  const value = useMemo<CartContextValue>(() => ({
    cart, loading, refresh, add, update, remove, checkout
  }), [cart, loading, refresh, add, update, remove, checkout]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCartContext(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCartContext debe usarse dentro de <CartProvider>");
  return ctx;
}
