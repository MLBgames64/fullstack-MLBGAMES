import { useState } from "react";
import TarjetaJuego from "../components/TarjetaJuego.jsx";
import { leerJuegos } from "../data/juegos.js";

export default function Productos() {
  const [juegos] = useState(() => leerJuegos());
  const [busqueda, setBusqueda] = useState("");

  const filtrados = juegos.filter((juego) =>
    juego.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  function manejarAgregar(juego) {
    // TEMPORAL: Martín lo reemplaza por el carrito real
    alert(`"${juego.nombre}" agregado al carrito.`);
  }

  return (
    <div className="container py-4">
      <h1 className="mb-4">Productos</h1>

      <input
        type="search"
        className="form-control mb-4"
        placeholder="Buscar juego..."
        aria-label="Buscar juego"
        value={busqueda}
        onChange={(evento) => setBusqueda(evento.target.value)}
      />

      {filtrados.length === 0 ? (
        <p className="text-secondary">No encontramos juegos con ese nombre.</p>
      ) : (
        <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-4">
          {filtrados.map((juego) => (
            <div className="col" key={juego.id}>
              <TarjetaJuego juego={juego} onAgregar={manejarAgregar} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
