import { Link } from "react-router-dom";
import { formatearPrecio } from "../../utils/formatearPrecio.js";

// Una fila de la tabla de productos del admin.
// Props: juego (los datos), critico (si tiene poco stock) y onEliminar (función del padre).
export default function FilaProducto({ juego, critico, onEliminar }) {
  const enOferta = juego.precioOferta !== null && juego.precioOferta !== undefined;

  return (
    <tr>
      <td style={{ width: "80px" }}>
        <img
          src={juego.imagen}
          alt={juego.nombre}
          className="rounded"
          style={{ width: "64px", height: "48px", objectFit: "cover" }}
        />
      </td>
      <td>{juego.nombre}</td>
      <td>{juego.categoria}</td>
      <td>
        {enOferta ? (
          <>
            <span className="text-decoration-line-through text-secondary me-2">
              {formatearPrecio(juego.precio)}
            </span>
            <span className="text-success fw-bold">{formatearPrecio(juego.precioOferta)}</span>
          </>
        ) : (
          formatearPrecio(juego.precio)
        )}
      </td>
      <td>
        {juego.stock}
        {critico && <span className="badge bg-danger ms-2">Crítico</span>}
      </td>
      <td className="text-nowrap">
        <Link to={`/admin/productos/${juego.id}/editar`} className="btn btn-outline-light btn-sm me-2">
          Editar
        </Link>
        <button type="button" className="btn btn-outline-danger btn-sm" onClick={() => onEliminar(juego)}>
          Eliminar
        </button>
      </td>
    </tr>
  );
}
