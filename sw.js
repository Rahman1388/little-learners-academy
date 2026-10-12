const CACHE="lla-v54";
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
const CORE=["./","./index.html","./styles.css","./curriculum.js","./app.js","./navigation.js","./manifest.webmanifest","./icon.svg",
  "./phonics-adventure.html","./phonics-adventure.css","./phonics-adventure.js","./sound-detective.js","./voice-test.html","./match-learn.html","./bus-voice-check.html","./audio-review.html","./picture-memory.html","./star-journey.html","./activity-library.html","./activity-data.js","./activity-library.js","./grades-roadmap.html","./parent-progress.html","./curriculum-skills-map.html","./curriculum-skills-map.js","./ten-frame-lab.html","./place-value-lab.html","./number-bonds.html","./learning-passport.html","./learning-passport.js","./drawing-studio.html","./drawing-studio.css","./drawing-studio.js","./daily-discovery.html","./story-garden.html","./family-learning-plan.html","./clock-time-lab.html","./measurement-explorer.html","./pronunciation-review.html","./math-story-village.html","./international-benchmark.html","./grade2-pilot.html","./grade2-pilot-data.js","./grade2-pilot.js","./grade2-english.html","./grade2-english-data.js","./grade2-english.js","./grade2-science.html","./grade2-science-data.js","./grade2-science.js","./grade2-mixed-quest.html","./grade2-mixed-quest.js","./fractions-lab.html","./fractions-lab.js","./privacy.html","./privacy-controls.js","./qatar-mini-market.html","./qatar-mini-market.js","./science-sort.html","./science-sort.js",
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

// Only serve/cache our packaged learning assets. Do not let arbitrary URLs
// or attacker-controlled query strings fill a child's offline storage.
const ALLOWED_PATHS=new Set(CORE.map(path=>new URL(path,self.registration.scope).pathname));
self.addEventListener("fetch",event=>{
  if(event.request.method!=="GET")return;
  const url=new URL(event.request.url);
  if(url.origin!==self.location.origin||!ALLOWED_PATHS.has(url.pathname))return;
  if(!["navigate","same-origin","cors","no-cors"].includes(event.request.mode))return;
  const canonical=new Request(url.origin+url.pathname,{credentials:"same-origin"});
  event.respondWith(
    fetch(event.request)
      .then(response=>{
        if(response&&response.ok&&response.type==="basic"){
          const copy=response.clone();
          caches.open(CACHE).then(cache=>cache.put(canonical,copy)).catch(()=>{});
        }
        return response;
      })
      .catch(async()=>{
        const cache=await caches.open(CACHE);
        const cached=await cache.match(canonical);
        if(cached)return cached;
        if(event.request.mode==="navigate")return cache.match(new URL("./index.html",self.registration.scope).href);
        return Response.error();
      })
  );
});
