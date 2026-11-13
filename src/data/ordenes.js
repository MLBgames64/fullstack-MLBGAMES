// "Base de datos" simulada de órdenes de compra, guardada en localStorage.
const CLAVE_ORDENES = "mlbgames_ordenes";

function guardarOrdenes(ordenes) {
  try {
    localStorage.setItem(CLAVE_ORDENES, JSON.stringify(ordenes));
  } catch (error) {
    console.error("No se pudieron guardar las órdenes", error);
  }
}

export function leerOrdenes() {
  try {
    const guardado = localStorage.getItem(CLAVE_ORDENES);
    return guardado ? JSON.parse(guardado) : [];
  } catch (error) {
    console.error("No se pudieron leer las órdenes", error);
    return [];
  }
}

// Arma el número de orden: "#AAAAMMDD-001", "#AAAAMMDD-002", ...
// El contador se reinicia cada día.
function generarNumero(ordenes, fecha) {
  const aaaa = fecha.getFullYear();
  const mm = String(fecha.getMonth() + 1).padStart(2, "0");
  const dd = String(fecha.getDate()).padStart(2, "0");
  const prefijo = `#${aaaa}${mm}${dd}-`;

  const delDia = ordenes.filter((o) => o.numero.startsWith(prefijo)).length;
  return prefijo + String(delDia + 1).padStart(3, "0");
}

// datos = { estado, cliente, direccion, items, usuarioCorreo }
// Devuelve la orden ya creada y guardada.
export function crearOrden(datos) {
  const ordenes = leerOrdenes();
  const ahora = new Date();

  const items = (datos.items ?? []).map(({ id, nombre, precio, cantidad }) => ({
    id,
    nombre,
    precio,
    cantidad,
  }));

  const orden = {
    id: ordenes.reduce((max, o) => Math.max(max, o.id), 0) + 1,
    numero: generarNumero(ordenes, ahora),
    fecha: ahora.toISOString(),
    estado: datos.estado === "fallida" ? "fallida" : "pagada",
    cliente: datos.cliente,
    direccion: datos.direccion,
    items,
    // El total se calcula acá, así nunca queda inconsistente con los items.
    total: items.reduce((suma, item) => suma + item.precio * item.cantidad, 0),
    usuarioCorreo: datos.usuarioCorreo ?? null,
  };

  guardarOrdenes([...ordenes, orden]);
  return orden;
}

export function obtenerOrden(id) {
  return leerOrdenes().find((o) => o.id === Number(id)) ?? null;
}

// La última orden creada (la usan PagoCorrecto y PagoError).
export function obtenerUltimaOrden() {
  const ordenes = leerOrdenes();
  return ordenes.length > 0 ? ordenes[ordenes.length - 1] : null;
}