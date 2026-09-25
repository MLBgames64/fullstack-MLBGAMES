//redirigir al iniciar secion al index.html
const formulario = document.getElementById ("Login");

if (formulario) {formulario.addEventListener("submit",function(evento){
    evento.preventDefault();
    const correo = document.getElementById("correo").value;
    const password = document.getElementById("password").value;
    window.location.href="index.html";
});
}

document.getElementById("btnvolver").addEventListener("click", function(){
    window.history.back()
});

