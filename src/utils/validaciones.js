// Lista única de dominios permitidos. Contacto (Luis) también la importa de acá.
export const DOMINIOS_PERMITIDOS = [
  "@duocuc.cl",
  "@duoc.cl",
  "@profesor.duoc.cl",
  "@gmail.com",
];

const FORMATO_CORREO = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Devuelve "" si el valor está bien, o el mensaje de error si no.
export function validarObligatorio(valor, etiqueta) {
  if (!valor || valor.trim() === "") {
    return `${etiqueta} es obligatorio.`;
  }
  return "";
}

export function validarNombre(nombre) {
  const vacio = validarObligatorio(nombre, "El nombre");
  if (vacio) return vacio;
  if (nombre.trim().length < 2) {
    return "El nombre debe tener al menos 2 caracteres.";
  }
  return "";
}

export function validarCorreo(correo) {
  const vacio = validarObligatorio(correo, "El correo");
  if (vacio) return vacio;

  const limpio = correo.trim().toLowerCase();
  if (!FORMATO_CORREO.test(limpio)) {
    return "El correo no tiene un formato válido.";
  }

  const dominioValido = DOMINIOS_PERMITIDOS.some((dominio) =>
    limpio.endsWith(dominio)
  );
  if (!dominioValido) {
    return `Solo se permiten correos ${DOMINIOS_PERMITIDOS.slice(0, -1).join(", ")} o ${DOMINIOS_PERMITIDOS.at(-1)}.`;
  }
  return "";
}

// Para REGISTRO: obligatoria + mínimo 8 caracteres, con letra y número.
export function validarPassword(password) {
  const vacio = validarObligatorio(password, "La contraseña");
  if (vacio) return vacio;

  if (password.length < 8) {
    return "La contraseña debe tener al menos 8 caracteres.";
  }
  if (!/[A-Za-z]/.test(password) || !/\d/.test(password)) {
    return "La contraseña debe incluir al menos una letra y un número.";
  }
  return "";
}