import { useState } from "react";
import { Link } from "react-router-dom";
import TarjetaJuego from "../components/TarjetaJuego.jsx";
import { leerJuegos } from "../data/juegos.js";

export default function Home() {
  const [destacados] = useState(() => leerJuegos().slice(0, 6));

  function manejarAgregar(juego) {
    // TEMPORAL: Martín lo reemplaza por el carrito real
    alert(`"${juego.nombre}" agregado al carrito.`);
  }

  return (
    <div className="container py-4">
      <div className="text-center mb-4">
        <h1>Bienvenido a MLB Games</h1>
        <p className="lead">Tu tienda de videojuegos online.</p>
        <Link to="/productos" className="btn btn-primary">
          Ver todos los productos
        </Link>
      </div>

      <h2 className="mb-3">Juegos destacados</h2>
      <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-4">
        {destacados.map((juego) => (
          <div className="col" key={juego.id}>
            <TarjetaJuego juego={juego} onAgregar={manejarAgregar} />
          </div>
        ))}
      </div>
    </div>
  );
}
