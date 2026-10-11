(()=>{
"use strict";
const activities=window.LLA_MINI_ACTIVITIES||[];
if(activities.length<101)throw Error("The activity library is incomplete");
const KEY="lla-activity-library-v1",PRACTICE_KEY="lla-practice-insights-v1";
const $=q=>document.querySelector(q);
function load(){try{const x=JSON.parse(localStorage.getItem(KEY)||"{}");return x&&typeof x==="object"&&!Array.isArray(x)?x:{}}catch{return {}}}
const completed=load();
function readInsights(){
 try{const x=JSON.parse(localStorage.getItem(PRACTICE_KEY)||"{}");return x&&typeof x==="object"&&!Array.isArray(x)?x:{}}
 catch{return {}}
}
const insights=readInsights();
function track(id,kind){
 const old=insights[id]&&typeof insights[id]==="object"?insights[id]:{};
 const values={correct:Math.max(0,Number(old.correct)||0),incorrect:Math.max(0,Number(old.incorrect)||0),lastAt:new Date().toISOString(),lastResult:kind};
 values[kind]=Math.min(values[kind]+1,999);
 insights[id]=values;
 try{localStorage.setItem(PRACTICE_KEY,JSON.stringify(insights))}catch{}
}
let current=null,answered=false,guided=[],guidedPosition=0,sessionMode="guided",wrongRecorded=false;
function save(){try{localStorage.setItem(KEY,JSON.stringify(completed))}catch{}}
function count(){return activities.filter(a=>completed[a.id]===true).length}
function progress(){
 const n=count();
 $("#overallProgress").textContent="🏅 "+n+" / "+activities.length+" activities completed";
 $("#overallBar").style.width=(n/activities.length*100).toFixed(1)+"%";
 if(!guided.length)$("#guidedStatus").textContent=activities.length-n+" challenges still waiting • "+n+" completed so far";
}
function skills(){
 const area=$("#areaSelect").value;
 const selected=$("#skillSelect").value;
 const values=[...new Set(activities.filter(a=>area==="all"||a.area===area).map(a=>a.skill))];
 $("#skillSelect").replaceChildren();
 const all=document.createElement("option");all.value="all";all.textContent="All skills • كل المهارات";$("#skillSelect").append(all);
 values.forEach(skill=>{const option=document.createElement("option");option.value=skill;option.textContent=skill;$("#skillSelect").append(option)});
 if(values.includes(selected))$("#skillSelect").value=selected;
}
function visible(){
 const area=$("#areaSelect").value,skill=$("#skillSelect").value;
 return activities.filter(a=>(area==="all"||a.area===area)&&(skill==="all"||a.skill===skill));
}
function list(){
 current=null;answered=false;guided=[];guidedPosition=0;sessionMode="guided";
 $("#overview").hidden=false;$("#playView").hidden=true;
 $("#activityGrid").replaceChildren();
 const items=visible();
 $("#listTitle").textContent=items.length+" activities ready • "+items.filter(a=>completed[a.id]).length+" completed";
 for(const a of items){
  const card=document.createElement("button");card.type="button";
  card.className="activity"+(completed[a.id]?" done":"");
  card.dataset.id=a.id;
  const index=document.createElement("span");index.className="num";index.textContent="#"+a.id.slice(-3)+" • "+a.skill;
  const title=document.createElement("strong");title.textContent=a.icon+" "+a.title;
  const ar=document.createElement("small");ar.textContent=a.ar;ar.lang="ar";ar.dir="rtl";
  const status=document.createElement("span");status.className="check";status.textContent=completed[a.id]?"✅ Completed • مكتمل":"▶ Play • ابدأ";
  card.append(index,title,ar,status);
  card.addEventListener("click",()=>open(a.id));
  $("#activityGrid").append(card);
 }
 progress();
}
function response(message,kind=""){
 const e=$("#response");e.textContent=message;e.className=kind;
}
function open(id){
 const a=activities.find(x=>x.id===id);
 if(!a)return;
 current=a;answered=false;wrongRecorded=false;
 $("#overview").hidden=true;$("#playView").hidden=false;
 $("#skillBadge").textContent=(guided.length?"Step "+(guidedPosition+1)+" of "+guided.length+" • ":"")+a.skill+" • "+a.area;
 $("#challengeTitle").textContent=a.icon+" "+a.title;
 $("#questionText").textContent=a.question;
 $("#questionArabic").textContent=a.arQuestion;
 $("#questionVisual").textContent=a.display||"";
 $("#questionVisual").hidden=!a.display;
 $("#answerOptions").replaceChildren();
 a.choices.forEach((text,i)=>{
  const button=document.createElement("button");button.type="button";button.textContent=text;
  button.dataset.answer=String(i);
  button.setAttribute("aria-label","Answer: "+text);
  button.addEventListener("click",()=>answer(i));
  $("#answerOptions").append(button);
 });
 $("#nextChallenge").hidden=true;
 $("#workModel").hidden=true;
 $("#showWork").setAttribute("aria-expanded","false");
 $("#showWork").textContent="🧮 Show a learning hint • أظهر مساعدة";
 $("#nextChallenge").textContent="Next activity ➜ • النشاط التالي";
 response("Choose the best answer. • اختر الإجابة الصحيحة.");
 $("#playView").scrollIntoView({behavior:"auto",block:"start"});
}
function answer(i){
 if(!current||answered)return;
 const options=[...$("#answerOptions").children],ok=i===current.answer;
 if(ok){
  answered=true;
  track(current.id,"correct");
  options.forEach((b,j)=>{b.disabled=true;if(j===i)b.classList.add("correct")});
  if(!completed[current.id]){completed[current.id]=true;save()}
  response("🎉 Well done! "+current.tip+" • أحسنت!","good");
  progress();
  $("#nextChallenge").hidden=false;
  if(guided.length){
    const status=sessionMode==="smart"?"#smartStatus":"#guidedStatus";
    $(status).textContent="✅ Step "+(guidedPosition+1)+" of "+guided.length+" complete! • أحسنت!";
    $("#nextChallenge").textContent=guidedPosition===guided.length-1?"🏆 Finish my 5 steps • أنهي الخطوات":"➡ Next step • الخطوة التالية";
   }
 }else{
  if(!wrongRecorded){track(current.id,"incorrect");wrongRecorded=true;}
  options[i].classList.add("wrong");
  options[i].disabled=true;
  response("🌱 Good try! Look again and choose another answer. • حاول مرة أخرى.","try");
 }
}
function reviewPriority(a){
 const info=insights[a.id]||{};
 const errors=Math.max(0,Number(info.incorrect)||0),good=Math.max(0,Number(info.correct)||0);
 if(errors>0&&good<2)return 2000+errors*10-good; // revisit mistakes first
 if(!completed[a.id])return 1000; // next: new concepts
 return Math.max(0,200-good); // refresh familiar ones when nothing new remains
}
function smartChoice(){
 const pool=visible();
 const sorted=pool.slice().sort((a,b)=>reviewPriority(b)-reviewPriority(a)||a.id.localeCompare(b.id));
 if($("#areaSelect").value==="all"&&$("#skillSelect").value==="all"){
  const order=["math","english","science","life","arts"];
  return order.map(area=>sorted.find(a=>a.area===area)).filter(Boolean).map(a=>a.id);
 }
 return sorted.slice(0,5).map(a=>a.id);
}
$("#smartStart").addEventListener("click",()=>{
 guided=smartChoice();
 if(!guided.length){$("#smartStatus").textContent="Select a subject to start. • اختر مادة للبدء";return}
 guidedPosition=0;sessionMode="smart";
 $("#smartStatus").textContent="🌱 Smart review started. Mistakes first, then new skills. • بدأت المراجعة";
 open(guided[0]);
});
function helpModel(){
 if(!current)return;
 const box=$("#workModel");box.replaceChildren();
 const heading=document.createElement("strong");heading.textContent="🌱 Try this learning strategy • جرّب هذه الطريقة";box.append(heading);
 const visual=document.createElement("div");visual.className="row";
 const question=current.question;
 const equation=question.match(/^(\d+)\s*([+−])\s*(\d+)\s*=\s*\?$/);
 const addSymbols=(container,n,opTake=0)=>{
  for(let i=0;i<n;i++){
    const sym=document.createElement("span");sym.textContent="🟡";
    if(opTake&&i>=n-opTake)sym.className="taken";
    container.append(sym);
  }
 };
 const explanation=document.createElement("p");
 if(equation){
  const a=Number(equation[1]),b=Number(equation[3]),sign=equation[2];
  addSymbols(visual,a,sign==="−"?b:0);
  if(sign==="+"){const plus=document.createElement("span");plus.textContent=" + ";visual.append(plus);addSymbols(visual,b)}
  explanation.textContent=sign==="+"?"Count every circle in both groups. • عدّ الدوائر في المجموعتين.":"Count the circles that are not crossed out. • عدّ الدوائر الباقية.";
 }else if(current.skill==="Number order"){
  explanation.textContent="Draw a number line and move one step forward. • تحرك خطوة واحدة للأمام.";
  visual.textContent="➜ 🔢 ➜";
 }else if(current.skill==="Counting"){
  explanation.textContent="Point to each object once. Count slowly and touch each picture. • المس كل صورة مرة واحدة.";
  visual.textContent=current.display||"⭐ ⭐ ⭐";
 }else if(current.area==="english"){
  explanation.textContent="Look at the picture or read the sentence carefully. Talk about the meaning with an adult. • اقرأ مع شخص بالغ.";
  visual.textContent=current.icon+" 📖";
 }else if(current.area==="science"){
  explanation.textContent="Imagine the object or try to observe it in real life. Eliminate answers that do not fit. • تأمل الأشياء من حولك.";
  visual.textContent="🔎 🌱";
 }else if(current.area==="life"){
  explanation.textContent="Ask: which choice is kind, respectful, and safe? • أي اختيار أكثر لطفاً وأماناً؟";
  visual.textContent="🤝 💚";
 }else{
  explanation.textContent="Find the part that repeats, then look for the next part of the pattern. • اكتشف الجزء المتكرر.";
  visual.textContent="🔴 🟡 🔴 🟡";
 }
 box.append(visual,explanation);
}
$("#showWork").addEventListener("click",()=>{
 const box=$("#workModel"),nowHidden=!box.hidden;
 box.hidden=nowHidden;
 if(!nowHidden)helpModel();
 $("#showWork").setAttribute("aria-expanded",String(!nowHidden));
 $("#showWork").textContent=nowHidden?"🧮 Show a learning hint • أظهر مساعدة":"🙈 Hide learning hint • إخفاء المساعدة";
});

$("#guidedStart").addEventListener("click",()=>{
 const pool=visible().filter(a=>!completed[a.id]);
 if(!pool.length){
  $("#guidedStatus").textContent="🎉 All activities in this subject are complete! Choose another subject. • أحسنت!";
  return;
 }
 sessionMode="guided";
 guided=pool.slice(0,5).map(a=>a.id);
 guidedPosition=0;
 $("#guidedStatus").textContent="🌱 Five-step journey started! • بدأنا الرحلة";
 open(guided[0]);
});
$("#areaSelect").addEventListener("change",()=>{skills();list()});
$("#skillSelect").addEventListener("change",list);
$("#backToList").addEventListener("click",()=>{list();$("#overview").scrollIntoView({behavior:"auto",block:"start"})});
$("#retryQuestion").addEventListener("click",()=>{if(current)open(current.id)});
$("#nextChallenge").addEventListener("click",()=>{
 if(!current||!answered)return;
 if(guided.length){
   guidedPosition++;
   if(guidedPosition<guided.length){open(guided[guidedPosition]);return}
   guided=[];guidedPosition=0;
   const finishedMode=sessionMode;
   list();
   $(finishedMode==="smart"?"#smartStatus":"#guidedStatus").textContent="🏆 Five steps finished! Well done! • أحسنت! أكملت خمس خطوات.";
   $("#overview").scrollIntoView({behavior:"auto",block:"start"});
   return;
 }
 const listIds=visible().map(a=>a.id);
 let i=listIds.indexOf(current.id);
 const future=[...listIds.slice(i+1),...listIds.slice(0,i+1)];
 const next=future.find(id=>!completed[id])||future[0];
 if(next)open(next);else list();
});
window.addEventListener("pageshow",progress);
const requestedSubject=new URLSearchParams(window.location.search).get("subject");
if(["math","english","science","life","arts"].includes(requestedSubject))$("#areaSelect").value=requestedSubject;
skills();list();
try{
 const requested=new URLSearchParams(location.search).get("activity");
 if(requested&&activities.some(a=>a.id===requested))open(requested);
}catch{}
})();