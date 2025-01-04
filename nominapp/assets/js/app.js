let categorias = [];
let extras = {};
let quinquenio = 0;
let polivalencia = 0;
let data = [];
let totalSum = 0;
let baseCotiz = 0;
let salarioBase = 0;
let antiguedad = 0;
let days = 0;
const maximo2025 = 4909;
const maximo = 4495.50;

// A descontar
const dtos_especie = 5;
const cont_comunes = 4.8;
const form_pro = 0.1;
const desempleo = 1.55;
const cta_esp = 25;
let trib_irpf = 0;

// Obtenemos referencia al select y elementos del DOM
const inputs = document.querySelectorAll('input');
const checkboxes = document.querySelectorAll('input[type="checkbox"]');
const selectCategoria = document.getElementById("categoria-select");
const salarioBaseElement = document.getElementById("salario_base");
const selectAntiguedad = document.getElementById("antiguedad-select");
const antiguedadElement = document.getElementById("antiguedad");
const selectDiaslaborables = document.getElementById("diaslaborables");
const polivalenciaElement = document.getElementById("polivalencia");
const seguroElement = document.getElementById("seguro");

const tardeElement = document.getElementById("tarde");
const tardeTotal = document.getElementById("tardeTotal");

const tarde_veranoElement = document.getElementById("tarde_verano");
const tardeveranoTotal = document.getElementById("tardeveranoTotal");

const remateElement = document.getElementById("remate");
const remateTotal = document.getElementById("remateTotal");

const remate_festivoElement = document.getElementById("remate_festivo");
const rematefestivoTotal = document.getElementById("rematefestivoTotal");

const remate_nocturnoElement = document.getElementById("remate_nocturno");
const rematenocturnoTotal = document.getElementById("rematenocturnoTotal");

const remate_noct_festivoElement = document.getElementById("remate_noct_festivo");
const rematenocturnorestivoTotal = document.getElementById("rematenocturnorestivoTotal");

const nocturnoElement = document.getElementById("nocturno");
const nocturnoTotal = document.getElementById("nocturnoTotal");

const noct_festivoElement = document.getElementById("noct_festivo");
const nocturnofestivoTotal = document.getElementById("nocturnofestivoTotal");


const festivoElement = document.getElementById("festivo");
const festivoTotal = document.getElementById("festivoTotal");

const doble_festivoElement = document.getElementById("doble_festivo");
const doblefestivoTotal = document.getElementById("doblefestivoTotal");

const nocfestivoElement = document.getElementById("nocfestivo");

const doble_sinElement = document.getElementById("doble_sin");
const doblesinTotal = document.getElementById("doblesinTotal");

const doble_conElement = document.getElementById("doble_con");
const dobleconTotal = document.getElementById("dobleconTotal");

const partidaElement = document.getElementById("partida");
const partidaTotal = document.getElementById("partidaTotal");

const renuncia_normalElement = document.getElementById("renuncia_normal");
const renuncia_tardeElement = document.getElementById("renuncia_tarde");
const renuncia_tarde_veranoElement = document.getElementById("renuncia_tarde_verano");
const renuncia_nocheElement = document.getElementById("renuncia_noche");
const renuncia_dobleElement = document.getElementById("renuncia_doble");
const penosidadElement = document.getElementById("penosidad");
const irpfElement = document.getElementById("irpf");
const total = document.getElementById("total");

