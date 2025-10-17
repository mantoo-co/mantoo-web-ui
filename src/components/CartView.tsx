"use client";
import { useCart } from "@/hooks/useCart";
import type { CartLine } from "@/types/shopify-cart";

function formatMoney(amount?: string, currency?: string) {
  if (!amount || !currency) return "";
  try {
    return new Intl.NumberFormat("es-CO", { style: "currency", currency }).format(Number(amount));
  } catch { return `${amount} ${currency}`; }
}

export default function CartView() {
  const { cart, loading, update, remove, checkout } = useCart();
  const qty = cart?.totalQuantity ?? 0;

  if (loading) return <div className="text-body-secondary">Cargando carrito…</div>;
  if (!cart || qty === 0) return <div className="text-body-secondary">Tu carrito está vacío.</div>;

  const lines = cart.lines.edges.map(e => e.node);

  const subtotal = formatMoney(
    cart.cost.subtotalAmount.amount,
    cart.cost.subtotalAmount.currencyCode
  );
  const total = formatMoney(
    cart.cost.totalAmount.amount,
    cart.cost.totalAmount.currencyCode
  );

  return (
    <div className="row g-4">
      <div className="col-lg-8">
        <div className="list-group">
          {lines.map((line: CartLine) => (
            <div key={line.id} className="list-group-item">
              <div className="d-flex w-100 justify-content-between align-items-start">
                <div>
                  <div className="fw-semibold">{line.merchandise.product.title}</div>
                  <div className="small text-body-secondary">{line.merchandise.title}</div>
                  <div className="small mt-1">{formatMoney(line.cost.amountPerQuantity.amount, line.cost.amountPerQuantity.currencyCode)} c/u</div>
                </div>
                <button className="btn btn-link text-danger" onClick={() => remove([line.id])}>
                  Eliminar
                </button>
              </div>

              <div className="d-flex align-items-center gap-2 mt-2">
                <button
                  className="btn btn-sm btn-outline-secondary"
                  onClick={() => update([{ id: line.id, quantity: Math.max(1, line.quantity - 1) }])}
                  disabled={line.quantity <= 1}
                >−</button>
                <span>{line.quantity}</span>
                <button
                  className="btn btn-sm btn-outline-secondary"
                  onClick={() => update([{ id: line.id, quantity: line.quantity + 1 }])}
                >+</button>

                <div className="ms-auto fw-semibold">
                  {formatMoney(line.cost.totalAmount.amount, line.cost.totalAmount.currencyCode)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="col-lg-4">
        <div className="card">
          <div className="card-body">
            <div className="d-flex justify-content-between">
              <span>Subtotal</span>
              <span>{subtotal}</span>
            </div>
            <div className="d-flex justify-content-between mt-2">
              <span>Total</span>
              <span className="fw-bold">{total}</span>
            </div>
            <button className="btn btn-primary w-100 mt-3" onClick={() => checkout()}>
              Proceder al checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
