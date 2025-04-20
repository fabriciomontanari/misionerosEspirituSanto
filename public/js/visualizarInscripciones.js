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
                        <button class="pdf-btn" onclick='generarPDF(${JSON.stringify(evento)})'>Descargar PDF</button>
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

async function generarPDF(evento) {
    const resInscritos = await fetch(`/api/inscripciones/${evento.id}/inscritos`);
    const inscritos = await resInscritos.json();
    const { jsPDF } = window.jspdf;
    
    const doc = new jsPDF({
      orientation: 'landscape',
      unit: 'mm',
      format: 'a4'
    });
    
    const primaryColor = [51, 51, 51];    
    const accentColor = [224, 168, 0];  
    const accentDark = [199, 148, 0];     
    const textDark = [34, 34, 34];         
    const textMedium = [85, 85, 85];      
    const bgWhite = [255, 255, 255];       
    
    doc.setFillColor(...primaryColor);
    doc.rect(0, 0, 297, 25, 'F');
    
    doc.setFillColor(...accentColor);
    doc.rect(0, 25, 297, 3, 'F');
    
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(24);
    doc.setTextColor(255, 255, 255); 
    doc.text(`${evento.nombreEvento}`, 20, 15);
    
    doc.setFont('helvetica', 'italic');
    doc.setFontSize(14);
    doc.text(`Listado de Inscritos`, 20, 22);
    
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(12);
    doc.setTextColor(...textDark);
    
    doc.setFillColor(...accentColor);
    doc.circle(25, 40, 3, 'F');
    doc.text(`Fecha: ${evento.fecha}`, 30, 40);
    
    doc.circle(25, 48, 3, 'F');
    doc.text(`Hora: ${evento.hora}`, 30, 48);
    
    doc.circle(25, 56, 3, 'F');
    doc.text(`Lugar: ${evento.lugar}`, 30, 56);
    
    const fechaActual = new Date().toLocaleDateString();
    doc.setFontSize(9);
    doc.setTextColor(...textMedium);
    doc.text(`Documento generado el ${fechaActual}`, 200, 56);
    
    const rows = inscritos.map(i => [i.nombre, i.correo, i.telefono || "-"]);
    
    doc.autoTable({
      startY: 65,
      head: [["Nombre", "Correo", "Teléfono"]],
      body: rows,
      theme: 'grid',
      headStyles: {
        fillColor: accentColor,
        textColor: [255, 255, 255],
        fontStyle: 'bold',
        fontSize: 12,
        halign: 'center'
      },
      bodyStyles: {
        fontSize: 11,
        textColor: textDark,
        lineWidth: 0.3
      },
      alternateRowStyles: {
        fillColor: [250, 250, 250]
      },
      columnStyles: {
        0: { fontStyle: 'bold' },
        2: { halign: 'center' }
      },
      margin: { top: 65, bottom: 25, left: 20, right: 20 },
      tableWidth: 'auto',
      styles: {
        cellPadding: 5,
        fontSize: 10
      },
    });
    
    const pageCount = doc.internal.getNumberOfPages();
    doc.setFillColor(...accentColor);
    
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.rect(0, doc.internal.pageSize.height - 15, doc.internal.pageSize.width, 3, 'F');
      
      doc.setFontSize(10);
      doc.setTextColor(...textMedium);
      doc.text(`Página ${i} de ${pageCount}`, doc.internal.pageSize.width / 2, doc.internal.pageSize.height - 5, { align: 'center' });
      
      doc.setFontSize(10);
      doc.setFont('helvetica', 'italic');
      doc.text(evento.nombreEvento, 20, doc.internal.pageSize.height - 5);
    }
    
    const fechaFormateada = evento.fecha.replace(/\//g, '-');
    doc.save(`Inscritos_${evento.nombreEvento}_${fechaFormateada}.pdf`);
  }



cargarEventos();
window.generarPDF = generarPDF;