function updateTotal(){    
    categorias = data.categorias;
    quinquenio = data.extras.quinquenio;
    diaslaborables = selectDiaslaborables.value;    
    polivalencia = data.extras.polivalencia;    
    seguro = data.extras.seguro;
    penosidad = data.extras.penosidad * days;

    nocturno = data.extras.nocturno * nocturnoElement.value;
    nocturnoTotal.textContent = nocturno;
    
    festivo = data.extras.festivo * festivoElement.value;
    festivoTotal.textContent = festivo;
    
    noct_festivo = data.extras.noct_festivo * noct_festivoElement.value;
    nocturnofestivoTotal.textContent = noct_festivo;

    tarde = data.extras.tarde * tardeElement.value;
    tardeTotal.textContent = tarde;

    tarde_verano = data.extras.tarde_verano * tarde_veranoElement.value;
    tardeveranoTotal.textContent = tarde_verano;
    
    remate = data.extras.remate * remateElement.value;
    remateTotal.textContent = remate;    
    
    remate_festivo = data.extras.remate_festivo * remate_festivoElement.value;
    rematefestivoTotal.textContent = remate_festivo;    
    
    remate_nocturno = data.extras.remate_nocturno * remate_nocturnoElement.value;
    rematenocturnoTotal.textContent = remate_nocturno;    
    
    remate_noct_festivo = data.extras.remate_noct_festivo * remate_noct_festivoElement.value;
    rematenocturnorestivoTotal.textContent = remate_noct_festivo;    
    
    doble_sin = data.extras.doble_sin * doble_sinElement.value;
    doblesinTotal.textContent = doble_sin;    
    
    doble_con = data.extras.doble_con * doble_conElement.value;
    dobleconTotal.textContent = doble_con;    
    
    doble_festivo = data.extras.doble_festivo * doble_festivoElement.value;
    doblefestivoTotal.textContent = doble_festivo;    

    partida = data.extras.partida * partidaElement.value;
    partidaTotal.textContent = partida;

    renuncia_normal = parseFloat(data.extras.renuncia_normal).toFixed(2);

    renuncia_tarde = data.extras.renuncia_tarde;
    renuncia_tarde_verano = data.extras.renuncia_tarde_verano;
    renuncia_noche = data.extras.renuncia_noche * renuncia_nocheElement.value;
    renuncia_doble = data.extras.renuncia_doble * renuncia_dobleElement.value;
    

    // Cálculo de totales    
    salarioBase = parseFloat(salarioBaseElement.textContent);
    antiguedad = parseFloat(antiguedadElement.textContent).toFixed(2);    
    polivalenciaElement.textContent = polivalencia;
    seguroElement.textContent = data.extras.seguro;
    penosidadElement.textContent = penosidad;
    checkboxes.forEach(checkbox => {
        renuncia_normalElement.checked ? renuncia_normal = data.extras.renuncia_normal : renuncia_normal = 0;
        renuncia_tardeElement.checked ? renuncia_tarde = data.extras.renuncia_tarde : renuncia_tarde = 0;
        renuncia_tarde_veranoElement.checked ? renuncia_tarde_verano = data.extras.renuncia_tarde_verano : renuncia_tarde_verano = 0;
        renuncia_nocheElement.checked ? renuncia_noche = data.extras.renuncia_noche : renuncia_noche = 0;
        renuncia_dobleElement.checked ? renuncia_doble = data.extras.renuncia_doble : renuncia_doble = 0;        
    });
    
    salarioBase = parseFloat(salarioBase);
    antiguedad = parseFloat(antiguedad);
    nocturno = parseFloat(nocturno);
    festivo = parseFloat(festivo);
    noct_festivo = parseFloat(noct_festivo);
    tarde = parseFloat(tarde);
    tarde_verano = parseFloat(tarde_verano);
    remate = parseFloat(remate);
    remate_festivo = parseFloat(remate_festivo);
    remate_nocturno = parseFloat(remate_nocturno);
    remate_noct_festivo = parseFloat(remate_noct_festivo);
    doble_sin = parseFloat(doble_sin);
    doble_con = parseFloat(doble_con);
    doble_festivo = parseFloat(doble_festivo);
    renuncia_normal = parseFloat(renuncia_normal);
    renuncia_tarde = parseFloat(renuncia_tarde);
    renuncia_tarde_verano = parseFloat(renuncia_tarde_verano);
    renuncia_noche = parseFloat(renuncia_noche);
    renuncia_doble = parseFloat(renuncia_doble);
    partida = parseFloat(partida);

    totalSum = (salarioBase + antiguedad + polivalencia + penosidad + seguro + nocturno + festivo + noct_festivo + tarde + tarde_verano + remate + remate_festivo + remate_nocturno + remate_noct_festivo + doble_sin + doble_con + doble_festivo + renuncia_normal + renuncia_tarde + renuncia_tarde_verano + renuncia_noche + renuncia_doble + partida).toFixed(2);        
    
    //  4.909 Cotiz. Max
    totalSum > maximo ? baseCotiz = maximo : baseCotiz = totalSum;

    trib_irpf = (totalSum * irpfElement.value / 100);
    totalSum = totalSum - trib_irpf - (baseCotiz * cont_comunes / 100) - (baseCotiz * form_pro / 100) - (baseCotiz * desempleo / 100);    
    total.textContent = "TOTAL: " +  parseFloat(totalSum).toFixed(2);
}


window.addEventListener("load", async () => {
    try {
        const response = await fetch("./assets/data/tabla_salarial_2025.json"); // Cambia la ruta
        if (!response.ok) {
            throw new Error("Error al cargar el archivo JSON");
        }
        data = await response.json();                
        updateTotal();
    } catch (error) {
        console.error("Error al cargar el JSON:", error);
    }
});

inputs.forEach(input => {
    input.addEventListener('input', updateTotal);
});

checkboxes.forEach(input => {    
    input.addEventListener('change', updateTotal);    
});

// Evento para actualizar el salario base según la categoría seleccionada
selectCategoria.addEventListener("change", (event) => {
    const selectedValue = event.target.value; // Obtener el valor seleccionado            
    // Buscar la categoría correspondiente en el JSON
    const categoriaSeleccionada = categorias.find(
        (categoria) => categoria.categoria === selectedValue
    );

    if (categoriaSeleccionada) {
        // Mostrar el salario base
        salarioBaseElement.textContent = categoriaSeleccionada.salario_base;
    } else {
        // Si no se encuentra la categoría, mostrar mensaje por defecto
        salarioBaseElement.textContent = "0.00";
    }
    updateTotal();
});

// Evento para actualizar la antigüedad
selectAntiguedad.addEventListener("change", (event) => {
    const selectedValue = event.target.value;
    antiguedadElement.textContent = selectedValue * parseFloat(quinquenio);
    updateTotal();
});

// Evento para días laborables
selectDiaslaborables.addEventListener("change", (event) => {
    const selectedValue = event.target.value;
    days = selectedValue;
    updateTotal();
});


