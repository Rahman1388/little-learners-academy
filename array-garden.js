(()=>{
"use strict";
const $=s=>document.querySelector(s);
const KEY="lla-array-garden-v1",MAIN="lla-progress-v2";
const PATHS=[
 {title:"Sprouting Groups",ar:"مجموعات صغيرة",icon:"🌱",summary:"2–3 easy rows • صفوف سهلة"},
 {title:"Growing Arrays",ar:"صفوف متزايدة",icon:"🌷",summary:"Try 3, 4 or 5 rows • صفوف أكثر"},
 {title:"Super Garden",ar:"الحديقة الكبيرة",icon:"🌻",summary:"Bigger equal groups • مجموعات أكبر"}
];
const MISSIONS=[
 {rows:2,cols:2,icon:"🌸"}, {rows:2,cols:3,icon:"🍎"}, {rows:3,cols:2,icon:"⭐"}, {rows:2,cols:4,icon:"🐟"},
 {rows:3,cols:3,icon:"🌻"}, {rows:4,cols:2,icon:"🍎"}, {rows:3,cols:4,icon:"🌸"}, {rows:5,cols:2,icon:"⭐"},
 {rows:4,cols:3,icon:"🍎"}, {rows:5,cols:3,icon:"🌻"}, {rows:4,cols:4,icon:"🌸"}, {rows:5,cols:5,icon:"⭐"}
];
function read(key){try{const x=JSON.parse(localStorage.getItem(key)||"null");return x&&typeof x==="object"&&!Array.isArray(x)?x:null}catch{return null}}
function write(key,value){try{localStorage.setItem(key,JSON.stringify(value))}catch{}}
const existing=read(KEY);
const completed=new Set(Array.isArray(existing&&existing.completed)?existing.completed.filter(x=>Number.isInteger(x)&&x>=0&&x<MISSIONS.length):[]);
let rewarded=Boolean(existing&&existing.rewarded);
let current=-1,openedRows=0,solved=false;
function persist(){write(KEY,{completed:[...completed].sort((a,b)=>a-b),rewarded})}
function rewardOnce(){
 if(rewarded)return;
 const main=read(MAIN)||{voice:"girl",slow:false,stars:0,completed:{}};
 main.stars=Math.max(0,Number(main.stars)||0)+1;
 write(MAIN,main);
 rewarded=true;persist();
}
function progress(){
 $("#gardenProgress").textContent="⭐ "+completed.size+" / 12 missions explored";
 $("#gardenBar").style.width=(completed.size/12*100)+"%";
}
function feedback(message,style=""){
 $("#feedback").textContent=message;$("#feedback").className=style;
}
function menu(){
 $("#levelCards").replaceChildren();
 PATHS.forEach((path,i)=>{
  const count=[0,1,2,3].filter(n=>completed.has(4*i+n)).length;
  const b=document.createElement("button");b.type="button";b.className="level"+(count===4?" finished":"");
  b.dataset.level=String(i);
  const icon=document.createElement("span");icon.className="emoji";icon.textContent=path.icon;
  const title=document.createElement("strong");title.textContent=path.title;
  const ar=document.createElement("span");ar.lang="ar";ar.dir="rtl";ar.textContent=path.ar;
  const stat=document.createElement("span");stat.className="stat";stat.textContent=count+" / 4 completed • "+path.summary;
  b.append(icon,title,ar,stat);
  b.addEventListener("click",()=>{
   let n=i*4;
   while(n<i*4+4&&completed.has(n))n++;
   open(n>=i*4+4?i*4:n);
  });
  $("#levelCards").append(b);
 });
 progress();
}
function answers(m,index){
 const correct=m.rows*m.cols;
 let options=[correct,correct+m.cols,Math.max(0,correct-m.cols)].filter((v,j,a)=>a.indexOf(v)===j);
 if(options.length!==3)options=[correct,correct+1,correct+2];
 const shift=index%3;
 options=[...options.slice(shift),...options.slice(0,shift)];
 $("#answerChoices").replaceChildren();
 options.forEach(n=>{
  const b=document.createElement("button");b.type="button";b.dataset.value=String(n);b.textContent=String(n);b.disabled=true;
  b.addEventListener("click",()=>choose(n,b));
  $("#answerChoices").append(b);
 });
}
function showModel(){
 const m=MISSIONS[current],row=$("#groupDisplay");
 row.replaceChildren();
 if(!openedRows){
  const p=document.createElement("p");p.className="placeholder";p.textContent="🌱 Hidden garden rows • صفوف مخفية";row.append(p);
  $("#modelText").textContent="0 groups revealed • لم تُكشف مجموعات بعد";
 }else{
  for(let i=0;i<openedRows;i++){
   const div=document.createElement("div");div.className="objectRow";
   div.setAttribute("aria-label","Group "+(i+1)+" has "+m.cols+" objects");
   for(let j=0;j<m.cols;j++){
    const span=document.createElement("span");span.textContent=m.icon;span.setAttribute("aria-hidden","true");div.append(span);
   }
   row.append(div);
  }
  const sum=Array(openedRows).fill(m.cols).join(" + ");
  $("#modelText").textContent=openedRows+" equal "+(openedRows===1?"group":"groups")+" • "+sum+(openedRows===m.rows?" = ?":" + …");
 }
 const ready=openedRows===m.rows;
 $("#revealGroup").disabled=ready||solved;
 $("#revealGroup").textContent=ready?"✅ Every row revealed • كل الصفوف ظاهرة":"🌱 Reveal next group • اكشف مجموعة";
 $("#answerChoices").querySelectorAll("button").forEach(b=>{if(!solved&&!b.classList.contains("wrong"))b.disabled=!ready});
 $("#answerHint").textContent=ready?"Now count all the pictures. • عدّ كل الصور.":"First reveal every row, then choose the total. • اكشف كل الصفوف أولاً.";
}
function open(index){
 if(!Number.isInteger(index)||index<0||index>=MISSIONS.length)return;
 current=index;openedRows=0;solved=false;
 const m=MISSIONS[index],path=PATHS[Math.floor(index/4)];
 $("#levelMenu").hidden=true;$("#missionView").hidden=false;
 $("#missionLabel").textContent="Mission "+(index+1)+" / 12 • "+path.title;
 $("#missionHeading").textContent=path.icon+" "+path.title;
 $("#gardenQuestion").textContent="Build "+m.rows+" rows with "+m.cols+" "+m.icon+" in each row. How many are there in all?";
 $("#hintText").hidden=true;$("#hintText").textContent="";
 $("#workedExample").hidden=true;$("#workedExample").textContent="";
 $("#nextMission").hidden=true;$("#success").hidden=true;
 answers(m,index);showModel();
 feedback("Start by revealing one equal group. • ابدأ بكشف مجموعة متساوية.");
 $("#missionView").scrollIntoView({behavior:"auto",block:"start"});
}
function choose(value,button){
 if(current<0||solved||openedRows!==MISSIONS[current].rows)return;
 const m=MISSIONS[current],total=m.rows*m.cols;
 if(value!==total){
  button.disabled=true;button.classList.add("wrong");
  feedback("🌱 Good try! Count each row again and add equal groups. • حاول مرة أخرى.","retry");
  return;
 }
 solved=true;
 $("#answerChoices").querySelectorAll("button").forEach(b=>{b.disabled=true;if(b===button)b.classList.add("correct")});
 completed.add(current);persist();progress();menu();
 const sum=Array(m.rows).fill(m.cols).join(" + ");
 $("#workedExample").textContent="🌟 "+sum+" = "+total+". That's "+m.rows+" groups of "+m.cols+", so "+m.rows+" × "+m.cols+" = "+total+". • أحسنت!";
 $("#workedExample").hidden=false;
 feedback("🎉 You found the total! Equal rows help us multiply. • ممتاز! وجدت المجموع.","good");
 $("#nextMission").hidden=false;
 $("#nextMission").textContent="➡️ Next mission • المرحلة التالية";
 if(completed.size===MISSIONS.length){rewardOnce();$("#success").hidden=false;$("#nextMission").textContent="🔁 Explore another path • مسار آخر"}
}
$("#revealGroup").addEventListener("click",()=>{
 if(current<0||solved)return;
 const m=MISSIONS[current];if(openedRows>=m.rows)return;
 openedRows++;showModel();
 feedback(openedRows===m.rows?"🌟 All rows are visible. Choose the total! • اختر المجموع.":"🌱 One more equal group! Keep growing. • اكشف صفاً آخر.");
});
$("#showHint").addEventListener("click",()=>{
 if(current<0)return;
 const m=MISSIONS[current];
 $("#hintText").hidden=false;
 $("#hintText").textContent="💡 Each row has "+m.cols+" objects. Count in "+m.cols+"s: "+Array.from({length:m.rows},(_,i)=>(i+1)*m.cols).join(", ")+". • عدّ المجموعات المتساوية.";
});
$("#goBack").addEventListener("click",()=>{
 current=-1;$("#missionView").hidden=true;$("#levelMenu").hidden=false;menu();$("#levelMenu").scrollIntoView({behavior:"auto",block:"start"});
});
$("#nextMission").addEventListener("click",()=>{
 if(!solved)return;
 if(completed.size===MISSIONS.length){
  $("#goBack").click();return;
 }
 const found=Array.from({length:MISSIONS.length},(_,i)=>(current+1+i)%MISSIONS.length).find(i=>!completed.has(i));
 if(found!==undefined)open(found);
});
menu();
})();