(()=>{"use strict";
const source=window.LLA_GRADE4_SCIENCE;
if(!source||source.passages.length!==3||source.questions.length!==18)throw Error("Grade 4 science pilot needs three topics and 18 questions");
const $=s=>document.querySelector(s),KEY="lla-grade4-science-v1";
function load(){try{const x=JSON.parse(localStorage.getItem(KEY)||"{}");return x&&typeof x==="object"&&!Array.isArray(x)?x:{}}catch{return {}}}
const progress=load();let active=null,solved=false;
function save(){try{localStorage.setItem(KEY,JSON.stringify(progress))}catch{}}
function update(){
 const all=source.questions.filter(q=>progress[q.id]).length;
 $("#scienceProgress").textContent="🌟 "+all+" / 18 questions completed";
 $("#scienceBar").style.width=(all/18*100)+"%";
 $("#scienceMedals").textContent="🏅 "+source.passages.filter(p=>source.questions.filter(q=>q.passage===p.id).every(q=>progress[q.id])).length+" / 3 topics completed";
 $("#scienceDomains").replaceChildren();
 source.passages.forEach(p=>{
  const items=source.questions.filter(q=>q.passage===p.id);
  const count=items.filter(q=>progress[q.id]).length;
  const btn=document.createElement("button");btn.type="button";btn.className="story"+(count===6?" complete":"");btn.dataset.domain=p.id;
  const icon=document.createElement("span");icon.className="icon";icon.textContent=p.icon;
  const title=document.createElement("strong");title.textContent=p.title;
  const ar=document.createElement("span");ar.lang="ar";ar.dir="rtl";ar.textContent=p.ar;
  const status=document.createElement("small");status.textContent=count+" / 6 "+(count===6?"✅ Completed":"questions practised");
  btn.append(icon,title,ar,status);btn.addEventListener("click",()=>open((items.find(q=>!progress[q.id])||items[0]).id));
  $("#scienceDomains").append(btn);
 });
}
function open(id){
 const q=source.questions.find(q=>q.id===id);if(!q)return;
 const p=source.passages.find(p=>p.id===q.passage);
 active=q;solved=false;$("#sciencePlay").hidden=false;
 $("#scienceTopic").textContent=p.icon+" "+p.title;
 $("#scienceTitle").textContent="Question "+(source.questions.indexOf(q)+1)+" of 18";
 $("#sciencePassage").textContent=p.text;$("#scienceQuestion").textContent=q.prompt;$("#scienceArabic").textContent=q.ar;
 $("#scienceAnswers").replaceChildren();
 q.choices.forEach((c,i)=>{
  const b=document.createElement("button");b.type="button";b.dataset.answer=String(i);b.textContent=c;
  b.addEventListener("click",()=>answer(i,b));$("#scienceAnswers").append(b);
 });
 $("#scienceHelp").hidden=true;$("#scienceExplanation").hidden=true;$("#scienceNext").hidden=true;
 $("#scienceFeedback").textContent="Choose an answer. • اختر الإجابة.";$("#scienceFeedback").className="feedback";
 $("#sciencePlay").scrollIntoView({block:"start",behavior:"auto"});
}
function answer(i,b){
 if(!active||solved||b.disabled)return;
 const status=$("#scienceFeedback");
 if(i!==active.answer){
  b.disabled=true;b.classList.add("wrong");
  status.className="feedback";status.textContent="🌱 Good try! Think about the investigation or ask for a hint. • حاول مرة أخرى.";
  return;
 }
 solved=true;progress[active.id]=true;save();
 [...$("#scienceAnswers").children].forEach(e=>{e.disabled=true;if(e===b)e.classList.add("correct")});
 status.className="feedback good";status.textContent="🎉 Well done! Explain your science reasoning. • أحسنت!";
 $("#scienceExplanation").textContent="✅ "+active.explanation;$("#scienceExplanation").hidden=false;
 $("#scienceNext").hidden=false;update();
}
$("#scienceHint").addEventListener("click",()=>{if(active){$("#scienceHelp").textContent="💡 "+active.hint;$("#scienceHelp").hidden=false}});
$("#scienceBack").addEventListener("click",()=>{$("#sciencePlay").hidden=true;$("#scienceDomains").scrollIntoView({block:"start",behavior:"auto"})});
$("#scienceNext").addEventListener("click",()=>{
 if(!solved||!active)return;
 const set=source.questions.filter(q=>q.passage===active.passage);
 const start=set.findIndex(q=>q.id===active.id);
 const ordered=[...set.slice(start+1),...set.slice(0,start+1)];
 const next=ordered.find(q=>!progress[q.id]);
 if(next)open(next.id);
 else{$("#sciencePlay").hidden=true;$("#scienceDomains").scrollIntoView({block:"start",behavior:"auto"})}
});
update();
})();