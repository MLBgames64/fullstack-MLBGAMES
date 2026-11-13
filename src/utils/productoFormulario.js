import { validarObligatorio } from "./validaciones.js";

// Valores de un formulario en blanco. En un formulario todo se maneja como texto.
export const VALORES_VACIOS = {
  nombre: "",
  precio: "",
  precioOferta: "",
  stock: "",
  categoria: "",
  imagen: "",
  descripcion: "",
};

// Pasa un juego (con números) a los textos que muestra el formulario.
export function juegoAValores(juego) {
  if (!juego) return { ...VALORES_VACIOS };
  return {
    nombre: juego.nombre,
    precio: String(juego.precio),
    precioOferta: juego.precioOferta === null ? "" : String(juego.precioOferta),
    stock: String(juego.stock),
    categoria: juego.categoria,
    imagen: juego.imagen,
    descripcion: juego.descripcion,
  };
}

// Camino inverso: pasa los textos del formulario a un juego con los tipos correctos.
export function valoresAJuego(valores) {
  return {
    nombre: valores.nombre.trim(),
    precio: Number(valores.precio),
    precioOferta: valores.precioOferta.trim() === "" ? null : Number(valores.precioOferta),
    stock: Number(valores.stock),
    categoria: valores.categoria.trim(),
    imagen: valores.imagen.trim(),
    descripcion: valores.descripcion.trim(),
  };
}

function validarPrecio(valor) {
  const vacio = validarObligatorio(valor, "El precio");
  if (vacio) return vacio;
  if (Number.isNaN(Number(valor)) || Number(valor) <= 0) {
    return "El precio debe ser mayor que 0.";
  }
  return "";
}

// La oferta es opcional, pero si se escribe debe ser un número mayor que 0 y menor que el precio.
function validarPrecioOferta(valor, precio) {
  if (valor.trim() === "") return "";
  if (Number.isNaN(Number(valor)) || Number(valor) <= 0) {
    return "El precio de oferta debe ser mayor que 0.";
  }
  if (Number(valor) >= Number(precio)) {
    return "El precio de oferta debe ser menor que el precio normal.";
  }
  return "";
}

function validarStock(valor) {
  const vacio = validarObligatorio(valor, "El stock");
  if (vacio) return vacio;
  const numero = Number(valor);
  if (!Number.isInteger(numero) || numero < 0) {
    return "El stock debe ser un número entero mayor o igual a 0.";
  }
  return "";
}

// Devuelve un objeto con un mensaje por cada campo ("" si el campo está bien).
export function validarProducto(valores) {
  return {
    nombre: validarObligatorio(valores.nombre, "El nombre"),
    precio: validarPrecio(valores.precio),
    precioOferta: validarPrecioOferta(valores.precioOferta, valores.precio),
    stock: validarStock(valores.stock),
    categoria: validarObligatorio(valores.categoria, "La categoría"),
    imagen: validarObligatorio(valores.imagen, "La imagen"),
    descripcion: validarObligatorio(valores.descripcion, "La descripción"),
  };
}

// true si algún campo tiene mensaje de error.
export function hayErrores(errores) {
  return Object.values(errores).some((mensaje) => mensaje !== "");
}
