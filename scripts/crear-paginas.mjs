import { mkdirSync, writeFileSync, existsSync } from "node:fs";
import { dirname, basename } from "node:path";

const paginas = [
  ["Home", "Basti"],
  ["Productos", "Basti"],
  ["DetalleProducto", "Basti"],
  ["Categorias", "Basti"],
  ["Ofertas", "Basti"],
  ["Login", "Martin"],
  ["Registro", "Martin"],
  ["Carrito", "Martin"],
  ["Checkout", "Martin"],
  ["PagoCorrecto", "Martin"],
  ["PagoError", "Martin"],
  ["Nosotros", "Luis"],
  ["Blog", "Luis"],
  ["DetalleBlog", "Luis"],
  ["Contacto", "Luis"],
  ["admin/Dashboard", "Luis"],
  ["admin/AdminProductos", "Luis"],
  ["admin/ProductoForm", "Luis"],
  ["admin/AdminUsuarios", "Luis"],
  ["admin/AdminOrdenes", "Luis"],
];

for (const [ruta, dueno] of paginas) {
  const archivo = `src/pages/${ruta}.jsx`;
  if (existsSync(archivo)) {
    console.log(`Ya existe, se salta: ${archivo}`);
    continue;
  }
  const nombre = basename(ruta);
  mkdirSync(dirname(archivo), { recursive: true });
  writeFileSync(
    archivo,
    `export default function ${nombre}() {
  return (
    <div className="container py-4">
      <h1>${nombre}</h1>
      <p className="text-secondary">Pendiente - responsable: ${dueno}</p>
    </div>
  );
}
`
  );
  console.log(`Creado: ${archivo}`);
}
