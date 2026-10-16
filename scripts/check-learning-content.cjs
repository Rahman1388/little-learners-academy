/* Repeatable integrity checks for 151 Grade 1 activities and the 24-item
 * Grade 2 maths pilot. Not a substitute for teacher or native-language review.
 */
"use strict";
const assert=require("node:assert/strict");
const fs=require("node:fs");
const vm=require("node:vm");
function load(path,key){
 const context={window:{}};
 vm.runInNewContext(fs.readFileSync(path,"utf8"),context,{timeout:1500,filename:path});
 const data=context.window[key];
 assert(Array.isArray(data),path+" must expose "+key);
 return data;
}
function fields(items,label){
 const ids=new Set(),full=new Set(),distribution=[0,0,0];
 for(const item of items){
  assert.match(item.id,/^(?:mini-\d{3}|g2-\d{2})$/);
  assert(!ids.has(item.id),label+" duplicate ID "+item.id);
  ids.add(item.id);
  for(const field of ["question","choices","answer"])
   assert(item[field]!==undefined,label+" missing "+field+" in "+item.id);
  for(const field of ["question","title","explanation"].filter(x=>x in item))
   assert(typeof item[field]==="string"&&item[field].trim().length>3,label+" empty "+field+" in "+item.id);
  assert(item.choices.length===3,label+" must have three answers: "+item.id);
  assert(new Set(item.choices).size===3,label+" repeated answer: "+item.id);
  assert(item.choices.every(x=>typeof x==="string"&&x.trim()),label+" non-text option: "+item.id);
  assert(Number.isInteger(item.answer)&&item.answer>=0&&item.answer<3,label+" invalid answer: "+item.id);
  const signature=item.question+"::"+item.choices.join("::");
  assert(!full.has(signature),label+" duplicated exact question: "+item.id);
  full.add(signature);distribution[item.answer]++;
 }
 assert(distribution.every(n=>n>=5),label+" correct answers cluster into a single button");
}
const grade1=load("activity-data.js","LLA_MINI_ACTIVITIES");
const grade2=load("grade2-pilot-data.js","LLA_GRADE2_PILOT");
assert.equal(grade1.length,151,"Do not silently alter the 151 Grade 1 task IDs/progress");
assert.equal(grade2.length,24,"The review pilot contains exactly 24 hand-written tasks");
fields(grade1,"Grade 1");fields(grade2,"Grade 2");
const counts={math:70,english:34,science:20,life:15,arts:12};
for(const [area,expected] of Object.entries(counts))
 assert.equal(grade1.filter(x=>x.area===area).length,expected,"Grade 1 "+area+" count");
for(const domain of ["place","arithmetic","measure","geometry"]){
 const group=grade2.filter(x=>x.domain===domain);
 assert.equal(group.length,6,"Grade 2 domain "+domain);
 for(const item of group){
  assert(/^2\.(NBT|MD|G)\.[A-D]$/.test(item.ref),"Unrecognised Common Core topic code: "+item.id);
  assert(typeof item.arabic==="string"&&item.arabic.length>9,"Missing Arabic support: "+item.id);
  assert(typeof item.explanation==="string"&&item.explanation.length>19,"Missing explanation: "+item.id);
 }
}
let equations=0;
for(const task of grade1.filter(x=>x.area==="math")){
 const exp=task.question.match(/^(\d+)\s*([+−])\s*(\d+)\s*=\s*\?$/);
 if(exp){
  const [a,b]=[Number(exp[1]),Number(exp[3])];
  assert.equal(Number(task.choices[task.answer]),exp[2]==="+"?a+b:a-b,"Wrong arithmetic key: "+task.id);
  equations++;
 }
 if(task.skill==="Counting"){
  const count=Number(task.title.match(/^Count (\d+) objects?$/)?.[1]);
  assert(count>=1&&count<=20,"Counting range "+task.id);
  assert.equal(task.display.split(" ").length,count,"Object count mismatch "+task.id);
  assert.equal(Number(task.choices[task.answer]),count,"Counting answer mismatch "+task.id);
 }
 if(task.skill==="Number order"){
  const n=Number(task.title.match(/^One more than (\d+)$/)?.[1]);
  assert.equal(Number(task.choices[task.answer]),n+1,"One-more answer mismatch "+task.id);
 }
}
assert.equal(equations,30,"Expected 15 additions and 15 subtractions");
const capital=grade1.find(x=>x.question==="Which sentence starts with a capital letter?");
assert(capital,"Capital-letter question disappeared");
assert.equal(capital.choices.filter(x=>/^[A-Z]/.test(x)).length,1,"Capital-letter choices have multiple valid answers");
const expectedGrade2=[
"34","6","57","72","90","330",
"42","36","68","60","60","50",
"100 cm","Half past three","Quarter past four","35 cm","A ruler","1 kilogram",
"6","5","12","Books","2","One quarter"];
grade2.forEach((item,i)=>{
 assert.equal(item.id,"g2-"+String(i+1).padStart(2,"0"),"Pilot progress IDs changed");
 assert.equal(item.choices[item.answer],expectedGrade2[i],"Grade 2 reviewed answer mismatch: "+item.id);
});
console.log("PASS: 151 Grade 1 tasks (30 math equations), 24 Grade 2 pilot tasks, answer keys, choices and stable IDs.");
console.log("NOTE: Full curriculum equivalency, Arabic wording and pronunciation still require educator review.");
