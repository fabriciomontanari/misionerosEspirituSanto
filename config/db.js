const sql = require("mssql");

const dbConfig = {
    user: "sa",
    password: "Fabricio23!",
    server: "localhost",
    database: "misionerosEspirituSanto",
    options: {
        encrypt: false, 
        trustServerCertificate: true
    }
};

const poolPromise = new sql.ConnectionPool(dbConfig)
    .connect()
    .then(pool => {
        console.log("Conectado a SQL Server");
        return pool;
    })
    .catch(err => {
        console.error("Error en la conexión a la base de datos:", err);
        process.exit(1); 
    });

module.exports = { sql, poolPromise };
