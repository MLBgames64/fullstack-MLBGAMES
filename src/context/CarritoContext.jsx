import { useEffect, useState } from "react";
import { CarritoCtx } from "./carritoContexto.js";
import { obtenerJuego } from "../data/juegos.js";
import {
  agregarItem,
  calcularCantidadTotal,
  calcularTotal,
  cambiarCantidadItem,
  guardarCarrito,
  leerCarrito,
  quitarItem,
} from "../utils/carritoLogica.js";

export function CarritoProvider({ children }) {
  // Estado: la lista de items. Parte con lo que haya guardado en localStorage.
  const [items, setItems] = useState(() => leerCarrito());

  // Cada vez que cambian los items, se guardan en localStorage.
  useEffect(() => {
    guardarCarrito(items);
  }, [items]);

  function agregar(juego, cantidad = 1) {
    setItems((anteriores) => agregarItem(anteriores, juego, cantidad));
  }

  function quitar(id) {
    setItems((anteriores) => quitarItem(anteriores, id));
  }

  function cambiarCantidad(id, cantidad) {
    // El item no guarda el stock, así que lo consultamos en juegos.js.
    const stock = obtenerJuego(id)?.stock ?? Infinity;
    setItems((anteriores) => cambiarCantidadItem(anteriores, id, cantidad, stock));
  }

  function vaciar() {
    setItems([]);
  }

  const valor = {
    items,
    agregar,
    quitar,
    cambiarCantidad,
    vaciar,
    total: calcularTotal(items),
    cantidadTotal: calcularCantidadTotal(items),
  };

  return <CarritoCtx.Provider value={valor}>{children}</CarritoCtx.Provider>;
}