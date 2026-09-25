
const registro = document.getElementById ("registro");

if (registro) { registro.addEventListener("submit",function(evento){
    evento.preventDefault();
    const nombre = document.getElementById("nombre").value;
    const contrasena = document.getElementById("contrasena").value;
    const email = document.getElementById("email").value;
    window.location.href="index.html"
});
}
