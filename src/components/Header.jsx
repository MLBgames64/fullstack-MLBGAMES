
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { SesionCtx } from "../context/sesionContexto.js";

export default function Header() {
  const { usuario, cerrarSesion } = useContext(SesionCtx);
  const navigate = useNavigate();

  function manejarCierreSesion() {
    cerrarSesion();
    navigate("/");
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark border-bottom">
      <div className="container">
        <Link className="navbar-brand" to="/">
          MLB Games
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#menuPrincipal"
          aria-controls="menuPrincipal"
          aria-expanded="false"
          aria-label="Abrir menú"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="menuPrincipal">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className="nav-link" to="/">Inicio</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/productos">Productos</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/categorias">Categorías</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/ofertas">Ofertas</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/nosotros">Nosotros</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/blog">Blog</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/contacto">Contacto</NavLink>
            </li>
          </ul>

          <div className="d-flex gap-2 align-items-center">
            <Link className="btn btn-outline-light btn-sm" to="/carrito">
              Carrito
            </Link>

            {usuario ? (
              <>
                <span className="text-light small">
                  Hola, {usuario.nombre}
                </span>

                {usuario.rol === "admin" && (
                  <Link
                    className="btn btn-warning btn-sm"
                    to="/admin"
                  >
                    Administración
                  </Link>
                )}

                <button
                  className="btn btn-outline-light btn-sm"
                  onClick={manejarCierreSesion}
                >
                  Cerrar sesión
                </button>
              </>
            ) : (
              <>
                <Link
                  className="btn btn-outline-light btn-sm"
                  to="/login"
                >
                  Iniciar sesión
                </Link>

                <Link
                  className="btn btn-primary btn-sm"
                  to="/registro"
                >
                  Crear cuenta
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
