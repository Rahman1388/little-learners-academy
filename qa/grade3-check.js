/* On-device read-only integrity and answer-key regression checks for 54 Grade 3 pilot questions. */
(()=>{"use strict";
const $=id=>document.getElementById(id);
const math=window.LLA_GRADE3_PREVIEW||[];
const english=window.LLA_GRADE3_ENGLISH?.all||[];
const science=window.LLA_GRADE3_SCIENCE?.all||[];
const expectedEnglish=["A green shoot","The library","It might rain","Flowers","Told a teacher","Calmly","Small","Happy","Not wide","Transparent","Quickly","Wanting to learn","Sleeps","Yesterday","It was hot","And","Loudly","A question mark (?)"];
const expectedScience=["The amount of light","Roots","Light","Water and light","Compare with a similar watered seedling","Helping reproduction","How the car moves","Friction","A pull","The clip is attracted","They repel","Test each object and record the result","How long each takes to melt","Use the same amount of water for each material","A rain gauge","Shadow length and direction","Whether each is transparent","To compare evidence"];
const expectedFractions=["1/2","1/4","2/4","3/4","1/3","2/3"];
const checks=[];
const assert=(c,msg)=>{if(!c)throw Error(msg)};
function check(name,desc,verify){
 try{checks.push({name,desc,ok:true,detail:verify()||""})}
 catch(err){checks.push({name,desc,ok:false,detail:String(err&&err.message||err)})}
}
check("Three complete subject banks","Verify 18 activities in each subject, with 6 in each learning strand.",()=>{
 assert(math.length===18&&english.length===18&&science.length===18,"Expected 18 questions in each pilot");
 for(const [set,groups,key] of [
  [math,["groups","sharing","fractions"],"domain"],
  [english,["comprehension","vocabulary","sentences"],"domain"],
  [science,["plants","forces","investigation"],"domain"]
 ]){
  for(const group of groups)assert(set.filter(q=>q[key]===group).length===6,"Wrong strand count: "+group);
  assert(set.every(q=>groups.includes(q[key])),"Unknown learning strand");
 }
 return "54 pilot questions across 9 topic strands";
});
check("Stable learner progress IDs","Verify the original sequence and distinct IDs for all three subjects.",()=>{
 const allIds=new Set();
 for(const [set,prefix] of [[math,"g3-"],[english,"g3e-"],[science,"g3s-"]]){
  for(let i=0;i<set.length;i++){
   assert(set[i].id===prefix+String(i+1).padStart(2,"0"),"Changed ID on "+prefix+(i+1));
   assert(!allIds.has(set[i].id),"Repeated ID "+set[i].id);allIds.add(set[i].id);
  }
 }
 return "All 54 progress identifiers are unique and stable";
});
check("Options and explanatory text","Detect missing text, wrong answer indexes or duplicated options.",()=>{
 for(const x of math){
  for(const key of ["question","arabic","visual","hint","explanation","answer"])assert(typeof x[key]==="string"&&x[key].trim(),"Missing "+key+": "+x.id);
  assert(Array.isArray(x.choices)&&x.choices.length===3&&new Set(x.choices).size===3,"Invalid options: "+x.id);
  assert(x.choices.includes(x.answer),"Missing correct choice: "+x.id);
 }
 for(const x of [...english,...science]){
  for(const key of ["passage","question","explanation"])assert(typeof x[key]==="string"&&x[key].trim(),"Missing "+key+": "+x.id);
  assert(Array.isArray(x.choices)&&x.choices.length===3&&new Set(x.choices).size===3,"Invalid options: "+x.id);
  assert(Number.isInteger(x.answer)&&x.answer>=0&&x.answer<3,"Invalid answer index: "+x.id);
 }
 return "All 54 items have usable choices and explanatory text; language quality still requires human review";
});
check("Multiplication answer and picture model","Independently recalculate every group problem and count its stars.",()=>{
 const data=math.filter(x=>x.domain==="groups");assert(data.length===6,"Six group tasks required");
 for(const x of data){
  const match=x.question.match(/There are (\d+) groups of (\d+) stars/);
  assert(match,"Question cannot be parsed: "+x.id);
  const groups=Number(match[1]),perGroup=Number(match[2]),stars=(x.visual.match(/⭐/gu)||[]).length;
  const sections=x.visual.split("|");
  assert(groups*perGroup===Number(x.answer),"Wrong product: "+x.id);
  assert(stars===groups*perGroup&&sections.length===groups,"Star model does not match question: "+x.id);
  assert(sections.every(section=>(section.match(/⭐/gu)||[]).length===perGroup),"Unequal visual group: "+x.id);
 }
 return "6 multiplication answers and visual groups verified";
});
check("Equal-sharing arithmetic and apple count","Check divisible totals and count every picture apple.",()=>{
 const data=math.filter(x=>x.domain==="sharing");assert(data.length===6,"Six sharing tasks required");
 for(const x of data){
  const match=x.question.match(/Share (\d+) apples equally among (\d+) children/);
  assert(match,"Question cannot be parsed: "+x.id);
  const apples=Number(match[1]),children=Number(match[2]),images=(x.visual.match(/🍎/gu)||[]).length;
  assert(children>0&&apples%children===0,"Sharing must divide equally: "+x.id);
  assert(x.answer===String(apples/children),"Incorrect division answer: "+x.id);
  assert(images===apples,"Apple picture count does not match: "+x.id);
 }
 return "6 equal-sharing divisions and apple visuals verified";
});
check("Fraction key and equal-part model","Compare fraction choices with filled/empty square counts.",()=>{
 const data=math.filter(x=>x.domain==="fractions");assert(data.length===6,"Six fraction questions required");
 for(let i=0;i<data.length;i++){
  const x=data[i],parts=(x.visual.match(/[◼◻]/gu)||[]).length,selected=(x.visual.match(/◼/gu)||[]).length;
  assert(x.answer===expectedFractions[i],"Wrong fraction answer: "+x.id);
  assert(x.answer===selected+"/"+parts,"Fraction illustration does not match answer: "+x.id);
 }
 return "6 fraction key/visual pairs verified; human review should assess clarity of pictures";
});
check("English reading and vocabulary keys","Compare 18 answers against a manually specified expected answer list.",()=>{
 assert(english.length===expectedEnglish.length,"Wrong number of English questions");
 for(let i=0;i<english.length;i++)assert(english[i].choices[english[i].answer]===expectedEnglish[i],"English answer mismatch: "+english[i].id);
 return "18 expected English responses matched";
});
check("Science reasoning answer keys","Compare 18 science questions against specified concept answers.",()=>{
 assert(science.length===expectedScience.length,"Wrong number of Science questions");
 for(let i=0;i<science.length;i++)assert(science[i].choices[science[i].answer]===expectedScience[i],"Science answer mismatch: "+science[i].id);
 return "18 expected science responses matched";
});
const list=$("checkList");list.replaceChildren();
for(const c of checks){
 const li=document.createElement("li");li.className=c.ok?"pass":"fail";
 const b=document.createElement("strong");b.textContent=(c.ok?"✅ ":"❌ ")+c.name;
 const small=document.createElement("small");small.textContent=c.desc+" "+c.detail;
 li.append(b,small);list.append(li);
}
const passed=checks.filter(x=>x.ok).length;
$("summary").className="status "+(passed===checks.length?"pass":"fail");
$("summary").textContent=passed===checks.length
 ?"✅ "+passed+" / "+checks.length+" checks passed • اجتازت الفحوص"
 :"⚠️ "+passed+" / "+checks.length+" checks passed; please review failures.";
})();