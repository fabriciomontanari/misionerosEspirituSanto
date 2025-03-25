async function cargarEventos() {
    const response = await fetch("/api/eventos");
    const eventos = await response.json();
    const contenedor = document.getElementById("eventosContainer");

    eventos.forEach(evento => {
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
            <h2>${evento.nombreEvento}</h2>
            <p><strong>Fecha:</strong> ${evento.fecha}</p>
            <p><strong>Hora:</strong> ${evento.hora}</p>
            <p><strong>Lugar:</strong> ${evento.lugar}</p>
            <button data-id="${evento.id}">Ver inscritos</button>
            <div class="inscritos" id="inscritos-${evento.id}" style="display: none;"></div>
        `;

        const boton = card.querySelector("button");
        boton.addEventListener("click", async function () {
            const eventoId = this.getAttribute("data-id");
            const contenedorInscritos = document.getElementById(`inscritos-${eventoId}`);

            if (contenedorInscritos.style.display === "block") {
                contenedorInscritos.style.display = "none";
                this.textContent = "Ver inscritos";
                return;
            }

            try {
                const res = await fetch(`/api/inscripciones/${eventoId}/inscritos`);
                const inscritos = await res.json();

                if (inscritos.length === 0) {
                    contenedorInscritos.innerHTML = "<p>No hay inscritos aún.</p>";
                } else {
                    contenedorInscritos.innerHTML = `
                        <ul>
                            ${inscritos.map(u => `<li>${u.nombre} - ${u.correo}</li>`).join("")}
                        </ul>
                    `;
                }

                contenedorInscritos.style.display = "block";
                this.textContent = "Ocultar inscritos";
            } catch (err) {
                contenedorInscritos.innerHTML = "<p>Error al cargar inscritos.</p>";
                contenedorInscritos.style.display = "block";
            }
        });

        contenedor.appendChild(card);
    });
}

cargarEventos();