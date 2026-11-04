"use strict";
/* A conservative crosswalk gate: guarantees provenance and honest status, NOT curriculum approval. */
const assert = require("node:assert/strict");
const fs = require("node:fs");
const register = JSON.parse(fs.readFileSync("review/curriculum-evidence-register.json","utf8"));
assert.equal(register.schemaVersion,1);
assert.equal(register.artifactStatus,"adult-review-only");
assert.equal(register.origin.notOnProduction,true);
assert.equal(register.sourceRules.officiallyCertified,false);
assert.equal(register.sourceRules.nationalGradeStandardsVerified,false);
assert.equal(register.sourceRules.qatarGradeEquivalenceNotAssumed,true);
assert.equal(register.sourceRules.specialistAgreementConfirmed,false);
assert.equal(register.sourceRules.childDataCollected,false);
assert.equal(register.sourceRules.aiChildChatEnabled,false);
assert.equal(register.items.length,6,"Six concept-web crosswalk records");
assert.equal(register.sources.length,10,"Ten independently discoverable evidence source references");
assert.equal(register.expertLeads.length,4,"Four potential contacts, not endorsers");
assert.equal(register.releaseGates.length,7,"Complete release-gate criteria");
const safeDomains=new Set(["edu.gov.qa","privateschoolssearch.edu.gov.qa","cambridgeinternational.org","www.cambridgeinternational.org","gov.uk","www.gov.uk","educationendowmentfoundation.org.uk","apiv3.educationendowmentfoundation.org.uk","unicef.org","www.unicef.org"]);
const references=new Map();
for(const s of register.sources){
 assert(!references.has(s.id),"Duplicate source ID");
 const u=new URL(s.url);
 assert.equal(u.protocol,"https:","Sources require HTTPS");
 const host=u.hostname.toLowerCase();
 assert(safeDomains.has(host),"Unverified external source host: "+host);
 assert(s.title.length>20&&s.scope.length>20,"Every reference needs scope and full provenance");
 references.set(s.id,s);
}
for(const id of ["qatar-framework","qatar-early","qatar-digital","cambridge-primary","england-english","england-maths","england-science","eef-feedback","eef-metacognition","unicef-ai"]){
 assert(references.has(id),"Missing required reference "+id);
}
const itemIds=new Set();
const bandCounts={"1-2":0,"3-4":0,"5-6":0};
for(const item of register.items){
 assert(!itemIds.has(item.id),"Duplicate map ID: "+item.id);
 itemIds.add(item.id);
 assert(Object.hasOwn(bandCounts,item.gradeBand),"Unsupported grade band");
 bandCounts[item.gradeBand]++;
 assert(item.objective.length>40 && item.nationalContext.length>60 && item.internationalTopic.length>30 && item.risk.length>40,"Traceability requires explanatory text");
 assert.equal(item.comparisonStatus,"thematic-overlap-only","Not certified lesson alignment");
 assert.equal(item.qatarGradeStandard,"not-yet-verified","No fabricated Qatar grade standard");
 assert.equal(item.nativeArabicReview,"pending","Arabic signoff may not be simulated");
 assert.equal(item.contentReview,"pending");
 assert.equal(item.realDeviceReview,"pending");
 assert.equal(item.englishPronunciationReview,"not-applicable-no-new-audio");
 assert.equal(item.ownerReleaseApproval,false);
 assert(item.location.includes("PR #28") && item.location.includes("staging"),"Only draft review, not main app");
 assert(item.internationalSourceIds.length>=1);
 for(const sourceId of item.internationalSourceIds)assert(references.has(sourceId),"Missing source reference: "+sourceId);
}
assert.deepEqual(bandCounts,{"1-2":2,"3-4":2,"5-6":2});
const leads=new Set();
for(const org of register.expertLeads){
 assert(!leads.has(org.id));leads.add(org.id);
 assert(org.email.includes("@") && org.specialism.length>25);
 assert(new URL(org.url).protocol==="https:");
 assert(new URL(org.contactUrl).protocol==="https:");
 assert(org.relationship.includes("only"),"Never imply agreement or endorsement");
}
const gates=new Set();
for(const g of register.releaseGates){
 assert(!gates.has(g.id));gates.add(g.id);
 assert.equal(g.status,"pending","No unverified approval can be represented");
 assert(g.reviewerRole.length>10);
}
for(const id of ["qatar-grade-objective","native-arabic","english-phonics","pedagogical-evaluation","accessibility-usability","privacy-security","owner-approval"])
 assert(gates.has(id),"Missing release criterion: "+id);
const html=fs.readFileSync("review/curriculum-review-desk.html","utf8");
for(const token of ["Adult review only","Qatar","Cambridge","International","English","Arabic","UNICEF","not a government","story","tens","fractions","ecosystem","test","evidence","expert"])
 assert(html.toLowerCase().includes(token.toLowerCase()),"Review desk missing: "+token);
assert(html.includes("https://www.edu.gov.qa/en/Content/EarlyLearning"));
assert(html.includes("https://www.unicef.org/innocenti/reports/policy-guidance-ai-children"));
assert(!/<script\b/i.test(html),"No scripts, tracking or reviewer data collection");
assert(!/<form\b/i.test(html),"No private data collection");
assert(!/fetch\s*\(|XMLHttpRequest|speechSynthesis|MediaRecorder|localStorage/i.test(html),"Review desk should remain static/private");
console.log("PASS: 6 review-only concept maps, 10 sourced comparison references, 4 uncontracted contacts, 7 unresolved release gates, and static privacy-safe review desk.");
