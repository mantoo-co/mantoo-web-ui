
export default function Banner() {
  return (
    <section className="banner section">
      <div className="container">
        <div className="row align-items-center g-4">
          <div className="col-lg-7">
            <h1 className="display-5 fw-bold banner-title">Mantoo <span className="banner-accent">Comfy</span></h1>
            <p className="lead mb-4">
              El saco-cobija oversize con capucha: suave, cálido y listo para todo el día.
            </p>
            <a className="btn btn-dark btn-lg" href="/productos">Ver productos</a>
          </div>
          <div className="col-lg-5">
            <div className="ratio ratio-4x3 bg-secondary-subtle rounded-3 d-flex align-items-center justify-content-center">
              <img
                src="/images/banner_mantoo.jpg"
                alt="Mantoo Comfy"
                className="w-100 h-100 object-fit-cover rounded-3"
                loading="eager"
                fetchPriority="high"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
