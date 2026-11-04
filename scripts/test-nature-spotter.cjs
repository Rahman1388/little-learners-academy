"use strict";
/* Independent static quality checks for original optional Nature Spotter.
   These are observations, not validated school or curriculum results. */
const assert=require("node:assert/strict");
const fs=require("node:fs"),vm=require("node:vm");
const ctx={window:{}};
vm.runInNewContext(fs.readFileSync("nature-spotter-data.js","utf8"),ctx,{filename:"nature-spotter-data.js"});
const scenes=ctx.window.LLA_NATURE_SPOTTER;
assert(Array.isArray(scenes));
assert.equal(scenes.length,3);
assert.deepEqual(Array.from(scenes,x=>x.id),["mangrove","desert","coast"]);
assert.equal(new Set(scenes.map(x=>x.id)).size,3);
for(const scene of scenes){
 assert.equal(scene.items.length,4,"Expected 4 discoveries per scene "+scene.id);
 assert.equal(new Set(scene.items.map(x=>x.id)).size,4,"Repeating object in "+scene.id);
 assert(scene.name.trim().length>=5&&scene.nameAr.trim().length>=5);
 for(const object of scene.items){
  for(const key of ["id","icon","en","ar","fact","factAr","prompt","promptAr"]){
   assert(typeof object[key]==="string"&&object[key].trim().length>=2,"Missing "+key+" for "+scene.id+"/"+object.id);
  }
  assert(object.fact.length>28&&object.factAr.length>19,"Weak bilingual learning fact: "+object.id);
  assert(object.prompt.length>25&&object.promptAr.length>15,"Missing family conversation: "+object.id);
 }
}
const html=fs.readFileSync("nature-spotter.html","utf8");
const js=fs.readFileSync("nature-spotter.js","utf8");
assert(html.includes('name="robots" content="noindex,nofollow"'),"Review-only page needs noindex");
assert(html.includes("nature-spotter-data.js")&&html.includes("nature-spotter.js"),"Missing scripts");
assert(!/https?:\/\//.test(html),"External URLs require separate child-safety review");
assert(!/localStorage|sessionStorage|indexedDB|fetch\s*\(|XMLHttpRequest|SpeechSynthesis|speechSynthesis|getUserMedia|MediaRecorder|sendBeacon/.test(js),"No child data capture, storage, or unreviewed voice");
assert(!/\binnerHTML\b/.test(js),"Unsafe HTML composition");
assert(!/<audio\b|<video\b|autoplay/i.test(html),"Unexpected media");
for(const id of ["sceneChoices","sceneHeading","landscape","landscapeImage","objects","discoveryCount","discovery","showCard","reset","familyCard","cardScene","cardCount","cardList","cardNext","cardNextAr","cardTitle","printCard","closeCard"]){
 assert(html.includes('id="'+id+'"'),"Missing element "+id);
}
assert(html.includes("@media print"),"Parent card must be printable");
console.log("PASS: 12 original bilingual Nature Spotter cards, private session-only parent recap, no unreviewed audio or storage.");
