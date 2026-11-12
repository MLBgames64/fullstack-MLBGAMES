const dominiosPermitidos = ["@duoc.cl", "@profesor.duoc.cl", "@gmail.com"];

const form = document.getElementById("formContacto");

// Validación en tiempo real mientras el usuario escribe
document.getElementById("nombre").addEventListener("input", validarNombre);
document.getElementById("correo").addEventListener("input", validarCorreo);
document.getElementById("mensaje").addEventListener("input", validarMensaje);

function validarNombre() {
    const nombre = document.getElementById("nombre").value.trim();
    const error = document.getElementById("errorNombre");

    if (nombre === "") {
        error.textContent = "El nombre es obligatorio.";
        return false;
    }
    error.textContent = "";
    return true;
}

function validarCorreo() {
    const correo = document.getElementById("correo").value.trim();
    const error = document.getElementById("errorCorreo");

    if (correo === "") {
        error.textContent = "El correo es obligatorio.";
        return false;
    }

    const dominioValido = dominiosPermitidos.some(dominio => correo.endsWith(dominio));
    if (!dominioValido) {
        error.textContent = "Solo se permiten correos @duoc.cl, @profesor.duoc.cl o @gmail.com.";
        return false;
    }

    error.textContent = "";
    return true;
}

function validarMensaje() {
    const mensaje = document.getElementById("mensaje").value.trim();
    const error = document.getElementById("errorMensaje");

    if (mensaje === "") {
        error.textContent = "El mensaje es obligatorio.";
        return false;
    }
    error.textContent = "";
    return true;
}

// Validación al enviar
form.addEventListener("submit", function(evento) {
    evento.preventDefault();

    const nombreOk = validarNombre();
    const correoOk = validarCorreo();
    const mensajeOk = validarMensaje();

    if (nombreOk && correoOk && mensajeOk) {
        alert("Mensaje enviado correctamente. ¡Gracias por contactarnos!");
        form.reset();
    }
});