'use strict';

const NAME = 'SUSNUTRITION';
const VERSION = '0.1.4';

self.oninstall = _ => {
  self.skipWaiting();
};

self.onactivate = _ => {
  const currentCacheName = NAME + '-v' + VERSION;
  caches.keys().then(cacheNames => {
    return Promise.all(
      cacheNames.map(cacheName => {
        if (cacheName.indexOf(NAME) === -1) {
          return null;
        }

        if (cacheName !== currentCacheName) {
          return caches.delete(cacheName);
        }

        return null;
      })
    );
  });

  self.clients.claim();
};

self.onmessage = evt => {
  if (evt.data === 'version') {
    evt.source.postMessage({
      version: VERSION
    });
  }
};

self.onfetch = evt => {
  const cacheName = NAME + '-v' + VERSION;

  evt.respondWith(
    caches.match(evt.request, {cacheName})
      .then(response => {
        if (response) return response;

        const request = evt.request;
        return fetch(request).then(fetchResponse => {
          // Never cache Analytics requests or Chrome extension requests.
          if (/analytics/.test(request.url) || /chrome-extension/.test(request.url)) {
            return fetchResponse;
          }

          // Cache for next time
          return caches.open(NAME + '-v' + VERSION).then(cache => {
            return cache.put(request.clone(), fetchResponse.clone());
          }).then(_ => {
            return fetchResponse;
          });
        }, err => {
          console.warn(`Unable to fetch ${evt.request.url}`);
          console.warn(err.stack);
          return new Response('Unable to fetch.');
        });
      })
  );
};
