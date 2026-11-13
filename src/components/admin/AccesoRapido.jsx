import { Link } from "react-router-dom";

// Tarjeta clickeable que lleva a una sección del panel.
export default function AccesoRapido({ a, icono, titulo, descripcion }) {
  return (
    <Link to={a} className="card h-100 bg-black border-secondary text-light text-decoration-none">
      <div className="card-body text-center">
        <p className="fs-2 mb-1" aria-hidden="true">
          {icono}
        </p>
        <h2 className="h6">{titulo}</h2>
        <p className="small text-secondary mb-0">{descripcion}</p>
      </div>
    </Link>
  );
}
