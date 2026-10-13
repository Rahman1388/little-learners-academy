/* Limited Grade 6 maths pilot: fixed answer/key and content-integrity regression.
 * Automated checks cannot substitute for a maths teacher's or Arabic expert's review.
 */
"use strict";
const assert=require("node:assert/strict"),fs=require("node:fs"),vm=require("node:vm");
const context={window:{}};
vm.runInNewContext(fs.readFileSync("grade6-math-data.js","utf8"),context,{filename:"grade6-math-data.js",timeout:3500});
const items=context.window.LLA_GRADE6_MATH;
assert(items&&items.length===24,"Expected 24 questions");
const expected=[
 "6 cups","3:2","12 QAR","1/3","10 km","60%",
 "14","7","2x + 5","19","14","6",
 "7/8","24","3/8","1.2","15 QAR","0.8",
 "84 cm²","30 cm²","24 cm³","22°C","27 cm","2/5"
];
const perTopic={ratios:0,algebra:0,fractions:0,measure:0};
const ids=new Set(),prompts=new Set();
for(const [i,q] of items.entries()){
 assert.equal(q.id,"g6m-"+String(i+1).padStart(2,"0"));
 assert(!ids.has(q.id));ids.add(q.id);
 assert(Object.prototype.hasOwnProperty.call(perTopic,q.skill),"Unrecognised topic "+q.skill);
 perTopic[q.skill]++;
 assert(!prompts.has(q.prompt),"Duplicate question");prompts.add(q.prompt);
 for(const key of ["prompt","ar","hint","explanation"])
  assert(typeof q[key]==="string"&&q[key].length>12,q.id+" missing "+key);
 assert.equal(q.choices.length,3);
 assert.equal(new Set(q.choices).size,3);
 assert(q.choices.includes(q.answer));
 assert.equal(q.answer,expected[i],"Changed answer requires content review "+q.id);
 assert.notEqual(q.hint,q.explanation);
}
for(const [skill,n] of Object.entries(perTopic))assert.equal(n,6,skill+" should have 6 activities");
console.log("PASS: Grade 6 maths 24 unique questions, stable IDs, fixed answers and 4 balanced topics");
