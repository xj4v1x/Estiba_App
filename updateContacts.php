<?php

// Obtener los datos JSON enviados desde el frontend
$input = json_decode(file_get_contents('php://input'), true);

// Verificar que se haya recibido la información correctamente
if (isset($input['action']) && isset($input['contact'])) {
    $action = $input['action'];
    $contact = $input['contact'];

    // Ruta del archivo JSON
    $jsonFilePath = 'assets/data/phoneList.json';

    // Cargar el contenido actual del archivo JSON
    $data = json_decode(file_get_contents($jsonFilePath), true);

    if ($action === 'add') {
        // Añadir el nuevo contacto al array de contactos
        $data['datos'][] = $contact;
    } elseif ($action === 'modify') {
        // Modificar el contacto en el array según el número de estiba (u otro criterio único)
        foreach ($data['datos'] as &$existingContact) {
            if ($existingContact['number'] === $contact['number']) {
                $existingContact['name'] = $contact['name'];
                $existingContact['phone'] = $contact['phone'];
                break;
            }
        }
    }

    // Guardar el archivo JSON actualizado
    file_put_contents($jsonFilePath, json_encode($data, JSON_PRETTY_PRINT));

    // Enviar una respuesta de éxito al frontend
    echo json_encode(['success' => true]);
} else {
    // Enviar una respuesta de error si faltan datos
    echo json_encode(['success' => false, 'error' => 'Datos incompletos']);
}

?>
