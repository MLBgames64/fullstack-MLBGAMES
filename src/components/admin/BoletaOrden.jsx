import DatosOrden from "../DatosOrden.jsx";
import ResumenCarrito from "../ResumenCarrito.jsx";

// Detalle (boleta) de una orden. Reutiliza los componentes de Martín:
// DatosOrden (cliente y dirección) y ResumenCarrito (productos y total).
export default function BoletaOrden({ orden, onCerrar }) {
  return (
    <div className="card bg-black border-secondary mt-4">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-start mb-2">
          <div>
            <h2 className="h5 mb-1">Boleta {orden.numero}</h2>
            <p className="text-secondary mb-0">{new Date(orden.fecha).toLocaleString("es-CL")}</p>
          </div>
          <button type="button" className="btn btn-outline-light btn-sm" onClick={onCerrar}>
            Cerrar
          </button>
        </div>

        <DatosOrden orden={orden} />
        <ResumenCarrito items={orden.items} total={orden.total} etiquetaTotal="Total" />
      </div>
    </div>
  );
}
