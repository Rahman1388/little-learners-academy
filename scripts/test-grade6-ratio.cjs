"use strict";
/* Release gate: 24 independent, mathematically verified source problems.
 * An automated check is not a teacher's curriculum endorsement.
 */
const assert=require("node:assert/strict"),fs=require("node:fs"),vm=require("node:vm");
const window={};
vm.runInNewContext(fs.readFileSync("grade6-ratio-data.js","utf8"),{window},{filename:"grade6-ratio-data.js"});
const items=window.LLA_G6_RATIO;
assert.equal(items.length,24);
assert.equal(new Set(items.map(x=>x.id)).size,24);
assert.equal(new Set(items.map(x=>x.question)).size,24);
for(const [i,topic] of ["tables","lines","rates","percent"].entries()){
 const topicItems=items.filter(x=>x.topic===topic);
 assert.equal(topicItems.length,6,"Wrong count for "+topic);
 for(const item of topicItems){
  assert.equal(item.choices.length,3);
  assert.equal(new Set(item.choices).size,3);
  assert(item.choices.includes(item.answer),"Answer missing from choices "+item.id);
  assert(item.arabicQuestion.trim().length>=12 && item.explanation.trim().length>=15, "Missing bilingual support or worked reasoning: "+item.id);
  assert(item.rows.length>=2 && item.columns.length===2);
  const known=item.rows.find(r=>typeof r[0]==="number" && typeof r[1]==="number" && r[0]>0);
  assert(known,"Missing known nonzero ratio "+item.id);
  const target=item.rows.find(r=>r.includes("?"));
  assert(target,"Missing target "+item.id);
  const rate=known[1]/known[0];
  const predicted=target[1]==="?"?target[0]*rate:target[1]/rate;
  const answer=Number(item.answer);
  assert(Number.isFinite(answer),"Non-numeric answer "+item.id);
  assert(Math.abs(predicted-answer)<1e-9,
    item.id+" wrong calculated answer "+answer+" (expected "+predicted+")");
  if(topic==="percent"){
   assert(Number.isInteger(item.percent)&&item.percent>=0&&item.percent<=100);
   assert.equal(item.rows[0][0],100);
   assert.equal(item.rows[1][0],item.percent);
  }
 }
}
console.log("PASS: 24 distinct ratio problems, 6/topic; correct numerical answers, models, explanations and Arabic draft prompts.");