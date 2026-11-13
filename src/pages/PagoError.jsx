import { Link } from "react-router-dom";
import DatosOrden from "../components/DatosOrden.jsx";
import ResumenCarrito from "../components/ResumenCarrito.jsx";
import { obtenerUltimaOrden } from "../data/ordenes.js";

export default function PagoError() {
  const orden = obtenerUltimaOrden();

  if (!orden || orden.estado !== "fallida") {
    return (
      <div className="container py-4 text-center">
        <h1 className="mb-3">Pago</h1>
        <p className="text-secondary">No hay un pago fallido para mostrar.</p>
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
              <h1 className="h3 text-danger">
                ✖ No se pudo realizar el pago. nro {orden.numero}
              </h1>
              <p className="text-secondary">Detalle de la compra</p>

              <div className="d-grid d-md-flex justify-content-md-center mb-4">
                <Link to="/checkout" className="btn btn-success">
                  VOLVER A REALIZAR EL PAGO
                </Link>
              </div>

              <DatosOrden orden={orden} />
              <ResumenCarrito
                items={orden.items}
                total={orden.total}
                etiquetaTotal="Total"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}