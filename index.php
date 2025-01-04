<?php
// index.php
session_start();

// Contraseña hasheada previamente con password_hash('secure_password', PASSWORD_DEFAULT)
$hashedPassword = '$2y$12$xUJ.fPheLbC8JrN4wWny7umEQ5RpSAjgG02J5FkenKz6ZhFujjvMu';

if (isset($_POST['submit'])) {
    $password = $_POST['password'];

    if (password_verify($password, $hashedPassword)) {
        $_SESSION['loggedin'] = true;
        header('Location: index.php'); // Recarga para entrar al home
        exit;
    } else {
        $error = "Contraseña incorrecta. Intenta de nuevo.";
    }
}

// Verifica sesión activa
// if (!isset($_SESSION['loggedin']) || $_SESSION['loggedin'] !== true) {
// include 'login_form.php'; // Formulario de inicio de sesión
//    exit;
//}

// Incluye la pantalla principal de la app
include 'home.php';

?>


