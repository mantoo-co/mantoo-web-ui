import Link from "next/link";
import {  fetchAllProducts } from "@/lib/shopify";
import type { ProductNode } from "@/types/shopify";



export default async function ProductosPage() {
  const products = await fetchAllProducts();

  return (
    <main className="container py-5">
      <h1 className="h3 mb-4">Productos</h1>
      <div className="row g-4">
        {products.map((p: ProductNode) => (
          <div className="col-sm-6 col-lg-4" key={p.id}>
            <div className="card h-100">
              <div className="ratio ratio-4x3 card-img-top bg-light overflow-hidden">
                {p.featuredImage?.url ? (
                  <img
                  src={p.featuredImage.url}
                  alt={p.featuredImage.altText ?? p.title}
                  className="object-fit-cover"
                  style={{ width: '100%', height: 'auto' }}
                  />
                ) : null}
              </div>
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{p.title}</h5>
                <p className="card-text text-body-secondary flex-grow-1">
                  {p.descriptionHtml?.slice(0, 120)}
                </p>
                <div className="d-flex align-items-center justify-content-between">
                  <small className="text-muted">
                    {p.priceRange?.minVariantPrice?.amount}{" "}
                    {p.priceRange?.minVariantPrice?.currencyCode}
                  </small>
                  <Link className="btn btn-primary btn-sm" href={`/producto/${p.handle}`}>
                    Ver
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
        {products.length === 0 && <p>No hay productos publicados aún.</p>}
      </div>
    </main>
  );
}
