const inscripcionModel = require("../models/inscripcionModel");
const nodemailer = require("nodemailer");

async function agregarInscripcion(req, res) {
    try {
        const { nombre, correo, telefono, eventoId } = req.body;

        if (!nombre || !correo || !telefono || !eventoId) {
            return res.status(400).json({ success: false, message: "Faltan datos obligatorios." });
        }

        await inscripcionModel.agregarInscripcion({ nombre, correo, telefono, eventoId });

        const evento = await inscripcionModel.obtenerEventoPorId(eventoId);

        const transporter = nodemailer.createTransport({
            service: "gmail", 
            auth: {
                user: "noreplymisionerosespiritusanto@gmail.com", 
                pass: "gfky tcot qhqb dlin" 
            }
        });

        const mailOptions = {
            from: "noreplymisionerosespiritusanto@gmail.com",
            to: correo,
            subject: "Confirmación de Inscripción al Evento",
            html: `
                <h2>¡Gracias por inscribirte, ${nombre}!</h2>
                <p>Te has inscrito con éxito en el evento: <strong>${evento.nombreEvento}</strong></p>
                <p>Detalles del evento:</p>
                <ul>
                    <li><strong>Fecha:</strong> ${evento.fecha}</li>
                    <li><strong>Hora:</strong> ${evento.hora}</li>
                    <li><strong>Lugar:</strong> ${evento.lugar}</li>
                </ul>
                <p>¡Te esperamos!</p>
                <p>Misioneros del Espíritu Santo</p>
            `
        };

        await transporter.sendMail(mailOptions);

        res.status(201).json({ success: true, message: "Inscripción realizada con éxito. Se ha enviado un correo de confirmación." });

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


async function obtenerInscripcionesPorEvento(req, res) {
    try {
        const eventoId = parseInt(req.params.id);
        const inscritos = await inscripcionModel.obtenerInscripcionesPorEvento(eventoId);
        res.json(inscritos);
    } catch (error) {
        console.error("Error al obtener inscritos por evento:", error);
        res.status(500).json({
            success: false,
            message: "Error al obtener inscritos por evento",
            error: error.message
        });
    }
}


module.exports = {  
    agregarInscripcion,
    obtenerInscripciones,
    obtenerInscripcionesPorEvento
};
