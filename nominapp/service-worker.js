const cacheName = 'my-app-cache-v2.5';
const filesToCache = [
    '/',
    '/index.php',
    '/home.php',
    '/service-worker.js',
    '/assets/css/styles.css',    
    '/assets/data/tabla_salarial_2025.json',
    '/assets/img/github.svg',
    '/assets/img/laz.png',
    '/assets/img/logo_White.svg',
    '/assets/js/app.js',    
    '/manifest.json',
    '/assets/icons/icon-192x192.png',
    '/assets/icons/icon-512x512.png',
    '/version.json',
];

// Instalar el service worker y almacenar los archivos en caché
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(cacheName).then((cache) => {
            return cache.addAll(filesToCache);
        })
    );
});

// Servir los archivos desde la caché
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});

// Actualizar el service worker cuando cambian los archivos
self.addEventListener('activate', (event) => {
    const cacheWhitelist = [cacheName];
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cache) => {
                    if (!cacheWhitelist.includes(cache)) {
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
});

