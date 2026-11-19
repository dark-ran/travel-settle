// 오프라인용: 먼저 네트워크, 안 되면 저장본 (새 버전이 바로 반영되게)
const C='settle-v27',FILES=['./','index.html','manifest.json','icon.svg','fonts/settle-sans-400.woff2','fonts/settle-sans-600.woff2','fonts/settle-sans-700.woff2','fonts/settle-mono-400.woff2','fonts/settle-mono-600.woff2'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(FILES)));self.skipWaiting()});
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==C).map(k=>caches.delete(k))))));
self.addEventListener('fetch',e=>{const u=new URL(e.request.url);if(e.request.method!=='GET'||u.origin!==location.origin||u.searchParams.has('d'))return; // 공유 링크(정산 내용)는 저장하지 않음
  e.respondWith(fetch(e.request).then(r=>{const cp=r.clone();caches.open(C).then(c=>c.put(e.request,cp));return r}).catch(()=>caches.match(e.request,{ignoreSearch:true}).then(r=>r||caches.match('index.html'))))});
