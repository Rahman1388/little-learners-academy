"use strict";
/* Offline-safe checks for supplemental bilingual Grade 1-2 Nature Explorer. */
const assert=require("node:assert/strict");
const fs=require("node:fs"),vm=require("node:vm");
const dataSource=fs.readFileSync("nature-explorer-data.js","utf8");
const gameSource=fs.readFileSync("nature-explorer.js","utf8");
const html=fs.readFileSync("nature-explorer.html","utf8");
const css=fs.readFileSync("nature-explorer.css","utf8");
new vm.Script(dataSource,{filename:"nature-explorer-data.js"});
new vm.Script(gameSource,{filename:"nature-explorer.js"});
const context={window:{}};
vm.runInNewContext(dataSource,context);
const habitats=context.window.LLA_NATURE_DATA.habitats;
assert.equal(habitats.length,3,"Expected desert, coast and garden worlds");
assert.deepEqual(Array.from(habitats,h=>h.id),["desert","coast","garden"]);
let total=0;
for(const h of habitats){
 assert(h.name&&h.ar&&h.emoji&&h.intro&&h.arIntro,"Each habitat needs English, Arabic and a scene");
 assert.equal(h.missions.length,6,h.id+" must have six different missions");
 const questions=new Set();
 for(const m of h.missions){
  total++;
  for(const field of ["emoji","word","wordAr","q","arQ","why","arWhy"])
   assert(typeof m[field]==="string"&&m[field].trim().length>=(field==="emoji"?1:3),h.id+" missing "+field);
  assert(!questions.has(m.q),h.id+" has a duplicated question");questions.add(m.q);
  assert.equal(m.choices.length,3,"Three choices per mission");
  assert(Number.isInteger(m.answer)&&m.answer>=0&&m.answer<3,"A valid answer is required");
  const choices=new Set();
  for(const c of m.choices){
   assert(Array.isArray(c)&&c.length===2&&c.every(x=>typeof x==="string"&&x.trim().length>0),"Both language choices required");
   assert(!choices.has(c[0]),"Answer options must not repeat");choices.add(c[0]);
  }
 }
}
assert.equal(total,18);
for(const s of ["id=\"habitatView\"","id=\"playView\"","id=\"finishView\"",
 "id=\"answerChoices\"","id=\"answerFeedback\"","id=\"nextMission\"","id=\"backHabitats\"",
 "id=\"overallStatus\"","lang=\"ar\"","aria-live=\"polite\"","script-src 'self'",
 "nature-explorer-data.js","nature-explorer.js","nature-explorer.css"])
 assert(html.includes(s),"Missing accessible feature: "+s);
for(const m of gameSource.matchAll(/\$\("([^"]+)"\)/g))
 assert(html.includes('id="'+m[1]+'"'),"Missing page element: "+m[1]);
for(const s of ["localStorage.getItem(KEY)","localStorage.setItem(KEY","completed.add(",
 "button.disabled=true","if(answered||currentHabitat<0)return","aria-hidden","role=\"group\""])
 assert((gameSource+html).includes(s),"Required behavior missing: "+s);
assert(!/fetch\s*\(|XMLHttpRequest|sendBeacon|WebSocket|MediaRecorder|getUserMedia|speechSynthesis|SpeechRecognition/i.test(gameSource+dataSource),
 "No network, voice capture or unapproved speech");
assert(!/innerHTML\s*=/.test(gameSource),"Use textContent rather than HTML injection");
assert(!/<script\b(?![^>]*src=)[^>]*>/i.test(html),"No inline executable scripts");
assert(css.includes("prefers-reduced-motion")&&css.includes("@media(max-width:690px)"),"Phone and reduced-motion support required");
const index=fs.readFileSync("index.html","utf8");
const sw=fs.readFileSync("sw.js","utf8");
const workflow=fs.readFileSync(".github/workflows/validate.yml","utf8");
assert(index.includes('href="./nature-explorer.html"'),"Nature Explorer must be discoverable from the home menu");
for(const path of ["nature-explorer.html","nature-explorer.css","nature-explorer-data.js","nature-explorer.js"])
 assert(sw.includes('./'+path),"Offline PWA manifest missing: "+path);
assert(workflow.includes("node scripts/test-nature-explorer.cjs"),"Run nature tests in CI");
console.log("PASS: 18 bilingual nature missions, safe answer keys, no speech capture, phone layout, local progress and app integration.");