"use strict";
/* Review-studio static regression: no new audio, external calls or child tracking. */
const assert=require("node:assert/strict");
const fs=require("node:fs"),vm=require("node:vm");
const html=fs.readFileSync("pronunciation-review.html","utf8");
const sandbox={window:{}};
vm.runInNewContext(fs.readFileSync("curriculum.js","utf8"),sandbox);
const sections=sandbox.window.LLA_CURRICULUM.subjects.flatMap(subject=>subject.lessons);
const priorities=[
 ["patterns",0,"Red"],["patterns",1,"Yellow"],
 ["phonics",2,"Sun"],["phonics",3,"Bus"]
];
for(const [id,item,label] of priorities){
 const lesson=sections.find(s=>s.id===id);
 assert(lesson&&lesson.items[item],label+" must map to an existing curriculum word");
 const link="./pronunciation-review.html?lesson="+id+"&amp;item="+item;
 assert(html.includes(link),label+" needs a working one-word review link");
 for(const lang of ["en","ar"])for(const voice of ["girl","boy"]){
  const src=id==="phonics"
   ?(lang==="en"&&item===3
     ?"audio/practice/en-phonics-3-"+(voice==="girl"?"alba":"bryce")+".mp3"
     :"audio/practice/"+lang+"-phonics-"+item+"-"+voice+".mp3")
   :"audio/"+lang+"/"+id+"-"+item+"-"+voice+".mp3";
  assert(fs.existsSync(src),"Priority review audio is missing: "+src);
 }
}
const inline=Array.from(html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g))
 .map(x=>x[1]).filter(Boolean);
assert.equal(inline.length,1,"Expected one local inline review controller");
new vm.Script(inline[0],{filename:"pronunciation-review.inline.js"});
for(const text of ["id=\"showWholeLesson\"","id=\"lessonSelect\"","id=\"copyReport\"",
 "aria-controls=\"cards\"","p.addEventListener(\"error\"","retry.addEventListener(\"click\"",
 "p.addEventListener(\"canplay\"","lang===\"ar\"?item[2]:item[1]",
 "focusIndex=null;render()","url.searchParams.set(\"retry\""]){
 assert(html.includes(text),"Missing review/error-recovery feature: "+text);
}
assert(!/fetch\s*\(|XMLHttpRequest|sendBeacon|WebSocket|MediaRecorder|speechRecognition/i.test(inline[0]),
 "Review page must not collect child speech or transmit feedback");
assert(html.includes("Adult review only"),"Human educator status is required");
assert(html.includes("listener ratings only; no native-speaker educator approval"),
 "Listener feedback must never be presented as approval");
console.log("PASS: four priority word links, 16 source voice files, review UI, valid JS, retry and privacy protections.");
