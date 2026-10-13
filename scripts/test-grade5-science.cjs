/* Grade 5 supplementary science data-integrity checks.
 * Automated checks do not replace a qualified educator's content review.
 */
"use strict";
const assert=require("node:assert/strict"),fs=require("node:fs"),vm=require("node:vm");
const context={window:{}};
vm.runInNewContext(fs.readFileSync("grade5-science-data.js","utf8"),context,{timeout:3500});
const data=context.window.LLA_GRADE5_SCIENCE;
assert(data&&data.passages.length===3&&data.questions.length===18);
const ids=new Set();
for(const topic of data.passages){
 assert(topic.text.length>350,"Topic scenario too short: "+topic.id);
 assert(topic.ar&&topic.title&&topic.icon);
 assert.equal(data.questions.filter(q=>q.passage===topic.id).length,6);
}
for(const [i,q] of data.questions.entries()){
 assert.equal(q.id,"g5s-"+String(i+1).padStart(2,"0"));
 assert(!ids.has(q.id));ids.add(q.id);
 assert(q.prompt.length>18&&q.ar.length>12&&q.hint.length>12&&q.explanation.length>30);
 assert(q.choices.length===3&&new Set(q.choices).size===3);
 assert(Number.isInteger(q.answer)&&q.answer>=0&&q.answer<3);
 assert(q.hint!==q.explanation);
}
console.log("PASS: 3 original Grade 5 science topics, 18 unique questions, explanations, answer structure");
