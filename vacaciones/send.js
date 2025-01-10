const fuera_oneCheckbox = document.getElementById("fuera_one");
const fuera_twoCheckbox = document.getElementById("fuera_two");
const quiero_oneCheckboxes = document.querySelectorAll('input[name="quiero_one[]"]');
const quiero_twoCheckboxes = document.querySelectorAll('input[name="quiero_two[]"]');

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("vacacionesForm");
    const successMessage = document.getElementById("successMessage");

    form.addEventListener("submit", function(event) {
        let valid = true;

        // Reset error messages
        document.querySelectorAll(".error").forEach(el => (el.textContent = ""));

        // Number validation
        const number = document.getElementById("number");
        if (!number.value || parseInt(number.value) <= 0) {
            document.getElementById("error-number").textContent =
                "El número es obligatorio";
            valid = false;
        }

        // Categoría validation
        const categoria = document.getElementById("categoria");
        if (!categoria.value) {
            document.getElementById("error-categoria").textContent =
                "Selecciona una categoría";
            valid = false;
        }

        // 'Me toca' validation
        const metoca = document.querySelector('input[name="metoca"]:checked');
        if (!metoca) {
            document.getElementById("error-metoca").textContent =
                "Selecciona un mes";
            valid = false;
        }

        // Validación de los checkboxes "fuera" y "quiero"
        const fuera_oneChecked = fuera_oneCheckbox.checked;
        const fuera_twoChecked = fuera_twoCheckbox.checked;
        const quiero_oneChecked = Array.from(quiero_oneCheckboxes).some(checkbox => checkbox.checked);
        const quiero_twoChecked = Array.from(quiero_twoCheckboxes).some(checkbox => checkbox.checked);

        if (!fuera_oneChecked && !quiero_oneChecked) {
            document.getElementById("error-fuera_one").textContent = 
                "Selecciona alguna opción en la primera quincena.";
            valid = false;
        }
        
        if (!fuera_twoChecked && !quiero_twoChecked) {
            document.getElementById("error-fuera_two").textContent = 
                "Selecciona alguna opción en la segunda quincena.";
            valid = false;
        }

        // Si hay un error, prevenimos el envío del formulario
        if (!valid) {
            event.preventDefault();
        } else {
            // Si todo es válido
            successMessage.textContent =
                "Formulario completado correctamente. Enviando datos...";
            form.action = "send.php"; // Define la acción al backend
        }
    });
});

// Lógica para manejar los checkboxes "fuera" y "quiero"

fuera_oneCheckbox.addEventListener("change", () => {
    if (fuera_oneCheckbox.checked) {
        // Desmarcar todos los checkboxes de 'quiero_one' cuando "fuera" está marcado
        quiero_oneCheckboxes.forEach(checkbox => {
            checkbox.checked = false;
            checkbox.disabled = true; // Deshabilitar los checkboxes
        });
    } else {
        // Habilitar los checkboxes de 'quiero_one' cuando "fuera" no está marcado
        quiero_oneCheckboxes.forEach(checkbox => {
            checkbox.disabled = false;
        });
    }
});

fuera_twoCheckbox.addEventListener("change", () => {
    if (fuera_twoCheckbox.checked) {
        // Desmarcar todos los checkboxes de 'quiero_two' cuando "fuera" está marcado
        quiero_twoCheckboxes.forEach(checkbox => {
            checkbox.checked = false;
            checkbox.disabled = true; // Deshabilitar los checkboxes
        });
    } else {
        // Habilitar los checkboxes de 'quiero_two' cuando "fuera" no está marcado
        quiero_twoCheckboxes.forEach(checkbox => {
            checkbox.disabled = false;
        });
    }
});

// Logica para manejar la deselección del checkbox "fuera" cuando se marca una quincena
quiero_oneCheckboxes.forEach(checkbox => {
    checkbox.addEventListener("change", () => {
        if (checkbox.checked && fuera_oneCheckbox.checked) {
            fuera_oneCheckbox.checked = false; // Desmarcar "fuera_one"
            fuera_oneCheckbox.disabled = true; // Deshabilitarlo
        } else {
            fuera_oneCheckbox.disabled = false; // Habilitarlo si la quincena no está marcada
        }
    });
});

quiero_twoCheckboxes.forEach(checkbox => {
    checkbox.addEventListener("change", () => {
        if (checkbox.checked && fuera_twoCheckbox.checked) {
            fuera_twoCheckbox.checked = false; // Desmarcar "fuera_two"
            fuera_twoCheckbox.disabled = true; // Deshabilitarlo
        } else {
            fuera_twoCheckbox.disabled = false; // Habilitarlo si la quincena no está marcada
        }
    });
});
