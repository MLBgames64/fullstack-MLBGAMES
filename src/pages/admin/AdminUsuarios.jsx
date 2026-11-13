import { useState } from "react";
import { leerUsuarios } from "../../data/usuarios.js";

export default function AdminUsuarios() {
  // Copiamos solo los campos que se pueden mostrar: la contraseña NUNCA pasa a la pantalla.
  const [usuarios] = useState(() =>
    leerUsuarios().map((usuario) => ({
      id: usuario.id,
      nombre: usuario.nombre,
      apellidos: usuario.apellidos,
      correo: usuario.correo,
      rol: usuario.rol,
      fechaRegistro: usuario.fechaRegistro,
    }))
  );

  return (
    <div>
      <h1 className="h3 mb-4">Usuarios</h1>

      <div className="table-responsive">
        <table className="table table-dark table-hover align-middle">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Correo</th>
              <th>Rol</th>
              <th>Fecha de registro</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((usuario) => (
              <tr key={usuario.id}>
                <td>
                  {usuario.nombre} {usuario.apellidos}
                </td>
                <td>{usuario.correo}</td>
                <td>
                  <span className={`badge ${usuario.rol === "admin" ? "bg-warning text-dark" : "bg-secondary"}`}>
                    {usuario.rol}
                  </span>
                </td>
                <td>{new Date(usuario.fechaRegistro).toLocaleDateString("es-CL")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
