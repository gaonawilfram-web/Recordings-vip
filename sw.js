const CACHE='recvip-v1';
const ASSETS=['./','./index.html','./videos.json'];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS))));
self.addEventListener('fetch',e=>{
  const url=e.request.url;
  // NO interceptar videos ni archivos grandes
  if(url.includes('.mp4')||url.includes('.ts')||url.includes('.m3u8')
    ||url.includes('archive.org')||url.includes('dropbox.com')
    ||url.includes('plyr.io')||url.includes('imgbb.com')
    ||e.request.headers.get('range')){
    return;
  }
  e.respondWith(fetch(e.request).catch(()=>caches.match(e.request)));
});
