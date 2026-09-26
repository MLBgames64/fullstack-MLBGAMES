// 1. Arreglo de datos de tus juegos
const listaProductos = [
    { id: 1, nombre: "Grand Theft Auto IV", precio: "$19.990", imagen: "img/GTA_4.jpg" },
    { id: 2, nombre: "Red Dead Redemption 2", precio: "$39.990", imagen: "img/RDR2.jpg" },
    { id: 3, nombre: "Elden Ring", precio: "$45.000", imagen: "img/EldenRing.jpg" },
    { id: 4, nombre: "God of War", precio: "$29.990", imagen: "img/GodOfWar.jpg" },
    { id: 5, nombre: "The Last of Us Part II", precio: "$34.990", imagen: "img/TLOU2.jpg" },
    { id: 6, nombre: "Baldur's Gate 3", precio: "$49.990", imagen: "img/BG3.jpg" }
];


function cargarProductos() {
    const contenedor = document.getElementById("contenedor-productos");

  
    if (!contenedor) return;

    contenedor.innerHTML = ""; 

    listaProductos.forEach((producto) => {
        const tarjeta = document.createElement("div");
        tarjeta.classList.add("Tarjeta-juego");

        tarjeta.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}">
            <h3>${producto.nombre}</h3>
            <p class="precio">${producto.precio}</p>
            <button onclick="agregarAlCarrito(${producto.id})">Añadir al carrito</button>
        `;

        contenedor.appendChild(tarjeta);
    });
}

function agregarAlCarrito(id) {
    const producto = listaProductos.find(p => p.id === id);
    alert(`"${producto.nombre}" agregado al carrito.`);
}

document.addEventListener("DOMContentLoaded", cargarProductos);