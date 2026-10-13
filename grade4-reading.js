(()=>{"use strict";
const source=window.LLA_GRADE4_READING;
if(!source||source.passages.length!==3||source.questions.length!==18)throw Error("Grade 4 reading pilot needs three passages and 18 questions");
const $=s=>document.querySelector(s),KEY="lla-grade4-reading-v1";
function load(){try{const x=JSON.parse(localStorage.getItem(KEY)||"{}");return x&&typeof x==="object"&&!Array.isArray(x)?x:{}}catch{return {}}}
const progress=load();let active=null,solved=false;
function save(){try{localStorage.setItem(KEY,JSON.stringify(progress))}catch{}}
function update(){
 const all=source.questions.filter(q=>progress[q.id]).length;
 $("#readingProgress").textContent="🌟 "+all+" / 18 questions completed";
 $("#readingBar").style.width=(all/18*100)+"%";
 $("#readingMedals").textContent="🏅 "+source.passages.filter(p=>source.questions.filter(q=>q.passage===p.id).every(q=>progress[q.id])).length+" / 3 stories completed";
 $("#readingStories").replaceChildren();
 source.passages.forEach(p=>{
  const items=source.questions.filter(q=>q.passage===p.id);
  const count=items.filter(q=>progress[q.id]).length;
  const btn=document.createElement("button");btn.type="button";btn.className="story"+(count===6?" complete":"");btn.dataset.story=p.id;
  const icon=document.createElement("span");icon.className="icon";icon.textContent=p.icon;
  const title=document.createElement("strong");title.textContent=p.title;
  const ar=document.createElement("span");ar.lang="ar";ar.dir="rtl";ar.textContent=p.ar;
  const status=document.createElement("small");status.textContent=count+" / 6 "+(count===6?"✅ Completed":"questions explored");
  btn.append(icon,title,ar,status);btn.addEventListener("click",()=>open((items.find(q=>!progress[q.id])||items[0]).id));
  $("#readingStories").append(btn);
 });
}
function open(id){
 const q=source.questions.find(q=>q.id===id);if(!q)return;
 const p=source.passages.find(p=>p.id===q.passage);
 active=q;solved=false;$("#readingPlay").hidden=false;
 $("#readingTopic").textContent=p.icon+" "+p.title;
 $("#readingTitle").textContent="Question "+(source.questions.indexOf(q)+1)+" of 18";
 $("#readingPassage").textContent=p.text;$("#readingQuestion").textContent=q.prompt;$("#readingArabic").textContent=q.ar;
 $("#readingAnswers").replaceChildren();
 q.choices.forEach((c,i)=>{
  const b=document.createElement("button");b.type="button";b.dataset.answer=String(i);b.textContent=c;
  b.addEventListener("click",()=>answer(i,b));$("#readingAnswers").append(b);
 });
 $("#readingHelp").hidden=true;$("#readingExplanation").hidden=true;$("#readingNext").hidden=true;
 $("#readingFeedback").textContent="Choose an answer. • اختر الإجابة.";$("#readingFeedback").className="feedback";
 $("#readingPlay").scrollIntoView({block:"start",behavior:"auto"});
}
function answer(i,b){
 if(!active||solved||b.disabled)return;
 const status=$("#readingFeedback");
 if(i!==active.answer){
  b.disabled=true;b.classList.add("wrong");
  status.className="feedback";status.textContent="🌱 Good try! Read the story again or ask for a hint. • حاول مرة أخرى.";
  return;
 }
 solved=true;progress[active.id]=true;save();
 [...$("#readingAnswers").children].forEach(e=>{e.disabled=true;if(e===b)e.classList.add("correct")});
 status.className="feedback good";status.textContent="🎉 Well done! Find the evidence in the story. • أحسنت!";
 $("#readingExplanation").textContent="✅ "+active.explanation;$("#readingExplanation").hidden=false;
 $("#readingNext").hidden=false;update();
}
$("#readingHint").addEventListener("click",()=>{if(active){$("#readingHelp").textContent="💡 "+active.hint;$("#readingHelp").hidden=false}});
$("#readingBack").addEventListener("click",()=>{$("#readingPlay").hidden=true;$("#readingStories").scrollIntoView({block:"start",behavior:"auto"})});
$("#readingNext").addEventListener("click",()=>{
 if(!solved||!active)return;
 const set=source.questions.filter(q=>q.passage===active.passage);
 const start=set.findIndex(q=>q.id===active.id);
 const ordered=[...set.slice(start+1),...set.slice(0,start+1)];
 const next=ordered.find(q=>!progress[q.id]);
 if(next)open(next.id);
 else{$("#readingPlay").hidden=true;$("#readingStories").scrollIntoView({block:"start",behavior:"auto"})}
});
update();
})();