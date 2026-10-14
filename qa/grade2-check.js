/* Read-only, device-local structural and answer-key regression checks for 66 Grade 2 pilot items. */
(()=>{"use strict";
const $=id=>document.getElementById(id);
const math=window.LLA_GRADE2_PILOT,english=window.LLA_GRADE2_ENGLISH,science=window.LLA_GRADE2_SCIENCE;
const checks=[];
const expectedMath=["34","6","57","72","90","330","42","36","68","60","60","50","100 cm","Half past three","Quarter past four","35 cm","A ruler","1 kilogram","6","5","12","Books","2","One quarter"];
const expectedEnglish=["A seed in a pot","At the library","Blue","An umbrella","In a palm tree","Washes her hands","Rainy","He shapes the dough","Food","It belongs to the library","He feels thirsty","Help return it to its owner","slowly","bright","Very happy","tiny","Speak very softly","tomorrow","The bird is on the tree.","?","boxes","Yesterday","happy","and"];
const expectedScience=["Water","Light","A seed","It needs water to grow","Water","Broad feet","Small twigs","Water","Iron","Rubber band","Transparent glass","It becomes liquid water","Thermometer","Stay hydrated and seek shade","Rain may be coming","Away from a light source","One factor at a time","Record what happened"];
function assert(ok,message){if(!ok)throw Error(message);}
function check(name,description,fn){
 try{const detail=fn();checks.push({name,description,passed:true,detail:detail||""});}
 catch(error){checks.push({name,description,passed:false,detail:String(error&&error.message||error)});}
}
check("Both 24-question banks loaded","Confirm exact subject and domain counts.",()=>{
 assert(Array.isArray(math)&&math.length===24,"Expected 24 mathematics items.");
 assert(Array.isArray(english)&&english.length===24,"Expected 24 English items.");
 for(const [items,domains] of [[math,["place","arithmetic","measure","geometry"]],[english,["understand","think","words","write"]]]){
  for(const domain of domains)assert(items.filter(x=>x.domain===domain).length===6,"Expected 6 questions for "+domain);
  assert(items.every(x=>domains.includes(x.domain)),"Unknown learning domain");
 }
 return "48 items, 8 strands, 6 items in each strand";
});
check("Stable question IDs","Detect missing, duplicate or out-of-order IDs.",()=>{
 for(const [items,prefix] of [[math,"g2-"],[english,"g2e-"]]){
  assert(Array.isArray(items),"Bank unavailable");
  for(let i=0;i<items.length;i++)assert(items[i].id===prefix+String(i+1).padStart(2,"0"),"Unstable ID near "+prefix+(i+1));
 }
 return "No question IDs changed";
});
check("Answer option structure","Require three distinct answers and valid indexes.",()=>{
 for(const items of [math,english]){
  assert(Array.isArray(items),"Bank unavailable");
  for(const item of items){
   assert(Array.isArray(item.choices)&&item.choices.length===3,"Wrong option count: "+item.id);
   assert(item.choices.every(x=>typeof x==="string"&&x.trim()),"Empty option: "+item.id);
   assert(new Set(item.choices).size===3,"Repeated option: "+item.id);
   assert(Number.isInteger(item.answer)&&item.answer>=0&&item.answer<3,"Wrong answer index: "+item.id);
  }
 }
 return "48 valid three-choice questions";
});
check("Mathematics answer-key review","Compare each selected correct option with an independently specified expected answer.",()=>{
 assert(Array.isArray(math)&&math.length===expectedMath.length,"Mathematics bank incomplete");
 for(let i=0;i<math.length;i++){
  const chosen=math[i].choices[math[i].answer];
  assert(chosen===expectedMath[i],"Answer mismatch on "+math[i].id+" (expected "+expectedMath[i]+")");
 }
 return "24 predefined mathematics answer keys matched";
});
check("English answer-key review","Compare reading, vocabulary and writing answers with an explicitly reviewed key list.",()=>{
 assert(Array.isArray(english)&&english.length===expectedEnglish.length,"English bank incomplete");
 for(let i=0;i<english.length;i++){
  const chosen=english[i].choices[english[i].answer];
  assert(chosen===expectedEnglish[i],"Answer mismatch on "+english[i].id);
 }
 return "24 predefined English answer keys matched";
});
check("Grade 2 Science answer-key review","Check 18 science pilot items, five subject strands and their predefined answer keys.",()=>{
 assert(Array.isArray(science)&&science.length===18,"Expected 18 science items");
 const expectedTopics={Plants:4,Animals:4,Materials:4,Weather:4,"Scientific enquiry":2};
 for(const [topic,count] of Object.entries(expectedTopics))
  assert(science.filter(x=>x.topic===topic).length===count,"Science topic count: "+topic);
 assert(Object.keys(expectedTopics).length===new Set(science.map(x=>x.topic)).size,"Unknown science topic");
 for(let i=0;i<science.length;i++){
  const x=science[i];
  assert(x.id==="g2s-"+String(i+1).padStart(2,"0"),"Science ID changed: "+x.id);
  assert(Array.isArray(x.choices)&&x.choices.length===3&&new Set(x.choices).size===3,"Science choices: "+x.id);
  assert(Number.isInteger(x.answer)&&x.answer>=0&&x.answer<3,"Science index: "+x.id);
  assert(x.choices[x.answer]===expectedScience[i],"Science answer mismatch: "+x.id);
  for(const field of ["question","arabic","reason","icon"])
   assert(typeof x[field]==="string"&&x[field].trim(),"Science missing "+field+": "+x.id);
 }
 return "18 answer keys, stable IDs and bilingual fields checked";
});
check("Bilingual prompt integrity","Check all questions include Arabic instructions and usable English explanation fields.",()=>{
 for(const items of [math,english]){
  assert(Array.isArray(items),"Bank unavailable");
  for(const item of items){
   for(const name of ["question","arabic"]){
    assert(typeof item[name]==="string"&&item[name].trim(),"Missing "+name+": "+item.id);
   }
   const explanation=items===math?item.explanation:item.reason;
   assert(typeof explanation==="string"&&explanation.trim(),"Missing English explanation: "+item.id);
  }
 }
 return "48 Arabic prompts and English explanations present; natural translation quality still requires review";
});
check("Previously identified misleading cues","Confirm the 4:15 visual and vocabulary hint regressions remain fixed.",()=>{
 assert(Array.isArray(math)&&math.length===24&&Array.isArray(english)&&english.length===24,"Question data unavailable");
 assert(math[14].visual==="4:15","Incorrect clock graphic on g2-15");
 assert(english[14].arabic.includes("delighted")&&!english[14].arabic.includes("سعيدة جداً"),"Vocabulary revealed in g2e-15");
 assert(english[16].arabic.includes("whisper")&&!english[16].arabic.includes("يهمس"),"Vocabulary revealed in g2e-17");
 return "Three specific defects remain corrected";
});
const list=$("checkList");list.replaceChildren();
for(const c of checks){
 const li=document.createElement("li");li.className=c.passed?"pass":"fail";
 const heading=document.createElement("strong");heading.textContent=(c.passed?"✅ ":"❌ ")+c.name;
 const detail=document.createElement("small");detail.textContent=c.description+" "+c.detail;li.append(heading,detail);list.append(li);
}
const passCount=checks.filter(x=>x.passed).length;
$("summary").className="status "+(passCount===checks.length?"pass":"fail");
$("summary").textContent=passCount===checks.length
 ?"✅ "+passCount+" / "+checks.length+" checks passed • اجتازت الفحوص"
 :"⚠️ "+passCount+" / "+checks.length+" checks passed. Review the failures.";
})();