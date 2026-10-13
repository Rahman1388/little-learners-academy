(()=>{"use strict";
const items=window.LLA_GRADE6_MATH||[];
if(items.length!==24)throw Error("Grade 6 pilot requires exactly 24 questions");
const $=s=>document.querySelector(s),KEY="lla-grade6-math-v1";
const groups=[
{id:"ratios",icon:"⚖️",title:"Ratios & Rates",ar:"النسب والمعدلات"},
{id:"algebra",icon:"🧮",title:"Early Algebra",ar:"الجبر المبسط"},
{id:"fractions",icon:"🍕",title:"Fractions & Decimals",ar:"الكسور والعشريات"},
{id:"measure",icon:"📐",title:"Measure & Data",ar:"القياس والبيانات"}
];
function load(){try{const x=JSON.parse(localStorage.getItem(KEY)||"{}");return x&&typeof x==="object"&&!Array.isArray(x)?x:{}}catch{return {}}}
const progress=load();let active=null,solved=false;
function save(){try{localStorage.setItem(KEY,JSON.stringify(progress))}catch{}}
function finished(){return items.filter(x=>progress[x.id]===true).length}
function update(){
 const total=finished();
 $("#grade6Progress").textContent="🌟 "+total+" / 24 questions explored";
 $("#grade6Bar").style.width=String(total/24*100)+"%";
 $("#grade6Medals").textContent="🏅 "+groups.filter(g=>items.filter(x=>x.skill===g.id).every(x=>progress[x.id])).length+" / 4 topics completed";
 $("#grade6Domains").replaceChildren();
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
  $("#grade6Domains").append(button);
 });
}
function open(id){
 const q=items.find(x=>x.id===id);if(!q)return;
 active=q;solved=false;
 $("#grade6Play").hidden=false;
 $("#topicName").textContent=groups.find(g=>g.id===q.skill).title;
 $("#challengeTitle").textContent="Question "+(items.indexOf(q)+1)+" of 24";
 $("#questionText").textContent=q.prompt;
 $("#questionArabic").textContent=q.ar;
 $("#questionVisual").textContent=q.visual;
 $("#questionVisual").hidden=!q.visual;
 $("#grade6Answers").replaceChildren();
 q.choices.forEach((value,i)=>{
  const b=document.createElement("button");b.type="button";b.dataset.answer=String(i);b.textContent=value;
  b.addEventListener("click",()=>answer(value,b));
  $("#grade6Answers").append(b);
 });
 $("#grade6Help").hidden=true;
 $("#grade6Explanation").hidden=true;
 $("#grade6Next").hidden=true;
 const msg=$("#grade6Feedback");msg.className="feedback";msg.textContent="Choose an answer. • اختر الإجابة.";
 $("#grade6Play").scrollIntoView({block:"start",behavior:"auto"});
}
function answer(choice,button){
 if(!active||solved||button.disabled)return;
 const fb=$("#grade6Feedback");
 if(choice!==active.answer){
  button.disabled=true;button.classList.add("wrong");
  fb.className="feedback";fb.textContent="🌱 Nice try! Check the hint or choose another answer. • حاول مرة أخرى.";
  return;
 }
 solved=true;progress[active.id]=true;save();
 [...$("#grade6Answers").children].forEach(b=>{b.disabled=true;if(b===button)b.classList.add("correct")});
 fb.className="feedback good";fb.textContent="🎉 Well done! • أحسنت!";
 $("#grade6Explanation").textContent="✅ "+active.explanation;
 $("#grade6Explanation").hidden=false;
 $("#grade6Next").hidden=false;
 update();
}
$("#grade6Hint").addEventListener("click",()=>{if(!active)return;$("#grade6Help").textContent="💡 "+active.hint;$("#grade6Help").hidden=false});
$("#grade6Next").addEventListener("click",()=>{
 if(!solved||!active)return;
 const category=items.filter(x=>x.skill===active.skill);
 const i=category.findIndex(x=>x.id===active.id);
 const rest=[...category.slice(i+1),...category.slice(0,i+1)];
 const next=rest.find(x=>!progress[x.id]);
 if(next)open(next.id);
 else{$("#grade6Play").hidden=true;$("#grade6Domains").scrollIntoView({block:"start",behavior:"auto"})}
});
$("#grade6Back").addEventListener("click",()=>{$("#grade6Play").hidden=true;$("#grade6Domains").scrollIntoView({block:"start",behavior:"auto"})});
update();
})();