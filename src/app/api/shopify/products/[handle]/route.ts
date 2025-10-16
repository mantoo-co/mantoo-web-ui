import { NextResponse } from "next/server";
import { shopifyFetch, QUERY_PRODUCT_BY_HANDLE } from "@/lib/shopify";

type Params = { params: { handle: string } };

export async function GET(_req: Request, { params }: Params) {
  try {
    const data = await shopifyFetch(QUERY_PRODUCT_BY_HANDLE, { handle: params.handle });
    return NextResponse.json(data);
  } catch (e: unknown) {
    return NextResponse.json({ error: (e as Error).message }, { status: 500 });
  }
}
