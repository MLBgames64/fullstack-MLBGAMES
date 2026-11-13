import { formatearPrecio } from "../utils/formatearPrecio.js";

// Tabla de solo lectura con los productos y el total. Sirve para Checkout
// y se puede reutilizar en las pantallas de pago.
export default function ResumenCarrito({ items, total, etiquetaTotal = "Total a pagar" }) {
  return (
    <div className="table-responsive">
      <table className="table table-dark align-middle mb-0">
        <thead>
          <tr>
            <th>Imagen</th>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Cantidad</th>
            <th>Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <td style={{ width: "80px" }}>
                {item.imagen && (
                  <img
                    src={item.imagen}
                    alt={item.nombre}
                    className="rounded"
                    style={{ width: "64px", height: "48px", objectFit: "cover" }}
                  />
                )}
              </td>
              <td>{item.nombre}</td>
              <td>{formatearPrecio(item.precio)}</td>
              <td>{item.cantidad}</td>
              <td>{formatearPrecio(item.precio * item.cantidad)}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <th colSpan={4} className="text-end">
              {etiquetaTotal}
            </th>
            <th>{formatearPrecio(total)}</th>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}