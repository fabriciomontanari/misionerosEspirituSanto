function verificarAdmin() {
    const adminLink = document.getElementById("admin-link");
    if (localStorage.getItem("admin") === "true") {
        adminLink.style.display = "block";
    } else {
        adminLink.style.display = "none";
    }
}

function verificarSesionUsuario() {
    const loginLink = document.getElementById("login-link");
    const estaLogueado = localStorage.getItem("usuarioLogueado") === "true";

    if (loginLink) {
        loginLink.style.display = estaLogueado ? "none" : "block";
    }
}

document.addEventListener("DOMContentLoaded", () => {
    verificarAdmin();
    verificarSesionUsuario();
});
