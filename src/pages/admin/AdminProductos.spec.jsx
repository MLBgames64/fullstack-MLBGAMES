import AdminProductos from "./AdminProductos.jsx";
import { renderizar } from "../../test/renderizar.jsx";
import { simularLocalStorage } from "../../test/localStorageFalso.js";

describe("AdminProductos", () => {
  it("renderiza una fila por cada juego guardado", () => {
    // MOCK: localStorage falso con 3 juegos de prueba
    const juegosFalsos = [
      { id: 1, nombre: "Juego Uno", precio: 10000, precioOferta: null, imagen: "/img/a.jpg", categoria: "Acción", stock: 10, descripcion: "A" },
      { id: 2, nombre: "Juego Dos", precio: 20000, precioOferta: 15000, imagen: "/img/b.jpg", categoria: "RPG", stock: 2, descripcion: "B" },
      { id: 3, nombre: "Juego Tres", precio: 30000, precioOferta: null, imagen: "/img/c.jpg", categoria: "Aventura", stock: 7, descripcion: "C" },
    ];
    simularLocalStorage({ mlbgames_juegos: juegosFalsos });

    const { container } = renderizar(<AdminProductos />, { ruta: "/admin/productos" });

    const filas = container.querySelectorAll("tbody tr");
    expect(filas.length).toBe(3);
    expect(container.textContent).toContain("Juego Uno");
    expect(container.textContent).toContain("Juego Dos");
    expect(container.textContent).toContain("Juego Tres");
  });
});
