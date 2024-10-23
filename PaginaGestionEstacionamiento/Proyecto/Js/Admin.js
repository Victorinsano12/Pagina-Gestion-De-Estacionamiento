
 function mostrarNombreUsuario() {
    const usuarioLogueado = JSON.parse(localStorage.getItem("loggedInUser"));
    if (usuarioLogueado) {
       
        const nombreUsuarioSpan = document.getElementById('nombreUsuario');
        nombreUsuarioSpan.textContent = usuarioLogueado.usuario; 
    }
}

document.addEventListener("DOMContentLoaded", mostrarNombreUsuario);

function cerrarSesion() {
    localStorage.removeItem("loggedInUser"); 
    alert("Sesión cerrada. Redirigiendo a la página de inicio.");
    window.location.href = "Home.html"; 
}


document.addEventListener("DOMContentLoaded", function () {
    const btnCerrarSesion = document.getElementById("btnCerrarSesion");
    if (btnCerrarSesion) {
        btnCerrarSesion.addEventListener("click", function (event) {
            event.preventDefault(); 
            cerrarSesion();
        });
    }
});
