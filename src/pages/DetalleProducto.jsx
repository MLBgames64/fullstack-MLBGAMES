import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { obtenerJuego } from "../data/juegos.js";
import { formatearPrecio } from "../utils/formatearPrecio.js";
import { calcularDescuento } from "../utils/calcularDescuento.js";
import { useCarrito } from "../context/useCarrito.js";

export default function DetalleProducto() {
  const { id } = useParams();
  const juego = obtenerJuego(id);
  const [cantidad, setCantidad] = useState(1);
  const { agregar } = useCarrito();
  
  if (!juego) {
    return (
      <div className="container py-4">
        <h1>Juego no encontrado</h1>
        <p>El producto que buscas no existe o fue eliminado.</p>
        <Link to="/productos" className="btn btn-primary">
          Volver a productos
        </Link>
      </div>
    );
  }

  const enOferta = juego.precioOferta !== null && juego.precioOferta !== undefined;
  const sinStock = juego.stock === 0;

  function disminuir() {
    setCantidad((actual) => Math.max(1, actual - 1));
  }

  function aumentar() {
    setCantidad((actual) => Math.min(juego.stock, actual + 1));
  }

  function agregarAlCarrito() {
  console.log("Juego:", juego);
  console.log("Cantidad:", cantidad);

  agregar(juego, cantidad);

  console.log("Se ejecutó agregar()");
  alert("Se ejecutó la función de agregar.");
}

  return (
    <div className="container py-4">
      <Link to="/productos" className="btn btn-outline-light btn-sm mb-4">
        &larr; Volver a productos
      </Link>

      <div className="row g-4">
        <div className="col-12 col-md-5">
          <img
            src={juego.imagen}
            alt={juego.nombre}
            className="img-fluid rounded"
            style={{ width: "100%", maxHeight: "420px", objectFit: "cover" }}
          />
        </div>

        <div className="col-12 col-md-7">
          <span className="badge bg-secondary mb-2">{juego.categoria}</span>
          <h1>{juego.nombre}</h1>
          <p className="lead">{juego.descripcion}</p>

          <p className="fs-4 mb-1">
            {enOferta ? (
              <>
                <span className="text-decoration-line-through text-secondary me-2 fs-5">
                  {formatearPrecio(juego.precio)}
                </span>
                <span className="fw-bold text-success">{formatearPrecio(juego.precioOferta)}</span>
                <span className="badge bg-danger ms-2 fs-6">
                  -{calcularDescuento(juego.precio, juego.precioOferta)}%
                </span>
              </>
            ) : (
              <span className="fw-bold">{formatearPrecio(juego.precio)}</span>
            )}
          </p>

          <p className={sinStock ? "text-danger" : "text-secondary"}>
            {sinStock ? "Sin stock disponible" : `Stock disponible: ${juego.stock}`}
          </p>

          {!sinStock && (
            <div className="d-flex align-items-center gap-3 flex-wrap">
              <div className="btn-group" role="group" aria-label="Cantidad">
                <button type="button" className="btn btn-outline-light" onClick={disminuir}>
                  -
                </button>
                <span className="btn btn-dark disabled">{cantidad}</span>
                <button type="button" className="btn btn-outline-light" onClick={aumentar}>
                  +
                </button>
              </div>

              <button type="button" className="btn btn-primary" onClick={agregarAlCarrito}>
                Añadir al carrito
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
