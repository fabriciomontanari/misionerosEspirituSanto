document.addEventListener("DOMContentLoaded", function () {
    console.log("DOM completamente cargado"); 

    const correoInput = document.getElementById("correo");
    const contrasenaInput = document.getElementById("contrasena");
    const loginButton = document.getElementById("login-btn");

    if (!correoInput || !contrasenaInput || !loginButton) {
        console.error("Elementos de input o botón no encontrados");
        return;
    }

    loginButton.addEventListener("click", iniciarSesion);
});

async function iniciarSesion() {
    const correoInput = document.getElementById("correo");
    const contrasenaInput = document.getElementById("contrasena");

    if (!correoInput || !contrasenaInput) {
        console.error("Elementos de input no encontrados");
        return;
    }

    const correo = correoInput.value;
    const contrasena = contrasenaInput.value;

    console.log("Intentando iniciar sesión con:", correo, contrasena); 

    const response = await fetch("/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ correo, contrasena })
    });

    if (!response.ok) {
        Swal.fire({
            icon: 'error',
            title: 'Credenciales incorrectas!',
            text: 'Por favor, ingrese unas credenciales válidas.'
          });
        return;
    }

    const data = await response.json();

    if (data.success) {
        localStorage.setItem("admin", "true");
        window.location.href = "/admin-menu";
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Credenciales incorrectas!',
            text: 'Por favor, ingrese unas credenciales válidas.'
          });
    }
}
