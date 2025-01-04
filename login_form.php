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
</head>
<body>
    <div class="login-container">
        <h2>Login</h2>
        <form action="" method="post">
            <input type="password" name="password" placeholder="Contraseña" required value="5711">
            <button type="submit" name="submit" class="prevButton">Ingresar</button>
            <p>Modo de prueba</p>            
            <p>La contraseña se introduce sola</p>
            <?php echo ($correctPassword); ?>
        </form>
        <?php if (isset($error)): ?>
            <p class="error"><?= $error ?></p>
        <?php endif; ?>
    </div>    
</body>
</html>
