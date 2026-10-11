/* Grade 2 English reading-readiness pilot. Local-only progress and safe retries. */
(()=>{"use strict";
const ITEMS=window.LLA_GRADE2_ENGLISH||[], KEY="lla-grade2-english-v1",$=s=>document.querySelector(s);
if(ITEMS.length!==24)throw Error("Reading pilot must have exactly 24 activities");
const DOMAINS=[
 {id:"understand",icon:"📖",title:"Read & Remember",ar:"اقرأ وتذكّر"},
 {id:"think",icon:"🧠",title:"Think About Stories",ar:"فكر في القصص"},
 {id:"words",icon:"🔤",title:"Meaningful Words",ar:"معاني الكلمات"},
 {id:"write",icon:"✏️",title:"Sentences & Writing",ar:"الجمل والكتابة"}
];
function load(){try{const x=JSON.parse(localStorage.getItem(KEY)||"{}");return x&&typeof x==="object"&&!Array.isArray(x)?x:{}}catch{return {}}}
const done=load();let current=null,locked=false;
function save(){try{localStorage.setItem(KEY,JSON.stringify(done))}catch{}}
function count(){return ITEMS.filter(item=>done[item.id]===true).length}
function feedback(text,kind=""){$("#feedback").textContent=text;$("#feedback").className="feedback"+(kind?" "+kind:"")}
function refresh(){
 const n=count();$("#g2eCount").textContent="🌟 "+n+" / 24 reading challenges explored";
 $("#g2eBar").style.width=(n/24*100)+"%";$("#domains").replaceChildren();
 for(const d of DOMAINS){
  const tasks=ITEMS.filter(x=>x.domain===d.id),achieved=tasks.filter(x=>done[x.id]).length;
  const b=document.createElement("button");b.type="button";b.dataset.domain=d.id;b.className="domain"+(achieved===6?" done":"");
  const icon=document.createElement("span");icon.className="icon";icon.textContent=d.icon;
  const title=document.createElement("strong");title.textContent=d.title;
  const ar=document.createElement("span");ar.lang="ar";ar.dir="rtl";ar.textContent=d.ar;
  const sub=document.createElement("small");sub.textContent=(achieved===6?"🏅 ":"🌱 ")+achieved+" / 6 explored";
  b.append(icon,title,ar,sub);b.addEventListener("click",()=>openDomain(d.id));$("#domains").append(b);
 }
}
function openDomain(id){
 const tasks=ITEMS.filter(item=>item.domain===id);
 if(tasks.length!==6)return;
 openItem(tasks.find(x=>!done[x.id])||tasks[0]);
}
function openItem(item){
 current=item;locked=false;$("#pickPanel").hidden=true;$("#playPanel").hidden=false;
 const group=DOMAINS.find(x=>x.id===item.domain);
 const tasks=ITEMS.filter(x=>x.domain===item.domain);
 $("#stepHeading").textContent=group.icon+" "+group.title+" • "+(tasks.indexOf(item)+1)+" / 6";
 $("#storyText").textContent=item.story;$("#questionText").textContent=item.question;
 $("#questionArabic").textContent=item.arabic;$("#answerOptions").replaceChildren();
 for(const [i,choice] of item.choices.entries()){
  const b=document.createElement("button");b.type="button";b.textContent=choice;b.dataset.choice=String(i);
  b.addEventListener("click",()=>choose(i));$("#answerOptions").append(b);
 }
 $("#reason").hidden=true;$("#nextQuestion").hidden=true;
 feedback("Read the short text and choose. • اقرأ النص واختر الإجابة.");
 $("#playPanel").scrollIntoView({behavior:"auto",block:"start"});
}
function choose(i){
 if(!current||locked)return;
 const buttons=[...$("#answerOptions").children],b=buttons[i];if(!b||b.disabled)return;
 if(i!==current.answer){b.disabled=true;b.classList.add("wrong");feedback("🌱 Nice try. Read the story once more! • اقرأ مرة أخرى وحاول.","try");return}
 locked=true;buttons.forEach((btn,j)=>{btn.disabled=true;if(j===i)btn.classList.add("right")});
 done[current.id]=true;save();refresh();
 feedback("🎉 Correct! Wonderful reading and thinking. • أحسنت!","good");
 $("#reason").textContent="💡 "+current.reason;$("#reason").hidden=false;
 $("#nextQuestion").hidden=false;
 const remainder=ITEMS.filter(x=>x.domain===current.domain&&!done[x.id]);
 $("#nextQuestion").textContent=remainder.length?"Next challenge ➜ • السؤال التالي":"🏅 Pathway complete • اكتمل المسار";
}
$("#backToDomains").addEventListener("click",()=>{$("#pickPanel").hidden=false;$("#playPanel").hidden=true;refresh()});
$("#nextQuestion").addEventListener("click",()=>{
 if(!current||!locked)return;
 const next=ITEMS.find(x=>x.domain===current.domain&&!done[x.id]);
 if(next)openItem(next);else{$("#pickPanel").hidden=false;$("#playPanel").hidden=true;refresh()}
});
refresh();
})();