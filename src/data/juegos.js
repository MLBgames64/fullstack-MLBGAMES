// Fuente de datos simulada (hace de "base de datos") + CRUD con localStorage.
const CLAVE_STORAGE = "mlbgames_juegos";

const JUEGOS_INICIALES = [
  {
    id: 1,
    nombre: "Grand Theft Auto IV",
    precio: 19990,
    precioOferta: null,
    imagen: "/img/GTA_4.jpg",
    categoria: "Acción",
    stock: 12,
    descripcion: "Acompaña a Niko Bellic en su historia por Liberty City.",
  },
  {
    id: 2,
    nombre: "Red Dead Redemption 2",
    precio: 39990,
    precioOferta: 29990,
    imagen: "/img/RDR2.jpg",
    categoria: "Aventura",
    stock: 8,
    descripcion: "Vive el ocaso del Viejo Oeste junto a Arthur Morgan y la banda de Van der Linde.",
  },
  {
    id: 3,
    nombre: "Elden Ring",
    precio: 45000,
    precioOferta: null,
    imagen: "/img/EldenRing.jpg",
    categoria: "RPG",
    stock: 3,
    descripcion: "RPG de acción en un enorme mundo abierto: las Tierras Intermedias.",
  },
  {
    id: 4,
    nombre: "God of War",
    precio: 29990,
    precioOferta: null,
    imagen: "/img/GodOfWar.jpg",
    categoria: "Acción",
    stock: 15,
    descripcion: "Kratos y su hijo Atreus se adentran en el mundo de la mitología nórdica.",
  },
  {
    id: 5,
    nombre: "The Last of Us Part II",
    precio: 34990,
    precioOferta: 24990,
    imagen: "/img/TLOU2.jpg",
    categoria: "Aventura",
    stock: 6,
    descripcion: "Una historia postapocalíptica protagonizada por Ellie.",
  },
  {
    id: 6,
    nombre: "Baldur's Gate 3",
    precio: 49990,
    precioOferta: null,
    imagen: "/img/BG3.jpg",
    categoria: "RPG",
    stock: 4,
    descripcion: "RPG por turnos basado en Dungeons & Dragons, con decisiones que cambian la historia.",
  },
];

function copiar(objeto) {
  return JSON.parse(JSON.stringify(objeto));
}

function guardar(juegos) {
  try {
    localStorage.setItem(CLAVE_STORAGE, JSON.stringify(juegos));
  } catch (error) {
    console.error("No se pudo guardar en localStorage", error);
  }
}

// ---------- R: Read (leer) ----------
export function leerJuegos() {
  try {
    const guardado = localStorage.getItem(CLAVE_STORAGE);
    if (guardado) {
      const datos = JSON.parse(guardado);
      if (Array.isArray(datos)) return datos;
    }
  } catch (error) {
    console.error("No se pudo leer localStorage, se usan los datos iniciales", error);
  }
  const iniciales = copiar(JUEGOS_INICIALES);
  guardar(iniciales);
  return iniciales;
}

export function obtenerJuego(id) {
  return leerJuegos().find((juego) => juego.id === Number(id)) ?? null;
}

export function obtenerCategorias() {
  return [...new Set(leerJuegos().map((juego) => juego.categoria))];
}

export function obtenerPorCategoria(categoria) {
  return leerJuegos().filter((juego) => juego.categoria === categoria);
}

export function obtenerOfertas() {
  return leerJuegos().filter(
    (juego) => juego.precioOferta !== null && juego.precioOferta !== undefined
  );
}

// "Productos críticos" del admin: stock bajo
export function obtenerCriticos(limite = 5) {
  return leerJuegos().filter((juego) => juego.stock <= limite);
}

// ---------- C: Create (crear) ----------
export function crearJuego(datos) {
  const juegos = leerJuegos();
  const nuevoId = juegos.length ? Math.max(...juegos.map((j) => j.id)) + 1 : 1;
  const nuevo = {
    precioOferta: null,
    stock: 0,
    categoria: "Sin categoría",
    descripcion: "",
    imagen: "",
    ...datos,
    id: nuevoId,
  };
  juegos.push(nuevo);
  guardar(juegos);
  return nuevo;
}

// ---------- U: Update (actualizar) ----------
export function actualizarJuego(id, cambios) {
  const juegos = leerJuegos();
  const posicion = juegos.findIndex((juego) => juego.id === Number(id));
  if (posicion === -1) return null;

  juegos[posicion] = { ...juegos[posicion], ...cambios, id: juegos[posicion].id };
  guardar(juegos);
  return juegos[posicion];
}

// ---------- D: Delete (eliminar) ----------
export function eliminarJuego(id) {
  const juegos = leerJuegos();
  const restantes = juegos.filter((juego) => juego.id !== Number(id));
  if (restantes.length === juegos.length) return false;
  guardar(restantes);
  return true;
}

// Vuelve a los datos de fábrica (útil para pruebas y para "arreglar" datos raros)
export function resetearJuegos() {
  const iniciales = copiar(JUEGOS_INICIALES);
  guardar(iniciales);
  return iniciales;
}
