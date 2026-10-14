/* Device-only content integrity checks. No storage, analytics, or external requests. */
(()=>{"use strict";
const $=id=>document.getElementById(id);
const data=window.LLA_MINI_ACTIVITIES;
const checks=[];
function check(label,details,fn){
 try{const message=fn();checks.push({label,details,pass:true,message:message||""});}
 catch(e){checks.push({label,details,pass:false,message:String(e&&e.message||e)});}
}
function assert(condition,reason){if(!condition)throw Error(reason);}
check("Question bank loaded","Verify the expected total and subject distribution.",()=>{
 assert(Array.isArray(data),"Question bank could not load.");
 assert(data.length===151,"Expected 151 activities, found "+data.length);
 const expected={math:70,english:34,science:20,life:15,arts:12};
 const counts={};for(const a of data)counts[a.area]=(counts[a.area]||0)+1;
 for(const [name,num] of Object.entries(expected))assert(counts[name]===num,name+" count differs from "+num);
 assert(Object.keys(counts).length===Object.keys(expected).length,"Unknown subject category");
 return "151 activities across 5 subject areas";
});
check("Identifiers and question fields","Reject missing or repeated IDs, questions or bilingual text.",()=>{
 assert(Array.isArray(data),"Missing activity data");
 const ids=new Set();
 for(const a of data){
  assert(/^mini-\d{3}$/.test(a.id),"Invalid ID: "+String(a.id));
  assert(!ids.has(a.id),"Repeated ID: "+a.id);ids.add(a.id);
  for(const field of ["area","skill","title","ar","question","arQuestion","tip","icon"])
   assert(typeof a[field]==="string"&&a[field].trim(),"Empty "+field+": "+a.id);
 }
 return ids.size+" unique activities with required fields";
});
check("Multiple-choice integrity","Confirm 3 distinct options and an answer pointing to one of them.",()=>{
 assert(Array.isArray(data),"Missing activity data");
 for(const a of data){
  assert(Array.isArray(a.choices)&&a.choices.length===3,"Expected 3 options: "+a.id);
  assert(a.choices.every(x=>typeof x==="string"&&x.trim()),"Empty option: "+a.id);
  assert(new Set(a.choices).size===3,"Repeated options: "+a.id);
  assert(Number.isInteger(a.answer)&&a.answer>=0&&a.answer<3,"Invalid answer index: "+a.id);
 }
 return "All options and answer indices structurally valid";
});
check("Counting pictures and answers","Compare actual picture count to the labelled numeric answer.",()=>{
 assert(Array.isArray(data),"Missing activity data");
 const counting=data.filter(a=>a.skill==="Counting");assert(counting.length===20,"Expected 20 counting challenges");
 for(const a of counting){
  const count=Number(a.title.match(/\d+/)?.[0]);
  assert(Number.isInteger(count)&&count>0,"Unclear count title: "+a.id);
  assert(a.choices[a.answer]===String(count),"Wrong counting answer: "+a.id);
  assert(a.display&&a.display.trim().split(/\s+/u).length===count,"Incorrect picture count: "+a.id);
  assert(a.title==="Count "+count+(count===1?" object":" objects"),"English count grammar: "+a.id);
  assert(a.ar==="عُدَّ الصور","Arabic counting title changed: "+a.id);
 }
 return "20 pictures, numbers and corrected titles verified";
});
check("Arithmetic answer accuracy","Recalculate Grade 1 addition, subtraction and one-more questions.",()=>{
 assert(Array.isArray(data),"Missing activity data");
 const math=data.filter(a=>["Addition","Subtraction","Number order"].includes(a.skill));
 assert(math.length===40,"Expected 40 numeric arithmetic/ordering questions");
 for(const a of math){
  let result=null;
  if(a.skill==="Number order"){const m=a.question.match(/ONE more than (\d+)/);assert(m,"Unrecognized number-order question: "+a.id);result=Number(m[1])+1;}
  else{
   const m=a.question.match(/(\d+)\s*([+−])\s*(\d+)/);
   assert(m,"Unrecognized arithmetic format: "+a.id);
   result=m[2]==="+"?Number(m[1])+Number(m[3]):Number(m[1])-Number(m[3]);
  }
  assert(a.choices[a.answer]===String(result),"Incorrect arithmetic answer: "+a.id);
 }
 return "40 numeric answers recalculated";
});
check("Visual pattern answers","Check that each repeated-symbol sequence completes consistently.",()=>{
 assert(Array.isArray(data),"Missing activity data");
 const patterns=data.filter(a=>a.area==="arts");
 assert(patterns.length===12,"Expected 12 pattern questions");
 for(const a of patterns){
  const match=a.question.match(/What comes next\? (.+) __$/);
  assert(match,"Unrecognized visual sequence: "+a.id);
  const sequence=match[1].trim().split(/\s+/u);
  assert(sequence.length===4||sequence.length===5,"Unexpected visual sequence length: "+a.id);
  let expected;
  if(sequence.length===4){assert(sequence[0]===sequence[2]&&sequence[1]===sequence[3],"Sequence does not repeat: "+a.id);expected=sequence[0];}
  else{assert(sequence[0]===sequence[1]&&sequence[0]===sequence[3]&&sequence[0]===sequence[4],"Sequence does not repeat: "+a.id);expected=sequence[2];}
  assert(a.choices[a.answer]===expected,"Incorrect pattern answer: "+a.id);
 }
 return "12 visual repeating patterns verified";
});
const list=$("checks");list.replaceChildren();
for(const item of checks){
 const li=document.createElement("li");li.className=item.pass?"pass":"fail";
 const b=document.createElement("b");b.textContent=(item.pass?"✅ ":"❌ ")+item.label;
 const note=document.createElement("small");note.textContent=item.details+" "+item.message;li.append(b,note);list.append(li);
}
const passes=checks.filter(c=>c.pass).length;
$("summary").className="stat "+(passes===checks.length?"":"fail");
$("summary").textContent=passes===checks.length
 ?"✅ "+passes+" / "+checks.length+" structural checks passed • اجتازت الفحوص الهيكلية"
 :"⚠️ "+passes+" / "+checks.length+" checks passed. Review the failed checks below.";
})();