const CACHE_NAME = 'aero-acharya-v2';

// We won't list every single file here because there are many images.
// Instead, we'll cache the core shell, and dynamically cache images as they load.
const CORE_ASSETS = [
  './',
  './index.html',
  './glossary.html',
  './favicon.svg',
  './manifest.json',
  './assets/styles.css',
  './assets/site.js',
  './assets/search-index.js',
  './assets/quiz-data.js',
  './assets/search.js',
  './assets/enhancements.js',
  './assets/achievements.js',
  './assets/notes.js',
  './assets/quiz.js'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(CORE_ASSETS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(name => {
          if (name !== CACHE_NAME) {
            return caches.delete(name);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Stale-while-revalidate for everything, or cache-first for images.
self.addEventListener('fetch', event => {
  // Only handle GET requests
  if (event.request.method !== 'GET') return;
  // Ignore chrome extensions or external cross-origin (except CDN if we had them)
  if (!event.request.url.startsWith(self.location.origin) && !event.request.url.includes('cdnjs.cloudflare.com')) return;

  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      // Return cached response if found
      if (cachedResponse) {
        // Fetch in background to update cache for next time (stale-while-revalidate)
        fetch(event.request).then(networkResponse => {
          if (networkResponse && networkResponse.status === 200) {
            caches.open(CACHE_NAME).then(cache => cache.put(event.request, networkResponse));
          }
        }).catch(() => {}); // Ignore network errors in background
        return cachedResponse;
      }

      // If not in cache, fetch from network and cache it
      return fetch(event.request).then(networkResponse => {
        if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
          return networkResponse; // Don't cache bad responses
        }
        
        const responseToCache = networkResponse.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(event.request, responseToCache));
        return networkResponse;
      }).catch(() => {
        // If network fails and it's an HTML page, maybe fallback to offline page?
        // Since it's a static PWA, it should already be cached.
      });
    })
  );
});
