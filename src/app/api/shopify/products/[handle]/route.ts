import { NextResponse, type NextRequest } from "next/server";
import { shopifyFetch, QUERY_PRODUCT_BY_HANDLE } from "@/lib/shopify";
import type { ProductNodeDetail } from "@/types/shopify";

export async function GET(_req: NextRequest, ctx: unknown) {
  const { handle } = (ctx as { params: { handle: string } }).params;

  try {
    const data = await shopifyFetch<{ product: ProductNodeDetail }>(
      QUERY_PRODUCT_BY_HANDLE,
      { handle }
    );
    return NextResponse.json(data);
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : "Unexpected error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
