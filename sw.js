"use strict";

const CACHE_NAME = "urbanflow-v5";

const FILES_TO_CACHE = [
  "./",
  "./index.html",
  "./login.html",
  "./onibus.html",
  "./detalhes.html",
  "./mapa.html",
  "./sobre.html",
  "./privacy.html",
  "./terms.html",
  "./404.html",
  "./css/style.css",
  "./js/app.js",
  "./js/auth.js",
  "./js/theme.js",
  "./js/search.js",
  "./js/detalhes.js",
  "./js/mapa.js",
  "./js/pwa.js",
  "./data/linhas.json",
  "./manifest.json"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(FILES_TO_CACHE))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys()
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

self.addEventListener("fetch", (event) => {
  const request = event.request;

  if (request.method !== "GET") {
    return;
  }

  const requestUrl = new URL(request.url);

  // Não intercepta recursos de outros domínios, como Leaflet ou mapas.
  if (requestUrl.origin !== self.location.origin) {
    return;
  }

  event.respondWith(
    fetch(request)
      .then((response) => {
        if (response.ok) {
          const responseCopy = response.clone();

          caches.open(CACHE_NAME).then((cache) => {
            cache.put(request, responseCopy);
          });
        }

        return response;
      })
      .catch(async () => {
        const cachedResponse = await caches.match(request, {
          ignoreSearch: true
        });

        if (cachedResponse) {
          return cachedResponse;
        }

        if (request.mode === "navigate") {
          const offlinePage = await caches.match("./404.html");
          if (offlinePage) return offlinePage;
        }

        return new Response("Conteúdo indisponível offline.", {
          status: 503,
          statusText: "Service Unavailable",
          headers: { "Content-Type": "text/plain; charset=utf-8" }
        });
      })
  );
});
