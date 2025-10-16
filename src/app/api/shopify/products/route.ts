import { NextResponse } from "next/server";
import { shopifyFetch, QUERY_PRODUCTS } from "@/lib/shopify";

export async function GET() {
  try {
    const data = await shopifyFetch(QUERY_PRODUCTS, { first: 50 });
    return NextResponse.json(data);
  } catch (e: unknown) {
    return NextResponse.json({ error: (e as Error).message }, { status: 500 });
  }
}
