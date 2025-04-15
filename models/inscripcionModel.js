const pool = require("../config/db");

async function agregarInscripcion(inscripcion) {
    try {
        await pool.query(`
            INSERT INTO INSCRIPCIONES (nombre, correo, telefono, eventoId)
            VALUES (?, ?, ?, ?)`,
            [
                inscripcion.nombre,
                inscripcion.correo,
                inscripcion.telefono,
                inscripcion.eventoId
            ]
        );
    } catch (error) {
        console.error("Error al inscribir al usuario al evento:", error);
        throw error;
    }
}

async function obtenerInscripciones() {
    try {
        const [rows] = await pool.query(`
            SELECT I.id, I.nombre, I.correo, I.telefono, E.nombreEvento
            FROM INSCRIPCIONES I
            JOIN EVENTOS E ON I.eventoId = E.id
        `);
        return rows;
    } catch (error) {
        console.error("Error al obtener inscripciones:", error);
        throw error;
    }
}

async function obtenerEventoPorId(eventoId) {
    try {
        const [rows] = await pool.query(`
            SELECT nombreEvento, fecha, hora, lugar 
            FROM EVENTOS 
            WHERE id = ?`,
            [eventoId]
        );
        return rows[0];
    } catch (error) {
        console.error("Error al obtener los detalles del evento:", error);
        throw error;
    }
}

async function obtenerInscripcionesPorEvento(eventoId) {
    try {
        const [rows] = await pool.query(`
            SELECT nombre, correo, telefono
            FROM INSCRIPCIONES
            WHERE eventoId = ?`,
            [eventoId]
        );
        return rows;
    } catch (error) {
        console.error("Error al obtener inscritos por evento:", error);
        throw error;
    }
}

module.exports = {
    agregarInscripcion,
    obtenerInscripciones,
    obtenerEventoPorId,
    obtenerInscripcionesPorEvento
};
