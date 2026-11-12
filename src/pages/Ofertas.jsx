import { useState } from "react";
import TarjetaJuego from "../components/TarjetaJuego.jsx";
import { obtenerOfertas } from "../data/juegos.js";

export default function Ofertas() {
  const [ofertas] = useState(() => obtenerOfertas());

  function manejarAgregar(juego) {
    // TEMPORAL: Martín lo reemplaza por el carrito real
    alert(`"${juego.nombre}" agregado al carrito.`);
  }

  return (
    <div className="container py-4">
      <h1 className="mb-2">Ofertas</h1>
      <p className="text-secondary mb-4">Juegos con precio rebajado por tiempo limitado.</p>

      {ofertas.length === 0 ? (
        <p className="text-secondary">Por ahora no hay ofertas disponibles.</p>
      ) : (
        <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-4">
          {ofertas.map((juego) => (
            <div className="col" key={juego.id}>
              <TarjetaJuego juego={juego} onAgregar={manejarAgregar} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
