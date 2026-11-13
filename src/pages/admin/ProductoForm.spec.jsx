import { fireEvent } from "@testing-library/react";
import ProductoForm from "./ProductoForm.jsx";
import { renderizar } from "../../test/renderizar.jsx";
import { simularLocalStorage } from "../../test/localStorageFalso.js";

describe("ProductoForm", () => {
  it("cambia su estado al escribir y muestra los errores solo al enviar datos inválidos", () => {
    // MOCK: localStorage falso, para no tocar el real ni guardar nada de verdad
    simularLocalStorage({ mlbgames_juegos: [] });

    const { container } = renderizar(<ProductoForm />, { ruta: "/admin/productos/nuevo" });
    const campoNombre = container.querySelector("#nombre");

    // 1) Al inicio no hay ningún mensaje de error
    expect(container.querySelectorAll(".invalid-feedback").length).toBe(0);

    // 2) Estado: al escribir en el input, el valor queda guardado en el estado del formulario
    fireEvent.change(campoNombre, { target: { value: "Zelda" } });
    expect(campoNombre.value).toBe("Zelda");

    // 3) Al enviar con campos vacíos aparecen los errores (todos menos el nombre, que ya está bien)
    fireEvent.submit(container.querySelector("form"));
    expect(container.querySelectorAll(".invalid-feedback").length).toBe(5);
    expect(container.querySelector("#precio").classList.contains("is-invalid")).toBeTrue();
    expect(campoNombre.classList.contains("is-invalid")).toBeFalse();

    // 4) Con datos inválidos no se guarda nada en el localStorage
    expect(Storage.prototype.setItem).not.toHaveBeenCalled();
  });
});
