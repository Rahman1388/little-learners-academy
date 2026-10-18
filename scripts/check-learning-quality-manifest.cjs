/* Quality-first lesson traceability gate.
 * A passing check verifies repository consistency, NOT educational endorsement,
 * objective attainment, classroom suitability, child voice quality or accessibility.
 */
"use strict";
const assert=require("node:assert/strict");
const fs=require("node:fs");
const vm=require("node:vm");

const manifest=JSON.parse(fs.readFileSync("learning-quality-manifest.json","utf8"));
const moduleCode=fs.readFileSync("grade2-four-skills-data.js","utf8");
const phonicsCode=fs.readFileSync("grade2-phonics-pathway.js","utf8");
const context={window:{}};
vm.runInNewContext(moduleCode,context,{timeout:2000,filename:"grade2-four-skills-data.js"});
const live=context.window.LLA_G2_FOUR_SKILLS;

function reviewValid(review,label){
 assert(review&&typeof review==="object",label+": review field is missing");
 assert(["pending","revise","approved"].includes(review.status),label+": invalid review status");
 const fields=["reviewerRole","reviewDate","evidenceLink"];
 if(review.status==="approved"){
  for(const field of fields)assert(typeof review[field]==="string"&&review[field].trim().length>2,label+": approval needs "+field);
 }else{
  for(const field of fields)assert(review[field]===null,label+": unreviewed content must not have approval evidence");
 }
 return review.status==="approved";
}
assert.equal(manifest.schemaVersion,1,"Unsupported manifest schema");
assert.equal(manifest.scope.grade,2);
assert.equal(manifest.scope.subject,"English");
assert.equal(manifest.scope.semester,1);
assert.equal(manifest.scope.pilot,true);
assert.equal(manifest.scope.officiallyApproved,false,"Do not imply school/Ministry approval from code tests");
assert.equal(manifest.reference.edition,"2026–2027");
assert(/not Ministry or specialist approval/.test(manifest.reference.referenceUse),"Provenance disclaimer required");
assert.equal(manifest.privacy.childVoiceRecording,false);
assert.equal(manifest.privacy.childNames,false);
assert.equal(manifest.privacy.storedIndependentWriting,false);
assert.equal(manifest.privacy.ads,false);
assert.equal(manifest.privacy.accounts,false);
assert.equal(manifest.phonicsPathway.page,"grade2-phonics-pathway.html");
for(const path of ["grade2-four-skills.html","grade2-four-skills-data.js","grade2-phonics-pathway.html","grade2-phonics-pathway.js"]){
 assert(fs.existsSync(path),"Missing app content: "+path);
}
assert(Array.isArray(live)&&live.length===5,"Unexpected Grade 2 five-module data");
assert.equal(manifest.modules.length,live.length,"Each module must be traced");
const skills=["listen","speak","read","write"];
const moduleIDs=new Set(),skillIDs=new Set();
let approvedSkills=0;
for(const [i,m] of manifest.modules.entries()){
 const actual=live[i];
 assert(!moduleIDs.has(m.id),"Repeated module ID: "+m.id);moduleIDs.add(m.id);
 assert.equal(m.id,actual.id,"Module sequence or ID drift");
 assert.equal(m.grade,2);
 assert.equal(m.subject,"English");
 assert.equal(m.title,actual.title,"Module title drift: "+m.id);
 assert.equal(m.week,actual.week,"Module scheduling drift: "+m.id);
 assert.equal(m.outcome,actual.outcome,"Module objective drift: "+m.id);
 assert.match(m.sourceReference,/2026–2027 Semester 1 Overview, PDF pages/);
 assert.equal(typeof m.sourcePages,"string");
 assert(m.sourcePages.length>0);
 assert.deepEqual(m.families,Array.from((actual.phonics||[]).map(x=>x.family)),"Word families drift: "+m.id);
 assert.deepEqual(m.patterns,Array.from((actual.patterns||[]).map(x=>x.pattern)),"Letter pattern coverage drift: "+m.id);
 reviewValid(m.review,m.id+" module");
 assert.equal(m.skills.length,4,"Exactly four skills must be traceable per module");
 for(const [j,s] of m.skills.entries()){
  const type=skills[j];
  assert.equal(s.type,type,m.id+": wrong skill ordering");
  assert.equal(s.id,"g2-"+m.id+"-"+type,"Unstable traceability ID");
  assert(!skillIDs.has(s.id),"Duplicated skill ID "+s.id);skillIDs.add(s.id);
  assert(actual[type],m.id+": corresponding app skill missing");
  assert(typeof s.practiceEvidence==="string"&&s.practiceEvidence.length>15);
  assert(typeof s.limitations==="string"&&s.limitations.length>20,"Honest skill limitation missing");
  if(reviewValid(s.review,s.id))approvedSkills++;
 }
}
assert.equal(skillIDs.size,20,"Exactly 20 guided practice flags should be traced");
assert.equal(manifest.scope.approvedSkillCount,approvedSkills,"Approved count must reflect actual evidence records");
assert.equal(approvedSkills,0,"First educational review baseline is pending; do not invent teacher sign-off");
const p=manifest.phonicsPathway;
reviewValid(p.review,"phonics pathway");
assert.deepEqual(p.stages,["see","hear","blend","read","spell","apply","review"]);
let lastStage=-1;
for(const stage of p.stages){
 const pos=phonicsCode.indexOf('{id:"'+stage+'"');
 assert(pos>lastStage,"Missing or reordered phonics stage: "+stage);lastStage=pos;
}
assert.equal(p.families.length,2);
for(const fam of p.families){
 assert(["ing","and"].includes(fam.id),"Unexpected phonics family");
 assert.equal(fam.pattern,"-"+fam.id);
 assert.equal(fam.words.length,2);
 for(const word of fam.words){
  assert(word.endsWith(fam.id),"Word is not in target word family: "+word);
  assert(phonicsCode.includes('word:"'+word+'"'),"App word drift: "+word);
 }
}
assert(phonicsCode.includes("SpeechSynthesisUtterance"),"Device pronunciation preview missing");
assert(!/getUserMedia|SpeechRecognition|MediaRecorder|sendBeacon|fetch\s*\(/.test(phonicsCode),"Do not collect child voice or upload word requests");
assert(moduleCode.includes("All exercise text is original."),"Original-content provenance missing");
assert(fs.readFileSync("grade2-four-skills.js","utf8").includes("lla-g2-four-skills-v1"),"Existing local progress key changed");
console.log("PASS: 5 Grade 2 modules, 20 unique four-skills objectives, 2 phonics families, 14 stages and pending human review status are traceable.");
console.log("NOTE: repository validation does not replace child observation, iPhone audio checks, Arabic specialist review or Ministry evaluation.");
