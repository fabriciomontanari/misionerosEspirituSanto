document.getElementById("eventoForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const fileInput = document.getElementById("imagen");
    const file = fileInput.files[0];

    if (!file) {
        alert("Por favor, selecciona una imagen.");
        return;
    }

    const reader = new FileReader();

    reader.onloadend = async () => {
        const base64String = reader.result.split(",")[1];

        const nombreEvento = formData.get("nombreEvento").trim();
        const descripcion = formData.get("descripcion")?.trim() || null;
        const fecha = formData.get("fecha");
        let hora = formData.get("hora");

        const lugar = formData.get("lugar").trim();
        const edadMinima = parseInt(formData.get("edadMinima")) || 0;
        const edadMaxima = parseInt(formData.get("edadMaxima")) || 100;

        if (!hora) {
            alert("Por favor, ingrese una hora válida.");
            return;
        }

        const horaRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;
        if (!horaRegex.test(hora)) {
            alert("La hora ingresada no es válida. Use el formato HH:mm");
            return;
        }

        const evento = {
            nombreEvento,
            descripcion,
            fecha,
            hora,
            lugar,
            edadMinima,
            edadMaxima,
            imagen: base64String
        };

        console.log("Enviando datos:", evento);

        try {
            const response = await fetch("/api/eventos", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(evento)
            });

            if (!response.ok) throw new Error("Error al agregar el evento");

            alert("Evento agregado exitosamente.");
            e.target.reset(); 
        } catch (error) {
            console.error("Error al enviar el evento:", error);
            alert("Ocurrió un error al agregar el evento.");
        }
    };

    reader.readAsDataURL(file);
});
