"use strict";
const assert=require("node:assert/strict"),fs=require("node:fs"),vm=require("node:vm"),path=require("node:path");
const sandbox={window:{}};vm.runInNewContext(fs.readFileSync("school-pathways-data.js","utf8"),sandbox,{timeout:1500});
const data=sandbox.window.LLA_SCHOOL_PATHWAYS;
assert(data&&data.grade&&data.sources,"School-pathways guide data missing");
let total=0,linked=0,missing=0;
for(let grade=1;grade<=6;grade++)for(const subject of ["math","english","science"]){
 const topics=data.grade[grade]?.[subject];
 assert(Array.isArray(topics)&&topics.length===4,"Expected four topics: "+grade+" "+subject);
 const ids=new Set();
 for(const item of topics){
  assert(typeof item.id==="string"&&/^[a-z]+$/.test(item.id));
  assert(!ids.has(item.id),"Duplicate topic ID "+item.id);
  ids.add(item.id);
  for(const k of ["title","ar","goal"])assert(typeof item[k]==="string"&&item[k].trim().length>7,"Missing "+k+": "+grade+" "+subject);
  if(item.href){
   assert(/^\.\//.test(item.href)&&!item.href.includes(".."),"Unsafe activity link "+item.href);
   const file=item.href.split("?")[0].replace(/^\.\//,"");
   assert(fs.existsSync(path.join(".",file)),"Broken link: "+grade+" "+subject+" "+file);
   assert(item.scope==="limited","Linked topics must not claim full coverage");
   linked++;
  }else{
   assert(item.href===null&&item.scope==="gap","Missing topics must be explicitly labelled as gaps");
   missing++;
  }
  total++;
 }
}
assert.equal(total,72);
assert.equal(data.grade[6].english.filter(x=>x.href).length,0,"Grade 6 English has no pilot");
assert.equal(data.grade[6].science.filter(x=>x.href).length,0,"Grade 6 science has no pilot");
assert.equal(data.grade[6].math.filter(x=>x.href).length,4);
for(const key of ["qatar","british","american"]){
 assert(Array.isArray(data.sources[key])&&data.sources[key].length>0,"Missing "+key+" sources");
 for(const s of data.sources[key]){
  const u=new URL(s.url);
  assert(u.protocol==="https:"&&["www.edu.gov.qa","www.gov.uk","www.thecorestandards.org"].includes(u.hostname),"Unreviewed source "+u.href);
 }
}
console.log("PASS: "+total+" school-topic bridges, "+linked+" limited links, "+missing+" development gaps; source files and standards URLs verified.");
console.log("NOTE: Thematic overlap is not official curriculum accreditation.");
