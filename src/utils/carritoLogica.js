// Lógica pura del carrito: recibe una lista de items y devuelve una lista NUEVA.
// No usa React, así se puede probar sola.
const CLAVE_CARRITO = "mlbgames_carrito";

export function leerCarrito() {
  try {
    const guardado = localStorage.getItem(CLAVE_CARRITO);
    if (guardado) {
      const datos = JSON.parse(guardado);
      if (Array.isArray(datos)) return datos;
    }
  } catch (error) {
    console.error("No se pudo leer el carrito", error);
  }
  return [];
}

export function guardarCarrito(items) {
  try {
    localStorage.setItem(CLAVE_CARRITO, JSON.stringify(items));
  } catch (error) {
    console.error("No se pudo guardar el carrito", error);
  }
}

// El precio que se cobra: el de oferta si existe, si no el normal.
export function precioEfectivo(juego) {
  return juego.precioOferta ?? juego.precio;
}

function stockDe(juego) {
  return Number.isFinite(juego.stock) ? juego.stock : Infinity;
}

export function agregarItem(items, juego, cantidad = 1) {
  const cantidadEntera = Math.floor(cantidad);
  if (cantidadEntera < 1) return items;

  const existente = items.find((item) => item.id === juego.id);
  const actual = existente ? existente.cantidad : 0;
  // Nunca superar el stock del juego.
  const nueva = Math.min(actual + cantidadEntera, stockDe(juego));
  if (nueva <= 0) return items;

  if (existente) {
    return items.map((item) =>
      item.id === juego.id ? { ...item, cantidad: nueva } : item
    );
  }
  return [
    ...items,
    {
      id: juego.id,
      nombre: juego.nombre,
      imagen: juego.imagen,
      precio: precioEfectivo(juego),
      cantidad: nueva,
    },
  ];
}

export function quitarItem(items, id) {
  return items.filter((item) => item.id !== id);
}

export function cambiarCantidadItem(items, id, cantidad, stock = Infinity) {
  const cantidadEntera = Math.floor(cantidad);
  if (!(cantidadEntera >= 1)) return quitarItem(items, id);
  return items.map((item) =>
    item.id === id
      ? { ...item, cantidad: Math.min(cantidadEntera, stock) }
      : item
  );
}

export function calcularTotal(items) {
  return items.reduce((suma, item) => suma + item.precio * item.cantidad, 0);
}

export function calcularCantidadTotal(items) {
  return items.reduce((suma, item) => suma + item.cantidad, 0);
}