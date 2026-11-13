import { useState } from "react";
import { Link } from "react-router-dom";
import DatosOrden from "../components/DatosOrden.jsx";
import ResumenCarrito from "../components/ResumenCarrito.jsx";
import { obtenerUltimaOrden } from "../data/ordenes.js";

export default function PagoCorrecto() {
  const orden = obtenerUltimaOrden();
  const [emailEnviado, setEmailEnviado] = useState(false);

  // Renderizado condicional: si no hay una compra pagada, no hay nada que mostrar.
  if (!orden || orden.estado !== "pagada") {
    return (
      <div className="container py-4 text-center">
        <h1 className="mb-3">Compra</h1>
        <p className="text-secondary">No hay una compra reciente para mostrar.</p>
        <Link to="/productos" className="btn btn-primary">
          Ir a productos
        </Link>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <div className="row justify-content-center">
        <div className="col-12 col-lg-10 col-xl-8">
          <div className="card bg-dark text-light border-secondary">
            <div className="card-body p-4">
              <h1 className="h3 text-success">
                ✔ Se ha realizado la compra. nro {orden.numero}
              </h1>
              <p className="text-secondary">
                {new Date(orden.fecha).toLocaleString("es-CL")}
              </p>

              <DatosOrden orden={orden} />
              <ResumenCarrito
                items={orden.items}
                total={orden.total}
                etiquetaTotal="Total pagado"
              />

              {emailEnviado && (
                <div className="alert alert-success mt-3" role="alert">
                  Boleta enviada a {orden.cliente.correo} (simulado).
                </div>
              )}

              {/* d-print-none: estos botones no salen en la boleta impresa */}
              <div className="d-flex flex-column flex-sm-row justify-content-center gap-2 mt-4 d-print-none">
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => window.print()}
                >
                  Imprimir boleta en PDF
                </button>
                <button
                  type="button"
                  className="btn btn-success"
                  onClick={() => setEmailEnviado(true)}
                >
                  Enviar boleta por email
                </button>
                <Link to="/" className="btn btn-outline-light">
                  Volver al inicio
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}