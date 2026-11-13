// Tarjeta de color con un número grande (por ejemplo "Productos: 6").
export default function TarjetaResumen({ titulo, valor, detalle, color = "primary" }) {
  return (
    <div className={`card text-bg-${color} h-100`}>
      <div className="card-body">
        <h2 className="h6 text-uppercase mb-2">{titulo}</h2>
        <p className="display-6 fw-bold mb-1">{valor}</p>
        {detalle && <p className="small mb-0">{detalle}</p>}
      </div>
    </div>
  );
}
