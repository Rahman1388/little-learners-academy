/* Deterministic owner-run review for the limited Grade 5 maths pilot.
 * Checks fixed published answers, unique IDs, hint/explanation presence, and
 * arithmetic consistency. It cannot certify pedagogy or Arabic pronunciation.
 */
"use strict";
const assert=require("node:assert/strict");
const fs=require("node:fs");
const vm=require("node:vm");
const sandbox={window:{}};
vm.runInNewContext(fs.readFileSync("grade5-math-data.js","utf8"),sandbox,{filename:"grade5-math-data.js",timeout:3000});
const items=sandbox.window.LLA_GRADE5_MATH;
assert(Array.isArray(items),"Grade 5 mathematics data must expose an array");
assert.equal(items.length,24,"Grade 5 pilot must keep 24 questions");
const expected=[
 "6,000,000","488,000","70,940","7/10","3 + 0.4 + 0.05","0.56",
 "7,023","6,218","252","12","360","13",
 "5/6","5/8","1/4","24","4.25","2.65",
 "240 cm","40 cm²","36 cm","11:10","6 kg","5"
];
const topics={place:0,operations:0,fractions:0,measure:0};
const ids=new Set(),questions=new Set();
for(const [i,item] of items.entries()){
 const stableId="g5m-"+String(i+1).padStart(2,"0");
 assert.equal(item.id,stableId,"Changed completion ID (protect learner progress)");
 assert(!ids.has(item.id),"Duplicate ID "+item.id);ids.add(item.id);
 assert(Object.hasOwn(topics,item.skill),"Unknown Grade 5 strand "+item.skill);
 topics[item.skill]++;
 for(const name of ["prompt","ar","hint","explanation"]){
  assert(typeof item[name]==="string"&&item[name].trim().length>10,item.id+" missing "+name);
 }
 assert(!questions.has(item.prompt),"Repeated exact prompt "+item.id);questions.add(item.prompt);
 assert(Array.isArray(item.choices)&&item.choices.length===3,item.id+" must have 3 choices");
 assert(new Set(item.choices).size===3,item.id+" duplicate choices");
 assert(item.choices.every(x=>typeof x==="string"&&x.trim()),item.id+" empty choice");
 assert(item.choices.includes(item.answer),item.id+" answer not present in choices");
 assert.equal(item.answer,expected[i],item.id+" changed reference answer: manual re-review required");
 assert(item.explanation!==item.hint,item.id+" hint and explanation are identical");
 const numerics=item.prompt.match(/(\d[\d,]*(?:\.\d+)?)\s*([+−×÷])\s*(\d[\d,]*(?:\.\d+)?)/);
 if(numerics){
   const x=Number(numerics[1].replaceAll(",","")),y=Number(numerics[3].replaceAll(",",""));
   const calc={"+":()=>x+y,"−":()=>x-y,"×":()=>x*y,"÷":()=>x/y}[numerics[2]]();
   if(/^[\d,.]+$/.test(item.answer))assert.equal(Number(item.answer.replaceAll(",","")),calc,item.id+" arithmetic mismatch");
 }
}
for(const [topic,count] of Object.entries(topics))
 assert.equal(count,6,"Each Grade 5 strand should have 6 questions: "+topic);
console.log("PASS: Grade 5 starter: 24 IDs, reference answers, arithmetic, 4 × 6 topic balance, English hints/explanations and Arabic support.");
console.log("LIMITATION: Automated checks do not certify Grade 5 curriculum alignment, Arabic wording, classroom suitability or teaching accuracy.");
