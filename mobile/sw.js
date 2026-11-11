const V='makharij-m-6c25e3be72';
const FILES=['./','index.html','manifest.webmanifest','../icon-180.png','../icon-192.png','../icon-512.png'];
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open(V).then(c=>c.addAll(FILES)))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k.startsWith('makharij-m-')&&k!==V).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;
  // الصفحة نفسها: الشبكة أوّلاً (يظهر كلّ تحديثٍ فوراً)، والنسخة المحفوظة عند انقطاع الاتصال
  if(e.request.mode==='navigate'){e.respondWith(fetch(e.request).then(res=>{const c=res.clone();caches.open(V).then(x=>x.put('index.html',c));return res}).catch(()=>caches.match('index.html')));return}
  e.respondWith(caches.match(e.request,{ignoreSearch:true}).then(r=>r||fetch(e.request).then(res=>{if(res.ok&&new URL(e.request.url).origin===location.origin){const c=res.clone();caches.open(V).then(x=>x.put(e.request,c))}return res}).catch(()=>caches.match('index.html'))))});
