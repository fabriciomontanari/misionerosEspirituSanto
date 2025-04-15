const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const nodemailer = require("nodemailer");
const { poolPromise } = require("./config/db"); 
const eventoController = require("./controllers/eventosController");
const inscripcionController = require("./controllers/inscripcionController");
const authController = require("./controllers/authController");




const app = express();

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));

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

(async () => {
    try {
        await poolPromise; 
        console.log("Conectado a la base de datos SQL Server");

        const PORT = process.env.PORT || 1000;
        app.listen(PORT, () => {
            console.log(`Servidor corriendo en el puerto ${PORT}`);
        });
    } catch (error) {
        console.error("Error conectando a la base de datos:", error);
        process.exit(1); 
    }
})();

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "index.html"));
});

app.post('/enviar-mensaje', async (req, res) => {
    const { nombre, email, asunto, mensaje } = req.body;

    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'noreplymisionerosespiritusanto@gmail.com',
            pass: 'gfky tcot qhqb dlin'
        }
    });

    const mailOptions = {
        from: email,
        to: 'noreplymisionerosespiritusanto@gmail.com',
        subject: `${asunto}`,
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
              body {
                font-family: 'Arial', sans-serif;
                line-height: 1.6;
                color: #333333;
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
              }
              .email-container {
                border: 1px solid #e1e1e1;
                border-radius: 8px;
                overflow: hidden;
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
              }
              .header {
                background-color: #4a6fa5;
                color: white;
                padding: 20px;
                text-align: center;
              }
              .header h2 {
                margin: 0;
                font-size: 22px;
              }
              .content {
                padding: 25px;
                background-color: #ffffff;
              }
              .contact-field {
                margin-bottom: 15px;
                padding-bottom: 15px;
                border-bottom: 1px solid #f0f0f0;
              }
              .contact-field:last-child {
                border-bottom: none;
              }
              .field-name {
                font-weight: bold;
                color: #4a6fa5;
                margin-bottom: 5px;
                display: block;
              }
              .field-value {
                margin: 0;
                padding: 0;
              }
              .message-box {
                background-color: #f9f9f9;
                border-left: 4px solid #4a6fa5;
                padding: 15px;
                margin-top: 10px;
                border-radius: 0 4px 4px 0;
              }
              .footer {
                text-align: center;
                padding: 15px;
                background-color: #f8f9fa;
                font-size: 14px;
                color: #666;
                border-top: 1px solid #e1e1e1;
              }
              .timestamp {
                color: #999;
                font-size: 12px;
                font-style: italic;
                text-align: right;
                margin-top: 15px;
              }
            </style>
          </head>
          <body>
            <div class="email-container">
              <div class="header">
                <h2>Nuevo mensaje de contacto</h2>
              </div>
              
              <div class="content">
                <div class="contact-field">
                  <span class="field-name">Nombre:</span>
                  <p class="field-value">${nombre}</p>
                </div>
                
                <div class="contact-field">
                  <span class="field-name">Email:</span>
                  <p class="field-value">${email}</p>
                </div>
                
                <div class="contact-field">
                  <span class="field-name">Asunto:</span>
                  <p class="field-value">${asunto}</p>
                </div>
                
                <div class="contact-field">
                  <span class="field-name">Mensaje:</span>
                  <div class="message-box">
                    <p class="field-value">${mensaje.replace(/\n/g, '<br>')}</p>
                  </div>
                </div>
                
                <div class="timestamp">
                  Recibido el ${new Date().toLocaleString('es-ES', {
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </div>
              </div>
              
              <div class="footer">
                <p>Este mensaje fue enviado desde su formulario de contacto.</p>
                <p>© ${new Date().getFullYear()} - Sistema automático de correo</p>
              </div>
            </div>
          </body>
          </html>
        `
      };

    try {
        await transporter.sendMail(mailOptions);
        res.redirect('/');
    } catch (error) {
        console.error(error);
        res.status(500).redirect('/');
    }
});


app.get("/eventos", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "eventos.html"));
});

app.get("/admin-menu", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "admin-menu.html"));
});

app.get("/inscripciones", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "inscripciones.html"));
});

app.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "login.html"));
});

app.get("/visualizarInscripciones", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "visualizarInscripciones.html"));
});

app.get("/", eventoController.home);
app.get("/api/eventos", eventoController.obtenerEventos);
app.post("/api/eventos", eventoController.agregarEventos);

app.get("/api/inscripciones", inscripcionController.obtenerInscripciones);
app.post("/api/inscripciones", inscripcionController.agregarInscripcion);
app.get("/api/inscripciones/:id/inscritos", inscripcionController.obtenerInscripcionesPorEvento);

app.post("/login", authController.login);



