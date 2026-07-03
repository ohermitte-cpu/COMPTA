/* Service worker — stratégie "network-first" pour les fichiers du site
   (évite qu'une ancienne version reste servie depuis le cache sur GitHub Pages),
   et "cache-first" pour les librairies CDN (disponibles hors ligne). */
const CACHE = "factures-immo-v1";

self.addEventListener("install", () => self.skipWaiting());

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys()
      .then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", e => {
  if (e.request.method !== "GET") return;
  const url = new URL(e.request.url);

  if (url.origin === location.origin) {
    // Réseau d'abord, cache en secours (hors ligne)
    e.respondWith(
      fetch(e.request).then(rep => {
        const copie = rep.clone();
        caches.open(CACHE).then(c => c.put(e.request, copie));
        return rep;
      }).catch(() => caches.match(e.request))
    );
  } else {
    // CDN : cache d'abord
    e.respondWith(
      caches.match(e.request).then(m => m || fetch(e.request).then(rep => {
        const copie = rep.clone();
        caches.open(CACHE).then(c => c.put(e.request, copie));
        return rep;
      }))
    );
  }
});
