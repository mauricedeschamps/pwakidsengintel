const CACHE_NAME = 'kids-flashcards-v2';
const urlsToCache = [
  '/',
  '/index.html',
  'https://cdn-icons-png.flaticon.com/512/616/616408.png',
  'https://frame-illust.com/fi/wp-content/uploads/2017/03/9687.png',
  'https://illust8.com/wp-content/uploads/2018/06/fruit_apple_illust_150.png',
  // 他の重要な静的リソースを追加
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});

self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});