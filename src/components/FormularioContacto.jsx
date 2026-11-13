import { useState } from "react";
import { validarCorreo, validarObligatorio } from "../utils/validaciones.js";
import CampoFormulario from "./CampoFormulario.jsx";
import CampoTextarea from "./CampoTextarea.jsx";

const VALORES_VACIOS = { nombre: "", correo: "", mensaje: "" };

// Valida un campo: devuelve "" si está bien o el mensaje de error.
function validarCampo(nombre, valor) {
  if (nombre === "nombre") return validarObligatorio(valor, "El nombre");
  if (nombre === "correo") return validarCorreo(valor);
  return validarObligatorio(valor, "El mensaje");
}

// Formulario de contacto. Recibe por props la función onEnviar, que se llama
// solo cuando los datos son válidos (así se puede probar con un espía).
export default function FormularioContacto({ onEnviar }) {
  const [valores, setValores] = useState(VALORES_VACIOS);
  const [errores, setErrores] = useState({});
  const [enviado, setEnviado] = useState(false);

  function manejarCambio(evento) {
    const { name, value } = evento.target;
    setValores({ ...valores, [name]: value });
    setEnviado(false);
    // Validación en tiempo real, solo si el campo ya tenía un error.
    if (errores[name]) setErrores({ ...errores, [name]: validarCampo(name, value) });
  }

  function manejarEnvio(evento) {
    evento.preventDefault();

    const nuevosErrores = {
      nombre: validarCampo("nombre", valores.nombre),
      correo: validarCampo("correo", valores.correo),
      mensaje: validarCampo("mensaje", valores.mensaje),
    };
    setErrores(nuevosErrores);
    if (nuevosErrores.nombre || nuevosErrores.correo || nuevosErrores.mensaje) {
      setEnviado(false);
      return;
    }

    onEnviar({
      nombre: valores.nombre.trim(),
      correo: valores.correo.trim(),
      mensaje: valores.mensaje.trim(),
    });
    setValores(VALORES_VACIOS);
    setEnviado(true);
  }

  return (
    <form onSubmit={manejarEnvio} noValidate>
      {enviado && (
        <div className="alert alert-success" role="alert">
          Mensaje enviado correctamente. ¡Gracias por contactarnos!
        </div>
      )}

      <CampoFormulario id="nombre" etiqueta="Nombre completo" valor={valores.nombre} onChange={manejarCambio} error={errores.nombre} obligatorio maxLength={100} placeholder="Tu nombre completo" />
      <CampoFormulario id="correo" etiqueta="Correo electrónico" tipo="email" valor={valores.correo} onChange={manejarCambio} error={errores.correo} obligatorio maxLength={100} placeholder="ejemplo@gmail.com" />
      <CampoTextarea id="mensaje" etiqueta="Comentario / Mensaje" valor={valores.mensaje} onChange={manejarCambio} error={errores.mensaje} obligatorio filas={5} maxLength={500} placeholder="Escribe tu mensaje aquí..." />

      <button type="submit" className="btn btn-primary">
        Enviar mensaje
      </button>
    </form>
  );
}
