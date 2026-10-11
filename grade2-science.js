(()=>{"use strict";
const tasks=window.LLA_GRADE2_SCIENCE;
if(!Array.isArray(tasks)||tasks.length!==18)throw Error("Incomplete science pilot");
const KEY="lla-grade2-science-v1",$=s=>document.querySelector(s);
function load(){try{const x=JSON.parse(localStorage.getItem(KEY)||"{}");return x&&typeof x==="object"&&!Array.isArray(x)?x:{}}catch{return {}}}
const done=load();
const save=()=>{try{localStorage.setItem(KEY,JSON.stringify(done))}catch{}};
let index=0,solved=false;
const current=()=>tasks[index];
function filtered(){const t=$("#topicSelect").value;return tasks.filter(x=>t==="all"||x.topic===t)}
function refresh(){
 const count=tasks.filter(q=>done[q.id]===true).length;
 $("#progress").textContent="✅ "+count+" / 18 completed";
 const q=current();$("#topicName").textContent=q.topic;
 $("#questionNumber").textContent="Question "+(index+1)+" of 18"+(done[q.id]?" • ✅ Completed":"");
 $("#questionIcon").textContent=q.icon;$("#questionEnglish").textContent=q.question;$("#questionArabic").textContent=q.arabic;
 $("#answers").replaceChildren();solved=false;$("#next").hidden=true;
 q.choices.forEach((choice,i)=>{
  const b=document.createElement("button");b.type="button";b.dataset.choice=String(i);b.textContent=choice;
  b.addEventListener("click",()=>answer(i));$("#answers").append(b);
 });
 $("#feedback").textContent="Choose your answer • اختر الإجابة.";
}
function answer(i){
 if(solved)return;
 const q=current(),button=$("#answers").children[i];
 if(i!==q.answer){
  button.classList.add("wrong");button.disabled=true;
  $("#feedback").textContent="🌱 Good try. Think again and choose another answer. • حاول مجدداً.";
  return;
 }
 solved=true;done[q.id]=true;save();
 [...$("#answers").children].forEach((b,j)=>{b.disabled=true;if(j===q.answer)b.classList.add("correct")});
 $("#feedback").textContent="🎉 Excellent! "+q.reason+" • أحسنت!";
 $("#next").hidden=false;$("#progress").textContent="✅ "+tasks.filter(q=>done[q.id]).length+" / 18 completed";
 $("#questionNumber").textContent="Question "+(index+1)+" of 18 • ✅ Completed";
}
function move(dir){
 const pool=filtered();if(!pool.length)return;
 const p=Math.max(0,pool.findIndex(x=>x.id===current().id));
 const next=pool[(p+dir+pool.length)%pool.length];index=tasks.findIndex(x=>x.id===next.id);refresh();
}
$("#next").addEventListener("click",()=>move(1));
$("#previous").addEventListener("click",()=>move(-1));
$("#retry").addEventListener("click",refresh);
$("#topicSelect").addEventListener("change",()=>{const first=filtered()[0];if(first)index=tasks.findIndex(x=>x.id===first.id);refresh()});
refresh();
})();