//redirigir al iniciar secion al index.html
const formulario = document.getElementById (formlogin);

formulario.addEventListener("subit",function(evento){
    evento.preventDefault();

    const correo = document.getElementById("correo").value;
    const password = document.getElementById("password").value;

    window.location.href="index.html";
});

document.getElementById("btnvolver").addEventListener("click", function(){
    window.history.back()
});





// 1. Arreglo de datos de juegos
const listaJuegos = [
    { id: 1, nombre: "Grand Theft Auto IV", precio: 19990, imagen: "img/GTA_4.jpg" },
    { id: 2, nombre: "Red Dead Redemption 2", precio: 39990, imagen: "img/RDR2.jpg" },
    { id: 3, nombre: "Elden Ring", precio: 45000, imagen: "img/EldenRing.jpg" },
    { id: 4, nombre: "God of War", precio: 29990, imagen: "img/GodOfWar.jpg" },
    { id: 5, nombre: "The Last of Us Part II", precio: 34990, imagen: "img/TLOU2.jpg" },
    { id: 6, nombre: "Baldur's Gate 3", precio: 49990, imagen: "img/BG3.jpg" }
];

// 2. Función para recorrer el arreglo e inyectarlo en el HTML
function cargarJuegos() {
    const contenedor = document.getElementById("contenedor-juegos");
    contenedor.innerHTML = ""; // Limpiar contenido existente

    // Recorrido de la lista mediante forEach
    listaJuegos.forEach((juego) => {
        const tarjeta = document.createElement("article");
        tarjeta.classList.add("Tarjeta-juego");

        tarjeta.innerHTML = `
            <img src="${juego.imagen}" alt="${juego.nombre}" height="150px">
            <h3>${juego.nombre}</h3>
            <p>Precio : $${juego.precio.toLocaleString('es-CL')}</p>
            <button type="button">Comprar</button>
        `;

        contenedor.appendChild(tarjeta);
    });
}

// 3. Ejecución al cargar el documento
document.addEventListener("DOMContentLoaded", cargarJuegos);