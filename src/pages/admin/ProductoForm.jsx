import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import CampoFormulario from "../../components/CampoFormulario.jsx";
import CampoTextarea from "../../components/CampoTextarea.jsx";
import { actualizarJuego, crearJuego, obtenerCategorias, obtenerJuego } from "../../data/juegos.js";
import { hayErrores, juegoAValores, validarProducto, valoresAJuego } from "../../utils/productoFormulario.js";

// Sirve para CREAR (/admin/productos/nuevo) y para EDITAR (/admin/productos/:id/editar).
// Si la ruta trae un :id, estamos editando.
export default function ProductoForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const esEdicion = id !== undefined;

  const [juegoExistente] = useState(() => (esEdicion ? obtenerJuego(id) : null));
  const [categorias] = useState(() => obtenerCategorias());

  // Estado del formulario controlado: cada input lee y escribe en "valores".
  const [valores, setValores] = useState(() => juegoAValores(juegoExistente));
  const [errores, setErrores] = useState({});

  if (esEdicion && !juegoExistente) {
    return (
      <div>
        <h1 className="h3">Producto no encontrado</h1>
        <p className="text-secondary">No existe un producto con el id {id}.</p>
        <Link to="/admin/productos" className="btn btn-primary">
          Volver a productos
        </Link>
      </div>
    );
  }

  function manejarCambio(evento) {
    const { name, value } = evento.target;
    const nuevosValores = { ...valores, [name]: value };
    setValores(nuevosValores);
    // Si el campo tenía error, lo revisamos de nuevo para que el mensaje desaparezca al corregirlo.
    if (errores[name]) {
      setErrores({ ...errores, [name]: validarProducto(nuevosValores)[name] });
    }
  }

  function manejarEnvio(evento) {
    evento.preventDefault();

    const nuevosErrores = validarProducto(valores);
    setErrores(nuevosErrores);
    if (hayErrores(nuevosErrores)) return;

    const datos = valoresAJuego(valores);
    if (esEdicion) {
      actualizarJuego(id, datos);
    } else {
      crearJuego(datos);
    }
    navigate("/admin/productos");
  }

  return (
    <div>
      <h1 className="h3 mb-4">{esEdicion ? "Editar producto" : "Nuevo producto"}</h1>

      <form onSubmit={manejarEnvio} noValidate className="col-12 col-lg-8 col-xl-6 p-0">
        <CampoFormulario id="nombre" etiqueta="Nombre" valor={valores.nombre} onChange={manejarCambio} error={errores.nombre} obligatorio />

        <div className="row">
          <div className="col-12 col-sm-6">
            <CampoFormulario id="precio" etiqueta="Precio (CLP)" tipo="number" min="0" valor={valores.precio} onChange={manejarCambio} error={errores.precio} obligatorio />
          </div>
          <div className="col-12 col-sm-6">
            <CampoFormulario id="precioOferta" etiqueta="Precio de oferta (opcional)" tipo="number" min="0" valor={valores.precioOferta} onChange={manejarCambio} error={errores.precioOferta} />
          </div>
        </div>

        <div className="row">
          <div className="col-12 col-sm-6">
            <CampoFormulario id="stock" etiqueta="Stock" tipo="number" min="0" valor={valores.stock} onChange={manejarCambio} error={errores.stock} obligatorio />
          </div>
          <div className="col-12 col-sm-6">
            <CampoFormulario id="categoria" etiqueta="Categoría" list="lista-categorias" valor={valores.categoria} onChange={manejarCambio} error={errores.categoria} obligatorio />
            <datalist id="lista-categorias">
              {categorias.map((categoria) => (
                <option key={categoria} value={categoria} />
              ))}
            </datalist>
          </div>
        </div>

        <CampoFormulario id="imagen" etiqueta="Imagen (ruta, ej: /img/GTA_4.jpg)" valor={valores.imagen} onChange={manejarCambio} error={errores.imagen} obligatorio />
        <CampoTextarea id="descripcion" etiqueta="Descripción" valor={valores.descripcion} onChange={manejarCambio} error={errores.descripcion} obligatorio />

        <div className="d-flex gap-2">
          <button type="submit" className="btn btn-primary">
            {esEdicion ? "Guardar cambios" : "Crear producto"}
          </button>
          <Link to="/admin/productos" className="btn btn-outline-light">
            Cancelar
          </Link>
        </div>
      </form>
    </div>
  );
}
