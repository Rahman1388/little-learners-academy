(()=>{"use strict";
const items=window.LLA_GRADE5_MATH||[];
if(items.length!==24)throw Error("Grade 5 pilot requires exactly 24 questions");
const $=s=>document.querySelector(s),KEY="lla-grade5-math-v1";
const groups=[
{id:"place",icon:"🔢",title:"Place Value",ar:"القيمة المكانية"},
{id:"operations",icon:"➕",title:"Operations & Stories",ar:"العمليات والمسائل"},
{id:"fractions",icon:"🍕",title:"Fractions & Decimals",ar:"الكسور والعشريات"},
{id:"measure",icon:"📐",title:"Measure & Data",ar:"القياس والبيانات"}
];
function load(){try{const x=JSON.parse(localStorage.getItem(KEY)||"{}");return x&&typeof x==="object"&&!Array.isArray(x)?x:{}}catch{return {}}}
const progress=load();let active=null,solved=false;
function save(){try{localStorage.setItem(KEY,JSON.stringify(progress))}catch{}}
function finished(){return items.filter(x=>progress[x.id]===true).length}
function update(){
 const total=finished();
 $("#grade5Progress").textContent="🌟 "+total+" / 24 questions explored";
 $("#grade5Bar").style.width=String(total/24*100)+"%";
 $("#grade5Medals").textContent="🏅 "+groups.filter(g=>items.filter(x=>x.skill===g.id).every(x=>progress[x.id])).length+" / 4 topics completed";
 $("#grade5Domains").replaceChildren();
 groups.forEach(g=>{
  const groupItems=items.filter(x=>x.skill===g.id);
  const n=groupItems.filter(x=>progress[x.id]).length;
  const button=document.createElement("button");
  button.type="button";button.dataset.topic=g.id;button.className="domain"+(n===6?" complete":"");
  const title=document.createElement("strong");title.textContent=g.icon+" "+g.title;
  const ar=document.createElement("span");ar.lang="ar";ar.dir="rtl";ar.textContent=g.ar;
  const stat=document.createElement("small");stat.textContent=n+" / 6 "+(n===6?"✅ Completed":"questions explored");
  button.append(title,ar,stat);
  button.addEventListener("click",()=>open((groupItems.find(x=>!progress[x.id])||groupItems[0]).id));
  $("#grade5Domains").append(button);
 });
}
function open(id){
 const q=items.find(x=>x.id===id);if(!q)return;
 active=q;solved=false;
 $("#grade5Play").hidden=false;
 $("#topicName").textContent=groups.find(g=>g.id===q.skill).title;
 $("#challengeTitle").textContent="Question "+(items.indexOf(q)+1)+" of 24";
 $("#questionText").textContent=q.prompt;
 $("#questionArabic").textContent=q.ar;
 $("#questionVisual").textContent=q.visual;
 $("#questionVisual").hidden=!q.visual;
 $("#grade5Answers").replaceChildren();
 q.choices.forEach((value,i)=>{
  const b=document.createElement("button");b.type="button";b.dataset.answer=String(i);b.textContent=value;
  b.addEventListener("click",()=>answer(value,b));
  $("#grade5Answers").append(b);
 });
 $("#grade5Help").hidden=true;
 $("#grade5Explanation").hidden=true;
 $("#grade5Next").hidden=true;
 const msg=$("#grade5Feedback");msg.className="feedback";msg.textContent="Choose an answer. • اختر الإجابة.";
 $("#grade5Play").scrollIntoView({block:"start",behavior:"auto"});
}
function answer(choice,button){
 if(!active||solved||button.disabled)return;
 const fb=$("#grade5Feedback");
 if(choice!==active.answer){
  button.disabled=true;button.classList.add("wrong");
  fb.className="feedback";fb.textContent="🌱 Nice try! Check the hint or choose another answer. • حاول مرة أخرى.";
  return;
 }
 solved=true;progress[active.id]=true;save();
 [...$("#grade5Answers").children].forEach(b=>{b.disabled=true;if(b===button)b.classList.add("correct")});
 fb.className="feedback good";fb.textContent="🎉 Well done! • أحسنت!";
 $("#grade5Explanation").textContent="✅ "+active.explanation;
 $("#grade5Explanation").hidden=false;
 $("#grade5Next").hidden=false;
 update();
}
$("#grade5Hint").addEventListener("click",()=>{if(!active)return;$("#grade5Help").textContent="💡 "+active.hint;$("#grade5Help").hidden=false});
$("#grade5Next").addEventListener("click",()=>{
 if(!solved||!active)return;
 const category=items.filter(x=>x.skill===active.skill);
 const i=category.findIndex(x=>x.id===active.id);
 const rest=[...category.slice(i+1),...category.slice(0,i+1)];
 const next=rest.find(x=>!progress[x.id]);
 if(next)open(next.id);
 else{$("#grade5Play").hidden=true;$("#grade5Domains").scrollIntoView({block:"start",behavior:"auto"})}
});
$("#grade5Back").addEventListener("click",()=>{$("#grade5Play").hidden=true;$("#grade5Domains").scrollIntoView({block:"start",behavior:"auto"})});
update();
})();