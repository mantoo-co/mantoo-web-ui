import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { getCart, createCart } from "@/lib/shopify-cart";

const COOKIE_NAME = "cartId";
const COOKIE_OPTS = { httpOnly: true as const, sameSite: "lax" as const, path: "/" };

export async function POST() {
  try {
    const jar = await cookies();
    let cartId = jar.get(COOKIE_NAME)?.value;
    if (!cartId) {
      const cart = await createCart();
      cartId = cart.id;
      jar.set(COOKIE_NAME, cartId, COOKIE_OPTS);
    }
    const cart = await getCart(cartId);
    return NextResponse.json({ checkoutUrl: cart.checkoutUrl });
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : "Unexpected error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
