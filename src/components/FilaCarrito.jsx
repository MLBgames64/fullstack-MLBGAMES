import { obtenerJuego } from "../data/juegos.js";
import { formatearPrecio } from "../utils/formatearPrecio.js";

// Una fila de la tabla del carrito. No tiene estado propio: todo llega por props.
export default function FilaCarrito({ item, onCambiarCantidad, onQuitar }) {
  // Para desactivar el "+" cuando ya llegamos al stock disponible.
  const stock = obtenerJuego(item.id)?.stock ?? Infinity;

  return (
    <tr>
      <td style={{ width: "80px" }}>
        <img
          src={item.imagen}
          alt={item.nombre}
          className="img-fluid rounded"
          style={{ width: "64px", height: "48px", objectFit: "cover" }}
        />
      </td>
      <td>{item.nombre}</td>
      <td>{formatearPrecio(item.precio)}</td>
      <td>
        <div className="d-flex align-items-center gap-2">
          <button
            type="button"
            className="btn btn-outline-light btn-sm"
            onClick={() => onCambiarCantidad(item.id, item.cantidad - 1)}
            aria-label={`Disminuir cantidad de ${item.nombre}`}
          >
            -
          </button>
          <span>{item.cantidad}</span>
          <button
            type="button"
            className="btn btn-outline-light btn-sm"
            onClick={() => onCambiarCantidad(item.id, item.cantidad + 1)}
            disabled={item.cantidad >= stock}
            aria-label={`Aumentar cantidad de ${item.nombre}`}
          >
            +
          </button>
        </div>
      </td>
      <td>{formatearPrecio(item.precio * item.cantidad)}</td>
      <td>
        <button
          type="button"
          className="btn btn-danger btn-sm"
          onClick={() => onQuitar(item.id)}
        >
          Quitar
        </button>
      </td>
    </tr>
  );
}