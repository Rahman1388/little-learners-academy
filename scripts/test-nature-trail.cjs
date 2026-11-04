"use strict";
/* Source and safety audit for REVIEW-ONLY original nature questions.
 * This is not teacher verification of grade placement or Arabic language.
 */
const assert=require("node:assert/strict");
const fs=require("node:fs");
const vm=require("node:vm");
const context={window:{}};
vm.runInNewContext(fs.readFileSync("nature-trail-data.js","utf8"),context,{filename:"nature-trail-data.js"});
const questions=context.window.LLA_NATURE_TRAIL;
assert(Array.isArray(questions));
assert.equal(questions.length,12);
assert.equal(new Set(questions.map(x=>x.id)).size,12);
assert.equal(new Set(questions.map(x=>x.en)).size,12);
for(const band of ["1-2","3-4","5-6"]){
 assert.equal(questions.filter(q=>q.band===band).length,4,"Expected four for band "+band);
}
const independentlyCheckedAnswers=[0,1,2,1,0,1,2,0,0,1,2,1];
for(const [index,q] of questions.entries()){
 assert.equal(q.id,["nature-12-","nature-34-","nature-56-"][Math.floor(index/4)]+String(index%4+1).padStart(2,"0"));
 assert.equal(q.correct,independentlyCheckedAnswers[index],"Answer key drift: "+q.id);
 assert(["garden","desert","coast","mangrove"].includes(q.scene));
 assert(typeof q.symbol==="string"&&q.symbol.length>0);
 assert(Array.isArray(q.choices)&&q.choices.length===3);
 for(const choice of q.choices){
  assert.equal(choice.length,3);
  assert(choice.every(v=>typeof v==="string"&&v.trim().length>0),"Untranslated choice in "+q.id);
 }
 assert.equal(new Set(q.choices.map(v=>v[1])).size,3,"Repeated choice in "+q.id);
 for(const key of ["en","ar","whyEn","whyAr","hintEn","hintAr","talkEn","talkAr"]){
  assert(typeof q[key]==="string"&&q[key].trim().length>=12,"Missing bilingual content "+q.id+" "+key);
 }
}
const html=fs.readFileSync("nature-trail.html","utf8");
const script=fs.readFileSync("nature-trail.js","utf8");
assert(html.includes('name="robots" content="noindex,nofollow"'),"Draft must be noindex");
assert(html.includes("Grade")&&html.includes("الصف"),"Bilingual grade choices absent");
assert(html.includes('id="stop"')&&html.includes('id="hintButton"'),"Missing quiet stop or hint");
assert(html.includes("nature-trail-data.js")&&html.includes("nature-trail.js"),"Missing JS source links");
assert(!/https?:\/\//.test(html),"Review page must not include external web content");
assert(!/\b(localStorage|sessionStorage|fetch|XMLHttpRequest|sendBeacon|SpeechSynthesis|speechSynthesis|MediaRecorder|getUserMedia)\b/.test(script),"Unexpected storage, tracking or synthetic voice in draft");
assert(!/\binnerHTML\b/.test(script),"No HTML injection: use DOM text nodes");
assert(!/<audio\b|autoplay|<video\b/i.test(html),"No unreviewed sound or video");
assert(html.includes("prefers-reduced-motion"),"Missing reduced-motion fallback");
for(const id of ["level","progress","progressFill","play","finish","scene","sceneEmoji","sceneCaption","stepCount","stepTitle","questionEn","questionAr","answers","hint","hintButton","feedback","familyTalk","next","stop","again","levelNote","finishTitle","finishText"]){
 assert(html.includes('id="'+id+'"'),"JS element not in HTML: "+id);
}
console.log("PASS: 12 original bilingual nature prompts with verified answer keys, age bands and no tracking or unreviewed audio.");
