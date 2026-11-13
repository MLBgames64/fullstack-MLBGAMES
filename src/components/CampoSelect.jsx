// Un <select> con etiqueta y mensaje de error (solo si hay error).
export default function CampoSelect({
  id,
  etiqueta,
  valor,
  onChange,
  opciones,
  placeholder = "Selecciona una opción",
  error = "",
  obligatorio = false,
  deshabilitado = false,
}) {
  return (
    <div className="mb-3">
      <label htmlFor={id} className="form-label">
        {etiqueta}
        {obligatorio && <span className="text-danger"> *</span>}
      </label>
      <select
        id={id}
        name={id}
        className={`form-select${error ? " is-invalid" : ""}`}
        value={valor}
        onChange={onChange}
        disabled={deshabilitado}
      >
        <option value="">{placeholder}</option>
        {opciones.map((opcion) => (
          <option key={opcion} value={opcion}>
            {opcion}
          </option>
        ))}
      </select>
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
}