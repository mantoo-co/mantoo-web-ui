// src/types/shopify.ts
export type Money = { amount: string; currencyCode: string };

export type ShopifyImage = {
  url: string;
  altText?: string | null;
  width?: number | null;
  height?: number | null;
};

export type ProductNode = {
  id: string;
  handle: string;
  title: string;
  descriptionHtml?: string | null;
  featuredImage?: ShopifyImage | null;
  priceRange?: { minVariantPrice: Money } | null;
  variants?: Connection<ProductVariant> | null;
};

export type ProductEdge = { cursor: string; node: ProductNode };

export type ProductsConnection = {
  pageInfo: { hasNextPage: boolean };
  edges: ProductEdge[];
};

export type ProductVariant = {
  id: string;
  title: string;
  availableForSale: boolean;
  price: Money;
  selectedOptions: { name: string; value: string }[];
};

/* Conexiones (edges) */
export type Edge<T> = { cursor?: string; node: T };
export type Connection<T> = { edges: Edge<T>[] };

/* Detalle de producto incluye imágenes y variantes */
export type ProductNodeDetail = ProductNode & {
  images?: Connection<ShopifyImage> | null;
  variants?: Connection<ProductVariant> | null;
};
