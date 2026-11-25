"use strict";

const CACHE_NAME = "urbanflow-v4";

const urlsToCache = [
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
    caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames
          .filter((cacheName) => cacheName !== CACHE_NAME)
          .map((cacheName) => caches.delete(cacheName))
      )
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") {
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }

      return fetch(event.request).catch(() => {
        if (event.request.mode === "navigate") {
          return caches.match("./404.html");
        }
      });
    })
  );
});
