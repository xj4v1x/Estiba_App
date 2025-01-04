// SORTEO ////////////////////////////////////////////////////

function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]]; // Intercambia elementos
    }
}

function generateUniqueRandomNumbers(x, y) {
    const range = Array.from({ length: x }, (_, i) => i + 1); // Genera [1, 2, ..., x]
    shuffleArray(range);
    return range.slice(0, y); // Toma los primeros y elementos del arreglo mezclado
}

function sorteo() {
    let total_number = document.getElementById("total_number").value;
    let total_pacasa = document.getElementById("total_pacasa").value;
    let sorteo_result = document.getElementById("sorteo_result").value;
    let resultado = [];
    let respuesta = "";
    if (total_number && total_pacasa){
        console.log("Sorteo");
        resultado = generateUniqueRandomNumbers(total_number, total_pacasa);        
        for (let i=0; i< resultado.length; i++) {
            if (i === resultado.length - 1) {
                // Último elemento
                if (total_pacasa > 1) {
                    respuesta += "y " + resultado[i];
                } else {                    
                    respuesta += resultado[i];
                }
            } else if (i === resultado.length - 2) {
                // Penúltimo elemento
                respuesta += resultado[i] + " ";
            } else {
                // Otros elementos
                respuesta += resultado[i] + ", ";
            }
        }        
        if (total_pacasa > 1) {
            document.getElementById("sorteo_result").innerText = `Se van para casa los números:  ${respuesta}`;
        } else {
            document.getElementById("sorteo_result").innerText = `Se va para casa el número:  ${respuesta}`;            
        }
        
    } else {
        document.getElementById("sorteo_result").innerText = `Introduce cuántas personas estáis y cuántas se van para casa`;
    }

}
