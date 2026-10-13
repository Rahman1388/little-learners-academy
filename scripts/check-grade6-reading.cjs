/* Independent deterministic content checks for LIMITED Grade 6 reading pilot.
 * Content quality needs human subject-language review beyond these checks.
 */
"use strict";
const assert=require("node:assert/strict"),fs=require("node:fs"),vm=require("node:vm");
const sandbox={window:{}};
vm.runInNewContext(fs.readFileSync("grade6-reading-data.js","utf8"),sandbox,{timeout:3000});
const source=sandbox.window.LLA_GRADE6_READING;
assert(source&&source.passages.length===3&&source.questions.length===18,"Expected 3 stories and 18 questions");
const passageIds=new Set(source.passages.map(p=>p.id)),ids=new Set();
assert.equal(passageIds.size,3);
for(const p of source.passages){
 assert(p.text.length>=650,"Story too short: "+p.id);
 assert(p.title&&p.icon&&p.ar&&p.discuss&&p.focus);
 assert.equal(source.questions.filter(q=>q.passage===p.id).length,6);
}
for(const [i,q] of source.questions.entries()){
 assert.equal(q.id,"g6r-"+String(i+1).padStart(2,"0"));
 assert(!ids.has(q.id));ids.add(q.id);
 assert(passageIds.has(q.passage));
 assert(q.skill.length>3&&q.prompt.length>18&&q.ar.length>13);
 assert(q.hint.length>20&&q.explanation.length>35);
 assert.equal(q.choices.length,3);
 assert.equal(new Set(q.choices).size,3);
 assert(Number.isInteger(q.answer)&&q.answer>=0&&q.answer<3);
 assert(q.hint!==q.explanation);
}
console.log("PASS: 3 original Grade 6 reading stories, 18 questions with unique answers and evidence-based hints/explanations");
