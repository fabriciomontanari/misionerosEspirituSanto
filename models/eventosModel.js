const { sql, poolPromise } = require("../config/db");

async function obtenerEventos() {
    let pool;
    try {
        pool = await poolPromise;
        const result = await pool.request().query(`
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

        const eventos = result.recordset.map(evento => {
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
    let pool;
    try {
        pool = await poolPromise;

        if (!evento.hora || !/^([01]\d|2[0-3]):([0-5]\d)$/.test(evento.hora)) {
            throw new Error("Formato de hora inválido. Debe ser HH:mm");
        }

        await pool.request()
            .input("nombreEvento", sql.NVarChar, evento.nombreEvento)
            .input("descripcion", sql.NVarChar, evento.descripcion)
            .input("fecha", sql.Date, evento.fecha)
            .input("hora", sql.NVarChar(5), evento.hora)  
            .input("lugar", sql.NVarChar, evento.lugar)
            .input("edadMinima", sql.Int, evento.edadMinima)
            .input("edadMaxima", sql.Int, evento.edadMaxima)
            .input("imagen", sql.VarBinary(sql.MAX), Buffer.from(evento.imagen, "base64"))
            .query(`
                INSERT INTO EVENTOS (nombreEvento, descripcion, fecha, hora, lugar, edadMinima, edadMaxima, imagen)
                VALUES (@nombreEvento, @descripcion, @fecha, @hora, @lugar, @edadMinima, @edadMaxima, @imagen)
            `);
    } catch (error) {
        console.error("Error al agregar el evento:", error);
        throw error;
    }
}

module.exports = {
    obtenerEventos,
    agregarEventos
};
