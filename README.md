# MLB Games

Tienda online de videojuegos desarrollada como proyecto frontend para la asignatura **Desarrollo Fullstack II (DSY1104)** de Duoc UC, correspondiente a la **Evaluación Parcial 2**.

Este proyecto representa la evolución de una primera versión desarrollada con HTML, CSS y JavaScript Vanilla, disponible en la carpeta `html-original`. La nueva versión fue migrada a **React**, incorporando componentes reutilizables, navegación mediante rutas, persistencia de datos y funcionalidades de administración.

---

## **Tecnologías utilizadas**

| Tecnología | Uso |
|---|---|
| React + Vite | Construcción de la aplicación mediante componentes reutilizables y entorno de desarrollo. |
| JavaScript | Implementación de la lógica y funcionalidades de la aplicación. |
| React Router | Navegación entre las distintas vistas de la tienda y del panel administrativo. |
| Bootstrap 5 | Diseño responsivo mediante grillas, navbar, tarjetas y formularios. |
| CSS3 | Definición de estilos personalizados y apariencia visual. |
| localStorage | Persistencia de información en el navegador, simulando una base de datos. |
| Jasmine | Definición de pruebas unitarias mediante bloques `describe()`, `it()` y `expect()`. |
| Karma | Ejecución automatizada de pruebas en Chrome y Chrome Headless. |
| Webpack | Procesamiento de archivos durante la ejecución de las pruebas. |
| Babel | Transformación de código JavaScript y JSX para el entorno de testing. |

---

## **Requisitos**

Para instalar y ejecutar el proyecto se necesita:

