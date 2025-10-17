import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { createCart, getCart } from "@/lib/shopify-cart";
import type { Cart } from "@/types/shopify-cart";

const COOKIE_NAME = "cartId";
const COOKIE_OPTS = { httpOnly: true as const, sameSite: "lax" as const, path: "/" };

export async function GET() {
  try {
    const jar = await cookies();
    const existing = jar.get(COOKIE_NAME)?.value;

    let cart: Cart;
    if (existing) {
      cart = await getCart(existing);
    } else {
      cart = await createCart();
      jar.set(COOKIE_NAME, cart.id, COOKIE_OPTS);
    }
    return NextResponse.json(cart);
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : "Unexpected error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
