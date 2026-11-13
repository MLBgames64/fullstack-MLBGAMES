import { useContext } from "react";
import { CarritoCtx } from "./carritoContexto.js";

// Hook: devuelve { items, agregar, quitar, cambiarCantidad, vaciar, total, cantidadTotal }.
export function useCarrito() {
  const contexto = useContext(CarritoCtx);
  if (!contexto) {
    throw new Error("useCarrito debe usarse dentro de <CarritoProvider>");
  }
  return contexto;
}