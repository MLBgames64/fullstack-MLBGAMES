
import { useEffect, useState, useContext } from "react";
import { CarritoCtx } from "./carritoContexto.js";
import { SesionCtx } from "./sesionContexto.js";
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

// Identifica qué usuario está conectado.
export function CarritoProvider({ children }) {
  const { usuario } = useContext(SesionCtx);
  const usuarioId = usuario?.id ?? "invitado";

  return (
    <CarritoInterno key={usuarioId} usuarioId={usuarioId}>
      {children}
    </CarritoInterno>
  );
}

// Maneja el carrito del usuario identificado.
function CarritoInterno({ children, usuarioId }) {
  const [items, setItems] = useState(() => leerCarrito(usuarioId));

  // Guarda los cambios en el carrito de este usuario.
  useEffect(() => {
    guardarCarrito(items, usuarioId);
  }, [items, usuarioId]);

  function agregar(juego, cantidad = 1) {
    setItems((anteriores) =>
      agregarItem(anteriores, juego, cantidad)
    );
  }

  function quitar(id) {
    setItems((anteriores) => quitarItem(anteriores, id));
  }

  function cambiarCantidad(id, cantidad) {
    const stock = obtenerJuego(id)?.stock ?? Infinity;

    setItems((anteriores) =>
      cambiarCantidadItem(anteriores, id, cantidad, stock)
    );
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

  return (
    <CarritoCtx.Provider value={valor}>
      {children}
    </CarritoCtx.Provider>
  );
}
