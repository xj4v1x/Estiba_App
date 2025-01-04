<?php
    // Establecer una variable para determinar qué sección mostrar
    $screen = isset($_GET['screen']) ? $_GET['screen'] : 'mainScreen';  // Si no hay valor, muestra la pantalla principal

    // Función para incluir las secciones
    function showSection($dir, $section) {
        include "$dir/{$section}.html";
    }
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">    
    <title>EstibApp</title>
    <link rel="icon" type="image/x-icon" href="/estibapp/assets/favicon.ico">
    <link rel="stylesheet" href="assets/css/styles.css">            
    <link rel="manifest" href="manifest.json">
    <meta name="theme-color" content="#1e2024">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&family=Sour+Gummy:ital,wght@0,100..900;1,100..900&family=Young+Serif&display=swap" rel="stylesheet">                   
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"> 
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/dist/tabler-icons.min.css" />                   
</head>
<body>
    <header>
        <h1>EstibApp</h1>        
    </header>
    <main class="content">
        <?php
            // Aquí se incluyen las secciones según el valor de $screen
            if ($screen === 'mainScreen') {
                showSection('.', 'mainScreen');
            } elseif ($screen === 'contacts_Screen') {
                showSection('./sections', 'contacts_Screen');
            } elseif ($screen === 'tohome_Screen') {
                showSection('./sections', 'tohome_Screen');
            } elseif ($screen === 'calendar_Screen') {
                showSection('./sections', 'calendar_Screen');
            } elseif ($screen === 'safety_Screen') {
                showSection('./sections', 'safety_Screen');
            }
        ?>
    </main>
    
    <footer>
        <img src="./assets/img/logo_White.svg" alt="logo" style="width: 20px;">
        <p>&copy; 2024 JaviLazkano. v0.25</p>      
        
        <a href="logout.php">Salir</a>
        
    </footer>
        <!-- 
            -->
<script>
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/service-worker.js')
        .then((registration) => {
            console.log('Service Worker registrado con éxito: ', registration);
        })
        .catch((error) => {
            console.log('Error al registrar el Service Worker: ', error);
        });
    }
</script>
</body>
</html>
