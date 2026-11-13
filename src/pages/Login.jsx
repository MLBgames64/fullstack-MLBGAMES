import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import CampoFormulario from "../components/CampoFormulario.jsx";
import { useSesion } from "../context/useSesion.js";
import { validarCorreo, validarObligatorio } from "../utils/validaciones.js";

export default function Login() {
  const { iniciarSesion } = useSesion();
  const navigate = useNavigate();
  const location = useLocation();

  // Mensaje de éxito que manda Registro al redirigir (puede no existir).
  const mensajeExito = location.state?.mensaje ?? "";

  const [valores, setValores] = useState({ correo: "", password: "" });
  const [errores, setErrores] = useState({});
  const [errorGeneral, setErrorGeneral] = useState("");

  function manejarCambio(evento) {
    const { name, value } = evento.target;
    setValores({ ...valores, [name]: value });
    if (errores[name]) setErrores({ ...errores, [name]: "" });
  }

  function manejarEnvio(evento) {
    evento.preventDefault();
    setErrorGeneral("");

    const nuevosErrores = {
      correo: validarCorreo(valores.correo),
      // En login solo exigimos que no esté vacía (la regla de fuerza es del registro).
      password: validarObligatorio(valores.password, "La contraseña"),
    };
    setErrores(nuevosErrores);
    if (nuevosErrores.correo || nuevosErrores.password) return;

    const resultado = iniciarSesion(valores.correo, valores.password);
    if (!resultado.ok) {
      setErrorGeneral(resultado.error);
      return;
    }

    // Admin al panel, cliente a la tienda.
    navigate(resultado.usuario.rol === "admin" ? "/admin" : "/");
  }

  return (
    <div className="container py-4">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-5">
          <div className="card bg-dark text-light border-secondary">
            <div className="card-body p-4">
              <h1 className="h3 mb-4">Iniciar sesión</h1>

              {mensajeExito && (
                <div className="alert alert-success" role="alert">
                  {mensajeExito}
                </div>
              )}
              {errorGeneral && (
                <div className="alert alert-danger" role="alert">
                  {errorGeneral}
                </div>
              )}

              <form onSubmit={manejarEnvio} noValidate>
                <CampoFormulario
                  id="correo"
                  etiqueta="Correo"
                  tipo="email"
                  valor={valores.correo}
                  onChange={manejarCambio}
                  error={errores.correo}
                  obligatorio
                  autoComplete="email"
                />
                <CampoFormulario
                  id="password"
                  etiqueta="Contraseña"
                  tipo="password"
                  valor={valores.password}
                  onChange={manejarCambio}
                  error={errores.password}
                  obligatorio
                  autoComplete="current-password"
                />
                <div className="d-grid mt-2">
                  <button type="submit" className="btn btn-primary">
                    Entrar
                  </button>
                </div>
              </form>

              <p className="mt-3 mb-0 text-secondary">
                ¿No tienes cuenta? <Link to="/registro">Crear cuenta</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}