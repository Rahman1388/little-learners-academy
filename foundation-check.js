(()=>{
"use strict";
const full=window.LLA_MINI_ACTIVITIES||[];
const plan=[
 ["math",[4,34,64]],["english",[71,82,99]],["science",[105,113,119]],["life",[125,130,137]],["arts",[140,144,150]]
];
const selected=plan.flatMap(([area,indices])=>indices.map(n=>{
 const q=full.find(a=>a.id==="mini-"+String(n).padStart(3,"0"));
 if(!q||q.area!==area)throw Error("Unmatched Foundation Check skill: "+area+"/"+n);
 return q;
}));
const KEY="lla-foundation-check-v1";
const names={math:["🔢 Mathematics","الرياضيات"],english:["📖 English","اللغة الإنجليزية"],science:["🔬 Science","العلوم"],life:["🌱 Life skills","المهارات الحياتية"],arts:["🎨 Patterns","الأنماط"]};
const $=selector=>document.querySelector(selector);
const read=()=>{try{const r=JSON.parse(localStorage.getItem(KEY)||"{}");return r&&typeof r==="object"&&!Array.isArray(r)?r:{}}catch{return {}}};
let state={answers:{},...read()};
if(!state.answers||typeof state.answers!=="object")state.answers={};
let step=0;
function save(){try{localStorage.setItem(KEY,JSON.stringify(state))}catch{}}
function answered(){return selected.filter(q=>Number.isInteger(state.answers[q.id])).length}
function score(area){
 const items=selected.filter(q=>q.area===area);
 return items.filter(q=>state.answers[q.id]===q.answer).length;
}
function status(){
 const count=answered();
 $("#checkProgress").textContent=count+" / "+selected.length+" checked • تم إنجاز "+count+" من "+selected.length;
 $("#checkBar").style.width=(count/selected.length*100)+"%";
}
function render(){
 status();
 if(answered()===selected.length){summary();return}
 $("#intro").hidden=true;$("#summary").hidden=true;$("#questionPanel").hidden=false;
 const q=selected[step];
 $("#questionTitle").textContent=q.icon+" "+q.title;
 $("#questionText").textContent=q.question;
 $("#questionArabic").textContent=q.arQuestion;
 $("#questionDisplay").textContent=q.display||"";
 $("#questionDisplay").hidden=!q.display;
 $("#checkSkill").textContent=names[q.area][0]+" • "+q.skill;
 $("#checkAnswers").replaceChildren();
 const existing=state.answers[q.id];
 q.choices.forEach((choice,i)=>{
  const b=document.createElement("button");b.type="button";b.textContent=choice;
  b.setAttribute("aria-label","Answer "+choice);
  b.dataset.index=i;
  if(Number.isInteger(existing)){
   b.disabled=true;
   if(i===existing)b.classList.add("chosen");
  }
  b.addEventListener("click",()=>respond(i));
  $("#checkAnswers").append(b);
 });
 $("#answerMessage").textContent=Number.isInteger(existing)
  ?"✅ Answer saved. Continue when ready. • تم حفظ الإجابة"
  :"Choose one answer. It is fine to make mistakes. • اختر إجابة واحدة";
 $("#nextQuestion").hidden=!Number.isInteger(existing);
 $("#questionNumber").textContent="Question "+(step+1)+" of "+selected.length+" • السؤال "+(step+1);
}
function respond(index){
 const q=selected[step];
 if(Number.isInteger(state.answers[q.id]))return;
 state.answers[q.id]=index;save();
 render();
}
function next(){
 if(!Number.isInteger(state.answers[selected[step].id]))return;
 const later=selected.findIndex((q,i)=>i>step&&!Number.isInteger(state.answers[q.id]));
 if(later>=0){step=later;render();return}
 const earlier=selected.findIndex(q=>!Number.isInteger(state.answers[q.id]));
 if(earlier>=0){step=earlier;render();return}
 summary();
}
function summary(){
 status();$("#intro").hidden=true;$("#questionPanel").hidden=true;$("#summary").hidden=false;
 $("#results").replaceChildren();
 for(const [area] of plan){
  const count=score(area),section=document.createElement("article");section.className="result";
  const h=document.createElement("h3");h.textContent=names[area][0]+" • "+count+" / 3";
  const ar=document.createElement("p");ar.textContent=names[area][1];ar.lang="ar";ar.dir="rtl";
  const desc=document.createElement("p");
  desc.textContent=count===3?"🌟 Good start! Keep exploring more examples.":count===2?"🌱 Practise one more example in this skill.":"💛 Try these ideas together with a parent or teacher.";
  const link=document.createElement("a");
  const target=selected.find(q=>q.area===area&&state.answers[q.id]!==q.answer)||selected.find(q=>q.area===area);
  link.href="./activity-library.html?activity="+encodeURIComponent(target.id);
  link.textContent="▶ Practise "+names[area][0]+" • تدرب";
  section.append(h,ar,desc,link);$("#results").append(section);
 }
 $("#resultNote").textContent="Completed on this device. These 15 questions are a conversation starter, not a diagnosis or validated level assessment. • تقييم تمهيدي غير رسمي";
}
function reset(){
 state={answers:{}};step=0;save();
 $("#summary").hidden=true;$("#questionPanel").hidden=true;$("#intro").hidden=false;status();
}
$("#startCheck").addEventListener("click",()=>{
 $("#intro").hidden=true;
 step=selected.findIndex(q=>!Number.isInteger(state.answers[q.id]));
 if(step<0){summary();return}
 render();
});
$("#nextQuestion").addEventListener("click",next);
$("#restartCheck").addEventListener("click",reset);
$("#returnStart").addEventListener("click",reset);
status();
if(answered()===selected.length)summary();
else if(answered()>0){
 $("#startCheck").textContent="▶ Continue from saved progress • تابع من حيث توقفت";
}
})();