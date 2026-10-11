/* Grade 2 Readiness Pilot: one device, one honest completion record per item. */
(()=>{
"use strict";
const ITEMS=window.LLA_GRADE2_PILOT||[];
if(ITEMS.length!==24)throw Error("Grade 2 pilot content incomplete");
const KEY="lla-grade2-pilot-v1",$=s=>document.querySelector(s);
const DOMAINS=[
 {id:"place",emoji:"🔟",title:"Tens, Ones & Place Value",ar:"العشرات والآحاد",hint:"Draw groups of ten and single dots. Check what each digit means."},
 {id:"arithmetic",emoji:"➕",title:"Adding & Taking Away",ar:"الجمع والطرح",hint:"Split numbers into tens and ones or use a number line."},
 {id:"measure",emoji:"📏",title:"Length, Weight & Time",ar:"القياس والوقت",hint:"Pay attention to the unit. Use a ruler or a clock if you have one."},
 {id:"geometry",emoji:"🔷",title:"Shapes, Sharing & Data",ar:"الأشكال والبيانات",hint:"Look at the shapes or compare the quantities. Draw the situation if helpful."}
];
function load(){try{const v=JSON.parse(localStorage.getItem(KEY)||"{}");return v&&typeof v==="object"&&!Array.isArray(v)?v:{}}catch{return {}}}
const completed=load();let current=null,activeDomain=null,locked=false;
function completedCount(){return ITEMS.filter(x=>completed[x.id]===true).length}
function save(){try{localStorage.setItem(KEY,JSON.stringify(completed))}catch{/* Can practise without storage. */}}
function feedback(msg,type=""){
 const e=$("#g2Feedback");e.textContent=msg;e.className="feedback"+(type?" "+type:"");
}
function refresh(){
 const total=completedCount();
 $("#g2Progress").textContent="🌟 "+total+" / 24 challenges explored";
 $("#g2Bar").style.width=(total/24*100)+"%";
 $("#domainCards").replaceChildren();
 for(const domain of DOMAINS){
  const tasks=ITEMS.filter(x=>x.domain===domain.id);
  const done=tasks.filter(x=>completed[x.id]).length;
  const button=document.createElement("button");
  button.type="button";button.className="domain"+(done===6?" complete":"");
  button.dataset.domain=domain.id;
  const emoji=document.createElement("span");emoji.className="emoji";emoji.textContent=domain.emoji;
  const title=document.createElement("strong");title.textContent=domain.title;
  const small=document.createElement("small");small.textContent=(done===6?"🏅 Pathway explored • ":"🌱 ")+done+" / 6";
  const ar=document.createElement("small");ar.lang="ar";ar.dir="rtl";ar.textContent=domain.ar;
  button.append(emoji,title,small,ar);
  button.addEventListener("click",()=>openDomain(domain.id));
  $("#domainCards").append(button);
 }
}
function openDomain(id){
 const tasks=ITEMS.filter(x=>x.domain===id);
 if(tasks.length!==6)return;
 activeDomain=id;
 openItem(tasks.find(x=>!completed[x.id])||tasks[0]);
}
function openItem(item){
 current=item;locked=false;
 $("#selectPanel").hidden=true;$("#playPanel").hidden=false;
 const tasks=ITEMS.filter(x=>x.domain===item.domain);
 const domain=DOMAINS.find(d=>d.id===item.domain);
 $("#stepLabel").textContent=(domain?.emoji||"🌟")+" "+(tasks.indexOf(item)+1)+" of 6 • "+item.ref;
 $("#questionHeading").textContent=domain?.title||"Maths";
 $("#questionEn").textContent=item.question;
 $("#questionAr").textContent=item.arabic;
 $("#mathVisual").textContent=item.visual;
 $("#mathVisual").hidden=!item.visual;
 $("#g2Answers").replaceChildren();
 item.choices.forEach((answer,i)=>{
  const button=document.createElement("button");button.type="button";
  button.textContent=answer;button.dataset.choice=String(i);
  button.addEventListener("click",()=>choose(i));
  $("#g2Answers").append(button);
 });
 $("#hintBox").hidden=true;$("#learningHint").setAttribute("aria-expanded","false");
 $("#explanation").hidden=true;$("#g2Next").hidden=true;
 feedback("Choose an answer. You can try again if you miss it! • اختر الإجابة.");
 $("#playPanel").scrollIntoView({behavior:"auto",block:"start"});
}
function choose(i){
 if(!current||locked)return;
 const buttons=[...$("#g2Answers").children],button=buttons[i];
 if(!button||button.disabled)return;
 if(i!==current.answer){
  button.disabled=true;button.classList.add("wrong");
  feedback("🌱 Nice effort. Think again and choose another answer! • حاول مرة أخرى.","try");
  return;
 }
 locked=true;
 buttons.forEach((b,j)=>{b.disabled=true;if(j===i)b.classList.add("right")});
 completed[current.id]=true;save();refresh();
 feedback("🎉 Correct! Wonderful thinking. • أحسنت!","good");
 $("#explanation").textContent="💡 "+current.explanation;
 $("#explanation").hidden=false;$("#g2Next").hidden=false;
 const tasks=ITEMS.filter(x=>x.domain===current.domain);
 const next=tasks.find(x=>!completed[x.id]);
 $("#g2Next").textContent=next?"Next challenge ➜ • السؤال التالي":"🏅 Finish pathway • أكمل المسار";
}
$("#learningHint").addEventListener("click",()=>{
 if(!current)return;
 const box=$("#hintBox"),expanded=box.hidden;
 box.hidden=!expanded;
 if(expanded){
  const domain=DOMAINS.find(x=>x.id===current.domain);
  box.textContent="💡 "+domain.hint+" • حاول استخدام الورقة والقلم.";
 }
 $("#learningHint").setAttribute("aria-expanded",String(expanded));
});
$("#g2TryAgain").addEventListener("click",()=>{if(current)openItem(current)});
$("#g2Next").addEventListener("click",()=>{
 if(!locked||!current)return;
 const rest=ITEMS.filter(x=>x.domain===current.domain&&!completed[x.id]);
 if(rest.length)openItem(rest[0]);else showMap();
});
function showMap(){
 current=null;locked=false;activeDomain=null;
 $("#selectPanel").hidden=false;$("#playPanel").hidden=true;
 refresh();$("#selectPanel").scrollIntoView({behavior:"auto",block:"start"});
}
$("#backToMap").addEventListener("click",showMap);
refresh();
})();