'use strict';

const CACHE_STATIC = 'static-cache-v1';

self.addEventListener('install', async e => {
    async function cacheStaticFiles() {
        const files = [
            './',
            './icon.png',
            './index.html',
            './sw.js',
            './js/index.js',
            './js/prestige.js',
            './js/render.js',
            './js/save.js',
            './js/ui.js',
            './css/styles.css',
            './css/light_theme.css',
            './css/dark_theme.css',
            './manifest.json'
        ];
        const cacheStat = await caches.open(CACHE_STATIC);
        await Promise.all(
            files.map(function (url) {
                return cacheStat.add(url).catch(function (reason) {
                    console.log(`'${url}' failed: ${String(reason)}`);
                });
            })
        );
    }

    e.waitUntil(cacheStaticFiles());
});

self.addEventListener('fetch', async e => {
    async function getFromCache() {
        const cache = await self.caches.open(CACHE_STATIC);
        const cachedResponse = await cache.match(e.request);
        if (cachedResponse) {
            return cachedResponse;
        }
        const resp = await fetch(e.request);
        await cache.put(e.request, resp.clone());
        return resp;
    }

    e.respondWith(getFromCache());
});