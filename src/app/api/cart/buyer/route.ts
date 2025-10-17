import { cookies } from "next/headers";
import { NextResponse, type NextRequest } from "next/server";
import { CART_SET_BUYER } from "@/lib/shopify-cart";
import { shopifyFetch } from "@/lib/shopify";
import type { Cart } from "@/types/shopify-cart";

const COOKIE_NAME = "cartId";

export async function PUT(req: NextRequest) {
  try {
    const jar = await cookies();
    const cartId = jar.get(COOKIE_NAME)?.value;
    if (!cartId) return NextResponse.json({ error: "No cart" }, { status: 400 });

    const buyerIdentity = await req.json() as { countryCode?: string; email?: string; phone?: string };
    const data = await shopifyFetch<{ cartBuyerIdentityUpdate: { cart: Cart; userErrors: { message: string }[] } }>(
      CART_SET_BUYER,
      { cartId, buyerIdentity }
    );
    const errors = data.cartBuyerIdentityUpdate.userErrors;
    if (errors?.length) return NextResponse.json({ error: errors[0].message }, { status: 400 });

    return NextResponse.json(data.cartBuyerIdentityUpdate.cart);
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : "Unexpected error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
