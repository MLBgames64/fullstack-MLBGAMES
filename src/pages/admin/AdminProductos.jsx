import { useState } from "react";
import { Link } from "react-router-dom";
import FilaProducto from "../../components/admin/FilaProducto.jsx";
import { eliminarJuego, leerJuegos, obtenerCriticos } from "../../data/juegos.js";

// Un producto es "crítico" cuando le quedan 5 unidades o menos.
const LIMITE_CRITICO = 5;

export default function AdminProductos() {
  const [juegos, setJuegos] = useState(() => leerJuegos());
  const [soloCriticos, setSoloCriticos] = useState(false);

  const visibles = soloCriticos ? obtenerCriticos(LIMITE_CRITICO) : juegos;

  function manejarEliminar(juego) {
    const confirmado = window.confirm(`¿Eliminar "${juego.nombre}"? Esta acción no se puede deshacer.`);
    if (!confirmado) return;
    eliminarJuego(juego.id);
    setJuegos(leerJuegos());
  }

  return (
    <div>
      <div className="d-flex flex-column flex-sm-row justify-content-between align-items-sm-center gap-2 mb-3">
        <h1 className="h3 mb-0">Productos</h1>
        <Link to="/admin/productos/nuevo" className="btn btn-primary">
          Nuevo producto
        </Link>
      </div>

      <div className="form-check form-switch mb-3">
        <input
          className="form-check-input"
          type="checkbox"
          role="switch"
          id="soloCriticos"
          checked={soloCriticos}
          onChange={(evento) => setSoloCriticos(evento.target.checked)}
        />
        <label className="form-check-label" htmlFor="soloCriticos">
          Ver solo productos críticos (stock de {LIMITE_CRITICO} o menos)
        </label>
      </div>

      {visibles.length === 0 ? (
        <p className="text-secondary">No hay productos para mostrar.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-dark table-hover align-middle">
            <thead>
              <tr>
                <th>Imagen</th>
                <th>Nombre</th>
                <th>Categoría</th>
                <th>Precio</th>
                <th>Stock</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {visibles.map((juego) => (
                <FilaProducto
                  key={juego.id}
                  juego={juego}
                  critico={juego.stock <= LIMITE_CRITICO}
                  onEliminar={manejarEliminar}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
