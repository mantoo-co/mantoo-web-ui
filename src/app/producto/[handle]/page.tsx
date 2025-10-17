import { shopifyFetch, QUERY_PRODUCT_BY_HANDLE } from "@/lib/shopify";
import type { ProductNodeDetail, ShopifyImage, ProductVariant, Edge } from "@/types/shopify";
import { AddToCartButton } from "../../../components/AddToCartButton";



export default async function ProductPage(props: unknown) {
  const { params } = props as { params: Promise<{ handle: string }> };
  const resolvedParams = await params;
  const data = await shopifyFetch<{ product: ProductNodeDetail }>(
    QUERY_PRODUCT_BY_HANDLE,
    { handle: resolvedParams.handle }
  );

  const p = data.product;
  if (!p) return <main className="container py-5">Producto no encontrado</main>;

  const images: ShopifyImage[] =
    p.images?.edges?.map((e: Edge<ShopifyImage>) => e.node) ?? [];
  const variants: ProductVariant[] =
    p.variants?.edges?.map((e: Edge<ProductVariant>) => e.node) ?? [];
  
  const firstAvailable = variants.find(v => v.availableForSale) ?? variants[0];


  return (
    <main className="container py-5">
      <div className="row g-4">
        <div className="col-md-6">
          <div className="ratio ratio-4x3 bg-light overflow-hidden rounded-3">
            {images[0]?.url && (
              <img
                src={images[0].url}
                alt={images[0].altText ?? p.title}
                className="object-fit-cover"
                style={{ width: '100%', height: 'auto' }}
              />
            )}
          </div>
        </div>
        <div className="col-md-6">
          <h1 className="h3">{p.title}</h1>
          <div
            className="text-body-secondary"
            dangerouslySetInnerHTML={{ __html: p.descriptionHtml ?? "" }}
          />
          <div className="mt-3">
            {variants[0]?.price?.amount && (
              <span className="h5">
                {variants[0].price.amount} {variants[0].price.currencyCode}
              </span>
            )}
          </div>
          {firstAvailable && (
            <AddToCartButton variantId={firstAvailable.id} />
          )}
        </div>
      </div>
    </main>
  );
}
