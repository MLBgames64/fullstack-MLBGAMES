import {
  leerJuegos,
  obtenerJuego,
  obtenerCategorias,
  obtenerPorCategoria,
  obtenerOfertas,
  obtenerCriticos,
  crearJuego,
  actualizarJuego,
  eliminarJuego,
} from "./juegos.js";
import { simularLocalStorage } from "../test/localStorageFalso.js";

describe("juegos.js - funciones de datos y CRUD", () => {
  const juegosPrueba = [
    {
      id: 1,
      nombre: "Juego Acción",
      precio: 19990,
      precioOferta: null,
      imagen: "/img/accion.jpg",
      categoria: "Acción",
      stock: 3,
      descripcion: "Juego de acción",
    },
    {
      id: 2,
      nombre: "Juego RPG",
      precio: 29990,
      precioOferta: 19990,
      imagen: "/img/rpg.jpg",
      categoria: "RPG",
      stock: 10,
      descripcion: "Juego RPG",
    },
  ];

  it("lee los juegos guardados y usa los datos iniciales si localStorage está vacío", () => {
    const almacen = simularLocalStorage();
    const juegos = leerJuegos();

    expect(juegos.length).toBe(6);
    expect(juegos[0].nombre).toBe("Grand Theft Auto IV");
    expect(Storage.prototype.setItem).toHaveBeenCalled();
    expect(JSON.parse(almacen.mlbgames_juegos)).toEqual(juegos);
  });

  it("busca un juego por su ID y devuelve null cuando no existe", () => {
    simularLocalStorage({ mlbgames_juegos: juegosPrueba });

    expect(obtenerJuego(2).nombre).toBe("Juego RPG");
    expect(obtenerJuego(999)).toBeNull();
  });

  it("crea un juego con un nuevo ID y lo persiste en localStorage", () => {
    const almacen = simularLocalStorage({ mlbgames_juegos: juegosPrueba });

    const nuevo = crearJuego({
      nombre: "Juego Aventura",
      precio: 25000,
      categoria: "Aventura",
    });

    expect(nuevo.id).toBe(3);
    expect(nuevo.nombre).toBe("Juego Aventura");
    expect(nuevo.precioOferta).toBeNull();
    expect(nuevo.stock).toBe(0);
    expect(JSON.parse(almacen.mlbgames_juegos).length).toBe(3);
  });

  it("actualiza los datos de un juego existente y no modifica un ID inexistente", () => {
    const almacen = simularLocalStorage({ mlbgames_juegos: juegosPrueba });

    const actualizado = actualizarJuego(1, { precio: 15000, stock: 8 });

    expect(actualizado.precio).toBe(15000);
    expect(actualizado.stock).toBe(8);
    expect(actualizado.id).toBe(1);
    expect(actualizarJuego(999, { precio: 1 })).toBeNull();
    expect(JSON.parse(almacen.mlbgames_juegos)[0].precio).toBe(15000);
  });

  it("elimina un juego existente y devuelve false si el ID no existe", () => {
    const almacen = simularLocalStorage({ mlbgames_juegos: juegosPrueba });

    expect(eliminarJuego(1)).toBeTrue();
    expect(eliminarJuego(999)).toBeFalse();
    expect(JSON.parse(almacen.mlbgames_juegos)).toEqual([juegosPrueba[1]]);
  });

  it("obtiene categorías, filtra por categoría, ofertas y stock crítico", () => {
    simularLocalStorage({ mlbgames_juegos: juegosPrueba });

    expect(obtenerCategorias()).toEqual(["Acción", "RPG"]);
    expect(obtenerPorCategoria("RPG").map((juego) => juego.id)).toEqual([2]);
    expect(obtenerOfertas().map((juego) => juego.id)).toEqual([2]);
    expect(obtenerCriticos(5).map((juego) => juego.id)).toEqual([1]);
  });
});
