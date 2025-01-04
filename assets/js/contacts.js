let people = []; // Variable para almacenar las personas cargadas desde el JSON
let datosCargados = false; // Bandera para verificar si los datos ya están cargados

// Cargar personas desde el archivo JSON
async function cargarPersonas() {
    try {
        const response = await fetch('./assets/data/phoneList.json');
        if (!response.ok) {
            throw new Error('Error al cargar el archivo JSON');
        }
        const data = await response.json(); // Procesa el contenido
        people = data.datos;        
        datosCargados = true; // Marca que los datos están cargados
    } catch (error) {
        console.log("Error al cargar el JSON:", error);
        document.getElementById("resultadoBusqueda").innerHTML = `<p>Error al cargar los datos.</p>`;
    }
}

// Mostrar personas en la interfaz
function mostrarPersonas(data) {
    const contenedor = document.getElementById("resultadoBusqueda");
    contenedor.innerHTML = "";

    if (data.length > 0) {
        data.forEach(person => {
            const div = document.createElement("div");
            div.classList.add("person");
            div.innerHTML = `
                <p class="p_number">${person.number}</p>
                <a class="card superminicard editcontact" onclick="abrirModal('editContactModal', ${person.number})">
                    <i class="ti ti-edit orange"></i>
                </a>            
                <p>${person.name}</p>                
                <a href="tel:+34${person.phone}" class="p_phone"><i class="ti ti-phone pink"></i> ${person.phone}</a>
                <!-- Botón para abrir el modal de modificar contacto -->
                
            `;
            contenedor.appendChild(div);
        });
    } else {
        contenedor.innerHTML = `<p>No se encontraron resultados</p>`;
    }
}

// Inicializa los datos al cargar la página
function inicializarContactos() {
    if (!datosCargados) {
        const contenedor = document.getElementById("resultadoBusqueda");
        contenedor.innerHTML = `<p>Cargando contactos...</p>`;
        cargarPersonas()
            .then(() => {
                contenedor.innerHTML = `<p>Contactos cargados. Introduce un término de búsqueda.</p>`;
            })
            .catch(error => {
                contenedor.innerHTML = `<p>Error al cargar contactos. Intenta de nuevo más tarde.</p>`;
            });
    }
}

// Buscar personas por texto
function buscarPersonas() {
    if (!datosCargados) {
        document.getElementById("resultadoBusqueda").innerHTML = 
            `<p>Espera mientras se cargan los datos...</p>`;
        return;
    }

    const textoBusqueda = document.getElementById("search").value.trim().toLowerCase();

    if (!textoBusqueda) {
        document.getElementById("resultadoBusqueda").innerHTML = 
            `<p>Introduce un término de búsqueda</p>`;
        return;
    }

    const resultados = people.filter(person => 
        person.number.includes(textoBusqueda) || person.name.toLowerCase().includes(textoBusqueda)
    );
    mostrarPersonas(resultados);
}

// Agregar un nuevo contacto
function agregarContacto(number, name, phone) {
    if (!number || !name || !phone) {
        alert("Todos los campos son obligatorios para agregar un contacto.");
        return;
    }

    if (people.some(person => person.number === number)) {
        alert("El número de estiba ya existe. Prueba con otro.");
        return;
    }

    const newContact = { number, name, phone };
    people.push(newContact);

    alert(`Contacto añadido: ${number}`);
    //mostrarPersonas(people);
}

// Modificar un contacto existente
function modificarContacto(number, updatedName, updatedPhone) {
    const personIndex = people.findIndex(person => person.number === number);

    if (personIndex === -1) {
        alert("No se encontró el contacto con ese número.");
        return;
    }

    if (updatedName) people[personIndex].name = updatedName;
    if (!updatedName) updatedName = people[personIndex].name;
    if (updatedPhone) people[personIndex].phone = updatedPhone;
    if (!updatedPhone) updatedPhone = people[personIndex].phone;
    alert(`Contacto modificado: ${people[personIndex].number}`);
    console.log("VA1: ");
    console.log(number, updatedName, updatedPhone);    
    //mostrarPersonas(people);    
    guardarContacto(number, updatedName, updatedPhone);
}

// Ejecuta al cargar la página
inicializarContactos();

// Abrir modal por ID
function abrirModal(modalId, number) {
    document.getElementById(modalId).style.display = "block";
    if (number) {
        modnumber = document.getElementById("editNumber");
        modnumber.value = number;
    }
}

// Cerrar modal por ID
function cerrarModal(modalId) {    
    document.getElementById(modalId).style.display = "none";
}


// Agregar Contacto desde Modal
function confirmarAgregar() {
    const number = document.getElementById("addNumber").value.trim();
    const name = document.getElementById("addName").value.trim();
    const phone = document.getElementById("addPhone").value.trim();

    if (!number || !name || !phone) {
        alert("Todos los campos son obligatorios.");
        return;
    }

    agregarContacto(number, name, phone);
    guardarContacto(number, name, phone, 'addContactModal');
    cerrarModal('addContactModal');
}

// Modificar Contacto desde Modal
function confirmarModificar() {
    const number = document.getElementById("editNumber").value.trim();
    const updatedName = document.getElementById("editName").value.trim();
    const updatedPhone = document.getElementById("editPhone").value.trim();

    if (!number) {
        alert("Debes introducir el número de estiba para modificar un contacto.");
        return;
    }
    

    modificarContacto(number, updatedName, updatedPhone);
    //guardarContacto(number, updatedName, updatedPhone, 'editContactModal');
    cerrarModal('editContactModal');
}

// Guardar un nuevo contacto o modificar uno existente
async function guardarContacto(number, name, phone) {
    console.log("VA: ");
    console.log(number, name, phone);   
    // Añadir o modificar el contacto
    if (number && name && phone) {
        const newContact = { number, name, phone };
        people.push(newContact);  // Si estás añadiendo un nuevo contacto

        // Enviar al servidor para actualizar el archivo JSON
        try {
            const response = await fetch('updateContacts.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ action: 'add', contact: newContact }) // Enviar nueva persona
            });

            if (!response.ok) {
                throw new Error('Hubo un error al guardar el contacto');
            }

            const result = await response.json();
            if (result.success) {
                console.log('Contacto guardado con éxito');
            } else {
                console.log('Error al guardar el contacto');
            }
        } catch (error) {
            console.error('Error de conexión o en la solicitud', error);
        }        
    } else {
        alert('Por favor, complete todos los campos');
    }
}
