(()=>{"use strict";
const DATA=window.LLA_GRADE3_ENGLISH;if(!DATA||DATA.all.length!==18)throw Error("Grade 3 English pilot missing");
const $=s=>document.querySelector(s),KEY="lla-grade3-english-v1",domains=["comprehension","vocabulary","sentences"];
function read(){try{const s=JSON.parse(localStorage.getItem(KEY)||"{}");return s&&typeof s==="object"&&!Array.isArray(s)?s:{}}catch{return {}}}
const done=read();let current=null,locked=false;
function save(){try{localStorage.setItem(KEY,JSON.stringify(done))}catch{}}
function refresh(){
 $("#englishProgress").textContent="🌟 "+DATA.all.filter(q=>done[q.id]===true).length+" / 18 explored";
 $("#englishDomains").replaceChildren();
 domains.forEach((id,i)=>{
  const questions=DATA.all.filter(q=>q.domain===id);
  const completed=questions.filter(q=>done[q.id]===true).length;
  const b=document.createElement("button");b.type="button";b.className="domain"+(completed===6?" complete":"");b.dataset.domain=id;
  const emoji=document.createElement("span");emoji.className="emoji";emoji.textContent=["📚","🌱","✍️"][i];
  const name=document.createElement("strong");name.textContent=DATA.titles[id][0];
  const ar=document.createElement("span");ar.dir="rtl";ar.lang="ar";ar.textContent=DATA.titles[id][1];
  const status=document.createElement("small");status.textContent=(completed===6?"✅ Completed • ":"🌟 ")+completed+" / 6";
  b.append(emoji,name,ar,status);b.addEventListener("click",()=>open(questions.find(q=>!done[q.id])||questions[0]));
  $("#englishDomains").append(b);
 });
}
function feedback(s,good=false){$("#readingFeedback").textContent=s;$("#readingFeedback").className="feedback"+(good?" good":"")}
function open(q){
 current=q;locked=false;
 $("#choosePanel").hidden=true;$("#playPanel").hidden=false;
 $("#lessonHeading").textContent=DATA.titles[q.domain][0];
 $("#readingText").textContent=q.passage;
 $("#readingQuestion").textContent=q.question;
 $("#readingAnswers").replaceChildren();
 q.choices.forEach((choice,i)=>{
  const b=document.createElement("button");b.type="button";b.textContent=choice;b.dataset.answer=String(i);
  b.addEventListener("click",()=>answer(i));$("#readingAnswers").append(b);
 });
 $("#readingHint").setAttribute("aria-expanded","false");$("#readingHelp").hidden=true;
 $("#readingExplanation").hidden=true;$("#readingNext").hidden=true;
 feedback("Read carefully and choose an answer. • اقرأ ثم أجب.");
 $("#playPanel").scrollIntoView({behavior:"auto",block:"start"});
}
function answer(i){
 if(!current||locked)return;
 const b=$("#readingAnswers").children[i];
 if(i!==current.answer){
  b.classList.add("wrong");b.disabled=true;
  feedback("🌱 Good try! Read again and think about the clues. • حاول مرة أخرى.");
  return;
 }
 locked=true;b.classList.add("correct");
 [...$("#readingAnswers").children].forEach(x=>x.disabled=true);
 done[current.id]=true;save();refresh();
 feedback("🎉 Great reading! You found the answer. • أحسنت!",true);
 $("#readingExplanation").textContent="✅ "+current.explanation;$("#readingExplanation").hidden=false;
 $("#readingNext").hidden=false;
 const remaining=DATA.all.some(q=>q.domain===current.domain&&!done[q.id]);
 $("#readingNext").textContent=remaining?"Next reading question ➜ • السؤال التالي":"🏅 Reading pathway complete • اكتمل المسار";
}
$("#backToDomains").addEventListener("click",()=>{
 $("#playPanel").hidden=true;$("#choosePanel").hidden=false;refresh();
 $("#choosePanel").scrollIntoView({behavior:"auto",block:"start"});
});
$("#readingHint").addEventListener("click",()=>{
 if(!current)return;
 const wasHidden=$("#readingHelp").hidden;
 $("#readingHelp").hidden=!wasHidden;
 $("#readingHelp").textContent="💡 Read the short text again and look for words connected to the question. • اقرأ النص مرة أخرى.";
 $("#readingHint").setAttribute("aria-expanded",String(wasHidden));
});
$("#readingNext").addEventListener("click",()=>{
 if(!current||!locked)return;
 const tasks=DATA.all.filter(q=>q.domain===current.domain);
 const index=tasks.findIndex(q=>q.id===current.id);
 const upcoming=[...tasks.slice(index+1),...tasks.slice(0,index+1)];
 const next=upcoming.find(q=>!done[q.id]);
 if(next)open(next);
 else{
  $("#playPanel").hidden=true;$("#choosePanel").hidden=false;refresh();
  $("#choosePanel").scrollIntoView({behavior:"auto",block:"start"});
 }
});
refresh();
})();