// Convierte 19990 en "$19.990"
export function formatearPrecio(valor) {
  const numero = Number(valor);
  if (Number.isNaN(numero)) return "$0";
  return "$" + numero.toLocaleString("es-CL");
}
