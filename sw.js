const CACHE='next-chapter-cafe-v11';
const APP_SHELL=['./','./index.html','./manifest.webmanifest','./icon-192.svg','./icon-512.svg','./logo.png'];
const APP_SCOPE=new URL('./',self.location.href);
self.addEventListener('install',event=>{
  event.waitUntil((async()=>{
    const cache=await caches.open(CACHE);
    await Promise.all(APP_SHELL.map(async path=>{
      try{
        const url=new URL(path,self.location.href);
        const response=await fetch(url.href,{cache:'reload'});
        if(response.ok) await cache.put(url.href,response);
      }catch(error){/* Keep installing even when temporarily offline. */}
    }));
    await self.skipWaiting();
  })());
});
self.addEventListener('activate',event=>{
  event.waitUntil((async()=>{
    const keys=await caches.keys();
    await Promise.all(keys.filter(key=>key.startsWith('next-chapter-cafe-')&&key!==CACHE).map(key=>caches.delete(key)));
    await self.clients.claim();
    const clients=await self.clients.matchAll({type:'window',includeUncontrolled:true});
    for(const client of clients) client.postMessage({type:'NEXT_CHAPTER_CACHE_UPDATED',version:CACHE});
  })());
});
self.addEventListener('fetch',event=>{
  const request=event.request;
  if(request.method!=='GET'||new URL(request.url).origin!==self.location.origin)return;
  const url=new URL(request.url);
  if(url.pathname.endsWith('/sw.js')){event.respondWith(fetch(request,{cache:'no-store'}));return;}
  event.respondWith((async()=>{
    const cache=await caches.open(CACHE);
    const cached=await cache.match(request,{ignoreSearch:true});
    try{
      const response=await fetch(request);
      if(response&&response.ok&&url.pathname.startsWith(APP_SCOPE.pathname)){
        await cache.put(request,response.clone());
      }
      return response;
    }catch(error){
      if(cached)return cached;
      const fallback=await cache.match(new URL('index.html',APP_SCOPE).href);
      if(fallback)return fallback;
      throw error;
    }
  })());
});
