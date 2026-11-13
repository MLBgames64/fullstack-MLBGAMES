import { Link, useNavigate } from "react-router-dom";
import FilaCarrito from "../components/FilaCarrito.jsx";
import { useCarrito } from "../context/useCarrito.js";
import { formatearPrecio } from "../utils/formatearPrecio.js";

export default function Carrito() {
  const { items, quitar, cambiarCantidad, vaciar, total } = useCarrito();
  const navigate = useNavigate();

  // Renderizado condicional: carrito vacío.
  if (items.length === 0) {
    return (
      <div className="container py-4 text-center">
        <h1 className="mb-3">Carrito de compras</h1>
        <p className="text-secondary">Tu carrito está vacío.</p>
        <Link to="/productos" className="btn btn-primary">
          Ir a productos
        </Link>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <h1 className="mb-4">Carrito de compras</h1>

      {/* table-responsive: en celular la tabla se desliza de lado en vez de romperse */}
      <div className="table-responsive">
        <table className="table table-dark table-hover align-middle">
          <thead>
            <tr>
              <th>Imagen</th>
              <th>Nombre</th>
              <th>Precio</th>
              <th>Cantidad</th>
              <th>Subtotal</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <FilaCarrito
                key={item.id}
                item={item}
                onCambiarCantidad={cambiarCantidad}
                onQuitar={quitar}
              />
            ))}
          </tbody>
        </table>
      </div>

      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mt-3">
        <h2 className="h4 mb-0">Total: {formatearPrecio(total)}</h2>
        <div className="d-flex gap-2">
          <button type="button" className="btn btn-outline-light" onClick={vaciar}>
            Limpiar
          </button>
          <button
            type="button"
            className="btn btn-success"
            onClick={() => navigate("/checkout")}
          >
            Comprar ahora
          </button>
        </div>
      </div>
    </div>
  );
}