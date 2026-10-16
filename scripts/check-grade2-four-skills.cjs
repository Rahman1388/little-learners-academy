/* Static quality gate for the original Grade 2 four-skills prototype. */
"use strict";
const assert=require("node:assert/strict");
const fs=require("node:fs");
const vm=require("node:vm");
const data=fs.readFileSync("grade2-four-skills-data.js","utf8");
const code=fs.readFileSync("grade2-four-skills.js","utf8");
const html=fs.readFileSync("grade2-four-skills.html","utf8");
new vm.Script(data,{filename:"grade2-four-skills-data.js"});
new vm.Script(code,{filename:"grade2-four-skills.js"});
const sandbox={window:{}};
vm.runInNewContext(data,sandbox);
const modules=sandbox.window.LLA_G2_FOUR_SKILLS;
assert.equal(modules.length,5);
assert.equal(new Set(modules.map(x=>x.id)).size,5);
assert.deepEqual(Array.from(modules.map(x=>x.title)),["Welcome back!","That's me!","About people","Food and drink","What I eat"]);
let practiceCount=0;
for(const m of modules){
 assert(m.id&&m.title&&m.ar&&m.outcome&&m.week);
 for(const part of ["listen","speak","read","write"])assert(m[part],"Missing "+m.id+" "+part);
 for(const key of ["listen","read"]){
  const p=m[key];
  assert.equal(p.choices.length,3);
  assert.equal(new Set(p.choices).size,3);
  assert(Number.isInteger(p.answer)&&p.answer>=0&&p.answer<3);
  assert(p.question.length>=8,"Question too short for "+m.id+" "+key);
  assert((key==="listen"?p.script:p.passage).length>30);
 }
 const words=m.read.passage.split(/\s+/).filter(Boolean);
 assert(words.length>=20&&words.length<=40,m.id+": expected short, original reading text, got "+words.length+" words");
 assert(m.speak.prompt&&m.speak.example&&m.speak.check);
 assert(m.write.prompt&&m.write.answer&&m.write.clues.length>=3);
 const normal=s=>s.toLowerCase().replace(/[^a-z0-9 ]/g,"").replace(/\s+/g," ").trim();
 assert.equal(normal(m.write.clues.join(" ")),normal(m.write.answer),m.id+": writing word bank does not match expected sentence");
 practiceCount+=4;
}
assert.equal(practiceCount,20);
assert(html.includes('src="./grade2-four-skills-data.js"'));
assert(html.includes('src="./grade2-four-skills.js"'));
assert(html.includes('id="skillCards"'));
assert(html.includes('not a secure test'));
assert(!/https?:\/\/[^"'\s]+\.js/.test(html),"No external JS libraries should be used");
assert(!/getUserMedia|SpeechRecognition|sendBeacon|\bfetch\s*\(/.test(code));
assert(code.includes("lla-g2-four-skills-v1"));
console.log("PASS: five Grade 2 modules, 20 four-skill practices, stable outcomes, correct answers, valid written clues, no voice capture");
