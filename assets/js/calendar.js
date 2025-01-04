let currentMonth = new Date().getMonth();  // Mes actual
let currentYear = new Date().getFullYear(); // Año actual
let currentDay = new Date().getDate(); // Día Actual
const eventContent = document.getElementById("event-content");

const semanaGrandeInicio = new Date(2025, 7, 18); // 18 de agosto
const semanaGrandeFin = new Date(2025, 7, 24);    // 24 de agosto

const calendarContainer = document.getElementById("calendar");
const monthYearDisplay = document.getElementById("month-year");
const todayButton = document.getElementById("todayButton");
const prevButton = document.getElementById("prevButton");
const nextButton = document.getElementById("nextButton");
let event_text = document.getElementById("event_text");

// Cargar eventos desde un archivo JSON
let events = [];  // Array para almacenar los eventos
fetch('./assets/data/events.json')
    .then(response => response.json())
    .then(data => {
        events = data.events;  // Cargar los eventos desde el archivo JSON
        loadCalendar();  // Llamar a esta función una vez carguen los eventos
    });

// Inicializamos el calendario cuando se entra en la pantalla
function loadCalendar() {
    generateCalendar(currentYear, currentMonth); // Renderiza el calendario
}

// Genera el calendario
function generateCalendar(year, month) {
    // Limpiar contenido previo
    calendarContainer.innerHTML = "";
    let currentMonth = new Date().getMonth();  // Mes actual
    let currentYear = new Date().getFullYear(); // Año actual
    // Obtener primer día del mes y total de días
    const firstDayOfMonth = new Date(year, month, 1);
    const totalDays = new Date(year, month + 1, 0).getDate();
    const firstDayOfWeek = firstDayOfMonth.getDay(); // 0 es Domingo, 6 es Sábado
    // Actualizar encabezado de mes y año
    monthYearDisplay.textContent = firstDayOfMonth.toLocaleString("default", {
        month: "long",
        year: "numeric",
    });
    // Crear tabla para el calendario
    const table = document.createElement("table");
    const headerRow = document.createElement("tr");
    ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"].forEach((day) => {
        const th = document.createElement("th");
        th.textContent = day;
        headerRow.appendChild(th);
    });
    table.appendChild(headerRow);
    // Crear filas y celdas
    let dayCounter = 1;
    let firstCol = 0;
    // El Domingo es día 0
    firstDayOfWeek == 0 ? firstCol = 6: firstCol = firstDayOfWeek -1;        
    // Total de filas que se van a utilizar     // Días después de la primera fila      // totalDays - (7 - firstCol)
    let daysRowOne = 7 - firstCol;

    // Al total de días le restamos los días de la primera fila y los de la última
    // Los de la última se calculan ((totalDays - daysRowOne)%7)
    // Esto se divide entre 7 para saber el total de filas que van a ser necesarias
    // Pero aquí todavía no sabemos si habrá una fila con los días restantes
    let totalRows = ((totalDays - daysRowOne - ((totalDays - daysRowOne)%7))/7);

    // Después al resultado se le suma 1 o 0, dependiendo si han quedado días sueltos después de rellenar filas completas
    // Si al total de días le restamos los de la primera fila y tenemos %7 (días sueltos después de rellenar filas completas)
        // entonces sumamos 1 fila adicional
    (totalDays - daysRowOne)%7 ? totalRows+=1 : totalRows+=0;

    // Se generan las Filas
    for (let row = 0; row <= totalRows; row++) {
        const tr = document.createElement("tr");

        // Y las Columnas
        // Primeras 7 columnas, de Lunes a Domingo
        for (let col = 0; col <= 6; col++) {            
            const td = document.createElement("td");

            // Añadir celdas vacías si el mes no empieza en Domingo
            if (row === 0 && col < firstCol) {
                tr.appendChild(td);
            
                // Rellenar celdas con día del mes
            } else if (dayCounter <= totalDays) {
                td.textContent = dayCounter;

                // El día de HOY
                if ((dayCounter == currentDay) && (currentMonth == month) && (currentYear == year)){                    
                    td.classList.add(`today`);
                }           
                
                
                // Añadir eventos
                const dateString = `${year}-${String(month + 1).padStart(2, "0")}-${String(dayCounter).padStart(2, "0")}`;
                const todayEvents = events.filter(event => event.date === dateString);
                if (todayEvents.length > 0) {
                    todayEvents.forEach(event => {
                        td.classList.add(`event-${event.type}`);
                        td.title = event.description;
                    });
                }                
                td.addEventListener("click", function () {
                    event_text.innerHTML = td.title;                        
                    if (td.title != "") {
                        eventContent.classList.replace("hidden", "visible");
                    } else {
                        eventContent.classList.replace("visible", "hidden");
                    }
                    
                });
                dayCounter++;
                tr.appendChild(td);
            } else {
                // Añadir celdas vacías al final del mes, hasta completar la fila
                tr.appendChild(td);
            }                                    
        }

        // Última Columna, para la semana de tarde
        col = 7;
        if (year>2024)
            {
                fechaActual = new Date(year, month, dayCounter-1); // Fecha específica del mes
                
                // Calculamos la semana en la primera fila y después simplemente vamos aumentando
                if (row == 0) {
                    semanaActual = calcularSemanaTarde(fechaActual); // Calcular semana de tarde
                } else {                    
                    // 4 + 1 = 5%4|1    // 1 + 1 = 2%4|2    // 2 + 1 = 3%4|3   // 3 + 1 = 4%4|0   // 0 + 1 = 1%4|1
                    semanaActual = ((semanaActual+1)%4);
                    if (semanaActual == 0) {
                        semanaActual = 4;
                    }
                }
                const td = document.createElement("td");
                td.classList.add("semanatarde");
                
                // SEMANA GRANDE
                if (fechaActual.toDateString() == semanaGrandeFin.toDateString()) {                    
                    td.textContent = "-";
                    semanaActual -= 1;
                }  else {
                // RESTO DE SEMANAS
                    td.textContent = semanaActual;
                }
                tr.appendChild(td);
        }
        table.appendChild(tr);
    }
    calendarContainer.appendChild(table);
}


