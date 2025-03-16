const eventoModel = require("../models/eventosModel");
const path = require("path");

function home(req, res) {
    res.sendFile(path.join(__dirname, "../views/index.html"));
}

async function obtenerEventos(req, res) {
    try {
        const eventos = await eventoModel.obtenerEventos();
        res.json(eventos);
    } catch (error) {
        console.error("Error al obtener los eventos:", error);
        res.status(500).json({
            success: false,
            message: "Error al obtener los eventos",
            error: error.message
        });
    }
}

async function agregarEventos(req, res) {
    try {
        const { nombreEvento, descripcion, fecha, hora, lugar, edadMinima, edadMaxima, imagen } = req.body;

        if (!nombreEvento || !fecha || !hora || !lugar || !imagen) {
            return res.status(400).json({ success: false, message: "Faltan datos obligatorios." });
        }

        if (!/^([01]\d|2[0-3]):([0-5]\d)$/.test(hora)) {
            return res.status(400).json({ success: false, message: "Formato de hora inválido. Use HH:mm" });
        }

        await eventoModel.agregarEventos({
            nombreEvento,
            descripcion,
            fecha,
            hora,
            lugar,
            edadMinima: parseInt(edadMinima) || 0,
            edadMaxima: parseInt(edadMaxima) || 100,
            imagen
        });

        res.status(201).json({ success: true, message: "Evento agregado exitosamente." });
    } catch (error) {
        console.error("Error al agregar evento:", error);
        res.status(500).json({
            success: false,
            message: "Error al agregar evento",
            error: error.message
        });
    }
}

module.exports = {
    home,
    obtenerEventos,
    agregarEventos
};
