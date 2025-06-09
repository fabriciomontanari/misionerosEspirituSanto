const inscripcionModel = require("../models/inscripcionModel");
const nodemailer = require("nodemailer");

async function agregarInscripcion(req, res) {
    try {
        const { nombre, correo, telefono, eventoId } = req.body;

        if (!nombre || !correo || !telefono || !eventoId) {
            return res.status(400).json({ success: false, message: "Faltan datos obligatorios." });
        }

        await inscripcionModel.agregarInscripcion({ nombre, correo, telefono, eventoId });

        const evento = await inscripcionModel.obtenerEventoPorId(eventoId);

        const transporter = nodemailer.createTransport({
            service: "gmail", 
            auth: {
                user: "noreplymisionerosespiritusanto@gmail.com", 
                pass: "gfky tcot qhqb dlin" 
            }
        });

        const mailOptions = {
            from: "noreplymisionerosespiritusanto@gmail.com",
            to: correo,
            subject: "Detalles de Inscripción al Evento",
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
                    background-color: #3a506b;
                    color: white;
                    padding: 20px;
                    text-align: center;
                  }
                  .header h1 {
                    margin: 0;
                    font-size: 24px;
                  }
                  .content {
                    padding: 20px;
                    background-color: #ffffff;
                  }
                  .event-details {
                    background-color: #f8f9fa;
                    border-left: 4px solid #3a506b;
                    padding: 15px;
                    margin: 20px 0;
                    border-radius: 0 4px 4px 0;
                  }
                  .event-details p {
                    margin: 8px 0;
                  }
                  .footer {
                    text-align: center;
                    padding: 15px;
                    background-color: #f8f9fa;
                    font-size: 14px;
                    color: #666;
                    border-top: 1px solid #e1e1e1;
                  }
                  .logo {
                    margin-bottom: 15px;
                    max-width: 180px;
                  }
                  .button {
                    display: inline-block;
                    background-color: #5d7ca6;
                    color: white;
                    padding: 10px 20px;
                    text-decoration: none;
                    border-radius: 4px;
                    margin-top: 15px;
                    font-weight: bold;
                  }
                  .button:hover {
                    background-color: #3a506b;
                  }
                </style>
              </head>
              <body>
                <div class="email-container">
                  <div class="header">
                    <h1>Detalles de Inscripción</h1>
                  </div>
                  
                  <div class="content">
                    <h2>¡Bienvenido/a, ${nombre}!</h2>
                    
                    <p>Gracias por inscribirte en nuestro evento. Tu registro ha sido confirmado y estamos emocionados de contar con tu presencia.</p>
                    
                    <div class="event-details">
                      <h3>${evento.nombreevento}</h3>
                      <p><strong>📅 Fecha:</strong> ${evento.fecha}</p>
                      <p><strong>⏰ Hora:</strong> ${evento.hora}</p>
                      <p><strong>📍 Lugar:</strong> ${evento.lugar}</p>
                    </div>
                    
                    <p>Te recomendamos llegar unos minutos antes para el registro. Si tienes alguna pregunta o necesitas información adicional, no dudes en contactarnos.</p>
                    
                  </div>
                  
                  <div class="footer">
                    <p><strong>Misioneros del Espíritu Santo</strong></p>
                    <p>Construyendo comunidad en Cristo</p>
                    <p>© ${new Date().getFullYear()} Misioneros del Espíritu Santo. Todos los derechos reservados.</p>
                  </div>
                </div>
              </body>
              </html>
            `
          };

        await transporter.sendMail(mailOptions);

        res.status(201).json({ success: true, message: "Inscripción realizada con éxito. Se ha enviado un correo de confirmación." });

    } catch (error) {
        console.error("Error al inscribirse:", error);
        res.status(500).json({
            success: false,
            message: "Error al realizar la inscripción",
            error: error.message
        });
    }
}

async function obtenerInscripciones(req, res) {
    try {
        const inscripciones = await inscripcionModel.obtenerInscripciones();
        res.json(inscripciones);
    } catch (error) {
        console.error("Error al obtener inscripciones:", error);
        res.status(500).json({
            success: false,
            message: "Error al obtener inscripciones",
            error: error.message
        });
    }
}


async function obtenerInscripcionesPorEvento(req, res) {
    try {
        const eventoId = parseInt(req.params.id);
        const inscritos = await inscripcionModel.obtenerInscripcionesPorEvento(eventoId);
        res.json(inscritos);
    } catch (error) {
        console.error("Error al obtener inscritos por evento:", error);
        res.status(500).json({
            success: false,
            message: "Error al obtener inscritos por evento",
            error: error.message
        });
    }
}



module.exports = {  
    agregarInscripcion,
    obtenerInscripciones,
    obtenerInscripcionesPorEvento
};
