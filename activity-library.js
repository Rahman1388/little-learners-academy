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
 const values={correct:Math.max(0,Number(old.correct)||0),incorrect:Math.max(0,Number(old.incorrect)||0)};
 values[kind]=Math.min(values[kind]+1,999);
 insights[id]=values;
 try{localStorage.setItem(PRACTICE_KEY,JSON.stringify(insights))}catch{}
}
let current=null,answered=false,guided=[],guidedPosition=0;
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
 current=null;answered=false;guided=[];guidedPosition=0;
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
 current=a;answered=false;
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
  if(guided.length){$("#guidedStatus").textContent="✅ Step "+(guidedPosition+1)+" of "+guided.length+" complete!";$("#nextChallenge").textContent=guidedPosition===guided.length-1?"🏆 Finish my 5 steps • أنهي الخطوات":"➡ Next step • الخطوة التالية";}
 }else{
  track(current.id,"incorrect");
  options[i].classList.add("wrong");
  options[i].disabled=true;
  response("🌱 Good try! Look again and choose another answer. • حاول مرة أخرى.","try");
 }
}
$("#guidedStart").addEventListener("click",()=>{
 const pool=visible().filter(a=>!completed[a.id]);
 if(!pool.length){
  $("#guidedStatus").textContent="🎉 All activities in this subject are complete! Choose another subject. • أحسنت!";
  return;
 }
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
   list();
   $("#guidedStatus").textContent="🏆 Five steps finished! Well done! • أحسنت! أكملت خمس خطوات.";
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
skills();list();
try{
 const requested=new URLSearchParams(location.search).get("activity");
 if(requested&&activities.some(a=>a.id===requested))open(requested);
}catch{}
})();