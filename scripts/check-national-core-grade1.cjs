'use strict';
// Offline deterministic checks: structure, answer integrity, draft safety and static page.
// A passing test does NOT certify Arabic, religious accuracy or alignment with MOEHE.
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const root=path.resolve(__dirname,'..');
const read=p=>fs.readFileSync(path.join(root,p),'utf8');
const context={window:{}};
vm.runInNewContext(read('national-core-grade1-data.js'),context,{timeout:2000});
const data=context.window.LLA_NATIONAL_CORE_G1;
const check=(v,message)=>{if(!v)throw Error(message)};
check(data.grade===1 && data.stage==='DRAFT_REVIEW_REQUIRED','Review gate missing');
check(data.units.length===3,'Expected exactly 3 subjects');
const unique=new Set();
for(const u of data.units){
 check(u.questions.length===6,u.id+': expected 6 questions');
 for(const name of ['id','en','ar','objectiveEn','objectiveAr','reviewNote'])check(typeof u[name]==='string' && u[name].trim(),u.id+': missing '+name);
 check(u.learn.length===3,u.id+': expected 3 teaching cards');
 for(const q of u.questions){
  check(/^G1-(AR|IS|QA)-\d{3}$/.test(q.id),q.id+': invalid ID');check(!unique.has(q.id),'Duplicate question ID '+q.id);unique.add(q.id);
  for(const k of ['en','ar','emoji','tipEn','tipAr'])check(typeof q[k]==='string' && q[k].trim(),q.id+': missing '+k);
  check(q.choices.length===3,q.id+': expected 3 choices');check(Number.isInteger(q.answer)&&q.answer>=0&&q.answer<3,q.id+': invalid answer');
  for(const language of ['ar','en'])check(new Set(q.choices.map(c=>c[language])).size===3,q.id+': repeated '+language+' options');
  q.choices.forEach(c=>{check(c.en&&c.ar,q.id+': missing translated answer');});
 }
}
check(unique.size===18,'Expected 18 independent, reviewed-in-future questions');
const html=read('national-core-grade1-preview.html');
for(const phrase of ['NOT APPROVED FOR CHILD RELEASE','not endorsed','DRAFT','national-core-grade1-data.js','national-core-grade1-preview.js','aria-live','Content-Security-Policy','noindex,nofollow'])check(html.toLowerCase().includes(phrase.toLowerCase()),'Missing review/safety marker: '+phrase);
for(const name of ['national-core-grade1-data.js','national-core-grade1-preview.js']){
 const js=read(name);check(!/localStorage|sessionStorage|fetch\s*\(|navigator\.mediaDevices|speechSynthesis/.test(js),'Prohibited browser API in '+name);
}
check(!read('index.html').includes('national-core-grade1-preview.html'),'Unreviewed preview linked in public homepage');
console.log('PASS: Grade 1 national draft: 3 units, 9 teaching cards, 18 distinct practice questions; review gate and privacy checks. Not expert certification.');