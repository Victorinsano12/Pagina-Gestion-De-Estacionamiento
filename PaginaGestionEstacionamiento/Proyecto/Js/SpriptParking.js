let data = {
    
    usuarios: [
      {
        "nombre": "Juan Perez",
        "email": "juan.perez@example.com",
        "usuario": "juanp",
        "password": "12345",
        "role": "regular"
      },
      {
        "nombre": "Maria Lopez",
        "email": "maria.lopez@example.com",
        "usuario": "mlopez",
        "password": "54321",
        "role": "admin"
      }
    ],
    sesion: {
      loggedInUser: null
    },
    mensajes: {
      registroExitoso: "¡Registro exitoso! Ahora puedes iniciar sesión.",
      correoYaRegistrado: "Este correo ya está registrado",
      inicioSesionExitoso: "¡Inicio de sesión exitoso!",
      correoOContrasenaIncorrectos: "Correo o contraseña incorrectos",
      accesoDenegado: "Acceso denegado. Debes iniciar sesión.",
      accesoDenegadoRol: "Acceso denegado. Solo los usuarios regulares pueden acceder a esta página."
    }

    
  };

// Cargar usuarios registrados del localStorage al inicio
function cargarUsuarios() {
    const usuariosGuardados = Object.keys(localStorage).filter(key => key.startsWith("usuario_"));
    data.usuarios = usuariosGuardados.map(key => JSON.parse(localStorage.getItem(key)));
}

// Función para iniciar sesión
function iniciarSesion(event) {
    event.preventDefault();

    const email = document.querySelector('.formulario__login input[type="text"]').value;
    const password = document.querySelector('.formulario__login input[type="password"]').value;

    const usuarioGuardado = data.usuarios.find(user => user.email === email);

    if (usuarioGuardado && usuarioGuardado.password === password) {
        alert(data.mensajes.inicioSesionExitoso);
        localStorage.setItem("loggedInUser", JSON.stringify(usuarioGuardado));

        if (usuarioGuardado.role === "admin") {
            window.location.href = "admin.html"; // Redirigir a la página de administrador
        } else {
            window.location.href = "Parking.html"; // Redirigir a la página de usuario regular
        }
    } else {
        alert(data.mensajes.correoOContrasenaIncorrectos);
    }
}

function mostrarBienvenida(nombreUsuario) {
    const bienvenidaDiv = document.getElementById("bienvenida");
    bienvenidaDiv.innerHTML = `¡Bienvenido, ${nombreUsuario}! Aquí está tu espacio.`;
}

// Función para registrar usuario
function register(event) {
    event.preventDefault();

    const nombre = document.querySelector('.formulario__register input[placeholder="Nombre completo"]').value;
    const email = document.querySelector('.formulario__register input[placeholder="Correo Electronico"]').value;
    const usuario = document.querySelector('.formulario__register input[placeholder="Usuario"]').value;
    const password = document.querySelector('.formulario__register input[placeholder="Contraseña"]').value;
    const role = document.getElementById("selectRole").value;

    if (!nombre || !email || !usuario || !password) {
        alert("Por favor, completa todos los campos antes de registrarte.");
        return;
    }

    if (localStorage.getItem(`usuario_${email}`)) {
        alert(data.mensajes.correoYaRegistrado);
    } else {
        const nuevoUsuario = {
            nombre: nombre,
            email: email,
            usuario: usuario,
            password: password,
            role: role
        };
        localStorage.setItem(`usuario_${email}`, JSON.stringify(nuevoUsuario)); // Guardar el usuario en localStorage
        alert(data.mensajes.registroExitoso);
        cargarUsuarios(); // Actualizar la lista de usuarios
        document.querySelector('.formulario__register').reset(); // Limpiar el formulario
    }
}

// Verificación de acceso a Parking.html
function verificarAccesoParking() {
    const usuarioLogueado = JSON.parse(localStorage.getItem("loggedInUser"));

    if (!usuarioLogueado) {
        alert(data.mensajes.accesoDenegado);
        window.location.href = "Home.html"; // Redirigir si no está logueado
    } else if (usuarioLogueado.role !== "regular" && usuarioLogueado.role !== "admin") {
        alert(data.mensajes.accesoDenegadoRol);
        window.location.href = "Home.html"; // Redirigir si no es ni regular ni admin
    }
}




// Ejecutar la verificación de sesión cuando se carga el documento
document.addEventListener("DOMContentLoaded", function() {
    cargarUsuarios(); // Cargar usuarios al inicio
    const currentPage = window.location.pathname.split('/').pop();
    if (currentPage === "Parking.html") {
        verificarAccesoParking(); // Verificar acceso si estamos en Parking.html
    }
});

// Función para cerrar sesión
function cerrarSesion() {
    localStorage.removeItem("loggedInUser");
    alert("Sesión cerrada. Redirigiendo a la página de inicio.");
    window.location.href = "Home.html"; // Redirigir al inicio de sesión después de cerrar sesión
}

// Inicialización de botones
document.getElementById("btn__iniciar-sesion").addEventListener("click", mostrarIniciarSesion);
document.getElementById("btn__registrarse").addEventListener("click", mostrarRegistro);
document.getElementById("btn__submit-register").addEventListener("click", register);
document.getElementById("btn__submit-login").addEventListener("click", iniciarSesion);
window.addEventListener("resize", anchoPage);

// Funciones de interfaz (no se han cambiado)
var formulario_login = document.querySelector(".formulario__login");
var formulario_register = document.querySelector(".formulario__register");
var contenedor_login_register = document.querySelector(".contenedor__login-register");
var caja_trasera_login = document.querySelector(".caja__trasera-login");
var caja_trasera_register = document.querySelector(".caja__trasera-register");

anchoPage();

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



