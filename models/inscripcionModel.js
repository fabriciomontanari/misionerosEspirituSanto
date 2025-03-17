const { sql, poolPromise } = require("../config/db");

async function agregarInscripcion(inscripcion) {
    let pool;

    try {
        pool = await  poolPromise;
        await pool.request()
        .input("nombre", sql.NVarChar, inscripcion.nombre)
        .input("correo", sql.NVarChar, inscripcion.correo)
        .input("telefono", sql.NVarChar, inscripcion.telefono)
        .input("eventoId", sql.Int, inscripcion.eventoId)
        .query(`
            INSERT INTO INSCRIPCIONES (nombre, correo, telefono, eventoId)
            VALUES (@nombre, @correo, @telefono, @eventoId)
            `);
    } catch (error) {
        console.error("Error al inscribir al usuario al evento:", evento);
        throw error;
    }
}

async function obtenerInscripciones(){
    let pool;
    try {
        pool = await poolPromise;
        const result = await pool.request().query(`
            SELECT I.id, I.nombre, I.correo, I.telefono, E.nombreEvento
            FROM INSCRIPCIONES I
            JOIN EVENTOS E ON I.eventoId = E.id
        `);
        return result.recordset;
    } catch (error) {
        console.error("Error al obtener inscripciones:", error);
        throw error;
    }
}

async function obtenerEventoPorId(eventoId) {
    let pool;
    try {
        pool = await poolPromise;
        const result = await pool.request()
            .input("eventoId", sql.Int, eventoId)
            .query(`
                SELECT nombreEvento, fecha, hora, lugar 
                FROM EVENTOS 
                WHERE id = @eventoId
            `);
        
        return result.recordset[0];
    } catch (error) {
        console.error("Error al obtener los detalles del evento:", error);
        throw error;
    }
}

module.exports = {
    agregarInscripcion,
    obtenerInscripciones,
    obtenerEventoPorId
}