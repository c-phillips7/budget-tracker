const CACHE_NAME = 'budget-tracker-v1';
const DATA_CACHE_NAME = 'data-cache-v1';

const FILES_TO_CACHE = [
    'index.html',
    'manifest.json',
    '/css/style.css',
    '/js/index.js',
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
})



// Activate the service worker and remove old data from the cache
// YOUR CODE HERE
//
// self.addEventListener('active', function (evt) {
//     evt.waitUntil(
//         caches.keys().then(keyList => {
//             return Promise.all(
//                 keyList.map(key => {
//                     if (key !== CACHE_NAME && key !== DATA_CACHE_NAME) {
//                         console.log('Removing old cache data', key);
//                         return caches.delete(key);
//                     }
//                 })
//             );
//         })
//     );
//     self.clients.claim();
// })

// Intercept fetch requests
// YOUR CODE HERE
//
// self.addEventListener('fetch', function (evt) {
//     if (evt.request.url.includes('/api/')) {
//         evt.respondWith(
//             caches
//             .open(DATA_CACHE_NAME)
//             .then(cache => {
//                 return fetch(evt.request)
//                     .then(response => {
//                         // If the response was good, clone it and store it in the cache.
//                         if (response.status === 200) {
//                             cache.put(evt.request.url, response.clone());
//                         }

//                         return response;
//                     })
//                     .catch(err => {
//                         // Network request failed, try to get it from the cache.
//                         return cache.match(evt.request);
//                     });
//             })
//             .catch(err => console.log(err))
//         );

//         return;
//     }
//     evt.respondWith(
//         fetch(evt.request).catch(function () {
//             console.log("failed to fetch, check cache", evt.request.url);
//             return caches.match(evt.request).then(function (response) {
//                 console.log("match found!!", evt.request.url);
//                 if (response) {
//                     return response;
//                 } else if (evt.request.headers.get('accept').includes('text.html')) {
//                     return caches.match('/')
//                 }
//             });
//         })
//     );
// });
