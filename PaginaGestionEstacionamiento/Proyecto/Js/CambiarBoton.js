// Función para verificar si hay un usuario logueado
function verificarEstadoSesion() {
    const loginBtn = document.getElementById("loginBtn");
    const usuarioLogueado = JSON.parse(localStorage.getItem("loggedInUser"));

    if (usuarioLogueado) {
        // Cambiar el texto del botón a "Cerrar Sesión"
        loginBtn.textContent = "Cerrar Sesión";
        loginBtn.href = "#"; // Remover enlace de "Home.html"
        loginBtn.addEventListener("click", function(event) {
            event.preventDefault(); // Prevenir redireccionamiento
            cerrarSesion(); // Llamar a la función para cerrar sesión
        });
    } else {
        // Si no hay usuario logueado, establecer el botón como "Login"
        loginBtn.textContent = "Login";
        loginBtn.href = "Home.html"; // Enlace a la página de inicio de sesión
    }
}

// Función para cerrar sesión
function cerrarSesion() {
    localStorage.removeItem("loggedInUser"); // Eliminar el usuario logueado del localStorage
    alert("Sesión cerrada correctamente.");
    window.location.href = "Home.html"; // Redirigir a la página de inicio de sesión
}

// Verificar el estado de la sesión al cargar el documento
document.addEventListener("DOMContentLoaded", verificarEstadoSesion);
