const express = require("express");
const sql = require("mssql");
const bodyParser = require("body-parser");
const path = require ("path");
const app = express();



const bdConfig = {
    user: 'sa',
    password: 'Fabricio23!',
    server: 'localhost', 
    database: 'misionerosEspirituSanto',
    options: {
        encrypt: false, 
        trustServerCertificate: true
    }
};

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

app.use(
    "/public",
    express.static(path.join(__dirname, "public"), {
      setHeaders: (res, filePath) => {
        if (filePath.endsWith(".css")) {
          res.setHeader("Content-Type", "text/css");
        }
        if (filePath.endsWith(".js")) {
          res.setHeader("Content-Type", "application/javascript");
        }
      },
    })
  );

async function conectarBD() {
    try {
        await sql.connect(bdConfig);
        console.log('Conexión exitosa a SQL Server');
    } catch (err) {
        console.error('Error conectando a SQL Server:', err);
    }
}

conectarBD();

  app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "index.html"));
  });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});



