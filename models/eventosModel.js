const pool = require("../config/db");

async function obtenerEventos() {
    try {
        const result = await pool.query(`
            SELECT 
                id,
                nombreevento,
                descripcion,
                fecha,
                hora,
                lugar,
                edadminima,
                edadmaxima,
                imagen
            FROM eventos
        `);

        const eventos = result.rows.map(evento => {
            return {
                id: evento.id,
                nombreEvento: evento.nombreevento,
                descripcion: evento.descripcion,
                fecha: evento.fecha,
                hora: evento.hora,
                lugar: evento.lugar,
                edadMinima: evento.edadminima,
                edadMaxima: evento.edadmaxima,
                imagen: evento.imagen ? Buffer.from(evento.imagen).toString("base64") : null
            };
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
            INSERT INTO eventos 
            (nombreEvento, descripcion, fecha, hora, lugar, edadMinima, edadMaxima, imagen)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        `,
        [
            evento.nombreEvento,
            evento.descripcion,
            evento.fecha,
            evento.hora,
            evento.lugar,
            evento.edadMinima,
            evento.edadMaxima,
            imagenBuffer
        ]);
    } catch (error) {
        console.error("Error al agregar el evento:", error);
        throw error;
    }
}

module.exports = {
    obtenerEventos,
    agregarEventos
};
