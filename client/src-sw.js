const { offlineFallback, warmStrategyCache } = require('workbox-recipes');
const { CacheFirst } = require('workbox-strategies');
const { registerRoute } = require('workbox-routing');
const { CacheableResponsePlugin } = require('workbox-cacheable-response');
const { ExpirationPlugin } = require('workbox-expiration');
const { precacheAndRoute } = require('workbox-precaching/precacheAndRoute');

precacheAndRoute(self.__WB_MANIFEST);

const staticCacheName = 'jate-static'
const assets = ['/', '/index.html', '/js/database.js', '/js/editor.js', '/js/header.js', '/js/index.js', '/js/install.js', '/css/style.css']

self.addEventListener('install', (evt) => {
  evt.waitUntil(
    caches.open(staticCacheName)
      .then((cache) => {
        console.log('caching shell assets')
        cache.addAll(assets)
      })
  )
})

self.addEventListener('activate', (evt) => {
})


const pageCache = new CacheFirst({
  cacheName: 'page-cache',
  plugins: [
    new CacheableResponsePlugin({
      statuses: [0, 200],
    }),
    new ExpirationPlugin({
      maxAgeSeconds: 30 * 24 * 60 * 60,
    }),
  ],
});

warmStrategyCache({
  urls: ['/index.html', '/'],
  strategy: pageCache,
});

registerRoute(({ request }) => request.mode === 'navigate', pageCache);

self.addEventListener('fetch', (evt) => {
  evt.respondWith(
    caches.match(evt.request)
      .then(
        (cacheRes) => {
          return cacheRes || fetch(evt.request)
        }
      )
  )
})
registerRoute();
