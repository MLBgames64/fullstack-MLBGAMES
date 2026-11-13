// Datos del equipo (edita los nombres si quieren poner el apellido de Basti).
const INTEGRANTES = [
  { nombre: "Basti", rol: "Base del proyecto, catálogo y productos" },
  { nombre: "Martín Valdés", rol: "Sesión, carrito, checkout y pagos" },
  { nombre: "Luis Romero", rol: "Panel de administración, pruebas y páginas informativas" },
];

export default function Nosotros() {
  return (
    <div className="container py-4">
      <h1 className="mb-3">Nosotros</h1>

      <section className="mb-4">
        <h2 className="h4">Nuestra tienda</h2>
        <p>
          MLB Games es una tienda online de videojuegos. Aquí puedes explorar el catálogo por
          categorías, aprovechar las ofertas, armar tu carrito y pagar de forma simulada.
        </p>
        <p className="mb-0">
          Es un proyecto académico de Desarrollo Fullstack II (DSY1104) de Duoc UC, hecho con
          React, React Router y Bootstrap.
        </p>
      </section>

      <section>
        <h2 className="h4 mb-3">El equipo</h2>
        <div className="row row-cols-1 row-cols-md-3 g-3">
          {INTEGRANTES.map((integrante) => (
            <div className="col" key={integrante.nombre}>
              <div className="card h-100 bg-dark text-light border-secondary">
                <div className="card-body">
                  <h3 className="h5">{integrante.nombre}</h3>
                  <p className="text-secondary mb-0">{integrante.rol}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
