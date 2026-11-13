import FormularioContacto from "../components/FormularioContacto.jsx";
import { guardarMensajeContacto } from "../data/contactos.js";

export default function Contacto() {
  return (
    <div className="container py-4">
      <div className="row justify-content-center">
        <div className="col-12 col-md-10 col-lg-7">
          <h1 className="mb-2">Contáctanos</h1>
          <p className="text-secondary">Escríbenos y te responderemos lo antes posible.</p>
          {/* La página le pasa al formulario qué hacer con el mensaje: guardarlo */}
          <FormularioContacto onEnviar={guardarMensajeContacto} />
        </div>
      </div>
    </div>
  );
}
