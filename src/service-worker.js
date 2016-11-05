/*
'use strict';

//importScripts('/assets/scripts/cache-manifest.js');
importScripts('/assets/scripts/analytics.js');

self.analytics.trackingId = 'UA-86878430-1';

const NAME = 'CDS';
const VERSION = '{{ version }}';

self.oninstall = evt => {
  /!*const urls = cacheManifest.map(url => {
    return new Request(url, {credentials: 'include'});
  });*!/

  evt.waitUntil(
    caches
      .open(NAME + '-v' + VERSION)
      .then(cache => {
        //return cache.addAll(urls);
      }));

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
  if (evt.data === "version") {
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
        if (response) {
          return response;
        }

        const request = evt.request;
        return fetch(request).then(fetchResponse => {
          return caches.open(NAME + '-v' + VERSION).then(cache => {
            return cache.put(request.clone(), fetchResponse.clone());
          }).then(_ => {
            return fetchResponse;
          });
        }, err => {
          console.warn(`Unable to fetch ${evt.request.url}.`);
          console.warn(err.stack);
          return new Response('Unable to fetch.');
        });
      })
  );
};
*/

'use strict';

const NAME = 'SUSNUTRITION';
const VERSION = '{{version}}';

self.oninstall = _ => {
  self.skipWaiting();
};

self.onactivate = _ => {
  self.clients.claim();
};

self.onfetch = evt => {
  evt.respondWith(fetch(evt.request));
};
