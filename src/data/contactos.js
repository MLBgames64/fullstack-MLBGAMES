// "Base de datos" simulada de los mensajes de contacto, guardada en localStorage.
const CLAVE_CONTACTOS = "mlbgames_contactos";

export function leerMensajesContacto() {
  try {
    const guardado = localStorage.getItem(CLAVE_CONTACTOS);
    return guardado ? JSON.parse(guardado) : [];
  } catch (error) {
    console.error("No se pudieron leer los mensajes de contacto", error);
    return [];
  }
}

export function guardarMensajeContacto({ nombre, correo, mensaje }) {
  const mensajes = leerMensajesContacto();
  const nuevo = {
    id: mensajes.reduce((max, m) => Math.max(max, m.id), 0) + 1,
    nombre,
    correo,
    mensaje,
    fecha: new Date().toISOString(),
  };
  try {
    localStorage.setItem(CLAVE_CONTACTOS, JSON.stringify([...mensajes, nuevo]));
  } catch (error) {
    console.error("No se pudo guardar el mensaje de contacto", error);
  }
  return nuevo;
}
