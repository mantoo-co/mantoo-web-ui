"use client";
import Link from "next/link";

export default function SiteNavbar() {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary border-bottom">
      <div className="container">
        <Link className="navbar-brand fw-bold" href="/">Mantoo</Link>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mainNav" aria-controls="mainNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="mainNav">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" href="/productos">Productos</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" href="/conocenos">Conócenos</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
