const pool = require("../config/db");

async function obtenerUsuarioPorCorreo(correo) {
    try {
        const [rows] = await pool.query(
            "SELECT * FROM USUARIOS WHERE correo = ?",
            [correo]
        );
        return rows[0]; 
    } catch (error) {
        console.error("Error al obtener usuario:", error);
        throw error;
    }
}

module.exports = { obtenerUsuarioPorCorreo };
