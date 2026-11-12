// Devuelve el porcentaje de descuento (entero). Ej: 39990 -> 29990 = 25
export function calcularDescuento(precio, precioOferta) {
  if (precioOferta === null || precioOferta === undefined) return 0;

  const original = Number(precio);
  const oferta = Number(precioOferta);

  if (!original || original <= 0) return 0;
  if (Number.isNaN(oferta) || oferta < 0 || oferta >= original) return 0;

  return Math.round((1 - oferta / original) * 100);
}
