import { fireEvent } from "@testing-library/react";
import FormularioContacto from "./FormularioContacto.jsx";
import { renderizar } from "../test/renderizar.jsx";

describe("FormularioContacto", () => {
  it("con datos inválidos muestra errores y con datos válidos muestra éxito", () => {
    // ESPÍA: una función falsa que anota si la llamaron y con qué datos
    const espiaEnviar = jasmine.createSpy("onEnviar");
    const { container } = renderizar(<FormularioContacto onEnviar={espiaEnviar} />);
    const formulario = container.querySelector("form");

    // 1) Enviar vacío: aparecen los 3 errores, no hay éxito y el espía NO fue llamado
    fireEvent.submit(formulario);
    expect(container.querySelectorAll(".invalid-feedback").length).toBe(3);
    expect(container.querySelector(".alert-success")).toBeNull();
    expect(espiaEnviar).not.toHaveBeenCalled();

    // 2) Escribir datos válidos y enviar: aparece el éxito y el espía fue llamado con los datos
    fireEvent.change(container.querySelector("#nombre"), { target: { value: "Luis Romero" } });
    fireEvent.change(container.querySelector("#correo"), { target: { value: "luis@duocuc.cl" } });
    fireEvent.change(container.querySelector("#mensaje"), { target: { value: "Hola, tengo una consulta." } });
    fireEvent.submit(formulario);

    expect(container.querySelector(".alert-success")).not.toBeNull();
    expect(container.querySelectorAll(".invalid-feedback").length).toBe(0);
    expect(espiaEnviar).toHaveBeenCalledOnceWith({
      nombre: "Luis Romero",
      correo: "luis@duocuc.cl",
      mensaje: "Hola, tengo una consulta.",
    });
  });
});
