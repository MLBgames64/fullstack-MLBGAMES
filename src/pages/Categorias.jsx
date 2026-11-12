import { useState } from "react";
import TarjetaJuego from "../components/TarjetaJuego.jsx";
import { obtenerCategorias, obtenerPorCategoria } from "../data/juegos.js";

export default function Categorias() {
  const [categorias] = useState(() => obtenerCategorias());
  const [activa, setActiva] = useState(categorias[0] ?? "");

  const juegos = activa ? obtenerPorCategoria(activa) : [];

  function manejarAgregar(juego) {
    // TEMPORAL: Martín lo reemplaza por el carrito real
    alert(`"${juego.nombre}" agregado al carrito.`);
  }

  return (
    <div className="container py-4">
      <h1 className="mb-4">Categorías</h1>

      <div className="d-flex flex-wrap gap-2 mb-4">
        {categorias.map((categoria) => (
          <button
            key={categoria}
            type="button"
            className={`btn ${categoria === activa ? "btn-primary" : "btn-outline-light"}`}
            onClick={() => setActiva(categoria)}
          >
            {categoria} ({obtenerPorCategoria(categoria).length})
          </button>
        ))}
      </div>

      {activa && <h2 className="mb-3">{activa}</h2>}

      {juegos.length === 0 ? (
        <p className="text-secondary">No hay juegos en esta categoría.</p>
      ) : (
        <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-4">
          {juegos.map((juego) => (
            <div className="col" key={juego.id}>
              <TarjetaJuego juego={juego} onAgregar={manejarAgregar} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
