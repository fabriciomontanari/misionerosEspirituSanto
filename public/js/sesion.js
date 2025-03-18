function verificarAdmin() {
    if (localStorage.getItem("admin") === "true") {
        document.getElementById("admin-link").style.display = "block";
    } else {
        document.getElementById("admin-link").style.display = "none";
    }
}

document.addEventListener("DOMContentLoaded", verificarAdmin);