- [Node.js](https://nodejs.org/) en versión LTS.
- npm, incluido con Node.js.
- [Git](https://git-scm.com/) para clonar el repositorio.
- Google Chrome para ejecutar las pruebas unitarias.

---

## **Instalación y ejecución**

### **1. Clonar el repositorio**

```bash
git clone https://github.com/MLBgames64/fullstack-MLBGAMES.git
```

Este comando descarga una copia del repositorio desde GitHub al equipo local.

### **2. Ingresar a la carpeta del proyecto**

```bash
cd fullstack-MLBGAMES
```

Permite acceder al directorio donde se encuentra el código fuente y los archivos de configuración.

### **3. Instalar las dependencias**

```bash
npm install
```

Instala todas las dependencias definidas en `package.json`, necesarias para ejecutar, desarrollar y realizar pruebas en la aplicación.

### **4. Ejecutar el proyecto**

```bash
npm run dev
```

Inicia el servidor de desarrollo de Vite.

Una vez ejecutado, la terminal mostrará una dirección local para acceder a la aplicación, normalmente:

```text
http://localhost:5173
```

Vite permite visualizar los cambios realizados en el código durante el desarrollo sin tener que reconstruir manualmente toda la aplicación.

---

## **Comandos disponibles**

Los siguientes comandos permiten realizar las principales tareas de desarrollo, ejecución, pruebas y construcción del proyecto.

| Comando | Función |
|---|---|
| `npm install` | Instala las dependencias necesarias para el funcionamiento del proyecto. |
| `npm run dev` | Inicia el servidor local de desarrollo mediante Vite. |
| `npm test` | Ejecuta las pruebas unitarias utilizando Karma y Jasmine. |
| `npm run test:ci` | Ejecuta las pruebas en modo CI, utilizando Chrome Headless y generando el reporte de cobertura. |
| `npm run build` | Construye una versión optimizada de la aplicación para producción. |
| `npm run preview` | Permite visualizar localmente la versión construida del proyecto. |

### **Ejecutar pruebas en Windows PowerShell**

Para ejecutar las pruebas con la configuración de cobertura habilitada:

```powershell
$env:CI_MODE="true"
npm test
```

La variable `CI_MODE` permite activar la configuración correspondiente al entorno de pruebas y la instrumentación de cobertura.

### **Construir el proyecto para producción**

```bash
npm run build
```

Este comando utiliza Vite para generar una versión optimizada de la aplicación, preparada para su posterior despliegue.

Los archivos generados se almacenan normalmente en la carpeta `dist/`.

### **Previsualizar la versión de producción**

```bash
npm run preview
```

Permite iniciar un servidor local para revisar cómo se comporta la versión generada después de ejecutar el comando `npm run build`.

**Nota:** los comandos `test:ci`, `build` y `preview` deben estar definidos en `package.json` para poder ejecutarse.

---

## **Estructura del proyecto**

```text
fullstack-MLBGAMES/
├── html-original/           Versión anterior en HTML, CSS y JavaScript
├── public/
│   └── img/                 Imágenes de los juegos y fondo
├── scripts/
│   └── crear-paginas.mjs    Script que generó las páginas base
├── src/
│   ├── components/          Componentes reutilizables (Header, Footer, TarjetaJuego)
│   ├── data/
│   │   └── juegos.js        Datos simulados y operaciones CRUD
│   ├── pages/               Vistas principales de la tienda
│   │   └── admin/           Vistas del panel de administración
│   ├── styles/
│   │   └── tema.css         Estilos globales y personalizados
│   ├── test/                Herramientas auxiliares para pruebas
│   ├── utils/
│   │   └── formatearPrecio.js
│   ├── App.jsx              Definición de las rutas
│   └── main.jsx             Punto de entrada de React
├── index.html
├── package.json
├── vite.config.js
├── karma.conf.cjs           Configuración de Karma
└── README.md
```

### **Descripción de las carpetas principales**

- `html-original/`: contiene la primera versión del proyecto desarrollada con HTML, CSS y JavaScript Vanilla.
- `public/`: almacena recursos estáticos utilizados por la aplicación.
- `src/components/`: contiene componentes reutilizables de la interfaz.
- `src/data/`: contiene los datos simulados y las funciones para administrar los videojuegos.
- `src/pages/`: contiene las distintas vistas de la tienda.
- `src/pages/admin/`: contiene las vistas del panel administrativo.
- `src/styles/`: almacena los estilos globales y personalizados.
- `src/test/`: contiene herramientas auxiliares para facilitar las pruebas.
- `src/utils/`: contiene funciones auxiliares reutilizables.
- `App.jsx`: configura la navegación y las rutas principales.
- `main.jsx`: inicializa la aplicación React.

---

## **Rutas de la aplicación**

La aplicación se divide en dos áreas principales: la tienda pública y el panel de administración.

### **Tienda pública**

| Ruta | Vista |
|---|---|
| `/` | Página principal con videojuegos destacados. |
| `/productos` | Catálogo de videojuegos con buscador. |
| `/productos/:id` | Detalle de un producto específico. |
| `/categorias` | Productos organizados por categoría. |
| `/ofertas` | Listado de productos en oferta. |
| `/nosotros` | Información sobre la tienda. |
| `/blog` | Listado de publicaciones. |
| `/blog/:id` | Detalle de una publicación. |
| `/contacto` | Formulario de contacto. |
| `/login` | Inicio de sesión. |
| `/registro` | Registro de usuarios. |
| `/carrito` | Carrito de compras. |
| `/checkout` | Proceso de compra. |
| `/pago-correcto` | Resultado exitoso de la compra. |
| `/pago-error` | Resultado fallido de la compra. |

### **Panel de administración**

| Ruta | Vista |
|---|---|
| `/admin` | Dashboard administrativo. |
| `/admin/productos` | Listado y administración de productos. |
| `/admin/productos/nuevo` | Formulario para crear un producto. |
| `/admin/productos/:id/editar` | Formulario para editar un producto existente. |
| `/admin/usuarios` | Gestión de usuarios. |
| `/admin/ordenes` | Administración de órdenes y boletas. |

---

## **Funcionalidades principales**

### **Tienda online**

- Visualización dinámica del catálogo de videojuegos.
- Búsqueda de productos.
- Organización de productos por categorías.
- Visualización de detalles de cada videojuego.
- Identificación de productos en oferta.
- Navegación entre las distintas secciones de la tienda.

### **Usuarios**

- Registro de nuevos usuarios.
- Inicio de sesión.
- Validación de formularios.
- Gestión de información de usuarios.

### **Carrito y compras**

- Agregar videojuegos al carrito.
- Modificar cantidades de productos.
- Eliminar productos del carrito.
- Calcular subtotales y totales.
- Visualizar el resumen de compra.
- Proceso de checkout.
- Visualización de resultados de compra.

### **Panel administrativo**

- Dashboard con información administrativa.
- Consulta del catálogo de productos.
- Creación de nuevos productos.
- Edición de productos existentes.
- Eliminación de productos.
- Consulta y gestión de usuarios.
- Visualización y gestión de órdenes.

---

## **Datos y persistencia**

El archivo `src/data/juegos.js` funciona como una fuente de datos simulada para administrar el catálogo de videojuegos.

La información se almacena utilizando `localStorage`, lo que permite conservar los datos en el navegador entre distintas sesiones.

El módulo incorpora funciones para realizar operaciones CRUD:

| Función | Operación | Descripción |
|---|---|---|
| `leerJuegos()` | Read | Obtiene el listado completo de videojuegos. |
| `obtenerJuego(id)` | Read | Busca un videojuego mediante su identificador. |
| `crearJuego(datos)` | Create | Registra un nuevo videojuego. |
| `actualizarJuego(id, cambios)` | Update | Modifica la información de un videojuego existente. |
| `eliminarJuego(id)` | Delete | Elimina un videojuego del catálogo. |
| `obtenerOfertas()` | Read | Obtiene los videojuegos disponibles en oferta. |
| `obtenerPorCategoria()` | Read | Consulta videojuegos según su categoría. |
| `obtenerCriticos()` | Read | Obtiene los videojuegos según el criterio definido por la función. |
| `resetearJuegos()` | Reset | Restablece los datos iniciales del catálogo. |

### **Restablecimiento de datos**

Durante el desarrollo, si los datos almacenados presentan inconsistencias, se puede utilizar la consola del navegador para limpiar el almacenamiento local:

```javascript
localStorage.clear();
```

Este comando elimina todos los datos guardados por el sitio en `localStorage`, no solamente los videojuegos. Por eso, debe utilizarse con precaución.

---

## **Pruebas unitarias (Karma + Jasmine)**

El proyecto incorpora un entorno de pruebas automatizadas utilizando Jasmine y Karma.

Estas herramientas permiten comprobar el funcionamiento de funciones, validaciones y componentes específicos de la aplicación.

### **Herramientas utilizadas**

| Herramienta | Función |
|---|---|
| Jasmine | Permite definir pruebas y realizar validaciones mediante expectativas. |
| Karma | Ejecuta las pruebas automatizadas en el navegador. |
| Chrome Headless | Permite ejecutar pruebas sin abrir una ventana visible de Chrome. |
| Webpack | Procesa los archivos utilizados durante las pruebas. |
| Babel | Transforma JavaScript y JSX para el entorno de pruebas. |
| Istanbul | Instrumenta el código para calcular las métricas de cobertura. |

### **Organización de las pruebas**

Los archivos de pruebas utilizan las extensiones:

- `*.spec.js`
- `*.spec.jsx`

Se encuentran distribuidos dentro de `src/`, junto a los módulos y componentes que verifican.

### **Ejecutar pruebas**

Modo navegador:

```bash
npm test
```

Modo CI con cobertura en Windows PowerShell:

```powershell
$env:CI_MODE="true"
npm test
```

### **Resultados de la última ejecución registrada**

```text
Chrome Headless
Executed 32 of 32 SUCCESS

TOTAL: 32 SUCCESS
```

| Indicador | Resultado |
|---|---:|
| Pruebas ejecutadas | 32 |
| Pruebas aprobadas | 32 |
| Pruebas fallidas | 0 |

### **Cobertura de código**

La cobertura permite conocer qué partes del código fueron ejecutadas durante las pruebas.

| Métrica | Cobertura |
|---|---:|
| Statements | 79,68 % |
| Branches | 73,88 % |
| Functions | 87,27 % |
| Lines | 79,50 % |

El reporte HTML se genera en:

```text
coverage/html/index.html
```

Este archivo puede abrirse desde un navegador para revisar las métricas y las líneas de código cubiertas o no cubiertas.

### **Helper para pruebas de componentes**

Para facilitar el renderizado de componentes durante las pruebas, se utiliza el helper `renderizar`, ubicado en:

```text
src/test/renderizar.jsx
```

Ejemplo de uso:

```jsx
import { renderizar } from "../test/renderizar.jsx";

// Renderizar un componente sin rutas.
renderizar(<MiComponente />);

// Renderizar un componente con una ruta específica.
renderizar(<MiComponente />, { ruta: "/" });
```

Este helper permite probar componentes que utilizan elementos de navegación como `Link` o parámetros de ruta mediante `useParams`.

---

## **Diseño responsivo**

La aplicación utiliza Bootstrap 5 y CSS personalizado para adaptar su interfaz a distintos tamaños de pantalla.

Entre los elementos implementados se encuentran:

- Sistema de grillas responsivo.
- Barra de navegación adaptable.
- Tarjetas de productos.
- Formularios.
- Distribución adaptable de contenido.

El objetivo es proporcionar una experiencia de navegación adecuada tanto en computadores como en dispositivos móviles.

---

## **Flujo de trabajo con Git**

El desarrollo del proyecto se organiza mediante el uso de ramas y control de versiones.

- Cada integrante trabaja en una rama propia.
- Los cambios se integran mediante Pull Requests.
- Se evita realizar commits directamente sobre `main`.
- Se utilizan commits pequeños y descriptivos.
- Cada integrante trabaja principalmente sobre los archivos correspondientes a su responsabilidad.

### **Comandos Git utilizados**

| Comando | Descripción |
|---|---|
| `git status` | Muestra los archivos modificados y el estado actual del repositorio. |
| `git branch` | Muestra las ramas disponibles. |
| `git switch nombre-rama` | Cambia a una rama existente. |
| `git add .` | Prepara los cambios para el siguiente commit. |
| `git commit -m "mensaje"` | Registra los cambios en el historial del repositorio. |
| `git pull` | Descarga e integra los cambios del repositorio remoto. |
| `git push` | Envía los commits al repositorio remoto. |

### **Ejemplo de flujo de trabajo**

```bash
git status
git add .
git commit -m "feat: actualización del catálogo de videojuegos"
git push
```

---

## **Estado del proyecto**

El proyecto incorpora las funcionalidades correspondientes a la evolución de la primera versión de MLB Games.

Entre los principales avances se encuentran:

- [x] Migración de HTML, CSS y JavaScript Vanilla a React.
- [x] Implementación de componentes reutilizables.
- [x] Configuración de navegación mediante React Router.
- [x] Diseño responsivo con Bootstrap 5.
- [x] Archivo de datos simulados.
- [x] Operaciones CRUD para la gestión de videojuegos.
- [x] Persistencia de datos mediante localStorage.
- [x] Implementación de vistas de tienda y administración.
- [x] Configuración de pruebas unitarias con Jasmine y Karma.
- [x] Ejecución satisfactoria de 32 pruebas automatizadas.
- [x] Generación de métricas de cobertura de código.

---

## **Equipo**

Proyecto desarrollado por el equipo **MLBGAMES**.

| Integrante | Usuario GitHub | Responsabilidad |
|---|---|---|
| Basti | `Bastincito-H` | Base del proyecto, datos y CRUD, Home, Productos, Detalle, Categorías y Ofertas. |
| Martín Valdés | `MaValdesN` | Login, Registro, Carrito, Checkout, vistas de pago y documento ERS. |
| Luis Romero | `Luis-romero5212` | Panel administrativo, Nosotros, Blog, Contacto, configuración de pruebas y documento de cobertura. |

---

**Desarrollo Fullstack II (DSY1104)**

**Duoc UC — Evaluación Parcial 2**
