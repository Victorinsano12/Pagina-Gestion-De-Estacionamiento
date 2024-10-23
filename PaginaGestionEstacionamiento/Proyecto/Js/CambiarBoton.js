function verificarEstadoSesion() {
    const loginBtn = document.getElementById("loginBtn");
    const usuarioLogueado = JSON.parse(localStorage.getItem("loggedInUser"));

    if (usuarioLogueado) {
        
        loginBtn.textContent = "Cerrar Sesión";
        loginBtn.href = "#"; 
        loginBtn.addEventListener("click", function(event) {
            event.preventDefault(); 
            cerrarSesion(); 
        });
    } else {
       
        loginBtn.textContent = "Login";
        loginBtn.href = "Home.html"; 
    }
}


function cerrarSesion() {
    localStorage.removeItem("loggedInUser");
    alert("Sesión cerrada correctamente.");
    window.location.href = "Home.html"; 
}


document.addEventListener("DOMContentLoaded", verificarEstadoSesion);
