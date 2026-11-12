# MLB Games
 
Tienda online de videojuegos desarrollada como proyecto frontend para la asignatura **Desarrollo Fullstack II (DSY1104)** de Duoc UC, correspondiente a la **Evaluación Parcial 2**.
 
Este proyecto es la evolución de la primera versión hecha con HTML, CSS y JavaScript puro (ver carpeta `html-original`), migrada ahora a **React** con diseño responsivo en **Bootstrap**.
 
## Tecnologías
 
| Tecnología | Uso |
|---|---|
| React + Vite | Construcción de la aplicación con componentes reutilizables |
| React Router | Navegación entre las vistas de la tienda y del panel admin |
| Bootstrap 5 | Diseño responsivo (grilla, navbar colapsable, tarjetas, formularios) |
| localStorage | Persistencia de datos en el navegador (simula una base de datos) |
| Jasmine + Karma | Pruebas unitarias de los componentes (en configuración) |
 
## Requisitos
 
- [Node.js](https://nodejs.org) versión LTS (incluye npm)
- [Git](https://git-scm.com)
## Instalación y ejecución
 
```bash
git clone https://github.com/MLBgames64/fullstack-MLBGAMES.git
cd fullstack-MLBGAMES
npm install
npm run dev
```
 
Luego abre la dirección que muestra la terminal (normalmente `http://localhost:5173`).
 
### Pruebas unitarias
 
```bash
npm test
```
 
> Disponible cuando termine la configuración de Karma y Jasmine (ver "Estado del proyecto").
 
## Estructura del proyecto
 
```
fullstack-MLBGAMES/
├── html-original/           Versión anterior en HTML, CSS y JS puro (respaldo)
├── public/
│   └── img/                 Imágenes de los juegos y fondo
├── scripts/
│   └── crear-paginas.mjs    Script que generó las páginas base (uso único)
├── src/
│   ├── components/          Componentes reutilizables (Header, Footer, TarjetaJuego)
│   ├── data/
│   │   └── juegos.js        "Base de datos" simulada + CRUD con localStorage
│   ├── pages/               Una vista por página de la tienda
│   │   └── admin/           Vistas del panel de administración
│   ├── styles/
│   │   └── tema.css         Estilos globales (fondo, colores, footer)
│   ├── utils/
│   │   └── formatearPrecio.js
│   ├── App.jsx              Definición de rutas
│   └── main.jsx             Punto de entrada
├── index.html
├── package.json
└── vite.config.js
```
 
## Rutas
 
**Tienda (pública)**
 
| Ruta | Vista |
|---|---|
| `/` | Home con juegos destacados |
| `/productos` | Listado de productos con buscador |
| `/productos/:id` | Detalle de un producto |
| `/categorias` | Productos separados por categoría |
| `/ofertas` | Productos en oferta |
| `/nosotros`, `/blog`, `/blog/:id`, `/contacto` | Páginas informativas |
| `/login`, `/registro` | Inicio de sesión y registro |
| `/carrito`, `/checkout` | Carrito y paso de pago |
| `/pago-correcto`, `/pago-error` | Resultado de la compra |
 
**Panel de administración**
 
| Ruta | Vista |
|---|---|
| `/admin` | Dashboard |
| `/admin/productos` | Listado de productos |
| `/admin/productos/nuevo` | Crear producto |
| `/admin/productos/:id/editar` | Editar producto |
| `/admin/usuarios` | Gestión de usuarios |
| `/admin/ordenes` | Órdenes y boletas |
 
## Datos y persistencia
 
El archivo `src/data/juegos.js` funciona como una base de datos simulada. Guarda los juegos en `localStorage` y expone funciones CRUD:
 
- `leerJuegos()`, `obtenerJuego(id)`: leer
- `crearJuego(datos)`: crear
- `actualizarJuego(id, cambios)`: actualizar
- `eliminarJuego(id)`: eliminar
- `obtenerOfertas()`, `obtenerPorCategoria()`, `obtenerCriticos()`: consultas útiles para las vistas
- `resetearJuegos()`: vuelve a los datos iniciales
Si los datos se ven raros durante el desarrollo, ejecuta `localStorage.clear()` en la consola del navegador y recarga la página.
 
## Estado del proyecto
 
- [x] Migración a React + Vite
- [x] Bootstrap y diseño responsivo base (navbar colapsable, grilla de tarjetas)
- [x] Navegación con React Router
- [x] Archivo de datos con CRUD y persistencia en localStorage
- [x] Home y Productos
- [ ] Detalle de producto, Categorías y Ofertas
- [ ] Login y Registro con validaciones
- [ ] Carrito, Checkout y vistas de pago correcto / con error
- [ ] Nosotros, Blog y Contacto
- [ ] Panel de administración
- [ ] Configuración de Karma y Jasmine
- [ ] 10 pruebas unitarias y reporte de cobertura
- [ ] Documento ERS (V2) y documento de cobertura de testing
## Equipo
 
| Integrante | Responsabilidad |
|---|---|
| Basti (`Bastincito-H`) | Base del proyecto, datos y CRUD, Home, Productos, Detalle, Categorías, Ofertas |
| Martín Valdés (`MaValdesN`) | Login, Registro, Carrito, Checkout, vistas de pago, documento ERS |
| Luis Romero (`Luis-romero5212`) | Panel admin, Nosotros, Blog, Contacto, configuración de pruebas, documento de cobertura |
 
## Flujo de trabajo con Git
 
- Cada integrante trabaja en su propia rama (`feat/basti-tienda`, `feat/martin-compra`, `feat/luis-admin`).
- No se hacen commits directos a `main`: los cambios se integran con Pull Request.
- Commits pequeños y con mensajes descriptivos (por ejemplo, `feat: carrito suma el total`).
- Cada integrante edita solo los archivos de su responsabilidad para evitar conflictos.
