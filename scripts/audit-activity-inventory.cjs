/* Maintain an honest Grade 1-6 count of DISTINCT source questions.
 * Mixed quests reuse these questions and must not add to the published count.
 * Separate guided writing prompts are counted in their own category.
 * Runs in GitHub Actions without network requests or child progress data.
 */
"use strict";
const fs=require("node:fs"),vm=require("node:vm"),assert=require("node:assert/strict");
const specs=[
 {grade:1,subject:"Cross-curricular micro-challenges",file:"activity-data.js",global:"LLA_MINI_ACTIVITIES",expected:151},
 {grade:2,subject:"Mathematics",file:"grade2-pilot-data.js",global:"LLA_GRADE2_PILOT",expected:24},
 {grade:2,subject:"English reading",file:"grade2-english-data.js",global:"LLA_GRADE2_ENGLISH",expected:24},
 {grade:2,subject:"Science",file:"grade2-science-data.js",global:"LLA_GRADE2_SCIENCE",expected:18},
 {grade:3,subject:"Mathematics",file:"grade3-preview-data.js",global:"LLA_GRADE3_PREVIEW",expected:18},
 {grade:3,subject:"English reading",file:"grade3-english-data.js",global:"LLA_GRADE3_ENGLISH",select:"all",expected:18},
 {grade:3,subject:"Science",file:"grade3-science-data.js",global:"LLA_GRADE3_SCIENCE",select:"all",expected:18},
 {grade:4,subject:"Mathematics",file:"grade4-math-data.js",global:"LLA_GRADE4_MATH",expected:24},
 {grade:4,subject:"English reading",file:"grade4-reading-data.js",global:"LLA_GRADE4_READING",select:"questions",expected:18},
 {grade:4,subject:"Science",file:"grade4-science-data.js",global:"LLA_GRADE4_SCIENCE",select:"questions",expected:18},
 {grade:5,subject:"Mathematics",file:"grade5-math-data.js",global:"LLA_GRADE5_MATH",expected:24},
 {grade:5,subject:"English reading",file:"grade5-reading-data.js",global:"LLA_GRADE5_READING",select:"questions",expected:18},
 {grade:5,subject:"Science",file:"grade5-science-data.js",global:"LLA_GRADE5_SCIENCE",select:"questions",expected:18},
 {grade:6,subject:"Mathematics",file:"grade6-math-data.js",global:"LLA_GRADE6_MATH",expected:24},
 {grade:6,subject:"English reading",file:"grade6-reading-data.js",global:"LLA_GRADE6_READING",select:"questions",expected:18},
 {grade:6,subject:"Science",file:"grade6-science-data.js",global:"LLA_GRADE6_SCIENCE",select:"questions",expected:18}
];
const seen=new Set(),byGrade=new Map(),rows=[];
function read(spec){
 const window={};
 const code=fs.readFileSync(spec.file,"utf8");
 vm.runInNewContext(code,{window,console},{filename:spec.file,timeout:2000});
 const exported=window[spec.global];
 assert.ok(exported,"Missing expected global: "+spec.global);
 const questions=spec.select?exported[spec.select]:exported;
 assert.ok(Array.isArray(questions),"Expected question list: "+spec.file);
 assert.equal(questions.length,spec.expected,"Unexpected item count for "+spec.file);
 for(const q of questions){
  assert.ok(q&&typeof q.id==="string"&&q.id.length>2,"Missing question ID in "+spec.file);
  assert.ok(!seen.has(q.id),"A question is counted twice: "+q.id);
  seen.add(q.id);
  assert.ok(Array.isArray(q.choices)&&q.choices.length===3,"Invalid answer options: "+q.id);
  assert.equal(new Set(q.choices.map(String)).size,3,"Repeated distractors: "+q.id);
  const answer=q.answer;
  assert.ok((Number.isInteger(answer)&&answer>=0&&answer<3)||
   (typeof answer==="string"&&q.choices.some(x=>String(x)===answer)),
   "Missing correct answer: "+q.id);
 }
 return questions;
}
for(const spec of specs){
 const records=read(spec);
 byGrade.set(spec.grade,(byGrade.get(spec.grade)||0)+records.length);
 rows.push({grade:spec.grade,subject:spec.subject,count:records.length});
}
const expected=[151,66,54,60,60,60];
for(let grade=1;grade<=6;grade++)assert.equal(byGrade.get(grade),expected[grade-1],"Grade "+grade+" count changed");
assert.equal(seen.size,451,"Distinct question total changed");
const writing=readWriting();
function readWriting(){
 const window={};
 const file="grade6-writing-data.js";
 vm.runInNewContext(fs.readFileSync(file,"utf8"),{window,console},{filename:file,timeout:2000});
 const prompts=window.LLA_GRADE6_WRITING;
 assert.ok(Array.isArray(prompts)&&prompts.length===6,"Expected 6 guided writing prompts");
 for(const q of prompts){
  assert.ok(q.id&&!seen.has(q.id),"Writing prompt ID overlaps another question: "+q.id);
  assert.ok(typeof q.task==="string"&&q.task.length>25,"Writing prompt missing task: "+q.id);
 }
 assert.equal(new Set(prompts.map(q=>q.id)).size,prompts.length,"Repeated writing prompt");
 return prompts;
}
const benchmark=fs.readFileSync("international-benchmark.html","utf8");
for(let grade=1;grade<=6;grade++){
 const count=byGrade.get(grade);
 const pattern=new RegExp('<td data-audit-grade="'+grade+'">'+count+'</td>');
 assert.match(benchmark,pattern,"Published benchmark count is out of sync for Grade "+grade);
}
assert.ok(benchmark.includes('<strong data-audit-total="451">451 distinct short questions</strong>'),"Benchmark total is out of sync");
assert.ok(benchmark.includes('<strong data-audit-writing="6">6 guided writing prompts</strong>'),"Writing prompt total is out of sync");
console.log("Verified unique practice question inventory across Grades 1-6:");
for(let grade=1;grade<=6;grade++)console.log(" Grade "+grade+": "+byGrade.get(grade)+" distinct questions");
console.log("Total: "+seen.size+" distinct multiple-choice questions; separate Grade 6 writing prompts: "+writing.length);
console.log("Reused mixed-review quests, games and illustrations are not counted as unique question IDs.");
