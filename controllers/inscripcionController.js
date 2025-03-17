const inscripcionModel = require("../models/inscripcionModel");

async function agregarInscripcion(req, res) {
    try {
        const { nombre, correo, telefono, eventoId } = req.body;

        if (!nombre || !correo || !telefono || !eventoId) {
            return res.status(400).json({ success: false, message: "Faltan datos obligatorios." });
        }

        await inscripcionModel.agregarInscripcion({ nombre, correo, telefono, eventoId });

        res.status(201).json({ success: true, message: "Inscripción realizada con éxito." });
    } catch (error) {
        console.error("Error al inscribirse:", error);
        res.status(500).json({
            success: false,
            message: "Error al realizar la inscripción",
            error: error.message
        });
    }
}

async function obtenerInscripciones(req, res) {
    try {
        const inscripciones = await inscripcionModel.obtenerInscripciones();
        res.json(inscripciones);
    } catch (error) {
        console.error("Error al obtener inscripciones:", error);
        res.status(500).json({
            success: false,
            message: "Error al obtener inscripciones",
            error: error.message
        });
    }
}

module.exports = {
    agregarInscripcion,
    obtenerInscripciones
};
