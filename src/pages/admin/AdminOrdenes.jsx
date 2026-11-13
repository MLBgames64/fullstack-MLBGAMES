import { useState } from "react";
import BoletaOrden from "../../components/admin/BoletaOrden.jsx";
import { leerOrdenes } from "../../data/ordenes.js";
import { formatearPrecio } from "../../utils/formatearPrecio.js";

export default function AdminOrdenes() {
  // Las más nuevas primero.
  const [ordenes] = useState(() => [...leerOrdenes()].reverse());
  // Estado: la orden cuya boleta se está mirando (null = ninguna).
  const [seleccionada, setSeleccionada] = useState(null);

  return (
    <div>
      <h1 className="h3 mb-4">Órdenes</h1>

      {ordenes.length === 0 ? (
        <p className="text-secondary">Todavía no hay órdenes.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-dark table-hover align-middle">
            <thead>
              <tr>
                <th>Número</th>
                <th>Fecha</th>
                <th>Cliente</th>
                <th>Total</th>
                <th>Estado</th>
                <th>Boleta</th>
              </tr>
            </thead>
            <tbody>
              {ordenes.map((orden) => (
                <tr key={orden.id}>
                  <td>{orden.numero}</td>
                  <td>{new Date(orden.fecha).toLocaleDateString("es-CL")}</td>
                  <td>
                    {orden.cliente.nombre} {orden.cliente.apellidos}
                  </td>
                  <td>{formatearPrecio(orden.total)}</td>
                  <td>
                    <span className={`badge ${orden.estado === "pagada" ? "bg-success" : "bg-danger"}`}>
                      {orden.estado}
                    </span>
                  </td>
                  <td>
                    <button type="button" className="btn btn-outline-light btn-sm" onClick={() => setSeleccionada(orden)}>
                      Ver boleta
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {seleccionada && <BoletaOrden orden={seleccionada} onCerrar={() => setSeleccionada(null)} />}
    </div>
  );
}
