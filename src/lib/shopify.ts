import type { ProductNode, ProductEdge, ProductsConnection } from "@/types/shopify";

const DOMAIN = process.env.SHOPIFY_STORE_DOMAIN!;
const VERSION = process.env.SHOPIFY_API_VERSION || "2024-07";
const ACCESS_TOKEN = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN!;

if (!DOMAIN || !ACCESS_TOKEN) {
  throw new Error("Faltan envs de Shopify. Revisa .env.local");
}

const ENDPOINT = `https://${DOMAIN}/api/${VERSION}/graphql.json`;

export async function shopifyFetch<T = unknown>(query: string, variables?: Record<string, unknown>) {
  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": ACCESS_TOKEN,
    },
    body: JSON.stringify({ query, variables }),
    // Ajusta cache según tu caso; revalidate si quieres ISR
    next: { revalidate: 60 }, // 60s ISR
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Shopify error ${res.status}: ${text}`);
  }

  const json = await res.json();
  if (json.errors) {
    throw new Error(`Shopify GraphQL errors: ${JSON.stringify(json.errors)}`);
  }
  return json.data as T;
}

export async function fetchAllProducts(): Promise<ProductNode[]> {
  const pageSize = 250;
  let after: string | null = null;
  const all: ProductNode[] = [];

  for (;;) {
    // data: { products: ProductsConnection }
    const data = await shopifyFetch<{ products: ProductsConnection }>(
      QUERY_PRODUCTS_PAGE,
      { first: pageSize, after }
    );

    // edges: ProductEdge[]
    const edges: ProductEdge[] = data.products.edges;

    // e: ProductEdge
    all.push(...edges.map((e: ProductEdge) => e.node));

    if (!data.products.pageInfo.hasNextPage) break;
    after = edges[edges.length - 1].cursor;
  }
  return all;
}

/* Queries de ejemplo */
export const QUERY_PRODUCTS = /* GraphQL */ `
  query Products($first: Int = 12) {
    products(first: $first) {
      edges {
        node {
          id
          handle
          title
          description
          featuredImage { url altText width height }
          priceRange { minVariantPrice { amount currencyCode } }
        }
      }
    }
  }
`;

export const QUERY_PRODUCTS_PAGE = /* GraphQL */ `
  query ProductsPage($first: Int!, $after: String) {
    products(first: $first, after: $after) {
      pageInfo { hasNextPage }
      edges {
        cursor
        node {
          id
          handle
          title
          description
          featuredImage { url altText width height }
          priceRange { minVariantPrice { amount currencyCode } }
        }
      }
    }
  }
`;

export const QUERY_PRODUCT_BY_HANDLE = /* GraphQL */ `
  query ProductByHandle($handle: String!) {
    product(handle: $handle) {
      id
      title
      descriptionHtml
      images(first: 10) {
        edges { node { url altText width height } }
      }
      variants(first: 10) {
        edges {
          node {
            id
            title
            availableForSale
            price { amount currencyCode }
            selectedOptions { name value }
          }
        }
      }
    }
  }
`;
