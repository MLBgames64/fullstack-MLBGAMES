const formulario = document.getElementById("Login");
const dominiosPermitidos = ["@duocuc.cl", "@profesor.duoc.cl", "@gmail.com"];

if (formulario) {
    formulario.addEventListener("submit", function(evento) {
        evento.preventDefault();

        const correo = document.getElementById("correo").value.trim();
        const password = document.getElementById("password").value.trim();

        const dominioValido = dominiosPermitidos.some(dominio => correo.endsWith(dominio));

        if (correo === "") {
            alert("El correo es obligatorio.");
            return;
        }

        if (!dominioValido) {
            alert("Solo se permiten correos @duoc.cl, @profesor.duoc.cl o @gmail.com.");
            return;
        }

        if (password === "") {
            alert("La contraseña es obligatoria.");
            return;
        }

        window.location.href = "index.html";
    });
}