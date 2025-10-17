"use client";
import { useCart } from "@/hooks/useCart";

export function AddToCartButton({ variantId }: { variantId: string }) {
  const { add } = useCart();
  return (
    <button
      className="btn btn-primary"
      onClick={() => add([{ merchandiseId: variantId, quantity: 1 }])}
    >
      Agregar al carrito
    </button>
  );
}
