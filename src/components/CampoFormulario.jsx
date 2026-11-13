// Un campo de formulario: etiqueta + input + mensaje de error (solo si hay error).
export default function CampoFormulario({
  id,
  etiqueta,
  tipo = "text",
  valor,
  onChange,
  error = "",
  obligatorio = false,
  ...resto
}) {
  return (
    <div className="mb-3">
      <label htmlFor={id} className="form-label">
        {etiqueta}
        {obligatorio && <span className="text-danger"> *</span>}
      </label>
      <input
        id={id}
        name={id}
        type={tipo}
        className={`form-control${error ? " is-invalid" : ""}`}
        value={valor}
        onChange={onChange}
        aria-invalid={error ? "true" : "false"}
        {...resto}
      />
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
}