"use strict";
// Review-only integrity + simulated child interaction checks for the Visual Learning Garden.
const assert=require("node:assert/strict");
const fs=require("node:fs");
const vm=require("node:vm");
const dataSource=fs.readFileSync("visual-learning-garden-data.js","utf8");
const gameSource=fs.readFileSync("visual-learning-garden.js","utf8");
const html=fs.readFileSync("visual-learning-garden.html","utf8");
const css=fs.readFileSync("visual-learning-garden.css","utf8");
new vm.Script(dataSource,{filename:"visual-learning-garden-data.js"});
new vm.Script(gameSource,{filename:"visual-learning-garden.js"});
const dataContext={window:{}};
vm.runInNewContext(dataSource,dataContext);
const worlds=dataContext.window.LLA_VISUAL_GARDEN;
assert.equal(worlds.length,6,"Six original concept webs");
assert.deepEqual(Array.from(worlds,w=>w.band),["1–2","1–2","3–4","3–4","5–6","5–6"]);
assert.equal(new Set(worlds.map(w=>w.id)).size,6,"Unique map ids");
for(const world of worlds){
 for(const field of ["id","band","icon","name","ar","topic","arTopic","center","arCenter","q","arQ","why","arWhy","talk","arTalk"]){
  assert(typeof world[field]==="string"&&world[field].trim().length>(field==="icon"?0:2),world.id+" missing "+field);
 }
 assert.equal(world.petals.length,4,world.id+" must have four concept leaves");
 assert.equal(world.choices.length,3,world.id+" must have three unique choices");
 assert(Number.isInteger(world.answer)&&world.answer>=0&&world.answer<3,"Valid answer required");
 assert.equal(new Set(world.choices.map(x=>x[0])).size,3,"Choices must differ");
 for(const petal of world.petals)
  for(const field of ["en","ar","icon","enFact","arFact"])
   assert(typeof petal[field]==="string"&&petal[field].trim().length>1,world.id+" missing "+field);
 for(const pair of world.choices)
  assert(Array.isArray(pair)&&pair.length===2&&pair.every(s=>typeof s==="string"&&s.trim().length>1),world.id+" missing bilingual choices");
}
for(const token of ["lang=\"ar\"","dir=\"rtl\"","role=\"status\"","aria-live=\"polite\"",
 "id=\"mapCards\"","id=\"petals\"","id=\"challenge\"","id=\"reflection\"","id=\"markDone\"",
 "id=\"adultNotes\"","id=\"copyNotes\"","visual-learning-garden.css","visual-learning-garden-data.js",
 "visual-learning-garden.js","script-src 'self'","connect-src 'none'"])
 assert(html.includes(token),"Required bilingual/accessibility/privacy feature missing: "+token);
