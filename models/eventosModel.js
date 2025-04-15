const pool = require("../config/db");

async function obtenerEventos() {
    try {
        const [rows] = await pool.query(`
            SELECT 
                id,
                nombreEvento,
                descripcion,
                fecha,
                hora,
                lugar,
                edadMinima,
                edadMaxima,
                imagen
            FROM EVENTOS
        `);

        const eventos = rows.map(evento => {
            if (evento.imagen) {
                evento.imagen = Buffer.from(evento.imagen).toString("base64");
            }
            return evento;
        });

        return eventos;
    } catch (error) {
        console.error("Error al obtener los eventos:", error);
        throw error;
    }
}

async function agregarEventos(evento) {
    try {
        if (!evento.hora || !/^([01]\d|2[0-3]):([0-5]\d)$/.test(evento.hora)) {
            throw new Error("Formato de hora inválido. Debe ser HH:mm");
        }

        const imagenBuffer = Buffer.from(evento.imagen, "base64");

        await pool.query(`
            INSERT INTO EVENTOS 
            (nombreEvento, descripcion, fecha, hora, lugar, edadMinima, edadMaxima, imagen)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                evento.nombreEvento,
                evento.descripcion,
                evento.fecha,
                evento.hora,
                evento.lugar,
                evento.edadMinima,
                evento.edadMaxima,
                imagenBuffer
            ]
        );
    } catch (error) {
        console.error("Error al agregar el evento:", error);
        throw error;
    }
}

module.exports = {
    obtenerEventos,
    agregarEventos
};
