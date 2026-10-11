(()=>{"use strict";
const math=window.LLA_GRADE2_PILOT||[],english=window.LLA_GRADE2_ENGLISH||[],science=window.LLA_GRADE2_SCIENCE||[];
if(math.length!==24||english.length!==24||science.length!==18)throw Error("Missing existing Grade 2 pilot content");
const $=q=>document.querySelector(q),KEY="lla-grade2-mixed-v1";
const chosen=[
 {subject:"🔢 Maths • الرياضيات",item:math[0],kind:"math"},
 {subject:"📖 Reading • القراءة",item:english[0],kind:"english"},
 {subject:"🔬 Science • العلوم",item:science[0],kind:"science"},
 {subject:"🔢 Maths • الرياضيات",item:math[6],kind:"math"},
 {subject:"📖 Reading • القراءة",item:english[6],kind:"english"},
 {subject:"🔬 Science • العلوم",item:science[6],kind:"science"},
 {subject:"🔢 Maths • الرياضيات",item:math[12],kind:"math"},
 {subject:"📖 Reading • القراءة",item:english[12],kind:"english"},
 {subject:"🔬 Science • العلوم",item:science[12],kind:"science"}
];
function read(){try{const x=JSON.parse(localStorage.getItem(KEY)||"{}");return x&&typeof x==="object"&&!Array.isArray(x)?x:{}}catch{return {}}}
const done=read();let cursor=0,solved=false;
function persist(){try{localStorage.setItem(KEY,JSON.stringify(done))}catch{}}
function completed(){return chosen.filter(x=>done[x.item.id]===true).length}
function update(){
 const count=completed();
 $("#progress").textContent="🏅 "+count+" / 9 completed";
 $("#progressBar").style.width=(count/9*100)+"%";
}
function show(){
 const x=chosen[cursor],a=x.item;
 solved=false;$("#next").hidden=true;
 $("#stepTitle").textContent="Question "+(cursor+1)+" of 9";
 $("#subject").textContent=x.subject;
 $("#questionText").textContent=a.question;
 $("#questionArabic").textContent=a.arabic;
 const visual=x.kind==="math"?a.visual:x.kind==="science"?a.icon:"";
 $("#visual").textContent=visual||"";
 $("#visual").hidden=!visual;
 $("#story").hidden=x.kind!=="english";
 $("#story").textContent=x.kind==="english"?a.story:"";
 $("#answers").replaceChildren();
 a.choices.forEach((option,i)=>{
  const button=document.createElement("button");
  button.type="button";button.textContent=option;button.dataset.answer=String(i);
  button.addEventListener("click",()=>answer(i));
  $("#answers").append(button);
 });
 $("#feedback").className="status";
 $("#feedback").textContent=done[a.id]?"Previously completed — try again! • أجب مرة أخرى.":"Choose the best answer. • اختر الإجابة الصحيحة.";
 update();
}
function answer(i){
 if(solved)return;
 const entry=chosen[cursor],a=entry.item,buttons=[...$("#answers").children];
 if(i!==a.answer){
  buttons[i].classList.add("wrong");buttons[i].disabled=true;
  $("#feedback").textContent="🌱 Good try. Read again and choose another answer. • حاول مجدداً.";
  return;
 }
 solved=true;buttons.forEach((b,j)=>{b.disabled=true;if(j===i)b.classList.add("right")});
 done[a.id]=true;persist();
 $("#feedback").className="status good";
 $("#feedback").textContent="🎉 Correct! "+(a.explanation||a.reason)+" • أحسنت!";
 $("#next").hidden=false;
 $("#next").textContent=completed()===9?"🏆 Finish • أكمل":"Next ➜ • التالي";
 update();
}
$("#next").addEventListener("click",()=>{
 if(!solved)return;
 if(completed()===9){
  $("#feedback").textContent="🏆 All nine reviewed! Excellent persistence. You can practise the questions again. • أحسنت!";
  $("#next").hidden=true;return;
 }
 for(let n=1;n<=chosen.length;n++){
  const k=(cursor+n)%chosen.length;
  if(!done[chosen[k].item.id]){cursor=k;break}
 }
 show();
});
$("#restart").addEventListener("click",()=>{cursor=0;show()});
const first=chosen.findIndex(x=>!done[x.item.id]);if(first>=0)cursor=first;
show();
})();