for(const match of gameSource.matchAll(/\$\("([^"]+)"\)/g))
 assert(html.includes('id="'+match[1]+'"'),"JS refers to missing element: "+match[1]);
assert(!/fetch\s*\(|XMLHttpRequest|sendBeacon|WebSocket|MediaRecorder|getUserMedia|speechSynthesis|SpeechRecognition/i.test(dataSource+gameSource),"No remote calls or unverified voices");
assert(!/innerHTML\s*=/.test(gameSource),"No HTML string injection");
assert(!/<script\b(?![^>]*\bsrc=)[^>]*>/i.test(html),"No inline executable scripts");
assert(css.includes("prefers-reduced-motion")&&css.includes("max-width:540px")&&css.includes("min-height:54px"),"Mobile touch targets and reduced-motion support");
const sw=fs.readFileSync("sw.js","utf8");
const index=fs.readFileSync("index.html","utf8");
const workflow=fs.readFileSync(".github/workflows/validate.yml","utf8");
for(const file of ["visual-learning-garden.html","visual-learning-garden.css","visual-learning-garden-data.js","visual-learning-garden.js"])
 assert(sw.includes("./"+file),"Offline shell missing "+file);
assert(index.includes('href="./visual-learning-garden.html"'),"Feature must be discoverable from Academy home");
assert(workflow.includes("node scripts/test-visual-learning-garden.cjs"),"Automated CI test must be enabled");
// Simulate main UI flows to prevent static-only false passes.
class FakeNode{
 constructor(tag="div"){this.tag=tag;this.hidden=false;this.children=[];this.dataset={};this.attrs={};this.events={};
  this.textContent="";this.value="";this.disabled=false;this.className="";this.classList={add:x=>{this.className+=" "+x}};}
 addEventListener(name,fn){this.events[name]=fn;}
 setAttribute(key,value){this.attrs[key]=String(value);}
 getAttribute(key){return this.attrs[key];}
 append(...nodes){this.children.push(...nodes);}
 replaceChildren(...nodes){this.children=[...nodes];}
 querySelectorAll(selector){assert.equal(selector,"button");return this.children.filter(c=>c.tag==="button");}
 click(){if(!this.disabled)this.events.click?.();}
 focus(){this.focused=true;}
 select(){this.selected=true;}
}
const nodes=new Map();
for(const m of html.matchAll(/id="([^"]+)"/g))nodes.set(m[1],new FakeNode());
for(const id of ["play","challenge","reflection","adultPanel"])nodes.get(id).hidden=true;
const document={
 getElementById:id=>nodes.get(id)||null,
 createElement:tag=>new FakeNode(tag)
};
const store=new Map([["lla-visual-learning-garden-v1",JSON.stringify(["story","unknown"])]]); 
const localStorage={
 getItem:key=>store.get(key)||null,
 setItem:(key,value)=>store.set(key,String(value))
};
vm.runInNewContext(gameSource,{window:{LLA_VISUAL_GARDEN:worlds,print:()=>{}},document,localStorage});
const el=id=>nodes.get(id);
assert.equal(el("mapCards").children.length,6,"Six cards on initial screen");
assert(el("overallProgress").textContent.includes("1 / 6"),"Resume saved known completion only");
el("mapCards").children[1].click();
assert.equal(el("mapTitle").textContent,"Number Tree • شجرة الأعداد");
assert.equal(el("petals").children.length,4,"Four interactive concept leaves");
assert(el("challenge").hidden,"Quiz waits for all concept leaves");
el("petals").children.slice(0,3).forEach(b=>b.click());
assert(el("challenge").hidden,"Reading just three leaves must not unlock quiz");
el("petals").children[3].click();
assert.equal(el("challenge").hidden,false,"Four leaves unlock explanation check");
assert(el("factArabic").textContent.includes("العربية")===false,"Show current Arabic concept fact, not placeholder");
const buttons=el("choices").children;
assert.equal(buttons.length,3);
const wrong=buttons.find(b=>Number(b.dataset.choice)!==worlds[1].answer);
wrong.click();
assert(wrong.disabled,"Wrong option disabled, a retry still possible");
assert(el("reflection").hidden,"Reflection hidden until a correct answer");
buttons.find(b=>Number(b.dataset.choice)===worlds[1].answer).click();
assert.equal(el("reflection").hidden,false,"Correct answer unlocks bilingual explanation and family talk");
assert(el("explainArabic").textContent.length>10);
el("markDone").click();
assert.equal(el("picker").hidden,false,"Return to map chooser after practice");
assert.equal(JSON.parse(store.get("lla-visual-learning-garden-v1")).length,2,"Only known map IDs saved, no answer text");
assert.equal(store.size,1,"No additional child storage fields");
el("adultToggle").click();
assert.equal(el("adultPanel").hidden,false,"Family summary opens");
assert(el("adultNotes").value.includes("Number Tree / شجرة الأعداد"));
console.log("PASS: six bilingual concept webs; 24 colour-coded leaves; six questions; adult explanation; safe retries; private progress; mobile/offline/CSP integration.");