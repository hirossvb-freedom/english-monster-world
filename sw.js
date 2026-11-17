const CACHE="emw-v22-pwa";
const ASSETS=["./","./index.html","./manifest.webmanifest","./icon-192.png","./icon-512.png"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting()))});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith("emw-")&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener("fetch",e=>{if(e.request.method!=="GET"||new URL(e.request.url).origin!==self.location.origin)return;
 e.respondWith(fetch(e.request).then(response=>{if(response.ok){const clone=response.clone();e.waitUntil(caches.open(CACHE).then(c=>c.put(e.request,clone)))}return response}).catch(async()=>await caches.match(e.request)||await caches.match("./index.html")))});
