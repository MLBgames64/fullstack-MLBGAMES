import { useContext } from "react";
import { SesionCtx } from "./sesionContexto.js";

// Hook personalizado: devuelve { usuario, iniciarSesion, registrar, cerrarSesion }.
export function useSesion() {
  const contexto = useContext(SesionCtx);
  if (!contexto) {
    throw new Error("useSesion debe usarse dentro de <SesionProvider>");
  }
  return contexto;
}