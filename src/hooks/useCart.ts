"use client";
import { useCallback, useEffect, useState } from "react";
import type { Cart, AddLineInput, UpdateLineInput } from "@/types/shopify-cart";
export { useCartContext as useCart } from "@/contexts/CartContext";

/*
export function useCart() {
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const refresh = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/cart", { cache: "no-store" });
    const data = await res.json();
    setCart(data);
    setLoading(false);
  }, []);

  useEffect(() => { void refresh(); }, [refresh]);

  const add = useCallback(async (lines: AddLineInput[]) => {
    const res = await fetch("/api/cart/lines", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ lines })
    });
    const data = await res.json();
    setCart(data);
  }, []);

  const update = useCallback(async (lines: UpdateLineInput[]) => {
    const res = await fetch("/api/cart/lines", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ lines })
    });
    const data = await res.json();
    setCart(data);
  }, []);

  const remove = useCallback(async (lineIds: string[]) => {
    const res = await fetch("/api/cart/lines", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ lineIds })
    });
    const data = await res.json();
    setCart(data);
  }, []);

  const checkout = useCallback(async () => {
    const res = await fetch("/api/cart/checkout", { method: "POST" });
    const data = await res.json() as { checkoutUrl?: string; error?: string };
    if (data.checkoutUrl) window.location.href = data.checkoutUrl;
  }, []);

  return { cart, loading, refresh, add, update, remove, checkout };
}
*/