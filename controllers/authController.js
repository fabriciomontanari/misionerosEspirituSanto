const pool = require("../config/db");

async function login(req, res) {
    try {
        const { correo, contrasena } = req.body;
        if (!correo || !contrasena) {
            return res.status(400).json({ success: false, message: "Correo y contraseña son obligatorios." });
        }

        const [rows] = await pool.query("SELECT * FROM USUARIOS WHERE correo = ?", [correo]);

        console.log("Usuario encontrado en BD:", rows);

        const usuario = rows[0];

        if (!usuario) {
            console.log("Usuario no encontrado");
            return res.status(401).json({ success: false, message: "Usuario no encontrado." });
        }

        if (usuario.contrasena !== contrasena) {
            console.log("Contraseña incorrecta");
            return res.status(401).json({ success: false, message: "Credenciales incorrectas." });
        }

        console.log("Login exitoso");
        return res.json({ success: true });

    } catch (error) {
        console.error("Error en login:", error);
        res.status(500).json({ success: false, message: "Error al iniciar sesión." });
    }
}

module.exports = { login };
