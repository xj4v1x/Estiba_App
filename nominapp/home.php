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
    <link rel="stylesheet" href="/nominapp/assets/css/styles.css">
    <link rel="manifest" href="manifest.json">
    <meta name="theme-color" content="#1e2024">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&family=Sour+Gummy:ital,wght@0,100..900;1,100..900&family=Young+Serif&display=swap" rel="stylesheet">                   
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"> 
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/dist/tabler-icons.min.css" />
    <script src="assets/js/app.js" defer></script>
</head>
<body>
    <header>
        <h1>EstibApp</h1>        
    </header>
    <main class="content">        
            <h2>Nóminas</h2>
            <p id="total"></p>
            <form action=" " method="POST">            
                <div class="form-section">
                    <div class="selects">
                        <div>
                            <label for="categoria">Categoría</label>
                            <select name="categoria" id="categoria-select">
                                <option value="">Categoría...</option>
                                <option value="grupoi">Grupo I</option>
                                <option value="grupoii">Grupo II</option>
                                <option value="grupoiii">Grupo III</option>
                                <option value="grupoiv">Grupo IV</option>                            
                            </select>                    
                        </div>
                        <div>
                            <label for="antiguedad">Antigüedad</label>
                            <select name="antiguedad" id="antiguedad-select">
                                <option value="">Quinquenios...</option>
                                <option value="0">0</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                                <option value="7">7</option>
                                <option value="8">8</option>                        
                            </select>                    
                        </div>                        
                    </div>
                </div>
                <div class="form-section">
                    <div class="selects">
                        <div>
                            <label for="dias">Días Laborables</label>
                            <select name="dias" id="diaslaborables">
                                <option value="">Días Laborables...</option>
                                <option value="1">0</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                                <option value="7">7</option>
                                <option value="8">8</option>
                                <option value="9">9</option>
                                <option value="10">10</option>
                                <option value="11">11</option>
                                <option value="12">12</option>
                                <option value="13">13</option>
                                <option value="14">14</option>
                                <option value="15">15</option>
                                <option value="16">16</option>
                                <option value="17">17</option>
                                <option value="18">18</option>
                                <option value="19">19</option>
                                <option value="20">20</option>
                                <option value="21">21</option>
                                <option value="22">22</option>
                                <option value="23">23</option>
                                <option value="24">24</option>
                            </select>                    
                        </div>
                        <div>
                            <label for="irpf">IRPF</label>                            
                            <input type="number" placeholder="IRPF..." id="irpf" name="irpf" value="24" required>                        
                        </div>
                    </div>
                </div>
                <div class="form-section">                    
                    <span>
                        <p class="form-title">S. Base</p>
                        <p class="form-value" id="salario_base">0</p>
                    </span>
                    <span>
                        <p class="form-title">Antigüedad</p>
                        <p class="form-value" id="antiguedad">0</p>
                    </span>                                                            
                    <span>
                        <p class="form-title">Polivalencia</p>
                        <p class="form-value" id="polivalencia">0</p>
                    </span>
                    <span>
                        <p class="form-title">Seguro</p>
                        <p class="form-value" id="seguro">0</p>
                    </span>
                    <span>
                        <p class="form-title">Penosidad</p>
                        <p class="form-value" id="penosidad">0</p>                            
                    </span>     
                </div>
                <div class="form-section">
                    <details>
                        <summary>Extras</summary>                                            
                        <span class="extras">
                            <label for="partida">Partidas</label>
                            <p id="partidaTotal"></p>
                            <input class="form-value" type="number" name="partida" id="partida" min="0" value="0">                        
                        </span>                        
                        <span class="extras">
                            <label for="tarde">Tardes</label>
                            <p id="tardeTotal"></p>
                            <input type="number" name="tarde" id="tarde" min="0" value="0">
                        </span>
                        <span class="extras selects">
                            <label for="tarde_verano">T. Verano</label>
                            <p id="tardeveranoTotal"></p>
                            <input type="number" name="tarde_verano" id="tarde_verano" min="0" value="0">
                        </span>
                        <span class="extras">
                            <label for="remate">Remates</label>
                            <p id="remateTotal"></p>
                            <input type="number" name="remate" id="remate" min="0" value="0">
                        </span>
                        <span class="extras">
                            <label for="remate_festivo">R. Festivos</label>
                            <p id="rematefestivoTotal"></p>
                            <input type="number" name="remate_festivo" id="remate_festivo" min="0" value="0">                                               
                        </span>
                        <span class="extras">
                            <label for="remate_nocturno">R. Nocturnos</label>
                            <p id="rematenocturnoTotal"></p>
                            <input type="number" name="remate_nocturno" id="remate_nocturno" min="0" value="0">                                               
                        </span>
                        <span class="extras">
                            <label for="remate_noct_festivo">R.F.Nocturnos</label>
                            <p id="rematenocturnorestivoTotal"></p>
                            <input type="number" name="remate_noct_festivo" id="remate_noct_festivo" min="0" value="0">                                               
                        </span>
                        <span class="extras">
                            <label for="nocturno">Noches</label>
                            <p id="nocturnoTotal"></p>
                            <input type="number" name="nocturno" id="nocturno" min="0" value="0">                                               
                        </span>
                        <span class="extras">
                            <label for="noct_festivo">N. Festivas</label>
                            <p id="nocturnofestivoTotal"></p>
                            <input type="number" name="noct_festivo" id="noct_festivo" min="0" value="0">                                               
                        </span>
                        <span class="extras">
                            <label for="festivo">Festivos</label>
                            <p id="festivoTotal"></p>
                            <input type="number" name="festivo" id="festivo" min="0" value="0">                                               
                        </span>
                        <span class="extras">
                            <label for="doble_festivo">Dobles Festivos</label>
                            <p id="doblefestivoTotal"></p>
                            <input type="number" name="doble_festivo" id="doble_festivo" min="0" value="0">                                               
                        </span>                                                                                                                        
                        <span class="extras">
                            <label for="doble_sin">Doble sin descanso</label>
                            <p id="doblesinTotal"></p>
                            <input type="number" name="doble_sin" id="doble_sin" min="0" value="0">                                               
                        </span>                                                                                                  
                        <span class="extras">                            
                            <label for="doble_con">Doble con descanso</label>
                            <p id="dobleconTotal"></p>
                            <input type="number" name="doble_con" id="doble_con" min="0" value="0">
                        </span>                                                                                                                      
                    </details>
                    <details>
                        <summary>Renuncia día de descanso</summary>                      
                        <div>
                            <span class="renuncias">
                            <label>
                                Mañana o Partida
                                <input type="checkbox" name="renuncia_normal" id="renuncia_normal">
                            </label>
                            </span>
                            <span class="renuncias">
                                <label>
                                    Tarde
                                    <input type="checkbox" name="renuncia_tarde" id="renuncia_tarde">
                                </label>                        
                            </span>
                            <span class="renuncias">
                                <label>
                                Tarde Verano
                                    <input type="checkbox" name="renuncia_tarde_verano" id="renuncia_tarde_verano">
                                </label>
                            </span>
                            <span class="renuncias">
                                <label>
                                    Noche
                                    <input type="checkbox" name="renuncia_noche" id="renuncia_noche">
                                </label>
                            </span>
                            <span class="renuncias">
                                <label>
                                    Doble
                                    <input type="checkbox" name="renuncia_doble" id="renuncia_doble">
                                </label>                        
                            </span>
                        </div>
                    </details>                                  
                </div>                                
                                                                            
                <!-- 
                <label for="verano">Verano
                    <div class="form-section" id="summer">
                        <input type="checkbox" name="verano" id="verano">                    
                    </div>
                </label>
                -->
                
            </form>   
            <a class="card minicard" href="../index.php"><span class="material-icons big orange">home</span></a>     
    </main>
    
    <footer>
        <img src="./assets/img/logo_White.svg" alt="logo" style="width: 20px;">
        <p>&copy; 2024 JaviLazkano. v0.25</p>      
        <!--
        <a href="logout.php">Salir</a>
        -->
    </footer>
        <!-- 
            -->
<script>
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('service-worker.js')
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