// Mostrar eventos cuando se hace clic en un día
function showPopup(events) {
    const popup = document.getElementById("show_event_text");
    const eventContent = document.getElementById("event-content");
    closepopup.style.display = "block";
    // Si hay eventos, mostrar información
    if (events.length > 0) {
        eventContent.classList.replace("hidden", "visible");
        popup.style.display = "block";
        eventContent.innerHTML = "<h3>Eventos:</h3>";
        events.forEach(event => {            
            eventContent.innerHTML += `<p>${event.description}</p>`;
        });
    }
};


// Cambiar al día actual
todayButton.addEventListener("click", function () {
    currentMonth = new Date().getMonth();
    currentYear = new Date().getFullYear();
    currentDay = new Date().getDate();
    event_text.innerHTML = "";
    eventContent.classList.replace("visible", "hidden");    
    generateCalendar(currentYear, currentMonth);
});


// Cambiar al mes anterior
prevButton.addEventListener("click", function () {
    currentMonth--;
    event_text.innerHTML = "";
    eventContent.classList.replace("visible", "hidden");
    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    }
    generateCalendar(currentYear, currentMonth);
});


// Cambiar al siguiente mes
nextButton.addEventListener("click", function () {
    event_text.innerHTML = "";    
    eventContent.classList.replace("visible", "hidden");
    currentMonth++;
    if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    }        
    generateCalendar(currentYear, currentMonth);
});





function calcularSemanaTarde(fecha) {
    // Establecemos como referencia el 1 de Enero de 2025 (semana 4)    
    const referencia = new Date(2025, 0, 1); // 1 de Enero 2025 / Semana 4                    

    // Calculamos la diferencia en días entre la fecha y la referencia
    const diferenciaMs = fecha - referencia;
    let diasTranscurridos = Math.round((fecha - referencia) / (1000 * 60 * 60 * 24));
    // Semana que debe omitirse    
    if (fecha >= semanaGrandeInicio && fecha <= semanaGrandeFin) {
        return null; // No aplica ninguna semana de tarde
    }    
    if (fecha > semanaGrandeFin) {
        diasTranscurridos -= 7; // Restamos los 7 días de la semana omitida
    }

    // Calculamos las semanas transcurridas desde la referencia
    let semanasTrans = Math.floor(diasTranscurridos / 7);
    // Aplicamos la fórmula: ((semanasTrans + 4) % 4) + 1            
    //const semanaTarde = ((semanasTrans + 4) % 4) + 1;    
    //let semanaTarde = semanasTrans%4;
    //semanaTarde += 4;
    let semanaTarde = ((semanasTrans+3)%4)+1;    
    return (semanaTarde);
}
