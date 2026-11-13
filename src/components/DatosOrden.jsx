// Muestra de solo lectura el cliente y la dirección de una orden.
export default function DatosOrden({ orden }) {
  const { cliente, direccion } = orden;

  return (
    <div className="row g-3 mb-3">
      <div className="col-12 col-md-6">
        <h2 className="h6 text-secondary">Cliente</h2>
        <p className="mb-0">
          {cliente.nombre} {cliente.apellidos}
        </p>
        <p className="mb-0">{cliente.correo}</p>
      </div>
      <div className="col-12 col-md-6">
        <h2 className="h6 text-secondary">Dirección de entrega</h2>
        <p className="mb-0">
          {direccion.calle}
          {direccion.departamento ? `, Depto ${direccion.departamento}` : ""}
        </p>
        <p className="mb-0">
          {direccion.comuna}, {direccion.region}
        </p>
        {direccion.indicaciones && (
          <p className="mb-0 text-secondary">{direccion.indicaciones}</p>
        )}
      </div>
    </div>
  );
}