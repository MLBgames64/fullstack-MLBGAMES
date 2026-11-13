import { useState } from "react";
import AccesoRapido from "../../components/admin/AccesoRapido.jsx";
import TarjetaResumen from "../../components/admin/TarjetaResumen.jsx";
import { leerJuegos, obtenerCriticos } from "../../data/juegos.js";
import { leerOrdenes } from "../../data/ordenes.js";
import { leerUsuarios } from "../../data/usuarios.js";

export default function Dashboard() {
  // Estado: los números se leen una vez, al abrir el dashboard.
  const [resumen] = useState(() => {
    const ordenes = leerOrdenes();
    return {
      ordenes: ordenes.length,
      pagadas: ordenes.filter((orden) => orden.estado === "pagada").length,
      productos: leerJuegos().length,
      criticos: obtenerCriticos().length,
      usuarios: leerUsuarios().length,
    };
  });

  return (
    <div>
      <h1 className="h3">Dashboard</h1>
      <p className="text-secondary">Resumen de la actividad de la tienda.</p>

      <div className="row g-3 mb-4">
        <div className="col-12 col-md-4">
          <TarjetaResumen
            titulo="Órdenes"
            valor={resumen.ordenes}
            detalle={`${resumen.pagadas} pagadas`}
            color="primary"
          />
        </div>
        <div className="col-12 col-md-4">
          <TarjetaResumen
            titulo="Productos"
            valor={resumen.productos}
            detalle={`${resumen.criticos} con stock crítico`}
            color="success"
          />
        </div>
        <div className="col-12 col-md-4">
          <TarjetaResumen
            titulo="Usuarios"
            valor={resumen.usuarios}
            detalle="Cuentas registradas"
            color="warning"
          />
        </div>
      </div>

      <div className="row row-cols-1 row-cols-sm-2 row-cols-xl-4 g-3">
        <div className="col">
          <AccesoRapido a="/admin/ordenes" icono="🧾" titulo="Órdenes" descripcion="Revisa las compras y sus boletas." />
        </div>
        <div className="col">
          <AccesoRapido a="/admin/productos" icono="🎮" titulo="Productos" descripcion="Crea, edita y elimina juegos." />
        </div>
        <div className="col">
          <AccesoRapido a="/admin/usuarios" icono="👤" titulo="Usuarios" descripcion="Mira las cuentas y sus roles." />
        </div>
        <div className="col">
          <AccesoRapido a="/" icono="🏬" titulo="Tienda" descripcion="Vuelve a la tienda pública." />
        </div>
      </div>
    </div>
  );
}
