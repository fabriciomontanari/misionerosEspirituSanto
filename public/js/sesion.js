function verificarAdmin() {
    const adminLink = document.getElementById("admin-link");
    if (sessionStorage.getItem("admin") === "true") {
        adminLink.style.display = "block";
    } else {
        adminLink.style.display = "none";
    }
}

function verificarSesionUsuario() {
    const loginLink = document.getElementById("login-link");
    const userMenu = document.getElementById("user-menu");
    const estaLogueado = sessionStorage.getItem("usuarioLogueado") === "true";

    if (estaLogueado) {
        loginLink.style.display = "none";
        userMenu.style.display = "block";
    } else {
        loginLink.style.display = "block";
        userMenu.style.display = "none";
    }
}

function cerrarSesion() {
    sessionStorage.removeItem("usuarioLogueado");
    sessionStorage.removeItem("admin");
    window.location.href = "/";
}

document.addEventListener("DOMContentLoaded", () => {
    verificarAdmin();
    verificarSesionUsuario();

    const cerrarSesionBtn = document.getElementById("cerrar-sesion");
    if (cerrarSesionBtn) {
        cerrarSesionBtn.addEventListener("click", (e) => {
            e.preventDefault();
            cerrarSesion();
        });
    }
});
