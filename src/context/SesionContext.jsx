import { useState } from "react";
import { SesionCtx } from "./sesionContexto.js";
import {
  cerrarSesion as cerrarSesionDatos,
  iniciarSesion as iniciarSesionDatos,
  obtenerSesion,
  registrarUsuario,
} from "../data/usuarios.js";

export function SesionProvider({ children }) {
  // Estado: quién está logueado. Parte leyendo la sesión guardada en localStorage.
  const [usuario, setUsuario] = useState(() => obtenerSesion());

  function iniciarSesion(correo, password) {
    const resultado = iniciarSesionDatos(correo, password);
    if (resultado.ok) setUsuario(resultado.usuario);
    return resultado;
  }

  function registrar(datos) {
    // Registrar NO inicia sesión: después se redirige a /login.
    return registrarUsuario(datos);
  }

  function cerrarSesion() {
    cerrarSesionDatos();
    setUsuario(null);
  }

  const valor = { usuario, iniciarSesion, registrar, cerrarSesion };

  return <SesionCtx.Provider value={valor}>{children}</SesionCtx.Provider>;
}