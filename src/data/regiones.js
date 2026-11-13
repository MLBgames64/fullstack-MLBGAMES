// Regiones y comunas de Chile (subconjunto para el proyecto).
export const REGIONES = [
  {
    nombre: "Región Metropolitana de Santiago",
    comunas: [
      "Cerrillos", "Las Condes", "La Florida", "Maipú", "Ñuñoa",
      "Providencia", "Pudahuel", "Puente Alto", "San Bernardo", "Santiago",
    ],
  },
  {
    nombre: "Región de Valparaíso",
    comunas: ["Concón", "Quilpué", "Valparaíso", "Villa Alemana", "Viña del Mar"],
  },
  {
    nombre: "Región del Biobío",
    comunas: ["Chiguayante", "Concepción", "Los Ángeles", "San Pedro de la Paz", "Talcahuano"],
  },
  {
    nombre: "Región de La Araucanía",
    comunas: ["Angol", "Padre Las Casas", "Pucón", "Temuco", "Villarrica"],
  },
];

export function obtenerNombresRegiones() {
  return REGIONES.map((region) => region.nombre);
}

// Devuelve las comunas de una región ([] si no existe o no hay región elegida).
export function obtenerComunas(nombreRegion) {
  return REGIONES.find((region) => region.nombre === nombreRegion)?.comunas ?? [];
}