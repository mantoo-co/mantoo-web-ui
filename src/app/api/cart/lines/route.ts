import { cookies } from "next/headers";
import { NextResponse, type NextRequest } from "next/server";
import { addLines, updateLines, removeLines, getCart, createCart } from "@/lib/shopify-cart";
import type { AddLineInput, UpdateLineInput } from "@/types/shopify-cart";

const COOKIE_NAME = "cartId";
const COOKIE_OPTS = { httpOnly: true as const, sameSite: "lax" as const, path: "/" };

async function requireCartId() {
  const jar = await cookies();
  const cartId = jar.get(COOKIE_NAME)?.value;
  if (cartId) return cartId;
  const cart = await createCart();
  jar.set(COOKIE_NAME, cart.id, COOKIE_OPTS);
  return cart.id;
}

export async function POST(req: NextRequest) {
  try {
    const cartId = await requireCartId();
    const body = (await req.json()) as { lines: AddLineInput[] };
    try {
      const cart = await addLines(cartId, body.lines);
      return NextResponse.json(cart);
    } catch (e) {
      if (!/cart.*(not found|does not exist|completed|locked)/i.test(String(e))) throw e;
      const jar = await cookies();
      const newCart = await createCart();
      jar.set(COOKIE_NAME, newCart.id, COOKIE_OPTS);
      const retried = await addLines(newCart.id, body.lines);
      return NextResponse.json(retried);
    }
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : "Unexpected error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const cartId = await requireCartId();
    const body = (await req.json()) as { lines: UpdateLineInput[] };
    const cart = await updateLines(cartId, body.lines);
    return NextResponse.json(cart);
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : "Unexpected error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const cartId = await requireCartId();
    const body = (await req.json()) as { lineIds: string[] };
    const cart = await removeLines(cartId, body.lineIds);
    return NextResponse.json(cart);
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : "Unexpected error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
