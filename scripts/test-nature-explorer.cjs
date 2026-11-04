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
  for(const field of ["emoji","word","wordAr","q","arQ","why","arWhy","skill","observe","arObserve","hint","arHint","act","arAct"])
   assert(typeof m[field]==="string"&&m[field].trim().length>=1,h.id+" missing "+field);
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
 "id=\"overallStatus\"","id=\"adultView\"","id=\"parentReport\"","id=\"adultToggle\"",
 "id=\"observeEnglish\"","id=\"observeArabic\"","id=\"hintToggle\"","id=\"hintPanel\"",
 "id=\"missionAction\"","id=\"actionArabic\"","id=\"actionEnglish\"","lang=\"ar\"","aria-live=\"polite\"","script-src 'self'",
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
// Exercise real controller behavior with a minimal fake DOM, including resume, hint, correct answer and private report.
class FakeNode{
 constructor(tag="div"){this.tagName=tag;this.hidden=false;this.children=[];this.dataset={};this.style={};this.attrs={};this.events={};this.textContent="";this.value="";this.disabled=false;this.classes=new Set();this.classList={add:x=>this.classes.add(x)};}
 addEventListener(type,fn){this.events[type]=fn;}
 setAttribute(key,value){this.attrs[key]=String(value);}
 getAttribute(key){return this.attrs[key];}
 append(...xs){this.children.push(...xs);}
 replaceChildren(...xs){this.children=[...xs];}
 querySelectorAll(selector){assert.equal(selector,"button");return this.children.filter(x=>x.tagName==="button");}
 click(){if(!this.disabled)this.events.click?.();}
 focus(){this.focused=true;}
 select(){this.selected=true;}
}
const nodes=new Map();
for(const item of html.matchAll(/id="([^"]+)"/g))nodes.set(item[1],new FakeNode("div"));
for(const id of ["playView","finishView","adultView","hintPanel","missionAction","nextMission"]){
 assert(nodes.has(id),"Missing required node "+id);nodes.get(id).hidden=true;
}
const document={
 getElementById:id=>nodes.get(id)||null,
 createElement:tag=>new FakeNode(tag),
 createTextNode:text=>({textContent:text})
};
const key="lla-nature-explorer-v1",store=new Map([[key,JSON.stringify(["desert:0"])]]);
const localStorage={getItem:k=>store.has(k)?store.get(k):null,setItem:(k,v)=>store.set(k,String(v))};
vm.runInNewContext(gameSource,{window:{LLA_NATURE_DATA:context.window.LLA_NATURE_DATA,print:()=>{}},document,localStorage});
const node=id=>{assert(nodes.has(id),"Unknown fake DOM "+id);return nodes.get(id)};
assert.equal(node("habitatCards").children.length,3,"Three places must appear");
node("habitatCards").children[0].click();
assert.equal(node("wordEnglish").textContent,"Water","Return to first unfinished mission");
assert(node("hintPanel").hidden,"Hint starts hidden");
node("hintToggle").click();
assert.equal(node("hintPanel").hidden,false,"Bilingual hint opens");
assert(node("hintArabic").textContent.length>1);
const answer=data=>Number(data.dataset.choice);
let buttons=node("answerChoices").children;
const target=habitats[0].missions[1].answer;
buttons.find(b=>answer(b)!==target).click();
assert(node("answerFeedback").textContent.includes("حاول"),"Wrong attempt gets supportive bilingual guidance");
assert.equal(node("hintPanel").hidden,false,"Wrong answer reveals hint");
buttons.find(b=>answer(b)===target).click();
assert.equal(node("missionAction").hidden,false,"Correct answer unlocks nature care action");
assert(node("actionArabic").textContent.length>5,"Arabic action supplied");
assert.equal(JSON.parse(store.get(key)).length,2,"Only completed IDs are saved; initial completion retained");
assert.equal(store.size,1,"Never collect another local storage field");
node("backHabitats").click();
node("adultToggle").click();
assert.equal(node("adultView").hidden,false,"Adult summary opens");
assert(node("parentReport").value.includes("Water / ماء"),"Adult notes show bilingual words");
assert(!/child name|student name/i.test(node("parentReport").value.split("\n").slice(0,5).join(" ")),"No personal data fields in report");
console.log("PASS: 18 bilingual four-stage nature missions, hints, safe feedback, private report, runtime resume, offline integration and accessibility.");