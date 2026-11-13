import { Navigate } from "react-router-dom";
import { useSesion } from "../context/useSesion.js";

// Guardia de rutas: solo deja pasar a un usuario con sesión y rol "admin".
// Si no cumple, lo manda a /login.
export default function RutaAdmin({ children }) {
  const { usuario } = useSesion();

  if (!usuario || usuario.rol !== "admin") {
    return <Navigate to="/login" replace />;
  }

  return children;
}
