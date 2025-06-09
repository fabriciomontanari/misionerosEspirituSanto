document.addEventListener("DOMContentLoaded", async () => {
  const eventoSelect = document.getElementById("eventoId");
  const eventDate = document.getElementById("eventDate");
  const eventTime = document.getElementById("eventTime");
  const eventLocation = document.getElementById("eventLocation");
  const eventCapacity = document.getElementById("eventCapacity");

  let eventos = [];

  try {
    const response = await fetch("/api/eventos");
    if (!response.ok) throw new Error("No se pudieron obtener los eventos");
    eventos = await response.json();

    if (eventos.length === 0) {
      Swal.fire({
        icon: 'info',
        title: 'Información',
        text: 'No hay eventos disponibles.'
      });
      return;
    }

    eventoSelect.innerHTML = '<option value="" disabled selected>Seleccione un evento</option>';
    eventos.forEach(evento => {
      const option = document.createElement("option");
      option.value = evento.id;
      option.textContent = evento.nombreEvento;
      eventoSelect.appendChild(option);
    });

    eventoSelect.addEventListener("change", function () {
      const selectedId = parseInt(eventoSelect.value);
      const selectedEvento = eventos.find(e => e.id === selectedId);
      if (selectedEvento) {
        eventDate.textContent = `📅 ${selectedEvento.fecha}`;
        eventTime.textContent = `⏰ ${selectedEvento.hora}`;
        eventLocation.textContent = `📍 ${selectedEvento.lugar}`;
      }
    });

    if (eventoSelect.value) {
      eventoSelect.dispatchEvent(new Event("change"));
    }

  } catch (error) {
    console.error("Error cargando eventos:", error);
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Hubo un problema al cargar los eventos.'
    });
  }

  document.getElementById("inscripcionForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const nombre = document.getElementById("nombre").value.trim();
    const correo = document.getElementById("correo").value.trim();
    const telefono = document.getElementById("telefono").value.trim();
    const eventoId = document.getElementById("eventoId").value;

    if (!nombre || !correo || !telefono || !eventoId) {
      Swal.fire({
        icon: 'warning',
        title: 'Campos incompletos',
        text: 'Por favor, complete todos los campos.'
      });
      return;
    }

    const inscripcion = { nombre, correo, telefono, eventoId };

    try {
      const response = await fetch("/api/inscripciones", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(inscripcion)
      });

      if (!response.ok) throw new Error("Error al inscribirse");

      Swal.fire({
        icon: 'success',
        title: '¡Éxito!',
        text: 'Inscripción realizada con éxito. \nRecibirás un correo de confirmación. \nRecuerda revisar tu bandeja de spam.',
        confirmButtonText: 'Aceptar'
      }).then(() => {
        e.target.reset();
        eventDate.textContent = 'Fecha del evento';
        eventTime.textContent = 'Hora del evento';
        eventLocation.textContent = 'Ubicación';
      });

    } catch (error) {
      console.error("Error en la inscripción:", error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un problema al realizar la inscripción.'
      });
    }
  });
});
