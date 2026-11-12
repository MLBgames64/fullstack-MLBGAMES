import { Link } from "react-router-dom";
import { formatearPrecio } from "../utils/formatearPrecio.js";
import { calcularDescuento } from "../utils/calcularDescuento.js";

export default function TarjetaJuego({ juego, onAgregar = () => {} }) {
  const enOferta = juego.precioOferta !== null && juego.precioOferta !== undefined;
  const sinStock = juego.stock === 0;

  return (
    <div className="card h-100 bg-dark text-light border-secondary">
      <img
        src={juego.imagen}
        className="card-img-top"
        alt={juego.nombre}
        style={{ height: "220px", objectFit: "cover" }}
      />

      <div className="card-body d-flex flex-column">
        <span className="badge bg-secondary align-self-start mb-2">{juego.categoria}</span>
        <h5 className="card-title">{juego.nombre}</h5>

        <p className="mb-3">
          {enOferta ? (
            <>
              <span className="text-decoration-line-through text-secondary me-2">
                {formatearPrecio(juego.precio)}
              </span>
              <span className="fw-bold text-success">{formatearPrecio(juego.precioOferta)}</span>
              <span className="badge bg-danger ms-2">
                -{calcularDescuento(juego.precio, juego.precioOferta)}%
              </span>
            </>
          ) : (
            <span className="fw-bold">{formatearPrecio(juego.precio)}</span>
          )}
        </p>

        <div className="mt-auto d-grid gap-2">
          <Link to={`/productos/${juego.id}`} className="btn btn-outline-light btn-sm">
            Ver detalle
          </Link>
          <button
            type="button"
            className="btn btn-primary btn-sm"
            onClick={() => onAgregar(juego)}
            disabled={sinStock}
          >
            {sinStock ? "Sin stock" : "Añadir al carrito"}
          </button>
        </div>
      </div>
    </div>
  );
}
