const APP_PREFIX = 'BudgetTracker-';
const VERSION = 'v1';
const CACHE_NAME = APP_PREFIX + VERSION;

const FILES_TO_CACHE = [
    '/',
    '/index.html',
    '/manifest.json',
    '/css/style.css',
    '/js/index.js',
    '/js/ibd.js',
    '/icons/icon-72x72.png',
    '/icons/icon-96x96.png',
    '/icons/icon-128x128.png',
    '/icons/icon-152x152.png',
    '/icons/icon-192x192.png',
    '/icons/icon-384x384.png',
    '/icons/icon-512x512.png',
];

// cache resources
self.addEventListener('install', function (evt) {
    evt.waitUntil(
        caches.open(CACHE_NAME).then(function (cache) {
            console.log('installing cache')
            return cache.addAll(FILES_TO_CACHE)
        })
    )
});



// Respond fetch requests with cached data
self.addEventListener('fetch', function (evt) {
    console.log('fetch request')
    evt.respondWith(
        caches.match(evt.request).then(function (request) {
            // if cache is available, respond with cache
            if (request) {
                console.log('responding with cache')
                return request
            }
            else {
            // if there is no cache, try fetching request
                console.log('fine is not cached')
                return fetch(evt.request)
            }
        })
    )
});

// delete outdated caches
self.addEventListener('activate', function (evt) {
    evt.waitUntil(
        caches.keys().then(function(keyList) {
            let cacheKeeplist = keyList.filter(function(key) {
                return key.indexOf(APP_PREFIX);
            });
            // add current cache name to key list
            cacheKeeplist.push(CACHE_NAME);

            return Promise.all(
                keyList.map(function(key, i){
                    if (cacheKeeplist.indexOf(key) === -1) {
                        console.log('deleting cache')
                        return caches.delete(keyList[i]);
                    }
                })
            );
        })
    );
});
