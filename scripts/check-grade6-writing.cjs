/* Static Grade 6 writing-integrity check: structural accuracy, not teacher approval. */
"use strict";
const assert=require("node:assert/strict"),fs=require("node:fs"),vm=require("node:vm");
const context={window:{}};
vm.runInNewContext(fs.readFileSync("grade6-writing-data.js","utf8"),context,{timeout:2500});
const items=context.window.LLA_GRADE6_WRITING;
assert(Array.isArray(items)&&items.length===6,"Exactly six original writing missions expected");
const ids=new Set();
const expected=["shade","shade","mangrove","mangrove","library","library"];
for(const [i,t] of items.entries()){
 assert.equal(t.id,"g6w-"+String(i+1).padStart(2,"0"));
 assert(!ids.has(t.id),"Duplicate task ID");ids.add(t.id);
 assert.equal(t.unit,expected[i],"Incorrect passage topic group");
 for(const prop of ["title","ar","task","support","skill","model","reflection"]){
  assert(typeof t[prop]==="string"&&t[prop].trim().length>13,"Missing "+prop+" in "+t.id);
 }
 assert(Array.isArray(t.starters)&&t.starters.length===3);
 assert(Array.isArray(t.criteria)&&t.criteria.length===3);
 assert(t.starters.every(s=>typeof s==="string"&&s.trim().length>12));
 assert(t.criteria.every(s=>typeof s==="string"&&s.trim().length>15));
 assert(t.model.trim().split(/\s+/).length>=35,"Too-short model explanation in "+t.id);
}
const html=fs.readFileSync("grade6-writing.html","utf8");
const js=fs.readFileSync("grade6-writing.js","utf8");
assert(html.includes('Content-Security-Policy'),"Writing page requires CSP");
assert(html.includes("not saved or uploaded"),"Draft privacy notice missing");
assert(js.includes('lla-grade6-writing-v1'),"Stable key missing");
assert(js.includes("drafts=new Map()"),"Writing draft must remain in memory");
assert(!js.includes("localStorage.setItem(KEY,JSON.stringify(drafts)"),"Do not save draft text");
console.log("PASS: six structured Grade 6 writing prompts, minimum explanation, privacy boundary");
