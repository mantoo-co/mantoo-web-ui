export default function SiteFooter() {
  return (
    <footer className="site-footer mt-auto">
      <div className="container py-4">
        <div className="row gy-3">
          <div className="col-md-6">
            <h6 className="fw-bold mb-2">Mantoo</h6>
            <small className="text-body-secondary d-block">Contacto: hola@mantoo.co</small>
            <small className="text-body-secondary d-block">WhatsApp: +57 300 000 0000</small>
            <small className="text-body-secondary d-block">Bogotá, Colombia</small>
          </div>
          <div className="col-md-6 text-md-end">
            <a href="https://instagram.com" className="me-3 text-decoration-none">Instagram</a>
            <a href="https://tiktok.com" className="me-3 text-decoration-none">TikTok</a>
            <a href="https://x.com" className="text-decoration-none">X (Twitter)</a>
          </div>
        </div>
        <div className="pt-3 text-center text-body-secondary border-top mt-3">
          <small>© {new Date().getFullYear()} Mantoo</small>
        </div>
      </div>
    </footer>
  );
}
