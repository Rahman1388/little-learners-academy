(()=>{"use strict";
const ITEMS=window.LLA_GRADE4_PILOT||[];
if(ITEMS.length!==18)throw Error("Grade 3 preview content incomplete");
const $=s=>document.querySelector(s),KEY="lla-grade4-pilot-v1";
const DOMAINS=[
{id:"problems",icon:"🧮",name:"Multi-step Maths",ar:"مسائل متعددة الخطوات",hint:"Solve the first step before the second."},
{id:"fractions",icon:"🍕",name:"Fractions",ar:"الكسور",hint:"Compare equal parts of a whole."},
{id:"data",icon:"📊",name:"Reading Data",ar:"قراءة البيانات",hint:"Read the numbers before deciding."}
];
function read(){try{const d=JSON.parse(localStorage.getItem(KEY)||"{}");return d&&typeof d==="object"&&!Array.isArray(d)?d:{}}catch{return {}}}
const done=read();let current=null,locked=false;
function save(){try{localStorage.setItem(KEY,JSON.stringify(done))}catch{}}
function count(){return ITEMS.filter(x=>done[x.id]===true).length}
function feedback(s,kind=""){const x=$("#g4Feedback");x.textContent=s;x.className="feedback"+(kind?" "+kind:"")}
function update(){
 const n=count();
 $("#g4Progress").textContent="🌟 "+n+" / 18 questions explored";
 $("#g4Bar").style.width=(n/18*100)+"%";
 $("#domainCards").replaceChildren();
 DOMAINS.forEach(d=>{
  const children=ITEMS.filter(x=>x.domain===d.id);
  const n=children.filter(x=>done[x.id]).length;
  const b=document.createElement("button");b.type="button";b.className="domain"+(n===6?" done":"");b.dataset.domain=d.id;
  const emoji=document.createElement("span");emoji.className="emoji";emoji.textContent=d.icon;
  const label=document.createElement("strong");label.textContent=d.name;
  const ar=document.createElement("span");ar.lang="ar";ar.dir="rtl";ar.textContent=d.ar;
  const status=document.createElement("small");status.textContent=(n===6?"✅ Finished • ":"🌱 ")+n+" / 6";
  b.append(emoji,label,ar,status);b.addEventListener("click",()=>openDomain(d.id));
  $("#domainCards").append(b);
 });
}
function openDomain(id){
 const tasks=ITEMS.filter(x=>x.domain===id);
 if(tasks.length!==6)return;
 open(tasks.find(x=>!done[x.id])||tasks[0]);
}
function open(a){
 current=a;locked=false;
 $("#selectPanel").hidden=true;$("#playPanel").hidden=false;
 const d=DOMAINS.find(x=>x.id===a.domain),tasks=ITEMS.filter(x=>x.domain===a.domain);
 $("#stepLabel").textContent="⭐ "+(tasks.indexOf(a)+1)+" / 6";
 $("#questionHeading").textContent=(d?.icon||"🌟")+" "+(d?.name||"Maths");
 $("#questionEn").textContent=a.question;
 $("#questionAr").textContent=a.arabic;
 $("#mathVisual").textContent=a.visual||"";
 $("#mathVisual").hidden=!a.visual;
 $("#g4Answers").replaceChildren();
 a.choices.forEach((text,i)=>{
  const b=document.createElement("button");b.type="button";b.textContent=text;b.dataset.choice=String(i);b.addEventListener("click",()=>answer(i));$("#g4Answers").append(b);
 });
 $("#hintBox").hidden=true;$("#hintBox").textContent=a.hint;
 $("#learningHint").setAttribute("aria-expanded","false");
 $("#explanation").hidden=true;$("#g4Next").hidden=true;
 feedback("Choose the best answer. Take your time! • اختر الإجابة الصحيحة.");
 $("#playPanel").scrollIntoView({behavior:"auto",block:"start"});
}
function answer(i){
 if(!current||locked)return;
 const b=$("#g4Answers").children[i],correct=current.choices[i]===current.answer;
 if(!correct){
  b.classList.add("wrong");b.disabled=true;
  feedback("🌱 Try again! Use the picture or tap Help me think. • حاول مجدداً.","try");return;
 }
 locked=true;b.classList.add("right");[...$("#g4Answers").children].forEach(x=>x.disabled=true);
 if(!done[current.id]){done[current.id]=true;save()}
 $("#explanation").textContent="✅ "+current.explanation;$("#explanation").hidden=false;
 feedback("🎉 Correct! Well done. • أحسنت! إجابة صحيحة.","good");
 $("#g4Next").hidden=false;update();
}
$("#backToWorlds").addEventListener("click",()=>{$("#selectPanel").hidden=false;$("#playPanel").hidden=true;update();$("#selectPanel").scrollIntoView({behavior:"auto"})});
$("#learningHint").addEventListener("click",()=>{
 const open=!$("#hintBox").hidden;$("#hintBox").hidden=open;
 $("#learningHint").setAttribute("aria-expanded",String(!open));
});
$("#g4Next").addEventListener("click",()=>{
 if(!current||!locked)return;
 const tasks=ITEMS.filter(x=>x.domain===current.domain);
 const start=tasks.indexOf(current),remaining=[...tasks.slice(start+1),...tasks.slice(0,start+1)];
 const next=remaining.find(x=>!done[x.id]);
 if(next)open(next);
 else{$("#selectPanel").hidden=false;$("#playPanel").hidden=true;update()}
});
update();
})();