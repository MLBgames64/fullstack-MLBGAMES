
import {
  validarCorreo,
  validarNombre,
  validarObligatorio,
  validarPassword,
} from "../utils/validaciones.js";

const CLAVE_USUARIOS = "mlbgames_usuarios";
const CLAVE_SESION = "mlbgames_sesion";

// Admin de prueba que siempre existe.
const USUARIOS_INICIALES = [
  {
    id: 1,
    nombre: "Administrador",
    apellidos: "MLB Games",
    correo: "admin@duocuc.cl",
    password: "Admin123!",
    rol: "admin",
    fechaRegistro: "2026-01-01T00:00:00.000Z",
  },
];

function guardarUsuarios(usuarios) {
  try {
    localStorage.setItem(CLAVE_USUARIOS, JSON.stringify(usuarios));
  } catch (error) {
    console.error("No se pudieron guardar los usuarios", error);
  }
}

// Devuelve una copia del usuario SIN la contraseña (para la sesión y las respuestas).
function sinPassword(usuario) {
  const { password, ...resto } = usuario; // eslint-disable-line no-unused-vars
  return resto;
}

function normalizarCorreo(correo) {
  return String(correo ?? "").trim().toLowerCase();
}

export function leerUsuarios() {
  try {
    const guardado = localStorage.getItem(CLAVE_USUARIOS);
    if (guardado) return JSON.parse(guardado);
  } catch (error) {
    console.error("No se pudo leer localStorage, se usan los datos iniciales", error);
  }
  // Primera vez: sembramos el admin de prueba.
  guardarUsuarios(USUARIOS_INICIALES);
  return JSON.parse(JSON.stringify(USUARIOS_INICIALES));
}

export function registrarUsuario({ nombre, apellidos, correo, password }) {
  const error =
    validarNombre(nombre) ||
    validarObligatorio(apellidos, "Los apellidos") ||
    validarCorreo(correo) ||
    validarPassword(password);
  if (error) return { ok: false, error };

  const usuarios = leerUsuarios();
  const correoLimpio = normalizarCorreo(correo);

  if (usuarios.some((u) => u.correo === correoLimpio)) {
    return { ok: false, error: "Ya existe una cuenta con ese correo." };
  }

  const nuevo = {
    id: usuarios.reduce((max, u) => Math.max(max, u.id), 0) + 1,
    nombre: nombre.trim(),
    apellidos: apellidos.trim(),
    correo: correoLimpio,
    password,
    rol: "cliente",
    fechaRegistro: new Date().toISOString(),
  };

  guardarUsuarios([...usuarios, nuevo]);
  return { ok: true, usuario: sinPassword(nuevo) };
}

export function iniciarSesion(correo, password) {
  const correoLimpio = normalizarCorreo(correo);
  const usuario = leerUsuarios().find(
    (u) => u.correo === correoLimpio && u.password === password
  );

  if (!usuario) {
    return { ok: false, error: "Correo o contraseña incorrectos." };
  }

  const sesion = sinPassword(usuario);
  try {
    localStorage.setItem(CLAVE_SESION, JSON.stringify(sesion));
  } catch (error) {
    console.error("No se pudo guardar la sesión", error);
  }
  return { ok: true, usuario: sesion };
}

export function cerrarSesion() {
  try {
    localStorage.removeItem(CLAVE_SESION);
  } catch (error) {
    console.error("No se pudo cerrar la sesión", error);
  }
}

// Devuelve el usuario con sesión iniciada (sin contraseña) o null.
export function obtenerSesion() {
  try {
    const guardado = localStorage.getItem(CLAVE_SESION);
    return guardado ? JSON.parse(guardado) : null;
  } catch (error) {
    console.error("No se pudo leer la sesión", error);
    return null;
  }
}