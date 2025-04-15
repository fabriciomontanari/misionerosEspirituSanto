document.addEventListener("DOMContentLoaded", async () => {
    const eventsContainer = document.getElementById("events-container");

    try {
        const response = await fetch("/api/eventos");
        if (!response.ok) throw new Error("Error al obtener eventos.");

        const eventos = await response.json();

        eventsContainer.innerHTML = ""; 

        eventos.forEach(evento => {
            const eventCard = document.createElement("div");
            eventCard.classList.add("event-card", "active");            

            const imagenSrc = evento.imagen 
                ? `data:image/png;base64,${evento.imagen}` 
                : "/public/img/Captura de pantalla 2025-03-16 a la(s) 15.38.41.png"; 

            eventCard.innerHTML = `
                <div class="event-image">
                    <img src="${imagenSrc}" alt="${evento.nombreEvento}">
                </div>
                <div class="event-details">
                    <h3>${evento.nombreEvento}</h3>
                    <p class="event-description">${evento.descripcion || "Sin descripción disponible"}</p>
                    <div class="event-info">
                        <p><i class="far fa-calendar"></i> ${formatearFecha(evento.fecha)}</p>
                        <p><i class="fas fa-map-marker-alt"></i> ${evento.lugar}</p>
                        <p><i class="far fa-clock"></i> ${evento.hora}</p>
                        <p><i class="fas fa-users"></i> Para personas de ${evento.edadMinima} a ${evento.edadMaxima} años.</p>
                    </div>
                    <a href="/inscripciones">
                    <button class="inscribirse">INSCRIBIRSE <i class="fas fa-arrow-right"></i></button>
                    </a>
                </div>
            `;

            eventsContainer.appendChild(eventCard);
        });

    } catch (error) {
        console.error("Error al cargar eventos:", error);
        eventsContainer.innerHTML = "<p>No se pudieron cargar los eventos.</p>";
    }
});

function formatearFecha(fecha) {
    const opciones = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(fecha).toLocaleDateString('es-ES', opciones);
}
