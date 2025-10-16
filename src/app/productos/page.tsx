export default function ProductosPage() {
  return (
    <main className="container py-5">
      <h1 className="h3 mb-4">Productos</h1>

      <div className="row g-4">
        <div className="col-sm-6 col-lg-4">
          <div className="card h-100">
            <div className="ratio ratio-4x3 card-img-top bg-light d-flex align-items-center justify-content-center">
              <span className="text-body-secondary">Imagen</span>
            </div>
            <div className="card-body">
              <h5 className="card-title">Mantoo Comfy</h5>
              <p className="card-text">Saco-cobija oversize con capucha y sherpa interior.</p>
              <a className="btn btn-dark" href="#">Agregar</a>
            </div>
          </div>
        </div>

        {/* duplica o mapea más productos aquí */}
      </div>
    </main>
  );
}
