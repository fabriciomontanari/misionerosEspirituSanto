const pool = require("../config/db");

async function obtenerUsuarioPorCorreo(correo) {
    try {
        const result = await pool.query(
            "SELECT * FROM usuarios WHERE correo = $1",
            [correo]
        );
        return result.rows[0]; 
    } catch (error) {
        console.error("Error al obtener usuario:", error);
        throw error;
    }
}

module.exports = { obtenerUsuarioPorCorreo };
