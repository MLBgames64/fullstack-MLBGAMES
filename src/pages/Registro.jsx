import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CampoFormulario from "../components/CampoFormulario.jsx";
import { useSesion } from "../context/useSesion.js";
import {
  validarCorreo,
  validarNombre,
  validarObligatorio,
  validarPassword,
} from "../utils/validaciones.js";

const VALORES_INICIALES = {
  nombre: "",
  apellidos: "",
  correo: "",
  password: "",
  confirmar: "",
};

// Devuelve el mensaje de error de UN campo ("" si está bien).
function validarCampo(campo, valor, valores) {
  switch (campo) {
    case "nombre":
      return validarNombre(valor);
    case "apellidos":
      return validarObligatorio(valor, "Los apellidos");
    case "correo":
      return validarCorreo(valor);
    case "password":
      return validarPassword(valor);
    case "confirmar":
      return (
        validarObligatorio(valor, "La confirmación") ||
        (valor !== valores.password ? "Las contraseñas no coinciden." : "")
      );
    default:
      return "";
  }
}

export default function Registro() {
  const { registrar } = useSesion();
  const navigate = useNavigate();

  // Estado del formulario: lo que el usuario escribe, los errores y el error general.
  const [valores, setValores] = useState(VALORES_INICIALES);
  const [errores, setErrores] = useState({});
  const [errorGeneral, setErrorGeneral] = useState("");

  function manejarCambio(evento) {
    const { name, value } = evento.target;
    const nuevos = { ...valores, [name]: value };
    setValores(nuevos);

    // Si ese campo ya tenía error, lo revalidamos mientras el usuario corrige.
    if (errores[name]) {
      setErrores({ ...errores, [name]: validarCampo(name, value, nuevos) });
    }
  }

  function manejarEnvio(evento) {
    evento.preventDefault();
    setErrorGeneral("");

    const nuevosErrores = {};
    for (const campo of Object.keys(VALORES_INICIALES)) {
      const mensaje = validarCampo(campo, valores[campo], valores);
      if (mensaje) nuevosErrores[campo] = mensaje;
    }
    setErrores(nuevosErrores);
    if (Object.keys(nuevosErrores).length > 0) return;

    const resultado = registrar({
      nombre: valores.nombre,
      apellidos: valores.apellidos,
      correo: valores.correo,
      password: valores.password,
    });

    if (!resultado.ok) {
      setErrorGeneral(resultado.error);
      return;
    }

    // Registro OK: vamos al login con un mensaje de éxito.
    navigate("/login", {
      state: { mensaje: "Cuenta creada con éxito. Ahora puedes iniciar sesión." },
    });
  }

  return (
    <div className="container py-4">
      <div className="row justify-content-center">
        <div className="col-12 col-md-10 col-lg-6">
          <div className="card bg-dark text-light border-secondary">
            <div className="card-body p-4">
              <h1 className="h3 mb-4">Crear cuenta</h1>

              {errorGeneral && (
                <div className="alert alert-danger" role="alert">
                  {errorGeneral}
                </div>
              )}

              <form onSubmit={manejarEnvio} noValidate>
                <div className="row">
                  <div className="col-12 col-md-6">
                    <CampoFormulario
                      id="nombre"
                      etiqueta="Nombre"
                      valor={valores.nombre}
                      onChange={manejarCambio}
                      error={errores.nombre}
                      obligatorio
                      autoComplete="given-name"
                    />
                  </div>
                  <div className="col-12 col-md-6">
                    <CampoFormulario
                      id="apellidos"
                      etiqueta="Apellidos"
                      valor={valores.apellidos}
                      onChange={manejarCambio}
                      error={errores.apellidos}
                      obligatorio
                      autoComplete="family-name"
                    />
                  </div>
                </div>

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
                  autoComplete="new-password"
                />

                <CampoFormulario
                  id="confirmar"
                  etiqueta="Confirmar contraseña"
                  tipo="password"
                  valor={valores.confirmar}
                  onChange={manejarCambio}
                  error={errores.confirmar}
                  obligatorio
                  autoComplete="new-password"
                />

                <div className="d-grid mt-2">
                  <button type="submit" className="btn btn-primary">
                    Crear cuenta
                  </button>
                </div>
              </form>

              <p className="mt-3 mb-0 text-secondary">
                ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}