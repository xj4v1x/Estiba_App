<?php

$filePath = "vacances.csv";
$errorMessages = []; // Array para guardar mensajes de error

// Comprobar si el archivo CSV existe
if (!file_exists($filePath)) {
    $file = fopen($filePath, 'w');
    if ($file === false) {
        die("Error: No se pudo crear el archivo CSV.");
    }
    // Añadir encabezados al archivo CSV
    fputcsv($file, ["Número", "Categoría", "Mes que le toca", "Primera Quincena", "Fuera Primera",
                    "Segunda Quincena", "Fuera Segunda"]);
    fclose($file);
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Validar campos obligatorios
    $number = $_POST['number'] ?? null;
    $categoria = $_POST['categoria'] ?? null;
    $metoca = $_POST['metoca'] ?? null;
    $quiero_one = $_POST['quiero_one'] ?? []; 
    $fuera_one = isset($_POST['fuera_one']) ? 'Primera Sí' : 'Primera No';  // Comprobamos si el checkbox 'fuera' está marcado
    $quiero_two = $_POST['quiero_two'] ?? []; 
    $fuera_two = isset($_POST['fuera_two']) ? 'Segunda Sí' : 'Segunda No';  // Comprobamos si el checkbox 'fuera' está marcado

    if (!$number) {
        $errorMessages[] = "El campo 'Número' es obligatorio.";
    }
    if (!$categoria) {
        $errorMessages[] = "El campo 'Categoría' es obligatorio.";
    }
    if (!$metoca) {
        $errorMessages[] = "Debe seleccionar un mes en 'Me toca'.";
    }
    
    // Si no hay errores en las validaciones
    if (empty($errorMessages)) {
        // Sanitizar datos para seguridad
        $number = htmlspecialchars($number);
        $categoria = htmlspecialchars($categoria);
        $metoca = htmlspecialchars($metoca);
        // Sanitizar los campos de las listas
        $quiero_one = array_map('htmlspecialchars', $quiero_one);
        $quiero_two = array_map('htmlspecialchars', $quiero_two);

        // Abrir archivo CSV para escribir
        $file = fopen($filePath, 'a');
        if ($file === false) {
            die("Error: No se pudo abrir el archivo CSV para escribir.");
        }

        // Guardar datos en el archivo CSV
        $data = [
            $number,
            $categoria,
            $metoca,
            implode(", ", $quiero_one),
            $fuera_one,  // Incluimos el valor de 'fuera' como 'Sí' o 'No'
            implode(", ", $quiero_two),
            $fuera_two  // Incluimos el valor de 'fuera' como 'Sí' o 'No'
        ];
        fputcsv($file, $data);
        fclose($file);

        // Redirección
        header("Location: https://javilazkano.com/estibapp/");
        exit;
    }
    // Mostrar errores si los hay
    foreach ($errorMessages as $message) {
        echo "<p style='color:red;'>$message</p>";
    }
}
?>
