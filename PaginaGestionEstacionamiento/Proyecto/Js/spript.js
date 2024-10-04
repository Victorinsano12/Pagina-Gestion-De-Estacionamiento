document.getElementById("btn__iniciar-sesion").addEventListener("click", mostrarIniciarSesion);
document.getElementById("btn__registrarse").addEventListener("click", mostrarRegistro);
document.getElementById("btn__submit-register").addEventListener("click", register);
document.getElementById("btn__submit-login").addEventListener("click", iniciarSesion);

window.addEventListener("resize", anchoPage);

var formulario_login = document.querySelector(".formulario__login");
var formulario_register = document.querySelector(".formulario__register");
var contenedor_login_register = document.querySelector(".contenedor__login-register");
var caja_trasera_login = document.querySelector(".caja__trasera-login");
var caja_trasera_register = document.querySelector(".caja__trasera-register");

// Verificar ancho de la página para ajustar la interfaz
function anchoPage() {
    if (window.innerWidth > 850) {
        caja_trasera_register.style.display = "block";
        caja_trasera_login.style.display = "block";
    } else {
        caja_trasera_register.style.display = "block";
        caja_trasera_register.style.opacity = "1";
        caja_trasera_login.style.display = "none";
        formulario_login.style.display = "block";
        contenedor_login_register.style.left = "0px";
        formulario_register.style.display = "none";
    }
}

anchoPage();

// Función para mostrar el formulario de inicio de sesión
function mostrarIniciarSesion() {
    if (window.innerWidth > 850) {
        formulario_login.style.display = "block";
        contenedor_login_register.style.left = "10px";
        formulario_register.style.display = "none";
        caja_trasera_register.style.opacity = "1";
        caja_trasera_login.style.opacity = "0";
    } else {
        formulario_login.style.display = "block";
        contenedor_login_register.style.left = "0px";
        formulario_register.style.display = "none";
        caja_trasera_register.style.display = "block";
        caja_trasera_login.style.display = "none";
    }
}

// Función para mostrar el formulario de registro
function mostrarRegistro() {
    if (window.innerWidth > 850) {
        formulario_register.style.display = "block";
        contenedor_login_register.style.left = "410px";
        formulario_login.style.display = "none";
        caja_trasera_register.style.opacity = "0";
        caja_trasera_login.style.opacity = "1";
    } else {
        formulario_register.style.display = "block";
        contenedor_login_register.style.left = "0px";
        formulario_login.style.display = "none";
        caja_trasera_register.style.display = "none";
        caja_trasera_login.style.display = "block";
        caja_trasera_login.style.opacity = "1";
    }
}

// Función para registrar usuario
function register(event) {
    event.preventDefault();

    const nombre = document.querySelector('.formulario__register input[placeholder="Nombre completo"]').value;
    const email = document.querySelector('.formulario__register input[placeholder="Correo Electronico"]').value;
    const usuario = document.querySelector('.formulario__register input[placeholder="Usuario"]').value;
    const password = document.querySelector('.formulario__register input[placeholder="Contraseña"]').value;

    if (localStorage.getItem(email)) {
        alert("Este correo ya está registrado");
    } else {
        const nuevoUsuario = {
            nombre: nombre,
            email: email,
            usuario: usuario,
            password: password
        };
        localStorage.setItem(email, JSON.stringify(nuevoUsuario));
        alert("¡Registro exitoso! Ahora puedes iniciar sesión.");
        
        // Limpiar el formulario después de registrar
        document.querySelector('.formulario__register input[placeholder="Nombre completo"]').value = "";
        document.querySelector('.formulario__register input[placeholder="Correo Electronico"]').value = "";
        document.querySelector('.formulario__register input[placeholder="Usuario"]').value = "";
        document.querySelector('.formulario__register input[placeholder="Contraseña"]').value = "";
    }
}

// Función para iniciar sesión
function iniciarSesion(event) {
    event.preventDefault();

    const email = document.querySelector('.formulario__login input[type="text"]').value;
    const password = document.querySelector('.formulario__login input[type="password"]').value;

    const usuarioGuardado = JSON.parse(localStorage.getItem(email));

    if (usuarioGuardado && usuarioGuardado.password === password) {
        alert("¡Inicio de sesión exitoso!");
        // Redirigir a home.html si el inicio de sesión es exitoso
        window.location.href = "Parking.html";
    } else {
        alert("Correo o contraseña incorrectos");
    }
}
