// MOCK de localStorage para las pruebas.
// Reemplaza getItem/setItem/removeItem por "espías" que leen y escriben en un objeto en memoria.
// Así las pruebas no tocan el localStorage real y siempre parten con los datos que queremos.
// Úsalo DENTRO de un it() o beforeEach() (Jasmine quita los espías solo al terminar cada prueba).
//
// datosIniciales: { clave: valor }, donde valor se guarda como JSON.
// Devuelve el objeto "almacen" (clave -> texto) por si quieres revisar qué se guardó.
export function simularLocalStorage(datosIniciales = {}) {
  const almacen = {};
  Object.entries(datosIniciales).forEach(([clave, valor]) => {
    almacen[clave] = JSON.stringify(valor);
  });

  spyOn(Storage.prototype, "getItem").and.callFake((clave) =>
    clave in almacen ? almacen[clave] : null
  );
  spyOn(Storage.prototype, "setItem").and.callFake((clave, valor) => {
    almacen[clave] = String(valor);
  });
  spyOn(Storage.prototype, "removeItem").and.callFake((clave) => {
    delete almacen[clave];
  });

  return almacen;
}
