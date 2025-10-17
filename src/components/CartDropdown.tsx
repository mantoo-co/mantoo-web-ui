"use client";
import { useCart } from "@/hooks/useCart";
import type { CartLine } from "@/types/shopify-cart";
import Link from "next/link";

function formatMoney(amount?: string, currency?: string) {
  if (!amount || !currency) return "";
  try {
    return new Intl.NumberFormat("es-CO", { style: "currency", currency }).format(Number(amount));
  } catch { return `${amount} ${currency}`; }
}

export default function CartDropdown() {
  const { cart, update, remove, checkout, loading } = useCart();
  const qty = cart?.totalQuantity ?? 0;

  return (
    <div className="nav-item dropdown">
      <button
        className="btn position-relative"
        data-bs-toggle="dropdown"
        aria-expanded="false"
        aria-label="Carrito"
      >
        {/* ícono simple */}
        <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
          <path fill="currentColor" d="M7 18a2 2 0 1 0 .001 3.999A2 2 0 0 0 7 18m10 0a2 2 0 1 0 .001 3.999A2 2 0 0 0 17 18M7.2 14h9.77c.86 0 1.62-.55 1.88-1.37l2.1-6.54a1 1 0 0 0-.95-1.3H6.06L5.38 2.9A1 1 0 0 0 4.4 2H2v2h1.47l2.52 9.06A2.5 2.5 0 0 0 7.2 14Z"/>
        </svg>
        {qty > 0 && (
          <span className="position-absolute start-100 translate-middle badge rounded-pill bg-primary" style={{ top: '5px'}}>
            {qty}
            <span className="visually-hidden">items en carrito</span>
          </span>
        )}
      </button>

      <div className="dropdown-menu dropdown-menu-end p-0" style={{ minWidth: 320 }}>
        <div className="p-3 border-bottom">
          <strong>Carrito</strong>
          <span className="text-body-secondary ms-2">({qty})</span>
        </div>

        <div className="p-3" style={{ maxHeight: 360, overflowY: "auto" }}>
          {loading && <div className="text-body-secondary">Cargando…</div>}

          {!loading && (cart?.lines.edges.length ?? 0) === 0 && (
            <div className="text-body-secondary">Tu carrito está vacío.</div>
          )}

          {!loading && cart?.lines.edges.map(({ node }: { node: CartLine }) => (
            <div key={node.id} className="d-flex align-items-center mb-3">
              <div className="flex-grow-1">
                <div className="fw-semibold">{node.merchandise.product.title}</div>
                <div className="small text-body-secondary">
                  {node.merchandise.title}
                </div>
                <div className="small">{formatMoney(node.cost.totalAmount.amount, node.cost.totalAmount.currencyCode)}</div>

                <div className="d-flex gap-2 align-items-center mt-1">
                  <button
                    className="btn btn-sm btn-outline-secondary"
                    onClick={() => update([{ id: node.id, quantity: Math.max(1, node.quantity - 1) }])}
                    disabled={node.quantity <= 1}
                    aria-label="Disminuir cantidad"
                  >−</button>
                  <span className="small">{node.quantity}</span>
                  <button
                    className="btn btn-sm btn-outline-secondary"
                    onClick={() => update([{ id: node.id, quantity: node.quantity + 1 }])}
                    aria-label="Aumentar cantidad"
                  >+</button>

                  <button
                    className="btn btn-sm btn-link text-danger ms-2"
                    onClick={() => remove([node.id])}
                    aria-label="Eliminar"
                  >Eliminar</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="p-3 border-top d-flex gap-2">
          <Link href="/carrito" className="btn btn-outline-primary w-50">Ver carrito</Link>
          <button className="btn btn-primary w-50" onClick={() => checkout()} disabled={!cart || qty === 0}>
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
}
