import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CampoFormulario from "../components/CampoFormulario.jsx";
import CampoSelect from "../components/CampoSelect.jsx";
import ResumenCarrito from "../components/ResumenCarrito.jsx";
import { useCarrito } from "../context/useCarrito.js";
import { useSesion } from "../context/useSesion.js";
import { crearOrden } from "../data/ordenes.js";
import { obtenerComunas, obtenerNombresRegiones } from "../data/regiones.js";
import { formatearPrecio } from "../utils/formatearPrecio.js";
import { validarCorreo, validarNombre } from "../utils/validaciones.js";

function requerido(valor, mensaje) {
  return valor.trim() === "" ? mensaje : "";
}

// Devuelve { campo: mensajeDeError } para los campos obligatorios.
function validarFormulario(v) {
  return {
    nombre: validarNombre(v.nombre),
    apellidos: requerido(v.apellidos, "Los apellidos son obligatorios."),
    correo: validarCorreo(v.correo),
    calle: requerido(v.calle, "La calle es obligatoria."),
    region: requerido(v.region, "Selecciona una región."),
    comuna: requerido(v.comuna, "Selecciona una comuna."),
  };
}

export default function Checkout() {
  const { items, total, vaciar } = useCarrito();
  const { usuario } = useSesion();
  const navigate = useNavigate();

  // Si hay sesión iniciada, los datos del cliente se rellenan solos.
  const [valores, setValores] = useState(() => ({
    nombre: usuario?.nombre ?? "",
    apellidos: usuario?.apellidos ?? "",
    correo: usuario?.correo ?? "",
    calle: "",
    departamento: "",
    region: "",
    comuna: "",
    indicaciones: "",
  }));
  const [errores, setErrores] = useState({});
  const [simularError, setSimularError] = useState(false);

  // Las comunas disponibles se CALCULAN a partir de la región elegida (no son estado).
  const comunas = obtenerComunas(valores.region);

  function manejarCambio(evento) {
    const { name, value } = evento.target;
    // Si cambia la región, la comuna elegida ya no sirve: se limpia.
    const nuevos =
      name === "region" ? { ...valores, region: value, comuna: "" } : { ...valores, [name]: value };
    setValores(nuevos);
    if (errores[name]) setErrores({ ...errores, [name]: "" });
  }

  function manejarPago(evento) {
    evento.preventDefault();

    const nuevosErrores = validarFormulario(valores);
    setErrores(nuevosErrores);
    if (Object.values(nuevosErrores).some(Boolean)) return;

    // El pago es SIMULADO: el checkbox decide si sale bien o mal.
    const orden = crearOrden({
      estado: simularError ? "fallida" : "pagada",
      cliente: {
        nombre: valores.nombre.trim(),
        apellidos: valores.apellidos.trim(),
        correo: valores.correo.trim(),
      },
      direccion: {
        calle: valores.calle.trim(),
        departamento: valores.departamento.trim(),
        region: valores.region,
        comuna: valores.comuna,
        indicaciones: valores.indicaciones.trim(),
      },
      items,
      usuarioCorreo: usuario?.correo ?? null,
    });

    if (orden.estado === "pagada") {
      vaciar(); // compra exitosa: el carrito se vacía
      navigate("/pago-correcto");
    } else {
      navigate("/pago-error"); // compra fallida: el carrito se conserva para reintentar
    }
  }

  if (items.length === 0) {
    return (
      <div className="container py-4 text-center">
        <h1 className="mb-3">Checkout</h1>
        <p className="text-secondary">No tienes productos en el carrito.</p>
        <Link to="/productos" className="btn btn-primary">
          Ir a productos
        </Link>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <div className="row justify-content-center">
        <div className="col-12 col-lg-10 col-xl-8">
          <div className="card bg-dark text-light border-secondary">
            <div className="card-body p-4">
              <div className="d-flex flex-column flex-sm-row justify-content-between align-items-sm-start gap-2 mb-3">
                <div>
                  <h1 className="h3 mb-1">Carrito de compra</h1>
                  <p className="text-secondary mb-0">Completa la siguiente información</p>
                </div>
                <span className="badge bg-primary fs-6 align-self-start">
                  Total a pagar: {formatearPrecio(total)}
                </span>
              </div>

              <ResumenCarrito items={items} total={total} />

              <form onSubmit={manejarPago} noValidate className="mt-4">
                <h2 className="h5">Información del cliente</h2>
                <div className="row">
                  <div className="col-12 col-md-6">
                    <CampoFormulario
                      id="nombre"
                      etiqueta="Nombre"
                      valor={valores.nombre}
                      onChange={manejarCambio}
                      error={errores.nombre}
                      obligatorio
                    />
                  </div>
                  <div className="col-12 col-md-6">
                    <CampoFormulario
                      id="apellidos"
                      etiqueta="Apellidos"
                      valor={valores.apellidos}
                      onChange={manejarCambio}
                      error={errores.apellidos}
                      obligatorio
                    />
                  </div>
                </div>
                <CampoFormulario
                  id="correo"
                  etiqueta="Correo"
                  tipo="email"
                  valor={valores.correo}
                  onChange={manejarCambio}
                  error={errores.correo}
                  obligatorio
                />

                <h2 className="h5 mt-3">Dirección de entrega de los productos</h2>
                <div className="row">
                  <div className="col-12 col-md-8">
                    <CampoFormulario
                      id="calle"
                      etiqueta="Calle"
                      valor={valores.calle}
                      onChange={manejarCambio}
                      error={errores.calle}
                      obligatorio
                    />
                  </div>
                  <div className="col-12 col-md-4">
                    <CampoFormulario
                      id="departamento"
                      etiqueta="Departamento (opcional)"
                      valor={valores.departamento}
                      onChange={manejarCambio}
                      placeholder="Ej: 603"
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-12 col-md-6">
                    <CampoSelect
                      id="region"
                      etiqueta="Región"
                      valor={valores.region}
                      onChange={manejarCambio}
                      opciones={obtenerNombresRegiones()}
                      placeholder="Selecciona una región"
                      error={errores.region}
                      obligatorio
                    />
                  </div>
                  <div className="col-12 col-md-6">
                    <CampoSelect
                      id="comuna"
                      etiqueta="Comuna"
                      valor={valores.comuna}
                      onChange={manejarCambio}
                      opciones={comunas}
                      placeholder="Selecciona una comuna"
                      error={errores.comuna}
                      obligatorio
                      deshabilitado={comunas.length === 0}
                    />
                  </div>
                </div>
                <div className="mb-3">
                  <label htmlFor="indicaciones" className="form-label">
                    Indicaciones para la entrega (opcional)
                  </label>
                  <textarea
                    id="indicaciones"
                    name="indicaciones"
                    className="form-control"
                    rows={3}
                    value={valores.indicaciones}
                    onChange={manejarCambio}
                    placeholder="Ej: Entre calles, color del edificio, no tiene timbre."
                  />
                </div>

                <div className="form-check mb-3">
                  <input
                    id="simularError"
                    type="checkbox"
                    className="form-check-input"
                    checked={simularError}
                    onChange={(e) => setSimularError(e.target.checked)}
                  />
                  <label htmlFor="simularError" className="form-check-label">
                    Simular error de pago (modo demo)
                  </label>
                </div>

                <div className="d-grid d-md-flex justify-content-md-end">
                  <button type="submit" className="btn btn-success">
                    Pagar ahora {formatearPrecio(total)}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}