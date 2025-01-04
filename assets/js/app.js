let people = []; // Variable para almacenar las personas cargadas desde el JSON
let datosCargados = false; // Bandera para verificar si los datos ya están cargados

// Chequea la Versión de la aplicación y refresca en caso necesario
fetch('./version.json')
    .then(response => response.json())
    .then(data => {
        const storedVersion = localStorage.getItem('appVersion');
        if (storedVersion !== data.version) {
            // Nueva versión detectada
            console.log(`Nueva versión: ${data.version}. Actualizando...`);
            localStorage.clear();
            localStorage.setItem('appVersion', data.version);
            window.location.reload(true); // Recarga forzada
        } else {
            console.log(`Versión actual: ${data.version}`);
        }
    })
    .catch(err => console.error('Error al verificar la versión:', err));








// CAMBIO DE PANTALLA ////////////////////////////////////////////////////

function changeScreen(screenId) {
    const sections = document.querySelectorAll('.screen');
    sections.forEach(section => section.style.display = 'none');
    
    const targetScreen = document.getElementById(screenId);
    if (targetScreen) {        
        targetScreen.style.display = 'flex';        
    }
    
    if (screenId == "calendar_Screen") {
        // CALENDARIO ////////////////////////////////////////////////////
        loadCalendar();
    }
}

const screenId = 'mainScreen';
console.log(screenId);

window.addEventListener("load", (event) => {
    changeScreen('mainScreen');
});

