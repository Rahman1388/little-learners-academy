/* Little Learners Academy • Skip-Count Rocket
 * Twelve concrete-to-visual pattern missions for Grade 1 extension/Grade 2 bridge.
 * Device-local progress, no personal data, no unreviewed audio.
 */
(()=>{
"use strict";
const MISSIONS=[
 {id:"scr-01",step:2,start:0,hops:3,icon:"🐱",text:"A cat jumps forward three times, 2 spaces each time.",ar:"تقفز القطة ثلاث مرات، مقدار كل قفزة ٢."},
 {id:"scr-02",step:2,start:2,hops:3,icon:"🐟",text:"Start at 2 and make three jumps of 2.",ar:"ابدأ من ٢ واقفز ثلاث قفزات بمقدار ٢."},
 {id:"scr-03",step:2,start:4,hops:4,icon:"⭐",text:"Your rocket starts at 4 and jumps in 2s four times.",ar:"يبدأ الصاروخ من ٤ ويقفز أربع قفزات بمقدار ٢."},
 {id:"scr-04",step:2,start:10,hops:5,icon:"🚲",text:"Five small 2-step jumps begin at 10.",ar:"خمس قفزات بمقدار ٢ تبدأ من ١٠."},
 {id:"scr-05",step:5,start:0,hops:3,icon:"✋",text:"Count three groups of five fingers from zero.",ar:"عد ثلاث مجموعات من خمسة، وابدأ من الصفر."},
 {id:"scr-06",step:5,start:5,hops:4,icon:"🌸",text:"Start at 5 and make four jumps of 5.",ar:"ابدأ من ٥ واقفز أربع مرات بمقدار ٥."},
 {id:"scr-07",step:5,start:10,hops:4,icon:"🚌",text:"Start at 10 and jump 5 forward, four times.",ar:"ابدأ من ١٠ واقفز أربع قفزات بمقدار ٥."},
 {id:"scr-08",step:5,start:20,hops:4,icon:"🌴",text:"Four equal jumps of 5 start at 20.",ar:"أربع قفزات متساوية بمقدار ٥ تبدأ من ٢٠."},
 {id:"scr-09",step:10,start:0,hops:3,icon:"🔟",text:"Count three groups of ten from zero.",ar:"عد ثلاث مجموعات من عشرة، وابدأ من الصفر."},
 {id:"scr-10",step:10,start:10,hops:4,icon:"🐪",text:"Start at 10 and make four jumps of ten.",ar:"ابدأ من ١٠ واقفز أربع قفزات بمقدار ١٠."},
 {id:"scr-11",step:-5,start:40,hops:3,icon:"🔙",text:"Challenge: begin at 40 and jump BACK by 5, three times.",ar:"تحدٍّ: ابدأ من ٤٠ واقفز للخلف ثلاث مرات بمقدار ٥."},
 {id:"scr-12",step:-10,start:70,hops:4,icon:"🚀",text:"Challenge: begin at 70 and jump BACK by 10, four times.",ar:"تحدٍّ: ابدأ من ٧٠ واقفز للخلف أربع مرات بمقدار ١٠."}
];
const STORAGE="lla-skip-count-rocket-v1",MAIN="lla-progress-v2";
const $=q=>document.querySelector(q);
const read=k=>{try{return JSON.parse(localStorage.getItem(k)||"null")}catch{return null}};
const write=(k,v)=>{try{localStorage.setItem(k,JSON.stringify(v))}catch{}};
const valid=new Set(MISSIONS.map(x=>x.id));
const old=read(STORAGE);
const state={done:Array.isArray(old&&old.done)?[...new Set(old.done.filter(x=>valid.has(x)))]:[],rewarded:old&&old.rewarded===true};
let position=Math.max(0,MISSIONS.findIndex(m=>!state.done.includes(m.id)));
let jumps=0,solved=false;
const mission=()=>MISSIONS[position],result=m=>m.start+m.step*m.hops;
const unit=n=>(n<0?"−":"+")+Math.abs(n);
function persist(){write(STORAGE,state)}
function refresh(){
 const count=state.done.length;
 $("#rocketProgress").textContent="⭐ "+count+" / "+MISSIONS.length+" missions";
 $("#progressFill").style.width=(count/MISSIONS.length*100).toFixed(1)+"%";
 $("#rocketReward").hidden=count!==MISSIONS.length;
}
function menu(){
 $("#missionGrid").replaceChildren();
 MISSIONS.forEach((m,i)=>{
  const done=state.done.includes(m.id);
  const b=document.createElement("button");b.type="button";
  b.className="route"+(done?" done":"")+(position===i?" selected":"");
  b.dataset.mission=m.id;
  b.setAttribute("aria-pressed",String(position===i));
  const title=document.createElement("strong");
  title.textContent=(done?"✅ ":m.icon+" ")+String(i+1)+". "+(m.step<0?"Back "+Math.abs(m.step):"Count by "+m.step);
  const desc=document.createElement("small");desc.textContent=m.hops+" equal jumps • "+(done?"Completed":"Try it");
  b.append(title,desc);
  b.addEventListener("click",()=>open(i));
  $("#missionGrid").append(b);
 });
}
function feedback(text,kind=""){
 const e=$("#answerStatus");e.textContent=text;e.className="feedback"+(kind?" "+kind:"");
}
function draw(){
 const m=mission(),lane=$("#numberLane");lane.replaceChildren();
 for(let i=0;i<=m.hops;i++){
  const b=document.createElement("span");
  b.className="point"+(i===0?" start":"")+(i>0&&i<=jumps?" visited":"")+(i===jumps?" current":"");
  b.textContent=i<=jumps?String(m.start+i*m.step):"?";
  b.setAttribute("aria-label",i<=jumps?"Jump "+i+" is "+(m.start+i*m.step):"Jump "+i+" hidden");
  lane.append(b);
 }
 $("#groupModels").replaceChildren();
 for(let i=0;i<m.hops;i++){
  const div=document.createElement("div");div.className="group";
  div.textContent=(i<jumps?"✅ ":"➜ ")+unit(m.step);
  $("#groupModels").append(div);
 }
 $("#numberLane").setAttribute("aria-label","Starting number "+m.start+
  ". "+jumps+" of "+m.hops+" equal jumps shown. Current number "+(m.start+jumps*m.step)+".");
}
function options(){
 const m=mission(),correct=result(m),step=Math.abs(m.step);
 const candidates=[correct,correct+step,Math.max(0,correct-step)];
 const options=[...candidates.slice(position%3),...candidates.slice(0,position%3)];
 const grid=$("#answerChoices");grid.replaceChildren();
 for(const num of options){
  const button=document.createElement("button");button.type="button";button.dataset.value=String(num);
  button.textContent=String(num);button.setAttribute("aria-label","Choose "+num);
  button.addEventListener("click",()=>answer(num,button));grid.append(button);
 }
}
function jumpMessage(){
 const m=mission();
 if(jumps===0)return "🚀 Start at "+m.start+". "+m.hops+" jumps of "+Math.abs(m.step)+
  (m.step>0?" forward.":" backward.")+" • ابدأ من العدد الأصفر.";
 return "🚀 Jump "+jumps+" of "+m.hops+": "+(m.start+(jumps-1)*m.step)+
 " → "+(m.start+jumps*m.step)+(jumps===m.hops?"! You reached the landing point.":"! Keep going.")+
 " • خطوة بخطوة.";
}
function open(i,scroll=true){
 if(!Number.isInteger(i)||i<0||i>=MISSIONS.length)return;
 position=i;jumps=0;solved=false;
 const m=mission();
 $("#chapter").textContent=(m.step<0?"Backward extension • عد للخلف":"Counting in "+m.step+"s • العد بالقفز")+" • "+(i+1)+" / 12";
 $("#missionTitle").textContent=m.icon+" Mission "+(i+1)+" • المهمة "+(i+1);
 $("#prompt").textContent=m.text;
 $("#arabicPrompt").textContent=m.ar;
 $("#groupTitle").textContent=m.hops+" equal jumps of "+Math.abs(m.step)+
 (m.step<0?" backwards":" forwards")+" • قفزات متساوية";
 $("#showModel").disabled=false;$("#showHint").disabled=false;
 $("#modelStatus").textContent=jumpMessage();
 $("#nextMission").hidden=true;
 feedback("Where will you land? You can reveal jumps first. • اختر العدد الصحيح.");
 draw();options();menu();refresh();
 if(scroll)$("#rocketGame").scrollIntoView({block:"start",behavior:"auto"});
}
function showOne(){
 if(solved||jumps>=mission().hops)return;
 jumps++;draw();$("#modelStatus").textContent=jumpMessage();
 if(jumps===mission().hops)$("#showModel").disabled=true;
}
function hint(){
 const m=mission();
 $("#modelStatus").textContent="💡 Count "+Math.abs(m.step)+" each time. "+
 (m.step>0?"Add":"Subtract")+" "+Math.abs(m.step)+" for each jump, starting at "+m.start+
 ". You can reveal just one jump at a time. • عد بالقفزات المتساوية.";
}
function starOnce(){
 if(state.done.length!==MISSIONS.length||state.rewarded)return;
 state.rewarded=true;persist();
 const existing=read(MAIN);
 const main=existing&&typeof existing==="object"&&!Array.isArray(existing)?existing:{voice:"girl",slow:false,stars:0,completed:{}};
 main.stars=Math.max(0,Number(main.stars)||0)+1;write(MAIN,main);
}
function answer(value,button){
 if(solved||button.disabled)return;
 const m=mission(),correct=result(m);
 if(value!==correct){
  button.disabled=true;button.classList.add("wrong");
  feedback("🌱 Good try. Watch one jump, then count "+Math.abs(m.step)+" again. • حاول مرة أخرى.","try");
  return;
 }
 solved=true;jumps=m.hops;draw();
 $("#modelStatus").textContent="✅ "+Array.from({length:m.hops+1},(_,i)=>m.start+i*m.step).join(" → ");
 $("#showModel").disabled=true;$("#showHint").disabled=true;
 for(const b of $("#answerChoices").children){b.disabled=true;if(b===button)b.classList.add("correct")}
 if(!state.done.includes(m.id)){state.done.push(m.id);persist()}
 starOnce();refresh();menu();
 feedback("🌟 Great thinking! "+m.start+" "+Array(m.hops).fill(unit(m.step)).join(" ")+
 " = "+correct+". Each jump is equal. • أحسنت!","success");
 $("#nextMission").hidden=false;
 $("#nextMission").textContent=state.done.length===MISSIONS.length?
  "🔁 Choose a mission • اختر مهمة":"Next mission ➜ • المهمة التالية";
}
$("#showModel").addEventListener("click",showOne);
$("#showHint").addEventListener("click",hint);
$("#replayMission").addEventListener("click",()=>open(position));
$("#nextMission").addEventListener("click",()=>{
 const next=MISSIONS.findIndex((m,i)=>i>position&&!state.done.includes(m.id));
 const firstUnfinished=MISSIONS.findIndex(m=>!state.done.includes(m.id));
 if(next>=0)open(next);
 else if(firstUnfinished>=0)open(firstUnfinished);
 else{open(0,false);$("#missionGrid").scrollIntoView({block:"start",behavior:"auto"});}
});
open(position,false);
})();