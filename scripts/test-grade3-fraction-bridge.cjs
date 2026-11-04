"use strict";
/* Source-integrity review. Does not replace adult, accessibility or iPhone QA. */
const assert=require("node:assert/strict");
const fs=require("node:fs");
const vm=require("node:vm");
const sandbox={window:{}};
vm.runInNewContext(fs.readFileSync("grade3-fraction-bridge-data.js","utf8"),sandbox,{filename:"grade3-fraction-bridge-data.js"});
const tasks=sandbox.window.LLA_G3_FRACTION_BRIDGE;
assert.equal(tasks.length,12,"Expected 12 new questions");
assert.equal(new Set(tasks.map(t=>t.id)).size,12,"Repeated ID");
const expectedKinds=["read","compare","equivalent"];
for(const kind of expectedKinds)assert.equal(tasks.filter(t=>t.kind===kind).length,4,"Wrong "+kind+" count");
for(const task of tasks){
 assert(/^(read|compare|equivalent)-0[1-4]$/.test(task.id));
 assert(task.explanationEn.length>=38,"Missing worked English explanation: "+task.id);
 assert(task.explanationAr.length>=18,"Missing draft Arabic explanation: "+task.id);
 assert(Array.isArray(task.left)&&task.left.length===2);
 for(const pair of [task.left,...(task.right?[task.right]:[])]){
  assert(pair.every(Number.isInteger),"Noninteger fraction: "+task.id);
  assert(pair[1]>=2&&pair[1]<=6,"Fraction piece count: "+task.id);
  assert(pair[0]>=1&&pair[0]<=pair[1],"Improper or empty fraction: "+task.id);
 }
 if(task.kind==="read"){
  assert.equal(task.answer,task.left.join("/"),"Read answer mismatch "+task.id);
  assert.equal(task.options.length,3,"Read distractor count");
  assert.equal(new Set(task.options).size,3,"Duplicate distractor");
  assert(task.options.includes(task.answer),"Correct answer missing from read choices");
 }else if(task.kind==="compare"){
  assert.equal(task.left[1],task.right[1],"Use same denominators in comparison stage");
  const comparison=task.left[0]>task.right[0]?"left":task.left[0]<task.right[0]?"right":"equal";
  assert.equal(task.answer,comparison,"Comparison answer mismatch: "+task.id);
 }else{
  const equivalent=task.left[0]*task.right[1]===task.right[0]*task.left[1];
  assert.equal(task.answer,equivalent?"same":"different","Equivalence answer mismatch: "+task.id);
 }
}
const html=fs.readFileSync("grade3-fraction-bridge.html","utf8");
const js=fs.readFileSync("grade3-fraction-bridge.js","utf8");
assert(html.includes('meta name="robots" content="noindex,nofollow"'),"Draft missing noindex");
assert(html.includes("لا"),"No visible bilingual Arabic");
assert(html.includes('id="modelArea"')&&html.includes('id="options"'),"Missing interaction elements");
assert(html.includes("grade3-fraction-bridge-data.js")&&html.includes("grade3-fraction-bridge.js"),"Missing script links");
assert(!/localStorage|sessionStorage|fetch\(|XMLHttpRequest|navigator\.mediaDevices/.test(js),"Review pilot should not collect or save data");
assert(!/https?:\/\//.test(html),"External links are not allowed in draft");
assert(!/innerHTML\s*=/.test(js),"Use textContent or DOM methods, never unsafe HTML injection");
console.log("PASS: 12 unique Grade 3 pilot questions (4 read, 4 compare, 4 equivalent); verified answers, bilingual explanations, no data collection.");
