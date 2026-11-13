import { Link, NavLink, Outlet } from "react-router-dom";
import { useSesion } from "../context/useSesion.js";

const OPCIONES_MENU = [
  { a: "/admin", texto: "Dashboard", soloExacta: true },
  { a: "/admin/ordenes", texto: "Órdenes" },
  { a: "/admin/productos", texto: "Productos" },
  { a: "/admin/usuarios", texto: "Usuarios" },
];

// Marco del panel de administración: menú lateral + la página que toque (<Outlet />).
export default function AdminLayout() {
  const { usuario, cerrarSesion } = useSesion();

  return (
    <div className="d-flex flex-column flex-lg-row min-vh-100 bg-dark text-light">
      <aside className="bg-black border-end border-secondary p-3" style={{ minWidth: "240px" }}>
        <div className="d-flex justify-content-between align-items-center">
          <span className="h5 mb-0">Panel MLB Games</span>
          {/* En celular el menú se esconde y este botón lo abre (collapse de Bootstrap) */}
          <button
            type="button"
            className="btn btn-outline-light btn-sm d-lg-none"
            data-bs-toggle="collapse"
            data-bs-target="#menuAdmin"
            aria-controls="menuAdmin"
            aria-expanded="false"
            aria-label="Abrir menú del panel"
          >
            ☰
          </button>
        </div>

        <div className="collapse d-lg-block mt-3" id="menuAdmin">
          {usuario && <p className="text-secondary small mb-3">Hola, {usuario.nombre}</p>}

          <nav className="nav nav-pills flex-column gap-1">
            {OPCIONES_MENU.map((opcion) => (
              <NavLink key={opcion.a} to={opcion.a} end={opcion.soloExacta} className="nav-link text-light">
                {opcion.texto}
              </NavLink>
            ))}
          </nav>

          <hr className="border-secondary" />

          <div className="d-grid gap-2">
            <Link to="/" className="btn btn-outline-light btn-sm">
              Tienda
            </Link>
            {/* Al cerrar sesión, RutaAdmin se da cuenta y manda solo a /login */}
            <button type="button" className="btn btn-danger btn-sm" onClick={cerrarSesion}>
              Cerrar sesión
            </button>
          </div>
        </div>
      </aside>

      <section className="flex-grow-1 p-3 p-md-4">
        <Outlet />
      </section>
    </div>
  );
}
