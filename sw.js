const CACHE="lla-v80";
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
  "./phonics-adventure.html","./phonics-adventure.css","./phonics-adventure.js","./sound-detective.js","./voice-test.html","./match-learn.html","./bus-voice-check.html","./audio-review.html","./picture-memory.html","./star-journey.html","./activity-library.html","./activity-data.js","./foundation-check.html","./foundation-check.js","./practice-path.html","./practice-path.js","./activity-library.js","./maths-thinking.html","./maths-thinking.js","./grades-roadmap.html","./choose-grade.html","./curriculum-compass.html","./curriculum-compass.js","./school-pathways.html","./school-pathways-data.js","./school-pathways.js","./parent-progress.html","./curriculum-skills-map.html","./curriculum-skills-map.js","./ten-frame-lab.html","./place-value-lab.html","./number-bonds.html","./learning-passport.html","./learning-passport.js","./drawing-studio.html","./drawing-studio.css","./drawing-studio.js","./daily-discovery.html","./story-garden.html","./sentence-builder.html","./sentence-builder.js","./family-learning-plan.html","./clock-time-lab.html","./measurement-explorer.html","./pronunciation-review.html","./sound-help.html","./math-story-village.html","./international-benchmark.html","./grade2-pilot.html","./grade2-pilot-data.js","./grade2-pilot.js","./grade2-english.html","./grade2-english-data.js","./grade2-english.js","./grade2-science.html","./grade2-science-data.js","./grade2-science.js","./grade2-mixed-quest.html","./grade2-mixed-quest.js","./fractions-lab.html","./fractions-lab.js","./privacy.html","./privacy-controls.js","./qatar-mini-market.html","./qatar-mini-market.js","./science-sort.html","./science-sort.js","./install-app.html","./grade3-preview.html","./grade3-preview-data.js","./grade3-preview.js","./grade3-english.html","./grade3-english-data.js","./grade3-english.js","./grade3-science.html","./grade3-science-data.js","./grade3-science.js","./grade3-mixed-quest.html","./grade3-mixed-quest.js","./grade4-math.html","./grade4-math-data.js","./grade4-math.js","./grade4-reading.html","./grade4-reading-data.js","./grade4-reading.js","./grade4-science.html","./grade4-science-data.js","./grade4-science.js","./grade4-progress.html","./grade4-progress.js","./grade5-math.html","./grade5-math-data.js","./grade5-math.js","./grade5-reading.html","./grade5-reading-data.js","./grade5-reading.js","./grade5-science.html","./grade5-science-data.js","./grade5-science.js","./grade6-math.html","./grade6-math-data.js","./grade6-math.js","./grade6-reading.html","./grade6-reading-data.js","./grade6-reading.js","./grade6-science.html","./grade6-science-data.js","./grade6-science.js","./grade6-progress.html","./grade6-progress.js","./grade6-writing.html","./grade6-writing-data.js","./grade6-writing.js","./parent-report.html","./parent-report.js",
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
