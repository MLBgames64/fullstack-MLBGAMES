import { formatearPrecio } from "./formatearPrecio.js";

describe("formatearPrecio", () => {
  it("formatea un número con signo peso y separador de miles", () => {
    expect(formatearPrecio(19990)).toBe("$19.990");
  });
});