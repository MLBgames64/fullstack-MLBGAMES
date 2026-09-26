const registro = document.getElementById("registro");
const dominiosPermitidos = ["@duocuc.cl", "@profesor.duoc.cl", "@gmail.com"];

if (registro) {
    registro.addEventListener("submit", function(evento) {
        evento.preventDefault();

        const nombre = document.getElementById("nombre").value.trim();
        const contrasena = document.getElementById("contrasena").value.trim();
        const email = document.getElementById("email").value.trim();

        const dominioValido = dominiosPermitidos.some(dominio => email.endsWith(dominio));

        if (nombre === "") {
            alert("El nombre es obligatorio.");
            return;
        }

        if (email === "") {
            alert("El correo es obligatorio.");
            return;
        }

        if (!dominioValido) {
            alert("Solo se permiten correos @duoc.cl, @profesor.duoc.cl o @gmail.com.");
            return;
        }

        if (contrasena === "") {
            alert("La contraseña es obligatoria.");
            return;
        }

        window.location.href = "index.html";
    });
}