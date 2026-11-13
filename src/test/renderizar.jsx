import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

// Helper para las pruebas: dibuja un componente en el DOM de la prueba.
// - Si el componente usa rutas (Link, useParams...), pasa { ruta: "/algo" } y lo envuelve en MemoryRouter.
// - La limpieza del DOM después de cada prueba la hace @testing-library/react sola.
export function renderizar(ui, { ruta = null } = {}) {
  if (ruta === null) {
    return render(ui);
  }
  return render(<MemoryRouter initialEntries={[ruta]}>{ui}</MemoryRouter>);
}