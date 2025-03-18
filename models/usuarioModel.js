const { sql, poolPromise } = require("../config/db");

async function obtenerUsuarioPorCorreo(correo) {
    let pool;
    try {
        pool = await poolPromise;
        const result = await pool.request()
            .input("correo", sql.NVarChar, correo)
            .query("SELECT * FROM USUARIOS WHERE correo = @correo");
        
        return result.recordset[0];
    } catch (error) {
        console.error("Error al obtener usuario:", error);
        throw error;
    }
}

module.exports = { obtenerUsuarioPorCorreo };
