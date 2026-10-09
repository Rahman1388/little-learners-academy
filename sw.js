const CACHE="lla-v16";
// Download essential three-repeat words once on installation so phonics lessons
// can play from cache even on a patchy mobile connection.
const PHONICS_PRACTICE=Array.from({length:4},(_,i)=>[
  "./audio/practice/en-phonics-"+i+"-girl.mp3",
  "./audio/practice/en-phonics-"+i+"-boy.mp3",
  "./audio/practice/ar-phonics-"+i+"-boy.mp3"
]).flat();
const SENTENCE_PRACTICE=["en","ar"].flatMap(lang=>["girl","boy"].map(kind=>
  "./audio/practice/"+lang+"-sentences-0-"+kind+".mp3"));
const BUS_ALTERNATIVES=["alba","bryce"].map(name=>"./audio/practice/en-phonics-3-"+name+".mp3");
const CORE=["./","./index.html","./styles.css","./curriculum.js","./app.js","./manifest.webmanifest","./icon.svg",
  "./phonics-adventure.html","./phonics-adventure.css","./phonics-adventure.js","./sound-detective.js","./voice-test.html","./match-learn.html","./bus-voice-check.html",
  ...PHONICS_PRACTICE,...SENTENCE_PRACTICE,...BUS_ALTERNATIVES];

self.addEventListener("install",event=>{
  event.waitUntil(
    caches.open(CACHE)
      .then(cache=>cache.addAll(CORE))
      .then(()=>self.skipWaiting())
  );
});

self.addEventListener("activate",event=>{
  event.waitUntil(
    caches.keys()
      .then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k))))
      .then(()=>self.clients.claim())
  );
});

self.addEventListener("fetch",event=>{
  if(event.request.method!=="GET")return;
  const url=new URL(event.request.url);
  if(url.origin!==self.location.origin)return;

  event.respondWith(
    fetch(event.request)
      .then(response=>{
        if(response && response.ok){
          const copy=response.clone();
          caches.open(CACHE).then(cache=>cache.put(event.request,copy));
        }
        return response;
      })
      .catch(async()=>{
        const cached=await caches.match(event.request);
        if(cached)return cached;
        if(event.request.mode==="navigate")return caches.match("./index.html");
        return Response.error();
      })
  );
});
