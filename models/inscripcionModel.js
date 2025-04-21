const pool = require("../config/db");

async function agregarInscripcion(inscripcion) {
    try {
        await pool.query(`
            INSERT INTO inscripciones (nombre, correo, telefono, eventoId)
            VALUES ($1, $2, $3, $4)
        `, [
            inscripcion.nombre,
            inscripcion.correo,
            inscripcion.telefono,
            inscripcion.eventoId
        ]);
    } catch (error) {
        console.error("Error al inscribir al usuario al evento:", error);
        throw error;
    }
}

async function obtenerInscripciones() {
    try {
        const result = await pool.query(`
            SELECT I.id, I.nombre, I.correo, I.telefono, E.nombreEvento
            FROM inscripciones I
            JOIN eventos E ON I.eventoId = E.id
        `);
        return result.rows;
    } catch (error) {
        console.error("Error al obtener inscripciones:", error);
        throw error;
    }
}

async function obtenerEventoPorId(eventoId) {
    try {
        const result = await pool.query(`
            SELECT nombreEvento, fecha, hora, lugar 
            FROM eventos 
            WHERE id = $1
        `, [eventoId]);

        return result.rows[0];
    } catch (error) {
        console.error("Error al obtener los detalles del evento:", error);
        throw error;
    }
}

async function obtenerInscripcionesPorEvento(eventoId) {
    try {
        const result = await pool.query(`
            SELECT nombre, correo, telefono
            FROM inscripciones
            WHERE eventoId = $1
        `, [eventoId]);

        return result.rows;
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
