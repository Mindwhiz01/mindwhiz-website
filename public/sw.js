// Bump CACHE_NAME whenever this strategy changes: activate deletes every
// other cache, which clears pages stored by older versions of this worker.
const CACHE_NAME = 'mindwhiz-v2';
const ASSETS_TO_CACHE = [
  '/',
  '/mindwhiz-mark.png',
  '/manifest.json',
];

// Content-hashed build output and media never change at the same URL, so they
// are safe to serve from cache. Everything else (pages, RSC payloads, APIs)
// goes to the network first so visitors always see new content.
const STATIC_ASSET = /^\/_next\/static\/|\.(?:png|jpe?g|webp|avif|gif|svg|ico|woff2?|ttf)$/i;

self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE).catch(() => {
        console.log('Failed to cache some assets');
      });
    })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) =>
        Promise.all(
          cacheNames
            .filter((cacheName) => cacheName !== CACHE_NAME)
            .map((cacheName) => caches.delete(cacheName))
        )
      )
      .then(() => self.clients.claim())
  );
});

function putInCache(request, response) {
  if (response && response.status === 200 && response.type === 'basic') {
    const copy = response.clone();
    caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
  }
  return response;
}

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  if (STATIC_ASSET.test(url.pathname)) {
    // Cache first for immutable assets.
    event.respondWith(
      caches.match(request).then(
        (cached) => cached || fetch(request).then((response) => putInCache(request, response))
      )
    );
    return;
  }

  // Network first for pages and data; fall back to cache only when offline.
  event.respondWith(
    fetch(request)
      .then((response) => putInCache(request, response))
      .catch(() =>
        caches.match(request).then((cached) => cached || caches.match('/'))
      )
  );
});
