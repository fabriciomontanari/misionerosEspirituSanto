const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const { poolPromise } = require("./config/db"); 
const eventoController = require("./controllers/eventosController");
const inscripcionController = require("./controllers/inscripcionController");
const authController = require("./controllers/authController");




const app = express();

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));

app.use(
    "/public",
    express.static(path.join(__dirname, "public"), {
        setHeaders: (res, filePath) => {
            if (filePath.endsWith(".css")) {
                res.setHeader("Content-Type", "text/css");
            }
            if (filePath.endsWith(".js")) {
                res.setHeader("Content-Type", "application/javascript");
            }
        },
    })
);

(async () => {
    try {
        await poolPromise; 
        console.log("Conectado a la base de datos SQL Server");

        const PORT = process.env.PORT || 3000;
        app.listen(PORT, () => {
            console.log(`Servidor corriendo en el puerto ${PORT}`);
        });
    } catch (error) {
        console.error("Error conectando a la base de datos:", error);
        process.exit(1); 
    }
})();

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "index.html"));
});

app.get("/eventos", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "eventos.html"));
});

app.get("/admin-menu", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "admin-menu.html"));
});

app.get("/inscripciones", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "inscripciones.html"));
});

app.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "login.html"));
});

app.get("/", eventoController.home);
app.get("/api/eventos", eventoController.obtenerEventos);
app.post("/api/eventos", eventoController.agregarEventos);

app.get("/api/inscripciones", inscripcionController.obtenerInscripciones);
app.post("/api/inscripciones", inscripcionController.agregarInscripcion);

app.post("/login", authController.login);



