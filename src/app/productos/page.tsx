// src/app/productos/page.tsx
import Link from "next/link";
import Image from "next/image";
import { fetchAllProducts } from "@/lib/shopify";
import type { ProductNode, ProductVariant, Edge } from "@/types/shopify";
import { AddToCartButton } from "@/components/AddToCartButton";

function formatPrice(amount?: string, currency?: string) {
  if (!amount || !currency) return "";
  try {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency
    }).format(Number(amount));
  } catch {
    return `${amount} ${currency}`;
  }
}

export default async function ProductosPage() {
  const products: ProductNode[] = await fetchAllProducts();

  return (
    <main className="container py-5">
      <h1 className="h3 mb-4">Productos</h1>
      <div className="row g-4">
        {products.map((p) => {
          const img = p.featuredImage;
          const oneVariant: ProductVariant | undefined =
            p.variants?.edges?.[0]?.node;

          const priceText =
            oneVariant?.price
              ? formatPrice(oneVariant.price.amount, oneVariant.price.currencyCode)
              : p.priceRange?.minVariantPrice
              ? formatPrice(
                  p.priceRange.minVariantPrice.amount,
                  p.priceRange.minVariantPrice.currencyCode
                )
              : "";

          return (
            <div className="col-sm-6 col-lg-4" key={p.id}>
              <div className="card h-100">
                <div className="ratio ratio-4x3 card-img-top bg-light overflow-hidden position-relative">
                  {img?.url ? (
                    <img
                      src={img.url}
                      alt={img.altText ?? p.title}
                      sizes="(min-width: 992px) 33vw, (min-width: 768px) 50vw, 100vw"
                      className="object-fit-cover"
                    />
                  ) : (
                    <div className="d-flex align-items-center justify-content-center w-100 h-100 text-body-secondary">
                      Sin imagen
                    </div>
                  )}
                </div>

                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{p.title}</h5>
                  <p className="card-text text-body-secondary flex-grow-1">
                    {(p.descriptionHtml ?? p.descriptionHtml ?? "").slice(0, 120)}
                  </p>

                  <div className="d-flex align-items-center justify-content-between">
                    <small className="text-muted">{priceText}</small>
                    <Link className="btn btn-outline-primary btn-sm" href={`/producto/${p.handle}`}>
                      Ver
                    </Link>
                  </div>

                  <div className="mt-2">
                    {oneVariant ? (
                      oneVariant.availableForSale ? (
                        <AddToCartButton variantId={oneVariant.id} />
                      ) : (
                        <button className="btn btn-secondary btn-sm" disabled>
                          Sin stock
                        </button>
                      )
                    ) : (
                      <button className="btn btn-secondary btn-sm" disabled>
                        Variante no disponible
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        {products.length === 0 && <p>No hay productos publicados aún.</p>}
      </div>
    </main>
  );
}
