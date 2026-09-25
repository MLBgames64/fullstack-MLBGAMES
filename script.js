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