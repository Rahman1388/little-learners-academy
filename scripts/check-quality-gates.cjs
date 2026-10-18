/* Internal quality-registry integrity check only.
 * It does not audit education quality, privacy law compliance or official approval.
 */
"use strict";
const assert=require("node:assert/strict");
const fs=require("node:fs");
const gates=JSON.parse(fs.readFileSync("quality-gates.json","utf8"));
const lesson=JSON.parse(fs.readFileSync("learning-quality-manifest.json","utf8"));
assert.equal(gates.schemaVersion,1,"Unknown quality schema");
assert.equal(gates.project,"Little Learners Academy");
assert.equal(gates.approvedByMinistry,false,"Do not infer official approval from a project checklist");
assert.equal(gates.releasePolicy.current,"development-preview");
assert.equal(gates.releasePolicy.requiresHumanReview,true);
assert.equal(gates.releasePolicy.requiresRealIOSDeviceReview,true);
assert.equal(gates.releasePolicy.requiresSeparateOfficialApprovalForOfficialClaims,true);
const required=["qatar-curriculum","phonics-accuracy","arabic-quality","pedagogy-inclusion","accessibility-mobile","child-data-safety","teacher-parent-feedback","licensing-and-cultural-check"];
assert.equal(gates.domains.length,required.length,"All eight review areas must be represented");
const referenceIds=new Set();
for(const r of gates.references){
 assert(typeof r.id==="string"&&r.id.length>2&&!referenceIds.has(r.id),"Duplicate or absent reference ID");
 referenceIds.add(r.id);
 assert(/^https:\/\//.test(r.url),"Reference must use HTTPS: "+r.id);
 for(const key of ["category","authority","title","application"]){
  const minLength=key==="authority"?2:8; // Valid organizations include CAST and W3C.
  assert(typeof r[key]==="string"&&r[key].trim().length>=minLength,"Incomplete source metadata: "+r.id+" "+key);
 }
}
assert(referenceIds.has("qatar-foundation")&&referenceIds.has("qatar-curriculum"),"Qatar official guidance is required");
assert(referenceIds.has("qatar-privacy-law"),"Qatar child privacy must be considered");
assert(referenceIds.has("wcag22-w3c")&&referenceIds.has("udl-cast"),"Accessibility/inclusion guidance missing");
const seen=new Set();
for(const d of gates.domains){
 assert(required.includes(d.id)&&!seen.has(d.id),"Unexpected or duplicate review area: "+d.id);
 seen.add(d.id);
 assert(["pending","revise","accepted"].includes(d.status),"Invalid review status in "+d.id);
 assert(typeof d.reviewerRole==="string"&&d.reviewerRole.length>7,"Reviewer role missing "+d.id);
 assert(typeof d.requirement==="string"&&d.requirement.length>25,"Release-check question missing "+d.id);
 assert(Array.isArray(d.sourceIds)&&d.sourceIds.length>0&&d.sourceIds.every(id=>referenceIds.has(id)), "Unsupported source link "+d.id);
 if(d.status==="accepted"){
  assert(d.evidence&&typeof d.evidence==="object","Acceptance needs exact evidence for "+d.id);
  for(const key of ["reviewerRole","date","version","evidenceReference"])
   assert(typeof d.evidence[key]==="string"&&d.evidence[key].length>4, "Missing acceptance evidence "+d.id+" "+key);
 }else assert.equal(d.evidence,null,"Pending/revise status cannot contain acceptance evidence "+d.id);
}
const t=gates.technical;
assert.equal(lesson.scope.officiallyApproved,false);
assert.equal(lesson.scope.approvedSkillCount,0);
assert.equal(lesson.scope.grade,2);
assert.equal(lesson.scope.subject,"English");
assert.equal(lesson.modules.length,t.expectedModules);
assert.equal(lesson.modules.reduce((n,m)=>n+m.skills.length,0),t.expectedPracticeFlags);
assert.deepEqual(lesson.phonicsPathway.families.map(f=>f.pattern),t.phonicsFamilies);
assert.equal(lesson.phonicsPathway.stages.length,t.phonicsStages);
assert.equal(t.automatedTestsAreNotTeacherSignOff,true);
assert(fs.existsSync("DEVELOPMENT-QUALITY-STANDARD.md"),"Written review procedure missing");
console.log("PASS: sources, eight quality domains, status/evidence requirements and Grade 2 manifest are internally consistent.");
console.log("NOTE: this is NOT verification of Qatar curriculum approval, lesson pedagogy, phonics, Arabic, WCAG conformance or legal compliance.");
