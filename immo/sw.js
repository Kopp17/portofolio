const V='immo-ivoire-v2',F=['./','./index.html','./manifest.webmanifest','./icon-192.png','./icon-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(F)));self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V).map(x=>caches.delete(x)))));self.clients.claim()});
self.addEventListener('fetch',e=>{const r=e.request,u=new URL(r.url);
 if(r.method!=='GET'||r.headers.has('range')||/\.(mp4|webm)$/i.test(u.pathname))return;
 if(r.mode==='navigate'){e.respondWith(fetch(r).then(n=>{const c=n.clone();caches.open(V).then(ch=>ch.put(r,c));return n}).catch(()=>caches.match(r).then(m=>m||caches.match('./index.html'))));return}
 e.respondWith(caches.match(r).then(m=>m||fetch(r).then(n=>{if(n.ok&&u.origin===location.origin){const c=n.clone();caches.open(V).then(ch=>ch.put(r,c))}return n})))});
