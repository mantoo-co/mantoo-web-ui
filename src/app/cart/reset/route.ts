import { NextResponse, type NextRequest } from "next/server";
import { cookies } from "next/headers";
import { createCart } from "@/lib/shopify-cart";

const COOKIE = "cartId";
const COOKIE_OPTS = { httpOnly: true as const, sameSite: "lax" as const, path: "/", secure: true as const };

export async function GET(req: NextRequest) {
  const jar = await cookies();

  // borra el cart anterior (si existe) y crea uno nuevo
  jar.delete(COOKIE);
  const cart = await createCart();
  jar.set(COOKIE, cart.id, COOKIE_OPTS);

  // redirige a donde quieras después del reset
  const url = new URL("/", req.url); // o "/productos"
  return NextResponse.redirect(url);
}
