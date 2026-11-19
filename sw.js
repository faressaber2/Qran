const C='hafiz-v1',F=['./','index.html','manifest.json','icon-192.png','icon-512.png'];
self.addEventListener('install',e=>e.waitUntil(caches.open(C).then(c=>c.addAll(F)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!=C).map(x=>caches.delete(x)))).then(()=>clients.claim())));
self.addEventListener('fetch',e=>{const u=new URL(e.request.url);if(e.request.method!='GET'||/alquran\.cloud|islamic\.network/.test(u.host))return;
e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request).then(n=>{if(n.ok||n.type=='opaque'){const c=n.clone();caches.open(C).then(x=>x.put(e.request,c))}return n}).catch(()=>caches.match('index.html'))))});
