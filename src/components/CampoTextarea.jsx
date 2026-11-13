// Igual que CampoFormulario pero para textos largos (<textarea>).
export default function CampoTextarea({
  id,
  etiqueta,
  valor,
  onChange,
  error = "",
  obligatorio = false,
  filas = 4,
  ...resto
}) {
  return (
    <div className="mb-3">
      <label htmlFor={id} className="form-label">
        {etiqueta}
        {obligatorio && <span className="text-danger"> *</span>}
      </label>
      <textarea
        id={id}
        name={id}
        rows={filas}
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
