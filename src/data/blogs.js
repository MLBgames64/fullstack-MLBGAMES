// Artículos de ejemplo del blog (datos simulados, solo lectura).
const BLOGS = [
  {
    id: 1,
    titulo: "Elden Ring: consejos para tus primeras horas",
    resumen: "Cómo sobrevivir al inicio de las Tierras Intermedias sin frustrarte.",
    fecha: "2026-10-05",
    autor: "Equipo MLB Games",
    imagen: "/img/EldenRing.jpg",
    contenido: [
      "Elden Ring puede sentirse abrumador al comienzo: hay un mapa enorme, muchos enemigos y casi ninguna explicación.",
      "Un buen consejo es explorar con calma. Si un jefe te parece imposible, vuelve más tarde: el mundo abierto te deja ir a otras zonas y subir de nivel antes de intentarlo otra vez.",
      "Otra recomendación es probar distintas armas. No existe una sola forma correcta de jugar, y encontrar la que se acomoda a tu estilo cambia mucho la experiencia.",
    ],
  },
  {
    id: 2,
    titulo: "Cómo elegir tu próximo juego de aventura",
    resumen: "Tres preguntas simples para decidir qué comprar sin arrepentirte.",
    fecha: "2026-10-18",
    autor: "Equipo MLB Games",
    imagen: "/img/RDR2.jpg",
    contenido: [
      "Antes de comprar, pregúntate cuánto tiempo tienes. Hay aventuras de 15 horas y otras que pasan de las 60.",
      "Luego piensa en qué te gusta más: una historia muy guiada o un mundo para explorar a tu ritmo.",
      "Por último, revisa si el juego está en oferta. En nuestra sección de Ofertas encuentras varios títulos con descuento.",
    ],
  },
  {
    id: 3,
    titulo: "Qué mirar antes de comprar un juego online",
    resumen: "Stock, precio y descripción: lo básico para comprar con confianza.",
    fecha: "2026-11-02",
    autor: "Equipo MLB Games",
    imagen: "/img/BG3.jpg",
    contenido: [
      "Revisa siempre el stock disponible y la categoría del juego para saber si es lo que buscas.",
      "Compara el precio normal con el de oferta: a veces el descuento es mayor de lo que parece.",
      "Guarda tu boleta una vez que pagas. Desde tu compra puedes imprimirla o enviarla por correo.",
    ],
  },
];

export function leerBlogs() {
  return BLOGS;
}

export function obtenerBlog(id) {
  return BLOGS.find((blog) => blog.id === Number(id)) ?? null;
}
