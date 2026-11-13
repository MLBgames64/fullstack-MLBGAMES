
import {
  VALORES_VACIOS,
  juegoAValores,
  valoresAJuego,
  validarProducto,
  hayErrores,
} from "./productoFormulario.js";

describe("Pruebas de productoFormulario", () => {
  const valoresValidos = {
    nombre: "  Minecraft  ",
    precio: "10000",
    precioOferta: "8000",
    stock: "5",
    categoria: "  Juegos  ",
    imagen: "  minecraft.jpg  ",
    descripcion: "  Juego de construcción  ",
  };

  describe("juegoAValores()", () => {
    it("debe devolver los valores vacíos cuando recibe null", () => {
      expect(juegoAValores(null)).toEqual(VALORES_VACIOS);
    });

    it("debe convertir los números de un juego a texto", () => {
      const juego = {
        nombre: "Minecraft",
        precio: 10000,
        precioOferta: 8000,
        stock: 5,
        categoria: "Juegos",
        imagen: "minecraft.jpg",
        descripcion: "Juego de construcción",
      };

      const resultado = juegoAValores(juego);

      expect(resultado.precio).toBe("10000");
      expect(resultado.precioOferta).toBe("8000");
      expect(resultado.stock).toBe("5");
    });

    it("debe convertir una oferta null en texto vacío", () => {
      const juego = {
        nombre: "Minecraft",
        precio: 10000,
        precioOferta: null,
        stock: 5,
        categoria: "Juegos",
        imagen: "minecraft.jpg",
        descripcion: "Juego",
      };

      expect(juegoAValores(juego).precioOferta).toBe("");
    });
  });

  describe("valoresAJuego()", () => {
    it("debe convertir los textos del formulario a los tipos correctos", () => {
      const resultado = valoresAJuego(valoresValidos);

      expect(resultado.nombre).toBe("Minecraft");
      expect(resultado.precio).toBe(10000);
      expect(resultado.precioOferta).toBe(8000);
      expect(resultado.stock).toBe(5);
      expect(resultado.categoria).toBe("Juegos");
      expect(resultado.imagen).toBe("minecraft.jpg");
      expect(resultado.descripcion).toBe("Juego de construcción");
    });

    it("debe convertir una oferta vacía en null", () => {
      const valores = {
        ...valoresValidos,
        precioOferta: "   ",
      };

      expect(valoresAJuego(valores).precioOferta).toBeNull();
    });
  });

  describe("validarProducto()", () => {
    it("debe aceptar un producto con todos sus campos válidos", () => {
      const errores = validarProducto(valoresValidos);

      expect(hayErrores(errores)).toBeFalse();
      expect(errores.precio).toBe("");
      expect(errores.precioOferta).toBe("");
      expect(errores.stock).toBe("");
    });

    it("debe detectar un precio vacío", () => {
      const errores = validarProducto({
        ...valoresValidos,
        precio: "",
      });

      expect(errores.precio).toBeTruthy();
    });

    it("debe rechazar un precio que no sea numérico", () => {
      const errores = validarProducto({
        ...valoresValidos,
        precio: "abc",
      });

      expect(errores.precio).toBe("El precio debe ser mayor que 0.");
    });

    it("debe rechazar un precio igual o menor que cero", () => {
      const errores = validarProducto({
        ...valoresValidos,
        precio: "0",
      });

      expect(errores.precio).toBe("El precio debe ser mayor que 0.");
    });

    it("debe aceptar una oferta vacía", () => {
      const errores = validarProducto({
        ...valoresValidos,
        precioOferta: "",
      });

      expect(errores.precioOferta).toBe("");
    });

    it("debe rechazar una oferta que no sea numérica", () => {
      const errores = validarProducto({
        ...valoresValidos,
        precioOferta: "abc",
      });

      expect(errores.precioOferta).toBe(
        "El precio de oferta debe ser mayor que 0."
      );
    });

    it("debe rechazar una oferta igual o menor que cero", () => {
      const errores = validarProducto({
        ...valoresValidos,
        precioOferta: "0",
      });

      expect(errores.precioOferta).toBe(
        "El precio de oferta debe ser mayor que 0."
      );
    });

    it("debe rechazar una oferta igual al precio normal", () => {
      const errores = validarProducto({
        ...valoresValidos,
        precioOferta: "10000",
      });

      expect(errores.precioOferta).toBe(
        "El precio de oferta debe ser menor que el precio normal."
      );
    });

    it("debe rechazar una oferta mayor al precio normal", () => {
      const errores = validarProducto({
        ...valoresValidos,
        precioOferta: "12000",
      });

      expect(errores.precioOferta).toBe(
        "El precio de oferta debe ser menor que el precio normal."
      );
    });

    it("debe detectar un stock vacío", () => {
      const errores = validarProducto({
        ...valoresValidos,
        stock: "",
      });

      expect(errores.stock).toBeTruthy();
    });

    it("debe rechazar un stock decimal", () => {
      const errores = validarProducto({
        ...valoresValidos,
        stock: "2.5",
      });

      expect(errores.stock).toBe(
        "El stock debe ser un número entero mayor o igual a 0."
      );
    });

    it("debe rechazar un stock negativo", () => {
      const errores = validarProducto({
        ...valoresValidos,
        stock: "-1",
      });

      expect(errores.stock).toBe(
        "El stock debe ser un número entero mayor o igual a 0."
      );
    });

    it("debe aceptar un stock igual a cero", () => {
      const errores = validarProducto({
        ...valoresValidos,
        stock: "0",
      });

      expect(errores.stock).toBe("");
    });

    it("debe detectar campos obligatorios vacíos", () => {
      const errores = validarProducto({
        nombre: "",
        precio: "10000",
        precioOferta: "",
        stock: "5",
        categoria: "",
        imagen: "",
        descripcion: "",
      });

      expect(errores.nombre).toBeTruthy();
      expect(errores.categoria).toBeTruthy();
      expect(errores.imagen).toBeTruthy();
      expect(errores.descripcion).toBeTruthy();
    });
  });

  describe("hayErrores()", () => {
    it("debe devolver true cuando existe un mensaje de error", () => {
      expect(
        hayErrores({
          nombre: "El nombre es obligatorio.",
          precio: "",
        })
      ).toBeTrue();
    });

    it("debe devolver false cuando no existen mensajes de error", () => {
      expect(
        hayErrores({
          nombre: "",
          precio: "",
          stock: "",
        })
      ).toBeFalse();
    });

    it("debe devolver false cuando recibe un objeto vacío", () => {
      expect(hayErrores({})).toBeFalse();
    });
  });
});
