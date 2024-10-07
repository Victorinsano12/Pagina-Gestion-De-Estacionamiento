 // Función para mostrar el nombre del usuario logueado
 function mostrarNombreUsuario() {
    const usuarioLogueado = JSON.parse(localStorage.getItem("loggedInUser"));
    if (usuarioLogueado) {
        // Asigna el nombre de usuario al span en el HTML
        const nombreUsuarioSpan = document.getElementById('nombreUsuario');
        nombreUsuarioSpan.textContent = usuarioLogueado.usuario; // Muestra el nombre de usuario
    }
}

// Ejecutar la función cuando la página se carga
document.addEventListener("DOMContentLoaded", mostrarNombreUsuario);

// Función para cerrar sesión
function cerrarSesion() {
    localStorage.removeItem("loggedInUser"); // Eliminar usuario logueado del localStorage
    alert("Sesión cerrada. Redirigiendo a la página de inicio.");
    window.location.href = "Home.html"; // Redirigir al inicio de sesión después de cerrar sesión
}

// Agregar el event listener al botón de Cerrar Sesión
document.addEventListener("DOMContentLoaded", function () {
    const btnCerrarSesion = document.getElementById("btnCerrarSesion");
    if (btnCerrarSesion) {
        btnCerrarSesion.addEventListener("click", function (event) {
            event.preventDefault(); // Prevenir comportamiento por defecto del enlace
            cerrarSesion();
        });
    }
});
